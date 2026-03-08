
## What to change

### 1. Remove "Intelligence" label from mobile header
Line 243–249: the "Intelligence" text label is always shown. Wrap it with `!isMobile &&` so it only renders on desktop.

### 2. Make the header sticky on mobile
Line 220: the `<header>` has no `position` — it sits in the flex column and scrolls with the page on mobile. Add `position: sticky` + `top: 0` + `zIndex: 50` when `isMobile` so it stays pinned as the user scrolls the dashboard content.

The sidebar's `top` offset is already `56` (line 288), so it stays correctly anchored under the sticky header.

### File
- **`src/pages/intelligence/Intelligence.tsx`** — two small edits:
  1. Header element: add `position: "sticky", top: 0, zIndex: 50` when `isMobile`
  2. "Intelligence" label div: hide on mobile with `!isMobile &&` guard
