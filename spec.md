# LiquidGlass OS — Right Vertical Dock + Sidebar Blur Upgrade

## Current State
- MainSitePage has a left sidebar trigger, bottom dock (LimelightNav), top navbar, hero, cards, dashboard, ecosystem, footer
- NodesPage has node cards with aurora background and bottom dock
- Sidebar already has blur(60px) but user wants more glass depth
- No right-side vertical dock exists

## Requested Changes (Diff)

### Add
- New `RightDock` component: floating vertical pill dock on the right side, vertically centered, fixed position, z-index above content
  - Pill container: rounded-full, bg black/30, backdrop-blur-2xl, border white/10, outer glow blue/purple
  - 5 circular liquid glass buttons: Play, Plus, Info, Server, LayoutDashboard (lucide-react)
  - Each button: rounded-full, white/10 bg, backdrop-blur, inner highlight gradient, border white/15
  - Hover: scale-110, neon glow (blue/purple), brightness up, shine sweep animation
  - Active state: stronger glow, brighter bg, ring effect
  - Tooltip on hover: small glass tooltip appearing to the left of the dock
  - Dock entrance animation: fade-in + slide from right
  - Floating idle animation: subtle translateY up/down
  - Server button navigates to #/nodes

### Modify
- Add `RightDock` to `MainSitePage.tsx` and `NodesPage.tsx`
- Sidebar: increase blur depth, add stronger inner glow, glass shimmer layers, more semi-transparent feel

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/frontend/src/components/RightDock.tsx` with all liquid glass button styles, tooltips, animations, hover/active states
2. Add keyframe animations in the component (idle float, shine sweep, entrance slide)
3. Import and render `<RightDock />` in `MainSitePage.tsx` and `NodesPage.tsx`
4. Enhance Sidebar blur/glass in `Sidebar.tsx` — deepen backdrop-filter values, add more inner glow layers
