"use client";

import { useRef, useState } from "react";

const COLORS = ["#F3E3B5", "#E9C46A", "#FAF5EC", "#E8D4CF", "#D99A3A"];

type Particle = { x: number; y: number; vx: number; vy: number; r: number; rot: number; vr: number; color: string; petal: boolean };

/** Guest-triggered shower of akshata rice and petals — the page's one playful moment. */
export function Akshantalu() {
  const [blessed, setBlessed] = useState(false);
  const running = useRef(false);

  function shower() {
    setBlessed(true);
    if (running.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    running.current = true;

    const canvas = document.createElement("canvas");
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const w = innerWidth;
    const h = innerHeight;
    Object.assign(canvas.style, { position: "fixed", inset: "0", width: "100%", height: "100%", pointerEvents: "none", zIndex: "70" });
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);

    const count = w < 640 ? 45 : 80;
    const particles: Particle[] = Array.from({ length: count }, () => {
      const petal = Math.random() < 0.35;
      return {
        x: Math.random() * w,
        y: -20 - Math.random() * h * 0.5,
        vx: (Math.random() - 0.5) * 0.6,
        vy: 1.4 + Math.random() * 2.2,
        r: petal ? 4 + Math.random() * 3 : 1.6 + Math.random() * 1.2,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.08,
        color: petal ? COLORS[3 + Math.floor(Math.random() * 2)] : COLORS[Math.floor(Math.random() * 3)],
        petal,
      };
    });

    const start = performance.now();
    const frame = (t: number) => {
      const elapsed = t - start;
      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = Math.min(1, Math.max(0, (3200 - elapsed) / 600));
      for (const p of particles) {
        p.vy += 0.025;
        p.x += p.vx + Math.sin((elapsed + p.rot * 400) / 500) * (p.petal ? 0.6 : 0.2);
        p.y += p.vy;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r, p.petal ? p.r * 0.55 : p.r * 0.45, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      if (elapsed < 3200) requestAnimationFrame(frame);
      else {
        canvas.remove();
        running.current = false;
      }
    };
    requestAnimationFrame(frame);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <button type="button" onClick={shower} className="btn btn--gold">
        Shower akshantalu
        <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor">
          <path d="M8 0l1.6 6.4L16 8l-6.4 1.6L8 16l-1.6-6.4L0 8l6.4-1.6z" />
        </svg>
      </button>
      <p aria-live="polite" className="min-h-6 text-sm text-ivory/70">
        {blessed ? "Your blessings have reached the couple." : "Tap to bless the couple with sacred rice."}
      </p>
    </div>
  );
}
