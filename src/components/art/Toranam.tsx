import { useId } from "react";
import { leafPath, GOLD, GOLD_SOFT, GREEN, IVORY, ROSE } from "./shapes";

const UNIT = 120;

/** One repeat of the toranam: mango leaves, a jasmine string and a lotus bud. */
function Unit() {
  return (
    <g>
      {[-38, -14, 14, 38].map((dx, k) => (
        <g key={dx} transform={`translate(${60 + dx} 14) rotate(${84 + (k - 1.5) * 6})`}>
          <path d={leafPath(54 - Math.abs(dx) * 0.35, 9)} fill={GREEN} stroke={GOLD} strokeWidth={0.7} />
          <line x1={2} y1={0} x2={46 - Math.abs(dx) * 0.35} y2={0} stroke={GOLD} strokeOpacity={0.5} strokeWidth={0.5} />
        </g>
      ))}
      {/* jasmine string with lotus bud */}
      {Array.from({ length: 9 }, (_, k) => (
        <circle key={k} cx={0} cy={18 + k * 7} r={2.6} fill={IVORY} stroke={GOLD_SOFT} strokeWidth={0.4} />
      ))}
      <path d="M0 80 C-8 88 -7 100 0 106 C7 100 8 88 0 80 Z" fill={ROSE} stroke={GOLD} strokeWidth={0.8} />
      <path d="M0 84 C-3 92 -3 98 0 104" fill="none" stroke="#b77d84" strokeWidth={0.6} />
      <line x1={0} x2={0} y1={106} y2={114} stroke={GOLD} strokeWidth={0.8} />
      <circle cx={0} cy={116} r={1.6} fill={GOLD} />
    </g>
  );
}

/** Hanging toranam garland — repeats horizontally to any width. */
export function Toranam({ className }: { className?: string }) {
  const id = `toranam-${useId().replace(/:/g, "")}`;
  return (
    <svg className={className} aria-hidden preserveAspectRatio="xMidYMin slice" viewBox="0 0 1440 130">
      <defs>
        <pattern id={id} width={UNIT} height={130} patternUnits="userSpaceOnUse" x={-UNIT / 2}>
          <Unit />
          <g transform={`translate(${UNIT} 0)`}>
            <Unit />
          </g>
        </pattern>
      </defs>
      <rect width="1440" height="130" fill={`url(#${id})`} />
      <path d="M0 12 H1440" stroke={GOLD} strokeWidth={2} />
      <path d="M0 16 H1440" stroke={GOLD} strokeOpacity={0.45} strokeWidth={0.8} strokeDasharray="1 5" strokeLinecap="round" />
    </svg>
  );
}
