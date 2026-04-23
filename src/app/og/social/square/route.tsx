import { ImageResponse } from 'next/og';
import { loadOgFonts } from '@/lib/og-fonts';

export const runtime = 'edge';

// 1200x1200 — Google Business Profile post, Yelp profile post, Instagram square
export async function GET() {
  const fonts = await loadOgFonts();
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0A0A0A',
          padding: '88px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '8px',
            background: 'linear-gradient(to right, #3B82F6, #60A5FA, #3B82F6)',
          }}
        />

        <div
          style={{
            display: 'flex',
            fontSize: '22px',
            fontWeight: 700,
            color: '#60A5FA',
            letterSpacing: '8px',
            textTransform: 'uppercase',
            marginBottom: '48px',
          }}
        >
          Custom Websites
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: '104px',
            fontWeight: 800,
            letterSpacing: '-4px',
            lineHeight: 1.0,
            color: '#FFFFFF',
            marginBottom: '48px',
          }}
        >
          <span>Tell me about</span>
          <span>your business.</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '24px', fontSize: '72px', fontWeight: 700, letterSpacing: '-2px' }}>
            <span>I&apos;ll sketch</span>
            <span
              style={{
                background: 'linear-gradient(to right, #60A5FA, #3B82F6)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              what the site should do.
            </span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: '30px',
            fontWeight: 500,
            color: '#A1A1AA',
            lineHeight: 1.35,
            maxWidth: '900px',
          }}
        >
          A written plan. Back in 24 hours. No pitch, no pressure.
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 'auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: '40px',
              fontWeight: 800,
              letterSpacing: '-1px',
              color: '#FFFFFF',
            }}
          >
            stray<span style={{ color: '#3B82F6' }}>web</span>design
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '22px',
              fontWeight: 600,
              color: '#71717A',
              letterSpacing: '2px',
            }}
          >
            straywebdesign.co
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(to right, #3B82F6, transparent)',
          }}
        />
      </div>
    ),
    { width: 1200, height: 1200, fonts },
  );
}
