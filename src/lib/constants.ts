export const COLORS = {
  navy: '#0F172A',
  electric: '#3B82F6',
  warmWhite: '#FAFAF9',
  accent: '#8B5CF6',
  darkNavy: '#020617',
  lightGray: '#F1F5F9',
  mediumGray: '#94A3B8',
  electricLight: '#60A5FA',
  electricDark: '#2563EB',
} as const;

export const SITE = {
  name: 'Stray Web Design',
  url: 'https://straywebdesign.co',
  email: 'tom@straydesign.co',
  phone: '814-964-0081',
  tagline: 'Websites That Outperform Your Competitors',
  web3formsKey: 'c2441e47-8ca0-4f87-a2dc-928015553d51',
} as const;

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Resources', href: '/resources' },
  { label: 'Book a Call', href: '/book' },
] as const;

export const BOOKING_TIMING_OPTIONS = [
  'This week',
  'Next week',
  'Within 2 weeks',
  'Flexible',
] as const;

export const HERO_STATS = [
  { value: 53, suffix: '%', label: 'Average bounce rate on slow sites' },
  { value: 4.6, suffix: 's', label: 'Average load time for WordPress sites', decimals: 1 },
  { value: 70, suffix: '%+', label: 'Of traffic is mobile — most sites aren\'t ready' },
] as const;

export const PROBLEM_CARDS = [
  {
    title: 'Performance',
    description: 'Aspen Dental loads in under 2 seconds. Schwab loads in 1.5. Carvana loads in under 1. Your site takes 4+. When a potential patient or client is comparing options, they go with whoever feels faster and more professional.',
    icon: 'gauge',
    stat: '53%',
    statLabel: 'of visitors leave after 3 seconds',
  },
  {
    title: 'Accessibility',
    description: 'National brands have entire teams ensuring ADA compliance. Your site has broken navigation, missing alt text, and zero keyboard support — shutting out patients and inviting lawsuits while competitors pass every test.',
    icon: 'accessibility',
    stat: '96%',
    statLabel: 'of business sites fail accessibility',
  },
  {
    title: 'AI Readiness',
    description: 'Corporate chains are already optimizing for ChatGPT, Perplexity, and Google AI. When potential clients ask AI for a dentist, financial advisor, IT provider, or car dealership — the national brands show up. You don\'t.',
    icon: 'brain',
    stat: '0%',
    statLabel: 'of local business sites are AI-optimized',
  },
] as const;

export const PLAN_STEPS = [
  {
    step: 1,
    title: 'We Audit the Gap',
    description: 'Free Lighthouse report showing exactly where you stand vs. enterprise competitors. Performance, accessibility, SEO, AI readiness — we measure it all.',
    icon: 'search',
  },
  {
    step: 2,
    title: 'We Design to Compete',
    description: 'Custom design that rivals any enterprise site. Not a template — a purpose-built digital presence that makes customers forget your size.',
    icon: 'palette',
  },
  {
    step: 3,
    title: 'We Level the Playing Field',
    description: 'Enterprise-grade performance, accessibility, and AI optimization — at a fraction of the cost. Your site competes with the big guys on every metric.',
    icon: 'rocket',
  },
] as const;

export const COMPARISON_ROWS = [
  { category: 'Page Load Speed', before: '4-8 seconds', after: 'Under 1 second', improvement: '8x faster' },
  { category: 'Mobile Experience', before: 'Broken layouts, tiny text', after: 'Mobile-first, touch-optimized', improvement: 'Fully responsive' },
  { category: 'Google Lighthouse', before: '30-50 score', after: '95-100 score', improvement: '2-3x higher' },
  { category: 'Accessibility (WCAG)', before: 'Non-compliant', after: 'WCAG AA certified', improvement: '100% compliant' },
  { category: 'SEO Performance', before: 'Missing meta, no schema', after: 'Full structured data', improvement: 'Rich results ready' },
  { category: 'AI/LLM Visibility', before: 'Invisible to AI', after: 'llms.txt + FAQ schema', improvement: 'AI-discoverable' },
  { category: 'Security', before: 'Vulnerable plugins', after: 'Zero attack surface', improvement: 'No plugins' },
  { category: 'Hosting + Management', before: '$20-50/mo + dev fees', after: '$100/mo — hosting, support, SEO, updates', improvement: 'One bill' },
  { category: 'Content Changes', before: 'Wait weeks, pay extra', after: 'Text us, we push it live', improvement: 'No surprise bills' },
  { category: 'Custom Interactions', before: 'None (static templates)', after: 'Scroll animations, 3D effects', improvement: 'Premium feel' },
  { category: 'Core Web Vitals', before: 'Failing all metrics', after: 'Passing all metrics', improvement: 'Google-approved' },
  { category: 'Content Delivery', before: 'Single server', after: 'Global CDN (300+ edges)', improvement: 'Worldwide fast' },
] as const;

