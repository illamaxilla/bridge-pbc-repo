
## What needs to happen

**The problem:**
- `src/pages/Sector.tsx` — the user's pasted 2489-line sectors page (rich, full content), default export named `Sectors` (not a typo — the export name matches the route)  
- `src/pages/Sectors.tsx` — my simple placeholder grid with 12 emoji cards, also default export `Sectors`  
- `App.tsx` imports `Sectors` from `./pages/Sectors` and routes it at `/sectors` — currently points to my placeholder

**The fix — 2 changes:**

### 1. Delete `src/pages/Sectors.tsx`
Remove my placeholder file entirely.

### 2. Rename `src/pages/Sector.tsx` → `src/pages/Sectors.tsx`
The user's file becomes the one served at `/sectors`. No changes to `App.tsx` needed — the import path (`./pages/Sectors`) and the imported name (`Sectors`) already match the user's file's default export name (`Sectors`).

### Result
`/sectors` seamlessly serves the user's rich 12-sector page with category filters, cross-sector matrix, investment data, and all existing content.

### Files to change
| Action | File |
|---|---|
| Delete | `src/pages/Sectors.tsx` (my placeholder) |
| Rename | `src/pages/Sector.tsx` → `src/pages/Sectors.tsx` (user's file) |
| No change | `src/App.tsx` — import and route already correct |
