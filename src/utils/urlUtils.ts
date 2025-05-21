/**
 * Check if a string is a valid URL
 * 
 * @param url The URL to check
 * @returns True if the URL is valid, false otherwise
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Normalize a URL by removing trailing slashes and fragments
 * 
 * @param url The URL to normalize
 * @returns The normalized URL
 */
export function normalizeUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    
    // Remove fragments
    urlObj.hash = '';
    
    // Get the URL string
    let normalizedUrl = urlObj.toString();
    
    // Remove trailing slash if present
    if (normalizedUrl.endsWith('/')) {
      normalizedUrl = normalizedUrl.slice(0, -1);
    }
    
    return normalizedUrl;
  } catch (error) {
    // If the URL is invalid, return it as is
    return url;
  }
}
