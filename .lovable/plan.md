
## What to change

The mobile footer nav currently shows `["Services", "Resources", "Insights"]`. The user wants it changed to `["Company", "Services", "Insight"]`.

**File:** `src/components/SiteFooter.tsx`, lines 317–322

Change the array and href map:

```tsx
{(["Company", "Services", "Insight"] as const).map((label) => {
  const href: Record<string, string> = {
    Company: "/about",
    Services: "/services",
    Insight: "/insights",
  };
```

- `"Company"` → `/about`
- `"Services"` → `/services`  
- `"Insight"` (singular, shorter text to fit on one line) → `/insights`

**Only file changed:** `src/components/SiteFooter.tsx` (lines 317–322)
