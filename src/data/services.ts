/* services.ts — the service squares on the homepage (#services).
   Honest offers with real prices where they're set. The featured card is
   the $300 build-and-handoff deal; everything else supports it.
   Prices come from Tom directly — never invent or "round" one. */

export type ServiceCard = {
  readonly title: string;
  /** Price badge, e.g. "$300 flat", "$30/hr". Omit when priced per site. */
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
    title: 'I build it. You own it.',
    price: '$300',
    priceNote: 'flat, one time',
    featured: true,
    description:
      "I design and build your site, then set everything up in your name: your own Vercel hosting account and your own domain at Porkbun, with the billing going to you. Before I hand it over, I teach you to make changes yourself with AI. After that you own the whole thing outright, with no monthly fees and no waiting on a designer. It works the same whether you're in Erie or three time zones away.",
    cta: { label: 'Start yours', href: '#contact' },
  },
  {
    title: 'Web design consulting',
    price: '$30',
    priceNote: 'per hour',
    description:
      "Stuck on your own site? We get on a call and share screens, and I work through it with you: layout, design, copy, whatever's in the way. You pay by the hour.",
    cta: { label: 'Book a call', href: '/book' },
  },
  {
    title: 'Hosting',
    price: '$20',
    priceNote: 'per month',
    description:
      'I move your site onto fast hosting and keep it running well, so the site is never something you have to think about.',
  },
  {
    title: 'SEO',
    priceNote: 'add-on · priced per site',
    description:
      "Add it to any of the above. You get the technical structure Google actually reads, plus Search Console tracking so you can watch your rankings move. I don't promise rankings; I do the real work and show you the numbers.",
  },
  {
    title: 'APIs & integrations',
    description:
      "When your site needs to talk to something else, like online ordering, bookings, or payments, I wire it up. I've connected client sites to Square and PayPal for payments and to Sanity for content the team edits.",
  },
] as const;
