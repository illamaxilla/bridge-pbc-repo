# BRIDGE PBC — Comprehensive Codebase Architecture Review

**Reviewed:** 2026-03-15
**Reviewer:** Senior Software Architect (15+ years production experience)
**Repository:** bridge-pbc-repo
**Platform:** Built with Lovable.dev (AI-powered app builder)
**Codebase Size:** ~57,000 lines across 276+ files

---

## 1. ARCHITECTURE OVERVIEW

### Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | 18.3.1 |
| Language | TypeScript + JavaScript (JSX) | 5.8.3 |
| Build Tool | Vite (SWC plugin) | 5.4.19 |
| Routing | React Router DOM | 6.30.1 |
| State (Server) | TanStack React Query | 5.83.0 |
| State (Client) | React Context + useState | — |
| Styling | Tailwind CSS + Inline styles | 3.4.17 |
| UI Primitives | Radix UI (shadcn/ui pattern) | Various |
| Charts | Recharts | 2.15.4 |
| Icons | Lucide React | 0.462.0 |
| Forms | React Hook Form + Zod | 7.61.1 / 3.25.76 |
| Backend | Supabase (Auth + Postgres) | 2.99.0 |
| Hosting | Netlify | — |
| Testing | Vitest + Testing Library | 3.2.4 / 16.0.0 |

### Architecture Pattern

**Component-based SPA** with a **two-tier architecture**:

1. **Modern TypeScript Layer** (~30% of code): App shell, routing, auth, intelligence dashboard, sector page template system — well-structured, typed, uses Tailwind.
2. **Lovable.dev-Generated JSX Layer** (~70% of code, 68,524 lines): Self-contained document-style pages with inline styles, hardcoded data, and single-letter variable names. These are essentially "digital publications" rendered as React components.

### Folder Organization

```
bridge-pbc-repo/
├── public/                    # Static assets
├── src/
│   ├── components/
│   │   ├── ui/                # shadcn/ui primitives (50+ components)
│   │   ├── auth/              # Auth form sub-components
│   │   ├── sectors/           # Shared sector page sections
│   │   ├── intelligence/      # Intelligence dashboard system
│   │   │   ├── analytics/     # Chart/visualization components
│   │   │   ├── dashboard/     # Desktop + Mobile dashboard
│   │   │   ├── reports/       # Report dashboard components
│   │   │   ├── watchlist/     # Watchlist feature
│   │   │   ├── market/        # Market overview components
│   │   │   ├── mobile/        # Mobile-specific intelligence
│   │   │   └── resources/     # Intelligence resources
│   │   ├── icons/             # Custom SVG icon components
│   │   └── *.tsx              # App-level components (Layout, Header, Footer, etc.)
│   ├── context/               # React Context providers (AuthContext)
│   ├── data/
│   │   ├── sectors/           # 12 sector data files + types
│   │   └── sectorIcons.ts     # Sector icon/route mapping
│   ├── hooks/                 # Custom hooks (useCounter, useIsMobile, useScrollLock)
│   ├── integrations/
│   │   └── supabase/          # Supabase client + auto-generated types
│   ├── lib/                   # Utilities (cn(), theme tokens)
│   ├── pages/
│   │   ├── sectors/           # 12 sector page files
│   │   ├── intelligence/      # Intelligence sub-pages
│   │   ├── community/         # Community/forum pages
│   │   ├── resources/         # Resource viewer pages
│   │   ├── reports/           # Report pages
│   │   └── BRIDGE_*.jsx       # 28 Lovable-generated document pages
│   ├── services/              # API service layer (supabase.ts)
│   ├── test/                  # Test setup
│   ├── routeConfig.tsx        # Centralized route definitions
│   ├── App.tsx                # Root component + route tree
│   └── main.tsx               # Entry point
├── supabase/
│   └── migrations/            # 3 SQL migration files
├── .lovable/                  # Lovable.dev config (plan.md)
└── .github/                   # GitHub config
```

### Entry Points & Data Flow

```
index.html → main.tsx → App.tsx
                          ├── QueryClientProvider (TanStack Query)
                          ├── AuthProvider (Supabase Auth context)
                          ├── TooltipProvider (Radix)
                          ├── Sonner (toast notifications)
                          └── BrowserRouter
                               └── Suspense (lazy loading)
                                    └── Routes (all pages)
```

