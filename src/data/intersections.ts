// ---------------------------------------------------------------------------
// Intersection content for programmatic SEO pages (industry x location)
// 20 industries x 10 locations = 200 unique combinations
// ---------------------------------------------------------------------------

// ---- Location-specific context snippets ------------------------------------
// Each location gets 4-5 sentences about its business landscape, competition,
// customer demographics, and what makes it unique for businesses.

const locationContexts: Record<string, string[]> = {
  erie: [
    'Erie is the economic hub of northwest Pennsylvania, with over 270,000 people in the metro area and a Peach Street corridor packed with 500+ businesses competing for the same customers.',
    'Three universities — Gannon, Mercyhurst, and Penn State Behrend — produce a digitally native customer base that researches businesses online before stepping through the door.',
    'The Bayfront redevelopment and EDDC initiatives are attracting new businesses at a pace the region has not seen in decades, raising the bar for every company\'s online presence.',
    'Erie\'s tourism economy, anchored by Presque Isle State Park and the lakefront district, brings over four million visitors annually who plan their trips entirely through online search.',
    'With healthcare giants like UPMC Hamot and insurance leaders like Erie Insurance headquartered here, the professional services market is large, competitive, and increasingly digital-first.',
  ],
  meadville: [
    'Meadville is the county seat of Crawford County, where Allegheny College drives a steady stream of students, faculty, and visiting families who judge every business by its online presence.',
    'Downtown Meadville is experiencing a quiet revival along Chestnut Street and the Diamond Park area, with new storefronts filling spaces that sat empty for years.',
    'Crawford County\'s healthcare sector, led by Meadville Medical Center, anchors a service economy that extends well beyond the borough\'s 13,000 residents.',
    'Meadville businesses compete not just with each other but with Erie\'s retail corridor 35 minutes north — a professional website keeps dollars local.',
    'The college-town economy means younger, mobile-first customers who check Google reviews and scroll Instagram before they consider walking through your door.',
  ],
  warren: [
    'Warren sits along the Allegheny River about 65 minutes southeast of Erie, where the outdoor tourism economy driven by the Allegheny National Forest and Kinzua Bridge is reshaping local business.',
    'Companies like United Refining and Blair Corporation provide an industrial employment base, while hundreds of thousands of annual visitors search for dining, lodging, and outfitters online.',
    'Warren\'s walkable downtown and the Struthers Library Theatre give it cultural weight that punches above its 9,000-person population.',
    'Most visitors to the Allegheny National Forest region plan their trips online weeks in advance — businesses without a modern website are invisible to this growing market.',
    'Warren County\'s manufacturing and service businesses increasingly compete for talent against remote work opportunities, making a professional digital presence essential for recruitment.',
  ],
  corry: [
    'Corry is a manufacturing city in southern Erie County with deep roots in skilled trades — Corry Rubber Corporation and specialty manufacturers anchor the local economy.',
    'Main Street retains an independent character with locally owned shops and service providers who have operated for generations, but the next generation of customers starts every search online.',
    'Proximity to both Erie and the Allegheny National Forest gives Corry businesses access to a wider customer base than the borough\'s 6,000 residents suggest.',
    'Corry\'s trade businesses often rely on decades-old word-of-mouth relationships, but B2B buyers now research vendors online before making a single phone call.',
    'Competing with Erie\'s big-box Peach Street corridor means Corry businesses must offer the online convenience — hours, booking, menus, inventory — that customers treat as baseline.',
  ],
  edinboro: [
    'Edinboro is a college town shaped by PennWest Edinboro, where thousands of students create year-round demand for restaurants, retail, and services.',
    'Edinboro Lake and the annual Scottish Festival draw visitors from across the region, adding a seasonal tourism layer to the student-driven economy.',
    'College students are the most digitally dependent consumers in the country — they will not visit a restaurant without checking the menu online first.',
    'As PennWest consolidation reshapes the university system, Edinboro businesses with strong web presence are best positioned to thrive through the transition.',
    'Edinboro\'s proximity to Erie means local businesses compete directly with the city\'s options, and a polished online presence is the equalizer.',
  ],
  'north-east': [
    'North East is the heart of Pennsylvania\'s Lake Erie Wine Country, producing more wine grapes than any other region in the state.',
    'The Lake Erie Wine Country trail draws visitors from Pittsburgh, Cleveland, and Buffalo year-round, and nearly all of them discover local businesses through Google and social media.',
    'Agritourism is booming — wineries, tasting rooms, B&Bs, and farm markets have a larger addressable audience than ever, but only if their websites show up in search results.',
    'North East\'s charming downtown and seasonal farm markets have become a destination, drawing visitors who choose between a dozen wineries based on what they find online.',
    'Short-term rental platforms are bringing a new wave of visitors to the area, each one searching for things to do, places to eat, and experiences to book — all on their phones.',
  ],
  fairview: [
    'Fairview is one of Erie County\'s fastest-growing townships, attracting young families with top-rated schools, new housing developments, and easy access to the I-90 corridor.',
    'The Route 20 commercial strip is expanding with new restaurants, professional offices, and service businesses competing for Fairview\'s growing residential base.',
    'New residents search for local dentists, restaurants, and contractors within their first week — and the businesses that appear on page one get the call.',
    'Fairview\'s combination of lakefront character, suburban growth, and proximity to both Erie and Girard makes it a high-demand market for service-based businesses.',
    'Families with disposable income are Fairview\'s core demographic, and they research every purchase online before committing.',
  ],
  harborcreek: [
    'Harborcreek is a large township east of Erie, where Penn State Behrend brings over 4,000 students and a constant flow of visiting families and conference attendees.',
    'The Buffalo Road corridor continues to add retail and service businesses, creating competition that did not exist a decade ago.',
    'Harborcreek\'s mix of residential neighborhoods, academic activity, and commercial growth creates a diverse economy with multiple customer segments to capture.',
    'Every student, parent, and professional passing through Harborcreek is searching on their phone for places to eat, shop, and stay.',
    'Proximity to both I-90 and North East\'s wine country gives Harborcreek businesses strategic access to through-traffic and tourism dollars.',
  ],
  millcreek: [
    'Millcreek is Erie County\'s largest township with 54,000 residents and the most competitive commercial corridor in northwest Pennsylvania — Peach Street.',
    'Hundreds of businesses from restaurants to medical practices are packed into a few-mile radius along Peach Street, all fighting for the same local customers.',
    'Millcreek houses more people than the City of Erie itself, with residential neighborhoods feeding steady demand for every category of local business.',
    'When someone searches "best pizza near me" or "plumber in Millcreek," the businesses with optimized, well-designed websites get the call — the rest get scrolled past.',
    'The township\'s school district, parks, and community identity make Millcreek feel like its own city, with customers who prefer to shop local when they can find what they need online.',
  ],
  girard: [
    'Girard sits along the Route 20 corridor between Erie and the Ohio border, giving local businesses access to pass-through traffic and a loyal hometown customer base.',
    'Main Street retains a classic small-town character with family-owned shops, restaurants, and services that form the backbone of the local economy.',
    'Dan Rice Days and other community events draw visitors from across Erie County, creating seasonal spikes in local business traffic.',
    'Girard\'s agricultural community — including wineries and farm markets — connects it to the broader Lake Erie agritourism economy.',
    'Younger residents increasingly shop and search online, and even the most established Main Street businesses need a web presence that reflects their quality.',
  ],
};

