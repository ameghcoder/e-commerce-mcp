import { describe, expect, it } from "vitest";
import { DelayDiagnosisService } from "../../src/services/delay-diagnosis.service.js";

describe("DelayDiagnosisService", () => {
  const service = new DelayDiagnosisService();

  it("returns null for a missing order", () => {
    expect(service.diagnose("ORD-9999")).toBeNull();
  });

  it.each([
    ["ORD-1001", "no_issue"],
    ["ORD-1002", "payment_issue"],
    ["ORD-1003", "inventory_shortage"],
    ["ORD-1004", "fulfillment_delay"],
    ["ORD-1005", "fulfillment_failure"],
    ["ORD-1006", "cancelled"],
    ["ORD-1007", "inventory_shortage"],
  ] as const)("diagnoses %s as %s", (orderId, expectedCategory) => {
    const diagnosis = service.diagnose(orderId);
    expect(diagnosis?.category).toBe(expectedCategory);
    expect(diagnosis?.evidence.length).toBeGreaterThan(0);
  });
});
