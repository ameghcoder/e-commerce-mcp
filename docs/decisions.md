# Decisions

## Product scope: delayed-order investigation (client-confirmed)

**Decision:** The MCP will implement a single, focused end-to-end
workflow — investigating why an order is delayed and what to do about it —
rather than separate coverage of orders, payments, inventory, and
fulfillment as independent domains.

**Source:** This is a confirmed client decision, not an engineering
judgment call. The client's clarification: *"A single focused end-to-end
workflow is the right level of scope. It may involve multiple systems where
that is necessary for the chosen operational problem; please keep separate
coverage of all four domains out of scope and make the exclusions clear."*

**What this means in practice:** payment, inventory, and fulfillment data
remain relevant, but only as supporting evidence gathered while
investigating a specific delayed order — never as independent tool
surfaces or workflows in their own right. Concretely out of scope:
independent payment operations, independent inventory management,
independent fulfillment management, general/full order management, real
refunds, real warehouse operations, and anything resembling a full
ticketing platform. See `CLAUDE.md` for the enforced scope rule.

## Use static TypeScript modules instead of PostgreSQL for persistence

**Decision:** Store the synthetic commerce dataset as typed TypeScript
modules (`src/data/*.ts`, one `const` array per entity, `satisfies` its
domain type), accessed only through a repository layer.

**Reason:** The assignment explicitly allows synthetic/self-created data and
has a deliberately small implementation window. The dataset is small
(~150 records total across six entities). PostgreSQL would add setup,
migration, and connection-management overhead that doesn't change what's
being evaluated — MCP design, product judgment, and operational reasoning,
not database infrastructure. The repository layer (`src/repositories/`) is
the abstraction boundary: if persistence needs to change later (e.g. to
PostgreSQL), only the repository implementations change — `OrderContextService`
and any future MCP tools depend on repository method signatures, not on how
the data is stored.

**Why TypeScript modules instead of JSON files:** the dataset was generated
once (originally via a seeded-random generator script) and is now finalized
and hand-edited directly in place — there's no ongoing regeneration step, so
keeping a generator script around was dead weight. A `.ts` module with
`satisfies Product[]` etc. gets the same literal data plus compile-time
shape checking (catches typos in status values, missing required fields) for
free, with no JSON-parsing step. It does **not** replace runtime validation
of cross-record invariants (foreign keys, totals, one-record-per-order) that
TypeScript's structural typing can't express — see
`tests/data/dataset-invariants.test.ts`, which is the one place those checks
still live.

## No generic/base repository class

**Decision:** Each repository (`ProductRepository`, `OrderRepository`, etc.)
is a plain class with a handful of specific finder methods. There is no
`BaseRepository<T>` / `GenericRepository<T>` abstraction.

**Reason:** With six entities and a handful of query patterns each, a shared
generic base would save a small amount of boilerplate at the cost of an
extra layer of indirection to read through. The duplication that exists
(each repository imports its data module and does an array `.find`/`.filter`) is
small and obvious — not worth abstracting yet. Revisit only if repositories
grow real, differentiated query logic.

## Dataset is generated once, then finalized as static data

**Decision:** The 7 deterministic scenario orders (`ORD-1001`..`ORD-1007`)
and the remaining ~43 bulk orders were originally produced by a one-off
generator script (hand-written scenarios plus a seeded PRNG, `mulberry32`,
seed `42`, for the bulk orders — not `Math.random()`, so the run was
reproducible). That script has since been deleted; its output is now the
permanent, hand-editable contents of `src/data/*.ts`.

**Reason:** The scenario orders are referenced by tests and docs, so their
IDs and evidence must never change. Reproducibility mattered while the
dataset was still being generated/regenerated, but once it was finalized
there was no further need to regenerate it — keeping a generator script
around after that point is dead weight. If the dataset needs new records
going forward, they're added by editing `src/data/*.ts` directly (checked by
`tests/data/dataset-invariants.test.ts`), not by re-running a generator.

## Order-context service returns facts only, not diagnoses

**Decision:** `OrderContextService.getOrderContext()` composes order,
customer, payment, items+product, inventory, and fulfillment records into
one object. It does not compare inventory availability to order quantity,
infer a root cause, or rank likely explanations.

