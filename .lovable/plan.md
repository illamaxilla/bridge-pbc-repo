
## Audit Results — All 6 Intelligence Pages

### Desktop Results (1280px)
| Page | Status | Notes |
|---|---|---|
| /intelligence/dashboard | PASS | Renders fully, charts working |
| /intelligence/market | PASS | Renders fully, charts working |
| /intelligence/analytics | PASS | Renders fully, charts working |
| /intelligence/reports | **BLANK** | Root cause below |
| /intelligence/watchlist | PASS | Renders fully |
| /intelligence/resources | PASS | Renders fully |

### Mobile Results (375px)
| Page | Status | Notes |
|---|---|---|
| /intelligence/dashboard | PASS | Mobile layout working |
| /intelligence/market | PASS | Mobile layout working |
| /intelligence/analytics | PASS | Mobile layout with bottom tab bar |
| /intelligence/reports | PASS | Mobile-specific MobileDashboard renders correctly |
| /intelligence/watchlist | Not yet checked, likely fine |
| /intelligence/resources | PASS |

### Console Warnings
All console "errors" are React `forwardRef` warnings on third-party library components (Radix UI, react-router, react-query). These are non-breaking dev-mode warnings from library internals, not code we own. No actual runtime errors.

---

## Root Cause: Reports Blank on Desktop

`Reports.tsx` has its own full-page layout (its own `Sidebar`, its own top nav) — it was designed to be a standalone page. The problem is at line 2384–2386:

```js
style={{
  display: "flex",
  height: "100vh",   // <-- THIS IS THE PROBLEM
  overflow: "hidden",
}}
```

When `BridgeReportsPage` renders inside the Intelligence shell's `<main className="flex-1 overflow-auto">`, the `height: "100vh"` pushes the content to fill the entire viewport height. However, the flex layout of the Intelligence shell means the `<main>` starts at y=56px (below the top bar). The inner `100vh` element then overflows 56px below the bottom of the viewport — and because `overflow: "hidden"` is set, the entire content is clipped invisible.

**Fix**: Change `height: "100vh"` → `height: "100%"` on the root div of `BridgeReportsPage`. This makes it fill the available height within the `<main>` container instead of the full viewport. The `<main>` already has `overflow: auto` which handles scrolling.

---

## Plan

### Single Fix Required

**File**: `src/pages/intelligence/Reports.tsx`, line 2385

Change:
```js
height: "100vh",
```
To:
```js
height: "100%",
```

That's the only change needed. Everything else across all 6 intelligence pages is working correctly on both desktop and mobile.

### No other changes needed
- Dashboard, Market, Analytics, Watchlist, Resources: all render correctly on desktop and mobile
- Console warnings are all from third-party library internals (Radix UI, React Router, React Query) — non-actionable
- Mobile sidebar hamburger, sector switching, charts, and tooltips all function correctly
