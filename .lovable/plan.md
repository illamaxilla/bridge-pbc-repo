
## What to build

A `src/pages/community/` directory mirroring the pattern of `src/pages/intelligence/` — a shell layout file plus a placeholder entry point. The user will paste their full JSX flow into a clearly marked placeholder file.

The community section needs its own route group (`/community/*`) so it can support nested sub-routes when the user pastes their multi-screen flow later (login screen, feed, profile, etc.).

### Structure

```text
src/pages/community/
  Community.tsx       ← Shell layout (header + outlet) — user doesn't touch this
  index.tsx           ← PASTE YOUR JSX HERE placeholder, mounted at /community
```

### Route setup in App.tsx

Add a nested wildcard route identical in pattern to `/intelligence/*`:

```tsx
import Community from "./pages/community/Community";
import CommunityHome from "./pages/community/index";

// inside <Routes>:
<Route path="/community/*" element={<Community />}>
  <Route index element={<CommunityHome />} />
</Route>
```

This means:
- `/community` → renders `CommunityHome` (the placeholder where the user pastes their JSX)
- `/community/login`, `/community/feed`, etc. → ready to be added as child routes later

### Community.tsx (shell)

Minimal wrapper — just an `<Outlet />` with no imposed chrome. The community section has its own login flow and header, so the shell must be empty/transparent. No `SiteHeaderMinimal`, no forced padding. Just:

```tsx
import { Outlet } from "react-router-dom";
export default function Community() {
  return <Outlet />;
}
```

This lets the pasted JSX bring its own full-page layout.

### index.tsx (placeholder)

A clearly-marked placeholder with a large comment block telling the user exactly where to paste:

```tsx
// ============================================================
// BRIDGE COMMUNITY — PASTE YOUR JSX FLOW HERE
// ============================================================
// Replace the entire contents of this file with your .jsx file.
// The component must be the default export.
// Sub-routes (e.g. /community/login) can be added in App.tsx.
// ============================================================

export default function CommunityHome() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", fontFamily: "DM Sans, sans-serif", background: "#1B4D3E", color: "#fff" }}>
      <div style={{ textAlign: "center" }}>
        <p style={{ color: "#B8D935", letterSpacing: "0.15em", fontSize: "13px", marginBottom: "16px" }}>COMING SOON</p>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: "300", margin: 0 }}>BRIDGE Community</h1>
        <p style={{ marginTop: "12px", opacity: 0.5, fontSize: "15px" }}>Paste your JSX flow into src/pages/community/index.tsx</p>
      </div>
    </div>
  );
}
```

### Files to create / edit

| Action | File |
|---|---|
| Create | `src/pages/community/Community.tsx` |
| Create | `src/pages/community/index.tsx` |
| Edit   | `src/App.tsx` — add import + route |
