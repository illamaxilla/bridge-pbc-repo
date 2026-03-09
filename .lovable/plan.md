

## Complete Button/Link Audit — Index.tsx & Services.tsx

### Index.tsx — Unlinked buttons found

| Button | Location | Correct Route |
|---|---|---|
| **Explore Our Work** | Hero section, line 911 (bare `<button>`, no link wrapper) | `/services` |
| **See How It Works** | Approach section, line 1591 (bare `<button>`) | `/methodology` |
| **Learn more** (How We Bridge the Gap) | Line 1912 (bare `<button>`) | `/methodology` |
| **Get Involved** | "Join Us" banner, line 2579 (bare `<button>`) | `/services` |
| **Learn More** (mobile PBC card) | Line 3027 (bare `<button>`) | `/about` |
| **Learn More** (desktop PBC card) | Line 3182 (bare `<button>`) | `/about` |

"View all 12 sectors" at line 2899 — already a `<Link to="/sectors">` ✅  
"More Insights" at line 3440 — already `<a href="/insights">` ✅  
"Request Access" — already `<a href="/login">` ✅  

### Services.tsx — Unlinked buttons found

| Button | Location | Correct Route |
|---|---|---|
| **Explore Opportunities** | Audience section, line 1716 (bare `<button>`) | `/contact` |
| **Learn More About {service}** | Services detail, line 2420 (bare `<button>`) | `/contact` |
| **View Full Analysis** (mobile) | Sectors mobile card, line 2799 (bare `<button>`) | `/intelligence/dashboard` (gated) → use `/login` |
| **View Full Analysis** (desktop) | Sectors desktop card, line 3134 (bare `<button>`) | `/intelligence/dashboard` → use `/login` |
| **See How It Works** | Cross-sector section, line 3281 (bare `<button>`) | `/methodology` |
| **Let's Build Something Together** | Mobile CTA, line 3505 (bare `<button>`) | `/contact` |
| Footer sector icon grid (`href="#"`) | Line 4938 | `/sectors/{name}` routes |

### Fix Approach

All bare `<button>` elements need to be wrapped in `<a href="...">` or converted to a `<button onClick={() => window.location.href = '...'}>`  — we'll use React Router `useNavigate` hook for programmatic navigation (both files already import `useNavigate` or can use `Link`).

The cleanest approach: wrap each bare `<button>` with `<a href="..." style={{ textDecoration: "none" }}>` — consistent with how "Request Access" and "More Insights" are already done in Index.tsx.

### Files & specific line changes

**src/pages/Index.tsx** — 6 buttons to fix:
1. Line 911: wrap `Explore Our Work` button with `<a href="/services">`
2. Line 1591: wrap `See How It Works` button with `<a href="/methodology">`
3. Line 1912: wrap `Learn more` button with `<a href="/methodology">`
4. Line 2579: wrap `Get Involved` button with `<a href="/services">`
5. Line 3027: wrap `Learn More` (mobile PBC) button with `<a href="/about">`
6. Line 3182: wrap `Learn More` (desktop PBC) button with `<a href="/about">`

**src/pages/Services.tsx** — 7 items to fix:
1. Line 1716: wrap `Explore Opportunities` button with `<a href="/contact">`
2. Line 2420: wrap `Learn More About...` button with `<a href="/contact">`
3. Line 2799: wrap `View Full Analysis` (mobile) button with `<a href="/login">`
4. Line 3134: wrap `View Full Analysis` (desktop) button with `<a href="/login">`
5. Line 3281: wrap `See How It Works` button with `<a href="/methodology">`
6. Line 3505: wrap `Let's Build Something Together` with `<a href="/contact">`
7. Line 4938: change footer sector icon `href="#"` to `href={sectorRoutes[sector.key] ?? "#"}` (using same `sectorRoutes` map already defined in file)

No styles will be touched. Only link wrappers are added.