**Routing Structure:**
- `routeConfig.tsx` centralizes all lazy imports and route metadata
- `App.tsx` declares the route tree with `<ErrorBoundary>` wrappers per route
- Config-driven patterns: `SECTOR_PAGES`, `BRIDGE_DOC_ROUTES`, `CANNABIS_LICENCE_ROUTES`
- Three auth levels: public, protected (any authenticated user), paid (paid tier only)

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        BROWSER (SPA)                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────────────┐  │
│  │  main.tsx │→│  App.tsx  │→│  React Router (BrowserRouter) │  │
│  └──────────┘  └──────────┘  └──────────┬───────────────────┘  │
│                                         │                       │
│              ┌──────────────────────────┼──────────────┐        │
│              │                          │              │        │
│     ┌────────▼────────┐    ┌───────────▼──────┐  ┌────▼─────┐  │
│     │  Public Pages   │    │ Protected Routes │  │   Paid   │  │
│     │  (Index, About, │    │ (Intelligence/*) │  │  Routes  │  │
│     │  Sectors, etc.) │    │                  │  │ (Docs,   │  │
│     └────────┬────────┘    └───────┬──────────┘  │ Cannabis)│  │
│              │                     │             └────┬─────┘  │
│              │                     │                  │        │
│     ┌────────▼─────────────────────▼──────────────────▼─────┐  │
│     │              Shared Components                         │  │
│     │  ┌────────┐  ┌──────────┐  ┌───────────────────────┐  │  │
│     │  │ Layout │  │ AuthModal│  │ SectorIntelligence-   │  │  │
│     │  │ Header │  │ Search   │  │ Wrapper               │  │  │
│     │  │ Footer │  │ Modal    │  │                       │  │  │
│     │  └────────┘  └──────────┘  └───────────────────────┘  │  │
│     └────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────┐  ┌─────────────┐  ┌──────────────────┐   │
│  │  AuthContext      │  │  Theme/Utils │  │  Custom Hooks   │   │
│  │  (user, session,  │  │  (colors,    │  │  (useIsMobile,  │   │
│  │   tier, signIn)   │  │   cn())      │  │   useScrollLock)│   │
│  └────────┬─────────┘  └─────────────┘  └──────────────────┘   │
│           │                                                     │
├───────────▼─────────────────────────────────────────────────────┤
│                     SUPABASE BACKEND                            │
│  ┌─────────────┐  ┌──────────────────────────────────────────┐  │
│  │  Auth       │  │  PostgreSQL (RLS)                        │  │
│  │  - signIn   │  │  - subscribers (insert-only)             │  │
│  │  - signOut  │  │  - access_requests (insert-only)         │  │
│  │  - session  │  │  - contact_messages (insert-only)        │  │
│  │  - metadata │  │  - SELECT denied for public role         │  │
│  └─────────────┘  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. CODE QUALITY AUDIT

### Overall Assessment: **B-** (Good foundation, significant technical debt in JSX layer)

### Strengths
- **Zero `any` types** across the entire TypeScript codebase
- **Zero `console.log`** statements in production code (only `console.error` in ErrorBoundary)
- **Zero TODO/FIXME/HACK** comments
- **Clean TypeScript** in the app shell, hooks, context, and sector data layer
- Proper use of `React.memo` on Header and Footer to prevent unnecessary re-renders

### Anti-Patterns & Code Smells

**1. Two Completely Different Styling Systems**
The codebase uses Tailwind CSS in `.tsx` files but 100% inline styles in `.jsx` files. This creates a split personality:
```tsx
// SiteHeader.tsx — Tailwind (good)
<header className="px-[clamp(20px,5vw,80px)] h-[72px] sticky top-0 z-[1000]">
```
```jsx
// BRIDGE_AnnualReview_2025_Public.jsx — Inline styles (problematic)
<div style={{position:'sticky',top:0,zIndex:100,background:C.paper,
  borderBottom:`1px solid ${C.border}`,padding:'10px 56px'}}>
```

**2. Cryptic Single-Letter Variable Names in JSX Pages**
Every JSX page uses this pattern:
```jsx
const C = { ink:'#0D1A10', paper:'#FAF8F3', forest:'#1B4D3E' };  // Colors
const F = { display:'"Playfair Display"', body:'"Source Serif 4"' }; // Fonts
const Gf = () => (<style>{`...`}</style>);  // Global styles
const SH = ({eyebrow,title}) => (...);       // Section Header
const Bp = ({children}) => (...);            // Body paragraph
```
This severely hurts readability. `C`, `F`, `Gf`, `SH`, `Bp` are meaningless without context.

**3. Massive File Sizes**
| File | Lines | Issue |
|------|-------|-------|
| `MobileDashboard.tsx` | ~5,000+ | Single component file |
| `DesktopDashboard.tsx` | ~4,000+ | Single component file |
| `Services.tsx` | 3,219 | Entire page in one file |
| `Contact.tsx` | 2,564 | Entire page in one file |
| `Index.tsx` | 2,527 | Entire page in one file |
| `Cannabis_Intelligence_Dashboard.jsx` | 2,680 | Self-contained document |
| Each Cannabis Licence page | ~1,920 | Near-identical structure |

**4. Duplicated Color/Font Definitions**
The same color palette (`#1B4D3E`, `#B8D935`, `#FAF8F3`, etc.) is redefined in:
- `src/lib/theme.ts` (canonical)
- `src/components/intelligence/constants.ts`
- Every single `.jsx` page (28 times)
- `src/components/SiteFooter.tsx`
- `src/components/SiteHeader.tsx` (as Tailwind arbitrary values)

**5. Duplicated BridgeLogo Component**
The BRIDGE logo SVG exists in at least 4 separate files:
- `src/components/BridgeLogo.tsx`
- `src/components/intelligence/dashboard/BridgeLogo.tsx`
- `src/components/intelligence/reports/BridgeLogo.tsx`
- Inline in every `.jsx` page as a `Logo` component

**6. Mixed .tsx and .jsx Files**
28 page files are `.jsx` (no TypeScript) while the rest of the app is `.tsx`. The JSX files have zero type safety, no prop validation, and no IDE auto-completion.

### Naming Conventions
- **Components**: PascalCase — consistent ✓
- **Files**: PascalCase for components, camelCase for utilities — consistent ✓
- **BRIDGE pages**: `BRIDGE_FeatureName_Detail.jsx` — unique naming scheme from Lovable.dev
- **Hooks**: `use` prefix — consistent ✓
- **Types**: Properly defined interfaces — consistent ✓

### Dead Code
- `src/pages/BRIDGE_Membership_v4.jsx` exists alongside `BRIDGE_MembershipPage.jsx` — unclear which is canonical
- `navHref` function in `Index.tsx` (line ~752) is dead code per `.lovable/plan.md`
- 50+ unused shadcn/ui components in `src/components/ui/` (calendar, carousel, menubar, etc. that aren't imported anywhere)

---

## 3. COMPONENT & MODULE ANALYSIS

### Major Components by Responsibility

| Component | Lines | Responsibility | SRP Violation? |
|-----------|-------|---------------|----------------|
| `DesktopDashboard.tsx` | ~4,000+ | Entire desktop intelligence dashboard | 🔴 Yes — data, state, UI, charts all in one file |
| `MobileDashboard.tsx` | ~5,000+ | Entire mobile intelligence dashboard | 🔴 Yes — same issue |
| `SiteHeader.tsx` | 194 | Navigation + search trigger + menu overlay | 🟡 Mild — overlay could be extracted |
| `SiteFooter.tsx` | 377 | Footer + subscribe form + sector grid | 🟡 Mild — subscribe could be extracted |
| `SectorPageTemplate.tsx` | 205 | Composable sector page layout | ✅ Good — well-designed template |
| `AuthContext.tsx` | 75 | Auth state + tier resolution | ✅ Good |
| `ErrorBoundary.tsx` | 79 | Error catching + recovery UI | ✅ Good |
| `Watchlist/Tabs.tsx` | 784 | 6 different tab panels in one file | 🟠 Yes — each tab should be its own component |
| Each BRIDGE_*.jsx page | 1,000–2,680 | Entire document with all sub-components | 🟠 By design — these are "documents" not "apps" |

### Tightly Coupled Components
1. **Intelligence Dashboard ↔ constants.ts**: The dashboard components are tightly coupled to the hardcoded sector data in `constants.ts` and `sectorData.ts`. No API integration exists — it's all static data.
2. **JSX Pages ↔ Inline Styles**: Each page re-implements its own design system instead of importing from `theme.ts`.
3. **SiteFooter ↔ subscribe service**: The footer directly calls the Supabase service, mixing UI and data concerns.

### Component Reusability Assessment
- **High reusability**: `SectorPageTemplate`, `ErrorBoundary`, `Layout`, `ProtectedRoute`, `PaidRoute`, custom hooks
- **Medium reusability**: Intelligence chart components (SparkCard, ActivityHeatmap, BubbleChart) — well-built but coupled to specific data shapes
- **Low reusability**: JSX pages (everything is self-contained and duplicated)

---

## 4. STATE MANAGEMENT REVIEW

### State Architecture

| State Type | Mechanism | Location |
|-----------|-----------|----------|
| Auth (user, session, tier) | React Context | `AuthContext.tsx` |
| Server cache | TanStack React Query | `QueryClientProvider` in `App.tsx` |
| UI state (modals, menus) | `useState` | Per-component |
| Form state | React Hook Form | Auth forms |
| Route state | React Router | URL params |

### Assessment

**Positive:**
- Clean separation: Auth in Context, server data in React Query, UI state local
- No prop drilling detected — auth accessed via `useAuth()` hook
- `QueryClient` created at app root with default config

**Issues:**
- 🟡 **React Query is imported but barely used.** The `QueryClient` is set up in `App.tsx` but I found no `useQuery` or `useMutation` calls in the codebase. All Supabase calls go through raw `async/await` in `src/services/supabase.ts`. This means no automatic caching, no background refetching, no optimistic updates.
- 🟡 **Intelligence dashboard data is entirely hardcoded.** The `sectorData.ts`, `constants.ts`, and `data.ts` files contain all data as static JavaScript objects. There's no server state to manage — but this means the dashboard shows the same data to everyone always.
- 🟢 **No unnecessary re-renders detected.** `React.memo` is correctly applied to `SiteHeader` and `SiteFooter`. The `SparkCard` component is memoized. The `useIsMobile` hook uses `matchMedia` listener (not polling).

---

## 5. PERFORMANCE ANALYSIS

### Positive
- **Code splitting**: All pages are lazy-loaded via `React.lazy()` in `routeConfig.tsx` with `Suspense` fallback ✓
- **Memoization**: Header/Footer use `React.memo`, SparkCard is memoized ✓
- **No polling or intervals**: Data is static, no unnecessary network requests ✓
- **Netlify SPA config**: `netlify.toml` has proper redirect rules ✓

### Issues

**🔴 Bundle Size — JSX Pages Are Enormous**
The 28 `.jsx` pages total 68,524 lines. Each page contains:
- Full inline SVG logos (hundreds of path elements per page)
- Hardcoded data arrays
- Inline `<style>` blocks
- Duplicate sub-components (TopBar, Cover, Footer defined per page)

Even with lazy loading, each Cannabis Licence page is ~1,920 lines of self-contained JSX. The 11 licence pages alone are ~21,000 lines of near-identical code.

**🟠 Missing Image Optimization**
No `<img>` optimization strategy visible. No lazy loading for images, no srcset/sizes, no WebP fallback, no image CDN usage.

**🟠 Intelligence Dashboard Components Are Large**
`DesktopDashboard.tsx` and `MobileDashboard.tsx` are massive single files. Even though they're lazy-loaded, once loaded they're very heavy. They should be split into sub-route chunks.

**🟡 Inline `<style>` Tags in Every JSX Page**
Each page injects a `<style>` tag with CSS animations and responsive rules. With 28 pages, this means the browser processes 28 separate style injections as users navigate. These should be consolidated into `index.css`.

**🟡 No Web Vitals / Performance Monitoring**
No performance monitoring library (web-vitals, Sentry, etc.) is integrated.

---

## 6. SECURITY REVIEW

### Positive Findings

- ✅ **No hardcoded API keys or secrets** anywhere in the codebase
- ✅ **Environment variables** properly used for Supabase URL and anon key via `import.meta.env`
- ✅ **`.env.example`** provided with placeholder values
- ✅ **`.gitignore`** excludes `.env` files
- ✅ **Row Level Security (RLS)** enabled on all Supabase tables
- ✅ **SELECT denied** on sensitive tables (subscribers, contact_messages, access_requests) — insert-only from client
- ✅ **No SQL injection risk** — Supabase client uses parameterized queries
- ✅ **XSS risk is low** — React's JSX auto-escapes by default, no `dangerouslySetInnerHTML` found
- ✅ **Security headers** set in `vite.config.ts`: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`

### Issues

**🟠 Membership Tier Stored in Client-Accessible user_metadata**
```typescript
// AuthContext.tsx line 72
const meta = user.user_metadata?.membership_tier;
if (meta === "paid") return "paid";
```
The "paid" tier is determined from `user_metadata`, which is readable and potentially writable by the client via `supabase.auth.updateUser()`. A user could bypass the paywall by updating their own metadata to `{ membership_tier: "paid" }`.

**Fix:** Use a server-side lookup (e.g., a `profiles` or `subscriptions` table) with RLS that prevents user modification. Or use Supabase `app_metadata` (only writable by service role).

**🟡 No CSRF Protection Visible**
The `subscribe()` and `submitAccessRequest()` functions accept form data and insert directly to Supabase. While Supabase anon key provides some protection, there's no rate limiting or CSRF token validation.

**🟡 No Content Security Policy (CSP)**
The security headers in `vite.config.ts` don't include a Content-Security-Policy header. This should be added, especially since the app injects inline `<style>` tags.

**🟡 Footer Links Use `href="#"`**
Terms, Privacy, and Accessibility links all point to `href="#"`. These are placeholder links that should lead to actual legal pages.

---

## 7. DATABASE & API LAYER

### Database Schema

```
┌─────────────────────┐  ┌─────────────────────┐  ┌──────────────────┐
│    subscribers       │  │   access_requests    │  │ contact_messages │
├─────────────────────┤  ├─────────────────────┤  ├──────────────────┤
│ id (UUID, PK)       │  │ id (UUID, PK)       │  │ id (UUID, PK)    │
│ email (TEXT, UNIQUE) │  │ name (TEXT)          │  │ name (TEXT)      │
│ created_at (TIMESTZ)│  │ email (TEXT)         │  │ email (TEXT)     │
└─────────────────────┘  │ country (TEXT)       │  │ message (TEXT)   │
                         │ organization (TEXT?)  │  │ organization?    │
   RLS: INSERT only      │ role (TEXT?)          │  │ phone?           │
   SELECT denied         │ primary_interest     │  │ created_at       │
                         │ connection (TEXT)     │  └──────────────────┘
                         │ description (TEXT?)   │
                         │ created_at (TIMESTZ) │     RLS: INSERT only
                         └─────────────────────┘     SELECT denied
                            RLS: INSERT only
                            SELECT denied
```

### Assessment

**Positive:**
- RLS is properly configured — tables are insert-only from the client
- Explicit deny policies for SELECT operations
- `subscribers.email` has a UNIQUE constraint
- Service handles duplicate email gracefully (error code `23505`)

**Issues:**

**🟠 No `profiles` or `memberships` Table**
There is no database-backed user profile. Membership tier is stored in Supabase Auth `user_metadata`, which is client-writable (security risk noted above).

**🟠 No `contact_messages` Migration**
The `contact_messages` table is referenced in the deny-select policy migration but has no CREATE TABLE migration. It was likely created via the Supabase dashboard, which means schema isn't fully tracked in version control.

**🟡 No Indexes Beyond Primary Keys**
The `subscribers` table has a unique constraint on `email` (which creates an index), but `access_requests` has no index on `email` — which would be needed for admin lookups.

**🟡 API Layer is Minimal**
Only 3 service functions exist:
1. `subscribe(email)` — insert to subscribers
2. `submitAccessRequest(data)` — insert to access_requests
3. `resetPassword(email)` — Supabase auth password reset

There's no read layer, no admin API, no data fetching for the intelligence dashboard.

---

## 8. DEPENDENCY AUDIT

### Major Dependencies Assessment

| Dependency | Version | Status | Notes |
|-----------|---------|--------|-------|
| react | 18.3.1 | ✅ Current | React 19 available but 18 is stable |
| react-router-dom | 6.30.1 | ✅ Current | |
| @supabase/supabase-js | 2.99.0 | ✅ Current | |
| @tanstack/react-query | 5.83.0 | ⚠️ Unused | Imported but no queries/mutations use it |
| recharts | 2.15.4 | ✅ Current | Good for the chart needs |
| tailwindcss | 3.4.17 | 🟡 v3 | v4 released, but v3 is still supported |
| vite | 5.4.19 | ✅ Current | |
| typescript | 5.8.3 | ✅ Current | |
| zod | 3.25.76 | ✅ Current | |
| lucide-react | 0.462.0 | ✅ Current | |

### Redundancy Issues

**🟡 `sonner` + `@radix-ui/react-toast`**
Both are toast notification libraries. The app uses `sonner` (via `<Sonner />` in App.tsx) but also has `@radix-ui/react-toast` installed as a Radix dependency. Not a major issue since Radix toast may be a transitive dep.

**🟡 50+ Unused shadcn/ui Components**
The `src/components/ui/` directory contains ~50 component files (calendar, carousel, menubar, navigation-menu, etc.). Many of these are never imported by any page or component. They were auto-scaffolded by Lovable.dev.

**🟡 `@tanstack/react-query` — Installed but Not Used**
The QueryClient is set up but no queries or mutations exist. Either integrate it properly or remove it to reduce bundle size.

### Potentially Heavy Dependencies
- `recharts` (~400KB gzipped) — necessary for the intelligence dashboard, but only used on a few pages. Lazy loading mitigates this.
- `react-day-picker` + `date-fns` — used for calendar in engagement modal only.

---

## 9. TESTING COVERAGE

### Existing Tests

17 test files found across:

| Area | Test Files | Coverage |
|------|-----------|----------|
| Components | ErrorBoundary, Layout, PaidRoute, ProtectedRoute, ReportViewer, SiteFooter, SiteHeader | Core UI ✓ |
| Context | AuthContext | Auth flow ✓ |
| Hooks | useCounter, useIsMobile, useScrollLock | All hooks ✓ |
| Data | energy sector, sector index, sectorData validation | Data integrity ✓ |
| Lib | theme, utils | Utilities ✓ |
| Example | example.test.ts | Smoke test ✓ |

### Assessment

**Positive:**
- Auth guards (ProtectedRoute, PaidRoute) are well-tested with multiple scenarios
- Custom hooks have comprehensive tests
- Data validation tests exist for sector data

**Critical Gaps:**
- 🔴 **No tests for any JSX page** (28 pages, 68K+ lines untested)
- 🔴 **No tests for the intelligence dashboard** (the most complex feature)
- 🔴 **No tests for Supabase service functions** (subscribe, submitAccessRequest, resetPassword)
- 🟠 **No integration tests** (user flows like login → redirect → protected page)
- 🟠 **No E2E tests** (no Playwright/Cypress)
- 🟡 **No tests for SearchModal, AuthModal, EngagementModal** (user-facing interactive components)

### Priority Testing Recommendations
1. **Supabase service layer** — test that subscribe handles duplicates, access request validates fields
2. **Auth flow** — integration test: login → tier check → route access
3. **Intelligence dashboard rendering** — smoke tests for Desktop/Mobile dashboard
4. **Sector page template** — verify all 12 sectors render correctly from data

---

## 10. LOVABLE.DEV SPECIFIC PATTERNS

### Identified Lovable.dev Patterns

**1. Self-Contained JSX Document Pages**
Every `BRIDGE_*.jsx` file follows the exact same Lovable-generated pattern:
```jsx
// Design tokens (redefined per file)
const C = { ink:'#0D1A10', paper:'#FAF8F3', forest:'#1B4D3E', ... };
const F = { display:'"Playfair Display"', body:'"Source Serif 4"', ... };

// Global styles injected as <style> tag
const Gf = () => (<style>{`*{box-sizing:border-box;margin:0;...}`}</style>);

// Section Header helper
const SH = ({eyebrow, title, page}) => (...);

// Body paragraph helper
const Bp = ({children}) => (...);

// Inline Logo SVG
const Logo = ({height, variant}) => (<svg>...</svg>);

// Top navigation bar
const TopBar = () => (...);

// Cover/hero section
const Cover = () => (...);

// Main export
export default function PageName() {
  return (
    <div style={{background: C.paper}}>
      <Gf />
      <TopBar />
      <Cover />
      {/* Sections with hardcoded content */}
    </div>
  );
}
```

**2. No Layout Integration in JSX Pages**
The JSX pages don't use the shared `<Layout>` component. They implement their own TopBar and Footer, which means:
- No consistent header/navigation on document pages
- No shared footer with subscribe form
- `SectorIntelligenceWrapper` partially addresses this by wrapping JSX pages with a sticky header/footer bar

**3. Hardcoded Content Everywhere**
All data in JSX pages is hardcoded:
```jsx
const MACRO = [
  {v:'$21B+', l:'Global Hemp Market 2030', s:'CAGR 17.5%'},
  {v:'$160B', l:'Medical Cannabis 2032', s:'CAGR 22–23%'},
];
```
This is fine for static publications but makes updates tedious and error-prone.

**4. shadcn/ui Scaffold**
Lovable.dev scaffolded 50+ shadcn/ui component files in `src/components/ui/`. Most are unused but not harmful — they're tree-shaken during build.

**5. Supabase Integration is Minimal**
Lovable typically generates more Supabase integration (CRUD operations, real-time subscriptions). This project only uses Supabase for 3 insert operations and auth. The intelligence dashboard data is entirely static.

### Areas Needing Human Refinement
1. **All 28 JSX pages** need human review for content accuracy, broken links, and mobile responsiveness
2. **`.lovable/plan.md`** documents known issues (href="#" links, incorrect sector routing) that haven't been fully resolved
3. **Design token duplication** was a Lovable artifact that should be consolidated
4. **Membership tier logic** needs server-side enforcement (Lovable generated client-side only)

---

## 11. SCALABILITY ASSESSMENT

### What Will Break First

**🔴 Adding New JSX Pages**
Currently, adding a new document page means copying ~2,000 lines from an existing page and modifying content inline. This is unsustainable. At 28 pages and 68K lines, one more page adds another 2K lines of duplicated code.

**🔴 Intelligence Dashboard Data**
All dashboard data is hardcoded in TypeScript files. To show real-time data, every chart component would need to be refactored to accept data from API calls instead of static imports.

**🟠 Team Scalability**
Multiple developers editing the same massive files (3,000+ line sector pages, 5,000+ line dashboard files) will create constant merge conflicts.

**🟠 Mobile vs Desktop Duplication**
The intelligence section has separate Desktop and Mobile component trees (`DesktopDashboard.tsx` vs `MobileDashboard.tsx`). Changes must be made twice.

### Scalability Strengths
- ✅ **Sector page template system** is well-designed for adding new sectors
- ✅ **Route config is centralized** — adding new routes is straightforward
- ✅ **Data-driven sectors** (12 data files conforming to `SectorData` interface) scale well
- ✅ **Lazy loading** ensures bundle doesn't grow linearly with pages

### Hardcoded Assumptions
- 12 sectors (hardcoded in multiple places)
- Membership tiers limited to "public", "free", "paid" (enum, not configurable)
- Supabase is the only backend (no abstraction layer)
- Static intelligence data (no API or CMS integration)

---

## 12. DEVELOPER EXPERIENCE

### Onboarding Assessment: **C+**

**README is inadequate.** It's 26 lines with only `npm install`, `npm run dev`, `npm run build`. Missing:
- What the project does / business context
- Architecture overview
- How to add a new page or sector
- Environment setup beyond `.env.example`
- How auth/membership tiers work
- How to deploy

**Environment Setup:**
- `.env.example` exists with 2 variables — clear ✓
- No Docker or devcontainer config
- No documentation on Supabase project setup

**Adding New Features:**
- Adding a new **sector page**: Follow the pattern in `src/pages/sectors/` + `src/data/sectors/` — well-structured ✓
- Adding a new **BRIDGE document page**: Copy a 2,000-line JSX file and modify inline — terrible DX
- Adding a new **intelligence feature**: Navigate a 5,000-line file — difficult

**Tooling:**
- ESLint configured with sensible rules ✓
- Vitest configured with path aliases ✓
- No Prettier config (inconsistent formatting risk)
- No Husky/lint-staged (no pre-commit hooks)
- No CI/CD pipeline visible in `.github/`

---

## DELIVERABLES

### A) Architecture Diagram
(See Section 1 above)

### B) Priority Issues List

#### 🔴 CRITICAL — Fix Immediately
1. **Membership tier bypass vulnerability** — `user_metadata` is client-writable, allowing users to self-upgrade to "paid" tier
2. **Missing `contact_messages` table migration** — schema not fully tracked in version control

#### 🟠 HIGH — Fix Soon
3. **68K lines of duplicated JSX code** — 28 self-contained pages with identical design tokens, logo SVGs, and helper components
4. **React Query installed but unused** — either integrate it or remove it to avoid confusion
5. **Intelligence dashboard data is entirely static** — no API integration means the "intelligence" product has no live data
6. **No tests for critical business paths** — Supabase services, intelligence dashboard, auth flow untested
7. **3 BridgeLogo duplicates** — same SVG in 4 files (plus 28 inline copies in JSX pages)

#### 🟡 MEDIUM — Fix in Next Sprint
8. **Placeholder links** — Terms, Privacy, Accessibility all point to `href="#"`
9. **Single-letter variable names in JSX pages** — `C`, `F`, `Gf`, `SH`, `Bp` hurt readability
10. **No Prettier or pre-commit hooks** — formatting inconsistency risk
11. **50+ unused shadcn/ui components** — tree-shaken but cluttering the codebase
12. **Desktop/Mobile dashboard duplication** — separate 4K+ line files for same feature
13. **Missing CSP header** — security hardening gap
14. **`.lovable/plan.md` documents known bugs** that haven't been fully resolved (href="#" issues, sector routing)
15. **Inline `<style>` tags in every JSX page** — should be consolidated into CSS

#### 🟢 LOW — Nice to Have
16. **No web vitals / performance monitoring**
17. **No CI/CD pipeline**
18. **README needs expansion**
19. **No Storybook or component documentation**
20. **No error tracking service (Sentry, etc.)**

---

### C) TOP 10 SPECIFIC RECOMMENDATIONS

#### 1. Fix Membership Tier Security Bypass
**Problem:** Paid tier is determined from `user_metadata`, which clients can modify.
**Why it matters:** Any logged-in user can access paid content by updating their own metadata.
**Fix:**
```sql
-- Create a server-controlled profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  membership_tier TEXT NOT NULL DEFAULT 'free'
    CHECK (membership_tier IN ('free', 'paid')),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Only service_role can update tier
