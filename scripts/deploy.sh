#!/usr/bin/env bash
# Rebuild the single-file bundle and sync the committed deploy copy.
#   scripts/deploy.sh          test -> build -> copy to index.html
#   scripts/deploy.sh --push   ...then commit index.html and push main (Pages redeploys)
set -euo pipefail
cd "$(dirname "$0")/.."

node --test test/*.js
node build-single-file.js
cp classicsnyc-muses.html index.html

if [ "${1:-}" = "--push" ]; then
  [ "$(git branch --show-current)" = "main" ] || { echo "refusing to push: not on main" >&2; exit 1; }
  git diff --quiet -- index.html && { echo "index.html unchanged; nothing to deploy"; exit 0; }
  git add index.html
  git commit -m "Deploy: rebuild index.html"
  git push origin main
fi
