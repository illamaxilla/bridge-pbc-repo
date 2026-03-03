
## Wire Up Mobile Hamburger Menus

### Current State

| File | Desktop Nav | Footer Icons | Mobile Menu |
|---|---|---|---|
| All 12 sector pages | ✓ `navHref(item)` | ✓ `sectorRoutes` | ✓ exists (Tourism, Education, etc.) |
| Agriculture.tsx | ✓ | ✓ | Exists but `href="#"` — not wired |
| Index.tsx | ✓ | ✓ | **Missing entirely** — hamburger is dead `<a>` |
| Services.tsx | ✓ | ✓ | **Missing entirely** — hamburger is dead `<a>` |

---

### Changes Required

#### 1 — Agriculture.tsx (1 line fix)

Line 1089 in the mobile menu overlay `navItems.map(...)`:
```tsx
// Before
href="#"

// After
href={navHref(item)}
```

---

#### 2 — Index.tsx (add full mobile menu)

The header in `Index.tsx` is not a separate component — it lives inline inside `BRIDGEHomePage()`. The hamburger is an `<a href="#">` tag with a 3-line SVG (lines 1130-1156). On mobile the nav is conditionally hidden with `{!isScrolled && !isMobile && ...}`.

Two changes:

**A. Convert the hamburger `<a>` into a `<button>`** that toggles a new `mobileMenuOpen` state variable. Add `const [mobileMenuOpen, setMobileMenuOpen] = useState(false);` to the existing state declarations (around line 766).

**B. Add a mobile menu overlay** right after the closing `</header>` tag (around line 1158), using the same fullscreen dark overlay pattern from the sector pages:

```tsx
{isMobile && mobileMenuOpen && (
  <div style={{
    position: "fixed", inset: 0, zIndex: 999,
    backgroundColor: colors.primary,
    padding: "80px 32px 40px",
    display: "flex", flexDirection: "column",
  }}>
    {/* Close button top-right */}
    <button onClick={() => setMobileMenuOpen(false)} style={{ ... }} />
    
    <nav style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      {["About", "Sectors", "Services", "Insights", "Contact"].map((item) => (
        <a
          key={item}
          href={navHref(item)}
          onClick={() => setMobileMenuOpen(false)}
          style={{ color: "rgba(255,255,255,0.85)", fontSize: "24px", ... }}
        >
          {item}
        </a>
      ))}
    </nav>
  </div>
)}
```

---

#### 3 — Services.tsx (add full mobile menu)

Same exact change as Index.tsx. The header is also inline in the main component. The hamburger icon is at lines ~1669-1695 (a `<a href="#">` with a 3-line SVG).

**A. Add `const [mobileMenuOpen, setMobileMenuOpen] = useState(false);`** to existing state declarations.

**B. Convert hamburger `<a>` to a `<button>`** with `onClick={() => setMobileMenuOpen(!mobileMenuOpen)}`.

**C. Add mobile menu overlay** after `</header>` at line ~1697, using the same dark fullscreen overlay pattern with `navHref(item)` links.

---

### Files to Edit

- `src/pages/sectors/Agriculture.tsx` — 1-line fix
- `src/pages/Index.tsx` — add state + convert button + add overlay
- `src/pages/Services.tsx` — add state + convert button + add overlay

### Result

All 14 pages will have a working hamburger menu on mobile that opens a fullscreen dark overlay with functional nav links to Home (`/`), Services (`/services`), and Sectors (`/services`), with Insights and Contact staying as `#` until those pages are built.
