import MacBookFrame from '@/components/ui/MacBookFrame';
import PhoneFrame from '@/components/ui/PhoneFrame';

/* DeviceDuo — a laptop with the phone build overlapping its lower-LEFT corner,
   so each project shows both screens at a glance.

   Left, and outside the lid, since 2026-09-17. It used to sit bottom-right at
   `pr-[10%]`, which landed the handset ON the laptop screen and covered the
   part of the page the shot exists to show. The padding opens the gutter the
   phone hangs in; `bottom-0 left-0` puts it there. Mirrors straydesign.co.

   `z-20` because MacBookFrame paints its lid and deck at `z-10`: without it
   the laptop covers the half of the phone it is supposed to sit behind. */

export default function DeviceDuo({
  shot,
  phoneShot,
  name,
  priority = false,
}: {
  shot: string;
  phoneShot: string;
  name: string;
  priority?: boolean;
}) {
  return (
    <div className="relative w-full pb-[9%] pl-[12%]">
      <MacBookFrame
        src={shot}
        alt={`${name} — desktop view`}
        priority={priority}
      />
      <div className="absolute bottom-0 left-0 z-20 w-[22%] min-w-[92px] max-w-[150px]">
        <PhoneFrame src={phoneShot} alt={`${name} — phone view`} priority={priority} />
      </div>
    </div>
  );
}
