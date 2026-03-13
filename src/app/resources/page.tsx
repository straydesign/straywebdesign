'use client';

import { useState } from 'react';
import { BookOpen, FileText, BarChart3, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimateIn, { StaggerContainer, StaggerItem } from '@/components/ui/AnimateIn';
import GradientText from '@/components/ui/GradientText';
import { RESOURCES, getResourcePath, type ResourceType } from '@/lib/resources';
import { cn } from '@/lib/utils';

const TABS: { type: ResourceType; label: string; icon: typeof BookOpen }[] = [
  { type: 'blog', label: 'Blog', icon: BookOpen },
  { type: 'white-paper', label: 'White Papers', icon: FileText },
  { type: 'case-study', label: 'Case Studies', icon: BarChart3 },
];

const TAG_COLORS: Record<string, string> = {
  Performance: 'bg-blue-50 text-blue-600',
  'AI & SEO': 'bg-violet-50 text-violet-600',
  Analysis: 'bg-slate-100 text-slate-600',
  Restaurant: 'bg-emerald-50 text-emerald-600',
  'Home Services': 'bg-orange-50 text-orange-600',
  'Professional Services': 'bg-indigo-50 text-indigo-600',
};

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState<ResourceType>('blog');

  const filtered = RESOURCES.filter((r) => r.type === activeTab);

  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <AnimateIn className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block text-sm font-semibold tracking-wide text-electric uppercase">
              Resources
            </span>
            <h1 className="font-display text-3xl font-bold text-navy md:text-4xl lg:text-5xl">
              Insights for{' '}
              <GradientText>Erie Businesses</GradientText>
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Blogs, white papers, and case studies on web performance,
              AI readiness, and competing with enterprise brands.
            </p>
          </AnimateIn>

          {/* Tabs */}
          <AnimateIn delay={0.2} className="mt-12">
            <div className="flex justify-center gap-2">
              {TABS.map((tab) => (
                <button
                  key={tab.type}
                  onClick={() => setActiveTab(tab.type)}
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all',
                    activeTab === tab.type
                      ? 'bg-navy text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
                <a
                  href={getResourcePath(resource)}
                  className="group flex h-full flex-col rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        'rounded-full px-3 py-1 text-xs font-medium',
                        TAG_COLORS[resource.tag] ?? 'bg-slate-100 text-slate-600'
                      )}
                    >
                      {resource.tag}
                    </span>
                    <span className="text-xs text-slate-400">
                      {resource.readTime}
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-lg font-bold text-navy group-hover:text-electric transition-colors">
                    {resource.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                    {resource.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-electric">
                    Read more
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </main>
      <Footer />
    </>
  );
}
