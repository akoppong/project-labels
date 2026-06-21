import type { Metadata } from 'next';
import { getPageContent } from './get-page-content';

export function buildPageMetadata(slug?: string): Metadata {
  const page = getPageContent(slug);

  if (!page) {
    return {
      title: 'Not Found'
    };
  }

  return {
    title: page.title,
    description: page.description
  };
}
