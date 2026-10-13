# Pouya's digital garden

A static solarpunk portfolio built with React, TypeScript, and Vite. CSS Modules and shared CSS variables define the visuals; Motion handles animation and Phosphor supplies icons. React Three Fiber, Three.js, and Drei are installed for future 3D scenes.

## Local development

Use Node.js 22.12 or newer:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. Run `npm run lint` for linting, `npm run typecheck` for TypeScript checks, and `npm run build` to generate the static site in `dist/`. Use `npm run preview` to inspect that production build.

## Pages and content

The five navigation pages live in `src/pages/home`, `projects`, `blogs`, `about`, and `contact`. Each project or blog post has its own slug directory with typed content. Projects use dedicated page components; add their content to the project collection and register their detail route in `App.tsx`.

The project collection contains Robust Persian ASR, an MS thesis case study with Whisper Small and Medium, multi-condition training, archived main-study results, and links to the repository and published Persian Whisper checkpoints. It also includes TorobRent, a rental discovery product built for Torob’s AI Product Engineer job challenge. Its dedicated page at `#/projects/torobrent` covers the challenge, actual application screenshots, Django/React architecture, source extraction, and engineering decisions. Blog samples remain separate from the project collection. The Contact page opens a prefilled draft in the visitor’s email app and also supports downloading a text draft. Sending happens in the email app. Contact details from the supplied reference live in `src/pages/contact/data.ts`.

Shared components live in `src/components`. Fonts are bundled locally. Shared assets belong in `src/assets`, and future generated images belong in `src/assets/images/generated`. Keep matching `<name>-light` and `<name>-dark` assets together and select the appropriate variant using `useTheme`.

The Home page recreates the supplied solarpunk reference with separate landscape and transparent foreground layers, each with matching day and night assets. Motion values drive pointer and scroll depth without React renders; CSS supplies subtle lake movement and drifting particles. Visitors can pause the scene, and reduced-motion preferences disable it automatically. The featured project is Robust Persian ASR, with its own theme-aware thumbnail and a link to `#/projects/robust-persian-asr`. The former Persian ASR and robust speech recognition URLs redirect to this case study. Other mock projects have been removed.

The case study centers the main Whisper Small and Medium research runs, including standard training, multi-condition training, and the IranSeda data extension. Results include aggregate and per-dataset WER/CER across five test sets, including the unreleased Whisper Small dual-view fusion model (17.64% aggregate WER, 7.85% CER). Dual-view fusion also has an interactive architecture explanation. Scores come from archived research runs; model cards document the published checkpoint versions. Image prompts and source notes are recorded in `src/assets/images/generated/robust-persian-asr-prompts.md`.

The optimized WebP assets and generation notes live in `src/assets/images/generated/`. The scenery is decorative; all text, navigation, and project controls are semantic HTML.

Project descriptions have two presentations, recorded in each project’s `presentation` field. Research projects keep detailed case studies for methods, experiments, and results. Implementation-heavy app projects use the reusable `AppProjectShowcase` component: a compact desktop overview with real application screenshots, a short introduction, role and stack, icon-led features, and a small architecture diagram. App projects with existing product imagery use that imagery for their preview and collection thumbnail. Generated visuals may support the background, but do not replace product screenshots.

TorobRent uses the app presentation with five fresh captures from the running local application, optimized in `src/assets/images/torobrent/` with provenance recorded there. Visitors can switch among search, home, property comparison, submission review, and operator views, and enlarge screenshots without scrolling to a separate tour. App previews preserve each complete capture without cropping. Its 2026 year appears above the role. A decorative solarpunk residential hero backdrop follows day/night mode; matching assets and generation prompts live in `src/assets/images/generated/torobrent-hero-*`. Screenshots keep their original application colors and remain the collection thumbnails. The main information fits together on a typical desktop screen and stacks naturally on mobile. AI is described as optional, operator-requested extraction-profile repair; matching is deterministic and operator-reviewed.

## Static hosting

The portfolio is deployed to [GitHub Pages](https://pooya79.github.io/portfolio/). Every push to `main` runs `.github/workflows/deploy.yml`: install the locked dependencies with Node.js 24, lint, check TypeScript, build, and publish `dist/`. Deployment only runs after all build checks pass. The workflow can also be started manually from the repository's Actions tab. It uses GitHub's built-in token; no deployment secret is needed.

For initial setup, select **GitHub Actions** under **Settings → Pages → Build and deployment → Source**. GitHub Pages requires an eligible plan when the repository is private. The deployed portfolio is publicly accessible.

Vite uses relative asset URLs (`base: './'`), so the same build works at `/portfolio/`, a domain root, or another subdirectory. Hash-based routes work without server rewrite rules, including directly opening or refreshing project and blog links. To deploy elsewhere, upload the contents of `dist/` to a static host.

The contact form remains entirely in the browser: it opens a prefilled email draft or downloads a text draft. GitHub Pages does not send or store form submissions; the visitor sends the message from their email app.

## Theme and accessibility

On opening the site, the loader waits for the entry page's website artwork to download and decode, including its decorative backgrounds. Cached artwork gets a 150 ms grace period to avoid flashing the loader; once shown, it stays for at least one second. Slow requests offer an entry button after three seconds and a fifteen-second fallback. The loader does not return during navigation or theme changes.

After entry, a low-priority queue warms the other pages' scenery and photos, with at most two requests scheduled at once. It selects responsive sizes for the current viewport and only the active theme. Changing themes starts warming that theme. Project screenshots, gallery thumbnails, previews, and diagrams are excluded from both the entry wait and background queue; they load normally wherever displayed. The explicit artwork list lives in `src/components/websiteImages.ts` and should be updated when adding website scenery.

Browser regression checks cover timing, slow and failed images, showcase exclusions, navigation, theme switching, mobile sizes, and cached entry. With the dev server running, use Playwright CLI to open it and run the checks:

```sh
npx --yes --package @playwright/cli playwright-cli open http://127.0.0.1:5173/ --browser chrome
npx --yes --package @playwright/cli playwright-cli run-code --filename tests/image-loading.browser.js
```

The theme follows the device preference until a visitor chooses Day or Night. Manual choices persist in local storage when available. CSS variables control all themed surfaces and botanical visuals. Animations honor reduced-motion preferences, and navigation includes a skip link and visible keyboard focus.
