import { headers } from 'next/headers';
import { ImageResponse } from 'next/og';
import { StrayHeroCard, assetBase, loadHeroFonts } from '@/lib/social-cards';

export const runtime = 'edge';
export const alt =
  'Engaging sites for strong brands with passionate owners — four live client sites, fanned.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/* The link preview — what unfurls when the address gets pasted into a text or
   a DM. It is pinned to one brand rather than put on the rotation the social
   routes use: Next renders this once at build, so a rotation would freeze on
   whichever brand the build happened to land on, and a link preview that
   changes between shares is a link preview nobody trusts.

   It used to be pinned to Sea Cave, which meant sharing straywebdesign.co
   unfurled as "Sea Cave", in Sea Cave's navy, over seacaveinc.com — the only
   Stray thing on it was the wordmark. A link preview is the one image that
   has to say whose link it is. */
/* Tom, 2026-09-22: the preview "should basically be this", holding up the top
   of the page. So it is the hero rather than a card about the hero — see
   StrayHeroCard. The per-brand SocialCard template still drives the four
   client cards on /og/social/*; only this one changed. */

/* The origin comes off the incoming request, the same way the /og/social
   routes take it off `request.url`.

   A metadata route gets no `request` argument, so this one called `assetBase()`
   with nothing and let the fallbacks guess. Under `next start` NODE_ENV is
   "production", so the localhost branch never fired and it reached for
   https://straywebdesign.co — whose /images/social/ captures do not exist until
   this branch ships. Satori answers a failed image fetch with an empty box and
   no error, so the one card that unfurls in every text and DM rendered as two
   blank silhouettes, at 76KB instead of 650KB, and nothing anywhere said so.

   Reading the Host header makes it correct on localhost, on a preview URL and
   in production, and — the point — verifiable before it ships rather than
   after. */
async function originFromRequest(): Promise<string> {
  const h = await headers();
  const host = h.get('host');
  if (!host) return assetBase();
  const proto = h.get('x-forwarded-proto') ?? (/^(localhost|127\.0\.0\.1)(:|$)/.test(host) ? 'http' : 'https');
  return assetBase(`${proto}://${host}/opengraph-image`);
}

export default async function OGImage() {
  const [fonts, base] = await Promise.all([loadHeroFonts(), originFromRequest()]);
  return new ImageResponse(<StrayHeroCard base={base} width={1200} height={630} />, {
    ...size,
    fonts,
  });
}
