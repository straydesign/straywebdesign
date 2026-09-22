import { ImageResponse } from 'next/og';
import { SocialCard, assetBase, loadCardFonts, pickBrand } from '@/lib/social-cards';

export const runtime = 'edge';

// 1200x1200 — Google Business Profile post, Yelp profile post, Instagram square.
// `?client=andys|bullfrog|seacave|presqueisle` picks one; without it the card
// rotates by the day, so four posts pulled in a row are four different brands.
export async function GET(request: Request) {
  const brand = pickBrand(new URL(request.url).searchParams.get('client'));
  const fonts = await loadCardFonts(brand);
  return new ImageResponse(
    <SocialCard brand={brand} base={assetBase(request.url)} width={1200} height={1200} layout="square" />,
    { width: 1200, height: 1200, fonts },
  );
}
