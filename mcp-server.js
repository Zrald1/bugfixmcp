#!/usr/bin/env node

/**
 * This is a standalone MCP server script that can be run directly from the GitHub repository.
 * It provides a simple interface for AI agents to find broken links in Next.js projects.
 */

// Import required modules
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Define the main function
async function main() {
  // Parse command line arguments
  const args = process.argv.slice(2);
  
  // Check if the command is "find bug"
  if (args.length >= 2 && args[0] === 'find' && args[1] === 'bug') {
    console.log('Running bug finder for Next.js...');
    
    // Get the directory to check
    let dir = process.cwd();
    const dirIndex = args.indexOf('-d') !== -1 ? args.indexOf('-d') : args.indexOf('--dir');
    if (dirIndex !== -1 && args.length > dirIndex + 1) {
      dir = args[dirIndex + 1];
    }
    
    // Check if the directory is a Next.js project
    if (!isNextJsProject(dir)) {
      console.error('Error: The specified directory does not appear to be a Next.js project.');
      process.exit(1);
    }
    
    console.log(`Checking Next.js project in ${dir} for broken links...`);
    
    // Run the CLI script
    const cliPath = path.join(__dirname, 'bin', 'cli.js');
    if (fs.existsSync(cliPath)) {
      // If the CLI script exists, run it
      const cli = spawn('node', [cliPath, 'find-bug', ...args.slice(2)], {
        stdio: 'inherit'
      });
      
      cli.on('close', (code) => {
        process.exit(code);
      });
    } else {
      // If the CLI script doesn't exist, try to run the compiled version
      const distCliPath = path.join(__dirname, 'dist', 'cli', 'index.js');
      if (fs.existsSync(distCliPath)) {
        const cli = spawn('node', [distCliPath, 'find-bug', ...args.slice(2)], {
          stdio: 'inherit'
        });
        
        cli.on('close', (code) => {
          process.exit(code);
        });
      } else {
        console.error('Error: Could not find the CLI script. Please make sure the package is installed correctly.');
        process.exit(1);
      }
    }
  } else {
    console.log('Bug Finder Next.js MCP Server');
    console.log('Usage: mcp-server find bug [options]');
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
}

// Helper function to check if a directory is a Next.js project
function isNextJsProject(directory) {
  try {
    // Check if package.json exists
    const packageJsonPath = path.join(directory, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      return false;
    }
    
    // Read package.json
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Check if next is a dependency
    const hasDependency = packageJson.dependencies && packageJson.dependencies.next;
    const hasDevDependency = packageJson.devDependencies && packageJson.devDependencies.next;
    
    if (!hasDependency && !hasDevDependency) {
      return false;
    }
    
    // Check for Next.js specific directories
    const hasPagesDir = fs.existsSync(path.join(directory, 'pages'));
    const hasAppDir = fs.existsSync(path.join(directory, 'app'));
    const hasNextConfig = fs.existsSync(path.join(directory, 'next.config.js')) || 
                          fs.existsSync(path.join(directory, 'next.config.mjs'));
    
    // If it has next as a dependency and at least one of the Next.js specific directories or config
    return hasPagesDir || hasAppDir || hasNextConfig;
  } catch (error) {
    console.error('Error detecting Next.js project:', error);
    return false;
  }
}

// Run the main function
main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
