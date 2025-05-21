Write-Host "Running Bug Finder for Next.js..."

if ($args[0] -eq "find-bug") {
    & npm exec -- bug-finder-nextjs-mcp-server@1.0.2 bug-finder find-bug $args[1..($args.Length-1)]
} else {
    Write-Host "Usage: bug-finder.ps1 find-bug [options]"
    Write-Host ""
    Write-Host "Options:"
    Write-Host "  -d, --dir <directory>     Directory of the Next.js project (default: current directory)"
    Write-Host "  -t, --timeout <ms>        Timeout for each request in milliseconds (default: 5000)"
    Write-Host "  -c, --concurrency <number> Number of concurrent requests (default: 5)"
    Write-Host "  -o, --output <file>       Output file for the report"
    Write-Host "  --include-external        Include external links in the check"
    Write-Host "  --verbose                 Show verbose output"
    Write-Host "  -h, --help                Display help information"
}
