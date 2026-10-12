# Robust Persian ASR artwork and case study

Generated with the built-in ImageGen tool. The listening garden is a visual metaphor for speech research, not a photograph of a facility or a screenshot of the thesis software. Only the clean artwork pair is integrated; generated UI references were used for design exploration.

## Final assets

| Use | Day | Night | Dimensions |
| --- | --- | --- | --- |
| Hero / large listing image | `robust-persian-asr-light.webp` | `robust-persian-asr-dark.webp` | 1536 × 1024 |
| Responsive thumbnail | `robust-persian-asr-small-light.webp` | `robust-persian-asr-small-dark.webp` | 768 × 512 |

Files live together in this directory. The full-size pair was encoded as WebP at quality 87; the responsive pair uses quality 84. Both dimensions and framing match. The responsive variants are resizes of the final artwork, not separate generations. `projectImages.asr` and `projectImageSources` select the correct theme and size for Home, Projects, and the dedicated case study.

## Final prompts

### Day

Use case precise-object-edit. This is a design reference; extract its environmental scene into a standalone website hero ARTWORK, 1536x1024 horizontal, DAY LIGHT variant. Remove ALL text, typography, Persian wall writing, navbar, branding, buttons, labels, white wash and interface. Reconstruct the left half as the same solarpunk Persian-inspired botanical acoustic pavilion; wide shot, expressive curved ivory acoustic fins like an audio waveform across center-right, elegant central brass acoustic receiver, ferns, jasmine, intricate muted Persian geometric ceramic details, glass solar canopy and shallow reflecting pool. Keep the distinctive right-side subject and pool recognizable, same ivory sage brass palette and soft warm daylight. Make the pavilion focal point centered at 65% horizontally so it crops beautifully as a thumbnail; left 30% quiet pale architecture and foliage for text overlay in code. No people, text, UI, logos or watermark. Premium photoreal architectural illustration; a metaphor for speech research, not a real facility.

### Night

Use case lighting-weather. Edit target: this finished DAY artwork for Robust Persian ASR. Create its matching NIGHT DARK variant. Preserve EXACT same canvas dimensions 1536x1024, composition, lens, ivory acoustic waveform fins, brass listening horn, all architecture positions and details, jasmine vines, ferns, canopy, geometric ceramic details, steps and reflecting pool. Change ONLY lighting and atmosphere: deep forest green and subdued blue night, silver moonlight on ceramic fins and leaves, gentle warm practical lights under steps and along roof edges reflected in pool, stars very faint where sky visible. Keep architectural subject visible and beautiful in a dark themed website and thumbnail. Premium believable architectural lighting, never neon or cyberpunk. No text, Persian writing, watermark, people, branding or interface. Do not alter framing, subject, or geometry.

## Design translation

Preserve the existing React, CSS Modules, Motion, Phosphor, DM Sans/Outfit, navigation, and shared theme. Design variance 7, motion intensity 5, visual density 3. The user reference informs the environmental hero and section navigation; the existing site controls the brand treatment.

Three standalone section references were generated before implementation: hero, method, and results/resources. The hero reference established a right-side architectural focal point, a pale-to-transparent left wash, large sans display type, sage supporting text, and rounded filled/outline actions. It included malformed extra title text, which was discarded. The final headline is the user's project name across two lines. The method reference established an open signal-to-encoder-to-fusion-to-decoder diagram, three unboxed process columns, and an original/dual-view switch. The results reference established prominent numbers, dataset selection, a compact comparison table, and a quieter resource band. All displayed numbers and technical descriptions come from the thesis sources, not the generated references.

The four main components are the listening-garden hero, interactive architecture diagram, main-model result comparison, and repository/model resources. Reveal motion establishes reading order; hover/focus feedback identifies actions. Reduced motion disables transitions and smooth scrolling.

## Content sources

- Local `/home/mint/MS-Thesis/README.md`: project scope, feature fusion, waveform bridging, data workflows, and published checkpoint URLs.
- Local `/home/mint/MS-Thesis/Thesis/front/abstract-eng.tex` and `Thesis/chapters/results.tex`: research scope and main findings.
- Local `report/whisper/metrics.json`, `report/whisper-deg/metrics.json`, `report/whisper-medium/metrics.json`, `report/whisper-iranseda/metrics.json`, and `report/whisper-fusion-compact/metrics.json`: main Small/Medium and unreleased fusion runs, aggregate and per-dataset WER/CER, evaluated sample counts, and skips.
- [GitHub source](https://github.com/pooya79/MS-Thesis) and [main results reports](https://github.com/pooya79/MS-Thesis/tree/main/report).
- [Persian Whisper Small](https://huggingface.co/Pooya-Fallah/whisper-small-fa) and [Persian Whisper Medium](https://huggingface.co/Pooya-Fallah/whisper-medium-fa).

The main results are Whisper Small standard training (23.27% aggregate WER), Small multi-condition training (17.83%), Medium (14.36%), and Small multi-condition plus IranSeda (17.22%). The standalone runs evaluated 21,848 utterances across five datasets and skipped six over-length labels. The unreleased Small dual-view fusion model reached 17.64% WER and 7.85% CER on 21,854 utterances; that sample-count difference is disclosed in the page. The evaluation selector includes the aggregate and all five individual datasets. The Tiny ablation study is not included in the portfolio page. Scores describe the archived research runs, rather than claiming to verify the exact published checkpoint exports. The diagram switch explains the complementary Small fusion system; it is not browser inference. No backend or remote transcription service is introduced.

## Verification

The original visual checks covered both themes, responsive artwork, Home and Projects thumbnails, navigation, and desktop/mobile layouts. After correcting the research scope, build, ESLint, and browser checks validate the main Small/Medium aggregate results, all dataset options, the five model rows, including unreleased fusion, absence of Tiny ablation content, and mobile layout.
