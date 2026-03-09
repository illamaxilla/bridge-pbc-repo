
## The Problem

In `Intelligence.tsx` line 323, the mobile sidebar has `zIndex: 45`.

The `MobileHeader` inside `MarketOverview.tsx` (line 3259) has `position: sticky, zIndex: 50` — higher than the sidebar. So when the sidebar slides open, that sticky sector-filter bar paints **over** it, cutting it off.

## The Fix

**One number change** in `src/pages/intelligence/Intelligence.tsx`, line 323:

```
// Before
zIndex: isMobile ? 45 : "auto",

// After
zIndex: isMobile ? 60 : "auto",
```

That's it. Sidebar z-index goes from 45 → 60, which puts it above the sticky 50 filter bar. Nothing else touched.
