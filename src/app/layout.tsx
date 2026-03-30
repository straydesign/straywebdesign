import type { Metadata } from 'next';
import Script from 'next/script';
import { JetBrains_Mono } from 'next/font/google';
import ClientShell, { ClientExtras } from '@/components/layout/ClientShell';
import './globals.css';

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'optional',
  variable: '--font-family-jetbrains',
  weight: ['400', '500', '600', '700'],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: 'Stray Web Design — Enterprise-Grade Websites for Erie, PA Businesses',
  description:
    'Erie businesses deserve enterprise-grade websites. Blazing-fast, accessible, AI-ready sites built to perform. Free site audit.',
  keywords: [
    'web design Erie PA',
    'Erie web designer',
    'dental practice website Erie',
    'financial advisor website Erie',
    'car dealership website Erie',
    'IT services website Erie',
    'chiropractor website Erie',
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
      'Erie businesses deserve enterprise-grade websites. Built to perform. Free site audit.',
    url: 'https://straywebdesign.co',
    siteName: 'Stray Web Design',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stray Web Design — Enterprise-Grade Websites for Erie, PA Businesses',
    description:
      'Erie businesses deserve enterprise-grade websites. Built to perform. Free site audit.',
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Stray Web Design',
    url: 'https://straywebdesign.co',
    email: 'tom@straydesign.co',
    telephone: '814-964-0081',
    description:
      'Premium web design agency in Erie, PA building fast, accessible, AI-ready websites for local businesses.',
    priceRange: '$$',
    serviceType: 'Web Design',
    logo: 'https://straywebdesign.co/images/logo-blue-white-square.png',
    image: 'https://straywebdesign.co/images/services-cover.png',
    foundingDate: '2024',
    founder: {
      '@type': 'Person',
      name: 'Tom Sesler',
      url: 'https://tomsesler.com',
    },
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
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '814-964-0081',
      email: 'tom@straydesign.co',
      contactType: 'sales',
      availableLanguage: 'English',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Design & AI Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Enterprise-Grade Website',
            description:
              'Custom-built website with sub-1s load times, WCAG AA accessibility, and AI optimization.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Site Management',
            description:
              'Monthly hosting, SEO monitoring, content updates, analytics, and ad-ready infrastructure.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Receptionist',
            description:
              '24/7 AI-powered call answering, lead qualification, and appointment scheduling.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Multi-Channel AI Agents',
            description:
              'Unified AI brain across phone, SMS, and web chat with consistent responses and after-hours coverage.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Smart Scheduling & CRM Integration',
            description:
              'Automated booking with calendar sync and CRM auto-updates for Salesforce, HubSpot, and GoHighLevel.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Analytics & Personalization',
            description:
              'Visitor tracking, smart content personalization, conversion prediction, and heatmaps.',
          },
        },
      ],
    },
    sameAs: [],
};

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Stray Web Design',
  url: 'https://straywebdesign.co',
  description:
    'Enterprise-grade websites for Erie, PA businesses. Fast, accessible, AI-ready.',
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Stray Web Design',
  url: 'https://straywebdesign.co',
  logo: 'https://straywebdesign.co/images/logo-blue-white-square.png',
  founder: {
    '@type': 'Person',
    name: 'Tom Sesler',
    url: 'https://tomsesler.com',
  },
  foundingDate: '2024',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '814-964-0081',
    email: 'tom@straydesign.co',
    contactType: 'sales',
    availableLanguage: 'English',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrains.variable}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9D1W0XLS34"
          strategy="lazyOnload"
        />
        <Script id="gtag-init" strategy="lazyOnload">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-9D1W0XLS34');`}
        </Script>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Stray Web Design — Resources"
          href="/feed.xml"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className={`${jetbrains.className} antialiased`}>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <ClientShell>
          {children}
        </ClientShell>
        <ClientExtras />
      </body>
    </html>
  );
}
