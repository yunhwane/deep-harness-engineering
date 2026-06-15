#!/usr/bin/env bash
# Clean-state verification (L12). Session Completion = task passes validation AND this
# passes. Run at offboarding, after committing. Checks the five clean-state dimensions.
set -uo pipefail
cd "$(dirname "$0")/.."
fail=0
echo "== clean-state check (L12) =="

# Artifact dimension: idempotent cleanup first.
bash scripts/clean.sh

# Build + Test + Startup dimensions: the gate (make check = arch + typecheck + tests incl. E2E,
# and the E2E boots the real app, covering Startup).
if make check >/tmp/cs-check.log 2>&1; then
  echo "[build+test+startup] PASS"
else
  echo "[build+test+startup] FAIL"; tail -8 /tmp/cs-check.log; fail=1
fi

# Scope-state sanity (official clean-state-checklist: "feature status reflects reality",
# "no undocumented unfinished steps"): no feature left `active` between sessions, and every
# `passing` feature carries evidence.
if node -e '
  const f = JSON.parse(require("fs").readFileSync("harness/scope/feature_list.json","utf8"));
  const active = f.features.filter(x => x.state === "active");
  const noEvidence = f.features.filter(x => x.state === "passing" && !x.evidence);
  if (active.length) { console.log("  stray active:", active.map(x=>x.id).join(",")); process.exit(1); }
  if (noEvidence.length) { console.log("  passing w/o evidence:", noEvidence.map(x=>x.id).join(",")); process.exit(1); }
'; then echo "[scope state reflects reality] PASS"; else echo "[scope state] FAIL"; fail=1; fi

# Progress dimension: everything committed — no half-done work left in the tree.
if [ -z "$(git status --porcelain)" ]; then
  echo "[git tree clean / progress committed] PASS"
else
  echo "[git tree clean] FAIL — uncommitted changes:"; git status -s; fail=1
fi

if [ "$fail" -eq 0 ]; then
  echo "CLEAN STATE: OK — session may close"
else
  echo "CLEAN STATE: NOT CLEAN — session is INCOMPLETE"
fi
exit $fail
