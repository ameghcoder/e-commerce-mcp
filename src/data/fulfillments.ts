import type { Fulfillment } from "../domain/types.js";

export const fulfillments = [
  {
    "id": "FUL-1001",
    "orderId": "ORD-1001",
    "warehouse": "WH-NORTH",
    "status": "delivered",
    "trackingNumber": "TRK-1001-01",
    "updatedAt": "2026-06-04T12:00:00.000Z"
  },
  {
    "id": "FUL-1002",
    "orderId": "ORD-1002",
    "warehouse": "WH-SOUTH",
    "status": "pending",
    "updatedAt": "2026-06-02T09:01:00.000Z"
  },
  {
    "id": "FUL-1003",
    "orderId": "ORD-1003",
    "warehouse": "WH-SOUTH",
    "status": "waiting_inventory",
    "updatedAt": "2026-06-03T12:00:00.000Z"
  },
  {
    "id": "FUL-1004",
    "orderId": "ORD-1004",
    "warehouse": "WH-NORTH",
    "status": "processing",
    "updatedAt": "2026-06-05T08:00:00.000Z"
  },
  {
    "id": "FUL-1005",
    "orderId": "ORD-1005",
    "warehouse": "WH-SOUTH",
    "status": "failed",
    "updatedAt": "2026-06-06T09:00:00.000Z"
  },
  {
    "id": "FUL-1006",
    "orderId": "ORD-1006",
    "warehouse": "WH-SOUTH",
    "status": "cancelled",
    "updatedAt": "2026-06-06T15:30:00.000Z"
  },
  {
    "id": "FUL-1007",
    "orderId": "ORD-1007",
    "warehouse": "WH-SOUTH",
    "status": "waiting_inventory",
    "updatedAt": "2026-06-07T11:00:00.000Z"
  },
  {
    "id": "FUL-1008",
    "orderId": "ORD-1008",
    "warehouse": "WH-SOUTH",
    "status": "delivered",
    "trackingNumber": "TRK-1008-01",
    "updatedAt": "2026-05-01T11:00:00.000Z"
  },
  {
    "id": "FUL-1009",
    "orderId": "ORD-1009",
    "warehouse": "WH-NORTH",
    "status": "processing",
    "updatedAt": "2026-05-02T11:00:00.000Z"
  },
  {
    "id": "FUL-1010",
    "orderId": "ORD-1010",
    "warehouse": "WH-NORTH",
    "status": "shipped",
    "trackingNumber": "TRK-1010-01",
    "updatedAt": "2026-05-03T11:00:00.000Z"
  },
  {
    "id": "FUL-1011",
    "orderId": "ORD-1011",
    "warehouse": "WH-SOUTH",
    "status": "cancelled",
    "updatedAt": "2026-05-04T11:00:00.000Z"
  },
  {
    "id": "FUL-1012",
    "orderId": "ORD-1012",
    "warehouse": "WH-SOUTH",
    "status": "shipped",
    "trackingNumber": "TRK-1012-01",
    "updatedAt": "2026-05-05T11:00:00.000Z"
  },
  {
    "id": "FUL-1013",
    "orderId": "ORD-1013",
    "warehouse": "WH-NORTH",
    "status": "delivered",
    "trackingNumber": "TRK-1013-01",
    "updatedAt": "2026-05-06T11:00:00.000Z"
  },
  {
    "id": "FUL-1014",
    "orderId": "ORD-1014",
    "warehouse": "WH-NORTH",
    "status": "pending",
    "updatedAt": "2026-05-07T11:00:00.000Z"
  },
  {
    "id": "FUL-1015",
    "orderId": "ORD-1015",
    "warehouse": "WH-SOUTH",
    "status": "pending",
    "updatedAt": "2026-05-08T11:00:00.000Z"
  },
  {
    "id": "FUL-1016",
    "orderId": "ORD-1016",
    "warehouse": "WH-NORTH",
    "status": "delivered",
    "trackingNumber": "TRK-1016-01",
    "updatedAt": "2026-05-09T11:00:00.000Z"
  },
  {
    "id": "FUL-1017",
    "orderId": "ORD-1017",
    "warehouse": "WH-SOUTH",
    "status": "pending",
    "updatedAt": "2026-05-10T11:00:00.000Z"
  },
  {
    "id": "FUL-1018",
    "orderId": "ORD-1018",
    "warehouse": "WH-SOUTH",
    "status": "pending",
    "updatedAt": "2026-05-11T11:00:00.000Z"
  },
  {
    "id": "FUL-1019",
    "orderId": "ORD-1019",
    "warehouse": "WH-NORTH",
    "status": "delivered",
    "trackingNumber": "TRK-1019-01",
    "updatedAt": "2026-05-12T11:00:00.000Z"
  },
  {
    "id": "FUL-1020",
    "orderId": "ORD-1020",
    "warehouse": "WH-NORTH",
    "status": "delivered",
    "trackingNumber": "TRK-1020-01",
    "updatedAt": "2026-05-13T11:00:00.000Z"
  },
  {
    "id": "FUL-1021",
    "orderId": "ORD-1021",
    "warehouse": "WH-NORTH",
    "status": "delivered",
    "trackingNumber": "TRK-1021-01",
    "updatedAt": "2026-05-14T11:00:00.000Z"
  },
  {
    "id": "FUL-1022",
    "orderId": "ORD-1022",
    "warehouse": "WH-NORTH",
    "status": "shipped",
    "trackingNumber": "TRK-1022-01",
    "updatedAt": "2026-05-15T11:00:00.000Z"
  },
  {
    "id": "FUL-1023",
    "orderId": "ORD-1023",
    "warehouse": "WH-NORTH",
    "status": "delivered",
    "trackingNumber": "TRK-1023-01",
    "updatedAt": "2026-05-16T11:00:00.000Z"
  },
  {
    "id": "FUL-1024",
    "orderId": "ORD-1024",
    "warehouse": "WH-NORTH",
    "status": "pending",
    "updatedAt": "2026-05-17T11:00:00.000Z"
  },
  {
    "id": "FUL-1025",
    "orderId": "ORD-1025",
    "warehouse": "WH-NORTH",
    "status": "pending",
    "updatedAt": "2026-05-18T11:00:00.000Z"
  },
  {
    "id": "FUL-1026",
    "orderId": "ORD-1026",
    "warehouse": "WH-NORTH",
    "status": "delivered",
    "trackingNumber": "TRK-1026-01",
    "updatedAt": "2026-05-19T11:00:00.000Z"
  },
  {
    "id": "FUL-1027",
    "orderId": "ORD-1027",
    "warehouse": "WH-NORTH",
    "status": "processing",
    "updatedAt": "2026-05-20T11:00:00.000Z"
  },
  {
    "id": "FUL-1028",
    "orderId": "ORD-1028",
    "warehouse": "WH-SOUTH",
    "status": "shipped",
    "trackingNumber": "TRK-1028-01",
    "updatedAt": "2026-05-21T11:00:00.000Z"
  },
  {
    "id": "FUL-1029",
    "orderId": "ORD-1029",
    "warehouse": "WH-SOUTH",
    "status": "delivered",
    "trackingNumber": "TRK-1029-01",
    "updatedAt": "2026-05-22T11:00:00.000Z"
  },
  {
    "id": "FUL-1030",
    "orderId": "ORD-1030",
    "warehouse": "WH-SOUTH",
    "status": "delivered",
    "trackingNumber": "TRK-1030-01",
    "updatedAt": "2026-05-23T11:00:00.000Z"
  },
  {
    "id": "FUL-1031",
    "orderId": "ORD-1031",
    "warehouse": "WH-NORTH",
    "status": "delivered",
    "trackingNumber": "TRK-1031-01",
    "updatedAt": "2026-05-24T11:00:00.000Z"
  },
  {
    "id": "FUL-1032",
    "orderId": "ORD-1032",
    "warehouse": "WH-NORTH",
    "status": "delivered",
    "trackingNumber": "TRK-1032-01",
    "updatedAt": "2026-05-25T11:00:00.000Z"
  },
  {
    "id": "FUL-1033",
    "orderId": "ORD-1033",
    "warehouse": "WH-SOUTH",
    "status": "processing",
    "updatedAt": "2026-05-26T11:00:00.000Z"
  },
  {
    "id": "FUL-1034",
    "orderId": "ORD-1034",
    "warehouse": "WH-SOUTH",
    "status": "pending",
    "updatedAt": "2026-05-27T11:00:00.000Z"
  },
  {
    "id": "FUL-1035",
    "orderId": "ORD-1035",
    "warehouse": "WH-SOUTH",
    "status": "pending",
    "updatedAt": "2026-05-28T11:00:00.000Z"
  },
  {
    "id": "FUL-1036",
    "orderId": "ORD-1036",
    "warehouse": "WH-NORTH",
    "status": "shipped",
    "trackingNumber": "TRK-1036-01",
    "updatedAt": "2026-05-29T11:00:00.000Z"
  },
  {
    "id": "FUL-1037",
    "orderId": "ORD-1037",
    "warehouse": "WH-NORTH",
    "status": "delivered",
    "trackingNumber": "TRK-1037-01",
    "updatedAt": "2026-05-30T11:00:00.000Z"
  },
  {
    "id": "FUL-1038",
    "orderId": "ORD-1038",
    "warehouse": "WH-SOUTH",
    "status": "pending",
    "updatedAt": "2026-05-31T11:00:00.000Z"
  },
  {
    "id": "FUL-1039",
    "orderId": "ORD-1039",
    "warehouse": "WH-NORTH",
    "status": "delivered",
    "trackingNumber": "TRK-1039-01",
    "updatedAt": "2026-06-01T11:00:00.000Z"
  },
  {
    "id": "FUL-1040",
    "orderId": "ORD-1040",
    "warehouse": "WH-NORTH",
    "status": "delivered",
    "trackingNumber": "TRK-1040-01",
    "updatedAt": "2026-06-02T11:00:00.000Z"
  },
  {
    "id": "FUL-1041",
    "orderId": "ORD-1041",
    "warehouse": "WH-SOUTH",
    "status": "delivered",
    "trackingNumber": "TRK-1041-01",
    "updatedAt": "2026-06-03T11:00:00.000Z"
  },
  {
    "id": "FUL-1042",
    "orderId": "ORD-1042",
    "warehouse": "WH-SOUTH",
    "status": "shipped",
    "trackingNumber": "TRK-1042-01",
    "updatedAt": "2026-06-04T11:00:00.000Z"
  },
  {
    "id": "FUL-1043",
    "orderId": "ORD-1043",
    "warehouse": "WH-SOUTH",
    "status": "pending",
    "updatedAt": "2026-06-05T11:00:00.000Z"
  },
  {
    "id": "FUL-1044",
    "orderId": "ORD-1044",
    "warehouse": "WH-SOUTH",
    "status": "pending",
    "updatedAt": "2026-06-06T11:00:00.000Z"
  },
  {
    "id": "FUL-1045",
    "orderId": "ORD-1045",
    "warehouse": "WH-SOUTH",
    "status": "pending",
    "updatedAt": "2026-06-07T11:00:00.000Z"
  },
  {
    "id": "FUL-1046",
    "orderId": "ORD-1046",
    "warehouse": "WH-NORTH",
    "status": "delivered",
    "trackingNumber": "TRK-1046-01",
    "updatedAt": "2026-06-08T11:00:00.000Z"
  },
  {
    "id": "FUL-1047",
    "orderId": "ORD-1047",
    "warehouse": "WH-NORTH",
    "status": "processing",
    "updatedAt": "2026-06-09T11:00:00.000Z"
  },
  {
    "id": "FUL-1048",
    "orderId": "ORD-1048",
    "warehouse": "WH-SOUTH",
    "status": "delivered",
    "trackingNumber": "TRK-1048-01",
    "updatedAt": "2026-06-10T11:00:00.000Z"
  },
  {
    "id": "FUL-1049",
    "orderId": "ORD-1049",
    "warehouse": "WH-SOUTH",
    "status": "processing",
    "updatedAt": "2026-06-11T11:00:00.000Z"
  },
  {
    "id": "FUL-1050",
    "orderId": "ORD-1050",
    "warehouse": "WH-NORTH",
    "status": "shipped",
    "trackingNumber": "TRK-1050-01",
    "updatedAt": "2026-06-12T11:00:00.000Z"
  }
] satisfies Fulfillment[];
