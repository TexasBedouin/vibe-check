#!/usr/bin/env bash
# Bump the skill version, update the changelog, commit, tag, push, and release.
# Usage: ./bump.sh <new-version> "<one-line changelog summary>"
# Example: ./bump.sh 1.1.0 "Add a competitor-teardown step to discovery"
set -euo pipefail

new="${1:?usage: ./bump.sh <new-version> \"<changelog summary>\"}"
summary="${2:?provide a one-line changelog summary}"
old="$(tr -d '[:space:]' < VERSION)"
today="$(date +%Y-%m-%d)"

echo "Bumping $old -> $new"

# 1. VERSION file
printf '%s\n' "$new" > VERSION

# 2. The version number wherever it appears in SKILL.md and README.md
perl -pi -e "s/\Q$old\E/$new/g" SKILL.md README.md

# 3. Prepend a CHANGELOG entry above the first existing release heading
tmp="$(mktemp)"
awk -v ver="$new" -v d="$today" -v s="$summary" '
  !done && /^## \[/ { printf "## [%s] - %s\n\n- %s\n\n", ver, d, s; done=1 }
  { print }
' CHANGELOG.md > "$tmp" && mv "$tmp" CHANGELOG.md

# 4. Commit, tag, push (straight to the default branch, normal for a solo release)
git add VERSION CHANGELOG.md SKILL.md README.md
git commit -m "release: v$new - $summary"
git tag -a "v$new" -m "v$new"
git push
git push origin "v$new"

# 5. GitHub release (best effort, needs gh)
gh release create "v$new" --title "v$new" --notes "$summary" 2>/dev/null || echo "(skipped gh release, create it manually if you want one)"

echo "Done. Released v$new"
