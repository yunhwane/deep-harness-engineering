import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node'
import { ConsoleSpanExporter, SimpleSpanProcessor, type SpanExporter } from '@opentelemetry/sdk-trace-base'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { resourceFromAttributes } from '@opentelemetry/resources'
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions'

/**
 * OpenTelemetry setup (L11, deepened). Real Tracer + SimpleSpanProcessor.
 *
 * Exporter is selected at runtime:
 *  - `OTEL_EXPORTER_OTLP_ENDPOINT` set (e.g. http://localhost:4318)  -> OTLP/HTTP to a real
 *    collector (Jaeger). The exporter reads the env var and posts to `<endpoint>/v1/traces`.
 *  - unset -> ConsoleSpanExporter (no infra needed; spans print to stdout).
 *
 * Without calling startOtel(), `@opentelemetry/api` returns no-op tracers, so tests stay silent.
 */
let provider: NodeTracerProvider | undefined

function makeExporter(): SpanExporter {
  return process.env.OTEL_EXPORTER_OTLP_ENDPOINT ? new OTLPTraceExporter() : new ConsoleSpanExporter()
}

export function startOtel(serviceName = 'example-app'): NodeTracerProvider {
  if (provider) return provider
  provider = new NodeTracerProvider({
    resource: resourceFromAttributes({ [ATTR_SERVICE_NAME]: serviceName }),
    spanProcessors: [new SimpleSpanProcessor(makeExporter())],
  })
  provider.register()
  return provider
}

export async function shutdownOtel(): Promise<void> {
  await provider?.shutdown()
  provider = undefined
}
