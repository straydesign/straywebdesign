/* services.ts — the service squares on the homepage (#services).
   Honest offers with real prices where they're set. The featured card is
   the basic build + hosting package; everything else supports it.
   Prices come from Tom directly — never invent or "round" one. */

export type ServiceCard = {
  readonly title: string;
  /** Price badge, e.g. "$500", "$30/hr". Omit when priced per site. */
  readonly price?: string;
  readonly priceNote?: string;
  readonly description: string;
  /** Featured card gets the outlined, wider treatment. */
  readonly featured?: boolean;
  /** Optional action under the description. */
  readonly cta?: { readonly label: string; readonly href: string };
};

export const SERVICE_CARDS: readonly ServiceCard[] = [
  {
    title: 'The basic build',
    price: '$500',
    priceNote: 'build · then $25/mo hosting',
    featured: true,
    description:
      "The most basic way to get a real website for your small business: I design and build the site for a flat $500, then host and look after it for $25 a month. Small edits are included in that monthly, things like new hours, a swapped photo, or an updated price. You send me what changed and it gets done, whether you're in Erie or three time zones away.",
    cta: { label: 'Start yours', href: '#contact' },
  },
  {
    title: 'Web design consulting',
    price: '$30',
    priceNote: 'per hour',
    description:
      "Stuck on your own site, or want bigger changes than the monthly covers? We get on a call and share screens, and I work through it with you: layout, design, copy, whatever's in the way. You pay by the hour.",
    cta: { label: 'Book a call', href: '/book' },
  },
  {
    title: 'APIs & integrations',
    description:
      "When your site needs to talk to something else, like online ordering, bookings, or payments, I wire it up. I've connected client sites to Square and PayPal for payments and to Sanity for content the team edits.",
  },
] as const;
