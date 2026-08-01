import type { Fulfillment } from "../domain/types.js";
import { fulfillments } from "../data/fulfillments.js";

export class FulfillmentRepository {
  findByOrderId(orderId: string): Fulfillment | null {
    return fulfillments.find((fulfillment) => fulfillment.orderId === orderId) ?? null;
  }

  findMany(): Fulfillment[] {
    return fulfillments;
  }
}
