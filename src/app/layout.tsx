import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import type { Metadata } from 'next';
import './globals.css';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans'
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono'
});

export const metadata: Metadata = {
  title: {
    default: 'CSV Barcode Label PDF Generator',
    template: '%s | CSV to Labels'
  },
  description: 'Turn CSV product data into printable barcode labels.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const umamiScriptUrl =
    process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL ?? 'https://analytics.umami.is/script.js';

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        {umamiWebsiteId && (
          <Script
            src={umamiScriptUrl}
            data-website-id={umamiWebsiteId}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
