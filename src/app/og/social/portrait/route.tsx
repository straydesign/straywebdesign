import { ImageResponse } from 'next/og';
import { loadOgFonts } from '@/lib/og-fonts';

export const runtime = 'edge';

// 1080x1350 — Instagram / Yelp feed post (4:5)
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
          padding: '96px 80px',
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
            fontSize: '20px',
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
            fontSize: '96px',
            fontWeight: 800,
            letterSpacing: '-4px',
            lineHeight: 1.0,
            color: '#FFFFFF',
            marginBottom: '56px',
          }}
        >
          <span>Tell me</span>
          <span>about your</span>
          <span>business.</span>
          <span style={{ marginTop: '28px', fontSize: '64px', fontWeight: 700, letterSpacing: '-2px' }}>
            I&apos;ll sketch
          </span>
          <span
            style={{
              fontSize: '64px',
              fontWeight: 700,
              letterSpacing: '-2px',
              background: 'linear-gradient(to right, #60A5FA, #3B82F6)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            what the site should do.
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: '28px',
            fontWeight: 500,
            color: '#A1A1AA',
            lineHeight: 1.4,
            maxWidth: '900px',
          }}
        >
          A written plan for the site. Back in 24 hours. No pitch, no pressure.
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            marginTop: 'auto',
          }}
        >
          <div style={{ display: 'flex', gap: '12px' }}>
            {['3-Day Turnaround', '$0 Up Front'].map((chip) => (
              <div
                key={chip}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 20px',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#E4E4E7',
                  border: '1px solid #27272A',
                  backgroundColor: '#111113',
                }}
              >
                {chip}
              </div>
            ))}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '24px',
              borderTop: '1px solid #27272A',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: '36px',
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
                fontSize: '18px',
                fontWeight: 600,
                color: '#71717A',
                letterSpacing: '2px',
              }}
            >
              straywebdesign.co
            </div>
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
    { width: 1080, height: 1350, fonts },
  );
}
