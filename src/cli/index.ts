import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { LinkChecker } from '../core/linkChecker';
import { formatResults } from '../utils/formatter';
import { isNextJsProject } from '../utils/projectDetector';

const program = new Command();

// Define the version and description
program
  .name('bug-finder')
  .description('An MCP server that checks for 404 links in Next.js applications')
  .version('1.0.0');

// Define the main command
program
  .command('find-bug')
  .description('Find broken links in a Next.js project')
  .option('-d, --dir <directory>', 'Directory of the Next.js project', process.cwd())
  .option('-t, --timeout <ms>', 'Timeout for each request in milliseconds', '5000')
  .option('-c, --concurrency <number>', 'Number of concurrent requests', '5')
  .option('-o, --output <file>', 'Output file for the report')
  .option('--include-external', 'Include external links in the check', false)
  .option('--verbose', 'Show verbose output', false)
  .action(async (options) => {
    const spinner = ora('Checking if this is a Next.js project...').start();

    try {
      // Check if the directory is a Next.js project
      if (!await isNextJsProject(options.dir)) {
        spinner.fail(chalk.red('The specified directory does not appear to be a Next.js project.'));
        process.exit(1);
      }

      spinner.succeed(chalk.green('Next.js project detected.'));
      spinner.text = 'Initializing link checker...';

      // Initialize the link checker
      const linkChecker = new LinkChecker({
        projectDir: options.dir,
        timeout: parseInt(options.timeout),
        concurrency: parseInt(options.concurrency),
        includeExternal: options.includeExternal,
        verbose: options.verbose
      });

      spinner.text = 'Scanning for links...';

      // Start the link checking process
      const results = await linkChecker.check();

      spinner.succeed(chalk.green('Link checking completed.'));

      // Format and display the results
      const formattedResults = formatResults(results);
      console.log(formattedResults);

      // Save to file if output option is provided
      if (options.output) {
        const fs = require('fs');
        fs.writeFileSync(options.output, JSON.stringify(results, null, 2));
        console.log(chalk.green(`Results saved to ${options.output}`));
      }

      // Exit with error code if broken links were found
      if (results.brokenLinks.length > 0) {
        process.exit(1);
      }
    } catch (error) {
      spinner.fail(chalk.red(`Error: ${error instanceof Error ? error.message : String(error)}`));
      if (options.verbose) {
        console.error(error);
      }
      process.exit(1);
    }
  });

// Add a special command for AI agents
program
  .command('find')
  .argument('<query>', 'Query to find bugs')
  .description('AI agent command to find bugs')
  .action((query) => {
    if (query.toLowerCase() === 'bug') {
      // Redirect to the main command with default options
      const findBugCommand = program.commands.find(cmd => cmd.name() === 'find-bug');
      if (findBugCommand) {
        // Execute the command with default options
        findBugCommand.parseAsync([]);
      } else {
        console.log(chalk.yellow('Command "find-bug" not found.'));
      }
    } else {
      console.log(chalk.yellow(`Unknown query: ${query}. Did you mean 'find bug'?`));
    }
  });

// Parse the command line arguments
program.parse(process.argv);

// If no arguments provided, show help
if (process.argv.length === 2) {
  program.help();
}