// ---- Industry-specific local angle snippets --------------------------------
// Each industry gets 4-5 sentences about how customers in small PA towns find
// these businesses, competitive landscape, and specific challenges.

const industryLocalAngles: Record<string, string[]> = {
  dental: [
    'Dental patients in small Pennsylvania towns choose their provider with a single Google search — "dentist near me" drives more new patient bookings than any referral network.',
    'Corporate chains like Aspen Dental are aggressively expanding into northwest PA markets, outspending independents on advertising and dominating local search results.',
    'A practice without online scheduling is losing patients to the competitor down the street who lets people book at 10 PM on a Tuesday.',
    'Patient reviews and before-after galleries on your website build trust faster than any mailer or Yellow Pages ad ever did.',
    'Insurance verification, new patient forms, and virtual consultations are table stakes for modern dental websites in competitive markets.',
  ],
  'financial-advisors': [
    'Financial advisor searches in smaller Pennsylvania markets are highly competitive because a single client relationship can be worth six figures over a lifetime.',
    'Trust is the currency of financial services — a dated or template website signals to prospects that you are not keeping up with the times.',
    'Younger inheritors and next-generation wealth holders research advisors online and expect educational content, transparent credentials, and easy scheduling.',
    'Compliance-friendly website design is critical for financial advisors — every claim, testimonial, and performance reference needs proper disclosure.',
    'Local advisors competing against robo-advisors and national firms need a digital presence that communicates personal service and regional expertise.',
  ],
  'car-dealerships': [
    'Car buyers spend an average of 14 hours researching online before setting foot on a lot — and 90% of that research happens on mobile devices.',
    'Dealerships in smaller PA markets often rely on manufacturer-provided website templates that look identical to every other dealer in the region.',
    'Inventory search, trade-in estimators, and financing pre-approval tools on your website can capture leads that would otherwise go to AutoTrader or CarGurus.',
    'Local dealerships compete with online-first platforms like Carvana and Vroom — a fast, modern website is the minimum to stay in the game.',
    'Service department booking, recall notifications, and parts ordering through your website create recurring revenue streams that most small-market dealers ignore.',
  ],
  'it-services': [
    'Small and mid-size businesses in PA are increasingly targeted by cyberattacks, driving urgent demand for managed IT services — but most MSPs have websites that inspire zero confidence.',
    'IT service providers in smaller markets compete for the same limited pool of local businesses, making differentiation through professional web presence essential.',
    'Decision-makers evaluating managed IT providers check websites for case studies, certifications, and clear pricing before they will even take a sales call.',
    'The shift to remote and hybrid work has expanded the addressable market for IT services well beyond geographic boundaries — your website is your storefront for clients statewide.',
    'Cybersecurity incident response, cloud migration, and compliance services need dedicated landing pages because business owners search for specific problems, not generic IT support.',
  ],
  'law-firms': [
    'Legal searches are among the highest-value clicks in any market — a single personal injury or family law client can represent $10,000 to $500,000 in revenue.',
    'Potential clients searching for attorneys in smaller PA towns are looking for local expertise and trust signals — bar memberships, case results, and community involvement.',
    'Most law firm websites in smaller markets are cookie-cutter templates with stock gavels and scales of justice — a custom site immediately signals a different caliber of practice.',
    'Practice area pages optimized for specific legal queries — "DUI lawyer near me" or "custody attorney in [city]" — capture high-intent searchers ready to hire.',
    'Client intake forms, consultation scheduling, and live chat on a law firm website reduce the friction between a prospect\'s moment of need and their decision to hire.',
  ],
  'vision-care': [
    'Vision care patients often search for both the provider and specific services — "LASIK near me," "pediatric eye exam," "contact lens fitting" — requiring dedicated pages for each.',
    'Optical shops and eye care practices in smaller PA markets compete with big-box retailers like LensCrafters and Walmart Vision Center on price, but win on service and expertise.',
    'Online appointment booking for eye exams is now expected by patients, not appreciated — practices without it lose bookings to the competitor who offers it.',
    'Frame galleries, virtual try-on tools, and insurance lookup features on your website turn browsers into booked appointments.',
    'Vision care practices serving rural communities often draw patients from 30+ miles away, making online visibility across multiple zip codes critical.',
  ],
  chiropractors: [
    'Chiropractic patients in PA towns rely heavily on Google reviews and website quality to choose a provider, often deciding between 2-3 options within minutes.',
    'New patient specials, treatment explanations, and before-after testimonials on your website do the selling before the patient ever calls.',
    'Chiropractors in smaller markets often serve a wide radius — patients drive 20-30 minutes — making visibility in surrounding town searches essential.',
    'Content marketing around common conditions — back pain, sciatica, sports injuries — captures search traffic from people who do not yet know they need a chiropractor.',
    'Online scheduling and insurance verification are the two website features that most directly convert visitors into booked first appointments.',
  ],
  orthopedics: [
    'Orthopedic patients searching for care in northwest PA are often choosing between local providers and making the drive to Pittsburgh or Cleveland — your website determines whether they stay local.',
    'Surgeon profiles, procedure explanations with recovery timelines, and patient success stories are the content that converts orthopedic website visitors into consultations.',
    'Sports medicine, joint replacement, and physical therapy each need dedicated landing pages because patients search for the specific condition, not the practice name.',
    'Referring physicians increasingly check a specialist\'s website before making a referral — an outdated site raises questions about the quality of care.',
    'Orthopedic practices in smaller markets have a geographic advantage but only if patients can find them online when searching from surrounding communities.',
  ],
  landscaping: [
    'Landscaping customers in PA search seasonally — spring cleanups, summer maintenance, fall leaf removal, snow plowing — and your website needs content for every cycle.',
    'Before-and-after project galleries are the single most effective conversion tool for landscaping websites, and most competitors neglect them entirely.',
    'Homeowners in suburban PA communities expect online quotes, service area maps, and clear pricing tiers — not a phone number and a prayer.',
    'Commercial landscaping contracts for property management companies and HOAs start with an online search and a website that signals professionalism and capacity.',
    'Reviews from local homeowners carry enormous weight in landscaping — embedding Google reviews directly on your site builds trust faster than any sales pitch.',
  ],
  manufacturing: [
    'Manufacturing companies in northwest PA often have websites that have not been updated since 2010, creating a disconnect between their real capabilities and how they appear online.',
    'B2B buyers and procurement managers research suppliers online before initiating contact — a professional website with capabilities, certifications, and case studies is table stakes.',
    'Talent recruitment is a major challenge for PA manufacturers, and job seekers under 40 will not apply to a company whose website looks abandoned.',
    'ISO certifications, industry-specific capabilities, and equipment lists need to be prominently featured because procurement decisions often start with a keyword search for specific processes.',
    'Manufacturing companies that export or serve national clients need a web presence that communicates scale and professionalism beyond their small-town address.',
  ],
  restaurants: [
    'Restaurant customers in PA check the menu, hours, and reviews online before deciding where to eat — if your website does not have current information, they go somewhere else.',
    'Google Maps and "restaurants near me" drive the majority of new restaurant discovery in smaller markets, making Google Business Profile and website optimization essential.',
    'Online ordering, reservation systems, and event booking on your website capture revenue that third-party platforms like DoorDash and Yelp take a 15-30% cut from.',
    'Seasonal menus, daily specials, and event calendars need to be easy to update — restaurants with stale websites train customers to not trust the information they find.',
    'Food photography and atmosphere shots on your website set expectations that bring in the right customers and reduce no-shows and complaints.',
  ],
  'real-estate': [
    'Real estate agents and brokerages in PA compete with Zillow, Realtor.com, and Redfin for the same eyeballs — a personal website with local expertise is the only way to differentiate.',
    'Home buyers researching specific communities want neighborhood guides, school information, and market data that national portals cannot provide with local depth.',
    'IDX-integrated websites that let visitors search listings directly keep prospects on your site instead of losing them to aggregator platforms.',
    'Seller leads increasingly come from online home valuation tools — agents without this feature on their website are missing the highest-value lead generation mechanism available.',
    'Real estate is inherently local, and agents who rank for "[town name] homes for sale" capture leads that have already decided where they want to live.',
  ],
  hvac: [
    'HVAC searches spike with the weather — the first heat wave and first freeze drive urgent searches where being on page one of Google means booked calls for weeks.',
    'HVAC customers in smaller PA markets have 3-5 options and choose based on website professionalism, reviews, and whether they can get a quote without playing phone tag.',
    'Emergency service availability — clearly communicated on your website with a click-to-call button — is the difference between capturing a $500 service call and losing it.',
    'Seasonal maintenance plans, financing options, and energy efficiency calculators on your website generate leads year-round, not just during emergencies.',
    'HVAC companies that serve a 30-mile radius need to rank in multiple town searches, not just their home base — geo-targeted landing pages solve this.',
  ],
  plumbing: [
    'Plumbing emergencies drive the highest-urgency searches in any home services category — when a pipe bursts, the homeowner calls whoever shows up first on Google.',
    'Plumbers in smaller PA markets often rely entirely on referrals, but the next generation of homeowners opens Google before they ask a neighbor.',
    'Clear service descriptions, pricing transparency, and emergency availability prominently displayed on your website convert panicked searchers into booked calls.',
    'Drain cleaning, water heater replacement, and bathroom remodeling each need their own page because customers search for the specific problem they are facing.',
    'Plumbing companies with professional websites and strong reviews command higher prices because customers associate online professionalism with quality work.',
  ],
  electricians: [
    'Electrical work requires licensing and trust — homeowners search for "licensed electrician near me" and make decisions based on credentials displayed on your website.',
    'Electricians in smaller PA markets often have no website at all, which means even a basic professional site puts you ahead of half the competition.',
    'Residential rewiring, panel upgrades, and EV charger installation are growing service categories that need dedicated pages to capture specific search traffic.',
    'Commercial electricians serving manufacturers and contractors need a B2B-oriented website that communicates capacity, certifications, and project history.',
    'Emergency electrical service — clearly communicated with 24/7 availability and a prominent phone number — captures high-value urgent calls that drive revenue.',
  ],
  insurance: [
    'Independent insurance agents in PA compete with GEICO, Progressive, and State Farm\'s national advertising — a professional local website is the only way to stand out in search results.',
    'Insurance shoppers compare 3-5 options online before contacting an agent, and they eliminate providers with dated or unprofessional websites within seconds.',
    'Quote request forms, coverage comparison tools, and educational content about local insurance requirements drive qualified leads directly from search traffic.',
    'Insurance is a trust business — agent bios, community involvement, and client testimonials on your website build the credibility that national brands cannot replicate locally.',
    'Life events trigger insurance searches — new home, new baby, new business — and agents who rank for these specific queries capture clients at the moment of highest intent.',
  ],
  accounting: [
    'Accounting clients in smaller PA markets search for help during tax season, but the best firms capture year-round advisory clients through educational website content.',
    'Business owners evaluating accountants check websites for industry specialization, credentials (CPA, EA), and service descriptions before scheduling a consultation.',
    'Tax preparation, bookkeeping, and business advisory services each need dedicated pages because clients search for the specific service they need, not a generic accounting firm.',
    'Client portals, document upload tools, and appointment scheduling on your website reduce administrative overhead and signal a modern, efficient practice.',
    'Small-town accountants serving a regional client base need to appear in searches across multiple communities, not just their office location.',
  ],
  veterinary: [
    'Pet owners are emotionally invested in their veterinary provider — they research extensively online, read every review, and make decisions based on the warmth and professionalism of a practice\'s website.',
    'Emergency veterinary care searches are urgent and high-value — practices that clearly communicate after-hours availability on their website capture these calls.',
    'Services like dental cleanings, wellness plans, and boarding need individual pages because pet owners search for specific needs, not just "vet near me."',
    'Staff bios with photos, facility tours, and patient success stories on your website build the emotional connection that drives loyalty in veterinary care.',
    'Veterinary practices in rural PA often serve a 30-mile radius — ranking in surrounding town searches is critical to maintaining a full appointment book.',
  ],
  'gyms-fitness': [
    'Gym and fitness studio customers make 80% of their decision online — checking class schedules, pricing, photos, and reviews before they ever visit in person.',
    'Membership signups, class booking, and free trial offers on your website convert browsers into members without requiring a phone call or walk-in.',
    'Fitness businesses in smaller PA markets compete with Planet Fitness and national chains on price, but win on community, personal training, and specialized programming.',
    'Seasonal demand spikes — New Year, spring, back-to-school — drive search traffic that a well-optimized fitness website can capture into long-term memberships.',
    'Virtual class offerings, personal training bios, and transformation stories on your website differentiate a serious fitness business from a commodity gym.',
  ],
  'salons-spas': [
    'Salon and spa clients discover new providers primarily through Google search and Instagram — your website bridges the gap between social discovery and booked appointments.',
    'Online booking is non-negotiable for salons in 2025 — clients expect to see availability and book at midnight, not call during business hours.',
    'Service menus with pricing, stylist portfolios, and before-after galleries on your website reduce no-shows by setting clear expectations before the appointment.',
    'Gift card sales, loyalty programs, and product retail through your website generate revenue outside of chair time.',
    'Salons and spas in smaller PA markets build clientele from a wide radius — appearing in searches for surrounding towns expands your reach without expanding your rent.',
  ],
};

