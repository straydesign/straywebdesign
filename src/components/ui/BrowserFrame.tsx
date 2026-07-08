import Image from 'next/image';

/* BrowserFrame — wraps a real screenshot in a lightweight browser-chrome shell
   (traffic-light dots + an address pill) so client work reads as a live site,
   not a flat image. The screenshot is captured at 1280×800 (16:10). */

export default function BrowserFrame({
  src,
  alt,
  url,
  priority = false,
}: {
  src: string;
  alt: string;
  url: string;
  priority?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border-strong bg-surface-card shadow-[0_24px_60px_-24px_rgba(24,24,27,0.35)]">
      <div className="flex items-center gap-2 border-b border-border-default bg-surface-sunken px-3.5 py-2.5">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ec6a5e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#f4bf4f]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#61c554]" />
        </span>
        <span className="ml-2 flex-1 truncate rounded bg-surface-card px-3 py-1 font-mono text-[11px] text-text-tertiary">
          {url}
        </span>
      </div>
      <div className="relative aspect-[16/10] w-full bg-surface-sunken">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}
