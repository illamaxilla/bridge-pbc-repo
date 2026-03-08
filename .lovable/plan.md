
## Problem

On mobile, the `<a>` wrapper tags around "Start a Conversation" and "Explore Sectors" (lines 4311 and 4348) are inline elements — they only shrink-wrap their content. The `width: isMobile ? "100%" : "auto"` on the `<button>` inside has no effect because the parent `<a>` constrains the width.

By contrast, "Learn More About Research" (line 2419) sits in a plain `<div>` (block element), and "Let's Build Something Together" (line 3505) is a bare `<button>` with `width: "100%"` — both naturally stretch full width.

## Fix

**File:** `src/pages/Services.tsx`, lines 4311 and 4348

Add `display: isMobile ? "block" : "inline-block"` and `width: isMobile ? "100%" : "auto"` to both `<a>` wrappers:

```tsx
// Line 4311 — "Start a Conversation" wrapper
<a href="/contact" style={{ textDecoration: "none", display: isMobile ? "block" : "inline-block", width: isMobile ? "100%" : "auto" }}>

// Line 4348 — "Explore Sectors" wrapper  
<a href="/services" style={{ textDecoration: "none", display: isMobile ? "block" : "inline-block", width: isMobile ? "100%" : "auto" }}>
```

**Only file changed:** `src/pages/Services.tsx` (lines 4311 and 4348)
