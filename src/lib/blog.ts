import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

// Strip raw HTML blocks from markdown to prevent XSS if content ever comes
// from an untrusted source. Blog posts are repo-owned MDX files and do not
// use raw HTML, so this does not affect rendered output.
marked.use({
  renderer: {
    html() {
      return '';
    },
  },
});

const CONTENT_DIR = path.join(process.cwd(), 'content/blog');

export type BlogPost = {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  keyword: string;
  intent: string;
  draft: boolean;
  contentHtml: string;
};

export type BlogPostMeta = Omit<BlogPost, 'contentHtml'>;

function toDateString(value: unknown): string {
  if (value instanceof Date) return value.toISOString().split('T')[0];
  return String(value);
}

export function getPost(slug: string): BlogPost | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  if (data.draft === true) return null;

  return {
    title: String(data.title),
    slug: String(data.slug),
    description: String(data.description),
    publishedAt: toDateString(data.publishedAt),
    updatedAt: toDateString(data.updatedAt),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    keyword: String(data.keyword),
    intent: String(data.intent),
    draft: Boolean(data.draft),
    contentHtml: marked.parse(content) as string,
  };
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

export function getAllPublishedPosts(): BlogPostMeta[] {
  return getAllPostSlugs()
    .map((slug) => {
      const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(raw);
      if (data.draft === true) return null;
      return {
        title: String(data.title),
        slug: String(data.slug),
        description: String(data.description),
        publishedAt: toDateString(data.publishedAt),
        updatedAt: toDateString(data.updatedAt),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        keyword: String(data.keyword),
        intent: String(data.intent),
        draft: Boolean(data.draft),
      } satisfies BlogPostMeta;
    })
    .filter((p): p is BlogPostMeta => p !== null)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}
