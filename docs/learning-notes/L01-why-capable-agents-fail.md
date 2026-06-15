# L1 — Why capable agents still fail

## Thesis
Model capability and execution reliability are **separate axes**. Same model + same
prompt → 20 min broken game (no harness) vs 6 hr playable game (full harness). The
delta is infrastructure, not intelligence.

## The five failure modes
1. Unclear task definition → unfounded assumptions
2. Missing architecture knowledge → wrong conventions / outdated APIs
3. Inadequate dev environment → context wasted on infra debugging
4. Absent verification → premature "done" (*context anxiety*)
5. Lost state across sessions → re-exploration; failure spikes past ~30 min

## Evidence
- **Anthropic**: controlled harness experiment (the game).
- **OpenAI**: ~1M lines / 5 months, 3 engineers, ~1,500 PRs — engineers *designed
  environments and feedback loops*, did not write code directly.

## Terms
- Capability Gap, Verification Gap, Diagnostic Loop, Definition of Done.

## Takeaway → action
- On failure: **diagnose the harness**, not the model.
- Encode the 5 layers as a reusable diagnostic → `harness/diagnostics/failure-layers.md`.
- AGENTS.md can beat a model upgrade.

## Applied in this repo
- Created project skeleton (`example-app/` = horse, `harness/` = tack).
- Encoded the five defense layers + Diagnostic Loop as the harness's first artifact.
