# GitLab Agent screenshots

These are screenshots of the actual application running locally with synthetic demonstration data. They are not UI mockups or production records.

## Capture setup

- A disposable copy of the local project runs under `/tmp/portfolio-gitlab-agent`.
- The copy excludes the original environment file, application storage, data directory, Git history, and cached configuration.
- A separate empty MongoDB instance uses temporary storage and a dedicated local port.
- A demo-only provider supplies fictional integration responses and an administrator session. Outgoing HTTP is intercepted and unmatched requests are blocked.
- The screenshot instance has no queue workers or scheduler. Mail is configured to log locally. No GitLab, model-provider, or email requests are sent.
- `APP_NAME` is set to **GitLab Agent**, and the demo copy's Khosro page header uses that name. Screens use the existing Blade views, controllers, and built frontend assets.
- Capture size: 1600 × 1000. PNG captures are encoded as WebP for the portfolio.
- Matching 160 × 100 thumbnail files keep the gallery controls from downloading every full image on initial load.

## Gallery

| Asset | Screen |
| --- | --- |
| `reviews.webp` | Project review bot fleet |
| `conversation.webp` | Merge request conversation and review context |
| `report.webp` | Saved AI activity analysis |
| `schedules.webp` | Recurring email report schedules |

All people, project names, review text, counts, costs, dates, and reports shown are fictional. Screenshots retain the application's native dark interface in both portfolio themes. They are captured assets, not generated illustrations.

The portfolio background reuses the existing matching day/night `projects-workshop` illustrations in `../generated/`. No new generated image is needed for this project.

## Content evidence

The case study was checked against the current local implementation: Khosro webhook handling, queued reviews, context assembly, structured agents and bot management; GitlabReports activity aggregation, saved analyses and scheduled email jobs; shared authentication and model configuration. No proprietary implementation source or credentials are included here.

The project name, proprietary status, employer attribution, and 2025 development date come from the portfolio owner. Stack names describe the inspected implementation without assigning its current dependency versions to 2025.
