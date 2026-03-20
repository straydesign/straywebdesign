export interface Location {
  slug: string;
  name: string;
  fullName: string;
  state: string;
  description: string;
  context: string;
  population: string;
  metroPopulation: string;
  nearbyAreas: string[];
  businessContext: string;
  zipCodes: string[];
}

export const LOCATIONS: Location[] = [
  {
    slug: "erie",
    name: "Erie",
    fullName: "Erie, Pennsylvania",
    state: "PA",
    description:
      "Erie is the third-largest city in Pennsylvania and the economic hub of the northwest region. Its economy has transitioned from heavy manufacturing to a diverse mix of healthcare, insurance, higher education, and tourism anchored by Presque Isle State Park and the revitalized Bayfront district.",
    context:
      "With three universities — Gannon, Mercyhurst, and Penn State Behrend — Erie has a growing tech-savvy workforce and a consumer base that expects modern digital experiences. The Bayfront redevelopment and EDDC initiatives are attracting new businesses at a pace the region hasn't seen in decades. Companies that invest in their online presence now are positioning themselves to capture the attention of both longtime residents and the wave of visitors drawn to Erie's lakefront renaissance.",
    population: "95,000",
    metroPopulation: "270,000",
    nearbyAreas: ["Millcreek", "Harborcreek", "North East", "Fairview"],
    businessContext:
      "Erie's Peach Street corridor alone has over 500 businesses competing for the same local customers, and the Bayfront district is adding new restaurants, shops, and services every season. A professional website is no longer optional here — it's the difference between being found and being forgotten. With three college campuses feeding a digitally native customer base, Erie businesses without a strong web presence are losing ground to competitors who have one.",
    zipCodes: ["16501", "16502", "16503"],
  },
  {
    slug: "meadville",
    name: "Meadville",
    fullName: "Meadville, Pennsylvania",
    state: "PA",
    description:
      "Meadville is the county seat of Crawford County, located about 35 minutes south of Erie. It blends a traditional manufacturing and agricultural economy with the cultural and economic influence of Allegheny College, one of the oldest colleges in the region.",
    context:
      "Meadville's downtown is experiencing a quiet revival, with new storefronts, restaurants, and service businesses filling spaces along Chestnut Street and the Diamond Park area. The presence of Allegheny College means a steady flow of students, faculty, and visiting families who rely on Google and social media to find local businesses. Crawford County's healthcare sector, led by Meadville Medical Center, anchors a service economy that extends well beyond the borough limits.",
    population: "13,000",
    metroPopulation: "85,000",
    nearbyAreas: ["Conneaut Lake", "Saegertown", "Cambridge Springs"],
    businessContext:
      "Meadville's college-town economy means younger, mobile-first customers who judge businesses by their online presence before they ever walk through the door. Local shops and restaurants compete not just with each other but with the pull of Erie's retail corridor 35 minutes north. A professionally designed website helps Meadville businesses keep dollars local by giving residents and students a reason to choose what's right in front of them.",
    zipCodes: ["16335"],
  },
  {
    slug: "warren",
    name: "Warren",
    fullName: "Warren, Pennsylvania",
    state: "PA",
    description:
      "Warren is the county seat of Warren County, nestled along the Allegheny River about 65 minutes southeast of Erie. Built on oil-industry heritage, the city has evolved into a regional center for manufacturing, healthcare, and outdoor tourism driven by the Allegheny National Forest and Kinzua Bridge State Park.",
    context:
      "Warren's economy benefits from a unique combination of industrial strength and natural beauty. Companies like United Refining and Blair Corporation provide an employment base, while the Allegheny National Forest draws hundreds of thousands of visitors annually for hiking, fishing, and fall foliage. The Struthers Library Theatre and a walkable downtown give Warren a cultural identity that punches above its weight. Businesses here serve both a loyal local population and a seasonal tourism market that is increasingly discovering the area online.",
    population: "9,000",
    metroPopulation: "40,000",
    nearbyAreas: ["Sheffield", "Youngsville", "North Warren"],
    businessContext:
      "Warren's tourism economy is growing fast, but most visitors plan their trips online long before they arrive. Restaurants, outfitters, lodges, and shops without a modern website are invisible to the hikers, anglers, and families searching for 'things to do near Kinzua Bridge.' At the same time, Warren's manufacturing and service businesses need a professional digital presence to recruit talent in a competitive labor market where younger workers research employers online first.",
    zipCodes: ["16365"],
  },
  {
    slug: "corry",
    name: "Corry",
    fullName: "Corry, Pennsylvania",
    state: "PA",
    description:
      "Corry is a small manufacturing city in southern Erie County, about 35 minutes southeast of Erie. Known for companies like Corry Rubber Corporation and a tradition of skilled trades, Corry maintains a blue-collar identity with a tight-knit business community.",
    context:
      "Corry's economy is built on making things — rubber products, machine components, and specialty manufacturing. The city's Main Street retains an independent character with locally owned shops, restaurants, and service providers who have deep roots in the community. Recent infrastructure investments and proximity to both Erie and the Allegheny National Forest give Corry businesses access to a wider customer base than the borough's population might suggest.",
    population: "6,000",
    metroPopulation: "12,000",
    nearbyAreas: ["Union City", "Spartansburg", "Columbus"],
    businessContext:
      "Corry's manufacturers and trade businesses often rely on word-of-mouth and decades-old relationships, but the next generation of customers and B2B buyers starts every search online. A professional website turns a trusted local reputation into something that scales beyond the borough limits. For Corry's retail and service businesses, competing with Erie's big-box corridor means offering the convenience of online information — hours, menus, booking, inventory — that customers now expect as baseline.",
    zipCodes: ["16407"],
  },
  {
    slug: "edinboro",
    name: "Edinboro",
    fullName: "Edinboro, Pennsylvania",
    state: "PA",
    description:
      "Edinboro is a college town about 20 minutes south of Erie, shaped by PennWest Edinboro (formerly Edinboro University). The borough's economy revolves around student life, local tourism around Edinboro Lake, and a growing base of small businesses and creative professionals.",
    context:
      "Edinboro's identity is defined by its university and its lake. PennWest Edinboro brings thousands of students and their families into the area, creating steady demand for restaurants, housing, retail, and services. The annual Scottish Festival and year-round lake recreation draw visitors from across the region. As the university system evolves under the PennWest consolidation, Edinboro's business community is adapting — and the ones with a strong online presence are best positioned to thrive through the transition.",
    population: "6,000",
    metroPopulation: "15,000",
    nearbyAreas: ["Cambridge Springs", "Waterford", "McKean"],
    businessContext:
      "College students are the most digitally dependent consumer group in the country — they won't visit a restaurant without checking the menu online, won't book a service without reading reviews, and won't trust a business with a dated or missing website. Edinboro businesses that invest in professional web design capture this audience naturally. Beyond the campus, Edinboro's proximity to Erie means local businesses must compete with the city's options, and a polished online presence is the equalizer.",
    zipCodes: ["16412"],
  },
  {
    slug: "north-east",
    name: "North East",
    fullName: "North East, Pennsylvania",
    state: "PA",
    description:
      "North East is the heart of Pennsylvania's Lake Erie wine region, about 15 minutes northeast of Erie. The borough and surrounding township are defined by vineyards, orchards, and a tourism economy built around winemaking, farm markets, and lakeside recreation.",
    context:
      "North East produces more wine grapes than any other region in Pennsylvania, and the Lake Erie Wine Country trail draws visitors from Pittsburgh, Cleveland, and Buffalo throughout the year. The borough's charming downtown, anchored by locally owned shops and seasonal farm markets, has become a destination in its own right. With agritourism on the rise and short-term rental platforms bringing new visitors to the area, North East businesses have a larger addressable audience than ever — but only if they can be found online.",
    population: "4,000",
    metroPopulation: "10,000",
    nearbyAreas: ["Harborcreek", "Westfield, NY", "Ripley, NY"],
    businessContext:
      "Wine tourism is an experience-driven industry, and the buying journey starts with a Google search or Instagram discovery. Wineries, tasting rooms, B&Bs, and farm markets in North East need websites that convey atmosphere, communicate seasonal hours and events, and make it effortless to plan a visit. Businesses without a professional web presence lose out to competitors whose sites show up first — and in a region where visitors are choosing between a dozen wineries, first impressions are made on a screen.",
    zipCodes: ["16428"],
  },
  {
    slug: "fairview",
    name: "Fairview",
    fullName: "Fairview, Pennsylvania",
    state: "PA",
    description:
      "Fairview is a growing suburban township west of Erie with a population that has steadily increased as families seek quality schools and a quieter pace while staying close to the city. The township blends residential growth with a small but expanding commercial corridor along Route 20.",
    context:
      "Fairview's growth trajectory makes it one of the most dynamic communities in Erie County. New housing developments, a top-rated school district, and convenient access to both Erie and the I-90 corridor are attracting young families and the businesses that serve them. The Route 20 commercial strip is adding new restaurants, professional offices, and service businesses, while Fairview's lakefront and rural character give it a distinct identity that residents fiercely protect.",
    population: "10,000",
    metroPopulation: "270,000",
    nearbyAreas: ["Girard", "Lake City", "Avonia"],
    businessContext:
      "Fairview's residential boom means a growing customer base of families with disposable income — but these are consumers who research online before they buy. New residents search for 'dentist near Fairview PA' and 'restaurants in Fairview' within their first week. Service businesses, contractors, and professional offices in Fairview need a website that ranks for these local searches, because the alternative is losing those new residents to Erie businesses who already show up on page one.",
    zipCodes: ["16415"],
  },
  {
    slug: "harborcreek",
    name: "Harborcreek",
    fullName: "Harborcreek, Pennsylvania",
    state: "PA",
    description:
      "Harborcreek is a large township east of Erie, home to Penn State Behrend and a growing commercial corridor along Buffalo Road. The township combines suburban neighborhoods, agricultural land, and an expanding business district that serves both residents and the university community.",
    context:
      "Harborcreek sits at the intersection of Erie's eastward suburban growth and the economic influence of Penn State Behrend, which brings over 4,000 students and a steady stream of visiting families and conference attendees to the area. The Buffalo Road corridor continues to add new retail and service businesses, and the township's proximity to both I-90 and North East's wine country gives it strategic advantages for commercial growth. Harborcreek's mix of residential, academic, and commercial activity creates a diverse local economy.",
    population: "17,000",
    metroPopulation: "270,000",
    nearbyAreas: ["Wesleyville", "Lawrence Park", "North East"],
    businessContext:
      "Penn State Behrend's campus drives a constant flow of students, parents, and professionals through Harborcreek — and every one of them is searching on their phone for places to eat, shop, and stay. The township's commercial growth along Buffalo Road means more businesses competing for attention in a corridor that didn't exist a decade ago. A professional website is the single most effective way for Harborcreek businesses to stand out in local search results and capture traffic from both the university crowd and the growing residential base.",
    zipCodes: ["16421"],
  },
  {
    slug: "millcreek",
    name: "Millcreek",
    fullName: "Millcreek, Pennsylvania",
    state: "PA",
    description:
      "Millcreek is Erie County's largest township and the commercial engine of the region, with a population of over 54,000. The Peach Street corridor running through Millcreek is the primary retail and dining destination for the entire metro area, featuring everything from national chains to independent businesses.",
    context:
      "Millcreek is where Erie shops, eats, and does business. The Peach Street corridor stretches for miles with shopping plazas, restaurants, medical offices, and service providers packed tightly together. Beyond Peach Street, Millcreek's residential neighborhoods house more people than the City of Erie itself, and the township's school district, parks, and community events give it a strong local identity. For businesses, Millcreek offers the highest foot traffic and commercial density in the region — but that density means fierce competition for every customer.",
    population: "54,000",
    metroPopulation: "270,000",
    nearbyAreas: ["Erie", "Fairview", "Summit Township"],
    businessContext:
      "Millcreek's Peach Street corridor is the most competitive commercial stretch in northwest Pennsylvania. Hundreds of businesses — from restaurants to auto shops to medical practices — are packed into a few-mile radius, all fighting for the same local customers. In this environment, a professional website isn't a nice-to-have; it's survival. When someone searches 'best pizza near me' or 'plumber in Millcreek,' the businesses with optimized, well-designed websites get the call. The ones without get scrolled past.",
    zipCodes: ["16509", "16565"],
  },
  {
    slug: "girard",
    name: "Girard",
    fullName: "Girard, Pennsylvania",
    state: "PA",
    description:
      "Girard is a borough and township in western Erie County, about 20 minutes west of Erie along Route 20. The community is known for its agricultural roots, the annual Dan Rice Days festival, and a Main Street lined with independent businesses that have served the area for generations.",
    context:
      "Girard occupies a strategic position along the Route 20 corridor between Erie and the Ohio border, giving local businesses access to pass-through traffic as well as a loyal hometown customer base. The borough's Main Street retains a classic small-town character, with family-owned shops, restaurants, and services that form the backbone of the local economy. Girard's agricultural community — including wineries, farm markets, and related businesses — connects it to the broader Lake Erie agritourism economy. Dan Rice Days and other community events draw visitors from across the county each year.",
    population: "3,000",
    metroPopulation: "270,000",
    nearbyAreas: ["Fairview", "Lake City", "Albion", "Elk Creek"],
    businessContext:
      "Girard's small-town businesses thrive on community loyalty, but loyalty alone doesn't bring in new customers. As younger residents increasingly shop and search online, even the most established Main Street businesses need a web presence that reflects their quality. Girard's location on the Route 20 corridor means thousands of drivers pass through daily — a professional website turns that pass-through traffic into walk-in customers by showing up when someone searches 'restaurants near Girard PA' from the road.",
    zipCodes: ["16417"],
  },
];

export function getLocationBySlug(slug: string): Location | undefined {
  return LOCATIONS.find((location) => location.slug === slug);
}

export function getAllLocationSlugs(): string[] {
  return LOCATIONS.map((location) => location.slug);
}
