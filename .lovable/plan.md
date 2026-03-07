

## Key Findings from Audit

### Site structure
- **16 pages** with individually copy-pasted `Header` and `Footer` components in every single page file — there is no shared header/nav component
- Pages: `/` `/about` `/services` `/resources` `/insights` `/methodology` `/contact` `/login` + 12 sector pages + `/intelligence/*` (nested)
- The `navHref()` function in most pages only maps Home → `/`, About → `/about`, Services/Sectors → `/services`, everything else → `#`
- The `navItems` array varies across pages: most use `["Home", "Services", "Sectors", "Insight", "Contact"]` but some show `["About", "Sectors", "Services", "Insights", "Contact"]` — **inconsistent**
- The requested nav is `["Home", "About", "Sectors", "Insight", "Resources", "Contact"]` — `Resources` is missing from most pages, `Services` is present but not in the requested list

### `href="#"` problems (most critical)
- **All nav links in Contact.tsx** use `href="#"` — not wired at all
- **All desktop nav links in About.tsx** use `href="#"` — not wired at all  
- **All footer links** in every page use `href="#"`
- **All mobile menu links in Contact.tsx** use `href="#"`
- **"Request Access" / "Get Access" buttons** across all pages and mobile menus — not wired to `/login`
- **"More Insights" button** in Index.tsx — not wired to `/insights`
- **"Explore Sectors" button** in Services.tsx — not wired to `/services`
- **Logo in About.tsx header** has no link at all (no `href`)
- **Social icons** in footers all use `href="#"` — intentional placeholder

### What needs to be built
1. A **shared Header component** (`src/components/SiteHeader.tsx`) that all 16 pages import, replacing 16 individual copies — this is the only practical way to maintain consistent nav
2. The Header must: use `useLocation()` from react-router-dom to detect current page, filter it from the nav array, wire all 5 remaining items, wire logo to `/`, wire "Request Access" to `/login`
3. **Footer link map** to be updated across all pages: Company links → real routes, Resources links → `/resources`, Insights → `/insights`, Services → `/services`, About BRIDGE → `/about`, Sectors → `/services`, Contact Us → `/contact`, Our Approach → `/methodology`
4. **Specific CTAs** to be wired: "More Insights" → `/insights`, "Explore Sectors" → `/services`, all "Request Access" / "Get Access" buttons → `/login`
5. **`navHref()` function** to be updated to map all 6 nav items including `Resources → /resources` and `Insight → /insights`

### Scope decision

The request covers 16 page files, many with 5,000–8,000 lines each. Building one shared `SiteHeader.tsx` component and importing it into all pages is the right architectural move, but it means editing 16 large files just to swap the header. The most practical, low-risk approach is:

**Create a shared `SiteHeader.tsx`** and **update the nav/linking in a targeted way** across all pages — fixing the `navHref` function, wiring the CTA buttons, fixing footer links, and updating mobile menu links. The shared component handles the active-page exclusion rule in one place.

---

## The Plan

### Phase A — Create `src/components/SiteHeader.tsx`

A new shared header component that all 16 page files will import. It:
- Imports `useLocation` from react-router-dom to detect `pathname`
- Nav items: `["Home", "About", "Sectors", "Insight", "Resources", "Contact"]`
- Route map: Home→`/`, About→`/about`, Sectors→`/services`, Insight→`/insights`, Resources→`/resources`, Contact→`/contact`
- Filters out the nav item that matches current page pathname
- Logo (SVG, dark variant) links to `/`  
- On desktop: centered nav + right-side "Request Access" button → `onClick` navigates to `/login` (using `useNavigate`)
- On mobile: animated hamburger → opens overlay menu with same filtered nav + "Request Access" CTA → `/login`
- Scroll state → frosted glass effect
- Body scroll lock when mobile menu open
- Matches existing visual design (colors, fonts, sizes)

### Phase B — Replace headers in all 16 page files

Files to update:
- `src/pages/Index.tsx` — replace existing `Header` component
- `src/pages/About.tsx` — replace existing `Header` component
- `src/pages/Services.tsx` — replace existing `Header` component
- `src/pages/Resources.tsx` — replace existing `Header` component
- `src/pages/Insights.tsx` — replace existing `Header` component
- `src/pages/Methodology.tsx` — replace existing `Header` component
- `src/pages/Contact.tsx` — replace existing `Header` component
- `src/pages/sectors/Agriculture.tsx` — replace existing `Header`
- `src/pages/sectors/Education.tsx` — replace existing `Header`
- `src/pages/sectors/Energy.tsx` — replace existing `Header`
- `src/pages/sectors/Financial.tsx` — replace existing `Header`
- `src/pages/sectors/Health.tsx` — replace existing `Header`
- `src/pages/sectors/Housing.tsx` — replace existing `Header`
- `src/pages/sectors/Infrastructure.tsx` — replace existing `Header`
- `src/pages/sectors/Manufacturing.tsx` — replace existing `Header`
- `src/pages/sectors/Sports.tsx` — replace existing `Header`
- `src/pages/sectors/Technology.tsx` — replace existing `Header`
- `src/pages/sectors/Tourism.tsx` — replace existing `Header`
- `src/pages/sectors/Transport.tsx` — replace existing `Header`
- `src/pages/Sector.tsx` — replace existing `Header`

