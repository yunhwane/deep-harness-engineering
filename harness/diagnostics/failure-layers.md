# The Five Defense Layers (Diagnostic Model)

> From Lecture 1. When an agent fails, attribute the failure to **exactly one** of
> these layers, fix that layer, and rerun. This is the **Diagnostic Loop**:
>
> ```
> run → observe failure → attribute to a layer → fix the layer → rerun
> ```
>
> Rule of thumb: a failing agent is usually a signal of a harness defect, **not** a
> reason to upgrade the model.

| # | Layer | Failure looks like | Fix lives in (later lectures) |
|---|-------|--------------------|-------------------------------|
| 1 | **Task definition** | Agent invents requirements from vague specs | feature_list.json (L8) |
| 2 | **Architecture knowledge** | Wrong conventions, outdated APIs, ignored patterns | AGENTS.md (L3, L4) |
| 3 | **Execution environment** | Context burned debugging deps/versions | init phase (L6) |
| 4 | **Verification feedback** | "Done" declared with no evidence | DoD + E2E (L9, L10) |
| 5 | **State continuity** | Re-exploration every session; fails past ~30 min | progress file (L5, L12) |

## Definition of Done (DoD)

A task is done only when **machine-verifiable** conditions pass — never "looks right":

- tests pass
- linter clean
- type checks pass

## Key gaps to watch

- **Capability Gap** — benchmark score (SWE-bench ~50-60%) vs real-world success.
- **Verification Gap** — agent's confidence vs actual correctness. Closing this is
  the whole point of layer 4.

## Dogfooding note

Every artifact we add to `harness/` in later lectures should map back to one of the
five layers above. If it doesn't reduce a known failure mode, it's decoration.
