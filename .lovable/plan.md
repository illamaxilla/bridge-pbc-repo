
## Add Contact Us Placeholder Page

### What to do

1. **Create `src/pages/Contact.tsx`** — same pattern as `Resources.tsx` with a phone/envelope emoji, "Contact Us" heading, and appropriate placeholder copy.

2. **Edit `src/App.tsx`** — add `import Contact` and a `<Route path="/contact" element={<Contact />} />` above the catch-all.

3. **Browser test** — navigate to all 5 routes (`/resources`, `/insights`, `/methodology`, `/contact`, `/dashboard`) and take a screenshot confirming they render.

### Files to change

| File | Action |
|---|---|
| `src/pages/Contact.tsx` | Create — placeholder "Contact Us" page |
| `src/App.tsx` | Add import + `/contact` route |
