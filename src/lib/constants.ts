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
  email: 'tom@straywebdesign.co',
  tagline: 'Compete With the Big Guys — Starting With Your Website',
  web3formsKey: 'c2441e47-8ca0-4f87-a2dc-928015553d51',
} as const;

export const NAV_LINKS = [
  { label: 'Problem', href: '#problem' },
  { label: 'About', href: '#guide' },
  { label: 'Process', href: '#plan' },
  { label: 'Results', href: '#success' },
  { label: 'Services', href: '#services' },
  { label: 'Resources', href: '/resources' },
  { label: 'Contact', href: '#contact' },
] as const;

export const HERO_STATS = [
  { value: 53, suffix: '%', label: 'Average bounce rate on slow sites' },
  { value: 4.6, suffix: 's', label: 'Average load time for small biz sites', decimals: 1 },
  { value: 70, suffix: '%+', label: 'Of traffic is mobile — most sites aren\'t ready' },
] as const;

export const PROBLEM_CARDS = [
  {
    title: 'Performance',
    description: 'Enterprise sites load in under a second. Yours takes 4+. Customers don\'t wait — they go to the competitor with the faster site. Usually, that\'s the bigger company.',
    icon: 'gauge',
    stat: '53%',
    statLabel: 'of visitors leave after 3 seconds',
  },
  {
    title: 'Accessibility',
    description: 'Big brands have entire teams ensuring ADA compliance. Your site has broken navigation, missing alt text, and zero keyboard support — shutting out customers and inviting lawsuits.',
    icon: 'accessibility',
    stat: '96%',
    statLabel: 'of small biz sites fail accessibility',
  },
  {
    title: 'AI Readiness',
    description: 'Enterprise companies are already optimizing for ChatGPT, Perplexity, and Google AI. When customers ask AI for recommendations, big brands show up. You don\'t.',
    icon: 'brain',
    stat: '0%',
    statLabel: 'of WordPress sites are AI-optimized',
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
    description: 'Custom design that rivals any enterprise site. Not a template — a purpose-built digital presence that makes customers forget they\'re shopping small.',
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
  { category: 'Security', before: 'Plugin updates needed', after: 'No plugins to manage', improvement: 'Zero overhead' },
  { category: 'Hosting + Maintenance', before: '$20-50/mo + dev fees for changes', after: '$50/mo — hosting, bug fixes, and small changes included', improvement: 'All-in-one' },
  { category: 'Updates & Maintenance', before: 'Plugin updates + extra dev fees', after: 'Bug fixes and small changes included', improvement: 'No surprise bills' },
  { category: 'Custom Interactions', before: 'None (static templates)', after: 'Scroll animations, 3D effects', improvement: 'Premium feel' },
  { category: 'Core Web Vitals', before: 'Failing all metrics', after: 'Passing all metrics', improvement: 'Google-approved' },
  { category: 'Content Delivery', before: 'Single server', after: 'Global CDN (edge)', improvement: 'Worldwide fast' },
] as const;

export const FAILURE_STATS = [
  { value: 68, suffix: '%', label: 'of small businesses lose customers to competitors with better sites' },
  { value: 75, suffix: '%', label: 'of users judge credibility by web design alone' },
  { value: 94, suffix: '%', label: 'of first impressions are design-related — big brands know this' },
] as const;

export const SERVICES = [
  {
    title: 'Enterprise Speed, Small Biz Price',
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
] as const;

export const FAQ_ITEMS = [
  {
    question: 'Why not just use WordPress?',
    answer: 'WordPress powers 43% of the web — but that popularity comes with tradeoffs. The average WordPress site relies on 13+ plugins, each adding page weight and requiring updates. Our sites ship zero plugins, load in under 1 second, and the $50/month hosting includes all maintenance so you never think about it.',
  },
  {
    question: 'What is a Lighthouse score and why does it matter?',
    answer: 'Google Lighthouse measures your site\'s Performance, Accessibility, Best Practices, and SEO on a 0-100 scale. Sites scoring below 50 are penalized in search rankings. Most small business WordPress sites score 30-50. Our sites consistently score 95-100 across all categories.',
  },
  {
    question: 'What does "AI Ready" mean for my website?',
    answer: 'AI assistants like ChatGPT, Perplexity, and Google AI Overview are becoming how people find businesses. An AI-ready site includes structured data (JSON-LD), FAQ schema, and an llms.txt file that helps AI understand and recommend your business. Without these, AI literally cannot see you.',
  },
  {
    question: 'What is GEO (Generative Engine Optimization)?',
    answer: 'GEO is the next evolution of SEO. While traditional SEO optimizes for Google\'s link-based results, GEO optimizes for AI-generated answers. This means structured data, conversational content, authoritative sourcing, and machine-readable formats that AI models use to formulate recommendations.',
  },
  {
    question: 'How long does a project take?',
    answer: 'Most sites launch within 2-4 weeks from kickoff. We move fast because we don\'t waste time fighting WordPress plugins or troubleshooting theme conflicts. Custom code means we build exactly what you need, nothing more.',
  },
  {
    question: 'Do I need to maintain the site myself?',
    answer: 'No. Our sites are statically generated and deployed on a global CDN — no plugins to update, no databases to worry about. Your $50/month covers hosting, bug fixes, and small content changes. You focus on your business, we handle the website.',
  },
  {
    question: 'What about my existing content?',
    answer: 'We migrate everything. Your text, images, blog posts, and SEO metadata all transfer over. We also improve your content structure for better SEO and AI readability during the migration.',
  },
  {
    question: 'What if my business changes after launch?',
    answer: 'That\'s exactly what the $50/month covers. We get it right the first time — but businesses grow. You add a new service, target a different market, or want to rewrite your messaging? Send us a text or email and we push the update. No meetings. No waiting weeks. No extra invoices. We handle the structural changes so your site always reflects where your business is right now.',
  },
  {
    question: 'How much does it cost?',
    answer: 'Projects start at $2,500 for a standard business site. Premium sites with advanced animations, custom integrations, and e-commerce start at $5,000. After launch, hosting is $50/month which includes hosting, bug fixes, and small content changes — no surprise invoices. Every project includes a free site audit so you can see the value before committing.',
  },
] as const;

export const TESTIMONIALS = [
  {
    name: 'Erie Business Owner',
    role: 'Local Retail',
    quote: 'Customers told me they almost drove to the chain store instead because our site looked outdated. Now our site outperforms the big box stores on every metric.',
    rating: 5,
  },
  {
    name: 'Erie Restaurant Owner',
    role: 'Downtown Erie',
    quote: 'We\'re a family restaurant competing against franchise chains with huge budgets. Our website is now better than every single one of theirs. Erie locals notice.',
    rating: 5,
  },
  {
    name: 'Erie Service Provider',
    role: 'Home Services',
    quote: 'Going from a Lighthouse score of 32 to 98 put us above the national chains when people search for services in Erie. We\'re getting calls we never got before.',
    rating: 5,
  },
] as const;

export const SPRING_CONFIG = {
  gentle: { stiffness: 120, damping: 14 },
  snappy: { stiffness: 300, damping: 30 },
  bouncy: { stiffness: 400, damping: 25 },
} as const;

export const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
