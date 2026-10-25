import type { Ceremony } from "@/config/wedding";
import { leafPath, GOLD, GREEN, IVORY, MAROON, ROSE } from "./shapes";

const stroke = { stroke: GOLD, strokeWidth: 1.4, strokeLinejoin: "round" as const };
const MARIGOLD = "#D99A3A";

function Marigold({ x, y, r = 10 }: { x: number; y: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: 12 }, (_, k) => (
        <ellipse key={k} cx={0} cy={-r * 0.6} rx={r * 0.32} ry={r * 0.5} transform={`rotate(${k * 30})`} fill={MARIGOLD} {...stroke} strokeWidth={0.5} />
      ))}
      <circle r={r * 0.35} fill="#b8741f" />
    </g>
  );
}

function Leaf({ x, y, angle, len = 46, w = 10 }: { x: number; y: number; angle: number; len?: number; w?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <path d={leafPath(len, w)} fill={GREEN} {...stroke} strokeWidth={0.8} />
      <line x1={2} x2={len - 4} y1={0} y2={0} stroke={GOLD} strokeOpacity={0.6} strokeWidth={0.6} />
    </g>
  );
}

function Flame({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cy={-8} r={12} fill={GOLD} opacity={0.18} />
      <path d="M0 -18 C5 -11 5 -5 0 -1 C-5 -5 -5 -11 0 -18 Z" fill={MARIGOLD} />
      <path d="M0 -11 C2 -8 2 -5 0 -3 C-2 -5 -2 -8 0 -11 Z" fill={IVORY} />
    </g>
  );
}

