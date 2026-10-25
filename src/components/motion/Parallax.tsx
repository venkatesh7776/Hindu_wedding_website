"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { scrollPastIntro } from "@/lib/scroll";

type Props = {
  children: ReactNode;
  /** Movement relative to scroll: 0.15 drifts slower than the page, negative moves against it. */
  speed?: number;
  /** Fade out across this fraction of the viewport height (0 = no fade). */
  fadeOver?: number;
  max?: number;
  className?: string;
};

/** Restrained scroll-linked drift. Does nothing under reduced motion. */
export function Parallax({ children, speed = 0.15, fadeOver = 0, max = 80, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = scrollPastIntro();
      if (y > window.innerHeight * 1.5) return;
      el.style.transform = `translate3d(0, ${Math.max(-max, Math.min(max, y * speed))}px, 0)`;
      if (fadeOver) el.style.opacity = String(Math.max(0, 1 - y / (window.innerHeight * fadeOver)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [speed, fadeOver, max]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
