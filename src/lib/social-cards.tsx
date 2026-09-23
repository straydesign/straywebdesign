/* social-cards.tsx — one card template, four worlds.

   Every card is a real client: their own ground colour, their own display
   typeface, and the real laptop and phone captures of the site I built them.
   A card that could be re-skinned for anybody is a card that proves nothing,
   which is the whole problem with a template — so the thing that changes
   between cards is the part a template cannot fake.

   Colours and typefaces are lifted from src/data/clients.ts, which pulls them
   from each project's own theme code. Nothing here is invented.

   The captures live in public/images/social/, never the WebP in
   public/images/devices/: satori decodes PNG and JPEG, and hands back a blank
   box for WebP without erroring. The per-brand laptop and phone shots are JPEG
   because they sit inside a coloured panel and never need an edge; the
   macbook-*.png fan frames are PNG because they are cut out — see HeroFan.
   Regenerate them with scripts/social-shots.sh. */

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
 * The site's own palette — the three values StrayHeroCard paints with, taken
 * off globals.css so the preview and the page cannot drift apart.
 *
 * This used to be a full CardBrand called STRAY_BRAND, fed through SocialCard
 * alongside the four clients. It carried a name, a line, a domain and a
 * typeface, and none of those survive on a card that is simply the hero.
 */
export const STRAY_PALETTE = {
  ground: '#f7f7f7',
  accent: '#2563EB',
  ink: '#111111',
} as const;

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

/**
 * Bind the last two words so a wrapped line cannot strand one of them.
 *
 * Andy's line — "menus and daily specials, edited by the team" — set "team"
 * alone on its own line at 2048 wide. A widow like that is the difference
 * between a card that looks typeset and one that looks generated, and it is
 * the only word on the card with nothing beside it.
 *
 * A non-breaking space is the fix rather than a maxWidth: it does nothing at
 * all to the lines that already fit, so it cannot break the three cards that
 * were right.
 */
