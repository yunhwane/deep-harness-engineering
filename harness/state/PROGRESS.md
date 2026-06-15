# PROGRESS.md — session journal

> State subsystem (L5). The handoff document: a fresh session reads this first to reach
> working state in minutes, not by re-exploring. Keep it current — stale = worse than none.

## Current status
- **Latest commit:** `8d488f6` (deeper: OTLP + Jaeger)
- **Stack:** Node 26 + TypeScript + Fastify + vitest (`example-app/`)
- **Tests:** `make check` green — `tsc` clean + arch checks + 19 tests (store + health + tasks/F06/F07 + E2E)
- **Server:** boots; `curl :PORT/health → {"status":"ok"}`; Task API F00-F07 live
- **Features:** passing 8/8 (F00-F07); WIP=1 ✓ (active 0)
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
- **passing 8/8** (F00-F07) · back-pressure 0 · active 0 (WIP=1 ✓)
- F07 (`/tasks/stats`) added via the **automated feature-pipeline workflow**; first panel
  vote was 0/3 (caught a process gap: feature absent from scope surface + args bug), harness
  fixed it, re-vote 3/3 Accept. See verification-log.md + docs/deep-dives.
- F06 (`?done` filter) added via the **3-agent workflow** (planner→generator→evaluator)
- `make check` green: arch checks + typecheck + 14 tests (store + health + tasks/F06 + E2E)
- **Real OpenTelemetry**: runtime request spans + `make trace` decision-layer trace
  (session→feature→verification). Console exporter; prod-dep audit 0 vulns; tests unaffected.
- **OTLP + Jaeger**: env-switched OTLP exporter; `make jaeger-up` → traces verified in Jaeger
  via query API (services `harness` 17 spans + `example-app` request spans). docs/deep-dives/otlp-jaeger.md.
- **Resource Library gap analysis** vs official templates: added `init.sh`, `pwd`/`git log`
  onboarding, scope-state check in clean-state, richer rubric (Reliability/Maintainability/
  Handoff + Accept/Revise/Block), session-handoff template. Deliberate divergences documented.

## Known issues
- **5 npm audit advisories (3 moderate, 1 high, 1 critical)**, all in the dev-only
  `vitest → vite → esbuild` chain (esbuild GHSA-gv7w-rqvm-qjhr, NPM_CONFIG_REGISTRY RCE).
  Not in shipped code. Fix needs `vitest@4` (breaking). **Deferred on purpose** — see
  DECISIONS.md. Revisit if example-app ever ships.

## Next steps (priority order)
- Curriculum complete. `store.ts` now has a direct unit test (`test/store.test.ts`, 6 tests).
  Optional follow-up: revisit deferred npm dev-dep advisories if app ships.

## How to resume (onboarding)
Read this file → read `harness/state/DECISIONS.md` → check `README.md` progress →
continue from "Next steps". Full routine in `AGENTS.md`.
