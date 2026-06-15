# L6 — Why initialization needs its own phase

## Thesis
Initialization and implementation have **opposite optimization goals** (reliability of
all future work vs. feature output). Mixing them → agents favor visible code, leaving a
weak foundation that cracks in session two. Make init its own phase; its output is
**infrastructure, not code**.

## Init phase produces
1. Executable environment (deps installed + locked)
2. Validated test framework (≥1 example test passes)
3. Bootstrap-contract docs (setup/dev/test/check commands, state, structure)
4. Work decomposition (ordered tasks with acceptance criteria)
5. Git checkpoint

## Bootstrap Contract — 4 conditions a new session must meet
start the project · run tests · view progress · understand next steps. All mandatory.

## Cold vs warm start
Blank dir = inference cost. Templates = warm start, far better. Bake generic init into templates.

## Anti-patterns (from mixing phases)
weak foundation (80/20), unvalidated accumulation, session-budget waste, implicit-assumption minefield.

## Acceptance checklist
`make setup` works from scratch · `make test` has a passing test · run/test answerable
from repo · decomposition with 3+ tasks · all committed.

## Evidence / terms
Dedicated init → +31% multi-session completion; pays back in 3-4 sessions (capital, not
overhead). Terms: Initialization Phase, Bootstrap Contract, Handoff Readiness, Time to
First Verification, Downstream Usability.

## Applied in this repo
- Decided stack (user): **Node 26 + TS + Fastify + vitest**; logged in DECISIONS.md.
- Built the executable env: package.json, tsconfig (Bundler resolution), `.nvmrc`,
  `package-lock.json`, `src/app.ts` (buildApp factory) + `src/server.ts`.
- `test/health.test.ts` — one real passing test via `app.inject`.
- Root `Makefile` = the bootstrap contract (setup/dev/test/typecheck/check).
- `harness/environment/README.md` documents the contract + verified acceptance.
- **Actually ran it** (didn't claim): `make setup` ✓, `make check` ✓ (tsc + 1 test),
  `curl :3999/health → {"status":"ok"}` ✓.

## Dogfooding insight
Two lectures collided usefully: L6 says init produces *infrastructure, not features*,
and L7 (next) warns against overreach — so we **deliberately did not** build the Task
CRUD routes, only `/health`. We also dogfooded honesty: the npm dev-dep CVEs got
recorded as a tracked known issue + a logged decision to defer, not hidden or
force-fixed (which would have churned a just-validated foundation).
