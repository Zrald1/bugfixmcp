# Testing Guide for bug-finder-nextjs-mcp-server

This guide will help you test the bug-finder-nextjs-mcp-server with a sample Next.js project.

## Prerequisites

1. Node.js installed (version 14 or higher)
2. npm installed

## Testing with the Sample Project

We've included a sample Next.js project in the `test-nextjs-project` directory. This project has intentional broken links to test the bug finder.

### Step 1: Install Dependencies for the Test Project

```bash
cd test-nextjs-project
npm install
```

### Step 2: Start the Next.js Development Server

```bash
npm run dev
```

This will start the Next.js development server at http://localhost:3000.

### Step 3: In a New Terminal, Run the Bug Finder

```bash
# Navigate back to the root directory
cd ..

# Run the bug finder on the test project
node ./bin/cli.js find-bug --dir ./test-nextjs-project
```

You should see output indicating that the bug finder has detected broken links in the test project.

## Testing with AI Agent Command

To test the "find bug" command that would be used by AI agents:

```bash
node test-mcp.js "find bug"
```

This simulates an AI agent sending the "find bug" command to the MCP server.

## Testing with Your Own Next.js Project

You can also test the bug finder with your own Next.js project:

```bash
node ./bin/cli.js find-bug --dir /path/to/your/nextjs/project
```

## Expected Results

When running the bug finder on the test project, you should see:

1. Detection of the Next.js project
2. Scanning of pages for links
3. Identification of broken links:
   - `/nonexistent` (internal broken link)
   - `https://example.com/nonexistent` (external broken link, if --include-external is used)
4. A formatted report showing the broken links

## Troubleshooting

If you encounter issues:

1. Make sure the Next.js development server is running
2. Check that you're pointing to the correct directory
3. Try running with the `--verbose` flag for more detailed output:
   ```bash
   node ./bin/cli.js find-bug --dir ./test-nextjs-project --verbose
   ```
