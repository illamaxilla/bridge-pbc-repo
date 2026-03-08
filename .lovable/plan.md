
## What the user changed

The user pasted a freshly updated `src/pages/community/index.tsx` (now 5,010 lines). Key changes vs the previous version:

1. **New `useWindowWidth()` hook** — replaces the old `useIsMobile` with a continuous width tracker that drives `isMobile` checks throughout all components.
2. **Fully responsive LoginPage** — splits into a compact mobile brand header + form on mobile, full side-by-side panel on desktop.
3. **`CommunityDashboard` is now responsive** — mobile bottom tab bar, slide-down hamburger menu, adaptive header sizes.
4. **`ForumPage` is responsive** — mobile pill-strip horizontal nav replaces the left sidebar, compact header/buttons.
5. **The export is now `export default function App()`** — the root export manages a `screen` state (`"login"` / `"community"`) and renders `<LoginPage>` or `<CommunityDashboard>`. The old code exported `CommunityDashboard` directly wrapped with URL sync logic.

## The problem

The previous round added `useNavigate`, `useLocation`, and URL sync into `index.tsx`. The user's new paste **wiped all of that** — the file no longer imports from `react-router-dom` at all. It also **changed the default export name** from the previous `CommunityHome` (which `App.tsx` imports as `CommunityHome`) to `App`.

This causes two issues:
1. **The named export still works** — `App.tsx` does `import CommunityHome from "./pages/community/index"` and `export default function App()` in the community file means the import still resolves. No build break here.
2. **URL routing is broken again** — navigating directly to `/community/members`, `/community/forum/polls`, etc. won't initialise the correct tab because `useLocation` was removed. The component ignores the URL entirely.
3. **The Login screen always shows first** — because the root export's `screen` state starts at `"login"`, every URL under `/community/*` always shows the login page first. Previous version skipped straight to the dashboard.

## Plan

### Change 1 — Re-add URL sync to `CommunityDashboard` (line 1033)

Add `useNavigate` + `useLocation` imports at the top (line 1), then inside `CommunityDashboard`:

```tsx
const navigate = useNavigate();
const { pathname } = useLocation();

// Derive initial currentPage from URL
const getInitialPage = () => {
  if (pathname.startsWith("/community/forum")) return "forum";
  if (pathname === "/community/members") return "members";
  if (pathname === "/community/resources") return "resources";
  return "home";
};

// Replace: const [currentPage, setCurrentPage] = useState("home");
// With:
const [currentPage, setCurrentPage] = useState(getInitialPage);
```

Update `handleNavChange` to also call `navigate()`:
```tsx
const routeMap = { home: "/community", forum: "/community/forum", members: "/community/members", resources: "/community/resources" };
const handleNavChange = (key) => {
  setCurrentPage(key);
  setMobileMenuOpen(false);
  navigate(routeMap[key] ?? "/community");
};
```

Also update the **desktop nav buttons** (line ~1109) to use `handleNavChange` instead of `setCurrentPage` directly.

### Change 2 — Re-add URL sync to `ForumPage` (line 1675)

Pass `initialForumView` from `CommunityDashboard` into `ForumPage` based on pathname:

```tsx
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
  return map[pathname] ?? "Questions";
};
```

Pass as prop: `<ForumPage initialForumView={getInitialForumView()} ...>`

In `ForumPage`, change:
```tsx
const [forumView, setForumView] = useState("Questions");
// →
const [forumView, setForumView] = useState(initialForumView ?? "Questions");
```

Update forum nav buttons to also call `navigate()` when changing view:
```tsx
const forumRouteMap = {
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

### Change 3 — Fix the root export to bypass login when navigating from the site

The new `export default function App()` starts at `screen = "login"` every time. The login is internal to the Community — but users navigating from the main site nav shouldn't be forced through a login gate immediately.

Two options:
- **Option A (simplest)**: Keep the login but just rename the export so `App.tsx` can import it correctly — the current export name `App` conflicts conceptually with the main `src/App.tsx` but works because it's a default export. No actual bug here.
- **Option B**: Have the root component check if the URL is `/community` (no sub-path) → show login; if URL is a deep sub-path → also show login (expected gated behavior). This is actually correct behavior for a gated community.

We go with **Option A** — the current behavior (login gate) is intentional. We just need to make sure after login, the URL-derived state kicks in. So after `onLogin`, we also navigate to the correct route.

### Files changed

| File | Change |
|---|---|
| `src/pages/community/index.tsx` | Add `useNavigate`/`useLocation` imports + URL sync in `CommunityDashboard` + `ForumPage` props |
| `src/App.tsx` | No changes needed — routes are already correct |

### What stays untouched
- All responsive/mobile code the user added
- All visual layout, data, and component logic
- The login flow and `screen` state pattern
- `App.tsx` routes
