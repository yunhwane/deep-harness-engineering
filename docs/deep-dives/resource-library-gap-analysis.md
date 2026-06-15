# Deep dive — Resource Library gap analysis

> Official curriculum templates (walkinglabs `docs/ko/resources/templates/`) vs what this
> repo built. Goal: find real gaps and close the high-value ones. Where we diverge on
> purpose, say why.

## Side-by-side

| Official template | Our artifact | Verdict |
|-------------------|--------------|---------|
| `AGENTS.md` (startup workflow: `pwd`, `claude-progress`, `feature_list`, `git log -5`, `./init.sh`) | `AGENTS.md` (5 cold-start Qs, routing table, hard constraints, session routines) | Ours richer, but **missing `pwd` + `git log` micro-steps** (the `pwd` step would have caught our L11 cwd drift). **CLOSED.** |
| `feature_list.json` (`status`, `in_progress`, `verification` = array of human steps, `priority`/`area`/`title`/`user_visible_behavior`/`notes`/`last_updated`) | `state`, `active`, `verification` = single **executable** command, `_meta` | Our executable verification is **stronger** (machine-runnable, matches completion-evidence ethos). Divergence on field names + missing priority/notes — **documented as deliberate**, see below. |
| `claude-progress.md` (per-session log 001/002…) | `PROGRESS.md` (rolling state) + git history + `DECISIONS.md` | **No per-session historical log.** We rely on one-commit-per-lecture + DECISIONS. Gap acknowledged; not backfilled (busywork). |
| `session-handoff.md` | — (partly in PROGRESS "how to resume") | **No dedicated handoff file.** Official calls it optional (large/multi-area sessions). **CLOSED** (added template). |
| `clean-state-checklist.md` (6 manual checks) | `scripts/clean-state.sh` (executable) + `clean-state.md` | Ours **automated = stronger**, but didn't assert "feature status reflects reality / no undocumented unfinished steps". **CLOSED** (added scope-state sanity check). |
| `init.sh` | `Makefile` | Equivalent, but no `init.sh` convention file the official AGENTS.md references. **CLOSED** (thin wrapper over make). |
| `evaluator-rubric.md` (Correctness, Verification, Scope, **Reliability**, **Maintainability**, **Handoff readiness**; Accept/Revise/Block) | 5 dims (Behavioral, Failure paths, Arch compliance, Test evidence, Independence) | Complementary. We lacked Reliability/Maintainability/Handoff; official lacks Arch/Independence/Failure-paths. **CLOSED** (merged both + Accept/Revise/Block). |
| `quality-document.md` | `quality-report.md` | Equivalent. |

## Where we are ahead
Executable per-feature verification; automated `make clean-state`; enforced architecture
boundaries; real OpenTelemetry traces; the planner→generator→evaluator workflow; independent
verification recorded in `verification-log.md`.

## Deliberate divergences (kept on purpose)
- **`state`/`active` vs `status`/`in_progress`:** our names are internally consistent across
  feature_list, schema, scope-policy, and the OTel emitter. Renaming is a wide, low-value
  ripple; kept, and noted here so the divergence from the standard is visible (not accidental).
- **`verification` as an executable command, not a human step list:** intentional — it's what
  lets `make check` / the evaluator run it objectively (L7/L9). We trade the official's
  human-readable steps for machine-runnability.

## Gaps closed in this pass
1. `AGENTS.md` onboarding now starts with `pwd` + `git log --oneline -5`.
2. `init.sh` added (wraps `make setup`/`make check`; `RUN_START_COMMAND=1` to launch).
3. `clean-state.sh` now runs a scope-state sanity check (no stray `active`; every `passing`
   has evidence) — the semantic half of the official checklist.
4. `evaluator-rubric.md` gained Reliability, Maintainability, Handoff readiness + an
   Accept/Revise/Block verdict.

## Gaps intentionally NOT closed
- Per-session historical log (claude-progress style): covered well enough by one-commit-per-
  lecture + DECISIONS; backfilling would be busywork.
- feature_list field-name alignment: see deliberate divergences.
