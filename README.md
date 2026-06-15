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
- [ ] L7 — Agents overreach and under-finish
- [ ] L8 — Feature lists are harness primitives
- [ ] L9 — Agents declare victory too early
- [ ] L10 — E2E testing changes results
- [ ] L11 — Observability inside the harness
- [ ] L12 — Every session must leave a clean state

## The core idea (L1)

Model capability ≠ execution reliability. Identical model + prompt produces wildly
different results depending on the **harness** around it. When an agent fails, don't
swap the model — **diagnose the harness** against the five defense layers
(see `harness/diagnostics/failure-layers.md`).
