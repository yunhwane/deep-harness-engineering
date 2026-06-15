#!/usr/bin/env bash
# Idempotent session cleanup (L12). Safe to run any number of times.
set -uo pipefail

# Artifact dimension: stop any stray example-app dev/start servers spawned this session.
# (The cwd/process drift in L11 is exactly what this guards against.)
pkill -f 'tsx (watch )?src/server.ts' 2>/dev/null || true

# Scratch logs this harness writes to /tmp during verification.
rm -f /tmp/app.log /tmp/obs.log /tmp/c.log /tmp/cs-check.log /tmp/health.json 2>/dev/null || true

echo "clean: stray dev servers stopped (if any); scratch logs removed; node_modules/dist are gitignored"
