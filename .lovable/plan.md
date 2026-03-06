
## Fix All TypeScript Build Errors

There are 4 categories of errors across 4 files. None require logic changes — all are TypeScript type annotation fixes.

---

### 1. `src/pages/Contact.tsx` — `textTransform` and `boxSizing` string literals (8 errors)

**Root cause**: Inline style objects typed as plain JS objects, but TypeScript infers string instead of the specific CSS union types `TextTransform` and `BoxSizing`.

**Fix**: Cast the `lbl` and `inp` style objects `as React.CSSProperties` where they are defined (lines ~1861–1883).

```tsx
// Before
const inp = { ..., boxSizing: "border-box", ... };
const lbl = { ..., textTransform: "uppercase", ... };

// After
const inp: React.CSSProperties = { ..., boxSizing: "border-box", ... };
const lbl: React.CSSProperties = { ..., textTransform: "uppercase", ... };
```

---

### 2. `src/pages/Resources.tsx` — `textAlign` string literal (1 error, line 1007)

**Root cause**: `h.align` is inferred as `string` from the array literal but `textAlign` requires the CSS `TextAlign` union type.

**Fix**: Cast the align values in the array to `"left" | "center" | "right"` or cast the style prop:

```tsx
// The array entries need typed align values
{ label: "Sector", align: "left" as const }
// ...all 6 entries get `as const` on the align property
```

---

### 3. `src/pages/Sector.tsx` — `e.target` missing `scrollWidth`/`scrollLeft`, and `<Pill>` missing `dark` prop (3 errors)

**Root cause A** (line 1205–1206): `e.target` in `onScroll` is typed as `EventTarget` which lacks scroll properties. Need to cast to `HTMLElement`.

```tsx
// Before
const el = e.target;
// After
const el = e.target as HTMLElement;
```

**Root cause B** (lines 1634, 1944): `<Pill>` component requires `dark` prop but it's called without it at two places.

```tsx
// Before
<Pill>Analysis</Pill>
<Pill>12 Integrated Sectors</Pill>

// After
<Pill dark={false}>Analysis</Pill>
<Pill dark={false}>12 Integrated Sectors</Pill>
```

---

### 4. `src/pages/Services.tsx` — `<IconCircle>` missing `isFirst` prop (20 errors)

**Root cause**: `IconCircle` component requires `isFirst` prop but many call sites omit it (only the first icon in each chain passes it).

**Fix**: Make `isFirst` optional in the `IconCircle` definition:

```tsx
// Before
const IconCircle = ({ icon, isFirst }) => (

// After
const IconCircle = ({ icon, isFirst = false }) => (
```

This is the cleanest fix — no need to update 20+ call sites.

---

### Files to edit

| File | Lines affected | Fix |
|---|---|---|
| `src/pages/Contact.tsx` | ~1861, ~1874 | Add `: React.CSSProperties` type annotation to `inp` and `lbl` |
| `src/pages/Resources.tsx` | ~991–996 | Add `as const` to each `align` value in the array |
| `src/pages/Sector.tsx` | ~1203, 1634, 1944 | Cast `e.target as HTMLElement`; add `dark={false}` to two `<Pill>` usages |
| `src/pages/Services.tsx` | ~863 | Change `isFirst` to `isFirst = false` in `IconCircle` definition |
