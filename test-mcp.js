#!/usr/bin/env node

// This is a simple test script to verify the MCP server works
console.log('Testing the bug-finder-nextjs-mcp-server...');

// Simulate an AI agent command
const command = process.argv[2] || 'help';

if (command === 'find bug') {
  console.log('Executing "find bug" command...');
  // In a real scenario, this would call the MCP server
  // We need to modify process.argv to match the expected format
  process.argv = [
    process.argv[0],
    process.argv[1],
    'find',
    'bug',
    '-d',
    './test-nextjs-project',
    '--verbose',
    '--include-external'
  ];
  require('./bin/cli');
} else {
  console.log(`Unknown command: ${command}`);
  console.log('Available commands:');
  console.log('  find bug - Find broken links in a Next.js project');
}
