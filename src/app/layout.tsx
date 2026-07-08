import type { Metadata } from 'next';
import Script from 'next/script';
import { JetBrains_Mono, Schibsted_Grotesk, Hanken_Grotesk } from 'next/font/google';
import ClientShell, { ClientExtras } from '@/components/layout/ClientShell';
import './globals.css';

// Mono — kept only as a structural accent: wordmark, // labels, captions.
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-family-jetbrains',
  weight: ['400', '500', '600'],
  adjustFontFallback: true,
});

// Display — confident humanist grotesque for hero + headings.
const schibsted = Schibsted_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-family-schibsted',
  weight: ['400', '500', '600', '700', '800'],
  adjustFontFallback: true,
});

// Body — warm, readable sans.
const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-family-hanken',
  weight: ['400', '500', '600', '700'],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Stray Web Design — Web Designer in Erie, PA | Tom Sesler",
  description:
    "Hi, I'm Tom, a web designer in Erie, PA. I design and build custom websites for consumer-facing businesses, then host them or hand them off. Call or text 814-402-8525.",
  keywords: [
    'freelance web designer',
    'web designer',
    'custom website',
    'website design',
    'brand and web design',
    'business website',
    'hand-coded website',
    'fast website',
    'accessible website',
    'Erie web designer',
  ],
  metadataBase: new URL('https://straywebdesign.co'),
  openGraph: {
    title: "Stray Web Design — Web Designer in Erie, PA | Tom Sesler",
    description:
      "Custom websites for consumer-facing businesses, designed and built by one person you can actually call.",
    url: 'https://straywebdesign.co',
    siteName: 'Stray Web Design',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Stray Web Design — Web Designer in Erie, PA | Tom Sesler",
    description:
      "Custom websites for consumer-facing businesses, designed and built by one person you can actually call.",
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
      "Tom Sesler, a freelance web designer. Custom websites — designed, built, hosted, and managed end-to-end — for businesses that want their site to carry the energy they put into the work.",
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
      name: 'Web Design Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Website Design & Build',
            description:
              'Custom, hand-coded websites — fast, accessible, mobile-first — designed around what makes the business worth choosing.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Hosting & Management',
            description:
              'Ongoing hosting, updates, and small changes so the site stays fast and current without you and your team thinking about it.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Brand & Content',
            description:
              'Pulling messaging, imagery, and customer-facing copy into one coherent voice across the whole site.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'SEO Foundations',
            description:
              'The structured-data, metadata, and performance groundwork that helps the right people find the site.',
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
    "Freelance web designer Tom Sesler. Custom websites that carry a business's energy to its customers — built, hosted, and managed.",
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Tom Sesler',
  url: 'https://straywebdesign.co',
  jobTitle: 'Freelance Web Designer',
  description:
    "Freelance web designer. I build websites for businesses that are excited about their offering and want customers to feel it.",
  worksFor: {
    '@type': 'Organization',
    name: 'Stray Web Design',
    url: 'https://straywebdesign.co',
  },
  email: 'tom@straydesign.co',
  sameAs: [
    'https://www.linkedin.com/in/tom-sesler/',
    'https://straydesign.co',
    'https://tomsesler.com',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrains.variable} ${schibsted.variable} ${hanken.variable}`}
    >
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
            __html: JSON.stringify(personSchema),
          }}
        />
      </head>
      <body className="antialiased">
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