CREATE POLICY "Deny public updates"
  ON public.profiles FOR UPDATE
  USING (false);
```
```typescript
// AuthContext.tsx — query from profiles table instead
useEffect(() => {
  async function loadTier(userId: string) {
    const { data } = await supabase
      .from('profiles')
      .select('membership_tier')
      .eq('id', userId)
      .single();
    setTier(data?.membership_tier === 'paid' ? 'paid' : 'free');
  }
  if (user) loadTier(user.id);
}, [user]);
```
**Effort:** Small (1-2 hours)

#### 2. Extract Shared Design Tokens from JSX Pages
**Problem:** 28 JSX pages each redefine the same colors, fonts, section headers, and logo.
**Why it matters:** A brand color change requires editing 28+ files manually.
**Fix:**
```typescript
// src/lib/document-tokens.ts (new file)
export const DOC_COLORS = {
  ink: '#0D1A10',
  paper: '#FAF8F3',
  paperDark: '#F0EDE4',
  forest: '#1B4D3E',
  lime: '#B8D935',
  limeDark: '#8FA825',
  muted: '#5C6B5E',
  faint: '#9AAA9C',
  border: '#D8D4C8',
} as const;

export const DOC_FONTS = {
  display: '"Playfair Display","Georgia",serif',
  body: '"Source Serif 4","Georgia",serif',
  sans: '"DM Sans","Helvetica Neue",sans-serif',
  mono: '"DM Mono","Courier New",monospace',
} as const;
```
```typescript
// src/components/document/SectionHeader.tsx (new file)
export function SectionHeader({ eyebrow, title, page, light = false }) { ... }
```
Then each JSX page imports from shared sources instead of redefining.
**Effort:** Medium (2-3 days)

#### 3. Consolidate BridgeLogo into Single Source
**Problem:** The BRIDGE logo SVG exists in 4 separate component files plus 28 inline copies.
**Why it matters:** Logo updates require finding and editing 32+ copies.
**Fix:** Delete the 3 duplicate files and have all components import from `src/components/BridgeLogo.tsx`. For JSX pages, import the shared component:
```tsx
// Delete these files:
// - src/components/intelligence/dashboard/BridgeLogo.tsx
// - src/components/intelligence/reports/BridgeLogo.tsx
// Update imports in intelligence components to use:
import { BridgeLogo, BridgeLogoWhite } from "@/components/BridgeLogo";
```
**Effort:** Small (1-2 hours)

#### 4. Either Use React Query or Remove It
**Problem:** `@tanstack/react-query` is installed and the `QueryClientProvider` wraps the app, but no actual queries or mutations exist.
**Why it matters:** Confuses developers, adds bundle weight, suggests an architecture that isn't implemented.
**Fix (Option A — Integrate):**
```typescript
// src/services/supabase.ts — convert to React Query mutations
import { useMutation } from '@tanstack/react-query';

