import type { MDXComponents } from 'mdx/types';
import type { ReactNode } from 'react';
import Link from 'next/link';

/** MDX component overrides — replicates the existing ArticleLayout styles exactly */
export const mdxComponents: MDXComponents = {
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 className="mt-10 mb-4 font-mono text-2xl font-bold text-text-primary">{children}</h2>
  ),

  h3: ({ children }: { children?: ReactNode }) => (
    <h3 className="mt-8 mb-3 font-mono text-xl font-semibold text-text-primary">{children}</h3>
  ),

  p: ({ children }: { children?: ReactNode }) => (
    <p className="my-4 leading-relaxed text-text-secondary">{children}</p>
  ),

  a: ({ href, children }: { href?: string; children?: ReactNode }) => {
    const isInternal = href?.startsWith('/') || href?.startsWith('#');
    if (isInternal && href) {
      return (
        <Link href={href} className="text-accent underline hover:text-accent/80">
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className="text-accent underline hover:text-accent/80"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  },

  strong: ({ children }: { children?: ReactNode }) => (
    <strong className="font-semibold text-text-primary">{children}</strong>
  ),

  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="my-4 space-y-2 pl-5 list-disc">{children}</ul>
  ),

  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="my-4 space-y-2 pl-5 list-decimal">{children}</ol>
  ),

  li: ({ children }: { children?: ReactNode }) => (
    <li className="text-text-secondary">{children}</li>
  ),

  table: ({ children }: { children?: ReactNode }) => (
    <div className="my-6 overflow-x-auto border border-border-default">
      <table className="w-full">{children}</table>
    </div>
  ),

  thead: ({ children }: { children?: ReactNode }) => <thead>{children}</thead>,

  tbody: ({ children }: { children?: ReactNode }) => <tbody>{children}</tbody>,

  tr: ({ children }: { children?: ReactNode }) => (
    <tr className="border-b border-border-default">{children}</tr>
  ),

  th: ({ children }: { children?: ReactNode }) => (
    <th className="px-4 py-2.5 text-left text-sm font-semibold text-text-primary bg-surface-sunken">
      {children}
    </th>
  ),

  td: ({ children }: { children?: ReactNode }) => (
    <td className="px-4 py-2.5 text-sm text-text-secondary">{children}</td>
  ),

  hr: () => <hr className="my-8 border-border-default" />,
};
