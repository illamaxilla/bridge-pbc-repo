
## What to build

The user wants placeholder files for every section they'll paste code into. Based on the screenshots and current code, there are three layers of depth to create:

### Layer 1 — Top-level Community tabs (already exist inline in index.tsx)
These need to be **extracted into their own files** so the user can paste full page code there:
- `src/pages/community/Members.tsx` — currently a 15-line "Coming Soon" block inline
- `src/pages/community/Resources.tsx` — currently a 15-line "Coming Soon" block inline

### Layer 2 — Forum left-nav sub-sections (currently not wired at all)
The Forum left sidebar has 9 items that are plain static buttons. The user needs a `forumSection` state added and placeholder files for each sub-section:
- `src/pages/community/forum/ForumHome.tsx`
- `src/pages/community/forum/Questions.tsx`
- `src/pages/community/forum/MostAnswered.tsx`
- `src/pages/community/forum/Polls.tsx`
- `src/pages/community/forum/Groups.tsx`
- `src/pages/community/forum/Tags.tsx`
- `src/pages/community/forum/Sectors.tsx`
- `src/pages/community/forum/Badges.tsx`
- `src/pages/community/forum/ForumMembers.tsx`

### What each placeholder looks like
Each file exports a default component that:
- Accepts `{ C, font }` design token props (matching the existing token pattern in index.tsx) so pasting new code into them will work without re-defining tokens
- Has a clearly commented `// PASTE YOUR CODE HERE` block
- Renders a minimal "Coming Soon" card using the existing design tokens so nothing breaks visually

### Changes to index.tsx
1. **Import** all the new placeholder files
2. **Add `forumSection` state** (e.g. `const [forumSection, setForumSection] = useState("Home")`) 
3. **Wire the 9 left-nav buttons** in the Forum sidebar to `setForumSection(item.label)`
4. **Replace the Members placeholder** with `<MembersPage C={C} font={font} />`
5. **Replace the Resources placeholder** with `<ResourcesPage C={C} font={font} />`
6. **Replace the Forum main content area** with conditional rendering: `{forumSection === "Home" && <ForumHome ... />}`, etc. The existing Q&A feed content becomes the `ForumHome` content.

### File tree result
```
src/pages/community/
├── index.tsx              (updated — wires sub-components)
├── Community.tsx          (unchanged)
├── Members.tsx            (new placeholder)
├── Resources.tsx          (new placeholder)
└── forum/
    ├── ForumHome.tsx      (new — contains existing Q&A feed JSX moved here)
    ├── Questions.tsx      (new placeholder)
    ├── MostAnswered.tsx   (new placeholder)
    ├── Polls.tsx          (new placeholder)
    ├── Groups.tsx         (new placeholder)
    ├── Tags.tsx           (new placeholder)
    ├── Sectors.tsx        (new placeholder)
    ├── Badges.tsx         (new placeholder)
    └── ForumMembers.tsx   (new placeholder)
```

### No App.tsx changes needed
The URL routing stays as-is (`/community/forum` → Forum tab). The forum sub-sections use internal `forumSection` state — not URL sub-routes — keeping it consistent with the current pattern. URL sub-routing for forum sections can be added later when the user pastes real content.

### Design token passing strategy
Since all the styling in index.tsx uses `C` and `font` constants defined at the top of that file, the placeholder components will accept them as props typed as:
```tsx
interface SectionProps {
  C: typeof import("../community/index").C; // passed as prop
  font: typeof import("../community/index").font;
}
```
This avoids re-defining the tokens in 11 different files.
