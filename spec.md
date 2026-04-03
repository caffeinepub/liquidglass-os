# DarkSanta — Complete Premium SaaS Website

## Current State

The project has a working multi-page React frontend with:
- `App.tsx` using hash-based routing (#/nodes, #/node-list, home)
- `MainSitePage.tsx` with hero, server plans grid, stats, footer
- `NodeListPage.tsx` showing a list of nodes
- `NodesPage.tsx` as the node detail/control panel
- `BottomDock.tsx` with limelight indicator
- `Navbar.tsx` with blur-on-scroll
- `BeamsBackground.tsx` and `EtheralShadow.tsx` as animated backgrounds
- V41 footer with DarkSanta branding
- Framer Motion animations throughout
- Basic Motoko backend (empty actor)

Missing: Login page, Dashboard page, Deploy simulation modal, Terminal on Node page, Global presence map, proper route for /login and /dashboard.

## Requested Changes (Diff)

### Add
- `/login` route: Centered blur panel, minimal email+password form, smooth focus animations
- `/dashboard` route: Server list with CPU/RAM bars, Start/Stop/Restart actions, empty state
- Deploy Simulation Modal: Step-by-step animated modal (Allocating resources → Configuring node → Deploying server → Server online) with progress bar, triggered by "Deploy Server" CTA, redirects to node page after completion
- Terminal component on Node page: Fake console with typing animation, blinking cursor, line-by-line reveal
- Live stat fluctuation on Node page: CPU/RAM values change dynamically via setInterval
- Global presence section on Home: Minimal SVG world map with glowing location dots and hover tooltips
- Count-up animation on hero stats
- Skeleton loaders / shimmer states on Dashboard
- Page transitions (fade + slide ~400ms)
- Bottom dock: Add Search and Profile icons (no-op), keep Home/Deploy/Nodes navigating

### Modify
- `App.tsx`: Add routes for #/login, #/dashboard
- Hero: Floating glass cards with server specs preview
- Node page: Add terminal section, make CPU/RAM bars fluctuate on interval
- Server plan cards: Ensure hover expand with extra info works cleanly
- Button styles: Consistent premium blue primary, ghost secondary across all pages
- Navbar: Ensure center-aligned links + Deploy CTA
- All animations: Use cubic-bezier(0.25, 1, 0.5, 1), 0.3s–0.8s duration

### Remove
- Any remaining Caffeine watermarks or AI logos in footer/pages
- Redundant/duplicate component files (DockBackup, RightDock)

## Implementation Plan

1. Update `App.tsx` to handle #/login and #/dashboard hash routes
2. Create `LoginPage.tsx` — centered glass panel, email+password inputs, premium feel
3. Create `DashboardPage.tsx` — server list cards with CPU/RAM animated bars, actions, empty state
4. Create `DeployModal.tsx` — animated multi-step modal with progress bar
5. Update `NodesPage.tsx` — add Terminal component with typing animation, live stat fluctuation
6. Add GlobalPresence section to `MainSitePage.tsx` — SVG world map with glowing nodes
7. Add floating glass cards to hero section
8. Add count-up animations to hero stats
9. Update bottom dock icons (Home, Search, Deploy, Profile)
10. Ensure all buttons use consistent premium style (blue primary, ghost secondary)
11. Add page transition wrapper (fade+slide)
12. Add skeleton loaders to Dashboard
13. Remove duplicate/unused components
14. Full mobile optimization — reduced blur/animation on small screens
