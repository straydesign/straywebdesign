import Image from 'next/image';
import AnimateIn from '@/components/ui/AnimateIn';
import SectionHeading from '@/components/sections/SectionHeading';

/**
 * Editor — the back of the site, which is the part nobody selling a website
 * ever shows you and the part you actually live in.
 *
 * All four are real screens of Sea Cave's store editor, captured from the
 * live build. The product counts on them are that shop's real counts — 969
 * items, 884 of them on the site the day these were taken.
 *
 * Re-shot 2026-09-22, when that editor stopped being hub-and-spoke and got a
 * rail. The old captures showed a tool that no longer exists, which is the
 * quiet way a page about somebody's current work goes stale.
 *
 * They are shown in a plain bezel rather than the photoreal PhoneFrame render:
 * that component takes the 1127x2210 composites the Envato smart object
 * produces, and these are 900x1948 captures of a tool rather than of a site.
 * A device frame is for showing somebody their own storefront.
 *
 * THE `-light` IN THE FILENAMES IS LOAD-BEARING — DO NOT TIDY IT AWAY.
 * These replaced captures of the reef-coloured editor that are live on
 * straywebdesign.co right now under the SAME four names. Next serves the
 * optimized variants with `max-age=31536000`, keyed on the source path, so
 * swapping the bytes behind an unchanged name leaves every returning visitor
 * looking at the old screens for up to a year — a page arguing for a tool
 * the client cannot open. A new name is a new URL, and a new URL is the only
 * thing a cache cannot serve stale. Re-shoot the editor again, change the
 * suffix again.
 */

const SCREENS = [
  {
    src: '/images/case-studies/seacave/manage-tasks-light.webp',
    title: 'Pick what you want to do',
    body: 'Add a product, or change one you already sell. Two buttons, and nothing to learn first.',
    alt: "Sea Cave's store editor: add a new product, or edit and turn one off",
  },
  {
    src: '/images/case-studies/seacave/manage-menu-light.webp',
    title: 'Everything is one tap away',
    body: 'The menu lists every screen and marks the one you are on. Nothing is buried two pages deep.',
    alt: "Sea Cave's store editor menu, open, with every screen listed and the current one marked",
  },
  {
    src: '/images/case-studies/seacave/manage-toggle-light.webp',
    title: 'Turn something off when it runs out',
    body: 'Out of stock comes off the site. Back in stock goes back on. One tap, and the page updates itself.',
    alt: 'The product list, with on-site and off-site counts and a toggle on each item',
  },
  {
    src: '/images/case-studies/seacave/manage-check-light.webp',
    title: "See what's live, and what needs a look",
    body: 'Everything on the site, counted by category, with anything missing a photograph or a price pulled to the top. You are never guessing at what is out there.',
    alt: "Sea Cave's live count by category, with items missing a photo or a price flagged",
  },
];

export default function Editor() {
  return (
    <section
      id="editor"
      className="scroll-mt-16 border-b border-border-default bg-surface-card py-20 md:py-28"
      aria-label="Your editor"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading kicker="And this is the back of it" title="YOUR EDITOR" className="mb-2" />

        <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-text-secondary">
          This is what you get to work with. It is set up so the everyday
          changes are yours to make. If you later need to change something we
          did not scope at the start, I adjust the editor so that you can.
        </p>

        <ul className="mt-12 grid gap-12 sm:grid-cols-2 md:mt-16 md:gap-8 lg:grid-cols-4">
          {SCREENS.map((screen, i) => (
            <li key={screen.title}>
              <AnimateIn delay={i * 0.06}>
                <figure className="m-0">
                  <div className="mx-auto w-full max-w-[280px] rounded-[1.6rem] bg-[#0d0d10] p-2 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.45)]">
                    <div className="relative aspect-[900/1948] overflow-hidden rounded-[1.1rem] bg-surface-sunken">
                      <Image
                        src={screen.src}
                        alt={screen.alt}
                        fill
                        sizes="(min-width: 1024px) 260px, (min-width: 640px) 44vw, 80vw"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                </figure>
                <div className="mt-6">
                  <h3 className="font-display text-lg font-semibold tracking-tight text-text-primary md:text-xl">
                    {screen.title}
                  </h3>
                  <p className="mt-2 font-body text-[15px] leading-relaxed text-text-secondary">
                    {screen.body}
                  </p>
                </div>
              </AnimateIn>
            </li>
          ))}
        </ul>

        <p className="mt-10 font-mono text-[11px] text-text-tertiary">
          <span aria-hidden className="text-accent/60">{'// '}</span>
          Sea Cave&apos;s own editor, and its own product counts
        </p>
      </div>
    </section>
  );
}
