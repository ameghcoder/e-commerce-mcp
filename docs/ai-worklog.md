# AI worklog

This assignment was built with extensive use of Claude Code (Anthropic's
CLI coding agent). This document covers tool/model choice, how work was
divided between the author and the AI, key prompts and context supplied,
verification performed, and known gaps.

> Sections marked **[fill in]** need input only you have — either because
> they happened outside this tool session, or because they're judgment
> calls the assignment specifically wants in your own words rather than
> the AI's self-report.

## AI tools and models used

- **Claude Code CLI**, using **Claude Sonnet 5** (`claude-sonnet-5`), for
  the entire implementation: project scaffolding, domain modeling,
  synthetic data generation, repository/service layers, the MCP server
  (both stdio and remote Streamable HTTP transports), tests, and
  documentation.
- **[fill in]** Any other tools used (ChatGPT/Codex for early brainstorming,
  a separate model for research, etc.) and why, if applicable — the
  assignment explicitly asks for the reasoning behind model choice per
  activity (planning vs. implementation vs. review).

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
- **Author (you): [fill in]** — product framing decisions that came from
  you specifically (e.g. picking delayed-order investigation as *the*
  workflow before confirming it as "client" scope), any code you wrote or
  edited by hand, the actual email exchange with the "client" that
  `docs/decisions.md` cites as confirming scope, and the final call on
  what shipped vs. got cut for time.

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

**[fill in — required]** This is the one section that can't be written
from the AI's side of the transcript alone; the assignment wants your own
account of a place you pushed back. Candidates worth checking against your
own memory of the session:
- Any point where you rejected a proposed tool, schema shape, or scope
  expansion the AI suggested.
- Any decision in `docs/decisions.md` you steered differently than how the
  AI first proposed it (e.g. tool count, transport choice, data format).
- Whether the "four tools, no write action" cut was your call, the AI's
  proposal you approved, or something in between.

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
- **[fill in]** Any manual read-through or spot-check you did yourself of
  AI-written code, beyond the automated tests — e.g. reviewing the
  diagnosis rule ordering in `delay-diagnosis.service.ts` for logical
  correctness independent of what the tests happened to cover.

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
- **[fill in]** Anything else you know is fragile or cut for time that
  isn't already captured above or in `docs/assumptions.md`.
