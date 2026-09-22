import type { Metadata } from 'next';
import Analytics from '@/components/layout/Analytics';
import { JetBrains_Mono, Schibsted_Grotesk, Hanken_Grotesk, Instrument_Serif, IBM_Plex_Sans } from 'next/font/google';
import ClientShell from '@/components/layout/ClientShell';
import './globals.css';
import SectionKeyboardNav from '@/components/layout/SectionKeyboardNav';

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

/* The straydesign.co pair, ported 2026-09-17 so this site mirrors the
   portfolio rather than resembling it. Instrument Serif carries every heading;
   IBM Plex Sans carries the body. Schibsted and Hanken stay loaded because the
   FAQ, resources and legal routes still reference them. */
const instrument = Instrument_Serif({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-family-instrument',
  weight: ['400'],
  adjustFontFallback: true,
});

const plex = IBM_Plex_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-family-plex',
  weight: ['400', '500', '600', '700'],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Stray Web Design — Engaging Sites for Strong Brands | Tom Sesler",
  /* 155 characters. A result snippet is cut around 158, so everything past
     that is written for nobody — the old one ran 167 and lost the phone
     number, which is the only line here that asks for anything. Trimmed by
     dropping "Hi, ", shortening "websites" to "sites" and "host them or hand
     them off" to "host or hand them off"; nothing was cut that carried a
     fact. Keep any rewrite under 158 and keep the number last. */
  description:
    "I design and build engaging sites for strong brands whose owners care how the place comes across, then host and run them. Call or text 814-964-0081.",
  keywords: [
    'freelance web designer',
    'web designer',
    'custom website',
    'website design',
    'brand and web design',
    'business website',
    'engaging website',
    'hand-coded website',
    'fast website',
    'accessible website',
  ],
  metadataBase: new URL('https://straywebdesign.co'),
  openGraph: {
    title: "Stray Web Design — Engaging Sites for Strong Brands | Tom Sesler",
    description:
      "Engaging sites for strong brands with passionate owners. Designed, built, hosted and run by one person you can actually call.",
    url: 'https://straywebdesign.co',
    siteName: 'Stray Web Design',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Stray Web Design — Engaging Sites for Strong Brands | Tom Sesler",
    description:
      "Engaging sites for strong brands with passionate owners. Designed, built, hosted and run by one person you can actually call.",
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
            name: 'Your Menu or Catalogue Online',
            description:
              'Everything you sell, one page per thing, written in the structure a search engine reads.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'The Editor You Run It From',
            description:
              'A back end built around the changes you actually make, adjusted later for the ones nobody scoped at the start.',
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
      className={`${jetbrains.variable} ${schibsted.variable} ${hanken.variable} ${instrument.variable} ${plex.variable}`}
    >
      <head>
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
        <SectionKeyboardNav />
        {/* Loads only when the visitor's browser has not sent a Do Not Track /
            Global Privacy Control signal. That replaced the cookie banner —
            see /privacy. Ads and Meta stay off unless a campaign is running. */}
        <Analytics
          gaId="G-9D1W0XLS34"
          adsId={process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}
          metaPixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID}
        />
        <ClientShell>
          {children}
        </ClientShell>
      </body>
    </html>
  );
}
