/* pillars.ts — the six buyer-question clusters that spine the site.
   Each pillar targets a real head search; every query listed is an actual
   Google autocomplete harvested for that cluster. Single source of truth
   for the pillar pages and the homepage QuestionsSection.

   Prices are Tom's real, honest ranges by business size (given 2026-07-23):
   simple ≈ $250 + $10/mo · service-based ≈ $500 + $20/mo · consumer-facing ≈ $1k–$3k.
   Current/intro pricing, roughly accurate, will rise. Invent nothing beyond these. */

export interface PillarBand {
  readonly title: string;
  readonly body: string;
}

/** Optional pricing tiers (used by the cost pillar). Rough, honest ranges. */
export interface PillarTier {
  readonly label: string;
  readonly who: string;
  readonly build: string;
  readonly monthly: string;
  /** What you actually get at this price — the concrete inclusions. */
  readonly includes: readonly string[];
  readonly note: string;
}

/** One honest way to build a site yourself (used by the diy-or-hire pillar). */
export interface BuildPath {
  readonly name: string;
  /** Real tools in this category, shown small. */
  readonly tools: string;
  readonly what: string;
  readonly goodFor: string;
  readonly theCatch: string;
}

/** A deep how-to section: teach exactly how to do the work, then say plainly
    where the built-up skill is. The honest-broker move, made concrete. */
export interface DeepDive {
  readonly kicker: string;
  readonly heading: string;
  readonly lead: string;
  readonly items: readonly { readonly title: string; readonly body: string }[];
  /** The payoff: here is how, and here is why you might still hire me. */
  readonly close: string;
}

/** One trade and what its site must do (used by the for-your-industry pillar). */
export interface IndustrySpec {
  readonly name: string;
  /** The customer's mindset when they land, one line. */
  readonly customer: string;
  /** Concrete functional must-haves, as a scannable checklist. */
  readonly mustHaves: readonly string[];
  /** The single thing that matters most for this trade. */
  readonly note: string;
}

export interface Pillar {
  readonly slug: string;
  /** Short nav / card label. */
  readonly nav: string;
  /** The head search query, human-cased — the page's H1. */
  readonly question: string;
  /** Cluster color, hex. */
  readonly color: string;
  /** Real related searches — the SEO signal, shown as pills. */
  readonly queries: readonly string[];
  /** One honest sentence under the H1. */
  readonly lead: string;
  /** Three honest answer points. */
  readonly bands: readonly PillarBand[];
  /** Matches a blog tag — drives the Related reading list. */
  readonly tag: string;
  /** Optional honest price tiers, shown as scannable cards (cost pillar only). */
  readonly tiers?: readonly PillarTier[];
  /** Optional honest note under the tiers. */
  readonly tiersNote?: string;
  /** Optional intro line above the build-it-yourself paths. */
  readonly buildPathsLead?: string;
  /** Optional honest ways to build it yourself (diy-or-hire pillar). */
  readonly buildPaths?: readonly BuildPath[];
  /** Optional deep how-to sections — teach the work, name the skill. */
  readonly deepDives?: readonly DeepDive[];
  /** Optional intro above the per-industry grid. */
  readonly industriesLead?: string;
  /** Optional per-trade functional breakdowns (for-your-industry pillar). */
  readonly industries?: readonly IndustrySpec[];
  readonly metaTitle: string;
  readonly metaDescription: string;
}

