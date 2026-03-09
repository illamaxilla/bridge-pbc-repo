
## Root cause

The grid layout at line 2673 has two expected columns:
1. Left: RadarChart (desktop only)
2. Right: accordion list

The `<Link to="/sectors">` (line 2897–2932) sits **outside** the right-column accordion `<div>` (which ends at line 2896 `</div>`). This makes the Link a **3rd grid child**, so CSS grid places it in an unexpected position — on desktop it floats below the radar chart column, not below the accordion. On desktop it actually looks okay by coincidence (it lands in the left-column grid track beneath the chart), but it's visually "fallen off" the accordion panel on the right.

## Structure today

```
<div style="display: grid, 1fr 1fr">    ← line 2673
  {!isMobile && <div> RadarChart </div>}  ← grid item 1 (left col)
  <div style="maxHeight:420px overflow:auto">  ← grid item 2 (right col)
    {sector rows...}
  </div>
  <Link>View all 12 sectors</Link>       ← grid item 3 (WRONG - falls into left col slot)
</div>
```

## Fix

Wrap both the scrollable accordion `<div>` AND the `<Link>` in a single outer `<div style="display:flex; flexDirection:column; gap:8px">`. This makes the right column a single grid item containing both the accordion and the CTA button stacked vertically.

```
<div style="display: grid, 1fr 1fr">
  {!isMobile && <div> RadarChart </div>}
  <div style="display:flex; flexDirection:column; gap:8px">   ← NEW wrapper
    <div style="maxHeight:420px overflow:auto">
      {sector rows...}
    </div>
    <Link>View all 12 sectors</Link>     ← now inside right col
  </div>
</div>
```

## Files
- `src/pages/Index.tsx`: wrap the accordion `<div>` (line 2745) and `<Link>` (lines 2897–2932) in a single column-flex `<div>`
