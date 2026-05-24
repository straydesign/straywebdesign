#!/bin/bash
# Vercel Ignored Build Step
# Exit 1 = skip build, Exit 0 = build
# Prevents redundant deploys when only non-code assets change.
#
# Fail-OPEN philosophy: any uncertainty → build. Silently skipping a real
# code change is much worse than running an extra build.

# Always build if no previous deployment exists
if [ -z "$VERCEL_GIT_PREVIOUS_SHA" ]; then
  echo "✓ No previous deployment — building"
  exit 0
fi

# Vercel uses a shallow clone by default. The previous SHA may not be in
# local history — fetch it before diffing.
if ! git cat-file -e "$VERCEL_GIT_PREVIOUS_SHA" 2>/dev/null; then
  echo "→ Previous SHA ($VERCEL_GIT_PREVIOUS_SHA) not in shallow clone — fetching"
  git fetch --depth=50 origin "$VERCEL_GIT_PREVIOUS_SHA" 2>/dev/null || \
    git fetch --unshallow origin 2>/dev/null || true
fi

# If we still can't see the previous SHA, build (don't silently skip)
if ! git cat-file -e "$VERCEL_GIT_PREVIOUS_SHA" 2>/dev/null; then
  echo "✓ Previous SHA still unreachable after fetch — building (fail-open)"
  exit 0
fi

# Files that do NOT warrant a new deploy
SKIP_PATTERNS="\.md$|\.txt$|\.sample$|\.png$|\.jpg$|\.jpeg$|\.gif$|\.ico$|\.svg$|LICENSE|\.gitignore|\.eslintrc|\.prettierrc|\.vscode/"

DIFF_ERR=$(git diff --name-only "$VERCEL_GIT_PREVIOUS_SHA" HEAD 2>&1 >/tmp/changed-files)
CHANGED=$(cat /tmp/changed-files)

# Diff itself failed → build (fail-open)
if [ -n "$DIFF_ERR" ]; then
  echo "✓ git diff errored ($DIFF_ERR) — building (fail-open)"
  exit 0
fi

# No changes at all → build (fail-open; weird state, don't silently skip)
if [ -z "$CHANGED" ]; then
  echo "✓ No file changes detected vs previous SHA — building (fail-open)"
  exit 0
fi

# Check if ANY changed file is a code/config file worth deploying for
CODE_CHANGES=$(echo "$CHANGED" | grep -vE "$SKIP_PATTERNS")

if [ -z "$CODE_CHANGES" ]; then
  echo "✗ Only non-code files changed — skipping deploy"
  echo "Changed files:"
  echo "$CHANGED" | sed 's/^/  /'
  exit 1
fi

echo "✓ Code changes detected — building"
echo "Changed files:"
echo "$CODE_CHANGES" | sed 's/^/  /'
exit 0
