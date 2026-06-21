import { getPageContent } from '@/features/label-generator/server/get-page-content';
import { Hero } from './hero';
import { PageShell } from './page-shell';
import { WorkflowClient } from './workflow-client';

export function LabelGeneratorRoute({ slug }: { slug?: string }) {
  const page = getPageContent(slug);

  if (!page) {
    return null;
  }

  return (
    <PageShell>
      <Hero eyebrow={page.eyebrow} title={page.h1} body={page.body} />
      <WorkflowClient />
    </PageShell>
  );
}
