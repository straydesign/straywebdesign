/* social-cards.tsx — one card template, four worlds.

   Every card is a real client: their own ground colour, their own display
   typeface, and the real laptop and phone captures of the site I built them.
   A card that could be re-skinned for anybody is a card that proves nothing,
   which is the whole problem with a template — so the thing that changes
   between cards is the part a template cannot fake.

   Colours and typefaces are lifted from src/data/clients.ts, which pulls them
   from each project's own theme code. Nothing here is invented.

   The captures live in public/images/social/ as JPEG rather than the WebP in
   public/images/devices/: satori decodes PNG and JPEG, and hands back a blank
   box for WebP without erroring. Regenerate them with scripts/social-shots.sh. */

export type CardBrand = {
  slug: string;
  /** The name as it goes on the card, one line per array entry. */
  name: string[];
  /** What the place actually is. Lower case, no full stop. */
  line: string;
  /** Their site. */
  domain: string;
  /** Ground colour, from their own palette. */
  ground: string;
  /** The one colour that points, from their own palette. */
  accent: string;
  /** Reading colour on the ground. */
  ink: string;
  /** Their display face — the part that makes the card un-templatable. */
  face: string;
  /** fontsource file for that face. */
  faceUrl: string;
  /** Weight the face is loaded at. Satori matches on the number. */
  faceWeight: 400 | 700;
  /** Letter-spacing in ems; a display serif and a fat geometric want different. */
  faceTracking: string;
};

export const CARD_BRANDS: CardBrand[] = [
  {
    slug: 'andys',
    name: ["Andy's", 'Ale House'],
    line: 'menus and daily specials, edited by the team',
    domain: 'andyspub.com',
    ground: '#FDF5E6',
    accent: '#CC1122',
    ink: '#1C1917',
    face: 'Playfair Display',
    faceUrl:
      'https://cdn.jsdelivr.net/fontsource/fonts/playfair-display@latest/latin-700-normal.ttf',
    faceWeight: 700,
    faceTracking: '-0.02em',
  },
  {
    slug: 'bullfrog',
    name: ['Bullfrog'],
    line: 'a stage, a dance floor, and a band every Friday',
    domain: 'bullfrogbarerie.com',
    ground: '#0A0A0A',
    accent: '#34D399',
    ink: '#ECFDF5',
    face: 'Righteous',
    faceUrl: 'https://cdn.jsdelivr.net/fontsource/fonts/righteous@latest/latin-400-normal.ttf',
    faceWeight: 400,
    faceTracking: '0em',
  },
  {
    slug: 'seacave',
    name: ['Sea Cave'],
    /* No town on a share card. These go out to people who are not here, and
       geography is the thing the whole reposition took off the front of the
       site. Fifty years is the claim; where it happened is not. */
    line: 'saltwater and freshwater, since 1975',
    domain: 'seacaveinc.com',
    ground: '#06223f',
    accent: '#ff7a1e',
    ink: '#EAF4FF',
    face: 'Instrument Serif',
    faceUrl:
      'https://cdn.jsdelivr.net/fontsource/fonts/instrument-serif@latest/latin-400-normal.ttf',
    faceWeight: 400,
    faceTracking: '-0.01em',
  },
  {
    slug: 'presqueisle',
    name: ['Presque Isle', 'Fish & Farm'],
    line: 'the lake, the ocean, the kitchen and the farm',
    domain: 'presqueislefishandfarm.com',
    /* Their site runs one red as the only accent on white and an ice grey,
       so a red GROUND inverts their own system — and on it the accent rule
       had nothing left to be. Ice ground, red accent, counter ink. */
    ground: '#f2f6fa',
    accent: '#9f2b34',
    ink: '#1d2126',
    face: 'Schibsted Grotesk',
    faceUrl:
      'https://cdn.jsdelivr.net/fontsource/fonts/schibsted-grotesk@latest/latin-700-normal.ttf',
    faceWeight: 700,
    faceTracking: '-0.03em',
  },
];

/**
 * Which brand a request asked for. `?client=bullfrog`, or a rotation keyed to
 * the day so a card fetched without a parameter is not always Andy's.
 */
/**
 * The site's own card.
 *
 * Deliberately NOT in CARD_BRANDS: that array is the rotation the /og/social
 * routes cycle, and Stray is not one of the four clients. It lives here so the
 * home page's link preview stops borrowing a client's identity — before this,
 * sharing straywebdesign.co unfurled as "Sea Cave", in Sea Cave's colours,
 * over seacaveinc.com. The wordmark was the only Stray thing on it.
 *
 * Paper ground and ink type, which is what the site itself is. The `face` is
 * Schibsted Grotesk, the same display face the pages use, so the card and the
 * page it points at are visibly one thing.
 */
