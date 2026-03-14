'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { COMPARISON_ROWS, EASE_SMOOTH } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function ComparisonTable({ className = '' }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={cn('overflow-hidden rounded-xl border border-slate-200/60 bg-white', className)}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-5 py-4 font-display text-sm font-semibold text-navy md:px-6">
                Category
              </th>
              <th className="px-5 py-4 font-display text-sm font-semibold text-red-600 md:px-6">
                Your Site Now
              </th>
              <th className="px-5 py-4 font-display text-sm font-semibold text-emerald-600 md:px-6">
                After Stray Web Design
              </th>
              <th className="px-5 py-4 font-display text-sm font-semibold text-electric md:px-6">
                Improvement
              </th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map((row, i) => (
              <motion.tr
                key={row.category}
                className="border-b border-slate-100 last:border-0 transition-colors hover:bg-slate-50/50"
                initial={
                  prefersReducedMotion
                    ? undefined
                    : { opacity: 0, x: -10 }
                }
                whileInView={
                  prefersReducedMotion ? undefined : { opacity: 1, x: 0 }
                }
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.04,
                  duration: 0.3,
                  ease: EASE_SMOOTH,
                }}
              >
                <td className="px-5 py-3.5 text-sm font-medium text-navy md:px-6">
                  {row.category}
                </td>
                <td className="px-5 py-3.5 text-sm text-red-500/80 md:px-6">
                  {row.before}
                </td>
                <td className="px-5 py-3.5 text-sm font-medium text-emerald-600 md:px-6">
                  {row.after}
                </td>
                <td className="px-5 py-3.5 text-sm font-semibold text-electric md:px-6">
                  {row.improvement}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
