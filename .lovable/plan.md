
## Full scope: Nav unification + search overlay + dead link audit

### Exact current state confirmed

**`SiteHeaderMinimal.tsx` (lines 74–77)**: Still has `visibleNav` filter — excludes current page from menu. Mobile overlay uses `visibleNav.map`. No search wired. 7 pages use this.

**`SiteHeader.tsx` (lines 92–95)**: Still has `visibleNav` filter — excludes current page. Desktop nav AND mobile overlay both use `visibleNav.map`. No search wired. 13 sector pages use this.

**`Insights.tsx` (lines 883–1183)**: Private `BridgeLogo` + private `SiteHeader` function with only 6 items, all `href="#"`, broken. Used at line 1926.

**Dead `href="#"` confirmed in**:
- `Insights.tsx` — sector grid icons (line 1470), footer nav labels (line 1606), social icons mobile (line 1668) + desktop (line 1850), Terms/Privacy (line 1890)
- `SiteFooter.tsx` — social icons mobile (line 395) + desktop (line 589), Terms/Privacy (line 433, 633)
- `Contact.tsx` — sector grid (line 3632), social icons (lines 3790, 3980), Terms/Privacy (line 4024)
- `Resources.tsx` — sector grid (line 2258), social icons (lines 2466, 2648), Terms/Privacy (line 2688)
- `Services.tsx` — social icons (lines 4566, 4771), Terms/Privacy (line 5022)
- `community/index.tsx` — "Forgot password?" (line 923), "Request Access" (line 974)

---

### Plan — 6 files, 3 categories

---

#### Category 1: `SiteHeaderMinimal.tsx` — full rewrite of state/nav/search (lines 55–264)

**Changes:**
1. Add `searchOpen` + `searchQuery` state
2. Replace `visibleNav` filter (lines 74–77) with `isActive` helper:
   ```ts
   const isActive = (item: typeof ALL_NAV[0]) =>
     item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);
   ```
3. Wire Search button `onClick={() => setSearchOpen(true)}`
4. Mobile overlay: change `visibleNav.map` → `ALL_NAV.map`, add per-item active styling:
   - Active: `color: "#FFFFFF"`, `fontWeight: "600"`, lime `•` dot before label, arrow dimmed to `rgba(255,255,255,0.12)`
   - Inactive: `color: "rgba(255,255,255,0.6)"`, `fontWeight: "300"`, arrow normal
5. Add search overlay (full-screen, `position: fixed`, `top: 0`, `z-index: 1001`, dark `#191919` bg):
   - Auto-focused input, large font (32px), white on dark
   - ESC key + X button closes it
   - Filters `SEARCH_ITEMS` array (10 nav pages + 12 sectors) by label substring match
   - Clicking a result: `navigate(item.to)`, close overlay
   - `SEARCH_ITEMS` added as a module-level const

**`SEARCH_ITEMS` constant** (added at module top):
```ts
const SEARCH_ITEMS = [
  ...ALL_NAV,
  { label: "Energy", to: "/sectors/energy" },
  { label: "Technology", to: "/sectors/technology" },
  { label: "Agriculture", to: "/sectors/agriculture" },
  { label: "Education", to: "/sectors/education" },
  { label: "Financial", to: "/sectors/financial" },
  { label: "Health", to: "/sectors/health" },
  { label: "Housing", to: "/sectors/housing" },
  { label: "Infrastructure", to: "/sectors/infrastructure" },
  { label: "Manufacturing", to: "/sectors/manufacturing" },
  { label: "Sports", to: "/sectors/sports" },
  { label: "Tourism", to: "/sectors/tourism" },
  { label: "Transport", to: "/sectors/transport" },
];
```

---

#### Category 2: `SiteHeader.tsx` — same changes (lines 63–339)

**Changes:**
1. Same `isActive` helper, replace `visibleNav` (lines 92–95)
2. Same `SEARCH_ITEMS` + `searchOpen`/`searchQuery` state
3. Wire Search icon — but `SiteHeader` currently has NO search icon in desktop right side. Add a Search icon button before "Request Access" on desktop; add search icon next to hamburger on mobile.
4. Desktop nav: per-item active styling — active: `color: clr.primary`, `fontWeight: "700"`, 3px lime underline bar; inactive: unchanged hover behavior
5. Mobile overlay: `visibleNav.map` → `ALL_NAV.map`, same active styling as SiteHeaderMinimal
6. Same full-screen search overlay component

---

#### Category 3: `Insights.tsx` — remove private header, fix all dead links

**Lines 883–1183 (private `BridgeLogo` + private `SiteHeader` function)**: DELETE entirely.

