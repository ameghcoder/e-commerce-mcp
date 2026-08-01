import { OrderContextService } from "./order-context.service.js";
import type { OrderContext } from "./order-context.service.js";

export const DELAY_DIAGNOSIS_CATEGORIES = [
  "no_issue",
  "cancelled",
  "payment_issue",
  "inventory_shortage",
  "fulfillment_delay",
  "fulfillment_failure",
  "unknown",
] as const;

export type DelayDiagnosisCategory = (typeof DELAY_DIAGNOSIS_CATEGORIES)[number];

export interface DelayDiagnosis {
  orderId: string;
  category: DelayDiagnosisCategory;
  summary: string;
  evidence: string[];
}

const STALLED_PROCESSING_MS = 12 * 60 * 60 * 1000;

/**
 * Deterministic rule engine over OrderContext facts. Rule order matters —
 * cancellation and payment problems are checked before inventory/fulfillment
 * because they explain a delay regardless of downstream state (e.g. a
 * cancelled order with released inventory should read as "cancelled", not
 * "no issue").
 */
export class DelayDiagnosisService {
  constructor(
    private readonly orderContextService: OrderContextService = new OrderContextService(),
  ) {}

  diagnose(orderId: string): DelayDiagnosis | null {
    const context = this.orderContextService.getOrderContext(orderId);
    if (!context) return null;
    return this.diagnoseContext(context);
  }

  private diagnoseContext(context: OrderContext): DelayDiagnosis {
    const { order, payment, fulfillment } = context;
    const orderId = order.id;

    if (order.status === "cancelled" || fulfillment?.status === "cancelled") {
      return {
        orderId,
        category: "cancelled",
        summary: "Order was cancelled; no further action needed.",
        evidence: [
          `order.status = ${order.status}`,
          `payment.status = ${payment?.status ?? "none"}`,
          `fulfillment.status = ${fulfillment?.status ?? "none"}`,
        ],
      };
    }

    if (!payment || payment.status === "failed") {
      return {
        orderId,
        category: "payment_issue",
        summary: payment
          ? "Payment failed; fulfillment cannot proceed until payment succeeds."
          : "No payment record exists for this order.",
        evidence: [
          `payment.status = ${payment?.status ?? "none"}`,
          `fulfillment.status = ${fulfillment?.status ?? "none"}`,
        ],
      };
    }

    if (payment.status === "pending") {
      return {
        orderId,
        category: "payment_issue",
        summary: "Payment is still pending; fulfillment is blocked until it clears.",
        evidence: [`payment.status = ${payment.status}`],
      };
    }

    const shortages = this.findInventoryShortages(context);
    if (shortages.length > 0) {
      return {
        orderId,
        category: "inventory_shortage",
        summary: "One or more items don't have enough available stock to fulfill the order.",
        evidence: shortages,
      };
    }

    if (fulfillment?.status === "failed") {
      return {
        orderId,
        category: "fulfillment_failure",
        summary: "Fulfillment failed outright (e.g. failed handoff to carrier).",
        evidence: [`fulfillment.status = ${fulfillment.status}`],
      };
    }

    if (fulfillment?.status === "waiting_inventory") {
      return {
        orderId,
        category: "inventory_shortage",
        summary: "Fulfillment is blocked waiting on inventory.",
        evidence: [`fulfillment.status = ${fulfillment.status}`],
      };
    }

    if (fulfillment?.status === "processing" && this.isStalled(order.createdAt, fulfillment.updatedAt)) {
      return {
        orderId,
        category: "fulfillment_delay",
        summary: "Fulfillment has been stuck in processing well past a normal turnaround time.",
        evidence: [
          `fulfillment.status = ${fulfillment.status}`,
          `order.createdAt = ${order.createdAt}`,
          `fulfillment.updatedAt = ${fulfillment.updatedAt}`,
        ],
      };
    }

    if (fulfillment?.status === "shipped" || fulfillment?.status === "delivered") {
      return {
        orderId,
        category: "no_issue",
        summary: "Payment succeeded and fulfillment is progressing normally.",
        evidence: [`payment.status = ${payment.status}`, `fulfillment.status = ${fulfillment.status}`],
      };
    }

    return {
      orderId,
      category: "unknown",
      summary: "No known rule matched this order's current state; needs manual review.",
      evidence: [
        `order.status = ${order.status}`,
        `payment.status = ${payment.status}`,
        `fulfillment.status = ${fulfillment?.status ?? "none"}`,
      ],
    };
  }

  private findInventoryShortages(context: OrderContext): string[] {
    const evidence: string[] = [];
    for (const item of context.items) {
      const availableForSku = context.inventory
        .filter((record) => record.sku === item.sku)
        .reduce((sum, record) => sum + record.available, 0);
      if (availableForSku < item.quantity) {
        evidence.push(
          `sku ${item.sku}: needs ${item.quantity}, only ${availableForSku} available`,
        );
      }
    }
    return evidence;
  }

  private isStalled(createdAt: string, updatedAt: string): boolean {
    return new Date(updatedAt).getTime() - new Date(createdAt).getTime() > STALLED_PROCESSING_MS;
  }
}
