## Portfolio requirements

### Architecture and pages

- Build the portfolio with React as a static website. Keep content and behavior in the frontend; do not introduce a backend or server-dependent features.
- The main navigation has five pages, in this order: Home, Projects, Blogs, About, Contact.
- Give each main page its own directory. Give every individual project and blog post its own directory within its corresponding page directory, using a stable descriptive slug.
- Build a unique, dedicated page for each portfolio project, with content and design tailored to that project. Consistency between project pages is preferred but optional; each project may have its own layout and visual treatment.
- Keep page-specific components and content with their page; put reusable components in `src/components/` and shared assets in `src/assets/`.

Use this directory convention when implementing the site:

```text
src/
  pages/
    home/
    projects/
      <project-slug>/
    blogs/
      <blog-slug>/
    about/
    contact/
  components/
  assets/
    images/
      generated/
```

### Visual direction and motion

- Use a solarpunk visual identity: lush greenery, renewable technology, organic architecture, and an optimistic relationship between nature and technology. Make solarpunk imagery a prominent part of the portfolio.
- Design expressive animations, interactive elements, and motion across views, including page transitions and hover or focus feedback. Keep motion responsive and content readable, and respect `prefers-reduced-motion`.

### Generated images and dark mode

- Every image generated for the website must include a matching light/day version and a dark/night version. Preserve the subject, composition, and dimensions across the pair while adapting lighting and atmosphere to the theme.
- Store both versions together in `src/assets/images/generated/`, using matching names such as `<name>-light.webp` and `<name>-dark.webp` (or the actual output format).
- Render the light/day asset in light mode and the dark/night asset in dark mode. An image task is complete only when both variants exist; when integrating them, verify that switching themes displays the corresponding asset.

## Agent skills

### Issue tracker

Before reading or publishing tickets, use the GitHub Issues workflow in `docs/agents/issue-tracker.md`.

### Triage labels

Before triaging issues, read the five default label mappings in `docs/agents/triage-labels.md`.

### Domain docs

Before exploring the codebase, read `docs/agents/domain.md` for the single-context glossary and ADR rules.