function noOrphan(text: string): string {
  const i = text.lastIndexOf(' ');
  return i === -1 ? text : `${text.slice(0, i)}\u00A0${text.slice(i + 1)}`;
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
  /* Two cards, two jobs.
   *
   * A CLIENT card is that client's brand above the rule and Stray's signature
   * below it, so the claim is free to talk to whoever is looking — the
   * StoryBrand move Tom asked for: they are the hero, I am the guide.
   *
   * The SITE'S OWN card is Stray introducing itself, and there that line
   * addresses nobody and never says what the business does. Tom, looking at
   * it: "it needs to just say like web design for strong brands with
   * passionate owners." His words, so his words are what it says. */
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
        {noOrphan(brand.line)}
      </div>
    </div>
  );

  /* SocialCard is now the CLIENT card and only that — the site's own preview
     is StrayHeroCard at the bottom of this file. The `slug === 'stray'` fork
     that used to live here went with it; a dead branch still drawing the
     retired design is how the retired design comes back. */
  const devices = (
    <div style={{ display: 'flex', flexShrink: 0 }}>
      <DevicePair brand={brand} base={base} width={deviceWidth} />
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

/* ══════════════════════════════════════════════════════════════════════════
   THE SITE'S OWN CARD IS THE HERO
   ══════════════════════════════════════════════════════════════════════════

   Tom, 2026-09-22, holding up a screenshot of the top of the page: "should
   basically be this."

   So this one does not use SocialCard. That template is built for a CLIENT
   card — their name, their face, their colours above the rule, Stray signing
   below it — and bending it into a second shape would have cost both. The
   file already said it: two cards, two jobs.

   What the link preview has to do is show the page it points at. Someone
   pastes straywebdesign.co into a text; the unfurl should be the first screen
   they are about to see, so arriving is a continuation rather than a
   different design wearing the same domain.

   THE WRAP IS WRITTEN OUT, NOT MEASURED. The page balances this headline with
   `text-balance` and lands on "Engaging sites for strong / brands with
   passionate owners." Satori has no text-balance and no way to colour half a
   word run mid-wrap reliably, so each line is its own flex row of coloured
   spans. That fixes the break at the same place the browser puts it and makes
   the accent start exactly on "strong", which is where the page starts it.

   NO DOMAIN LINE. Every platform that unfurls a link prints the domain under
   the image itself, so putting it on the art too says it twice and steals the
   room the laptops need. */

const INSTRUMENT_400 =
  'https://cdn.jsdelivr.net/fontsource/fonts/instrument-serif@latest/latin-400-normal.ttf';

let cachedInstrument: ArrayBuffer | null = null;

export async function loadHeroFonts() {
  if (!cachedInstrument) {
    cachedInstrument = await (await fetch(INSTRUMENT_400)).arrayBuffer();
  }
  return [
    {
      name: 'Instrument Serif',
      data: cachedInstrument,
      weight: 400 as const,
      style: 'normal' as const,
    },
  ];
}

/**
 * The four live sites, fanned — the flat cousin of SiteStack.
 *
 * On the page the fan is real 3D: one `preserve-3d` stage, each card on its
 * own translateZ, the whole thing turning under the pointer. Satori has
 * neither perspective nor preserve-3d, so the depth is drawn instead of
 * projected — each card forward is a little WIDER, a little lower, and a
 * little more shadowed, which is what perspective was doing to them anyway.
 *
 * Front card last in source order. Satori paints in document order and has no
 * z-index, so the near card has to be written last or the back of the fan
 * covers the front of it.
 */
function HeroFan({ base, width, height }: { base: string; width: number; height: number }) {
  /* Back to front, so the last one drawn is the one nearest the viewer — the
     same order PROOF is in on the page. */
  const SLUGS = ['andys', 'bullfrog', 'seacave', 'presqueisle'];

  const frontW = Math.round(width * 0.52);
  const stepX = Math.round(frontW * 0.16);
  const spread = stepX * (SLUGS.length - 1);
  const startX = Math.round((width - (spread + frontW)) / 2);
  /* ONE FLOOR, NOT FOUR SHELVES. Every card's deck sits on this line.
     The first pass stepped each card DOWN as it came forward, borrowing the
     page's `top: i*4.5%`. The page has real perspective doing that work; flat
     on a card the step just hangs four laptops at four heights, and each
     one's silver deck then ends up in open ground with the lid it belongs to
     hidden behind the next card — so it reads as a loose white lozenge rather
     than as the base of a laptop. Bottom-aligned, the four decks land on one
     surface and scale alone carries the depth. */
  const baseline = height - Math.round(height * 0.025);

  return (
    <div style={{ display: 'flex', position: 'relative', width: `${width}px`, height: `${height}px` }}>
      {SLUGS.map((slug, i) => {
        /* 80% at the back to full size at the front. The page gets this same
           ramp for free from the perspective divide. */
        const scale = 0.8 + (i / (SLUGS.length - 1)) * 0.2;
        const w = Math.round(frontW * scale);
        /* The frame captures are 1014x618 — the MacBook's whole outline, lid
           plus base deck, not the 16:10 screen alone. */
        const h = Math.round(w * 0.6095);
        return (
          <div
            key={slug}
            style={{
              display: 'flex',
              position: 'absolute',
              left: `${startX + i * stepX}px`,
              top: `${baseline - h}px`,
              filter: `drop-shadow(0 ${10 + i * 9}px ${22 + i * 14}px rgba(0,0,0,${0.13 + i * 0.045}))`,
            }}
          >
            {/* PNG, AND IT HAS TO BE — THIS IS WHAT THE CARD GOT WRONG FIRST.
                `drop-shadow` shadows the ALPHA SILHOUETTE. Fed an opaque JPEG
                it has no silhouette to follow, so it shadowed the RECTANGLE:
                every card sat in a faintly lit box with a hard shadow edge,
                and four of those overlapping read as white slabs stacked
                behind the front laptop instead of as four laptops. The
                captures are cut out now — page ground transparent, and the
                frame's own contact shadow hidden in the capture so this
                filter is the only shadow in the picture. Satori takes PNG and
                JPEG and no WebP. */}
            <img
              src={`${base}/images/social/macbook-${slug}.png`}
              width={w}
              height={h}
              style={{ display: 'flex', objectFit: 'contain' }}
            />
          </div>
        );
      })}
    </div>
  );
}

/** The link preview: the top of the page, at the size a message unfurls it. */
export function StrayHeroCard({
  base,
  width,
  height,
}: {
  base: string;
  width: number;
  height: number;
}) {
  const s = width / 1200;
  const pad = Math.round(56 * s);
  const headSize = Math.round(64 * s);

  const INK = STRAY_PALETTE.ink;
  const ACCENT = STRAY_PALETTE.accent;

  const line = (parts: { text: string; color: string }[]) => (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {parts.map((p) => (
        <span
          key={p.text}
          style={{ color: p.color, whiteSpace: 'pre', textShadow: `0 0 1px ${p.color}` }}
        >
          {p.text}
        </span>
      ))}
    </div>
  );

  const headBlock = Math.round(headSize * 1.06 * 2);
  const fanTop = pad + headBlock + Math.round(30 * s);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: STRAY_PALETTE.ground,
        padding: `${pad}px`,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'Instrument Serif',
          fontWeight: 400,
          fontSize: `${headSize}px`,
          lineHeight: 1.06,
          letterSpacing: '-0.02em',
        }}
      >
        {line([
          { text: 'Engaging sites for ', color: INK },
          { text: 'strong', color: ACCENT },
        ])}
        {line([
          { text: 'brands with passionate owners', color: ACCENT },
          { text: '.', color: INK },
        ])}
      </div>

      <div style={{ display: 'flex', position: 'absolute', left: '0px', top: `${fanTop}px` }}>
        <HeroFan base={base} width={width} height={height - fanTop} />
      </div>
    </div>
  );
}
