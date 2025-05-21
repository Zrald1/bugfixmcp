#!/bin/bash

echo "Running Bug Finder for Next.js..."

if [ "$1" = "find-bug" ]; then
  bug-finder find-bug "${@:2}"
else
  echo "Usage: bug-finder.sh find-bug [options]"
  echo ""
  echo "Options:"
  echo "  -d, --dir <directory>     Directory of the Next.js project (default: current directory)"
  echo "  -t, --timeout <ms>        Timeout for each request in milliseconds (default: 5000)"
  echo "  -c, --concurrency <number> Number of concurrent requests (default: 5)"
  echo "  -o, --output <file>       Output file for the report"
  echo "  --include-external        Include external links in the check"
  echo "  --verbose                 Show verbose output"
  echo "  -h, --help                Display help information"
fi
