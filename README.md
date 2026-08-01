# Commerce Operations MCP

**Status: domain/data foundation plus a working MCP server exposing four
read-only investigation tools, served over both local stdio and remote
Streamable HTTP (hosted on Render). No write/action tool yet — see
"Current limitations".**

**Hosted MCP URL:** `https://e-commerce-mcp.onrender.com/mcp` (Streamable
HTTP, stateless — see "Connecting to the hosted server" below)

Working name: `commerce-ops-mcp` (may change before final delivery).

An AI-native commerce operations investigator focused on delayed-order
investigation, exposed through a remotely hosted MCP server.

## Problem

An operations specialist needs to answer, for a given order: *"why is this
order delayed, and what should I do about it?"* Answering that well often
requires checking payment status, inventory availability, and fulfillment
state — but the product is that one investigation workflow, not standalone
tooling for payments, inventory, or fulfillment.

**Confirmed scope (client-clarified):** a single, focused end-to-end
workflow — delayed-order investigation — is the right level of scope.
Separate coverage of all four commerce domains (orders, payments, inventory,
fulfillment) as independent workflows is explicitly out of scope. The
project intentionally does not provide independent workflows for payments,
inventory, fulfillment, or general order management; those systems are
consulted only as supporting evidence when investigating a delayed order.

## Current scope

This repository implements the backend foundation plus a working MCP server
on top of it:

- Domain types and status enums
- A synthetic, internally consistent commerce dataset (static TypeScript
  modules)
- A repository layer over that dataset
- An `OrderContextService` that composes operational facts (not diagnoses)
  for a given order
- A `DelayDiagnosisService` that applies deterministic rules to those facts
  to identify the likely delay cause
- A `ResolutionService` that maps a diagnosis to recommended next actions
- An MCP server exposing `search_orders`, `get_order_context`,
  `diagnose_order_delay`, and `recommend_resolution` as tools, over two
  transports sharing the same tool registration (`src/mcp/create-server.ts`):
  - `src/mcp/server.ts` — stdio, for local MCP clients (Claude Desktop/Code,
    MCP Inspector)
  - `src/mcp/http.ts` — Streamable HTTP (stateless), deployed remotely on
    Render for AI agents to connect to without any local setup
- Tests covering all of the above

No write/action tool (`create_resolution_ticket`), LLM/agent integration,
database, or frontend exists yet. See `CLAUDE.md` for the explicit scope
boundary and `docs/assumptions.md` / `docs/decisions.md` for what's decided
vs. pending.

## Architecture

```
Synthetic data (src/data/*.ts — static, typed TypeScript modules)
        ↓
Repositories (src/repositories/*.repository.ts)
        ↓
Domain services (order-context.service.ts, delay-diagnosis.service.ts,
                  resolution.service.ts)
        ↓
src/mcp/create-server.ts — search_orders, get_order_context,
                            diagnose_order_delay, recommend_resolution
        ↓                              ↓
src/mcp/server.ts (stdio)   src/mcp/http.ts (Streamable HTTP → Render)
```

Repositories hide the underlying data representation; services and the MCP
tools depend only on repository method signatures, not on how the data is
stored. See `docs/decisions.md` for why static TypeScript modules were
chosen over PostgreSQL, why the MCP tool set stops at four read-only tools
for now, and why the remote transport runs in stateless mode.

## Connecting to the hosted server

No local setup is required to try the deployed workflow — point any MCP
client that supports Streamable HTTP at:

```
https://e-commerce-mcp.onrender.com/mcp
```

For example, with the MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
# then connect with transport "Streamable HTTP" and the URL above
```

The server is stateless and unauthenticated (read-only synthetic data only —
see `docs/decisions.md` for that tradeoff, stated explicitly rather than
left implicit). The `/mcp` endpoint is rate-limited to 60 requests per IP
per minute (in-memory, per-instance — see `docs/decisions.md`) as a basic
abuse guard given the lack of authentication.

## Running locally

```bash
npm install
npm run typecheck
npm test

# stdio transport (for Claude Desktop/Code, MCP Inspector over stdio)
npm run build
npm start

# Streamable HTTP transport (what's deployed to Render)
npm run build
npm run start:http   # listens on $PORT, defaults to 3000
```

Point any MCP client (e.g. `npx @modelcontextprotocol/inspector node
dist/server.js`, or Claude Desktop/Code's MCP config) at `npm start` (from
this directory) to connect over stdio.

## Testing

Tests use [Vitest](https://vitest.dev) and live in `tests/`, mirroring
`src/`:

- `tests/repositories/` — finder methods, including missing-record cases
- `tests/services/` — `OrderContextService` (context composition, including
  the `ORD-1003` inventory-shortage case), `DelayDiagnosisService` (all
  seven scenario orders map to their expected category), and
  `ResolutionService`
- `tests/data/` — cross-record invariant checks (foreign keys, order
  totals, one-record-per-order cardinality, required scenario orders) run
  against the real dataset and against deliberately broken copies of it —
  checks TypeScript's structural typing can't express on its own

## Synthetic data

`src/data/` contains 18 products, 15 customers, 50 orders, and their
corresponding payments/inventory/fulfillment records — all synthetic,
INR-priced, `.test`-domain emails, `MockPay` as the fake payment provider.
Each entity is a static, typed TypeScript module (e.g. `src/data/orders.ts`)
rather than a JSON file; the dataset was generated once and is now
finalized and hand-editable in place — see `docs/decisions.md`.

Seven orders (`ORD-1001`–`ORD-1007`) are deterministic, hand-crafted
scenarios representing known operational situations (payment failure,
inventory shortage, fulfillment delay, etc.) — see
`docs/test-scenarios.md` for the full table.

## Current limitations

- No write/action tool (`create_resolution_ticket`) — read-only investigation,
  diagnosis, and recommendation only.
- No persistence beyond static TypeScript modules; no database.
- No authentication/authorization on the hosted HTTP endpoint — deliberate
  and disclosed, not an oversight; see `docs/decisions.md`. Acceptable here
  because the tool set is read-only and the data is synthetic; would need
  revisiting before any real data touched this server. Mitigated in part by
  a per-IP rate limit (60 req/min, in-memory) on `/mcp`, but that limits
  abuse per-instance only, not a substitute for real auth.
- No real external integrations of any kind.

## Future stages

Not yet built, and out of scope for this submission: one controlled,
confirmation-gated write action (`create_resolution_ticket`), and
authentication on the hosted endpoint if this ever handled real data. See
`CLAUDE.md` and `docs/decisions.md` / `docs/assumptions.md` for what's
confirmed vs. still open.
