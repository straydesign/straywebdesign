import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type Demo = {
  slug: string;
  title: string;
  summary: string;
  tech: string;
};

const DEMOS: readonly Demo[] = [
  {
    slug: 'particles',
    title: 'Particle field',
    summary: 'Floating GPU particles — bubbles, dust, ambient motion. Drives the atmosphere behind a hero.',
    tech: 'drei Sparkles + Bloom',
  },
  {
    slug: 'chrome',
    title: 'Chrome orbs',
    summary: 'Procedurally-generated reflective glass spheres floating in HDR-lit space. No downloaded model.',
    tech: 'MeshTransmissionMaterial + Environment + Bloom',
  },
  {
    slug: 'wireframe',
    title: 'Wireframe creature',
    summary: 'A slowly-rotating low-poly wireframe object — blueprint/schematic aesthetic.',
    tech: 'meshBasicMaterial wireframe + slow useFrame spin',
  },
  {
    slug: 'exploded',
    title: 'Exploded object',
    summary: 'Procedural object disassembling into glowing slabs on a GSAP timeline — Erie Carbonic style.',
    tech: 'GSAP timeline + r3f useFrame refs',
  },
];

export default function LabIndex() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <div className="max-w-3xl">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
          Effect Playground
        </p>
        <h1 className="mt-3 font-mono text-4xl font-bold md:text-5xl">
          What we can actually build.
        </h1>
        <p className="mt-4 font-mono text-base leading-relaxed text-white/70">
          Isolated demos showing the core techniques we use in production.
          Each runs on its own — click any card to see the effect full-bleed.
        </p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {DEMOS.map((demo, i) => (
          <Link
            key={demo.slug}
            href={`/lab/${demo.slug}`}
            className="group relative block border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-white/40 hover:bg-white/[0.04]"
          >
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
              Demo {String(i + 1).padStart(2, '0')}
            </span>
            <h2 className="mt-2 font-mono text-xl font-bold text-white">
              {demo.title}
            </h2>
            <p className="mt-3 font-mono text-sm leading-relaxed text-white/70">
              {demo.summary}
            </p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-white/40">
              {demo.tech}
            </p>
            <ArrowRight className="absolute right-6 top-6 h-4 w-4 text-white/30 transition-all group-hover:translate-x-1 group-hover:text-white" />
          </Link>
        ))}
      </div>

      <p className="mt-12 font-mono text-xs text-white/40">
        All demos use procedural geometry — no external 3D assets downloaded yet.
        Add a .glb in public/models/ to swap in a real rigged creature.
      </p>
    </div>
  );
}
