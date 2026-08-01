import { describe, expect, it } from "vitest";
import { OrderRepository } from "../../src/repositories/order.repository.js";

describe("OrderRepository", () => {
  const repository = new OrderRepository();

  it("finds a known order by id", () => {
    const order = repository.findById("ORD-1001");
    expect(order).not.toBeNull();
    expect(order?.status).toBe("completed");
  });

  it("returns null for a missing order", () => {
    expect(repository.findById("ORD-9999")).toBeNull();
  });

  it("filters by status", () => {
    const cancelled = repository.findMany({ status: "cancelled" });
    expect(cancelled.length).toBeGreaterThan(0);
    expect(cancelled.every((order) => order.status === "cancelled")).toBe(true);
  });

  it("filters by customerId", () => {
    const orders = repository.findMany({ customerId: "C-001" });
    expect(orders.every((order) => order.customerId === "C-001")).toBe(true);
  });
});
