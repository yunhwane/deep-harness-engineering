# harness/ — the five subsystems

> From Lecture 2. A harness is **not a prompt file**. It is the whole engineering
> infrastructure outside the model weights, decomposed into **five interdependent
> subsystems**. Each is the positive construction whose *absence* is a Lecture-1
> failure layer. The two are duals.

## The kitchen 🍳

| Subsystem | Kitchen | What it is | Fixes failure layer | Built in |
|-----------|---------|------------|---------------------|----------|
| **Instruction** | recipe shelf | `AGENTS.md` / `CLAUDE.md`: overview, stack+versions, first-run cmds, hard constraints | L1 layer 2 (+1) | L3, L4 |
| **Tools** | knife rack | shell, package managers — least privilege | L1 layer 3 | L6 |
| **Environment** | gas range | dependency locks, runtime version files, Docker/devcontainer | L1 layer 3 | L6 |
| **State** | prep station | `PROGRESS.md`: done / in-progress / blocked | L1 layer 5 | L5, L12 |
| **Feedback** | QC window | explicit validation commands (highest ROI) | L1 layer 4 | L9, L10, L11 |

Missing any one subsystem = a kitchen with one broken station.

## Directory layout (slots filled lecture by lecture)

```
harness/
├── diagnostics/        # L1 — the five failure layers + Diagnostic Loop
├── instructions/       # Instruction subsystem (L3, L4) — AGENTS.md lives here
├── environment/        # Environment subsystem (L6) — locks, runtime versions
├── state/              # State subsystem (L5, L12) — PROGRESS.md
└── feedback/           # Feedback subsystem (L9-L11) — validation commands
```
(Tools subsystem is mostly *granting access*, not a file — documented in instructions.)

## Four design principles

1. **Repository as system of record** — invisible-in-repo = inaccessible to the agent (L3).
2. **Maps over manuals** — instruction files ~100 lines that *point to* detail, not encyclopedias (L4).
3. **Constrain, don't micromanage** — executable rules over enumerated directives.
4. **Component removal experiments** — remove a subsystem, hold the model constant,
   measure the drop *alongside* failure logs. That's how you prove a piece earns its keep.

## The proof (model held constant, harness only)

TypeScript/React team, GPT-4o: instructions-only 20% → +AGENTS.md 60% →
+validation commands 80% → +progress tracking 80-100%. **Feedback subsystem = highest ROI.**
