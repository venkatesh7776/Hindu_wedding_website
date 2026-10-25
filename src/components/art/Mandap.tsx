import { useId } from "react";
import { GOLD, GOLD_SOFT, IVORY, GREEN } from "./shapes";

function Pillar({ x, top, bottom, w }: { x: number; top: number; bottom: number; w: number }) {
  const bands = [0.18, 0.5, 0.82].map((f) => top + (bottom - top) * f);
  return (
    <g stroke={GOLD} strokeWidth={1}>
      <rect x={x - w / 2 - 6} y={bottom - 14} width={w + 12} height={14} fill="#4f1622" />
      <rect x={x - w / 2} y={top} width={w} height={bottom - top} fill="#5e1c29" />
      {bands.map((y) => (
        <rect key={y} x={x - w / 2 - 3} y={y - 5} width={w + 6} height={10} fill="#6b2331" />
      ))}
      <path d={`M${x - w / 2 - 10} ${top} H${x + w / 2 + 10} L${x + w / 2} ${top + 12} H${x - w / 2} Z`} fill="#6b2331" />
      {/* jasmine wrap */}
      {Array.from({ length: Math.floor((bottom - top - 30) / 9) }, (_, k) => (
        <circle
          key={k}
          cx={x + Math.sin(k * 0.9) * (w / 2 - 1)}
          cy={top + 18 + k * 9}
          r={2.2}
          fill={IVORY}
          stroke="none"
          opacity={0.9}
        />
      ))}
    </g>
  );
}

function Garland({ x, y, len }: { x: number; y: number; len: number }) {
  return (
    <g>
      {Array.from({ length: Math.floor(len / 8) }, (_, k) => (
        <circle key={k} cx={x} cy={y + k * 8} r={k % 3 === 2 ? 2.4 : 3.6} fill={k % 3 === 2 ? IVORY : "#d49a3a"} opacity={0.95} />
      ))}
      <path d={`M${x} ${y + len} l-4 8 h8 z`} fill={GOLD} />
    </g>
  );
}

function Diya({ x, y, glow }: { x: number; y: number; glow: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx={0} cy={-10} r={16} fill={`url(#${glow})`} />
      <path d="M-11 0 Q0 9 11 0 Q6 -3 0 -3 Q-6 -3 -11 0 Z" fill={GOLD} stroke={GOLD_SOFT} strokeWidth={0.5} />
      <path d="M0 -14 C3 -9 3 -5 0 -3 C-3 -5 -3 -9 0 -14 Z" fill={GOLD_SOFT} />
    </g>
  );
}

/** Wedding mandap at night — gold line art for the closing section. */
export function Mandap({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const glow = `${id}-glow`;
  const fire = `${id}-fire`;
  return (
    <svg viewBox="0 0 800 560" className={className} role="img" aria-label="Illustration of a wedding mandap with a sacred fire">
      <defs>
        <radialGradient id={glow}>
          <stop offset="0" stopColor={GOLD_SOFT} stopOpacity={0.55} />
          <stop offset="1" stopColor={GOLD} stopOpacity={0} />
        </radialGradient>
        <radialGradient id={fire} cx="0.5" cy="0.6" r="0.5">
          <stop offset="0" stopColor={GOLD} stopOpacity={0.45} />
          <stop offset="1" stopColor={GOLD} stopOpacity={0} />
        </radialGradient>
      </defs>

      <ellipse cx={400} cy={330} rx={330} ry={240} fill={`url(#${fire})`} opacity={0.6} />

      {/* platform */}
      <rect x={90} y={500} width={620} height={22} fill="#4f1622" stroke={GOLD} />
      <rect x={60} y={522} width={680} height={20} fill="#43121c" stroke={GOLD} />
      <rect x={30} y={542} width={740} height={18} fill="#3a0f18" stroke={GOLD} />

      <Pillar x={250} top={230} bottom={500} w={14} />
      <Pillar x={550} top={230} bottom={500} w={14} />

      {/* canopy */}
      <path
        d="M120 176 C150 120 240 70 400 52 C560 70 650 120 680 176 Z"
        fill="#5e1c29"
        stroke={GOLD}
        strokeWidth={1.2}
      />
      {[0.25, 0.5, 0.75].map((f) => (
        <path
          key={f}
          d={`M${120 + 560 * f * 0} 176 Q400 ${176 - 110 * f} 680 176`}
          fill="none"
          stroke={GOLD}
          strokeOpacity={0.45}
        />
      ))}
      <path d="M380 54 Q400 26 420 54 Z" fill={GREEN} stroke={GOLD} />
      <g fill={GOLD}>
        <ellipse cx={400} cy={22} rx={7} ry={6} />
        <rect x={399} y={2} width={2} height={14} />
      </g>
      <rect x={110} y={176} width={580} height={16} fill="#6b2331" stroke={GOLD} />

      {/* silk swag */}
      <path d="M140 192 Q400 300 660 192 L660 204 Q400 316 140 204 Z" fill={IVORY} opacity={0.9} stroke={GOLD} strokeWidth={0.8} />
      <path d="M140 204 Q400 316 660 204" fill="none" stroke={GOLD} strokeWidth={2.5} strokeOpacity={0.8} />

      {[200, 290, 400, 510, 600].map((x, k) => (
        <Garland key={x} x={x} y={196} len={k === 2 ? 40 : 70 + (k % 2) * 30} />
      ))}

      <Pillar x={150} top={192} bottom={500} w={20} />
      <Pillar x={650} top={192} bottom={500} w={20} />

      {/* side drapes */}
      {[-1, 1].map((s) => (
        <path
          key={s}
          d={`M${400 + s * 238} 192 C${400 + s * 210} 300 ${400 + s * 225} 420 ${400 + s * 205} 500 L${400 + s * 222} 500 C${400 + s * 238} 420 ${400 + s * 226} 300 ${400 + s * 244} 192 Z`}
          fill={IVORY}
          opacity={0.75}
          stroke={GOLD}
          strokeWidth={0.6}
        />
      ))}

      {/* agni kund */}
      <g>
        <rect x={360} y={474} width={80} height={26} fill="#5e1c29" stroke={GOLD} />
        <rect x={370} y={462} width={60} height={12} fill="#6b2331" stroke={GOLD} />
        <circle cx={400} cy={430} r={60} fill={`url(#${glow})`} />
        <path d="M378 462 C370 446 376 432 384 424 C384 436 390 440 392 436 C390 420 396 404 408 394 C404 410 414 418 416 428 C420 420 424 418 426 414 C430 432 428 450 420 462 Z" fill="#D99A3A" opacity={0.95} />
        <path d="M388 462 C384 452 388 444 394 438 C394 446 398 448 400 446 C400 436 404 428 410 422 C410 434 416 442 414 452 C414 456 412 460 410 462 Z" fill={GOLD_SOFT} />
        <path d="M396 462 C394 456 398 450 402 446 C402 452 406 456 404 462 Z" fill={IVORY} />
      </g>

      {[130, 190, 250, 310, 490, 550, 610, 670].map((x) => (
        <Diya key={x} x={x} y={534} glow={glow} />
      ))}
    </svg>
  );
}
