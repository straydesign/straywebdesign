import { ImageResponse } from 'next/og';
import { CARD_BRANDS, SocialCard, assetBase, loadCardFonts } from '@/lib/social-cards';

export const runtime = 'edge';
export const alt = 'Stray Web Design — engaging sites for strong brands with passionate owners.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/* The link preview — what unfurls when the address gets pasted into a text or
   a DM. It is pinned to one brand rather than put on the rotation the social
   routes use: Next renders this once at build, so a rotation would freeze on
   whichever brand the build happened to land on, and a link preview that
   changes between shares is a link preview nobody trusts.

   Sea Cave carries it. Deep ground, one hot accent, and the highest contrast
   of the four at the size a preview actually gets seen. */
const BRAND = CARD_BRANDS.find((b) => b.slug === 'seacave')!;

export default async function OGImage() {
  const fonts = await loadCardFonts(BRAND);
  return new ImageResponse(
    <SocialCard brand={BRAND} base={assetBase()} width={1200} height={630} layout="wide" />,
    { ...size, fonts },
  );
}
