
## Add About Page

### What to build

A new `src/pages/About.tsx` file matching the established BRIDGE design system (dark green `#1B4D3E`, lime `#B8D935`, off-white `#F3F5F2`), with the same header and footer pattern used across all existing pages.

### Page sections

1. **Header/Nav** — same dark green nav with BRIDGE logo, navItems, hamburger on mobile (same as other pages)
2. **Hero** — dark green banner with page title "About BRIDGE" and a short tagline
3. **Mission & Vision** — two-column cards explaining BRIDGE's purpose and goals
4. **Our Story** — narrative section with timeline or paragraph blocks
5. **Values & Approach** — icon-driven grid of 4 core principles
6. **Team** — placeholder cards for leadership profiles (name, title, short bio)
7. **Footer** — same footer with sector icons and company links used across all pages

### Files to create/edit

| File | Change |
|---|---|
| `src/pages/About.tsx` | **Create** — full page component |
| `src/App.tsx` | Add `import About` and `<Route path="/about" element={<About />} />` |
| `src/pages/Index.tsx` | Update `navHref` so "About" maps to `/about` instead of `/` |
| `src/pages/Services.tsx` | Same navHref update |
| All 12 `src/pages/sectors/*.tsx` | Same navHref update |

### navHref change (all pages)

```ts
// Before
item === "About" ? "/" : ...

// After
item === "About" ? "/about" : ...
```

### Technical notes

- `About.tsx` will import `useState`, `useEffect` — no new dependencies
- Reuse the same `colors`, `sectorRoutes`, `navHref`, `footerSectorIcons`, `useIsMobile` pattern already in every page
- Team section uses placeholder boxes (no image hosting needed) until real photos are provided
- All content (bios, story text) will be reasonable placeholder copy that the user can edit later
