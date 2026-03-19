import { ImageResponse } from 'next/og';

const size = { width: 1200, height: 630 };

const typeLabels: Record<string, string> = {
  blog: 'Blog',
  'white-paper': 'White Paper',
  'case-study': 'Case Study',
};

const tagColors: Record<string, string> = {
  Dental: '#10B981',
  Finance: '#F59E0B',
  Automotive: '#EF4444',
  'IT Services': '#3B82F6',
  Legal: '#6366F1',
  Healthcare: '#14B8A6',
  'Vision Care': '#06B6D4',
  Landscaping: '#22C55E',
  Orthopedics: '#F97316',
  'AI & Search': '#3B82F6',
  Performance: '#3B82F6',
  Accessibility: '#3B82F6',
  'Web Design': '#3B82F6',
  Conversion: '#F59E0B',
  Mobile: '#3B82F6',
  'Local SEO': '#10B981',
  'AI & SEO': '#6366F1',
  Development: '#14B8A6',
  'Technical SEO': '#06B6D4',
  Migration: '#F97316',
  Services: '#3B82F6',
  Analytics: '#3B82F6',
  Advertising: '#EF4444',
  Reliability: '#10B981',
  AI: '#6366F1',
};

export function createResourceOGImage(resource: {
  title: string;
  type: string;
  tag: string;
  readTime: string;
}) {
  const typeLabel = typeLabels[resource.type] || 'Article';
  const tagColor = tagColors[resource.tag] || '#3B82F6';

  // Truncate title if too long
  const title =
    resource.title.length > 80
      ? resource.title.slice(0, 77) + '...'
      : resource.title;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
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

        {/* Top row: type label + tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              fontSize: '14px',
              fontWeight: 700,
              color: '#3B82F6',
              letterSpacing: '4px',
              textTransform: 'uppercase',
            }}
          >
            {typeLabel}
          </div>
          <div
            style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: '#CBD5E1',
            }}
          />
          <div
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: tagColor,
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            {resource.tag}
          </div>
          <div
            style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: '#CBD5E1',
            }}
          />
          <div
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: '#94A3B8',
            }}
          >
            {resource.readTime}
          </div>
        </div>

        {/* Article title */}
        <div
          style={{
            fontSize: title.length > 60 ? '40px' : '48px',
            fontWeight: 800,
            color: '#0F172A',
            lineHeight: 1.2,
            letterSpacing: '-1px',
            flex: 1,
            display: 'flex',
            alignItems: 'flex-start',
            maxWidth: '1000px',
          }}
        >
          {title}
        </div>

        {/* Bottom: brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: '32px',
              fontWeight: 800,
              letterSpacing: '-1px',
            }}
          >
            <span style={{ color: '#0F172A' }}>stray</span>
            <span style={{ color: '#3B82F6' }}>web</span>
            <span style={{ color: '#0F172A' }}>design</span>
          </div>
          <div
            style={{
              fontSize: '16px',
              fontWeight: 500,
              color: '#94A3B8',
            }}
          >
            straywebdesign.co
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

