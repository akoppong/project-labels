import type { Metadata } from 'next';
import { getPageContent } from './get-page-content';

export function buildPageMetadata(slug?: string): Metadata {
  const page = getPageContent(slug);

  if (!page) {
    return {
      title: 'Not Found',
    };
  }

  const canonicalPath = slug ? `/${slug}` : '/';

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonicalPath,
      type: 'website',
    },
  };
}
