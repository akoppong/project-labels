export function JsonLd({ data }: { data: object }) {
  // Unicode-escape <, >, & so embedded JSON cannot break out of the script tag.
  const json = JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
