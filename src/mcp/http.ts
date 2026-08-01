import { createMcpExpressApp } from "@modelcontextprotocol/sdk/server/express.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { rateLimit } from "express-rate-limit";
import { createServer } from "./create-server.js";

const PORT = Number(process.env.PORT) || 3000;
const allowedHosts = process.env.MCP_ALLOWED_HOSTS?.split(",").map((host) => host.trim());

const app = createMcpExpressApp({ host: "0.0.0.0", allowedHosts });

// Render sits in front of this service as a single reverse-proxy hop, so the
// real client IP arrives via X-Forwarded-For. Trusting only that one hop
// (rather than `true`, which would trust the whole chain) is what lets the
// rate limiter below key on actual client IPs instead of the proxy's — see
// docs/decisions.md.
app.set("trust proxy", 1);

// Endpoint has no authentication (see docs/decisions.md), so an in-memory,
// per-IP rate limit is the minimum abuse guard for the unauthenticated,
// publicly reachable /mcp endpoint. No Redis/external store — a single
// process's in-memory counters are sufficient for this deployment's single
// free-tier instance; see docs/decisions.md for the tradeoff if this ever
// scales to multiple instances.
const mcpRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    jsonrpc: "2.0",
    error: { code: -32000, message: "Too many requests. Please slow down and try again shortly." },
    id: null,
  },
});

app.use("/mcp", mcpRateLimiter);

app.get("/", (_req, res) => {
  res.json({ name: "commerce-ops-mcp", status: "ok" });
});

// Stateless mode: a fresh server + transport per request. This tool set is
// read-only and has no server-initiated notifications or cross-request
// session state, so there's nothing a persistent session would buy us —
// see docs/decisions.md.
app.post("/mcp", async (req, res) => {
  try {
    const server = createServer();
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
    res.on("close", () => {
      transport.close();
      server.close();
    });
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error("Error handling MCP request:", error);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: "2.0",
        error: { code: -32603, message: "Internal server error" },
        id: null,
      });
    }
  }
});

const methodNotAllowed = (_req: unknown, res: import("express").Response) => {
  res.status(405).json({
    jsonrpc: "2.0",
    error: { code: -32000, message: "Method not allowed. This server only supports stateless POST /mcp." },
    id: null,
  });
};

app.get("/mcp", methodNotAllowed);
app.delete("/mcp", methodNotAllowed);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`commerce-ops-mcp HTTP server listening on port ${PORT}`);
});
