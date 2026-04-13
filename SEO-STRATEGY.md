# SEO Strategy: straywebdesign.co

**Target market:** Erie PA + surrounding NW PA (Meadville, Warren, Corry)
**Primary cluster:** "erie web design" and variants (~150-350 searches/month)
**Baseline (last 30 days):** 662 impressions, 6 clicks, 0.91% CTR, avg position 36.9
**Date:** April 2026

---

## Where We Stand

The site is live, indexed, and Google is starting to show it. But it's early. The important numbers:

- **Already ranking #1** for "website designer" (17 impr, 0 clicks) and "erie pennsylvania web developer" (9 impr, 0 clicks). Zero clicks = bad titles/descriptions or wrong intent match.
- **Position 2.8** for "website design" (17 impr) — close to page 1 visibility for a broad term.
- **The money cluster** ("erie web design", "web design erie pa", "erie pa web design", etc.) accounts for ~200 combined impressions but we're sitting at positions 48-72. That's page 5-7. Not visible yet, but the fact that Google is testing us there at all means the relevance signal exists.

**Competitive gap:** The top 3 (Werkbot, Snowberry, Epic Web) have years of domain authority and backlinks. But their technical SEO is mediocre — weak schema, no FAQ markup, generic meta descriptions. That's the gap we exploit.

---

## Phase 1: Technical Foundation (Week 1)

These are blocking issues. Nothing else matters until they're fixed.

### 1.1 Fix Sitemap Indexing — CRITICAL
**Problem:** 33 URLs submitted via sitemap, 0 indexed through it. Google is finding pages through crawling, not the sitemap.
**Action items:**
- [ ] Verify sitemap is valid XML at `https://straywebdesign.co/sitemap.xml`
- [ ] Re-submit sitemap in GSC after any changes
- [ ] Check GSC "Pages" report for crawl errors on sitemap URLs
- [ ] Ensure `robots.txt` has `Sitemap: https://straywebdesign.co/sitemap.xml`
- [ ] Wait 48-72 hours after submission, then check "Sitemaps" report for "Success" status

**Expected impact:** Google starts trusting the sitemap as the canonical URL list. Faster indexing of new pages.
**Priority:** P0

### 1.2 Fix www/non-www Split — CRITICAL
**Problem:** `www.straywebdesign.co` is getting separate impressions, splitting authority.
**Action items:**
- [ ] Add both `https://straywebdesign.co` and `https://www.straywebdesign.co` as properties in GSC
- [ ] Verify Vercel is 301-redirecting `www` to non-www (or vice versa — pick one, stick with it)
- [ ] Test: `curl -I https://www.straywebdesign.co` should return `301` with `Location: https://straywebdesign.co`
- [ ] If Vercel isn't redirecting, add redirect in `next.config.ts`:
  ```ts
  redirects: async () => [{
    source: '/:path*',
    has: [{ type: 'host', value: 'www.straywebdesign.co' }],
    destination: 'https://straywebdesign.co/:path*',
    permanent: true,
  }]
  ```
- [ ] Set preferred domain in GSC (Domain property covers both)

**Expected impact:** Consolidates all ranking signals to one domain. Could meaningfully improve position for competitive terms.
**Priority:** P0

### 1.3 Fix Internal Linking — Orphaned Location Pages
**Problem:** Location pages (`/locations/erie`, etc.) have zero internal links from the homepage. Google sees them as orphans.
**Action items:**
- [ ] Add "Areas We Serve" section to homepage with links to each location page
- [ ] Add location links to the footer (every page)
- [ ] Add "Locations" or "Areas We Serve" link to main navigation
- [ ] On each location page, add breadcrumbs: Home > Locations > Erie
- [ ] Cross-link between location pages ("Also serving Meadville, Warren...")

**Expected impact:** Google discovers and values location pages faster. Internal link equity flows from homepage (strongest page) to location pages.
**Priority:** P0

