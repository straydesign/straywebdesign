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

export const NAV_LINKS = [
  { label: 'Answers', href: '#questions' },
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Photography', href: '/photography' },
  { label: 'Writing', href: '/resources' },
  { label: 'About', href: '#about' },
] as const;

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
