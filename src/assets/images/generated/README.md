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

`src/pages/home/sceneAssets.ts` selects both landscape and foreground by the shared theme. The lake uses a softly masked duplicate of the landscape, so no extra generated assets are required. The project thumbnail uses that same themed landscape. Motion values handle scene depth, and CSS handles ambient lake movement and particles. Reduced motion and Pause motion stop the scene.
