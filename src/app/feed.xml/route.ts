import { RESOURCES, getResourcePath } from '@/lib/content';

const BASE_URL = 'https://straywebdesign.co';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function GET() {
  const items = RESOURCES.map(
    (r) => `    <item>
      <title>${escapeXml(r.title)}</title>
      <link>${BASE_URL}${getResourcePath(r)}</link>
      <guid isPermaLink="true">${BASE_URL}${getResourcePath(r)}</guid>
      <description>${escapeXml(r.description)}</description>
      <pubDate>${new Date(r.date).toUTCString()}</pubDate>
      <category>${escapeXml(r.tag)}</category>
    </item>`
  ).join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Stray Web Design — Resources</title>
    <link>${BASE_URL}/resources</link>
    <description>Blogs, white papers, and case studies on web performance, AI readiness, and competing with enterprise brands.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
