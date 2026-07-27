import { ImageResponse } from 'next/og';
import { loadOgFonts } from '@/lib/og-fonts';

export const runtime = 'edge';
export const alt = "Stray Web Design — Tell me about your business. I'll sketch what the site should do.";
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
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
          padding: '80px 72px',
          position: 'relative',
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(to right, #3B82F6, #60A5FA, #3B82F6)',
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            display: 'flex',
            fontSize: '18px',
            fontWeight: 700,
            color: '#60A5FA',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            marginBottom: '32px',
          }}
        >
          Custom Websites · straywebdesign.co
        </div>

        {/* Headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: '76px',
            fontWeight: 800,
            letterSpacing: '-3px',
            lineHeight: 1.05,
            color: '#FFFFFF',
            marginBottom: '28px',
          }}
        >
          <span>Tell me about your business.</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <span>I&apos;ll sketch</span>
            <span style={{ color: '#60A5FA' }}>
              what the site should do.
            </span>
          </div>
        </div>

        {/* Subline */}
        <div
          style={{
            display: 'flex',
            fontSize: '24px',
            fontWeight: 500,
            color: '#A1A1AA',
            lineHeight: 1.4,
            maxWidth: '900px',
            marginBottom: '48px',
          }}
        >
          A written plan — customer, offer, the one action the site needs to drive. Back in 24 hours. No pitch, no pressure.
        </div>

        {/* Bottom row — brand + signal chips */}
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
              fontSize: '28px',
              fontWeight: 800,
              letterSpacing: '-1px',
              color: '#FFFFFF',
            }}
          >
            stray<span style={{ color: '#3B82F6' }}>web</span>design
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            {['Built From Scratch', 'Hosted & Managed', 'Direct Line to Tom'].map((chip) => (
              <div
                key={chip}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 18px',
                  fontSize: '15px',
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

        {/* Bottom accent */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(to right, #3B82F6, transparent)',
          }}
        />
      </div>
    ),
    { ...size, fonts },
  );
}
