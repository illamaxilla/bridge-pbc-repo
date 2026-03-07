
## Navigation Audit: Completing the Remaining 5 Files

### Summary of what's needed

**5 files still need header replacement and/or footer/CTA fixes:**

1. `src/pages/sectors/Financial.tsx` — has local `Header` component (lines 1118–1416), `<Header />` at line 7735, footer link `href="#"` at lines 7576, footerCategory `href="#"` at line 7406
2. `src/pages/sectors/Technology.tsx` — has local `Header` component (lines 984–1271), `<Header />` at line 7761, footer link `href="#"` at lines 7604
3. `src/pages/sectors/Sports.tsx` — has local `Header` component (lines 1140–1438), `<Header />` at line 7573, footer link `href="#"` at lines 7400
4. `src/pages/Services.tsx` — has inline `<header>` JSX (lines 1522–1750) directly inside the main component (no separate Header function), footer link `href="#"` at lines 5009, 5041, 5071, 5101
5. `src/pages/Index.tsx` — has inline `<header>` + mobile overlay JSX (lines 946–1251) inside main component, "Request Access" button at line 1361, "More Insights" button at line 3844, footer link columns at lines 4428–4441

---

### Per-file changes

#### Financial.tsx (`src/pages/sectors/Financial.tsx`)
- **Lines 1–1**: Add `import SiteHeader from "@/components/SiteHeader";`
- **Lines 1118–1416**: Delete entire `sectorRoutes` + `navHref` + `Header` component (replace with nothing — blank)
- **Line 7735**: Replace `<Header />` with `<SiteHeader />`
- **Footer mobile category `href="#"` (line 7406)**: Map `"Company"→"/about"`, `"Services"→"/services"`, `"Resources"→"/resources"`, `"Insights"→"/insights"`
- **Footer desktop link columns (lines 7576)**: Replace `href="#"` with a `footerLinkHref(link)` lookup function injected before Footer, mapping: About BRIDGE→`/about`, Our Approach→`/methodology`, Sectors→`/services`, Contact Us→`/contact`, Research & Guidance|Venture Development|Direct Investment|Strategic Partnerships→`/services`, White Paper|Case Studies|Research Library|Data & Reports→`/resources`, Insights & Analysis|Sector Briefs|Policy Updates|Annual Review→`/insights`

#### Technology.tsx (`src/pages/sectors/Technology.tsx`)
- **Lines 1–1**: Add `import SiteHeader from "@/components/SiteHeader";`
- **Lines 983–1271**: Delete entire `Header` component + `navHref` (replace with blank)
- **Line 7761**: Replace `<Header />` with `<SiteHeader />`
- **Footer mobile category `href="#"` (line 7434)**: Map `"Company"→"/about"`, etc.
- **Footer desktop links (lines 7604)**: Inject `footerLinkHref` helper, apply to all `href="#"` in link columns

#### Sports.tsx (`src/pages/sectors/Sports.tsx`)
- **Lines 1–1**: Add `import SiteHeader from "@/components/SiteHeader";`
- **Lines 1140–1438**: Delete entire `sectorRoutes` + `navHref` + `Header` component
- **Line 7573**: Replace `<Header />` with `<SiteHeader />`
- **Footer mobile category `href="#"` (line 7400)**: Same mapping
- **Footer desktop links (line 7400)**: Inject `footerLinkHref`, replace `href="#"` in link columns

