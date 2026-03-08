
## Problem

In the mobile footer, Row 1 (lines 312–341) is a single `flexDirection: "row"` with:
- Logo (`flexShrink: 0`) on the left — roughly 200px wide
- Three nav links (`Company · Services · Insight`) on the right with `whiteSpace: "nowrap"` and `gap: 16px`

On a 375px screen, the logo eats ~200px, leaving only ~155px for three links at 12px with 16px gaps — it's tight and they clip. The screenshot confirms the links are cut off at the right edge and sitting at the `alignItems: "center"` midpoint of the row (not the bottom of the logo).

## Fix — two things

### 1. Reduce nav link font size + gap to fit on smallest screens
Change from `fontSize: "12px"` / `gap: "16px"` to `fontSize: "11px"` / `gap: "12px"`. This reclaims ~15px and keeps everything on one row even at 320px.

### 2. Align nav links to the bottom of the logo
The row currently uses `alignItems: "center"`. Change the outer row div to `alignItems: "flex-end"` so the nav links sit flush with the bottom of the logo, matching the screenshot reference.

Also reduce the logo height slightly on mobile (from 36px to 32px) so the logo isn't so dominant and the row fits tighter.

### File
- **`src/components/SiteFooter.tsx`** — lines 312–340 (mobile Row 1):
  1. `alignItems: "center"` → `alignItems: "flex-end"` on the row wrapper
  2. Logo `BridgeLogoWhite` — pass a `height` prop or wrap with a small container
  3. Nav links: `fontSize: "11px"`, `gap: "12px"`

Since `BridgeLogoWhite` renders a fixed `height="36"` on the SVG, I'll also need to either pass a prop or simply adjust the wrapping div's `alignItems`. The `alignItems: "flex-end"` on the row is the key change — the SVG has `display: "block"` so it will sit at the bottom naturally.

### Summary of exact changes
```
Line 312: alignItems: "center" → "flex-end"
Line 316: gap: "16px" → "12px"  
Line 329: fontSize: "12px" → "11px"
```
Three line changes, all within `SiteFooter.tsx`.
