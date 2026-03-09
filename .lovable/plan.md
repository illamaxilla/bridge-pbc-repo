
## The Problem

`MobileDashboard` in `Dashboard.tsx` has a static sector card that shows the current sector's data but has no interactive "Active Sector" selector. The user cannot switch sectors from the Dashboard mobile view.

`MarketOverview.tsx` has a `MobileHeader` component (lines 3251–3369) — a sticky tap-to-open banner showing "Active Sector" + sector name + score, which opens a `MSectorDrawer` bottom sheet for switching.

Dashboard needs the same pattern.

## What Exists in Dashboard.tsx That Enables This

- `sectorSvgIcons` array (lines 81–274): 12 SVG functions indexed to match SECTORS order
- `SECTORS` array (line 275): 12 sector objects with `id`, `short`, `score`, `icon` (Lucide)
- `M` color constants (line 1718)
- `MobileDashboard({ s, setS })` — already receives `s` (active sector) and `setS` (setter)

## The Fix — Two additions to Dashboard.tsx

### 1. Add `MSectorDrawer` function (before `MobileDashboard`, ~line 2013)

A bottom-sheet drawer that lists all 12 sectors, identical in structure to MarketOverview's version but using Dashboard's SECTORS and `sectorSvgIcons[index]` for icons.

### 2. Add `MobileSectorHeader` function (before `MobileDashboard`)

A sticky header (matching MarketOverview's `MobileHeader` styling exactly) that shows:
- "Active Sector" label (uppercase, muted)
- Current sector short name
- Current sector score
- Chevron-down arrow
- Taps to open the `MSectorDrawer`

### 3. Replace the static header in `MobileDashboard` (lines 2054–2068)

Remove the plain `<div>Dashboard</div>` label that currently sits at the top and replace it with `<MobileSectorHeader s={s} setS={setS} />`.

The existing sector card below (lines 2069–2141 showing score ring, full name, Cap/IRR/Score chips) can be **removed** since the sticky header now serves as the active sector indicator — or kept as secondary context. Given the screenshot shows the header bar is the primary selector and the content below it is data, we'll **remove** the static sector card and let the header do the sector identification job, keeping the KPI cards as the first visible content. This matches exactly how MarketOverview works.

## Files Changed

- **`src/pages/intelligence/Dashboard.tsx`** only — 3 targeted changes:
  1. Insert `MSectorDrawer` function (~line 2013)
  2. Insert `MobileSectorHeader` function (~line 2013, after drawer)
  3. In `MobileDashboard` render: replace lines 2054–2141 (static "Dashboard" text + static sector card) with `<MobileSectorHeader s={s} setS={setS} />`

Nothing else touched.
