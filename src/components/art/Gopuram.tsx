import { useId } from "react";
import { archPath, leafPath, GOLD, GOLD_SOFT, GREEN } from "./shapes";

const CX = 300;
const TIER_COUNT = 8;

const tiers = Array.from({ length: TIER_COUNT }, (_, i) => {
  const h = 58 - i * 3;
  const yb = 700 - Array.from({ length: i }, (_, j) => 58 - j * 3).reduce((a, b) => a + b, 0);
  // Concave taper: lower tiers step in gently, upper tiers faster.
  const wb = 420 - i * 26 - i * i * 1.6;
  const wt = wb - 22 - i * 2;
  return { i, h, yb, yt: yb - h, wb, wt };
});

const TOP = tiers[TIER_COUNT - 1].yt;

function Tier({ h, yb, yt, wb, wt, i, stone }: (typeof tiers)[number] & { stone: string }) {
  const niches = Math.max(3, Math.floor(wt / 40)) | 1;
  const nicheW = 16;
  const nicheH = h * 0.5;
  const span = wt - 44;
  return (
    <g>
      <path
        d={`M${CX - wb / 2} ${yb} L${CX - wt / 2} ${yt} H${CX + wt / 2} L${CX + wb / 2} ${yb} Z`}
        fill={`url(#${stone})`}
        stroke={GOLD}
        strokeWidth={1.2}
      />
      {/* cornice */}
      <rect x={CX - wt / 2 - 7} y={yt} width={wt + 14} height={7} fill="#5a1a27" stroke={GOLD} strokeWidth={1} />
      <line x1={CX - wb / 2 + 4} x2={CX + wb / 2 - 4} y1={yb - 5} y2={yb - 5} stroke={GOLD} strokeOpacity={0.5} strokeWidth={0.8} />
      {/* beading under the cornice */}
      <line x1={CX - wt / 2 + 2} x2={CX + wt / 2 - 2} y1={yt + 10} y2={yt + 10} stroke={GOLD_SOFT} strokeOpacity={0.7} strokeWidth={1.6} strokeDasharray="0.1 4" strokeLinecap="round" />
      {/* pilasters between niches */}
      {Array.from({ length: niches + 1 }, (_, n) => {
        const x = CX - span / 2 + (span / (niches - 1)) * (n - 0.5);
        return <line key={`p${n}`} x1={x} x2={x} y1={yt + 14} y2={yb - 7} stroke={GOLD} strokeOpacity={0.35} strokeWidth={0.7} />;
      })}
      {Array.from({ length: niches }, (_, n) => {
        const x = CX - span / 2 + (span / (niches - 1)) * n - nicheW / 2;
        const centre = n === (niches - 1) / 2;
        const w = centre ? nicheW + 6 : nicheW;
        return (
          <path
            key={n}
            d={archPath(centre ? x - 3 : x, yt + 12 + (centre ? -2 : 0), w, nicheH + (centre ? 2 : 0))}
            fill={centre ? "#2c0b12" : "#3a0f18"}
            stroke={GOLD}
            strokeWidth={0.9}
            strokeOpacity={centre ? 1 : 0.75}
          />
        );
      })}
      {/* corner shrines with temple-green domes */}
      {[-1, 1].map((s) => {
        const x = CX + s * (wt / 2 - 4);
        return (
          <g key={s}>
            <rect x={x - 9} y={yt - 12} width={18} height={12} fill="#5a1a27" stroke={GOLD} strokeWidth={0.9} />
            <path d={`M${x - 10} ${yt - 12} Q${x} ${yt - 30} ${x + 10} ${yt - 12} Z`} fill={GREEN} stroke={GOLD} strokeWidth={0.9} />
            <line x1={x} x2={x} y1={yt - 26} y2={yt - 33} stroke={GOLD} strokeWidth={1.2} />
          </g>
        );
      })}
      {i % 2 === 0 && (
        <path
          d={`M${CX - 9} ${yt} Q${CX} ${yt - 16} ${CX + 9} ${yt} Z`}
          fill={GREEN}
          stroke={GOLD}
          strokeWidth={0.9}
        />
      )}
    </g>
  );
}

function Kalasham({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} fill={GOLD} stroke={GOLD_SOFT} strokeWidth={0.5}>
      <ellipse cx={0} cy={-5} rx={6} ry={5} />
      <ellipse cx={0} cy={-13} rx={3.6} ry={3.4} />
      <rect x={-0.8} y={-28} width={1.6} height={13} />
      <circle cx={0} cy={-29} r={1.8} />
    </g>
  );
}

