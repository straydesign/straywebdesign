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
      'Sub-1-second load times, WCAG AA accessibility, mobile-first layouts, and Core Web Vitals that match Fortune 500 sites — at a fraction of the cost.',
    features: [
      'Sub-1s LCP & global CDN delivery',
      'WCAG AA compliant & keyboard navigable',
      'Mobile-first, touch-optimized layouts',
      'Core Web Vitals passing all metrics',
      'Semantic HTML for SEO & screen readers',
    ],
    process: [
      { step: 1, title: 'Site Audit', description: 'We Lighthouse your current site and your top competitors so you see exactly where you stand.' },
      { step: 2, title: 'Custom Build', description: 'Hand-coded from scratch — zero plugins, zero page builders, optimized at every layer.' },
      { step: 3, title: 'Edge Deploy', description: 'Your site ships to 300+ global CDN locations for sub-1-second loads everywhere.' },
      { step: 4, title: 'Ongoing Monitoring', description: 'Monthly Core Web Vitals tracking and performance reports so scores never slip.' },
    ],
  },
  {
    title: 'AI & Search Optimized',
    description:
      'Structured data that gets you cited by ChatGPT, Perplexity, and Google AI Overview — plus traditional SEO that keeps you ranking in classic search.',
    features: [
      'JSON-LD structured data for rich results',
      'llms.txt for AI crawler discoverability',
      'FAQ schema for AI-generated answers',
      'GEO (Generative Engine Optimization)',
      'Full meta, Open Graph & canonical setup',
    ],
    process: [
      { step: 1, title: 'Content Audit', description: 'Map your existing content and identify gaps AI assistants and search engines penalize.' },
      { step: 2, title: 'Schema Markup', description: 'Add JSON-LD, FAQ, and LocalBusiness structured data so machines can read you.' },
      { step: 3, title: 'AI Optimization', description: 'llms.txt, conversational content structure, and citation-ready formatting for AI answers.' },
      { step: 4, title: 'Track & Iterate', description: 'Monitor AI citations, search rankings, and click-through rates monthly.' },
    ],
  },
] as const;

