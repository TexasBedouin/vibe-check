#!/usr/bin/env bash
# Bump the skill version, update the changelog, commit, tag, push, and release.
# Usage: ./bump.sh <new-version> "<one-line changelog summary>"
# Example: ./bump.sh 1.1.0 "Add a competitor-teardown step to discovery"
set -euo pipefail

new="${1:?usage: ./bump.sh <new-version> \"<changelog summary>\"}"
summary="${2:?provide a one-line changelog summary}"

# ---------------------------------------------------------------------------
# Pre-flight checks. We do ALL of these before touching a single file, so if
# anything is wrong the release stops cleanly instead of leaving the repo
# half-bumped (a stale doc, an orphan tag, a "release" that shipped nothing).
# ---------------------------------------------------------------------------

# Must be run from the skill's top folder, next to these files.
for f in VERSION SKILL.md README.md CHANGELOG.md; do
  if [ ! -f "$f" ]; then
    echo "ERROR: $f not found. Run this from the skill's top folder." >&2
    exit 1
  fi
done

old="$(tr -d '[:space:]' < VERSION)"
today="$(date +%Y-%m-%d)"

# The new version must look like 1.2.3 (optionally 1.2.3-beta.1).
if ! [[ "$new" =~ ^[0-9]+\.[0-9]+\.[0-9]+([.-][0-9A-Za-z.]+)?$ ]]; then
  echo "ERROR: '$new' doesn't look like a version number (expected e.g. 1.6.0)." >&2
  exit 1
fi

# The old version (from VERSION) must be present and sane. An empty value would
# turn the find-and-replace below into "insert the new version everywhere."
if [ -z "$old" ]; then
  echo "ERROR: the VERSION file is empty. Fix it before releasing." >&2
  exit 1
fi
if [ "$new" = "$old" ]; then
  echo "ERROR: new version ($new) matches the current one. Nothing to bump." >&2
  exit 1
fi

# The current version string must actually appear in both docs. If it doesn't,
# the substitution would silently change nothing and we'd ship stale numbers.
for f in SKILL.md README.md; do
  if ! grep -qF -- "$old" "$f"; then
    echo "ERROR: current version ($old) not found in $f." >&2
    echo "       The docs may already be ahead of VERSION, or formatted differently." >&2
    echo "       Fix the version strings by hand, then re-run." >&2
    exit 1
  fi
done

# Git must be in a sane state before we start: clean tree, on the default
# branch, with an upstream to push to, and the new tag must not exist yet.
# (Untracked scratch files are fine; we only stage four named files below. What
#  we guard against is uncommitted edits to TRACKED files getting swept in.)
if [ -n "$(git status --porcelain --untracked-files=no)" ]; then
  echo "ERROR: you have uncommitted changes to tracked files. Commit or stash them first." >&2
  exit 1
fi
current_branch="$(git rev-parse --abbrev-ref HEAD)"
default_branch="$(git symbolic-ref --quiet --short refs/remotes/origin/HEAD 2>/dev/null | sed 's#^origin/##' || true)"
if [ -n "$default_branch" ] && [ "$current_branch" != "$default_branch" ]; then
  echo "ERROR: you're on '$current_branch', not the default branch '$default_branch'." >&2
  echo "       Switch with: git checkout $default_branch" >&2
  exit 1
fi
if ! git rev-parse --abbrev-ref --symbolic-full-name '@{u}' >/dev/null 2>&1; then
  echo "ERROR: this branch has no upstream to push to." >&2
  echo "       Set one with: git push -u origin $current_branch" >&2
  exit 1
fi
if git rev-parse -q --verify "refs/tags/v$new" >/dev/null; then
  echo "ERROR: tag v$new already exists locally. Pick a new version, or delete it." >&2
  exit 1
fi
if [ -n "$(git ls-remote --tags origin "refs/tags/v$new" 2>/dev/null)" ]; then
  echo "ERROR: tag v$new already exists on the remote. Pick a new version." >&2
  exit 1
fi

echo "Bumping $old -> $new"

# ---------------------------------------------------------------------------
# Make the changes.
# ---------------------------------------------------------------------------

# 1. VERSION file
printf '%s\n' "$new" > VERSION

# 2. The version number wherever it appears in SKILL.md and README.md.
#    \Q...\E treats the old version as literal text, so its dots aren't treated
#    as "match any character." The (?<![\d.]) / (?![\d]) guards keep it from
#    matching inside a longer number (so 11.6.0 and 1.6.01 are left alone), while
#    still matching the common "v1.6.0" and end-of-sentence "v1.6.0." forms.
old="$old" new="$new" perl -i -pe 's/(?<![\d.])\Q$ENV{old}\E(?![\d])/$ENV{new}/g' SKILL.md README.md

# Safety net: confirm the new version actually landed in both files before we
# commit anything. (Belt-and-suspenders with the pre-flight check above.)
for f in SKILL.md README.md; do
  if ! grep -qF -- "$new" "$f"; then
    echo "ERROR: $new was not written into $f. Aborting before commit." >&2
    echo "       Undo the half-change with: git checkout -- VERSION SKILL.md README.md" >&2
    exit 1
  fi
done

# 3. Prepend a CHANGELOG entry above the first existing release heading
tmp="$(mktemp)"
awk -v ver="$new" -v d="$today" -v s="$summary" '
  !done && /^## \[/ { printf "## [%s] - %s\n\n- %s\n\n", ver, d, s; done=1 }
  { print }
' CHANGELOG.md > "$tmp" && mv "$tmp" CHANGELOG.md

# Same safety net as the version substitutions: the awk above silently no-ops
# when CHANGELOG.md has no "## [" heading, and a release must never ship
# without its entry.
if ! grep -qF "## [$new]" CHANGELOG.md; then
  echo "ERROR: CHANGELOG entry for $new did not land (no existing '## [' heading to anchor on?)." >&2
  echo "       Undo the half-change with: git checkout -- VERSION SKILL.md README.md CHANGELOG.md" >&2
  exit 1
fi

# 4. Commit, tag, push (straight to the default branch, normal for a solo release)
git add VERSION CHANGELOG.md SKILL.md README.md
git commit -m "release: v$new - $summary"
git tag -a "v$new" -m "v$new"
git push
git push origin "v$new"

# 5. GitHub release. If gh isn't installed, skip with a clear note. If gh IS
#    installed but fails, show its real error (we don't hide stderr) and tell
#    the user the tag is already pushed, plus the exact command to finish by hand.
if ! command -v gh >/dev/null 2>&1; then
  echo "(gh CLI not installed, skipping the GitHub release."
  echo " Create it by hand: your repo on GitHub -> Releases -> Draft a new release -> tag v$new)"
elif ! gh release create "v$new" --title "v$new" --notes "$summary"; then
  echo "WARNING: 'gh release create' failed (its error is shown just above)." >&2
  echo "         The commit and tag v$new are already pushed, so the code is out." >&2
  echo "         Finish the GitHub release by hand with:" >&2
  echo "           gh release create v$new --title v$new --notes \"$summary\"" >&2
fi

echo "Done. Released v$new"
