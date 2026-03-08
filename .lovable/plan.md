
## Root Cause Analysis

All TypeScript errors fall into **4 distinct patterns** across 4 files. The issues are pre-existing in the intelligence pages the user updated — none were introduced by the navigation audit work.

---

### Error Pattern 1 — Tooltip component props typed as `{}` instead of proper shape
**Recharts `<Tooltip content={<Comp />} />` passes `active`, `payload`, `label` but TypeScript can't infer them when the component has no explicit prop type annotation.**

Files & lines:
- `Analytics.tsx` line 1731 — `<CustomTip />` (defined line 1591 as `({ active, payload })`)
- `Dashboard.tsx` lines 5123, 5138 — `<Tip />` (defined line 1503 as `({ active, payload, label })`)
- `MarketOverview.tsx` lines 1457, 1856, 1904 — tooltip components
- `Reports.tsx` line 1314, 1535 — `<ChartTip />` (defined line 820)

**Fix**: Add explicit TypeScript prop interface to each tooltip component:
```ts
interface TooltipProps { active?: boolean; payload?: any[]; label?: string; }
const Tip = ({ active, payload, label }: TooltipProps) => { ... }
```

---

### Error Pattern 2 — `MCard` in Dashboard.tsx missing `badge` prop (required but callers omit it)
**Dashboard.tsx line 3122**: `<MCard icon={Globe} title="Cross-Sector Links" defaultOpen={false}>` — no `badge` prop.

The `MCard` definition (line 1822) has `badge` as a required destructured param (no default).

**Fix**: Make `badge` optional with a default in the `MCard` function signature:
```ts
function MCard({ icon: Icon, title, badge = undefined, badgeLime = false, defaultOpen = true, children })
```
Or add `badge?: any` to the destructured params.

---

### Error Pattern 3 — Array `.map()` destructuring with mixed types (`string | LucideIcon`) used as React `key` and `ReactNode`
**Dashboard.tsx lines 5074, 5075, 5092, 5790, 5816**:

```js
[["Bar", "bar", BarChart3], ["Line", "line", LineChart]].map(([l, v, Icon]) => ...)
// TypeScript infers l/v/Icon as `string | LucideIcon` — can't use as key or ReactNode
```

Same for lines 5781-5788: `[[FileText, "View Report"], ...]`.

**Fix**: Add explicit tuple types to these arrays:
```ts
([
  ["Bar", "bar", BarChart3] as [string, string, React.ElementType],
  ...
]).map(([l, v, Icon]) => ...)
```
Or cast `key={v as string}` and `Icon` typed separately.

---

### Error Pattern 4 — `MSection` in MarketOverview.tsx has required `badgeStyle` and `iconColor` but callers omit them
The `MSection` function (line 2576) and `MCardHeader` (line 2510) have `badgeStyle` and `iconColor` as required props (no defaults or `?`).

Many call sites (lines 3739, 3807, 3807, 4516, 4572, etc.) omit `badgeStyle` and sometimes `iconColor`.

**Fix**: Make them optional with defaults in `MSection` and `MCardHeader`:
```ts
function MSection({ icon, iconColor = M.accent, title, badge = "", badgeStyle = {}, defaultOpen = false, children })
function MCardHeader({ icon: Icon, iconColor = M.accent, title, badge = "", badgeStyle = {}, onToggle, open })
```

Also: `Pill` on line 817 is missing the `col` prop type — the call site at line 2075 omits `col`. Make `col` optional with a default.

---

### Error Pattern 5 — `color` prop on Recharts `<Cell>` receives `string | number` but expects `Color`
**Dashboard.tsx lines 5456, 5467, 5477, 5603, 5614**:

```js
[n, label, bg, col, sub].map(([n, label, bg, col, sub]) => ...)
// TypeScript infers col as `string | number`
```

The array literals like `["#EBF5B0", "#1B4D3E", "Priority"]` mix strings and numbers (`s.t1?.length`), so TypeScript widens the tuple to `(string | number)[]`.

**Fix**: Cast at the use site: `color={col as string}` or use `as const` tuples.

---

## Implementation Plan

### Files to edit: 4

| File | What to fix |
|---|---|
| `Analytics.tsx` | Add `TooltipProps` interface to `CustomTip` |
| `Dashboard.tsx` | 1) Add prop interface to `Tip`; 2) Make `badge` optional in `MCard`; 3) Fix mixed-type array `.map()` destructuring with `as [string, string, React.ElementType]` casts; 4) Cast `col as string` in tier distribution map |
| `MarketOverview.tsx` | 1) Make `badgeStyle` and `iconColor` optional with defaults in `MSection` + `MCardHeader`; 2) Make `badge` optional with default `""`; 3) Make `col` optional in `Pill`; 4) Add prop interfaces to tooltip components |
| `Reports.tsx` | Add `TooltipProps` interface to `ChartTip` |

### Approach per fix

**Tooltip props** — add a small interface above each tooltip component definition:
```ts
interface TipProps { active?: boolean; payload?: any[]; label?: string; }
const Tip = ({ active, payload, label }: TipProps) => { ... }
```

**Optional props** — add `= defaultValue` to destructured params or add `?` via TypeScript interface.

**Mixed array maps** — use `as [string, string, React.ComponentType<{size?: number}>]` cast on each tuple literal, or cast `key={String(v)}` and `<Icon size={11} />` with `Icon` typed as `React.ComponentType`.

**`col as string` for `color` prop** — minimal cast at the usage site.

All changes are surgical — no logic changes, only type annotations.
