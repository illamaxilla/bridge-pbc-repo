
## The Problem

On mobile, the Intelligence shell (`Intelligence.tsx`) renders:
- A 56px header with a hamburger menu button
- An absolute-positioned sidebar that slides in when open

But `MobileDashboard` inside `Dashboard.tsx` **also** renders its own full-screen shell:
- Its own 52px topbar with a sector selector pill and icons
- `height: 100vh` with `overflow: hidden` — fighting the outer shell's layout

This creates **two stacked topbars** and the inner `height: 100vh` breaks the shell's scroll model. The screenshots show the sector selector popup from the inner `MobileDashboard` competing with the outer Intelligence header.

## Fix Plan

### `Dashboard.tsx` — `MobileDashboard` component

The mobile dashboard sits inside the Intelligence shell which already provides:
- The header bar (logo + hamburger + BETA badge)
- Navigation to other Intelligence sub-pages
- Sector switching via the sidebar

So `MobileDashboard` should:

1. **Remove the outer `height: 100vh` / `overflow: hidden` wrapper** — change to `height: 100%` and let the shell's `<main>` handle scroll
2. **Remove the inner topbar** (the 52px sector selector pill row) — the shell header already handles navigation. The sector selector pill is redundant because sector switching is done via the shell sidebar
3. **Keep the dashboard sub-nav tabs** (Overview / Ventures / Signals / Companies / Analytics) — move this into a sticky strip at the top of the scrollable content instead of a floating topbar
4. **Keep the sector drawer** (`sectorDrawer` state) — but trigger it differently. Since the shell sidebar already handles sector selection on mobile (via hamburger → sidebar → sector list), the sector drawer inside MobileDashboard is no longer needed. We can remove it entirely.
5. **Fix the `height: 100vh` on the sector drawer overlay** — it currently opens a full-screen bottom sheet; this should also be removed

### Result

Mobile layout becomes clean:
```
┌─────────────────────────────┐
│ Intelligence Shell Header   │ ← 56px, hamburger opens sidebar
├─────────────────────────────┤
│  [Overview][Ventures]...    │ ← sticky tab strip (inside main scroll)
│  Dashboard content          │ ← scrollable
│  ...                        │
└─────────────────────────────┘
```

When user taps hamburger → sidebar opens over the content with sector list and nav links (already working).

### Files to edit

- **`src/pages/intelligence/Dashboard.tsx`** — `MobileDashboard` function: remove the 100vh outer div, remove the 52px inner topbar, remove the sector drawer, convert the sub-nav tabs into a sticky top strip inside the scrollable area
