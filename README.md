# Bug Finder Next.js MCP Server

A specialized MCP (Machine Comprehension Protocol) server that checks for 404 links in Next.js applications. This tool helps you identify broken links in your Next.js project, improving user experience and SEO.

## Features

- 🔍 Scans Next.js projects for internal and external links
- 🚨 Identifies 404 "Not Found" errors
- 📊 Generates comprehensive reports of broken links
- 🤖 Designed to work with AI agents using the "find bug" command
- 🚀 Easy to install and use

## Installation

You can install the tool globally using npm:

```bash
npm install -g bug-finder-nextjs-mcp-server
```

Or run it directly with npx:

```bash
npx bug-finder-nextjs-mcp-server find-bug
```

## Usage

### Basic Usage

To check for broken links in your Next.js project:

```bash
bug-finder find-bug
```

This will scan your current directory for a Next.js project and check all internal links for 404 errors.

### Command Line Options

```
Options:
  -d, --dir <directory>     Directory of the Next.js project (default: current directory)
  -t, --timeout <ms>        Timeout for each request in milliseconds (default: 5000)
  -c, --concurrency <number> Number of concurrent requests (default: 5)
  -o, --output <file>       Output file for the report
  --include-external        Include external links in the check
  --verbose                 Show verbose output
  -h, --help                Display help information
```

### Examples

Check a specific Next.js project:

```bash
bug-finder find-bug --dir /path/to/nextjs-project
```

Include external links in the check:

```bash
bug-finder find-bug --include-external
```

Save the report to a file:

```bash
bug-finder find-bug --output report.json
```

### Using with AI Agents

This tool is designed to work with AI agents. When an AI agent is asked to find bugs in a Next.js project, it can use the following command:

```
find bug
```

The tool will automatically detect the Next.js project and check for broken links.

### Setting Up as an MCP Server

You can configure this tool as an MCP (Machine Comprehension Protocol) server for AI agents by adding the following configuration to your MCP config file:

```json
{
  "mcpServers": {
    "BugFinderNextJS": {
      "command": "npx",
      "args": [
        "-y",
        "bug-finder-nextjs-mcp-server@1.0.3",
        "mcp-server"
      ]
    }
  }
}
```

Save this as `mcp-config.json` in your project directory. AI agents that support MCP will be able to use this tool to find broken links in your Next.js project.

## How It Works

1. The tool first verifies that the target directory contains a Next.js project
2. It starts a development server to render the pages
3. It crawls all pages in the project to find links
4. It checks each link to see if it returns a 404 error
5. It generates a report of all broken links

## Integration with Next.js Projects

The tool works with both the Pages Router and App Router in Next.js. It can detect links in:

- Regular anchor tags (`<a href="...">`)
- Next.js Link components
- Button onClick handlers that navigate to URLs
- JavaScript navigation functions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
