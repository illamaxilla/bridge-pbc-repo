
## What's being fixed in `src/pages/Index.tsx`

### Current state (lines 2744–2930)
- Mobile shows only 4 sector accordion rows (`sectorData.slice(0, isMobile ? 4 : 6)`)
- "View all 12 sectors" is a plain `<div>` with no link — just a styled button with no `onClick` or `href`

### Two fixes

**1. Show all 12 sectors, scrollable on mobile**

Change `sectorData.slice(0, isMobile ? 4 : 6)` → `sectorData.slice(0, isMobile ? 12 : 6)` so all 12 appear on mobile.

Wrap the sector list `<div>` (line 2744) with a `maxHeight` + `overflowY: "auto"` on mobile:

```
mobile:  maxHeight: "420px", overflowY: "auto", paddingRight: "4px"
desktop: no constraint (same as today)
```

This gives a scrollable accordion panel on mobile showing all 12 sectors, with the "View all 12 sectors" CTA pinned below it (outside the scroll area).

**2. "View all 12 sectors" → real link to `/sectors`**

The outer `<div className="sector-row">` at line 2895 becomes a `<Link to="/sectors">` (react-router-dom). Import `Link` at the top of the file. Remove the `cursor: "pointer"` (Link handles it natively), keep all other styles.

### Files
- `src/pages/Index.tsx`: add `Link` import, update slice count for mobile, add scroll wrapper, convert CTA div to `<Link>`
