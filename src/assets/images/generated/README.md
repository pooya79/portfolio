# Solarpunk scene assets

Generated with the built-in ImageGen tool using the supplied `main_reference.png`, then encoded as WebP without changing dimensions or composition. Each image is 1672 × 941. Foreground files retain genuine alpha transparency. Keep all four assets together. Original PNG outputs remain in the tool's generated-image directory.

| Layer | Day | Night |
| --- | --- | --- |
| Landscape | `solarpunk-landscape-light.webp` | `solarpunk-landscape-dark.webp` |
| Transparent foreground | `solarpunk-foreground-light.webp` | `solarpunk-foreground-dark.webp` |

The design follows the supplied reference: a full-bleed cinematic scene, a left-aligned three-line headline and one floating project card. Native CSS and the existing Motion library implement the aesthetic. Design variance: 7; motion intensity: 7; visual density: 3. Motion establishes depth and acknowledges navigation and carousel changes.

## Prompt set

- Landscape day: remove all interface text, logo, navigation, buttons, featured-project card, the man, balcony, railing, left vines and corner leaves. Reconstruct the obscured landscape, preserving the exact solar architecture, mountains, lake, bridge, boats, airship, framing, positions and daytime lighting. No text or UI.
- Foreground day: isolate the backpack man, balcony, railing, left vine-covered wall and bottom foliage on a transparent full-size canvas. Preserve the reference's exact subject positions, perspective and lighting. Remove every background element and all text and UI. Remove engraved planter text.
- Landscape night: edit the clean day landscape with lighting changes only. Preserve dimensions and composition. Replace sun with moon in the same position, use deep navy sky, delicate stars, silvery mountains and warm city lights with reflections. No cyberpunk/neon, no foreground or UI.
- Foreground night: relight the transparent day foreground using cool moonlight and soft warm city bounce. Preserve the man, pose, outlines, positions, canvas and transparency. No added backdrop or text.

## Integration

The homepage background now uses `solarpunk-clouds-light.webp` and `solarpunk-clouds-dark.webp` through `heroLandscapeAssets`. Both are 1672 × 941 localized ImageGen edits of the original landscapes, encoded as WebP. A smooth ivory cloud veil in the upper-left day sky creates quiet space behind the introduction; the matching night treatment uses low-contrast navy clouds. The original framing, city, lake, boats, and mountain arrangement remain closely matched. Foreground layers and project thumbnails retain their original assets.

Cloud edit prompts: preserve the source composition and objects; add a broad feathered cloud bank across the left sky and gently soften left mountain detail with atmospheric mist. Keep the city and water detailed. For night, match the day cloud placement using deep navy tones suitable for light text, retaining the original moon and warm city lights. No text or UI.

`src/pages/home/sceneAssets.ts` selects both landscape and foreground by the shared theme. The project thumbnail uses the original themed landscape. Motion values handle scene depth, and CSS handles ambient particles.

`SceneImage.tsx` adds localized texture displacement to the existing artwork: a slow airship drift, small lake ripples, and gentle wind on the isolated lower-right foliage (the left columns and their vines are excluded). Source-image coordinates keep these effects aligned through responsive cropping; no additional generated artwork is needed. The airship moves within a soft sky region rather than using a separate cutout. The person, architecture, and railing are excluded from these local effects. Rendering is capped at 30fps and 1.5 device pixel ratio, and stops when paused, offscreen, or the document is hidden. Reduced-motion users receive static images; image fallbacks also cover unavailable WebGL or context loss.

## About page garden city

The About page uses a compact panorama above the journey, education, tech stack, philosophy, and interests. It preserves the shared navigation, DM Sans / Outfit typography, and green palette. Native CSS implements the supplied aesthetic; design variance 6, motion intensity 5, visual density 5. Reveal animations establish content hierarchy; image and icon hover motion provides feedback. Reduced motion is respected.

Generated with the built-in ImageGen tool using the supplied About-page reference. Day and night preserve the same 1660 × 948 composition. WebP encoding and smaller 830 × 474 responsive copies reduce transfer size without altering the artwork. All versions switch with the shared theme in `src/pages/about/sceneAssets.ts`.

| Asset | Day | Night |
| --- | --- | --- |
| Hero | `about-garden-light.webp` | `about-garden-dark.webp` |
| Responsive hero and thumbnails | `about-garden-small-light.webp` | `about-garden-small-dark.webp` |

The other thumbnails reuse the existing paired landscape and workshop assets. All biography, dates, education, and skills are mock content in `src/pages/about/data.ts`.

### About prompt set

- Day (precise-object-edit): create only the clean environmental raster art from the supplied About reference. Remove navigation, About text, quote, building lettering, and lower content cards. Reconstruct and extend the upper solarpunk city to a wide landscape canvas. Match lush optimistic architectural style: ivory organic terraces over a serene river, planted balconies, glass geodesic botanical dome at center right, alpine mountains, blue sky, warm daylight, green gardens, and soft blurred corner leaves. Keep the city strongest across center and right and important subjects in the center vertical region for a short panoramic banner. No baked-in white wash, text, UI, watermarks, or portraits.
- Night (lighting-weather): edit the clean day asset, changing only lighting, sky, and atmosphere. Preserve canvas dimensions, framing, architecture, glass dome, mountains, river, foliage, and camera perspective. Use deep navy sky with delicate stars, cool mountain light, warm building windows and dome interior, subtle amber garden lights, and river reflections. Keep greenery visible and natural detail readable. No new buildings, neon, text, UI, or watermarks.

