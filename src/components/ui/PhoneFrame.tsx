import Image from 'next/image';

/* PhoneFrame — a real-looking iPhone: titanium rail, black bezel, Dynamic
   Island, side buttons, contact shadow. Screenshots are captured at 390×844
   so they fill the display exactly. Companion to MacBookFrame. */

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
    <div className="relative">
      {/* side buttons, outside the rail */}
      <span
        aria-hidden
        className="absolute -left-[2px] top-[18%] h-[5%] w-[2px] rounded-l-sm bg-[#4c4d51]"
      />
      <span
        aria-hidden
        className="absolute -left-[2px] top-[26%] h-[8%] w-[2px] rounded-l-sm bg-[#4c4d51]"
      />
      <span
        aria-hidden
        className="absolute -left-[2px] top-[36%] h-[8%] w-[2px] rounded-l-sm bg-[#4c4d51]"
      />
      <span
        aria-hidden
        className="absolute -right-[2px] top-[24%] h-[12%] w-[2px] rounded-r-sm bg-[#4c4d51]"
      />

      {/* titanium rail */}
      <div
        className="rounded-[2rem] p-[3px] shadow-[0_22px_44px_-16px_rgba(24,24,27,0.5)]"
        style={{
          background:
            'linear-gradient(145deg, #6b6d72 0%, #3a3b3f 30%, #55575c 55%, #2e2f33 80%, #4a4c50 100%)',
        }}
      >
        {/* black bezel */}
        <div className="rounded-[1.82rem] bg-black p-[4px]">
          <div className="relative aspect-[390/844] w-full overflow-hidden rounded-[1.55rem] bg-surface-sunken">
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 14vw, 32vw"
              className="object-cover object-top"
            />
            {/* Dynamic Island */}
            <span
              aria-hidden
              className="absolute left-1/2 top-[7px] h-[4.2%] w-[36%] -translate-x-1/2 rounded-full bg-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
