import { NextResponse, type NextRequest } from 'next/server';

const PSI_API_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

interface AuditResult {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  fcp: string;
  lcp: string;
  cls: string;
  tbt: string;
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body?.url || typeof body.url !== 'string') {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  let url = body.url.trim();
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`;
  }

  try {
    new URL(url);
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_PSI_API_KEY;

  const params = new URLSearchParams({
    url,
    category: 'PERFORMANCE',
    strategy: 'MOBILE',
  });
  if (apiKey) params.set('key', apiKey);

  // Fetch all 4 categories
  const categories = ['PERFORMANCE', 'ACCESSIBILITY', 'BEST_PRACTICES', 'SEO'] as const;
  const results: Record<string, number> = {};
  const metrics: Record<string, string> = {};

  try {
    // Run performance category (includes metrics) + others in parallel
    const fetches = categories.map(async (category) => {
      const p = new URLSearchParams({ url, category, strategy: 'MOBILE' });
      if (apiKey) p.set('key', apiKey);

      const res = await fetch(`${PSI_API_URL}?${p.toString()}`, {
        signal: AbortSignal.timeout(30000),
      });

      if (!res.ok) {
        throw new Error(`PSI API returned ${res.status}`);
      }

      const data = await res.json();
      const score = Math.round(
        (data.lighthouseResult?.categories?.[category.toLowerCase().replace('_', '-')]
          ?.score ?? 0) * 100
      );

      return { category, score, data };
    });

    const responses = await Promise.all(fetches);

    for (const { category, score, data } of responses) {
      const key = category.toLowerCase().replace('_', '-');
      results[key] = score;

      if (category === 'PERFORMANCE') {
        const audits = data.lighthouseResult?.audits ?? {};
        metrics.fcp = audits['first-contentful-paint']?.displayValue ?? 'N/A';
        metrics.lcp = audits['largest-contentful-paint']?.displayValue ?? 'N/A';
        metrics.cls = audits['cumulative-layout-shift']?.displayValue ?? 'N/A';
        metrics.tbt = audits['total-blocking-time']?.displayValue ?? 'N/A';
      }
    }

    const result: AuditResult = {
      performance: results['performance'] ?? 0,
      accessibility: results['accessibility'] ?? 0,
      bestPractices: results['best-practices'] ?? 0,
      seo: results['seo'] ?? 0,
      fcp: metrics.fcp ?? 'N/A',
      lcp: metrics.lcp ?? 'N/A',
      cls: metrics.cls ?? 'N/A',
      tbt: metrics.tbt ?? 'N/A',
    };

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Audit failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
