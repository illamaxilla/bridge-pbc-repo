
## What to change

The `ALL_NAV` array in `src/components/SiteHeaderMinimal.tsx` (lines 15–22) needs 3 additions:

**Current order:**
Home → About → Sectors → Insight → Resources → Contact

**New order:**
Home → About → **Methodology** → Sectors → Insight → **BRIDGE Intelligence** → **Community** → Resources → Contact

### Exact change — lines 15–22

```ts
const ALL_NAV = [
  { label: "Home",               to: "/" },
  { label: "About",              to: "/about" },
  { label: "Methodology",        to: "/methodology" },
  { label: "Sectors",            to: "/sectors" },
  { label: "Insight",            to: "/insights" },
  { label: "BRIDGE Intelligence", to: "/intelligence/dashboard" },
  { label: "Community",          to: "/community" },
  { label: "Resources",          to: "/resources" },
  { label: "Contact",            to: "/contact" },
];
```

Notes:
- "BRIDGE Intelligence" links to `/intelligence/dashboard` (the existing nested route)
- "Community" links to `/community` — no page exists yet, so it will hit the NotFound route until a page is built. This is fine as a placeholder.
- The active-page exclusion logic (`visibleNav` filter on line 69) will automatically hide the current page's link from the overlay, so no additional logic changes needed.

### Single file, single change
Only `src/components/SiteHeaderMinimal.tsx` lines 15–22 need to be updated.
