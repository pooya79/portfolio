# Piko application screenshots

Actual Go/templ application captures from `/home/mint/oss/buildx/docs/images/`,
captured on 2026-10-11. Optimized to WebP without content changes. All four
captures are light theme, with synthetic disposable fixture data,
fake Telegram, and no live model credentials. The Telegram token field is empty.

| File | Surface | Dimensions |
| --- | --- | --- |
| `dashboard.webp` | Workspace with three unconnected bots | 1600 × 1521 |
| `flow.webp` | Draft flow and question inspector | 1600 × 1050 |
| `preview.webp` | Isolated inquiry preview at review | 1600 × 1088 |
| `telegram-connection.webp` | Telegram connection instructions | 1600 × 1050 |

Source provenance and reproduction: `docs/images/README.md` in the Piko repository.
These are current app pixels, not the archived React design. They retain native
application colors in both portfolio themes. The generated decorative backdrop
uses a separate matching day/night pair. Gallery images use `object-fit: contain`
and can be enlarged without cropping.

Content was checked against Piko’s README, approved-block and publication ADRs,
the Go-rendered studio ADR, and `docs/verification/piko-studio-acceptance.md`.
The page distinguishes the contest’s goal from the incomplete implementation
and links only to the project repository, with no contest link.