// ---- High-value intersection overrides -------------------------------------
// Fully custom paragraphs for the most important industry+location combos.
// Key format: 'industrySlug--locationSlug'

const intersectionOverrides: Record<string, string> = {
  // --- Erie (all 20 industries) ---
  'dental--erie':
    'Erie has over 80 dental practices competing for the same patients, from solo providers on Peach Street to corporate chains near the Millcreek Mall. When someone searches "dentist near me" from their car on West 12th or their dorm at Gannon, they pick the practice with the best website and reviews — not the one with the most years in business. A custom website with online scheduling, insurance verification, and patient reviews puts your practice at the top of that decision.',

  'financial-advisors--erie':
    'Erie\'s wealth management market is shaped by Erie Insurance retirees, small business owners along the I-90 corridor, and a growing professional class working in healthcare and higher education. With Northwestern Mutual, Edward Jones, and independent RIAs all competing for the same high-net-worth clients, a financial advisor\'s website is often the first — and deciding — impression. Your site needs to communicate fiduciary credibility, local market expertise, and a clear path to scheduling a consultation.',

  'car-dealerships--erie':
    'The Peach Street auto corridor is one of the densest dealership clusters in Pennsylvania — Toyota, Ford, Chevy, Honda, and a dozen independents all within a few miles. Every buyer starts on Google, and the dealership websites that load fast, display live inventory, and offer trade-in tools online capture the lead before the buyer drives down Peach Street. Manufacturer-provided templates make every dealer look the same. A custom website is how you stand out.',

  'it-services--erie':
    'Erie\'s business community — from Bayfront startups to Peach Street retailers to manufacturing operations in the industrial corridor — increasingly depends on managed IT, cybersecurity, and cloud services. The problem is that most MSPs in the Erie market have websites that look like they were built in 2015. Decision-makers evaluating IT providers check your site for case studies, certifications, and clear service descriptions before they take a meeting.',

  'law-firms--erie':
    'Erie County has over 400 licensed attorneys, and the ones winning new clients in 2025 are the ones showing up when someone searches "divorce lawyer Erie PA" or "car accident attorney near me" from their phone. Legal searches carry the highest cost-per-click in advertising because every lead is worth thousands. A well-designed law firm website with practice area pages, attorney bios, and client intake forms captures those leads organically — without paying $200 per click.',

  'vision-care--erie':
    'Vision care in Erie ranges from independent optometrists near Liberty Plaza to ophthalmology practices at UPMC Hamot to optical chains in the Millcreek Mall area. Patients searching for eye exams, glasses, or LASIK start online and choose based on convenience, reviews, and how professional the practice appears. A website with online scheduling, frame galleries, and insurance lookup converts the casual searcher into a booked appointment.',

  'chiropractors--erie':
    'Erie\'s chiropractic market includes practices along Peach Street, near the universities, and scattered through residential neighborhoods. Patients dealing with back pain or sports injuries search Google first and typically compare 2-3 options within five minutes. A website that loads fast, explains your approach, features real patient testimonials, and offers online booking wins that comparison every time — especially against competitors still relying on Facebook pages.',

  'orthopedics--erie':
    'Orthopedic patients in the Erie area often face a choice: see a local provider or make the two-hour drive to Pittsburgh or Cleveland. UPMC Hamot, AHN Saint Vincent, and independent orthopedic groups compete for these patients, and the decision increasingly starts online. A website with surgeon profiles, procedure explanations, recovery timelines, and patient success stories keeps patients local by building confidence in your expertise.',

  'landscaping--erie':
    'Erie\'s landscaping market cycles through spring cleanups, summer lawn care, fall leaf removal, and winter snow plowing — and homeowners search for each service separately at different times of year. From Millcreek McMansions to Harborcreek subdivisions to downtown commercial properties, the demand is constant. A website with seasonal service pages, project galleries, and online quote requests captures leads that a "call for estimate" approach loses to faster competitors.',

  'manufacturing--erie':
    'Erie has been a manufacturing city for over a century — from GE Transportation to Eriez Magnetics to dozens of specialty shops in the industrial corridor. But many of these companies have websites that have not been updated since the Bush administration. Procurement managers, engineers, and potential employees research suppliers online, and a dated website signals a company that is not keeping pace. A modern site with capabilities, certifications, and case studies opens doors that cold calls cannot.',

  'restaurants--erie':
    'Erie\'s restaurant scene is competitive and growing — from the Bayfront dining district to the ethnic food corridor on lower State Street to the endless Peach Street chain options. Presque Isle visitors, university students, and downtown workers all discover restaurants through Google Maps and "restaurants near me" searches. A fast website with current menus, online ordering, event information, and reservation booking captures the diners who would otherwise default to whatever chain has the best Google listing.',

  'real-estate--erie':
    'Erie\'s real estate market is heating up — the Bayfront renaissance, remote work migration, and relative affordability compared to other lakefront cities are driving buyer interest. Agents and brokerages competing with Zillow and Realtor.com need a website that provides local depth: neighborhood guides for Frontier Park vs. Glenwood vs. Millcreek, school district comparisons, and market data that national portals cannot replicate. IDX-integrated listings and home valuation tools keep leads on your site.',

  'hvac--erie':
    'Erie winters are brutal — lake-effect snow, sub-zero wind chills, and heating systems that run non-stop from November through March. When a furnace dies at 2 AM in January, the homeowner searches "emergency HVAC Erie" and calls whoever appears first with a professional website and clear emergency service information. Summer brings its own demand as more Erie homes add central air. A website with seasonal content, financing options, and prominent emergency contact info captures both cycles.',

  'plumbing--erie':
    'From frozen pipes in January to sewer backups during spring thaw to bathroom remodels in summer, Erie plumbers serve urgent demand year-round. When a pipe bursts in an old house on West 6th or a water heater fails in a Millcreek subdivision, the homeowner calls whoever appears first on Google. A website with clear emergency availability, service descriptions, and strong reviews wins those high-value calls — often worth $300 to $3,000 each.',

  'electricians--erie':
    'Erie\'s housing stock includes thousands of homes built before 1960 that need panel upgrades, rewiring, and code compliance work. Add in the growing demand for EV charger installation, smart home wiring, and commercial electrical work along the Peach Street corridor, and Erie electricians have more work than they can handle. The bottleneck is being found. A professional website with licensing credentials, service pages, and online scheduling fills the pipeline.',

  'insurance--erie':
    'Erie is literally an insurance town — Erie Insurance is the largest employer in the city, and the broader insurance industry shapes the local economy. Independent agents here compete with the company that shares the city\'s name, plus national brands advertising during every commercial break. A professional website that communicates personal service, local expertise, and easy quote requests gives independent agents the edge that national brands cannot replicate.',

  'accounting--erie':
    'Erie\'s diverse economy — healthcare, manufacturing, insurance, higher education, tourism — means accountants serve a wide range of clients with different needs. From tax preparation for Presque Isle seasonal workers to business advisory for Bayfront entrepreneurs to nonprofit auditing for local organizations, the demand is there. A website with clear service descriptions, industry specializations, and a secure client portal separates a modern practice from the one still advertising in the phone book.',

  'veterinary--erie':
    'Erie is a pet-loving city with over a dozen veterinary practices competing for the area\'s dog and cat owners. Pet owners in Erie research providers obsessively — reading every review, checking hours, and looking for emergency care availability — before choosing a vet. A website with staff photos, facility tours, service descriptions, and online appointment booking builds the trust and convenience that drives loyalty in a market where switching costs are purely emotional.',

  'gyms-fitness--erie':
    'Erie\'s fitness market ranges from Planet Fitness and LA Fitness on Peach Street to CrossFit boxes, yoga studios, and personal training gyms scattered through the metro area. With three college campuses feeding a young, fitness-conscious population and a growing wellness culture among professionals, the demand is strong. A website with class schedules, membership pricing, virtual tours, and free trial signups converts the motivated searcher into a paying member.',

  'salons-spas--erie':
    'Erie\'s salon and spa market is saturated — dozens of options line Peach Street, populate the Millcreek area, and fill downtown storefronts near Gannon and Mercyhurst. The university population alone drives massive demand for hair, nails, and aesthetics services. A website with online booking, stylist portfolios, service menus with pricing, and Instagram integration captures the client who is choosing between three tabs on their phone right now.',

  // --- Millcreek (top 10 industries) ---
  'dental--millcreek':
    'Millcreek\'s Peach Street corridor has the highest concentration of dental practices in Erie County — corporate chains, group practices, and solo providers all within a few miles. When 54,000 Millcreek residents search for a dentist, your website is competing directly against practices in the same shopping plazas. Online scheduling, patient reviews, and a site that loads in under two seconds are the minimum to win the click.',

  'restaurants--millcreek':
    'Millcreek is where Erie eats — Peach Street alone has more restaurants per mile than anywhere else in northwest Pennsylvania. From fast-casual chains to independent sit-downs, the competition for every meal is fierce. A restaurant website with current menus, online ordering, and event booking captures the diner who is scrolling through options in the Millcreek Mall parking lot.',

  'law-firms--millcreek':
    'Millcreek\'s professional office parks along Peach Street and West 38th house dozens of law firms, from solo practitioners to multi-attorney practices. Residents searching for legal help often start with "lawyer near me" from their Millcreek home. Practice-specific landing pages — family law, real estate, personal injury — rank for the exact terms potential clients type.',

  'hvac--millcreek':
    'Millcreek\'s 54,000 residents live in everything from 1950s ranches to new construction, and every home needs heating and cooling. The sheer density of homes means HVAC demand is constant and competitive. A website that ranks for "HVAC Millcreek PA" with clear pricing, emergency service info, and seasonal maintenance plans captures the highest volume of residential calls in Erie County.',

  'real-estate--millcreek':
    'Millcreek is the most active residential real estate market in Erie County — larger than the city of Erie itself. Buyers searching for homes near the Peach Street corridor, the schools, or the lake want neighborhood-level detail that Zillow cannot provide. An agent website with Millcreek-specific market data, school district comparisons, and interactive maps keeps these high-intent leads local.',

  'car-dealerships--millcreek':
    'The Peach Street auto mile runs straight through Millcreek, making it the car-buying capital of northwest Pennsylvania. Buyers compare dealers within a one-mile radius, and the showroom visit starts with a website visit. Live inventory, trade-in tools, and financing calculators on a fast, mobile-friendly site determine which dealership gets the test drive.',

  'salons-spas--millcreek':
    'Millcreek\'s shopping plazas and strip malls house more salons and spas than any other area in Erie County. Competition is intense, and clients switch providers based on convenience and first impressions. A website with online booking, real portfolio photos, and clear pricing is the difference between a fully booked schedule and empty chairs.',

  'insurance--millcreek':
    'Millcreek\'s dense residential population means a massive addressable market for insurance — auto, home, life, and business. Peach Street agencies compete with Erie Insurance\'s headquarters just minutes away and national brands in every ad break. A professional website with quote forms, coverage explanations, and genuine client testimonials is how independent agents win in Erie Insurance\'s backyard.',

  'veterinary--millcreek':
    'Millcreek\'s family-oriented communities are packed with pet owners who spend as much time researching vets as they do choosing pediatricians. Multiple veterinary practices serve the township, and the ones with professional websites featuring online booking, transparent pricing, and staff bios earn the trust — and loyalty — of Millcreek\'s pet parents.',

  'gyms-fitness--millcreek':
    'The Peach Street corridor has every national gym chain, but Millcreek\'s independent fitness studios, martial arts schools, and personal training gyms compete by offering what the chains cannot — community, specialization, and personal attention. A website that communicates that difference with class schedules, trainer profiles, and member stories converts the motivated searcher who is tired of the big-box gym experience.',

  // --- Meadville (top 5 industries) ---
  'dental--meadville':
    'Meadville\'s dental market serves Crawford County\'s 85,000 residents, with practices clustered along Park Avenue and the Route 19 corridor. Allegheny College students and faculty expand the patient base, but they expect the same online booking and digital experience they had in their home cities. A professional dental website captures both the loyal local patient and the college-connected newcomer.',

  'restaurants--meadville':
    'Meadville\'s dining scene is anchored by independent restaurants along Chestnut Street and the Diamond Park area, plus the Route 322 corridor options serving Allegheny College families and road-trippers. A restaurant in Meadville needs a website that keeps diners from defaulting to the drive up to Erie — current menus, online ordering, and a sense of the atmosphere that makes Meadville dining worth the stop.',

  'law-firms--meadville':
    'Crawford County\'s legal market is smaller than Erie\'s but equally competitive for the clients who are there — real estate closings, estate planning, family law, and small business matters. Meadville attorneys who rank for "lawyer Meadville PA" and related practice area searches capture the clients who would otherwise make the 35-minute drive to an Erie firm.',

  'real-estate--meadville':
    'Meadville\'s real estate market attracts buyers looking for affordability and small-town quality of life — Allegheny College families, remote workers, and retirees. An agent website with Meadville neighborhood guides, school information, and market data positions you as the local expert that Zillow\'s algorithm cannot replicate.',

  'hvac--meadville':
    'Crawford County winters are every bit as harsh as Erie\'s, and Meadville\'s housing stock includes century-old homes with aging heating systems. HVAC companies that rank for "furnace repair Meadville" and "AC installation Crawford County" capture the high-urgency calls that drive revenue. A website with emergency service information, financing options, and seasonal maintenance plans converts searches into service calls.',

  // --- Additional high-value combos ---
  'landscaping--millcreek':
    'Millcreek\'s residential density creates nonstop demand for lawn care, landscaping, and snow removal. Homeowners in subdivisions near Peach Street and the lake expect professional-grade service and they find providers by searching online. A landscaping website with seasonal service pages, project galleries, and online quote requests earns the recurring contracts that sustain a business year-round.',

  'plumbing--millcreek':
    'Millcreek has more homes than any other municipality in Erie County, which means more leaky faucets, clogged drains, and water heater failures. When a Millcreek homeowner has a plumbing emergency, they search on their phone and call the first plumber with a professional website and clear emergency availability. Ranking for "plumber Millcreek PA" is worth thousands in monthly revenue.',

  'electricians--millcreek':
    'From panel upgrades in older Millcreek homes to new construction wiring in the township\'s expanding subdivisions, electrical work in Millcreek is constant. Add growing demand for EV charger installations and smart home systems, and Millcreek electricians have a deep market — if they can be found online. A professional website with clear licensing, service descriptions, and scheduling captures the homeowner who needs work done now.',

  'it-services--meadville':
    'Meadville\'s small business community — retail shops along Chestnut Street, medical offices, and manufacturing operations in Crawford County — increasingly needs managed IT, cybersecurity, and cloud services. IT providers with a professional website that showcases local client relationships and specific capabilities capture the businesses that feel underserved by Erie-based providers who treat Crawford County as an afterthought.',

  'financial-advisors--meadville':
    'Crawford County has significant wealth in agricultural land, small business ownership, and retirement savings from manufacturing careers. Financial advisors who rank for "financial advisor Meadville PA" with a website that communicates local expertise, fiduciary responsibility, and a clear consultation booking process capture clients who prefer to work with someone who understands the regional economy.',

  'dental--fairview':
    'Fairview\'s rapid residential growth means new families searching for dentists within their first week in the community. Practices that rank for "dentist Fairview PA" with a modern website and online booking capture these new residents before they default to established Erie providers. The township\'s family demographic makes pediatric and cosmetic dentistry particularly strong search categories.',

  'dental--harborcreek':
    'Harborcreek\'s Penn State Behrend campus and growing residential neighborhoods create a patient base split between college students and families. Dental practices that serve both demographics need a website that communicates convenience, quality, and online booking. Ranking for "dentist near Penn State Behrend" captures a unique traffic stream that most competitors ignore.',

  'restaurants--north-east':
    'North East\'s wine tourism economy creates a dining market that depends almost entirely on online discovery. Visitors researching Lake Erie Wine Country plan their meals before they arrive, choosing restaurants based on menus, atmosphere photos, and reviews they find online. A restaurant website that captures this planning-phase traffic — with current menus, wine pairings, reservation booking, and seasonal event information — converts visitors before they even cross the borough line.',

  'restaurants--warren':
    'Warren\'s restaurant scene serves both locals and the growing number of tourists visiting the Allegheny National Forest and Kinzua Bridge. Visitors search "restaurants near Kinzua Bridge" and "where to eat in Warren PA" days before they arrive. A website with current menus, atmosphere photos, and easy directions from major attractions captures the tourism dollar that otherwise goes to a gas station sandwich.',

  'manufacturing--corry':
    'Corry\'s manufacturing identity runs deep — Corry Rubber Corporation and other specialty operations have made things here for generations. But B2B procurement has moved online, and a manufacturer with a 2008-era website loses contracts to competitors whose sites communicate capability, quality, and professionalism. A modern website with equipment lists, certifications, case studies, and RFQ forms competes at a level that matches the actual quality of Corry manufacturing.',

  'landscaping--fairview':
    'Fairview\'s residential boom is creating a steady pipeline of new homeowners who need landscaping, lawn care, and snow removal. These families are used to researching and booking services online, and they choose providers based on website quality, project galleries, and review ratings. A landscaping company with a professional site that ranks for "landscaping Fairview PA" captures the new-construction market that will generate recurring revenue for years.',
};

