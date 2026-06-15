# PROGRESS.md — session journal

> State subsystem (L5). The handoff document: a fresh session reads this first to reach
> working state in minutes, not by re-exploring. Keep it current — stale = worse than none.

## Current status
- **Latest commit:** `6f81bdf` (L11: observability)
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
- [x] L11 — observability: structured runtime logs + rubric/sprint-contract/verification-log
- [x] L12 — clean-state: `make clean`/`clean-state`, session-completion def, harness simplification

## Curriculum COMPLETE — all 12 lectures studied and applied.

## In progress
- (nothing — curriculum done)

## example-app feature progress (from feature_list.json)
- **passing 6/6** (F00-F05) · back-pressure 0 → feature-complete · active 0 (WIP=1 ✓)
- `make check` green: arch checks + typecheck + 10 tests (store unit + health + tasks + E2E)

## Known issues
- **5 npm audit advisories (3 moderate, 1 high, 1 critical)**, all in the dev-only
  `vitest → vite → esbuild` chain (esbuild GHSA-gv7w-rqvm-qjhr, NPM_CONFIG_REGISTRY RCE).
  Not in shipped code. Fix needs `vitest@4` (breaking). **Deferred on purpose** — see
  DECISIONS.md. Revisit if example-app ever ships.
- "Latest commit" line lags one checkpoint by design; reconcile at each onboarding.

## Next steps (priority order)
- Curriculum complete. Optional follow-ups: give `store.ts` a direct unit test
  (quality-report priority #1); revisit deferred npm dev-dep advisories if app ships.

## How to resume (onboarding)
Read this file → read `harness/state/DECISIONS.md` → check `README.md` progress →
continue from "Next steps". Full routine in `AGENTS.md`.
