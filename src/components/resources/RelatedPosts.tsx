'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AnimateIn, { StaggerContainer, StaggerItem } from '@/components/ui/AnimateIn';
import { cn } from '@/lib/utils';
import { TAG_COLORS, TAG_FALLBACK } from '@/lib/tag-colors';

interface RelatedResource {
  slug: string;
  type: string;
  title: string;
  description: string;
  readTime: string;
  tag: string;
  path: string;
}

export default function RelatedPosts({ posts }: { posts: RelatedResource[] }) {
  if (posts.length === 0) return null;

  return (
    <AnimateIn delay={0.3}>
      <div className="mt-12 border-t border-border-default pt-10">
        <h3 className="font-display tracking-tight text-xl font-bold text-text-primary">
          Related Articles
        </h3>
        <StaggerContainer className="mt-6 grid gap-4 md:grid-cols-3" staggerDelay={0.1}>
          {posts.map((post) => (
            <StaggerItem key={post.slug}>
              <Link
                href={post.path}
                className="group flex h-full flex-col border border-border-default bg-surface-card p-5 transition-all hover:-translate-y-1"
              >
                <span
                  className={cn(
                    'inline-block w-fit px-2.5 py-0.5 text-xs font-medium',
                    TAG_COLORS[post.tag] ?? TAG_FALLBACK
                  )}
                >
                  {post.tag}
                </span>
                <h4 className="mt-3 font-display tracking-tight text-sm font-bold leading-snug text-text-primary group-hover:text-accent transition-colors">
                  {post.title}
                </h4>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-text-secondary line-clamp-2">
                  {post.description}
                </p>
                <div className="mt-3 flex items-center gap-1 text-xs font-medium text-accent">
                  Read more
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </AnimateIn>
  );
}
