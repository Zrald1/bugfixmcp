# npm Publishing Guide

Follow these steps to publish your package to npm:

## Prerequisites

1. Create an npm account if you don't have one:
   - Go to https://www.npmjs.com/signup

2. Log in to npm from your terminal:
   ```bash
   npm login
   ```

## Before Publishing

1. The package.json file has been updated with your information:
   - Author: Gerald
   - GitHub username: gerald
   - Repository: https://github.com/gerald/bug-finder-nextjs-mcp-server

2. Make sure all tests pass:
   ```bash
   npm test
   ```

3. Build the project:
   ```bash
   npm run build
   ```

## Publishing

1. For the first time publishing:
   ```bash
   npm publish
   ```

2. For subsequent updates, increment the version number first:
   ```bash
   npm version patch  # For bug fixes
   npm version minor  # For new features
   npm version major  # For breaking changes
   npm publish
   ```

## After Publishing

1. Create a new release on GitHub:
   - Go to https://github.com/Zrald1/bugfixmcp/releases/new
   - Tag version: v1.0.0 (match your npm version)
   - Release title: v1.0.0
   - Description: Include what's new in this release
   - Click "Publish release"

2. Verify your package is available:
   - Check https://www.npmjs.com/package/bug-finder-nextjs-mcp-server

## Using Your Published Package

Once published, users can install your package globally:

```bash
npm install -g bug-finder-nextjs-mcp-server
```

Or run it directly with npx:

```bash
npx bug-finder-nextjs-mcp-server find-bug
```