**Reason:** Diagnosis is exactly the kind of reasoning the eventual MCP/AI
layer is meant to add value on top of. Baking a specific diagnosis algorithm
into the backend now would preempt a decision that depends on the still-
pending product scope (single-domain vs. cross-domain investigation). The
service's job at this stage is to guarantee reliable, structurally complete
facts; tests can then assert on those facts (e.g., "ORD-1003 shows
available < quantity for its item") without the service itself making the
inventory-shortage judgment call.

## Dropped `composite`/`declaration`/`outDir`/DOM lib from tsconfig

**Decision:** Simplified the inherited `tsconfig.json` to a single
`noEmit: true` config covering `src/` and `tests/`, dropping the
project-reference-style build config (`composite`, `declaration`,
`declarationMap`, `outDir`) and the `DOM` lib entry.

**Reason:** There is no build/bundling step in the current scope — nothing
is published or run from `dist/` yet, and this is a Node-only backend with
no browser code, so `DOM` types aren't needed. A single `noEmit` config that
typechecks everything (including tests) is simpler and matches
what `npm run typecheck` actually needs. `tsup` remains installed for when
an MCP server needs to be bundled, but wiring a build script now would be
scope creep against the current stage.

## MCP server: stdio transport, four read-only tools, no write tool

**Decision:** `src/mcp/server.ts` uses `@modelcontextprotocol/sdk`'s
`McpServer` over `StdioServerTransport`, exposing four tools —
`search_orders`, `get_order_context`, `diagnose_order_delay`,
`recommend_resolution` — each a thin wrapper around a service
(`OrderRepository`, `OrderContextService`, `DelayDiagnosisService`,
`ResolutionService`). `create_resolution_ticket` is not implemented.

**Reason:** This was built under an explicit tight time constraint. Stdio is
the standard local MCP transport (used by MCP Inspector and Claude
Desktop/Code) and requires no additional infrastructure; the project's
eventual "remotely hosted" goal (per `CLAUDE.md`'s project purpose) means
wrapping the same tool logic in an HTTP/SSE transport later — a transport
change, not a rewrite of tool logic, since tools depend only on
`src/services/*` and `src/repositories/*`, never on the transport.
`create_resolution_ticket` was left out because `docs/assumptions.md`
already listed whether any write/action tool belongs in the final
deliverable as a genuinely open, unconfirmed question — building it now
would mean deciding that question under time pressure instead of
deliberately, and any write tool needs explicit confirm-before-execution
design that a rushed implementation would be likely to get wrong.

## Delay diagnosis and resolution recommendation are rule tables, not an LLM call

**Decision:** `DelayDiagnosisService` (`src/services/delay-diagnosis.service.ts`)
is an ordered if/else rule chain over `OrderContext` facts, producing one of
a fixed set of categories (`no_issue`, `cancelled`, `payment_issue`,
`inventory_shortage`, `fulfillment_delay`, `fulfillment_failure`, `unknown`)
plus evidence strings. `ResolutionService` maps each category to a fixed
list of recommended actions via a lookup table.

**Reason:** Per `CLAUDE.md`'s engineering principles, delay diagnosis is
explicitly called out as a good candidate for deterministic rules rather
than a model call — the seven scenario orders in `docs/test-scenarios.md`
each have one unambiguous root cause derivable from explicit field
comparisons (payment status, inventory available vs. quantity needed,
fulfillment status and staleness), so there's no ambiguity for an LLM to
usefully resolve. Rule order matters and is deliberate: cancellation and
payment failure are checked before inventory/fulfillment state, since they
explain a delay regardless of what's happening downstream.

## Remote hosting: Streamable HTTP transport, stateless mode, on Render

**Decision:** Added `src/mcp/http.ts` as a second entrypoint alongside the
existing stdio one (`src/mcp/server.ts`). Both import tool registration from
a shared `src/mcp/create-server.ts` (`createServer(): McpServer`), so the
tools themselves — descriptions, schemas, service wiring — are identical
across transports; only the transport differs. `http.ts` uses the SDK's
`StreamableHTTPServerTransport` in **stateless mode**
(`sessionIdGenerator: undefined`): a fresh `McpServer` + transport pair is
created per request rather than a long-lived session. Deployed to Render as
a Node web service (build: `npm install && npm run build`, start:
`npm run start:http`).

**Reason:** The assignment requires a remotely hosted MCP server, not just a
local stdio one — this isn't a nice-to-have. Streamable HTTP is the current
MCP spec's remote transport (SSE-as-a-standalone-transport is deprecated in
favor of it). Stateless mode fits this tool set specifically: all four tools
are single-shot read-only lookups with no server-initiated notifications and
no need for state to persist between calls, so a stateful session (session
IDs, in-memory connection tracking, 404-on-invalid-session handling) would
add real complexity for zero benefit here — see the SDK's own
`simpleStatelessStreamableHttp` example, which uses the identical pattern.
Render was chosen over Railway/Fly.io for its plain free-tier Node web
service with no Dockerfile or CLI tooling required, matching the
assignment's "no complex deployment infrastructure" guidance.

**Safety/operational tradeoff, stated explicitly:** the SDK's
`createMcpExpressApp` helper applies DNS-rebinding-protection host-header
validation automatically only for localhost-family hosts; binding `0.0.0.0`
(required for any external host, including Render) disables it unless
`allowedHosts` is passed explicitly. `http.ts` reads `MCP_ALLOWED_HOSTS`
(comma-separated) from the environment and passes it through when set, so
the deployed Render hostname can be locked in after the service is created
and its `.onrender.com` URL is known — but there is **no authentication** on
the hosted endpoint. This is a deliberate, disclosed limitation, not an
oversight: the assignment explicitly excludes building
auth/user-management infrastructure, and the tool surface is read-only
investigation/diagnosis/recommendation only — there is no write/action tool,
so the worst case for an unauthenticated caller is reading synthetic demo
data, not mutating anything. This tradeoff would need revisiting (API key or
OAuth per the MCP spec's auth extension) before any real, non-synthetic data
touched this server.

## Package manager: npm, not pnpm

**Decision:** Use `npm run <script>` (the instructions suggested
`pnpm <script>` as an example). `package-lock.json` already existed in this
repository from prior setup.

**Reason:** Switching to pnpm now would mean discarding the existing lockfile
and regenerating dependencies for no functional benefit — the assignment's
`pnpm` references are illustrative, not a hard requirement. All npm scripts
(`typecheck`, `test`) work identically
under either package manager.