export const ADDON_SERVICES = [
  {
    title: 'AI Receptionist',
    description:
      'Your phone rings at 9 PM — the AI answers, qualifies the lead, and books the appointment. 24/7 coverage that never calls in sick.',
    features: [
      '24/7 call answering & voicemail',
      'Missed call text-back',
      'Lead qualification & routing',
      'Natural, on-brand conversations',
    ],
    process: [
      { step: 1, title: 'Discovery', description: 'We learn your services, tone, FAQs, and booking rules.' },
      { step: 2, title: 'AI Training', description: 'The receptionist is trained on your specific business knowledge.' },
      { step: 3, title: 'Integration', description: 'Connect to your phone system, calendar, and CRM.' },
      { step: 4, title: 'Go Live', description: '24/7 coverage with continuous learning from real calls.' },
    ],
  },
  {
    title: 'Multi-Channel AI Agents',
    description:
      'One AI brain across phone, SMS, and web chat. Consistent answers everywhere your customers reach out — including after hours.',
    features: [
      'Phone + SMS + web chat coverage',
      'Consistent responses across channels',
      'After-hours & weekend coverage',
      'Seamless handoff to your team',
    ],
    process: [
      { step: 1, title: 'Knowledge Base', description: 'Build a unified brain from your FAQs, services, and policies.' },
      { step: 2, title: 'Channel Setup', description: 'Deploy the same AI across phone, SMS, and web chat.' },
      { step: 3, title: 'Conversation Testing', description: 'Simulate real conversations across every channel.' },
      { step: 4, title: 'Launch', description: 'Consistent AI responses everywhere, with team handoff rules.' },
    ],
  },
  {
    title: 'Smart Scheduling & CRM',
    description:
      'Automated booking that syncs with your calendar and pushes leads straight into your CRM. No double-bookings, no manual entry.',
    features: [
      'Google Calendar & Outlook sync',
      'Auto-update Salesforce / HubSpot / GHL',
      'Confirmation & reminder sequences',
      'No-show follow-up automation',
    ],
    process: [
      { step: 1, title: 'Calendar Sync', description: 'Connect Google Calendar, Outlook, or your existing system.' },
      { step: 2, title: 'CRM Integration', description: 'Wire up Salesforce, HubSpot, or GoHighLevel.' },
      { step: 3, title: 'Workflow Design', description: 'Set confirmation, reminder, and no-show follow-up sequences.' },
      { step: 4, title: 'Activate', description: 'Automated booking with zero double-bookings from day one.' },
    ],
  },
  {
    title: 'Analytics & Personalization',
    description:
      'Know who visits your site, what they care about, and what makes them convert. Data-driven insights that turn traffic into revenue.',
    features: [
      'Visitor tracking & session replay',
      'Smart content personalization',
      'Conversion prediction & heatmaps',
      'Monthly performance reports',
    ],
    process: [
      { step: 1, title: 'Tracking Setup', description: 'Install visitor tracking, heatmaps, and session replay.' },
      { step: 2, title: 'Funnel Mapping', description: 'Define your conversion paths and identify drop-off points.' },
      { step: 3, title: 'Personalization Rules', description: 'Configure dynamic content based on visitor behavior.' },
      { step: 4, title: 'Monthly Reports', description: 'Actionable insights delivered to your inbox every month.' },
    ],
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: 'Why not just use WordPress?',
    answer: 'Because it\'s costing you money you can\'t see. Every slow page load loses a visitor — most mobile users won\'t wait more than a few seconds. WordPress sites tend to be heavy, loading dozens of plugins that each run their own database queries, inject their own scripts, and open their own security holes. The vast majority of WordPress vulnerabilities come from plugins and themes, not WordPress core. Meanwhile, your SEO plugin set-and-forgot your meta tags, your page builder broke your heading hierarchy (screen readers, Google, and AI all penalize this), and AI assistants can\'t recommend you because there\'s no structured data for them to read. Our approach eliminates the entire dependency chain. Custom code, no plugins, no database, no attack surface. Pages ship as static files to a global CDN. Sub-1-second loads, zero security patches, and a $100/month site management fee that covers hosting, technical support, SEO monitoring, content updates, and ad-ready infrastructure.',
  },
  {
    question: 'What is a Lighthouse score and why does it matter?',
    answer: 'Lighthouse is an open-source audit built into Chrome DevTools that scores four categories — Performance, Accessibility, Best Practices, and SEO — each on a 0-100 scale. Why it matters: faster sites consistently convert better. Even small improvements in load time — fractions of a second — translate directly into more leads and revenue. Most local business sites score between 30 and 50 on Performance. Our builds target 95-100 across all four categories — the same range you\'ll find on sites like web.dev and developer.chrome.com.',
  },
  {
    question: 'What does "AI Ready" mean for my website?',
    answer: 'When someone asks ChatGPT, Perplexity, or Google AI Overview for a recommendation, those models pull from structured data across the web. Sites with proper JSON-LD structured data show up in AI-generated responses far more often than sites with unstructured HTML alone. We implement the llms.txt standard — a machine-readable summary of your business that sits alongside robots.txt — so AI crawlers can understand you instantly. We also add FAQ schema so your questions and answers can surface directly in AI responses, and LocalBusiness schema so AI assistants know your name, location, hours, and services without guessing. More and more people are using AI assistants to research purchases. If your business isn\'t structured for AI to read, it simply won\'t appear in those results.',
  },
  {
    question: 'What is GEO (Generative Engine Optimization)?',
    answer: 'GEO is the practice of optimizing your content so generative AI models — like ChatGPT, Google AI Overview, and Perplexity — choose to cite your business when producing answers. Unlike traditional SEO, which optimizes for link-based ranking algorithms, GEO optimizes for how language models select and surface sources. This means structuring content conversationally, providing machine-readable context through schema markup, and making claims verifiable with specific data. A growing majority of Google searches now end without a click — users get their answer from an AI-generated summary right on the results page. The businesses that appear in those answers are the ones whose content is already structured for it.',
  },
  {
    question: 'What can the AI Receptionist do?',
    answer: 'It answers your phone 24/7 with natural, on-brand conversations — qualifying leads, answering common questions, and booking appointments while you sleep. When a potential patient calls your dental office at 9 PM, the AI greets them by name (if they\'re a returning caller), answers questions about services and insurance, and books them into your next available slot. Missed calls get an instant text-back so you never lose a lead to voicemail. The AI handles call routing for multi-location businesses, sends confirmation texts, and pushes every interaction into your CRM. It\'s not a robotic phone tree — it\'s a conversational agent trained on your specific business, services, and tone. For practices where a single new patient is worth $3,000-$5,000, one extra booking per week pays for the service many times over.',
  },
  {
    question: 'How do the AI add-on services work?',
    answer: 'Every add-on connects to your existing tools and workflows — no rip-and-replace required. The Multi-Channel AI Agent uses the same knowledge base across phone, SMS, and web chat, so customers get consistent answers whether they call, text, or message at 2 AM. Smart Scheduling syncs with Google Calendar or Outlook and auto-updates your CRM (Salesforce, HubSpot, GoHighLevel) when appointments are booked, rescheduled, or cancelled. Analytics & Personalization tracks visitor behavior, identifies high-intent prospects, and can dynamically adjust page content based on what a visitor cares about — a returning dental patient sees hygiene scheduling while a new visitor sees your intro offer. All add-ons are billed monthly with no long-term contracts, and we handle setup, training, and ongoing optimization.',
  },
  {
    question: 'How long does a project take?',
    answer: 'Most sites ship in three days. Not three months — three days. We move that fast because there are no plugins to debug, no themes to fight, no third-party code slowing anything down. Every line of code is written for your business specifically. Day one: discovery and design. Day two: build. Day three: content polish, device testing, launch. Larger businesses with complex needs — multi-location setups, custom integrations, extensive content migration — may take slightly longer, but the principle stays the same: get it right early, then iterate continuously. Your site should always reflect where your business is right now, not where it was six months ago.',
  },
  {
    question: 'Do I need to maintain the site myself?',
    answer: 'No. Most hacked CMS sites were running outdated plugins or themes — that\'s the reality of maintaining a database-driven site. Our sites sidestep that entirely. They\'re pre-rendered as static HTML and served from Vercel\'s edge network across 300+ global points of presence. There are no servers to patch, no databases to back up, and no plugins to update. Your $100/month site management covers hosting on that CDN, technical support when you need it, ongoing SEO monitoring to track your rankings, content updates whenever your business changes, analytics reporting, and ad-ready infrastructure for Google and Meta campaigns. You run your business. We run your website.',
  },
  {
    question: 'What about my existing content?',
    answer: 'We migrate everything — text, images, blog posts, SEO metadata, and any structured data your current site has. But we don\'t just copy and paste. Simply moving content to a new platform without restructuring it preserves the same problems that plagued the old site. During migration, we restructure your content hierarchy for proper heading order (critical for both screen readers and search crawlers), add JSON-LD markup so AI assistants can parse your services and location, optimize image formats and compression (most sites serve images far larger than they need to be), and ensure every page has proper meta descriptions, Open Graph tags, and canonical URLs. The goal isn\'t just to move your content — it\'s to make it work harder than it ever has.',
  },
  {
    question: 'Word-of-mouth has always worked for us. Why do we need this?',
    answer: 'Word-of-mouth is powerful — but it has a ceiling. You can only grow as fast as people talk about you. And here\'s the thing: when someone hears your name, the first thing they do is Google you. If your site looks outdated or loads slowly, it undermines the referral before you ever get a chance to pitch. People absolutely judge a business\'s credibility by its website. In practices where a single new patient or client is worth thousands over their lifetime, even one additional conversion per month more than covers the entire investment. Word-of-mouth gets you known. A site that works 24/7 is how you scale.',
  },
  {
    question: 'What if my business changes after launch?',
    answer: 'That\'s exactly what the $100/month site management covers. Businesses grow — you add services, shift your target market, rebrand a division, or update your messaging. With traditional agencies, a simple content update can take weeks and come with extra billable hours. Our model is different. Send us a text or email describing the change. We push it live — usually within 24-48 hours. No meetings, no scope discussions, no surprise invoices. Because our sites are code-based (not locked inside a page builder), structural changes like adding a new service page or reorganizing navigation take minutes, not days. Your website should always reflect where your business is right now, not where it was six months ago.',
  },
  {
    question: 'How much does it cost?',
    answer: 'Two tiers. Essential starts at $1,500 one-time plus $100/month — a beautiful, fast 1-5 page site for single-location businesses. Simple, straightforward sites can come in right at the $1,500 floor; most land around $2,500 once scope is finalized. Complete starts at $5,000 one-time plus $200/month — a full multi-page site for businesses with multiple locations, booking systems, or more complex needs. Both tiers come with the same monthly coverage: hosting, deploy pipeline, database (where needed), a custom CMS so you can edit any content yourself anytime with no limits, SEO/analytics monitoring, unlimited structural changes, and ongoing improvement suggestions. Complete costs more because larger businesses push more traffic, more data, and more database load through the stack — and because they need priority turnaround on time-sensitive changes. The $200 reflects actual infrastructure cost and urgency, not different features. Flat rate on both — no hidden fees, no hourly billing, no nickel-and-diming. Want to see what the site should actually do before spending a dollar? Tell me about your business — I\'ll come back in 24 hours with a written plan covering the customer, the offer, and the one action the site needs to drive.',
  },
  {
    question: 'Do I have to pay anything up front?',
    answer: 'No. You pay $0 to get started. We build your site on our servers, show you the live preview, and make changes until it\'s exactly what you want. You only pay once the site is live and you love it — and the $100/month site management begins the same month. If for any reason it doesn\'t work out, you walk away owing nothing. We host everything ourselves, so the risk is ours, not yours. This is how we prove our work before asking for a dollar.',
  },
] as const;

