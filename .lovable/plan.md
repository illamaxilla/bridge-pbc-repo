
## The Problem

The accordion items look different from the "View all 12 sectors" button because they have different background colors and a border:

- **Accordion items (collapsed)**: `backgroundColor: colors.white` + `border: 1px solid colors.line` → appears as white cards with a border
- **"View all 12 sectors" button**: `backgroundColor: colors.background` (#F3F5F2 grey) + no border → the look the user wants for all items

Additionally, line 2746 still has the broken `maxHeight: "420px", overflowY: "auto"` on mobile from the previous bad change that was never cleaned up.

## The Fix (3 targeted changes in `src/pages/Index.tsx`)

### 1. Line 2746 — Remove broken mobile scroll constraints
```
// Before
{ display: "flex", flexDirection: "column", gap: "8px", ...(isMobile ? { maxHeight: "420px", overflowY: "auto", paddingRight: "4px" } : {}) }

// After
{ display: "flex", flexDirection: "column", gap: "8px" }
```

### 2. Line 2753-2754 — Match collapsed style to "View all 12 sectors"
```
// Before
backgroundColor: isOpen ? colors.primary : colors.white,
border: `1px solid ${isOpen ? "transparent" : colors.line}`,

// After
backgroundColor: isOpen ? colors.primary : colors.background,
border: "none",
```

That's it. Two lines changed, one line removed. Nothing else touched.
