
## Full Crawl Findings

### Issues found across all 20 pages:

**Issue A — "Our Approach" → goes to Sectors page (wrong)**
In `Index.tsx` (line 759), `Services.tsx` (1222), and all 12 sector pages (`Energy`, `Technology`, `Sports`, `Transport`, `Manufacturing`, `Housing`, `Financial`, `Health`, `Infrastructure`, `Tourism`, `Education`, `Agriculture`):
- `"Sectors": "/services"` — still maps to `/services` instead of `/sectors`

**Issue B — "Dashboard" button → goes to `/dashboard` (dead route)**
In `Insights.tsx` line 1645: `href="/dashboard"` — this route doesn't exist. Should be `/intelligence/dashboard`.

**Issue C — Services column footer links all go to `/services` (acceptable but worth confirming)**
`Research & Guidance`, `Venture Development`, `Direct Investment`, `Strategic Partnerships` all → `/services`. This is correct — they're features of the Services page.

**Issue D — Sector Briefs → `/insights` (should go to `/resources`)**
Every file maps `"Sector Briefs": "/insights"`. Sector Briefs are content documents — they belong in Resources (`/resources`). Same for `"White Paper"`, `"Case Studies"`, `"Research Library"`, `"Data & Reports"` which correctly go to `/resources` already. Only `"Sector Briefs"` is miscategorized — it's in the Insights column but should logically link to `/resources`.

**Issue E — The footer is copy-pasted in 20 files with no shared component**
The footer JSX + `footerLinkHref` + `SectorGrid` + `socialIcons` are duplicated in every single page file. This is the root cause of all routing bugs — fixing one file fixes one page, but the rest stay broken.

---

## The plan: Create a shared `SiteFooter` component

Rather than making 20+ individual edits (fragile, error-prone), we create **one shared component** and replace the inline footer in every page. This also means future link changes need editing in exactly one place.

### New file: `src/components/SiteFooter.tsx`

Contains:
- The correct `footerLinkHref` map (single source of truth)
- `SectorGrid` sub-component (with correct `/sectors/X` routes)
- `socialIcons` array
- The full `Footer` JSX (dark green background, logo, contact, 4-column nav, subscribe row, sector grid, bottom bar)
- Accepts `isMobile` as a prop (or reads it internally via `useIsMobile`)

**Correct link map (fixes all issues at once):**
```
"About BRIDGE"         → /about
"Our Approach"         → /methodology        ← fixes Issue A
"Sectors"              → /sectors            ← fixes Issue A  
"Contact Us"           → /contact
"Research & Guidance"  → /services
"Venture Development"  → /services
"Direct Investment"    → /services
"Strategic Partnerships" → /services
"White Paper"          → /resources
"Case Studies"         → /resources
"Research Library"     → /resources
"Data & Reports"       → /resources
"Insights & Analysis"  → /insights
"Sector Briefs"        → /resources          ← fixes Issue D
"Policy Updates"       → /insights
"Annual Review"        → /insights
```

### Fix `Insights.tsx` Dashboard button

Change `href="/dashboard"` → `href="/intelligence/dashboard"` at line 1645.

### Replace footer in all 20 pages

Remove the inline `Footer` component definition and `footerLinkHref` / `SectorGrid` / `socialIcons` from each file, and replace `<Footer />` with `<SiteFooter />` (imported from `@/components/SiteFooter`).

**Pages to update (20 total):**
- `Index.tsx`, `About.tsx`, `Services.tsx`, `Resources.tsx`, `Insights.tsx`, `Methodology.tsx`, `Contact.tsx`
- `sectors/Energy.tsx`, `sectors/Technology.tsx`, `sectors/Sports.tsx`, `sectors/Transport.tsx`, `sectors/Manufacturing.tsx`, `sectors/Housing.tsx`, `sectors/Financial.tsx`, `sectors/Health.tsx`, `sectors/Infrastructure.tsx`, `sectors/Tourism.tsx`, `sectors/Education.tsx`, `sectors/Agriculture.tsx`
- `Sectors.tsx` (uses `FooterSectorGrid` variant — handle separately)

### Files to create / edit

| Action | File | Change |
|---|---|---|
| Create | `src/components/SiteFooter.tsx` | New shared footer component with correct routes |
| Edit | `src/pages/Insights.tsx` | Fix Dashboard button `href` → `/intelligence/dashboard` |
| Edit | 19 page files | Remove inline footer code, import + use `<SiteFooter />` |

### Note on `Sectors.tsx`

The user's `Sectors.tsx` has a `FooterSectorGrid` variant that differs slightly from the other pages' `SectorGrid`. The shared `SiteFooter` will use the standard `SectorGrid` pattern consistent with all other pages. `Sectors.tsx` will be updated to use `<SiteFooter />` like all other pages.

### What this fixes

- "Our Approach" → correctly routes to `/methodology` on all pages
- "Sectors" → correctly routes to `/sectors` on all pages  
- "Sector Briefs" → correctly routes to `/resources` on all pages
- "Dashboard" / "Access Dashboard" button on Insights → correctly routes to `/intelligence/dashboard`
- All future footer link changes need editing in exactly one place
