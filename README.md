# mirimomekiku — Portfolio

A React + TypeScript portfolio in a light editorial style: Ovo + Homemade Apple + DM Mono typography, a rotating script verb with an animated paw-print trail, a two-column grid of tinted project covers (phone or browser mockups), playground, about, and a plum footer with list columns and the animated SVG cat.

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