const motifs: Record<Ceremony["motif"], React.ReactNode> = {
  haldi: (
    <>
      <Leaf x={70} y={150} angle={200} />
      <Leaf x={168} y={150} angle={-20} />
      <path d="M52 140 H188 C184 182 156 196 120 196 C84 196 56 182 52 140 Z" fill={GOLD} fillOpacity={0.35} {...stroke} />
      <ellipse cx={120} cy={140} rx={68} ry={12} fill="#E2B13C" {...stroke} />
      <path d="M96 204 H144 L138 196 H102 Z" fill={GOLD} fillOpacity={0.4} {...stroke} />
      <Marigold x={92} y={110} r={13} />
      <Marigold x={128} y={98} r={15} />
      <Marigold x={158} y={116} r={11} />
      <path d="M142 136 L178 76" {...stroke} strokeWidth={3} strokeLinecap="round" />
    </>
  ),
  mehendi: (
    <>
      <path d="M60 120 C40 80 70 40 110 48 C90 60 92 84 108 92 C126 100 128 128 104 140 C88 148 70 140 60 120 Z" fill={ROSE} {...stroke} />
      <path d="M78 116 C70 96 84 76 100 74" fill="none" {...stroke} strokeWidth={0.8} />
      <circle cx={92} cy={112} r={6} fill="none" {...stroke} strokeWidth={0.8} />
      <g transform="translate(126 168) rotate(-52)">
        <path d="M0 -12 L104 -3 L104 3 L0 12 Z" fill="#5f7a3e" {...stroke} />
        <path d="M0 -12 L-18 -14 L-18 14 L0 12 Z" fill={MAROON} {...stroke} />
        {[20, 40, 60, 80].map((x) => (
          <line key={x} x1={x} x2={x} y1={-10 + x / 12} y2={10 - x / 12} stroke={GOLD} strokeOpacity={0.5} strokeWidth={0.7} />
        ))}
      </g>
      <ellipse cx={176} cy={186} rx={30} ry={8} fill="#4d6a35" {...stroke} />
      <path d="M146 186 C150 206 202 206 206 186" fill={GOLD} fillOpacity={0.35} {...stroke} />
      {[[60, 180], [74, 196], [52, 200]].map(([x, y]) => (
        <ellipse key={x} cx={x} cy={y} rx={6} ry={4} fill={MAROON} fillOpacity={0.7} transform={`rotate(30 ${x} ${y})`} />
      ))}
    </>
  ),
  sangeet: (
    <>
      <path d="M44 104 C40 128 40 152 44 176 H196 C200 152 200 128 196 104 Z" fill={MAROON} {...stroke} />
      <ellipse cx={44} cy={140} rx={10} ry={36} fill={IVORY} {...stroke} />
      <ellipse cx={196} cy={140} rx={10} ry={36} fill={IVORY} {...stroke} />
      <path d="M54 108 L74 172 L94 108 L114 172 L134 108 L154 172 L174 108 L190 160" fill="none" stroke={GOLD} strokeWidth={1.2} />
      <path d="M44 140 H196" stroke={GOLD} strokeOpacity={0.6} strokeDasharray="2 4" />
      {[80, 160].map((x) => (
        <g key={x}>
          <line x1={x} x2={x} y1={176} y2={196} stroke={GOLD} />
          <path d={`M${x - 5} 196 h10 l-3 14 h-4 z`} fill={GOLD} />
        </g>
      ))}
      {Array.from({ length: 9 }, (_, k) => (
        <circle key={k} cx={70 + k * 12} cy={64 + Math.sin(k / 1.4) * 8} r={4.5} fill={GOLD} stroke="#8b6a2c" strokeWidth={0.6} />
      ))}
      <path d="M66 64 C100 50 140 78 172 58" fill="none" stroke={MAROON} strokeWidth={1.5} />
    </>
  ),
  vivah: (
    <>
      {[-70, -40, -12, 16, 46].map((a, k) => (
        <Leaf key={a} x={120} y={88} angle={a - 70} len={52 - Math.abs(k - 2) * 4} />
      ))}
      <ellipse cx={120} cy={70} rx={20} ry={22} fill="#8a5a2b" {...stroke} />
      <path d="M112 54 Q120 46 128 54" fill="none" stroke="#5c3a19" strokeWidth={2} />
      <path d="M96 96 H144 C146 104 160 112 164 140 C168 176 146 196 120 196 C94 196 72 176 76 140 C80 112 94 104 96 96 Z" fill={GOLD} fillOpacity={0.45} {...stroke} />
      <path d="M78 140 H162" stroke={MAROON} strokeWidth={4} />
      <path d="M80 152 H160" stroke={GOLD} strokeWidth={1} />
      <rect x={92} y={90} width={56} height={8} fill={GOLD} {...stroke} />
      <path d="M100 196 H140 L146 206 H94 Z" fill={GOLD} fillOpacity={0.5} {...stroke} />
      <Flame x={44} y={196} s={1.3} />
      <Flame x={196} y={196} s={1.3} />
      <path d="M30 198 Q44 206 58 198 Z M182 198 Q196 206 210 198 Z" fill={GOLD} {...stroke} />
    </>
  ),
  reception: (
    <>
      <path d="M100 212 H140 L132 196 H108 Z" fill={GOLD} fillOpacity={0.5} {...stroke} />
      <rect x={116} y={92} width={8} height={104} fill={GOLD} fillOpacity={0.45} {...stroke} />
      {[178, 150, 120].map((y) => (
        <ellipse key={y} cx={120} cy={y} rx={10} ry={5} fill={GOLD} {...stroke} />
      ))}
      <path d="M64 92 Q120 116 176 92 Q150 84 120 84 Q90 84 64 92 Z" fill={GOLD} fillOpacity={0.6} {...stroke} />
      {[70, 95, 120, 145, 170].map((x) => (
        <Flame key={x} x={x} y={x === 120 ? 82 : 88} s={x === 120 ? 1.4 : 1.1} />
      ))}
      <path d="M118 84 Q120 62 130 52 Q128 66 122 84 Z" fill={GOLD} {...stroke} />
      <circle cx={130} cy={50} r={4} fill={GOLD} />
      {[[44, 196], [58, 206], [190, 200], [178, 208]].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r={4} fill={IVORY} stroke={GOLD} strokeWidth={0.6} />
      ))}
    </>
  ),
};

/** Line-art still life for a ceremony — used when no photograph is supplied. */
export function CeremonyMotif({ motif, className }: { motif: Ceremony["motif"]; className?: string }) {
  return (
    <svg viewBox="20 36 200 186" className={className} aria-hidden>
      {motifs[motif]}
    </svg>
  );
}
