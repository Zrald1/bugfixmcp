# Detailed npm Publishing Guide

This guide will walk you through the process of publishing your bug-finder-nextjs-mcp-server package to npm.

## Prerequisites

1. An npm account (create one at https://www.npmjs.com/signup if you don't have one)
2. Node.js and npm installed on your computer
3. Your bug-finder-nextjs-mcp-server project ready to be published

## Step 1: Prepare Your Package

1. Make sure your package.json is correctly configured:
   - name: "bug-finder-nextjs-mcp-server"
   - version: "1.0.0"
   - description: "An MCP server that checks for 404 links in Next.js applications"
   - main: "dist/index.js"
   - bin: { "bug-finder": "./bin/cli.js" }
   - author: Your name and contact information
   - license: "MIT"
   - repository: https://github.com/Zrald1/bugfixmcp.git

2. Ensure your .npmignore file is set up to exclude unnecessary files:
   - Source files (they'll be compiled to dist/)
   - Test files
   - Configuration files
   - Git files
   - Editor files

3. Build your project to make sure the dist/ directory is up to date:
   ```bash
   npm run build
   ```

4. Run tests to ensure everything is working:
   ```bash
   npm test
   ```

## Step 2: Log in to npm

1. Open your terminal
2. Log in to your npm account:
   ```bash
   npm login
   ```
3. Enter your username, password, and email when prompted
4. If you have two-factor authentication enabled, enter the code when prompted

## Step 3: Publish Your Package

1. Make sure you're in your project directory
2. Publish your package:
   ```bash
   npm publish
   ```
3. If this is your first time publishing this package, it will be created
4. If you're updating an existing package, you'll need to increment the version number first:
   ```bash
   npm version patch  # For bug fixes
   npm version minor  # For new features
   npm version major  # For breaking changes
   npm publish
   ```

## Step 4: Verify Your Package

1. Wait a few minutes for npm to process your package
2. Visit https://www.npmjs.com/package/bug-finder-nextjs-mcp-server to see your published package
3. Check that the README, description, and other information are displayed correctly

## Step 5: Test Your Published Package

1. Create a new directory for testing
2. Install your package globally:
   ```bash
   npm install -g bug-finder-nextjs-mcp-server
   ```
3. Run the package to make sure it works:
   ```bash
   bug-finder find-bug
   ```
4. Or test with npx:
   ```bash
   npx bug-finder-nextjs-mcp-server find-bug
   ```

## Troubleshooting

If you encounter issues:

1. **Name already taken**: Choose a different package name
2. **Version conflict**: Make sure you're incrementing the version number
3. **Authentication issues**: Run `npm login` again
4. **Publishing errors**: Check the npm error message for details

## Updating Your Package

When you make changes to your package:

1. Make your code changes
2. Update the version number:
   ```bash
   npm version patch  # For bug fixes
   npm version minor  # For new features
   npm version major  # For breaking changes
   ```
3. Build your project:
   ```bash
   npm run build
   ```
4. Publish the update:
   ```bash
   npm publish
   ```

## Next Steps

After publishing:

1. Create a GitHub release that matches your npm version
2. Share your package with the community
3. Gather feedback and make improvements
