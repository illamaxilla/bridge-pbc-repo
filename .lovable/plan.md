
## Wire Up Navigation Links Across All Pages

### What needs to change

Every page (Index, Services, and all 12 sector pages) currently uses `href="#"` placeholder anchors in two key places:

1. **Header nav bar** — 5 items: Home, Services, Sectors, Insight, Contact
2. **Footer SectorGrid** — 12 sector icon buttons

These need real URLs substituted. Since all pages use plain `<a href>` tags (not React Router `<Link>`), the fix is simply replacing `href="#"` with the correct path string on the specific elements.

---

### Link mapping

**Header nav items (in every page's `navItems` array render):**

| Nav Item | Route |
|---|---|
| Home | `/` |
| Services | `/services` |
| Sectors | `/services` |
| Insight | `#` (no page yet — leave as-is) |
| Contact | `#` (no page yet — leave as-is) |

**Footer SectorGrid icons (by `key` in `footerSectorIcons`):**

| Key | Label | Route |
|---|---|---|
| infra | Infrastructure & Basic Services | `/sectors/infrastructure` |
| fin | Financial Inclusion | `/sectors/financial` |
| health | Health Systems | `/sectors/health` |
| tech | Technology & Innovation | `/sectors/technology` |
| edu | Education & Skills | `/sectors/education` |
| agri | Agriculture & Value Chains | `/sectors/agriculture` |
| creative | Sports & Creative | `/sectors/sports` |
| housing | Housing & Real Estate | `/sectors/housing` |
| tourism | Tourism & Hospitality | `/sectors/tourism` |
| energy | Energy & Renewables | `/sectors/energy` |
| mfg | Manufacturing | `/sectors/manufacturing` |
| transport | Transportation | `/sectors/transport` |

**Footer "Company" column** — the "Sectors" link maps to `/services`.

---

### Files to edit (14 total)

Each file gets the same two targeted changes:

1. In the `navItems.map(...)` render inside the `Header` component — replace `href="#"` with a conditional based on `item`:

```js
const navHref = item === "Home" ? "/" : item === "Services" || item === "Sectors" ? "/services" : "#";
```

2. In `SectorGrid` — add a `href` lookup by key to the `footerSectorIcons` array (or use an inline map inside the render):

```js
const sectorRoutes = {
  infra: "/sectors/infrastructure",
  fin: "/sectors/financial",
  health: "/sectors/health",
  tech: "/sectors/technology",
  edu: "/sectors/education",
  agri: "/sectors/agriculture",
  creative: "/sectors/sports",
  housing: "/sectors/housing",
  tourism: "/sectors/tourism",
  energy: "/sectors/energy",
  mfg: "/sectors/manufacturing",
  transport: "/sectors/transport",
};
```

Then `href={sectorRoutes[sector.key] ?? "#"}` on each sector icon anchor.

3. In the footer "Company" column's static link array, replace the "Sectors" entry's `href` with `/services`.

**Files:**
- `src/pages/Index.tsx`
- `src/pages/Services.tsx`
- `src/pages/sectors/Energy.tsx`
- `src/pages/sectors/Technology.tsx`
- `src/pages/sectors/Sports.tsx`
- `src/pages/sectors/Transport.tsx`
- `src/pages/sectors/Manufacturing.tsx`
- `src/pages/sectors/Housing.tsx`
- `src/pages/sectors/Financial.tsx`
- `src/pages/sectors/Health.tsx`
- `src/pages/sectors/Infrastructure.tsx`
- `src/pages/sectors/Tourism.tsx`
- `src/pages/sectors/Education.tsx`
- `src/pages/sectors/Agriculture.tsx`

---

### Technical notes

- All pages use plain `<a>` tags, not React Router `<Link>`. This works fine for SPA navigation since Vite's dev server handles client-side routing — no import changes needed.
- "Insight" and "Contact" have no corresponding pages yet, so those stay as `href="#"`.
- No logic changes, no new dependencies.
