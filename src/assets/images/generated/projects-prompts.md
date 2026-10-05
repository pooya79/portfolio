# Projects image assets

Generated with the built-in ImageGen tool. Both pairs are encoded as WebP at 1672 × 941 pixels. The audio night output was normalized from 1671 × 941 to the matching pair dimensions during encoding.

Responsive derivatives are 836 × 471, encoded at WebP quality 82. They preserve the full compositions and use matching `<subject>-small-light.webp` / `<subject>-small-dark.webp` names. The existing landscape has the same paired derivatives. `srcSet` and `sizes` let phones load smaller images.

| Subject | Day | Night |
| --- | --- | --- |
| Invention studio | `projects-workshop-light.webp` | `projects-workshop-dark.webp` |
| Audio research desk | `projects-audio-light.webp` | `projects-audio-dark.webp` |

The studio is the full-width Projects hero and supplies project thumbnails. The audio pair provides a speech-research visual. Additional city thumbnails reuse the existing paired solarpunk landscape. The shared theme selects the corresponding day/night asset in the collection and project overviews.

The design preserves the supplied reference's open hero, three-column project collection, category controls, soft green palette, and narrow sidebar. Design variance: 6; motion intensity: 5; visual density: 4. Motion reveals hierarchy, shows filter/reorder state changes, and provides hover and focus feedback. Reduced motion disables movement.

## Exact prompt set

### Studio day

Use case: stylized-concept. Asset type: wide cinematic website Projects page hero background, 1536 by 864 landscape. Generate an exceptionally beautiful solarpunk invention studio, a real place for creating AI systems and useful products. Organic pale limestone and curved timber pavilion, open greenhouse windows, trailing plants, fern-filled courtyard, rooftop solar glass and a lush livable city in the distance. Main subject at center-right: a beautifully crafted workbench with an open laptop showing subtle abstract code-like lines (no legible text), a small elegant cream-colored robot prototype, an intricate scale model of green housing and a solar-powered sensor prototype. Tangible creative work, sophisticated believable architecture, warm sunlight and serene atmosphere, richly detailed premium architectural concept rendering with realistic materials, not cartoon. Composition: wide panorama with lots of quiet softly lit pale wall and out-of-focus leaves on LEFT THIRD for website heading; technology workbench occupies central-right middle, right edge has leaves and garden. Eye-level camera, a clear uncluttered focal point, cream and forest green with clear blue sky, soft golden day lighting. No people, no logos, no watermark, no typography, no UI overlay. Output ONE standalone daylight image. Save image result for project asset.

### Studio night

Use case: lighting-weather. Edit target: the generated solarpunk invention studio day image. Create its matching DARK/NIGHT version for website dark mode. Preserve EXACT subject, camera, composition, framing, pixel dimensions (1672 by 941), objects and placement: curved timber solar greenhouse, pale left wall and blurred foreground leaves, workbench laptop, robot, sensor, green housing scale model, city and waterfalls. Change ONLY lighting/time/atmosphere. Beautiful deep blue-green moonlit sky with subtle stars, silver moonlight on foliage and pavilion, warm gentle task lights over the workbench, tiny warm city window lights. Laptop and robot eyes softly illuminated, not neon, serene welcoming optimistic nighttime studio. Left wall should be dark forest shadow for light text. Preserve visible natural material detail and keep workbench clearly readable. No new objects, no text, no logos, no watermark. One full-size standalone night image.

### Audio day

Use case: stylized-concept. Asset type: landscape editorial project thumbnail 1672 by 941. Generate a close, beautiful view of an audio research desk in the SAME visual world as a solarpunk greenhouse invention studio: cream limestone arches, light oak wood, trailing vines, ferns, distant green city beyond a curved window. Main subject: sculptural small brushed-silver studio microphone, cream headphones and open slim laptop showing a green audio waveform and subtle abstract spectrogram, no readable text. On the desk a closed notebook and a potted fern. Bright soft DAYLIGHT, natural forest green and cream colors, premium photoreal architectural concept rendering, calm uncluttered composition, close-up three quarter view, desk fills foreground, believable equipment and rich tactile materials, no people, no logos, no text, no watermark. One standalone image.

### Audio night

Use case: lighting-weather. Edit the audio research desk day image to its matching night/dark mode asset. Preserve exact dimensions 1672 by 941, composition, camera, all objects, microphone, headphones, laptop, notebook, greenery, architecture and city positions. Change only atmosphere and lighting: dark blue-green sky, cool moonlight, warm desk lamp illuminating wood and microphone, softly lit green waveform screen, distant city windows warm, serene night in a lush solarpunk greenhouse. Rich detail, no neon or cyberpunk, no new objects, no logos or text, no watermark. One full-size night image.
