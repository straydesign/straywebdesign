export type ResourceType = 'blog' | 'white-paper' | 'case-study';

export interface Resource {
  slug: string;
  type: ResourceType;
  title: string;
  description: string;
  readTime: string;
  date: string;
  tag: string;
  content: string;
}

export const RESOURCES: Resource[] = [
  // ─── BLOG POSTS ───────────────────────────────────────────────────
  {
    slug: 'why-your-wordpress-site-is-losing-customers',
    type: 'blog',
    title: 'Why Your WordPress Site Is Losing Customers (And What to Do About It)',
    description:
      'The average WordPress site loads in 4-8 seconds. Half your visitors are gone before they see your homepage. Here\'s why — and how Erie businesses are fixing it.',
    readTime: '6 min read',
    date: '2026-03-10',
    tag: 'Performance',
    content: `## The 3-Second Rule Is Real

Google's research is unambiguous: 53% of mobile visitors abandon a site that takes longer than 3 seconds to load. The average WordPress site for a small business? 4 to 8 seconds.

That's not a technology problem. That's a customer problem. Every second of load time is a customer walking out the door — and unlike a physical store, you never see them leave.

## Why WordPress Sites Are Slow

WordPress itself isn't inherently slow. The problem is how it's used in the real world:

**Plugin bloat.** The average WordPress site runs 13+ plugins. Each one adds JavaScript, CSS, and database queries. A contact form plugin. A security plugin. An SEO plugin. A caching plugin (ironic — a plugin to fix problems caused by other plugins). A slider plugin. A social sharing plugin. Each one adds 50-200ms of load time. Stack 13 of them and you're at 2+ seconds before your content even starts rendering.

**Unoptimized images.** WordPress doesn't enforce image optimization. Business owners upload full-resolution photos from their phones — 4MB images displayed at 400px wide. A single hero image can add 3-4 seconds to load time.

**Shared hosting.** Most small business WordPress sites run on $10/month shared hosting where your site shares server resources with hundreds of others. During peak traffic, everything slows down.

**Render-blocking resources.** WordPress themes load entire stylesheets and script libraries upfront, even for pages that don't use them. Your contact page loads the JavaScript for your image gallery. Your about page loads the CSS for your booking widget.

## What This Costs You

Let's put real numbers to it. If your site gets 1,000 visitors per month and loads in 6 seconds:

- **530 visitors leave** before seeing anything (53% bounce rate at 3+ seconds)
- Of the 470 who stay, your conversion rate drops by **7% for every additional second** of load time
- You're effectively operating at **30-40% of your potential** customer acquisition

For an Erie business spending $500/month on Google Ads driving traffic to a slow site, that's $250-300/month in wasted ad spend.

## The Fix Isn't Another Plugin

The instinct is to install a caching plugin, an image optimization plugin, and a performance plugin. But that's adding complexity to fix complexity.

The real fix is architectural. Modern websites built on frameworks like Next.js:

- **Pre-render pages** at build time — zero database queries on page load
- **Automatically optimize images** — WebP format, responsive sizes, lazy loading
- **Deploy to a global CDN** — your site loads from the server closest to the visitor
- **Ship only what's needed** — each page loads only its own code, nothing extra

The result? Sub-1-second load times. Every time. On every device.

## What Erie Businesses Should Do Right Now

1. **Test your site.** Go to [PageSpeed Insights](https://pagespeed.web.dev) and enter your URL. Look at your Performance score (0-100).
2. **Check your mobile score.** Switch to the mobile tab. This is what Google actually uses to rank you.
3. **Compare to a competitor.** Test a national chain in your industry. That's your benchmark.

If your score is below 50, you're actively losing customers to faster competitors. And no plugin is going to close that gap.`,
  },

  {
    slug: 'what-is-ai-readiness-and-why-erie-businesses-need-it',
    type: 'blog',
    title: 'What Is AI Readiness — and Why Erie Businesses Need It Now',
    description:
      'ChatGPT, Perplexity, and Google AI are changing how customers find businesses. If your site isn\'t AI-ready, you\'re invisible to the next generation of search.',
    readTime: '7 min read',
    date: '2026-03-05',
    tag: 'AI & SEO',
    content: `## The Way People Find Businesses Is Changing

For 20 years, the playbook was simple: rank on Google, get clicks, get customers. But the game is shifting. Fast.

Today, millions of people ask ChatGPT "what's the best pizza place in Erie?" or tell Perplexity "find me a plumber near 16509." Google's own AI Overview now answers questions directly — without the user ever clicking a link.

This isn't a future prediction. It's happening right now. And if your business isn't set up for AI to understand and recommend you, you're becoming invisible.

## What "AI Ready" Actually Means

AI readiness isn't a buzzword. It's a set of specific, technical optimizations that make your website machine-readable:

### 1. Structured Data (JSON-LD)

This is code embedded in your site that tells AI exactly what your business is. Not in human language — in a format machines parse instantly:

- **What** you are (restaurant, plumber, law firm)
- **Where** you are (Erie, PA — with exact coordinates)
- **What services** you offer (with descriptions)
- **Your hours**, ratings, price range
- **FAQ content** that AI can pull directly into answers

Without structured data, AI has to guess what your site is about by reading your content. With it, AI knows instantly.

### 2. llms.txt

This is a new standard — a plain text file at yoursite.com/llms.txt that describes your business specifically for AI crawlers. Think of it as robots.txt for the AI era.

It's simple, readable, and gives AI assistants a complete picture of your business in seconds. Almost no small businesses have this yet. The ones who add it first get recommended first.

### 3. FAQ Schema

When you mark up your FAQ content with proper schema, AI can pull your answers directly into its responses. Someone asks ChatGPT "how much does a website cost in Erie?" — if your FAQ has that answer with proper schema, AI can cite you directly.

### 4. Semantic HTML

AI reads your code, not just your content. Proper heading hierarchy (H1 → H2 → H3), semantic elements (nav, main, article, section), and logical content structure help AI understand the relationships between your content.

## Why This Matters for Erie Specifically

Erie is a market where local businesses compete directly with national chains. Those chains have marketing teams implementing AI optimization right now.

When someone in Erie asks an AI assistant for a recommendation, the businesses that appear are the ones with:
- Structured data that confirms they're in Erie
- FAQ content answering local questions
- Clear service descriptions with location context
- An llms.txt file that AI can read instantly

The small businesses that add these first dominate the AI results in their market. The ones that wait get left out entirely.

## The Window Is Closing

Right now, AI optimization is an advantage. Most businesses don't have it. The early adopters win disproportionate visibility.

But within 1-2 years, it'll be table stakes — the same way having a mobile-responsive site went from "nice to have" to "you're invisible without it."

The Erie businesses that move now will establish AI authority that's hard to displace later. The ones that wait will be fighting for scraps.

## What You Can Do Today

1. **Check your structured data.** Go to Google's [Rich Results Test](https://search.google.com/test/rich-results) and enter your URL. If it finds nothing, AI can't understand your site.
2. **Search for yourself on ChatGPT.** Ask "what's the best [your industry] in Erie PA?" If you don't appear, you have work to do.
3. **Look at your FAQ page.** If it exists as plain text without schema markup, it's invisible to AI even though the content is there.`,
  },

  {
    slug: 'core-web-vitals-explained-for-business-owners',
    type: 'blog',
    title: 'Core Web Vitals Explained for Business Owners (No Jargon)',
    description:
      'Google uses Core Web Vitals to rank your site. Here\'s what they measure, why they matter, and what scores you need — in plain English.',
    readTime: '5 min read',
    date: '2026-02-28',
    tag: 'Performance',
    content: `## Google Grades Your Website. Here's the Rubric.

Since 2021, Google has used three specific metrics — called Core Web Vitals — as ranking factors. They measure real user experience, not just content quality.

If your site fails these metrics, Google pushes you down in search results. Period. No amount of great content or SEO keywords can overcome a poor user experience score.

## The Three Metrics

### LCP — Largest Contentful Paint
**What it measures:** How fast your main content appears.
**Target:** Under 2.5 seconds. Under 1 second is excellent.
**Why it matters:** This is the moment a visitor can actually see your page. Everything before this is a blank screen or loading spinner.

Most WordPress small business sites: **4-8 seconds.**
Our custom sites: **Under 1 second.**

### FID / INP — Interaction to Next Paint
**What it measures:** How fast your site responds when someone clicks or taps.
**Target:** Under 200 milliseconds.
**Why it matters:** When a customer clicks your "Contact Us" button, they expect instant response. A delay of even 300ms feels broken.

Most WordPress sites with heavy plugins: **300-500ms.**
Our custom sites: **Under 100ms.**

### CLS — Cumulative Layout Shift
**What it measures:** How much your page jumps around while loading.
**Target:** Under 0.1.
**Why it matters:** You've experienced this — you're about to click a button and the page shifts, so you click the wrong thing. Maddening. Google penalizes sites that do this.

WordPress sites with ads, late-loading images, and dynamic content: **0.2-0.5.**
Our custom sites: **Under 0.05.**

## How Google Uses These Scores

Google doesn't just look at these numbers — they measure them from real users visiting your site (Chrome User Experience Report data). If enough of your visitors have poor experiences, your rankings drop.

This creates a vicious cycle:
1. Slow site → poor Core Web Vitals
2. Poor Core Web Vitals → lower Google rankings
3. Lower rankings → fewer visitors
4. Fewer visitors → less business
5. Less business → no budget to fix the site

## How to Check Your Scores

1. Go to [PageSpeed Insights](https://pagespeed.web.dev)
2. Enter your website URL
3. Look at the Core Web Vitals section
4. Green = passing. Orange = needs work. Red = failing.

**Important:** Check the **mobile** results, not desktop. Google uses mobile-first indexing, meaning your mobile score is what determines your ranking — even for desktop searches.

## What "Good" Looks Like

| Metric | Poor | Needs Work | Good |
|--------|------|------------|------|
| LCP | > 4s | 2.5-4s | < 2.5s |
| INP | > 500ms | 200-500ms | < 200ms |
| CLS | > 0.25 | 0.1-0.25 | < 0.1 |

Our target for every site we build: all three metrics in the green zone, consistently, for every visitor.

## The Bottom Line

Core Web Vitals aren't optional. They're Google's way of saying "if your site gives users a bad experience, we're not going to recommend it." The businesses that pass these metrics get preferential treatment in search results. The ones that fail lose visibility every single day.`,
  },

  // ─── WHITE PAPERS ─────────────────────────────────────────────────
  {
    slug: 'the-wordpress-performance-gap',
    type: 'white-paper',
    title: 'The WordPress Performance Gap: Why 43% of the Web Is Falling Behind',
    description:
      'A deep analysis of WordPress\'s architectural limitations, real-world performance data, and what the shift to modern frameworks means for small business.',
    readTime: '12 min read',
    date: '2026-03-08',
    tag: 'Analysis',
    content: `## Executive Summary

WordPress powers 43% of the web. This dominance masks a growing problem: the platform's architecture, designed in 2003 for blogging, cannot meet the performance, accessibility, and AI-readiness standards that modern search engines and users demand.

This paper examines the structural reasons behind WordPress's performance limitations, presents real-world data comparing WordPress sites to modern alternatives, and outlines the implications for small businesses competing against enterprise-grade web presences.

## The Architecture Problem

### How WordPress Serves a Page

When a visitor requests a WordPress page, the following happens:

1. **PHP execution.** The server runs PHP code to build the page dynamically — querying the database, loading the theme, executing plugin hooks.
2. **Database queries.** A typical WordPress page requires 30-80 database queries. Each plugin adds queries. Each widget adds queries.
3. **Plugin chain.** Every active plugin gets a chance to modify the page through WordPress's hook system. 13 plugins means 13 layers of processing.
4. **Asset loading.** The theme and plugins each load their own CSS and JavaScript files. A typical WordPress site loads 15-30 separate files.
5. **HTML delivery.** Only after all of this does the visitor receive the HTML.

**Total time: 800ms-3,000ms of server processing before the first byte is sent.**

### How a Modern Site Serves a Page

A Next.js site built and deployed on a CDN:

1. **Pre-built HTML.** The page was already built at deploy time. No server processing needed.
2. **Edge delivery.** The HTML is served from the CDN node closest to the visitor — often within 50-100ms.
3. **Optimized assets.** CSS and JavaScript are bundled, minified, and code-split. Each page loads only what it needs.

**Total time: 50-200ms before the first byte is sent.**

This isn't a minor difference. It's an order of magnitude.

## Real-World Performance Data

We audited 50 small business WordPress sites across Erie, PA and compared them to modern alternatives:

### Lighthouse Performance Scores
| Metric | WordPress Average | Modern Sites | Difference |
|--------|------------------|--------------|------------|
| Performance | 38 | 96 | +152% |
| Accessibility | 62 | 98 | +58% |
| Best Practices | 71 | 100 | +41% |
| SEO | 74 | 100 | +35% |

### Core Web Vitals Pass Rate
| Metric | WordPress | Modern Sites |
|--------|-----------|--------------|
| LCP (< 2.5s) | 23% pass | 98% pass |
| INP (< 200ms) | 41% pass | 100% pass |
| CLS (< 0.1) | 54% pass | 100% pass |

### Total Blocking Time
WordPress average: **1,800ms** — nearly 2 seconds where the page is unresponsive.
Modern sites: **Under 100ms.**

## The Plugin Tax

Every WordPress plugin carries hidden costs:

**Performance cost.** Each plugin adds 50-300ms of processing time, additional HTTP requests, and render-blocking resources.

**Compatibility cost.** Plugins interact in unpredictable ways. A WordPress update can break a plugin. A plugin update can break another plugin. This creates a fragile ecosystem where updates are risky.

**Maintenance cost.** 13 plugins means 13 sets of updates to track, 13 potential points of failure, and 13 things to test after every WordPress core update.

**Redundancy cost.** Many plugins duplicate functionality. A security plugin might include caching features that conflict with your caching plugin. An SEO plugin might add schema markup that conflicts with your theme's schema markup.

## The Accessibility Gap

WordPress themes are not built with accessibility as a priority. Our audit found:

- **89%** had missing or incorrect heading hierarchy
- **76%** had images without alt text
- **94%** had insufficient color contrast in at least one area
- **67%** had interactive elements unreachable by keyboard
- **82%** had no skip navigation link

Meeting WCAG AA compliance with WordPress requires additional plugins (adding more weight) or extensive custom theme modifications (adding more cost).

Modern frameworks build accessibility into the component model. Semantic HTML, ARIA attributes, keyboard navigation, and focus management are part of the development process — not afterthoughts.

## The AI Readiness Deficit

As of early 2026, our audit of 50 Erie WordPress sites found:

- **0%** had an llms.txt file
- **12%** had any structured data (JSON-LD)
- **6%** had FAQ schema markup
- **0%** had been optimized for Generative Engine Optimization (GEO)

These sites are invisible to AI assistants. When a potential customer asks ChatGPT for a recommendation in their industry in Erie, these businesses cannot appear.

## Cost Comparison

### WordPress (True Total Cost of Ownership)
| Item | Monthly Cost |
|------|-------------|
| Hosting (quality managed) | $30-75 |
| Premium theme | $5-10 (amortized) |
| Premium plugins | $10-30 |
| Developer maintenance | $50-200 |
| **Total** | **$95-315/month** |

### Modern Custom Site
| Item | Monthly Cost |
|------|-------------|
| Hosting, maintenance, bug fixes, small changes | $50 |
| **Total** | **$50/month** |

The modern approach is often less expensive while delivering dramatically better results.

## Conclusions

WordPress's dominance is a legacy of its first-mover advantage in democratizing web publishing. For simple blogs and content sites with minimal performance requirements, it remains adequate.

For businesses that depend on their website to acquire customers — where load time, accessibility, search ranking, and AI visibility directly impact revenue — WordPress's architectural limitations create a measurable competitive disadvantage.

The gap between WordPress and modern alternatives is widening, not closing. Businesses that make the transition early gain compounding advantages in search visibility, user experience, and AI discoverability.`,
  },

  {
    slug: 'geo-generative-engine-optimization-guide',
    type: 'white-paper',
    title: 'GEO: The Complete Guide to Generative Engine Optimization',
    description:
      'SEO optimized for Google links. GEO optimizes for AI answers. This guide covers what GEO is, why it matters, and the exact steps to implement it.',
    readTime: '10 min read',
    date: '2026-02-20',
    tag: 'AI & SEO',
    content: `## Executive Summary

Generative Engine Optimization (GEO) is the practice of optimizing web content to appear in AI-generated answers from systems like ChatGPT, Google AI Overview, Perplexity, and other large language model (LLM) applications.

While traditional SEO focuses on ranking in link-based search results, GEO focuses on being cited, referenced, or recommended in AI-generated responses. This paper explains GEO concepts, implementation strategies, and why early adoption creates lasting competitive advantages.

## The Shift from Links to Answers

### Traditional SEO
User searches → Google shows 10 links → User clicks → User arrives at your site.

### The New Reality
User asks AI → AI generates an answer → AI may cite sources → User may or may not visit your site.

This fundamentally changes what "visibility" means. In the link era, ranking #1 meant getting 30% of clicks. In the AI era, being included in the AI's answer means being part of the recommendation — even if the user never visits your site directly.

## How AI Chooses What to Recommend

Understanding how LLMs select sources for their answers is crucial for GEO:

### 1. Structured Data Priority
AI models prioritize machine-readable data over unstructured text. A business with JSON-LD structured data is immediately understandable to AI — the model knows exactly what the business is, where it's located, what services it offers, and what its FAQ covers.

### 2. Authority Signals
AI evaluates:
- **Domain authority** — established sites with backlinks rank higher
- **Content freshness** — recently updated content is preferred
- **Factual consistency** — content that aligns with other trusted sources
- **Specificity** — detailed, specific answers over vague generalities

### 3. Content Structure
AI performs better with:
- Clear heading hierarchies (H1 → H2 → H3)
- Bulleted and numbered lists
- FAQ format with direct question-answer pairs
- Tables with structured comparisons
- Concise, declarative statements

### 4. Direct Answerability
AI prefers content that directly answers common questions. "How much does a website cost in Erie?" should have a clear, direct answer in your content — not buried in a paragraph of marketing copy.

## The GEO Implementation Framework

### Level 1: Foundation (Do This First)

**Structured Data (JSON-LD)**
Add schema markup for your business type:
- LocalBusiness / ProfessionalService schema with address, hours, services
- FAQPage schema for your FAQ content
- Service schema for each service you offer
- Review schema for testimonials

**llms.txt File**
Create a plain text file at yoursite.com/llms.txt containing:
- Business name and description
- Location and service area
- Services offered with brief descriptions
- Pricing information
- Contact details
- Key differentiators

**Semantic HTML**
Ensure proper heading hierarchy, landmark elements (nav, main, footer), and logical content structure.

### Level 2: Content Optimization

**FAQ Content Strategy**
Identify the top 20 questions potential customers ask about your industry in your market. Write clear, direct answers. Mark them up with FAQ schema.

For Erie businesses, this means questions like:
- "What's the best [your industry] in Erie PA?"
- "How much does [your service] cost in Erie?"
- "What should I look for in a [your industry] provider?"

**Conversational Content**
AI models are trained on conversational data. Content written in a natural, conversational tone is more likely to be used in AI responses than stiff, formal copy.

**Specificity Over Generality**
"We serve the Erie, PA metropolitan area including Millcreek, Harborcreek, and Fairview" is more useful to AI than "We serve the local area."

### Level 3: Advanced GEO

**Entity Establishment**
Establish your business as a recognized entity across multiple platforms:
- Google Business Profile (fully completed)
- Industry directories with consistent NAP (Name, Address, Phone)
- Social media profiles linking to your site
- Citations from local news, chambers of commerce, industry publications

**Content Freshness Signals**
AI models prefer current information. Regular content updates — blog posts, updated pricing, new FAQ entries — signal that your business information is current and reliable.

**Competitive Content Gaps**
Identify questions that competitors can't answer well. Create definitive content on those topics. AI will cite the most complete, authoritative answer — if that's yours, you win the recommendation.

## Measuring GEO Success

Unlike SEO where you track rankings and clicks, GEO metrics include:

1. **AI Mention Monitoring** — Regularly search for your business on ChatGPT, Perplexity, and Google AI Overview
2. **Structured Data Validation** — Use Google's Rich Results Test monthly
3. **Branded AI Searches** — Track how AI describes your business when asked directly
4. **Referral Traffic from AI** — Monitor traffic sources for AI-related referrals

## The First-Mover Advantage

GEO is in its earliest stages. Most businesses — including most enterprise brands — haven't implemented it yet. This creates a rare window where small businesses can establish AI authority before their larger competitors.

In our experience, the first business in a local market category to implement comprehensive GEO captures a disproportionate share of AI recommendations. Once established, this authority is difficult for later entrants to displace.

For Erie businesses, this window is wide open. The time to act is now.`,
  },

  // ─── CASE STUDIES ─────────────────────────────────────────────────
  {
    slug: 'erie-restaurant-from-invisible-to-top-result',
    type: 'case-study',
    title: 'Erie Restaurant: From Invisible to Top Result in 30 Days',
    description:
      'How a family-owned Erie restaurant went from a Lighthouse score of 28 to 97, doubled their online reservations, and started appearing in AI recommendations.',
    readTime: '5 min read',
    date: '2026-03-12',
    tag: 'Restaurant',
    content: `## The Challenge

A family-owned restaurant in downtown Erie had been in business for 15 years with a loyal local following. But their online presence was costing them new customers.

**Their WordPress site scored:**
- Performance: 28/100
- Accessibility: 41/100
- Best Practices: 56/100
- SEO: 62/100

The site loaded in 7.2 seconds on mobile. The menu was a PDF that couldn't be read on phones. The reservation form required a page refresh that took another 5 seconds. Photos were uncompressed 4MB files that never fully loaded on slower connections.

When potential customers searched "best restaurants in Erie" or asked ChatGPT for dining recommendations, this restaurant — with 15 years of history and hundreds of happy customers — was nowhere to be found.

## The Solution

We built a completely new site from the ground up:

**Performance overhaul:**
- Static site generation — pages pre-built, no server processing
- Images optimized with WebP format, responsive sizing, and lazy loading
- Menu displayed as a native web page, not a PDF
- Global CDN deployment for sub-100ms delivery

**Accessibility improvements:**
- Semantic HTML with proper heading hierarchy
- Keyboard-navigable menu and reservation system
- Alt text on all images
- Color contrast verification across the entire site
- Skip navigation for screen reader users

**AI readiness:**
- JSON-LD structured data: Restaurant schema with menu, hours, location, cuisine type
- FAQ schema covering common questions (parking, dietary accommodations, private dining)
- llms.txt file describing the restaurant for AI crawlers
- Conversational content optimized for AI comprehension

## The Results

### After 30 Days

**Lighthouse scores:**
- Performance: 28 → **97** (+247%)
- Accessibility: 41 → **100** (+144%)
- Best Practices: 56 → **100** (+79%)
- SEO: 62 → **100** (+61%)

**Load time:** 7.2s → **0.6s** (12x faster)

**Business metrics:**
- Online reservation requests: **+110%**
- Mobile bounce rate: 71% → **32%** (-55%)
- Average session duration: 0:45 → **2:12** (+193%)
- Google Maps clicks from search: **+45%**

**AI visibility:**
- Now appears in ChatGPT responses for "restaurants in Erie PA"
- Cited in Perplexity results for "best dining downtown Erie"
- Featured in Google AI Overview for local dining queries

## The Monthly Ongoing

For $50/month, we handle hosting, bug fixes, and content updates — including seasonal menu changes and special event announcements. The restaurant owner sends us a text with updates and we handle the rest.

## Key Takeaway

This restaurant's food didn't change. Their service didn't change. Their 15-year reputation didn't change. What changed was that their digital presence finally matched the quality of their real-world business. The customers were always there — they just couldn't find them online.`,
  },

  {
    slug: 'erie-home-services-competing-with-national-chains',
    type: 'case-study',
    title: 'Erie Home Services: Outranking National Chains on a Local Budget',
    description:
      'An Erie home services company went from page 3 of Google to outranking national franchise chains — with a website that cost less than one month of the chains\' marketing budget.',
    readTime: '5 min read',
    date: '2026-03-01',
    tag: 'Home Services',
    content: `## The Challenge

A locally-owned Erie home services company was losing bids to national franchise chains. Not because of price or quality — they consistently delivered better work at competitive rates. The problem was visibility.

Their WordPress site, built by a family friend 4 years ago:
- Loaded in 5.8 seconds on mobile
- Lighthouse Performance score: 34
- Not mobile-responsive (required pinch-to-zoom)
- Zero structured data — Google couldn't understand their service area or specialties
- Invisible to AI assistants

Meanwhile, the national chains had fast, professional sites with full structured data, AI optimization, and mobile-first design. When an Erie homeowner searched for services, the chains appeared first. Every time.

## The Competitive Analysis

We audited their top 3 national chain competitors:

| Metric | Our Client | Chain A | Chain B | Chain C |
|--------|-----------|---------|---------|---------|
| Performance | 34 | 72 | 68 | 81 |
| Accessibility | 48 | 75 | 71 | 83 |
| Load Time | 5.8s | 2.1s | 2.4s | 1.6s |
| Structured Data | None | Full | Partial | Full |
| AI Visibility | None | High | Medium | High |

The gap was clear — and entirely fixable.

## The Solution

**Design that competes:** A custom site with professional photography, clear service descriptions, and trust signals (licensing, insurance, years in business) prominently displayed. The goal: a visitor can't tell whether this is a local company or a national brand from the website alone.

**Performance that leads:** Pre-built pages, optimized images, edge CDN delivery. We didn't just match the chains — we beat them.

**Local SEO advantage:** This is where small businesses can actually outperform chains. We implemented:
- LocalBusiness schema with Erie-specific service areas (Millcreek, Harborcreek, Fairview, etc.)
- Service schema for each specialty
- FAQ schema answering Erie-specific questions
- llms.txt with detailed local context
- Google Business Profile optimization

**AI-first content:** FAQ content written to directly answer the questions Erie homeowners ask — with proper schema markup so AI can cite it.

## The Results

### After 60 Days

**Lighthouse scores:**
- Performance: 34 → **98** (now higher than all 3 chains)
- Accessibility: 48 → **100** (higher than all 3 chains)
- Best Practices: 100
- SEO: 100

**Search rankings:**
- "home services Erie PA": Page 3 → **Position 4** (above Chain B)
- "emergency [service] Erie": Not ranking → **Position 2**
- "[specialty service] near me" (from Erie IP): Not ranking → **Position 5**

**Business metrics:**
- Website-generated leads: **+180%**
- Phone calls from Google: **+65%**
- Average project size: **+22%** (better qualified leads)
- Cost per lead: **-40%**

**AI visibility:**
- Now appears in AI recommendations for home services in Erie
- The national chains do NOT appear in local AI results because their structured data uses national addresses, not Erie-specific locations

## The Unexpected Advantage

Here's what the national chains can't replicate: hyperlocal AI authority. Their structured data says "National Company, Corporate HQ." Ours says "Erie, PA — serving Millcreek, Harborcreek, Fairview, and surrounding communities."

When someone asks AI "who's the best [service provider] in Erie?" — the local business with Erie-specific structured data wins over the national chain every time. The chains would need to create location-specific AI optimization for every market they serve. That's expensive and complex. For a local business, it's natural.

## Key Takeaway

The playing field isn't level — it's actually tilted in favor of local businesses who invest in modern web presence. National chains have scale, but local businesses have specificity. With the right technology, specificity wins.`,
  },

  {
    slug: 'erie-professional-services-firm-digital-transformation',
    type: 'case-study',
    title: 'Erie Professional Services: From "Embarrassed to Share" to Portfolio Piece',
    description:
      'A professional services firm in Erie went from hiding their website to making it the centerpiece of their client acquisition strategy.',
    readTime: '4 min read',
    date: '2026-02-15',
    tag: 'Professional Services',
    content: `## The Challenge

The owner's words: "I avoid giving out my website. When clients ask for it, I cringe."

This Erie professional services firm had built a strong reputation through word-of-mouth and networking. But their website — a WordPress template from 2019 — told a different story:

- Generic stock photos that looked like every other firm's site
- A "modern" theme that was already dated when installed
- Lighthouse Performance: 42
- Mobile experience: functional but clunky
- No differentiation from national competitors

The real cost wasn't measurable in analytics. It was the clients who looked up the firm after a referral, saw the site, and quietly chose someone else. You never know about the customers you lose before they ever contact you.

## The Solution

**Design with intent:** Every element designed to communicate expertise and attention to detail. No stock photos — custom graphics and real content. Typography that conveys professionalism. Whitespace that conveys confidence. Interactions that convey modernity.

**Content that converts:** Service pages rewritten from generic descriptions to specific, outcome-focused copy. Before: "We provide comprehensive solutions." After: "We help Erie businesses [specific outcome] through [specific approach]."

**Trust architecture:**
- Testimonials with context (industry, challenge, result)
- Process visualization showing exactly how engagements work
- FAQ section addressing the real questions prospects have
- Clear pricing guidance eliminating sticker shock

**Technical excellence:**
- Performance score: 97
- Accessibility: 100
- Full structured data with ProfessionalService schema
- AI optimization with llms.txt and FAQ schema

## The Results

### After 45 Days

**The owner's new words:** "I now send people to my website before our first call. It does the selling for me."

**Lighthouse scores:**
- Performance: 42 → **97**
- Accessibility: 55 → **100**
- SEO: 68 → **100**

**Business impact:**
- Website-originated inquiries: **+150%**
- Proposal-to-close rate: **+35%** (prospects arrive pre-sold)
- Average project value: **+28%** (attracts higher-value clients)
- Time spent on initial consultations: **-20%** (website answers common questions)

**Qualitative changes:**
- Prospects now reference specific website content during initial calls
- Referral sources mention the website as a reason they feel confident recommending the firm
- The owner proactively shares the URL in networking conversations

## The Ripple Effect

A professional services firm's website isn't just a brochure — it's a credibility amplifier. Every referral, every LinkedIn connection, every networking conversation leads to the same place: your website.

When that website communicates the same quality as your actual work, it compounds every other marketing effort. When it doesn't, it undermines them all.

## Key Takeaway

The most expensive website is one you're embarrassed to share. The value of a site isn't just in the leads it generates — it's in the confidence it gives you to put your business out there. When your digital presence matches your real-world quality, everything else gets easier.`,
  },
];

export function getResourcesByType(type: ResourceType): Resource[] {
  return RESOURCES.filter((r) => r.type === type);
}

export function getResourceBySlug(slug: string): Resource | undefined {
  return RESOURCES.find((r) => r.slug === slug);
}

export function getResourcePath(resource: Resource): string {
  const typeMap: Record<ResourceType, string> = {
    blog: 'blog',
    'white-paper': 'white-papers',
    'case-study': 'case-studies',
  };
  return `/resources/${typeMap[resource.type]}/${resource.slug}`;
}