export const CLIENT_PROFILES = [
  {
    industry: 'Dental Practices',
    challenge: 'New patients judge your practice by your website before they ever walk in.',
    outcome: 'A site that outperforms corporate dental on speed, AI visibility, and mobile booking.',
  },
  {
    industry: 'Financial Advisors',
    challenge: 'Referrals Google you before they call — a slow template site undermines the trust you\'ve built.',
    outcome: 'A digital presence that matches the precision of your work. Prospects arrive pre-sold.',
  },
  {
    industry: 'Car Dealerships',
    challenge: 'Buyers research online before they ever set foot on your lot. Your template looks like every other dealer.',
    outcome: 'The first dealership with a genuinely fast, custom site captures a disproportionate share.',
  },
  {
    industry: 'IT Services & MSPs',
    challenge: 'You sell technical competence — but your own site scores 35 on Lighthouse.',
    outcome: 'Sub-1-second load times that prove your technical chops before you say a word.',
  },
  {
    industry: 'Law Firms',
    challenge: 'People in legal trouble search on their phone at midnight. If your site takes 5 seconds, they pick the next result.',
    outcome: 'A site that communicates competence instantly — and shows up when AI recommends attorneys.',
  },
  {
    industry: 'Vision Care',
    challenge: 'Patients expect the same speed and polish from your site as the brands they shop online.',
    outcome: 'A fast, modern site that lets your expertise speak — with AI optimization built in.',
  },
] as const;

export const SPRING_CONFIG = {
  gentle: { stiffness: 120, damping: 14 },
  snappy: { stiffness: 300, damping: 30 },
  bouncy: { stiffness: 400, damping: 25 },
} as const;

export const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