// ---- Deterministic hash for sentence selection -----------------------------
// Simple but effective: ensures each combo gets a different mix of sentences.

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

function selectSentences(
  sentences: string[],
  hash: number,
  count: number,
): string[] {
  const indices: number[] = [];
  const len = sentences.length;
  if (len === 0) return [];

  let h = hash;
  let iterations = 0;
  const maxIterations = count * 10; // Safety valve

  while (indices.length < count && indices.length < len && iterations < maxIterations) {
    const idx = h % len;
    if (!indices.includes(idx)) {
      indices.push(idx);
    }
    h = ((h * 31 + 7) >>> 0) % 2147483647 || 1;
    iterations++;
  }

  return indices.map((i) => sentences[i]);
}

// ---- Main content function -------------------------------------------------

export function getIntersectionContent(
  industrySlug: string,
  locationSlug: string,
): string {
  const key = `${industrySlug}--${locationSlug}`;

  // Check for a fully custom override first
  if (intersectionOverrides[key]) {
    return intersectionOverrides[key];
  }

  // Compose from location + industry contexts using deterministic selection
  const locSentences = locationContexts[locationSlug] ?? [];
  const indSentences = industryLocalAngles[industrySlug] ?? [];

  if (locSentences.length === 0 && indSentences.length === 0) {
    return '';
  }

  const hash = simpleHash(key);

  // Pick 1-2 location sentences and 2 industry sentences for 3-4 total
  const locCount = 1 + (hash % 2); // 1 or 2
  const indCount = 4 - locCount; // 2 or 3

  const selectedLoc = selectSentences(locSentences, hash, locCount);
  const selectedInd = selectSentences(indSentences, hash + 97, indCount);

  // Interleave: start with location context, then industry angle
  return [...selectedLoc, ...selectedInd].join(' ');
}

