export const COLORS = {
  navy: '#18181b',
  electric: '#2563EB',
  warmWhite: '#fafafa',
  accent: '#2563EB',
  darkNavy: '#18181b',
  lightGray: '#fafafa',
  mediumGray: '#a1a1aa',
  electricLight: '#60A5FA',
  electricDark: '#1d4ed8',
  surfacePage: '#fafafa',
  surfaceCard: '#ffffff',
  surfaceSunken: '#f1f1f4',
  textPrimary: '#18181b',
  textSecondary: '#3f3f46',
  textTertiary: '#5b5b63',
  borderDefault: '#e6e6ea',
  borderStrong: '#d4d4d9',
} as const;

export const SITE = {
  name: 'Stray Web Design',
  url: 'https://straywebdesign.co',
  email: 'tom@straydesign.co',
  phone: '814-964-0081',
  tagline: 'Websites that carry your energy to your customers',
  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? '',
} as const;

/**
 * The two ways to reach the phone, derived once so no caller re-assembles the
 * country code by hand.
 *
 * `sms:` opens the visitor's own messaging app on a new thread to this number.
 * It goes straight to Tom's phone — nothing sits in between, so a text arrives
 * the same way a friend's does and he answers from his own number.
 *
 * No prefilled body. iOS and Android disagree about the separator (`&body=`
 * versus `?body=`) and getting it wrong on one of them opens an empty compose
 * window with the number missing, which is worse than no prefill at all.
 */
const PHONE_DIGITS = SITE.phone.replace(/\D/g, '');
export const PHONE_TEL = `tel:+1${PHONE_DIGITS}`;
export const PHONE_SMS = `sms:+1${PHONE_DIGITS}`;

/**
 * The intro video. `src` empty means the Vsl section renders nothing at all —
 * see the note in components/sections/Vsl.tsx. Put the file in public/video/,
 * a poster frame beside it, and fill both fields in.
 *
 * Captions must be burned into the file. It autoplays muted and hardly anyone
 * unmutes, so the words have to be visible without sound.
 */
