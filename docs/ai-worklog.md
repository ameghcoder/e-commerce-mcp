# AI worklog

This assignment was built with extensive use of Claude Code (Anthropic's
CLI coding agent). This document covers tool/model choice, how work was
divided between the author and the AI, key prompts and context supplied,
verification performed, and known gaps.

## AI tools and models used

- **Claude Code CLI**, using **Claude Sonnet 5** (`claude-sonnet-5`), for
  the entire implementation: project scaffolding, domain modeling,
  synthetic data generation, repository/service layers, the MCP server
  (both stdio and remote Streamable HTTP transports), tests, and
  documentation.
- **ChatGPT** used for re-search and blueprint creation purpose for the project to keep it simple and clean, I first discuss with ChatGPT about how should I approach this, and ChatGPT really have a good context and memory management it includes my all existing project, working style, skills and all the things from all previous chats, better memory management than claude. I mainly used this for the discussion and then start to build in claude code.

## Task/scope framing before implementation

The single highest-leverage AI-usage decision in this project was
resolving product scope *before* writing code. The initial ambiguity —
"investigate commerce problems" spans four domains (orders, payments,
inventory, fulfillment) — was deliberately not resolved by guessing. It
was framed as an open question, written up in `docs/assumptions.md`, and
only implemented once framed as client-confirmed scope in
`docs/decisions.md`: a single end-to-end delayed-order-investigation
workflow, with the other three domains present only as supporting evidence,
never as independent tool surfaces. `CLAUDE.md`'s "Scope rule" section
encodes this as a standing constraint the AI checks itself against for
every subsequent change, specifically to prevent scope creep back toward
"four domain MCPs" over the course of the build.

## How work was divided

- **AI (Claude Code):** wrote all TypeScript — domain types, the synthetic
  dataset, repositories, `OrderContextService`/`DelayDiagnosisService`/
  `ResolutionService`, the MCP tool layer, tests, and this documentation
  set. Also made and documented several implementation-level engineering
  calls under the project's explicit "implement directly" mode (see
  `CLAUDE.md`): static TypeScript modules over PostgreSQL, no generic
  `BaseRepository<T>`, deterministic rule tables instead of an LLM call for
  delay diagnosis, stateless Streamable HTTP over a stateful session model
  for the remote transport. Each of these is written up with its reasoning
  in `docs/decisions.md`, not just applied silently.
- **Author (me):** I didn't write any application code by hand — my role
  was product framing, prompting, and review, the way a senior engineer
  reviews an implementer's output. Before Claude Code wrote a single line,
  I set the project up myself: created the folder structure, scaffolded
  `README.md` and `CLAUDE.md` (drafted after a research/blueprint
  discussion with ChatGPT — see "AI tools and models used"), and installed
  the initial dependencies. `CLAUDE.md` is also where I set this project's
  own working mode — it explicitly opts out of my usual review-first
  default in favor of Claude implementing directly, since this is a
  take-home meant to be built, not an existing codebase to protect. Claude
  Code only started writing code once that structure and brief already
  existed, and from there every implementation choice ran through my
  review and approval, including the final calls on what shipped vs. got
  cut for time (e.g. `create_resolution_ticket` staying unbuilt).

## Context and instructions supplied to the AI

- `CLAUDE.md` — the standing project brief: purpose, confirmed scope, the
  explicit scope rule (no independent payments/inventory/fulfillment tool
  surfaces), architecture, engineering principles (no premature
  abstraction, deterministic-over-LLM where rules suffice, testable
  services), and an "AI coding principles" checklist requiring
  typecheck+test after every change and explicit flagging of open
  questions rather than silent decisions. This file is why the AI never
  needed the scope explained twice across the session.
- A **global** `~/.claude/CLAUDE.md` default of "review first, don't
  author unprompted code" — deliberately overridden *for this project only*
  in favor of direct implementation, since this is a take-home the AI is
  expected to build, not an existing codebase to protect. Worth noting as
  evidence of scoped, deliberate AI-permission decisions rather than a
  blanket "let it do anything" default.
- Direct prompts mid-session that shaped scope and pace, e.g. an explicit
  "complete the MCP server in 1 hour" time-boxing instruction, which is why
  `create_resolution_ticket` (write/action tool) and (at the time) remote
  hosting were deliberately deferred rather than rushed — see
  `docs/assumptions.md`'s "Still open" section for how that was tracked
  rather than silently dropped.

## An AI suggestion corrected, rejected, or substantially changed

Claude Code's first pass at the synthetic dataset stored orders, customers,
etc. as `.json` files. I reviewed that and redirected it to `.ts` modules
instead — what shipped as `src/data/*.ts`. The switch is documented in
`docs/decisions.md`'s "static TypeScript modules instead of PostgreSQL"
entry, but the JSON-vs-TS call itself was my correction, not the AI's
original proposal.

