import SectionHeading from '@/components/sections/SectionHeading';
import ProcessStage from '@/components/process/ProcessStage';

/**
 * Process — how I build your site, as a scroll-driven 3D demonstration.
 *
 * Replaces Setup ("FROM HERE"), which told the same story in two paragraphs.
 * Its facts all survive here: about a week from your photographs and details,
 * your current site stays up, we switch when you say go.
 *
 * Six steps, in the order they happen on a real job. Each beat's copy is plain
 * server-rendered text; the 3D stage beside it (ProcessStage) is decoration
 * that demonstrates the step with its own artefact: the questions from the
 * call organising into a brief, the field sorted into what works and what
 * everyone says, the page assembling section by section, pins on the draft
 * across three rounds, the launch checks, and the editor and calendar after.
 *
 * `data-poses` names the formations a beat scrolls through (see
 * process/lib/formations.ts). A beat with more than one pose is taller so each
 * change gets its own stretch of scroll. The still is the reduced-motion and
 * no-WebGL stand-in: that beat, held.
 *
 * The Stray Success Guarantee is named in the FAQ; it is referenced once here,
 * in its own words, at the step where its clock starts.
 */

type Beat = {
  id: string;
  poses: number[];
  name: string;
  title: string;
  body: string[];
  /** What the owner hands over or does at this step, in one plain line. */
  you: string;
};

/*
 * Copy, 2026-09-29: written in the words owners use when they thank a
 * designer in reviews (Playbook/buyer-language-local-websites.md): listened,
 * plain words, knew what to expect, on time in real units, still there after
 * launch, showed me how to change it myself. Seller words ("custom",
 * "professional", "stunning", "online presence") appear only on the 3D cards,
 * in the lane they belong to. Every unit is one already on the site: about a
 * week, three rounds, week one, ninety days.
 */
const BEATS: Beat[] = [
  {
    id: 'call',
    poses: [1, 2],
    name: 'Discovery call',
    title: 'We start with a short call.',
    body: [
      'You tell me about your business and the people who come in.',
      'I listen, and I ask the questions a new customer would ask.',
      'My notes become the brief I build from.',
    ],
    you: 'One phone call.',
  },
  {
    id: 'research',
    poses: [3, 4],
    name: 'Research',
    title: 'I look at what places like yours put online.',
    body: [
      'I go through the sites and ads in your line of work.',
      'Some of it gives a customer a real reason to call.',
      'A lot of it is the same few words everyone uses.',
      'Your site keeps the first kind.',
    ],
    you: 'Nothing. This step is mine.',
  },
  {
    id: 'first-version',
    poses: [5],
    name: 'First version',
    title: 'You see a first version in about a week.',
    body: [
      'The week starts when your photos and details reach me.',
      'The page goes together section by section.',
      'The motion goes on last, once the words are right.',
    ],
    you: 'Send your photos and the details you already have, like your menu or price list.',
  },
  {
    id: 'review',
    poses: [6, 7, 8],
    name: 'Review rounds',
    title: 'You mark it up. I make the changes.',
    body: [
      'There are three rounds.',
      'Two are calls together.',
      'In the other, you leave notes right on the draft: what you like, what to change, what to use instead.',
      'I explain each change in plain words.',
    ],
    you: 'Tell me what you like and what you don’t.',
  },
  {
    id: 'launch',
    poses: [9],
    name: 'Launch',
    title: 'It goes live on your domain.',
    body: [
      'Your current site stays up the whole time.',
      'We switch when you say go.',
      'Before we do, I check how fast it loads, how it works on a phone, and how it shows up on Google.',
    ],
    you: 'Say go.',
  },
  {
    id: 'after-launch',
    poses: [10],
    name: 'After launch',
    title: 'I’m still here after launch.',
    body: [
      'You get an editor for the everyday changes, like prices, photos and hours.',
      'I show you how it works, one step at a time.',
      'A week after launch, I check in on what needs adjusting.',
      'Ninety days after launch, you decide whether it worked.',
      'If it didn’t, every dollar comes back.',
    ],
    you: 'Keep running the shop.',
  },
];

function Still({ pose }: { pose: number }) {
  return (
    <figure className="process__still" aria-hidden="true">
      <picture>
        <source srcSet={`/process-3d/stills/pose-${pose}-dark.webp`} media="(prefers-color-scheme: dark)" />
        <img src={`/process-3d/stills/pose-${pose}-light.webp`} alt="" width={1200} height={900} loading="lazy" decoding="async" />
      </picture>
    </figure>
  );
}

export default function Process() {
  return (
    <section id="process" className="process scroll-mt-16" aria-label="How I build your site">
      <div className="process__run">
        <ProcessStage />

        <div className="process__beat" data-poses="0">
          <div className="process__copy">
            <SectionHeading kicker="From the first call to the week after launch" title="HOW I BUILD YOUR SITE" className="-ml-5 md:-ml-6" />
            <p className="process__lede">
              Six steps, in the order they happen. You know what to expect at every one. Nothing goes live until you say go.
            </p>
          </div>
          <Still pose={0} />
        </div>

        <ol className="process__beats">
          {BEATS.map((beat, i) => (
            <li
              key={beat.id}
              id={`process-${beat.id}`}
              className={`process__beat process__beat--${beat.poses.length}`}
              data-poses={beat.poses.join(',')}
            >
              <div className="process__copy">
                <p className="process__step">
                  <span className="process__n" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="process__name">{beat.name}</span>
                  <span className="process__of">
                    Step {i + 1} of {BEATS.length}
                  </span>
                </p>
                <h3 className="process__title">{beat.title}</h3>
                <p className="process__body">{beat.body.join(' ')}</p>
                <p className="process__you">
                  <span className="process__you-label">Your part</span> {beat.you}
                </p>
              </div>
              <Still pose={beat.poses[beat.poses.length - 1]} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
