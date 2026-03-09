
## Two Changes

### 1. Swipe scroll — homepage Insights section (Index.tsx)

**What's currently there:** Lines 3305–3453 use an `overflow: "hidden"` wrapper + `transform: translateX` div. Touch swiping does nothing on mobile.

**Fix:** For mobile, replace with a native scroll-snap container.

- Line 689: add `const insightScrollRef = useRef<HTMLDivElement>(null);` and a `handleInsightScroll` handler that reads `scrollLeft / clientWidth` to update `insightIndex`.
- Line 3305–3427: on mobile, change the outer div from `overflow: "hidden"` to `overflowX: "auto"`, `scrollSnapType: "x mandatory"`, `scrollbarWidth: "none"`, attach `ref` + `onScroll`. Each card gets `scrollSnapAlign: "start"`, `minWidth: "100%"`, `flexShrink: 0`.
- Lines 3442: dot `onClick` calls `insightScrollRef.current.scrollTo({ left: i * clientWidth, behavior: "smooth" })` on mobile.
- Desktop path (non-mobile) stays **completely untouched**.

### 2. Text change — Insights.tsx line 101

```
// Before
title: "The analysis stays alive",

// After
title: "The analysis is continuous and progressive.",
```

Single line change.

## Files changed
| File | Change |
|---|---|
| `src/pages/Index.tsx` | Swipe scroll-snap for mobile insights carousel |
| `src/pages/Insights.tsx` | Line 101: title text update |
