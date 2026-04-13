'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, FileText, BarChart3, ArrowRight } from 'lucide-react';
import AnimateIn, { StaggerContainer, StaggerItem } from '@/components/ui/AnimateIn';
import { cn } from '@/lib/utils';

type ResourceType = 'blog' | 'white-paper' | 'case-study';

interface ResourceCard {
  slug: string;
  type: ResourceType;
  title: string;
  description: string;
  readTime: string;
  date: string;
  tag: string;
  path: string;
}

const TABS: { type: ResourceType; label: string; icon: typeof BookOpen }[] = [
  { type: 'blog', label: 'Blog', icon: BookOpen },
  { type: 'white-paper', label: 'White Papers', icon: FileText },
  { type: 'case-study', label: 'Case Studies', icon: BarChart3 },
];

const TAG_COLORS: Record<string, string> = {
  Accessibility: 'bg-sky-50 text-sky-600',
  Advertising: 'bg-red-50 text-red-600',
  AI: 'bg-blue-50 text-blue-600',
  'AI & SEO': 'bg-blue-50 text-blue-600',
  Analysis: 'bg-surface-sunken text-text-secondary',
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
  Restaurants: 'bg-emerald-50 text-emerald-600',
  'Salons & Spas': 'bg-pink-50 text-pink-600',
  'Real Estate': 'bg-violet-50 text-violet-600',
  HVAC: 'bg-orange-50 text-orange-600',
  Plumbing: 'bg-cyan-50 text-cyan-600',
  Electrical: 'bg-yellow-50 text-yellow-700',
  Roofing: 'bg-stone-100 text-stone-600',
  Insurance: 'bg-blue-50 text-blue-700',
  Accounting: 'bg-green-50 text-green-700',
  Veterinary: 'bg-rose-50 text-rose-600',
  Fitness: 'bg-purple-50 text-purple-600',
  'Cost Analysis': 'bg-amber-50 text-amber-700',
  'Speed & Performance': 'bg-blue-50 text-blue-600',
  'AI Integration': 'bg-indigo-50 text-indigo-600',
  ROI: 'bg-emerald-50 text-emerald-700',
  Comparison: 'bg-surface-sunken text-text-primary',
  Finance: 'bg-emerald-50 text-emerald-600',
  Manufacturing: 'bg-zinc-100 text-zinc-600',
};

export default function ResourcesList({ resources }: { resources: ResourceCard[] }) {
  const [activeTab, setActiveTab] = useState<ResourceType>('blog');

  const filtered = resources.filter((r) => r.type === activeTab);

  return (
    <>
      {/* Tabs */}
      <AnimateIn delay={0.2} className="mt-12">
        <div className="flex justify-center gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.type}
              onClick={() => setActiveTab(tab.type)}
              className={cn(
                'flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-all',
                activeTab === tab.type
                  ? 'bg-accent text-white'
                  : 'bg-surface-sunken text-text-secondary hover:bg-surface-sunken'
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </AnimateIn>

      {/* Cards */}
      <StaggerContainer
        key={activeTab}
        className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        staggerDelay={0.1}
      >
        {filtered.map((resource) => (
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
              <h2 className="mt-4 font-mono text-lg font-bold text-text-primary group-hover:text-accent transition-colors">
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
    </>
  );
}
