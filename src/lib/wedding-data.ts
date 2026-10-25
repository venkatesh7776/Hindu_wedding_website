import { wedding } from "@/config/wedding";
import { formatDate, formatTime, zonedToDate, zoneLabel } from "./time";

const tz = wedding.timeZone;

export const coupleNames = `${wedding.bride.name} & ${wedding.groom.name}`;

export const weddingDate = wedding.weddingStart ? zonedToDate(wedding.weddingStart, tz) : undefined;

export const weddingDateLabel = weddingDate
  ? formatDate(weddingDate, tz, { weekday: "long" })
  : "Date to be announced";

/** Ceremonies with real instants and display strings, in the configured order. */
export const ceremonies = wedding.ceremonies.map((c) => {
  const start = zonedToDate(c.start, tz);
  const end = c.end ? zonedToDate(c.end, tz) : undefined;
  return {
    ...c,
    startIso: start.toISOString(),
    // Calendars need an end; default to 3 hours when none is supplied.
    endIso: (end ?? new Date(start.getTime() + 3 * 3600_000)).toISOString(),
    dateLabel: formatDate(start, tz, { weekday: "long" }),
    timeLabel: `${formatTime(start, tz)}${end ? ` – ${formatTime(end, tz)}` : " onwards"} ${zoneLabel(start, tz)}`,
  };
});

export type CeremonyView = (typeof ceremonies)[number];

/** When the celebrations end — the last ceremony's end, used to switch the countdown state. */
export const celebrationsEndIso = ceremonies.length
  ? ceremonies.map((c) => c.endIso).sort().at(-1)
  : weddingDate && new Date(weddingDate.getTime() + 6 * 3600_000).toISOString();

export const mapsDestination = wedding.venue.mapQuery || wedding.venue.address;
