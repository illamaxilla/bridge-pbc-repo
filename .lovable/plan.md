
## What we're building

Three enhancements to the mobile Intelligence Dashboard:

1. **Active sector subtitle in the shell header** — On mobile, show the current sector name (e.g. "Agriculture") as a small dim label between the logo area and the BETA badge, so users always know which sector they're viewing.

2. **Scale animation on bottom nav tab taps** — When a tab is pressed, it briefly scales down then snaps back (like a native iOS tab bar), giving tactile feedback.

3. **Browser test** — Verify the fixed bottom nav, tab switching, and scroll behaviour on a 390px viewport.

---

## Changes

### `src/pages/intelligence/Intelligence.tsx` — Sector subtitle in header

The header right now has two areas:
- Left: hamburger + logo + "Intelligence" label
- Right: BETA badge

On mobile, insert the active sector name between these. `activeSectorId` is already derived from `searchParams`. Map it to a display name using `SIDEBAR_SECTORS.find(s => s.id === activeSectorId)?.short`.

Render it only when `isMobile && activeSectorId` is truthy, as a small muted label next to the BETA chip:

```
[BETA] · Agriculture  ← right side of header, subtle
```

Style: `fontSize: 10`, `color: rgba(255,255,255,0.45)`, no border — just text so it doesn't compete with BETA.

### `src/pages/intelligence/Dashboard.tsx` — Scale tap animation on bottom nav

In the `MobileDashboard` bottom nav (lines 3806–3850), add a `useState<string|null>(null)` for `pressedTab`. On `onPointerDown` set `pressedTab = n.id`, on `onPointerUp` / `onPointerLeave` clear it after a short timeout.

Apply a CSS transform to the pressed button:
```js
transform: pressedTab === n.id ? "scale(0.82)" : "scale(1)",
transition: "transform 0.12s cubic-bezier(0.36,0.07,0.19,0.97)"
```

This creates a snappy spring-feel micro-animation on tap — no library needed.

---

## Files

- `src/pages/intelligence/Intelligence.tsx` — add sector subtitle to mobile header (right side, near BETA badge)
- `src/pages/intelligence/Dashboard.tsx` — add `pressedTab` state + scale transform to bottom nav buttons
