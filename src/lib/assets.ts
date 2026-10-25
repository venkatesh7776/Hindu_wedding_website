import "server-only";
import { existsSync } from "node:fs";
import path from "node:path";

const publicDir = path.join(process.cwd(), "public");

/** Returns `src` only if the file exists under /public — lets sections fall back gracefully. */
export function asset(src?: string): string | undefined {
  if (!src) return undefined;
  return existsSync(path.join(publicDir, src)) ? src : undefined;
}

/** Finds a generated artwork by id (see scripts/image-prompts.json), preferring optimised WebP. */
export function generated(id: string): string | undefined {
  for (const ext of ["webp", "jpg", "png"]) {
    const src = asset(`/images/generated/${id}.${ext}`);
    if (src) return src;
  }
  return undefined;
}
