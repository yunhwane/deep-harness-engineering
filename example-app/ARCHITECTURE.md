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

## Stack (decided L6)
- Node 26 + TypeScript (Bundler module resolution) + **Fastify** + **vitest**.
- `src/app.ts` exports `buildApp()` (factory, no listen) so tests use `app.inject(...)`.
- `src/server.ts` is the listen entrypoint. Run via `make dev`.
- Persistence: **undecided** — decide when the first write route is implemented (L8+).

## Status
**Infrastructure only (L6).** Routes implemented: `GET /health`. None of the Task CRUD
routes exist yet — they arrive once the feature list governs them (L8). Validate with
`make check` from repo root.
