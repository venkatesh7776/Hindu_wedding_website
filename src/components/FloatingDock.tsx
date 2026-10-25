"use client";

import { useEffect, useRef, useState } from "react";
import { BEGIN_EVENT } from "./sections/IntroReveal";

type Props = { musicSrc: string; musicTitle: string };

/**
 * Music control (mute/unmute). Music starts when the guest taps "Explore Our Wedding"
 * (a real gesture, so browsers allow it); the dock shows from then on, or once the hero is scrolled past.
 */
export function FloatingDock({ musicSrc, musicTitle }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [begun, setBegun] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [note, setNote] = useState("");
  const audio = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onBegin = () => {
      setBegun(true);
      // play() must be called synchronously inside the click that dispatched the event
      void startMusic();
    };
    window.addEventListener(BEGIN_EVENT, onBegin);
    return () => window.removeEventListener(BEGIN_EVENT, onBegin);
  });

  const visible = begun || scrolled;

  async function startMusic() {
    const el = audio.current;
    if (!el) return;
    try {
      el.volume = 0.45;
      await el.play();
      setPlaying(true);
      setNote("");
    } catch {
      setPlaying(false);
    }
  }

  async function toggleMusic() {
    const el = audio.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
      return;
    }
    await startMusic();
    if (el.paused) setNote("Music couldn't start on this browser.");
  }

  const btn =
    "flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-burgundy/90 text-gold-muted shadow-[0_8px_24px_-8px_rgba(48,39,35,0.5)] backdrop-blur transition-colors duration-300 hover:bg-maroon hover:text-ivory";

  return (
    <div
      className={`fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 transition-all duration-500 sm:bottom-6 sm:right-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      {note && (
        <p role="status" className="rounded-sm bg-burgundy/90 px-3 py-2 text-xs text-ivory">
          {note}
        </p>
      )}
      {musicSrc && (
        <>
          <audio ref={audio} src={musicSrc} loop preload="metadata" onEnded={() => setPlaying(false)} />
          <button type="button" onClick={toggleMusic} aria-pressed={playing} aria-label={playing ? `Mute ${musicTitle || "music"}` : `Unmute ${musicTitle || "music"}`} className={btn} tabIndex={visible ? 0 : -1}>
            {/* speaker with sound waves while playing, crossed out when muted */}
            <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" fill="currentColor" fillOpacity={0.15} />
              {playing ? (
                <>
                  <path d="M15.5 9.2a4 4 0 0 1 0 5.6" className="animate-pulse" />
                  <path d="M18 6.8a7.5 7.5 0 0 1 0 10.4" className="animate-pulse [animation-delay:300ms]" />
                </>
              ) : (
                <path d="M15.5 9.5l5 5M20.5 9.5l-5 5" />
              )}
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
