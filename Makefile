# Bootstrap contract (L6). The four commands a new session can rely on.
# All operate on example-app/ (the only thing with a runtime so far).

APP := example-app

.PHONY: setup dev test typecheck arch check trace jaeger-up jaeger-down clean clean-state

setup:   ## install + lock dependencies from scratch
	cd $(APP) && npm install

dev:     ## run the dev server (watch mode)
	cd $(APP) && npm run dev

test:    ## run all tests once (unit/integration + E2E)
	cd $(APP) && npm test

typecheck: ## TypeScript type checking, no emit
	cd $(APP) && npm run typecheck

arch:    ## executable architecture boundary checks (L10)
	cd $(APP) && bash scripts/check-architecture.sh

check:   ## the gate (L9 3 layers): arch + typecheck + tests (incl. E2E)
	cd $(APP) && bash scripts/check-architecture.sh && npm run typecheck && npm test

trace:   ## emit the decision-layer trace (feature_list -> OTel spans). Console by default;
         ## set OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318 to send to Jaeger.
	cd $(APP) && npx tsx scripts/emit-feature-trace.ts

jaeger-up:   ## start Jaeger (OTLP in :4318/:4317, UI on http://localhost:16686) via docker
	docker start jaeger 2>/dev/null || docker run -d --name jaeger \
	  -e COLLECTOR_OTLP_ENABLED=true -p 16686:16686 -p 4318:4318 -p 4317:4317 \
	  jaegertracing/all-in-one:latest

jaeger-down: ## stop + remove the Jaeger container
	docker rm -f jaeger 2>/dev/null || true

clean:   ## idempotent cleanup: stop stray servers, remove scratch logs (L12)
	bash scripts/clean.sh

clean-state: ## L12 session-completion gate: clean + check + git tree clean
	bash scripts/clean-state.sh
