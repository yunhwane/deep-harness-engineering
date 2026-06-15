# example-app — Task API

The "horse." A deliberately small project developed **under the harness** in `../harness/`.
Kept minimal on purpose: the lessons are about the harness, not the app.

## Run
```
make setup    # from repo root: install deps
make dev      # start server on :3000 (GET /health)
make check    # typecheck + tests
```

## Stack
Node 26 + TypeScript + Fastify + vitest. See `ARCHITECTURE.md` for layout and
`../harness/environment/README.md` for the bootstrap contract.

## Status
Infrastructure only (L6): `GET /health` works and is tested. The Task CRUD surface
(`POST/GET/PATCH/DELETE /tasks`) is added once the feature list defines it (L8).
