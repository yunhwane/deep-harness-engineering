# PROGRESS.md — session journal

> State subsystem (L5). The handoff document: a fresh session reads this first to reach
> working state in minutes, not by re-exploring. Keep it current — stale = worse than none.

## Current status
- **Latest commit:** `612d22f` (L9: DoD + F01 passing)
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
- [x] L9 — Definition of Done (3-layer gate); F01 POST /tasks driven to passing via independent verifier
- [x] L10 — real E2E harness + executable arch checks; F02-F05 implemented & verified

## In progress
- (nothing — between lectures)

## example-app feature progress (from feature_list.json)
- **passing 6/6** (F00-F05) · back-pressure 0 → feature-complete · active 0 (WIP=1 ✓)
- `make check` green: arch checks + typecheck + 4 tests (incl. real E2E CRUD flow)

## Known issues
- **5 npm audit advisories (3 moderate, 1 high, 1 critical)**, all in the dev-only
  `vitest → vite → esbuild` chain (esbuild GHSA-gv7w-rqvm-qjhr, NPM_CONFIG_REGISTRY RCE).
  Not in shipped code. Fix needs `vitest@4` (breaking). **Deferred on purpose** — see
  DECISIONS.md. Revisit if example-app ever ships.
- "Latest commit" line lags one checkpoint by design; reconcile at each onboarding.

## Next steps (priority order)
1. L11 — observability inside the harness (structured logs/signals; ties to arch Rule 2).
2. L12 — clean-state-per-session (final lecture).

## How to resume (onboarding)
Read this file → read `harness/state/DECISIONS.md` → check `README.md` progress →
continue from "Next steps". Full routine in `AGENTS.md`.