export const STRAY_BRAND: CardBrand = {
  slug: 'stray',
  name: ['Stray Web', 'Design'],
  line: 'four live sites, built and run by one person',
  domain: 'straywebdesign.co',
  ground: '#f7f7f7',
  accent: '#2563EB',
  ink: '#111111',
  face: 'Schibsted Grotesk',
  faceUrl:
    'https://cdn.jsdelivr.net/fontsource/fonts/schibsted-grotesk@latest/latin-700-normal.ttf',
  faceWeight: 700,
  faceTracking: '-0.03em',
};

export function pickBrand(param?: string | null): CardBrand {
  if (param) {
    const found = CARD_BRANDS.find((b) => b.slug === param.toLowerCase());
    if (found) return found;
  }
  const day = Math.floor(Date.now() / 86_400_000);
  return CARD_BRANDS[day % CARD_BRANDS.length];
}

/**
 * Where the card fetches its own captures from.
 *
 * Satori runs on the edge with no notion of the deployment it belongs to, so a
 * relative src resolves to nothing and draws an empty box. In production the
 * canonical host is right; VERCEL_URL covers preview deployments, which is
 * where a wrong base URL would otherwise go unnoticed until the card was
 * already being shared.
 */
export function assetBase(requestUrl?: string): string {
  if (requestUrl) {
    const u = new URL(requestUrl);
    if (u.hostname === 'localhost' || u.hostname === '127.0.0.1') return u.origin;
  }
  if (process.env.VERCEL_ENV === 'production') return 'https://straywebdesign.co';
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (requestUrl) return new URL(requestUrl).origin;
  /* opengraph-image.tsx renders without a request, so on this machine it would
     otherwise reach for the live site and draw empty device boxes against
     captures that have not shipped yet. */
  if (process.env.NODE_ENV !== 'production') {
    return `http://localhost:${process.env.PORT ?? 4790}`;
  }
  return 'https://straywebdesign.co';
}

let cachedInter: ArrayBuffer | null = null;
const faceCache = new Map<string, ArrayBuffer>();

const INTER_SEMIBOLD =
  'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-600-normal.ttf';

/**
 * Inter carries the small type on every card; the brand's own face carries the
 * name and nothing else. Only the one face the requested card needs is
 * fetched — loading all four per render would quadruple the cold start for
 * three faces that never get drawn.
 */
export async function loadCardFonts(brand: CardBrand) {
  if (!cachedInter) {
    cachedInter = await (await fetch(INTER_SEMIBOLD)).arrayBuffer();
  }
  if (!faceCache.has(brand.slug)) {
    faceCache.set(brand.slug, await (await fetch(brand.faceUrl)).arrayBuffer());
  }
  return [
    { name: 'Inter', data: cachedInter, weight: 600 as const, style: 'normal' as const },
    {
      name: brand.face,
      data: faceCache.get(brand.slug)!,
      weight: brand.faceWeight,
      style: 'normal' as const,
    },
  ];
}

/**
 * Four laptops on four planes — the hero stack, flattened onto a card.
 *
 * This is the art for the site's own preview, where a single client's laptop
 * would be the wrong claim. Back to front, the same order the hero fans them
 * in, so the newest work is the one nearest the viewer.
 *
 * Each card steps right and down and turns a little further, which is what
 * reads as depth without a perspective transform — satori has no 3D, and it
 * does not need one at this size.
 */
function LaptopFan({ base, boxWidth }: { base: string; boxWidth: number }) {
  const SLUGS = ['andys', 'bullfrog', 'seacave', 'presqueisle'];
  /* The fan is 1.42 laptops wide at a 14% step, so the laptop has to come
     down to fit the same box the single-laptop pair was given. */
  const w = Math.round(boxWidth / 1.42);
  const h = Math.round(w * 0.625);
  const stepX = Math.round(w * 0.14);
  const stepY = Math.round(h * 0.075);
  const boxH = Math.round(h + stepY * 3 + h * 0.16);

  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        width: `${boxWidth}px`,
        height: `${boxH}px`,
      }}
    >
      {SLUGS.map((slug, i) => (
        <div
          key={slug}
          style={{
            display: 'flex',
            position: 'absolute',
            left: `${i * stepX}px`,
            top: `${Math.round(h * 0.09) + i * stepY}px`,
            transform: `rotate(${-5 + i * 0.6}deg)`,
            borderRadius: `${Math.round(w * 0.012)}px`,
            boxShadow: '0 26px 60px rgba(0,0,0,0.28)',
          }}
        >
          <img
            src={`${base}/images/social/laptop-${slug}.jpg`}
            width={w}
            height={h}
            style={{
              display: 'flex',
              borderRadius: `${Math.round(w * 0.012)}px`,
              objectFit: 'cover',
            }}
          />
        </div>
      ))}
    </div>
  );
}

