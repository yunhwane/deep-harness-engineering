import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { trace, context, SpanStatusCode } from '@opentelemetry/api'
import { startOtel, shutdownOtel } from '../src/otel'

/**
 * Decision-layer trace (L11 deepened). Turns the harness's own scope/verification state
 * into a real OpenTelemetry trace: ONE session span, a child span per feature, and a
 * verification sub-span per passing feature — "trace per session, span per task, sub-span
 * per verification step", literally. Exported to the console (no collector needed).
 */
const here = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(here, '..', '..')

interface Feature {
  id: string
  behavior: string
  verification: string
  state: string
  evidence: string
}
const featureList = JSON.parse(
  readFileSync(resolve(repoRoot, 'harness/scope/feature_list.json'), 'utf8'),
) as { project: string; features: Feature[] }

startOtel('harness')
const tracer = trace.getTracer('harness')

const session = tracer.startSpan('harness.session')
session.setAttribute('project', featureList.project)
session.setAttribute('features.total', featureList.features.length)
session.setAttribute(
  'features.passing',
  featureList.features.filter((f) => f.state === 'passing').length,
)

context.with(trace.setSpan(context.active(), session), () => {
  for (const f of featureList.features) {
    const featureSpan = tracer.startSpan(`feature ${f.id}`, {
      attributes: { 'feature.id': f.id, 'feature.state': f.state, 'feature.behavior': f.behavior },
    })
    context.with(trace.setSpan(context.active(), featureSpan), () => {
      if (f.state === 'passing') {
        const v = tracer.startSpan('verification', {
          attributes: { 'verification.command': f.verification, 'verification.evidence': f.evidence },
        })
        v.setStatus({ code: SpanStatusCode.OK })
        v.end()
      } else {
        featureSpan.setStatus({ code: SpanStatusCode.ERROR, message: `state=${f.state}` })
      }
    })
    featureSpan.end()
  }
})

session.end()
await shutdownOtel()
