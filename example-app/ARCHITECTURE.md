# example-app — ARCHITECTURE

> Knowledge near the code (L3 principle #1). Currently a plan, not an implementation —
> stated honestly (no aspirational claims; CONSTRAINTS.md).

## Responsibility
A minimal **Task API**: create / read / update / delete tasks. Exists only to give the
harness something real to define, verify, and track. Scope is kept tiny on purpose.

## Planned interface (to be finalized as a feature list in L8)
| Method | Path | Purpose |
|--------|------|---------|
| POST   | `/tasks`     | create a task |
| GET    | `/tasks`     | list tasks |
| GET    | `/tasks/:id` | read one task |
| PATCH  | `/tasks/:id` | update a task |
| DELETE | `/tasks/:id` | delete a task |

## Constraints (will harden over later lectures)
- Stack/runtime: **undecided** — chosen when the Environment subsystem is built (L6).
- No persistence decisions yet. Recorded here so the choice is visible when made.

## Status
**Not implemented.** No source files exist. See `README.md` (root) for why we wait.
