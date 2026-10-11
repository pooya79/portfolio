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

The five navigation pages live in `src/pages/home`, `projects`, `blogs`, `about`, and `contact`. Each project or blog post has its own slug directory with a typed content export. Add that export to the corresponding `data.ts` collection to make it appear in the listing and detail route.

The included projects and articles are labeled samples. Replace them with real portfolio content. The Contact page opens a prefilled draft in the visitor’s email app and also supports downloading a text draft. Sending happens in the email app. Contact details from the supplied reference live in `src/pages/contact/data.ts`.

Shared components live in `src/components`. Fonts are bundled locally. Shared assets belong in `src/assets`, and future generated images belong in `src/assets/images/generated`. Keep matching `<name>-light` and `<name>-dark` assets together and select the appropriate variant using `useTheme`.

The Home page recreates the supplied solarpunk reference with separate landscape and transparent foreground layers, each with matching day and night assets. Motion values drive pointer and scroll depth without React renders; CSS supplies subtle lake movement and drifting particles. Visitors can pause the scene, and reduced-motion preferences disable it automatically. The featured-project carousel links to the three project pages. The speech recognition entry is a clearly labeled outline based on the reference.

The optimized WebP assets and generation notes live in `src/assets/images/generated/`. The scenery is decorative; all text, navigation, and project controls are semantic HTML.

## Static hosting

The portfolio is deployed to [GitHub Pages](https://pooya79.github.io/portfolio/). Every push to `main` runs `.github/workflows/deploy.yml`: install the locked dependencies with Node.js 24, lint, check TypeScript, build, and publish `dist/`. Deployment only runs after all build checks pass. The workflow can also be started manually from the repository's Actions tab. It uses GitHub's built-in token; no deployment secret is needed.

For initial setup, select **GitHub Actions** under **Settings → Pages → Build and deployment → Source**. GitHub Pages requires an eligible plan when the repository is private. The deployed portfolio is publicly accessible.

Vite uses relative asset URLs (`base: './'`), so the same build works at `/portfolio/`, a domain root, or another subdirectory. Hash-based routes work without server rewrite rules, including directly opening or refreshing project and blog links. To deploy elsewhere, upload the contents of `dist/` to a static host.

The contact form remains entirely in the browser: it opens a prefilled email draft or downloads a text draft. GitHub Pages does not send or store form submissions; the visitor sends the message from their email app.

## Theme and accessibility

The theme follows the device preference until a visitor chooses Day or Night. Manual choices persist in local storage when available. CSS variables control all themed surfaces and botanical visuals. Animations honor reduced-motion preferences, and navigation includes a skip link and visible keyboard focus.
