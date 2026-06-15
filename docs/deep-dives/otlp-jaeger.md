# Deep dive — OTLP + Jaeger (real collector)

> Sends our OpenTelemetry spans to a real **Jaeger** collector over OTLP/HTTP and views
> them in the Jaeger UI. The console exporter from the earlier OTel dive becomes a
> production-shaped path with a one-line switch.

## How the switch works
`example-app/src/otel.ts` picks the exporter at runtime:
- `OTEL_EXPORTER_OTLP_ENDPOINT` set → `OTLPTraceExporter` (POSTs to `<endpoint>/v1/traces`).
- unset → `ConsoleSpanExporter`.
No code change to flip between them — exactly the swap promised in `otel-integration.md`.

## Run it
```
make jaeger-up                                   # docker: Jaeger all-in-one (UI :16686, OTLP :4318)

# decision-layer trace -> Jaeger
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318 make trace

# runtime request spans -> Jaeger
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318 make dev      # then curl the endpoints

open http://localhost:16686                      # pick service "harness" or "example-app"
make jaeger-down                                 # stop + remove the container
```

## Verified (via Jaeger query API, not just claimed)
- `GET /api/services` → `["jaeger-all-in-one","harness","example-app"]`.
- Service **harness** (decision layer): one trace, **17 spans** — `harness.session` (root)
  → 8 `feature F0x` spans → 8 `verification` sub-spans, parent linkage intact in Jaeger.
- Service **example-app** (runtime): request spans `GET /health` 200, `GET /tasks` 200,
  `GET /tasks/:id` 404, `GET /tasks/stats` 200 — templated routes + `http.status_code`.
- Prod-dependency audit after adding `@opentelemetry/exporter-trace-otlp-http`: 0 vulns.

## Notes
- `make jaeger-up` is idempotent (`docker start` an existing container, else `run`).
- Jaeger is external infra; `make clean-state` does not stop it (it only kills stray dev
  servers). Use `make jaeger-down` when finished.
- To point at any OTLP collector (Tempo, an OTel Collector, a vendor), set the same env var.
