'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AnimateIn from '@/components/ui/AnimateIn';
import DeviceDuo from '@/components/ui/DeviceDuo';
import { PROJECTS, type Project } from '@/data/clients';

/* ProjectShowcase — the work as alternating rows: desktop + phone mockups on
   one side, an honest description with real stack chips on the other, and a
   "see the design" disclosure that opens the project's actual palette and
   type. Replaces the old two-grid WorkGallery. */

function DesignDiveIn({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className="overflow-hidden"
    >
      <div className="mt-5 rounded-lg border border-border-default bg-surface-card p-5 md:p-6">
        <p className="font-body text-[15px] leading-relaxed text-text-secondary">
          {project.dive}
        </p>
        <div className="mt-5 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-text-tertiary">
              <span aria-hidden className="text-accent/60">{'// '}</span>palette
            </p>
            <ul className="mt-3 space-y-2">
              {project.palette.map((c) => (
                <li key={c.hex} className="flex items-center gap-2.5">
                  <span
                    aria-hidden
                    className="h-4 w-4 shrink-0 rounded-full border border-border-strong"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="font-mono text-[12px] text-text-secondary">
                    {c.hex.toUpperCase()}
                  </span>
                  <span className="font-body text-[13px] text-text-tertiary">
                    {c.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-text-tertiary">
              <span aria-hidden className="text-accent/60">{'// '}</span>type
            </p>
            <ul className="mt-3 space-y-2">
              {project.typefaces.map((t) => (
                <li key={t} className="font-body text-[15px] text-text-secondary">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);
  const flipped = index % 2 === 1;
  const live = project.category === 'live';

  return (
    <AnimateIn>
      <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className={flipped ? 'lg:order-2' : undefined}>
          <DeviceDuo
            shot={project.shot}
            phoneShot={project.phoneShot}
            name={project.name}
            displayUrl={project.displayUrl}
            priority={index === 0}
          />
        </div>
        <div className={flipped ? 'lg:order-1' : undefined}>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-accent">
            <span aria-hidden className="text-accent/60">{'// '}</span>
            {live ? 'live — built, hosted & managed by me' : 'concept redesign — spec work'}
          </p>
          <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
            {project.name}
          </h3>
          <p className="mt-1 font-body text-sm text-text-tertiary">
            {project.type}
            {project.place ? ` · ${project.place}` : ''}
          </p>
          <p className="mt-4 max-w-lg font-body text-[15px] leading-relaxed text-text-secondary md:text-base">
            {project.description}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-border-default bg-surface-card px-3 py-1 font-mono text-[11px] text-text-secondary"
              >
                {chip}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 font-body text-sm font-semibold text-white transition-colors hover:bg-accent/90"
            >
              Visit website
              <span aria-hidden>→</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="group inline-flex items-center gap-1.5 font-body text-sm font-medium text-text-primary underline-offset-4 hover:underline"
            >
              {open ? 'Close design notes' : 'See the design'}
              <span
                aria-hidden
                className={`text-accent transition-transform duration-300 ${open ? 'rotate-90' : 'group-hover:translate-x-0.5'}`}
              >
                →
              </span>
            </button>
          </div>
          <AnimatePresence initial={false}>
            {open && <DesignDiveIn project={project} />}
          </AnimatePresence>
        </div>
      </article>
    </AnimateIn>
  );
}

export default function ProjectShowcase() {
  return (
    <section
      id="work"
      className="border-b border-border-default bg-surface-page py-20 md:py-28"
      aria-label="Work"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <AnimateIn>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-accent">
            <span aria-hidden className="text-accent/60">{'// '}</span>
            the work
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.9rem,4vw,2.9rem)] font-bold leading-[1.05] tracking-tight text-text-primary">
            Real sites, on real screens.
          </h2>
          <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-text-secondary md:text-lg">
            The first two are live client sites I built and still run. The
            rest are concept rebuilds I made for real local businesses, to
            show what their sites could be. Open any of them.
          </p>
        </AnimateIn>

        <div className="mt-14 space-y-20 md:mt-20 md:space-y-28">
          {PROJECTS.map((p, i) => (
            <ProjectRow key={p.name} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
