
## The Problem

The mobile PBC card (lines 2959–3060) has `justifyContent: "flex-end"` on its outer container, which pushes all the text content (pill + heading + description + button) down to the bottom of the card.

The user wants:
- Pill + heading + description at the **top** of the card (normal position)
- Button pinned to the **bottom-right** corner
- Link changed from `/about` → `/services`

## The Fix — Mobile card only (lines 2959–3060)

3 changes in the mobile `<div>` block:

**1. Outer container** (line 2970): change `justifyContent: "flex-end"` → `justifyContent: "space-between"` (or remove it) so content sits at top.

**2. Inner content `<div>`** (line 2991): change to `display: "flex"`, `flexDirection: "column"`, `justifyContent: "space-between"`, `height: "100%"` so it fills the card and the button can be pushed to the bottom.

**3. Button placement**: wrap the button in a `<div style={{ display: "flex", justifyContent: "flex-end" }}>` so it aligns bottom-right, and change the `<a href="/about">` → `<a href="/services">`.

## Files changed
- `src/pages/Index.tsx` — mobile PBC card block only (lines ~2960–3060)
- Desktop card (`/about` link, lines 3192/3192) also updated to `/services` for consistency
