/* services.ts — the service squares on the homepage (#services).
   What Tom does, described honestly. Pricing lives on its own page (/cost),
   where the ranges are laid out by business size; the featured card links
   there. Never invent or hardcode a price here. */

export type ServiceCard = {
  readonly title: string;
  /** Optional price badge. Pricing lives on /cost; omit unless a card needs one. */
  readonly price?: string;
  readonly priceNote?: string;
  readonly description: string;
  /** Featured card gets the outlined, wider treatment. */
  readonly featured?: boolean;
  /** Wide card spans both columns without the featured accent. */
  readonly wide?: boolean;
  /** Optional action under the description. */
  readonly cta?: { readonly label: string; readonly href: string };
};

export const SERVICE_CARDS: readonly ServiceCard[] = [
  {
    title: 'The basic build',
    featured: true,
    description:
      "The most basic way to get a real website for your small business: I design and build it, then host and look after it for a small monthly. Small edits are included, things like new hours, a swapped photo, or an updated price. You send me what changed and it gets done, whether you're in Erie or three time zones away.",
    cta: { label: 'See what it costs', href: '/cost' },
  },
  {
    title: 'Web design consulting',
    description:
      "Stuck on your own site, or want bigger changes than the monthly covers? We get on a call and share screens, and I work through it with you: layout, design, copy, whatever's in the way. You pay by the hour.",
    cta: { label: 'Book a call', href: '/book' },
  },
  {
    title: 'APIs & integrations',
    description:
      "When your site needs to talk to something else, like online ordering, bookings, or payments, I wire it up. I've connected client sites to Square and PayPal for payments and to Sanity for content the team edits.",
  },
  {
    // No standalone price by design — pricing for non-build shoots is
    // Tom's pending decision. The page routes those asks to the phone.
    title: 'Photography',
    wide: true,
    description:
      "Photos do half the selling. So I shoot them, on-site, as part of building the site itself. I shot the menu photography for Andy's, and a shoot comes included whenever a build needs one.",
    cta: { label: 'See the shots', href: '/photography' },
  },
] as const;
