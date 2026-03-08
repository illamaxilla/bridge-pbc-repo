
## Audit Summary: What's Working vs. What Needs Fixing

### ✅ Working correctly
- `SiteHeader.tsx` — active-page exclusion, all 6 nav items, mobile overlay with body scroll lock, Request Access → `/login`, hamburger animation. All 20 pages import it.
- `footerLinkHref` defined AND applied at render site in: `About`, `Contact`, `Insights`, `Methodology`, `Resources`, `Services`, `Index`, `Technology`, `Financial`, `Sports`, `Education`, `Infrastructure`, `Housing`, `Health`, `Transport`, `Agriculture`, `Manufacturing`, `Energy`
- Mobile footer category labels (Company/Services/Resources/Insights) wired in: `About`, `Contact`, `Insights`, `Methodology`, `Resources`, `Services`, `Index`, `Technology`, `Financial`, `Sports`, `Agriculture`, `Transport`, `Health`, `Housing`, `Manufacturing`, `Energy`
- `/sectors` route exists in `App.tsx`, `Sectors.tsx` created, SiteHeader Sectors → `/sectors`

### ❌ Issues to fix

**Issue 1 — Tourism.tsx: desktop footer links still use `href="#"`**
- `footerLinkHref` is defined (line 1337) but NOT used at the render site (line 7104 still says `href="#"`)
- Fix: change `href="#"` → `href={footerLinkHref(link)}` at line 7104

**Issue 2 — Tourism.tsx: mobile footer category labels still use `href="#"`**
- Line 6934 has `href="#"` instead of the object-lookup pattern
- Fix: same object-lookup pattern as other pages

**Issue 3 — Infrastructure.tsx and Education.tsx: mobile footer category labels still use `href="#"`**
- Infrastructure line ~6952, Education line ~6947 both have `href="#"` 
- Fix: apply the object-lookup href pattern

**Issue 4 — `footerLinkHref` maps "Sectors" → `/services` in 14 sector page files**
- Now that `/sectors` route exists, the "Sectors" key should map to `/sectors` not `/services`
- Affects: `Services.tsx`, `Sports.tsx`, `Tourism.tsx`, `Index.tsx`, `Manufacturing.tsx`, `Infrastructure.tsx`, `Housing.tsx`, `Transport.tsx`, `Health.tsx`, `Energy.tsx`, `Education.tsx`, `Agriculture.tsx`, `Financial.tsx` — but NOT `About`, `Contact`, `Insights`, `Methodology`, `Resources` which already have `/sectors`
- Fix: update the "Sectors" mapping in those 13 files from `/services` to `/sectors`

**Issue 5 — Ghost `SiteFooter.tsx` HMR error**
- Console log shows `Failed to reload /src/components/SiteFooter.tsx` — this file does NOT exist in the filesystem (search returns 0 matches) 
- This is a stale Vite HMR cache entry from a previous edit session. It resolves on hard reload. No actual file to fix — but we can verify by checking if it persists.

**Issue 6 — Resources.tsx sector icon grid: `href="#"` not wired to sector routes**
- The 12 sector icon buttons in the footer sector grid use `href="#"` (line 2254)
- Each should link to the corresponding sector page (e.g., `/sectors/infrastructure`, `/sectors/financial`, etc.)
- The `footerSectorIcons` array has a `key` property per icon — fix: use a sectorRoutes lookup

**Issue 7 — `Index.tsx` has a dead `navHref` function (line 752-753)**
- `const navHref = ...` pointing to `/services` for "Sectors" — this is unused dead code now that SiteHeader handles nav
- Minor cleanup

### Implementation Plan

**Files to fix: 4 real fixes + 1 cleanup**

1. **`Tourism.tsx`** (2 fixes):
   - Line 7104: `href="#"` → `href={footerLinkHref(link)}`
   - Line 6934: `href="#"` → `href={{ Company: "/about", Services: "/services", Resources: "/resources", Insights: "/insights" }[label] || "#"}`

2. **`Infrastructure.tsx`** (1 fix):
   - Line 6952: `href="#"` → object-lookup href

3. **`Education.tsx`** (1 fix):
   - Line 6947: `href="#"` → object-lookup href

4. **13 files — update "Sectors" in `footerLinkHref` map from `/services` → `/sectors`**:
   - `Services.tsx`, `Sports.tsx`, `Tourism.tsx`, `Index.tsx`, `Manufacturing.tsx`, `Infrastructure.tsx`, `Housing.tsx`, `Transport.tsx`, `Health.tsx`, `Energy.tsx`, `Education.tsx`, `Agriculture.tsx`, `Financial.tsx`
   - Simple single-line change per file: `"Sectors": "/services"` → `"Sectors": "/sectors"`

5. **`Resources.tsx`** — wire sector icon grid to real sector routes:
   - Replace `href="#"` in the sector icon map with `href={sectorRoutes[sector.key] || "#"}`
   - Add a `sectorRoutes` lookup near the footer (same as other pages already have it)

6. **`Index.tsx`** — remove dead `navHref` function (lines 752-753)

### Files to edit
| File | Change |
|---|---|
| `Tourism.tsx` | Fix desktop `href="#"` → `footerLinkHref(link)`; fix mobile labels |
| `Infrastructure.tsx` | Fix mobile labels `href="#"` |
| `Education.tsx` | Fix mobile labels `href="#"` |
| `Services.tsx` | "Sectors" map `/services` → `/sectors` |
| `Sports.tsx` | "Sectors" map `/services` → `/sectors` |
| `Manufacturing.tsx` | "Sectors" map `/services` → `/sectors` |
| `Housing.tsx` | "Sectors" map `/services` → `/sectors` |
| `Transport.tsx` | "Sectors" map `/services` → `/sectors` |
| `Health.tsx` | "Sectors" map `/services` → `/sectors` |
| `Energy.tsx` | "Sectors" map `/services` → `/sectors` |
| `Education.tsx` | "Sectors" map `/services` → `/sectors` |
| `Agriculture.tsx` | "Sectors" map `/services` → `/sectors` |
| `Financial.tsx` | "Sectors" map `/services` → `/sectors` |
| `Tourism.tsx` | "Sectors" map `/services` → `/sectors` |
| `Infrastructure.tsx` | "Sectors" map `/services` → `/sectors` |
| `Resources.tsx` | Wire sector icon grid to real `/sectors/X` routes |
| `Index.tsx` | Remove dead `navHref` function; update "Sectors" map |
