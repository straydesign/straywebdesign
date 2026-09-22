import MacBookFrame from '@/components/ui/MacBookFrame';
import PhoneFrame from '@/components/ui/PhoneFrame';

/* DeviceDuo — a laptop with the phone build overlapping its lower-left corner.
   Both captures are real. A responsive site shown on one screen is a claim;
   shown on two it is the evidence.

   The phone is a photoreal render now, and it carries 60px of margin around
   the handset plus a taller screen, so its outer proportion went from roughly
   2.31:1 to 1.96:1 — at the old 22% width it stood 15% shorter and stopped
   overlapping the laptop. 26% restores the height it had, which is what the
   overlap was composed around.

   `z-20` because MacBookFrame paints its lid and deck at `z-10`: without it
   the laptop covers the half of the phone it is supposed to sit behind.

   `phoneSide` exists because the overlap costs whatever the laptop is showing
   underneath it. On a Work row that is hero photography and the phone reads as
   composition; on the menu panel it landed on the word "Our Menu", so the one
   picture arguing that every dish has its own page had its own page heading
   bitten in half. Left stays the default — move it only when the capture puts
   something that has to be read under the phone. */

export default function DeviceDuo({
  shot,
  phoneShot,
  alt,
  phoneAlt,
  priority = false,
  phoneSide = 'left',
}: {
  shot: string;
  phoneShot: string;
  alt: string;
  phoneAlt: string;
  priority?: boolean;
  phoneSide?: 'left' | 'right';
}) {
  const left = phoneSide === 'left';
  return (
    <div className={`relative w-full pb-[9%] ${left ? 'pl-[12%]' : 'pr-[12%]'}`}>
      <MacBookFrame src={shot} alt={alt} priority={priority} />
      <PhoneFrame
        src={phoneShot}
        alt={phoneAlt}
        priority={priority}
        className={`absolute bottom-0 z-20 w-[26%] ${left ? 'left-0' : 'right-0'}`}
        sizes="(min-width: 1024px) 14vw, 32vw"
      />
    </div>
  );
}
