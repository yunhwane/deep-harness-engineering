# Bootstrap contract (L6). The four commands a new session can rely on.
# All operate on example-app/ (the only thing with a runtime so far).

APP := example-app

.PHONY: setup dev test typecheck arch check trace clean clean-state

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

trace:   ## emit the decision-layer trace (feature_list -> real OTel spans) to the console
	cd $(APP) && npx tsx scripts/emit-feature-trace.ts

clean:   ## idempotent cleanup: stop stray servers, remove scratch logs (L12)
	bash scripts/clean.sh

clean-state: ## L12 session-completion gate: clean + check + git tree clean
	bash scripts/clean-state.sh
