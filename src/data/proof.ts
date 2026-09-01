/**
 * The proof wall. Four live sites, filed by what got put into a catalog, so
 * they read as one mechanic at four scales rather than four unrelated jobs.
 *
 * `quote` only appears where a real one exists. There is one — Gary Paparelli's
 * public Google review of Stray Web Design, left 22 April 2026, which covers
 * both of his bars. Sea Cave's and Presque Isle's have been asked for and have
 * not arrived, so those two show the work without a quote. A placeholder in a
 * quote slot reads as a missing quote, which is worse than no slot at all.
 */

export interface ProofItem {
  readonly name: string;
  /** What went into the catalog. This is the through-line of the wall. */
  readonly catalogued: string;
  readonly url: string;
  readonly displayUrl: string;
  readonly shot: string;
  readonly quote?: {
    /** Verbatim. Never tidied, never paraphrased. */
    readonly text: string;
    readonly who: string;
    readonly role: string;
    readonly source: string;
  };
}

/* Gary's review, word for word as he wrote it. Both bars are his, so it sits
   on Andy's and is credited across the two. */
const GARY = {
  text: 'the communication and timeliness of his work is outstanding. i could not be happier with the product also. his web design was awesome. like with any ongoing project there are always changes that you want made. never any kickback on this. he listens then executes.',
  who: 'Gary Paparelli',
  role: "Andy's Ale House & Grill and Bullfrog",
  source: 'Google review, April 2026',
} as const;

export const PROOF: readonly ProofItem[] = [
  {
    name: "Andy's Ale House & Grill",
    catalogued: 'Full menus and the daily specials, edited by the team',
    url: 'https://andyspub.com',
    displayUrl: 'andyspub.com',
    shot: '/images/work/andys.png',
    quote: GARY,
  },
  {
    name: 'Bullfrog',
    catalogued: 'Every show on the calendar, up before the doors open',
    url: 'https://bullfrogbarerie.com',
    displayUrl: 'bullfrogbarerie.com',
    shot: '/images/work/bullfrog.png',
  },
  {
    name: 'Sea Cave',
    catalogued: '600+ products, with live stock and pricing they update themselves',
    url: 'https://seacaveinc.com',
    displayUrl: 'seacaveinc.com',
    shot: '/images/work/seacave.png',
  },
  {
    name: 'Presque Isle Fish & Farm',
    catalogued: 'Every counter — lake fish, ocean and Gulf, shellfish, kitchen, farm',
    url: 'https://presqueislefishandfarm.com',
    displayUrl: 'presqueislefishandfarm.com',
    shot: '/images/work/presque-isle.png',
  },
];
