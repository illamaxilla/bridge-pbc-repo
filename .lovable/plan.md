
## Fix All Build Errors

There are 8 distinct TypeScript errors across 7 files. All are minor type issues — no logic changes needed, just type casting and prop fixes.

---

### Errors & Fixes

**1. `Energy.tsx` — `strokeLinecap` type error (lines 314)**
SVG props `strokeLinecap` and `strokeLinejoin` are typed as `string` but TypeScript expects a specific union type. Fix: cast the object with `as React.SVGProps<SVGSVGElement>`.

**2. `Agriculture.tsx` — `e.target` scroll properties (lines 2100–2101, 4531–4532)**
`e.target` is typed as `EventTarget` which lacks scroll properties. Fix: cast to `e.currentTarget as HTMLDivElement` (or cast `e.target as HTMLDivElement`).

**3. `Education.tsx` — `setActiveTier(f.key)` type mismatch (line 2851)**
`activeTier` state is `string` but `f.key` could be `string | number`. Fix: cast `f.key` to `String(f.key)` when calling `setActiveTier`.

**4. `Housing.tsx` — `setActiveTier(tier.id)` type mismatch (line 2824)**
Same issue — `tier.id` can be `"all"`, `1`, or `2` (mixed types). Fix: cast with `String(tier.id)` when calling `setActiveTier`.

**5. `Manufacturing.tsx` — `darkMode` prop missing on `MetricRow` (line 4151)**
`MetricRow` component requires `darkMode` but it's not passed at the call site. Fix: add `darkMode={false}` to the JSX call.

**6. `Financial.tsx` — `IconCheck` used with `style` prop but component accepts no props (line 5694)**
`IconCheck` is defined as `() => (...)` with no props. Fix: add a `style?` prop to the `IconCheck` component definition, or wrap it in a `<span style={...}>`.

**7. `Tourism.tsx` — duplicate `border` property in style object (line 2817–2818)**
The object literal has `border` defined twice. Fix: remove the first `border: "none"` since the second one overrides it.

**8. `Services.tsx` — `isFirst` prop missing on `IconCircle` (lines 2766, 2768, etc.)**
`IconCircle` requires `isFirst` prop. Some usages omit it (implicitly `undefined`). Fix: make `isFirst` optional in the component definition with `isFirst = false` as default.

---

### Files to Edit

- `src/pages/sectors/Energy.tsx` — cast SVG props object
- `src/pages/sectors/Agriculture.tsx` — cast `e.target` to `HTMLDivElement` (2 locations)
- `src/pages/sectors/Education.tsx` — `String(f.key)` in `setActiveTier`
- `src/pages/sectors/Housing.tsx` — `String(tier.id)` in `setActiveTier`
- `src/pages/sectors/Manufacturing.tsx` — add `darkMode={false}` to `MetricRow`
- `src/pages/sectors/Financial.tsx` — add optional `style` prop to `IconCheck`
- `src/pages/sectors/Tourism.tsx` — remove duplicate `border` property
- `src/pages/Services.tsx` — make `isFirst` optional with default `false`

No logic changes. No new dependencies. All fixes are minimal, surgical edits.
