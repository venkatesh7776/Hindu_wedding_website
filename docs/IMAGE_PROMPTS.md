# Image prompts — Hindu wedding invitation

11 images. Each prompt below is complete and ready to paste into the Gemini app
(choose the **Nano Banana Pro** image model). The shared style block is already included in every prompt.

## How to generate

1. **Start with the hero desktop image** (#1). Regenerate until you love it — it sets the look for everything else.
2. **For every following image, attach the hero image you chose** and add this line before the prompt:
   `Match the painting style, paper texture, colour palette and lighting of the attached image exactly.`
   This keeps all 11 images looking like one hand-painted series.
3. Download each result and save it as **`public/images/generated/<file name>.png`** using the exact file name shown.
4. When done (or after any batch), run:
   ```bash
   npm run images:optimize && npm run build
   ```
   Each image replaces the built-in line-art for that slot. Skip any image you don't want — the line-art stays.

## Quality checklist (reject and regenerate if any fail)

- No people, faces, hands, text, letters or watermarks anywhere.
- The **empty areas** described in the prompt really are empty — names and text sit there on the site.
- Colours stay within maroon / burgundy / ivory / gold / temple green / soft rose. No bright saturated orange, pink or blue.
- Looks hand-painted (gouache, paper grain), not a glossy 3D render or a photo.
- The aspect ratio is right. If Gemini ignores it, add *"Output in exactly the required aspect ratio"* again at the end.

---

## 1. `hero-gopuram-desktop.png` · 16:9

**Where it appears:** Hero background on laptops and desktops (full screen, text sits over the upper middle)

```text
A wide, cinematic 16:9 landscape illustration for the opening screen of a Hindu wedding invitation. SUBJECT: a single, majestic South Indian Dravidian temple gopuram (tower gateway) standing at the bottom centre of the frame. It has seven to eight tapering tiers of richly carved sandstone in warm honey-gold tones, each tier lined with small sculpted niches, pilasters and miniature shrines, with small temple-green domed roofs at the corners of each tier and deep maroon recesses inside the niches. It is crowned by a barrel-vaulted top with a row of five gleaming gold kalasham finials. At its base is a tall arched wooden doorway, slightly open, with a warm glow from a single brass lamp inside. COMPOSITION: the gopuram occupies only the lower 40% of the image height, rising from the bottom edge, with its kalasham tips reaching no higher than 55% from the bottom. Two lush banana plants and two tall brass deepam oil lamps with tiny lit flames flank the base on the left and right. Across the very top edge of the image hangs a delicate traditional toranam garland made of fresh green mango leaves, white jasmine strings and small pink lotus buds, occupying only the top 10% of the frame. The entire upper-middle area (from 10% to 55% height) is calm, open sky with nothing in it, reserved for the couple's names. SKY: a deep dusk sky graded from royal burgundy at the top to a warm deep maroon near the horizon, with a soft golden glow behind the gopuram and a few soft, painterly clouds whose edges catch antique-gold light, placed to the far left and far right only. MOOD: serene, sacred, grand but quiet, the hush of evening before a celebration. The left and right thirds of the image stay simple and dark so the centre glows.

STYLE: A hand-painted Indian heritage illustration in fine gouache and transparent watercolour on warm ivory cotton-rag paper with a subtle visible paper grain. Delicate hand-applied gold-leaf highlights on edges, finials and ornament only, never flat metallic. Inspired by Tanjore and Mysore paintings and Mughal-Rajput miniatures, but with the restraint, calm negative space and soft edges of a modern luxury wedding stationery studio. Soft, warm, natural light with gentle atmospheric haze and soft shadows. Colour palette strictly limited to deep maroon (#651E2B), royal burgundy (#48141F), warm ivory (#FAF5EC), antique gold (#C5A15B), muted gold (#DCC58E), temple green (#354C3B) and soft rose (#E8D4CF), with small accents of muted marigold orange. Slightly desaturated, warm, elegant colour grade, consistent across the whole series. AVOID: people, faces, hands, deities' faces in close-up, text, letters, numbers, calligraphy, signatures, watermarks, logos, borders or frames around the image, glossy 3D render look, plastic textures, neon or saturated colours, lens flare, heavy vignettes, clutter, cartoon or clip-art style.

Output aspect ratio: exactly 16:9.
```

## 2. `hero-gopuram-mobile.png` · 9:16

**Where it appears:** Hero background on phones (portrait full screen, text sits over the middle)

```text
A tall vertical 9:16 portrait illustration for the opening screen of a Hindu wedding invitation viewed on a phone. SUBJECT: a single, majestic South Indian Dravidian temple gopuram in warm honey-gold carved sandstone, seven tapering tiers with sculpted niches, pilasters and miniature corner shrines topped with small temple-green domes, deep maroon recesses in the niches, crowned by a barrel-vaulted top with five gold kalasham finials, and a tall arched doorway at its base glowing softly from a brass lamp inside. COMPOSITION: the gopuram is centred and rises from the bottom edge, occupying only the lower 38% of the image height; its width is about 60% of the frame. A banana plant on each side of its base. Across the very top edge hangs a toranam garland of green mango leaves, white jasmine strings and small pink lotus buds, occupying only the top 7% of the frame. The whole middle of the image, from 8% to 60% height, is calm, empty sky reserved for text. SKY: deep dusk graded from royal burgundy at the top to warm maroon lower down, with a soft golden halo glowing behind the gopuram and one or two small painterly clouds with antique-gold edges near the sides. MOOD: serene, sacred, intimate, evening calm before a celebration.

STYLE: A hand-painted Indian heritage illustration in fine gouache and transparent watercolour on warm ivory cotton-rag paper with a subtle visible paper grain. Delicate hand-applied gold-leaf highlights on edges, finials and ornament only, never flat metallic. Inspired by Tanjore and Mysore paintings and Mughal-Rajput miniatures, but with the restraint, calm negative space and soft edges of a modern luxury wedding stationery studio. Soft, warm, natural light with gentle atmospheric haze and soft shadows. Colour palette strictly limited to deep maroon (#651E2B), royal burgundy (#48141F), warm ivory (#FAF5EC), antique gold (#C5A15B), muted gold (#DCC58E), temple green (#354C3B) and soft rose (#E8D4CF), with small accents of muted marigold orange. Slightly desaturated, warm, elegant colour grade, consistent across the whole series. AVOID: people, faces, hands, deities' faces in close-up, text, letters, numbers, calligraphy, signatures, watermarks, logos, borders or frames around the image, glossy 3D render look, plastic textures, neon or saturated colours, lens flare, heavy vignettes, clutter, cartoon or clip-art style.

Output aspect ratio: exactly 9:16.
```

## 3. `ceremony-vivah.png` · 4:5

**Where it appears:** Vivah (wedding ceremony) card (arch-shaped frame; top corners cropped)

```text
A refined, sacred still-life illustration for the Vivah (Hindu wedding ceremony), 4:5 portrait. SUBJECT: a small square copper agni kund (sacred fire pit) with a gentle, living flame; beside it a polished brass kalash pot with five fresh mango leaves fanned around its mouth and a whole brown coconut on top, a thin red-and-yellow sacred thread tied around its neck; a fresh green banana leaf holding a small mound of yellow akshata rice; three tiny brass bowls of red kumkum, yellow turmeric and white sandalwood paste; and a loosely coiled white jasmine garland. All on a warm-ivory silk cloth with a deep maroon and antique-gold woven border. COMPOSITION: the arrangement is centred and sits in the lower two thirds of the frame, seen from a gentle three-quarter angle (about 35 degrees above). The top third is a plain soft warm-ivory background with only the faint warm glow of the fire, and the top-left and top-right corners stay empty because the image is cropped into an arch. LIGHT: warm firelight glowing from the agni kund mixed with soft daylight from the upper left. MOOD: sacred, timeless, reverent, the most important moment of the wedding.

STYLE: A hand-painted Indian heritage illustration in fine gouache and transparent watercolour on warm ivory cotton-rag paper with a subtle visible paper grain. Delicate hand-applied gold-leaf highlights on edges, finials and ornament only, never flat metallic. Inspired by Tanjore and Mysore paintings and Mughal-Rajput miniatures, but with the restraint, calm negative space and soft edges of a modern luxury wedding stationery studio. Soft, warm, natural light with gentle atmospheric haze and soft shadows. Colour palette strictly limited to deep maroon (#651E2B), royal burgundy (#48141F), warm ivory (#FAF5EC), antique gold (#C5A15B), muted gold (#DCC58E), temple green (#354C3B) and soft rose (#E8D4CF), with small accents of muted marigold orange. Slightly desaturated, warm, elegant colour grade, consistent across the whole series. AVOID: people, faces, hands, deities' faces in close-up, text, letters, numbers, calligraphy, signatures, watermarks, logos, borders or frames around the image, glossy 3D render look, plastic textures, neon or saturated colours, lens flare, heavy vignettes, clutter, cartoon or clip-art style.

Output aspect ratio: exactly 4:5.
```

## 4. `ceremony-haldi.png` · 4:5

**Where it appears:** Haldi ceremony card (shown inside a tall arch-shaped frame; top corners get cropped)

```text
A refined still-life illustration for the Haldi ceremony, 4:5 portrait. SUBJECT: a polished hand-hammered brass urli bowl filled with smooth, bright golden turmeric haldi paste, a small brass spoon resting in it, a few whole fresh turmeric roots beside it, scattered marigold flowers and loose marigold petals in muted orange and yellow, three fresh mango leaves, and a softly folded yellow cotton cloth with a thin maroon border. All arranged on a draped warm-ivory silk cloth. COMPOSITION: the arrangement is centred and sits in the lower two thirds of the frame, seen from a gentle three-quarter angle (about 35 degrees above the table). The top third of the image is a plain, soft warm-ivory background with nothing in it, and the top-left and top-right corners stay completely empty because the image is cropped into an arch. LIGHT: soft morning window light from the upper left, gentle warm shadows falling to the lower right, a faint glow on the brass. MOOD: joyful, fresh, auspicious, sunlit.

STYLE: A hand-painted Indian heritage illustration in fine gouache and transparent watercolour on warm ivory cotton-rag paper with a subtle visible paper grain. Delicate hand-applied gold-leaf highlights on edges, finials and ornament only, never flat metallic. Inspired by Tanjore and Mysore paintings and Mughal-Rajput miniatures, but with the restraint, calm negative space and soft edges of a modern luxury wedding stationery studio. Soft, warm, natural light with gentle atmospheric haze and soft shadows. Colour palette strictly limited to deep maroon (#651E2B), royal burgundy (#48141F), warm ivory (#FAF5EC), antique gold (#C5A15B), muted gold (#DCC58E), temple green (#354C3B) and soft rose (#E8D4CF), with small accents of muted marigold orange. Slightly desaturated, warm, elegant colour grade, consistent across the whole series. AVOID: people, faces, hands, deities' faces in close-up, text, letters, numbers, calligraphy, signatures, watermarks, logos, borders or frames around the image, glossy 3D render look, plastic textures, neon or saturated colours, lens flare, heavy vignettes, clutter, cartoon or clip-art style.

Output aspect ratio: exactly 4:5.
```

## 5. `ceremony-mehendi.png` · 4:5

**Where it appears:** Mehendi ceremony card (arch-shaped frame; top corners cropped)

```text
A refined still-life illustration for the Mehendi ceremony, 4:5 portrait. SUBJECT: three slim henna cones wrapped in clear paper with deep green henna inside, a small brass bowl of freshly mixed dark green henna paste, a sprig of fresh henna leaves, a short string of white jasmine, scattered deep rose and soft pink petals, and a softly folded cloth embroidered in fine maroon thread with traditional mehendi-style paisley and floral patterns. All arranged on a draped warm-ivory silk cloth. COMPOSITION: the arrangement is centred and sits in the lower two thirds of the frame, seen from a gentle three-quarter angle (about 35 degrees above the table). The top third of the image is a plain, soft warm-ivory background, and the top-left and top-right corners stay completely empty because the image is cropped into an arch. LIGHT: soft afternoon light from the upper left, gentle warm shadows to the lower right. MOOD: delicate, artistic, intimate, feminine without being sugary.

STYLE: A hand-painted Indian heritage illustration in fine gouache and transparent watercolour on warm ivory cotton-rag paper with a subtle visible paper grain. Delicate hand-applied gold-leaf highlights on edges, finials and ornament only, never flat metallic. Inspired by Tanjore and Mysore paintings and Mughal-Rajput miniatures, but with the restraint, calm negative space and soft edges of a modern luxury wedding stationery studio. Soft, warm, natural light with gentle atmospheric haze and soft shadows. Colour palette strictly limited to deep maroon (#651E2B), royal burgundy (#48141F), warm ivory (#FAF5EC), antique gold (#C5A15B), muted gold (#DCC58E), temple green (#354C3B) and soft rose (#E8D4CF), with small accents of muted marigold orange. Slightly desaturated, warm, elegant colour grade, consistent across the whole series. AVOID: people, faces, hands, deities' faces in close-up, text, letters, numbers, calligraphy, signatures, watermarks, logos, borders or frames around the image, glossy 3D render look, plastic textures, neon or saturated colours, lens flare, heavy vignettes, clutter, cartoon or clip-art style.

Output aspect ratio: exactly 4:5.
```

## 6. `ceremony-sangeet.png` · 4:5

**Where it appears:** Sangeet ceremony card (arch-shaped frame; top corners cropped)

```text
A refined still-life illustration for the Sangeet (music night) ceremony, 4:5 portrait. SUBJECT: a traditional wooden dholak drum lying on its side, its body wrapped in deep maroon cloth with gold gota-patti trim and laced with cream cotton cords, two small gold tassels hanging from it; beside it a pair of brass ghungroo ankle bells on red cords, a short string of marigolds, and a few scattered rose petals. All arranged on a draped warm-ivory silk cloth, with a hint of warm golden fairy-light bokeh far in the background. COMPOSITION: the arrangement is centred and sits in the lower two thirds of the frame, seen from a gentle three-quarter angle (about 30 degrees above the floor). The top third is a soft warm-ivory background fading to a faint warm glow, and the top-left and top-right corners stay empty because the image is cropped into an arch. LIGHT: warm evening lamplight from the left, soft shadows. MOOD: festive, musical, warm, celebratory but elegant.

STYLE: A hand-painted Indian heritage illustration in fine gouache and transparent watercolour on warm ivory cotton-rag paper with a subtle visible paper grain. Delicate hand-applied gold-leaf highlights on edges, finials and ornament only, never flat metallic. Inspired by Tanjore and Mysore paintings and Mughal-Rajput miniatures, but with the restraint, calm negative space and soft edges of a modern luxury wedding stationery studio. Soft, warm, natural light with gentle atmospheric haze and soft shadows. Colour palette strictly limited to deep maroon (#651E2B), royal burgundy (#48141F), warm ivory (#FAF5EC), antique gold (#C5A15B), muted gold (#DCC58E), temple green (#354C3B) and soft rose (#E8D4CF), with small accents of muted marigold orange. Slightly desaturated, warm, elegant colour grade, consistent across the whole series. AVOID: people, faces, hands, deities' faces in close-up, text, letters, numbers, calligraphy, signatures, watermarks, logos, borders or frames around the image, glossy 3D render look, plastic textures, neon or saturated colours, lens flare, heavy vignettes, clutter, cartoon or clip-art style.

Output aspect ratio: exactly 4:5.
```

## 7. `ceremony-reception.png` · 4:5

**Where it appears:** Reception card (arch-shaped frame; top corners cropped)

```text
A refined evening still-life illustration for the wedding Reception, 4:5 portrait. SUBJECT: a tall, elegant brass deepam (samai) oil lamp with five lit wicks, surrounded by several small lit clay and brass diyas, loose white jasmine buds and a few soft blush roses, and a draped ivory silk fabric with a fine antique-gold zari border flowing across the foreground. Soft golden bokeh lights glow far in the background. COMPOSITION: the lamp is centred, its base in the lower third and its flames at about 55% height; everything sits in the lower two thirds of the frame. The top third is a soft gradient from warm ivory into a gentle dusky rose-burgundy, and the top-left and top-right corners stay empty because the image is cropped into an arch. LIGHT: warm, glowing lamplight as the main light source, soft and romantic. MOOD: elegant, celebratory, warm, the glow of an evening gathering.

STYLE: A hand-painted Indian heritage illustration in fine gouache and transparent watercolour on warm ivory cotton-rag paper with a subtle visible paper grain. Delicate hand-applied gold-leaf highlights on edges, finials and ornament only, never flat metallic. Inspired by Tanjore and Mysore paintings and Mughal-Rajput miniatures, but with the restraint, calm negative space and soft edges of a modern luxury wedding stationery studio. Soft, warm, natural light with gentle atmospheric haze and soft shadows. Colour palette strictly limited to deep maroon (#651E2B), royal burgundy (#48141F), warm ivory (#FAF5EC), antique gold (#C5A15B), muted gold (#DCC58E), temple green (#354C3B) and soft rose (#E8D4CF), with small accents of muted marigold orange. Slightly desaturated, warm, elegant colour grade, consistent across the whole series. AVOID: people, faces, hands, deities' faces in close-up, text, letters, numbers, calligraphy, signatures, watermarks, logos, borders or frames around the image, glossy 3D render look, plastic textures, neon or saturated colours, lens flare, heavy vignettes, clutter, cartoon or clip-art style.

Output aspect ratio: exactly 4:5.
```

## 8. `closing-mandap-desktop.png` · 16:9

**Where it appears:** Background of the final Blessings section on desktop (shown at ~70% opacity behind centred text)

```text
A wide 16:9 landscape illustration of a traditional Hindu wedding mandap at night, for the closing section of a wedding invitation. SUBJECT: a beautifully decorated mandap seen straight from the front: four slender, intricately carved pillars each wrapped in spiralling strings of white jasmine and muted marigold; a softly domed canopy draped in layered ivory and deep maroon silk with gold borders, swagged between the pillars; long marigold-and-jasmine garland strands hanging from the canopy edge; a small square agni kund in the centre with a gentle sacred flame; a low platform with rows of small lit brass diyas along its front edge; a pair of banana plants at the outer pillars. A delicate toranam of mango leaves and jasmine hangs across the very top edge of the image. COMPOSITION: the mandap is centred and occupies only the lower 50% of the image height; the upper half of the image is calm, dark, empty night with only a faint warm glow, reserved for text. The left and right edges fade softly into darkness. BACKGROUND: deep royal burgundy night, the warm gold glow of the fire and diyas spreading softly upward. MOOD: sacred, intimate, quietly joyful, a memorable final moment.

STYLE: A hand-painted Indian heritage illustration in fine gouache and transparent watercolour on warm ivory cotton-rag paper with a subtle visible paper grain. Delicate hand-applied gold-leaf highlights on edges, finials and ornament only, never flat metallic. Inspired by Tanjore and Mysore paintings and Mughal-Rajput miniatures, but with the restraint, calm negative space and soft edges of a modern luxury wedding stationery studio. Soft, warm, natural light with gentle atmospheric haze and soft shadows. Colour palette strictly limited to deep maroon (#651E2B), royal burgundy (#48141F), warm ivory (#FAF5EC), antique gold (#C5A15B), muted gold (#DCC58E), temple green (#354C3B) and soft rose (#E8D4CF), with small accents of muted marigold orange. Slightly desaturated, warm, elegant colour grade, consistent across the whole series. AVOID: people, faces, hands, deities' faces in close-up, text, letters, numbers, calligraphy, signatures, watermarks, logos, borders or frames around the image, glossy 3D render look, plastic textures, neon or saturated colours, lens flare, heavy vignettes, clutter, cartoon or clip-art style.

Output aspect ratio: exactly 16:9.
```

## 9. `closing-mandap-mobile.png` · 9:16

**Where it appears:** Background of the final Blessings section on phones

```text
A tall vertical 9:16 portrait illustration of a traditional Hindu wedding mandap at night, for the closing section of a wedding invitation viewed on a phone. SUBJECT: a decorated mandap seen straight from the front: carved pillars wrapped in spiralling white jasmine and muted marigold strings; a softly domed canopy of layered ivory and deep maroon silk with gold borders; hanging marigold-and-jasmine garland strands; a small agni kund in the centre with a gentle sacred flame; a row of small lit brass diyas along the platform edge. A delicate toranam of mango leaves and jasmine hangs across the very top edge. COMPOSITION: the mandap is centred and occupies only the lower 42% of the image height; everything above it, from 8% to 58% height, is calm, dark, empty night reserved for text. BACKGROUND: deep royal burgundy night with a warm golden glow rising from the fire and diyas. MOOD: sacred, intimate, quietly joyful.

STYLE: A hand-painted Indian heritage illustration in fine gouache and transparent watercolour on warm ivory cotton-rag paper with a subtle visible paper grain. Delicate hand-applied gold-leaf highlights on edges, finials and ornament only, never flat metallic. Inspired by Tanjore and Mysore paintings and Mughal-Rajput miniatures, but with the restraint, calm negative space and soft edges of a modern luxury wedding stationery studio. Soft, warm, natural light with gentle atmospheric haze and soft shadows. Colour palette strictly limited to deep maroon (#651E2B), royal burgundy (#48141F), warm ivory (#FAF5EC), antique gold (#C5A15B), muted gold (#DCC58E), temple green (#354C3B) and soft rose (#E8D4CF), with small accents of muted marigold orange. Slightly desaturated, warm, elegant colour grade, consistent across the whole series. AVOID: people, faces, hands, deities' faces in close-up, text, letters, numbers, calligraphy, signatures, watermarks, logos, borders or frames around the image, glossy 3D render look, plastic textures, neon or saturated colours, lens flare, heavy vignettes, clutter, cartoon or clip-art style.

Output aspect ratio: exactly 9:16.
```

## 10. `venue-placeholder.png` · 3:2

**Where it appears:** Venue section until the real venue photo is supplied (labelled 'Illustration' on the site)

```text
A serene 3:2 landscape illustration of a heritage South Indian courtyard prepared for a wedding, used as a placeholder for the venue. SUBJECT: an open stone courtyard surrounded by a colonnade of carved granite pillars with a large central arched opening; in the middle, an empty wedding mandap draped in ivory silk with soft maroon accents and strings of white jasmine; brass urli bowls with floating marigolds on the stone floor; banana plants in large brass pots at the entrance; a simple kolam pattern drawn in white rice flour on the floor in the foreground. COMPOSITION: eye-level, symmetrical, one-point perspective looking through the central arch toward the mandap, with generous calm space; the foreground floor is clear. LIGHT: soft late-afternoon golden light streaming in from the left, long gentle shadows from the pillars, a warm haze. MOOD: peaceful, gracious, welcoming, timeless.

STYLE: A hand-painted Indian heritage illustration in fine gouache and transparent watercolour on warm ivory cotton-rag paper with a subtle visible paper grain. Delicate hand-applied gold-leaf highlights on edges, finials and ornament only, never flat metallic. Inspired by Tanjore and Mysore paintings and Mughal-Rajput miniatures, but with the restraint, calm negative space and soft edges of a modern luxury wedding stationery studio. Soft, warm, natural light with gentle atmospheric haze and soft shadows. Colour palette strictly limited to deep maroon (#651E2B), royal burgundy (#48141F), warm ivory (#FAF5EC), antique gold (#C5A15B), muted gold (#DCC58E), temple green (#354C3B) and soft rose (#E8D4CF), with small accents of muted marigold orange. Slightly desaturated, warm, elegant colour grade, consistent across the whole series. AVOID: people, faces, hands, deities' faces in close-up, text, letters, numbers, calligraphy, signatures, watermarks, logos, borders or frames around the image, glossy 3D render look, plastic textures, neon or saturated colours, lens flare, heavy vignettes, clutter, cartoon or clip-art style.

Output aspect ratio: exactly 3:2.
```

## 11. `ornament-kalash.png` · 1:1

**Where it appears:** Small decorative icon above the RSVP heading (shown at 80px, blended onto a pale blush background)

```text
A small, single decorative ornament illustration, 1:1 square, centred on a completely plain, flat, pure warm-ivory (#FAF5EC) background with no texture, no shadow on the ground and no other objects. SUBJECT: one polished brass kalash pot with a rounded belly, five fresh green mango leaves fanned upward around its mouth, a whole brown coconut resting on top, and a thin string of small marigolds tied around its neck. Painted delicately with fine gold-leaf highlights and crisp, clean edges. COMPOSITION: the kalash is perfectly centred and fills only about 55% of the frame height, with generous empty ivory space on all sides. Front view, very slightly from above. MOOD: auspicious, simple, iconic.

STYLE: A hand-painted Indian heritage illustration in fine gouache and transparent watercolour on warm ivory cotton-rag paper with a subtle visible paper grain. Delicate hand-applied gold-leaf highlights on edges, finials and ornament only, never flat metallic. Inspired by Tanjore and Mysore paintings and Mughal-Rajput miniatures, but with the restraint, calm negative space and soft edges of a modern luxury wedding stationery studio. Soft, warm, natural light with gentle atmospheric haze and soft shadows. Colour palette strictly limited to deep maroon (#651E2B), royal burgundy (#48141F), warm ivory (#FAF5EC), antique gold (#C5A15B), muted gold (#DCC58E), temple green (#354C3B) and soft rose (#E8D4CF), with small accents of muted marigold orange. Slightly desaturated, warm, elegant colour grade, consistent across the whole series. AVOID: people, faces, hands, deities' faces in close-up, text, letters, numbers, calligraphy, signatures, watermarks, logos, borders or frames around the image, glossy 3D render look, plastic textures, neon or saturated colours, lens flare, heavy vignettes, clutter, cartoon or clip-art style.

Output aspect ratio: exactly 1:1.
```
