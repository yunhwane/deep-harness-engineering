import { startOtel } from './otel'
import { buildApp } from './app'

// Register the OTel provider BEFORE building the app so request spans are recorded.
startOtel('example-app')

// Runtime observability (L11): structured JSON logs for lifecycle + every request.
const app = buildApp({ logger: true })
const port = Number(process.env.PORT ?? 3000)

app
  .listen({ port, host: '0.0.0.0' })
  .then((address) => app.log.info({ address }, 'example-app ready'))
  .catch((err) => {
    app.log.error(err, 'failed to start')
    process.exit(1)
  })
