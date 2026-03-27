import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Stray Web Design — Enterprise-Grade Websites for Erie, PA';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const SERVICES = [
  { icon: '⚡', label: 'Enterprise Speed' },
  { icon: '♿', label: 'Accessibility' },
  { icon: '🧠', label: 'AI-Ready' },
  { icon: '📱', label: 'Mobile-First' },
  { icon: '💬', label: 'AI Receptionist' },
];

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
          padding: '40px 60px',
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
            fontSize: '72px',
            fontWeight: 800,
            letterSpacing: '-3px',
            marginBottom: '16px',
          }}
        >
          <span style={{ color: '#3B82F6' }}>stray web design</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '26px',
            fontWeight: 500,
            color: '#475569',
            marginBottom: '12px',
            textAlign: 'center',
          }}
        >
          Websites That Actually Perform
        </div>

        {/* Location */}
        <div
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#3B82F6',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            marginBottom: '36px',
          }}
        >
          Erie, PA
        </div>

        {/* Services row */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {SERVICES.map((service) => (
            <div
              key={service.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '18px',
                  backgroundColor: '#DBEAFE',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                }}
              >
                {service.icon}
              </div>
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#0F172A',
                  textAlign: 'center',
                }}
              >
                {service.label}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
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
