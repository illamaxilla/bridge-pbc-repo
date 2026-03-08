
## What needs to change

### The problem
`Dashboard.tsx` renders a full self-contained layout with its own `Sidebar` component at `height: 100vh`. The `Intelligence.tsx` shell also has its own sidebar. On the Dashboard page, **both sidebars render simultaneously**, one nested inside the other.

### Plan

**1. Update `Intelligence.tsx` shell sidebar** — make it match the Dashboard's internal sidebar:
- Change background color from `#1B4D3E` to `#0F1A12` (Dashboard's `C.sidebar`)
- Add the **BRIDGE Intelligence logo** (using `BridgeLogo` equivalent) to the top of the shell sidebar above the nav items
- Add **collapse toggle** button (ChevronLeft/ChevronRight) so the sidebar can collapse to icon-only mode
- Add a **"SECTORS" section** below the nav items listing all 10 sectors (sorted by score, icons, no score number shown) — sectors will be display-only labels for now (not interactive sector switchers, since that's Dashboard-specific state)
- Change active nav highlight to use `#B8D935` lime on dark background (matching Dashboard style)
- Add the **"Upgrade to Pro"** panel at the bottom
- Remove the "Return to Website" button (the BRIDGE logo link at the top of the header already does this)
- Update the top header bar color to also use `#0F1A12` to match

**2. Update `Dashboard.tsx`** — remove the redundant internal sidebar:
- The `DesktopDashboard` currently wraps everything in its own `height: 100vh` flex container that includes `<Sidebar ... />`. Remove the `<Sidebar />` from `DesktopDashboard`'s layout.
- Change the outer div from `height: 100vh` to `height: 100%` so it fills the shell's `<main>` properly
- Keep the topbar (search, notifications, user info) and the main content columns — just remove the sidebar column

**3. Sector data in `Intelligence.tsx`**
Copy the `SECTORS` array names, icons and order into `Intelligence.tsx` so the shell sidebar can render the sector list. The sector data (ids, short names, icons) is already defined in `Dashboard.tsx` — we'll inline a minimal version in `Intelligence.tsx` with just `{ id, short, icon }` (no scores, per user request).

### Files to edit
- `src/pages/intelligence/Intelligence.tsx` — full rewrite of sidebar with dark theme, logo, nav, sectors list, collapse, Upgrade to Pro
- `src/pages/intelligence/Dashboard.tsx` — remove `<Sidebar />` from `DesktopDashboard`, fix layout height
