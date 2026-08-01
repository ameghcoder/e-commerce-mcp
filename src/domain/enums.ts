export const ORDER_STATUSES = [
  "pending",
  "processing",
  "completed",
  "cancelled",
  "failed",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const PAYMENT_STATUSES = ["pending", "paid", "failed", "refunded"] as const;

export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export const FULFILLMENT_STATUSES = [
  "pending",
  "processing",
  "waiting_inventory",
  "shipped",
  "delivered",
  "failed",
  "cancelled",
] as const;

export type FulfillmentStatus = (typeof FULFILLMENT_STATUSES)[number];
