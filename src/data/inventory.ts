import type { InventoryRecord } from "../domain/types.js";

export const inventory = [
  {
    "sku": "P-001",
    "warehouse": "WH-NORTH",
    "available": 46,
    "reserved": 6
  },
  {
    "sku": "P-002",
    "warehouse": "WH-SOUTH",
    "available": 40,
    "reserved": 10
  },
  {
    "sku": "P-003",
    "warehouse": "WH-NORTH",
    "available": 60,
    "reserved": 8
  },
  {
    "sku": "P-004",
    "warehouse": "WH-SOUTH",
    "available": 0,
    "reserved": 3
  },
  {
    "sku": "P-005",
    "warehouse": "WH-NORTH",
    "available": 29,
    "reserved": 6
  },
  {
    "sku": "P-006",
    "warehouse": "WH-SOUTH",
    "available": 45,
    "reserved": 9
  },
  {
    "sku": "P-007",
    "warehouse": "WH-NORTH",
    "available": 32,
    "reserved": 9
  },
  {
    "sku": "P-008",
    "warehouse": "WH-SOUTH",
    "available": 29,
    "reserved": 9
  },
  {
    "sku": "P-009",
    "warehouse": "WH-NORTH",
    "available": 34,
    "reserved": 3
  },
  {
    "sku": "P-010",
    "warehouse": "WH-SOUTH",
    "available": 39,
    "reserved": 9
  },
  {
    "sku": "P-011",
    "warehouse": "WH-NORTH",
    "available": 43,
    "reserved": 9
  },
  {
    "sku": "P-012",
    "warehouse": "WH-SOUTH",
    "available": 46,
    "reserved": 1
  },
  {
    "sku": "P-013",
    "warehouse": "WH-NORTH",
    "available": 28,
    "reserved": 10
  },
  {
    "sku": "P-014",
    "warehouse": "WH-SOUTH",
    "available": 37,
    "reserved": 3
  },
  {
    "sku": "P-015",
    "warehouse": "WH-NORTH",
    "available": 44,
    "reserved": 8
  },
  {
    "sku": "P-016",
    "warehouse": "WH-SOUTH",
    "available": 2,
    "reserved": 5
  },
  {
    "sku": "P-017",
    "warehouse": "WH-NORTH",
    "available": 48,
    "reserved": 7
  },
  {
    "sku": "P-018",
    "warehouse": "WH-SOUTH",
    "available": 23,
    "reserved": 9
  }
] satisfies InventoryRecord[];
