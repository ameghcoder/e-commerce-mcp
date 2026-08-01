import { describe, expect, it } from "vitest";
import { FULFILLMENT_STATUSES, ORDER_STATUSES, PAYMENT_STATUSES } from "../../src/domain/enums.js";
import type { Customer, Fulfillment, InventoryRecord, Order, Payment, Product } from "../../src/domain/types.js";
import { customers } from "../../src/data/customers.js";
import { fulfillments } from "../../src/data/fulfillments.js";
import { inventory } from "../../src/data/inventory.js";
import { orders } from "../../src/data/orders.js";
import { payments } from "../../src/data/payments.js";
import { products } from "../../src/data/products.js";

/**
 * Cross-record invariants that TypeScript's structural typing cannot catch
 * (foreign keys, totals, one-record-per-order cardinality). Runs directly
 * against the static src/data/*.ts modules — no generation/validation script
 * needed since the dataset is now finalized and hand-edited in place.
 */
interface Dataset {
  products: Product[];
  customers: Customer[];
  orders: Order[];
  payments: Payment[];
  inventory: InventoryRecord[];
  fulfillments: Fulfillment[];
}

const REQUIRED_SCENARIO_ORDER_IDS = [
  "ORD-1001",
  "ORD-1002",
  "ORD-1003",
  "ORD-1004",
  "ORD-1005",
  "ORD-1006",
  "ORD-1007",
];

function findDuplicates(ids: string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) duplicates.add(id);
    seen.add(id);
  }
  return [...duplicates];
}

function validateDataset(dataset: Dataset): string[] {
  const errors: string[] = [];
  const {
    products: datasetProducts,
    customers: datasetCustomers,
    orders: datasetOrders,
    payments: datasetPayments,
    inventory: datasetInventory,
    fulfillments: datasetFulfillments,
  } = dataset;

  const productSkus = new Set(datasetProducts.map((p) => p.sku));
  const customerIds = new Set(datasetCustomers.map((c) => c.id));
  const orderIds = new Set(datasetOrders.map((o) => o.id));

  findDuplicates(datasetProducts.map((p) => p.sku)).forEach((sku) =>
    errors.push(`Duplicate product sku: ${sku}`),
  );
  findDuplicates(datasetCustomers.map((c) => c.id)).forEach((id) =>
    errors.push(`Duplicate customer id: ${id}`),
  );
  findDuplicates(datasetOrders.map((o) => o.id)).forEach((id) =>
    errors.push(`Duplicate order id: ${id}`),
  );
  findDuplicates(datasetPayments.map((p) => p.id)).forEach((id) =>
    errors.push(`Duplicate payment id: ${id}`),
  );
  findDuplicates(datasetFulfillments.map((f) => f.id)).forEach((id) =>
    errors.push(`Duplicate fulfillment id: ${id}`),
  );
  findDuplicates(datasetInventory.map((i) => `${i.sku}@${i.warehouse}`)).forEach((key) =>
    errors.push(`Duplicate inventory record for ${key}`),
  );

  for (const order of datasetOrders) {
    if (!order.id || !order.customerId || !order.currency || !order.createdAt) {
      errors.push(`Order ${order.id ?? "<unknown>"} is missing required fields`);
    }
    if (!ORDER_STATUSES.includes(order.status)) {
      errors.push(`Order ${order.id} has invalid status: ${order.status}`);
    }
    if (!customerIds.has(order.customerId)) {
      errors.push(`Order ${order.id} references missing customer ${order.customerId}`);
    }
    if (!order.items || order.items.length === 0) {
      errors.push(`Order ${order.id} has no items`);
    } else {
      for (const orderItem of order.items) {
        if (!productSkus.has(orderItem.sku)) {
          errors.push(`Order ${order.id} references missing product sku ${orderItem.sku}`);
        }
      }
      const computedTotal = order.items.reduce(
        (sum, orderItem) => sum + orderItem.quantity * orderItem.unitPrice,
        0,
      );
      if (computedTotal !== order.totalAmount) {
        errors.push(
          `Order ${order.id} totalAmount (${order.totalAmount}) does not match sum of items (${computedTotal})`,
        );
      }
    }
  }

  const paymentsByOrderId = new Map<string, Payment[]>();
  for (const payment of datasetPayments) {
    if (!PAYMENT_STATUSES.includes(payment.status)) {
      errors.push(`Payment ${payment.id} has invalid status: ${payment.status}`);
    }
    if (!orderIds.has(payment.orderId)) {
      errors.push(`Payment ${payment.id} references missing order ${payment.orderId}`);
    } else {
      const order = datasetOrders.find((o) => o.id === payment.orderId);
      if (order && order.totalAmount !== payment.amount) {
        errors.push(
          `Payment ${payment.id} amount (${payment.amount}) does not match order ${order.id} total (${order.totalAmount})`,
        );
      }
    }
    const bucket = paymentsByOrderId.get(payment.orderId) ?? [];
    bucket.push(payment);
    paymentsByOrderId.set(payment.orderId, bucket);
  }
  for (const order of datasetOrders) {
    const orderPayments = paymentsByOrderId.get(order.id) ?? [];
    if (orderPayments.length !== 1) {
      errors.push(`Order ${order.id} has ${orderPayments.length} payment record(s), expected 1`);
    }
  }

  const fulfillmentsByOrderId = new Map<string, Fulfillment[]>();
  for (const fulfillment of datasetFulfillments) {
    if (!FULFILLMENT_STATUSES.includes(fulfillment.status)) {
      errors.push(`Fulfillment ${fulfillment.id} has invalid status: ${fulfillment.status}`);
    }
    if (!orderIds.has(fulfillment.orderId)) {
      errors.push(`Fulfillment ${fulfillment.id} references missing order ${fulfillment.orderId}`);
    }
    const bucket = fulfillmentsByOrderId.get(fulfillment.orderId) ?? [];
    bucket.push(fulfillment);
    fulfillmentsByOrderId.set(fulfillment.orderId, bucket);
  }
  for (const order of datasetOrders) {
    const orderFulfillments = fulfillmentsByOrderId.get(order.id) ?? [];
    if (orderFulfillments.length !== 1) {
      errors.push(
        `Order ${order.id} has ${orderFulfillments.length} fulfillment record(s), expected 1`,
      );
    }
  }

  for (const record of datasetInventory) {
    if (!productSkus.has(record.sku)) {
      errors.push(`Inventory record references missing product sku ${record.sku}`);
    }
    if (record.available < 0 || record.reserved < 0) {
      errors.push(`Inventory record for ${record.sku}@${record.warehouse} has negative quantity`);
    }
  }

  for (const scenarioId of REQUIRED_SCENARIO_ORDER_IDS) {
    if (!orderIds.has(scenarioId)) {
      errors.push(`Required deterministic scenario order ${scenarioId} is missing`);
    }
  }

  return errors;
}

