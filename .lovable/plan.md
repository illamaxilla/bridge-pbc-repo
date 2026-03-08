
## Understanding the request

The user uploaded a reference image showing a minimal header with just 3 icons on the right side: Search (magnifying glass), Account (person outline), and Menu (hamburger). No nav text, no "Request Access" button. Clean, minimal.

**Current situation:**
- `SiteHeader.tsx` = full header with: BRIDGE logo (left), centered nav links, "Request Access" pill button (desktop) / hamburger (mobile)
- All pages currently import `SiteHeader`

**What the user wants:**
- **Sector pages** (12 pages in `/src/pages/sectors/`) → keep the **current** `SiteHeader` (logo + nav + Request Access button)
- **All other regular pages** (Index, About, Sectors, Insights, Resources, Contact, Methodology, Services, Login) → use a **new minimal header**: BRIDGE logo (left) + 3 icons on the right (Search, Account/Person, Hamburger menu)
- **Intelligence pages** → unchanged (they have their own Intelligence.tsx shell header)

## Plan

### 1. Create `SiteHeaderMinimal.tsx`
A new component at `src/components/SiteHeaderMinimal.tsx` with:
- Same BRIDGE logo on the left (reuse the SVG)
- Same sticky/scrolled behavior (frosted glass on scroll)
- Right side: 3 icon buttons — Search, Person, Hamburger
- Hamburger opens the same dark mobile overlay (with nav links + Request Access CTA) — same overlay content as current SiteHeader
- The person icon → `/login`
- Search icon → could open a search state or just link (we'll make it a clickable icon, same styling as the reference)
- Same active-page exclusion for the mobile overlay nav

### 2. Update imports in non-sector, non-intelligence pages
Replace `import SiteHeader from "@/components/SiteHeader"` → `import SiteHeader from "@/components/SiteHeaderMinimal"` in:
- `src/pages/Index.tsx`
- `src/pages/About.tsx`
- `src/pages/Sectors.tsx`
- `src/pages/Insights.tsx`
- `src/pages/Resources.tsx`
- `src/pages/Contact.tsx`
- `src/pages/Methodology.tsx`
- `src/pages/Services.tsx`
- `src/pages/Login.tsx`

### 3. Sector pages keep current `SiteHeader`
No changes to any of the 12 `/src/pages/sectors/*.tsx` files.

### Icon details from the reference image
The image shows 3 clean stroke icons, no fill, evenly spaced:
1. Search — magnifying glass
2. Account — person/user circle outline  
3. Menu — three horizontal lines (hamburger)

All icons are thin stroke, similar to lucide-react style. We'll use lucide-react: `Search`, `User`, `Menu`/`X` icons.

### Desktop layout
- Logo left
- No centered nav links (the minimal version hides these)
- Right: Search icon + Person icon + Hamburger icon (all 3 visible on desktop too, per the reference)
- The hamburger on desktop opens the same dark overlay menu (revealing the nav links)

### Mobile layout
- Same as desktop (logo left, 3 icons right)
- Same overlay behavior

### Files to create/edit
| Action | File |
|---|---|
| Create | `src/components/SiteHeaderMinimal.tsx` |
| Edit (import swap) | `src/pages/Index.tsx` |
| Edit (import swap) | `src/pages/About.tsx` |
| Edit (import swap) | `src/pages/Sectors.tsx` |
| Edit (import swap) | `src/pages/Insights.tsx` |
| Edit (import swap) | `src/pages/Resources.tsx` |
| Edit (import swap) | `src/pages/Contact.tsx` |
| Edit (import swap) | `src/pages/Methodology.tsx` |
| Edit (import swap) | `src/pages/Services.tsx` |
| Edit (import swap) | `src/pages/Login.tsx` |
| No change | All 12 `/src/pages/sectors/*.tsx` files |
| No change | All intelligence pages |
