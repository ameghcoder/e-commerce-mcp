import type { DelayDiagnosis, DelayDiagnosisCategory } from "./delay-diagnosis.service.js";
import { DelayDiagnosisService } from "./delay-diagnosis.service.js";

export interface ResolutionRecommendation {
  orderId: string;
  diagnosis: DelayDiagnosis;
  recommendedActions: string[];
}

const ACTIONS_BY_CATEGORY: Record<DelayDiagnosisCategory, string[]> = {
  no_issue: ["No action needed — order is progressing normally."],
  cancelled: ["No action needed — order was cancelled; confirm refund (if any) has settled."],
  payment_issue: [
    "Contact the customer to retry or update their payment method.",
    "Do not release inventory or schedule fulfillment until payment succeeds.",
  ],
  inventory_shortage: [
    "Check incoming restock ETA for the affected SKU(s) with the warehouse.",
    "Offer the customer a restock wait, partial shipment, or substitute item.",
  ],
  fulfillment_delay: [
    "Escalate to the fulfillment/warehouse team to find out why processing stalled.",
    "Proactively notify the customer of the delay with a revised ETA.",
  ],
  fulfillment_failure: [
    "Investigate the carrier handoff failure with the fulfillment team.",
    "Re-attempt fulfillment or issue a refund if it can't be re-attempted.",
  ],
  unknown: ["Escalate for manual review — no deterministic rule matched this order's state."],
};

/**
 * Maps a deterministic delay diagnosis to recommended next actions. Kept as
 * a fixed lookup table (not an LLM call) per the project's principle of
 * using explicit rules wherever the problem allows it.
 */
export class ResolutionService {
  constructor(
    private readonly delayDiagnosisService: DelayDiagnosisService = new DelayDiagnosisService(),
  ) {}

  recommend(orderId: string): ResolutionRecommendation | null {
    const diagnosis = this.delayDiagnosisService.diagnose(orderId);
    if (!diagnosis) return null;
    return {
      orderId,
      diagnosis,
      recommendedActions: ACTIONS_BY_CATEGORY[diagnosis.category],
    };
  }
}
