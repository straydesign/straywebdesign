import { ImageResponse } from 'next/og';
import { SocialCard, assetBase, loadCardFonts, pickBrand } from '@/lib/social-cards';

export const runtime = 'edge';

// 2048x1152 — Yelp cover photo, Google Business Profile cover photo (16:9).
// A cover sits at the top of a profile for months, so this one is usually
// fetched with an explicit ?client= rather than left on the rotation.
export async function GET(request: Request) {
  const brand = pickBrand(new URL(request.url).searchParams.get('client'));
  const fonts = await loadCardFonts(brand);
  return new ImageResponse(
    <SocialCard brand={brand} base={assetBase(request.url)} width={2048} height={1152} layout="wide" />,
    { width: 2048, height: 1152, fonts },
  );
}
