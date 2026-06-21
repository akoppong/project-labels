import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllPublishedPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Barcode Label Guides',
  description:
    'Practical guides for printing barcode labels from CSV files, Excel spreadsheets, and Shopify exports.',
};

export default function BlogIndexPage() {
  const posts = getAllPublishedPosts();

  return (
    <main style={{ maxWidth: '680px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <nav style={{ marginBottom: '2rem' }}>
        <Link
          href="/"
          style={{ fontSize: '0.875rem', color: 'var(--muted)', textDecoration: 'none' }}
        >
          ← Back to the label generator
        </Link>
      </nav>

      <h1
        style={{
          fontSize: '2rem',
          fontWeight: 700,
          marginBottom: '0.5rem',
          color: 'var(--foreground)',
        }}
      >
        Barcode Label Guides
      </h1>
      <p style={{ color: 'var(--muted)', marginBottom: '3rem', lineHeight: 1.6 }}>
        Practical workflows for printing barcode labels from CSV, Excel, and Shopify exports.
      </p>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {posts.map((post) => (
          <li
            key={post.slug}
            style={{
              borderBottom: '1px solid var(--panel-border)',
              paddingBottom: '1.5rem',
              marginBottom: '1.5rem',
            }}
          >
            <Link
              href={`/blog/${post.slug}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <h2
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  marginBottom: '0.25rem',
                  color: 'var(--accent)',
                }}
              >
                {post.title}
              </h2>
              <p
                style={{
                  color: 'var(--muted)',
                  fontSize: '0.9375rem',
                  lineHeight: 1.55,
                  margin: '0 0 0.375rem',
                }}
              >
                {post.description}
              </p>
              <time
                dateTime={post.publishedAt}
                style={{ fontSize: '0.8125rem', color: 'var(--muted)' }}
              >
                {new Date(post.publishedAt + 'T00:00:00').toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
