# Definition of Done (L9)

> Feedback subsystem. Completion is judged by **execution, not the agent's confidence**.
> Agents are systematically overconfident; this gate externalizes the judgment.

## The 3-layer termination gate (sequential — stop on first failure)
1. **Static** — `tsc` typecheck (and lint when added). Cheapest, least informative.
2. **Runtime** — tests execute, app boots, core path runs. Execution is the evidence.
3. **System / E2E** — real server, full user flow (curl the running app). Final defense.

A feature is `passing` only when **all three** pass. `make check` covers layers 1-2 today;
layer 3 (E2E) is formalized in L10. Until then, layer 3 = manually curl the booted server.

## "Code written" ≠ "verified done"
Unit tests mock dependencies, so they miss interface mismatches, cross-layer state, and
environment issues. Passing units is necessary, never sufficient.

## Rules
- **No refactor before the core feature passes the gate** (Refactoring Trap). Correctness
  first, then performance, then style (Completion Priority).
- **Worker ≠ evaluator.** The same model that wrote the code shouldn't be the sole judge.
  Prefer an independent verifier (separate agent / separate run / the harness running the
  command). We dogfood this: an independent sub-agent verifies before a feature flips to `passing`.
- **Error messages are teacher annotations** — specific, actionable remediation, not bare "failed".

## How a feature reaches `passing` here
1. Implement (generator). 2. `make check` (layers 1-2). 3. Boot + run the feature's
`verification` command (layer 3). 4. **Independent verifier** confirms. 5. Only then set
`state: passing` in `feature_list.json` with `evidence` (test + commit). Never self-mark.
