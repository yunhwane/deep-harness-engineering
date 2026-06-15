# Deep dive — real OpenTelemetry integration

> Beyond the curriculum. Turns L11's runtime logs and `verification-log.md` verdicts into
> genuine OpenTelemetry traces. No external collector — `ConsoleSpanExporter` prints real
> spans (trace_id / span_id / parent linkage) to stdout.

## What was built
- `example-app/src/otel.ts` — `startOtel()` registers a `NodeTracerProvider` with a
  `SimpleSpanProcessor` + `ConsoleSpanExporter`; `shutdownOtel()` flushes. OTel 2.8 API
  (verified by introspection before coding, not assumed).
- `example-app/src/app.ts` — `onRequest`/`onResponse` hooks emit one span per request
  (`METHOD /route`, `http.method`/`http.route`/`http.status_code`). No-op unless a provider
  is registered, so tests stay silent and clean.
- `example-app/src/server.ts` — calls `startOtel()` before `buildApp()`.
- `example-app/scripts/emit-feature-trace.ts` (`make trace`) — reads `feature_list.json`
  and emits **session → feature → verification** spans, all under one trace_id.

## Verified (real output)
- Runtime: `GET /health`→200, `GET /tasks`→200, `GET /tasks/:id`→404 each produced a span
  with the templated route (low cardinality) and the status code.
- Decision layer: one `harness.session` trace, a `feature F0x` span per feature, a
  `verification` sub-span (OK) under each passing feature — parent linkage confirmed via
  `parentSpanContext.spanId`.
- `make check` stays green at 14 tests (tracing no-op in tests). Prod-dep audit: 0 vulns.

## Why this matters for harness engineering
The decision-layer trace makes "why was each feature accepted?" a navigable tree, not prose
— the same data as `verification-log.md`, now in a standard format any OTel tool can render.
Swap the console exporter for OTLP and it flows straight into Jaeger/Zipkin with no code
change. This is L11's thesis (observability is core architecture) taken to its real form.
