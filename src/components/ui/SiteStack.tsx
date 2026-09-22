'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import MacBookFrame from '@/components/ui/MacBookFrame';
import { PROOF } from '@/data/proof';
import { CASE_STUDIES } from '@/data/caseStudies';

/* SiteStack — the four live sites, on four depth planes, tilting toward
   whoever is looking at them, each one a way into its case study.

   This sits in the hero because the page claims to build engaging sites, and a
   claim like that has to be true of the first screen or it is just a sentence.
   The slot it fills was an empty div left behind when the intro video came off
   in September.

   It is the ONE heavy pattern on the page. Everything else here is still,
   deliberately — a second moving thing would make both of them noise.

   Three things keep it from costing what an effect like this usually costs:
   the tilt is written to a CSS custom property inside a requestAnimationFrame,
   never to React state, so a pointer sweep does not re-render four next/image
   trees; only the front card is priority; and under prefers-reduced-motion no
   listener is attached at all and the fan just sits there.

   THE LABEL IS NOT IN THE 3D, AND IT IS NOT IN THE LAYOUT EITHER
     Two wrong versions, both worth writing down.

     Inside the stage, a label inherits its card's translateZ and rotateY: it
     comes out turned nine degrees, scaled by perspective by a different amount
     per card, and painted BEHIND every card nearer the viewer — inside
     preserve-3d it is depth that decides what covers what, not z-index. The
     back card's label would sit under the other three.

     So it moved outside the stage, positioned by the same `left: i*12%` the
     cards are laid out with. That is wrong for a subtler reason: those
     percentages describe where a card sits BEFORE the tilt. The stage turns up
     to nine degrees under the cursor and the cards swing across the box with
     it, so pointing at the far left lit up the third card's label. A label that
     names the wrong site is worse than no label.

     What it does now: the label is placed from the hovered card's MEASURED
     rect, re-measured inside the same requestAnimationFrame that writes the
     tilt. That is one extra getBoundingClientRect per frame, on one element,
     next to the one this already took. React state still only ever holds WHICH
     card is active, and that changes on enter and leave — never per move. */

/** Back to front. The last one is nearest the viewer and carries the LCP. */
const CARDS = PROOF.map((p) => ({
  name: p.name,
  shot: p.shot,
  /* Same match Work.tsx makes: the two datasets were written apart, and the
     live URL is the one field both are guaranteed to agree on. */
  slug: CASE_STUDIES.find((c) => c.liveUrl === p.url)?.slug,
}));

const MAX_TILT_X = 5; // degrees, nodding
const MAX_TILT_Y = 9; // degrees, turning
const LAST = CARDS.length - 1;