## Contact page terrace

The Contact page follows the supplied form, connection links, and quote layout, with a shorter 340px desktop hero (365px on wide screens) and a 125px mobile image. It keeps the existing navigation, locally bundled DM Sans / Outfit typography, olive accent, CSS Modules, and shared theme. Design variance 6, motion intensity 5, visual density 4. Staggered reveals establish the reading order; button arrows, link feedback, and a subtle quote-image hover acknowledge interaction. Reduced motion disables movement.

Generated using the built-in ImageGen tool. Day and night are stored together as 2172 × 724 WebP assets, with 1086 × 362 responsive copies. The night output was one pixel narrower and normalized to the day dimensions during encoding. The hero and quote image both select the corresponding theme through `src/pages/contact/sceneAssets.ts`.

| Asset | Day | Night |
| --- | --- | --- |
| Panorama | `contact-terrace-light.webp` | `contact-terrace-dark.webp` |
| Responsive panorama / quote | `contact-terrace-small-light.webp` | `contact-terrace-small-dark.webp` |

### Contact prompt set

- Day (stylized-concept): use the supplied Contact screenshot as a style reference for a new clean 3:1 environmental panorama. Replace the tall pavilion with a low gently curving pergola on the right, hanging vines, planted terraces, curved ivory seats, low round table and laptop. Overlook a serene lake, alpine mountains, sustainable organic city, and subtle rooftop solar panels. Pale blue sky, warm sun, natural greenery, open left third for live HTML copy. Keep key subjects in the middle vertical band for a shallow banner. No holographic globe, tall foreground columns, people, text, UI, logo, watermarks, or baked-in white overlays.
- Night (lighting-weather): edit the day artwork, changing only lighting, sky and atmosphere. Preserve the canvas ratio, camera, architecture, plants, lake, mountains, city, solar panels, pergola, seating, laptop, table, and subject positions. Deep blue moonlit sky with subtle stars, cool readable mountains, warm garden and pergola light, softly illuminated windows and lake reflections, visible natural greenery. No new objects, people, text, UI, watermarks, neon or cyberpunk.

### Visual analysis and integration

The panorama has a low horizontal terrace silhouette, with the seating and vine-covered pergola across the right half and open sky and lake on the left. A soft theme-colored HTML wash creates contrast for the two-line 40–58px headline and 14px introduction. Beneath it, unequal columns give the form the most space, followed by contact channels and a shorter cropped view of the same themed artwork above a Georgia italic quote. Light panels use fine green-gray borders, 10px input corners, 18px panel corners, and pill-shaped olive actions; night tokens retain the same hierarchy. All interface text and controls are HTML.

## Navigation identity

`navigation-symbols-light.webp` and `navigation-symbols-dark.webp` are matching 2172 × 724 transparent ImageGen sprite sheets, losslessly encoded as WebP. Three equal cells contain a diagonal leaf with a curved accent and open central vein, a fine-rayed sun, and a crescent with a small star. The supplied navbar reference guided the silhouettes. Day uses charcoal green and olive; night uses ivory and sage. Original PNGs remain in the generated-image output directory.

Prompt direction: follow the reference leaf and fine sun, maintain clean flat shapes and transparency, omit lettering and decoration. Generate the night pair by preserving shapes, dimensions, and positions while changing the palette.

`Shell.tsx` selects the sheet using the shared theme. The visible sun/moon indicates the current theme; the accessible button label describes the switch action. The Georgia wordmark and navigation typography are preserved. The homepage header has no background, blur, frame, or bottom rule; inner pages retain a translucent ivory/forest surface. The tagline sits left of the theme icon with a divider between them, and both use the same offset on every page. A stable scrollbar gutter prevents route changes from shifting the navbar. Mobile keeps all five links on a second row. Reduced motion and reduced transparency retain their existing fallbacks on inner pages.

## Inner-page edge foliage

Generated with the built-in ImageGen tool. `edge-foliage-light.webp` and `edge-foliage-dark.webp` are matching 1024 × 1536 transparent botanical assets, encoded as WebP with alpha preserved. The night image is a lighting edit of the day image, preserving leaf and stem positions and canvas dimensions.

Prompt set:
- Day (stylized-concept): a slender airy climbing vine with ivy and small fern leaves entering from the left edge of a vertical 2:3 transparent canvas. Three irregular sparse clusters, curved stems, olive and sage greens, fine veins, warm soft daylight, semi-realistic painterly solarpunk style. Leaves confined to the left 55%, with transparent gaps and an empty right side. No pots, architecture, ground, text, people, frame, glow, or drop shadow.
- Night (lighting-weather edit of day): preserve the exact 1024 × 1536 canvas, every leaf, stem, silhouette, location, scale, and transparent gap. Change only lighting and color to deep forest and muted blue-green with silver moonlit edges and veins, plus subdued warm bounce on a few tips. No new objects, sky, stars, neon, or filled background. Preserve alpha transparency.

`src/components/EdgeFoliage.tsx` selects the matching asset through the shared theme. `Shell.tsx` renders it only outside Home, including project and blog detail routes. Both edges reuse the same artwork, mirrored and vertically offset. The fixed decorative layer is hidden from assistive technology and ignores pointer events. Narrow responsive sizing keeps foliage in the outer margins; mobile uses a small static detail. No animation is added, so reduced motion remains static.
