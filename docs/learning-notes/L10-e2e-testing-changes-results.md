# L10 — Why end-to-end testing changes results

## Thesis
Unit tests are **by design** blind to component-boundary defects (they mock the
boundaries away). Only E2E validates the whole system interacting. And knowing E2E
awaits **changes how the agent codes** — it respects integration points and error paths.

## Testing Adequacy Gradient
unit ≤ integration ≤ E2E in defect detection. The Electron export example: all units
green, yet 5 boundary defects in real use (path format, IPC progress, memory leak, perms,
error propagation) — every one caught only by E2E.

## Unit-test blind spots
interface mismatch, state propagation, resource lifecycle, environment dependencies.

## Real E2E must
hit actual boundaries (no mocks), real cross-layer state transitions, expose integration
failures, and test failure/error-propagation paths. (cost: ~2s → ~15s, fine for agents)

## Structuring (4)
1. Architecture first (define boundaries; OpenAI Layered Domain Arch, forward-only deps).
2. Automate rules as executable checks (`grep ... && exit 1`).
3. Agent-oriented error messages: **what / why / how**.
4. Review Feedback Promotion: recurring review notes → permanent automated checks.

## Anti-patterns
unit-pass = done; E2E written after code as an appendix; vague failure messages;
architecture docs without enforcement; ignoring failure paths.

## Applied in this repo — app brought to feature-complete
- Real E2E: `test/e2e/crud.e2e.test.ts` boots a server on an ephemeral port and drives it
  with real `fetch` (create→list→get→patch→delete) **including 404 failure paths** and the
  delete-then-404 side effect — covering cross-request state the inject tests can't.
- Implemented F02-F05 (GET list, GET one, PATCH, DELETE) in `src/app.ts` + `src/store.ts`.
- Executable architecture checks: `scripts/check-architecture.sh` (Rule 1: only server.ts
  may `.listen()`; Rule 2: no ad-hoc `console.*` in app code) with what/why/how messages.
  Wired into `make check` (now: arch → typecheck → tests incl. E2E).
- Independent verifier sub-agent re-ran everything with live curl → VERDICT PASS.
- Flipped F02-F05 → passing. **feature_list.json now 6/6 passing, back-pressure 0.**

## Dogfooding insight
The lecture's whole point bit us in real time: the **architecture check itself had a
boundary defect** — its grep matched `.listen(` inside a *docstring* and false-flagged
app.ts. Rather than edit the comment to dodge it, we fixed the check to ignore comment
lines (the brittle harness was the bug, not the code). That is exactly "make architecture
rules executable, and make their failures trustworthy."
