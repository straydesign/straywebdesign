import AnimateIn from '@/components/ui/AnimateIn';
import DeviceDuo from '@/components/ui/DeviceDuo';
import SectionHeading from '@/components/sections/SectionHeading';

/**
 * HowItWorks — the whole offer in one row: the list as it arrived, the list
 * as something people can browse, one item on its own page. One line per
 * step; the pictures do the explaining.
 *
 * Every shot is real. Step 1 is the Presque Isle sheet, built by reading the
 * handwritten signs in 396 photographs taken in the shop on 21 August 2026,
 * with one of those signs in the phone. Steps 2 and 3 are Sea Cave's live
 * store, which is why they show real prices and a real stock line.
 *
 * SITE SHOTS ALWAYS GO IN A DEVICE FRAME (Tom, 2026-09-01). Desktop captures
 * are 1280×800 and phone captures 390×844 (or 2× either), because that is
 * what MacBookFrame and PhoneFrame expect — anything else gets cropped.
 */

const STEPS = [
  {
    n: '01',
    title: 'I catalogue your inventory',
    body: 'I walk your place and photograph everything on the shelves. If you already have a list, that works too.',
    device: {
      shot: '/images/how/item-list.png',
      phoneShot: '/images/how/item-list-phone.jpg',
      name: "Presque Isle Fish & Farm's list, read off the signs in the shop",
      caption: 'Presque Isle, 396 signs read on 21 August',
    },
  },
  {
    n: '02',
    title: 'Something people can browse',
    body: 'Categories, prices, a search box. Found on a phone in a few seconds.',
    device: {
      shot: '/images/how/catalog-grid.png',
      phoneShot: '/images/how/catalog-grid-phone.png',
      name: "Sea Cave's shop — rows of fish, each with its own price",
      caption: 'seacaveinc.com/shop, live',
    },
  },
  {
    n: '03',
    title: 'Every item gets its own page',
    body: 'Name, photo, price, in stock or not, in the structure Google reads.',
    device: {
      shot: '/images/how/catalog-item.png',
      phoneShot: '/images/how/catalog-item-phone.png',
      name: 'One Sea Cave item: photo, description, $39.99, and an in-stock line',
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
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          kicker="Your whole list, online, one page per thing"
          title="HOW IT WORKS"
          className="mb-2"
        />

        <ol className="mt-12 grid gap-12 md:mt-16 md:grid-cols-3 md:gap-8">
          {STEPS.map((step, i) => (
            <li key={step.n}>
              <AnimateIn delay={i * 0.06}>
                <figure>
                  <DeviceDuo
                    shot={step.device.shot}
                    phoneShot={step.device.phoneShot}
                    alt={`${step.device.name} — desktop`}
                    phoneAlt={`${step.device.name} on a phone`}
                  />
                  <figcaption className="mt-2 font-mono text-[11px] text-text-tertiary">
                    <span aria-hidden className="text-accent/60">{'// '}</span>
                    {step.device.caption}
                  </figcaption>
                </figure>
                <div className="mt-6 flex gap-4">
                  <span aria-hidden className="font-mono text-[13px] font-medium text-accent md:pt-1">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-tight text-text-primary md:text-xl">
                      {step.title}
                    </h3>
                    <p className="mt-2 font-body text-[15px] leading-relaxed text-text-secondary">
                      {step.body}
                    </p>
                  </div>
                </div>
              </AnimateIn>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
