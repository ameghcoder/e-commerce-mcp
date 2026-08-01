import { describe, expect, it } from "vitest";
import { OrderContextService } from "../../src/services/order-context.service.js";

describe("OrderContextService", () => {
  const service = new OrderContextService();

  it("returns null for a missing order", () => {
    expect(service.getOrderContext("ORD-9999")).toBeNull();
  });

  it("composes the inventory shortage evidence for ORD-1003", () => {
    const context = service.getOrderContext("ORD-1003");
    expect(context).not.toBeNull();
    expect(context?.order.status).toBe("processing");
    expect(context?.customer.id).toBe("C-003");
    expect(context?.payment?.status).toBe("paid");
    expect(context?.fulfillment?.status).toBe("waiting_inventory");

    const shortSku = context?.items.find((i) => i.sku === "P-004");
    expect(shortSku?.quantity).toBe(3);

    const inventoryForSku = context?.inventory.find((i) => i.sku === "P-004");
    expect(inventoryForSku?.available).toBe(0);
    expect(inventoryForSku).toBeDefined();
    expect((inventoryForSku?.available ?? 0) < (shortSku?.quantity ?? 0)).toBe(true);
  });

  it("composes a normal completed order without shortage signals for ORD-1001", () => {
    const context = service.getOrderContext("ORD-1001");
    expect(context?.order.status).toBe("completed");
    expect(context?.payment?.status).toBe("paid");
    expect(context?.fulfillment?.status).toBe("delivered");
    for (const item of context?.items ?? []) {
      const stock = context?.inventory.find((i) => i.sku === item.sku);
      expect((stock?.available ?? 0) >= item.quantity).toBe(true);
    }
  });
});
