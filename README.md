# Jhon Lloyd Viernes — Portfolio

A responsive React + TypeScript portfolio with searchable project work, professional background, artwork, and music.

The visual direction takes inspiration from [mimosaagency.com](https://mimosaagency.com/): a spacious white canvas, floating media, small utility panels, pill navigation, and editorial case studies. The hero uses existing project previews, the profile photo, and original CSS artwork. The Mix / Work / Play controls change its collection. The reference site's assets and source code are not used.

Four selected case studies lead into the complete archive of 19 projects, with index and grid views, technology filters, search, and project dialogs. The about section preserves professional experience and education, while the creative section contains the artwork and music collection. Mobile navigation uses a keyboard-accessible dialog. Animation can be paused and respects the operating system's reduced-motion preference.

## Development

```sh
npm ci
npm run dev
npm run build
npm run lint
npx playwright install chromium
npm run test:e2e
```

The production output is `dist/`. GitHub Pages publishes from the workflow in `.github/workflows` when `main` is pushed.

## Motion

- `src/component/smooth_scroll.tsx` mounts the modern `ReactLenis` adapter from `lenis/react`. GSAP's ticker drives its animation frames, and Lenis notifies ScrollTrigger on scroll. Wheel scrolling is smoothed; touch scrolling stays native.
- `src/hooks/use_portfolio_motion.ts` owns the hero entrance, editorial section reveals, and subtle case-study parallax. The scene effect in `App.tsx` animates moodboard collection changes and floating media. `useGSAP` scopes and cleans up animations and ScrollTriggers.
- `src/hooks/use_animated_layout.ts` captures the layout before filtering, search, gallery expansion, or tab changes. GSAP Flip animates the new positions and container height after React commits.
- `src/hooks/use_animated_dialog.ts` coordinates dialog entrances/exits with native focus restoration. The page stays locked until the exit finishes, while the dialog keeps native scrolling.
- `src/component/animated_details.tsx` animates experience accordions and supports reversing an in-progress transition.

The motion control disables smooth scrolling and GSAP animation. Changes to the operating system's reduced-motion preference are respected immediately. Anchor navigation updates the URL and moves focus to the destination after scrolling; the skip link remains immediate.

`npm run test:e2e` builds and serves the production site, then runs Chromium checks for moodboard collections, archive views, desktop/mobile navigation, rapid filtering, modal scroll/focus, interrupted transitions, responsive widths, and accessibility. External artwork and music are stubbed in tests so availability does not affect these interaction checks.

## Content

- `src/types/projects.ts`: project descriptions, technology tags, filters, and optional external links.
- `src/types/experience.ts`: professional and freelance background.
- `src/types/education.ts`: education history.
- `src/types/images.ts`: existing artwork collection.
- `src/App.tsx`: layout, project search, native accessible dialogs, gallery, and music.
- `globals.css`: responsive styling, focus states, and reduced-motion support.

Professional project covers and interface scenes are illustrative treatments, not product screenshots. Personal projects use their existing application previews. External source/demo links are optional; professional projects without a verified public link open an informational dialog.

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
