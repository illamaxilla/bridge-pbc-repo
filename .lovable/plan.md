
## Fix Nav Links in About.tsx and Services.tsx

### Problem

The user wrote their own code for `About.tsx` and `Services.tsx`. In both files, all header nav links are hardcoded to `href="#"` — there is no `navHref` helper. Browser testing confirmed: clicking "About" from the Services page stays on `/services#` instead of navigating to `/about`.

### What needs fixing

Both files share the same nav pattern:
```tsx
{["About", "Sectors", "Services", "Insights", "Contact"].map((item, i) => (
  <a href="#" ...>  {/* ← all hardcoded # */}
```

The fix is the same for both: replace `href="#"` with a `navHref(item)` call and define the helper near the top of each file.

### Changes

**Both `src/pages/About.tsx` and `src/pages/Services.tsx`:**

1. Add `navHref` helper (same as Index.tsx):
```ts
const navHref = (item: string) =>
  item === "Home" ? "/" :
  item === "About" ? "/about" :
  (item === "Services" || item === "Sectors") ? "/services" : "#";
```

2. In the desktop nav map, change `href="#"` → `href={navHref(item)}`

3. In the mobile menu overlay map (if present), same change

### Files to edit

| File | Change |
|---|---|
| `src/pages/About.tsx` | Add `navHref` helper + wire desktop nav links |
| `src/pages/Services.tsx` | Add `navHref` helper + wire desktop nav links |

No other files need changes — Index.tsx already has this working correctly.
