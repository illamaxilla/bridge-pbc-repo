
## Fix: Resources page CTA buttons — stack vertically on mobile

### The problem (lines 2965–3006)

The button container (line 2966) uses:
```
display: "flex", gap: "10px", flexWrap: "wrap", width: mobile ? "100%" : "auto"
```
Each button has `flex: mobile ? 1 : "none"` — so on mobile both shrink to half-width side by side. The image confirms they're cramped next to each other.

### The fix

**Line 2966 — container:** change `flexWrap: "wrap"` to `flexDirection: mobile ? "column" : "row"` and remove `flexWrap`.

**Lines 2983 & 3001 — each button:** on mobile, remove `flex: 1` and instead set `width: "100%"` so each button fills its own full row. Also add `textAlign: "center"` to center the text and icons.

**Result:** On mobile the two buttons stack vertically, each full-width, with proper pill shape — matching the Sectors page CTA style. Desktop stays side-by-side unchanged.

### Also: wire the buttons (already planned from earlier crawl)
- "Get Full Access" → `/login`
- "Partner with BRIDGE" → `/contact`

Both buttons are currently plain `<button>` with no navigation — wrapping each in an `<a>` with SPA `onClick` using `useNavigate` (already imported via react-router-dom).

### Files changed
- `src/pages/Resources.tsx` — lines 2965–3005 only (button container + 2 buttons)
