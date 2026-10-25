# Design Plan — Hindu Wedding Invitation

> Plan first, build second. This document fixes the art direction, the image
> brief for every section and the motion choreography before any section is coded.

## 0. What we took from the references (`/refrences`)

| Reference idea | Keep | Change |
|---|---|---|
| Hand-painted heritage illustration (gopuram, toranam, brass deepams, banana plants) | Yes — one consistent painterly style across all artwork | Recolour from mint sky / sandstone to **dusk maroon, ivory, antique gold** |
| Toranam (mango leaves + jasmine + lotus buds) framing the invitation | Yes — becomes our signature frame motif | Used **twice only** (hero + closing) so it stays special |
| Cormorant display type, airy caps labels | Yes | Body moves to Inter per brief |
| Scroll-driven gopuram rising behind the names | Yes — cinematic, but quieter | Slower, shorter travel, reduced-motion fallback |
| Falling petals everywhere | **No** — too busy | Petals only on the interactive blessing moment |
| "Shower akshantalu" tap-to-bless | Yes — the one playful moment | Lives in the Blessings section, guest-triggered, never automatic |
| AI-generated couple in the hero | **No** — never invent the couple's identity | Couple appears only in real supplied photos |

**Art-direction rule:** all generated imagery is *illustration / still life with no faces*.
Real people appear only via the couple's own photographs (placeholders until supplied).
This avoids uncanny AI faces and fabricated identities, and keeps one coherent style.

## 1. Visual style for generated images

One shared "style suffix" is appended to every prompt so all assets match:

> Hand-painted Indian heritage illustration, fine gouache and watercolour on warm
> ivory cotton paper, delicate gold-leaf accents, Mughal–Tanjore miniature
> sensibility with modern editorial restraint, warm soft light, muted palette of
> deep maroon #651E2B, burgundy #48141F, warm ivory #FAF5EC, antique gold #C5A15B,
> temple green #354C3B, soft rose #E8D4CF. No people, no faces, no text, no
> lettering, no watermark. Generous negative space.

Grade: warm, slightly desaturated, never glossy / neon / 3D-render looking.

## 2. Section-by-section plan

Backgrounds alternate dark ↔ light to give rhythm and breathing room
(~70% clean space, 20% heritage detail, 10% ornament).

| # | Section | Bg | Image (what & why) | Aspect / file |
|---|---|---|---|---|
| 1 | **Hero** | Maroon → burgundy | **Gopuram at dusk**: a painted South-Indian temple tower rising from the bottom centre, crowned with gold kalasham, framed by banana plants; dusky rose-maroon sky with soft gold-edged clouds. Top 55% kept empty for type. A **toranam** is painted into the top edge of the art (Gemini cannot output transparency). | 16:9 desktop + 9:16 mobile · `hero-gopuram-*.webp` |
| 2 | **Meet the couple** | Ivory | Real portraits (placeholder until supplied) in tall arch-shaped crops. Lotus divider (inline SVG) under the heading. | 4:5 portraits |
| 3 | Our story (optional) | Ivory | Real photos only; section hidden if no story in config. | — |
| 4 | **Countdown** | Burgundy | No photo. Faint **kolam line pattern** (inline SVG) in gold at 6% opacity as texture. | — |
| 5 | **Ceremonies** | Ivory | One still-life per ceremony, same lighting & table angle: **Haldi** (brass urli of turmeric paste, marigolds, mango leaves) · **Mehendi** (henna cones, rose petals, brass bowl, mehendi-patterned cloth) · **Sangeet** (dholak with gota tassels, ghungroo bells, marigold strings) · **Vivah** (agni kund with flame, mangalsutra on banana leaf, akshata rice, brass kalash with coconut) · **Reception** (brass deepams lit, jasmine, ivory silk drape). | 4:5 · `ceremony-*.webp` |
| 6 | **Venue** | Maroon split w/ ivory card | Real venue photo from couple. Until then a neutral painted **mandap arch** placeholder clearly labelled as placeholder. Map embed beside it. | 3:2 · `venue-placeholder.webp` |
| 7 | **Gallery** | Ivory | Real couple photos. Dev placeholders = tonal ivory blocks with a small gold motif (no fake couples). | mixed |
| 8 | **RSVP** | Soft rose / blush | Small painted **brass kalash with mango leaves** beside the heading. | 1:1 · `ornament-kalash.png` |
| 9 | **Blessings & closing** | Deep maroon | **Mandap at night**: painted mandap with marigold-and-jasmine canopy, lit diyas, silk drapes; toranam reprised at top. Akshantalu shower lives here. | 16:9 + 9:16 · `closing-mandap-*.webp` |
| — | OG share image | Maroon | Ganesh invocation + names composed in code over the gopuram art (generated at build via `opengraph-image`). | 1200×630 |

