# L7 — Why agents overreach and under-finish

## Thesis
Agents activate many tasks before finishing one (**overreach**) → things don't get
finished (**under-finish**). The two reinforce each other. Fix: enforce **WIP=1** as a
harness boundary.

## Mechanism
Context capacity C is finite. Activate k tasks → each gets C/k reasoning. Below the
single-task threshold, nothing finishes. WIP=1 ("small next step") → +37% completion.
Code lines and feature completion correlate **negatively**.

## Harness components
- **Completion Evidence** — executable proof (`curl → 201`), not "looks correct".
- **Scope Surface** — task state externalized to a machine-readable file (→ feature_list.json, L8).
- **Completion Pressure** — block new activation until current task verifies.
- **VCR** = verified ÷ activated; block new work when VCR < 1.0.

## Data (8-feature API)
No constraint: 5 active, 800 lines/12 files, 20% E2E, 3/8 done by session 3.
WIP=1: 1 active, 200 lines/4 files, 100% per feature, 7/8 done by session 3.

## Terms / anti-patterns
Little's Law (L=λ·W), scope creep. Anti-patterns: multitask-as-efficiency, "done"=code
exists, scope kept in chat, ignoring dependencies.

## Applied in this repo
- `harness/scope/scope-policy.md` — WIP=1, completion evidence, completion pressure, VCR.
- CONSTRAINTS.md: 3 new MUST rules (WIP=1; done=executable evidence; scope in a file).
- AGENTS.md: added WIP=1 to the always-on hard constraints + a routing entry.

## Dogfooding insight
We were already running WIP=1: one lecture = one active task → verify (`make check` /
cold-start) → commit → next; `PROGRESS.md` "in progress" never holds more than one. L6's
refusal to build CRUD was overreach-avoidance. L7 just names and enforces the discipline,
and hands the baton to L8, which builds the scope surface (`feature_list.json`) the policy governs.
