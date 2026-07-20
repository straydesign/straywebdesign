'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { StaggerContainer, StaggerItem } from '@/components/ui/AnimateIn';
import { cn } from '@/lib/utils';
import { TAG_COLORS, TAG_FALLBACK } from '@/lib/tag-colors';

interface ResourceCard {
  slug: string;
  title: string;
  description: string;
  readTime: string;
  date: string;
  tag: string;
  path: string;
}

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
                  TAG_COLORS[resource.tag] ?? TAG_FALLBACK
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