function Banana({ x, flip = false }: { x: number; flip?: boolean }) {
  const s = flip ? -1 : 1;
  const leaves: [number, number, number][] = [
    [-80, 120, 22],
    [-55, 135, 24],
    [-25, 120, 22],
    [-110, 95, 18],
    [-150, 80, 16],
  ];
  return (
    <g transform={`translate(${x} 820) scale(${s} 1)`}>
      <path d="M-4 0 C-6 -60 -2 -110 0 -150 C2 -110 6 -60 4 0 Z" fill="#2b3b2f" stroke={GOLD} strokeWidth={0.8} />
      {leaves.map(([angle, len, w], k) => (
        <g key={k} transform={`translate(0 ${-140 + k * 6}) rotate(${angle})`}>
          <path d={leafPath(len, w)} fill={GREEN} fillOpacity={0.92} stroke={GOLD} strokeWidth={0.8} />
          <line x1={0} y1={0} x2={len * 0.96} y2={0} stroke={GOLD} strokeOpacity={0.55} strokeWidth={0.6} />
        </g>
      ))}
    </g>
  );
}

function Cloud({ x, y, s = 1, flip = false }: { x: number; y: number; s?: number; flip?: boolean }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}
      d="M0 20 C10 4 30 4 36 14 C42 -2 70 -4 78 12 C88 2 108 6 108 20 Z M18 20 C22 12 30 12 34 18 M58 20 C62 8 76 8 80 18"
      fill="none"
      stroke={GOLD}
      strokeOpacity={0.45}
      strokeWidth={1}
      vectorEffect="non-scaling-stroke"
    />
  );
}

/** Painted-style South Indian gopuram in gold line art, sized to its container. */
export function Gopuram({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const stone = `${id}-stone`;
  return (
    <svg viewBox="0 0 600 820" className={className} role="img" aria-label="Illustration of a temple gopuram">
      <defs>
        <linearGradient id={stone} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6e2432" />
          <stop offset="1" stopColor="#561a26" />
        </linearGradient>
        <radialGradient id={`${id}-halo`} cx="0.5" cy="0.45" r="0.5">
          <stop offset="0" stopColor={GOLD} stopOpacity={0.28} />
          <stop offset="1" stopColor={GOLD} stopOpacity={0} />
        </radialGradient>
      </defs>

      <ellipse cx={CX} cy={TOP + 60} rx={260} ry={300} fill={`url(#${id}-halo)`} />
      <Cloud x={40} y={330} s={1.1} />
      <Cloud x={560} y={400} s={0.9} flip />

      {/* gate */}
      <rect x={80} y={700} width={440} height={120} fill={`url(#${stone})`} stroke={GOLD} strokeWidth={1.2} />
      {[110, 160, 210, 390, 440, 490].map((x) => (
        <g key={x} stroke={GOLD} strokeOpacity={0.6} strokeWidth={0.8}>
          <line x1={x - 3} x2={x - 3} y1={712} y2={808} />
          <line x1={x + 3} x2={x + 3} y1={712} y2={808} />
        </g>
      ))}
      <line x1={80} x2={520} y1={712} y2={712} stroke={GOLD} strokeOpacity={0.7} strokeWidth={0.8} />
      <path d={archPath(256, 728, 88, 92)} fill="#240910" stroke={GOLD} strokeWidth={1.4} />
      <path d={archPath(266, 740, 68, 80)} fill="none" stroke={GOLD} strokeOpacity={0.5} strokeWidth={0.8} />
      {/* lamp glimpsed through the doorway */}
      <g transform="translate(300 818)">
        <line x1={0} x2={0} y1={0} y2={-40} stroke={GOLD} strokeWidth={1.4} />
        <path d="M-10 -40 Q0 -34 10 -40 Z" fill={GOLD} />
        <path d="M0 -52 C4 -46 3 -42 0 -41 C-3 -42 -4 -46 0 -52 Z" fill={GOLD_SOFT} />
        <circle cx={0} cy={-46} r={12} fill={GOLD} opacity={0.18} />
      </g>

      {tiers.map((t) => (
        <Tier key={t.i} {...t} stone={stone} />
      ))}

      {/* crowning shala vault */}
      <path
        d={`M${CX - 78} ${TOP} V${TOP - 20} C${CX - 78} ${TOP - 62} ${CX + 78} ${TOP - 62} ${CX + 78} ${TOP - 20} V${TOP} Z`}
        fill={`url(#${stone})`}
        stroke={GOLD}
        strokeWidth={1.2}
      />
      {[-1, 1].map((s) => (
        <circle key={s} cx={CX + s * 78} cy={TOP - 20} r={13} fill={GREEN} stroke={GOLD} strokeWidth={1} />
      ))}
      <path d={archPath(CX - 14, TOP - 42, 28, 38)} fill="#2c0b12" stroke={GOLD} strokeWidth={1} />
      {[-52, -26, 0, 26, 52].map((dx) => (
        <Kalasham key={dx} x={CX + dx} y={TOP - 50 + Math.abs(dx) * 0.12} scale={dx === 0 ? 1.35 : 1} />
      ))}

      <Banana x={70} />
      <Banana x={530} flip />
    </svg>
  );
}
