/* clients.ts — the work, split two ways.
   - "live"     → real, running sites I built, host, and manage for a business.
   - "redesign" → concept redesigns: full sites I built to show a real local
                  business what theirs could be. Not paid engagements — spec work.
   Single source of truth for the homepage project showcase.
   Desktop shots live in public/images/work/, phone shots (390×844) in
   public/images/work/phone/. Palettes, typefaces, and stacks are pulled from
   each project's actual code — never invented. */

export type WorkCategory = 'live' | 'redesign';

export type PaletteSwatch = {
  /** Short human label, e.g. "house red". */
  label: string;
  hex: string;
};

export type Project = {
  name: string;
  /** What kind of business it is. */
  type: string;
  /** City / region, for context. */
  place?: string;
  description: string;
  /** Where the site is reachable. */
  url: string;
  /** Domain shown in the browser-frame address bar. */
  displayUrl: string;
  /** Desktop screenshot in public/images/work/. */
  shot: string;
  /** Mobile screenshot in public/images/work/phone/. */
  phoneShot: string;
  category: WorkCategory;
  /** Real tech/feature chips — only what's genuinely in the build. */
  stack: string[];
  /** Defining colors from the project's own theme code. */
  palette: PaletteSwatch[];
  /** Font families the site actually loads. */
  typefaces: string[];
  /** The "see the design" dive-in — a couple of honest sentences. */
  dive: string;
};

