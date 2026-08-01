import { describe, expect, it } from "vitest";
import { ResolutionService } from "../../src/services/resolution.service.js";

describe("ResolutionService", () => {
  const service = new ResolutionService();

  it("returns null for a missing order", () => {
    expect(service.recommend("ORD-9999")).toBeNull();
  });

  it("recommends payment-retry actions for a payment-failure order", () => {
    const recommendation = service.recommend("ORD-1002");
    expect(recommendation?.diagnosis.category).toBe("payment_issue");
    expect(recommendation?.recommendedActions.length).toBeGreaterThan(0);
  });

  it("recommends restock/substitute actions for an inventory-shortage order", () => {
    const recommendation = service.recommend("ORD-1003");
    expect(recommendation?.diagnosis.category).toBe("inventory_shortage");
    expect(recommendation?.recommendedActions.join(" ")).toMatch(/restock|substitute/i);
  });
});
