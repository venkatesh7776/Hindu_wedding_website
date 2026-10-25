import Image from "next/image";
import { wedding } from "@/config/wedding";
import { asset, generated } from "@/lib/assets";
import { mapsDestination, weddingDate, weddingDateLabel } from "@/lib/wedding-data";
import { formatTime, zoneLabel } from "@/lib/time";
import { ArchEdge, KolamTexture, LotusDivider } from "../art/Ornaments";
import { Reveal } from "../motion/Reveal";

export function Venue() {
  const { venue, timeZone } = wedding;
  const photo = asset(venue.photo);
  // The painted courtyard is illustrative only — never presented as the actual venue.
  const illustration = photo ? undefined : generated("venue-placeholder");
  const directions = mapsDestination
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapsDestination)}`
    : undefined;

  return (
    <section id="venue" className="section section--dark overflow-x-clip">
      <ArchEdge color="var(--burgundy)" flip />
      <KolamTexture className="opacity-[0.05]" id="kolam-venue" />
      <div className="container-wide relative grid items-center gap-12 md:grid-cols-[1.1fr_1fr] md:gap-16">
        <Reveal variant="image" className="relative aspect-[3/2] w-full overflow-hidden rounded-sm bg-[#3a0f18] ring-1 ring-gold/30">
          {photo || illustration ? (
            <Image
              src={(photo ?? illustration)!}
              alt={photo ? `${venue.name}` : "Illustration of a heritage wedding courtyard"}
              fill
              sizes="(min-width: 768px) 36rem, 92vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-6 text-center">
              <LotusDivider />
              <p className="t-label text-[10px] text-gold-muted">Venue photograph to follow</p>
            </div>
          )}
          {!photo && illustration && (
            <span className="t-label absolute bottom-3 left-3 bg-burgundy/70 px-2 py-1 text-[9px] text-gold-muted">Illustration</span>
          )}
        </Reveal>

        <div className="text-center md:text-left">
          <Reveal>
            <p className="t-label text-gold">The venue</p>
            <h2 className="t-h2 mt-4">{venue.name}</h2>
          </Reveal>
          <Reveal delay={100}>
            <address className="mt-6 not-italic leading-relaxed text-ivory/80">
              {venue.address || "The full address will be shared soon."}
            </address>
            {weddingDate && (
              <p className="mt-4 text-sm text-gold-muted">
                {weddingDateLabel} · {formatTime(weddingDate, timeZone)} {zoneLabel(weddingDate, timeZone)}
              </p>
            )}
          </Reveal>
          {directions && (
            <Reveal delay={200} className="mt-8">
              <a href={directions} target="_blank" rel="noopener noreferrer" className="btn btn--gold group">
                Get Directions
                <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={1.4}>
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
            </Reveal>
          )}
          {venue.notes.length > 0 && (
            <Reveal delay={260}>
              <ul className="mt-8 space-y-2 border-t border-gold/20 pt-6 text-sm text-ivory/75">
                {venue.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>

      </div>
      <ArchEdge color="var(--burgundy)" />
    </section>
  );
}
