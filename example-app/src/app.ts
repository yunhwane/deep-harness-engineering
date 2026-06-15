import Fastify, { type FastifyInstance } from 'fastify'

/**
 * App factory. Returns a configured Fastify instance without listening, so tests can
 * use `app.inject(...)` and the server entrypoint can `app.listen(...)`.
 *
 * L6 scope: only a /health route exists — enough to prove the test framework bears
 * weight. The Task API routes are added later (feature list in L8), on purpose.
 */
export function buildApp(): FastifyInstance {
  const app = Fastify({ logger: false })

  app.get('/health', async () => ({ status: 'ok' }))

  return app
}
