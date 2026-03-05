

## Create Placeholder Pages and Relocate SectorPage

### Summary

Create 4 new placeholder page files and move `SectorPage.tsx` from `src/pages/sectors/` up to `src/pages/` as `Sector.tsx`. Register all new routes in `App.tsx`.

### New Files

**4 placeholder pages** (`src/pages/Resources.tsx`, `Insights.tsx`, `Methodology.tsx`, `Dashboard.tsx`):
Each will be a simple "Coming Soon" placeholder matching the BRIDGE brand (green/lime theme), with a nav bar linking Home and a centered card stating the page is under construction. Same pattern as the existing `SectorPage.tsx` template.

### File Changes

| Action | File | Detail |
|---|---|---|
| Create | `src/pages/Resources.tsx` | Placeholder page |
| Create | `src/pages/Insights.tsx` | Placeholder page |
| Create | `src/pages/Methodology.tsx` | Placeholder page |
| Create | `src/pages/Dashboard.tsx` | Placeholder page |
| Create | `src/pages/Sector.tsx` | Copy of `SectorPage.tsx` content, renamed export to `Sector` |
| Delete | `src/pages/sectors/SectorPage.tsx` | Removed (no files import it) |
| Edit | `src/App.tsx` | Add 4 new routes (`/resources`, `/insights`, `/methodology`, `/dashboard`) and update any future `SectorPage` import path |

### Routes Added to App.tsx

```
/resources    → <Resources />
/insights     → <Insights />
/methodology  → <Methodology />
/dashboard    → <Dashboard />
```

`SectorPage.tsx` is not currently imported anywhere in the codebase, so moving it has no downstream impact beyond the file relocation itself.