// ---- FAQ generation --------------------------------------------------------

interface IntersectionFaq {
  readonly question: string;
  readonly answer: string;
}

const industryNames: Record<string, string> = {
  dental: 'dental practices',
  'financial-advisors': 'financial advisors',
  'car-dealerships': 'car dealerships',
  'it-services': 'IT service providers',
  'law-firms': 'law firms',
  'vision-care': 'vision care practices',
  chiropractors: 'chiropractors',
  orthopedics: 'orthopedic practices',
  landscaping: 'landscaping companies',
  manufacturing: 'manufacturers',
  restaurants: 'restaurants',
  'real-estate': 'real estate agents',
  hvac: 'HVAC companies',
  plumbing: 'plumbing companies',
  electricians: 'electricians',
  insurance: 'insurance agencies',
  accounting: 'accounting firms',
  veterinary: 'veterinary practices',
  'gyms-fitness': 'gyms and fitness studios',
  'salons-spas': 'salons and spas',
};

const industrySingular: Record<string, string> = {
  dental: 'a dental practice',
  'financial-advisors': 'a financial advisor',
  'car-dealerships': 'a car dealership',
  'it-services': 'an IT services company',
  'law-firms': 'a law firm',
  'vision-care': 'a vision care practice',
  chiropractors: 'a chiropractic practice',
  orthopedics: 'an orthopedic practice',
  landscaping: 'a landscaping company',
  manufacturing: 'a manufacturing company',
  restaurants: 'a restaurant',
  'real-estate': 'a real estate agent',
  hvac: 'an HVAC company',
  plumbing: 'a plumbing company',
  electricians: 'an electrical contractor',
  insurance: 'an insurance agency',
  accounting: 'an accounting firm',
  veterinary: 'a veterinary practice',
  'gyms-fitness': 'a gym or fitness studio',
  'salons-spas': 'a salon or spa',
};

