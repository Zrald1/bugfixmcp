import { isValidUrl, normalizeUrl } from './urlUtils';

describe('URL Utilities', () => {
  describe('isValidUrl', () => {
    it('should return true for valid URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://localhost:3000')).toBe(true);
      expect(isValidUrl('https://example.com/path/to/page')).toBe(true);
    });

    it('should return false for invalid URLs', () => {
      expect(isValidUrl('not-a-url')).toBe(false);
      expect(isValidUrl('/relative/path')).toBe(false);
      expect(isValidUrl('')).toBe(false);
    });
  });

  describe('normalizeUrl', () => {
    it('should remove trailing slashes', () => {
      expect(normalizeUrl('https://example.com/')).toBe('https://example.com');
      expect(normalizeUrl('https://example.com/path/')).toBe('https://example.com/path');
    });

    it('should remove fragments', () => {
      expect(normalizeUrl('https://example.com#fragment')).toBe('https://example.com');
      expect(normalizeUrl('https://example.com/path#fragment')).toBe('https://example.com/path');
    });

    it('should handle invalid URLs gracefully', () => {
      expect(normalizeUrl('not-a-url')).toBe('not-a-url');
    });
  });
});
