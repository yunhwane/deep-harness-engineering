# PROGRESS.md — session journal

> State subsystem (L5). The handoff document: a fresh session reads this first to reach
> working state in minutes, not by re-exploring. Keep it current — stale = worse than none.

## Current status
- **Latest commit:** `3f75cc9` (L7: scope policy)
- **Stack:** Node 26 + TypeScript + Fastify + vitest (`example-app/`)
- **Tests:** `make check` green — `tsc` clean + 1 test (`GET /health`)
- **Server:** boots; `curl :PORT/health → {"status":"ok"}`
- **Lint:** none yet (arrives with Feedback subsystem, L9)
- **Cold-Start Test:** passing — `AGENTS.md` answers all 5 questions

## Completed
- [x] L1 — five failure layers + Diagnostic Loop
- [x] L2 — five-subsystem harness map + slot layout
- [x] L3 — git init, AGENTS.md, CONSTRAINTS.md, cold-start test
- [x] L4 — routing table + instruction policy
- [x] L5 — PROGRESS.md + DECISIONS.md + session routines
- [x] L6 — initialization phase: Node/TS/Fastify env, Makefile, passing test
- [x] L7 — scope policy (WIP=1, completion evidence, VCR)
- [x] L8 — feature_list.json (scope surface) + schema; F00 passing, F01-F05 not_started

## In progress
- (nothing — between lectures)

## example-app feature progress (from feature_list.json)
- passing 1/6 (F00 /health) · not_started 5/6 (F01-F05 CRUD) · active 0 (WIP=1 ✓)

## Known issues
- **5 npm audit advisories (3 moderate, 1 high, 1 critical)**, all in the dev-only
  `vitest → vite → esbuild` chain (esbuild GHSA-gv7w-rqvm-qjhr, NPM_CONFIG_REGISTRY RCE).
  Not in shipped code. Fix needs `vitest@4` (breaking). **Deferred on purpose** — see
  DECISIONS.md. Revisit if example-app ever ships.
- "Latest commit" line lags one checkpoint by design; reconcile at each onboarding.

## Next steps (priority order)
1. L9 — Definition of Done; likely drive F01 (POST /tasks) active→passing as a worked example.
2. L10 — E2E testing (formalizes F04/F05 verification).
3. L11 — observability.

## How to resume (onboarding)
Read this file → read `harness/state/DECISIONS.md` → check `README.md` progress →
continue from "Next steps". Full routine in `AGENTS.md`.
