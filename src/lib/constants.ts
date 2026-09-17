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
   * blue on white.
   *
   * OFF since 2026-09-17 on Tom's call — "let's take the video off for now,
   * I do not like it." That is a judgement on take two, not on the slot, so
   * the slides carry it until a recording he likes exists. Do not flip this
   * back because a file is present; it goes back on when he says so.
   */
  video: false as boolean,
  /**
   * One slide per question, shown in the slot while the player is off.
   * Tom's answers from HERO-VIDEO-QA.md, de-looped only. Only the one quote
   * on record; no result numbers until they're in the monthly file.
   */
  slides: [
    {
      label: 'Your shop now',
      q: 'How are people finding your shop now?',
      a: [
        "Word of mouth works well for you. There's a part of your business that's doing great.",
        "There's another part of it people don't come in for.",
        'You get calls all day about services and prices, and the questions get repetitive.',
        "Some people don't give you a call in the first place. They find the information somewhere else before they get the chance to.",
        "Your shop can show up for those searches too, and somebody can walk in and buy the thing. Here's how that happens.",
      ],
    },
    {
      label: 'Why I do this',
      q: 'Why do you do this?',
      a: [
        'I got my first clients by walking in and pitching cold.',
        'Most of them had spent years getting good at one thing and never had a way to show it to the people already searching for it.',
        "I like the human connection to be in person. That's real to me, and we're losing that so much.",
        "There are things you don't realize about a business and what makes it special without walking in.",
      ],
    },
    {
      label: 'What I do',
      q: 'What happens when I take your shop on?',
      a: [
        "Usually it starts with photographs of everything you sell. A lot of shops don't have everything in stock properly catalogued, so that's the place to start.",
        'All the photographs and all the prices go into a chart, so I can start listing them on Google for the people searching.',
        'For one shop that was a couple hundred golf clubs. Heads and shafts, and some miscellaneous stuff.',
        "When people search, they normally get the ones who already have it figured out, like Dick's Sporting Goods. Now your shop shows up for those products too.",
        'About a week from the day your photos and details reach me. A catalog takes longer, and how much longer comes down to how many items you have.',
      ],
    },
    {
      label: 'Why the monthly',
      q: "What happens to your site when nobody's looking after it?",
      a: [
        "Any site nobody's looking after goes out of date. Could be a few months, could be a few years, and that's not a good source of trust for a customer who has never walked in.",
        'Your hours can be wrong. People get upset when they drive in and you closed half an hour earlier because the schedule changed.',
        'Links go stale because a path changed. A service changed and the page never did.',
        "It stops being the current version of your business. Everybody's business changes a little over time. That's what the monthly is for.",
      ],
    },
    {
      label: 'Who keeps it current',
      q: 'So who keeps your site current?',
      a: [
        "You do, for the everyday things. I set up a backend where you make those changes on your own, and it's built to make that as easy as possible.",
        'When a change is outside that, I either adjust the editor so it works better next time, or I get the change in really quick.',
        'Hosting, upkeep and the changes are all wrapped into your monthly, plus adjusting titles and looking at how your pages perform each month.',
        'Not "we got it set up, and it costs more if you ever want changes." It\'s "you\'re signed up, and I want to make it ideal for you going forward."',
      ],
    },
    {
      label: 'How it starts',
      q: 'What actually happens if you say yes?',
      a: [
        'Fill out the form and book a slot. Then we talk about your business, the photos you already have, and your list of what you sell.',
        "If that list only exists on a whiteboard or in your head, that's normal, and we work from that.",
        'I walk your place and photograph everything on the shelves. If you already have a list, that works too.',
        'If you have a site now, it stays up and keeps working. I build the new one alongside it, your domain stays yours, and we switch when you say go.',
      ],
    },
    {
      label: 'Is this for you',
      q: 'Is this for you?',
      a: [
        "You already know you need it, and you've been waiting to find someone you can trust and a process that's going to be straightforward.",
        'You want flexibility down the road, not something set in stone.',
        'You want to be proactive and grow, which means the answers to some of the questions on your site are going to change over time.',
        "If you already have a site that loads fast, says the right things, and people are finding you, keep it. Give me the address on the call and I'll tell you straight if there's nothing here worth doing.",
      ],
    },
    {
      label: 'Your time',
      q: 'How much of your time does this take?',
      a: [
        'I take the photos. If you already have good ones, we use those.',
        "I write the words and you correct me. You know your business and I don't, so the first draft is mine to get wrong and yours to fix.",
        "If you're not technical, that describes most of the people I work with. If something needs doing on the site and you'd rather not touch it, send it to me and it's handled.",
        'New hours, a swapped photo, a price that moved: you send it over and I do it.',
      ],
    },
    {
      label: 'Local',
      q: "What does it mean for you that I'm local?",
      a: [
        "For most of the shops I work with, I'm local. When I'm not, I'm still very accountable to you.",
        'Walking in and getting to know you and the place. You can walk in on me the same way.',
        "If you're not in Erie, calls and screen shares do the job, and the hosting and the edits are the same wherever you are. The only thing that changes is that I can't come and take the photos myself.",
      ],
    },
    {
      label: 'Trust',
      q: "How do you know I'll stay reliable for you?",
      a: [
        "You need to know the person you're working with has the time for you and isn't going to screw you over.",
        "You own the site. It isn't sitting on a platform you have to keep paying to keep the lights on, and if you ever want to take it somewhere else, it goes with you.",
        "If you're not happy, 90 days, no questions asked. We split ends and you get all your money back. That's the Stray Success Guarantee.",
        "What's worse: not giving it a chance, or giving it a chance and having 90 days?",
      ],
    },
    {
      label: 'What owners say',
      q: 'What do other owners say afterward?',
      a: [
        "They're happy I paid attention to detail and went beyond what I said at the start.",
        '"The communication and timeliness of his work is outstanding. I could not be happier with the product also. His web design was awesome. He listens, then executes." A restaurant owner here in Erie.',
      ],
    },
    {
      label: 'What to do',
      q: 'What should you do next?',
      a: [
        "You've spent years getting good at one thing and never had a way to show it to the people already searching for it.",
        "Word of mouth carries the part that's doing great. The people searching for the rest are finding it somewhere else.",
        "Call my number. I'm pretty available right now. I'm early on and looking to onboard some more clients.",
        "Or fill out the form and we'll set up a meeting.",
      ],
    },
  ],
  src: '/video/hero.mp4',
  poster: '/video/hero-poster.jpg',
  label: 'Watch this first',
  /**
   * Chapter starts, in seconds of the rendered file — one per slide of the
   * spoken piece. `python3 scripts/video/build-hero2.py plan` prints them
   * after every re-cut; paste, don't estimate.
   */
  chapters: [
    { t: 0.0, label: 'Your shop now' },
    { t: 19.4, label: 'Why I do this' },
    { t: 33.3, label: 'What I do' },
    { t: 76.6, label: 'Why the monthly' },
    { t: 89.3, label: 'Who keeps it current' },
    { t: 115.0, label: 'How it starts' },
    { t: 132.3, label: 'Is this for you' },
    { t: 152.1, label: 'Your time' },
    { t: 179.8, label: 'Local' },
    { t: 190.4, label: 'Trust' },
    { t: 214.6, label: 'What owners say' },
    { t: 235.0, label: 'What to do' },
  ],
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