### 1.4 Fix Homepage H1
**Problem:** H1 had no keywords.
**Action items:**
- [ ] H1 should include "Web Design" and ideally "Erie" — something like "Web Design & Development for Erie Businesses" or "Erie Web Design That Converts"
- [ ] Keep it natural. Don't stuff. The H1 is a ranking signal but also the first thing visitors read.

**Expected impact:** Strengthens topical relevance signal for primary keyword cluster.
**Priority:** P0

### 1.5 Add /locations/erie to Sitemap
**Problem:** Was excluded. Already being fixed.
**Action items:**
- [ ] Confirm `/locations/erie` appears in sitemap output (it's in `LOCATIONS` array, should auto-generate)
- [ ] Request indexing in GSC for `/locations/erie` specifically

**Expected impact:** Primary money page gets properly submitted.
**Priority:** P0

---

## Phase 2: CTR Optimization (Week 2)

We're getting impressions but almost no clicks. That's a meta tag problem.

### 2.1 Rewrite Title Tags for Click-Through
**Problem:** Ranking #1 for "website designer" with 17 impressions and 0 clicks. The listing isn't compelling enough to click.

**Action items — rewrite these page titles:**

| Page | Current (likely) | Target Title |
|------|-----------------|-------------|
| Homepage | `Stray Web Design` | `Erie Web Design & Development - Stray Web Design` |
| /locations/erie | Generic | `Web Design in Erie, PA - Sites That Actually Convert` |
| /services | Generic | `Web Design Services - Custom Sites, SEO, & Paid Ads` |
| /book | Generic | `Book a Free Consultation - Stray Web Design` |

**Rules for title tags:**
- Primary keyword first, brand last
- Under 60 characters (Google truncates at ~60)
- Include a value prop or differentiator, not just keywords
- Every page title must be unique

**Priority:** P1

### 2.2 Write Meta Descriptions That Sell
**Action items:**
- [ ] Every page needs a unique meta description, 150-160 characters
- [ ] Include primary keyword naturally
- [ ] End with a call-to-action or value hook
- [ ] Homepage example: `Custom websites for Erie, PA businesses. Modern design, fast load times, built to convert visitors into customers. Free consultation available.`
- [ ] /locations/erie example: `Looking for a web designer in Erie, PA? We build fast, modern websites for local businesses. See our work and book a free call.`

**Expected impact:** CTR improvement from <1% to 3-5% would mean 20-30 clicks/month at current impression levels. As positions improve, this compounds.
**Priority:** P1

### 2.3 Add FAQ Schema to Homepage
**Problem:** 12 FAQ items exist on the site but no FAQ structured data. This is free real estate in SERPs.
**Action items:**
- [ ] Add `FAQPage` JSON-LD schema to the homepage (or wherever the FAQ section lives)
- [ ] Format:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much does a website cost in Erie PA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your answer here..."
        }
      }
    ]
  }
  ```
- [ ] Include keyword-rich questions: "How much does web design cost?", "How long does it take to build a website?", "Do I need SEO for my Erie business?"
- [ ] Test with Google's Rich Results Test tool

**Expected impact:** FAQ rich snippets take up more SERP real estate, dramatically improve CTR. None of the Erie competitors have this.
**Priority:** P1

### 2.4 Add LocalBusiness Schema
**Action items:**
- [ ] Add `LocalBusiness` (or `ProfessionalService`) JSON-LD to every page
- [ ] Include: name, url, telephone, address (even if it's just Erie, PA), areaServed, priceRange, image, sameAs (social links)
- [ ] Add `areaServed` with all target locations (Erie, Meadville, Warren, Corry)

**Expected impact:** Helps Google understand the business entity and connect it to local search. Competitors are weak here.
**Priority:** P1

### 2.5 Add BreadcrumbList Schema
**Action items:**
- [ ] Add `BreadcrumbList` JSON-LD to all nested pages (services/*, locations/*, resources/*)
- [ ] This helps Google show breadcrumb trails in search results instead of raw URLs

**Priority:** P2

---

## Phase 3: Content Authority (Weeks 3-6)

Google needs to see straywebdesign.co as a topical authority on web design in NW Pennsylvania. Right now the site is thin on unique content.

### 3.1 Blog Strategy — Publish 2 Posts/Week for 6 Weeks

**Target: 12 posts total.** Each post should be 800-1500 words, genuinely useful, and target a specific long-tail keyword.

**Priority posts (publish these first):**

1. **"How Much Does a Website Cost in Erie, PA? (2026 Guide)"**
   - Target: "website cost erie pa", "web design pricing"
   - No competitor publishes pricing. First-mover advantage.
   - Include actual price ranges, what affects cost, comparison table.

2. **"5 Signs Your Erie Business Needs a New Website"**
   - Target: "website redesign erie", "outdated website"
   - Soft sell. Educate and qualify leads.

3. **"Erie Web Design vs. DIY: Wix, Squarespace, or Custom?"**
   - Target: "wix vs custom website", "squarespace vs web designer"
   - Capture people researching alternatives.

4. **"Why Erie Businesses Are Losing Customers to Competitors With Better Websites"**
   - Target: "erie business website", local intent
   - Use real examples (anonymized). Link to location page.

5. **"What to Look for When Hiring a Web Designer in Erie"**
   - Target: "hire web designer erie pa"
   - Position yourself as the answer without being salesy.

6. **"SEO for Erie Small Businesses: What Actually Matters in 2026"**
   - Target: "seo erie pa", "small business seo"
   - Establishes authority on SEO, which is a service you sell.

**Second batch (weeks 5-6):**
- "Restaurant Website Must-Haves" (link to industry page)
- "Why Your Google Business Profile Isn't Getting Clicks"
- "The Real Cost of a Slow Website" (Core Web Vitals angle)
- "Erie's Bayfront Boom: Why New Businesses Need Websites Day One"
- "How We Built [Client]'s Website in 2 Weeks" (once you have a client)
- "Local SEO Checklist for Erie PA Businesses"

**Rules for every post:**
- [ ] Target one primary keyword per post
- [ ] Include the keyword in: H1, first paragraph, one H2, meta title, meta description
- [ ] Internal link to at least 2 other pages on the site
- [ ] Internal link FROM existing pages to new posts (update homepage, service pages)
- [ ] Add to sitemap (should be automatic if in /resources/blog/)

**Priority:** P1

### 3.2 Case Studies (Once You Have Clients)
**Action items:**
- [ ] Real case studies replace the hypothetical ones currently excluded from sitemap
- [ ] Format: Challenge > Approach > Results (with numbers)
- [ ] One case study per client, target "[industry] website design erie"
- [ ] Add case study schema (`CreativeWork` or `Article`)

**Priority:** P2 (blocked until real client work exists)

### 3.3 Add a "Web Design Process" Page
- [ ] `/process` or section on services page
- [ ] Target: "web design process", "how web design works"
- [ ] Step-by-step breakdown with timeline
- [ ] Builds trust, answers common pre-sale questions

**Priority:** P2

---

## Phase 4: Local SEO (Weeks 3-8)

This is where the Erie web design cluster gets cracked. Local SEO is the fastest path to page 1 for geo-modified queries.

### 4.1 Google Business Profile (GBP) — CRITICAL
**Action items:**
- [ ] Create or claim GBP for "Stray Web Design"
- [ ] Category: "Web Designer" (primary), "Internet Marketing Service" (secondary)
- [ ] Add all service areas: Erie, Meadville, Warren, Corry, Millcreek, Harborcreek, North East, Fairview
- [ ] Add business description with keywords (500+ characters)
- [ ] Upload 10+ photos: workspace, portfolio screenshots, headshot
- [ ] Add all services individually in GBP services section
- [ ] Link to `https://straywebdesign.co` (not www)
- [ ] Post weekly on GBP (repurpose blog content as GBP posts)
- [ ] Enable messaging

