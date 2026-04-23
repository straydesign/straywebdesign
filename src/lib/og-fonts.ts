let cachedBold: ArrayBuffer | null = null;
let cachedExtraBold: ArrayBuffer | null = null;

const INTER_BOLD =
  'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.ttf';
const INTER_EXTRA_BOLD =
  'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-800-normal.ttf';

export async function loadOgFonts() {
  if (!cachedBold) {
    const res = await fetch(INTER_BOLD);
    cachedBold = await res.arrayBuffer();
  }
  if (!cachedExtraBold) {
    const res = await fetch(INTER_EXTRA_BOLD);
    cachedExtraBold = await res.arrayBuffer();
  }

  return [
    { name: 'Inter', data: cachedBold, weight: 700 as const, style: 'normal' as const },
    { name: 'Inter', data: cachedExtraBold, weight: 800 as const, style: 'normal' as const },
  ];
}
