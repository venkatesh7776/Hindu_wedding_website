#!/usr/bin/env node
// Generates the invitation artwork with the Gemini image API.
//
//   GEMINI_API_KEY=... node scripts/generate-images.mjs            # all missing images
//   GEMINI_API_KEY=... node scripts/generate-images.mjs hero-gopuram-desktop --force
//   GEMINI_API_KEY=... node scripts/generate-images.mjs --list-models
//   node scripts/generate-images.mjs --optimize   # convert PNG/JPGs saved by hand (e.g. from the Gemini app)
//
// Model is configurable with GEMINI_IMAGE_MODEL. Originals are kept in artwork-originals/;
// the site serves optimised WebP from public/images/generated/.

import { readFile, writeFile, mkdir, access, readdir, rename } from "node:fs/promises";
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public/images/generated");
const originalsDir = path.join(root, "artwork-originals");
const API = "https://generativelanguage.googleapis.com/v1beta";
const key = process.env.GEMINI_API_KEY;
const model = process.env.GEMINI_IMAGE_MODEL ?? "gemini-3-pro-image";
const imageSize = process.env.GEMINI_IMAGE_SIZE ?? "2K";

const args = process.argv.slice(2);
const force = args.includes("--force");
const only = args.filter((a) => !a.startsWith("--"));

/** Saves a WebP (max 2400px wide) for the site and keeps the original out of /public. */
async function optimise(file) {
  const id = path.basename(file).replace(/\.(png|jpe?g)$/i, "");
  await sharp(file).resize({ width: 2400, withoutEnlargement: true }).webp({ quality: 82 }).toFile(path.join(outDir, `${id}.webp`));
  await mkdir(originalsDir, { recursive: true });
  await rename(file, path.join(originalsDir, path.basename(file)));
  return path.join(outDir, `${id}.webp`);
}

if (args.includes("--optimize")) {
  await mkdir(outDir, { recursive: true });
  for (const f of await readdir(outDir)) {
    if (/\.(png|jpe?g)$/i.test(f)) console.log("webp ", path.relative(root, await optimise(path.join(outDir, f))));
  }
  process.exit(0);
}

if (!key) {
  console.error("GEMINI_API_KEY is not set. Create one at https://aistudio.google.com/apikey");
  process.exit(1);
}

if (args.includes("--list-models")) {
  const res = await fetch(`${API}/models?pageSize=200`, { headers: { "x-goog-api-key": key } });
  const json = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(json));
  for (const m of json.models ?? []) {
    if (/image/i.test(m.name)) console.log(m.name.replace("models/", ""), "—", m.displayName);
  }
  process.exit(0);
}

const { style, images } = JSON.parse(await readFile(path.join(root, "scripts/image-prompts.json"), "utf8"));
await mkdir(outDir, { recursive: true });

const exists = (p) => access(p).then(() => true, () => false);

async function generate({ id, prompt, aspectRatio }) {
  const res = await fetch(`${API}/models/${model}:generateContent`, {
    method: "POST",
    headers: { "x-goog-api-key": key, "content-type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `${prompt}\n\nStyle: ${style}` }] }],
      generationConfig: {
        responseModalities: ["IMAGE"],
        imageConfig: { aspectRatio, imageSize },
      },
    }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`${res.status} ${json.error?.message ?? JSON.stringify(json)}`);
  const part = json.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
  if (!part) throw new Error(`no image returned (${json.candidates?.[0]?.finishReason ?? "unknown"})`);
  const ext = part.inlineData.mimeType === "image/jpeg" ? "jpg" : "png";
  const file = path.join(outDir, `${id}.${ext}`);
  await writeFile(file, Buffer.from(part.inlineData.data, "base64"));
  return optimise(file);
}

const queue = images.filter((img) => !only.length || only.includes(img.id));
let failed = 0;
for (const img of queue) {
  const done = await exists(path.join(outDir, `${img.id}.webp`));
  if (done && !force) {
    console.log(`skip  ${img.id} (exists)`);
    continue;
  }
  process.stdout.write(`gen   ${img.id} [${img.aspectRatio}] … `);
  try {
    console.log(path.relative(root, await generate(img)));
  } catch (err) {
    failed++;
    console.log(`FAILED: ${err.message}`);
  }
}
process.exit(failed ? 1 : 0);