**Expected impact:** GBP is the #1 local ranking factor. Without one, you're invisible in map pack. With one, you can appear in the 3-pack for "web design erie pa" within weeks.
**Priority:** P0

### 4.2 Get Google Reviews — The Multiplier
**Problem:** Top competitor (Epic Web) has 25 reviews. That's beatable.
**Action items:**
- [ ] Ask every client for a Google review immediately after launch
- [ ] Create a direct review link: `https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID`
- [ ] Send follow-up email 1 week after site launch with the link
- [ ] Target: 5 reviews in first 3 months, 15 by month 6
- [ ] Respond to every review (signals active business to Google)
- [ ] Ask friends/family who you've helped with web stuff to leave honest reviews

**Expected impact:** Reviews are the second most important local ranking factor. Even 5 reviews with 5-star average will differentiate you.
**Priority:** P1

### 4.3 Directory Listings & Citations
**Problem:** Directory pages (Yelp, Expertise, DesignRush) are ranking on page 1 for "erie web design." Be on them.

**Submit to these directories (in priority order):**

| Directory | Why | Effort |
|-----------|-----|--------|
| Yelp | Ranks page 1 for target terms | 15 min |
| Google Business Profile | Already covered above | Done |
| Expertise.com | Ranks page 1, editorial "best of" lists | Submit and wait |
| DesignRush | Ranks page 1, design-specific | 20 min |
| Clutch.co | High DA, web design specific | 30 min |
| UpCity | Local service provider directory | 15 min |
| BBB (Better Business Bureau) | Trust signal, local authority | 30 min |
| Erie Regional Chamber | Local backlink, community signal | Membership required |
| Facebook Business Page | Citation + social signal | 20 min |
| LinkedIn Company Page | Citation + professional signal | 15 min |
| Apple Maps | Often overlooked citation source | 10 min |
| Bing Places | Free, mirrors GBP | 15 min |

