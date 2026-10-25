"use client";

import { useEffect } from "react";

/** Fired from the CTA's click so listeners (the music player) still count as a user gesture. */
export const BEGIN_EVENT = "wedding:begin";

/**
 * The intro is one-way: the page is held on the cover until the CTA is tapped, the cover then
 * scrolls away, and once it is fully off-screen it is removed (with the scroll offset adjusted)
 * so scrolling back up lands on the hero, never the cover.
 */
export function IntroReveal() {
  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro === "done") return;
    history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, behavior: "instant" });
    root.dataset.intro = "open";
  }, []);

  const explore = () => {
    const root = document.documentElement;
    const intro = document.getElementById("intro");
    if (!intro) return;
    window.dispatchEvent(new Event(BEGIN_EVENT));
    root.dataset.revealed = "";
    root.dataset.intro = "lifting";

    const distance = intro.offsetHeight;
    const finish = () => {
      if (window.scrollY < distance - 2) return;
      window.removeEventListener("scroll", finish);
      window.removeEventListener("scrollend", finish);
      root.dataset.intro = "done";
      window.scrollTo({ top: Math.max(0, window.scrollY - distance), behavior: "instant" });
    };
    window.addEventListener("scroll", finish, { passive: true });
    window.addEventListener("scrollend", finish);

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: distance, behavior: reduce ? "instant" : "smooth" });
    finish();
  };

  return (
    <button
      type="button"
      onClick={explore}
      className="btn rounded-full border border-[#B8924A] bg-burgundy px-8 text-[0.8rem] tracking-[0.22em] text-ivory shadow-[0_12px_30px_-14px_rgba(72,20,31,0.7)] hover:-translate-y-0.5 hover:border-gold-muted hover:bg-maroon"
    >
      EXPLORE OUR WEDDING
    </button>
  );
}