export const FAILURE_STATS = [
  { value: 68, suffix: '%', label: 'of businesses lose customers to competitors with better sites' },
  { value: 75, suffix: '%', label: 'of users judge credibility by web design alone' },
  { value: 94, suffix: '%', label: 'of first impressions are design-related — big brands know this' },
] as const;

export const SERVICES = [
  {
    title: 'Enterprise Speed, Mid-Market Price',
    description: 'Sub-1-second load times that match Amazon and Google. Your customers get the same instant experience they expect from the biggest brands.',
    features: ['Sub-1s LCP', 'Global CDN delivery', 'Optimized images & fonts', 'Zero render-blocking resources'],
  },
  {
    title: 'Corporate-Grade Accessibility',
    description: 'The same WCAG AA compliance that Fortune 500 companies invest millions to achieve — built into your site from day one.',
    features: ['WCAG AA compliant', 'Keyboard navigable', 'Screen reader tested', 'Color contrast verified'],
  },
  {
    title: 'AI-Ready Before the Big Guys',
    description: 'Most enterprises are just starting to optimize for AI. We put you ahead of the curve with structured data and LLM visibility from launch.',
    features: ['llms.txt for AI crawlers', 'JSON-LD structured data', 'FAQ schema markup', 'GEO optimized'],
  },
  {
    title: 'Mobile Experience That Rivals Anyone',
    description: 'The same polished mobile experience your customers get from major brands. Touch-optimized, fluid, and beautiful on every screen.',
    features: ['Mobile-first approach', 'Touch-optimized', 'Fluid typography', 'Adaptive layouts'],
  },
  {
    title: 'AI Receptionist That Never Misses a Call',
    description: 'Your phone rings at 9 PM — the AI answers, qualifies the lead, and books the appointment. 24/7 coverage for less than minimum wage.',
    features: ['24/7 call answering', 'Missed call text-back', 'Appointment scheduling', 'Lead qualification'],
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: 'Why not just use WordPress?',
    answer: 'Because it\'s costing you money you can\'t see. Every slow page load loses a visitor — Google data shows 53% of mobile users abandon sites that take longer than 3 seconds. WordPress\'s median page weight is 2.4 MB (HTTP Archive Web Almanac), much of it from plugin chain-loading. The average site runs 13 active plugins, each executing its own database queries, injecting its own CSS and JavaScript, and opening its own security holes — 96% of WordPress vulnerabilities come from plugins and themes, not WordPress core (Patchstack 2024). Meanwhile, your SEO plugin set-and-forgot your meta tags, your page builder broke your heading hierarchy (screen readers, Google, and AI all penalize this), and AI assistants can\'t recommend you because there\'s no structured data for them to read. Our approach eliminates the entire dependency chain. Custom code, no plugins, no database, no attack surface. Pages ship as static files to a global CDN. Sub-1-second loads, zero security patches, and a $100/month site management fee that covers hosting, technical support, SEO monitoring, content updates, and ad-ready infrastructure.',
  },
  {
    question: 'What is a Lighthouse score and why does it matter?',
    answer: 'Lighthouse is an open-source audit built into Chrome DevTools that scores four categories — Performance, Accessibility, Best Practices, and SEO — each on a 0-100 scale. What makes it matter: Vodafone ran an A/B test that found a 31% improvement in conversion rate when their Largest Contentful Paint improved by just 1 second. Rakuten 24 documented a 53.4% increase in revenue-per-visitor after pushing their Core Web Vitals into Google\'s "good" threshold. Deloitte\'s "Milliseconds Make Millions" study across retail and travel brands showed that a 0.1-second improvement in load time drove a 10% lift in conversions. Most local business sites score between 30 and 50 on Performance. Our builds target 95-100 across all four categories — the same range you\'ll find on sites like web.dev and developer.chrome.com.',
  },
  {
    question: 'What does "AI Ready" mean for my website?',
    answer: 'When someone asks ChatGPT, Perplexity, or Google AI Overview for a recommendation, those models pull from structured data across the web. An SE Ranking study of 5,000 AI-generated search responses found that sites with JSON-LD structured data appeared in AI citations 3.2x more often than sites relying on unstructured HTML alone. The llms.txt standard — proposed by Jeremy Howard of fast.ai — gives AI crawlers a clean, machine-readable summary of your business that sits alongside robots.txt. We also implement FAQ schema so your questions and answers can surface directly in AI responses, and LocalBusiness schema so AI assistants know your name, location, hours, and services without guessing. A Wynter survey of B2B buyers found that 43% had used an AI assistant to research a purchase in the prior 30 days. If your business isn\'t structured for AI to read, it simply won\'t appear in those results.',
  },
  {
    question: 'What is GEO (Generative Engine Optimization)?',
    answer: 'GEO is a framework first defined in a 2024 Princeton and Georgia Tech research paper that studied how generative AI models select and rank sources when producing answers. The researchers tested nine optimization strategies and found that adding authoritative citations increased source visibility in AI responses by up to 40%, and embedding relevant statistics boosted visibility by 30%. Unlike traditional SEO — which optimizes for link-based ranking algorithms — GEO optimizes for the language model\'s citation selection process. This means structuring content conversationally, providing machine-readable context through schema markup, and making claims verifiable with specific data. BrightEdge reported that 60% of Google searches now result in a zero-click outcome, many of them AI Overviews. The businesses that appear in those AI-generated answers are the ones whose content is already structured for it.',
  },
  {
    question: 'How long does a project take?',
    answer: 'Most sites ship in three days. Not three months — three days. We move that fast because there are no plugins to debug, no themes to fight, no third-party code slowing anything down. Every line of code is written for your business specifically. Day one: discovery and design. Day two: build. Day three: content polish, device testing, launch. Larger businesses with complex needs — multi-location setups, custom integrations, extensive content migration — may take slightly longer, but the principle stays the same: get it right early, then iterate continuously. Your site should always reflect where your business is right now, not where it was six months ago. The Standish Group found that scope creep and dependency management are the two biggest reasons web projects blow their timelines. We skip both.',
  },
  {
    question: 'Do I need to maintain the site myself?',
    answer: 'No. Sucuri\'s annual website threat report found that 39% of hacked CMS sites were running outdated software at the point of compromise — a direct consequence of the maintenance burden that database-driven sites require. Our sites sidestep that entirely. They\'re pre-rendered as static HTML and served from Vercel\'s edge network across 300+ global points of presence. There are no servers to patch, no databases to back up, and no plugins to update. Your $100/month site management covers hosting on that CDN, technical support when you need it, ongoing SEO monitoring to track your rankings, content updates whenever your business changes, analytics reporting, and ad-ready infrastructure for Google and Meta campaigns. You run your business. We run your website.',
  },
  {
    question: 'What about my existing content?',
    answer: 'We migrate everything — text, images, blog posts, SEO metadata, and any structured data your current site has. But we don\'t just copy and paste. Research from the Nielsen Norman Group on content migration found that simply moving content to a new platform without restructuring it preserves the same usability problems that plagued the old site. During migration, we restructure your content hierarchy for proper heading order (critical for both screen readers and search crawlers), add JSON-LD markup so AI assistants can parse your services and location, optimize image formats and compression (most sites serve images 3-5x larger than necessary according to HTTP Archive data), and ensure every page has proper meta descriptions, Open Graph tags, and canonical URLs. The goal isn\'t just to move your content — it\'s to make it work harder than it ever has.',
  },
  {
    question: 'Word-of-mouth has always worked for us. Why do we need this?',
    answer: 'Word-of-mouth is powerful — the Hinge Research Institute found that professional services firms ranking referrals as their top growth channel grew 25% slower than firms combining referrals with a strong digital presence. Word-of-mouth has a ceiling: you can only grow as fast as people talk about you. A Stanford Persuasive Technology Lab study showed that 75% of people admit to judging a business\'s credibility based on its website design. So when someone hears your name and Googles you — which BrightLocal found 98% of consumers did before choosing a local business in 2024 — your site is either confirming the referral or undermining it. In practices where a single new patient or client is worth $3,000-$180,000 over their lifetime, even one additional conversion per month more than covers the entire investment. Word-of-mouth gets you known. A site that works 24/7 is how you scale.',
  },
  {
    question: 'What if my business changes after launch?',
    answer: 'That\'s exactly what the $100/month site management covers. Businesses grow — you add services, shift your target market, rebrand a division, or update your messaging. The Content Marketing Institute found that 65% of businesses updated their website content at least monthly, but among companies using traditional agency retainers, the median turnaround for a content update was 2-3 weeks with additional billable hours. Our model is different. Send us a text or email describing the change. We push it live — usually within 24-48 hours. No meetings, no scope discussions, no surprise invoices. Because our sites are code-based (not locked inside a page builder), structural changes like adding a new service page or reorganizing navigation take minutes, not days. Your website should always reflect where your business is right now, not where it was six months ago.',
  },
  {
    question: 'How much does it cost?',
    answer: 'Projects start at $2,500 for a standard business site with enterprise-grade performance, full accessibility compliance, and AI optimization built in. Premium sites — featuring advanced scroll animations, custom integrations, booking systems, or e-commerce — start at $5,000. For context, Clutch.co\'s 2024 survey of 1,500 businesses found the average cost of a custom small business website ranged from $5,000 to $15,000 from a traditional agency, often without ongoing support. After launch, site management is $100/month — covering hosting on a global CDN, technical support, SEO monitoring, content updates whenever your business evolves, analytics reporting, and ad-ready infrastructure for Google and Meta campaigns. No surprise invoices. No hourly billing for quick changes. Every project starts with a free site audit so you can see exactly where your current site stands before making any commitment.',
  },
] as const;

