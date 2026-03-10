
## Plan: 4 surgical fixes across 3 files

---

### Fix 1 — "Our Values" mobile carousel: remove hover + add swipe (Index.tsx)

**Problem:** The `.value-card:hover` CSS applies on mobile too, causing a card lift on tap. Also no swipe support — only dot-tap navigation.

**Two sub-changes:**

**1a — Remove hover on mobile cards:**
The `.value-card:hover` CSS at line 855-856 fires on touch devices. The mobile cards already have `className="value-card"`. Change the mobile cards to remove this class name — use a different class like `"value-card-mobile"` with no hover rule, OR just remove `className="value-card"` from the mobile cards (lines 2241-2252).

**Line targeted:** Line 2242 — remove `className="value-card"` from the mobile card `<div>`.

**1b — Add touch swipe:**
The carousel `<div>` at line 2206 has `overflow: "hidden"`. Convert this to `overflowX: "auto"` with CSS scroll-snap so the user can swipe natively. This is the same pattern used in the Insights section.

Change the container (line 2206) from `overflow: "hidden"` to `overflowX: "auto", scrollbarWidth: "none"` with a scroll listener, OR simpler: add `onTouchStart`/`onTouchEnd` handlers to the wrapper div to update `valueIndex` on swipe.

Approach: Add `touchStartX` ref + `onTouchStart`/`onTouchEnd` to the wrapper div at line 2206. When swipe delta > 40px, advance/retreat `valueIndex`.

**Lines changed:** Line 2206 (add touch handlers to wrapper), add 2 `useRef` declarations in the component (~line 703).

---

### Fix 2 — CTA button routing in sector pages (9 files)

**Current state after previous session:**
- "Start a Conversation" → `navigate("/login")` — **WRONG, needs `/contact`**
- "Download Sector Brief" (Agriculture.tsx, Technology.tsx) → `navigate("/login")` — **WRONG, needs `/resources`**
- "Explore the Full Analysis" (Health, Education, Infrastructure, Financial, Manufacturing, Sports, Energy) → `navigate("/login")` — **WRONG, needs `/resources`**
- "Request Full Access" (Health.tsx) → `navigate("/login")` — **CORRECT, keep**

Also in non-sector pages:
- Services.tsx "Start a Conversation" → `<a href="/contact">` wrapper — **already correct** (line 4325-4365)
- Insights.tsx "Get Full Access" → `href="/resources"` (line 3519) — **WRONG, needs `/login`**
- Insights.tsx "View Resources" → `href="/resources"` (line 3498) — **CORRECT, keep**

**Changes per file:**

| File | Button | Change |
|---|---|---|
| Energy.tsx | "Start a Conversation" (line 5904) | `navigate("/login")` → `navigate("/contact")` |
| Energy.tsx | "Explore the Full Analysis" (line 5939) | `navigate("/login")` → `navigate("/resources")` |
| Agriculture.tsx | "Start a Conversation" (line 7106) | `navigate("/login")` → `navigate("/contact")` |
| Agriculture.tsx | "Download Sector Brief" (line 7145) | `navigate("/login")` → `navigate("/resources")` |
| Technology.tsx | "Start a Conversation" (line 6676) | `navigate("/login")` → `navigate("/contact")` |
| Technology.tsx | "Download Sector Brief" (line 6711) | `navigate("/login")` → `navigate("/resources")` |
| Health.tsx | "Request Full Access" (line 6184) | keep `/login` |
| Health.tsx | "Explore the Full Analysis" (line 6219) | `navigate("/login")` → `navigate("/resources")` |
| Financial.tsx | "Start a Conversation" (line 6638) | `navigate("/login")` → `navigate("/contact")` |
| Financial.tsx | "Explore the Full Analysis" (line 6674) | `navigate("/login")` → `navigate("/resources")` |
| Manufacturing.tsx | "Start a Conversation" (line 6378) | `navigate("/login")` → `navigate("/contact")` |
| Manufacturing.tsx | "Explore the Full Analysis" (line 6413) | `navigate("/login")` → `navigate("/resources")` |
| Sports.tsx | "Start a Conversation" (line 6475) | `navigate("/login")` → `navigate("/contact")` |
| Sports.tsx | "Explore the Full Analysis" (line 6511) | `navigate("/login")` → `navigate("/resources")` |
| Education.tsx | "Start a Conversation" (line 6474) | `navigate("/login")` → `navigate("/contact")` |
| Education.tsx | "Explore the Full Analysis" (line 6509) | `navigate("/login")` → `navigate("/resources")` |
| Infrastructure.tsx | "Start a Conversation" (line 6471) | `navigate("/login")` → `navigate("/contact")` |
| Infrastructure.tsx | "Explore the Full Analysis" (line 6506) | `navigate("/login")` → `navigate("/resources")` |
| Insights.tsx | "Get Full Access" (line 3519, `href="/resources"`) | `href="/resources"` → `href="/login"` |

