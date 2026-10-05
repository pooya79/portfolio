# Domain Docs

This repo uses a single-context layout: `GLOSSARY.md` at the repo root and `docs/adr/` for architecture decisions.

## Before exploring, read these

- **`GLOSSARY.md`** at the repo root.
- **`docs/adr/`**: read ADRs that touch the area you are about to work in.

If these files do not exist, proceed silently. Domain docs are created lazily by `/domain-modeling`, reached through `/grill-with-docs` and `/improve-codebase-architecture`, when terms or decisions are resolved.

## File structure

```text
/
├── GLOSSARY.md
└── docs/adr/
    ├── 0001-<decision>.md
    └── 0002-<decision>.md
```

## Use the glossary's vocabulary

When naming a domain concept in an issue title, refactor proposal, hypothesis, or test name, use the term defined in `GLOSSARY.md`.

If a concept is missing, reconsider whether the project uses it or note a real vocabulary gap for `/domain-modeling`.

## Flag ADR conflicts

If a proposal contradicts an existing ADR, surface the conflict explicitly and explain why the decision should be reopened.
