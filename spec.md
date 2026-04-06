# Mindloop

## Current State
New project — no existing frontend pages. Backend is scaffolded with empty Motoko actor.

## Requested Changes (Diff)

### Add
- Full Mindloop landing page (single-page, 7 sections) built in React + TypeScript + Vite + Tailwind CSS + shadcn/ui
- Custom design system via `index.css` with HSL CSS variables (pure black/white monochrome theme)
- `.liquid-glass` global CSS class for glass effect buttons/containers
- `fadeUp` Framer Motion animation helper used site-wide with staggered delays
- **Navbar**: Fixed transparent, concentric-circle logo, nav links with • separators, social icon buttons
- **Hero Section**: Fullscreen MP4 video background, avatar row, large heading, subtitle, email subscribe form
- **Search Section**: Big heading, 3 AI platform cards with generated icons
- **Mission Section**: Large video + scroll-driven word-by-word opacity reveal using useScroll/useTransform
- **Solution Section**: Label + heading + widescreen video + 4-column feature grid
- **CTA Section**: HLS video background (hls.js), overlay, logo, heading, two CTA buttons
- **Footer**: Copyright left, Privacy/Terms/Contact links right
- Dependencies: `framer-motion`, `hls.js`, `@fontsource/inter`, `@fontsource/instrument-serif`, `tailwindcss-animate`
- Generated image assets: 3 avatars, 3 platform icons

### Modify
- `index.css` — replace default variables with full Mindloop design token set
- `tailwind.config.js` — add `tailwindcss-animate` plugin, `fontFamily` extensions for Inter and Instrument Serif
- `package.json` — add all new dependencies

### Remove
- Nothing from existing scaffolding (empty actor stays)

## Implementation Plan
1. Install npm deps: `framer-motion`, `hls.js`, `@fontsource/inter`, `@fontsource/instrument-serif`, `tailwindcss-animate`
2. Update `tailwind.config.js` with font families and animate plugin
3. Rewrite `src/frontend/src/index.css` with full CSS variable set + `.liquid-glass` class + font imports
4. Build `App.tsx` as single scrolling page with all 7 sections
5. Use generated assets: `/assets/generated/avatar-{1,2,3}.dim_64x64.png`, `/assets/generated/icon-{chatgpt,perplexity,google}.dim_200x200.png`
6. Validate build passes
