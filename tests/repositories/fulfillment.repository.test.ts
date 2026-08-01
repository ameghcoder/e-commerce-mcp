import { describe, expect, it } from "vitest";
import { FulfillmentRepository } from "../../src/repositories/fulfillment.repository.js";

describe("FulfillmentRepository", () => {
  const repository = new FulfillmentRepository();

  it("finds the fulfillment for a known order", () => {
    const fulfillment = repository.findByOrderId("ORD-1005");
    expect(fulfillment).not.toBeNull();
    expect(fulfillment?.status).toBe("failed");
  });

  it("returns null when no fulfillment exists for the order", () => {
    expect(repository.findByOrderId("ORD-9999")).toBeNull();
  });
});
