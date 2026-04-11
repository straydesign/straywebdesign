#!/bin/bash
# Vercel Ignored Build Step
# Exit 1 = skip build, Exit 0 = build
# Prevents redundant deploys when only non-code assets change

# Always build if no previous deployment exists
if [ -z "$VERCEL_GIT_PREVIOUS_SHA" ]; then
  echo "✓ No previous deployment — building"
  exit 0
fi

# Files that do NOT warrant a new deploy
SKIP_PATTERNS="\.md$|\.txt$|\.sample$|\.png$|\.jpg$|\.jpeg$|\.gif$|\.ico$|\.svg$|LICENSE|\.gitignore|\.eslintrc|\.prettierrc|\.vscode/"

# Get changed files between previous deploy and current commit
CHANGED=$(git diff --name-only "$VERCEL_GIT_PREVIOUS_SHA" HEAD 2>/dev/null)

if [ -z "$CHANGED" ]; then
  echo "✗ No file changes detected — skipping"
  exit 1
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