export function useSubscribe() {
  return useMutation({
    mutationFn: async (email: string) => {
      const { error } = await supabase.from("subscribers").insert({ email });
      if (error && error.code !== "23505") throw new Error(error.message);
    },
  });
}
```
**Fix (Option B — Remove):**
```bash
npm uninstall @tanstack/react-query
# Remove QueryClientProvider from App.tsx
```
**Effort:** Small (2-4 hours)

#### 5. Split Intelligence Dashboard into Sub-Components
**Problem:** `DesktopDashboard.tsx` (~4K lines) and `MobileDashboard.tsx` (~5K lines) are monolithic.
**Why it matters:** Impossible for multiple developers to work on simultaneously. Difficult to debug, test, or modify.
**Fix:** Extract each dashboard section into its own file:
```
src/components/intelligence/dashboard/
├── DesktopDashboard.tsx        # ~200 lines (orchestrator only)
├── sections/
│   ├── KPISection.tsx
│   ├── VenturesSection.tsx
│   ├── SignalsSection.tsx
│   ├── CompaniesSection.tsx
│   └── AnalyticsSection.tsx
├── MobileDashboard.tsx         # ~200 lines (orchestrator only)
└── mobile-sections/
    ├── MobileKPIs.tsx
    ├── MobileVentures.tsx
    └── ...
