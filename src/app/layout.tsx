import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { CustomCursor } from '@/components/ui/CustomCursor';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-family-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-family-outfit',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Stray Web Design — Enterprise-Grade Websites for Erie, PA Businesses',
  description:
    'Erie businesses deserve enterprise-grade websites. Blazing-fast, accessible, AI-ready sites that help you compete with the big guys. Free site audit.',
  keywords: [
    'web design Erie PA',
    'Erie web designer',
    'small business website Erie',
    'premium web design',
    'fast website',
    'accessible website',
    'AI ready website',
    'Lighthouse score',
    'Core Web Vitals',
    'Erie Pennsylvania',
  ],
  metadataBase: new URL('https://straywebdesign.co'),
  openGraph: {
    title: 'Stray Web Design — Enterprise-Grade Websites for Erie, PA Businesses',
    description:
      'Erie businesses deserve enterprise-grade websites. Compete with the big guys. Free site audit.',
    url: 'https://straywebdesign.co',
    siteName: 'Stray Web Design',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stray Web Design — Enterprise-Grade Websites for Erie, PA Businesses',
    description:
      'Erie businesses deserve enterprise-grade websites. Compete with the big guys. Free site audit.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'Stray Web Design',
              url: 'https://straywebdesign.co',
              description:
                'Premium web design agency in Erie, PA building fast, accessible, AI-ready websites for local businesses.',
              priceRange: '$$',
              serviceType: 'Web Design',
              areaServed: {
                '@type': 'City',
                name: 'Erie',
                addressRegion: 'PA',
                addressCountry: 'US',
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Erie',
                addressRegion: 'PA',
                addressCountry: 'US',
              },
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
