'use client';

import { useId, useState } from 'react';
import DeviceDuo from '@/components/ui/DeviceDuo';
import SectionHeading from '@/components/sections/SectionHeading';
import SegmentedControl, { panelProps } from '@/components/ui/SegmentedControl';

/**
 * Menu — what a catalogue looks like for your kind of place.
 *
 * This used to be the whole pitch, at the top of the page, in the headline.
 * It is a good thing to include and a narrow thing to lead with, so it sits
 * here now: after the work, after what the first weeks look like, framed as
 * something the build also gives you.
 *
 * Both pictures are live pages. Andy's menu is andyspub.com/menu as it stands
 * today, photographs and day tabs and all; the store panel is Sea Cave's shop.
 * Nothing here is a mock.
 *
 * The swap is a tabs pattern, not a carousel — the visitor picks the one that
 * describes them and stays there. Both panels stay mounted so the layout does
 * not jump and the hidden picture does not have to decode again on every
 * click; `inert` keeps the hidden one out of the tab order and off the
 * accessibility tree while it is still in the DOM.
 */

const PANELS = [
  {
    id: 'restaurant',
    label: 'Restaurant',
    heading: 'Every dish, with its own photograph and its own price',
    body: 'Specials are tied to the day they run, so the screen and the kitchen agree. The people behind the bar change them.',
    shot: '/images/how/menu-restaurant.png',
    phoneShot: '/images/how/menu-restaurant-phone.png',
    caption: 'andyspub.com/menu, live',
    alt: "Andy's menu: dish photographs, day tabs, and today's specials",
  },
  {
    id: 'store',
    label: 'Store',
    heading: 'Every item on its own page, with its own price',
    body: 'Categories, a search box, and in stock or not. Written in the structure Google reads, so somebody searching for the thing you sell can land on your page for it.',
    shot: '/images/how/catalog-grid.png',
    phoneShot: '/images/how/catalog-grid-phone.png',
    caption: 'seacaveinc.com/shop, live',
    alt: "Sea Cave's shop: rows of products, each with its own price",
  },
] as const;

export default function Menu() {
  const groupId = useId();
  const [active, setActive] = useState<string>(PANELS[0].id);

  return (
    <section
      id="menu"
      className="scroll-mt-16 border-b border-border-default bg-surface-page py-20 md:py-28"
      aria-label="Your menu online"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading kicker="It also includes your menu" title="WHAT YOU SELL" className="mb-2" />

        <div className="mt-10 md:mt-12">
          <SegmentedControl
            groupId={groupId}
            label="What kind of business you run"
            segments={PANELS.map((p) => ({ id: p.id, label: p.label }))}
            value={active}
            onChange={setActive}
          />
        </div>

        {/* A grid with both panels in the same cell: the tallest one sets the
            height once, so switching never moves the page under a thumb. */}
        <div className="mt-10 grid md:mt-12">
          {PANELS.map((panel) => {
            const selected = panel.id === active;
            return (
              <div
                key={panel.id}
                {...panelProps(groupId, panel.id, selected)}
                inert={!selected}
                className={[
                  'col-start-1 row-start-1 transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none',
                  selected
                    ? 'pointer-events-auto translate-y-0 opacity-100'
                    : 'pointer-events-none translate-y-3 opacity-0 motion-reduce:translate-y-0',
                ].join(' ')}
              >
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
                  <figure className="m-0 w-full max-w-xl justify-self-center">
                    <DeviceDuo
                      shot={panel.shot}
                      phoneShot={panel.phoneShot}
                      alt={`${panel.alt} — desktop`}
                      phoneAlt={`${panel.alt} on a phone`}
                      /* Both captures put their page heading top left, which
                         is where the phone sits by default. */
                      phoneSide="right"
                    />
                    <figcaption className="mt-2 font-mono text-[11px] text-text-tertiary">
                      <span aria-hidden className="text-accent/60">{'// '}</span>
                      {panel.caption}
                    </figcaption>
                  </figure>

                  <div>
                    <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight text-text-primary md:text-3xl">
                      {panel.heading}
                    </h3>
                    <p className="mt-4 max-w-md font-body text-[15px] leading-relaxed text-text-secondary md:text-base">
                      {panel.body}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
