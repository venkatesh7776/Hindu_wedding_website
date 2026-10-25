import Image from "next/image";
import { wedding } from "@/config/wedding";
import { asset, generated } from "@/lib/assets";
import { ceremonies, coupleNames, type CeremonyView } from "@/lib/wedding-data";
import { CeremonyMotif } from "../art/Motifs";
import { LotusDivider } from "../art/Ornaments";
import { Reveal } from "../motion/Reveal";
import { AddToCalendar } from "./AddToCalendar";

function CeremonyCard({ c, index }: { c: CeremonyView; index: number }) {
  const image = asset(c.photo) ?? generated(`ceremony-${c.motif}`);
  const reversed = index % 2 === 1;
  const location = [c.venueName, c.venueAddress].filter(Boolean).join(", ");

  return (
    <article className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
      <Reveal
        variant="image"
        className={`arch relative mx-auto aspect-[4/5] w-full max-w-[22rem] bg-ivory-deep ${reversed ? "md:order-2" : ""}`}
      >
        {image ? (
          <Image src={image} alt={`${c.name} ceremony`} fill sizes="(min-width: 768px) 22rem, 85vw" className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-end justify-center border border-gold/30 pb-[14%]">
            <span aria-hidden className="arch pointer-events-none absolute inset-3 border border-gold/35" />
            <CeremonyMotif motif={c.motif} className="w-[92%]" />
          </div>
        )}
      </Reveal>

      <div className={`text-center md:text-left ${reversed ? "md:order-1 md:text-right" : ""}`}>
        <Reveal>
          <p className="t-label text-gold">{c.dateLabel}</p>
        </Reveal>
        <Reveal delay={80}>
          <h3 className="mt-3 font-display text-[clamp(2.25rem,1.8rem+2vw,3.25rem)] leading-none text-maroon">{c.name}</h3>
          {c.subtitle && <p className="t-lead mt-2 text-ink-muted">{c.subtitle}</p>}
        </Reveal>
        <Reveal delay={160}>
          <dl className="mt-6 space-y-1 text-[0.95rem]">
            <div>
              <dt className="sr-only">Time</dt>
              <dd className="font-medium text-ink">{c.timeLabel}</dd>
            </div>
            <div>
              <dt className="sr-only">Venue</dt>
              <dd className="text-ink-muted">{location}</dd>
            </div>
            {c.dressCode && (
              <div className="pt-2">
                <dt className="t-label inline text-[10px] text-gold">Dress code · </dt>
                <dd className="inline text-sm text-ink-muted">{c.dressCode}</dd>
              </div>
            )}
          </dl>
          {c.description && <p className={`mx-auto mt-5 max-w-[38ch] text-ink-muted md:mx-0 ${reversed ? "md:ml-auto" : ""}`}>{c.description}</p>}
          <div className="mt-6">
            <AddToCalendar
              uid={`${c.id}-${c.startIso}`}
              title={`${c.name} · ${coupleNames}`}
              startIso={c.startIso}
              endIso={c.endIso}
              location={location}
              description={c.description}
            />
          </div>
        </Reveal>
      </div>
    </article>
  );
}

export function Ceremonies() {
  if (!wedding.ceremonies.length) return null;
  return (
    <section id="ceremonies" className="section">
      <div className="container-wide">
        <Reveal className="text-center">
          <p className="t-label text-gold">Join us for</p>
          <h2 className="t-h2 mt-4">The Celebrations</h2>
          <LotusDivider className="mt-6" />
        </Reveal>
        <div className="mt-16 space-y-24 md:mt-24 md:space-y-32">
          {ceremonies.map((c, i) => (
            <CeremonyCard key={c.id} c={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
