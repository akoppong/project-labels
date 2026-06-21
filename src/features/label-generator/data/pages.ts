export type MarketingPage = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  h1: string;
  body: string;
};

export const defaultPage: MarketingPage = {
  slug: '',
  eyebrow: 'CSV to Avery 5160 barcode labels',
  title: 'CSV Barcode Label PDF Generator',
  description: 'Turn CSV product data into printable barcode labels.',
  h1: 'Turn a CSV into printable barcode labels.',
  body: 'Paste SKUs from Shopify, Etsy, Square, or your inventory spreadsheet. Preview labels free. Export a clean PDF when it is ready to print.'
};

export const marketingPages: Record<string, MarketingPage> = {
  'bulk-barcode-generator': {
    slug: 'bulk-barcode-generator',
    eyebrow: 'CSV barcode label generator',
    title: 'Bulk Barcode Generator from CSV',
    description: 'Generate printable Code 128 barcode labels from a CSV file.',
    h1: 'Bulk barcode generator from CSV',
    body: 'Paste product SKUs or IDs from a spreadsheet and preview Avery 5160 barcode labels before exporting a clean PDF.'
  },
  'barcode-label-generator': {
    slug: 'barcode-label-generator',
    eyebrow: 'CSV barcode label generator',
    title: 'Barcode Label Generator',
    description: 'Create Avery 5160 barcode label sheets from product codes.',
    h1: 'Barcode label generator',
    body: 'Built for sellers and inventory teams who need printable barcode labels without desktop label software.'
  },
  'code-128-barcode-generator': {
    slug: 'code-128-barcode-generator',
    eyebrow: 'CSV barcode label generator',
    title: 'Code 128 Barcode Generator',
    description: 'Generate Code 128 barcode labels from SKUs and internal product IDs.',
    h1: 'Code 128 barcode generator',
    body: 'Code 128 works well for internal SKUs, product IDs, bin labels, and inventory workflows.'
  },
  'print-barcode-labels-from-csv': {
    slug: 'print-barcode-labels-from-csv',
    eyebrow: 'CSV barcode label generator',
    title: 'Print Barcode Labels from CSV',
    description: 'Turn spreadsheet rows into a print-ready barcode label PDF.',
    h1: 'Print barcode labels from CSV',
    body: 'Skip mail merge and manual copy-paste. Paste a CSV, preview labels, and export a clean PDF.'
  },
  'shopify-barcode-labels-from-csv': {
    slug: 'shopify-barcode-labels-from-csv',
    eyebrow: 'CSV barcode label generator',
    title: 'Shopify Barcode Labels from CSV',
    description: 'Create barcode labels from a Shopify product export CSV.',
    h1: 'Shopify barcode labels from CSV',
    body: 'Export products from Shopify, paste the CSV here, and create printable labels without installing a Shopify app.'
  },
  'official-upc-barcodes': {
    slug: 'official-upc-barcodes',
    eyebrow: 'CSV barcode label generator',
    title: 'Official UPC Barcode Guidance',
    description: 'Learn why official UPC and GTIN identifiers should come from GS1.',
    h1: 'Official UPC barcodes and GS1',
    body: 'This tool renders barcode labels from codes you provide. It does not issue official UPC, GTIN, or GS1 identifiers.'
  }
};
