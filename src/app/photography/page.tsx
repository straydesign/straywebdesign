import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimateIn from '@/components/ui/AnimateIn';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { SITE } from '@/lib/constants';

/* /photography — the photography side of a build. Every shot on this page
   is one I took for Andy's Ale House & Grill (a live client), processed
   through my own pipeline and live on their menu today. The 41-dish count
   is re-verified against the client's CMS whenever it's touched (Papa
   John's supplies the pizza photos — those are excluded from the count).
   NO standalone shoot price on this page: pricing for non-build shoots is
   Tom's pending decision, so the copy points those calls at the phone. */

export const metadata: Metadata = {
  title: `Photography | ${SITE.name}`,
  description:
    'I shoot the photos for the websites I build, from menu dishes to storefronts. 41 dishes I photographed are live on a client menu today.',
  alternates: { canonical: '/photography' },
  openGraph: {
    title: `Photography | ${SITE.name}`,
    description:
      'I shoot the photos for the websites I build, from menu dishes to storefronts.',
    url: `${SITE.url}/photography`,
    type: 'website',
  },
};

/* Shots from the Andy's menu shoots — dish names match the client's CMS. */
const GALLERY = [
  { src: '/images/photography/andy-burger.jpg', alt: 'The Andy Burger with steak fries' },
  { src: '/images/photography/wings-buffalo-12.jpg', alt: 'A dozen buffalo wings with celery and bleu cheese' },
  { src: '/images/photography/antipasto-salad.jpg', alt: 'Antipasto salad' },
  { src: '/images/photography/club-melt.jpg', alt: 'Club melt with fries' },
  { src: '/images/photography/ham-swiss-pretzel.jpg', alt: 'Ham and swiss on a pretzel roll' },
  { src: '/images/photography/chili.jpg', alt: 'A bowl of chili with shredded cheese' },
  { src: '/images/photography/wings-buffalo-6.jpg', alt: 'Half a dozen buffalo wings' },
  { src: '/images/photography/soup-salad-pretzel.jpg', alt: 'Soup, tossed salad, and a hot pretzel' },
] as const;

function SectionEyebrow({ children }: { children: string }) {
  return <span className="eyebrow mb-3">{children}</span>;
}

