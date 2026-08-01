import type {
  Customer,
  Fulfillment,
  InventoryRecord,
  Order,
  OrderItem,
  Payment,
  Product,
} from "../domain/types.js";
import { CustomerRepository } from "../repositories/customer.repository.js";
import { FulfillmentRepository } from "../repositories/fulfillment.repository.js";
import { InventoryRepository } from "../repositories/inventory.repository.js";
import { OrderRepository } from "../repositories/order.repository.js";
import { PaymentRepository } from "../repositories/payment.repository.js";
import { ProductRepository } from "../repositories/product.repository.js";

export interface OrderContextItem extends OrderItem {
  product: Product | null;
}

export interface OrderContext {
  order: Order;
  customer: Customer;
  payment: Payment | null;
  items: OrderContextItem[];
  inventory: InventoryRecord[];
  fulfillment: Fulfillment | null;
}

/**
 * Collects the reliable operational facts for an order across commerce
 * systems (order, customer, payment, inventory, fulfillment). It does not
 * diagnose or interpret those facts — that reasoning belongs to a later,
 * AI-facing layer once product scope is confirmed.
 */
export class OrderContextService {
  constructor(
    private readonly orderRepository: OrderRepository = new OrderRepository(),
    private readonly customerRepository: CustomerRepository = new CustomerRepository(),
    private readonly paymentRepository: PaymentRepository = new PaymentRepository(),
    private readonly productRepository: ProductRepository = new ProductRepository(),
    private readonly inventoryRepository: InventoryRepository = new InventoryRepository(),
    private readonly fulfillmentRepository: FulfillmentRepository = new FulfillmentRepository(),
  ) {}

  getOrderContext(orderId: string): OrderContext | null {
    const order = this.orderRepository.findById(orderId);
    if (!order) return null;

    const customer = this.customerRepository.findById(order.customerId);
    if (!customer) {
      throw new Error(`Order ${orderId} references missing customer ${order.customerId}`);
    }

    const payment = this.paymentRepository.findByOrderId(orderId);
    const fulfillment = this.fulfillmentRepository.findByOrderId(orderId);

    const items: OrderContextItem[] = order.items.map((orderItem) => ({
      ...orderItem,
      product: this.productRepository.findBySku(orderItem.sku),
    }));

    const inventory = order.items.flatMap((orderItem) =>
      this.inventoryRepository.findBySku(orderItem.sku),
    );

    return { order, customer, payment, items, inventory, fulfillment };
  }
}
