import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Stray Web Design — Enterprise-Grade Websites for Erie, PA';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
          padding: '60px 80px',
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

        {/* Brand name */}
        <div
          style={{
            display: 'flex',
            fontSize: '80px',
            fontWeight: 800,
            letterSpacing: '-3px',
            marginBottom: '28px',
          }}
        >
          <span style={{ color: '#0F172A' }}>stray</span>
          <span style={{ color: '#3B82F6' }}>web</span>
          <span style={{ color: '#0F172A' }}>design</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '28px',
            fontWeight: 500,
            color: '#475569',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          Websites That Outperform Your Competitors
        </div>

        {/* Location */}
        <div
          style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#3B82F6',
            letterSpacing: '6px',
            textTransform: 'uppercase',
          }}
        >
          Erie, PA
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            gap: '8px',
          }}
        >
          <div style={{ width: '40px', height: '4px', backgroundColor: '#3B82F6', borderRadius: '2px' }} />
          <div style={{ width: '40px', height: '4px', backgroundColor: '#3B82F6', borderRadius: '2px', opacity: 0.5 }} />
          <div style={{ width: '40px', height: '4px', backgroundColor: '#3B82F6', borderRadius: '2px', opacity: 0.25 }} />
        </div>
      </div>
    ),
    { ...size },
  );
}
