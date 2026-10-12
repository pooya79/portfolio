# TorobRent application screenshots

Fresh Playwright CLI captures from the running local TorobRent application on 2026-10-12.
The backend used an isolated SQLite demo database and filesystem media in
`/tmp/torobrent-portfolio-runtime/`; the frontend used the real OpenStreetMap adapter.
The source checkout is `/home/mint/oss/TorobRent`. Only documented fictional demo accounts
and seeded catalog records appear. No submissions were published or extraction jobs started
for these captures. These are actual application pixels, optimized to WebP without content edits.

| Portfolio file | Application surface | Dimensions | Native theme |
| --- | --- | --- | --- |
| `search.webp` | `/search`, loaded map tiles and rental results | 1600 × 900 | Light |
| `home.webp` | `/`, complete city discovery cards | 1600 × 1120 | Light |
| `property.webp` | Apartment in Zafaraniyeh, photos and source rental terms | 1600 × 900 | Light |
| `submission.webp` | Existing submitter draft, final review step | 1600 × 900 | Light |
| `sources.webp` | `/operator/source-proposals`, seeded source review queue | 1600 × 900 | Dark |

The search capture is the thumbnail on both portfolio Home and Projects, and the default
gallery view. The app home page is an additional gallery view. All app previews and their
thumbnails use `object-fit: contain` and disable image zoom on hover, so the portfolio does
not trim the captured UI. Enlargement opens the original complete capture. Screenshots retain
their native application colors in either portfolio theme. Only page surfaces, decorative
hero scenery, and shared foliage follow the portfolio day/night preference.

Content was checked against TorobRent's README, `docs/architecture.md`,
`docs/source-extraction.md`, `docs/validation.md`, the operator-gated matching ADRs,
and the source-profile repair provider and workflow. The page describes the job challenge
without publishing its brief URL, and links to Torob and the project repository.
