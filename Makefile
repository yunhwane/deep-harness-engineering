# Bootstrap contract (L6). The four commands a new session can rely on.
# All operate on example-app/ (the only thing with a runtime so far).

APP := example-app

.PHONY: setup dev test typecheck check

setup:   ## install + lock dependencies from scratch
	cd $(APP) && npm install

dev:     ## run the dev server (watch mode)
	cd $(APP) && npm run dev

test:    ## run the test suite once
	cd $(APP) && npm test

typecheck: ## TypeScript type checking, no emit
	cd $(APP) && npm run typecheck

check:   ## the gate: typecheck + tests must both pass
	cd $(APP) && npm run typecheck && npm test
