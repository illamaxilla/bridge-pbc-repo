
## What needs to happen

### Current state
The community header has 4 nav items — **Home**, **Forum**, **Members**, **Resources** — but all four are `<button>` elements with no click handlers or routing. Clicking them does nothing.

The "Discussion Board / Sector Q&A Forum" section (the full 3-column layout with left nav, question cards, sector categories, top members) currently lives inline at the bottom of the Home screen inside `CommunityDashboard`.

### The fix

**1. Add `activePage` state to `CommunityDashboard`**

Add a state variable `const [activePage, setActivePage] = useState("Home")` and wire each nav button's `onClick` to `setActivePage(item)`. Update each button's active highlight to use `activePage === item` instead of the hardcoded `item === "Home"` check.

**2. Extract the Forum section into its own render block**

The Discussion Board JSX (lines ~1870–2283) is already self-contained. Move it out of the main scroll flow and render it conditionally:
- `activePage === "Home"` → show the current Home content (hero, widget row, goals section)
- `activePage === "Forum"` → show the Discussion Board / Sector Q&A Forum section as the full page content
- `activePage === "Members"` → show a slim placeholder card
- `activePage === "Resources"` → show a slim placeholder card

**3. Placeholder pages for Members and Resources**

Yes — the answer to the user's question — they should have placeholder files/sections in the codebase. The cleanest approach for now (since community is a self-contained component, not yet using React Router sub-routes) is inline placeholder components rendered conditionally. This keeps the community section self-contained.

Each placeholder will match the community design language (white card, `SectionLabel`, "Coming Soon" message with the accent color) so it's ready for the user to paste real content later.

**4. No routing changes in `App.tsx` needed**

The community section uses internal state, not URL sub-routes. This is consistent with how it was built. Sub-routes can be added later when the user pastes real content for Members/Resources.

### Files to change

| File | Change |
|---|---|
| `src/pages/community/index.tsx` | Add `activePage` state → wire header nav buttons → conditionally render Forum / Members / Resources content |

### Result

```text
Community Header Nav
├── Home      → existing hero + widget row + goals (unchanged)
├── Forum     → Discussion Board / Sector Q&A Forum (moved here)
├── Members   → placeholder card (ready for content paste)
└── Resources → placeholder card (ready for content paste)
```

The Discussion Board section disappears from the Home scroll and only appears when "Forum" is clicked — exactly matching the uploaded mockup.
