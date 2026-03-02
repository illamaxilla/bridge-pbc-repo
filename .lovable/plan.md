
## Fix Build Errors in Index.tsx

### Problem
There are two TypeScript errors on lines 3504 and 3508 in `src/pages/Index.tsx`:

```
Property 'style' does not exist on type 'Element'.
```

This happens because `querySelector` returns `Element | null`, and the `style` property only exists on `HTMLElement`, not the base `Element` type.

### Fix
Cast the result of `querySelector` to `HTMLElement` before accessing `.style`. This is a one-line change in two places:

**Line 3504** — change:
```ts
if (track) track.style.animationPlayState = "paused";
```
to:
```ts
if (track) (track as HTMLElement).style.animationPlayState = "paused";
```

**Line 3508** — change:
```ts
if (track) track.style.animationPlayState = "running";
```
to:
```ts
if (track) (track as HTMLElement).style.animationPlayState = "running";
```

### No other changes needed
This is a simple TypeScript type cast fix — it does not affect any functionality or visual behavior of the carousel. The animation pause/resume on hover will work exactly as intended.
