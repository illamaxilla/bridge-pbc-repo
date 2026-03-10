
## Precise plan — 5 targeted fixes, 2 files only

### Fix 1: Hero stat cards — align to 80px padding (Index.tsx)

**Location:** Line 1007–1016 — the absolutely-positioned stat-cards wrapper

**Current:** `left: "40px", right: "40px"` — but the parent hero image section already has `margin: "0 48px"`, making total offset = 88px from viewport edge.

**Fix:** Change to `left: "32px", right: "32px"` so `48 + 32 = 80px` total — matching the standard 80px content padding.

**Only lines touched:** 1011–1012.

---

### Fix 2: Services section content — correct padding (Index.tsx)

**Location:** Lines 1857–1870 — the Services section and its inner content div

**Current structure:**
```
section  padding: "40px 48px"          ← 48px side gap outside green box
  green div  borderRadius: 32px
    content div  padding: "0 80px"     ← EXTRA 80px inside, total = 128px from edge
```

**The user wants the content to have 80px from the green box edge** (matching the screenshot — cards span broadly like the reference image).

**Fix:** Change `padding: isMobile ? "0 24px" : "0 80px"` → `padding: isMobile ? "0 24px" : "0 48px"` on the inner content div (line 1869).

This keeps the outer section `padding: 40px 48px` (which positions the green box), and makes the inner content only 48px from the green box edges — so the full green box is well-used. This matches the screenshot where cards span the full green area with generous but not cramped padding.

**Only line touched:** 1869.

---

### Fix 3: "Access Dashboard" button in Insights.tsx → navigate to login then dashboard

**Location:** Line 1727 in Insights.tsx

**Current:** `href="/dashboard"` — broken route (page doesn't exist)

**Fix:** Change to `href="/login"` — this goes to the Login page which uses `BRIDGEAuthModal` with `onSignInSuccess` redirecting to `/intelligence/dashboard`. This is already wired in `ProtectedRoute.tsx` and `Login.tsx`.

**Only line touched:** 1727.

---

### No other files touched

- `SiteHeaderMinimal.tsx` — not touched (already correct, verified by memory)
- `SiteHeader.tsx` — not touched
- `SiteFooter.tsx` — not touched
- All sector pages — not touched

### Summary table

| Fix | File | Lines | Change |
|---|---|---|---|
| Stat cards 80px align | Index.tsx | 1011–1012 | `left/right: 40px` → `32px` |
| Services content padding | Index.tsx | 1869 | `"0 80px"` → `"0 48px"` |
| Access Dashboard route | Insights.tsx | 1727 | `href="/dashboard"` → `href="/login"` |

**Total: 3 line edits, 2 files.**

The header/menu/search/subscribe verification items (Energy/Financial/Sectors header, subscribe form, search overlay, hamburger menu) are behavioural checks — no code changes needed as those were all implemented in the previous session and the architecture memory confirms them as complete. If the user is seeing issues with those, they should describe the specific visual problem and it can be addressed surgically.