Ornaments drawn as **inline SVG** (not generated): thin gold dividers, corner
brackets, the "&" flourish, the Om/kalash line icon, scroll indicator. Crisp at
any size and themeable.

## 3. Motion system

Tokens (in `globals.css`):

| Token | Value | Use |
|---|---|---|
| `--ease-silk` | `cubic-bezier(.22,.61,.36,1)` | default reveals |
| `--ease-veil` | `cubic-bezier(.65,0,.35,1)` | image masks, section veils |
| `--dur-fast` | 300ms | hovers, buttons |
| `--dur-base` | 600ms | text reveals |
| `--dur-slow` | 1100ms | image reveals, hero |
| stagger | 80–120ms | lists / words |

Reveal primitive: opacity 0→1 + translateY 24px→0, triggered once at ~15%
visibility. Image primitive: `clip-path inset(8%)` → `inset(0)` +
scale 1.06→1. Nothing loops forever except the 1.6s scroll-indicator breath.

### Per-section choreography

1. **Hero (on load, ~2.2s total, content readable by 900ms)**
   - Background fades in from burgundy (0–800ms); gopuram rises 40px → 0 (1.4s, silk).
   - Toranam drops in from −24px with a gentle 2° settle (900ms, delay 300ms).
   - Ganesh invocation fades (delay 400ms) → names reveal word-by-word with a
     soft blur 6px→0 (delay 600ms, 120ms stagger) → "&" gold flourish draws its
     SVG stroke (700ms) → date → CTA.
   - **On scroll:** gopuram parallax at 0.15× (max 60px), text drifts up 0.3× and
     fades by 60% scroll-through. Disabled under reduced motion.
2. **Couple:** heading reveal; portraits unmask from arch clip (veil, 1.1s) with
   left/right staggered 150ms; gold separator line draws from centre outward.
3. **Story:** each milestone reveals in sequence as the vertical gold rule grows
   with scroll progress.
4. **Countdown:** section enters with a fade; digits use a vertical **roll** (old
   value slides up & fades, new slides in, 400ms) only on change; seconds tick is
   the only continuous motion and is static under reduced motion.
5. **Ceremonies:** each card: image unmask + 1.06→1 scale, text staggered 80ms.
   Desktop alternates image left/right; date label in gold fades first.
6. **Venue:** photo slow unmask; map fades in after (300ms delay); CTA arrow
   nudges 4px on hover.
7. **Gallery:** tiles reveal in a staggered cascade (60ms); lightbox opens with a
   400ms fade + 0.96→1 scale, swipe/arrow-key navigation with crossfade.
8. **RSVP:** form fields rise in sequence; submit button shows inline spinner;
   success state crossfades in with a drawn gold check mark.
9. **Blessings:** slow 1.4s fade of the mandap art; names reveal like the hero
   (echo); guest taps "Shower akshantalu" → ~40 rice/petal particles fall once
   (canvas, 2.5s, then cleaned up). Not shown under reduced motion — button
   instead shows a gentle glow + thank-you text.

### Between sections (scroll transitions)

- Dark↔light boundaries use a **scalloped / arch edge** SVG divider (no hard line).
- Each dark section's background image has a tiny 0.1× parallax; light sections
  stay still so reading is calm.
- Smooth anchor scrolling via CSS `scroll-behavior: smooth` (no scroll-jacking
  library). A thin gold progress hairline at the top tracks page scroll.
- Minimal floating dock (bottom-right): music toggle + share. Monogram top-left
  links home. No full nav bar.

### Reduced motion

`prefers-reduced-motion: reduce` → all reveals become 200ms opacity only, no
parallax, no particles, countdown digits swap without roll, smooth scroll off.

## 4. Theme (implemented in `src/app/globals.css` + `src/app/layout.tsx`)

- Colours: palette from brief as `--color-*` tokens, plus semantic tokens
  (`--surface-dark`, `--surface-light`, `--ink`, `--ink-on-dark`, `--accent`).
