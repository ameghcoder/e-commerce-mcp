import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { ORDER_STATUSES } from "../domain/enums.js";
import { OrderRepository } from "../repositories/order.repository.js";
import { OrderContextService } from "../services/order-context.service.js";
import { DelayDiagnosisService } from "../services/delay-diagnosis.service.js";
import { ResolutionService } from "../services/resolution.service.js";

const orderRepository = new OrderRepository();
const orderContextService = new OrderContextService();
const delayDiagnosisService = new DelayDiagnosisService();
const resolutionService = new ResolutionService();

function jsonResult(data: unknown) {
  return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
}

function notFoundResult(orderId: string) {
  return {
    content: [{ type: "text" as const, text: `No order found with id ${orderId}` }],
    isError: true,
  };
}

export function createServer(): McpServer {
  const server = new McpServer({ name: "commerce-ops-mcp", version: "0.1.0" });

  server.registerTool(
    "search_orders",
    {
      title: "Search orders",
      description:
        "Find candidate orders to investigate, optionally filtered by status and/or customer id. Read-only lookup — not general order management.",
      inputSchema: {
        status: z.enum(ORDER_STATUSES).optional(),
        customerId: z.string().optional(),
      },
    },
    async ({ status, customerId }) => {
      const orders = orderRepository.findMany({ status, customerId });
      return jsonResult(orders);
    },
  );

  server.registerTool(
    "get_order_context",
    {
      title: "Get order context",
      description:
        "Gather the operational facts for one order — order, customer, payment, items+product, inventory, fulfillment — as evidence for investigating why it may be delayed. Returns facts only, no diagnosis.",
      inputSchema: {
        orderId: z.string(),
      },
    },
    async ({ orderId }) => {
      const context = orderContextService.getOrderContext(orderId);
      if (!context) return notFoundResult(orderId);
      return jsonResult(context);
    },
  );

  server.registerTool(
    "diagnose_order_delay",
    {
      title: "Diagnose order delay",
      description:
        "Apply deterministic rules to an order's context to identify the most likely cause of a delay (payment issue, inventory shortage, fulfillment delay/failure, cancelled, or no issue), with supporting evidence.",
      inputSchema: {
        orderId: z.string(),
      },
    },
    async ({ orderId }) => {
      const diagnosis = delayDiagnosisService.diagnose(orderId);
      if (!diagnosis) return notFoundResult(orderId);
      return jsonResult(diagnosis);
    },
  );

  server.registerTool(
    "recommend_resolution",
    {
      title: "Recommend resolution",
      description:
        "Diagnose an order's delay and return recommended next actions for an operations specialist to take.",
      inputSchema: {
        orderId: z.string(),
      },
    },
    async ({ orderId }) => {
      const recommendation = resolutionService.recommend(orderId);
      if (!recommendation) return notFoundResult(orderId);
      return jsonResult(recommendation);
    },
  );

  return server;
}
