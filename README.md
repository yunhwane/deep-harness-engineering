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

## Beyond the curriculum

- **3-agent workflow** (`harness/workflows/three-agent-workflow.md`): added feature F06
  via planner → generator → evaluator with role separation (L9/L11 made real). Verdicts in
  `harness/feedback/verification-log.md`. App now 7/7 features passing.
- **Real OpenTelemetry** (`docs/deep-dives/otel-integration.md`): runtime request spans +
  a decision-layer trace (`make trace`: session → feature → verification). Console exporter,
  no collector needed.

## The core idea (L1)

Model capability ≠ execution reliability. Identical model + prompt produces wildly
different results depending on the **harness** around it. When an agent fails, don't
swap the model — **diagnose the harness** against the five defense layers
(see `harness/diagnostics/failure-layers.md`).
