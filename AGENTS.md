# AGENTS.md

> Entry point for any agent (or human) working in this repo. **Map, not manual** —
> ~100 lines that point to detail. Keep it minimal but cold-start-complete.

## 1. What is this system?
A **learning harness**: we study the 12-lecture *Harness Engineering* curriculum
(<https://walkinglabs.github.io/learn-harness-engineering/ko/>) and apply each lecture
by building a piece of a real agent harness. It is **not** a product app.

## 2. How is it structured?
```
README.md            progress tracker + the core idea
AGENTS.md            ← you are here (instruction entry point)
docs/learning-notes/ one note per lecture studied
harness/             the harness we are building (the "tack")
  README.md          map of the five subsystems (L2)
  diagnostics/       five failure layers + Diagnostic Loop (L1) + Cold-Start Test (L3)
  CONSTRAINTS.md     hard MUST / MUST NOT rules (L3)
  instructions/ environment/ state/ feedback/   subsystem slots, filled per lecture
example-app/         the "horse": a small Task API, developed under the harness
  ARCHITECTURE.md    its responsibilities/interfaces/constraints
```

## 3. How do you run it?
Nothing to run yet. `example-app/` has **no code** — we add features only once the
harness can define, verify, and track them (around L8). Studying = read a lecture,
write `docs/learning-notes/Lxx-*.md`, build the matching harness artifact.

## 4. How do you validate it?
No automated validation yet (the Feedback subsystem is built in L9-L11). Until then,
the validation is the **Cold-Start Test** (`harness/diagnostics/cold-start-test.md`):
can a fresh session answer the 5 questions from repo contents alone?

## 5. What is the current progress?
See the checklist in `README.md`. As of now: **L1-L3 complete.** Next: L4.

## Working rules
Hard rules live in `harness/CONSTRAINTS.md`. Read them before changing anything.
