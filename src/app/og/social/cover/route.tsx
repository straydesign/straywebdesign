import { ImageResponse } from 'next/og';
import { loadOgFonts } from '@/lib/og-fonts';

export const runtime = 'edge';

// 2048x1152 — Yelp cover photo, GBP cover photo (16:9)
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
          padding: '120px 140px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '10px',
            background: 'linear-gradient(to right, #3B82F6, #60A5FA, #3B82F6)',
          }}
        />

        <div
          style={{
            display: 'flex',
            fontSize: '26px',
            fontWeight: 700,
            color: '#60A5FA',
            letterSpacing: '10px',
            textTransform: 'uppercase',
            marginBottom: '48px',
          }}
        >
          Custom Websites · straywebdesign.co
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: '132px',
            fontWeight: 800,
            letterSpacing: '-5px',
            lineHeight: 1.0,
            color: '#FFFFFF',
            marginBottom: '56px',
          }}
        >
          <span>Tell me about your business.</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
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
            fontSize: '38px',
            fontWeight: 500,
            color: '#A1A1AA',
            lineHeight: 1.35,
            maxWidth: '1500px',
          }}
        >
          A written plan — customer, offer, the one action the site needs to drive. Back in 24 hours. No pitch, no pressure.
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
              fontSize: '48px',
              fontWeight: 800,
              letterSpacing: '-1px',
              color: '#FFFFFF',
            }}
          >
            stray<span style={{ color: '#3B82F6' }}>web</span>design
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            {['3-Day Turnaround', '$0 Up Front', 'Direct Line to Tom'].map((chip) => (
              <div
                key={chip}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '14px 24px',
                  fontSize: '20px',
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
    { width: 2048, height: 1152, fonts },
  );
}
