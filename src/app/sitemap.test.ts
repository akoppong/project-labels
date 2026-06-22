import { describe, expect, it, jest } from '@jest/globals';
import sitemap from './sitemap';

jest.mock('@/features/label-generator/server/get-page-content', () => ({
  getAllSlugs: () => ['bulk-barcode-generator', 'barcode-label-generator'],
}));

jest.mock('@/lib/blog', () => ({
  getAllPublishedPosts: () => [
    {
      slug: 'print-barcode-labels-from-csv',
      title: 'Print Barcode Labels from CSV',
      updatedAt: '2026-06-21',
    },
  ],
}));

describe('sitemap', () => {
  it('always includes the homepage with priority 1.0', () => {
    const entries = sitemap();
    const home = entries.find((e) => e.url === 'https://csvtolabels.com');
    expect(home).toBeDefined();
    expect(home?.priority).toBe(1.0);
    expect(home?.changeFrequency).toBe('weekly');
  });

  it('always includes the blog index with priority 0.8', () => {
    const entries = sitemap();
    const blog = entries.find((e) => e.url === 'https://csvtolabels.com/blog');
    expect(blog).toBeDefined();
    expect(blog?.priority).toBe(0.8);
    expect(blog?.changeFrequency).toBe('weekly');
  });

  it('includes a URL for each marketing slug', () => {
    const entries = sitemap();
    expect(entries.some((e) => e.url === 'https://csvtolabels.com/bulk-barcode-generator')).toBe(
      true
    );
    expect(entries.some((e) => e.url === 'https://csvtolabels.com/barcode-label-generator')).toBe(
      true
    );
  });

  it('sets marketing slug pages to monthly with priority 0.7', () => {
    const entries = sitemap();
    const slug = entries.find(
      (e) => e.url === 'https://csvtolabels.com/bulk-barcode-generator'
    );
    expect(slug?.changeFrequency).toBe('monthly');
    expect(slug?.priority).toBe(0.7);
  });

  it('includes a URL for each published blog post', () => {
    const entries = sitemap();
    expect(
      entries.some((e) => e.url === 'https://csvtolabels.com/blog/print-barcode-labels-from-csv')
    ).toBe(true);
  });

  it('sets blog post lastModified from the post updatedAt field', () => {
    const entries = sitemap();
    const post = entries.find(
      (e) => e.url === 'https://csvtolabels.com/blog/print-barcode-labels-from-csv'
    );
    expect(post?.lastModified).toBe('2026-06-21');
    expect(post?.priority).toBe(0.6);
  });
});
