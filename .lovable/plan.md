
## What's wrong

The Legislative Calendar section has several "cartoonish" elements to clean up:

### 1. Rainbow status/event-type color configs (lines 293–311)
- `STATUS_CONFIG`: green/amber/blue backgrounds for Enacted/Pending/Under Review
- `EVENT_TYPE_CONFIG`: purple/teal/red/amber/green colored pill badges for Reading/Consultation/Deadline/Review/Implementation
- `URGENCY_CONFIG`: red/amber/gray urgency colors used as the left border accent on cards

### 2. Calendar event card left border (line 419)
`borderLeft: "4px solid ${urgencyCfg.color}"` — red/amber/gray rainbow left borders on every card

### 3. Legend pills in the calendar header (lines 617–621)
Each type badge uses its individual rainbow color as both text color and background

### 4. Emoji in the "Upcoming" label badge (line 575)
`📅 Upcoming` — remove the calendar emoji

### 5. No-results emoji (line 782)
`📋` — remove

### 6. Hero stats row colored labels (lines 543–545)
`color: "#16A34A"`, `color: "#D97706"`, `color: "#60A5FA"` — rainbow text under each stat number

---

## The fix: discipline to brand palette only

Replace all off-brand colors with the BRIDGE palette:

| Element | Before | After |
|---|---|---|
| Status badges | Green/amber/blue bg+text | `C.primary` text + `C.background` bg, or a single subtle border |
| Event type pills | 5 different rainbow colors | `C.primary` text + `C.background` bg for all |
| Card left border | urgency red/amber/gray | Remove entirely (or use `C.line` as a uniform left border) |
| Legend pills | rainbow | `C.primary` + `C.background` |
| Hero stat labels | green/amber/blue text | `C.accent` (lime) for all |
| Emoji | 📅 📋 | Remove |

### Status badges: distinguish without rainbow
- **Enacted** → small filled dot `C.accent` (lime) + "Enacted" text in `C.primary`
- **Pending** → empty circle outline + "Pending" in `C.muted`
- **Under Review** → small dash + "Under Review" in `C.primary`
- All on `C.background` bg, subtle `C.line` border

### Event type pills: single neutral style
All use `C.background` bg, `C.line` border, `C.primary` text — differentiated only by label text, not color.

### Files
- `src/pages/Policy.tsx` only
  - Update `STATUS_CONFIG` (lines 293–297)
  - Update `EVENT_TYPE_CONFIG` (lines 299–305)
  - Update `URGENCY_CONFIG` (lines 307–311)
  - Remove left border urgency color from `CalendarEventCard` (line 419)
  - Remove emoji from "Upcoming" label (line 575)
  - Remove emoji from no-results state (line 782)
  - Update hero stat label colors (lines 543–545)
  - Update `StatusBadge` component render (lines 330–341) to use discipline styling
  - Update legend pills render (lines 617–621) to use neutral style
