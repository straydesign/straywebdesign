import MacBookFrame from '@/components/ui/MacBookFrame';
import PhoneFrame from '@/components/ui/PhoneFrame';

/* DeviceDuo — a MacBook with the same site's phone view dropped in over its
   lower corner, so each project shows both screens at a glance. */

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
    <div className="relative pb-12 pr-[10%] md:pb-14">
      <MacBookFrame
        src={shot}
        alt={`${name} — desktop view`}
        priority={priority}
      />
      <div className="absolute bottom-0 right-0 z-20 w-[25%] min-w-[96px] max-w-[150px]">
        <PhoneFrame src={phoneShot} alt={`${name} — phone view`} priority={priority} />
      </div>
    </div>
  );
}
