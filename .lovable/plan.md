
## Diagnosis of all 3 issues across Housing, Tourism, Transport

### Issue 1 — Sticky header broken (Transport only)

**Root cause:** Transport's outer `<div>` has `overflowX: "hidden"` (line 5994). In CSS, any `overflow` value other than `visible` (including `overflow-x: hidden`) on an ancestor creates a new **scroll container**, which breaks `position: sticky` on all descendants. The `SiteHeaderMinimal` uses `position: sticky; top: 0` — so inside Transport's wrapper, it can no longer stick.

Housing and Tourism don't have this — their headers sticky correctly. Only Transport is broken.

**Fix:** Remove `overflowX: "hidden"` from the Transport outer wrapper div (line 5994). The horizontal overflow guard is already set globally in the `<style>` tag below it (`html, body { overflow-x: hidden; }`) so removing it from the div is safe.

---

### Issue 2 — FinalCTA button styling is wrong (Housing + Tourism + Transport)

**Root cause:** The buttons were given incomplete styles — missing `backgroundColor`, `color`, and `padding` on the primary "Start a Conversation" button in Housing and Tourism. They rely on browser-default button appearance (grey).

**Housing FinalCTASection (lines 5962–6002):** The "Start a Conversation" button is missing:
- `backgroundColor: colors.accent` (lime)
- `color: colors.primary` (dark green text)  
- `padding: "16px 32px"`
- `border: "none"`

The arrow `<span>` has `backgroundColor: colors.white` but uses the SVG with `stroke={colors.primary}` — that's fine. But the outer button has no background so it renders as browser-default grey.

**Tourism FinalCTASection (lines 6503–6536):** 
- "Start a Conversation" button: has `color: colors.primary` and `border: "none"` and `padding` — BUT is missing `backgroundColor`. It renders grey.
- The arrow span has `backgroundColor: colors.primary` (dark green circle on dark green section background) — invisible arrow. Should be `backgroundColor: colors.white` with the SVG stroke in `colors.primary`.

**Transport FinalCTASection (lines 5928–5975):**
- Primary button: has `backgroundColor: colors.accent` and `color: colors.primary` ✓ but no explicit `border: "none"` — browser adds 1px border. Small but fixable.
- Secondary "Explore the Full Analysis" button has no `color` style — defaults to browser black, which is invisible on the dark green section background.

**The canonical correct style (from Energy.tsx which works):**
- Primary: `backgroundColor: colors.accent, color: colors.primary, border: "none", padding: "16px 32px", borderRadius: "50px", fontSize: "15px", fontWeight: "700", width: isMobile ? "100%" : "auto"`
- Arrow span: `backgroundColor: colors.primary, borderRadius: "50%", width: 28, height: 28` + white arrow SVG
- Secondary: `backgroundColor: "transparent", color: colors.white, border: "2px solid rgba(255,255,255,0.2)", padding: "16px 32px", borderRadius: "50px", width: isMobile ? "100%" : "auto"`

---

### Issue 3 — Hero CTA buttons "Request Full Analysis" / "Download Summary" missing `onClick` handlers

**Root cause:** The Hero section buttons in all three files have the correct visual styling (lime button, outline button) but no `onClick` handlers wired up.

Per CTA linking logic: 
- "Request Full Analysis" → `navigate("/login")`
- "Download Summary" → `navigate("/resources")`

The `HeroSection` components in Housing (line 1122), Tourism (line 1105), and Transport (line 1169) need `useNavigate` added and the two buttons wired.

---

## Exact fixes

### Transport.tsx — 3 changes

**Fix A (sticky header):** Line 5994 — remove `overflowX: "hidden"` from the outer wrapper style object.

**Fix B (FinalCTA primary button):** Lines 5928–5960 — add `border: "none"` to the primary button style.

**Fix C (FinalCTA secondary text color):** Line 5964 — add `color: colors.white` to the secondary button style.

**Fix D (Hero buttons — onClick):** Lines 1169–1222 — add `const navigate = useNavigate()` at top of HeroSection and wire:
- "Request Full Analysis" button → `onClick={() => navigate("/login")}`  
- "Download Summary" button → `onClick={() => navigate("/resources")}`

### Housing.tsx — 2 changes

**Fix A (FinalCTA primary button):** Lines 5962–6002 — add missing styles: `backgroundColor: colors.accent`, `color: colors.primary`, `border: "none"`, `padding: isMobile ? "16px 24px" : "16px 32px"`.

**Fix B (Hero buttons — onClick):** Lines 1122–1172 — add `const navigate = useNavigate()` at top of HeroSection and wire buttons.

### Tourism.tsx — 2 changes

**Fix A (FinalCTA primary + arrow):** Lines 6503–6536 — add `backgroundColor: colors.accent` to primary button; change arrow span `backgroundColor` from `colors.primary` to `colors.white` (with SVG stroke in `colors.primary`).

**Fix B (Hero buttons — onClick):** Lines 1105–1155 — add `const navigate = useNavigate()` at top of HeroSection and wire buttons.

---

## Edit table

| File | Issue | Lines |
|---|---|---|
| `Transport.tsx` | Remove `overflowX: "hidden"` from wrapper (fixes sticky header) | 5994 |
| `Transport.tsx` | FinalCTA primary button: add `border: "none"` | ~5931 |
| `Transport.tsx` | FinalCTA secondary button: add `color: colors.white` | ~5965 |
| `Transport.tsx` | Hero buttons: wire `onClick` for Request/Download | 1169–1222 |
| `Housing.tsx` | FinalCTA primary button: add `backgroundColor`, `color`, `border`, `padding` | 5962–5975 |
| `Housing.tsx` | Hero buttons: wire `onClick` for Request/Download | 1122–1172 |
| `Tourism.tsx` | FinalCTA primary button: add `backgroundColor: colors.accent` | 6503–6518 |
| `Tourism.tsx` | FinalCTA arrow span: change `backgroundColor` to `colors.white` | 6522–6531 |
| `Tourism.tsx` | Hero buttons: wire `onClick` for Request/Download | 1105–1155 |

**Zero layout or content changes. Only fixing incomplete styles and missing onClick handlers.**
