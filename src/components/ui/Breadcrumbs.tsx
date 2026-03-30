'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `https://straywebdesign.co${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-text-secondary">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="flex items-center gap-1.5">
                {index > 0 && (
                  <ChevronRight className="h-3.5 w-3.5 text-text-tertiary" aria-hidden="true" />
                )}
                {isLast || !item.href ? (
                  <span className={isLast ? 'font-medium text-text-primary' : ''} aria-current={isLast ? 'page' : undefined}>
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-text-primary"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
