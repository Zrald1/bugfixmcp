import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';
import { LinkResult, CheckResult } from '../types/types';
import { findLinks } from '../utils/linkExtractor';
import { isValidUrl, normalizeUrl } from '../utils/urlUtils';
import puppeteer from 'puppeteer';

interface LinkCheckerOptions {
  projectDir: string;
  timeout: number;
  concurrency: number;
  includeExternal: boolean;
  verbose: boolean;
}

export class LinkChecker {
  private options: LinkCheckerOptions;
  private checkedUrls: Map<string, LinkResult>;
  private baseUrl: string;
  private devServer: any;

  constructor(options: LinkCheckerOptions) {
    this.options = {
      projectDir: options.projectDir || process.cwd(),
      timeout: options.timeout || 5000,
      concurrency: options.concurrency || 5,
      includeExternal: options.includeExternal || false,
      verbose: options.verbose || false
    };
    this.checkedUrls = new Map();
    this.baseUrl = 'http://localhost:3000';
  }

  /**
   * Start the link checking process
   */
  async check(): Promise<CheckResult> {
    try {
      // Start a development server for the Next.js project
      await this.startDevServer();

      // Find all pages in the Next.js project
      const pages = await this.findNextJsPages();

      if (this.options.verbose) {
        console.log(`Found ${pages.length} pages to check`);
      }

      // Start a browser instance
      const browser = await puppeteer.launch({ headless: true });

      try {
        // Process pages in batches based on concurrency
        const results = [];
        for (let i = 0; i < pages.length; i += this.options.concurrency) {
          const batch = pages.slice(i, i + this.options.concurrency);
          const batchResults = await Promise.all(
            batch.map(page => this.checkPage(page, browser))
          );
          results.push(...batchResults.flat());
        }

        // Process the results
        const validLinks: LinkResult[] = [];
        const brokenLinks: LinkResult[] = [];

        for (const result of this.checkedUrls.values()) {
          if (result.status >= 400) {
            brokenLinks.push(result);
          } else {
            validLinks.push(result);
          }
        }

        return {
          totalLinks: this.checkedUrls.size,
          validLinks,
          brokenLinks
        };
      } finally {
        // Close the browser
        await browser.close();

        // Stop the development server
        this.stopDevServer();
      }
    } catch (error) {
      console.error('Error during link checking:', error);
      throw error;
    }
  }

  /**
   * Check a single page for broken links
   */
  private async checkPage(page: string, browser: any): Promise<LinkResult[]> {
    const pageUrl = `${this.baseUrl}${page}`;

    if (this.options.verbose) {
      console.log(`Checking page: ${pageUrl}`);
    }

    try {
      // Open the page in the browser
      const browserPage = await browser.newPage();
      await browserPage.goto(pageUrl, {
        waitUntil: 'networkidle2',
        timeout: this.options.timeout
      });

      // Get the HTML content
      const content = await browserPage.content();

      // Close the page
      await browserPage.close();

      // Extract links from the page
      const links = findLinks(content, pageUrl);

      // Check each link
      const results: LinkResult[] = [];

      for (const link of links) {
        // Skip external links if not included
        if (!this.options.includeExternal && !link.isInternal) {
          continue;
        }

        // Skip already checked URLs
        const normalizedUrl = normalizeUrl(link.url);
        if (this.checkedUrls.has(normalizedUrl)) {
          continue;
        }

        // Check the link
        const result = await this.checkLink(link.url, page);
        this.checkedUrls.set(normalizedUrl, result);
        results.push(result);
      }

      return results;
    } catch (error) {
      console.error(`Error checking page ${pageUrl}:`, error);
      return [];
    }
  }

  /**
   * Check a single link
   */
  private async checkLink(url: string, sourcePage: string): Promise<LinkResult> {
    if (this.options.verbose) {
      console.log(`Checking link: ${url}`);
    }

    const result: LinkResult = {
      url,
      sourcePage,
      status: 0,
      statusText: '',
      isInternal: url.startsWith(this.baseUrl) || url.startsWith('/')
    };

    try {
      const response = await axios.get(url, {
        timeout: this.options.timeout,
        validateStatus: () => true // Don't throw on error status codes
      });

      result.status = response.status;
      result.statusText = response.statusText;
    } catch (error) {
      result.status = 404;
      result.statusText = error instanceof Error ? error.message : String(error);
    }

    return result;
  }

  /**
   * Find all Next.js pages in the project
   */
  private async findNextJsPages(): Promise<string[]> {
    const pagesDir = path.join(this.options.projectDir, 'pages');
    const appDir = path.join(this.options.projectDir, 'app');

    let pages: string[] = [];

    // Check pages directory (pages router)
    if (fs.existsSync(pagesDir)) {
      const pageFiles = await glob('**/*.{js,jsx,ts,tsx}', { cwd: pagesDir });

      pages = pageFiles
        .filter((file: string) => !file.includes('_app') && !file.includes('_document'))
        .map((file: string) => {
          const pagePath = file.replace(/\.(js|jsx|ts|tsx)$/, '');
          return pagePath === 'index' ? '/' : `/${pagePath}`;
        });
    }

    // Check app directory (app router)
    if (fs.existsSync(appDir)) {
      const pageFiles = await glob('**/page.{js,jsx,ts,tsx}', { cwd: appDir });

      const appPages = pageFiles.map((file: string) => {
        const dirPath = path.dirname(file);
        return dirPath === '.' ? '/' : `/${dirPath}`;
      });

      pages = [...pages, ...appPages];
    }

    return pages;
  }

  /**
   * Start a Next.js development server
   */
  private async startDevServer(): Promise<void> {
    // Implementation will depend on how you want to start the Next.js server
    // This is a placeholder for now
    console.log('Starting Next.js development server...');
    // TODO: Implement server starting logic
  }

  /**
   * Stop the Next.js development server
   */
  private stopDevServer(): void {
    // Implementation will depend on how you started the server
    console.log('Stopping Next.js development server...');
    // TODO: Implement server stopping logic
  }
}