export const PROJECTS: Project[] = [
  /* ── Live — real businesses, running now ─────────────────────── */
  {
    name: "Andy's Ale House & Grill",
    type: 'Bar & restaurant',
    place: 'Erie, PA',
    description:
      'A full site with menus, daily specials, and an events calendar the team updates themselves. Designed, built, hosted, and managed end to end.',
    url: 'https://andyspub.com',
    displayUrl: 'andyspub.com',
    shot: '/images/work/andys.png',
    phoneShot: '/images/work/phone/andys.png',
    category: 'live',
    stack: ['Next.js', 'Sanity CMS', 'Framer Motion', 'Team-edited menus'],
    palette: [
      { label: 'charcoal', hex: '#0C0A09' },
      { label: 'house red', hex: '#CC1122' },
      { label: 'cream', hex: '#FDF5E6' },
      { label: 'surface', hex: '#1C1917' },
    ],
    typefaces: ['Playfair Display', 'Outfit'],
    dive: 'The team edits menus, specials, hours, and events themselves through a CMS, with no designer in the loop. Each food photo gets its own color grade so the whole menu reads warm and consistent on one page.',
  },
  {
    name: 'Bullfrog',
    type: 'Bar & live-music venue',
    place: 'Erie, PA',
    description:
      'A live-music venue site built around the calendar — shows up front, easy for the team to keep current, and quick to load on a phone at the door.',
    url: 'https://bullfrogbarerie.com',
    displayUrl: 'bullfrogbarerie.com',
    shot: '/images/work/bullfrog.png',
    phoneShot: '/images/work/phone/bullfrog.png',
    category: 'live',
    stack: ['Next.js', 'Sanity CMS', 'Lenis smooth scroll', 'Framer Motion'],
    palette: [
      { label: 'black', hex: '#0A0A0A' },
      { label: 'frog green', hex: '#10B981' },
      { label: 'neon', hex: '#34D399' },
      { label: 'mint cream', hex: '#ECFDF5' },
    ],
    typefaces: ['Righteous', 'Geist'],
    dive: 'Everything hangs off the show calendar, which the team keeps current themselves. The neon sign in the hero flickers like the real thing, with three misfires and a recovery, all hand-keyframed.',
  },

  /* ── Redesigns — concept rebuilds for real local businesses ───── */
  {
    name: 'Rolling Meadows Lanes',
    type: 'Bowling alley',
    place: 'Erie, PA',
    description:
      'A concept redesign — photo-led, warm, and built to make a night out feel like a plan worth making.',
    url: 'https://rolling-meadows.vercel.app',
    displayUrl: 'rolling-meadows.vercel.app',
    shot: '/images/work/rolling-meadows.png',
    phoneShot: '/images/work/phone/rolling-meadows.png',
    category: 'redesign',
    stack: ['Next.js', 'Three.js', 'Lenis smooth scroll', 'Framer Motion'],
    palette: [
      { label: 'pine black', hex: '#0F1410' },
      { label: 'signal red', hex: '#E63946' },
      { label: 'neon green', hex: '#7CFF01' },
      { label: 'sunset gold', hex: '#E8A93C' },
    ],
    typefaces: ['Fraunces', 'Manrope', 'Oswald'],
    dive: 'Cosmic-bowling neons over a warm meadow palette, with a 3D scene in the hero. The star rating on the page is their real Google score, with the source noted.',
  },
  {
    name: 'Iron Ink',
    type: 'Tattoo studio',
    place: 'Cuyahoga Falls, OH',
    description:
      'A concept redesign that puts the artists and their work first — portfolio-forward, with an easy path from "I like this" to booking a consult.',
    url: 'https://ironink.vercel.app',
    displayUrl: 'ironink.vercel.app',
    shot: '/images/work/iron-ink.png',
    phoneShot: '/images/work/phone/iron-ink.png',
    category: 'redesign',
    stack: ['Next.js', 'Framer Motion', 'Lenis smooth scroll'],
    palette: [
      { label: 'ink black', hex: '#090909' },
      { label: 'copper', hex: '#C45A2D' },
      { label: 'bone', hex: '#F5F0E8' },
      { label: 'smoke', hex: '#1E1C18' },
    ],
    typefaces: ['Oswald', 'DM Sans'],
    dive: 'The artists’ work leads every section, under a film-grain finish that keeps it moody without falling into the black-and-gold tattoo template.',
  },
  {
    name: 'War Horse Ink',
    type: 'Tattoo studio · 4 locations',
    place: 'NE Ohio',
    description:
      'A concept redesign for a multi-location shop — one brand across four studios, with each location and its artists easy to find.',
    url: 'https://warhorse.vercel.app',
    displayUrl: 'warhorse.vercel.app',
    shot: '/images/work/war-horse.png',
    phoneShot: '/images/work/phone/war-horse.png',
    category: 'redesign',
    stack: ['Next.js', 'Keystatic CMS', 'Three.js', 'Framer Motion'],
    palette: [
      { label: 'parchment', hex: '#F4ECDB' },
      { label: 'war orange', hex: '#E0652A' },
      { label: 'olive', hex: '#8C9A4E' },
      { label: 'mustard', hex: '#DCB441' },
    ],
    typefaces: ['Bagel Fat One', 'Advent Pro', 'Mulish'],
    dive: 'One brand across four studios, where every location and its artists get their own editable page. Warm paper tones instead of the usual all-black tattoo site.',
  },
  {
    name: 'Erie Carbonic',
    type: 'CO₂ & gas supplier',
    place: 'Erie, PA',
    description:
      'A concept redesign for a 90-year-old supplier — industrial and credible, making a technical, unglamorous business feel solid and current.',
    url: 'https://erie-carbonic.vercel.app',
    displayUrl: 'erie-carbonic.vercel.app',
    shot: '/images/work/erie-carbonic.png',
    phoneShot: '/images/work/phone/erie-carbonic.png',
    category: 'redesign',
    stack: ['Next.js', 'react-three-fiber', 'GSAP', 'Lenis smooth scroll'],
    palette: [
      { label: 'paper', hex: '#F2EDE1' },
      { label: 'ink', hex: '#1A1A1A' },
      { label: 'carbonic red', hex: '#B0202A' },
      { label: 'hazard yellow', hex: '#E8B13A' },
    ],
    typefaces: ['Barlow Condensed', 'Inter', 'IBM Plex Mono'],
    dive: 'A 3D CO₂ tank you scroll through, camera on a rail, built for a supplier that’s been at it since the 1930s. It stays industrial and matter-of-fact.',
  },
  {
    name: 'Greenline',
    type: 'Lawn care',
    place: 'Erie, PA',
    description:
      'A concept redesign for a lawn-care service — clean, seasonal, and built to make booking a quote the obvious next step.',
    url: 'https://greenline-rust.vercel.app',
    displayUrl: 'greenline-rust.vercel.app',
    shot: '/images/work/greenline.png',
    phoneShot: '/images/work/phone/greenline.png',
    category: 'redesign',
    stack: ['Next.js', 'Framer Motion', 'Lenis smooth scroll'],
    palette: [
      { label: 'cream', hex: '#FEFBF4' },
      { label: 'sage', hex: '#6B8F71' },
      { label: 'forest', hex: '#2D4A32' },
      { label: 'amber', hex: '#D4944C' },
    ],
    typefaces: ['Lora', 'Inter'],
    dive: 'Calm seasonal greens under serif headlines, laid out so "get a quote" is always the obvious next step.',
  },
];

/** Convenience splits, kept for anything that wants one group. */
export const LIVE_PROJECTS = PROJECTS.filter((p) => p.category === 'live');
export const REDESIGN_PROJECTS = PROJECTS.filter((p) => p.category === 'redesign');
