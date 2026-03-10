
## Plan: 3 surgical fixes, 4 files

---

### Fix 1 — Sports.tsx: Remove `\u2014` from process section description (line 1886)

**Problem:** Line 1886 renders as:
> "Two distinct pathways where Ghanaian talent meets global opportunity \u2014 each with unique value chains..."

The `\u2014` (em dash) is rendering as a literal string in the browser (visible in the screenshot as `\u2014`).

**Fix:** Replace the JSX text on line 1886 to use an actual em dash character or a JSX expression:

```tsx
Two distinct pathways where Ghanaian talent meets global opportunity — each with unique value chains,
```

Change `\u2014` → `—` (actual em dash character).

**Lines changed:** 1886 only. Nothing else in Sports.tsx touched.

---

### Fix 2 — Add "Services" to nav & search in both headers (SiteHeader.tsx + SiteHeaderMinimal.tsx)

**Problem:** `ALL_NAV` in both header files has 10 items. "Services" (`/services`) is missing from both the hamburger menu and the search overlay.

**Current ALL_NAV order:**
Home, About, Methodology, Sectors, Insight, BRIDGE Intelligence, Community, Resources, Contact, Policy Updates

**New ALL_NAV order** — insert Services after Methodology (logical position, it's a core offering page):
Home, About, Methodology, **Services**, Sectors, Insight, BRIDGE Intelligence, Community, Resources, Contact, Policy Updates

This makes it 11 items in both menu and search.

**Lines changed in each file:**
- `SiteHeader.tsx` — insert one line after line 19 (Methodology entry)
- `SiteHeaderMinimal.tsx` — insert one line after line 19 (Methodology entry)

**No other changes to either header file.**

---

### Fix 3 — Services.tsx hero sector widget: text change + double-click navigation

**Sub-fix 3a — Text change (line 1859):**
```
"Hover a sector to see how it connects to your goals"
→
"Hover to see how it connects to your goals"
```

**Sub-fix 3b — Add `useNavigate` import (line 1):**
```tsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SiteHeader from "@/components/SiteHeaderMinimal";
```

**Sub-fix 3c — Add `navigate` hook in the component:**
The main page component function needs `const navigate = useNavigate()` added at the top.

**Sub-fix 3d — Add `onDoubleClick` to each sector icon cell (lines 1808–1841):**

The `footerSectorIcons` array is ordered at positions 0–11. The route map by index:
```
0: infra    → /sectors/infrastructure
1: fin      → /sectors/financial
2: health   → /sectors/health
3: tech     → /sectors/technology
4: edu      → /sectors/education
5: agri     → /sectors/agriculture
6: creative → /sectors/sports
7: housing  → /sectors/housing
8: tourism  → /sectors/tourism
9: energy   → /sectors/energy
10: mfg     → /sectors/manufacturing
11: transport → /sectors/transport
```

Add a `to` field to each `footerSectorIcons` entry, then add `onDoubleClick={() => navigate(sector.to)}` to the icon `<div>`.

**Lines changed:** Line 1 (add import), ~line 730 (add `navigate` hook), lines 21–271 (add `to` field to each of the 12 icon entries), lines 1808–1826 (add `onDoubleClick` to the sector icon div).

---

### Edit table

| File | Change | Lines |
|---|---|---|
| `Sports.tsx` | `\u2014` → `—` in JSX text | 1886 |
| `SiteHeader.tsx` | Add `{ label: "Services", to: "/services" }` to ALL_NAV | after line 19 |
| `SiteHeaderMinimal.tsx` | Add `{ label: "Services", to: "/services" }` to ALL_NAV | after line 19 |
| `Services.tsx` | Add `useNavigate` import; add `to` routes to icon data; `onDoubleClick` on icons; fix hover text | 1, ~730, 21–271, 1808–1840, 1859 |

**Total: 4 files, ~20 line edits. Zero layout changes, zero styling changes.**
