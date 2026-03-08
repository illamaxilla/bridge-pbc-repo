
## Pre-publish sanitation audit — full findings

### What I examined
- All header components (SiteHeader, SiteHeaderMinimal)
- SiteFooter (centralized component)
- All 20 pages for footer usage
- Console errors
- Typography/font families used across the codebase
- Logo → home routing
- Nav item completeness

---

## Issues Found

### 1. CRITICAL — Console errors (2 active warnings)

The console shows two React `ref` warnings on every page that uses `SiteFooter`:

```
Warning: Function components cannot be given refs.
Check the render method of `SiteFooter`.
  at BridgeLogoWhite    ← in SiteFooter.tsx line 205
  at SectorGrid         ← in SiteFooter.tsx line 231
```

**Root cause**: `BridgeLogoWhite` and `SectorGrid` are defined as plain arrow functions inside `SiteFooter.tsx` (not exported, not `forwardRef`). React throws this warning when a plain function component is passed a ref. This happens because they're inline components rendered inside `SiteFooter` — not a blocking error, but will clutter the console in production. Fix: wrap both with `React.memo` or convert to named function declarations, which silences this React dev-mode warning.

---

### 2. MAJOR — `Index.tsx` has its OWN inline footer (not using SiteFooter)

`Index.tsx` is the only page that **never got migrated** to `<SiteFooter />`. It still has its own ~400-line inline footer starting at line 3932, with its own `BridgeLogoWhite` function, its own `footerLinkHref` map, and its own sector grid — all with the **old incorrect link mappings** (e.g. "Sector Briefs" → `/insights`, etc.).

This means the homepage footer is still broken with the old links, while every other page was fixed.

**Fix**: Replace the inline footer block in `Index.tsx` with `<SiteFooter />`, import `SiteFooter` at the top, and delete the dead `BridgeLogoWhite` function defined at line 648.

---

### 3. MODERATE — `SiteHeader.tsx` (sector pages) is missing nav items

`SiteHeaderMinimal.tsx` (used on Home, About, etc.) has the full 9-item nav:
```
Home, About, Methodology, Sectors, Insight, BRIDGE Intelligence, Community, Resources, Contact
```

But `SiteHeader.tsx` (used on ALL 13 sector pages + Sectors.tsx) only has 6:
```
Home, About, Sectors, Insight, Resources, Contact
```
Missing: **Methodology**, **BRIDGE Intelligence**, **Community**

A user on a sector page who wants to navigate to the Intelligence dashboard or Community has no way to get there from the header nav.

**Fix**: Update `ALL_NAV` in `SiteHeader.tsx` to match the full 9-item list from `SiteHeaderMinimal.tsx`.

---

### 4. MINOR — Dead `BridgeLogoWhite` code in 13 page files

Since `SiteFooter` is now used everywhere (and has its own `BridgeLogoWhite` inside it), the following pages still have their own unused `BridgeLogoWhite` const declarations that are never rendered:

`About.tsx`, `Insights.tsx`, `Methodology.tsx` (core pages) + all 12 sector pages (`Energy`, `Technology`, `Sports`, `Transport`, `Manufacturing`, `Housing`, `Financial`, `Health`, `Infrastructure`, `Tourism`, `Education`, `Agriculture`).

These are harmless dead code but bloat each file by ~100+ lines. Not blocking for publish, but clean-up is recommended.

---

### 5. TYPOGRAPHY — Consistent and intentional ✓ (with notes)

The site uses a deliberate 3-font system:
```
Poppins       → Hero headlines, large display text
DM Sans       → Body copy, subheadings, UI labels, footer
Inter         → Data labels, intelligence dashboard, metrics/numbers
```

This is **thematic** — Poppins for impact, DM Sans for reading, Inter for data. However:
- `SiteHeader.tsx` uses `Inter, sans-serif` for nav links (15px / 500 weight) — **consistent**
- `SiteHeaderMinimal.tsx` uses `DM Sans, sans-serif` in the overlay menu — **consistent**
- Footer exclusively uses `DM Sans` — **consistent**
- Individual page body text is consistently `DM Sans` — **consistent**

Verdict: Typography is **systematic and intentional**, not scattered.

---

### 6. LOGO → HOME — Works correctly ✓

Both headers have:
```tsx
<a href="/" onClick={(e) => { e.preventDefault(); handleNavClick("/"); }}>
  <BridgeLogo />
</a>
```
The footer logo (`BridgeLogoWhite` in `SiteFooter.tsx` line 206) also wraps in `<a href="/">`. All three correctly return to home.

**One exception**: The inline footer in `Index.tsx` (issue #2 above) — `BridgeLogoWhite` on the homepage is just a `<div>` with no link wrapper.

---

## Summary of Changes Needed

| Priority | File | Fix |
|---|---|---|
| Critical | `src/components/SiteFooter.tsx` | Suppress `BridgeLogoWhite` + `SectorGrid` ref warnings |
| Major | `src/pages/Index.tsx` | Replace inline footer with `<SiteFooter />`, fix logo link |
| Moderate | `src/components/SiteHeader.tsx` | Add missing 3 nav items (Methodology, BRIDGE Intelligence, Community) |
| Minor | 13 page files | Remove dead `BridgeLogoWhite` declarations (optional, post-publish) |

**Recommendation**: Fix the Critical + Major + Moderate items before publishing (3 files). The dead code cleanup (13 files) can be done post-launch as it has no user-visible impact.
