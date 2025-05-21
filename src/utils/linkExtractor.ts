import * as cheerio from 'cheerio';
import { LinkInfo } from '../types/types';
import { isValidUrl, normalizeUrl } from './urlUtils';

/**
 * Extract all links from an HTML page
 * 
 * @param html The HTML content of the page
 * @param baseUrl The base URL of the page
 * @returns An array of LinkInfo objects
 */
export function findLinks(html: string, baseUrl: string): LinkInfo[] {
  const $ = cheerio.load(html);
  const links: LinkInfo[] = [];
  const baseUrlObj = new URL(baseUrl);
  
  // Find all anchor tags
  $('a').each((_, element) => {
    const href = $(element).attr('href');
    const text = $(element).text().trim();
    
    if (!href) return;
    
    // Skip anchor links and javascript: links
    if (href.startsWith('#') || href.startsWith('javascript:')) {
      return;
    }
    
    try {
      // Normalize the URL
      let url = href;
      
      // Handle relative URLs
      if (!isValidUrl(href)) {
        if (href.startsWith('/')) {
          // Absolute path
          url = `${baseUrlObj.origin}${href}`;
        } else {
          // Relative path
          const basePath = baseUrlObj.pathname.endsWith('/') 
            ? baseUrlObj.pathname 
            : baseUrlObj.pathname.substring(0, baseUrlObj.pathname.lastIndexOf('/') + 1);
          url = `${baseUrlObj.origin}${basePath}${href}`;
        }
      }
      
      // Check if the URL is internal
      const urlObj = new URL(url);
      const isInternal = urlObj.hostname === baseUrlObj.hostname;
      
      links.push({
        url: normalizeUrl(url),
        text: text || url,
        isInternal
      });
    } catch (error) {
      console.error(`Error processing link ${href}:`, error);
    }
  });
  
  // Find all button onClick events that might contain links
  $('button').each((_, element) => {
    const onClick = $(element).attr('onClick');
    const text = $(element).text().trim();
    
    if (!onClick) return;
    
    // Try to extract URLs from onClick handlers
    const urlMatch = onClick.match(/window\.location\.href\s*=\s*['"]([^'"]+)['"]/);
    if (urlMatch && urlMatch[1]) {
      const href = urlMatch[1];
      
      try {
        // Normalize the URL
        let url = href;
        
        // Handle relative URLs
        if (!isValidUrl(href)) {
          if (href.startsWith('/')) {
            // Absolute path
            url = `${baseUrlObj.origin}${href}`;
          } else {
            // Relative path
            const basePath = baseUrlObj.pathname.endsWith('/') 
              ? baseUrlObj.pathname 
              : baseUrlObj.pathname.substring(0, baseUrlObj.pathname.lastIndexOf('/') + 1);
            url = `${baseUrlObj.origin}${basePath}${href}`;
          }
        }
        
        // Check if the URL is internal
        const urlObj = new URL(url);
        const isInternal = urlObj.hostname === baseUrlObj.hostname;
        
        links.push({
          url: normalizeUrl(url),
          text: text || url,
          isInternal
        });
      } catch (error) {
        console.error(`Error processing onClick link ${href}:`, error);
      }
    }
  });
  
  return links;
}
