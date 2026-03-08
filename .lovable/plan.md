
## What the user wants

A native app-like experience on mobile: the bottom navigation bar in the Intelligence Dashboard should always be visible — fixed to the bottom of the screen — regardless of how much the user scrolls.

## Current state

In `MobileDashboard` (Dashboard.tsx, lines ~3683–3850), the bottom nav is rendered as a `flexShrink: 0` child of the outer flex column:

```
<div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
  ...
  <div className="mscroll" style={{ flex: 1, overflowY: "auto" }}>  ← scrollable content
    ...
  </div>
  <div style={{ flexShrink: 0, height: 56, ... }}>                  ← bottom nav (NOT sticky)
    ...tabs...
  </div>
</div>
```

Because the outer wrapper uses `height: 100%` (not `100vh`), and the shell's `<main>` handles overflow with `overflow: auto`, the bottom nav sits in document flow and can scroll out of view if the content is short enough or the layout overflows.

## Fix

Two small changes in `Dashboard.tsx` to the `MobileDashboard` return:

### 1. Make the bottom nav `position: fixed`

Change the bottom nav's style from:
```js
{ flexShrink: 0, height: 56, position: "relative", zIndex: 50, ... }
```
to:
```js
{ position: "fixed", bottom: 0, left: 0, right: 0, height: 56, zIndex: 100, ... }
```

This pins it to the bottom of the viewport on mobile, exactly like a native app tab bar.

### 2. Add bottom padding to the scrollable content

Since the fixed nav now overlaps the content, add `paddingBottom: 56` (or `72` for safe area on notched phones) to the scrollable content div so the last items aren't hidden behind the nav bar.

Change the scrollable wrapper:
```js
{ flex: 1, overflowY: "auto", padding: "10px 12px 0" }
```
to:
```js
{ flex: 1, overflowY: "auto", padding: "10px 12px 72px" }
```

### 3. Safe-area inset (bonus — 1 line)

Add `paddingBottom: "max(56px, calc(56px + env(safe-area-inset-bottom)))"` to the fixed nav so it sits above the iPhone home indicator on notched devices. This is a small CSS `env()` addition.

## Files

- **`src/pages/intelligence/Dashboard.tsx`** — lines ~3683 (bottom nav style) and ~2143 (scrollable content padding)
