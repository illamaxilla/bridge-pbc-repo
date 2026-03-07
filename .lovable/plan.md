
## Restructure: Create the Intelligence Section

### What's changing

The existing `Dashboard` page moves into a new `intelligence/` folder alongside 5 new sibling pages. A new parent shell (`Intelligence.tsx`) acts as the control panel wrapper — it renders the side navigation and swaps content based on the active sub-route.

### New folder structure

```text
src/pages/
  intelligence/
    Intelligence.tsx      ← control panel shell (layout + side nav)
    Dashboard.tsx         ← moved from src/pages/Dashboard.tsx
    MarketOverview.tsx    ← new placeholder
    Reports.tsx           ← new placeholder
    Watchlist.tsx         ← new placeholder
    Analytics.tsx         ← new placeholder
    Resources.tsx         ← new placeholder (separate from /resources)
```

The old `src/pages/Dashboard.tsx` is deleted (replaced by `src/pages/intelligence/Dashboard.tsx`).

### Route structure in App.tsx

Using React Router nested routes under `/intelligence`:

```text
/intelligence              → redirects to /intelligence/dashboard
/intelligence/dashboard    → Dashboard
/intelligence/market       → Market Overview
/intelligence/reports      → Reports
/intelligence/watchlist    → Watchlist
/intelligence/analytics    → Analytics
/intelligence/resources    → Resources (Intelligence)
```

The old `/dashboard` route is removed and replaced.

`Intelligence.tsx` uses an `<Outlet />` (React Router nested routing) so the shell renders around whichever child page is active.

### What each file contains

**`Intelligence.tsx`** — the shell:
- BRIDGE-branded top bar (same green/lime as site)
- Left sidebar with 6 nav links (Dashboard, Market Overview, Reports, Watchlist, Analytics, Resources)
- Active link highlighting
- `<Outlet />` in the main content area
- "BETA / Behind Login Wall" placeholder notice
- On mobile: sidebar collapses to top tab bar

**Each sub-page** (Dashboard, MarketOverview, Reports, Watchlist, Analytics, Resources):
- Minimal COMING SOON placeholder matching the existing Dashboard style
- Title, description, and a "Coming Soon" badge
- Dashboard reuses the existing content from `src/pages/Dashboard.tsx`

### Files to create/edit

| File | Action |
|---|---|
| `src/pages/intelligence/Intelligence.tsx` | Create — shell with sidebar + Outlet |
| `src/pages/intelligence/Dashboard.tsx` | Create — content from existing Dashboard.tsx |
| `src/pages/intelligence/MarketOverview.tsx` | Create — placeholder |
| `src/pages/intelligence/Reports.tsx` | Create — placeholder |
| `src/pages/intelligence/Watchlist.tsx` | Create — placeholder |
| `src/pages/intelligence/Analytics.tsx` | Create — placeholder |
| `src/pages/intelligence/Resources.tsx` | Create — placeholder |
| `src/pages/Dashboard.tsx` | Delete (replaced) |
| `src/App.tsx` | Replace `/dashboard` route with nested `/intelligence/*` routes |
