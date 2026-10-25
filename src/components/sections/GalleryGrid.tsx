"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryImage } from "@/config/wedding";
import { Reveal } from "../motion/Reveal";

const span: Record<NonNullable<GalleryImage["shape"]>, string> = {
  tall: "row-span-2",
  wide: "col-span-2",
  square: "",
};

function Placeholder({ large = false }: { large?: boolean }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-ivory-deep text-gold/70">
      <svg aria-hidden viewBox="0 0 24 24" className={large ? "h-10 w-10" : "h-6 w-6"} fill="none" stroke="currentColor" strokeWidth={1}>
        <rect x="3" y="5" width="18" height="14" rx="1" />
        <circle cx="9" cy="10" r="1.6" />
        <path d="M3 17l5-5 4 4 3-3 6 6" />
      </svg>
      <span className="t-label text-[9px] text-ink-muted">Photo to follow</span>
    </div>
  );
}

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);

  const go = useCallback((dir: 1 | -1) => setActive((i) => (i === null ? i : (i + dir + images.length) % images.length)), [images.length]);
  const close = useCallback(() => {
    setActive(null);
    returnFocus.current?.focus();
  }, []);

  useEffect(() => {
    if (active === null) return;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Tab") {
        // keep focus inside the dialog
        const focusables = document.querySelectorAll<HTMLElement>("[data-lightbox] button");
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, close, go]);

  const current = active === null ? null : images[active];

  return (
    <>
      <ul className="mt-16 grid auto-rows-[9rem] grid-cols-2 gap-3 [grid-auto-flow:dense] sm:auto-rows-[12rem] md:grid-cols-4 md:gap-4">
        {images.map((img, i) => (
          <li key={i} className={span[img.shape ?? "square"]}>
            <Reveal variant="image" delay={(i % 4) * 60} className="h-full w-full">
              <button
                type="button"
                onClick={(e) => {
                  returnFocus.current = e.currentTarget;
                  setActive(i);
                }}
                aria-label={`Open photo ${i + 1} of ${images.length}: ${img.alt}`}
                className="group relative block h-full w-full overflow-hidden rounded-sm"
              >
                {img.src ? (
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-silk)] group-hover:scale-[1.03]"
                  />
                ) : (
                  <Placeholder />
                )}
              </button>
            </Reveal>
          </li>
        ))}
      </ul>

      {current && active !== null && (
        <div
          data-lightbox
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${active + 1} of ${images.length}`}
          className="fade-in fixed inset-0 z-[60] flex items-center justify-center bg-burgundy/95 p-4 backdrop-blur-sm sm:p-10"
          onClick={(e) => e.target === e.currentTarget && close()}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <figure key={active} className="fade-in relative h-[min(80svh,52rem)] w-full max-w-5xl">
            {current.src ? (
              <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
            ) : (
              <div className="mx-auto aspect-[4/5] h-full max-w-full">
                <Placeholder large />
              </div>
            )}
            <figcaption className="sr-only">{current.alt}</figcaption>
          </figure>

          <p className="t-label absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gold-muted">
            {active + 1} / {images.length}
          </p>
          <button ref={closeRef} type="button" onClick={close} aria-label="Close gallery" className="absolute right-3 top-3 flex h-12 w-12 items-center justify-center text-ivory hover:text-gold">
            <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.3}>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          {images.length > 1 && (
            <>
              <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className="absolute left-1 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-ivory hover:text-gold sm:left-4">
                <svg aria-hidden viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.2}>
                  <path d="M15 5l-7 7 7 7" />
                </svg>
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next photo" className="absolute right-1 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-ivory hover:text-gold sm:right-4">
                <svg aria-hidden viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.2}>
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
