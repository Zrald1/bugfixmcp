import chalk from 'chalk';
import { CheckResult, LinkResult } from '../types/types';

/**
 * Format the check results for console output
 * 
 * @param results The check results
 * @returns A formatted string for console output
 */
export function formatResults(results: CheckResult): string {
  const { totalLinks, validLinks, brokenLinks } = results;
  
  let output = '\n';
  
  // Add a header
  output += chalk.bold('='.repeat(80)) + '\n';
  output += chalk.bold.blue('NEXT.JS LINK CHECKER REPORT') + '\n';
  output += chalk.bold('='.repeat(80)) + '\n\n';
  
  // Add summary
  output += chalk.bold('SUMMARY:') + '\n';
  output += `Total links checked: ${chalk.bold(totalLinks)}\n`;
  output += `Valid links: ${chalk.bold.green(validLinks.length)}\n`;
  output += `Broken links: ${chalk.bold.red(brokenLinks.length)}\n\n`;
  
  // Add broken links details if any
  if (brokenLinks.length > 0) {
    output += chalk.bold.red('BROKEN LINKS:') + '\n';
    
    brokenLinks.forEach((link, index) => {
      output += chalk.bold(`${index + 1}. ${link.url}`) + '\n';
      output += `   Status: ${chalk.red(`${link.status} ${link.statusText}`)}\n`;
      output += `   Found on page: ${link.sourcePage}\n`;
      output += `   Type: ${link.isInternal ? 'Internal' : 'External'}\n`;
      output += '\n';
    });
  } else {
    output += chalk.bold.green('No broken links found!') + '\n\n';
  }
  
  // Add footer
  output += chalk.bold('='.repeat(80)) + '\n';
  output += chalk.bold.blue('END OF REPORT') + '\n';
  output += chalk.bold('='.repeat(80)) + '\n';
  
  return output;
}