export default function SiteStack() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [active, setActive] = useState<number | null>(null);
  /* The rAF closure is created once and has to see the current value. */
  const activeRef = useRef<number | null>(null);

  /**
   * Put the label over the part of its card you can actually see.
   *
   * The back three are covered by the card in front, so their visible strip
   * runs from their own left edge to the next card's — that strip is the only
   * thing a pointer can reach, and it is what the label has to point at. The
   * front card is whole, so it uses its own middle.
   */
  const placeLabel = useCallback(() => {
    const i = activeRef.current;
    const wrap = wrapRef.current;
    const label = labelRef.current;
    if (i === null || !wrap || !label) return;
    const card = cardRefs.current[i];
    if (!card) return;

    const w = wrap.getBoundingClientRect();
    const r = card.getBoundingClientRect();
    const next = i < LAST ? cardRefs.current[i + 1]?.getBoundingClientRect() : undefined;
    const right = next ? Math.max(Math.min(r.right, next.left), r.left + 28) : r.right;

    /* The pill is drawn 10px ABOVE the card's top edge, and the back card's
       top edge is already at the top of the box — so unclamped it climbed out
       of the stack and sat on the paragraph above it. Keeping --ly at least a
       pill-height clear of the top pins the pill's own top to the box: it
       rides above the card where there is room and slips onto the laptop's
       bezel where there is not. */
    const clearance = label.offsetHeight + 10;

    label.style.setProperty('--lx', `${(r.left + right) / 2 - w.left}px`);
    label.style.setProperty('--ly', `${Math.max(r.top - w.top, clearance)}px`);
  }, []);

  /* Keyboard focus moves the label with no pointer event to ride along on, and
     under reduced motion there is no frame loop at all — so placement also
     runs whenever the active card changes. */
  useEffect(() => {
    activeRef.current = active;
    if (active !== null) placeLabel();
  }, [active, placeLabel]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    if (!wrap || !stage) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const coarse = window.matchMedia('(pointer: coarse)').matches;
    let frame = 0;

    const write = (rx: number, ry: number) => {
      stage.style.setProperty('--rx', `${rx.toFixed(2)}deg`);
      stage.style.setProperty('--ry', `${ry.toFixed(2)}deg`);
      placeLabel();
    };

    const schedule = (fn: () => void) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        fn();
      });
    };

    /* Fine pointer: the stack turns toward the cursor while it is over the
       hero, and settles back when it leaves. */
    const onPointerMove = (e: PointerEvent) => {
      schedule(() => {
        const r = wrap.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        write(-y * 2 * MAX_TILT_X, x * 2 * MAX_TILT_Y);
      });
    };
    const onPointerLeave = () => schedule(() => write(0, 0));

    /* Coarse pointer: there is no cursor to follow, so the scroll does it.
       The turn runs across the window rather than across the element, which
       keeps it moving the whole time the hero is on screen. */
    const onScroll = () => {
      schedule(() => {
        const r = wrap.getBoundingClientRect();
        const progress = (r.top + r.height / 2) / window.innerHeight - 0.5;
        const clamped = Math.max(-0.5, Math.min(0.5, progress));
        write(-clamped * 2 * MAX_TILT_X, clamped * 2 * MAX_TILT_Y);
      });
    };

    if (coarse) {
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    } else {
      wrap.addEventListener('pointermove', onPointerMove);
      wrap.addEventListener('pointerleave', onPointerLeave);
    }

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      wrap.removeEventListener('pointermove', onPointerMove);
      wrap.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [placeLabel]);

  const shown = active === null ? null : CARDS[active];

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto w-full max-w-3xl"
      style={{ perspective: '1600px' }}
      onPointerLeave={() => setActive(null)}
    >
      {/* The aspect ratio holds the box open before the images decode, so the
          headline above never moves once they land. */}
      <div className="relative aspect-[2/1]">
        {/* THE STAGE MUST NOT BE HIT-TESTABLE.
            It holds the tilt and nothing else, but it is a full-box surface
            sitting at z=0, and each card's own rotateY(-9deg) swings its LEFT
            half backwards — about 38px at this size — so the left edge of a
            card ends up BEHIND the stage. That edge is the only part of the
            back three you can reach, which made Andy's the one card on the
            page you could not hover or click, looking perfectly normal the
            whole time. Lifting the cards would only work until the hero got
            wider and the excursion grew with the card. Taking the stage out of
            hit testing works at every size: pointer-events do not inherit
            downward once a child sets its own, and an event that starts on a
            card still bubbles through here to the wrapper that listens. */}
        <div
          ref={stageRef}
          className="pointer-events-none absolute inset-0 motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))',
          }}
        >
          {CARDS.map((card, i) => {
            /* The fan runs mostly sideways. A first pass stepped 6.5% across
               and 7% down, which stacked them so squarely that the back three
               showed nothing but their address bars — four sites claimed,
               one site visible. Sideways is what makes each one readable. */
            const lifted = active === i;
            /* Empty alt when the card is a link: the link's own name carries
               the brand, and an alt as well would read it twice. */
            const body = (
              <MacBookFrame
                src={card.shot}
                alt={card.slug ? '' : `${card.name}, built and running`}
                priority={i === LAST}
              />
            );
            return (
              <div
                key={card.name}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="absolute w-[64%] motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out"
                style={{
                  left: `${i * 12}%`,
                  top: `${i * 4.5}%`,
                  zIndex: i,
                  /* The hovered card comes 26px toward the viewer. That is the
                     only feedback that survives being 88% covered by the card
                     in front of it. */
                  transform: `translateZ(${i * 60 + (lifted ? 26 : 0)}px) rotateY(-9deg)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                {card.slug ? (
                  <Link
                    href={`/work/${card.slug}`}
                    className="pointer-events-auto block rounded-md outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                    onPointerEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive(null)}
                  >
                    {body}
                    {/* The label is decorative — this says the same thing to a
                        screen reader, once, in the link's own name. */}
                    <span className="sr-only">{card.name} — read the case study</span>
                  </Link>
                ) : (
                  body
                )}
              </div>
            );
          })}
        </div>

        {/* One label, outside the stage: flat, crisp, painted over everything,
            and placed from whichever card is under the pointer. */}
        <span
          ref={labelRef}
          data-stack-label
          aria-hidden
          className={[
            'pointer-events-none absolute left-0 top-0 z-50 whitespace-nowrap rounded-full px-3 py-1.5',
            'font-mono text-[11px] font-semibold tracking-wide',
            /* The pill lands on paper, on a black laptop bezel, or on whatever
               the capture behind it happens to be. A paper hairline keeps its
               shape on the dark grounds and is invisible on the light one. */
            'bg-text-primary text-surface-page shadow-lg ring-2 ring-surface-page/60',
            'transition-opacity duration-150 motion-reduce:transition-none',
            shown ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
          style={{
            transform:
              'translate(calc(var(--lx, 50%) - 50%), calc(var(--ly, 0px) - 100% - 10px))',
          }}
        >
          {shown?.name}
          <span className="pl-1.5 text-accent">↗</span>
        </span>
      </div>
    </div>
  );
}
