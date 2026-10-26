# mirimomekiku — Portfolio

A React + TypeScript portfolio in a light editorial style: Plus Jakarta Sans headings, Caveat wordmark, DM Mono typography, a typewriter hero where each verb is typed in its own playful typeface, liquid-glass surfaces, a letter-wave/rolling-word hero over a dot grid with floating tool icons (Flutter, Kotlin, React, Figma, Godot, GitHub, Fedora, Spotify; Simple Icons), a floating bottom nav (Work / Experience / Art / Contact), a two-column grid of tinted project covers (phone or browser mockups), and a deep-green footer.

- Brand: **mirimomekiku**. The favicon and OG image are original SVG drawings (`public/favicon.svg`); the primary color is Tailwind green-500.
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
