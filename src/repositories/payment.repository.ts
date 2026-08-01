import type { Payment } from "../domain/types.js";
import { payments } from "../data/payments.js";

export class PaymentRepository {
  findByOrderId(orderId: string): Payment | null {
    return payments.find((payment) => payment.orderId === orderId) ?? null;
  }

  findMany(): Payment[] {
    return payments;
  }
}
