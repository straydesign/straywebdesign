export interface PersonalizationContext {
  visitCount: number;
  isReturning: boolean;
  referrerSource: 'google' | 'social' | 'direct' | 'other';
  referrerUrl: string;
  isLocal: boolean;
  geo: { city: string; region: string; country: string };
}

export function getPersonalizationFromCookies(
  cookieString: string
): PersonalizationContext {
  const cookies = parseCookies(cookieString);

  const visitCount = parseInt(cookies['swd_visits'] ?? '0', 10);
  const referrer = cookies['swd_referrer'] ?? '';
  const geo = (cookies['swd_geo'] ?? '').split(',');

  const city = decodeURIComponent(geo[0] ?? '');
  const region = geo[1] ?? '';
  const country = geo[2] ?? '';

  const isLocal = Boolean(city && region && country === 'US');

  return {
    visitCount,
    isReturning: visitCount > 1,
    referrerSource: classifyReferrer(referrer),
    referrerUrl: referrer,
    isLocal,
    geo: { city, region, country },
  };
}

function classifyReferrer(
  referrer: string
): PersonalizationContext['referrerSource'] {
  if (!referrer) return 'direct';
  if (/google\.|bing\.|yahoo\.|duckduckgo\./i.test(referrer)) return 'google';
  if (/facebook\.|instagram\.|twitter\.|linkedin\.|tiktok\./i.test(referrer))
    return 'social';
  return 'other';
}

function parseCookies(cookieString: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!cookieString) return cookies;

  for (const pair of cookieString.split(';')) {
    const [key, ...rest] = pair.trim().split('=');
    if (key) {
      cookies[key.trim()] = rest.join('=').trim();
    }
  }
  return cookies;
}

export type HeroCopy = {
  badge: string;
  headline: string;
  subheadline: string;
  cta: string;
};

export function getPersonalizedHeroCopy(ctx: PersonalizationContext): HeroCopy {
  if (ctx.isReturning) {
    return {
      badge: 'Welcome back',
      headline: 'Ready to lock in the plan?',
      subheadline:
        "You've seen what we do. Tell me about the business and I'll come back with a plan for the site.",
      cta: 'Tell me about your business',
    };
  }

  if (ctx.referrerSource === 'google') {
    return {
      badge: 'Found us on Google? Good taste.',
      headline: "Before you spend a dollar on a site — let's talk about what it needs to do.",
      subheadline:
        "Tell me about your business. I'll come back with a plan for the customer, the offer, and the one action the site needs to drive.",
      cta: 'Tell me about your business',
    };
  }

  if (ctx.isLocal) {
    return {
      badge: ctx.geo.city
        ? `Built for ${ctx.geo.city} businesses`
        : 'Built for local businesses',
      headline: "Before you spend a dollar on a site — let's talk about what it needs to do.",
      subheadline:
        "Tell me about your business. I'll come back with a plan for the customer, the offer, and the one action the site needs to drive.",
      cta: 'Tell me about your business',
    };
  }

  return {
    badge: 'Custom websites, built to convert',
    headline: "Before you spend a dollar on a site — let's talk about what it needs to do.",
    subheadline:
      "Tell me about your business. I'll come back with a plan for the customer, the offer, and the one action the site needs to drive.",
    cta: 'Tell me about your business',
  };
}