export const CLIENT_PROFILES = [
  {
    industry: 'Dental Practices',
    challenge: 'Losing new patients to Aspen Dental and corporate chains — whose sites load in 2 seconds while yours takes 6.',
    outcome: 'A site that outperforms corporate dental on speed, AI visibility, and mobile booking. At $3,000+ per patient lifetime, even one extra new patient per month covers the investment.',
  },
  {
    industry: 'Financial Advisors',
    challenge: 'Referrals Google you before they call. A slow template next to Schwab\'s polished presence kills the trust your reputation built.',
    outcome: 'A digital presence that matches the precision of your actual work. Prospects show up pre-sold because the site already did the heavy lifting.',
  },
  {
    industry: 'Car Dealerships',
    challenge: 'Buyers browse Carvana and Ford.com before they ever visit your lot. Your Dealer.com template looks identical to every other dealer in town.',
    outcome: 'The first dealership in your market with a genuinely fast, custom site captures a disproportionate share of online-first buyers.',
  },
  {
    industry: 'IT Services & MSPs',
    challenge: 'You sell technical competence — but your own website scores 35 on Lighthouse. Decision makers notice the disconnect.',
    outcome: 'Sub-1-second load times that prove your technical chops before you say a word. At $180K+ per contract, the ROI is immediate.',
  },
  {
    industry: 'Law Firms',
    challenge: 'People in legal trouble search on their phone at midnight. If your site takes 5 seconds, they pick the next result.',
    outcome: 'A site that communicates competence and confidentiality instantly — and shows up when AI recommends attorneys in Erie.',
  },
  {
    industry: 'Vision Care',
    challenge: 'Patients compare your site to LensCrafters and Warby Parker. 20 years of clinical expertise gets judged against their 2-second load time.',
    outcome: 'A fast, modern site that lets your expertise speak — with AI optimization so patients find you before the chains.',
  },
] as const;

export const SPRING_CONFIG = {
  gentle: { stiffness: 120, damping: 14 },
  snappy: { stiffness: 300, damping: 30 },
  bouncy: { stiffness: 400, damping: 25 },
} as const;

export const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
