export const COLORS = {
  navy: '#18181b',
  electric: '#2563EB',
  warmWhite: '#f4f4f5',
  accent: '#2563EB',
  darkNavy: '#18181b',
  lightGray: '#f4f4f5',
  mediumGray: '#a1a1aa',
  electricLight: '#60A5FA',
  electricDark: '#2563EB',
  surfacePage: '#f4f4f5',
  surfaceCard: '#ffffff',
  surfaceSunken: '#e4e4e7',
  textPrimary: '#18181b',
  textSecondary: '#52525b',
  textTertiary: '#71717a',
  borderDefault: '#e4e4e7',
  borderStrong: '#d4d4d8',
} as const;

export const SITE = {
  name: 'Stray Web Design',
  url: 'https://straywebdesign.co',
  email: 'tom@straydesign.co',
  phone: '814-402-8525',
  tagline: 'Websites That Outperform Your Market',
  web3formsKey: 'c2441e47-8ca0-4f87-a2dc-928015553d51',
} as const;

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Website Design', href: '/services/website-design' },
      { label: 'AI Receptionist', href: '/services/ai-receptionist' },
      { label: 'SEO Optimization', href: '/services/seo-optimization' },
      { label: 'Website Management', href: '/services/website-management' },
      { label: 'Landing Pages', href: '/services/landing-pages' },
      { label: 'Analytics Setup', href: '/services/analytics-setup' },
    ],
  },
  {
    label: 'Industries',
    href: '/industries',
    children: [
      { label: 'Dental Practices', href: '/industries/dental' },
      { label: 'Financial Advisors', href: '/industries/financial-advisors' },
      { label: 'Car Dealerships', href: '/industries/car-dealerships' },
      { label: 'IT Services', href: '/industries/it-services' },
      { label: 'Law Firms', href: '/industries/law-firms' },
      { label: 'Restaurants', href: '/industries/restaurants' },
      { label: 'Real Estate', href: '/industries/real-estate' },
      { label: 'HVAC', href: '/industries/hvac' },
      { label: 'View All Industries', href: '/industries' },
    ],
  },
  { label: 'Work', href: '/work' },
  { label: 'Resources', href: '/resources' },
] as const;

export const BOOKING_TIMING_OPTIONS = [
  'This week',
  'Next week',
  'Within 2 weeks',
  'Flexible',
] as const;

export const FOUNDATION_SERVICES = [
  {
    title: 'Enterprise-Grade Performance',
    description:
      'Sub-1-second loads, WCAG AA, mobile-first — Fortune 500 specs at small-business pricing.',
    features: [
      'Sub-1s LCP & global CDN delivery',
      'WCAG AA compliant & keyboard navigable',
      'Mobile-first, touch-optimized layouts',
      'Core Web Vitals passing all metrics',
      'Semantic HTML for SEO & screen readers',
    ],
    process: [
      { step: 1, title: 'Site Audit', description: 'Lighthouse your site + top competitors.' },
      { step: 2, title: 'Custom Build', description: 'Hand-coded, zero plugins.' },
      { step: 3, title: 'Edge Deploy', description: 'Ships to 300+ CDN locations.' },
      { step: 4, title: 'Ongoing Monitoring', description: 'Monthly performance reports.' },
    ],
  },
  {
    title: 'AI & Search Optimized',
    description:
      'Structured data that gets you cited by ChatGPT, Perplexity, and Google AI Overview.',
    features: [
      'JSON-LD structured data for rich results',
      'llms.txt for AI crawler discoverability',
      'FAQ schema for AI-generated answers',
      'GEO (Generative Engine Optimization)',
      'Full meta, Open Graph & canonical setup',
    ],
    process: [
      { step: 1, title: 'Content Audit', description: 'Map gaps AI and search penalize.' },
      { step: 2, title: 'Schema Markup', description: 'JSON-LD, FAQ, LocalBusiness data.' },
      { step: 3, title: 'AI Optimization', description: 'llms.txt + citation-ready content.' },
      { step: 4, title: 'Track & Iterate', description: 'Monthly citation + ranking reports.' },
    ],
  },
] as const;

