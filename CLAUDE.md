# CLAUDE.md — commerce-ops-mcp

This project opts out of the reviewer-first default: Claude is expected to
implement directly here, within the scope rules below.

## Project purpose

This is a take-home engineering assignment: an AI-first commerce operations
challenge. The final solution is a remotely hosted MCP server, written in
TypeScript, that lets an AI agent investigate commerce problems on behalf of
an operations specialist.

## Confirmed scope

**The client has confirmed the product scope.** This is no longer a
hypothesis:

> A single focused end-to-end workflow is the right level of scope. Separate
> coverage of all four commerce domains (orders, payments, inventory,
> fulfillment) as independent workflows is explicitly out of scope.

The chosen workflow is **delayed-order investigation**: given an order, an
operations specialist (via an AI agent) asks *"why is this order delayed,
and what should I do about it?"*, and the MCP provides the evidence,
diagnosis, and recommended resolution to answer that.

Order, payment, inventory, and fulfillment data all remain relevant — but
strictly as **supporting evidence for this one workflow**, never as
independent domains with their own tools or CRUD surface. Think
"delayed-order investigation MCP," not "orders MCP + payments MCP +
inventory MCP + fulfillment MCP."

## Scope rule

Do not implement separate workflows or tool surfaces for:

- payments (beyond what's needed to explain a delay)
- inventory (beyond what's needed to explain a delay)
- fulfillment (beyond what's needed to explain a delay)
- generic/full order management (search and read for investigation only —
  not creation, editing, or lifecycle management of orders)

If a feature would only make sense as its own domain workflow (e.g., "list
all payment failures across all orders" as a payments-ops feature, unrelated
to investigating one delayed order), it is out of scope. Name it as a
possible future extension instead of building it.

## Current stage

The domain/data foundation and the MCP server are both done, over two
transports: `src/mcp/server.ts` (stdio, local) and `src/mcp/http.ts`
(Streamable HTTP, stateless, remote — deployed to Render). Both share tool
registration from `src/mcp/create-server.ts`, so the four tools are
identical regardless of transport.

`create_resolution_ticket` (a write/action tool) is **not** implemented —
`docs/assumptions.md` already flagged whether any write capability belongs
in the final deliverable as an open, unconfirmed question, so it stays a
named future extension rather than something built under time pressure.

## Architecture

```
Synthetic data (src/data/*.ts — static, hand-editable TypeScript modules)
        ↓
Repositories (src/repositories/)
        ↓
Services (src/services/) — OrderContextService, DelayDiagnosisService,
                            ResolutionService
        ↓
src/mcp/create-server.ts — search_orders, get_order_context,
                            diagnose_order_delay, recommend_resolution
        ↓                              ↓
src/mcp/server.ts (stdio)   src/mcp/http.ts (Streamable HTTP, remote)
```

MCP tools depend on services, never directly on data modules or repository
internals.

## Engineering principles

- Prefer simple solutions over frameworks or generic abstractions.
- Avoid premature abstractions — no `BaseRepository<T>` /
  `GenericRepository<T>`; each repository stays a small, specific class.
- Avoid unnecessary dependencies or infrastructure (no PostgreSQL, no RAG /
  vector database, no Docker beyond what local setup truly requires).
- Keep domain logic deterministic where the problem can be reliably solved
  with explicit rules — don't reach for an LLM by default (e.g., delay
  diagnosis is a good candidate for deterministic rules, not a model call).
- Keep services testable in isolation from I/O.
- Keep MCP concerns (once built) separate from domain logic.
- Keep persistence behind repositories.
- Validate synthetic data's cross-record invariants (foreign keys, totals,
  one-record-per-order) in `tests/data/dataset-invariants.test.ts` — these
  are checks TypeScript's structural typing cannot express on its own.
- Never use real customer data or production credentials.

## AI coding principles

Before significant implementation:

1. Inspect existing code and understand the existing architecture.
2. State the intended change briefly.
3. Make the smallest change that satisfies the confirmed scope.
4. Reuse existing abstractions; avoid duplicate ones.
5. Run `npm run typecheck`.
6. Run `npm test` (includes `tests/data/dataset-invariants.test.ts`, which
   re-checks the dataset's cross-record invariants — run this whenever
   `src/data/*.ts` changes).
7. Report what changed and what was verified.
8. Mention any remaining uncertainty rather than silently deciding it.

If a potential feature is outside the confirmed delayed-order-investigation
workflow, do not implement it — mention it as a possible future extension
instead. Do not blindly rewrite existing files or "clean up" unrelated code
while making a focused change.

## Security rules

Never commit secrets, production credentials, real payment provider calls,
real customer information, or real API keys. Never put secrets in data
files. If environment variables are ever needed, add `.env.example` only
(never a real `.env`) and ensure `.gitignore` excludes `.env`.
