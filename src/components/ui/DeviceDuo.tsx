import BrowserFrame from '@/components/ui/BrowserFrame';
import PhoneFrame from '@/components/ui/PhoneFrame';

/* DeviceDuo — a browser-framed desktop shot with the same site's phone view
   overlapping its lower corner, so each project shows both screens at a
   glance. */

export default function DeviceDuo({
  shot,
  phoneShot,
  name,
  displayUrl,
  priority = false,
}: {
  shot: string;
  phoneShot: string;
  name: string;
  displayUrl: string;
  priority?: boolean;
}) {
  return (
    <div className="relative pb-10 pr-[13%] md:pb-12">
      <BrowserFrame
        src={shot}
        alt={`${name} — desktop view`}
        url={displayUrl}
        priority={priority}
      />
      <div className="absolute bottom-0 right-0 w-[24%] min-w-[92px] max-w-[140px]">
        <PhoneFrame src={phoneShot} alt={`${name} — phone view`} priority={priority} />
      </div>
    </div>
  );
}
