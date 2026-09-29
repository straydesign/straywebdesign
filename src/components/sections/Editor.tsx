import SectionHeading from '@/components/sections/SectionHeading';
import ProcessStage from '@/components/process/ProcessStage';
import Still from '@/components/process/Still';

/**
 * Editor — the back of the site, told the way "How I build your site" is told:
 * a scroll-driven 3D stage beside plain server-rendered copy.
 *
 * Rebuilt 2026-09-29 on Tom's call ("make it animation-based"). It used to be
 * four phone captures of Sea Cave's store editor. It is now a simplified
 * editor in the same matte kit as Process (process/lib/editor-story.ts): the
 * rail folds down to icons, a price is changed and saves itself, a photo is
 * swapped, and the site on the phone beside it follows each change.
 *
 * Every claim is one the editors back today (see the note at the top of
 * editor-story.ts): changes save as they are made, with no Save button and a
 * small Saved tag; photos upload when picked and attach themselves; a save
 * shows on the site within seconds, which "under a minute" clears.
 */

type Beat = { id: string; name: string; title: string; body: string; you: string };

const BEATS: Beat[] = [
  {
    id: 'menu',
    name: 'The menu',
    title: 'Every screen is one tap away.',
    body: 'The menu lists every screen and marks the one you’re on. Fold it down to icons when you want the room.',
    you: 'Tap where you want to go.',
  },
  {
    id: 'price',
    name: 'A new price',
    title: 'Type the new price.',
    body: 'There’s no Save button. The change saves the moment you make it, and a small Saved tag tells you so.',
    you: 'Type it.',
  },
  {
    id: 'photo',
    name: 'A new photo',
    title: 'Pick a photo from your phone.',
    body: 'It uploads when you pick it and puts itself in place. A photo straight off an iPhone works as it is.',
    you: 'Pick the photo.',
  },
  {
    id: 'live',
    name: 'On your site',
    title: 'It’s on your site in under a minute.',
    body: 'There’s no rebuild, and nothing waits on me. When something runs out, one tap takes it off the site.',
    you: 'Nothing else.',
  },
];

export default function Editor() {
  return (
    <section id="editor" className="process process--editor scroll-mt-16" aria-label="Your editor">
      <div className="process__run">
        <ProcessStage story="editor" />

        <div className="process__beat" data-poses="0">
          <div className="process__copy">
            <SectionHeading kicker="And this is the back of it" title="YOUR EDITOR" className="-ml-5 md:-ml-6" />
            <p className="process__lede">
              You make the everyday changes yourself. If you need to change something we didn’t plan for at the start, I
              adjust the editor so you can.
            </p>
          </div>
          <Still prefix="editor" pose={0} />
        </div>

        <ol className="process__beats">
          {BEATS.map((beat, i) => (
            <li key={beat.id} id={`editor-${beat.id}`} className="process__beat" data-poses={String(i + 1)}>
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
                <p className="process__body">{beat.body}</p>
                <p className="process__you">
                  <span className="process__you-label">Your part</span> {beat.you}
                </p>
              </div>
              <Still prefix="editor" pose={i + 1} />
            </li>
          ))}
        </ol>

        <p className="process__note">
          <span aria-hidden="true" className="process__note-mark">
            {'// '}
          </span>
          A simplified version of the editors my clients use today
        </p>
      </div>
    </section>
  );
}
