import Image from 'next/image';

/* PhoneFrame — wraps a mobile screenshot in a minimal phone shell (rounded
   bezel + island bar) so the mobile view reads as a device, not a cropped
   image. Companion to BrowserFrame; screenshots are captured at 390×844. */

export default function PhoneFrame({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-border-strong bg-surface-card p-1.5 shadow-[0_24px_60px_-24px_rgba(24,24,27,0.35)]">
      <div className="relative aspect-[390/844] w-full overflow-hidden rounded-[1.05rem] bg-surface-sunken">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 12vw, 30vw"
          className="object-cover object-top"
        />
        <span
          aria-hidden
          className="absolute left-1/2 top-1.5 h-[5px] w-1/3 -translate-x-1/2 rounded-full bg-black/70"
        />
      </div>
    </div>
  );
}
