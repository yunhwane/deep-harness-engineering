# Scope Policy (WIP=1)

> From Lecture 7. Constrains scope so the agent finishes before starting. Fixes failure
> layers 1 (task definition) and 4 (verification). The machine-readable **scope surface**
> this policy governs is `feature_list.json`, built in L8.

## The rule: WIP = 1
- Exactly **one** task is `active` at any moment.
- Start the next task **only after** the current one is verified end-to-end.
- No multi-tasking justified as "optimization." Little's Law (L = λ·W): higher WIP →
  longer lead time per feature. Less code, finished, beats more code, half-done.

## Completion Evidence (not "looks right")
A task is done only with **executable** proof, never prose:
- ✓ `curl -X POST /tasks → 201` ; `make check` green
- ✗ "the handler looks correct"

## Completion Pressure
New activation is **blocked** until the current task passes its evidence. Finish-before-start
is enforced, not encouraged.

## Verified Completion Rate (VCR)
`VCR = verified tasks ÷ activated tasks`. If **VCR < 1.0**, do not activate anything new —
drive the in-flight task to verified first.

## Scope Surface
All task state lives in a **file**, not the conversation: unit, dependencies, and state
(`not_started` / `active` / `blocked` / `passing`). That file is `feature_list.json` (L8).

## How this study already obeys WIP=1
One lecture = one active task (see the task list + `PROGRESS.md` "in progress" holds ≤1).
Each lecture is verified (`make check` / cold-start) and committed before the next starts.
L6 deliberately shipped only `/health`, refusing CRUD overreach — WIP=1 in practice.
