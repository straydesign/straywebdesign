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
  title: 'Stray Web Design | Custom Websites That Convert',
  description:
    "Custom websites built to convert. Tell me about your business — I'll come back with a plan for what the site should actually do. Back in 24 hours.",
  keywords: [
    'website designer',
    'website design',
    'custom web design',
    'web developer',
    'fast website',
    'accessible website',
    'AI ready website',
    'Core Web Vitals',
    'dental practice website',
    'financial advisor website',
    'car dealership website',
    'IT services website',
    'chiropractor website',
  ],
  metadataBase: new URL('https://straywebdesign.co'),
  openGraph: {
    title: 'Stray Web Design | Custom Websites That Convert',
    description:
      "Custom websites built to convert. Tell me about your business — I'll come back with a plan for what the site should actually do. Back in 24 hours.",
    url: 'https://straywebdesign.co',
    siteName: 'Stray Web Design',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stray Web Design | Custom Websites That Convert',
    description:
      "Custom websites built to convert. Tell me about your business — I'll come back with a plan for what the site should actually do. Back in 24 hours.",
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
    telephone: '814-402-8525',
    description:
      'Premium web design agency building fast, accessible, AI-ready websites for businesses that want to grow.',
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
      '@type': 'Country',
      name: 'United States',
    },
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'PA',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '814-402-8525',
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
    sameAs: [
      'https://www.linkedin.com/in/tom-sesler/',
      'https://straydesign.co',
      'https://tomsesler.com',
    ],
};

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Stray Web Design',
  url: 'https://straywebdesign.co',
  description:
    'Enterprise-grade websites for businesses that demand speed, accessibility, and AI readiness.',
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
    telephone: '814-402-8525',
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
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-9D1W0XLS34');${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ? `gtag('config','${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}');` : ''}`}
        </Script>
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <Script id="meta-pixel" strategy="lazyOnload">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${process.env.NEXT_PUBLIC_META_PIXEL_ID}');fbq('track','PageView');`}
          </Script>
        )}
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
