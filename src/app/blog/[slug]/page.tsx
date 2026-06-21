import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllPostSlugs, getPost } from '@/lib/blog';

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main style={{ maxWidth: '680px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <nav style={{ marginBottom: '2rem' }}>
        <Link
          href="/blog"
          style={{ fontSize: '0.875rem', color: 'var(--muted)', textDecoration: 'none' }}
        >
          ← All guides
        </Link>
      </nav>

      <article>
        <header style={{ marginBottom: '2.5rem' }}>
          <h1
            style={{
              fontSize: '2rem',
              fontWeight: 700,
              lineHeight: 1.25,
              marginBottom: '0.75rem',
              color: 'var(--foreground)',
            }}
          >
            {post.title}
          </h1>
          <p
            style={{
              color: 'var(--muted)',
              fontSize: '1.0625rem',
              lineHeight: 1.55,
              marginBottom: '0.5rem',
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
        </header>

        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </main>
  );
}
