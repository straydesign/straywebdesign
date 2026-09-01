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
  /** URL slug for the case-study page at /work/[slug]. */
  slug: string;
  /** What kind of business it is. */
  type: string;
  /** Industry group the site is filed under on the /work gallery. */
  vertical: string;
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
  /** Case-study page copy. Facts only — nothing beyond what's public. */
  caseStudy: {
    /** The situation the site had to serve. */
    intro: string;
    /** What the build actually does, one paragraph per beat. */
    built: string[];
    /** Design decisions, told plainly. */
    design: string;
    /** How it runs day to day. */
    runs: string;
  };
};

export const PROJECTS: Project[] = [
  {
    name: "Andy's Ale House & Grill",
    slug: 'andys',
    type: 'Bar & restaurant',
    vertical: 'Bars & restaurants',
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
    caseStudy: {
      intro:
        "Andy's is a bar and grill on Peach Street in Erie with a kitchen that runs late and a menu that changes every day. A site for a place like this lives or dies on one thing: whether the specials on the screen match the specials at the bar. That meant the team had to be able to change the site themselves, daily, without waiting on anyone.",
      built: [
        'The whole site hangs off content the team controls: full menus and a daily specials board, plus the hours and an events calendar. When the kitchen changes something, someone at the bar updates it and the site follows.',
        'Food photography does a lot of the selling, so each photo gets its own color grade before it goes up. Fifty photos from fifty different lighting situations read as one warm, consistent menu instead of a camera roll.',
      ],
      design:
        "Charcoal and deep browns set the room, the house red does the pointing, and cream keeps the menus readable. Playfair Display gives the headings a pub-sign warmth and Outfit stays out of the way in the body. Nothing about the layout is clever for its own sake; it's built to make food and specials the loudest thing on every screen.",
      runs:
        'The team edits everything from menus and specials to hours and events through a CMS, with no designer in the loop. I keep the site hosted and fast, and I handle anything structural.',
    },
  },
  {
    name: 'Bullfrog',
    slug: 'bullfrog',
    type: 'Bar & live-music venue',
    vertical: 'Bars & restaurants',
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
    caseStudy: {
      intro:
        "Bullfrog is a live-music venue and bar in Erie. For a venue, the website has exactly one job that matters: tonight's show, this week's lineup, and whether the person checking on their phone at 9pm can find it in five seconds.",
      built: [
        'The show calendar leads the site and everything else supports it. The team adds and edits shows themselves, so the lineup on the site is the real lineup.',
        "The site is built to be checked from a phone on the way out the door: light pages, the calendar up top, and hours and location one thumb-scroll away.",
        'The neon sign in the hero flickers like a real one. Three misfires and a recovery, hand-keyframed, because a steady glow reads as a JPEG and a real neon never behaves.',
      ],
      design:
        'Black room, green neon. The frog green and its brighter neon sibling carry the brand, mint cream handles the reading, and Righteous gives the display type the right kind of loud. It looks like the inside of a venue, which is the point.',
      runs:
        'The team keeps the calendar current through a CMS. I host and manage the site and handle everything structural.',
    },
  },
  {
    name: 'Sea Cave',
    slug: 'sea-cave',
    type: 'Aquarium & fish store',
    vertical: 'Shops & specialty retail',
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
    caseStudy: {
      intro:
        'Sea Cave has been selling saltwater and freshwater fish in Erie since 1975. The store had five decades of standing and almost none of it online, so the job was to put the whole catalog on the internet without faking a single thing about it.',
      built: [
        'The catalog runs to six hundred plus products, everything from livestock and coral to dry goods, each on its own page a search engine can find.',
        'Live fish get one hard rule: a listing only publishes with a real photo of the species, never a stock render. Prices show with a call-to-confirm note, because livestock pricing really does vary batch to batch, and pretending otherwise would just generate phone arguments.',
        'Build guides walk through real tank setups and link straight to the products they use, so the catalog and the advice feed each other.',
      ],
      design:
        'Deep reef blues set the water, a coral orange handles every action, and Instrument Serif italic surfaces in single words like a specimen label. The palette comes from the tanks themselves.',
      runs:
        'The shop edits stock and pricing through an on-site editor, and photo updates go through a review queue. I run the hosting and the product data pipeline.',
    },
  },
  {
    name: 'Presque Isle Fish & Farm',
    slug: 'presque-isle-fish-and-farm',
    type: 'Fish market, kitchen & farm counter',
    vertical: 'Shops & specialty retail',
    place: 'Erie, PA',
    description:
      'A family-owned fish market on W 8th St, where the owner catches the Lake Erie half of the counter himself. The site puts every counter online — lake fish, ocean and Gulf, shellfish, the kitchen and the farm — and hands him the controls to keep it current.',
    url: 'https://presqueislefishandfarm.com',
    displayUrl: 'presqueislefishandfarm.com',
    shot: '/images/work/presque-isle.png',
    phoneShot: '/images/work/phone/presque-isle.png',
    stack: ['Next.js', 'Owner dashboard', 'Documented brand system', 'Wholesale enquiries'],
    palette: [
      { label: 'compass red', hex: '#9f2b34' },
      { label: 'counter ink', hex: '#1d2126' },
      { label: 'crushed ice', hex: '#f2f6fa' },
      { label: 'paper', hex: '#ffffff' },
    ],
    typefaces: ['Schibsted Grotesk', 'Albert Sans'],
    dive: 'The red is sampled straight off their own compass-rose logo, and it is the only accent on the page. Everything else is white and an ice-cool grey, because the case really does run on crushed ice.',
    caseStudy: {
      intro:
        'Presque Isle Fish & Farm sells fresh fish on W 8th St in Erie, and the thing that makes the shop worth driving to is hard to put on a sign: the Captain fishes Lake Erie himself, so while the lake is fishing, the local half of the counter is his own catch. The site had to carry that without turning it into a slogan.',
      built: [
        'Every counter has its own place on the page — the Lake Erie case with perch, walleye and whitefish, then ocean and Gulf, then shellfish, then the kitchen and the farm. Somebody deciding what to cook can see the whole shop in one scroll.',
        'A wholesale page handles the restaurant side, which is a different buyer asking different questions than the person picking up dinner.',
        'The shop has its own dashboard, so stock and prices change when the catch does rather than when I get to it.',
      ],
      design:
        'One red, sampled from their compass-rose logo, doing every job an accent does; white and an ice-cool grey for everything else, because the material the shop actually runs on is crushed ice. The whole system is written down on its own page, so the next person to touch it inherits the reasoning and not just the hex codes.',
      runs:
        'The shop updates its own counters through the dashboard. I run the hosting, and I am the phone call when something needs changing.',
    },
  },
];
