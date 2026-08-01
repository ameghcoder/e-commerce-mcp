import type { Payment } from "../domain/types.js";

export const payments = [
  {
    "id": "PAY-1001",
    "orderId": "ORD-1001",
    "status": "paid",
    "amount": 1897,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-06-01T10:16:00.000Z"
  },
  {
    "id": "PAY-1002",
    "orderId": "ORD-1002",
    "status": "failed",
    "amount": 3499,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-06-02T09:01:00.000Z"
  },
  {
    "id": "PAY-1003",
    "orderId": "ORD-1003",
    "status": "paid",
    "amount": 7497,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-06-03T11:31:00.000Z"
  },
  {
    "id": "PAY-1004",
    "orderId": "ORD-1004",
    "status": "paid",
    "amount": 1797,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-06-04T08:01:00.000Z"
  },
  {
    "id": "PAY-1005",
    "orderId": "ORD-1005",
    "status": "paid",
    "amount": 2999,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-06-05T13:01:00.000Z"
  },
  {
    "id": "PAY-1006",
    "orderId": "ORD-1006",
    "status": "refunded",
    "amount": 798,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-06-06T15:30:00.000Z"
  },
  {
    "id": "PAY-1007",
    "orderId": "ORD-1007",
    "status": "paid",
    "amount": 3245,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-06-07T10:01:00.000Z"
  },
  {
    "id": "PAY-1008",
    "orderId": "ORD-1008",
    "status": "paid",
    "amount": 6945,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-05-01T09:05:00.000Z"
  },
  {
    "id": "PAY-1009",
    "orderId": "ORD-1009",
    "status": "paid",
    "amount": 2895,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-05-02T09:05:00.000Z"
  },
  {
    "id": "PAY-1010",
    "orderId": "ORD-1010",
    "status": "paid",
    "amount": 2247,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-05-03T09:05:00.000Z"
  },
  {
    "id": "PAY-1011",
    "orderId": "ORD-1011",
    "status": "refunded",
    "amount": 3499,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-05-04T09:05:00.000Z"
  },
  {
    "id": "PAY-1012",
    "orderId": "ORD-1012",
    "status": "paid",
    "amount": 7497,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-05-05T09:05:00.000Z"
  },
  {
    "id": "PAY-1013",
    "orderId": "ORD-1013",
    "status": "paid",
    "amount": 349,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-05-06T09:05:00.000Z"
  },
  {
    "id": "PAY-1014",
    "orderId": "ORD-1014",
    "status": "pending",
    "amount": 5097,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-05-07T09:05:00.000Z"
  },
  {
    "id": "PAY-1015",
    "orderId": "ORD-1015",
    "status": "pending",
    "amount": 3098,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-05-08T09:05:00.000Z"
  },
  {
    "id": "PAY-1016",
    "orderId": "ORD-1016",
    "status": "paid",
    "amount": 9595,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-05-09T09:05:00.000Z"
  },
  {
    "id": "PAY-1017",
    "orderId": "ORD-1017",
    "status": "failed",
    "amount": 13194,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-05-10T09:05:00.000Z"
  },
  {
    "id": "PAY-1018",
    "orderId": "ORD-1018",
    "status": "failed",
    "amount": 6845,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-05-11T09:05:00.000Z"
  },
  {
    "id": "PAY-1019",
    "orderId": "ORD-1019",
    "status": "paid",
    "amount": 5395,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-05-12T09:05:00.000Z"
  },
  {
    "id": "PAY-1020",
    "orderId": "ORD-1020",
    "status": "paid",
    "amount": 6844,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-05-13T09:05:00.000Z"
  },
  {
    "id": "PAY-1021",
    "orderId": "ORD-1021",
    "status": "paid",
    "amount": 747,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-05-14T09:05:00.000Z"
  },
  {
    "id": "PAY-1022",
    "orderId": "ORD-1022",
    "status": "paid",
    "amount": 10393,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-05-15T09:05:00.000Z"
  },
  {
    "id": "PAY-1023",
    "orderId": "ORD-1023",
    "status": "paid",
    "amount": 4496,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-05-16T09:05:00.000Z"
  },
  {
    "id": "PAY-1024",
    "orderId": "ORD-1024",
    "status": "pending",
    "amount": 2696,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-05-17T09:05:00.000Z"
  },
  {
    "id": "PAY-1025",
    "orderId": "ORD-1025",
    "status": "pending",
    "amount": 5796,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-05-18T09:05:00.000Z"
  },
  {
    "id": "PAY-1026",
    "orderId": "ORD-1026",
    "status": "paid",
    "amount": 2598,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-05-19T09:05:00.000Z"
  },
  {
    "id": "PAY-1027",
    "orderId": "ORD-1027",
    "status": "paid",
    "amount": 5994,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-05-20T09:05:00.000Z"
  },
  {
    "id": "PAY-1028",
    "orderId": "ORD-1028",
    "status": "paid",
    "amount": 6995,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-05-21T09:05:00.000Z"
  },
  {
    "id": "PAY-1029",
    "orderId": "ORD-1029",
    "status": "paid",
    "amount": 599,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-05-22T09:05:00.000Z"
  },
  {
    "id": "PAY-1030",
    "orderId": "ORD-1030",
    "status": "paid",
    "amount": 7497,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-05-23T09:05:00.000Z"
  },
  {
    "id": "PAY-1031",
    "orderId": "ORD-1031",
    "status": "paid",
    "amount": 1598,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-05-24T09:05:00.000Z"
  },
  {
    "id": "PAY-1032",
    "orderId": "ORD-1032",
    "status": "paid",
    "amount": 6495,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-05-25T09:05:00.000Z"
  },
  {
    "id": "PAY-1033",
    "orderId": "ORD-1033",
    "status": "paid",
    "amount": 2296,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-05-26T09:05:00.000Z"
  },
  {
    "id": "PAY-1034",
    "orderId": "ORD-1034",
    "status": "failed",
    "amount": 5998,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-05-27T09:05:00.000Z"
  },
  {
    "id": "PAY-1035",
    "orderId": "ORD-1035",
    "status": "pending",
    "amount": 7744,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-05-28T09:05:00.000Z"
  },
  {
    "id": "PAY-1036",
    "orderId": "ORD-1036",
    "status": "paid",
    "amount": 5443,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-05-29T09:05:00.000Z"
  },
  {
    "id": "PAY-1037",
    "orderId": "ORD-1037",
    "status": "paid",
    "amount": 6945,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-05-30T09:05:00.000Z"
  },
  {
    "id": "PAY-1038",
    "orderId": "ORD-1038",
    "status": "failed",
    "amount": 2697,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-05-31T09:05:00.000Z"
  },
  {
    "id": "PAY-1039",
    "orderId": "ORD-1039",
    "status": "paid",
    "amount": 3298,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-06-01T09:05:00.000Z"
  },
  {
    "id": "PAY-1040",
    "orderId": "ORD-1040",
    "status": "paid",
    "amount": 5244,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-06-02T09:05:00.000Z"
  },
  {
    "id": "PAY-1041",
    "orderId": "ORD-1041",
    "status": "paid",
    "amount": 6696,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-06-03T09:05:00.000Z"
  },
  {
    "id": "PAY-1042",
    "orderId": "ORD-1042",
    "status": "paid",
    "amount": 249,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-06-04T09:05:00.000Z"
  },
  {
    "id": "PAY-1043",
    "orderId": "ORD-1043",
    "status": "failed",
    "amount": 3798,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-06-05T09:05:00.000Z"
  },
  {
    "id": "PAY-1044",
    "orderId": "ORD-1044",
    "status": "pending",
    "amount": 18294,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-06-06T09:05:00.000Z"
  },
  {
    "id": "PAY-1045",
    "orderId": "ORD-1045",
    "status": "pending",
    "amount": 2397,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-06-07T09:05:00.000Z"
  },
  {
    "id": "PAY-1046",
    "orderId": "ORD-1046",
    "status": "paid",
    "amount": 2997,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-06-08T09:05:00.000Z"
  },
  {
    "id": "PAY-1047",
    "orderId": "ORD-1047",
    "status": "paid",
    "amount": 5997,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-06-09T09:05:00.000Z"
  },
  {
    "id": "PAY-1048",
    "orderId": "ORD-1048",
    "status": "paid",
    "amount": 5998,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-06-10T09:05:00.000Z"
  },
  {
    "id": "PAY-1049",
    "orderId": "ORD-1049",
    "status": "paid",
    "amount": 8296,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-06-11T09:05:00.000Z"
  },
  {
    "id": "PAY-1050",
    "orderId": "ORD-1050",
    "status": "paid",
    "amount": 5294,
    "currency": "INR",
    "provider": "MockPay",
    "createdAt": "2026-06-12T09:05:00.000Z"
  }
] satisfies Payment[];