function loadRealDataset(): Dataset {
  return { products, customers, orders, payments, inventory, fulfillments };
}

describe("dataset invariants", () => {
  it("passes on the real static dataset", () => {
    const errors = validateDataset(loadRealDataset());
    expect(errors).toEqual([]);
  });

  it("fails when an order references a non-existent customer", () => {
    const dataset = loadRealDataset();
    const broken: Dataset = {
      ...dataset,
      orders: dataset.orders.map((order, index) =>
        index === 0 ? { ...order, customerId: "C-DOES-NOT-EXIST" } : order,
      ),
    };
    const errors = validateDataset(broken);
    expect(errors.some((e) => e.includes("missing customer"))).toBe(true);
  });

  it("fails when an order's totalAmount does not match its items", () => {
    const dataset = loadRealDataset();
    const broken: Dataset = {
      ...dataset,
      orders: dataset.orders.map((order, index) =>
        index === 0 ? { ...order, totalAmount: order.totalAmount + 1 } : order,
      ),
    };
    const errors = validateDataset(broken);
    expect(errors.some((e) => e.includes("does not match sum of items"))).toBe(true);
  });

  it("fails when a required deterministic scenario order is missing", () => {
    const dataset = loadRealDataset();
    const broken: Dataset = {
      ...dataset,
      orders: dataset.orders.filter((order) => order.id !== "ORD-1003"),
      payments: dataset.payments.filter((payment) => payment.orderId !== "ORD-1003"),
      fulfillments: dataset.fulfillments.filter((f) => f.orderId !== "ORD-1003"),
    };
    const errors = validateDataset(broken);
    expect(errors.some((e) => e.includes("ORD-1003"))).toBe(true);
  });
});