Each file: delete the local `Header` function + `navHref` helper + `navItems` array, add `import SiteHeader from "@/components/SiteHeader"`, and replace `<Header />` with `<SiteHeader />`.

### Phase C — Wire CTA buttons across pages

| Page | Button text | New target |
|---|---|---|
| `Index.tsx` | "Request Access" | `/login` |
| `Index.tsx` | "More Insights" | `/insights` |
| All sector pages | "Request Access" (desktop + mobile) | `/login` |
| `Services.tsx` | "Explore Sectors" (if present) | `/services` |
| `Resources.tsx` | "Get Access" | `/login` |
| `Methodology.tsx` | "Request Access" | `/login` |
| All pages (mobile menu) | "Request Access" CTA | `/login` (now in SiteHeader) |

Implementation: convert `<button onClick>` + `useNavigate('/login')` or wrap in `<a href="/login">` style button.

### Phase D — Fix footer links

The footer is also copy-pasted across every page. Update the footer link data arrays in each page file to map links to real routes:

| Footer link text | Route |
|---|---|
| About BRIDGE | `/about` |
| Our Approach | `/methodology` |
| Sectors | `/services` |
| Contact Us | `/contact` |
| Research & Guidance | `/services` |
| Venture Development | `/services` |
| Direct Investment | `/services` |
| Strategic Partnerships | `/services` |
| White Paper | `/resources` |
| Case Studies | `/resources` |
| Research Library | `/resources` |
| Data & Reports | `/resources` |
| Insights & Analysis | `/insights` |
| Sector Briefs | `/insights` |
| Policy Updates | `/insights` |
| Annual Review | `/insights` |
| Terms/Privacy/Accessibility | `#` (no pages exist, keep as placeholder) |
| Social icons | `#` (external links, keep as placeholder) |

The logo in the footer (white variant) → wrap in `<a href="/">` or use `useNavigate`.

### Phase E — Mobile menu in SiteHeader

The shared `SiteHeader` (Phase A) will already have the correct mobile menu. The mobile-specific requirements:
- `#191919` background
- Large 24px touch-friendly nav links (48px+ tap target via padding)
- Active page excluded
- "Request Access" CTA button (lime accent) → navigates to `/login` and closes menu
- Body scroll lock when open (`document.body.style.overflow = "hidden"`)
- Animated hamburger → X transition
- `fadeIn 0.25s ease` animation on overlay

### Phase F — `navHref` / nav inconsistency cleanup

The shared SiteHeader handles this. The individual `navHref` helpers in sector pages become dead code and are removed in Phase B.

### Files to create

| File | Action |
|---|---|
| `src/components/SiteHeader.tsx` | Create — shared header component |

### Files to edit (20 page files)

Each page: remove local `Header`, `navHref`, `navItems`; add SiteHeader import; wire CTA buttons; fix footer link `href="#"` → real routes.

### What is NOT changing
- Sector grid footer icons (already correctly wired via `sectorRoutes`)
- Social media icons → stay as `href="#"` (no real URLs exist yet)
- Terms/Privacy/Accessibility → stay as `href="#"` (no pages exist)
- Intelligence sidebar (already uses `NavLink` with correct routes)
- `src/pages/Login.tsx` (already correct)
- Footer content/layout — only the `href` values change

### Active-page exclusion implementation

```text
// In SiteHeader.tsx
const location = useLocation();
const ALL_NAV = [
  { label: "Home",      to: "/" },
  { label: "About",     to: "/about" },
  { label: "Sectors",   to: "/services" },
  { label: "Insight",   to: "/insights" },
  { label: "Resources", to: "/resources" },
  { label: "Contact",   to: "/contact" },
];
const activeNav = ALL_NAV.filter(item => {
  if (item.to === "/" ) return location.pathname !== "/";
  return !location.pathname.startsWith(item.to);
});
```

The active item gets a lime underline dot instead of being removed (better UX — user can always go Home), but per the spec: filter it out entirely.

