import { generated } from "@/lib/assets";
import { wedding } from "@/config/wedding";
import { formatDate, zonedToDate } from "@/lib/time";
import { Reveal } from "../motion/Reveal";
import { RsvpForm } from "./RsvpForm";

export function Rsvp() {
  const { rsvp, timeZone } = wedding;
  if (!rsvp.enabled) return null;
  const kalash = generated("ornament-kalash");
  const deadline = rsvp.deadline ? formatDate(zonedToDate(rsvp.deadline, timeZone), timeZone) : undefined;

  return (
    <section id="rsvp" className="section bg-blush">
      <div className="container-wide max-w-2xl">
        <Reveal className="text-center">
          {kalash && (
            // eslint-disable-next-line @next/next/no-img-element -- small decorative ornament
            <img src={kalash} alt="" className="mx-auto mb-6 h-24 w-24 object-contain drop-shadow-[0_6px_10px_rgba(72,20,31,0.15)]" loading="lazy" />
          )}
          <p className="t-label text-gold">RSVP</p>
          <h2 className="t-h2 mt-4">Will You Join Us?</h2>
          <p className="t-lead mt-4 text-ink-muted">Your presence will make our celebration even more special.</p>
          {deadline && <p className="mt-3 text-sm text-ink-muted">Kindly reply by {deadline}.</p>}
        </Reveal>
        <Reveal delay={150} className="mt-12 rounded-sm border border-gold/30 bg-ivory/60 p-6 sm:p-10">
          <RsvpForm collectGuestCount={rsvp.collectGuestCount} maxGuests={rsvp.maxGuests} />
        </Reveal>
      </div>
    </section>
  );
}
