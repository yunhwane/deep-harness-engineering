# Session Handoff (template)

> Optional, for long or multi-area sessions (curriculum convention). Fill at session end so
> the next session continues fast. For our lecture-by-lecture cadence, `PROGRESS.md` +
> one-commit-per-step usually suffice; use this when a session spans several active areas.

## Verified now
- What is currently working:
- What verification actually ran:

## Changed this session
- Code or behavior added:
- Infrastructure or harness changes:

## Broken or unverified
- Known defect:
- Unverified path:
- Risk for the next session:

## Next best step
- Highest-priority unfinished feature:
- Why it is next:
- What counts as passing:
- What must not change during that step:

## Commands
- Startup: `./init.sh` (or `make dev`)
- Verification: `make check`
- Session-completion gate: `make clean-state`