**Line 1 imports**: Add `import SiteHeaderMinimal from "@/components/SiteHeaderMinimal";`

**Line 950–958 (`useIsMobile` private hook)**: DELETE (already imported from `@/hooks/use-mobile` in many other places, but Insights uses its own. After removing the private SiteHeader, check if `useIsMobile` is still used elsewhere in Insights — it IS used by `Footer` at line 1588. Keep the private `useIsMobile` hook OR import from `@/hooks/use-mobile`. Will use the existing import path).

Actually: `Insights.tsx` does NOT import from `@/hooks/use-mobile`. It has its own at line 950. The Footer at line 1588 uses `useIsMobile`. Keep the hook, just delete the SiteHeader + BridgeLogo. But `BridgeLogo` is also used inside the private `SiteHeader` and also inside the second `BridgeLogoWhite` component at line ~1510. Need to check.

**Line 1926**: Change `<SiteHeader activePage="Insight" />` → `<SiteHeaderMinimal />`

**Dead links in Insights.tsx footer:**
- Sector grid `href="#"` (line 1470) → `href={sectorRoutes[sector.key]}` using inline route map
- Footer nav labels `href="#"` (line 1606) — map `{Company→/about, Services→/services, Resources→/resources, Insights→/insights}`
- Social icons `href="#"` (lines 1668, 1850) → `[0]=LinkedIn, [1]=Twitter, [2]=Facebook` → correct hrefs
- Terms/Privacy/Accessibility `href="#"` (lines 1768, 1890) → keep `href="#"` (no pages exist)

---

#### Category 4: `SiteFooter.tsx` — fix social icons

- Social icons mobile (line 395): index 0=LinkedIn, 1=Twitter, 2=Facebook → add `href` per icon using an `SOCIAL_HREFS` array
- Social icons desktop (line 589): same
- Terms/Privacy/Accessibility (lines 433, 633): keep `href="#"` — no pages for these

**`SOCIAL_HREFS`** added at top of `SiteFooter.tsx`:
```ts
const SOCIAL_HREFS = [
  "https://www.linkedin.com/company/bridge-pbc",
  "https://twitter.com/bridgepbc",
  "https://www.facebook.com/bridgepbc",
];
```
Change: `href="#"` → `href={SOCIAL_HREFS[i]}`

---

#### Category 5: `Contact.tsx` — fix sector grid + social icons

- Sector grid (line 3632): `href="#"` → `href={SECTOR_ROUTES[sector.key] ?? "#"}` (add route map at local scope matching the one in SiteFooter)
- Social icons mobile (line 3790): → `href={SOCIAL_HREFS[i]}`
- Social icons desktop (line 3980): → `href={SOCIAL_HREFS[i]}`
- Terms/Privacy (line 4024): keep `href="#"`

---

#### Category 6: `Resources.tsx` + `Services.tsx` — same social icon fix

Same pattern: replace `href="#"` with `href={SOCIAL_HREFS[i]}` and sector grid with proper routes.

---

#### Category 7: `community/index.tsx`

- Line 923 "Forgot password?" → `onClick={() => navigate("/login")}` (or just keep as `href="/login"` — simpler)
- Line 974 "Request Access" → `href="/login"` or `onClick={() => navigate("/login")}`

---

### Active indicator visual summary

**Mobile overlay (both header components):**
```
• BRIDGE Intelligence    →   ← white #FFF, 600 weight, lime dot
  Home                   →   ← rgba(255,255,255,0.6), 300 weight
  About                  →
  Methodology            →
  Sectors                →
  ...
```

**Desktop nav (SiteHeader.tsx — sector pages only):**
```
Home  About  [Sectors]  Insight  BRIDGE Intelligence  ...
             ————
             3px lime underline bar, centered
```

### Search overlay visual

```
[X]  ___________________________________
     | Search pages and sectors...     |
     ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
     
     Home                            →
     About                           →
     Sectors                         →
     Energy                          →
     Technology                      →
     ...
```

Dark `#191919` background, `position: fixed`, `top: 0`, full height, `z-index: 1001` (above menu overlay). Input autofocused. Results are large clickable rows. ESC to close.

### Files changed — 6 total
1. `src/components/SiteHeaderMinimal.tsx`
2. `src/components/SiteHeader.tsx`
3. `src/pages/Insights.tsx`
4. `src/components/SiteFooter.tsx`
5. `src/pages/Contact.tsx`
6. `src/pages/Resources.tsx`
7. `src/pages/Services.tsx`
8. `src/pages/community/index.tsx`
