
## Summary of All Build Errors

These are TypeScript strict-typing errors across two files. No logic changes needed — only type annotations/signatures need to be relaxed. Here's the full breakdown:

---

### `src/pages/intelligence/Dashboard.tsx`

**Error 1 — Line 2467: `MCard` missing `badge` prop**
`MCard` is defined at line 1823 with signature: `{ icon, title, badge, badgeLime, defaultOpen, children }` — `badge` is treated as required by TypeScript since there's no `?`. But it's used without `badge` at line 2467. Fix: add `?` to `badge` in the MCard prop destructure.

**Error 2 — Line 4252: `Bell` not found**
`Bell` is used but not imported (Dashboard.tsx imports list at lines 2–48 does not include `Bell`). Fix: add `Bell` to the lucide-react import block.

**Error 3 — Lines 4438–4439 and 5154, 5180: `Icon` component used as `key` and as `ReactNode`**
The `[l, v, Icon]` destructuring arrays at line 4433 creates `string | ComponentType` union types. Using `v` as `key` and `Icon` as a rendered element causes TS errors. Fix: type the array explicitly or cast `key={v as string}` and `<Icon />` properly.

**Error 4 — Lines 4487, 4502: `<Tip />` has missing required props**
`Tip` at line 1504 is defined as `({ active, payload, label })` with required props. Recharts injects these at runtime but TS doesn't know that. Fix: make all three props optional: `{ active?, payload?, label? }`.

**Error 5 — Lines 4820, 4831, 4841, 4967, 4978: `color: col` where `col` is `string | number`**
In array destructuring like `[n, label, bg, col, sub]`, TypeScript infers mixed types. The `color` style property requires `string`. Fix: cast `col as string` at usage sites, or type the array items explicitly.

---

### `src/pages/intelligence/MarketOverview.tsx`

**Error 6 — Lines 1464, 1863, 1911: `<ChartTip />` missing required props**
`ChartTip` at line 846 has required `{ active, payload, label }`. Fix: make all optional: `{ active?, payload?, label? }`.

**Error 7 — Line 2082: `<Pill>` missing `col` prop**
`Pill` is called without a `col` prop but the component has `col` as an implied required. Fix: add `col?` as optional in destructure.

**Error 8 — Line 3683: `MSection` missing `badgeStyle` and `iconColor`**  
`MSection` at line 2583 has `iconColor` and `badgeStyle` in its signature — these are required. Multiple `MSection` usages omit them. Fix: add default values (`iconColor = M.accent`, `badgeStyle = {}`) already done on MCardHeader but not propagated — ensure `MSection` defaults cover the cases.

**Error 9 — Line 5617: `MCard` called with `onClick` but `MCard` at line 2507 only accepts `{ children, style }`**
Fix: add optional `onClick?: () => void` to `MCard`'s prop destructure.

**Error 10 — Lines across MarketOverview: Various `MSection` usages missing `badge`, `badgeStyle`, `iconColor`**
All these props should be optional with defaults (which they almost are in MSection/MCardHeader, but TypeScript is enforcing strict checking because the component isn't explicitly typed). Fix: add explicit optional TypeScript types to `MSection`, `MCard`, `MCardHeader`.

---

## Fix Plan

**Files to edit: `Dashboard.tsx` and `MarketOverview.tsx`**

### Dashboard.tsx — 5 targeted fixes:

1. **Add `Bell` to imports** (line 2–48): add `Bell,` to the lucide-react import block
2. **Make `Tip` props optional** (line 1504): `({ active?, payload?, label? })`
3. **Make `MCard`'s `badge` optional** (line 1823): already has `badge` in destructure, just add `?` via default or JSDoc
4. **Fix array destructuring type for chart toggle** (lines 4433–4456): add `as const` assertion or cast `key={v as string}` and `Icon as React.ComponentType`
5. **Fix `color: col` where col is `string|number`** (lines 4807–4841, 4948–4978): cast `String(col)` or `col as string` in the style props
6. **Fix `Tip` used in `<Tooltip content={<Tip />} />`** (lines 4487, 4502): already covered by making props optional

### MarketOverview.tsx — 4 targeted fixes:

1. **Make `ChartTip` props optional** (line 846): `({ active?, payload?, label? })`
2. **Add `onClick?` to `MCard`** (line 2507): `function MCard({ children, style = {}, onClick? })`
3. **Make `Pill`'s `col` optional** (line 824): `col?` in destructure — already has it implicitly but TS needs `?`
4. **All `MSection`/`MCardHeader` props made truly optional** (lines 2517, 2583): add `?` and defaults to `badge`, `badgeStyle`, `iconColor`, `defaultOpen`

These are pure TypeScript annotation fixes — no visual or behavioral changes.
