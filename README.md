# Hindu Wedding Invitation

A premium, mobile-first wedding invitation site — Royal Indian Heritage × Modern Luxury.
Next.js 16 · TypeScript · Tailwind CSS 4. Design rationale, image brief and motion
choreography live in [`DESIGN_PLAN.md`](DESIGN_PLAN.md).

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build (also runs type-check)
npm run lint
```

## 1. Add the couple's details

**Everything** shown on the site comes from one file: [`src/config/wedding.ts`](src/config/wedding.ts).

- Names, parents, short intros, portrait paths
- `weddingStart` + `timeZone` — drive the hero date, countdown and calendar files
- `ceremonies` — add, remove or reorder freely; each needs `start`, optional `end`, venue, `motif`
- `venue` — `address` / `mapQuery` enable the map and the "Get Directions" button
- `gallery`, `rsvp`, `closing`, `music`, `site.url`

Times are written as local wall-clock time in `timeZone` (e.g. `"2027-02-20T10:30"` in
`Asia/Kolkata`); guests anywhere get correct calendar entries.

When real details are in, set **`isSample: false`** so the config is marked as final.

Photos go in `public/images/...` and are referenced as `/images/...`. Missing files fall back
gracefully (portrait monogram, gallery placeholder, ceremony line-art).

## 2. RSVP storage (required before sharing)

The form posts to `/api/rsvp`, which validates the response and forwards it to the URL in
`RSVP_WEBHOOK_URL`. **Without that variable the form tells guests online RSVP isn't open — it
never shows a fake success.**

Easiest setup — a Google Sheet:

1. Create a Google Sheet → Extensions → Apps Script, paste:

   ```js
   const SECRET = "choose-a-long-random-string";

   function doPost(e) {
     const data = JSON.parse(e.postData.contents);
     const out = (o) => ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
     if (data.secret !== SECRET) return out({ error: "unauthorized" });

     const ss = SpreadsheetApp.getActiveSpreadsheet();
     const sheet = ss.getSheetByName("RSVPs") || ss.insertSheet("RSVPs");
     if (sheet.getLastRow() === 0) sheet.appendRow(["Submitted at", "Name", "Attending", "Guests", "Wishes", "Request id"]);

     // Ignore retries of the same submission
     const ids = sheet.getLastRow() > 1 ? sheet.getRange(2, 6, sheet.getLastRow() - 1, 1).getValues().flat() : [];
     if (ids.includes(data.id)) return out({ ok: true, duplicate: true });

     const safe = (v) => (/^[=+\-@]/.test(String(v)) ? "'" + v : v); // block formula injection
     sheet.appendRow([data.submittedAt, safe(data.name), data.attending === "yes" ? "Joyfully accepts" : "Regretfully declines", data.guests, safe(data.message), data.id]);
     return out({ ok: true });
   }
   ```

2. Deploy → New deployment → Web app → *Execute as: Me*, *Who has access: Anyone* → copy the URL.
3. Set the environment variables (in `.env.local` locally, and in your host's settings):

   ```
   RSVP_WEBHOOK_URL=https://script.google.com/macros/s/…/exec
   RSVP_WEBHOOK_SECRET=choose-a-long-random-string
   ```

Any other backend works too — it just needs to accept a JSON `POST` and return 2xx
(and must not return a body containing `error`).

## 3. Artwork

The site ships with original gold line-art (gopuram, toranam, mandap, ceremony still-lifes)
drawn in SVG, so it is complete without any photos. Painted artwork can replace each piece:

- **Gemini API** (needs billing enabled on the key's Google Cloud project — free-tier keys get
  0 image requests): put `GEMINI_API_KEY=…` in `.env.local`, then `npm run images`
  (`npm run images -- --list-models` to see available models; `GEMINI_IMAGE_MODEL` overrides).
- **Gemini app by hand**: follow [`docs/IMAGE_PROMPTS.md`](docs/IMAGE_PROMPTS.md), save files
  to `public/images/generated/<id>.png`, then `npm run images:optimize`.

Rebuild after adding images. All 11 painted images are currently in place
(`public/images/generated/*.webp`; full-size originals in `artwork-originals/`). To replace
one, save the new PNG as `public/images/generated/<id>.png` and run `npm run images:optimize`
— it overwrites the WebP. Delete a WebP to fall back to the line-art for that slot. Prompts live in `scripts/image-prompts.json`; after editing them run `npm run prompts` to refresh the sheet.

## 4. Optional extras

- **Music**: put a licensed track in `public/audio/` and set `music.src` (and `music.credit` if the
  licence asks for attribution). It starts when the guest taps "Explore Our Wedding"; a
  mute/unmute button sits bottom-right.
- **Link previews**: set `site.url` once deployed so the social preview image uses the real
  address (on Vercel the production URL is picked up automatically).

## 5. Deploy

Works on any Node host; Vercel is simplest: import the folder, add the RSVP environment
variables, deploy. The page is statically rendered; only `/api/rsvp` runs on the server.
