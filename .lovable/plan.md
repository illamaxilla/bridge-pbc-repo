
## What to change

The mobile footer nav labels live in a single array in `src/components/SiteFooter.tsx` at line 317:

```tsx
{(["Company", "Services", "Resources", "Insights"] as const).map((label) => {
  const href: Record<string, string> = {
    Company: "/about",
    Services: "/services",
    Resources: "/resources",
    Insights: "/insights",
  };
```

Remove `"Company"` from the array and its corresponding `Company: "/about"` entry from the href map.

### Change

**Lines 317–323** — remove `"Company"` from both the array and the href map:

```tsx
{(["Services", "Resources", "Insights"] as const).map((label) => {
  const href: Record<string, string> = {
    Services: "/services",
    Resources: "/resources",
    Insights: "/insights",
  };
```

**Only file changed:** `src/components/SiteFooter.tsx` (lines 317–323)

Since `SiteFooter.tsx` is the single source of truth for the mobile footer (as confirmed by the shared-components memory), this one edit applies to all pages automatically — no per-page changes needed.