const locationNames: Record<string, string> = {
  erie: 'Erie',
  meadville: 'Meadville',
  warren: 'Warren',
  corry: 'Corry',
  edinboro: 'Edinboro',
  'north-east': 'North East',
  fairview: 'Fairview',
  harborcreek: 'Harborcreek',
  millcreek: 'Millcreek',
  girard: 'Girard',
};

// Curated FAQ templates. Each template is a function that takes industry + location names.
// We select a subset per combo using the deterministic hash.

type FaqTemplate = (params: {
  industry: string;
  industrySingular: string;
  location: string;
}) => IntersectionFaq;

const faqTemplates: FaqTemplate[] = [
  ({ industry, location }) => ({
    question: `How much does web design for ${industry} cost in ${location}, PA?`,
    answer: `Our projects for ${industry} in ${location} start at $2,500 for a conversion-focused site with online scheduling, mobile optimization, and local SEO. Larger projects with custom integrations, patient portals, or e-commerce typically range from $5,000 to $15,000. Every dollar goes into hand-coded performance — not template markup.`,
  }),
  ({ industrySingular, location }) => ({
    question: `How long does it take to build a website for ${industrySingular} in ${location}?`,
    answer: `Most projects launch in 4-6 weeks from kickoff to go-live. That includes strategy, design, development, content integration, and testing. We give you a firm timeline during discovery and stick to it. If you need to launch faster, we offer accelerated timelines for an additional fee.`,
  }),
  ({ industry, location }) => ({
    question: `Why do ${industry} in ${location} need a custom website instead of a template?`,
    answer: `Templates make every business look the same — and in a competitive market like ${location}, looking generic is the same as being invisible. A custom-built site loads 3-5x faster than WordPress templates, ranks higher on Google, and is designed specifically for how your customers search and buy. Your competitors are on templates. That is your advantage.`,
  }),
  ({ industrySingular, location }) => ({
    question: `Will my website rank on Google for ${location}-area searches?`,
    answer: `Every site we build includes local SEO foundations — proper schema markup, Google Business Profile optimization, location-specific content, and technical performance that Google rewards. We also implement Generative Engine Optimization so your business appears when people use AI assistants like ChatGPT to search for ${industrySingular} near ${location}.`,
  }),
  ({ industry, location }) => ({
    question: `Do you offer ongoing website management for ${industry} in ${location}?`,
    answer: `Yes. Our $100/month management plan covers hosting, SSL, daily backups, security monitoring, content updates, SEO tracking, and priority support. Most ${industry} in ${location} use this plan because it keeps their site fast, secure, and ranking without them lifting a finger.`,
  }),
  ({ industrySingular, location }) => ({
    question: `Can you add online scheduling and booking to my website?`,
    answer: `Absolutely. Online scheduling is one of the highest-impact features for ${industrySingular} in ${location}. We integrate booking systems that let customers schedule appointments 24/7, send automated confirmations and reminders, and sync with your existing calendar. Practices with online booking consistently see 30-40% more appointments than those requiring phone calls.`,
  }),
  ({ industry, location }) => ({
    question: `What makes Stray different from other web designers serving ${location}?`,
    answer: `We build with Next.js — the same technology used by Nike, Hulu, and TikTok — not WordPress or Squarespace. Every site loads in under one second, scores 95+ on Google Lighthouse, and is hand-coded for conversion. We specialize in ${industry} and understand how your customers search, compare, and decide. Most agencies in ${location} sell templates with a logo swap. We build competitive advantages.`,
  }),
  ({ industrySingular, location }) => ({
    question: `How does the process start?`,
    answer: `You tell us about the business — customer, offer, what success looks like. We come back within 24 hours with a written plan for exactly what the site should do before you spend a dollar on design. If it makes sense, we build and launch. Works for ${industrySingular} in ${location} whether you're opening your doors or already operating and want a site that actually converts.`,
  }),
];

export function getIntersectionFaqs(
  industrySlug: string,
  locationSlug: string,
): readonly IntersectionFaq[] {
  const industry = industryNames[industrySlug] ?? industrySlug;
  const singular = industrySingular[industrySlug] ?? industrySlug;
  const location = locationNames[locationSlug] ?? locationSlug;

  const key = `${industrySlug}--${locationSlug}--faqs`;
  const hash = simpleHash(key);

  // Select 4-5 FAQs from the template pool
  const count = 4 + (hash % 2); // 4 or 5
  const indices = selectSentences(
    faqTemplates.map((_, i) => String(i)),
    hash,
    count,
  );

  return indices.map((idxStr) => {
    const idx = parseInt(idxStr, 10);
    return faqTemplates[idx]({
      industry,
      industrySingular: singular,
      location,
    });
  });
}
