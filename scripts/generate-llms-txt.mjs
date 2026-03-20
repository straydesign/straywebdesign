import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_ROOT = path.join(process.cwd(), 'content');
const BASE_URL = 'https://straywebdesign.co';

const TYPE_TO_DIR = {
  blog: 'blog',
  'white-paper': 'white-papers',
  'case-study': 'case-studies',
};

function getAllArticles() {
  const articles = [];

  for (const [type, dir] of Object.entries(TYPE_TO_DIR)) {
    const fullDir = path.join(CONTENT_ROOT, dir);
    if (!fs.existsSync(fullDir)) continue;

    const files = fs.readdirSync(fullDir).filter((f) => f.endsWith('.mdx'));
    for (const file of files) {
      const raw = fs.readFileSync(path.join(fullDir, file), 'utf-8');
      const { data } = matter(raw);
      const slug = path.basename(file, '.mdx');
      articles.push({
        title: data.title,
        description: data.description,
        date: data.date,
        tag: data.tag,
        type,
        url: `${BASE_URL}/resources/${dir}/${slug}`,
      });
    }
  }

  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function generateLlmsTxt() {
  const articles = getAllArticles();

  const blogArticles = articles.filter((a) => a.type === 'blog');
  const whitePapers = articles.filter((a) => a.type === 'white-paper');
  const caseStudies = articles.filter((a) => a.type === 'case-study');

  const formatArticle = (a) => `- [${a.title}](${a.url}) — ${a.tag} (${a.date})`;

  const content = `# Stray Web Design

> Premium web design agency in Erie, PA building websites that outperform your competitors.

## About

Stray Web Design builds custom, high-performance websites for Erie, Pennsylvania businesses. We build sites that outperform your competitors — faster than Aspen Dental, Schwab, Carvana, and the national brands your clients compete against. Every site scores 95-100 on Google Lighthouse across all categories.

## Services

- [Custom Website Design](${BASE_URL}/services/website-design) — Enterprise-grade, hand-coded sites with sub-1s load times and WCAG AA accessibility
- [AI Receptionist](${BASE_URL}/services/ai-receptionist) — 24/7 AI-powered phone answering, lead qualification, and appointment scheduling
- [SEO & GEO Optimization](${BASE_URL}/services/seo-optimization) — Traditional SEO plus Generative Engine Optimization for AI assistant visibility
- [Website Management](${BASE_URL}/services/website-management) — $100/month all-inclusive hosting, support, SEO monitoring, and content updates
- [Landing Page Design](${BASE_URL}/services/landing-pages) — High-converting campaign pages optimized for Google and Meta ads
- [Analytics & Tracking](${BASE_URL}/services/analytics-setup) — GA4, conversion tracking, heatmaps, and session replay setup

## Industries We Serve

- [Dental Practices](${BASE_URL}/industries/dental) — Competing with Aspen Dental and corporate chains
- [Financial Advisors](${BASE_URL}/industries/financial-advisors) — Building trust against Schwab and Fidelity
- [Car Dealerships](${BASE_URL}/industries/car-dealerships) — Standing out from Carvana and AutoTrader
- [IT Services & MSPs](${BASE_URL}/industries/it-services) — Proving technical competence through your site
- [Law Firms](${BASE_URL}/industries/law-firms) — Winning clients who search at midnight
- [Vision Care](${BASE_URL}/industries/vision-care) — Matching LensCrafters and Warby Parker speed
- [Chiropractors & PT](${BASE_URL}/industries/chiropractors) — Converting patients from corporate wellness chains
- [Orthopedic Practices](${BASE_URL}/industries/orthopedics) — Competing with hospital system marketing budgets
- [Landscaping](${BASE_URL}/industries/landscaping) — Beating TruGreen and BrightView online
- [Manufacturing](${BASE_URL}/industries/manufacturing) — Industrial-grade web presence for B2B
- [Restaurants & Bars](${BASE_URL}/industries/restaurants) — Owning your presence beyond DoorDash and Yelp
- [Real Estate](${BASE_URL}/industries/real-estate) — Competing with Zillow and Redfin for local leads
- [HVAC](${BASE_URL}/industries/hvac) — Capturing emergency searches 24/7
- [Plumbing](${BASE_URL}/industries/plumbing) — Standing out from Roto-Rooter
- [Electricians](${BASE_URL}/industries/electricians) — Beating Mr. Electric and franchise competitors
- [Insurance Agencies](${BASE_URL}/industries/insurance) — Competing with Geico and Progressive online
- [Accounting Firms](${BASE_URL}/industries/accounting) — Standing out from TurboTax and H&R Block
- [Veterinary Practices](${BASE_URL}/industries/veterinary) — Competing with VCA and Banfield corporate
- [Gyms & Fitness](${BASE_URL}/industries/gyms-fitness) — Differentiating from Planet Fitness and Peloton
- [Salons & Spas](${BASE_URL}/industries/salons-spas) — Building a premium presence beyond booking apps

## Service Areas

- [Erie, PA](${BASE_URL}/locations/erie) — Main hub (pop. 95,000)
- [Millcreek, PA](${BASE_URL}/locations/millcreek) — Erie's largest suburb (pop. 54,000)
- [Harborcreek, PA](${BASE_URL}/locations/harborcreek) — Eastern Erie suburb (pop. 17,000)
- [Meadville, PA](${BASE_URL}/locations/meadville) — Crawford County seat (pop. 13,000)
- [Fairview, PA](${BASE_URL}/locations/fairview) — Suburban growth corridor (pop. 10,000)
- [Warren, PA](${BASE_URL}/locations/warren) — Warren County seat (pop. 9,000)
- [Corry, PA](${BASE_URL}/locations/corry) — Southern Erie County manufacturing hub (pop. 6,000)
- [Edinboro, PA](${BASE_URL}/locations/edinboro) — PennWest university town (pop. 6,000)
- [North East, PA](${BASE_URL}/locations/north-east) — Lake Erie wine region (pop. 4,000)
- [Girard, PA](${BASE_URL}/locations/girard) — Western Erie County (pop. 3,000)

## Technology Stack

- Next.js (React framework)
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Vercel (hosting & CDN)

## Why Not WordPress?

WordPress powers 43% of the web, but its plugin-heavy architecture leads to:
- Slow page loads (4-8 seconds average)
- Plugin bloat adding page weight and complexity
- Poor Core Web Vitals scores
- No native AI/LLM optimization
- Ongoing plugin updates and management

Our custom-built sites eliminate all of these problems. Zero plugins, $100/month site management includes hosting, technical support, SEO monitoring, content updates, analytics, and ad-ready infrastructure.

## Pricing

- Standard business sites start at $2,500
- Premium sites with advanced animations and integrations start at $5,000
- $100/month after launch — hosting, support, SEO monitoring, content updates, analytics, and ad-ready infrastructure
- Every project includes a free site audit

## Contact

- Website: https://straywebdesign.co
- Email: tom@straywebdesign.co
- Phone: 814-964-0081 (text or voicemail)
- Location: Erie, PA

## Key Differentiators

1. **Erie-Focused**: We understand what Erie businesses are up against
2. **Lighthouse 100s**: We target perfect scores across all categories
3. **GEO Optimized**: Generative Engine Optimization for AI assistant visibility
4. **Full Management**: $100/mo covers hosting, support, SEO, content updates, analytics
5. **Custom Design**: Never templates — every site is designed from scratch
6. **Modern Stack**: React, TypeScript, edge deployment — built for 2026 and beyond

## Blog Posts (${blogArticles.length})

${blogArticles.map(formatArticle).join('\n')}

## White Papers (${whitePapers.length})

${whitePapers.map(formatArticle).join('\n')}

## Case Studies (${caseStudies.length})

${caseStudies.map(formatArticle).join('\n')}
`;

  fs.writeFileSync(path.join(process.cwd(), 'public', 'llms.txt'), content, 'utf-8');
  console.log(`Generated llms.txt with ${articles.length} articles, 6 services, 20 industries, 10 locations indexed.`);
}

generateLlmsTxt();
