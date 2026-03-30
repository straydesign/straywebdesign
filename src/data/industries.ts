export interface Industry {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  challenges: string[];
  stats: { value: string; label: string }[];
  faqs: { question: string; answer: string }[];
  keywords: string[];
  icon: string;
  patientOrClientTerm: string;
  lifetimeValue: string;
  competitorExample: string;
}

export const INDUSTRIES: Industry[] = [
  {
    slug: 'dental',
    name: 'Dental Practices',
    shortName: 'Dental',
    description:
      'Your dental practice competes against corporate chains with million-dollar marketing budgets. A high-converting website turns local searchers into booked appointments before they ever consider Aspen Dental.',
    longDescription:
      'Every day, potential patients in Erie search "dentist near me" and choose whoever shows up first with a site that looks trustworthy. If that\'s not you, it\'s your competitor. Your website needs to do more than list services — it needs to build trust in under 3 seconds, make booking effortless, and rank above the corporate chains spending 100x your budget on SEO. We build dental websites that convert browsers into patients, with online scheduling, insurance verification prompts, and patient testimonials that do the selling for you.',
    challenges: [
      'Template website that looks identical to three other practices in town',
      'Page load times over 5 seconds killing your Google ranking and bounce rate',
      'No online scheduling — forcing patients to call during business hours or move on',
      'Aspen Dental and corporate chains outranking you for every local keyword',
      'Mobile experience so bad that 60% of visitors leave before seeing your services',
    ],
    stats: [
      { value: '90+', label: 'Lighthouse score across all metrics' },
      { value: '<1s', label: 'page load time on every device' },
      { value: 'AA', label: 'WCAG accessibility compliance' },
      { value: '24/7', label: 'AI-powered appointment capture' },
    ],
    faqs: [
      {
        question: 'How long does it take to build a dental practice website?',
        answer:
          'Most dental sites launch in 4-6 weeks. That includes discovery, design, content creation, online scheduling integration, and SEO setup. We handle everything — you just review and approve.',
      },
      {
        question: 'Can you integrate with my practice management software?',
        answer:
          'Yes. We integrate with Dentrix, Eaglesoft, Open Dental, and most major PMS platforms. Online scheduling syncs directly with your calendar so there\'s zero double-booking.',
      },
      {
        question: 'Will my new website rank above corporate dental chains?',
        answer:
          'For local searches, absolutely. Corporate chains rank nationally but struggle locally. We optimize for "dentist in Erie PA" and surrounding areas with local SEO, Google Business Profile optimization, and location-specific content.',
      },
      {
        question: 'Do I need to write content for the site myself?',
        answer:
          'No. We write all the copy based on interviews with you and your team. We know what patients care about — insurance acceptance, pain-free procedures, emergency availability — and we write to convert.',
      },
      {
        question: 'What about HIPAA compliance for online forms?',
        answer:
          'Every form we build is HIPAA-compliant with encrypted submissions, secure storage, and proper consent disclosures. Patient data never touches an insecure server.',
      },
    ],
    keywords: [
      'dental website design',
      'dentist web design Erie PA',
      'dental practice marketing',
      'dental SEO',
      'dentist online scheduling',
      'dental patient acquisition',
      'dental website redesign',
      'HIPAA compliant dental website',
      'dental practice growth',
      'dentist near me optimization',
    ],
    icon: 'Stethoscope',
    patientOrClientTerm: 'patients',
    lifetimeValue: '',
    competitorExample: 'Aspen Dental',
  },
  {
    slug: 'financial-advisors',
    name: 'Financial Advisors',
    shortName: 'Financial',
    description:
      'Your prospects are researching you online before they ever pick up the phone. A polished, trust-building website separates independent advisors who close high-net-worth clients from those who lose them to Schwab.',
    longDescription:
      'When someone has $500K+ to invest, they\'re not making impulsive decisions. They\'re Googling your name, reading your site, and judging your credibility in seconds. If your website looks like it was built in 2015 — or worse, looks like a template that 200 other advisors use — you\'ve already lost. We build financial advisor websites that communicate authority, compliance-readiness, and personal attention. The kind of site that makes a prospect think "this is who I want managing my money" before they ever book a consultation.',
    challenges: [
      'Cookie-cutter template site that undermines the trust you need to close high-net-worth clients',
      'Compliance bottlenecks that make updating content slow and painful',
      'Schwab, Fidelity, and robo-advisors capturing leads with slick digital experiences',
      'No clear call-to-action — visitors browse but never book a consultation',
      'Poor mobile experience when prospects research you from their phone',
    ],
    stats: [
      { value: '90+', label: 'Lighthouse score across all metrics' },
      { value: '<1s', label: 'page load time on every device' },
      { value: 'AA', label: 'WCAG accessibility compliance' },
      { value: '24/7', label: 'AI-powered lead capture' },
    ],
    faqs: [
      {
        question: 'How do you handle compliance requirements for financial advisor websites?',
        answer:
          'We build with compliance in mind from day one. All content goes through your compliance review before launch. We structure the CMS so updates are easy to route through approval workflows, and we never publish without your sign-off.',
      },
      {
        question: 'Can the website integrate with my CRM and scheduling tools?',
        answer:
          'Yes. We integrate with Redtail, Wealthbox, Salesforce, Calendly, and most industry CRMs. Lead capture forms feed directly into your pipeline so no prospect falls through the cracks.',
      },
      {
        question: 'How do you differentiate my site from other advisors using templates?',
        answer:
          'Every site we build is custom-designed around your specific value proposition, client niche, and brand voice. No templates, no shared layouts. Your site will look nothing like your competitors\' because it\'s built from scratch for you.',
      },
      {
        question: 'What kind of content should a financial advisor website have?',
        answer:
          'Beyond services and bio pages, we build thought leadership sections, market commentary frameworks, client success stories (anonymized for compliance), and educational resources that position you as the expert — not another salesperson.',
      },
      {
        question: 'Will this help me compete with robo-advisors and big firms online?',
        answer:
          'That\'s exactly the point. Robo-advisors win on price. Big firms win on brand recognition. You win on trust and personal connection — and your website is where that starts. We make sure your site communicates what algorithms and call centers never can.',
      },
    ],
    keywords: [
      'financial advisor website design',
      'wealth management web design',
      'financial planner marketing',
      'RIA website design',
      'financial advisor SEO',
      'fiduciary advisor website',
      'financial advisor lead generation',
      'compliance-ready financial website',
      'independent advisor marketing',
      'financial advisor digital presence',
    ],
    icon: 'TrendingUp',
    patientOrClientTerm: 'clients',
    lifetimeValue: '',
    competitorExample: 'Schwab / Fidelity',
  },
  {
    slug: 'car-dealerships',
    name: 'Car Dealerships',
    shortName: 'Auto',
    description:
      'Car buyers start online months before they walk onto a lot. Your website either captures that intent and builds a relationship, or Carvana does it for you.',
    longDescription:
      'The average car buyer spends 14 hours researching online before visiting a dealership. If your website is slow, hard to search, or looks outdated, they\'re not walking through your doors — they\'re ordering from Carvana or driving to a competitor with a better digital experience. Your website needs to be a 24/7 showroom: fast inventory search, transparent pricing, trade-in tools, and financing pre-qualification that gets buyers committed before they leave their couch. We build dealership websites that turn online researchers into lot visitors ready to buy.',
    challenges: [
      'Vendor-locked dealership platform that looks identical to every other dealer in the region',
      'Slow inventory pages that frustrate buyers and tank search rankings',
      'Carvana and AutoTrader intercepting your customers with superior user experience',
      'No trade-in or financing tools — forcing buyers to call or visit just to get basic answers',
      'Poor mobile experience when 70% of car research happens on phones',
    ],
    stats: [
      { value: '90+', label: 'Lighthouse score across all metrics' },
      { value: '<1s', label: 'page load time on every device' },
      { value: 'AA', label: 'WCAG accessibility compliance' },
      { value: '24/7', label: 'AI-powered lead capture' },
    ],
    faqs: [
      {
        question: 'Can you integrate live inventory feeds into the website?',
        answer:
          'Yes. We connect directly to your DMS (Dealer Management System) — whether it\'s CDK, Reynolds & Reynolds, DealerSocket, or others — to pull real-time inventory with photos, pricing, and specs. No manual updates needed.',
      },
      {
        question: 'How do you compete with Carvana and online-only dealers?',
        answer:
          'By giving your customers the same digital convenience — trade-in estimators, financing pre-approval, detailed vehicle pages — while emphasizing what online dealers can\'t offer: test drives, local service, and a real person to talk to.',
      },
      {
        question: 'Will the website work with our existing CRM?',
        answer:
          'Absolutely. We integrate with VinSolutions, DealerSocket, Elead, and all major automotive CRMs. Every lead, form submission, and chat interaction flows directly into your sales pipeline.',
      },
      {
        question: 'How important is page speed for a dealership website?',
        answer:
          'Critical. Inventory pages with hundreds of vehicles can be slow if built poorly. We use lazy loading, optimized images, and smart filtering so your entire inventory loads fast — even on mobile networks.',
      },
      {
        question: 'Can customers schedule test drives or service appointments online?',
        answer:
          'Yes — and they should be able to. We build scheduling tools for both sales and service departments, integrated with your calendar systems. The easier you make it to engage, the more leads you capture.',
      },
    ],
    keywords: [
      'car dealership website design',
      'auto dealer web design',
      'dealership inventory website',
      'automotive digital marketing',
      'car dealer SEO',
      'dealership lead generation',
      'auto dealer website redesign',
      'DMS inventory integration',
      'car dealership marketing Erie PA',
      'automotive website development',
    ],
    icon: 'Car',
    patientOrClientTerm: 'customers',
    lifetimeValue: '',
    competitorExample: 'Carvana / AutoTrader',
  },
  {
    slug: 'it-services',
    name: 'IT Services & MSPs',
    shortName: 'IT / MSP',
    description:
      'Your managed services contracts are worth $50K-$500K annually, but your website looks like it was built by your least busy technician. Decision-makers judge your competence by your digital presence.',
    longDescription:
      'When a CFO or operations director is shopping for an IT partner, your website is the first technical audit you\'ll ever face. If it\'s slow, outdated, or generic, they\'re already questioning your capabilities. The irony of an IT company with a bad website isn\'t lost on anyone. We build MSP and IT services websites that demonstrate technical competence through performance, showcase real results through case studies, and convert high-value prospects through strategic CTAs. Your site should be the best proof of what you do.',
    challenges: [
      'Website that undermines credibility — an IT company with a slow, dated site is a red flag',
      'Generic messaging that sounds like every other MSP: "We manage your IT so you can focus on business"',
      'Larger competitors with dedicated marketing teams producing content and dominating search',
      'No case studies or proof of results — just a list of services and a contact form',
      'Technical jargon that confuses decision-makers instead of building confidence',
    ],
    stats: [
      { value: '90+', label: 'Lighthouse score across all metrics' },
      { value: '<1s', label: 'page load time on every device' },
      { value: 'AA', label: 'WCAG accessibility compliance' },
      { value: '24/7', label: 'AI-powered lead capture' },
    ],
    faqs: [
      {
        question: 'How do you make our IT services website stand out from competitors?',
        answer:
          'We focus on results, not jargon. Instead of listing services, we build around case studies, uptime guarantees, response time metrics, and client outcomes. Decision-makers want proof — we give them proof.',
      },
      {
        question: 'Can you integrate our PSA and ticketing tools?',
        answer:
          'Yes. We integrate with ConnectWise, Autotask/Datto, HaloPSA, and others. Client portals can include ticket status, reporting dashboards, and self-service tools that reduce your support load.',
      },
      {
        question: 'How important is content marketing for MSPs?',
        answer:
          'Extremely. IT decision-makers research for weeks before contacting a vendor. Blog posts about cybersecurity, compliance, and infrastructure planning position you as the expert. We can set up the content framework and train your team to maintain it.',
      },
      {
        question: 'Should we include pricing on our website?',
        answer:
          'We recommend tiered service packages with starting-at pricing. It qualifies leads before they contact you and filters out companies that can\'t afford your services. No sticker shock on the discovery call.',
      },
      {
        question: 'What about security certifications and compliance badges?',
        answer:
          'We prominently display SOC 2, HIPAA compliance, Microsoft Partner status, and any other certifications. These trust signals are critical for enterprise prospects evaluating your credibility.',
      },
    ],
    keywords: [
      'IT services website design',
      'MSP website design',
      'managed services marketing',
      'IT company web design',
      'MSP lead generation',
      'IT services SEO',
      'managed IT marketing',
      'MSP digital marketing',
      'IT company website redesign',
      'B2B tech website design',
    ],
    icon: 'Server',
    patientOrClientTerm: 'clients',
    lifetimeValue: '',
    competitorExample: 'Large regional MSPs',
  },
  {
    slug: 'law-firms',
    name: 'Law Firms',
    shortName: 'Legal',
    description:
      'Potential clients are searching for legal help at their most vulnerable moments. Your website either builds instant trust and captures the case, or LegalZoom and a competitor down the street do.',
    longDescription:
      'When someone needs a lawyer, they\'re usually stressed, confused, and making decisions fast. They Google their problem, click the first few results, and choose whoever looks most trustworthy and competent. If your site is a wall of legal jargon with a stock photo of a gavel, you\'re losing cases to firms with better websites — not better lawyers. We build law firm websites that communicate authority and empathy simultaneously, make it effortless to schedule a consultation, and rank for the practice areas that drive your revenue. Every element is designed to convert a distressed searcher into a signed retainer.',
    challenges: [
      'Generic template site with stock courthouse photos that every other firm uses',
      'LegalZoom and legal marketplaces capturing your leads with simpler user experiences',
      'No clear differentiation between practice areas — everything looks the same',
      'Competitor firms investing heavily in SEO and PPC while you rely on referrals alone',
      'Contact forms that ask too many questions and kill conversion rates',
    ],
    stats: [
      { value: '90+', label: 'Lighthouse score across all metrics' },
      { value: '<1s', label: 'page load time on every device' },
      { value: 'AA', label: 'WCAG accessibility compliance' },
      { value: '24/7', label: 'AI-powered client intake' },
    ],
    faqs: [
      {
        question: 'How do you handle multiple practice areas on one website?',
        answer:
          'Each practice area gets its own dedicated landing page with unique content, SEO targeting, and conversion paths. A personal injury visitor and a family law visitor see completely different messaging. No one-size-fits-all pages.',
      },
      {
        question: 'Can the website capture leads after business hours?',
        answer:
          'Absolutely — and it needs to. Most legal searches happen evenings and weekends. We build 24/7 lead capture with live chat integration, emergency contact forms, and automated follow-up sequences so no inquiry goes unanswered.',
      },
      {
        question: 'How do you handle attorney advertising rules and disclaimers?',
        answer:
          'We\'re familiar with state bar advertising requirements. All content includes proper disclaimers, avoids prohibited language, and is reviewed with your compliance needs in mind before publishing.',
      },
      {
        question: 'Will this replace our need for legal directories like Avvo or FindLaw?',
        answer:
          'Over time, yes. A strong website with good SEO reduces your dependence on directories that charge premium rates and send leads to your competitors simultaneously. Your own site is the only channel you fully control.',
      },
      {
        question: 'How fast can a law firm website generate new cases?',
        answer:
          'Most firms see increased inquiries within 60-90 days of launch, especially with local SEO optimization. Paid search campaigns can drive qualified leads within the first week if budget allows.',
      },
    ],
    keywords: [
      'law firm website design',
      'attorney web design',
      'legal marketing',
      'law firm SEO',
      'lawyer website redesign',
      'legal lead generation',
      'personal injury lawyer website',
      'law firm digital marketing',
      'attorney client acquisition',
      'law firm web design Erie PA',
    ],
    icon: 'Scale',
    patientOrClientTerm: 'clients',
    lifetimeValue: '',
    competitorExample: 'LegalZoom',
  },
  {
    slug: 'vision-care',
    name: 'Vision Care & Optometry',
    shortName: 'Vision',
    description:
      'Your patients are choosing between your independent practice and Warby Parker\'s seamless online experience. A modern website bridges that gap and keeps patients loyal to your chair.',
    longDescription:
      'The optical industry is getting squeezed from every direction. Online retailers sell glasses for $95. Warby Parker made eyewear cool and convenient. LensCrafters has the foot traffic. But here\'s what they can\'t replicate: your clinical expertise, personalized care, and community relationships. Your website needs to communicate that irreplaceable value while matching the digital experience patients now expect. We build optometry websites that showcase your expertise, make appointment booking instant, and position your practice as the premium choice — not the outdated one.',
    challenges: [
      'Warby Parker and online retailers setting patient expectations for digital experience',
      'Outdated website that doesn\'t reflect the quality of care you actually provide',
      'No online scheduling — patients call, get voicemail, and book elsewhere',
      'LensCrafters and corporate optical chains dominating local search results',
      'Frame gallery and promotions buried in PDF flyers instead of integrated into the site',
    ],
    stats: [
      { value: '90+', label: 'Lighthouse score across all metrics' },
      { value: '<1s', label: 'page load time on every device' },
      { value: 'AA', label: 'WCAG accessibility compliance' },
      { value: '24/7', label: 'AI-powered appointment capture' },
    ],
    faqs: [
      {
        question: 'Can you showcase our frame collection online?',
        answer:
          'Yes. We build digital frame galleries with filtering by brand, style, and price. Patients can browse your collection before their appointment, which increases both visit rates and average transaction value.',
      },
      {
        question: 'How do you help us compete with online eyewear retailers?',
        answer:
          'By highlighting what they can\'t offer: proper fittings, real-time adjustments, medical-grade eye exams, and ongoing care. We position your practice as the complete solution — not just a place to buy glasses.',
      },
      {
        question: 'Can the site integrate with our EHR system?',
        answer:
          'We integrate scheduling with major optometry EHR platforms like Crystal PM, RevolutionEHR, and Eyefinity. Patient intake forms can also be digitized to streamline the check-in process.',
      },
      {
        question: 'Should we sell eyewear directly through the website?',
        answer:
          'We recommend showcasing frames to drive in-office visits rather than competing with online retailers on price. The goal is to get patients into your chair where your expertise and service close the sale.',
      },
      {
        question: 'How important are patient reviews for an optometry website?',
        answer:
          'Extremely important. We build automated review collection workflows and prominently display testimonials. Seeing real patient experiences is the single biggest trust factor for new visitors.',
      },
    ],
    keywords: [
      'optometry website design',
      'eye doctor web design',
      'optical practice marketing',
      'optometrist SEO',
      'vision care website',
      'eye care digital marketing',
      'optometry patient acquisition',
      'optical website redesign',
      'eye doctor marketing Erie PA',
      'vision care lead generation',
    ],
    icon: 'Eye',
    patientOrClientTerm: 'patients',
    lifetimeValue: '',
    competitorExample: 'LensCrafters / Warby Parker',
  },
  {
    slug: 'chiropractors',
    name: 'Chiropractors & Physical Therapy',
    shortName: 'Chiro / PT',
    description:
      'Patients in pain make fast decisions. Your website has seconds to communicate credibility and make booking effortless before they scroll to the next provider.',
    longDescription:
      'When someone\'s back goes out or they\'re recovering from surgery, they\'re not browsing — they\'re searching with urgency. They want to know three things fast: can you help, when can they come in, and do you take their insurance. If your website buries that information behind cluttered pages and broken links, they\'ll book with whoever makes it easy. We build chiropractic and PT websites that answer those urgent questions immediately, build credibility with patient testimonials and provider credentials, and convert pain into booked appointments with minimal friction.',
    challenges: [
      'Cluttered website with too much information and no clear path to booking',
      'Corporate wellness chains and hospital-affiliated PT clinics dominating search',
      'No online scheduling for urgent or same-day appointment requests',
      'Poor mobile experience for patients searching from their phone while in pain',
      'Generic stock photos that don\'t build trust or show your actual facility',
    ],
    stats: [
      { value: '90+', label: 'Lighthouse score across all metrics' },
      { value: '<1s', label: 'page load time on every device' },
      { value: 'AA', label: 'WCAG accessibility compliance' },
      { value: '24/7', label: 'AI-powered appointment capture' },
    ],
    faqs: [
      {
        question: 'How do you handle different service types (chiro, PT, massage, acupuncture)?',
        answer:
          'Each service gets its own dedicated page with specific benefits, conditions treated, and what to expect. This helps both patients and search engines understand your full scope of care.',
      },
      {
        question: 'Can patients check insurance acceptance on the website?',
        answer:
          'Yes. We build clear insurance pages listing accepted plans, plus a simple verification form. This is one of the top questions patients have — answering it upfront dramatically increases conversion.',
      },
      {
        question: 'Should we include educational content about conditions we treat?',
        answer:
          'Absolutely. Condition-specific pages (sciatica, sports injuries, post-surgical rehab) serve dual purposes: they educate patients and rank for long-tail search terms that drive qualified traffic.',
      },
      {
        question: 'How do you handle before-and-after or patient progress content?',
        answer:
          'We design outcome showcase sections with anonymized progress stories, patient testimonials, and functional improvement metrics. Real results are your strongest marketing tool.',
      },
      {
        question: 'Can patients fill out intake forms online before their visit?',
        answer:
          'Yes — and we strongly recommend it. Digital intake forms reduce front-desk workload, speed up the first visit, and make the patient experience feel modern and professional from the start.',
      },
    ],
    keywords: [
      'chiropractor website design',
      'physical therapy web design',
      'chiropractic marketing',
      'PT clinic website',
      'chiropractor SEO',
      'physical therapy patient acquisition',
      'chiropractic digital marketing',
      'PT website redesign',
      'chiropractor near me optimization',
      'physical therapy marketing Erie PA',
    ],
    icon: 'Activity',
    patientOrClientTerm: 'patients',
    lifetimeValue: '',
    competitorExample: 'Corporate wellness chains',
  },
  {
    slug: 'orthopedics',
    name: 'Orthopedic Practices',
    shortName: 'Orthopedics',
    description:
      'Orthopedic patients facing surgery or chronic pain need confidence in their provider. Your website is where that confidence starts — or where they decide to go to the hospital system instead.',
    longDescription:
      'Orthopedic decisions are high-stakes. Patients are choosing who will operate on their knee, fix their shoulder, or manage their chronic pain for years. They\'re researching extensively, comparing providers, and looking for signals of expertise and trust. Hospital systems spend millions on marketing to capture these patients. As an independent or group practice, your website is your most powerful competitive weapon. We build orthopedic websites that showcase surgeon credentials, publish condition-specific content that ranks and educates, and make the path from "I need help" to "I booked a consultation" as short as possible.',
    challenges: [
      'Hospital systems with massive marketing budgets and built-in referral networks',
      'Patients defaulting to the hospital brand because independent practices look less "official" online',
      'Complex service lines (sports medicine, joint replacement, spine) that need distinct messaging',
      'No physician-specific pages that highlight individual surgeon expertise and outcomes',
      'Outdated site that doesn\'t reflect the cutting-edge procedures you actually perform',
    ],
    stats: [
      { value: '90+', label: 'Lighthouse score across all metrics' },
      { value: '<1s', label: 'page load time on every device' },
      { value: 'AA', label: 'WCAG accessibility compliance' },
      { value: '24/7', label: 'AI-powered patient intake' },
    ],
    faqs: [
      {
        question: 'How do you help us compete with hospital systems online?',
        answer:
          'Hospital websites are massive and impersonal. We build focused, specialty-specific pages that outrank them for targeted searches like "ACL surgeon Erie PA." Smaller sites with better content and faster load times consistently outperform bloated hospital websites in local search.',
      },
      {
        question: 'Should each surgeon have their own page?',
        answer:
          'Absolutely. Patients want to know who will be treating them. Individual provider pages with credentials, specialties, publications, and patient reviews are one of the highest-converting elements on any orthopedic website.',
      },
      {
        question: 'Can you create content for specific conditions and procedures?',
        answer:
          'Yes — this is core to our strategy. Condition pages (torn meniscus, rotator cuff repair, spinal stenosis) attract patients who are actively searching for solutions. Each page educates and converts.',
      },
      {
        question: 'How do you handle patient portal and EHR integration?',
        answer:
          'We link seamlessly to your patient portal (Epic MyChart, athenahealth, etc.) and can embed scheduling widgets. The goal is a unified experience where patients move from your website to your systems without friction.',
      },
      {
        question: 'What about showcasing surgical outcomes and success rates?',
        answer:
          'We design outcomes dashboards and success stories that communicate your track record. Joint replacement satisfaction rates, return-to-sport timelines, and patient testimonials all build the confidence patients need to choose you.',
      },
    ],
    keywords: [
      'orthopedic website design',
      'orthopedic surgeon marketing',
      'sports medicine web design',
      'orthopedic practice SEO',
      'joint replacement marketing',
      'orthopedic digital marketing',
      'spine surgeon website',
      'orthopedic patient acquisition',
      'orthopedic practice website redesign',
      'orthopedic marketing Erie PA',
    ],
    icon: 'Bone',
    patientOrClientTerm: 'patients',
    lifetimeValue: '',
    competitorExample: 'Hospital systems',
  },
  {
    slug: 'landscaping',
    name: 'Landscaping Companies',
    shortName: 'Landscaping',
    description:
      'Homeowners judge your work before you ever show up. A website with stunning project galleries and instant quote requests wins the job over companies still relying on yard signs and word of mouth.',
    longDescription:
      'Landscaping is a visual business, but most landscaping websites look worse than a well-maintained lawn. Blurry photos, no project galleries, and a contact form that goes nowhere. Meanwhile, your potential customers are comparing you to TruGreen\'s polished digital experience and BrightView\'s corporate portfolio. Your work is beautiful — your website should be too. We build landscaping websites that showcase your best projects with professional galleries, make it easy to request estimates, and rank you above the nationals for every "landscaping near me" search in your service area.',
    challenges: [
      'No professional project gallery — the best marketing asset in a visual industry going unused',
      'TruGreen and BrightView dominating search with massive SEO budgets',
      'Seasonal demand swings with no digital strategy to smooth out the pipeline',
      'Relying on yard signs and referrals while competitors invest in digital lead generation',
      'No way for customers to request estimates online — phone tag kills conversions',
    ],
    stats: [
      { value: '90+', label: 'Lighthouse score across all metrics' },
      { value: '<1s', label: 'page load time on every device' },
      { value: 'AA', label: 'WCAG accessibility compliance' },
      { value: '24/7', label: 'AI-powered estimate requests' },
    ],
    faqs: [
      {
        question: 'How important is a project gallery for a landscaping website?',
        answer:
          'It\'s the single most important element. Landscaping is a visual decision — homeowners want to see your work before they call. We build filterable galleries with before/after sliders, project descriptions, and service tags.',
      },
      {
        question: 'Can customers get estimates through the website?',
        answer:
          'Yes. We build smart estimate request forms that capture project details (property size, services needed, timeline) so you can provide accurate quotes quickly. This filters tire-kickers and qualifies serious leads.',
      },
      {
        question: 'How do you handle seasonal service changes?',
        answer:
          'We design the site to highlight seasonal services automatically — spring cleanups in March, lawn care in summer, snow removal in winter. Content and CTAs rotate so your site is always selling what customers need right now.',
      },
      {
        question: 'Should we target both residential and commercial clients?',
        answer:
          'If you serve both, yes — but with separate sections and messaging. A homeowner looking for a patio redesign has different needs than a property manager needing monthly maintenance. We build distinct paths for each audience.',
      },
      {
        question: 'Can you help with Google Maps and local search visibility?',
        answer:
          'Absolutely. Local SEO is where landscaping companies win or lose online. We optimize your Google Business Profile, build location-specific content, and implement review strategies that boost your map pack rankings.',
      },
    ],
    keywords: [
      'landscaping website design',
      'lawn care web design',
      'landscaper marketing',
      'landscaping SEO',
      'landscaping lead generation',
      'landscaping company website',
      'lawn care digital marketing',
      'landscaping website redesign',
      'landscaping marketing Erie PA',
      'commercial landscaping website',
    ],
    icon: 'TreePine',
    patientOrClientTerm: 'customers',
    lifetimeValue: '',
    competitorExample: 'TruGreen / BrightView',
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing & Industrial',
    shortName: 'Manufacturing',
    description:
      'Your manufacturing capabilities are world-class, but your website looks like it hasn\'t been updated since 2010. Procurement teams and engineers judge your competence by your digital presence.',
    longDescription:
      'Manufacturing companies build incredible things — and then hide behind websites from the early 2000s. When a procurement manager or engineer is evaluating suppliers, your website is the first impression. If it looks outdated, they assume your processes are too. Global suppliers and competitors with modern digital presences are winning RFPs before you even get a chance to quote. We build manufacturing websites that communicate precision, capability, and reliability. Detailed capability pages, certifications front and center, case studies that prove results, and an RFQ process that\'s as efficient as your production line.',
    challenges: [
      'Website built a decade ago that undermines the perception of your technical capabilities',
      'Global competitors with polished digital presences winning contracts on first impressions',
      'No clear showcase of capabilities, certifications, or equipment — just a vague company overview',
      'RFQ process buried or nonexistent — forcing prospects to call and wait for callbacks',
      'Poor search visibility for industry-specific terms that procurement teams use',
    ],
    stats: [
      { value: '90+', label: 'Lighthouse score across all metrics' },
      { value: '<1s', label: 'page load time on every device' },
      { value: 'AA', label: 'WCAG accessibility compliance' },
      { value: '24/7', label: 'AI-powered RFQ capture' },
    ],
    faqs: [
      {
        question: 'How do you make a manufacturing website compelling when the work is technical?',
        answer:
          'Technical doesn\'t mean boring. We use professional facility photography, process videos, detailed capability matrices, and case studies to make your precision and expertise visually compelling. Engineers appreciate thoroughness — we deliver it.',
      },
      {
        question: 'Can the website handle complex RFQ submissions?',
        answer:
          'Yes. We build multi-step RFQ forms with file upload for drawings and specs, material selection, quantity fields, and timeline requirements. Every submission feeds into your sales pipeline with all the information needed to quote accurately.',
      },
      {
        question: 'How important are certifications on a manufacturing website?',
        answer:
          'Critical. ISO 9001, AS9100, ITAR, NADCAP — these aren\'t just badges, they\'re deal-breakers for many procurement decisions. We display them prominently and create dedicated pages explaining what each certification means for the customer.',
      },
      {
        question: 'Should we include equipment lists and specifications?',
        answer:
          'Absolutely. Engineers and procurement teams want to know your capabilities before reaching out. Detailed equipment pages with specifications, tolerances, and material capabilities save time for everyone and qualify leads automatically.',
      },
      {
        question: 'Can this help us attract talent in a tight labor market?',
        answer:
          'Yes. We build dedicated careers sections that showcase your culture, facility, benefits, and growth opportunities. A modern website signals a modern company — and that matters when competing for skilled machinists and engineers.',
      },
    ],
    keywords: [
      'manufacturing website design',
      'industrial web design',
      'manufacturing marketing',
      'CNC machining website',
      'manufacturing SEO',
      'industrial digital marketing',
      'manufacturing company website',
      'B2B manufacturing marketing',
      'manufacturing website redesign',
      'industrial marketing Erie PA',
    ],
    icon: 'Factory',
    patientOrClientTerm: 'clients',
    lifetimeValue: '',
    competitorExample: 'Global suppliers',
  },
  {
    slug: 'restaurants',
    name: 'Restaurants & Bars',
    shortName: 'Restaurants',
    description:
      'Your food and atmosphere are incredible. But hungry people making decisions at 7pm aren\'t visiting your website — they\'re checking Yelp and DoorDash. Take back control of your brand and your margins.',
    longDescription:
      'Restaurants spend years perfecting their craft, then hand their digital presence to Yelp, DoorDash, and Google. These platforms control your brand, take up to 30% of every order, and send customers to competitors with promoted listings. Your own website should be the hub: beautiful menus, direct online ordering (no commission), reservations, private event inquiries, and a vibe that makes people hungry. We build restaurant and bar websites that capture the energy of your space, drive direct orders that keep 100% of the revenue, and show up when locals search for where to eat tonight.',
    challenges: [
      'Third-party platforms taking 15-30% of every delivery and takeout order',
      'Yelp and Google controlling your brand narrative with reviews you can\'t fully manage',
      'No online ordering — losing takeout revenue to DoorDash and UberEats entirely',
      'Menu buried in a non-searchable PDF that Google can\'t index and phones can\'t read',
      'No reservation or event booking system — relying on phone calls during the dinner rush',
    ],
    stats: [
      { value: '90+', label: 'Lighthouse score across all metrics' },
      { value: '<1s', label: 'page load time on every device' },
      { value: 'AA', label: 'WCAG accessibility compliance' },
      { value: '24/7', label: 'AI-powered reservation capture' },
    ],
    faqs: [
      {
        question: 'Can you build online ordering into the website without third-party fees?',
        answer:
          'Yes — that\'s one of the biggest wins. We integrate direct ordering systems (Toast, Square Online, ChowNow, or custom solutions) so you keep 100% of your revenue instead of giving 15-30% to DoorDash.',
      },
      {
        question: 'How do you handle menus that change frequently?',
        answer:
          'We build easy-to-update digital menus that your staff can modify in minutes — no developer needed. Seasonal specials, daily features, and price changes happen instantly. No more outdated PDF menus.',
      },
      {
        question: 'Should we still use Yelp and Google if we have our own website?',
        answer:
          'Yes, but strategically. Your profiles on those platforms should drive traffic to YOUR website where you control the experience. We optimize your listings to funnel customers to your site for ordering, reservations, and events.',
      },
      {
        question: 'Can customers book private events or large parties online?',
        answer:
          'Absolutely. Private dining and events can be a major revenue stream. We build event inquiry forms with date selection, guest counts, menu preferences, and budget ranges so you can qualify and respond quickly.',
      },
      {
        question: 'How do you capture the vibe and atmosphere of our space on a website?',
        answer:
          'Through professional photography, video, thoughtful typography, and design that matches your brand energy. A craft cocktail bar and a family pizzeria need completely different web experiences — we design for your specific identity.',
      },
    ],
    keywords: [
      'restaurant website design',
      'bar website design',
      'restaurant online ordering',
      'restaurant digital marketing',
      'restaurant SEO',
      'restaurant website redesign',
      'bar marketing',
      'restaurant reservation system',
      'restaurant web design Erie PA',
      'restaurant direct ordering website',
    ],
    icon: 'UtensilsCrossed',
    patientOrClientTerm: 'customers',
    lifetimeValue: '',
    competitorExample: 'DoorDash / Yelp',
  },
  {
    slug: 'real-estate',
    name: 'Real Estate Agents',
    shortName: 'Real Estate',
    description:
      'Zillow and Redfin are capturing your leads and selling them back to you. A high-converting personal website establishes your brand and generates leads you actually own.',
    longDescription:
      'Real estate agents pay Zillow for leads that should have been theirs in the first place. Every agent who relies on portal traffic is building someone else\'s brand instead of their own. The agents dominating their markets have one thing in common: a personal website that ranks locally, showcases their expertise, and captures leads directly. We build real estate websites with IDX integration, neighborhood guides that rank for hyperlocal searches, market reports that establish authority, and lead capture that feeds your CRM — not Zillow\'s. Own your pipeline instead of renting it.',
    challenges: [
      'Zillow and Redfin capturing your market\'s leads and selling them to multiple agents',
      'Brokerage-provided website that looks identical to every other agent on the team',
      'No IDX integration — buyers can\'t search listings on your site so they go to portals instead',
      'No content strategy for hyperlocal SEO (neighborhood guides, market reports, school info)',
      'No lead nurturing — visitors come, browse, and leave without ever providing contact info',
    ],
    stats: [
      { value: '90+', label: 'Lighthouse score across all metrics' },
      { value: '<1s', label: 'page load time on every device' },
      { value: 'AA', label: 'WCAG accessibility compliance' },
      { value: '24/7', label: 'AI-powered lead capture' },
    ],
    faqs: [
      {
        question: 'What is IDX and do I really need it on my website?',
        answer:
          'IDX (Internet Data Exchange) displays MLS listings directly on your site. Without it, buyers go to Zillow. With it, they search on YOUR site, see YOUR brand, and register with YOU. It\'s the single most important feature for a real estate website.',
      },
      {
        question: 'How do you help me rank above Zillow for local searches?',
        answer:
          'Zillow ranks nationally but can\'t match hyperlocal content. We build neighborhood guides, school district pages, market trend reports, and community content that outranks portals for searches like "homes in Harbor Creek" or "best neighborhoods in Erie PA."',
      },
      {
        question: 'Can the website integrate with my real estate CRM?',
        answer:
          'Yes. We integrate with Follow Up Boss, kvCORE, BoomTown, LionDesk, and most major real estate CRMs. Every lead captured on your site flows directly into your follow-up sequences.',
      },
      {
        question: 'Should I invest in a personal site if my brokerage provides one?',
        answer:
          'Absolutely. Brokerage sites are shared templates that build the brokerage brand, not yours. If you leave, you lose everything. A personal website is an asset you own — it follows you regardless of which brokerage you\'re with.',
      },
      {
        question: 'What content should I be creating to generate leads?',
        answer:
          'Monthly market reports, neighborhood spotlights, buyer/seller guides, and community event roundups. This content ranks for long-tail searches, establishes your expertise, and gives visitors a reason to subscribe and stay in your orbit.',
      },
    ],
    keywords: [
      'real estate website design',
      'realtor web design',
      'IDX website design',
      'real estate agent marketing',
      'real estate SEO',
      'realtor lead generation',
      'real estate digital marketing',
      'real estate website redesign',
      'realtor website Erie PA',
      'real estate agent personal website',
    ],
    icon: 'Home',
    patientOrClientTerm: 'clients',
    lifetimeValue: '',
    competitorExample: 'Zillow / Redfin',
  },
  {
    slug: 'hvac',
    name: 'HVAC Companies',
    shortName: 'HVAC',
    description:
      'When someone\'s AC dies in July or their furnace quits in January, they\'re making a decision in minutes — not days. Your website needs to be the first result and the fastest path to a booked service call.',
    longDescription:
      'HVAC is an urgency business. When systems fail, homeowners aren\'t comparison shopping for weeks — they\'re Googling from a house that\'s 90 degrees or 40 degrees. The company with the best local search visibility, the fastest-loading site, and the easiest booking process wins the job. National chains spend millions to show up first. But local HVAC companies that invest in their digital presence consistently outperform them because homeowners prefer local, trusted technicians. We build HVAC websites designed for urgency: prominent phone numbers, one-click scheduling, financing options upfront, and local SEO that puts you above the chains.',
    challenges: [
      'National chains like Carrier and Trane dealers with massive advertising budgets',
      'HomeAdvisor and Angi capturing and reselling your leads at premium prices',
      'No online scheduling for emergency or same-day service requests',
      'Seasonal demand swings with no digital strategy to generate leads year-round',
      'Website that doesn\'t communicate 24/7 emergency availability clearly',
    ],
    stats: [
      { value: '90+', label: 'Lighthouse score across all metrics' },
      { value: '<1s', label: 'page load time on every device' },
      { value: 'AA', label: 'WCAG accessibility compliance' },
      { value: '24/7', label: 'AI-powered service requests' },
    ],
    faqs: [
      {
        question: 'How do you make our HVAC website convert emergency searches?',
        answer:
          'Prominent phone number on every page, click-to-call buttons on mobile, emergency service badges, and "Schedule Now" CTAs that don\'t require scrolling. When someone\'s HVAC fails, every second of friction loses a customer.',
      },
      {
        question: 'Can customers schedule service appointments online?',
        answer:
          'Yes — for both emergency and routine maintenance. We build scheduling tools that capture the issue type, system details, and preferred timing, then route to your dispatch. Less phone tag, more booked jobs.',
      },
      {
        question: 'How do you help us generate leads in the off-season?',
        answer:
          'We build content around seasonal maintenance, energy efficiency tips, and system upgrade guides. Maintenance agreements and tune-up promotions keep your pipeline active year-round instead of boom-and-bust cycles.',
      },
      {
        question: 'Should we show financing options on the website?',
        answer:
          'Absolutely. A $10K system replacement is a major purchase. Showing monthly payment options upfront (e.g., "$89/month with approved credit") removes sticker shock and increases conversion for replacement jobs.',
      },
      {
        question: 'How important are service area pages?',
        answer:
          'Extremely important for HVAC. We build pages for every city and neighborhood you serve — "HVAC repair in Millcreek," "furnace installation in Fairview" — each optimized to rank for local emergency searches in that area.',
      },
    ],
    keywords: [
      'HVAC website design',
      'heating and cooling web design',
      'HVAC marketing',
      'HVAC SEO',
      'HVAC lead generation',
      'HVAC company website',
      'heating contractor marketing',
      'HVAC digital marketing',
      'HVAC website redesign',
      'HVAC marketing Erie PA',
    ],
    icon: 'Thermometer',
    patientOrClientTerm: 'customers',
    lifetimeValue: '',
    competitorExample: 'National HVAC chains',
  },
  {
    slug: 'plumbing',
    name: 'Plumbing Companies',
    shortName: 'Plumbing',
    description:
      'A burst pipe doesn\'t wait for business hours. Your website needs to be the first thing panicked homeowners find and the fastest path from "I have a flood" to "a plumber is on the way."',
    longDescription:
      'Plumbing emergencies are some of the most urgent service calls in the home services industry. When water is pouring through a ceiling or a toilet won\'t stop running, homeowners are making decisions in minutes from their phone. Roto-Rooter and national franchises invest heavily to be the first result. But local plumbers who show up fast, do quality work, and have a professional digital presence build loyal customer bases that national chains can\'t match. We build plumbing websites optimized for emergency conversion: instant click-to-call, real-time availability, transparent pricing, and local SEO that gets you found first in your service area.',
    challenges: [
      'Roto-Rooter and national franchises dominating search with massive ad spend',
      'HomeAdvisor selling your leads to three competitors simultaneously',
      'No online presence beyond a basic Google listing and a Facebook page',
      'Emergency calls going to voicemail because the website doesn\'t offer alternatives',
      'No way for customers to see pricing ranges — they call, get a quote, and shop around',
    ],
    stats: [
      { value: '90+', label: 'Lighthouse score across all metrics' },
      { value: '<1s', label: 'page load time on every device' },
      { value: 'AA', label: 'WCAG accessibility compliance' },
      { value: '24/7', label: 'AI-powered emergency requests' },
    ],
    faqs: [
      {
        question: 'How quickly can a new website start generating plumbing leads?',
        answer:
          'With local SEO optimization and Google Business Profile setup, most plumbing companies see increased calls within 30-60 days. Adding Google Ads for emergency terms can generate calls within the first week.',
      },
      {
        question: 'Should we show pricing on our plumbing website?',
        answer:
          'We recommend showing starting-at ranges for common services (drain cleaning from $X, water heater install from $X). Transparent pricing builds trust and pre-qualifies leads. Customers who call already know your ballpark.',
      },
      {
        question: 'How do you handle after-hours emergency lead capture?',
        answer:
          'Click-to-call buttons connect to your after-hours line, emergency request forms trigger immediate SMS notifications to your on-call tech, and live chat options can qualify urgency level. No lead gets lost at 2am.',
      },
      {
        question: 'Can we showcase specific services like drain cleaning, repiping, or water heaters?',
        answer:
          'Each service gets its own dedicated landing page optimized for search. "Drain cleaning Erie PA," "water heater installation near me" — these are high-intent searches, and each page is designed to rank and convert.',
      },
      {
        question: 'How important are customer reviews for a plumbing website?',
        answer:
          'Reviews are everything in plumbing. Homeowners are letting someone into their house — trust is paramount. We integrate Google reviews directly into your site and build automated review request workflows.',
      },
    ],
    keywords: [
      'plumbing website design',
      'plumber web design',
      'plumbing marketing',
      'plumber SEO',
      'plumbing lead generation',
      'plumbing company website',
      'emergency plumber marketing',
      'plumbing digital marketing',
      'plumber website redesign',
      'plumbing marketing Erie PA',
    ],
    icon: 'Wrench',
    patientOrClientTerm: 'customers',
    lifetimeValue: '',
    competitorExample: 'Roto-Rooter',
  },
  {
    slug: 'electricians',
    name: 'Electrical Contractors',
    shortName: 'Electrical',
    description:
      'Homeowners and businesses need electrical work done right — and they judge your professionalism long before you show up. A modern website signals competence, safety, and reliability.',
    longDescription:
      'Electrical work is a trust business. Nobody wants to hire the cheapest electrician — they want the most competent one. When a homeowner needs a panel upgrade or a business needs commercial wiring, they\'re looking for signals of professionalism and expertise. A dated website with clip-art lightning bolts doesn\'t cut it. National franchises like Mr. Electric present a polished, trustworthy image. Independent contractors who match that digital professionalism while emphasizing local expertise and personal service win consistently. We build electrical contractor websites that communicate safety, competence, and reliability from the first click.',
    challenges: [
      'Mr. Electric and national franchises presenting a more professional image online',
      'No differentiation between residential, commercial, and industrial capabilities',
      'Website that doesn\'t communicate licensing, bonding, and insurance clearly',
      'Lead generation platforms selling the same lead to multiple electricians',
      'No project portfolio showing the scale and quality of work you\'ve completed',
    ],
    stats: [
      { value: '90+', label: 'Lighthouse score across all metrics' },
      { value: '<1s', label: 'page load time on every device' },
      { value: 'AA', label: 'WCAG accessibility compliance' },
      { value: '24/7', label: 'AI-powered service requests' },
    ],
    faqs: [
      {
        question: 'How do you differentiate residential from commercial electrical services?',
        answer:
          'We build separate sections with distinct messaging. A homeowner needing a panel upgrade and a property manager needing building-wide rewiring have completely different needs. Each audience sees content written specifically for them.',
      },
      {
        question: 'Should we display our licenses and certifications prominently?',
        answer:
          'Absolutely — it\'s one of the most important trust signals for an electrical contractor. We display license numbers, insurance proof, bonding status, and any speciality certifications in the header or footer of every page.',
      },
      {
        question: 'Can we showcase large commercial or industrial projects?',
        answer:
          'Yes. Project case studies with scope, timeline, challenges, and results are powerful sales tools. They prove capability to prospective commercial clients who need to know you can handle their scale.',
      },
      {
        question: 'How do we get found for emergency electrical services?',
        answer:
          'Dedicated emergency pages, click-to-call optimization, and local SEO targeting "emergency electrician [city]." We also set up Google Ads for emergency terms to capture immediate-need searches around the clock.',
      },
      {
        question: 'Is it worth investing in a website if most of our work comes from referrals?',
        answer:
          'Even referral-based businesses benefit. The first thing someone does when referred is Google your name. A professional website validates the referral and increases close rates. Plus, a strong website opens a second acquisition channel.',
      },
    ],
    keywords: [
      'electrician website design',
      'electrical contractor web design',
      'electrician marketing',
      'electrician SEO',
      'electrical contractor lead generation',
      'electrician company website',
      'commercial electrician marketing',
      'electrical digital marketing',
      'electrician website redesign',
      'electrician marketing Erie PA',
    ],
    icon: 'Zap',
    patientOrClientTerm: 'customers',
    lifetimeValue: '',
    competitorExample: 'Mr. Electric',
  },
  {
    slug: 'insurance',
    name: 'Insurance Agencies',
    shortName: 'Insurance',
    description:
      'Geico and Progressive spend billions to convince people they don\'t need a local agent. Your website is your chance to prove that personal service and local expertise are worth more than a 15-minute online quote.',
    longDescription:
      'The insurance industry is being disrupted by direct-to-consumer platforms that reduce agents to a commodity. Geico, Progressive, and Lemonade make buying insurance feel effortless — and make local agents feel unnecessary. But here\'s what they can\'t provide: a real person who understands local risks, reviews coverage annually, and advocates during claims. Your website needs to make that case compellingly. We build insurance agency websites that position you as the trusted local advisor, educate prospects on why independent guidance matters, and convert comparison shoppers into long-term policyholders with quote request tools and trust-building content.',
    challenges: [
      'Geico, Progressive, and direct-to-consumer platforms making agents seem unnecessary',
      'Prospects comparing your site to sleek fintech experiences and finding yours lacking',
      'No online quote request — forcing prospects to call during business hours or move on',
      'Generic website that doesn\'t differentiate personal vs commercial lines',
      'No content strategy to educate prospects on the value of an independent agent',
    ],
    stats: [
      { value: '90+', label: 'Lighthouse score across all metrics' },
      { value: '<1s', label: 'page load time on every device' },
      { value: 'AA', label: 'WCAG accessibility compliance' },
      { value: '24/7', label: 'AI-powered quote requests' },
    ],
    faqs: [
      {
        question: 'How do you help independent agents compete with Geico and Progressive online?',
        answer:
          'We position you as the personalized alternative. Content that explains coverage gaps in direct-to-consumer policies, claims horror stories where having an agent mattered, and local risk education that generic platforms can\'t provide.',
      },
      {
        question: 'Can customers request quotes through the website?',
        answer:
          'Yes. We build quote request forms for auto, home, life, commercial, and any other lines you write. Each form captures enough detail for an accurate preliminary quote, and submissions feed directly into your management system.',
      },
      {
        question: 'Should we list all the carriers we represent?',
        answer:
          'Absolutely. Carrier logos build credibility and communicate choice. "We shop 20+ carriers to find your best rate" is a powerful differentiator that direct writers can\'t match.',
      },
      {
        question: 'How do we get existing clients to use the website for service?',
        answer:
          'We build client portals or link to your carrier portals, add policy change request forms, and create self-service resources. Reducing phone volume for routine requests frees up your team for sales and complex service.',
      },
      {
        question: 'What content should an insurance agency website have?',
        answer:
          'Coverage guides, seasonal risk advisories (winter driving tips, hurricane prep), business insurance explainers, and claims process walkthroughs. This content builds trust, improves SEO, and positions you as the go-to local expert.',
      },
    ],
    keywords: [
      'insurance agency website design',
      'insurance agent web design',
      'insurance marketing',
      'insurance agency SEO',
      'insurance lead generation',
      'independent agent website',
      'insurance digital marketing',
      'insurance agency website redesign',
      'insurance agent marketing Erie PA',
      'insurance agency growth',
    ],
    icon: 'Shield',
    patientOrClientTerm: 'clients',
    lifetimeValue: '',
    competitorExample: 'Geico / Progressive',
  },
  {
    slug: 'accounting',
    name: 'Accounting Firms',
    shortName: 'Accounting',
    description:
      'TurboTax convinces people they don\'t need an accountant. Your website needs to prove that professional guidance saves more than it costs — especially for businesses and high-net-worth individuals.',
    longDescription:
      'The accounting industry faces a unique digital challenge: DIY tax software and AI bookkeeping tools are making business owners question whether they need a CPA at all. TurboTax and H&R Block capture millions with convenience. But complex tax situations, business advisory, audit preparation, and strategic planning can\'t be automated. Your website needs to make this case clearly — not by scaring people about what could go wrong, but by showing the value of what goes right with a real accountant. We build accounting firm websites that attract high-value clients, showcase advisory services beyond tax prep, and convert visitors who realize they\'ve outgrown DIY solutions.',
    challenges: [
      'TurboTax, QuickBooks, and H&R Block normalizing DIY accounting and tax prep',
      'Seasonal traffic spikes (Jan-Apr) with dead periods the rest of the year',
      'Website that reduces a CPA firm to a glorified tax filing service',
      'No differentiation between bookkeeping, tax planning, audit, and advisory services',
      'Younger business owners expecting digital-first interactions and self-service options',
    ],
    stats: [
      { value: '90+', label: 'Lighthouse score across all metrics' },
      { value: '<1s', label: 'page load time on every device' },
      { value: 'AA', label: 'WCAG accessibility compliance' },
      { value: '24/7', label: 'AI-powered client intake' },
    ],
    faqs: [
      {
        question: 'How do you position an accounting firm as more than just tax prep?',
        answer:
          'We design the site around advisory services, strategic planning, and business growth — with tax prep as one component. Service pages for CFO advisory, business valuation, succession planning, and industry-specific expertise attract higher-value clients.',
      },
      {
        question: 'Can clients upload documents and communicate through the website?',
        answer:
          'Yes. We build secure document portals integrated with your practice management software (Canopy, Karbon, CCH). Clients upload tax documents, sign engagement letters, and communicate — all without email attachments.',
      },
      {
        question: 'How do you handle seasonal marketing for an accounting firm?',
        answer:
          'Tax season content (deadlines, deduction guides) drives traffic Jan-Apr. Year-round, we focus on business advisory content, quarterly tax planning, and industry insights. The goal is steady lead flow, not a four-month sprint.',
      },
      {
        question: 'Should we show pricing or packages on the website?',
        answer:
          'For standard services (tax prep, bookkeeping), yes — tiered packages with starting prices qualify leads and set expectations. For advisory and complex services, we use "schedule a consultation" CTAs since pricing is custom.',
      },
      {
        question: 'What about attracting business clients vs individual tax clients?',
        answer:
          'We build separate paths for each audience. Business owners see advisory, payroll, and strategic planning. Individuals see tax preparation, estate planning, and retirement advisory. Each path speaks directly to that audience\'s concerns.',
      },
    ],
    keywords: [
      'accounting firm website design',
      'CPA website design',
      'accounting marketing',
      'CPA firm SEO',
      'accounting lead generation',
      'accounting firm website',
      'tax accountant marketing',
      'CPA digital marketing',
      'accounting website redesign',
      'accounting firm marketing Erie PA',
    ],
    icon: 'Calculator',
    patientOrClientTerm: 'clients',
    lifetimeValue: '',
    competitorExample: 'TurboTax / H&R Block',
  },
  {
    slug: 'veterinary',
    name: 'Veterinary Practices',
    shortName: 'Veterinary',
    description:
      'Pet owners treat their animals like family — and they choose vets the same way they choose doctors. Your website needs to communicate care, competence, and compassion before they ever walk through your doors.',
    longDescription:
      'Pet owners are fiercely loyal — but only after you earn that loyalty. The first interaction is almost always online. They\'re searching for a vet, reading reviews, checking services, and deciding whether your practice feels right for their pet. Corporate chains like VCA and Banfield have polished websites and built-in insurance programs. But pet owners overwhelmingly prefer independent vets who provide personal, caring attention. Your website needs to communicate that warmth and expertise immediately. We build veterinary websites that showcase your team\'s genuine care, make appointment booking effortless, and position your practice as the trusted local choice over corporate alternatives.',
    challenges: [
      'VCA and Banfield corporate chains with aggressive marketing and pet insurance tie-ins',
      'No online scheduling — pet owners can\'t book when they notice a problem at 10pm',
      'Website that doesn\'t showcase the personality and warmth of your team and facility',
      'Emergency and after-hours information buried or missing entirely',
      'No distinction between routine care, specialty services, and emergency capabilities',
    ],
    stats: [
      { value: '90+', label: 'Lighthouse score across all metrics' },
      { value: '<1s', label: 'page load time on every device' },
      { value: 'AA', label: 'WCAG accessibility compliance' },
      { value: '24/7', label: 'AI-powered appointment capture' },
    ],
    faqs: [
      {
        question: 'How do you make a vet website feel warm and trustworthy?',
        answer:
          'Real photos of your team with real animals — not stock photos. Staff bios that show personality. Patient stories (with owner permission). Design that feels approachable, not clinical. Pet owners choose vets based on feeling, and your website sets that tone.',
      },
      {
        question: 'Can pet owners book appointments online?',
        answer:
          'Yes, and they expect to. We integrate with veterinary scheduling systems like Covetrus, eVetPractice, and PetDesk. Owners can book routine visits, sick appointments, and even request prescription refills online.',
      },
      {
        question: 'Should we highlight emergency and after-hours services?',
        answer:
          'If you offer them, prominently. If you don\'t, clearly direct pet owners to the nearest emergency vet. Either way, this information needs to be immediately visible — a pet owner in crisis shouldn\'t have to search for it.',
      },
      {
        question: 'How do we compete with VCA and Banfield\'s marketing?',
        answer:
          'You compete on what they can\'t offer: continuity of care, a doctor who knows your pet by name, and a practice that doesn\'t prioritize shareholder returns over animal welfare. We make that story clear and compelling on your site.',
      },
      {
        question: 'Can we sell pet products or food through the website?',
        answer:
          'Yes. We can integrate an online pharmacy and pet store, or link to your existing Vetsource or Covetrus storefront. This creates a recurring revenue stream and keeps pet owners connected to your practice between visits.',
      },
    ],
    keywords: [
      'veterinary website design',
      'vet clinic web design',
      'veterinary marketing',
      'veterinary SEO',
      'vet practice lead generation',
      'veterinary digital marketing',
      'animal hospital website',
      'vet clinic website redesign',
      'veterinary marketing Erie PA',
      'pet care website design',
    ],
    icon: 'Heart',
    patientOrClientTerm: 'patients',
    lifetimeValue: '',
    competitorExample: 'VCA / Banfield',
  },
  {
    slug: 'gyms-fitness',
    name: 'Gyms & Fitness Studios',
    shortName: 'Fitness',
    description:
      'Planet Fitness sells $10 memberships at scale. Peloton sells convenience. You sell transformation, community, and expert coaching — and your website needs to sell it just as effectively.',
    longDescription:
      'The fitness industry has never been more competitive. Budget chains undercut on price. At-home platforms eliminate the commute. And every New Year, people sign up with whoever shows up first on Google. If your website looks like a generic gym template with stock photos of people on treadmills, you\'re invisible. The gyms and studios that thrive sell more than equipment — they sell results, accountability, and community. We build fitness websites that capture your energy, showcase real member transformations, make class booking seamless, and convert website visitors into members who stick around past February.',
    challenges: [
      'Planet Fitness and budget chains competing on price with $10/month memberships',
      'Peloton and at-home fitness platforms eliminating the "need" to visit a gym',
      'Class schedules and membership options buried in confusing website navigation',
      'No online sign-up — forcing prospects to visit in person just to get pricing',
      'High January traffic that drops off because the website doesn\'t nurture leads',
    ],
    stats: [
      { value: '90+', label: 'Lighthouse score across all metrics' },
      { value: '<1s', label: 'page load time on every device' },
      { value: 'AA', label: 'WCAG accessibility compliance' },
      { value: '24/7', label: 'AI-powered membership signups' },
    ],
    faqs: [
      {
        question: 'Can members book classes and manage their membership online?',
        answer:
          'Yes. We integrate with Mindbody, Zen Planner, Wodify, PushPress, and other gym management platforms. Members book classes, view schedules, manage payments, and track their progress — all through your website.',
      },
      {
        question: 'How do you help us compete with cheap gym chains?',
        answer:
          'You don\'t compete on price — you compete on value. Your website showcases coaching expertise, member transformations, community culture, and specialized programs that $10/month gyms can\'t match. We make the value proposition unmistakable.',
      },
      {
        question: 'Should we allow online sign-ups for memberships?',
        answer:
          'Absolutely. The barrier between "interested" and "member" should be as low as possible. Online registration with trial offers, introductory rates, and transparent pricing converts significantly better than "call for pricing."',
      },
      {
        question: 'How important are member testimonials and transformations?',
        answer:
          'They\'re your most powerful sales tool. Real before/after photos, video testimonials, and member stories with concrete results (lost 40lbs, ran first marathon, recovered from injury) are more convincing than any marketing copy.',
      },
      {
        question: 'Can the website help with member retention, not just acquisition?',
        answer:
          'Yes. Member portals with workout tracking, challenge leaderboards, community features, and class recommendations keep members engaged. The website becomes a daily touchpoint, not just a sign-up page.',
      },
    ],
    keywords: [
      'gym website design',
      'fitness studio web design',
      'gym marketing',
      'fitness SEO',
      'gym lead generation',
      'fitness studio website',
      'gym digital marketing',
      'CrossFit website design',
      'gym website redesign',
      'fitness marketing Erie PA',
    ],
    icon: 'Dumbbell',
    patientOrClientTerm: 'members',
    lifetimeValue: '',
    competitorExample: 'Planet Fitness / Peloton',
  },
  {
    slug: 'salons-spas',
    name: 'Salons & Spas',
    shortName: 'Salons',
    description:
      'Your clients choose you for your artistry and atmosphere. A beautiful, easy-to-book website is the digital extension of that experience — and the first place new clients decide whether to trust you.',
    longDescription:
      'Beauty is a personal industry. Clients don\'t just want a haircut or a facial — they want an experience with someone they trust. That trust starts online. When potential clients find your salon or spa, your website is the first impression of your aesthetic sensibility, your professionalism, and your attention to detail. If your site is cluttered, outdated, or hard to navigate, they\'ll assume your space is too. National chains offer convenience and consistency. You offer artistry and personal connection. We build salon and spa websites that reflect your brand\'s beauty, make booking effortless, and turn first-time visitors into loyal clients who refer their friends.',
    challenges: [
      'National chains offering convenience and walk-in availability that\'s hard to match',
      'No online booking — clients forced to call, text, or DM on Instagram to schedule',
      'Website aesthetic that doesn\'t match the actual beauty and vibe of your space',
      'Relying entirely on Instagram for marketing with no owned platform',
      'No way to showcase individual stylist portfolios and specialties',
    ],
    stats: [
      { value: '90+', label: 'Lighthouse score across all metrics' },
      { value: '<1s', label: 'page load time on every device' },
      { value: 'AA', label: 'WCAG accessibility compliance' },
      { value: '24/7', label: 'AI-powered booking capture' },
    ],
    faqs: [
      {
        question: 'Can clients book specific stylists or therapists online?',
        answer:
          'Yes. We integrate with booking platforms like Vagaro, Fresha, Boulevard, and Square Appointments. Clients choose their preferred provider, see real-time availability, and book in seconds. No phone calls, no back-and-forth.',
      },
      {
        question: 'How do you showcase our work and aesthetic online?',
        answer:
          'Through curated galleries, Instagram feed integration, individual stylist portfolios, and design that mirrors your brand\'s visual identity. Your website should feel like walking into your space — the colors, typography, and photography all match your vibe.',
      },
      {
        question: 'Should each stylist or provider have their own page?',
        answer:
          'Yes. Clients are loyal to their provider, not just your brand. Individual pages with photos, specialties, client reviews, and portfolio work help new clients choose the right match and help your team build their personal brand.',
      },
      {
        question: 'Can we sell products through the website?',
        answer:
          'Absolutely. We build integrated shops for retail products (hair care, skincare, etc.) with the same aesthetic as the rest of your site. This creates revenue between appointments and keeps clients using professional products.',
      },
      {
        question: 'How do we reduce no-shows and last-minute cancellations?',
        answer:
          'Automated booking confirmations, SMS reminders, and cancellation policies enforced at booking time. We can also implement deposit requirements for high-value services. These tools typically reduce no-shows by 40-60%.',
      },
    ],
    keywords: [
      'salon website design',
      'spa web design',
      'beauty salon marketing',
      'salon SEO',
      'salon booking website',
      'spa digital marketing',
      'hair salon website redesign',
      'medspa website design',
      'salon marketing Erie PA',
      'beauty industry web design',
    ],
    icon: 'Scissors',
    patientOrClientTerm: 'clients',
    lifetimeValue: '',
    competitorExample: 'National salon chains',
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return INDUSTRIES.find((industry) => industry.slug === slug);
}

export function getAllIndustrySlugs(): string[] {
  return INDUSTRIES.map((industry) => industry.slug);
}
