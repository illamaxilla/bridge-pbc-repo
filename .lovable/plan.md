
## Build Placeholder Sector Pages & Wire Up Routing

### What will be built

12 sector placeholder pages + 1 Services overview page, all wired into `App.tsx` with proper routes. Each placeholder will match the BRIDGE design system (navy `#1B4D3E`, lime `#B8D935`, background `#F3F5F2`) and include the sector name, a brief description, and a "Back to Home" link — ready for you to replace with your real JSX later.

---

### Pages to Create

| File | Route | Sector |
|---|---|---|
| `src/pages/sectors/Energy.tsx` | `/sectors/energy` | Energy & Renewable Resources |
| `src/pages/sectors/Technology.tsx` | `/sectors/technology` | Technology & Innovation |
| `src/pages/sectors/Sports.tsx` | `/sectors/sports` | Sports, Entertainment & Creative |
| `src/pages/sectors/Transport.tsx` | `/sectors/transport` | Transportation & Logistics |
| `src/pages/sectors/Manufacturing.tsx` | `/sectors/manufacturing` | Manufacturing & Light Industry |
| `src/pages/sectors/Housing.tsx` | `/sectors/housing` | Housing & Real Estate |
| `src/pages/sectors/Financial.tsx` | `/sectors/financial` | Financial Inclusion & Economic Security |
| `src/pages/sectors/Health.tsx` | `/sectors/health` | Health Systems & Wellbeing |
| `src/pages/sectors/Infrastructure.tsx` | `/sectors/infrastructure` | Infrastructure & Basic Services |
| `src/pages/sectors/Tourism.tsx` | `/sectors/tourism` | Tourism & Hospitality |
| `src/pages/sectors/Education.tsx` | `/sectors/education` | Education & Skills |
| `src/pages/sectors/Agriculture.tsx` | `/sectors/agriculture` | Agriculture & Value Chains |
| `src/pages/Services.tsx` | `/services` | Services & Sectors Overview |

---

### Steps

1. **Create `src/pages/sectors/` folder** with all 12 sector page files, each using the BRIDGE design system colors and a consistent placeholder layout.

2. **Create `src/pages/Services.tsx`** as a services/sectors overview page listing all 12 sectors with links to their individual pages.

3. **Update `src/App.tsx`** to import all 13 new pages and add their routes above the `*` catch-all.

---

### Placeholder Page Layout

Each sector page will have:
- BRIDGE navigation bar (logo + nav links back to Home and Services)
- Full-width hero banner in navy with the sector name and tagline in lime
- A "Coming Soon" content area with sector description
- A "Back to Home" and "All Sectors" call-to-action
- Consistent footer matching the homepage

This gives you a fully navigable site immediately, and you can drop in your real JSX for each page when ready.

---

### Technical Notes

- All pages are plain `.tsx` files using inline styles matching the existing `colors` design tokens from `Index.tsx` (`#1B4D3E`, `#B8D935`, `#F3F5F2`)
- No new dependencies needed
- `react-router-dom` `Link` used for navigation between pages
- Files go in `src/pages/sectors/` to keep the folder organized
