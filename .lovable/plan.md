
## What needs to happen

### 1. Sectors page — link both CTA buttons + remove hover (both mobile & desktop)

The `CTA` component in `src/pages/Sectors.tsx` (lines 1852–1919) has two plain `<button>` elements with no navigation:

- **"Request Full Access"** → should link to `/login`
- **"Schedule a Briefing"** → should link to `/contact`

The "Request Full Access" button has class `cta-lime-swap`, which is defined in the `<style>` block at line 2468–2469:
```css
.cta-lime-swap:hover { background-color: #1B4D3E !important; color: #FFFFFF !important; transform: translateY(-1px); }
```
This needs to be removed (or the class stripped from the button). The `<style>` block also has `.cta-primary:hover` at line 2466 which should be left alone.

`Sectors.tsx` currently has no `useNavigate` import — need to add `import { useNavigate } from "react-router-dom"` and add `const navigate = useNavigate()` inside the `CTA` component.

### Changes to `src/pages/Sectors.tsx`

**A. Add react-router-dom import** (line 1): add `useNavigate` to import.

**B. Update CTA component** (lines 1852–1919):
- Add `const navigate = useNavigate();`
- Wrap "Request Full Access" button in `<a>` with `href="/login"` + `onClick` SPA handler, remove `cta-lime-swap` class
- Wrap "Schedule a Briefing" button in `<a>` with `href="/contact"` + `onClick` SPA handler

**C. Remove hover CSS** (line 2469): remove the `.cta-lime-swap:hover` rule (the transition line at 2468 can stay or go too since the class won't be used).

### Summary table

| Button | Link | File |
|---|---|---|
| Request Full Access | `/login` | `Sectors.tsx` CTA |
| Schedule a Briefing | `/contact` | `Sectors.tsx` CTA |

**Only 1 file changes: `src/pages/Sectors.tsx`**
