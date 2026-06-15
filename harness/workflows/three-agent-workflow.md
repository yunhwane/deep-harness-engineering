# Three-Agent Workflow: planner → generator → evaluator

> The orchestration L9 (worker ≠ evaluator) and L11 (process observability) point to.
> A single model judging its own work is biased; splitting the roles + gating on an
> independent, rubric-scored evaluator produces functional completeness where bare runs
> fail. This doc is the harness primitive; we run it live to add features.

## Roles
| Role | Reads | Produces | May write code? |
|------|-------|----------|-----------------|
| **Planner** | AGENTS.md, scope/*, evaluator-rubric.md, example-app | a **sprint contract** (scope / per-item validation / explicit exclusions) + the **feature_list.json entry** (behavior + executable verification) | no |
| **Generator** | the sprint contract + repo | implementation + test, run `make check` to green | yes (in scope only) |
| **Evaluator** | evaluator-rubric.md, the feature | a **rubric-scored verdict** from live verification (make check + real requests + failure paths) | no |

## Control flow (harness-orchestrated)
```
orchestrator names the feature
  → Planner: contract + feature_list entry          (harness adds entry as not_started)
  → Generator: implement to contract, make check     (state -> active; never self-marks passing)
  → Evaluator: score vs rubric on live evidence       (independent; skeptical)
  → harness: all dims PASS ? flip feature -> passing + log verdict + commit + clean-state
             else            : stays active/blocked, failing dimension named
```

## Why each boundary matters
- **Planner can't code** → forces explicit, pre-negotiated scope (no scope drift, L7/L11).
- **Generator can't self-mark passing** → Pass-State Gating (L8) + no overconfidence (L9).
- **Evaluator is independent + rubric-driven** → reproducible, evidence-based acceptance (L9/L11).
- Every transition is recorded (`verification-log.md`) → decision-layer observability (L11).

## Live runs
See `harness/feedback/verification-log.md` for verdicts produced by this workflow.
