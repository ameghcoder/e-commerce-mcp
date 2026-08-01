import type { OrderStatus } from "../domain/enums.js";
import type { Order } from "../domain/types.js";
import { orders } from "../data/orders.js";

export interface OrderFilters {
  status?: OrderStatus;
  customerId?: string;
}

export class OrderRepository {
  findById(id: string): Order | null {
    return orders.find((order) => order.id === id) ?? null;
  }

  findMany(filters?: OrderFilters): Order[] {
    if (!filters) return orders;
    return orders.filter((order) => {
      if (filters.status && order.status !== filters.status) return false;
      if (filters.customerId && order.customerId !== filters.customerId) return false;
      return true;
    });
  }
}