export default function PhotographyPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-[100dvh] bg-surface-page pt-28 pb-20">
        <article className="mx-auto max-w-6xl px-5 md:px-8">
          {/* ── Header ── */}
          <AnimateIn>
            <Breadcrumbs
              items={[{ label: 'Home', href: '/' }, { label: 'Photography' }]}
            />

            <SectionEyebrow>Photography</SectionEyebrow>
            <h1 className="mt-4 max-w-3xl text-balance font-display text-[clamp(2rem,4.6vw,3.4rem)] font-bold leading-[1.06] tracking-[-0.02em] text-text-primary">
              Your site is only as good as its photos.
            </h1>

            <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-text-secondary">
              A menu with real photos sells. A wall of text doesn&apos;t. So
              when I build your site, I bring lights and shoot what goes on it:
              your food, your products, your storefront. Real plates from your
              kitchen, no stock photos of someone else&apos;s.
            </p>
          </AnimateIn>

          {/* ── Gallery — all shots mine, live on the client's menu ── */}
          <AnimateIn>
            <div className="mt-14 md:mt-16">
              <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                {GALLERY.map((photo, i) => (
                  <li
                    key={photo.src}
                    className="overflow-hidden rounded-lg border border-border-default bg-white"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      width={900}
                      height={1175}
                      priority={i < 4}
                      sizes="(max-width: 768px) 50vw, (max-width: 1152px) 25vw, 270px"
                      className="h-full w-full object-cover"
                    />
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-right font-mono text-[11px] text-text-tertiary">
                <span aria-hidden className="text-accent/60">{'// '}</span>
                shot for Andy&apos;s Ale House &amp; Grill · live at{' '}
                <a
                  href="https://andyspub.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-text-secondary"
                >
                  andyspub.com
                </a>
              </p>
            </div>
          </AnimateIn>

          <div className="mx-auto mt-16 max-w-3xl md:mt-20">
            {/* ── The proof ── */}
            <AnimateIn>
              <SectionEyebrow>The proof</SectionEyebrow>
              <h2 className="mt-4 font-display text-xl font-bold tracking-tight text-text-primary md:text-2xl">
                I shot Andy&apos;s menu.
              </h2>
              <div className="mt-5 space-y-5">
                <p className="font-body text-[15px] leading-relaxed text-text-secondary md:text-base">
                  Andy&apos;s Ale House &amp; Grill is a bar and grill in Erie,
                  and one of the sites I build and run. Their menu needed
                  photos, so I set up a white lightbox and shot the dishes
                  myself. Right now, 41 dishes on their live menu carry photos
                  from those shoots: the wings, the burgers, the melts, the
                  salads. Each shot gets its own color pass so the whole menu
                  reads as one kitchen instead of a camera roll.
                </p>
                <p className="font-body text-[15px] leading-relaxed text-text-secondary md:text-base">
                  <Link
                    href="/work/andys"
                    className="font-medium text-text-primary underline underline-offset-4 hover:text-accent"
                  >
                    Read the full case study
                  </Link>
                  , or open{' '}
                  <a
                    href="https://andyspub.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-text-primary underline underline-offset-4 hover:text-accent"
                  >
                    andyspub.com
                  </a>{' '}
                  and scroll the menu.
                </p>
              </div>
            </AnimateIn>

            {/* ── What I shoot — text left, one tall shot right ── */}
            <AnimateIn>
              <div className="mt-14 grid items-start gap-8 md:mt-16 md:grid-cols-[1.2fr_0.8fr] md:gap-10">
                <div>
                  <SectionEyebrow>What I shoot</SectionEyebrow>
                  <dl className="mt-5 space-y-6">
                    <div className="border-l-2 border-accent/40 pl-4">
                      <dt className="font-display text-base font-semibold text-text-primary">
                        Food and menus
                      </dt>
                      <dd className="mt-1 font-body text-[15px] leading-relaxed text-text-secondary">
                        Plated dishes, lit and shot where they&apos;re made,
                        graded to match across the whole menu.
                      </dd>
                    </div>
                    <div className="border-l-2 border-accent/40 pl-4">
                      <dt className="font-display text-base font-semibold text-text-primary">
                        Products
                      </dt>
                      <dd className="mt-1 font-body text-[15px] leading-relaxed text-text-secondary">
                        What you sell, shot clean so people can actually see
                        what they&apos;re buying.
                      </dd>
                    </div>
                    <div className="border-l-2 border-accent/40 pl-4">
                      <dt className="font-display text-base font-semibold text-text-primary">
                        Storefront and interiors
                      </dt>
                      <dd className="mt-1 font-body text-[15px] leading-relaxed text-text-secondary">
                        The outside, the room, the corners people check before
                        they decide to visit.
                      </dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <div className="overflow-hidden rounded-lg border border-border-default bg-white">
                    <Image
                      src="/images/photography/charbroiled-chicken-salad.jpg"
                      alt="Charbroiled chicken salad"
                      width={900}
                      height={1175}
                      sizes="(max-width: 768px) 100vw, 340px"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="mt-2 text-right font-mono text-[11px] text-text-tertiary">
                    <span aria-hidden className="text-accent/60">{'// '}</span>
                    charbroiled chicken salad
                  </p>
                </div>
              </div>
            </AnimateIn>

            {/* ── Part of the build — no standalone price (Tom's call) ── */}
            <AnimateIn>
              <div className="mt-14 md:mt-16">
                <SectionEyebrow>Part of the build</SectionEyebrow>
                <div className="mt-5 space-y-5">
                  <p className="font-body text-[15px] leading-relaxed text-text-secondary md:text-base">
                    Photography comes with the build when the site needs it. If
                    I&apos;m designing your site and the photos don&apos;t
                    exist yet, I bring my own lighting to your place, softboxes
                    on stands, and we make them. You end up with real photos of
                    your own food and your own shop, on a site built around
                    them.
                  </p>
                  <p className="font-body text-[15px] leading-relaxed text-text-secondary md:text-base">
                    Want photos for a site I didn&apos;t build? Call me and
                    we&apos;ll figure it out:{' '}
                    <a
                      href="tel:+18149640081"
                      className="font-display font-bold text-text-primary hover:text-accent"
                    >
                      {SITE.phone}
                    </a>
                    .
                  </p>
                </div>
              </div>
            </AnimateIn>

            {/* ── CTA — same end-card treatment as the case studies ── */}
            <AnimateIn>
              <div className="mt-16 rounded-lg border border-border-default/60 bg-surface-card p-8 text-center md:mt-20">
                <h2 className="font-display text-xl font-bold text-text-primary md:text-2xl">
                  Want a site with photos that sell?
                </h2>
                <p className="mx-auto mt-2 max-w-md font-body text-sm leading-relaxed text-text-secondary">
                  Tell me about your business and I&apos;ll come back with a
                  plan for what the site should do, photos included. You can
                  also just call: {SITE.phone}.
                </p>
                <div className="mt-6">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center justify-center bg-accent px-7 py-3.5 font-display text-base font-semibold text-white transition-colors hover:bg-accent/90"
                  >
                    Start a project
                  </Link>
                </div>
              </div>
            </AnimateIn>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
