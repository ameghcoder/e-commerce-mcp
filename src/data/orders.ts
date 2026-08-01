import type { Order } from "../domain/types.js";

export const orders = [
  {
    "id": "ORD-1001",
    "customerId": "C-001",
    "status": "completed",
    "items": [
      {
        "sku": "P-001",
        "quantity": 2,
        "unitPrice": 799
      },
      {
        "sku": "P-003",
        "quantity": 1,
        "unitPrice": 299
      }
    ],
    "totalAmount": 1897,
    "currency": "INR",
    "createdAt": "2026-06-01T10:15:00.000Z"
  },
  {
    "id": "ORD-1002",
    "customerId": "C-002",
    "status": "failed",
    "items": [
      {
        "sku": "P-002",
        "quantity": 1,
        "unitPrice": 3499
      }
    ],
    "totalAmount": 3499,
    "currency": "INR",
    "createdAt": "2026-06-02T09:00:00.000Z"
  },
  {
    "id": "ORD-1003",
    "customerId": "C-003",
    "status": "processing",
    "items": [
      {
        "sku": "P-004",
        "quantity": 3,
        "unitPrice": 2499
      }
    ],
    "totalAmount": 7497,
    "currency": "INR",
    "createdAt": "2026-06-03T11:30:00.000Z"
  },
  {
    "id": "ORD-1004",
    "customerId": "C-004",
    "status": "processing",
    "items": [
      {
        "sku": "P-005",
        "quantity": 1,
        "unitPrice": 1299
      },
      {
        "sku": "P-010",
        "quantity": 2,
        "unitPrice": 249
      }
    ],
    "totalAmount": 1797,
    "currency": "INR",
    "createdAt": "2026-06-04T08:00:00.000Z"
  },
  {
    "id": "ORD-1005",
    "customerId": "C-005",
    "status": "processing",
    "items": [
      {
        "sku": "P-008",
        "quantity": 1,
        "unitPrice": 2999
      }
    ],
    "totalAmount": 2999,
    "currency": "INR",
    "createdAt": "2026-06-05T13:00:00.000Z"
  },
  {
    "id": "ORD-1006",
    "customerId": "C-006",
    "status": "cancelled",
    "items": [
      {
        "sku": "P-014",
        "quantity": 2,
        "unitPrice": 399
      }
    ],
    "totalAmount": 798,
    "currency": "INR",
    "createdAt": "2026-06-06T15:00:00.000Z"
  },
  {
    "id": "ORD-1007",
    "customerId": "C-007",
    "status": "processing",
    "items": [
      {
        "sku": "P-016",
        "quantity": 5,
        "unitPrice": 649
      }
    ],
    "totalAmount": 3245,
    "currency": "INR",
    "createdAt": "2026-06-07T10:00:00.000Z"
  },
  {
    "id": "ORD-1008",
    "customerId": "C-010",
    "status": "completed",
    "items": [
      {
        "sku": "P-016",
        "quantity": 3,
        "unitPrice": 649
      },
      {
        "sku": "P-004",
        "quantity": 2,
        "unitPrice": 2499
      }
    ],
    "totalAmount": 6945,
    "currency": "INR",
    "createdAt": "2026-05-01T09:00:00.000Z"
  },
  {
    "id": "ORD-1009",
    "customerId": "C-010",
    "status": "processing",
    "items": [
      {
        "sku": "P-009",
        "quantity": 1,
        "unitPrice": 349
      },
      {
        "sku": "P-016",
        "quantity": 3,
        "unitPrice": 649
      },
      {
        "sku": "P-006",
        "quantity": 1,
        "unitPrice": 599
      }
    ],
    "totalAmount": 2895,
    "currency": "INR",
    "createdAt": "2026-05-02T09:00:00.000Z"
  },
  {
    "id": "ORD-1010",
    "customerId": "C-011",
    "status": "processing",
    "items": [
      {
        "sku": "P-001",
        "quantity": 2,
        "unitPrice": 799
      },
      {
        "sku": "P-016",
        "quantity": 1,
        "unitPrice": 649
      }
    ],
    "totalAmount": 2247,
    "currency": "INR",
    "createdAt": "2026-05-03T09:00:00.000Z"
  },
  {
    "id": "ORD-1011",
    "customerId": "C-001",
    "status": "cancelled",
    "items": [
      {
        "sku": "P-002",
        "quantity": 1,
        "unitPrice": 3499
      }
    ],
    "totalAmount": 3499,
    "currency": "INR",
    "createdAt": "2026-05-04T09:00:00.000Z"
  },
  {
    "id": "ORD-1012",
    "customerId": "C-008",
    "status": "processing",
    "items": [
      {
        "sku": "P-004",
        "quantity": 3,
        "unitPrice": 2499
      }
    ],
    "totalAmount": 7497,
    "currency": "INR",
    "createdAt": "2026-05-05T09:00:00.000Z"
  },
  {
    "id": "ORD-1013",
    "customerId": "C-013",
    "status": "completed",
    "items": [
      {
        "sku": "P-009",
        "quantity": 1,
        "unitPrice": 349
      }
    ],
    "totalAmount": 349,
    "currency": "INR",
    "createdAt": "2026-05-06T09:00:00.000Z"
  },
  {
    "id": "ORD-1014",
    "customerId": "C-009",
    "status": "pending",
    "items": [
      {
        "sku": "P-005",
        "quantity": 2,
        "unitPrice": 1299
      },
      {
        "sku": "P-004",
        "quantity": 1,
        "unitPrice": 2499
      }
    ],
    "totalAmount": 5097,
    "currency": "INR",
    "createdAt": "2026-05-07T09:00:00.000Z"
  },
  {
    "id": "ORD-1015",
    "customerId": "C-013",
    "status": "pending",
    "items": [
      {
        "sku": "P-004",
        "quantity": 1,
        "unitPrice": 2499
      },
      {
        "sku": "P-006",
        "quantity": 1,
        "unitPrice": 599
      }
    ],
    "totalAmount": 3098,
    "currency": "INR",
    "createdAt": "2026-05-08T09:00:00.000Z"
  },
  {
    "id": "ORD-1016",
    "customerId": "C-011",
    "status": "completed",
    "items": [
      {
        "sku": "P-017",
        "quantity": 1,
        "unitPrice": 299
      },
      {
        "sku": "P-008",
        "quantity": 3,
        "unitPrice": 2999
      },
      {
        "sku": "P-003",
        "quantity": 1,
        "unitPrice": 299
      }
    ],
    "totalAmount": 9595,
    "currency": "INR",
    "createdAt": "2026-05-09T09:00:00.000Z"
  },
  {
    "id": "ORD-1017",
    "customerId": "C-006",
    "status": "failed",
    "items": [
      {
        "sku": "P-012",
        "quantity": 3,
        "unitPrice": 899
      },
      {
        "sku": "P-002",
        "quantity": 3,
        "unitPrice": 3499
      }
    ],
    "totalAmount": 13194,
    "currency": "INR",
    "createdAt": "2026-05-10T09:00:00.000Z"
  },
  {
    "id": "ORD-1018",
    "customerId": "C-005",
    "status": "failed",
    "items": [
      {
        "sku": "P-004",
        "quantity": 2,
        "unitPrice": 2499
      },
      {
        "sku": "P-015",
        "quantity": 1,
        "unitPrice": 249
      },
      {
        "sku": "P-018",
        "quantity": 2,
        "unitPrice": 799
      }
    ],
    "totalAmount": 6845,
    "currency": "INR",
    "createdAt": "2026-05-11T09:00:00.000Z"
  },
  {
    "id": "ORD-1019",
    "customerId": "C-007",
    "status": "completed",
    "items": [
      {
        "sku": "P-007",
        "quantity": 2,
        "unitPrice": 1799
      },
      {
        "sku": "P-006",
        "quantity": 3,
        "unitPrice": 599
      }
    ],
    "totalAmount": 5395,
    "currency": "INR",
    "createdAt": "2026-05-12T09:00:00.000Z"
  },
  {
    "id": "ORD-1020",
    "customerId": "C-007",
    "status": "completed",
    "items": [
      {
        "sku": "P-013",
        "quantity": 3,
        "unitPrice": 1999
      },
      {
        "sku": "P-017",
        "quantity": 2,
        "unitPrice": 299
      },
      {
        "sku": "P-010",
        "quantity": 1,
        "unitPrice": 249
      }
    ],
    "totalAmount": 6844,
    "currency": "INR",
    "createdAt": "2026-05-13T09:00:00.000Z"
  },
  {
    "id": "ORD-1021",
    "customerId": "C-011",
    "status": "completed",
    "items": [
      {
        "sku": "P-015",
        "quantity": 3,
        "unitPrice": 249
      }
    ],
    "totalAmount": 747,
    "currency": "INR",
    "createdAt": "2026-05-14T09:00:00.000Z"
  },
  {
    "id": "ORD-1022",
    "customerId": "C-008",
    "status": "processing",
    "items": [
      {
        "sku": "P-003",
        "quantity": 3,
        "unitPrice": 299
      },
      {
        "sku": "P-004",
        "quantity": 3,
        "unitPrice": 2499
      },
      {
        "sku": "P-013",
        "quantity": 1,
        "unitPrice": 1999
      }
    ],
    "totalAmount": 10393,
    "currency": "INR",
    "createdAt": "2026-05-15T09:00:00.000Z"
  },
  {
    "id": "ORD-1023",
    "customerId": "C-003",
    "status": "completed",
    "items": [
      {
        "sku": "P-007",
        "quantity": 1,
        "unitPrice": 1799
      },
      {
        "sku": "P-012",
        "quantity": 3,
        "unitPrice": 899
      }
    ],
    "totalAmount": 4496,
    "currency": "INR",
    "createdAt": "2026-05-16T09:00:00.000Z"
  },
  {
    "id": "ORD-1024",
    "customerId": "C-012",
    "status": "pending",
    "items": [
      {
        "sku": "P-003",
        "quantity": 3,
        "unitPrice": 299
      },
      {
        "sku": "P-007",
        "quantity": 1,
        "unitPrice": 1799
      }
    ],
    "totalAmount": 2696,
    "currency": "INR",
    "createdAt": "2026-05-17T09:00:00.000Z"
  },
  {
    "id": "ORD-1025",
    "customerId": "C-010",
    "status": "pending",
    "items": [
      {
        "sku": "P-017",
        "quantity": 1,
        "unitPrice": 299
      },
      {
        "sku": "P-011",
        "quantity": 2,
        "unitPrice": 1499
      },
      {
        "sku": "P-004",
        "quantity": 1,
        "unitPrice": 2499
      }
    ],
    "totalAmount": 5796,
    "currency": "INR",
    "createdAt": "2026-05-18T09:00:00.000Z"
  },
  {
    "id": "ORD-1026",
    "customerId": "C-011",
    "status": "completed",
    "items": [
      {
        "sku": "P-005",
        "quantity": 2,
        "unitPrice": 1299
      }
    ],
    "totalAmount": 2598,
    "currency": "INR",
    "createdAt": "2026-05-19T09:00:00.000Z"
  },
  {
    "id": "ORD-1027",
    "customerId": "C-004",
    "status": "processing",
    "items": [
      {
        "sku": "P-011",
        "quantity": 3,
        "unitPrice": 1499
      },
      {
        "sku": "P-003",
        "quantity": 1,
        "unitPrice": 299
      },
      {
        "sku": "P-006",
        "quantity": 2,
        "unitPrice": 599
      }
    ],
    "totalAmount": 5994,
    "currency": "INR",
    "createdAt": "2026-05-20T09:00:00.000Z"
  },
  {
    "id": "ORD-1028",
    "customerId": "C-007",
    "status": "processing",
    "items": [
      {
        "sku": "P-008",
        "quantity": 2,
        "unitPrice": 2999
      },
      {
        "sku": "P-017",
        "quantity": 1,
        "unitPrice": 299
      },
      {
        "sku": "P-009",
        "quantity": 2,
        "unitPrice": 349
      }
    ],
    "totalAmount": 6995,
    "currency": "INR",
    "createdAt": "2026-05-21T09:00:00.000Z"
  },
  {
    "id": "ORD-1029",
    "customerId": "C-009",
    "status": "completed",
    "items": [
      {
        "sku": "P-006",
        "quantity": 1,
        "unitPrice": 599
      }
    ],
    "totalAmount": 599,
    "currency": "INR",
    "createdAt": "2026-05-22T09:00:00.000Z"
  },
  {
    "id": "ORD-1030",
    "customerId": "C-011",
    "status": "completed",
    "items": [
      {
        "sku": "P-004",
        "quantity": 3,
        "unitPrice": 2499
      }
    ],
    "totalAmount": 7497,
    "currency": "INR",
    "createdAt": "2026-05-23T09:00:00.000Z"
  },
  {
    "id": "ORD-1031",
    "customerId": "C-002",
    "status": "completed",
    "items": [
      {
        "sku": "P-001",
        "quantity": 2,
        "unitPrice": 799
      }
    ],
    "totalAmount": 1598,
    "currency": "INR",
    "createdAt": "2026-05-24T09:00:00.000Z"
  },
  {
    "id": "ORD-1032",
    "customerId": "C-008",
    "status": "completed",
    "items": [
      {
        "sku": "P-013",
        "quantity": 3,
        "unitPrice": 1999
      },
      {
        "sku": "P-015",
        "quantity": 2,
        "unitPrice": 249
      }
    ],
    "totalAmount": 6495,
    "currency": "INR",
    "createdAt": "2026-05-25T09:00:00.000Z"
  },
  {
    "id": "ORD-1033",
    "customerId": "C-014",
    "status": "processing",
    "items": [
      {
        "sku": "P-016",
        "quantity": 3,
        "unitPrice": 649
      },
      {
        "sku": "P-009",
        "quantity": 1,
        "unitPrice": 349
      }
    ],
    "totalAmount": 2296,
    "currency": "INR",
    "createdAt": "2026-05-26T09:00:00.000Z"
  },
  {
    "id": "ORD-1034",
    "customerId": "C-013",
    "status": "failed",
    "items": [
      {
        "sku": "P-008",
        "quantity": 2,
        "unitPrice": 2999
      }
    ],
    "totalAmount": 5998,
    "currency": "INR",
    "createdAt": "2026-05-27T09:00:00.000Z"
  },
  {
    "id": "ORD-1035",
    "customerId": "C-008",
    "status": "pending",
    "items": [
      {
        "sku": "P-016",
        "quantity": 3,
        "unitPrice": 649
      },
      {
        "sku": "P-001",
        "quantity": 1,
        "unitPrice": 799
      },
      {
        "sku": "P-004",
        "quantity": 2,
        "unitPrice": 2499
      }
    ],
    "totalAmount": 7744,
    "currency": "INR",
    "createdAt": "2026-05-28T09:00:00.000Z"
  },
  {
    "id": "ORD-1036",
    "customerId": "C-012",
    "status": "processing",
    "items": [
      {
        "sku": "P-015",
        "quantity": 2,
        "unitPrice": 249
      },
      {
        "sku": "P-016",
        "quantity": 3,
        "unitPrice": 649
      },
      {
        "sku": "P-011",
        "quantity": 2,
        "unitPrice": 1499
      }
    ],
    "totalAmount": 5443,
    "currency": "INR",
    "createdAt": "2026-05-29T09:00:00.000Z"
  },
  {
    "id": "ORD-1037",
    "customerId": "C-014",
    "status": "completed",
    "items": [
      {
        "sku": "P-007",
        "quantity": 3,
        "unitPrice": 1799
      },
      {
        "sku": "P-012",
        "quantity": 1,
        "unitPrice": 899
      },
      {
        "sku": "P-016",
        "quantity": 1,
        "unitPrice": 649
      }
    ],
    "totalAmount": 6945,
    "currency": "INR",
    "createdAt": "2026-05-30T09:00:00.000Z"
  },
  {
    "id": "ORD-1038",
    "customerId": "C-001",
    "status": "failed",
    "items": [
      {
        "sku": "P-012",
        "quantity": 3,
        "unitPrice": 899
      }
    ],
    "totalAmount": 2697,
    "currency": "INR",
    "createdAt": "2026-05-31T09:00:00.000Z"
  },
  {
    "id": "ORD-1039",
    "customerId": "C-014",
    "status": "completed",
    "items": [
      {
        "sku": "P-013",
        "quantity": 1,
        "unitPrice": 1999
      },
      {
        "sku": "P-005",
        "quantity": 1,
        "unitPrice": 1299
      }
    ],
    "totalAmount": 3298,
    "currency": "INR",
    "createdAt": "2026-06-01T09:00:00.000Z"
  },
  {
    "id": "ORD-1040",
    "customerId": "C-005",
    "status": "completed",
    "items": [
      {
        "sku": "P-011",
        "quantity": 3,
        "unitPrice": 1499
      },
      {
        "sku": "P-015",
        "quantity": 3,
        "unitPrice": 249
      }
    ],
    "totalAmount": 5244,
    "currency": "INR",
    "createdAt": "2026-06-02T09:00:00.000Z"
  },
  {
    "id": "ORD-1041",
    "customerId": "C-010",
    "status": "completed",
    "items": [
      {
        "sku": "P-008",
        "quantity": 2,
        "unitPrice": 2999
      },
      {
        "sku": "P-009",
        "quantity": 2,
        "unitPrice": 349
      }
    ],
    "totalAmount": 6696,
    "currency": "INR",
    "createdAt": "2026-06-03T09:00:00.000Z"
  },
  {
    "id": "ORD-1042",
    "customerId": "C-005",
    "status": "processing",
    "items": [
      {
        "sku": "P-010",
        "quantity": 1,
        "unitPrice": 249
      }
    ],
    "totalAmount": 249,
    "currency": "INR",
    "createdAt": "2026-06-04T09:00:00.000Z"
  },
  {
    "id": "ORD-1043",
    "customerId": "C-009",
    "status": "failed",
    "items": [
      {
        "sku": "P-008",
        "quantity": 1,
        "unitPrice": 2999
      },
      {
        "sku": "P-001",
        "quantity": 1,
        "unitPrice": 799
      }
    ],
    "totalAmount": 3798,
    "currency": "INR",
    "createdAt": "2026-06-05T09:00:00.000Z"
  },
  {
    "id": "ORD-1044",
    "customerId": "C-002",
    "status": "pending",
    "items": [
      {
        "sku": "P-008",
        "quantity": 2,
        "unitPrice": 2999
      },
      {
        "sku": "P-002",
        "quantity": 3,
        "unitPrice": 3499
      },
      {
        "sku": "P-007",
        "quantity": 1,
        "unitPrice": 1799
      }
    ],
    "totalAmount": 18294,
    "currency": "INR",
    "createdAt": "2026-06-06T09:00:00.000Z"
  },
  {
    "id": "ORD-1045",
    "customerId": "C-009",
    "status": "pending",
    "items": [
      {
        "sku": "P-018",
        "quantity": 3,
        "unitPrice": 799
      }
    ],
    "totalAmount": 2397,
    "currency": "INR",
    "createdAt": "2026-06-07T09:00:00.000Z"
  },
  {
    "id": "ORD-1046",
    "customerId": "C-012",
    "status": "completed",
    "items": [
      {
        "sku": "P-015",
        "quantity": 2,
        "unitPrice": 249
      },
      {
        "sku": "P-004",
        "quantity": 1,
        "unitPrice": 2499
      }
    ],
    "totalAmount": 2997,
    "currency": "INR",
    "createdAt": "2026-06-08T09:00:00.000Z"
  },
  {
    "id": "ORD-1047",
    "customerId": "C-001",
    "status": "processing",
    "items": [
      {
        "sku": "P-013",
        "quantity": 3,
        "unitPrice": 1999
      }
    ],
    "totalAmount": 5997,
    "currency": "INR",
    "createdAt": "2026-06-09T09:00:00.000Z"
  },
  {
    "id": "ORD-1048",
    "customerId": "C-015",
    "status": "completed",
    "items": [
      {
        "sku": "P-008",
        "quantity": 2,
        "unitPrice": 2999
      }
    ],
    "totalAmount": 5998,
    "currency": "INR",
    "createdAt": "2026-06-10T09:00:00.000Z"
  },
  {
    "id": "ORD-1049",
    "customerId": "C-013",
    "status": "processing",
    "items": [
      {
        "sku": "P-004",
        "quantity": 3,
        "unitPrice": 2499
      },
      {
        "sku": "P-018",
        "quantity": 1,
        "unitPrice": 799
      }
    ],
    "totalAmount": 8296,
    "currency": "INR",
    "createdAt": "2026-06-11T09:00:00.000Z"
  },
  {
    "id": "ORD-1050",
    "customerId": "C-013",
    "status": "processing",
    "items": [
      {
        "sku": "P-013",
        "quantity": 2,
        "unitPrice": 1999
      },
      {
        "sku": "P-015",
        "quantity": 1,
        "unitPrice": 249
      },
      {
        "sku": "P-009",
        "quantity": 3,
        "unitPrice": 349
      }
    ],
    "totalAmount": 5294,
    "currency": "INR",
    "createdAt": "2026-06-12T09:00:00.000Z"
  }
] satisfies Order[];