export const ADDON_SERVICES = [
  {
    title: 'AI Receptionist',
    description: '24/7 call answering. Qualifies leads and books appointments while you sleep.',
    features: [
      '24/7 call answering & voicemail',
      'Missed call text-back',
      'Lead qualification & routing',
      'Natural, on-brand conversations',
    ],
    process: [
      { step: 1, title: 'Discovery', description: 'Services, tone, FAQs, booking rules.' },
      { step: 2, title: 'AI Training', description: 'Trained on your business.' },
      { step: 3, title: 'Integration', description: 'Phone, calendar, CRM.' },
      { step: 4, title: 'Go Live', description: '24/7 with continuous learning.' },
    ],
  },
  {
    title: 'Multi-Channel AI Agents',
    description: 'One AI brain across phone, SMS, and web chat. Same answers everywhere.',
    features: [
      'Phone + SMS + web chat coverage',
      'Consistent responses across channels',
      'After-hours & weekend coverage',
      'Seamless handoff to your team',
    ],
    process: [
      { step: 1, title: 'Knowledge Base', description: 'Unified brain from your FAQs.' },
      { step: 2, title: 'Channel Setup', description: 'Phone, SMS, web chat.' },
      { step: 3, title: 'Testing', description: 'Simulate real conversations.' },
      { step: 4, title: 'Launch', description: 'Consistent AI with team handoff.' },
    ],
  },
  {
    title: 'Smart Scheduling & CRM',
    description: 'Auto-booking that syncs with your calendar and pushes leads into your CRM.',
    features: [
      'Google Calendar & Outlook sync',
      'Auto-update Salesforce / HubSpot / GHL',
      'Confirmation & reminder sequences',
      'No-show follow-up automation',
    ],
    process: [
      { step: 1, title: 'Calendar Sync', description: 'Google, Outlook, or existing system.' },
      { step: 2, title: 'CRM Integration', description: 'Salesforce, HubSpot, GoHighLevel.' },
      { step: 3, title: 'Workflow Design', description: 'Confirmations, reminders, follow-ups.' },
      { step: 4, title: 'Activate', description: 'Zero double-bookings from day one.' },
    ],
  },
  {
    title: 'Analytics & Personalization',
    description: 'Know who visits and what converts them. Data turns traffic into revenue.',
    features: [
      'Visitor tracking & session replay',
      'Smart content personalization',
      'Conversion prediction & heatmaps',
      'Monthly performance reports',
    ],
    process: [
      { step: 1, title: 'Tracking Setup', description: 'Heatmaps, session replay.' },
      { step: 2, title: 'Funnel Mapping', description: 'Identify drop-off points.' },
      { step: 3, title: 'Personalization', description: 'Dynamic content by behavior.' },
      { step: 4, title: 'Monthly Reports', description: 'Insights delivered monthly.' },
    ],
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: 'Why not just use WordPress?',
    answer: 'Plugins, slow loads, security holes. My sites ship as static files — sub-1-second loads, no attack surface.',
  },
  {
    question: 'How long does it take?',
    answer: 'Most ship in three days. Day one: discovery + design. Day two: build. Day three: polish + launch.',
  },
  {
    question: 'Do I have to pay up front?',
    answer: '$0 up front. I build it, you preview it live, we iterate until you love it. You only pay once it’s live.',
  },
  {
    question: 'How much does it cost?',
    answer: 'Essential: $1,500+ one-time, $100/mo. Complete: $5,000+, $200/mo. Flat-rate. Tell me about the business and I’ll quote in 24 hours.',
  },
] as const;

export const CLIENT_PROFILES = [
  {
    industry: 'Dental Practices',
    challenge: 'Patients judge you before walking in.',
    outcome: 'Beats corporate dental on speed and mobile booking.',
  },
  {
    industry: 'Financial Advisors',
    challenge: 'Referrals Google you before they call.',
    outcome: 'A presence that matches the precision of the work.',
  },
  {
    industry: 'Car Dealerships',
    challenge: 'Buyers research online before they hit the lot.',
    outcome: 'Fastest, cleanest site in the market captures the lead.',
  },
  {
    industry: 'IT Services & MSPs',
    challenge: 'You sell technical competence. Your site scores 35.',
    outcome: 'Sub-1-second loads prove the work before you say a word.',
  },
  {
    industry: 'Law Firms',
    challenge: 'Midnight phone searches. Five-second loads lose the lead.',
    outcome: 'Instant load when someone needs help right now.',
  },
  {
    industry: 'Vision Care',
    challenge: 'Patients expect the polish of the brands they shop.',
    outcome: 'A fast, modern site that matches.',
  },
] as const;

export const SPRING_CONFIG = {
  gentle: { stiffness: 120, damping: 14 },
  snappy: { stiffness: 300, damping: 30 },
  bouncy: { stiffness: 400, damping: 25 },
} as const;

export const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
