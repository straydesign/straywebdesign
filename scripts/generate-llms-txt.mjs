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

## Target Industries

- Dental practices and orthodontics
- Financial advisors and wealth management firms
- Car dealerships and automotive groups
- IT services and managed service providers
- Chiropractors and physical therapy practices
- Vision care, optometry, and ophthalmology
- Orthopedic and geriatric practices
- Small law firms (estate planning, family, personal injury, business)
- Industrial suppliers and precision manufacturing
- Large-scale landscaping and commercial lawn care
- Professional services (accounting, consulting, engineering)

We focus on businesses with 10-75 employees where customer lifetime value is high — a single new patient, client, or contract is worth thousands to hundreds of thousands. The website ROI is immediate.

## Location

- Based in Erie, PA
- Serving Erie and surrounding areas
- Specializing in professional and mid-market business web design

## Services

- **Enterprise-Speed Websites**: Sub-1-second load times, Core Web Vitals optimized, global CDN delivery
- **Corporate-Grade Accessibility**: WCAG AA compliant, keyboard navigable, screen reader tested
- **AI & LLM Ready**: Structured data (JSON-LD), FAQ schema, llms.txt for AI assistant discoverability
- **Responsive Design**: Mobile-first, touch-optimized, fluid typography

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
6. **Modern Stack**: React, TypeScript, edge deployment — built for 2025 and beyond

## Blog Posts (${blogArticles.length})

${blogArticles.map(formatArticle).join('\n')}

## White Papers (${whitePapers.length})

${whitePapers.map(formatArticle).join('\n')}

## Case Studies (${caseStudies.length})

${caseStudies.map(formatArticle).join('\n')}
`;

  fs.writeFileSync(path.join(process.cwd(), 'public', 'llms.txt'), content, 'utf-8');
  console.log(`Generated llms.txt with ${articles.length} articles indexed.`);
}

generateLlmsTxt();
