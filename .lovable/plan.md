
## The issue

In `src/pages/Resources.tsx` lines 2799–2816, the "Access Dashboard" button in the hero section is a plain `<button>` with no `href` or navigation — it does nothing when clicked.

The Insights page (same button, same design) correctly uses `<a href="/dashboard">`. The actual route in App.tsx is `/intelligence/dashboard` (protected route). The Insights page links to `/dashboard` — I'll match that exact destination to stay consistent.

## The fix

**Replace the `<button>` at lines 2799–2816 with an `<a>` tag** — exactly matching the pattern already used in `Insights.tsx`:

```tsx
<a
  href="/dashboard"
  onClick={(e) => { e.preventDefault(); navigate("/dashboard"); }}
  style={{
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: C.accent,
    color: C.primary,
    textDecoration: "none",
    padding: "12px 24px",
    borderRadius: "50px",
    fontSize: "14px",
    fontWeight: "700",
    fontFamily: "Inter,sans-serif",
    cursor: "pointer",
    width: mobile ? "100%" : "auto",
    justifyContent: mobile ? "center" : "flex-start",
    boxSizing: "border-box",
  }}
>
  Access Dashboard <ArrowUpRight size={15} />
</a>
```

`useNavigate` is already imported in `Resources.tsx` (added in the previous fix). This works on both mobile and desktop.

## File changed
- `src/pages/Resources.tsx` — lines 2799–2816 only (swap `<button>` → `<a>`)