```
**Effort:** Large (1-2 weeks)

#### 6. Add Service Layer Tests
**Problem:** The 3 Supabase service functions have zero test coverage.
**Why it matters:** These are the only write operations in the app — if they break, no one can subscribe, request access, or reset passwords.
**Fix:**
```typescript
// src/services/__tests__/supabase.test.ts
import { describe, it, expect, vi } from 'vitest';
import { subscribe } from '../supabase';

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn().mockResolvedValue({ error: null }),
    })),
    auth: {
      resetPasswordForEmail: vi.fn().mockResolvedValue({ error: null }),
    },
  },
}));

describe('subscribe', () => {
  it('inserts email to subscribers table', async () => {
    await expect(subscribe('test@example.com')).resolves.not.toThrow();
  });

  it('silently succeeds on duplicate email (23505)', async () => {
    // Mock duplicate key error
    vi.mocked(supabase.from).mockReturnValue({
      insert: vi.fn().mockResolvedValue({
        error: { code: '23505', message: 'duplicate' },
      }),
    } as any);
    await expect(subscribe('test@example.com')).resolves.not.toThrow();
  });
});
```
**Effort:** Small (half day)

#### 7. Convert JSX Pages to TypeScript
**Problem:** 28 pages are `.jsx` with zero type safety.
**Why it matters:** No compile-time error checking, no IDE autocomplete, inconsistent with the rest of the codebase.
**Fix:** Rename `.jsx` → `.tsx` and add minimal typing:
```bash
# Rename files
for f in src/pages/BRIDGE_*.jsx; do mv "$f" "${f%.jsx}.tsx"; done
for f in src/components/EngagementModal.jsx src/components/MembershipModals.jsx; do
  mv "$f" "${f%.jsx}.tsx"
