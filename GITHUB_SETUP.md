# GitHub Repository Setup Instructions

Follow these steps to push your local repository to GitHub:

1. Create a new repository on GitHub:
   - Go to https://github.com/new
   - Name: bug-finder-nextjs-mcp-server
   - Description: An MCP server that checks for 404 links in Next.js applications
   - Visibility: Public
   - Click "Create repository"

2. Connect your local repository to GitHub:
   ```bash
   git remote add origin https://github.com/gerald/bug-finder-nextjs-mcp-server.git
   git branch -M main
   git push -u origin main
   ```

3. Verify that your code has been pushed to GitHub by visiting:
   https://github.com/gerald/bug-finder-nextjs-mcp-server
