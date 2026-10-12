# Torob Agent visuals

## Workflow diagram

`torob-agent-workflow-light.svg` and `torob-agent-workflow-dark.svg` are original, code-authored architecture diagrams at 1536 × 1024. Both preserve the same labels, geometry, and connections. The palette changes with the portfolio theme. They are diagrams, not screenshots or official Torob artwork.

The simplified paths were checked against [pooya79/torob-agent](https://github.com/pooya79/torob-agent), revision `f0c2777a8167a43c32bfc95d3437f32cbb8f38a9`: `src/api/routes/chat.py`, `src/chatbot/agent.py`, `src/clarify_agent/agent.py`, `src/image_agent/agent.py`, and `src/services/`. Text is routed between the default and clarification agents; image input uses a separate agent. Retrieval covers catalog products, offers, and shops. Responses may contain text, product identifiers, or seller identifiers. The diagram omits endpoint validation, sanity-check responses, and internal tool calls for readability.

The year, Torob Turbo name, Quera hosting, Torob sponsorship, and second-place result were supplied by the project author.

## Decorative background

Generated with the built-in `image_gen` tool, then converted to WebP at quality 87. Matching 1536 × 1024 pair:

- `torob-agent-hero-light.webp`
- `torob-agent-hero-dark.webp`

These are conceptual solarpunk illustrations, not product screenshots, a contest logo, or evidence of an actual deployment.

### Day prompt

Use case: illustration-story. Asset type: wide decorative hero background for a developer portfolio project called Torob Agent, a catalog search and reasoning agent. Primary request: a premium solarpunk botanical research pavilion where an elegant small ivory and sage robot studies a neatly arranged collection of everyday product objects, a kettle, small desk lamp, headphones, and a plant pot, on a wood and ceramic workbench, beside a discreet screen with abstract connected nodes (no text). Composition: horizontal landscape 1536 x 1024. Robot, objects, shelves and technology on the right half; airy organic architecture and softer open space on the left for webpage text overlay. Preserve quietness: no central title, no typography, no branding, no logos, no watermark. Style: cinematic editorial architectural illustration with realistic materials and abundant lush greenery, refined and optimistic, consistent with a premium green portfolio. Lighting: bright soft daylight through curved greenhouse glass. Palette: ivory, sage and deep green, natural wood. Outside: a subtle renewable-energy garden. No fabricated application UI.

### Night edit prompt

Use case: lighting-weather. Edit the supplied solarpunk Torob Agent pavilion illustration to a matching nighttime version for dark theme. Preserve precisely the same composition, architecture, robot pose and ivory/sage materials, everyday objects (kettle, small desk lamp, headphones, plant), workbench, foliage, screen and garden, framing and dimensions 1536 x 1024. Change only lighting, sky and atmosphere: deep moonlit green and blue night outside with subtle stars, warm gentle practical lighting from the desk lamp and pavilion shelves, restrained screen glow. Keep robot and objects clearly readable. No added typography, logos, watermark, UI, objects, or layout changes.

The night image used the day image as its edit target. Composition and dimensions are preserved across the pair.
