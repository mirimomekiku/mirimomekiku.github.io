# mirimomekiku — Portfolio

A React + TypeScript portfolio in a light editorial style: serif headline, animated SVG cat mascot, verb ticker, stacked project cards, a playground (art and music), and about/experience.

- Brand: **mirimomekiku**. The mascot, favicon, and OG image are original SVG drawings (`src/component/mascot.tsx`, `public/favicon.svg`).
- Project screenshots come from the Google Play listings (AdaptiveHub, Adaptive Library) and live captures of the public sites. AdaptiveHub Meet uses an illustration while its site is offline.
- Animation respects `prefers-reduced-motion`.

## Development

```sh
npm ci
npm run dev
npm run build
npm run lint
npx playwright install chromium
npm run test:e2e
```
