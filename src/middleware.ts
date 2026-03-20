import { NextResponse, type NextRequest } from 'next/server';

const COOKIE_VISIT_COUNT = 'swd_visits';
const COOKIE_REFERRER = 'swd_referrer';
const COOKIE_GEO = 'swd_geo';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Visit count
  const visits = parseInt(request.cookies.get(COOKIE_VISIT_COUNT)?.value ?? '0', 10);
  response.cookies.set(COOKIE_VISIT_COUNT, String(visits + 1), {
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
    sameSite: 'lax',
  });

  // Capture original referrer on first visit
  if (visits === 0) {
    const referrer = request.headers.get('referer') ?? '';
    response.cookies.set(COOKIE_REFERRER, referrer, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
      sameSite: 'lax',
    });
  }

  // Geo from Vercel headers
  const city = request.headers.get('x-vercel-ip-city') ?? '';
  const region = request.headers.get('x-vercel-ip-country-region') ?? '';
  const country = request.headers.get('x-vercel-ip-country') ?? '';
  const geo = [city, region, country].filter(Boolean).join(',');
  if (geo) {
    response.cookies.set(COOKIE_GEO, geo, {
      maxAge: 60 * 60 * 24,
      path: '/',
      sameSite: 'lax',
    });
  }

  // Rate limiting for chat API (simple per-IP)
  if (request.nextUrl.pathname === '/api/chat') {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
    const rateLimitKey = `chat_${ip}`;
    // Rely on API route for actual rate limiting — middleware sets the header
    response.headers.set('x-client-ip', ip);
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|feed.xml|sitemap.xml).*)'],
};
