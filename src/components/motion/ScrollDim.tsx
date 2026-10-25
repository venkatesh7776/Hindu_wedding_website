"use client";

import { useEffect, useRef } from "react";
import { scrollPastIntro } from "@/lib/scroll";

/** Darkens its (sticky) parent as the next section slides over it. */
export function ScrollDim({ max = 0.45 }: { max?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const progress = Math.min(1, Math.max(0, scrollPastIntro() / window.innerHeight));
      el.style.opacity = String(progress * max);
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
  }, [max]);

  return <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 z-20 bg-charcoal opacity-0" />;
}