**Transport, Housing, Tourism** already use `<a href="/contact">` — no changes needed.

**Total: 1 line per button in 9 sector files + 1 line in Insights.tsx = 19 surgical one-word changes.**

---

### Fix 3 — "Explore all 12 Sectors" button in Index.tsx (if scrolling to footer widget)

**Confirmed:** The "View all 12 sectors" link (Index.tsx line 2919-2953) already uses `<Link to="/sectors">` — it correctly navigates to the `/sectors` page. **No change needed here.**

However, if the user is seeing it scroll to the footer sector grid instead (triggered by hash routing), this is already working correctly.

**No code change for this item — will confirm with user.**

Wait — re-reading the user's message: *"'Explore all 12 Sectors' button should navigate to the Sectors page (at the top) - NOT the widget on the bottom of the page."*

This implies there's a button labeled "Explore all 12 Sectors" that scrolls to the SiteFooter sector grid widget (the "Explore 12 Sectors" icon row). Let me check if there's a section-level CTA with this exact label...

Actually looking at SiteFooter line 259: `"Explore 12 Sectors"` is just a hover-state text label above the footer icon grid. There's no button linking to it.

The most likely candidate is the sector accordion section's "View all 12 sectors" link (line 2940) — which already links to `/sectors`. Since it already works, this may be user confirmation that it's working. OR the user is referring to a specific button in another context.

**Plan:** No code change for item 2 — the "View all 12 sectors" link already navigates to `/sectors`.

---

### Fix 4 — Insights.tsx footer mobile styling (Insights.tsx)

**Problem:** The local `Footer` component's mobile layout (lines 1359-1366) renders nav labels as bare `<a>` tags with no inline styles — no font, no color, no size. The `SiteFooter`'s mobile layout (SiteFooter.tsx lines 347-373) has full styled `<a>` tags.

**Fix:** Add the same inline styles to the `<a>` tags in `Footer` mobile (lines 1359-1366 of Insights.tsx):

```tsx
style={{
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "11px",
  fontWeight: "600",
  color: "rgba(255,255,255,0.5)",
  textDecoration: "none",
  whiteSpace: "nowrap",
}}
```

Also fix: the social icon `<a>` tags (lines 1413-1422) are missing the size/border styling from SiteFooter. Add matching styled wrapper.

**Lines changed:** 1359-1366 in Insights.tsx (the mobile nav label `<a>` tags).

---

### Files to edit

| File | Changes | Lines |
|---|---|---|
| `src/pages/Index.tsx` | Remove hover class from mobile cards; add touch swipe | ~2242, ~2206, ~703 |
| `src/pages/sectors/Energy.tsx` | 2x `navigate` target | 5904, 5939 |
| `src/pages/sectors/Agriculture.tsx` | 2x `navigate` target | 7106, 7145 |
| `src/pages/sectors/Technology.tsx` | 2x `navigate` target | 6676, 6711 |
| `src/pages/sectors/Health.tsx` | 1x `navigate` target (keep primary) | 6219 |
| `src/pages/sectors/Financial.tsx` | 2x `navigate` target | 6638, 6674 |
| `src/pages/sectors/Manufacturing.tsx` | 2x `navigate` target | 6378, 6413 |
| `src/pages/sectors/Sports.tsx` | 2x `navigate` target | 6475, 6511 |
| `src/pages/sectors/Education.tsx` | 2x `navigate` target | 6474, 6509 |
| `src/pages/sectors/Infrastructure.tsx` | 2x `navigate` target | 6471, 6506 |
| `src/pages/Insights.tsx` | Fix "Get Full Access" route + mobile footer nav styling | 3519, 1359-1366 |

**Total: 11 files, ~22 line edits. Zero layout changes anywhere.**
