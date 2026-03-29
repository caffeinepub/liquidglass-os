# DarkSanta — Node Control Page

## Current State
The app has a MainSitePage and a NodesPage (list of nodes). The NodesPage shows a grid of node cards. The BottomDock and Navbar are shared components. Routing is hash-based (#/nodes). The .old directory has all the existing code.

## Requested Changes (Diff)

### Add
- A new `NodeConfigPage` (or update `NodesPage`) that acts as a detailed single-node control panel
- Animated stat bars (CPU usage, RAM usage, ping)
- Config blocks grid (Port, Version, Max Players, Auto Restart, Backup Status)
- Control buttons: Start, Stop, Restart (bg-white/10 style) + Deploy New Node (blue)
- Server info section: RAM 16GB, CPU Ryzen 9, Storage NVMe SSD, Location EU/India
- Status badge (green dot = Online)
- Page load fade+translateY animation

### Modify
- Replace or extend NodesPage to show this detailed control panel view
- The #/nodes route should show this control panel

### Remove
- The old nodes card list (replaced by single node control panel)

## Implementation Plan
1. Create `NodeConfigPage.tsx` in pages/ with full spec implementation
2. Update `App.tsx` to route #/nodes to NodeConfigPage
3. Blur only on: main panel + config cards (strict)
4. Background: #050505 + top-left gradient glow
5. Animated bars using CSS transitions on mount
6. All typography: labels uppercase small, values medium, title bold large
7. BottomDock and Navbar included