export const VSL = {
  /**
   * false = the player stays off and the slot shows the questions as text,
   * blue on white. Flip to true when the re-record is cut in.
   */
  video: false as boolean,
  /**
   * One slide per question, shown in the slot while the player is off.
   * Tom's answers from HERO-VIDEO-QA.md, de-looped only. Only the one quote
   * on record; no result numbers until they're in the monthly file.
   */
  slides: [
    {
      label: 'Before the site',
      q: 'Before the site, how were people finding the shop?',
      a: [
        'Word of mouth was already doing really well for them. The service side was booming.',
        "They had products in the store that people didn't really come in and buy, and that's a way to make a lot more money for the amount of work.",
        'The owner got calls all day about the services and the prices. Nobody came in for the products. The questions were pretty repetitive.',
        "I wondered how many people were calling, and how many weren't calling who had run into the same thing.",
      ],
    },
    {
      label: 'What I do',
      q: 'What actually happens when you take a shop like that on?',
      a: [
        "Usually it starts with photographs of all the products. A lot of shops don't have everything in stock properly catalogued, so that's the place to start.",
        'All the photographs and all the prices go into a chart, so I can start listing them on Google for people searching.',
        'In this case a couple hundred golf clubs. Heads and shafts, and some miscellaneous stuff.',
        "When people search, they normally get the people who already have it figured out, like Dick's Sporting Goods. Now this shop shows up for those products too.",
        "Somebody can just walk in and buy a club. The shop makes money on that, and it's there for the people looking for it.",
      ],
    },
    {
      label: 'Why the monthly',
      q: "What happens to a site when nobody's looking after it?",
      a: [
        "Any site nobody's looking after goes out of date. Could be a few months, could be a few years, and that's not a good source of trust for a customer who has never walked in.",
        'The hours can be wrong. People get upset when they drive in and you closed half an hour earlier because the schedule changed.',
        'Links go stale because a path changed. A service changed and the page never did.',
        "It stops being the current version of the business. Everybody's business changes a little over time. That's what the monthly is for.",
      ],
    },
    {
      label: 'Who keeps it current',
      q: 'So who keeps it current?',
      a: [
        "I set up a backend where you make the changes on your own, and it's built to make that as easy as possible.",
        'When a change is outside that, I either adjust the editor so it works better next time, or I get the change in really quick.',
        "It's all wrapped into the monthly.",
      ],
    },
    {
      label: 'Trust',
      q: 'How does someone trust this?',
      a: [
        "It is so hard to trust people online. It's the biggest thing for people.",
        "Here's the resolution. If you're not happy, 90 days, no questions asked. We split ends and you get all your money back.",
        "What's worse: not giving it a chance, or giving it a chance and having 90 days?",
      ],
    },
    {
      label: 'Price',
      q: 'What does it cost? People want the number.',
      a: [
        'Between $1,000 and $3,000 to build.',
        '$20, $50 or $100 a month after that. That covers the hosting and upkeep, plus adjusting titles and looking at how the pages perform each month.',
        'No haggling, no price hidden from you till the last minute.',
      ],
    },
    {
      label: "Who it's for",
      q: "Who's this for? Who do you like working with?",
      a: [
        "People who already know they need it, and have been waiting to find someone they can trust and a process that's going to be straightforward.",
        'People who want flexibility down the road, not something set in stone.',
        'People who want to be proactive and grow, which means the answers to some of the questions on their site are going to change over time.',
      ],
    },
    {
      label: 'What people ask',
      q: 'What do people usually ask before they say yes?',
      a: [
        "How the hosting and pricing works. It's all wrapped into the monthly fee.",
        'My goal is to take as little of your time as possible. The things you regularly change, you can get in and change yourself.',
        "In the back of a lot of owners' heads they know they need to fix it and it's bugging them, but life is so busy. Most people are already ready. They just need the push.",
        "They need to know that somebody who can really work with them isn't going to screw them over, and has the time for them.",
        'Not "we got it set up, and it costs more if you ever want changes." It\'s "you\'re signed up, and I want to make it ideal for you going forward." It can be a headache, and I want it to be stress-free.',
      ],
    },
    {
      label: 'Local',
      q: "You're the local guy for these shops. What does that mean for them?",
      a: [
        "In this case I'm local. That's not always the case, but I'm always very accountable.",
        "I like the human connection to be in person. That's real to me, and we're losing that so much.",
        "Walking in and getting to know the people and the place. There are things you don't realize about a business and what makes it special without walking in.",
      ],
    },
    {
      label: 'What owners say',
      q: 'What do owners say afterward?',
      a: [
        "They're happy I paid attention to detail and went beyond the expectations I set at the start.",
        '"Never any kickback on this. He listens, then executes." That was a restaurant owner, locally.',
      ],
    },
    {
      label: 'What to do',
      q: "If you've never had a site, what should you do?",
      a: [
        "Call my number. I'm pretty available right now. I'm early on and looking to onboard some more clients.",
        "Or fill out the form and we'll set up a meeting. Start with a few questions.",
      ],
    },
  ],
  src: '/video/hero.mp4',
  poster: '/video/hero-poster.jpg',
  label: 'Watch this first',
  /**
   * Chapter starts, in seconds of the rendered file — one per question the
   * interviewer asks. `python3 scripts/video/build-hero.py plan` prints them
   * after every re-cut; paste, don't estimate.
   */
  chapters: [
    { t: 0, label: 'Before the site' },
    { t: 49.4, label: 'What I actually do' },
    { t: 111.9, label: 'A few months in' },
    { t: 174.0, label: 'Who keeps it current' },
    { t: 201.4, label: 'What people ask first' },
    { t: 275.1, label: 'Being local' },
    { t: 314.4, label: 'What owners say' },
    { t: 334.7, label: 'What to do next' },
  ],
} as const;

/**
 * The availability strip. `spots: null` means the Scarcity section renders
 * nothing at all — see the note in components/sections/Scarcity.tsx.
 *
 * Only ever set this to a number Tom has actually decided, and update
 * `checked` in the same edit. A stale date is its own kind of lie.
 */
export const SCARCITY = {
  spots: null as number | null,
  period: 'this month',
  checked: '',
} as const;

/* NAV_LINKS is gone with the nav. The page is a landing page now: one message,
   one action, and nowhere else to click. */

export const BOOKING_TIMING_OPTIONS = [
  'This week',
  'Next week',
  'Within 2 weeks',
  'Flexible',
] as const;

export const SPRING_CONFIG = {
  gentle: { stiffness: 120, damping: 14 },
  snappy: { stiffness: 300, damping: 30 },
  bouncy: { stiffness: 400, damping: 25 },
} as const;

export const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
