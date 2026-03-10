
## Surgical plan — 3 precise changes only

### The actual problem
`SiteHeader.tsx` renders a full centered 10-item desktop nav bar. At 1147px viewport with 80px padding, 10 items + logo + "Request Access" button all compete for space and break. `SiteHeaderMinimal.tsx` (the home page header) has **no desktop nav bar** — just logo + 3 icons. That's what the user wants everywhere.

### What needs changing

---

#### Change 1: Import swap — 13 sector page files (line 3 only per file)

For each of these 13 files, change line 3 from:
```ts
import SiteHeader from "@/components/SiteHeader";
```
to:
```ts
import SiteHeader from "@/components/SiteHeaderMinimal";
```

The JSX usage (`<SiteHeader />`) stays identical — no other changes in any of these files.

Files:
- `src/pages/Sectors.tsx`
- `src/pages/sectors/Agriculture.tsx`
- `src/pages/sectors/Education.tsx`
- `src/pages/sectors/Energy.tsx`
- `src/pages/sectors/Financial.tsx`
- `src/pages/sectors/Health.tsx`
- `src/pages/sectors/Housing.tsx`
- `src/pages/sectors/Infrastructure.tsx`
- `src/pages/sectors/Manufacturing.tsx`
- `src/pages/sectors/Sports.tsx`
- `src/pages/sectors/Technology.tsx`
- `src/pages/sectors/Tourism.tsx`
- `src/pages/sectors/Transport.tsx`

**No other lines touched in any of these files.**

---

#### Change 2: Subscribe form in `SiteFooter.tsx` — wire to backend

The footer already has a subscribe input + button (mobile: lines ~355–385, desktop: lines ~556–590). Currently they're static with no state. Need to:

1. Add `useState` import (already imported via React — just add `useState` usage)
2. Add state: `email`, `subStatus` ("idle" | "loading" | "success" | "error")
3. Add `handleSubscribe` async function:
   - Validates email format
   - Inserts into a new `subscribers` table via Supabase
   - Sets `subStatus` accordingly
4. Wire the input `value`/`onChange` and the button `onClick`
5. Replace the button `→` with conditional text: "→" / "..." / "✓" based on status
6. Show a small confirmation line below the input on success

**Database**: Need a new `subscribers` table with `email` (unique) and `created_at`. RLS: public INSERT allowed.

**Both mobile AND desktop instances** get the same logic — they share the same state since `SiteFooter` is one component.

**No other changes to SiteFooter** — layout, styling, sector grid, social icons, nav links all untouched.

---

#### Change 3: Nothing else

- `SiteHeaderMinimal.tsx` — already correct, not touched
- `SiteHeader.tsx` — not touched (kept for future use)
- All other pages — not touched
- Intelligence dashboard — not touched

---

### Database migration needed

```sql
create table public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamp with time zone default now() not null
);

alter table public.subscribers enable row level security;

create policy "Anyone can subscribe"
  on public.subscribers
  for insert
  to public
  with check (true);
```

### Result

Every page (Home, About, Methodology, Resources, Contact, Policy, Services, Insights, Sectors, all 12 sector pages) shows the exact same clean header: logo left, Search/User/Menu icons right. Active page is indicated in the hamburger overlay on all pages. Subscribe form works end-to-end.
