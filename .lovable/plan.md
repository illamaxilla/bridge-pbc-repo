
## Fix 4 TypeScript Build Errors in Services.tsx

### Errors and fixes

| Line | Error | Fix |
|---|---|---|
| 1203 | `e.target` typed as `EventTarget`, missing `.scrollWidth` / `.scrollLeft` | Cast to `HTMLElement`: `const el = e.target as HTMLElement;` |
| 1348 | `Pill` component has `dark` as required prop | Give it a default value: `{ children, dark = false }` |

Lines 1634 and 1944 both call `<Pill>` without `dark` — fixing the component signature with a default value resolves both call sites at once.

### Changes (Services.tsx only)

**Line 1203** — cast `e.target`:
```tsx
// Before
const el = e.target;
// After
const el = e.target as HTMLElement;
```

**Line 1348** — add default for `dark`:
```tsx
// Before
const Pill = ({ children, dark }) => (
// After
const Pill = ({ children, dark = false }) => (
```

No other files need changes. Two one-line edits.
