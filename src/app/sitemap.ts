import type { MetadataRoute } from 'next';
import { getAllSlugs } from '@/features/label-generator/server/get-page-content';
import { getAllPublishedPosts } from '@/lib/blog';

const BASE_URL = 'https://csvtolabels.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const slugPages: MetadataRoute.Sitemap = getAllSlugs().map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const blogPosts: MetadataRoute.Sitemap = getAllPublishedPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    {
      url: BASE_URL,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...slugPages,
    ...blogPosts,
  ];
}
