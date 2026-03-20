'use client';

import { ArrowRight } from 'lucide-react';
import AnimateIn, { StaggerContainer, StaggerItem } from '@/components/ui/AnimateIn';
import { cn } from '@/lib/utils';

interface RelatedResource {
  slug: string;
  type: string;
  title: string;
  description: string;
  readTime: string;
  tag: string;
  path: string;
}

const TAG_COLORS: Record<string, string> = {
  Accessibility: 'bg-sky-50 text-sky-600',
  Advertising: 'bg-red-50 text-red-600',
  AI: 'bg-blue-50 text-blue-600',
  'AI & SEO': 'bg-blue-50 text-blue-600',
  Analysis: 'bg-slate-100 text-slate-600',
  Analytics: 'bg-blue-50 text-blue-600',
  Automotive: 'bg-zinc-100 text-zinc-700',
  Conversion: 'bg-amber-50 text-amber-600',
  Dental: 'bg-teal-50 text-teal-600',
  Development: 'bg-teal-50 text-teal-600',
  Financial: 'bg-emerald-50 text-emerald-600',
  Healthcare: 'bg-rose-50 text-rose-600',
  'Home Services': 'bg-orange-50 text-orange-600',
  'IT Services': 'bg-indigo-50 text-indigo-600',
  Landscaping: 'bg-lime-50 text-lime-600',
  Legal: 'bg-amber-50 text-amber-700',
  'Local SEO': 'bg-emerald-50 text-emerald-600',
  Migration: 'bg-orange-50 text-orange-600',
  Mobile: 'bg-blue-50 text-blue-600',
  Performance: 'bg-blue-50 text-blue-600',
  'Professional Services': 'bg-indigo-50 text-indigo-600',
  Reliability: 'bg-emerald-50 text-emerald-600',
  Restaurant: 'bg-emerald-50 text-emerald-600',
  Services: 'bg-blue-50 text-blue-600',
  'Technical SEO': 'bg-cyan-50 text-cyan-600',
  'Vision Care': 'bg-sky-50 text-sky-600',
  'Web Design': 'bg-blue-50 text-blue-600',
  Insurance: 'bg-violet-50 text-violet-600',
  Accounting: 'bg-emerald-50 text-emerald-600',
  Veterinary: 'bg-rose-50 text-rose-600',
  Fitness: 'bg-orange-50 text-orange-600',
  'Salons & Spas': 'bg-pink-50 text-pink-600',
  'Real Estate': 'bg-amber-50 text-amber-600',
  HVAC: 'bg-sky-50 text-sky-600',
  Plumbing: 'bg-blue-50 text-blue-600',
  Electrical: 'bg-yellow-50 text-yellow-700',
  Roofing: 'bg-stone-100 text-stone-600',
  Manufacturing: 'bg-zinc-100 text-zinc-700',
  'Cost Analysis': 'bg-emerald-50 text-emerald-600',
  'Speed & Performance': 'bg-blue-50 text-blue-600',
  'AI Integration': 'bg-indigo-50 text-indigo-600',
  ROI: 'bg-green-50 text-green-600',
  Comparison: 'bg-slate-100 text-slate-600',
  Education: 'bg-blue-50 text-blue-600',
  'Erie PA': 'bg-teal-50 text-teal-600',
  Strategy: 'bg-indigo-50 text-indigo-600',
};

export { TAG_COLORS };

export default function RelatedPosts({ posts }: { posts: RelatedResource[] }) {
  if (posts.length === 0) return null;

  return (
    <AnimateIn delay={0.3}>
      <div className="mt-12 border-t border-slate-200 pt-10">
        <h3 className="font-display text-xl font-bold text-navy">
          Related Articles
        </h3>
        <StaggerContainer className="mt-6 grid gap-4 md:grid-cols-3" staggerDelay={0.1}>
          {posts.map((post) => (
            <StaggerItem key={post.slug}>
              <a
                href={post.path}
                className="group flex h-full flex-col rounded-xl border border-slate-200/60 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
              >
                <span
                  className={cn(
                    'inline-block w-fit rounded-full px-2.5 py-0.5 text-xs font-medium',
                    TAG_COLORS[post.tag] ?? 'bg-slate-100 text-slate-600'
                  )}
                >
                  {post.tag}
                </span>
                <h4 className="mt-3 font-display text-sm font-bold leading-snug text-navy group-hover:text-electric transition-colors">
                  {post.title}
                </h4>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-500 line-clamp-2">
                  {post.description}
                </p>
                <div className="mt-3 flex items-center gap-1 text-xs font-medium text-electric">
                  Read more
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </AnimateIn>
  );
}
