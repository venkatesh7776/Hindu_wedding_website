/** A pointed leaf lying along +x from the origin (mango / banana / betel). */
export function leafPath(len: number, width: number) {
  return `M0 0 C${len * 0.3} ${-width} ${len * 0.75} ${-width * 0.9} ${len} 0 C${len * 0.75} ${width * 0.9} ${len * 0.3} ${width} 0 0 Z`;
}

/** Niche / doorway: rectangle with a semicircular top. */
export function archPath(x: number, y: number, w: number, h: number) {
  const r = w / 2;
  return `M${x} ${y + h} V${y + r} A${r} ${r} 0 0 1 ${x + w} ${y + r} V${y + h} Z`;
}

export const GOLD = "#C5A15B";
export const GOLD_SOFT = "#DCC58E";
export const IVORY = "#FAF5EC";
export const MAROON = "#651E2B";
export const BURGUNDY = "#48141F";
export const GREEN = "#354C3B";
export const ROSE = "#E8D4CF";
