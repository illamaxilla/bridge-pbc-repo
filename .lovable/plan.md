
## Wire Up All Remaining Navigation Links

### Summary

Only `Agriculture.tsx` currently has working `href` links. The other 13 files need targeted JSX replacements. The `sectorRoutes` map and `navHref` helper are already injected at the module level in the 11 remaining sector files, but none of them use those values in the actual JSX yet. `Index.tsx` and `Services.tsx` have neither the helpers nor the wired-up JSX.

---

### Changes per file group

#### Group A — 11 Sector Pages (Energy, Technology, Sports, Transport, Manufacturing, Housing, Financial, Health, Infrastructure, Tourism, Education)

Each file already has `sectorRoutes` and `navHref` defined at module level. Three surgical replacements needed per file:

1. **Desktop nav anchor** (inside `navItems.map`) — replace `href="#"` with `href={navHref(item)}`
2. **Mobile menu anchor** (inside second `navItems.map`) — replace `href="#"` with `href={navHref(item)}`
3. **Footer sector icon anchor** (inside `footerSectorIcons.map`) — replace `href="#"` with `href={sectorRoutes[sector.key] ?? "#"}`

That is 33 line-level edits (3 per file × 11 files).

---

#### Group B — Index.tsx

No `navHref` or `sectorRoutes` exist yet. Two changes needed:

1. **Add helper constants** near the top of the file (after the `footerSectorIcons` array, around line 510):
```js
const sectorRoutes: Record<string, string> = {
  infra: "/sectors/infrastructure", fin: "/sectors/financial",
  health: "/sectors/health", tech: "/sectors/technology",
  edu: "/sectors/education", agri: "/sectors/agriculture",
  creative: "/sectors/sports", housing: "/sectors/housing",
  tourism: "/sectors/tourism", energy: "/sectors/energy",
  mfg: "/sectors/manufacturing", transport: "/sectors/transport",
};
const navHref = (item: string) =>
  item === "About" ? "/" :
  item === "Services" || item === "Sectors" ? "/services" : "#";
```

2. **Desktop nav anchor** (line 1048) — replace `href="#"` with `href={navHref(item)}`
3. **Footer sector icon anchor** (line 520) — replace `href="#"` with `href={sectorRoutes[sector.key] ?? "#"}`

Note: Index.tsx has no mobile menu nav based on code inspection.

---

#### Group C — Services.tsx

Same situation as Index.tsx — no helpers yet. Three changes needed:

1. **Add helper constants** near the top (after the `footerSectorIcons` array), with the same mapping as above. Note: `navHref` for Services.tsx maps "About" → `/`, "Sectors" → `/services`, "Services" → `/services`.

2. **Desktop nav anchor** (line 1584) — replace `href="#"` with `href={navHref(item)}`
3. **Footer sector icon anchor** (line 5118) — replace `href="#"` with `href={sectorRoutes[sector.key] ?? "#"}`
4. **Hero sector icon grid** (line 1944) — currently a `<div>` with `cursor: pointer`. Change to `<a>` tag with `href={sectorRoutes[sector.key] ?? "#"}` so clicking a sector in the hero grid navigates to that sector page.

---

### Files to Edit (13 total)

```text
src/pages/Index.tsx
src/pages/Services.tsx
src/pages/sectors/Energy.tsx
src/pages/sectors/Technology.tsx
src/pages/sectors/Sports.tsx
src/pages/sectors/Transport.tsx
src/pages/sectors/Manufacturing.tsx
src/pages/sectors/Housing.tsx
src/pages/sectors/Financial.tsx
src/pages/sectors/Health.tsx
src/pages/sectors/Infrastructure.tsx
src/pages/sectors/Tourism.tsx
src/pages/sectors/Education.tsx
```

No new dependencies. No logic changes. All replacements are minimal one-line `href` swaps or a small block addition.
