import Link from 'next/link';
import AnimateIn from '@/components/ui/AnimateIn';
import { PROOF } from '@/data/proof';

/**
 * WhoThisIsFor — the section that answers the question nobody types.
 *
 * Brandon Willington ran webinars with 400 people on them and found that 85–90%
 * of the questions at the end were the same one: "does this work for [my kind
 * of business]?" People are not weighing up the offer, they are checking
 * whether their trade is in the room. When it isn't named, the default
 * conclusion is that it isn't for them.
 *
 * Grouped by what the list is made of rather than by trade, because that is
 * genuinely the product — a menu, a counter and a calendar are three different
 * update problems, and someone recognises their own before they recognise a
 * category name.
 *
 * The client lines are derived from PROOF rather than retyped, so a renamed or
 * dropped client cannot leave a stale claim sitting here. NOTHING in here may
 * name a trade as built that Tom has not actually built — the last group says
 * plainly that those are unbuilt, which is the honest version and reads better
 * than a hedge.
 */

type Group = {
  kind: string;
  blurb: string;
  trades: string;
  /** Must match `PROOF[].name` exactly. Misses are dropped, never rendered raw. */
  clients: string[];
};

const GROUPS: Group[] = [
  {
    kind: 'A menu that keeps changing',
    blurb:
      'The full list, plus the part that moves every week. You edit the specials yourself, from a phone, and they are live before the doors open.',
    trades: 'Pubs · restaurants · diners · pizzerias · coffee shops',
    clients: ["Andy's Ale House & Grill"],
  },
  {
    kind: 'A counter with stock behind it',
    blurb:
      'Hundreds of items, each with its own page, its own price and whether it is in today. Prices change often and you change them, not me.',
    trades: 'Fish markets · farm markets · butchers · bottle shops · garden centres',
    clients: ['Sea Cave', 'Presque Isle Fish & Farm'],
  },
  {
    kind: 'A calendar people check',
    blurb:
      'Shows, events, classes, whatever fills the room on a given night. Up early enough that somebody can plan their week around it.',
    trades: 'Live music venues · event spaces · anywhere with a season',
    clients: ['Bullfrog'],
  },
];

/** Trades where the list is the same shape and Tom has not built one yet. */
const NOT_YET = 'Barbers, powersports shops, and service trades that quote by the job';

function clientsFor(names: string[]) {
  return names
    .map((name) => PROOF.find((p) => p.name === name))
    .filter((p): p is (typeof PROOF)[number] => Boolean(p));
}

export default function WhoThisIsFor() {
  return (
    <section
      id="who"
      className="border-b border-border-default bg-surface-page py-20 md:py-28"
      aria-label="Who this is for"
    >
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <AnimateIn>
          <h2 className="max-w-2xl text-balance font-display text-[clamp(1.9rem,4vw,2.9rem)] font-bold leading-[1.05] tracking-tight text-text-primary">
            Does this work for what you&apos;ve got?
          </h2>
          <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-text-secondary md:text-lg">
            It works if you sell things you could write down as a list. Three
            shapes cover almost everyone I have built for.
          </p>
        </AnimateIn>

        {/* Subgrid, so the three columns share row tracks and the divider rule
            lands on one line across all of them. Flexbox cannot do this: making
            the copy block grow bottom-aligns the lists instead, which staggers
            the rules by however many clients each column happens to carry. */}
        <div className="mt-14 grid gap-10 md:mt-16 md:grid-cols-3 md:grid-rows-[auto_1fr_auto] md:gap-x-8 md:gap-y-0">
          {GROUPS.map((group, i) => (
            <AnimateIn
              key={group.kind}
              delay={i * 0.06}
              className="md:row-span-3 md:grid md:grid-rows-subgrid md:gap-0"
            >
              <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-text-primary">
                {group.kind}
              </h3>

              <div>
                <p className="mt-3 font-body text-[15px] leading-relaxed text-text-secondary">
                  {group.blurb}
                </p>
                <p className="mt-4 font-body text-sm leading-relaxed text-text-tertiary">
                  {group.trades}
                </p>
              </div>

              <ul className="mt-5 flex flex-col gap-3 border-t border-border-default pt-5">
                {clientsFor(group.clients).map((client) => (
                  <li key={client.name}>
                    <a
                      href={client.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display text-[15px] font-semibold text-text-primary underline-offset-4 transition-colors hover:text-accent hover:underline"
                    >
                      {client.name}
                    </a>
                    <span className="mt-1 block font-body text-[13px] leading-relaxed text-text-tertiary">
                      {client.catalogued}
                    </span>
                  </li>
                ))}
              </ul>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={0.2}>
          <p className="mt-14 max-w-2xl border-l-2 border-border-default pl-6 font-body text-[15px] leading-relaxed text-text-secondary md:mt-16">
            {NOT_YET} have a list of exactly the same shape, and I have not built
            one yet. If that is you,{' '}
            <Link
              href="#start"
              className="font-semibold text-text-primary underline underline-offset-4 hover:text-accent"
            >
              answer the five questions
            </Link>{' '}
            and I will tell you straight whether it is worth your money.
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
