import { buildApp } from './app'

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
