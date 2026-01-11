#!/bin/bash

# Pickit Color - New Repository Setup Script
# This script initializes the new pickit-color repository

echo "🎨 Initializing Pickit Color Repository..."

# Remove old git history (optional - uncomment if you want clean history)
# rm -rf .git
# git init

# Add all files
git add -A

# Commit changes
git commit -m "Initial commit: Pickit Color v1.0.0

- Modern color picker with HSL/RGBA support
- Multiple UI modes (slider, compact, inline, input preview)
- Screen color picker (EyeDropper API + System fallback)
- Preset colors with optional labels
- Dark mode support
- Full accessibility (WCAG 2.1 AA)
- Lightweight (~15 KB minified)

Author: Thomas Skerbis (KLXM Crossmedia)
License: Donationware"

# Add remote repository
echo "📡 Adding remote repository..."
git remote add origin https://github.com/skerbis/pickit-color.git

echo "✅ Repository initialized!"
echo ""
echo "Next steps:"
echo "1. Create repository on GitHub: https://github.com/new"
echo "2. Push to GitHub: git push -u origin master"
echo "3. Publish to npm: npm publish"
echo ""
echo "🚀 Ready to deploy Pickit Color!"
