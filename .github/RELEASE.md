# Release Process

This document explains how to create a new release of flatpickr using the automated GitHub Actions workflow.

## Manual Release Workflow

The repository includes a GitHub Actions workflow for creating releases manually. This workflow:

1. **Updates the version number** in `package.json` and `package-lock.json`
2. **Runs all tests** to ensure quality
3. **Builds the project** (JavaScript, CSS, themes, plugins, locales)
4. **Creates release packages**:
   - `flatpickr-X.Y.Z.tar.gz` - Distribution package (gzipped tar)
   - `flatpickr-X.Y.Z.zip` - Distribution package (zip)
   - `flatpickr-X.Y.Z-demo.zip` - Ready-to-run demo with all files
5. **Commits version changes** and creates a git tag
6. **Publishes a GitHub Release** with changelog and downloadable assets

## How to Create a Release

### Step 1: Navigate to Actions

1. Go to the repository on GitHub
2. Click on the **Actions** tab
3. Select **Manual Release** from the workflows list on the left

### Step 2: Trigger the Workflow

1. Click the **Run workflow** button (top right)
2. Enter the new version number in the format `X.Y.Z` (e.g., `4.6.14`)
   - Must follow semantic versioning (major.minor.patch)
   - Example: `4.6.14`, `4.7.0`, `5.0.0`
3. Click **Run workflow** to start

### Step 3: Monitor Progress

The workflow will:
- ✅ Validate the version format
- ✅ Update version in package.json
- ✅ Install dependencies
- ✅ Run all tests (must pass)
- ✅ Build the project
- ✅ Create distribution and demo packages
- ✅ Commit and tag the version
- ✅ Create a GitHub Release

### Step 4: Verify Release

Once complete, you'll find:

1. **GitHub Release** at `https://github.com/[owner]/flatpickr/releases/tag/vX.Y.Z`
   - Includes automatic changelog
   - Download links for all packages

2. **Release Assets**:
   - `flatpickr-X.Y.Z.tar.gz` - Full distribution (tar.gz)
   - `flatpickr-X.Y.Z.zip` - Full distribution (zip)
   - `flatpickr-X.Y.Z-demo.zip` - Demo package

3. **Git Tag**: `vX.Y.Z` created and pushed to repository

## Demo Package Contents

The demo package (`flatpickr-X.Y.Z-demo.zip`) includes:

- `index.html` - Ready-to-run demo page
- `dist/` - All built assets:
  - Core flatpickr files (JS and CSS)
  - All themes
  - All plugins
  - All locales
  - IE compatibility files

### Using the Demo

1. Download and extract `flatpickr-X.Y.Z-demo.zip`
2. Open `index.html` in a web browser
3. The demo is fully functional with all plugins loaded

## Version Numbering

Follow [Semantic Versioning](https://semver.org/):

- **Major version** (X.0.0): Breaking changes
- **Minor version** (X.Y.0): New features, backward compatible
- **Patch version** (X.Y.Z): Bug fixes, backward compatible

### Examples

- `4.6.13` → `4.6.14` - Bug fix release
- `4.6.13` → `4.7.0` - New features added
- `4.6.13` → `5.0.0` - Breaking changes

## Troubleshooting

### Workflow Fails on Tests

If tests fail, the workflow stops before creating a release:
1. Check the test output in the Actions log
2. Fix the failing tests
3. Run the workflow again with the same version

### Version Already Exists

If the version tag already exists:
1. Choose a different version number
2. Or delete the existing tag/release first (not recommended)

### Build Fails

If the build step fails:
1. Check the build logs in Actions
2. Ensure all dependencies are properly defined
3. Test the build locally with `npm run build`

## Changelog Generation

The workflow automatically generates a changelog by:
- Finding the previous release tag
- Listing all commits since that tag
- Formatting as a bulleted list with commit hashes

## Files Modified by Workflow

The workflow modifies these files (and commits them):
- `package.json` - Version updated
- `package-lock.json` - Version and checksums updated

## Permissions Required

The workflow requires:
- **Write** access to repository content (for commits)
- **Write** access to releases (for creating releases)
- GitHub Actions token (automatically provided)

## Manual Steps (if needed)

If you need to create a release manually:

```bash
# Update version
npm version 4.6.14 --no-git-tag-version

# Run tests
npm test

# Build
npm run build

# Create demo
mkdir release-demo
cp index.template.html release-demo/index.html
cp -r dist release-demo/

# Create packages
tar -czf flatpickr-4.6.14.tar.gz dist/ package.json README.md LICENSE.md
zip -r flatpickr-4.6.14-demo.zip release-demo/

# Commit and tag
git add package.json package-lock.json
git commit -m "Bump version to 4.6.14"
git tag -a v4.6.14 -m "Release v4.6.14"
git push && git push --tags

# Create GitHub release manually via web interface
```

## Best Practices

1. **Test thoroughly** before creating a release
2. **Use descriptive commit messages** - they appear in the changelog
3. **Follow semantic versioning** strictly
4. **Document breaking changes** in commit messages
5. **Review the generated changelog** after release creation
6. **Keep release notes updated** - edit the release if needed

## Related Documentation

- [BUILD.md](../BUILD.md) - Build system documentation
- [CONTRIBUTING.md](../.github/CONTRIBUTING.md) - Contribution guidelines
- [Semantic Versioning](https://semver.org/) - Version numbering standard
