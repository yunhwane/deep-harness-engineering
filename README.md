# deep-harness-engineering

> Learning **harness engineering** by building a real one — lecture by lecture.
> Curriculum: <https://walkinglabs.github.io/learn-harness-engineering/ko/>

This repo is a **dogfooding harness**: as we study each of the 12 lectures, we apply
the concept by building a piece of an actual agent harness around a small example app.
By the end, the harness here should be one we (and an agent) can genuinely use.

## The two halves

| Path | Role | Analogy |
|------|------|---------|
| `example-app/` | The toy project an agent develops. A small **Task API**. | the horse |
| `harness/`     | The engineering infrastructure that makes the agent reliable. | the tack |
| `docs/learning-notes/` | One study note per lecture (what we learned). | the textbook |

## Progress

- [x] **L1** — Why capable agents still fail → `harness/diagnostics/failure-layers.md`
- [x] **L2** — What a harness actually is → `harness/README.md` (five subsystems)
- [x] **L3** — Repository as system of record → `AGENTS.md`, `harness/CONSTRAINTS.md`, Cold-Start Test
- [x] **L4** — Why one giant instruction file fails → AGENTS.md routing table + `instruction-policy.md`
- [x] **L5** — Long-running tasks lose continuity → `harness/state/PROGRESS.md` + `DECISIONS.md`
- [x] **L6** — Initialization needs its own phase → Node/TS env, `Makefile`, passing test
- [x] **L7** — Agents overreach and under-finish → `harness/scope/scope-policy.md` (WIP=1)
- [x] **L8** — Feature lists are harness primitives → `harness/scope/feature_list.json`
- [x] **L9** — Agents declare victory too early → `definition-of-done.md`; F01 verified→passing
- [x] **L10** — E2E testing changes results → real E2E suite + `check-architecture.sh`; app 6/6
- [x] **L11** — Observability inside the harness → structured logs + `evaluator-rubric.md`, `verification-log.md`
- [x] **L12** — Every session must leave a clean state → `make clean-state`, harness simplification

## Harness self-assessment

**Overall: 9.0 / 10 (A)** — all five L2 subsystems present, each mapped to an L1
failure layer, with executable feedback (the highest-ROI subsystem) done right.

| Subsystem | Score | |
|-----------|:-----:|--|
| Instruction (`AGENTS.md`) | 9.5 | true router (~76 lines), progressive disclosure, recency-effect rule placement |
| Feedback | 9.5 | `make check` (arch+tsc+unit+E2E), 3-layer Definition of Done, independent verifier agents |
| Scope | 9.0 | `feature_list.json` with harness-controlled `state`, `passing` irreversible, WIP=1 |
| Environment | 8.0 | `Makefile` + `init.sh` + pinned stack; 2 dev-only npm advisories deferred on purpose |
| State | 9.0 | `PROGRESS.md` + `DECISIONS.md` + session routines, reconciled to current reality |

Remaining gap: the deferred dev-only npm advisories (see `harness/state/DECISIONS.md`).

## Beyond the curriculum

- **3-agent workflow** (`harness/workflows/three-agent-workflow.md`): added feature F06
  via planner → generator → evaluator with role separation (L9/L11 made real). Verdicts in
  `harness/feedback/verification-log.md`. App now 7/7 features passing.
- **Real OpenTelemetry** (`docs/deep-dives/otel-integration.md`): runtime request spans +
  a decision-layer trace (`make trace`: session → feature → verification). Console exporter,
  no collector needed.
- **OTLP + Jaeger** (`docs/deep-dives/otlp-jaeger.md`): one env var flips the exporter to a
  real Jaeger collector (`make jaeger-up`, UI :16686); spans verified via Jaeger's query API.
- **Automated workflow + majority vote** (`harness/workflows/feature-pipeline.mjs`): a
  reusable Plan→Generate→3-evaluator-panel pipeline. Added F07 (`/tasks/stats`); the panel's
  first vote (0/3) caught a process gap a single review missed, harness fixed it, re-vote 3/3.
  App now **8/8 features passing**.
- **Resource Library gap analysis** (`docs/deep-dives/resource-library-gap-analysis.md`):
  compared against the official curriculum templates; closed `init.sh`, `pwd`/`git log`
  onboarding, scope-state clean check, richer evaluator rubric, session-handoff template.

## The core idea (L1)

Model capability ≠ execution reliability. Identical model + prompt produces wildly
different results depending on the **harness** around it. When an agent fails, don't
swap the model — **diagnose the harness** against the five defense layers
(see `harness/diagnostics/failure-layers.md`).
