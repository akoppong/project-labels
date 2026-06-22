import { describe, expect, it } from '@jest/globals';
import robots from './robots';

describe('robots', () => {
  it('allows all user agents to crawl everything', () => {
    const result = robots();
    expect(result.rules).toMatchObject({ userAgent: '*', allow: '/' });
  });

  it('points to the sitemap URL', () => {
    const result = robots();
    expect(result.sitemap).toBe('https://csvtolabels.com/sitemap.xml');
  });
});
