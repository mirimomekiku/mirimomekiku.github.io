# Jhon Lloyd Viernes — Portfolio

A responsive React + TypeScript portfolio with searchable project work, professional background, artwork, and music.

## Development

```sh
npm ci
npm run dev
npm run build
npm run lint
```

The production output is `dist/`. GitHub Pages publishes from the workflow in `.github/workflows` when `main` is pushed.

## Content

- `src/types/projects.ts`: project descriptions, technology tags, filters, and optional external links.
- `src/types/experience.ts`: professional and freelance background.
- `src/types/education.ts`: education history.
- `src/types/images.ts`: existing artwork collection.
- `src/App.tsx`: layout, project search, native accessible dialogs, gallery, and music.
- `globals.css`: responsive styling, focus states, and reduced-motion support.

Project covers for the AdaptiveHub work are illustrative identity treatments, not product screenshots. External source/demo links are optional; professional projects without a verified public link open an informational dialog.

## AdaptiveHub content review

The October 2026 update draws on README, PRODUCT, package manifests, and relevant routes in the sibling `../adaptivehub` workspace. No private source, operational configuration, credentials, or customer records are copied into this portfolio.

| Portfolio project       | Source folders                                                    |
| ----------------------- | ----------------------------------------------------------------- |
| AdaptiveHub LMS         | `main-hub-web`, `hub-web`, `hub-mobile`                           |
| Adaptive Library        | `library-web`, `library-mobile`                                   |
| Crest                   | `Crest` (web and mobile)                                          |
| AdaptivePay             | `adaptive-pay`                                                    |
| Adaptive Station        | `adaptive-station`, `adaptive-station-mobile`                     |
| EDUCENTRA               | `educentra.ai`, with `educentra` as its earlier Laravel reference |
| Adaptive Human Resource | `calendar`                                                        |
| AdaptiveHub Meet        | `adaptivehub-meet`, with `livekit` as supporting infrastructure   |
| AdaptiveHub AI          | `hub-ai`                                                          |
| KAWAY Mobile            | `kaway-mobile`                                                    |
| Oronikola               | `oronikola-web`                                                   |
| Help Center             | `help-center` (application foundation only)                       |

Duplicate working copies, datasets, documentation, build-only folders, scripts, and infrastructure are represented under their parent products rather than listed as separate completed products. Background text does not invent employment dates or measured outcomes. Existing education and employment dates are retained from the original data.
