"use client";

import { useEffect } from "react";

const RICE = ["#F2C94C", "#E9B83A", "#F6D77A", "#E7A92C"]; // turmeric-dyed akshantalu
const KUMKUM = "#B3122E";
const PETALS = ["#C1272D", "#D9363E", "#F29F27", "#F7B733", "#FFF8EC", "#E86A8A"]; // rose, marigold, jasmine

type Bit = {
  x: number; y: number; vx: number; vy: number;
  rot: number; vr: number; size: number; color: string;
  kind: "rice" | "petal"; born: number; life: number; sway: number;
};

const MAX_BITS = 420;

/** Every tap anywhere on the page throws a small burst of petals and akshantalu from that spot. */
export function TapBlessings() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = document.createElement("canvas");
    Object.assign(canvas.style, { position: "fixed", inset: "0", width: "100%", height: "100%", pointerEvents: "none", zIndex: "80" });
    canvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d")!;

    let w = 0, h = 0;
    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = innerWidth;
      h = innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let bits: Bit[] = [];
    let frame = 0;

    const draw = (b: Bit, alpha: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(b.x, b.y);
      ctx.rotate(b.rot);
      ctx.fillStyle = b.color;
      ctx.beginPath();
      if (b.kind === "rice") {
        ctx.ellipse(0, 0, b.size, b.size * 0.42, 0, 0, Math.PI * 2);
      } else {
        // teardrop petal with a faint centre vein
        const s = b.size;
        ctx.moveTo(0, -s);
        ctx.bezierCurveTo(s * 0.75, -s * 0.55, s * 0.6, s * 0.55, 0, s);
        ctx.bezierCurveTo(-s * 0.6, s * 0.55, -s * 0.75, -s * 0.55, 0, -s);
      }
      ctx.fill();
      if (b.kind === "petal") {
        ctx.globalAlpha = alpha * 0.25;
        ctx.strokeStyle = "#5A1020";
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(0, -b.size * 0.7);
        ctx.lineTo(0, b.size * 0.7);
        ctx.stroke();
      }
      ctx.restore();
    };

    const tick = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      bits = bits.filter((b) => t - b.born < b.life && b.y < h + 30);
      for (const b of bits) {
        const age = t - b.born;
        b.vy += b.kind === "rice" ? 0.22 : 0.07;
        b.vx *= b.kind === "rice" ? 0.985 : 0.97;
        b.vy = Math.min(b.vy, b.kind === "rice" ? 9 : 2.2);
        b.x += b.vx + (b.kind === "petal" ? Math.sin(age / 220 + b.sway) * 0.7 : 0);
        b.y += b.vy;
        b.rot += b.vr;
        draw(b, Math.min(1, (b.life - age) / 350));
      }
      frame = bits.length ? requestAnimationFrame(tick) : 0;
    };

    const burst = (x: number, y: number) => {
      const now = performance.now();
      const small = w < 640;
      const rice = small ? 16 : 22;
      const petals = small ? 11 : 14;
      for (let i = 0; i < rice + petals; i++) {
        const isPetal = i >= rice;
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.5;
        const speed = (isPetal ? 2.2 : 3.2) + Math.random() * (isPetal ? 2.6 : 4);
        bits.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          rot: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * (isPetal ? 0.12 : 0.3),
          size: isPetal ? 7 + Math.random() * 5 : 2.8 + Math.random() * 1.4,
          color: isPetal
            ? PETALS[Math.floor(Math.random() * PETALS.length)]
            : Math.random() < 0.12 ? KUMKUM : RICE[Math.floor(Math.random() * RICE.length)],
          kind: isPetal ? "petal" : "rice",
          born: now,
          life: isPetal ? 1700 + Math.random() * 700 : 1100 + Math.random() * 500,
          sway: Math.random() * Math.PI * 2,
        });
      }
      if (bits.length > MAX_BITS) bits = bits.slice(-MAX_BITS);
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onPointer = (e: PointerEvent) => {
      if (!e.isPrimary || e.button > 0) return;
      burst(e.clientX, e.clientY);
    };

    window.addEventListener("pointerdown", onPointer, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
      canvas.remove();
    };
  }, []);

  return null;
}
