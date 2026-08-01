import { describe, expect, it } from "vitest";
import { ProductRepository } from "../../src/repositories/product.repository.js";

describe("ProductRepository", () => {
  const repository = new ProductRepository();

  it("finds a known product by sku", () => {
    const product = repository.findBySku("P-001");
    expect(product).not.toBeNull();
    expect(product?.sku).toBe("P-001");
  });

  it("returns null for an unknown sku", () => {
    expect(repository.findBySku("P-9999")).toBeNull();
  });
});
