// Regenerates docs/IMAGE_PROMPTS.md from scripts/image-prompts.json.
import { readFileSync, writeFileSync } from "node:fs";

const { style, images } = JSON.parse(readFileSync("scripts/image-prompts.json", "utf8"));
const order = ["hero-gopuram-desktop", "hero-gopuram-mobile", "ceremony-vivah", "ceremony-haldi", "ceremony-mehendi", "ceremony-sangeet", "ceremony-reception", "closing-mandap-desktop", "closing-mandap-mobile", "venue-placeholder", "ornament-kalash"];
const sorted = order.map((id) => images.find((i) => i.id === id)).filter(Boolean);

let md = `# Image prompts — Hindu wedding invitation

${sorted.length} images. Each prompt below is complete and ready to paste into the Gemini app
(choose the **Nano Banana Pro** image model). The shared style block is already included in every prompt.

## How to generate

1. **Start with the hero desktop image** (#1). Regenerate until you love it — it sets the look for everything else.
2. **For every following image, attach the hero image you chose** and add this line before the prompt:
   \`Match the painting style, paper texture, colour palette and lighting of the attached image exactly.\`
   This keeps all ${sorted.length} images looking like one hand-painted series.
3. Download each result and save it as **\`public/images/generated/<file name>.png\`** using the exact file name shown.
4. When done (or after any batch), run:
   \`\`\`bash
   npm run images:optimize && npm run build
   \`\`\`
   Each image replaces the built-in line-art for that slot. Skip any image you don't want — the line-art stays.

## Quality checklist (reject and regenerate if any fail)

- No people, faces, hands, text, letters or watermarks anywhere.
- The **empty areas** described in the prompt really are empty — names and text sit there on the site.
- Colours stay within maroon / burgundy / ivory / gold / temple green / soft rose. No bright saturated orange, pink or blue.
- Looks hand-painted (gouache, paper grain), not a glossy 3D render or a photo.
- The aspect ratio is right. If Gemini ignores it, add *"Output in exactly ${"${ratio}"} aspect ratio"* again at the end.

---
`;

sorted.forEach((img, n) => {
  md += `
## ${n + 1}. \`${img.id}.png\` · ${img.aspectRatio}

**Where it appears:** ${img.usedIn}

\`\`\`text
${img.prompt}

${style}

Output aspect ratio: exactly ${img.aspectRatio}.
\`\`\`
`;
});

writeFileSync("docs/IMAGE_PROMPTS.md", md.replace("${ratio}", "the required"));
console.log(`docs/IMAGE_PROMPTS.md — ${sorted.length} prompts`);
