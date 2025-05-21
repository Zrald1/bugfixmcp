/**
 * Represents the result of checking a single link
 */
export interface LinkResult {
  url: string;
  sourcePage: string;
  status: number;
  statusText: string;
  isInternal: boolean;
}

/**
 * Represents a link found in a page
 */
export interface LinkInfo {
  url: string;
  text: string;
  isInternal: boolean;
}

/**
 * Represents the overall result of the link checking process
 */
export interface CheckResult {
  totalLinks: number;
  validLinks: LinkResult[];
  brokenLinks: LinkResult[];
}
