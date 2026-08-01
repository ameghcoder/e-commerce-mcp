import { describe, expect, it } from "vitest";
import { PaymentRepository } from "../../src/repositories/payment.repository.js";

describe("PaymentRepository", () => {
  const repository = new PaymentRepository();

  it("finds the payment for a known order", () => {
    const payment = repository.findByOrderId("ORD-1002");
    expect(payment).not.toBeNull();
    expect(payment?.status).toBe("failed");
  });

  it("returns null when no payment exists for the order", () => {
    expect(repository.findByOrderId("ORD-9999")).toBeNull();
  });
});
