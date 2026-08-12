svg = open('/private/tmp/claude-501/-Users-tomsesler/215c8b6f-6e6c-4ed1-83e5-ebfcbb55828b/scratchpad/cs/chart.svg').read()

HTML = """<title>Cataloging a 900-product store — Sea Cave case study</title>
<style>
  :root{
    --page:#fafafa; --card:#ffffff; --sunken:#f1f1f4;
    --ink:#18181b; --ink-2:#3f3f46; --ink-3:#5b5b63;
    --accent:#2563EB; --accent-soft:#e7effd;
    --line:#e6e6ea; --line-strong:#d4d4d9;
    --series-total:#b3bcca; --series-total-fill:rgba(179,188,202,.20);
    --display:"Schibsted Grotesk",ui-sans-serif,system-ui,"Helvetica Neue",Arial,sans-serif;
    --body:"Hanken Grotesk",ui-sans-serif,system-ui,"Helvetica Neue",Arial,sans-serif;
    --mono:"JetBrains Mono",ui-monospace,SFMono-Regular,Menlo,monospace;
  }
  @media (prefers-color-scheme:dark){
    :root{
      --page:#0f0f12; --card:#17171c; --sunken:#1c1c22;
      --ink:#f4f4f5; --ink-2:#c9c9d1; --ink-3:#9a9aa5;
      --accent:#6b9bff; --accent-soft:#1b2740;
      --line:#26262e; --line-strong:#33333d;
      --series-total:#4d5563; --series-total-fill:rgba(77,85,99,.28);
    }
  }
  :root[data-theme="dark"]{
    --page:#0f0f12; --card:#17171c; --sunken:#1c1c22;
    --ink:#f4f4f5; --ink-2:#c9c9d1; --ink-3:#9a9aa5;
    --accent:#6b9bff; --accent-soft:#1b2740;
    --line:#26262e; --line-strong:#33333d;
    --series-total:#4d5563; --series-total-fill:rgba(77,85,99,.28);
  }
  :root[data-theme="light"]{
    --page:#fafafa; --card:#ffffff; --sunken:#f1f1f4;
    --ink:#18181b; --ink-2:#3f3f46; --ink-3:#5b5b63;
    --accent:#2563EB; --accent-soft:#e7effd;
    --line:#e6e6ea; --line-strong:#d4d4d9;
    --series-total:#b3bcca; --series-total-fill:rgba(179,188,202,.20);
  }

  body{background:var(--page);color:var(--ink);font-family:var(--body);
       font-size:17px;line-height:1.65;-webkit-font-smoothing:antialiased;}
  .wrap{max-width:1060px;margin:0 auto;padding:clamp(28px,5vw,72px) clamp(18px,4vw,40px) 96px;
        display:flex;flex-direction:column;gap:clamp(40px,5vw,64px);}
  .measure{max-width:68ch;}
  h1,h2,h3{font-family:var(--display);text-wrap:balance;letter-spacing:-.022em;margin:0;}
  h1{font-size:clamp(31px,4.6vw,50px);line-height:1.08;font-weight:600;}
  h2{font-size:clamp(21px,2.5vw,27px);line-height:1.2;font-weight:600;}
  h3{font-size:16px;font-weight:600;letter-spacing:-.01em;}
  p{margin:0;}
  .eyebrow{font-family:var(--mono);font-size:11.5px;letter-spacing:.16em;text-transform:uppercase;
           color:var(--accent);margin:0 0 18px;}
  .dek{font-size:clamp(17px,1.9vw,20px);line-height:1.55;color:var(--ink-2);margin-top:20px;}
  .stack{display:flex;flex-direction:column;gap:16px;}
  .rule{height:1px;background:var(--line);border:0;margin:0;}
  a{color:var(--accent);text-underline-offset:3px;}
  a:focus-visible,summary:focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:3px;}

  /* chart panel */
  .panel{background:var(--card);border:1px solid var(--line);border-radius:8px;
         padding:clamp(18px,2.6vw,28px);display:flex;flex-direction:column;gap:20px;}
  .panel-head{display:flex;flex-wrap:wrap;gap:14px 28px;align-items:baseline;justify-content:space-between;}
  .panel-title{font-family:var(--display);font-size:17px;font-weight:600;}
  .legend{display:flex;flex-wrap:wrap;gap:18px;font-family:var(--mono);font-size:12px;color:var(--ink-3);}
  .swatch{display:inline-block;width:22px;height:3px;border-radius:2px;vertical-align:middle;margin-right:8px;}
  .sw-prod{background:var(--accent);} .sw-total{background:var(--series-total);}
  .chart-scroll{overflow-x:auto;}
  .chart{display:block;width:100%;min-width:640px;height:auto;}
  .grid{stroke:var(--line);stroke-width:1;}
  .ytick,.xtick{font-family:var(--mono);font-size:10.5px;fill:var(--ink-3);}
  .evt{stroke:var(--line-strong);stroke-width:1;stroke-dasharray:3 4;}
  .evtdot{fill:var(--accent);}
  .evtnum{font-family:var(--mono);font-size:9.5px;font-weight:700;fill:#fff;}
  .areaTotal{fill:var(--series-total-fill);}
  .lineTotal{fill:none;stroke:var(--series-total);stroke-width:1.5;}
  .lineProd{fill:none;stroke:var(--accent);stroke-width:2.4;stroke-linejoin:round;}
  .endcap{fill:var(--accent);}

  /* keyed timeline */
  .keys{display:grid;gap:14px;grid-template-columns:1fr;border-top:1px solid var(--line);padding-top:20px;}
  @media(min-width:720px){.keys{grid-template-columns:repeat(2,1fr);gap:18px 32px;}}
  .key{display:flex;gap:12px;align-items:flex-start;}
  .keynum{flex:none;width:20px;height:20px;border-radius:50%;background:var(--accent);color:#fff;
          font-family:var(--mono);font-size:11px;font-weight:700;display:flex;align-items:center;
          justify-content:center;margin-top:2px;}
  .keydate{font-family:var(--mono);font-size:11.5px;color:var(--ink-3);letter-spacing:.04em;}
  .keytext{font-size:14.5px;line-height:1.5;color:var(--ink-2);}

  /* stat cards */
  .stats{display:grid;gap:12px;grid-template-columns:repeat(2,1fr);}
  @media(min-width:760px){.stats{grid-template-columns:repeat(4,1fr);}}
  .stat{background:var(--card);border:1px solid var(--line);border-radius:8px;padding:20px 18px;
        display:flex;flex-direction:column;gap:6px;}
  .statnum{font-family:var(--display);font-size:clamp(26px,3.4vw,34px);font-weight:600;
           letter-spacing:-.03em;line-height:1;font-variant-numeric:tabular-nums;}
  .statlab{font-size:13.5px;line-height:1.4;color:var(--ink-3);}

  /* query evidence */
  .queries{display:flex;flex-wrap:wrap;gap:8px;}
  .q{font-family:var(--mono);font-size:12.5px;background:var(--accent-soft);color:var(--accent);
     border-radius:5px;padding:6px 11px;}
  table{width:100%;border-collapse:collapse;font-size:14.5px;}
  th,td{text-align:left;padding:9px 12px;border-bottom:1px solid var(--line);}
  th{font-family:var(--mono);font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:var(--ink-3);font-weight:500;}
  td.num{font-family:var(--mono);font-variant-numeric:tabular-nums;text-align:right;}
  .table-scroll{overflow-x:auto;}

  .limits{background:var(--sunken);border-radius:8px;padding:clamp(20px,3vw,30px);
          display:flex;flex-direction:column;gap:14px;}
  .limits li{margin-bottom:10px;color:var(--ink-2);font-size:15px;line-height:1.55;}
  .limits ul{margin:0;padding-left:20px;}
  footer{color:var(--ink-3);font-size:13.5px;line-height:1.6;font-family:var(--mono);}
</style>

<div class="wrap">

  <header class="measure">
    <p class="eyebrow">Case study · Product cataloging</p>
    <h1>836 products. 836 pages. Google found 819 of them.</h1>
    <p class="dek">A 50-year-old aquarium store in Erie, PA had no website and no way for anyone
    to search what was on its shelves. Cataloging the inventory — one page per item, with real
    photos, real names, and the details a buyer actually asks about — is what produced the line
    below. This is Google's own record of it.</p>
  </header>

  <section class="panel">
    <div class="panel-head">
      <p class="panel-title">Daily Google impressions — first seven weeks</p>
      <div class="legend">
        <span><span class="swatch sw-prod"></span>Product pages</span>
        <span><span class="swatch sw-total"></span>Whole site</span>
      </div>
    </div>
    <div class="chart-scroll">__CHART__</div>
    <div class="keys">
      <div class="key"><div class="keynum">1</div><div>
        <p class="keydate">JUN 22</p>
        <p class="keytext">Care details — tank size, temperament, what it can live with — added to 759 product pages.</p></div></div>
      <div class="key"><div class="keynum">2</div><div>
        <p class="keydate">JUL 7–8</p>
        <p class="keytext">Scientific names filled in on 189 of 199 fish. Every listing switched from "ships to you" to "in this store" — 637 items, zero errors.</p></div></div>
      <div class="key"><div class="keynum">3</div><div>
        <p class="keydate">JUL 9–12</p>
        <p class="keytext">Photo audits at full resolution: wrong pictures corrected across coral, saltwater, freshwater and inverts.</p></div></div>
      <div class="key"><div class="keynum">4</div><div>
        <p class="keydate">JUL 18</p>
        <p class="keytext">Product data repaired so Google would accept the listings instead of rejecting them.</p></div></div>
    </div>
  </section>

  <section class="stats">
    <div class="stat"><p class="statnum">819</p><p class="statlab">individual product pages have earned Google impressions</p></div>
    <div class="stat"><p class="statnum">12.8&times;</p><p class="statlab">more daily impressions from product pages, June to July</p></div>
    <div class="stat"><p class="statnum">77%</p><p class="statlab">of July's impressions came from product pages, not the homepage</p></div>
    <div class="stat"><p class="statnum">2.2&times;</p><p class="statlab">more people per day arriving from search</p></div>
  </section>

  <section class="measure stack">
    <h2>What "cataloging" actually means here</h2>
    <p>A store's inventory list is not a website. Turning one into the other is the work: every
    item needs a page that can stand on its own in a search result — the name a customer would
    type, the name a specialist would type, a photograph of the actual item rather than the
    manufacturer's stock shot, and the handful of facts that decide a purchase.</p>
    <p>Do that once for 836 items and the store stops competing for a few crowded searches and
    starts appearing in hundreds of specific ones. The jump on the chart isn't a marketing
    campaign. It's the week the catalog started telling the truth about what was on the shelf.</p>
  </section>

  <section class="measure stack">
    <h2>The searches this creates</h2>
    <p>These are real queries that brought people to the store's pages. None of them are searches
    a homepage could ever win — they exist only because a specific item has a specific page.</p>
    <div class="queries">
      <span class="q">tadpole madtom for sale</span>
      <span class="q">texas holey rock for aquarium</span>
      <span class="q">72 gallon bow front aquarium lid</span>
      <span class="q">tetra cleaning bacteria</span>
      <span class="q">100 gallon fish tank</span>
      <span class="q">aquarium store near me</span>
    </div>
  </section>

  <section class="stack">
    <h2 class="measure">Before and after, by the numbers</h2>
    <div class="table-scroll"><table>
      <thead><tr><th>Measured daily</th><th class="num">Jun 17–30</th><th class="num">July</th><th class="num">Change</th></tr></thead>
      <tbody>
        <tr><td>Impressions, whole site</td><td class="num">204</td><td class="num">842</td><td class="num">4.1&times;</td></tr>
        <tr><td>Impressions, product pages</td><td class="num">51</td><td class="num">652</td><td class="num">12.8&times;</td></tr>
        <tr><td>Visitors from search</td><td class="num">8.4</td><td class="num">18.4</td><td class="num">2.2&times;</td></tr>
      </tbody>
    </table></div>
  </section>

  <section class="limits">
    <h2>What this does not prove</h2>
    <ul>
      <li><strong>There is no "before."</strong> The store had no site, so there is no earlier
      period to compare against — Google's records for this domain begin June 17, 2026. Every
      figure here is growth from zero, not a lift over a previous website.</li>
      <li><strong>Visitor counts here are search traffic only.</strong> A two-day spike of direct
      traffic on July 30–31 (roughly 600 visits) did not come with any matching rise in search
      visits, which held steady near 23 a day. It's excluded as non-human rather than counted.</li>
      <li><strong>Timing is evidence, not proof.</strong> Google doesn't publish why a site's
      visibility moves. The dated markers show what changed and when; the correlation is strong
      and the mechanism is plausible, but no one can claim causation from this data alone.</li>
    </ul>
  </section>

  <hr class="rule">
  <footer class="measure">
    Sources: Google Search Console (sc-domain:seacaveinc.com) and Google Analytics 4, both pulled
    2026-08-05 for the window 2026-06-17 to 2026-08-04. Milestone dates come from the project's
    own dated work log. Site: <a href="https://seacaveinc.com">seacaveinc.com</a>.
  </footer>

</div>
"""
out = HTML.replace("__CHART__", svg)
open('/private/tmp/claude-501/-Users-tomsesler/215c8b6f-6e6c-4ed1-83e5-ebfcbb55828b/scratchpad/cs/cataloging-case-study.html','w').write(out)
print("written", len(out), "bytes")
