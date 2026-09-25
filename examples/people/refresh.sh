#!/bin/sh
# refresh.sh <handle> — stamp fresh access/generation timestamps on a profile,
# regenerate its packet, validate, and publish. Run from the repo root.
set -e
cd "$(dirname "$0")/../.."
D="examples/people/$1"
[ -f "$D/generate.ts" ] || { echo "no generate.ts for $1" >&2; exit 1; }
NOW=$(date -u +%Y-%m-%dT%H:%M:%SZ)
DAY=$(date -u +%Y-%m-%dT00:00:00Z)
sed -i '' -E \
  -e "s/^const ACCESSED = \"[^\"]+\";/const ACCESSED = \"$DAY\";/" \
  -e "s/generatedAt: \"[^\"]+\",/generatedAt: \"$NOW\",/" \
  -e "s/asOf: \"[^\"]+\",/asOf: \"$NOW\",/" \
  "$D/generate.ts"
(cd "$D" && bun generate.ts)
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/$D/person-index.json" >/dev/null \
  || { echo "validation failed for $1" >&2; exit 1; }
echo "validated $1"
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/$D/person-index.json"
