import { describe, expect, it } from "vitest";
import { InventoryRepository } from "../../src/repositories/inventory.repository.js";

describe("InventoryRepository", () => {
  const repository = new InventoryRepository();

  it("finds inventory records by sku", () => {
    const records = repository.findBySku("P-004");
    expect(records.length).toBeGreaterThan(0);
    expect(records[0].available).toBe(0);
  });

  it("returns an empty array for an unknown sku", () => {
    expect(repository.findBySku("P-999")).toEqual([]);
  });
});
