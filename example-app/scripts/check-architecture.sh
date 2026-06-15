#!/usr/bin/env bash
# Executable architecture boundaries (L10). Rules become machine-enforced, not just docs.
# Failure messages follow the agent-oriented What / Why / How format.
set -euo pipefail
cd "$(dirname "$0")/.."   # -> example-app/

# scan PATTERN DIR -- grep for PATTERN in *.ts under DIR, dropping comment lines so a
# pattern mentioned in a docstring isn't mistaken for a real call (a bug we hit once).
scan() {
  grep -rn "$1" "$2" --include='*.ts' \
    | awk -F: '{ c=$0; sub(/^[^:]*:[^:]*:/,"",c); if (c !~ /^[[:space:]]*(\*|\/\/|\/\*)/) print }'
}

fail=0

# Rule 1: only src/server.ts may bind a port. buildApp() must stay side-effect-free.
offenders=$(scan "\.listen(" src | grep -v 'src/server.ts' || true)
if [ -n "$offenders" ]; then
  echo "ARCH VIOLATION (Rule 1: app factory must not listen)"
  echo "  what: .listen() called outside src/server.ts:"
  echo "$offenders" | sed 's/^/        /'
  echo "  why:  buildApp() must be side-effect-free so tests can app.inject() and E2E can pick an ephemeral port."
  echo "  how:  move the listen() call into src/server.ts (the only entrypoint that binds a port)."
  fail=1
fi

# Rule 2: app/store code must not console.* directly (server.ts is the process boundary).
# Foreshadows L11: logging goes through observability, not ad-hoc prints.
offenders=$(scan "console\.\(log\|error\|warn\)" src | grep -v 'src/server.ts' || true)
if [ -n "$offenders" ]; then
  echo "ARCH VIOLATION (Rule 2: no ad-hoc console.* in app/store code)"
  echo "  what: console.* outside src/server.ts:"
  echo "$offenders" | sed 's/^/        /'
  echo "  why:  handlers logging directly bypass structured observability (L11) and pollute output."
  echo "  how:  use the Fastify logger (req.log / app.log), or move the print to src/server.ts startup."
  fail=1
fi

if [ "$fail" -eq 0 ]; then echo "architecture checks: OK"; fi
exit $fail
