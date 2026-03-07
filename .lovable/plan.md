

## Accurate Gap Analysis

### What IS complete ✅
- **SiteHeader.tsx** — fully built: active-page exclusion, all 6 nav items wired, mobile overlay (#191919 bg, body scroll lock, Request Access → /login, hamburger animation, 48px tap targets)
- **SiteHeader imported in all 20 pages** — confirmed via search (20 matches across all page files)
- **footerLinkHref helper defined** in 14 files (all sector pages + Index + Services)
- **Index.tsx** — Request Access → /login ✅, More Insights → /insights ✅, desktop footer uses `footerLinkHref` ✅
- **Services.tsx** — footerLinkHref applied ✅
- **Technology.tsx, Financial.tsx, Sports.tsx, Education.tsx, Infrastructure.tsx, Tourism.tsx, Transport.tsx** — footerLinkHref defined and applied in footer link rendering ✅

### What is INCOMPLETE ❌

**GROUP 1 — Footer desktop link columns still use `href="#"` (footerLinkHref defined but NOT applied at the render site):**
- `Energy.tsx` line ~6522 — `href="#"` instead of `href={footerLinkHref(link)}`
- `Housing.tsx` line ~6449 — `href="#"` instead of `href={footerLinkHref(link)}`
- `Manufacturing.tsx` line ~7010 — `href="#"` instead of `href={footerLinkHref(link)}`
- `Agriculture.tsx` line ~7753 — `href="#"` instead of `href={footerLinkHref(link)}`
- `Health.tsx` — needs verification
- `Transport.tsx` — needs verification (footerLinkHref defined but render site unknown)

**GROUP 2 — Pages with NO footerLinkHref at all (footer columns still fully `href="#"`):**
- `About.tsx` — footerLinkHref not defined, footer links all `href="#"` (line ~3062)
- `Contact.tsx` — footerLinkHref not defined, footer links all `href="#"` (line ~3875)
- `Methodology.tsx` — footerLinkHref not defined, footer links all `href="#"` (line ~1160)
- `Insights.tsx` — footerLinkHref not defined, footer links all `href="#"` (line ~1408)
- `Resources.tsx` — footerLinkHref not defined, footer links all `href="#"` (line ~2552)

**GROUP 3 — Mobile footer category labels (small "Company"/"Services"/"Resources"/"Insights" chips) still `href="#"` everywhere:**
- `About.tsx` line ~2895, `Resources.tsx` line ~2390, `Methodology.tsx`, `Insights.tsx`, `Contact.tsx`, `Index.tsx` (mobile footer), all sector pages

**GROUP 4 — `/sectors` route missing** — nav says "Sectors → /services" but the original spec says `Sectors → /sectors`. There is no `/sectors` route registered in App.tsx. The "Sectors" nav item goes to `/services` but there is no dedicated `/sectors` landing page. The spec says: "create placeholder routes." Need to either add a `/sectors` route (placeholder or redirect to `/services`) or update the nav to point to `/services`.

**GROUP 5 — Phase 7: Placeholder pages referenced in nav but missing routes:**
- `/sectors` — no route exists (nav points to /services as workaround)
- All intelligence sub-pages exist ✅

**GROUP 6 — Phase 6: "Our Approach / Our Methodology" text links in page body content NOT linked yet.** These are inline text references inside page body JSX (not footer) — none have been converted to clickable links.

**GROUP 7 — Phase 5: Mobile footer category labels + social icons** — social icons all have `href="#"` which is intentional per spec. Mobile category labels need routing.

**GROUP 8 — Phase 9 TypeScript:** The `isMobile` variable in SiteHeader.tsx is declared twice (line 63 uses `typeof window` directly, line 64 uses state). The first one (`const isMobile = ...`) at line 63 is never used — it's shadowed by the state version at line 64. Minor dead code.

---

## Implementation Plan

### Task 1 — Add `/sectors` route to App.tsx
Create `src/pages/Sectors.tsx` as a minimal placeholder that renders `<SiteHeader />` + a styled "Coming Soon" page listing all 12 sectors with links. Register `/sectors` in App.tsx. Update `SiteHeader.tsx` ALL_NAV to point `Sectors → /sectors` instead of `/services`.

### Task 2 — Fix footerLinkHref at render sites in 6 sector pages
Files where `footerLinkHref` is defined but `href="#"` is still used at the link render:
- `Energy.tsx` line 6522
- `Housing.tsx` line 6449
- `Manufacturing.tsx` line ~7011
- `Agriculture.tsx` line 7753
- `Health.tsx` — verify and fix
- `Transport.tsx` — verify and fix

Change `href="#"` → `href={footerLinkHref(link)}` at the `.map((link) =>` render site in each.

### Task 3 — Add footerLinkHref to 5 non-sector pages
Files: `About.tsx`, `Contact.tsx`, `Methodology.tsx`, `Insights.tsx`, `Resources.tsx`

Each needs:
1. `const footerLinkHref = (link: string): string => { ... }` injected before the Footer component
2. All desktop footer column `href="#"` → `href={footerLinkHref(link)}`
3. Mobile footer category label `href="#"` → mapped route

### Task 4 — Wire mobile footer category labels site-wide
The small `["Company", "Services", "Resources", "Insights"]` labels in the mobile footer section.
Map: `Company → /about`, `Services → /services`, `Resources → /resources`, `Insights → /insights`

Files: `About.tsx`, `Contact.tsx`, `Methodology.tsx`, `Insights.tsx`, `Resources.tsx`, `Index.tsx` (mobile footer), and any sector pages that have them.

### Task 5 — Clean up SiteHeader.tsx dead variable
Remove the unused `const isMobile = ...` at line 63 (the one using `typeof window` directly, shadowed by state).

### Task 6 — Add social icon `target="_blank" rel="noopener noreferrer"` per Phase 5 spec
Social icons in footers currently have `href="#"` — leave href="#" as-is (no real URLs) but add `target="_blank" rel="noopener noreferrer"` per the spec requirement.

### Task 7 — Phase 6: Link inline "our approach/methodology" references in page body
Search body content for "our approach", "our methodology", "our process", "how we work" and wrap in `<a href="/methodology">` where they appear as standalone text CTAs (not just footer column labels which are already handled).

---

## Files to create
| File | Purpose |
|---|---|
| `src/pages/Sectors.tsx` | `/sectors` landing page placeholder with 12 sector cards |

## Files to edit
| File | Changes |
|---|---|
| `src/App.tsx` | Add `/sectors` route |
| `src/components/SiteHeader.tsx` | Fix dead `isMobile` variable; update Sectors → `/sectors` |
| `src/pages/About.tsx` | Add footerLinkHref, apply to footer columns + mobile labels |
| `src/pages/Contact.tsx` | Add footerLinkHref, apply to footer columns + mobile labels |
| `src/pages/Methodology.tsx` | Add footerLinkHref, apply to footer columns + mobile labels |
| `src/pages/Insights.tsx` | Add footerLinkHref, apply to footer columns + mobile labels |
| `src/pages/Resources.tsx` | Add footerLinkHref, apply to footer columns + mobile labels |
| `src/pages/sectors/Energy.tsx` | Apply footerLinkHref at render site |
| `src/pages/sectors/Housing.tsx` | Apply footerLinkHref at render site |
| `src/pages/sectors/Manufacturing.tsx` | Apply footerLinkHref at render site |
| `src/pages/sectors/Agriculture.tsx` | Apply footerLinkHref at render site |
| `src/pages/sectors/Health.tsx` | Apply footerLinkHref at render site |
| `src/pages/sectors/Transport.tsx` | Verify + apply footerLinkHref at render site |

