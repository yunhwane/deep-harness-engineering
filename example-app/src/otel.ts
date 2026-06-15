import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node'
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base'
import { resourceFromAttributes } from '@opentelemetry/resources'
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions'

/**
 * OpenTelemetry setup (L11, deepened). A real Tracer + SimpleSpanProcessor exporting to
 * the console — no external collector required, yet the spans are genuine OTel spans
 * (trace_id/span_id/parent linkage). Without calling startOtel(), `@opentelemetry/api`
 * returns no-op tracers, so tests stay silent and clean.
 */
let provider: NodeTracerProvider | undefined

export function startOtel(serviceName = 'example-app'): NodeTracerProvider {
  if (provider) return provider
  provider = new NodeTracerProvider({
    resource: resourceFromAttributes({ [ATTR_SERVICE_NAME]: serviceName }),
    spanProcessors: [new SimpleSpanProcessor(new ConsoleSpanExporter())],
  })
  provider.register()
  return provider
}

export async function shutdownOtel(): Promise<void> {
  await provider?.shutdown()
  provider = undefined
}
