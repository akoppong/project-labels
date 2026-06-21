import { LabelGeneratorRoute } from '@/features/label-generator/components/label-generator-route';
import { buildPageMetadata } from '@/features/label-generator/server/metadata';

export const metadata = buildPageMetadata();

export default function HomePage() {
  return <LabelGeneratorRoute />;
}