done
# Update imports in routeConfig.tsx if needed (shouldn't be necessary with Vite)
```
Then add type annotations for component props incrementally.
**Effort:** Medium (1-2 days for rename, ongoing for full typing)

#### 8. Add Pre-Commit Hooks and Prettier
**Problem:** No automated code formatting or linting on commit.
**Why it matters:** As team size grows, code style will diverge. Bad code gets committed.
**Fix:**
```bash
npm install -D prettier husky lint-staged
npx husky init
```
```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": ["prettier --write", "eslint --fix"],
    "*.{json,md,css}": ["prettier --write"]
  }
}
```
**Effort:** Small (1-2 hours)

#### 9. Create a Document Page Template Component
**Problem:** Each BRIDGE document page re-implements TopBar, Cover, Footer, and section layout.
**Why it matters:** 68K lines of duplicated code. Bug fixes need to be applied 28 times.
**Fix:**
```tsx
// src/components/document/DocumentPageTemplate.tsx
interface DocumentPageProps {
  title: string;
  subtitle?: string;
  eyebrow: string;
  badge?: string;
  coverContent: React.ReactNode;
  children: React.ReactNode;
}

export function DocumentPage({ title, subtitle, eyebrow, badge, coverContent, children }: DocumentPageProps) {
  return (
    <div style={{ background: DOC_COLORS.paper }}>
      <DocumentGlobalStyles />
      <DocumentTopBar title={eyebrow} badge={badge} />
      <DocumentCover title={title} subtitle={subtitle}>
        {coverContent}
      </DocumentCover>
      <main>{children}</main>
      <DocumentFooter />
    </div>
  );
}
```
This would reduce each page from ~2,000 lines to ~200-500 lines of unique content.
**Effort:** Large (1-2 weeks for template + migration of 28 pages)

#### 10. Add Missing Legal Pages
**Problem:** Terms, Privacy, and Accessibility links all point to `href="#"`.
**Why it matters:** Legal compliance requirement. Users expect functional legal links.
**Fix:** Create actual pages and update the footer:
```tsx
// src/pages/Terms.tsx, Privacy.tsx, Accessibility.tsx
// Add routes to App.tsx
// Update SiteFooter.tsx links
<a href="/terms">Terms</a>
<a href="/privacy">Privacy</a>
<a href="/accessibility">Accessibility</a>
```
**Effort:** Small-Medium (depends on legal content availability)

---

### D) STRENGTHS REPORT

**What Is Actually Well Done (Preserve These):**

1. **Sector Page Template System** — `SectorPageTemplate.tsx` + `SectorData` interface + 12 data files is excellent architecture. Data-driven, typed, composable, and easy to extend. This is the gold standard pattern in this codebase.

2. **Route Configuration** — `routeConfig.tsx` centralizes all lazy imports and route metadata. The config-driven route arrays (`BRIDGE_DOC_ROUTES`, `CANNABIS_LICENCE_ROUTES`, `SECTOR_PAGES`) eliminate repetitive JSX and make route management clean.

3. **Auth Architecture** — Simple, correct, and complete. `AuthContext` → `useAuth()` hook → `ProtectedRoute`/`PaidRoute` guards. Three tiers (public/free/paid) with clean tier resolution. Well-tested.

4. **Security Posture** — RLS on all tables, explicit deny policies, no hardcoded secrets, security headers configured. The Supabase security setup is better than most Lovable.dev projects.

5. **Error Handling** — `ErrorBoundary` on every route, global `unhandledrejection` and `error` listeners in `main.tsx`, graceful duplicate-key handling in subscribe service.

6. **Custom Hooks** — `useIsMobile`, `useScrollLock`, `useCounter` are minimal, focused, well-typed, and well-tested. They follow React best practices.

7. **TypeScript Discipline** — Zero `any` types is remarkable for a project of this size. The `SectorData` type system with its nested interfaces (Solution, Competitor, Policy, etc.) is thorough.

8. **Code Splitting** — Every page is lazy-loaded. The app shell is tiny. Initial load is fast.

9. **Component Memoization** — `SiteHeader` and `SiteFooter` correctly use `React.memo` since they receive no props and would otherwise re-render on every route change.

10. **Intelligence Visualizations** — The custom SVG chart components (ActivityHeatmap, BubbleChart, DotMatrixChart, MapVisualization) are impressive. Hand-crafted, responsive, and performant.

---

### E) REFACTORING ROADMAP

#### Phase 1: Quick Wins (1-2 Days)

| Task | Impact | Effort | Files |
|------|--------|--------|-------|
| Fix membership tier security (use `app_metadata` or profiles table) | 🔴 Critical | 2h | AuthContext.tsx, 1 migration |
| Consolidate BridgeLogo to single source | 🟠 Cleanup | 1h | Delete 3 files, update 5 imports |
| Fix placeholder `href="#"` links in footer | 🟡 UX | 1h | SiteFooter.tsx |
| Remove or integrate React Query | 🟡 Clarity | 2h | App.tsx, package.json |
| Add Prettier + pre-commit hooks | 🟡 DX | 1h | package.json, .prettierrc |
| Add missing `contact_messages` migration | 🟠 Schema | 30m | 1 SQL file |
| Fix known issues from `.lovable/plan.md` | 🟡 Bugs | 2h | Tourism.tsx, Infrastructure.tsx, Education.tsx |

#### Phase 2: Important Refactors (1-2 Weeks)

| Task | Impact | Effort | Files |
|------|--------|--------|-------|
| Extract shared document tokens (colors, fonts, section headers) | 🟠 Maintainability | 2d | New shared files + update 28 JSX pages |
| Convert all `.jsx` to `.tsx` | 🟠 Type safety | 1d | Rename 30 files |
| Create DocumentPageTemplate component | 🟠 DRY | 3d | New template + migrate 28 pages |
| Add service layer tests | 🟠 Reliability | 1d | 3 test files |
| Add integration tests for auth flow | 🟠 Reliability | 1d | 2-3 test files |
| Split intelligence dashboard into sub-components | 🟠 Maintainability | 5d | Refactor 2 large files into ~15 smaller ones |
| Remove unused shadcn/ui components | 🟡 Cleanup | 2h | Delete ~30 files |
| Consolidate inline `<style>` tags into CSS modules or index.css | 🟡 Performance | 1d | 28 JSX pages + index.css |

#### Phase 3: Architectural Improvements (1+ Months)

| Task | Impact | Effort | Files |
|------|--------|--------|-------|
| Build API layer for intelligence dashboard (replace static data) | 🔴 Product | 2-3w | New API service + refactor all chart components |
| Unify Desktop/Mobile dashboard into responsive components | 🟠 Maintainability | 2w | Merge 2 × 5K-line files into responsive components |
| Add CMS integration for document pages (Sanity, Contentful, or Supabase) | 🟠 Scalability | 2-3w | New content layer + template updates |
| Implement proper payment/subscription system (Stripe + Supabase) | 🔴 Business | 2-3w | New Stripe integration + profiles table |
| Add E2E tests with Playwright | 🟡 Quality | 1w | New test suite |
| Set up CI/CD pipeline (GitHub Actions) | 🟡 DX | 1d | `.github/workflows/` |
| Add error tracking (Sentry) and web vitals monitoring | 🟡 Ops | 1d | Sentry SDK integration |
| Add CSP headers and security audit | 🟡 Security | 1d | netlify.toml or vite.config.ts |
| Migrate to React Router v7 (or TanStack Router) for type-safe routing | 🟢 Future-proof | 1w | Route config refactor |
| Explore server-side rendering (Next.js or Remix) for SEO on public pages | 🟢 SEO | 4w+ | Major architecture change |

---

## SUMMARY

This is a **well-scaffolded but bifurcated codebase**. The TypeScript application shell (routing, auth, hooks, sector template system) is genuinely well-built — clean types, good patterns, solid security. The Lovable.dev-generated JSX document pages represent significant technical debt: 68K lines of duplicated, untyped, inline-styled code.

The **highest-priority action** is fixing the membership tier security bypass. The **highest-ROI refactor** is creating a shared DocumentPageTemplate to eliminate the massive JSX duplication. The **strongest asset** is the sector data architecture — it's the pattern the rest of the codebase should aspire to.

For a Lovable.dev-generated project, this is above average. The team has clearly done meaningful work improving the generated output (centralized routing, shared Layout, auth guards, test coverage). The path forward is clear: consolidate the document layer, add a real API, and the architecture becomes genuinely scalable.
