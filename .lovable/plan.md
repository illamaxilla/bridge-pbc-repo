
## Fix `IconCircle` `isFirst` Prop in Services.tsx

### Problem

The `IconCircle` component is defined on line 863 of `src/pages/Services.tsx` as:

```tsx
const IconCircle = ({ icon, isFirst }) => (
```

TypeScript infers `isFirst` as a required prop because it has no default value. But ~20 call sites omit `isFirst` (only the first circle in each chain passes `isFirst`), causing 24 build errors.

### Fix

Change line 863 to give `isFirst` a default value of `false`:

```tsx
const IconCircle = ({ icon, isFirst = false }) => (
```

This is a one-line change. No call sites need updating.

### File to Edit

- `src/pages/Services.tsx` — line 863 only
