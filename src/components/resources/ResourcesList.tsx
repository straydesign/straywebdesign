'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { StaggerContainer, StaggerItem } from '@/components/ui/AnimateIn';
import { cn } from '@/lib/utils';

interface ResourceCard {
  slug: string;
  title: string;
  description: string;
  readTime: string;
  date: string;
  tag: string;
  path: string;
}

const TAG_COLORS: Record<string, string> = {
  Accessibility: 'bg-sky-50 text-sky-600',
  AI: 'bg-blue-50 text-blue-600',
  'AI & SEO': 'bg-blue-50 text-blue-600',
  Analysis: 'bg-surface-sunken text-text-secondary',
  Analytics: 'bg-blue-50 text-blue-600',
  Conversion: 'bg-amber-50 text-amber-600',
  Development: 'bg-teal-50 text-teal-600',
  'Cost Analysis': 'bg-amber-50 text-amber-700',
  Performance: 'bg-blue-50 text-blue-600',
  'Speed & Performance': 'bg-blue-50 text-blue-600',
  'Web Design': 'bg-blue-50 text-blue-600',
  'AI Integration': 'bg-indigo-50 text-indigo-600',
  ROI: 'bg-emerald-50 text-emerald-700',
  Comparison: 'bg-surface-sunken text-text-primary',
};

export default function ResourcesList({ resources }: { resources: ResourceCard[] }) {
  return (
    <StaggerContainer
      className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      staggerDelay={0.1}
    >
      {resources.map((resource) => (
        <StaggerItem key={resource.slug}>
          <Link
            href={resource.path}
            className="group flex h-full flex-col border border-border-default bg-surface-card p-6 transition-all hover:-translate-y-1"
          >
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  'px-3 py-1 text-xs font-medium',
                  TAG_COLORS[resource.tag] ?? 'bg-surface-sunken text-text-secondary'
                )}
              >
                {resource.tag}
              </span>
              <span className="text-xs text-text-secondary">
                {resource.readTime}
              </span>
            </div>
            <h2 className="mt-4 font-display tracking-tight text-lg font-bold text-text-primary group-hover:text-accent transition-colors">
              {resource.title}
            </h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
              {resource.description}
            </p>
            <div className="mt-4 flex items-center gap-1 text-sm font-medium text-accent">
              Read more
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
