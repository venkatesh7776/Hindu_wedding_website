"use client";

import { useEffect, useRef, useState } from "react";
import { googleCalendarUrl, toIcs, type CalendarEvent } from "@/lib/calendar";

type Props = { uid: string; title: string; startIso: string; endIso: string; location?: string; description?: string };

export function AddToCalendar({ startIso, endIso, ...rest }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const event: CalendarEvent = { ...rest, start: new Date(startIso), end: new Date(endIso) };

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  const downloadIcs = () => {
    const url = URL.createObjectURL(new Blob([toIcs(event)], { type: "text/calendar;charset=utf-8" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: `${rest.uid}.ics` });
    a.click();
    URL.revokeObjectURL(url);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex min-h-11 items-center gap-2 border-b border-gold/60 text-sm font-medium text-maroon transition-colors duration-300 hover:border-maroon"
      >
        <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.2}>
          <rect x="2" y="3" width="12" height="11" rx="1" />
          <path d="M2 6.5h12M5 1.5v3M11 1.5v3" />
        </svg>
        Add to calendar
      </button>
      {open && (
        <div role="menu" className="fade-in absolute left-0 top-full z-20 mt-2 min-w-48 border border-gold/30 bg-ivory py-1 shadow-[0_12px_30px_-12px_rgba(72,20,31,0.35)]">
          <a
            role="menuitem"
            href={googleCalendarUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="block px-4 py-3 text-sm hover:bg-ivory-deep"
          >
            Google Calendar
          </a>
          <button role="menuitem" type="button" onClick={downloadIcs} className="block w-full px-4 py-3 text-left text-sm hover:bg-ivory-deep">
            Apple / Outlook (.ics)
          </button>
        </div>
      )}
    </div>
  );
}