**NAP consistency is critical:** Name, Address, Phone must be identical across every listing. Decide on the exact format now and never deviate.

**Expected impact:** Citations build local authority. Being listed where competitors are listed tells Google you belong in the same category.
**Priority:** P1

### 4.4 Location Page Optimization
**Action items:**
- [ ] `/locations/erie` needs to be the best page on the internet for "web design erie pa"
- [ ] Include: H1 with "Web Design in Erie, PA", local context (Bayfront, Peach Street, university references), testimonials from Erie clients, embedded Google Map, FAQ specific to Erie businesses
- [ ] Add `LocalBusiness` schema specific to Erie service area
- [ ] Internal link from every blog post that mentions Erie
- [ ] Target 1000+ words of unique, genuinely useful content (not keyword stuffing)

**Priority:** P1

---

## Phase 5: Link Building (Ongoing)

Backlinks are the hardest part. The competitors have years of accumulated links. Here's how to close the gap without spammy tactics.

### 5.1 Local PR & Community
**Action items:**
- [ ] Write for Erie Reader or GoErie as a guest contributor (topic: "Why Erie Businesses Need Better Websites")
- [ ] Sponsor or participate in a local tech/startup event (Erie Innovation District, Radius CoWork events)
- [ ] Offer to judge or mentor at a local hackathon (Gannon, Mercyhurst, PSU Behrend)
- [ ] Get featured in "new business" roundups (Erie Times-News, Erie Reader)

**Expected impact per link:** Local .edu and news site links are extremely valuable. One link from goerie.com or a .edu domain is worth more than 50 directory links.
**Priority:** P2

