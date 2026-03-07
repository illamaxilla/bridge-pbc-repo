
## Gap Analysis: 3 Outstanding Items

### 1. SiteFooter shared component — NOT DONE ❌
There is no `src/components/SiteFooter.tsx`. Every page still has its own copy-pasted `const Footer = () => {...}` component — confirmed in 17 files. The footer is ~250 lines of JSX duplicated across all pages.

### 2. "Sectors" footer link points to `/services` instead of `/sectors` — NOT DONE ❌
14 files still have `"Sectors": "/services"` in their `footerLinkHref` map. Only `About.tsx`, `Contact.tsx`, `Methodology.tsx`, `Insights.tsx`, and `Resources.tsx` correctly point to `/sectors`. The sector pages all have `/services` as the stale value.

### 3. `Sectors.tsx` placeholder has no footer at all — minor gap
The `/sectors` page has a header and sector grid but renders without a footer component.

### What IS already done ✅
- `SiteHeader.tsx` is complete and working across all 20 pages
- Active-page exclusion rule is live (filters current route from nav)
- Mobile overlay: dark #191919, hamburger animation, scroll lock, Request Access → /login, closes on nav
- `footerLinkHref` defined AND applied in all 20 pages
- Mobile footer category labels wired correctly in all pages that received the last audit pass
- Social icons have `target="_blank" rel="noopener noreferrer"`

---

## Plan

### Task A — Create `src/components/SiteFooter.tsx`
Extract the full footer JSX from `About.tsx` (the most complete/correct version with `footerLinkHref`, `BridgeLogoWhite`, `SectorGrid`, social icons, subscribe input, mobile/desktop variants, bottom bar) into a standalone shared component.

The shared `SiteFooter` will:
- Import its own `footerLinkHref` map (with `"Sectors": "/sectors"` corrected)
- Import `useIsMobile` hook from `@/hooks/use-mobile` or define inline
- Use `BridgeLogoWhite` and `socialIcons` defined locally
- Include `SectorGrid` (12 sector links with dots navigation)
- Render both mobile and desktop footer variants
- Export as `default`

### Task B — Replace local `Footer` in all 19 pages with `<SiteFooter />`
Files: `About.tsx`, `Contact.tsx`, `Methodology.tsx`, `Insights.tsx`, `Resources.tsx`, `Index.tsx`, `Services.tsx`, `Sectors.tsx`, and all 12 sector pages.

Each file change:
1. Add `import SiteFooter from "@/components/SiteFooter";`
2. Delete the local `const footerLinkHref = ...` function
3. Delete the local `const Footer = () => {...}` component
4. Replace `<Footer />` with `<SiteFooter />`

### Task C — Fix `"Sectors": "/services"` → `"Sectors": "/sectors"` in the SiteFooter
This fix goes into the single `SiteFooter.tsx` — no need to patch 14 individual files.

### Files to create
| File | Purpose |
|---|---|
| `src/components/SiteFooter.tsx` | Shared footer with correct routing |

### Files to edit
| File | Change |
|---|---|
| `src/pages/About.tsx` | Remove local footerLinkHref + Footer, add `<SiteFooter />` |
| `src/pages/Contact.tsx` | Same |
| `src/pages/Methodology.tsx` | Same |
| `src/pages/Insights.tsx` | Same |
| `src/pages/Resources.tsx` | Same |
| `src/pages/Index.tsx` | Same |
| `src/pages/Services.tsx` | Same |
| `src/pages/Sectors.tsx` | Add footer (currently has none) |
| `src/pages/sectors/Agriculture.tsx` | Same |
| `src/pages/sectors/Education.tsx` | Same |
| `src/pages/sectors/Energy.tsx` | Same |
| `src/pages/sectors/Financial.tsx` | Same |
| `src/pages/sectors/Health.tsx` | Same |
| `src/pages/sectors/Housing.tsx` | Same |
| `src/pages/sectors/Infrastructure.tsx` | Same |
| `src/pages/sectors/Manufacturing.tsx` | Same |
| `src/pages/sectors/Sports.tsx` | Same |
| `src/pages/sectors/Technology.tsx` | Same |
| `src/pages/sectors/Tourism.tsx` | Same |
| `src/pages/sectors/Transport.tsx` | Same |

**Execution order**: Create `SiteFooter.tsx` first, then replace in all pages in parallel batches.