/**
 * The laptop and the phone, angled and overlapped — the same pairing the Work
 * rows use on the site, so a card and the page it points at read as one piece
 * of work.
 *
 * The frames are drawn here rather than reused from MacBookFrame/PhoneFrame:
 * those are CSS-and-SVG components for the browser, and satori supports
 * neither the pseudo-elements nor the gradients they are built from.
 */
function DevicePair({
  brand,
  base,
  width,
}: {
  brand: CardBrand;
  base: string;
  /** Width of the laptop capture in card pixels. Everything scales off it. */
  width: number;
}) {
  const laptopH = Math.round(width * 0.625);

  /* The phone sits to the LEFT of the laptop and mostly off it, with their
     bottom edges landing together. An earlier pass had it centred on the
     laptop screen, which reads as a mistake rather than a composition — it
     covered the one thing the card is there to show. */
  const phoneW = Math.round(width * 0.2);
  const phoneH = Math.round(phoneW * 1.962);
  const phoneTop = laptopH - phoneH;

  /* Rotation adds height the flex box does not know about, so the container
     carries the slack explicitly. Without it the claim line underneath gets
     pushed off the bottom of the card. */
  const boxH = Math.round(laptopH * 1.14);
  const boxW = Math.round(width * 1.18);

  /* No added bezel: these captures are macOS Safari windows and already carry
     their own chrome. A frame around a frame is the tell. */
  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        width: `${boxW}px`,
        height: `${boxH}px`,
      }}
    >
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: `${Math.round(laptopH * 0.06)}px`,
          right: 0,
          transform: 'rotate(-4deg)',
          borderRadius: `${Math.round(width * 0.012)}px`,
          boxShadow: '0 36px 80px rgba(0,0,0,0.45)',
        }}
      >
        <img
          src={`${base}/images/social/laptop-${brand.slug}.jpg`}
          width={width}
          height={laptopH}
          style={{
            display: 'flex',
            borderRadius: `${Math.round(width * 0.012)}px`,
            objectFit: 'cover',
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          position: 'absolute',
          left: 0,
          top: `${phoneTop}px`,
          transform: 'rotate(3deg)',
          borderRadius: `${Math.round(phoneW * 0.11)}px`,
          boxShadow: '0 26px 56px rgba(0,0,0,0.55)',
        }}
      >
        <img
          src={`${base}/images/social/phone-${brand.slug}.jpg`}
          width={phoneW}
          height={phoneH}
          style={{
            display: 'flex',
            borderRadius: `${Math.round(phoneW * 0.11)}px`,
            objectFit: 'cover',
          }}
        />
      </div>
    </div>
  );
}

/** The wordmark, taking the brand's accent for its middle word. */
function Wordmark({ brand, size }: { brand: CardBrand; size: number }) {
  return (
    <div
      style={{
        display: 'flex',
        fontFamily: 'Inter',
        fontSize: `${size}px`,
        fontWeight: 600,
        letterSpacing: '-0.02em',
        color: brand.ink,
      }}
    >
      stray<span style={{ color: brand.accent }}>web</span>design
    </div>
  );
}

type Layout = 'wide' | 'square' | 'portrait';

/**
 * One card. `wide` puts the type and the devices side by side; `square` and
 * `portrait` stack them, because a two-column split at 1:1 leaves the name too
 * small to read in a feed.
 */
