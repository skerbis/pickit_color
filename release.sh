#!/bin/bash

# NPM Release Script
# This script will build, version, and publish the package to npm

set -e

echo "🚀 NPM Release Script"
echo "===================="
echo ""

# Check if we're on master branch
BRANCH=$(git branch --show-current)
if [ "$BRANCH" != "master" ]; then
  echo "❌ You must be on master branch to release"
  exit 1
fi

# Check for uncommitted changes
if [[ -n $(git status -s) ]]; then
  echo "❌ You have uncommitted changes. Please commit or stash them first."
  exit 1
fi

# Get current version
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo "Current version: $CURRENT_VERSION"
echo ""

# Ask for new version
read -p "Enter new version (e.g., 1.0.4): " NEW_VERSION

if [ -z "$NEW_VERSION" ]; then
  echo "❌ Version cannot be empty"
  exit 1
fi

# Validate version format
if ! [[ "$NEW_VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "❌ Version must be in format X.Y.Z (e.g., 1.0.4)"
  exit 1
fi

echo ""
echo "📦 Building version $NEW_VERSION..."
echo ""

# Update version in package.json (skip if same version)
if [ "$NEW_VERSION" != "$CURRENT_VERSION" ]; then
  npm version $NEW_VERSION --no-git-tag-version
else
  echo "⚠️  Version unchanged, skipping npm version"
fi

# Install dependencies
npm install

# Build
npm run build

echo ""
echo "✅ Build complete!"
echo ""

# Check if logged in to npm
echo "🔐 Checking npm login status..."
if ! npm whoami &>/dev/null; then
  echo "❌ Not logged in to npm. Please log in now:"
  npm login
  echo ""
fi

NPM_USER=$(npm whoami)
echo "✅ Logged in as: $NPM_USER"
echo ""
echo "📤 Publishing to npm..."
echo ""

# Publish to npm
npm publish --access public

echo ""
echo "✅ Published to npm successfully!"
echo ""

# Commit and tag
echo "📝 Creating git commit and tag..."
git add package.json package-lock.json
git commit -m "Release v$NEW_VERSION"
git tag -a "v$NEW_VERSION" -m "Release v$NEW_VERSION"

echo ""
echo "🚀 Pushing to GitHub..."
git push origin master
git push origin "v$NEW_VERSION"

echo ""
echo "🎉 Release complete!"
echo "   📦 Published: pickit-color@$NEW_VERSION"
echo "   🏷️  Tag: v$NEW_VERSION"
echo ""
