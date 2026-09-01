import Image from 'next/image';
import AnimateIn from '@/components/ui/AnimateIn';

/**
 * HowItWorks — what replaced "What I do". That section was a capability menu,
 * and a capability menu invites price-shopping: nobody running a fish market
 * wants "APIs & integrations", they want their fish on Google.
 *
 * Three beats, in order, because it genuinely is a sequence. Two of them carry
 * a real screenshot of a real catalog rather than a paragraph — the pictures
 * are from Sea Cave's live store, which is why they show real prices and a
 * real stock line.
 */

const STEPS = [
  {
    n: '01',
    title: 'You hand over the list',
    body: "Whatever shape it's in. A spreadsheet, a supplier PDF, photos of a whiteboard, or a walk around your place with me writing it down. Getting it into a usable shape is my job.",
  },
  {
    n: '02',
    title: 'It becomes something people can browse',
    body: 'Categories, prices, a search box, filters that work. Somebody who lands on it can find what they came for in a few seconds, on a phone, standing in a parking lot.',
    image: {
      src: '/images/how/catalog-grid.png',
      alt: "Sea Cave's online store: rows of fish with prices, category counts down the left, and price filters",
      caption: 'The live store at seacaveinc.com',
    },
  },
  {
    n: '03',
    title: 'Every item gets its own page',
    body: 'A name, a photo, a description, a price, and whether it is in stock. All of it written out in the structure Google reads. That is the part that puts the item in search results and in Google Shopping instead of leaving it buried inside a page about your business.',
    image: {
      src: '/images/how/catalog-item.png',
      alt: 'A single Sea Cave product page: photo, description, $12.99, and an in-stock line',
      caption: 'One item, one page, one price',
    },
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="border-b border-border-default bg-surface-card py-20 md:py-28"
      aria-label="How it works"
    >
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <AnimateIn>
          <h2 className="max-w-2xl font-display text-[clamp(1.9rem,4vw,2.9rem)] font-bold leading-[1.05] tracking-tight text-text-primary">
            Your whole list, online, one page per thing.
          </h2>
          <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-text-secondary md:text-lg">
            Menus, stock, counters, shows. If you can list it, it can go up
            and be found. Three steps, and two of them are mine.
          </p>
        </AnimateIn>

        <div className="mt-14 flex flex-col gap-14 md:mt-20 md:gap-20">
          {STEPS.map((step, i) => (
            <AnimateIn key={step.n} delay={i * 0.06}>
              <div className="grid gap-6 md:grid-cols-[auto_1fr] md:gap-8">
                <span
                  aria-hidden
                  className="font-mono text-[13px] font-medium text-accent md:pt-1.5"
                >
                  {step.n}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-text-primary md:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-xl font-body text-[15px] leading-relaxed text-text-secondary md:text-base">
                    {step.body}
                  </p>

                  {step.image && (
                    <figure className="mt-7">
                      <div className="overflow-hidden rounded-lg border border-border-default bg-surface-sunken">
                        <Image
                          src={step.image.src}
                          alt={step.image.alt}
                          width={2560}
                          height={1640}
                          sizes="(min-width: 1024px) 720px, 100vw"
                          className="w-full"
                        />
                      </div>
                      <figcaption className="mt-2 font-mono text-[11px] text-text-tertiary">
                        <span aria-hidden className="text-accent/60">{'// '}</span>
                        {step.image.caption}
                      </figcaption>
                    </figure>
                  )}
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
