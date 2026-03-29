# DarkSanta — Complete Redesign

## Current State
Multi-page app (landing → main → nodes) with heavy glassmorphism, rainbow color palette, multiple competing button styles (aurora-button, star-button, metal-button, liquid-glass-button), OTT carousel layout, busy animated backgrounds with particles/beams/rings, and right-side vertical dock (removed). Bottom dock uses LimelightNav. Routing via hash-based navigation (#/home, #/nodes).

## Requested Changes (Diff)

### Add
- New strict color system: #050505 base, #0B0B0F secondary, #3B82F6 blue accent only for CTAs/active states
- Inter/Geist font hierarchy (H1 bold tight tracking, H2 semibold, body regular, labels small uppercase)
- Interactive hero with "Deploy. Control. Dominate." heading + simulated real-time stats panel (CPU%, active servers, global ping)
- Interactive Server Grid: 3 sections (Starter, Pro, Enterprise) with cards that expand on hover showing specs inline
- Performance section (uptime/latency/infra stats)
- "Why DarkSanta" section with 4 clean value points
- Final CTA conversion section
- Clean button system: primary (bg-blue-500, hover glow, active scale-95), secondary (bg-white/10 border white/10)
- Scroll-triggered section reveals (opacity + translateY)
- Navbar: transparent → backdrop-blur on scroll, links: Home/Plans/Dashboard, CTA: "Deploy Now"
- Bottom dock: full-width, bg-black/60, backdrop-blur-md, LimelightNav sliding indicator, medium height
- 4-layer depth system using subtle gradients and soft shadows

### Modify
- Replace ALL existing pages (LandingPage, MainSitePage, NodesPage) — full rewrite
- Replace all button styles with the new clean primary/secondary system
- index.css: update color tokens to new palette, add Inter font
- Remove sidebar, right dock, OTT carousel rows, particle effects, spinning rings, beams background
- Simplify App.tsx: landing page becomes the full single-page experience (no separate landing → main flow); keep nodes page route

### Remove
- Rainbow/multi-color palette
- aurora-button, star-button, metal-button, liquid-glass-button usage
- Particle systems, spinning rings, light beams animations
- Sidebar menu
- Right vertical dock
- OTT-style horizontal scroll carousels
- Excessive glassmorphism
- Cinematic landing hero (separate landing page flow removed — hero is now the top of a single-page site)

## Implementation Plan
1. Rewrite index.css with new color tokens (#050505 base, blue accent), add Inter/Geist font import
2. Rewrite App.tsx: single-page layout for main site, keep #/nodes route for nodes page
3. Create new Navbar component: transparent → blur on scroll, minimal links + Deploy Now CTA
4. Create new Hero component: "Deploy. Control. Dominate." heading, subheading, two CTAs, simulated stats panel (animated counters), subtle mouse-parallax
5. Create ServerGrid component: 3-category grid (Starter/Pro/Enterprise), cards with hover expand showing RAM/CPU/Storage/Price/Deploy button/status indicator
6. Create PerformanceSection: uptime %, latency ms, global nodes count — clean stat display
7. Create WhyDarkSanta section: 4 value props with icons
8. Create CTASection: strong conversion block
9. Create BottomDock: full-width, blur, LimelightNav, medium height, icons for Home/Plans/Dashboard/Deploy
10. Assemble all into MainSitePage (single scrollable page)
11. Update NodesPage to match new design system (same color tokens, clean cards)
