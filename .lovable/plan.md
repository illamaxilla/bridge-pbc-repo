
## What to change

In `src/pages/Index.tsx` around lines 3460–3499, the "Aligned With Government Priorities" pill badge sits between two horizontal lines. On mobile, the user wants:
1. **Remove the green dot** — the `<span>` at lines 3488–3496 (the 6px accent-colored circle)
2. **Center the text** — the current layout uses `flex: 1` side dividers to create a centered pill between lines. On mobile, remove the side line dividers and center the pill on its own.

### Approach

Wrap the entire header `<div>` (lines 3460–3500) in an isMobile conditional:

- **Desktop**: Keep as-is — flex row with left line / pill / right line
- **Mobile**: Render just the pill centered, no side lines, no green dot span

The `isMobile` variable is already defined in `Index.tsx` (used throughout the file), so no new hook is needed.

### Specific changes to `src/pages/Index.tsx`

**Lines 3460–3500** — replace with:

```tsx
<div
  style={{
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "60px",
  }}
>
  {!isMobile && <div style={{ flex: 1, height: "1px", backgroundColor: colors.line }} />}
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "10px 24px",
      border: `1px solid ${colors.line}`,
      borderRadius: "50px",
      fontSize: "12px",
      fontWeight: "600",
      letterSpacing: "1.5px",
      color: colors.primary,
      fontFamily: "Inter, sans-serif",
      textTransform: "uppercase",
      backgroundColor: colors.white,
      margin: isMobile ? "0" : "0 24px",
    }}
  >
    {!isMobile && (
      <span
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: colors.accent,
          display: "inline-block",
        }}
      />
    )}
    Aligned With Government Priorities
  </div>
  {!isMobile && <div style={{ flex: 1, height: "1px", backgroundColor: colors.line }} />}
</div>
```

**Only file changed:** `src/pages/Index.tsx` (lines 3460–3500)