export const PILLARS: readonly Pillar[] = [
  {
    slug: 'cost',
    nav: 'What it costs',
    question: 'What a small business website really costs',
    color: '#FFB224',
    queries: [
      'how much does a small business website cost',
      'website cost per month vs one-time',
      'what does website maintenance cost',
    ],
    lead: 'The scope of your site sets the price, so here are real ranges by the kind of business you run.',
    tiers: [
      {
        label: 'Simple and steady',
        who: 'Solo owner up to about five people. One clear offer that rarely changes.',
        build: '$250',
        monthly: '$10/mo',
        includes: [
          'A few professional photos',
          'Edit your own words and prices anytime',
          'Hosted, fast, and reliable',
          'Wired to your Google Business Profile',
        ],
        note: 'A professional front without a bill that haunts you.',
      },
      {
        label: 'Service-based',
        who: 'More to connect, and content that changes here and there. Around ten people.',
        build: '~$500',
        monthly: '~$20/mo',
        includes: [
          'Everything above',
          'More pages for the services you run',
          'Connections like booking, forms, or a calendar',
          'Change it as often as the work does',
        ],
        note: 'Room to grow and adjust as the work changes.',
      },
      {
        label: 'Consumer-facing',
        who: 'Larger, heavy traffic, plenty of moving parts.',
        build: '$1k–$3k',
        monthly: 'scales with it',
        includes: [
          'Everything above',
          'Built to handle heavy traffic',
          'The custom features it needs to run',
        ],
        note: 'Built to carry real volume.',
      },
    ],
    tiersNote:
      "These are today's numbers. I'm early and priced that way, and they will rise. Roughly accurate right now, and I will tell you where you land before you spend an hour on a call.",
    bands: [
      {
        title: 'One-time versus monthly',
        body: 'Two different bills, and mixing them up is where sticker shock comes from. You pay once to design and build. You pay a little every month to keep it online and looked after, small edits like new hours or a swapped photo included. The ranges above scale to how big and how busy your site has to be.',
      },
      {
        title: 'Why a free builder costs more later',
        body: 'The template itself is free. The bill shows up in your hours fighting it, in the weaker search footing a generic site starts from, and in the rebuild you pay for once you outgrow it. That last one is the expensive part: you end up paying twice, once to limp along and once to do it right.',
      },
      {
        title: 'How pricing should work',
        body: 'Any web designer should work with you on price, and say the number early. If someone hides it until you have sat through a pitch, that is the answer. Tell me the size of your business and what you expect, and you will have the range that same day, before you have given me an hour of your time.',
      },
    ],
    tag: 'Before You Buy',
    metaTitle: 'What a Small Business Website Really Costs',
    metaDescription:
      'Honest price ranges by business size, one-time build versus monthly upkeep, and why a good designer tells you the number up front. From a designer who quotes real figures.',
  },
  {
    slug: 'diy-or-hire',
    nav: 'DIY or hire',
    question: 'Should you build it yourself, or hire someone',
    color: '#3DD68C',
    queries: [
      'should i build my own website or pay someone',
      'is wix good for seo',
      'wix vs squarespace vs wordpress',
    ],
    lead: 'Doing it yourself is a real option — here is the honest tradeoff.',
    bands: [
      {
        title: 'When doing it yourself is the right call',
        body: "If you have a few evenings, one simple page, and a name people already search for, a builder like Squarespace can carry you a long way. Plenty of businesses launch this way and are right to. If that is you, spend the money elsewhere and come back when the site is holding you back.",
      },
      {
        title: 'What tends to break six months in',
        body: 'The site launches, then quietly stops keeping up. Search rewards specifics a template rarely lets you add. Pages that felt fine start feeling slow. And every fix routes through you, so you become the tech support for a thing you built to save time. None of it is dramatic; it just adds up.',
      },
      {
        title: 'What you are actually paying a person for',
        body: 'Not typing skills. Judgment about what to say and cut, a site that stays fast and findable, and a name to call when something breaks so it is not your Saturday. What you are buying is the problem staying solved for good, and a set of pages is only how that gets delivered.',
      },
    ],
    buildPathsLead:
      'Building it yourself is a real option, and worth understanding before you pay anyone. There are three honest routes. None is wrong. They just trade money, time, and control differently.',
    buildPaths: [
      {
        name: 'Site builders',
        tools: 'Squarespace · Wix · GoDaddy',
        what: 'Pick a template, drop in your words and photos, and hit publish. No code, and the hosting is handled for you.',
        goodFor:
          'Getting online this weekend with one simple page, if you have a few evenings and a name people already search for.',
        theCatch:
          "A monthly fee that never stops, a template you fight the moment you want something specific, and a slower site that is harder to rank. Squarespace looks the best of the three; GoDaddy's builder is the weakest.",
      },
      {
        name: 'Vibecoding it',
        tools: 'Lovable · v0 · Cursor · Claude',
        what: 'You describe the site in plain English and an AI writes real code for it. It can look custom, with no monthly builder tax.',
        goodFor:
          'A truer-to-you result and real control, if you are comfortable being a little technical and patient with rough edges.',
        theCatch:
          'The AI hands you a car, not driving lessons. You still host it, connect the domain, and catch it when it is quietly wrong about speed, forms that actually send, or how Google reads the page. Those parts do not announce themselves.',
      },
      {
        name: 'Hosting it',
        tools: 'Vercel · Netlify · a domain',
        what: 'Where your site actually lives so the world can reach it. Builders hide this from you; vibecoding hands it to you.',
        goodFor:
          "Understanding even a little, since it is the step most guides skip and the reason a 'finished' site still is not online.",
        theCatch:
          "Domains, DNS, certificates, and the 'why won't it update' panic all live here. Easy enough after your first time, and the part no guide warns you about.",
      },
    ],
    deepDives: [
      {
        kicker: 'Same tools, different result',
        heading: 'How to make it actually good',
        lead: 'Say you go for it. Here is the gap between a site that is merely live and one that works, and it is the same list whether you use a template or the tools I use. The tool was never the hard part.',
        items: [
          {
            title: 'Shoot in real light',
            body: 'A phone photo taken by a window beats a dark one with the flash on, every time. Watch your framing, keep the background clean, and never blow a small photo up big. One blurry hero image undoes everything around it.',
          },
          {
            title: 'Leave a lot of space',
            body: 'Empty space does real work: it gives the one thing that matters room to be seen. The urge to fill every corner is what makes a site feel cramped and homemade. When in doubt, take something out.',
          },
          {
            title: 'Hold one style',
            body: "Choose a couple of fonts and a couple of colors and use them everywhere. A fresh look in every section reads as thrown together. Most of what 'professional' means is simply staying consistent.",
          },
          {
            title: 'Size images for the screen',
            body: 'A photo that is crisp on your laptop can be a five-megabyte download on a phone. Serve a version scaled to the device, or the person on a weak signal stares at a blank box and leaves.',
          },
          {
            title: 'Build for a weak connection',
            body: 'Design for someone in a parking lot on one bar, because your fast home wifi hides how heavy the page really is. Every oversized image costs you a visitor, and Google factors load speed into where you rank.',
          },
          {
            title: 'Say it, then stop',
            body: 'People skim; they rarely read. Give them the information and get out of the way. Extra words do not add weight, they bury the one line that would have made someone call.',
          },
          {
            title: 'Everything on one scroll',
            body: 'Most people just scroll to see what you have got. Put the whole story on a single page with clear sections, and let a button open the depth for anyone who wants more. A wall of tabs makes people hunt, and they will not.',
          },
          {
            title: 'Never let it go stale',
            body: 'Old hours, a closed location, last year’s prices: an outdated site costs more trust than no site would. Whatever changes in the business has to change here the same week.',
          },
        ],
        close: 'None of this is hard to grasp. Doing all of it, every time, while keeping the site fast, findable, and current, is the actual work. The tools sit in everyone’s hands now. The judgment about the thousand small calls they do not make for you is the part you are hiring.',
      },
    ],
    tag: 'Running Your Site',
    metaTitle: 'Build Your Own Website, or Hire Someone?',
    metaDescription:
      'When a builder like Wix or Squarespace is enough, what quietly breaks six months in, and what you are really paying a designer for. An honest tradeoff.',
  },
  {
    slug: 'get-found',
    nav: 'Get found',
    question: "Why Google can't find your business",
    color: '#4CC2FF',
    queries: [
      'why is my business not showing up on google',
      "why isn't my website ranking on google",
      'how to get my business on google for free',
    ],
    lead: 'Having a website is not the same as being found on one.',
    bands: [
      {
        title: 'First, Google has to know you exist',
        body: 'A new site is invisible until Google crawls and indexes it, and that can lag by days or weeks. Search your exact business name. If nothing comes up, indexing is the wall you have hit, and ranking is a later problem entirely. Google Search Console tells you plainly whether your pages are in the index yet.',
      },
      {
        title: 'The free listing most people skip',
        body: 'Your Google Business Profile is the panel with your hours, map pin, and reviews, and it is free to claim. For a local business it often does more than the website for showing up in the area, and an unclaimed one quietly costs you calls. Claim it, fill it out, keep it current.',
      },
      {
        title: 'What actually moves ranking, and what is a myth',
        body: "Being relevant to what people actually search, a fast site, and real reviews move the needle. Stuffing keywords, buying backlinks, and paying for a one-time SEO blast do not, and some can hurt. There is no button that pins you to the top; there is only being the better answer.",
      },
    ],
    deepDives: [
      {
        kicker: 'Do it yourself, for free',
        heading: 'How to get Google to find you',
        lead: 'None of this is a secret, and nobody should need your card number to explain it. Here is the whole sequence, in order, and what to ignore so no one sells you magic.',
        items: [
          {
            title: 'First, find out if you are even indexed',
            body: 'Type your exact business name into Google. If nothing comes up, ranking is not your problem yet; being seen at all is. Google Search Console is free and tells you plainly whether your pages are in the index or still invisible. Start there before anything else.',
          },
          {
            title: 'Claim your Google Business Profile',
            body: 'This is the free panel with your map pin, hours, and reviews, and for a local business it often does more than the website itself. Claim it, fill in every field, add real photos, and keep the hours honest. An unclaimed profile is calls walking out the door.',
          },
          {
            title: 'Get a handful of real reviews',
            body: 'Reviews move local ranking and they move minds. Ask happy customers in person, the day the work is done. You do not need a hundred; a steady trickle of real ones with names beats a wall of suspicious five-stars that all appeared overnight.',
          },
          {
            title: 'Say what you do, in the words people search',
            body: "A page that says 'quality service' ranks for nothing. A page that says 'gutter cleaning in Erie, PA' gets found by the person typing exactly that. Use the plain words your customers use, name the towns you serve, and answer the real questions they ask.",
          },
          {
            title: 'Make it fast',
            body: 'A slow page loses the visitor and the ranking at once, and big unshrunk photos are the usual culprit. Size your images, cut what you do not need, and test it on your phone on cell data instead of your home wifi.',
          },
          {
            title: 'Do not pay for these',
            body: "Ignore the cold callers promising number one 'guaranteed,' anyone selling bought backlinks, and one-time 'SEO blasts.' They range from useless to actively harmful. There is no button that pins you to the top. There is only being the better, faster, more relevant answer, and all of that is free to do.",
          },
        ],
        close: 'That is the entire playbook, and there is no invoice attached to it. Where someone like me earns a fee is doing every step well, reading Search Console to see which one is actually holding you back, and fixing the technical parts that never show up on a checklist. You can do all of this yourself, and some people should. The reason to hire it out is that I have run the sequence enough times to know which lever to pull first.',
      },
    ],
    tag: 'Running Your Site',
    metaTitle: "Why Google Can't Find Your Business",
    metaDescription:
      'Indexing before ranking, the free Google Business Profile most owners skip, and what actually moves your position versus what is a myth. Plain-English, no snake oil.',
  },
  {
    slug: 'need-a-website',
    nav: 'Need one?',
    question: 'Do you even need a website',
    color: '#FF6B57',
    queries: [
      'do i really need a website for my business',
      'do i need a website if i have facebook',
      'why do i need a website',
    ],
    lead: 'Sometimes the honest answer is not yet — here is how to tell.',
    bands: [
      {
        title: 'When social and a Google profile are enough',
        body: "Brand new, still testing whether the thing sells, winning customers by word of mouth? A filled-out Google Business Profile and an active Facebook page can cover you. That stage does not call for a website, it calls for proof that people want what you make. I will tell you when you have crossed the line.",
      },
      {
        title: 'When a site starts earning its keep',
        body: 'The moment strangers who never met you start deciding whether to call, you want a place you control, one that answers their questions and does not sit next to a competitor in the feed. A site earns its cost when it does that convincing while you sleep.',
      },
      {
        title: 'The one question that decides it',
        body: 'Are people already trying to find you, and coming up short? If they are searching your name or your service and landing on nothing, or on a page you cannot shape, a site pays for itself. If they are not looking yet, build the demand first and the site second.',
      },
    ],
    deepDives: [
      {
        kicker: 'Website vs. just social',
        heading: 'What a site does that a Facebook page cannot',
        lead: 'A Facebook page does real work, and for a while it can be enough. But the two are not the same tool, and the difference is control. Here is what a site gives you that a feed never will.',
        items: [
          {
            title: 'You control the order',
            body: 'On social, the platform decides who sees your post and in what order. On your own site, you choose what someone sees first: your best work, your services, your story. A visitor gets the tour you laid out instead of whatever the feed happened to surface that day.',
          },
          {
            title: 'A real menu, laid out on purpose',
            body: 'A profile shows your business as a stack of posts, newest on top. A site lays it out on purpose: a clear menu, a page for each service, your prices, who you are. The same information, arranged so nobody has to dig for it.',
          },
          {
            title: 'The least confusing version of your business',
            body: 'The whole job of the site is to answer what you do, what it costs, and how to reach you, with as little confusion as possible. Simple and straightforward beats clever. When someone understands you in a few seconds, they start to trust you.',
          },
          {
            title: 'Your handshake before they walk in',
            body: 'A clean, current site is you looking professional and prepared before the first hello. It shows what the experience will feel like, and it makes deciding to come in the easy choice.',
          },
        ],
        close: 'So do you need one yet? If Facebook and a Google profile are carrying you, there is no shame in waiting. When you are ready, the smart first move is small: a simple site with your basics, live and cheap, then watch who visits. If the traffic is there and people are deciding on you, that is your sign to build it out. Start light, let the interest tell you, and grow it when it earns the room.',
      },
    ],
    tag: 'Before You Buy',
    metaTitle: 'Do You Even Need a Website?',
    metaDescription:
      'A web designer on when social plus a Google profile is enough, when a site starts paying off, and the one question that settles it. Willing to say not yet.',
  },
  {
    slug: 'for-your-industry',
    nav: 'Your industry',
    question: 'Websites built for your trade',
    color: '#F778BA',
    queries: [
      'restaurant website design',
      'website for a contractor',
      'salon website design',
    ],
    lead: 'A restaurant site and a contractor site need different things, but they answer to the same five rules.',
    bands: [
      {
        title: 'Build trust',
        body: 'Real photos, real proof, a professional look. A stranger decides in seconds whether you seem legit, and everything else rides on that.',
      },
      {
        title: 'Make it easy',
        body: 'Clear, uncluttered, with a single obvious action. Confusion is the most common reason someone leaves without acting.',
      },
      {
        title: 'Shorten the distance to purchase',
        body: 'Visible pricing, plain explanations of what each thing is, and fewer taps to book, buy, or call. Every step you remove is a customer you keep.',
      },
      {
        title: "Show you're established",
        body: 'Current information, real details, and the signals of a business that actually operates. People commit to something that looks here to stay.',
      },
      {
        title: 'Stay consistent',
        body: 'One voice and one look across every page. Consistency is most of what reads as professional, and its absence reads as risky.',
      },
    ],
    industriesLead: 'Those five hold for everyone. What changes is how they show up. Here is what each trade actually needs.',
    industries: [
      {
        name: 'Restaurants & bars',
        customer: 'Hungry, deciding now, on a phone, often already in the car.',
        mustHaves: [
          'A real menu on the page itself, never a PDF that forces pinch-and-zoom on a phone.',
          'Hours, address, and a tap-to-call button visible without scrolling.',
          'Real photos of your food and your room, never stock burgers.',
          'One obvious next step: order, reserve, or see the specials.',
        ],
        note: 'Answer "can I eat here, and how" in the first five seconds on a phone.',
      },
      {
        name: 'Trades & contractors',
        customer: 'Vetting a stranger they would let into their home, hunting for reasons to trust you.',
        mustHaves: [
          'What you do and the towns you serve, named plainly.',
          'Before-and-after photos of your real jobs, never stock images.',
          'A tap-to-call number and a short quote form that asks for the job and a photo.',
          'Reviews, license, insurance, and years in business, shown up front.',
        ],
        note: 'The whole decision is whether this stranger belongs in your home, so lead with proof.',
      },
      {
        name: 'Appointment & personal care',
        customer: 'Ready to book, deciding whether to trust you with their hair, face, or body, and whether booking will be quick.',
        mustHaves: [
          'Online booking that opens in one tap and shows real openings.',
          'Real photos of the work and the space, plus staff bios with headshots.',
          'A plain service list with prices, or at least clear starting prices.',
          'Hours, map, parking, and cancellation policy up front.',
        ],
        note: 'If they cannot book in under a minute from their phone, you lose them to the shop that lets them.',
      },
      {
        name: 'Retail shops',
        customer: 'Checking whether you have what they want, whether you are open, and whether you are worth the drive.',
        mustHaves: [
          'Hours, address, map, and phone on every page.',
          'Real photos of the shop and the actual products on the shelves.',
          'A clear sense of what you sell and any signature brands.',
          'If you sell online, honest shipping and stock; if not, say "in-store only."',
        ],
        note: 'The job is turning a curious browser into someone walking through the door.',
      },
      {
        name: 'Professional services',
        customer: 'Money on the line, quietly checking if you are competent, legitimate, and safe before they ever call.',
        mustHaves: [
          'Plain-language descriptions of what you handle and for whom.',
          'Credentials up front: licenses, years in practice, named people with photos.',
          'A single clear way to reach you, with a note on what happens next and whether the first call is free.',
          'A straight answer on how you charge, even without exact numbers.',
        ],
        note: 'Trust is the entire product, so every page has to prove a real, credentialed person is on the other end.',
      },
      {
        name: 'Recreation & venues',
        customer: 'Planning an outing or event, wanting to know fast what it costs, whether they can get in, and how to book.',
        mustHaves: [
          'Live booking or a clear path to it: tee times, lanes, or an event form.',
          'Prices, hours, and what is included, stated plainly.',
          'A plan-your-visit section: map, parking, dress code, schedules.',
          'Real photos of the actual place, plus a few reviews.',
        ],
        note: 'Answer "can I get in, what does it cost, how do I book" without a phone call, then let them do it.',
      },
    ],
    tag: 'Productizing',
    metaTitle: 'Websites Built for Your Trade',
    metaDescription:
      'A restaurant site, a contractor site, and a salon site each need different things. What actually matters for each, from a designer who builds for local businesses.',
  },
  {
    slug: 'get-customers',
    nav: 'More customers',
    question: 'Turning your site into more customers',
    color: '#B197FC',
    queries: [
      'how to get more customers for my business',
      'small business website that converts',
      'how to get more leads from my website',
    ],
    lead: 'A brochure sits there. A good site brings the phone call.',
    bands: [
      {
        title: 'One clear action, not five',
        body: 'Give a visitor five ways to respond and they usually take none of them. Every extra option, whether it is book, call, email, follow, or download, quietly cancels out the last. Pick the single thing you most want someone to do, make it the obvious move on every screen, and let everything else step aside.',
      },
      {
        title: 'Proof beats adjectives',
        body: '"Trusted" and "quality" are what everyone types when they have nothing specific to say. A photo of the actual work, a real number, a review with a name attached: those are what a stranger believes. Show the thing instead of claiming it.',
      },
      {
        title: 'Make contacting you effortless',
        body: 'Every extra tap between wanting to reach you and doing it costs you customers. A phone number that dials on a tap, a form that asks for three fields not ten, hours that are current. Frictionless beats clever every time someone is ready to buy.',
      },
    ],
    deepDives: [
      {
        kicker: 'Growing past word of mouth',
        heading: 'How growth actually works',
        lead: 'A lot of cheap tricks get sold as growth. Here is the honest version, including the part I still find hard.',
        items: [
          {
            title: 'The shortcuts never last',
            body: 'Bought backlinks, paid reviews, a profile faked to look older. Google catches it, people sense it, and none of it moves a single real customer.',
          },
          {
            title: 'Good work is the real engine',
            body: 'A fair price and happy customers, and word of mouth that stacks on itself over time. Unglamorous, slow, and the whole game.',
          },
          {
            title: 'Going wider costs money',
            body: 'Word of mouth has a ceiling. Getting past it means paying to reach strangers, and I will be honest that this is the part I find hardest too.',
          },
          {
            title: 'Why most ads feel like a scam',
            body: "Because a stranger promising to 'run ads for you' usually is one. Ads that work need a real offer, your real face on camera, and a friendly presence on the channel.",
          },
          {
            title: 'The details are the whole job',
            body: 'Who sees it, the cost per click, which video, what offer. Cost per click is higher than ever, so those settings are the line between money spent and money burned.',
          },
        ],
        close: 'Most growth is just good business compounding, and that part is free. When you are ready to go wider, ads can work, but only with a real offer, your real face, and someone who actually knows the levers. That last part is a skill, and a fair thing to pay for once the basics are already working.',
      },
    ],
    tag: 'How Customers Decide',
    metaTitle: 'Turning Your Website Into More Customers',
    metaDescription:
      'Why one clear action beats five, why proof beats adjectives, and how removing friction turns a visitor into a phone call. Conversion basics without the jargon.',
  },
];

export const PILLAR_SLUGS: readonly string[] = PILLARS.map((p) => p.slug);

export function getPillar(slug: string): Pillar | undefined {
  return PILLARS.find((p) => p.slug === slug);
}
