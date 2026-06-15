# L5 — Why long-running tasks lose continuity

## Thesis
Context windows are finite — a structural limit, not fixed by bigger models. Solve it
with **structured state persistence**: treat the agent as a forgetful-but-competent
engineer who needs a handoff journal.

## Why continuity breaks (4)
1. Context window limits (tracking reasoning+decisions+code+tool output at once)
2. Compaction loses the *why* (keeps final code, drops design rationale)
3. Session boundary drift (re-implement done work, contradict prior design)
4. Context anxiety (sensing depletion → rush, skip validation, pick simplistic)

## Solution artifacts
- **PROGRESS.md** — current state (commit/tests/lint), completed, in-progress %, known
  issues (which test fails + why), next steps (ordered).
- **DECISIONS.md** — decision · why · rejected alternatives · constraints · date. Saves the *why*.
- **Git commits** — checkpoints; messages explain action + rationale.
- **Session routines in AGENTS.md** — onboarding (read state → verify → resume) /
  offboarding (update state → verify → commit).

## Hybrid + metrics
- ≤30 min → one session; longer → state files. Start handoff prep at ~60% context use.
- **Rebuild cost** (time for a fresh session to reach working state) is THE metric: 15min→3min.
- Data: 12-pt feature 58%→100% complete, hidden defects 43%→8%, rebuild −78%.
- Model note: **Sonnet shows stronger context anxiety than Opus** (we're Opus 4.8).

## Applied in this repo
- `harness/state/PROGRESS.md` — honest current state, known issues, ordered next steps.
- `harness/state/DECISIONS.md` — logged the real decisions made so far (Task API choice,
  deferred stack, root AGENTS.md, commit-per-lecture) with rejected alternatives.
- Added onboarding/offboarding routines to AGENTS.md + a routing-table entry.
- Removed the `state/.keep` placeholder now that the slot is filled.

## Dogfooding insight
This whole study has been a multi-session continuity problem; we'd been surviving on git
checkpoints + the Task list. L5 made us write the *durable, in-repo* version so a brand
new session (or post-compaction self) resumes from PROGRESS.md, not from re-reading chat.
