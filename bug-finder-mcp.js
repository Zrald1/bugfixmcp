#!/usr/bin/env node

/**
 * This is a simple MCP server for the bug-finder-nextjs-mcp-server package.
 * It handles the MCP protocol and executes the bug-finder command.
 */

const { spawn } = require('child_process');
const http = require('http');
const url = require('url');

// Create an HTTP server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  
  // Handle MCP requests
  if (parsedUrl.pathname === '/mcp') {
    console.log('Received MCP request');
    
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle OPTIONS request (preflight)
    if (req.method === 'OPTIONS') {
      res.statusCode = 200;
      res.end();
      return;
    }
    
    // Handle POST request
    if (req.method === 'POST') {
      let body = '';
      
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      
      req.on('end', () => {
        try {
          const data = JSON.parse(body);
          
          // Check if the command is "find bug"
          if (data.command === 'find bug') {
            console.log('Running bug finder for Next.js...');
            
            // Execute the bug-finder command
            const child = spawn('npx', [
              '-y',
              'bug-finder-nextjs-mcp-server@1.0.2',
              'bug-finder',
              'find-bug'
            ], {
              stdio: ['pipe', 'pipe', 'pipe']
            });
            
            let stdout = '';
            let stderr = '';
            
            child.stdout.on('data', (data) => {
              stdout += data.toString();
              console.log(data.toString());
            });
            
            child.stderr.on('data', (data) => {
              stderr += data.toString();
              console.error(data.toString());
            });
            
            child.on('close', (code) => {
              console.log(`Child process exited with code ${code}`);
              
              // Send the response
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify({
                result: stdout,
                error: stderr,
                exitCode: code
              }));
            });
          } else {
            // Unknown command
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 400;
            res.end(JSON.stringify({
              error: `Unknown command: ${data.command}`
            }));
          }
        } catch (error) {
          // Error parsing JSON
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 400;
          res.end(JSON.stringify({
            error: `Error parsing JSON: ${error.message}`
          }));
        }
      });
    } else {
      // Method not allowed
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 405;
      res.end(JSON.stringify({
        error: 'Method not allowed'
      }));
    }
  } else {
    // Not found
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 404;
    res.end(JSON.stringify({
      error: 'Not found'
    }));
  }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`MCP server listening on port ${PORT}`);
});
