import { ImageResponse } from 'next/og';
import { SocialCard, assetBase, loadCardFonts, pickBrand } from '@/lib/social-cards';

export const runtime = 'edge';

// 1080x1350 — Instagram and Yelp feed post (4:5). Same rotation as the square.
export async function GET(request: Request) {
  const brand = pickBrand(new URL(request.url).searchParams.get('client'));
  const fonts = await loadCardFonts(brand);
  return new ImageResponse(
    <SocialCard brand={brand} base={assetBase(request.url)} width={1080} height={1350} layout="portrait" />,
    { width: 1080, height: 1350, fonts },
  );
}
