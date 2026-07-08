/* clients.ts — the work shown on the homepage: real, running sites I built,
   host, and manage for a business. Single source of truth for the showcase.
   Desktop shots live in public/images/work/ (1280×800), phone shots
   (390×844) in public/images/work/phone/. Palettes, typefaces, and stacks
   are pulled from each project's actual code — never invented. */

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
  /** Domain shown in captions and links. */
  displayUrl: string;
  /** Desktop screenshot in public/images/work/. */
  shot: string;
  /** Mobile screenshot in public/images/work/phone/. */
  phoneShot: string;
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
  {
    name: 'Sea Cave',
    type: 'Aquarium & fish store',
    place: 'Erie, PA',
    description:
      'A store that has been on Erie tanks since 1975, now with its whole catalog online: saltwater and freshwater livestock, coral, dry goods, and build guides. I designed and built the site, and I keep the hosting and product data running.',
    url: 'https://seacaveinc.com',
    displayUrl: 'seacaveinc.com',
    shot: '/images/work/seacave.png',
    phoneShot: '/images/work/phone/seacave.png',
    stack: ['Next.js', 'Keystatic CMS', '600+ product catalog', 'Live stock & pricing'],
    palette: [
      { label: 'reef base', hex: '#06223f' },
      { label: 'reef panel', hex: '#0b3666' },
      { label: 'reef accent', hex: '#56c4f0' },
      { label: 'coral action', hex: '#ff7a1e' },
    ],
    typefaces: ['Inter', 'Instrument Serif'],
    dive: 'Fish listings only go up with a real photo of the species, and prices carry a call-to-confirm note because livestock varies batch to batch. The shop edits stock and pricing themselves through an on-site editor.',
  },
];