- Fonts: Cormorant Garamond (display, 400/500/600 + italic), Inter (UI/body),
  Noto Serif Devanagari (invocations) via `next/font/google`.
- Type scale (fluid `clamp`): names 44→100px, h2 34→56px, h3 24→32px,
  body 16→17px, label 11–12px caps 0.2em tracking.
- Spacing: section padding `clamp(80px, 12vw, 160px)`; content max 1120px,
  text measure 60ch.

## 5. Image generation pipeline & fallback art

**Built-in art (always present):** gold line-art SVGs in `src/components/art/` — gopuram
(hero), toranam (hero + closing), mandap with agni (closing), five ceremony still-lifes,
kolam texture, lotus divider, scalloped arch edges. Drawn in the exact palette, so the site
is complete and cohesive with zero raster images.

**Painted art (optional upgrade):** `scripts/generate-images.mjs` sends each prompt in
`scripts/image-prompts.json` to the Gemini image model (`gemini-3-pro-image` by default;
`GEMINI_IMAGE_MODEL` overrides) and saves an optimised WebP to `public/images/generated/`.
Any file present there replaces the matching line-art at build time; the venue
illustration is labelled "Illustration" so it is never mistaken for the real venue.

Status (25 Oct 2026): all 11 painted images were generated by hand in the Gemini app and
are live (originals kept in `artwork-originals/`, served as WebP — 24 MB → 2.3 MB).

## 6. Changes made during the build

- Hero gopuram sits in layout flow below the CTA (not absolutely positioned) so it can never
  collide with text; on load the kalasham peeks up and the tower rises into view on scroll.
- Countdown uses lining numerals (Cormorant's default old-style figures read "117" as "I I 7").
- The generated hero art came out as a bright daylight scene (not maroon dusk), so the hero
  has two treatments: with the photo, burgundy type sits in the open sky (desktop: right of
  the gopuram; portrait: over a band of ivory morning mist the tower rises out of) and the
  bottom fades into the ivory couple section. Without it, the maroon line-art hero returns.
- Closing mandap art is anchored to the bottom of the Blessings section and masked into a
  burgundy→mandap-maroon gradient; on phones the crop hides the image's own toranam so it
  never appears mid-page.
- Hero is now sticky: it stays pinned while the Couple section (rounded top, soft shadow)
  slides up over it, and a warm-charcoal veil deepens as it is covered. The ivory fade at
  the hero's bottom edge was removed.
- Couple section redesigned: staggered arch portraits with offset gold frames and lotus
  apex, a large gold "&" with ॥ शुभ विवाह ॥ between them, faint mandala watermark.
- Our Story section, hero CTA and embedded map removed at the couple's request (venue keeps "Get Directions").
- Dummy content everywhere (Ananya & Arjun, Mylapore venue, story, contacts, shloka) and
  Unsplash stand-in photos for portraits + gallery — see public/images/CREDITS.md.
- Component classes moved into `@layer components` so Tailwind utilities can override them.
- Monogram dropped — the toranam owns the top edge; share/music live in a floating dock.
- Intro cover (`Intro.tsx`): full-screen temple-arch page over the pinned hero. "Explore Our Wedding"
  scrolls one viewport so the cover lifts off; the hero's entrance animation waits until then
  (`html[data-revealed]`). Phones use `temple-arch-portrait.webp`, a recomposed crop of both pillars.
- Bride and groom portraits now sit on the same baseline.
- The intro is one-way: scrolling is locked until the CTA is tapped; once lifted it is removed
  (`html[data-intro="done"]`) so scrolling back up stops at the hero. The CTA also starts the
  background music (veena & shehnai, CC BY — credited in the footer). Mute/unmute sits bottom-right.
- Share button removed at the couple's request; the dock now holds only the music mute/unmute.
- Tap anywhere throws a small burst of flower petals and turmeric akshantalu from the tap point (`TapBlessings.tsx`, off under reduced motion).
- Mobile hero is two layers: the garlanded sky (`hero-sky-mobile`) shows from the start and the transparent gopuram cutout (`hero-temple-mobile`) rises from the bottom when the intro lifts (`.temple-rise`, gated on `html[data-revealed]`). It always spans the full width and sits behind the names (no parallax). Desktop keeps the single painted scene.
