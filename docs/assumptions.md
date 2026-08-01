# Assumptions

The most significant scope ambiguity has been resolved by the client — see
`docs/decisions.md` for the confirmed scope. What remains here are
implementation-level assumptions and the small set of decisions still
genuinely open, not re-litigated product scope.

## Confirmed (no longer assumptions)

- The product is a single, focused end-to-end workflow — delayed-order
  investigation — not separate coverage of orders, payments, inventory, and
  fulfillment as independent domains. See `docs/decisions.md`.

## Current implementation assumptions

- All commerce data (products, customers, orders, payments, inventory,
  fulfillments) is synthetic; it was originally produced by a one-off
  generator script and is now finalized as static, hand-editable TypeScript
  data under `src/data/`. No real customer, payment, or warehouse data is
  used anywhere.
- `src/data/*.ts` modules are a temporary persistence layer, accessed only
  through the repository layer. This is deliberate — see
  `docs/decisions.md`.
- There is no real payment provider. Payments use a fake provider name,
  `MockPay`.
- There is no real warehouse or logistics integration. Fulfillment records
  are synthetic and warehouses are just string identifiers
  (`WH-NORTH` / `WH-SOUTH`).
- Currency is INR throughout the synthetic dataset.
- Each order has exactly one payment record and exactly one fulfillment
  record in this dataset. A production system would likely allow multiple
  payment attempts or partial/split fulfillments, but that complexity isn't
  needed to demonstrate the delayed-order investigation workflow.
- The status enums (order/payment/fulfillment) are intentionally small and
  cover only the states needed to represent the seven deterministic
  operational scenarios plus normal traffic.

## Still open (pending during implementation, not client scope)

- **PENDING**: whether `create_resolution_ticket` (or any write/action
  capability) makes it into the final implementation at all, versus the
  deliverable being read-only investigation + diagnosis + recommendation.
  The client confirmed investigation-and-resolution as the workflow shape;
  the four read-only tools (`search_orders`, `get_order_context`,
  `diagnose_order_delay`, `recommend_resolution`) are now built in
  `src/mcp/create-server.ts` and served over both stdio and remote HTTP.
  Whether a controlled write/action tool is added is
  still an open implementation decision, and will require explicit
  confirmation-before-execution if it is built.
- **RESOLVED**: remote hosting. `src/mcp/http.ts` adds a Streamable HTTP
  transport (stateless mode) alongside the existing stdio entrypoint, and
  it's deployed to Render — see `docs/decisions.md` for the transport and
  hosting-provider reasoning, and the README for the hosted URL and how to
  connect a client to it. Local stdio still works unchanged (`npm start`)
  for Claude Code/Desktop/Inspector use.
- Final product name is not yet decided; `commerce-ops-mcp` is a working
  name for this repository.
