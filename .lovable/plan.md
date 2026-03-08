
## What the user did

The user pasted their fully-developed Community app into `src/pages/community/index.tsx`. This single file (3,544 lines) now contains everything working:
- `LoginPage` — the community login screen
- `CommunityDashboard` — the main shell with top nav tabs (Home, Forum, Members, Resources)
- `HomePageContent` — the home tab content
- `ForumPage` — the forum with all 9 sub-views inline (Questions, Most Answered, Polls, Groups, Tags, Sectors, Badges) using `forumView` state
- `MembersPage` — full member directory with filters
- `ResourcesPage` — full resources/knowledge hub

The navigation is **fully state-based** inside the file — `currentPage` state switches between Home/Forum/Members/Resources, and `forumView` state switches forum sub-sections. The URL routing in `App.tsx` already points all `/community/*` paths to this component.

---

## Issues to fix

### 1. Build error (1 line) — BLOCKER
Line 1058 has `fontWeight` declared twice in the same style object:
```
fontWeight: 500,          ← line 1056 (inactive state)
color: currentPage === key ? C.primary : C.text,
fontWeight: currentPage === key ? 700 : 500,  ← line 1058 (duplicate)
```
Fix: remove the first `fontWeight: 500` at line 1055, keep the ternary one at line 1058.

### 2. URL routing vs state navigation — needs a decision
Currently, `App.tsx` routes like `/community/members`, `/community/forum/polls` all render `<CommunityHome />` but the component ignores the URL — it uses internal state only. This means direct URL navigation won't land on the right tab.

**Best approach given the pasted code**: Add `useLocation` into `CommunityDashboard` to read the URL pathname and derive the initial `currentPage` + `forumView` from it on mount. The internal state still drives everything, but it **initialises from the URL** so deep links work.

The URL map:
```
/community              → currentPage = "home"
/community/forum        → currentPage = "forum", forumView = "Home"
/community/forum/questions    → currentPage = "forum", forumView = "Questions"
/community/forum/most-answered → currentPage = "forum", forumView = "Most Answered"
/community/forum/polls  → currentPage = "forum", forumView = "Polls"
/community/forum/groups → currentPage = "forum", forumView = "Groups"
/community/forum/tags   → currentPage = "forum", forumView = "Tags"
/community/forum/sectors → currentPage = "forum", forumView = "Sectors"
/community/forum/badges → currentPage = "forum", forumView = "Badges"
/community/members      → currentPage = "members"
/community/resources    → currentPage = "resources"
```

Also update the tab buttons in `CommunityDashboard` (lines ~1042-1064) and forum nav buttons to call `navigate()` when switching tabs, so the URL stays in sync with the UI.

### 3. Dead placeholder files — cleanup
These files are now superseded and should be deleted or left as empty stubs. Since removing them doesn't break anything (they're no longer imported), they can be left. The real code lives in `index.tsx`.

---

## Files changed

| File | Change |
|---|---|
| `src/pages/community/index.tsx` | Fix duplicate `fontWeight` build error (1 line) + add URL sync |

That's it — **one file**. The `App.tsx` routes are already correct. The placeholder files in `Members.tsx`, `CommunityResources.tsx`, and `forum/*.tsx` don't need touching — they're just unused.

---

## Exact changes to `index.tsx`

**Change 1** — Remove duplicate `fontWeight` (line 1055):
```tsx
// Remove this line:
fontWeight: 500,
// Keep the ternary one at line 1058
fontWeight: currentPage === key ? 700 : 500,
```

**Change 2** — Add `useNavigate` and `useLocation` to the import at line 1:
```tsx
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
```

**Change 3** — In `CommunityDashboard` function (line 973), derive initial page from URL:
```tsx
const navigate = useNavigate();
const { pathname } = useLocation();

// Derive initial currentPage and forumView from URL
const getInitialPage = () => {
  if (pathname.startsWith("/community/forum")) return "forum";
  if (pathname === "/community/members") return "members";
  if (pathname === "/community/resources") return "resources";
  return "home";
};
const getInitialForumView = () => {
  const map = {
    "/community/forum/questions": "Questions",
    "/community/forum/most-answered": "Most Answered",
    "/community/forum/polls": "Polls",
    "/community/forum/groups": "Groups",
    "/community/forum/tags": "Tags",
    "/community/forum/sectors": "Sectors",
    "/community/forum/badges": "Badges",
    "/community/forum/members": "Members",
  };
  return map[pathname] ?? "Home";
};
// Replace useState("home") with:
const [currentPage, setCurrentPage] = useState(getInitialPage);
```

**Change 4** — In `ForumPage`, replace `useState("Questions")` for forumView with `useState("Home")` as default (the home Q&A feed view), and pass forumView init from parent based on URL.

**Change 5** — Update the top nav tab buttons to call `navigate()` in addition to `setCurrentPage()`:
```tsx
onClick={() => {
  const routeMap = { home: "/community", forum: "/community/forum", members: "/community/members", resources: "/community/resources" };
  setCurrentPage(key);
  navigate(routeMap[key]);
}}
```

**Change 6** — In `ForumPage`, update each forum nav button to also call `navigate()`:
```tsx
const routeMap = {
  "Home": "/community/forum",
  "Questions": "/community/forum/questions",
  "Most Answered": "/community/forum/most-answered",
  "Polls": "/community/forum/polls",
  "Groups": "/community/forum/groups",
  "Tags": "/community/forum/tags",
  "Sectors": "/community/forum/sectors",
  "Badges": "/community/forum/badges",
  "Members": "/community/members",
};
```
The "Members" item already navigates to `setCurrentPage("members")` — that stays, but now also calls `navigate("/community/members")`.

---

## What doesn't change
- The login flow (`LoginPage` → `CommunityDashboard`) stays entirely state-based — no URL involvement
- All the UI, data, and visual code is untouched
- `App.tsx` routes unchanged
- Placeholder files in `Members.tsx`, forum files etc. — left as-is (unused, harmless)
