#!/usr/bin/env bash
# Standard startup + verification path (curriculum convention). Thin wrapper over the
# Makefile so the official AGENTS.md workflow (`./init.sh`) works here too. Idempotent.
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

echo "==> Working directory: $PWD"
echo "==> Syncing dependencies"
make setup

echo "==> Running baseline verification"
make check

echo "==> Startup command: make dev"
if [ "${RUN_START_COMMAND:-0}" = "1" ]; then
  echo "==> Starting the app"
  exec make dev
fi
echo "Set RUN_START_COMMAND=1 to have init.sh launch the app directly."
