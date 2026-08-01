import type { InventoryRecord } from "../domain/types.js";
import { inventory } from "../data/inventory.js";

export class InventoryRepository {
  findBySku(sku: string): InventoryRecord[] {
    return inventory.filter((record) => record.sku === sku);
  }

  findMany(): InventoryRecord[] {
    return inventory;
  }
}