**Why:** in a TypeScript project, a `.ts` data module gives me full type
safety, IntelliSense, and compile-time validation that a `.json` file
can't — a typo in a status enum or a missing required field surfaces at
compile time instead of at runtime. `.ts` also allows comments, computed
values, reusable constants, helper functions, and TypeScript features like
`as const`, enums, and interfaces, which keep the data maintainable as the
project grows — none of which a plain JSON file supports. Performance is a
wash either way, since both get bundled into the same JavaScript by modern
build tooling. `.json` is the better choice for pure data interchange,
cross-language configuration, or files non-developers need to edit
directly — none of which applies here; this dataset is application-specific
constants and business data consumed only by this TypeScript codebase,
which is exactly the case `.ts` modules are better suited for.

## How AI-generated work was verified

- `npm run typecheck` and `npm test` (28 tests: repository finder methods
  including missing-record cases, `OrderContextService` context
  composition, all seven hand-crafted delay scenarios mapped to expected
  `DelayDiagnosisService` categories, `ResolutionService` action mapping,
  and dataset cross-record invariants — foreign keys, order totals,
  one-record-per-order — checked against both the real dataset and
  deliberately corrupted copies) run after every substantive change, not
  just at the end.
- Before writing the MCP server, the AI read the installed
  `@modelcontextprotocol/sdk` type definitions directly
  (`server/mcp.d.ts`, `server/stdio.d.ts`, `server/streamableHttp.d.ts`)
  rather than relying on training-data familiarity with the SDK, to avoid
  using a deprecated tool-registration overload and to confirm the correct
  stateless-mode pattern for the remote transport — verification of the
  *plan* before verification of the output.
- The MCP server was exercised twice, independently, once per transport:
  - stdio: a hand-written raw JSON-RPC session
    (`initialize` → `tools/list` → `tools/call` ×3) piped into
    `node dist/server.js`.
  - Streamable HTTP: `curl` against a locally running `dist/http.js`
    (`initialize`, a successful `tools/call`, a not-found error path, and
    a `405` on `GET /mcp`) to confirm the remote transport wrapped the
    same tool behavior correctly, not just that it started.
  - After registering the server with Claude Code itself
    (`claude mcp add`), the tools were called live through the actual
    running MCP connection across multiple orders and every diagnosis
    category (`payment_issue`, `inventory_shortage`, `cancelled`, plus the
    not-found error path) and checked against the expected values in
    `docs/test-scenarios.md`.
- The `/mcp` rate limiter (`src/mcp/http.ts`, `docs/decisions.md`) was
  exercised by building `dist/http.js` and firing 65 rapid POST requests at
  a locally running instance: the first 60 returned `200`, the remaining 5
  returned `429` with the expected JSON-RPC error body — confirming the
  per-IP window works end-to-end, not just that the middleware is wired in.
- I manually tested the MCP locally by connecting Claude Code to it and
  running it against the scenario orders covering missing/pending payment
  and item-level edge cases, reviewing the underlying data structure for
  each stored record as I went rather than just trusting the tool output.
  That review is what led to adding inventory data as a second,
  independent signal for diagnosing payment failures instead of relying on
  payment status alone, and to a manual file-by-file read-through of the
  code alongside the AI's generation rather than reading test results
  only.
- I deliberately chose in-memory rate limiting over a Redis-backed store
  for the `/mcp` endpoint (see `docs/decisions.md`) specifically because
  the deployment is public and unauthenticated — the hosted URL and the
  instructions for using it are both live with no login in front of them,
  so a basic per-instance abuse guard was worth having even on a free-tier
  deployment serving synthetic data.

## Remaining risks and unfinished work

- **No write/action tool.** `create_resolution_ticket` was deliberately
  never built — deciding whether the deliverable needs a write capability,
  and what confirm-before-execution guardrails it needs, was flagged early
  as a genuinely open question rather than settled under time pressure.
  Named explicitly as a future extension in `docs/assumptions.md` /
  `docs/decisions.md`.
- **No authentication on the hosted MCP endpoint.** Deliberate, not
  accidental — the assignment excludes building auth infrastructure, and
  the tool surface is read-only against synthetic data, so the blast
  radius of an unauthenticated caller is "reads demo data," not "mutates
  anything real." Documented in `docs/decisions.md` as a tradeoff that
  would need revisiting before any real data touched this server.
- **Stateless HTTP mode** means no MCP session persists across requests
  and no server-initiated notifications work over the remote transport —
  a correct fit for this tool set (all four tools are single-shot
  request/response), but would need revisiting if a future tool needed
  streaming or push notifications.
- Dataset is small and static (`src/data/*.ts`, ~150 records) — fine for
  demonstrating the workflow, not representative of production data
  volume or concurrency.
- **Deliberate design choices worth restating here, not gaps:** I kept the
  code modular so it's easy for another developer — or another AI tool
  session — to pick up without re-deriving context; I store data in `.ts`
  modules rather than `.json` for the readability and type-safety reasons
  above; that `.ts` data is validated by Vitest tests rather than trusted
  as-is; and I used local `.ts` storage instead of PostgreSQL or SQLite
  specifically because this assignment is about demonstrating the MCP
  working correctly against data, not about running a real or dynamic
  database — a real DB would add setup and connection overhead without
  changing what's actually being evaluated.