export function SocialCard({
  brand,
  base,
  width,
  height,
  layout,
}: {
  brand: CardBrand;
  base: string;
  width: number;
  height: number;
  layout: Layout;
}) {
  const s = width / 1200;
  const pad = Math.round(72 * s);
  const stacked = layout !== 'wide';

  /* The name sets the card, and a two-line name has to fit beside a device
     pair that is itself sized off the card width. These four numbers were
     pulled down twice: the first pass pushed the claim and the wordmark clean
     off the bottom of Andy's and Presque Isle, which both run to two lines. */
  const nameLines = brand.name.length;
  const nameSize = Math.round((stacked ? (nameLines > 1 ? 94 : 112) : nameLines > 1 ? 76 : 92) * s);
  const lineSize = Math.round(27 * s);
  const claimSize = Math.round((stacked ? 38 : 32) * s);
  const footSize = Math.round(23 * s);

  /* StoryBrand, on Tom's instruction: the owner is the hero and Stray is the
     guide. "Engaging sites for strong brands" put the service in the subject
     of the sentence and left the owner out of it entirely.

     This is his own line from the dictation — "it shows how much you care
     before anyone walks in and sees you or the place" — with the owner as the
     subject. Everything above the rule belongs to the client: their name in
     their typeface, their colours, their site. The guide signs it below the
     rule and says nothing about itself. */
  const claim = 'Your customers see how much you care before they walk in.';

  /* The device box is 1.18x the laptop width, so a 0.42 share came to more
     than half the card and pushed the laptop off the right edge of the 16:9
     cover. Devices are fixed and the type column takes what is left.

     Stacked, the share follows the card's own proportion instead of being one
     number for both sizes. 0.62 is right at 1:1 and left the 4:5 portrait with
     a dead band above the wordmark — a quarter more height, same devices. The
     cap is the inner width divided by that 1.18, so the box can never run past
     the padding whatever the ratio asks for. */
  const innerW = width - 2 * pad;
  const deviceWidth = stacked
    ? Math.round(Math.min(width * 0.62 * (height / width), innerW / 1.18))
    : Math.round(width * 0.34);

  const type = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        ...(stacked ? {} : { flex: 1, minWidth: 0 }),
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontFamily: brand.face,
          fontWeight: brand.faceWeight,
          fontSize: `${nameSize}px`,
          lineHeight: 1.0,
          letterSpacing: brand.faceTracking,
          color: brand.ink,
        }}
      >
        {brand.name.map((part) => (
          <span key={part}>{part}</span>
        ))}
      </div>

      {/* One rule in their accent. The only ornament on the card. */}
      <div
        style={{
          display: 'flex',
          width: `${Math.round(92 * s)}px`,
          height: `${Math.max(3, Math.round(5 * s))}px`,
          backgroundColor: brand.accent,
          marginTop: `${Math.round(26 * s)}px`,
          marginBottom: `${Math.round(22 * s)}px`,
        }}
      />

      <div
        style={{
          display: 'flex',
          fontFamily: 'Inter',
          fontSize: `${lineSize}px`,
          fontWeight: 600,
          color: brand.ink,
          opacity: 0.72,
          /* The four clients' lines fit the wide column on one line, so
             capping it there would break what already works. Stray's is the
             long one — uncapped it set "four live sites, built and run by one"
             and dropped "person" alone underneath. */
          ...(stacked
            ? { maxWidth: `${Math.round(900 * s)}px` }
            : brand.slug === 'stray'
              ? { maxWidth: `${Math.round(380 * s)}px` }
              : {}),
          lineHeight: 1.3,
        }}
      >
        {brand.line}
      </div>
    </div>
  );

  /* The four clients get their own laptop and phone; the site itself gets all
     four laptops, because "one of my clients" is not what straywebdesign.co
     is offering. Same footprint either way. */
  const devices = (
    <div style={{ display: 'flex', flexShrink: 0 }}>
      {brand.slug === 'stray' ? (
        <LaptopFan base={base} boxWidth={Math.round(deviceWidth * 1.18)} />
      ) : (
        <DevicePair brand={brand} base={base} width={deviceWidth} />
      )}
    </div>
  );

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: brand.ground,
        padding: `${pad}px`,
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: stacked ? 'column' : 'row',
          alignItems: stacked ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          gap: `${Math.round((stacked ? 56 : 48) * s)}px`,
          width: '100%',
          /* Grows either way. Sized to its content, a stacked card let the
             outer space-between drop all the slack into one gap directly
             above the wordmark, which read as a hole rather than as air. */
          flex: 1,
        }}
      >
        {type}
        {devices}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <div
          style={{
            display: 'flex',
            fontFamily: 'Inter',
            fontSize: `${claimSize}px`,
            fontWeight: 600,
            letterSpacing: '-0.01em',
            color: brand.ink,
            lineHeight: 1.2,
            /* Stacked, the full 980 fits all but the last two words and
               drops "walk in." onto a line of its own. 740 breaks it roughly
               in half instead. The wide card sets the whole claim on one line
               at 32px and keeps the room. */
            maxWidth: `${Math.round((stacked ? 740 : 980) * s)}px`,
            marginBottom: `${Math.round(28 * s)}px`,
          }}
        >
          {claim}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingTop: `${Math.round(22 * s)}px`,
            borderTop: `1px solid ${brand.accent}`,
          }}
        >
          <Wordmark brand={brand} size={Math.round(34 * s)} />
          <div
            style={{
              display: 'flex',
              fontFamily: 'Inter',
              fontSize: `${footSize}px`,
              fontWeight: 600,
              color: brand.ink,
              opacity: 0.6,
            }}
          >
            {brand.domain}
          </div>
        </div>
      </div>
    </div>
  );
}
