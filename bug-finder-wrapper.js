#!/usr/bin/env node

/**
 * This is a simple wrapper script for the bug-finder-nextjs-mcp-server package.
 * It handles the command execution correctly.
 */

const { spawn } = require('child_process');
const path = require('path');

// Get the current working directory
const cwd = process.cwd();

// Parse command line arguments
const args = process.argv.slice(2);

// Check if the command is "find-bug"
if (args.length > 0 && args[0] === 'find-bug') {
  console.log('Running bug finder for Next.js...');

  // Create the command to run
  const command = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  const commandArgs = [
    '-y',
    'bug-finder-nextjs-mcp-server@1.0.2',
    'bug-finder',
    'find-bug',
    ...args.slice(1)
  ];

  // Execute the command
  const child = spawn(command, commandArgs, {
    stdio: 'inherit',
    cwd: cwd
  });

  // Handle process exit
  child.on('close', (code) => {
    process.exit(code);
  });
} else {
  console.log('Usage: node bug-finder-wrapper.js find-bug [options]');
  console.log('');
  console.log('Options:');
  console.log('  -d, --dir <directory>     Directory of the Next.js project (default: current directory)');
  console.log('  -t, --timeout <ms>        Timeout for each request in milliseconds (default: 5000)');
  console.log('  -c, --concurrency <number> Number of concurrent requests (default: 5)');
  console.log('  -o, --output <file>       Output file for the report');
  console.log('  --include-external        Include external links in the check');
  console.log('  --verbose                 Show verbose output');
  console.log('  -h, --help                Display help information');
}
