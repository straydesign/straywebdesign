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
      headline: 'Ready to Outperform Your Competitors?',
      subheadline:
        "You've seen what we do. Let's build something that makes your competitors nervous.",
      cta: 'Start Your Project',
    };
  }

  if (ctx.referrerSource === 'google') {
    return {
      badge: 'Found us on Google? Good taste.',
      headline: 'Websites That Outperform Your Competitors',
      subheadline:
        "Here's why businesses trust us: enterprise-grade sites at a fraction of the cost.",
      cta: 'Get Free Audit',
    };
  }

  if (ctx.isLocal) {
    return {
      badge: ctx.geo.city
        ? `For Practices, Dealerships & Professional Services in ${ctx.geo.city}`
        : 'For Practices, Dealerships & Professional Services',
      headline: 'Websites That Outperform Your Competitors',
      subheadline:
        'Enterprise-grade sites for practices, firms, and dealerships — at a fraction of the cost.',
      cta: 'Get Free Audit',
    };
  }

  // Default / out-of-area
  return {
    badge: 'Enterprise-grade web design, anywhere',
    headline: 'Websites That Outperform Your Competitors',
    subheadline:
      'Enterprise-grade sites for practices, firms, and dealerships — at a fraction of the cost.',
    cta: 'Get Free Audit',
  };
}
