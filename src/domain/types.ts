import type { FulfillmentStatus, OrderStatus, PaymentStatus } from "./enums.js";

export interface Product {
  sku: string;
  name: string;
  category: string;
  price: number;
  currency: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
}

export interface OrderItem {
  sku: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  customerId: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  currency: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  orderId: string;
  status: PaymentStatus;
  amount: number;
  currency: string;
  provider: string;
  createdAt: string;
}

export interface InventoryRecord {
  sku: string;
  warehouse: string;
  available: number;
  reserved: number;
}

export interface Fulfillment {
  id: string;
  orderId: string;
  warehouse: string;
  status: FulfillmentStatus;
  trackingNumber?: string;
  updatedAt: string;
}
