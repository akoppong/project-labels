import { notFound } from 'next/navigation';
import { LabelGeneratorRoute } from '@/features/label-generator/components/label-generator-route';
import { getAllSlugs, getPageContent } from '@/features/label-generator/server/get-page-content';
import { buildPageMetadata } from '@/features/label-generator/server/metadata';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return buildPageMetadata(slug);
}

export default async function SlugPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!getPageContent(slug)) {
    notFound();
  }

  return <LabelGeneratorRoute slug={slug} />;
}
