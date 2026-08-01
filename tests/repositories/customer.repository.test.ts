import { describe, expect, it } from "vitest";
import { CustomerRepository } from "../../src/repositories/customer.repository.js";

describe("CustomerRepository", () => {
  const repository = new CustomerRepository();

  it("finds a known customer by id", () => {
    const customer = repository.findById("C-001");
    expect(customer).not.toBeNull();
    expect(customer?.id).toBe("C-001");
  });

  it("returns null for an unknown customer id", () => {
    expect(repository.findById("C-9999")).toBeNull();
  });
});
