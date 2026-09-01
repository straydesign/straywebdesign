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
 * The intro video. `src` empty means the Vsl section renders nothing at all —
 * see the note in components/sections/Vsl.tsx. Put the file in public/video/,
 * a poster frame beside it, and fill both fields in.
 *
 * Captions must be burned into the file. It autoplays muted and hardly anyone
 * unmutes, so the words have to be visible without sound.
 */
export const VSL = {
  src: '',
  poster: '',
  label: 'Watch this first',
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
