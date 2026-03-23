export interface Service {
  readonly slug: string;
  readonly name: string;
  readonly shortName: string;
  readonly description: string;
  readonly longDescription: string;
  readonly features: readonly { readonly title: string; readonly description: string }[];
  readonly benefits: readonly { readonly stat: string; readonly label: string }[];
  readonly process: readonly {
    readonly step: number;
    readonly title: string;
    readonly description: string;
  }[];
  readonly faqs: readonly { readonly question: string; readonly answer: string }[];
  readonly keywords: readonly string[];
  readonly relatedServices: readonly string[];
  readonly architecture?: readonly {
    readonly icon: string;
    readonly title: string;
    readonly description: string;
  }[];
}

export const SERVICES = [
  {
    slug: "website-design",
    name: "Custom Website Design",
    shortName: "Web Design",
    description:
      "Hand-coded, enterprise-grade websites built with Next.js — not WordPress templates. Sub-1-second load times, WCAG AA accessibility, and mobile-first design that converts visitors into customers.",
    longDescription:
      "Your website is the first impression most customers will ever have of your business. 75% of users judge a company's credibility by its website design — and 53% of mobile users abandon sites that take longer than 3 seconds to load. We build hand-coded websites with Next.js that load in under 1 second, score 95+ on Google Lighthouse, and are designed mobile-first from pixel one. No WordPress. No page builders. No bloated plugins slowing you down. Just clean, fast, conversion-focused code that makes your business look as good online as it is in person.",
    features: [
      {
        title: "Next.js Architecture",
        description:
          "Built on the same framework used by Nike, Hulu, and TikTok. Server-side rendering for instant load times and superior SEO performance out of the box.",
      },
      {
        title: "Mobile-First Design",
        description:
          "60% of web traffic is mobile. Every site starts as a mobile design and scales up — not the other way around. No pinch-zooming, no broken layouts.",
      },
      {
        title: "WCAG AA Accessibility",
        description:
          "Proper contrast ratios, semantic HTML, keyboard navigation, and screen reader support. Reach every customer and reduce legal liability.",
      },
      {
        title: "Sub-1s Load Times",
        description:
          "Image optimization, code splitting, edge caching, and zero render-blocking resources. Your site loads before competitors' sites even start painting.",
      },
      {
        title: "Conversion-Optimized",
        description:
          "Strategic CTA placement, clear visual hierarchy, trust signals, and friction-free contact forms. Every design decision is backed by conversion data.",
      },
      {
        title: "SEO-Ready Foundation",
        description:
          "Clean URL structure, JSON-LD schema markup, meta tags, Open Graph, sitemap generation, and Core Web Vitals optimization baked into every build.",
      },
      {
        title: "CMS Integration",
        description:
          "Edit your own content without touching code. We integrate headless CMS solutions so you can update text, images, and pages on your own terms.",
      },
      {
        title: "Analytics Built In",
        description:
          "Google Analytics 4, conversion tracking, and performance monitoring from day one. Know exactly how your site is performing without guessing.",
      },
    ],
    benefits: [
      { stat: "95+", label: "Lighthouse Score" },
      { stat: "< 1s", label: "Load Time" },
      { stat: "3x", label: "More Conversions" },
      { stat: "100%", label: "Mobile Optimized" },
    ],
    process: [
      {
        step: 1,
        title: "Discovery & Strategy",
        description:
          "We audit your current site, analyze competitors, and define goals. You get a clear strategy document before any design work begins.",
      },
      {
        step: 2,
        title: "Design & Prototype",
        description:
          "High-fidelity mockups in Figma with full interaction design. You see and approve every screen before a single line of code is written.",
      },
      {
        step: 3,
        title: "Development & Testing",
        description:
          "Hand-coded in Next.js with rigorous cross-browser and device testing. Performance audits at every milestone to guarantee speed.",
      },
      {
        step: 4,
        title: "Launch & Optimize",
        description:
          "Deployed to edge servers worldwide with SSL, DNS configuration, and post-launch monitoring. We watch the data and fine-tune for the first 30 days.",
      },
    ],
    faqs: [
      {
        question: "Why not use WordPress like everyone else?",
        answer:
          "WordPress powers 43% of the web — and that is exactly the problem. It is slow, requires constant plugin updates, and is the #1 target for hackers. Our Next.js sites load 3-5x faster, need zero plugin maintenance, and are inherently more secure. Your competitors are on WordPress. That is your advantage.",
      },
      {
        question: "How long does a custom website take?",
        answer:
          "Most projects launch in 4-6 weeks from kickoff to go-live. Complex sites with custom integrations may take 8-10 weeks. We give you a firm timeline during discovery and stick to it.",
      },
      {
        question: "What does a custom website cost?",
        answer:
          "Projects start at $2,500 for a clean, fast, conversion-focused site. Larger projects with e-commerce, custom apps, or complex integrations scale from there. Every dollar goes into code that works — not template markup.",
      },
      {
        question: "Can I edit the site myself after launch?",
        answer:
          "Yes. We integrate a headless CMS that lets you update text, images, blog posts, and pages without touching code. You get a clean editing interface — no wrestling with page builders.",
      },
      {
        question: "What about hosting and maintenance?",
        answer:
          "We offer a $100/month management plan that covers hosting, SSL, performance monitoring, security updates, content edits, and priority support. Or you can self-host — we hand over everything.",
      },
    ],
    keywords: [
      "custom website design Erie PA",
      "Next.js web development",
      "fast website design",
      "mobile-first web design",
      "small business website Erie",
      "professional web design Pennsylvania",
      "hand-coded website",
      "conversion-focused web design",
      "WCAG accessible website",
      "enterprise web design Erie",
    ],
    relatedServices: ["seo-optimization", "landing-pages", "website-management"],
  },
  {
    slug: "ai-receptionist",
    name: "AI Receptionist",
    shortName: "AI Receptionist",
    description:
      "A 24/7 AI-powered phone system that answers calls, qualifies leads, books appointments, and sends missed-call text-backs — so you never lose a customer to voicemail again.",
    longDescription:
      "62% of calls to small businesses go unanswered. Every missed call is a lost customer walking straight to your competitor. Our AI Receptionist answers every call instantly with natural, human-like conversation — qualifying leads, booking appointments, answering FAQs, and texting back missed callers automatically. It works nights, weekends, and holidays without breaks, sick days, or overtime pay. Your customers get instant service. You get qualified leads delivered to your inbox. No more playing phone tag. No more losing business at 8 PM on a Tuesday.",
    features: [
      {
        title: "24/7 Live Answering",
        description:
          "Every call answered on the first ring, every hour of every day. No hold music, no voicemail, no missed opportunities — even at 2 AM on a holiday.",
      },
      {
        title: "Natural Conversations",
        description:
          "Advanced AI that sounds human, not robotic. It handles interruptions, follow-up questions, and complex requests the way a trained receptionist would.",
      },
      {
        title: "Lead Qualification",
        description:
          "Asks the right questions to separate tire-kickers from real prospects. You only spend time on leads that are ready to buy.",
      },
      {
        title: "Appointment Booking",
        description:
          "Integrates with your calendar to book appointments in real time. Customers pick a slot, get a confirmation, and show up — no back-and-forth.",
      },
      {
        title: "Missed Call Text-Back",
        description:
          "If a call is missed or drops, the system immediately texts the caller with a personalized response. 90% of people read a text within 3 minutes.",
      },
      {
        title: "Call Summaries & Transcripts",
        description:
          "Every call is transcribed and summarized. You get an instant notification with who called, what they need, and how urgent it is.",
      },
      {
        title: "Custom Training",
        description:
          "We train the AI on your business — services, pricing, hours, FAQs, tone of voice. It represents your brand, not a generic call center.",
      },
      {
        title: "CRM Integration",
        description:
          "New leads flow directly into your CRM or inbox. No manual data entry. No leads falling through the cracks.",
      },
    ],
    benefits: [
      { stat: "24/7", label: "Availability" },
      { stat: "0", label: "Missed Calls" },
      { stat: "< 1s", label: "Answer Time" },
      { stat: "85%", label: "Lead Capture Rate" },
    ],
    process: [
      {
        step: 1,
        title: "Business Intake",
        description:
          "We learn your business inside out — services, pricing, common questions, booking rules, and how you want calls handled. This powers the AI training.",
      },
      {
        step: 2,
        title: "AI Configuration",
        description:
          "We build your custom AI receptionist with your business knowledge, voice preferences, and call flow logic. Every response is tailored to your brand.",
      },
      {
        step: 3,
        title: "Testing & Refinement",
        description:
          "We run real-world test calls across dozens of scenarios — edge cases, difficult questions, accent variations — and refine until it handles everything smoothly.",
      },
      {
        step: 4,
        title: "Launch & Monitor",
        description:
          "Go live with your existing phone number. We monitor call quality for the first 30 days and continuously improve based on real interaction data.",
      },
    ],
    faqs: [
      {
        question: "Does it sound like a robot?",
        answer:
          "No. Modern AI voice technology produces natural, conversational speech with appropriate pacing, tone, and inflection. Most callers do not realize they are speaking with AI. We fine-tune the voice to match your brand personality.",
      },
      {
        question: "Can it handle complex questions?",
        answer:
          "It handles the questions your front desk gets 50 times a day — pricing, hours, services, availability, directions. For truly complex situations, it seamlessly transfers to your team or takes a detailed message.",
      },
      {
        question: "What if I already have a receptionist?",
        answer:
          "The AI handles overflow, after-hours, and weekends — the times your human team cannot cover. It is not a replacement, it is backup that ensures zero calls are ever missed.",
      },
      {
        question: "How quickly can this be set up?",
        answer:
          "Most businesses are live within 5-7 business days. We handle everything — business intake, AI training, phone system configuration, and testing. Minimal effort on your end.",
      },
      {
        question: "What does it cost compared to a human receptionist?",
        answer:
          "A full-time receptionist costs $30,000-$40,000/year plus benefits. Our AI Receptionist runs a fraction of that, works 24/7, never calls in sick, and scales instantly during high-volume periods.",
      },
    ],
    keywords: [
      "AI receptionist Erie PA",
      "AI phone answering service",
      "automated appointment booking",
      "missed call text back",
      "24/7 business phone answering",
      "AI virtual receptionist",
      "lead qualification automation",
      "small business phone system",
      "after hours answering service",
      "AI call handling",
    ],
    relatedServices: ["website-design", "analytics-setup", "website-management"],
    architecture: [
      {
        icon: "phone-incoming",
        title: "Instant Caller Recognition",
        description:
          "The moment a call comes in, the system matches the phone number against your customer database. Returning customers are recognized before the AI says hello — their name, history, preferences, and past appointments are already loaded into the conversation.",
      },
      {
        icon: "database",
        title: "Your Business Knowledge Base",
        description:
          "Your entire operation — services, pricing tiers, staff bios, hours, policies, common questions — is structured into a custom knowledge base that the AI draws from in real time. Not a generic script. Every answer comes from YOUR business data.",
      },
      {
        icon: "user-round-search",
        title: "Living Customer Profiles",
        description:
          "Every caller gets a profile that grows with each interaction. Contact info, full call transcripts, appointment history, preferences, internal notes. When Sarah calls back three weeks later, the AI remembers she prefers Tuesdays at 2 PM with Dr. Miller.",
      },
      {
        icon: "mouse-pointer-click",
        title: "Website Behavior Context",
        description:
          "When connected to your website, the AI knows what pages a caller browsed before picking up the phone. Someone visited your emergency plumbing page at 11 PM and then called? The AI opens with 'Are you calling about an emergency?' — not a generic greeting.",
      },
      {
        icon: "calendar-check",
        title: "Live Calendar + Booking",
        description:
          "A direct API connection to your scheduling system means the AI checks real-time availability, books the slot, sends a text confirmation to the customer, and adds it to your calendar. No double-booking. No phone tag. Done in 30 seconds.",
      },
      {
        icon: "arrow-down-to-line",
        title: "CRM Pipeline Integration",
        description:
          "New leads auto-create in your CRM with full context — what they asked about, contact info, a conversation-based lead score, and a link to the call recording. Your sales pipeline fills itself. Nothing is manually entered. Nothing falls through.",
      },
      {
        icon: "trending-up",
        title: "Gets Smarter Every Week",
        description:
          "We review call transcripts, identify knowledge gaps, and refine the AI's responses on an ongoing basis. The more calls it handles for your specific business, the sharper it gets. Month three is a different system than month one.",
      },
    ],
  },
  {
    slug: "seo-optimization",
    name: "SEO & GEO Optimization",
    shortName: "SEO & GEO",
    description:
      "Rank on Google and get recommended by AI assistants. We combine traditional SEO with Generative Engine Optimization — JSON-LD, llms.txt, FAQ schema, and local SEO that puts you in front of customers however they search.",
    longDescription:
      "SEO is no longer just about Google. 40% of Gen Z uses TikTok and AI chatbots as their primary search tool. When someone asks ChatGPT or Gemini 'best restaurant in Erie' or 'web designer near me,' your business needs to show up. We do traditional SEO — technical audits, keyword strategy, backlink building, local pack optimization — and layer on Generative Engine Optimization (GEO). That means structured data, llms.txt files, FAQ schema, and content architecture that AI systems can parse and recommend. Your competitors are optimizing for one search engine. We optimize for all of them.",
    features: [
      {
        title: "Technical SEO Audit",
        description:
          "Crawl-level analysis of site speed, indexation, broken links, redirect chains, canonical tags, and Core Web Vitals. We find every issue holding your rankings back.",
      },
      {
        title: "Generative Engine Optimization",
        description:
          "Structured data, llms.txt, FAQ schema, and content formatting that AI assistants like ChatGPT, Gemini, and Perplexity can parse and cite. Get recommended, not just ranked.",
      },
      {
        title: "Local SEO & Google Business",
        description:
          "Google Business Profile optimization, local citation building, review management, and geo-targeted content. Dominate the local map pack in Erie and surrounding areas.",
      },
      {
        title: "Keyword Strategy",
        description:
          "Data-driven keyword research targeting high-intent, low-competition terms your competitors are ignoring. We prioritize keywords that drive revenue, not just traffic.",
      },
      {
        title: "JSON-LD Schema Markup",
        description:
          "Rich snippets, FAQ dropdowns, business info, and product schema that make your listings stand out in search results and feed AI systems accurate data.",
      },
      {
        title: "Content Optimization",
        description:
          "Existing pages rewritten for search intent, readability, and conversion. New content strategy targeting gaps in your competitors' coverage.",
      },
      {
        title: "Backlink Building",
        description:
          "White-hat link acquisition from relevant, authoritative sources. Local directories, industry publications, and strategic partnerships that build real domain authority.",
      },
      {
        title: "Monthly Reporting",
        description:
          "Clear, jargon-free monthly reports showing rankings, traffic, conversions, and ROI. You see exactly where your money is going and what it is producing.",
      },
    ],
    benefits: [
      { stat: "3x", label: "Organic Traffic" },
      { stat: "Top 3", label: "Local Rankings" },
      { stat: "50+", label: "Keywords Ranked" },
      { stat: "200%", label: "ROI Average" },
    ],
    process: [
      {
        step: 1,
        title: "Audit & Benchmark",
        description:
          "Full technical SEO audit, competitor analysis, and keyword gap research. We establish your current baseline so every improvement is measurable.",
      },
      {
        step: 2,
        title: "Strategy & Roadmap",
        description:
          "Prioritized action plan targeting quick wins first, then long-term authority building. You approve the strategy before we touch anything on your site.",
      },
      {
        step: 3,
        title: "Implementation",
        description:
          "Technical fixes, schema markup, content optimization, GEO implementation, and local SEO setup. We handle everything — you do not need a developer on staff.",
      },
      {
        step: 4,
        title: "Monitor & Iterate",
        description:
          "Weekly rank tracking, monthly reporting, and quarterly strategy reviews. SEO is a moving target — we adapt as algorithms and AI systems evolve.",
      },
    ],
    faqs: [
      {
        question: "What is Generative Engine Optimization (GEO)?",
        answer:
          "GEO is SEO for AI. When someone asks ChatGPT, Gemini, or Perplexity a question, those systems pull from structured web data to generate answers. GEO ensures your business data is structured so AI systems can find, understand, and recommend you.",
      },
      {
        question: "How long until I see results?",
        answer:
          "Technical fixes and local SEO improvements often show results within 2-4 weeks. Keyword rankings typically improve within 2-3 months. Significant organic traffic growth happens in the 4-6 month range. SEO compounds — the longer you invest, the stronger the returns.",
      },
      {
        question: "Do I need a new website for SEO to work?",
        answer:
          "Not necessarily. We can optimize your existing site if it has a solid foundation. However, if your site is built on slow, bloated technology, the ROI on a rebuild often outweighs patching an outdated platform.",
      },
      {
        question: "What is the difference between SEO and paid ads?",
        answer:
          "Paid ads stop working the moment you stop paying. SEO builds an asset — organic rankings that generate traffic for months and years after the initial investment. The best strategy uses both, but SEO delivers the highest long-term ROI.",
      },
      {
        question: "Do you guarantee first page rankings?",
        answer:
          "Anyone who guarantees specific rankings is lying to you. Google's algorithm uses 200+ ranking factors that change constantly. What we guarantee is measurable improvement — better rankings, more traffic, and more leads, tracked transparently every month.",
      },
    ],
    keywords: [
      "SEO optimization Erie PA",
      "generative engine optimization",
      "local SEO Erie Pennsylvania",
      "GEO optimization",
      "AI search optimization",
      "Google Business Profile optimization",
      "JSON-LD schema markup",
      "small business SEO",
      "llms.txt implementation",
      "SEO and GEO agency",
    ],
    relatedServices: ["website-design", "landing-pages", "analytics-setup"],
  },
  {
    slug: "website-management",
    name: "Website Management",
    shortName: "Management",
    description:
      "Hosting, support, SEO monitoring, content updates, analytics, and ad-ready infrastructure — all for $100/month. Your site stays fast, secure, and performing without you lifting a finger.",
    longDescription:
      "Building a great website is only half the battle. Without ongoing maintenance, sites degrade — plugins break, security vulnerabilities appear, content goes stale, and performance drops. 43% of small business websites have not been updated in over a year. Our $100/month management plan covers everything: hosting on edge servers worldwide, SSL certificates, daily backups, security monitoring, content updates, SEO performance tracking, and priority support. You focus on running your business. We make sure your website keeps working as hard as you do.",
    features: [
      {
        title: "Edge Hosting",
        description:
          "Your site served from 30+ global edge locations. Visitors get sub-100ms response times regardless of location. 99.99% uptime guaranteed.",
      },
      {
        title: "Security Monitoring",
        description:
          "Automated vulnerability scanning, SSL certificate management, and DDoS protection. No WordPress plugins to hack. No attack surface to exploit.",
      },
      {
        title: "Content Updates",
        description:
          "Need text changed, images swapped, or a new page added? Send us a message and it is done — usually within 24 hours. No hourly billing surprises.",
      },
      {
        title: "Performance Monitoring",
        description:
          "Continuous Lighthouse audits, Core Web Vitals tracking, and uptime monitoring. We catch performance regressions before your customers notice.",
      },
      {
        title: "SEO Monitoring",
        description:
          "Monthly ranking snapshots, traffic trends, and search console analysis. We flag drops early and fix technical SEO issues before they tank your rankings.",
      },
      {
        title: "Analytics Dashboard",
        description:
          "Clean, simple analytics showing visits, conversions, top pages, and traffic sources. No data overload — just the numbers that matter for your business.",
      },
      {
        title: "Daily Backups",
        description:
          "Automated daily backups with one-click restore. If anything goes wrong, we roll back in minutes — not hours or days.",
      },
      {
        title: "Ad-Ready Infrastructure",
        description:
          "Conversion tracking pixels, landing page support, and UTM parameter handling pre-configured. When you are ready to run ads, your site is already set up.",
      },
    ],
    benefits: [
      { stat: "$100", label: "Per Month" },
      { stat: "99.99%", label: "Uptime" },
      { stat: "< 24hr", label: "Support Response" },
      { stat: "Daily", label: "Backups" },
    ],
    process: [
      {
        step: 1,
        title: "Onboarding",
        description:
          "We migrate your site to our infrastructure, set up monitoring, configure backups, and establish your support channel. Zero downtime during transition.",
      },
      {
        step: 2,
        title: "Baseline Audit",
        description:
          "Full performance and security audit on day one. We document your site's health and fix any existing issues before ongoing management begins.",
      },
      {
        step: 3,
        title: "Ongoing Management",
        description:
          "Monthly performance reports, proactive maintenance, content updates on request, and continuous monitoring. Everything handled — you just review the reports.",
      },
      {
        step: 4,
        title: "Quarterly Review",
        description:
          "Every 90 days we review analytics, SEO trends, and conversion data together. We recommend improvements and plan the next quarter's priorities.",
      },
    ],
    faqs: [
      {
        question: "What is included in the $100/month?",
        answer:
          "Hosting, SSL, daily backups, security monitoring, performance monitoring, SEO tracking, content updates, analytics, and priority support. It covers everything you need to keep your site running and performing.",
      },
      {
        question: "Can I cancel anytime?",
        answer:
          "Yes. No contracts, no cancellation fees. We earn your business every month. If you leave, we hand over all your code, content, and data — it is yours.",
      },
      {
        question: "What if I need a major redesign or new features?",
        answer:
          "The management plan covers routine updates and content changes. Major redesigns, new pages, or feature additions are quoted separately at project rates. Management clients get priority scheduling and discounted rates.",
      },
      {
        question: "Do you manage sites you did not build?",
        answer:
          "We manage Next.js and modern JavaScript sites. If your site is on WordPress or another platform, we can discuss migration options to bring it onto our stack first.",
      },
      {
        question: "How do I request content updates?",
        answer:
          "Email, text, or message us — whatever is easiest. Describe the change, and we handle it. Most updates are live within 24 hours. Urgent requests are handled same-day.",
      },
    ],
    keywords: [
      "website management Erie PA",
      "website maintenance plan",
      "managed website hosting",
      "website support service",
      "small business website management",
      "website care plan",
      "monthly website maintenance",
      "website hosting and support",
      "SEO monitoring service",
      "website backup service",
    ],
    relatedServices: ["website-design", "seo-optimization", "analytics-setup"],
  },
  {
    slug: "landing-pages",
    name: "Landing Page Design",
    shortName: "Landing Pages",
    description:
      "High-converting campaign pages built for Google and Meta ads. Optimized for specific keywords, blazing fast load times, and clear CTAs that turn ad clicks into customers.",
    longDescription:
      "You are spending money driving traffic with ads. Where that traffic lands determines whether you get customers or burn budget. The average landing page converts at 2.35% — the top 10% convert at 11.45% or higher. The difference is not luck, it is design. We build single-purpose landing pages hand-coded for speed, optimized for your target keywords, and structured around one clear conversion action. No navigation distractions. No generic templates. Every element — headline, social proof, CTA placement, form design — is engineered to convert the specific audience your ads are targeting.",
    features: [
      {
        title: "Keyword-Optimized Copy",
        description:
          "Headlines, body copy, and meta tags aligned with your ad campaign keywords. Message match between ad and landing page improves Quality Score and cuts cost-per-click.",
      },
      {
        title: "Sub-Second Load Times",
        description:
          "Every 1-second delay in page load reduces conversions by 7%. Our pages load in under 1 second on mobile — keeping every ad dollar working.",
      },
      {
        title: "Conversion-Focused Layout",
        description:
          "Single CTA, zero navigation, above-the-fold value proposition, trust signals, and urgency elements. No distractions between your ad click and your conversion.",
      },
      {
        title: "A/B Testing Ready",
        description:
          "Multiple variants built from day one so you can test headlines, CTAs, images, and layouts. Data decides what works — not guesswork.",
      },
      {
        title: "Mobile-First Design",
        description:
          "70%+ of ad clicks happen on mobile. Every landing page is designed for thumb-friendly interaction, fast load on cellular, and frictionless form completion.",
      },
      {
        title: "Tracking & Attribution",
        description:
          "Google Ads, Meta Pixel, conversion API, UTM parameters, and call tracking pre-configured. Know exactly which ads drive which conversions.",
      },
      {
        title: "Social Proof Integration",
        description:
          "Reviews, testimonials, trust badges, and client logos placed strategically to build credibility at the exact moment visitors are deciding.",
      },
      {
        title: "Form Optimization",
        description:
          "Minimal fields, smart defaults, inline validation, and multi-step forms that reduce friction. Every unnecessary field costs you 5-10% of submissions.",
      },
    ],
    benefits: [
      { stat: "11%+", label: "Conversion Rate" },
      { stat: "< 1s", label: "Load Time" },
      { stat: "40%", label: "Lower CPA" },
      { stat: "3x", label: "ROAS Improvement" },
    ],
    process: [
      {
        step: 1,
        title: "Campaign Alignment",
        description:
          "We analyze your ad campaigns, target audience, and conversion goals. The landing page strategy is built around your specific ads — not the other way around.",
      },
      {
        step: 2,
        title: "Copy & Design",
        description:
          "Persuasive copy and conversion-focused design tailored to your audience. Every element is purposeful — headline, subhead, proof, CTA, form.",
      },
      {
        step: 3,
        title: "Build & Integrate",
        description:
          "Hand-coded for speed with full tracking integration. Google Ads, Meta Pixel, analytics, and conversion events all firing correctly before launch.",
      },
      {
        step: 4,
        title: "Test & Optimize",
        description:
          "Launch with A/B variants, monitor conversion data, and iterate. We optimize based on real performance — not assumptions.",
      },
      {
        step: 5,
        title: "Scale",
        description:
          "Once we find the winning formula, we replicate it across campaigns. New ad groups get purpose-built pages that maintain high conversion rates.",
      },
    ],
    faqs: [
      {
        question: "Why not just send ad traffic to my homepage?",
        answer:
          "Homepages serve multiple purposes and multiple audiences. Landing pages serve one purpose for one audience. Studies show dedicated landing pages convert 2-5x better than homepages for paid traffic because there are no distractions from the conversion action.",
      },
      {
        question: "How many landing pages do I need?",
        answer:
          "One per ad group or campaign theme. If you are running ads for three different services, you need three landing pages — each with messaging that matches the specific ad the visitor clicked.",
      },
      {
        question: "Can you write the ad copy too?",
        answer:
          "We focus on landing page copy and design. However, we collaborate closely with your ad team (or ad agency) to ensure perfect message match between ads and landing pages.",
      },
      {
        question: "How do you measure success?",
        answer:
          "Conversion rate, cost per acquisition, and return on ad spend. We track every form submission, phone call, and click — then optimize based on the numbers that affect your bottom line.",
      },
      {
        question: "What if my landing page is not converting?",
        answer:
          "We monitor performance and iterate. Low conversions mean we test new headlines, restructure the page, adjust the offer, or refine targeting. The first version is a hypothesis — data tells us how to improve.",
      },
    ],
    keywords: [
      "landing page design Erie PA",
      "high converting landing page",
      "Google Ads landing page",
      "Meta ads landing page",
      "PPC landing page design",
      "campaign landing page",
      "conversion rate optimization",
      "landing page optimization",
      "lead generation landing page",
      "ad campaign page design",
    ],
    relatedServices: ["website-design", "analytics-setup", "seo-optimization"],
  },
  {
    slug: "analytics-setup",
    name: "Analytics & Tracking Setup",
    shortName: "Analytics",
    description:
      "Google Analytics 4, conversion tracking, heatmaps, and session replay — configured correctly from day one. Stop guessing what works and start making decisions backed by real user data.",
    longDescription:
      "Most small businesses either have no analytics, broken analytics, or analytics they never look at. 74% of businesses say they are 'data-driven' but only 29% actually connect analytics to decision-making. We set up GA4, conversion tracking, heatmaps, and session replay so you can see exactly what visitors do on your site — where they click, where they scroll, where they leave, and what makes them convert. No vanity metrics. No dashboards you will never check. Just the specific data points that answer the questions your business actually needs answered.",
    features: [
      {
        title: "Google Analytics 4 Setup",
        description:
          "Properly configured GA4 with custom events, conversion goals, audience segments, and attribution modeling. Not the default install — a setup tailored to your business.",
      },
      {
        title: "Conversion Tracking",
        description:
          "Every form submission, phone call, button click, and purchase tracked as a conversion event. Know exactly which pages and traffic sources drive revenue.",
      },
      {
        title: "Heatmap Analysis",
        description:
          "Visual maps showing where users click, scroll, and hover. See which parts of your pages get attention and which are ignored — then redesign accordingly.",
      },
      {
        title: "Session Replay",
        description:
          "Watch real user sessions to see exactly how people navigate your site. Identify confusion points, UX friction, and conversion blockers you would never find in aggregate data.",
      },
      {
        title: "Google Tag Manager",
        description:
          "Centralized tag management for all tracking pixels — Google, Meta, LinkedIn, TikTok. Add or modify tracking without touching your site code.",
      },
      {
        title: "Custom Dashboards",
        description:
          "Clean, simple dashboards showing the 5-10 metrics that actually matter for your business. No data overload. Accessible to non-technical team members.",
      },
      {
        title: "Ad Platform Integration",
        description:
          "Google Ads, Meta Pixel, and conversion API configured for accurate attribution. Proper data flowing back to ad platforms means better optimization and lower costs.",
      },
      {
        title: "Privacy Compliance",
        description:
          "Cookie consent, data retention policies, and anonymization configured to meet GDPR and CCPA requirements. Track what you need without legal exposure.",
      },
    ],
    benefits: [
      { stat: "100%", label: "Conversion Visibility" },
      { stat: "< 1 day", label: "Setup Time" },
      { stat: "30%", label: "Better Ad ROAS" },
      { stat: "0", label: "Data Blind Spots" },
    ],
    process: [
      {
        step: 1,
        title: "Measurement Plan",
        description:
          "We define what matters for your business — which actions count as conversions, which metrics drive decisions, and what questions data needs to answer.",
      },
      {
        step: 2,
        title: "Technical Setup",
        description:
          "GA4, GTM, heatmaps, session replay, and ad pixels installed and configured. Every event tested and verified before going live.",
      },
      {
        step: 3,
        title: "Dashboard Build",
        description:
          "Custom dashboards built around your key metrics. Clear, visual, and accessible — you should be able to check performance in under 60 seconds.",
      },
      {
        step: 4,
        title: "Training & Handoff",
        description:
          "We walk you through every dashboard, explain what to look for, and provide documentation. You leave the session confident in reading your own data.",
      },
      {
        step: 5,
        title: "Ongoing Optimization",
        description:
          "Monthly check-ins to review data, identify patterns, and recommend site improvements. Analytics are only valuable if someone acts on them.",
      },
    ],
    faqs: [
      {
        question: "I already have Google Analytics — why do I need this?",
        answer:
          "Most GA4 installations track pageviews and nothing else. Without custom event tracking, conversion goals, and proper attribution, you are missing 90% of the actionable data. We audit your current setup and fill the gaps.",
      },
      {
        question: "Is session replay creepy or invasive?",
        answer:
          "Session replay records mouse movements and clicks — not personal data, passwords, or payment info. Sensitive fields are automatically masked. It is a standard UX research tool used by every major website to improve user experience.",
      },
      {
        question: "Will tracking scripts slow down my site?",
        answer:
          "Not the way we implement them. All tracking loads asynchronously and deferred — meaning your page content loads first, tracking loads after. Zero impact on user experience or Core Web Vitals.",
      },
      {
        question: "Do I need to check dashboards every day?",
        answer:
          "No. We set up automated alerts for anomalies — traffic drops, conversion rate changes, error spikes. The dashboard is there when you want it, but critical issues come to you proactively.",
      },
      {
        question: "Can you set up tracking for my existing site?",
        answer:
          "Yes. Analytics setup works on any website regardless of platform. We integrate through Google Tag Manager, which requires adding a single code snippet — no rebuild necessary.",
      },
    ],
    keywords: [
      "Google Analytics setup Erie PA",
      "GA4 configuration",
      "conversion tracking setup",
      "heatmap analytics",
      "session replay setup",
      "Google Tag Manager setup",
      "website analytics Erie",
      "ad tracking setup",
      "data analytics for small business",
      "website tracking configuration",
    ],
    relatedServices: ["seo-optimization", "landing-pages", "website-management"],
  },
] as const;

export type ServiceSlug = (typeof SERVICES)[number]["slug"];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug) as
    | Service
    | undefined;
}

export function getAllServiceSlugs(): string[] {
  return SERVICES.map((service) => service.slug);
}
