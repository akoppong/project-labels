import { LabelGeneratorRoute } from '@/features/label-generator/components/label-generator-route';
import { buildPageMetadata } from '@/features/label-generator/server/metadata';
import { JsonLd } from '@/components/json-ld';

export const metadata = buildPageMetadata();

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'CSV to Labels',
          url: 'https://csvtolabels.com',
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'CSV to Labels',
          url: 'https://csvtolabels.com',
          description: 'Turn CSV product data into printable barcode labels.',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Any',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            description: 'Free preview with paid PDF export.',
          },
        }}
      />
      <LabelGeneratorRoute />
    </>
  );
}