### 5.2 Non-Local Agency Strategy
**Problem:** FreshySites and Tortoise & Hare (non-local agencies) rank for "erie web design" purely with location pages. We can outrank them because we're actually here.
**Action items:**
- [ ] Our `/locations/erie` page needs more depth, more local signals, more internal links than their generic location pages
- [ ] Add real Erie photos, reference real local businesses (with permission), mention specific neighborhoods
- [ ] The non-local agencies can't do this. That's the advantage.

**Priority:** P1

### 5.3 Resource Link Building
**Action items:**
- [ ] Create a genuinely useful free resource (e.g., "Website Launch Checklist for Small Businesses" PDF)
- [ ] Share it in local business Facebook groups (Erie Small Business Network, etc.)
- [ ] Offer it as a lead magnet on the site
- [ ] If it's good enough, people link to it naturally

**Priority:** P3

### 5.4 Partner Cross-Links
**Action items:**
- [ ] Build relationships with complementary local businesses: photographers, copywriters, marketing consultants, print shops
- [ ] Offer to list them as recommended partners on your site if they do the same
- [ ] These are natural, relevant, local backlinks — exactly what Google wants to see

**Priority:** P2

---

## Tracking & KPIs

Check these weekly in GSC:

| Metric | Current | 30-Day Target | 90-Day Target |
|--------|---------|---------------|---------------|
| Total impressions | 662/mo | 1,200/mo | 3,000/mo |
| Total clicks | 6/mo | 25/mo | 100/mo |
| CTR | 0.91% | 3% | 4% |
| Avg position | 36.9 | 25 | 15 |
| "erie web design" cluster position | 48-72 | 30-40 | 10-20 |
| Indexed pages (via sitemap) | 0 | 33 | 40+ |
| Google reviews | 0 | 3 | 10 |

**Monthly check-ins:**
- [ ] GSC performance report (compare to previous month)
- [ ] New pages indexed?
- [ ] Any manual actions or crawl errors?
- [ ] Review count and average rating
- [ ] New backlinks (check in GSC > Links)
- [ ] Position changes for "erie web design" cluster

---

## Quick Reference: What Moves the Needle Most

Ranked by expected impact per hour of effort:

1. **Google Business Profile setup** — 1 hour, unlocks map pack
2. **Fix www redirect** — 15 minutes, consolidates authority
3. **Internal links to location pages** — 30 minutes, fixes orphan problem
4. **FAQ schema** — 30 minutes, free rich snippets (competitors don't have this)
5. **Rewrite meta titles & descriptions** — 1 hour, improves CTR on existing impressions
6. **Homepage H1 fix** — 5 minutes, strengthens primary signal
7. **Directory listings (top 5)** — 2 hours, local citation authority
8. **First blog post (pricing guide)** — 3 hours, captures high-intent long-tail
9. **LocalBusiness schema** — 30 minutes, structured data advantage
10. **Ask for reviews** — 5 minutes each, compounds over time

---

## Non-Obvious Things Worth Noting

- **Competitors are beatable.** Werkbot has been around since 2004 but their technical SEO is average. Epic Web's 25 reviews are good but not insurmountable. Nobody has FAQ schema. Nobody publishes pricing. The bar is lower than it looks.

- **The non-local agencies ranking for "erie web design" are vulnerable.** They rank with thin location pages and zero local signals. A genuinely local business with a deep Erie page, GBP, reviews, and local backlinks will outrank them once Google has enough signal.

- **Position 48-72 is actually promising.** It means Google already associates the site with "erie web design" queries. The relevance is there — what's missing is authority (backlinks, reviews, age). Authority is built, not optimized. Every phase above adds authority.

- **CTR at position 1 with 0 clicks** means the title/description don't match the searcher's intent, or the query is too broad. Fix the meta tags and monitor — if clicks don't come, the traffic on those terms might not be worth chasing.

- **The 264 intersection pages** (location + industry combos) are a long-term asset. Keep them out of the sitemap for now. Once the domain has authority, selectively submit the best ones. They'll capture ultra-specific queries like "restaurant web design meadville pa" that no competitor targets.
