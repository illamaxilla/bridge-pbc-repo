
## Assessment

After a thorough audit of the codebase, here are the highest-value improvements across your three priority areas:

---

## Issues Found

### 1. Missing functionality / non-working CTAs (Home page)

| Location | Issue |
|---|---|
| Hero "Explore Our Work" button | Plain `<button>` with no `onClick` or link — does nothing |
| Services section "Learn more" button | Same — plain `<button>`, no navigation |
| Contact form "Send Message" button | No submit handler, no feedback — form is dead |
| Hero stat card "Explore" link | Styled `<div>` with `cursor: pointer` but no navigation |
| Services section on mobile — cards use `href` icon but aren't linked | Each service card flip shows description but doesn't link to `/services` |

### 2. Site navigation gaps

| Location | Issue |
|---|---|
| "Explore Our Work" → should go to `/about` or `/services` | No routing |
| "See How It Works" (Approach section) → should go to `/methodology` | No routing |
| "Learn more" (Services dark section) → should go to `/services` | No routing |
| Hero "Explore" stat mini-button → should go to `/sectors` | No routing |
| Service flip-cards on desktop → should link to `/services` on click | No routing |
| Insights carousel "More Insights" CTA → correctly links to `/insights` ✓ | Already fine |

### 3. Mobile experience

| Location | Issue |
|---|---|
| Services section horizontal scroll cards — no visible swipe hint | No scroll indicator |
| Values carousel on mobile — dot indicators are hidden because they only show after swipe | Minor UX issue |
| Mobile sector list: "View all 12 sectors" link is placed outside the scrollable container but still in the same grid column as the radar chart — it renders below the scroll box on mobile ✓ | Already fixed |

---

## Plan

### Files to change: `src/pages/Index.tsx` only

**Fix 1 — "Explore Our Work" button** (line ~911)
Wrap in `<Link to="/about">` using react-router-dom (already imported).

**Fix 2 — "Explore" stat card mini-button** (line ~1126)  
Wrap the `<div>` in `<Link to="/sectors">`.

**Fix 3 — "See How It Works" button in Approach section** (line ~1591)
Add `onClick={() => navigate("/methodology")}` using `useNavigate` (already available from existing imports).

**Fix 4 — "Learn more" button in Services dark section** (line ~1912)
Add `onClick={() => navigate("/services")}`.

**Fix 5 — Service flip-cards** (lines ~1968–2121)
Wrap each `service-card` div in `<Link to="/services">` so clicking any card navigates there. Remove `cursor: default` on the inner shell since it's now a link.

**Fix 6 — Contact form "Send Message"** (lines ~3743–3757)
Add a simple `useState` for `submitted` state. On submit: set `submitted = true`, show a success message ("Thanks! We'll be in touch within one business day."). The form data isn't wired to a backend yet so this is a polished placeholder response rather than a real submission.

**Fix 7 — Mobile services swipe hint**
The horizontal scroll row of service cards (line ~1937) has no visible scroll indicator. Add a subtle gradient fade on the right edge of the container to hint at scrollability, matching the existing insights carousel style.

---

## Result

All seven dead CTAs will route somewhere purposeful. The contact form gives real feedback on submit. Mobile services section gets a scroll hint.

```text
Home page
  Hero
    [Explore Our Work] → /about          ← was dead
    [Explore] stat card → /sectors       ← was dead
  Approach section  
    [See How It Works] → /methodology    ← was dead
  Services (dark) section
    [Learn more] → /services             ← was dead
    [Flip cards] → /services             ← was dead
  Contact form
    [Send Message] → success state       ← was dead
  Mobile services row
    Right-edge fade gradient hint        ← new
```