#### Services.tsx (`src/pages/Services.tsx`)
- **Line 1**: Add `import SiteHeader from "@/components/SiteHeader";`
- **Remove state vars no longer needed**: `hoveredNav`, `logoHovered` — leave rest (they're used by other parts of the page)
- **Lines 1511–1750 (the entire `<style>` + inline `<header>` + mobile overlay)**: Replace with `<SiteHeader />`
- **Footer Company links (line 5006–5020)**: Wire `href="#"` → `footerLinkHref(link)` 
- **Footer Services links (line 5037–5053)**: Wire → `/services`
- **Footer Resources links (line 5070–5083)**: Wire → `/resources`
- **Footer Insights links (line 5101–5114)**: Wire → `/insights`
- **Note on Services.tsx**: The header CSS classes like `.header-icon`, `.cta-primary` are also used by other elements in Services.tsx — so the `<style>` block must be kept, only the `<header>` and mobile overlay JSX replaced with `<SiteHeader />`

#### Index.tsx (`src/pages/Index.tsx`)
- **Line 1**: Change `import { useState, useEffect }` to also import `useNavigate` needs — actually use `<a href="/login">` wrapping since no router imports currently exist in Index.tsx
- **Lines 946–1251 (header + mobile overlay)**: Replace with `<SiteHeader />`
- **State vars to remove**: `hoveredNav`, `mobileMenuOpen`, `logoHovered`, `isScrolled` — BUT some of these may be used elsewhere. Must check first.
- **Line 1342–1362 "Request Access" button**: Wrap in `<a href="/login">` or add `onClick={() => window.location.href='/login'}`
- **Line 3831–3845 "More Insights" button**: Add `onClick={() => window.location.href='/insights'}` or wrap in `<a>`
- **Footer desktop link columns (lines 4428–4441)**: Apply `footerLinkHref` helper
- **Footer mobile category labels (lines 4241–4256)**: Map `"Company"→"/about"`, `"Services"→"/services"`, `"Resources"→"/resources"`, `"Insights"→"/insights"`

### Shared helper function

All 5 files will get this injected near the footer component or near top of file (before Footer):

```ts
const footerLinkHref = (link: string): string => {
  const map: Record<string, string> = {
    "About BRIDGE": "/about",
    "Our Approach": "/methodology",
    "Sectors": "/services",
    "Contact Us": "/contact",
    "Research & Guidance": "/services",
    "Venture Development": "/services",
    "Direct Investment": "/services",
    "Strategic Partnerships": "/services",
    "White Paper": "/resources",
    "Case Studies": "/resources",
    "Research Library": "/resources",
    "Data & Reports": "/resources",
    "Insights & Analysis": "/insights",
    "Sector Briefs": "/insights",
    "Policy Updates": "/insights",
    "Annual Review": "/insights",
  };
  return map[link] || "#";
};
```

### State variable check for Index.tsx

Before removing `hoveredNav`, `mobileMenuOpen`, `logoHovered`, `isScrolled` from Index.tsx state, confirm none are used outside the header block. From the code review:
- `isScrolled`: used only in the header (lines 946–1251) ✓ safe to remove
- `hoveredNav`: used only in nav (lines 1064–1082) ✓ safe to remove  
- `logoHovered`, `mobileMenuOpen`: used only in header block ✓ safe to remove

### State variable check for Services.tsx

Services.tsx has `hoveredNav` at line 1221, `logoHovered` at line 1222 — checking if these are used OUTSIDE the header block (lines 1522–1750). From the search, `hoveredNav` and `logoHovered` appear only in the inline header. Safe to remove from state declarations.

`isScrolled` at line 1226 — also appears to be used only in the header. Safe to remove.

### Files to edit

| File | Lines changed | Action |
|---|---|---|
| `Financial.tsx` | 1, 1118–1416, 7406, 7576, 7735 | Add import, delete Header, fix footer links, swap `<Header />` |
| `Technology.tsx` | 1, 983–1271, 7434, 7604, 7761 | Add import, delete Header, fix footer links, swap `<Header />` |
| `Sports.tsx` | 1, 1140–1438, 7400, 7573 | Add import, delete Header, fix footer links, swap `<Header />` |
| `Services.tsx` | 1, 1221–1222+1226 (state), 1511–1750, 5006–5114 | Add import, remove dead state, replace inline header, fix footer |
| `Index.tsx` | 1, 775–778 (state), 946–1251, 1342–1362, 3831–3845, 4241–4256, 4428–4441 | Add import, remove dead state, replace inline header, wire CTAs, fix footer |
