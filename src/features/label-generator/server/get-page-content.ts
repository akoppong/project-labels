import {
  defaultPage,
  marketingPages,
  type MarketingPage
} from '@/features/label-generator/data/pages';

export function getPageContent(slug?: string): MarketingPage | null {
  if (!slug) {
    return defaultPage;
  }

  return marketingPages[slug] ?? null;
}

export function getAllSlugs(): string[] {
  return Object.keys(marketingPages);
}
