# L3 — Why the repository must become the system of record

## Thesis
Agents can't see outside the repo. "Not in the repo = doesn't exist." So the repo must
be the **System of Record (SoR)** — the highest-authority spec.

## What an agent can see (the whole list)
repo contents + system prompt + task description + tool outputs. Everything else is invisible.
→ **Knowledge Visibility Gap** (total knowledge − repo knowledge) correlates with failure.

## What belongs in the repo
- `AGENTS.md` (root, 50-100 lines) — entry point.
- `ARCHITECTURE.md` (beside each module) — knowledge near code.
- `CONSTRAINTS.md` — MUST / MUST NOT.
- `PROGRESS.md` — state (built fully in L5).
- `Makefile` — standardized commands (built when there's code to run).

## Cold-Start Test (5 questions)
what / structure / run / validate / progress — answerable from repo alone, else map gap.

## ACID for agent state
Atomicity (1 task = 1 commit), Consistency (validate before commit), Isolation
(branches/separate progress files), Durability (git-tracked truth — "paper doesn't lie").

## Anti-patterns
Knowledge Decay (stale docs worse than none), Discovery Cost (buried info), External
Authority (trusting Slack/memory over repo).

## Applied in this repo
- `git init` on `main` — establishes Durability + SoR.
- Wrote root `AGENTS.md` answering all 5 cold-start questions **truthfully** (this is a
  learning harness, app not built yet — did NOT fake commands/tests = avoided Knowledge Decay).
- `harness/CONSTRAINTS.md` with MUST/MUST NOT, incl. "no aspirational docs" and "repo wins".
- `example-app/ARCHITECTURE.md` — knowledge beside the (future) code, honest "not implemented".
- Encoded the Cold-Start Test as `harness/diagnostics/cold-start-test.md`.

## Dogfooding insight
The lecture's anti-pattern (Knowledge Decay) actively shaped our choices: we refused to
write a Makefile claiming tests pass when no code exists. The harness rules constrain us
the same way they'd constrain an agent — that's dogfooding working.
