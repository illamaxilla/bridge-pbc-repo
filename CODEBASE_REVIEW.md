# BRIDGE PBC - Comprehensive Codebase Review

**Reviewer**: Senior Software Architect
**Date**: 2026-03-11
**Repository**: BRIDGE PBC (Ghana Public Benefit Corporation)
**Platform**: Built with Lovable.dev
**Total Application Code**: ~162,000 lines across 103 TypeScript/TSX files

---

## 1. ARCHITECTURE OVERVIEW

### Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | 18.3.1 |
| Language | TypeScript | 5.8.3 |
| Build Tool | Vite | 5.4.19 |
| Styling | Tailwind CSS + Inline Styles | 3.4.17 |
| UI Components | shadcn/ui (Radix primitives) | 45+ components |
| Backend | Supabase | 2.99.0 |
| Server State | TanStack React Query | 5.83.0 |
| Routing | React Router DOM | 6.30.1 |
| Forms | React Hook Form + Zod | 7.61.1 / 3.25.76 |
| Charts | Recharts | 2.15.4 |
| Icons | Lucide React | 0.462.0 |

### Architecture Pattern

**Component-based SPA** with:
- Lazy-loaded route-level code splitting
- Context API for authentication state
- Direct Supabase client calls (no API abstraction layer)
- Inline CSS styling (bypassing Tailwind for most page content)

### Folder Structure

```
src/
├── components/          # 7 shared components + 45 shadcn/ui components
│   └── ui/              # shadcn/ui primitives (largely unused)
├── context/             # AuthContext only
├── hooks/               # 2 hooks (use-mobile, use-toast)
├── integrations/        # Supabase client + auto-generated types
├── lib/                 # theme.ts (design tokens) + utils.ts (cn helper)
├── pages/               # ALL page components (35 files, ~160K lines)
│   ├── sectors/         # 12 sector detail pages (6,000-7,500 lines each)
│   ├── intelligence/    # Protected dashboard pages (5,000-11,000 lines each)
│   ├── community/       # Community hub + forum pages
│   └── reports/         # Dynamic sector reports
└── test/                # 1 placeholder test file
```

### Data Flow

```
User Request → BrowserRouter → Lazy Page Component
                                    ↓
                              Local useState (UI state)
                              useAuth() (auth context)
                              supabase.from() (direct DB calls)
                                    ↓
                              Inline-styled JSX render
```

---

## A) ARCHITECTURE DIAGRAM

```
┌─────────────────────────────────────────────────────────────────────┐
│                          BROWSER                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────────────────────────────────────────────┐       │
│  │                    App.tsx (Root)                          │       │
│  │  ┌─────────────┐  ┌──────────────┐  ┌────────────────┐  │       │
│  │  │ QueryClient  │  │ AuthProvider  │  │ TooltipProvider│  │       │
│  │  │ Provider     │  │ (Context)     │  │ + Sonner       │  │       │
│  │  └─────────────┘  └──────┬───────┘  └────────────────┘  │       │
│  └───────────────────────────┼──────────────────────────────┘       │
│                              │                                       │
│  ┌───────────────────────────▼──────────────────────────────┐       │
│  │              BrowserRouter + Suspense                      │       │
│  │                                                            │       │
│  │  PUBLIC ROUTES              PROTECTED ROUTES               │       │
│  │  ┌─────────────────┐       ┌──────────────────────┐       │       │
│  │  │ / (Index)        │       │ /intelligence/*       │       │       │
│  │  │ /about           │       │  ┌─ProtectedRoute──┐ │       │       │
│  │  │ /services        │       │  │ /dashboard       │ │       │       │
│  │  │ /resources       │       │  │ /market          │ │       │       │
│  │  │ /insights        │       │  │ /reports         │ │       │       │
│  │  │ /methodology     │       │  │ /watchlist       │ │       │       │
│  │  │ /contact         │       │  │ /analytics       │ │       │       │
│  │  │ /sectors/*  (12) │       │  │ /resources       │ │       │       │
│  │  │ /community/*     │       │  └──────────────────┘ │       │       │
│  │  │ /reports/:slug   │       └──────────────────────┘       │       │
│  │  │ /login           │                                      │       │
│  │  │ /policy          │                                      │       │
│  │  └─────────────────┘                                      │       │
│  └────────────────────────────────────────────────────────────┘       │
│                                                                      │
│  ┌──────────────────────────┐    ┌──────────────────────────┐       │
│  │    SHARED COMPONENTS      │    │      DESIGN SYSTEM        │       │
│  │  SiteHeader / Minimal     │    │  lib/theme.ts (tokens)    │       │
│  │  SiteFooter               │    │  index.css (CSS vars)     │       │
│  │  Layout (wrapper)         │    │  Tailwind config           │       │
│  │  AuthModal                │    │  shadcn/ui (45 components)│       │
│  │  ProtectedRoute           │    └──────────────────────────┘       │
│  └──────────────────────────┘                                        │
│                                                                      │
├─────────────────────────────────────────────────────────────────────┤
│                         SUPABASE                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐       │
│  │ Auth Service   │  │ subscribers   │  │ access_requests     │       │
│  │ (email/pass)   │  │ table         │  │ table               │       │
│  └──────────────┘  └──────────────┘  │ contact_messages      │       │
│                                       └──────────────────────┘       │
│  RLS: Public INSERT only on subscribers + access_requests            │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. CODE QUALITY AUDIT

### Overall Assessment: Needs Significant Refactoring

**Line Count Distribution (a red flag):**

| File | Lines | Concern |
|------|-------|---------|
| `intelligence/Analytics.tsx` | 11,256 | Extreme |
| `sectors/Tourism.tsx` | 7,547 | Extreme |
| `sectors/Agriculture.tsx` | 7,519 | Extreme |
| `sectors/Sports.tsx` | 7,319 | Extreme |
| `intelligence/MarketOverview.tsx` | 7,137 | Extreme |
| `sectors/Financial.tsx` | 7,047 | Extreme |
| `Services.tsx` | 5,053 | High |
| `community/index.tsx` | 5,067 | High |
| `Contact.tsx` | 4,081 | High |
| `Index.tsx` | 4,023 | High |

**Every single page file is a monolith.** The average sector page is ~7,000 lines. These files contain all sections, all inline styles, all data, all icons, and all sub-components within a single file.

### Anti-Patterns Found

1. **Duplicated `useIsMobile()` hook** - Defined 23 times across the codebase (see Section 3)
2. **Inline styles over Tailwind** - Pages use React `style={{}}` objects instead of Tailwind classes despite Tailwind being installed and configured
3. **Copy-paste architecture** - Sector pages are near-identical templates with different data, but each is a standalone 6,000-7,000 line file
4. **SVG logo duplication** - The BRIDGE logo SVG is copy-pasted into SiteHeader, SiteHeaderMinimal, SiteFooter, and AuthModal
5. **Icon duplication** - Custom SVG icon components (arrows, checks, targets) are redefined in every sector page
6. **Navigation data duplication** - Navigation links and sector routes defined in multiple files
7. **Missing TypeScript typing** - The `useCounter` hook and `ProgressRing` component in Index.tsx have no TypeScript types on their parameters

### Naming Conventions

- **Files**: PascalCase for components (consistent)
- **Variables**: camelCase (consistent)
- **Constants**: UPPER_SNAKE_CASE (consistent)
- **CSS**: Inline objects, not className-based (problematic but consistent)

### Dead Code

- `src/App.css` - Legacy styles, mostly unused
- 45 shadcn/ui components installed but the majority are never imported by any page
- `@tanstack/react-query` is installed and the provider is set up, but no `useQuery`/`useMutation` calls exist in the codebase
- `react-hook-form` and `zod` are installed but forms use manual `useState` instead

---

## 3. COMPONENT & MODULE ANALYSIS

### Massive Single Responsibility Violations

Every page component violates SRP by handling:
- Layout and structure
- Data definitions (hardcoded arrays of sector data, statistics, etc.)
- Sub-component definitions (hero sections, cards, grids)
- Mobile responsiveness logic
- Animation logic
- Icon definitions (SVG components)
- Styling (hundreds of inline style objects)

**Example: `src/pages/sectors/Energy.tsx` (5,977 lines)**

This single file contains:
- `useIsMobile()` hook (lines 18-27)
- `IconArrowRight` component (lines 33-46)
- `IconArrowDown` component (lines 48-61)
- `IconCheck` component (lines 63-76)
- `IconTarget` component (lines 78+)
- `sectorData` object with all page content
- `HeroSection` component
- `OpportunitySection` component
- `ValueChainSection` component
- `SolutionsSection` component
- `LandscapeSection` component
- `GovernancePolicySection` component
- `InvestmentSection` component
- `CTASection` component
- `EnergySectorPage` (main export)
- CSS keyframe animations injected via `dangerouslySetInnerHTML`

All 12 sector pages follow this identical pattern with different data.

### Components That Should Be Extracted

1. **`BridgeLogo`** - Currently duplicated 4 times
2. **`SectorPageTemplate`** - Common layout for all 12 sector pages
3. **`HeroSection`** - Repeated in every page with minor variations
4. **`CTASection`** - Nearly identical across all pages
5. **`StatCard`/`MetricCard`** - Repeated pattern in intelligence pages
6. **`SectorIcon`** - 12 sector icons defined in 3-4 different files
7. **Navigation constants** - Should be a shared `constants.ts`

### Tightly Coupled Components

- `SiteHeader.tsx` and `SiteHeaderMinimal.tsx` share 80% of their logic (search, mobile menu, navigation data) but are independent files with no shared code
- Community pages (`Members.tsx`, `CommunityResources.tsx`) take `C` and `font` design token props from their parent, creating tight coupling to the parent's internal implementation

---

## 4. STATE MANAGEMENT REVIEW

### Current Approach

| Type | Mechanism | Assessment |
|------|-----------|------------|
| Auth state | React Context (`AuthContext`) | Good - clean implementation |
| UI state | Local `useState` per component | Acceptable for this app size |
| Server state | Direct Supabase calls | Missing: should use React Query |
| Form state | Manual `useState` | Wasteful - react-hook-form is installed but unused |

### Issues

**React Query installed but completely unused:**
```tsx
// App.tsx - Provider is set up:
const queryClient = new QueryClient();
// ... wrapped in <QueryClientProvider>

// But NO component uses useQuery or useMutation.
// All Supabase calls use raw async/await with local state.
```

**Prop drilling in community section:**
```tsx
// src/pages/community/Members.tsx:3
// Props: C (design tokens) and font (font tokens) are passed from parent
```
Design tokens are passed as props instead of imported from `@/lib/theme`.

**Inconsistent mobile breakpoints:**
```tsx
// src/hooks/use-mobile.tsx - uses 768px (matchMedia)
// src/pages/Index.tsx - uses layout.mobileBreakpoint (768px) via addEventListener
// src/components/AuthModal.tsx - uses 480px (different breakpoint entirely!)
// src/pages/Resources.tsx - uses 900px (yet another breakpoint!)
```

---

## 5. PERFORMANCE ANALYSIS

### Bottlenecks

1. **Bundle Size**: Despite lazy loading, individual page chunks are massive. `Analytics.tsx` alone is 11,256 lines. The 12 sector pages total ~84,000 lines of near-identical code that could be a single parameterized component.

2. **Missing Memoization**: `useCallback` and `useMemo` are used in only 3 files (out of 103). React.memo is used in 0 page components. Given the heavy inline style objects being recreated on every render, this is significant.

3. **Resize Event Listeners**: The duplicated `useIsMobile()` hook adds a `resize` event listener in every page component. A user viewing the site has 2-3 resize listeners active simultaneously (page + header + footer). The shared hook in `src/hooks/use-mobile.tsx` uses `matchMedia` (more efficient) but is only used by `SiteFooter.tsx`.

4. **Inline Style Object Allocation**: Every render creates hundreds of new style objects. Example from a typical page:
   ```tsx
   <div style={{
     maxWidth: CONTENT_MAX_WIDTH,
     margin: "0 auto",
     padding: mobile ? "60px 20px" : "100px 80px",
     // ... 10+ more properties
   }}>
   ```
   This creates a new object on every render. With Tailwind classes, this would be zero-cost.

5. **Google Fonts loaded via `<link>` in JSX**: Every sector page includes a Google Fonts `<link>` tag in its JSX:
   ```tsx
   <link href="https://fonts.googleapis.com/css2?family=DM+Sans:..." rel="stylesheet" />
   ```
   This should be in `index.html` once, not rendered dynamically by each page component.

### What's Done Well

- **Code splitting**: All pages use `React.lazy()` - this is correctly implemented
- **Suspense fallback**: Clean empty div prevents layout shift

---

## 6. SECURITY REVIEW

### Issues Found

#### `.env` file committed to git history
```
$ git log --oneline -- .env
318e957 Show top 6 sectors on mobile
```

The `.env` file containing the Supabase anon key was committed. While `.gitignore` now excludes `.env`, the key is permanently in git history. The exposed key is:
```
VITE_SUPABASE_PUBLISHABLE_KEY="eyJhbGciOiJIUzI1NiIs..."
```

**Mitigation**: This is the Supabase *anon/public* key, which is designed to be exposed in client-side code. It's safe as long as RLS policies are properly configured. However, the project ID and URL are also exposed, giving attackers a target.

#### `dangerouslySetInnerHTML` Usage

Found in `src/pages/sectors/Energy.tsx:5959`:
```tsx
<style dangerouslySetInnerHTML={{
  __html: `@keyframes fadeIn { from { opacity: 0; } ... }`,
}} />
```
**Risk**: Low - the content is hardcoded strings, not user input. But this is still a code smell. CSS keyframes should be in a stylesheet.

Also in `src/components/ui/chart.tsx:70` (shadcn/ui generated - acceptable).

#### No `eval()` or `Function()` usage
Clean.

#### No raw SQL queries
All database interaction goes through Supabase client SDK - safe.

#### RLS Policies
```sql
-- subscribers: Public INSERT only
CREATE POLICY "Anyone can subscribe" ON public.subscribers FOR INSERT WITH CHECK (true);

-- access_requests: Public INSERT only
CREATE POLICY "Anyone can submit access request" ON public.access_requests FOR INSERT WITH CHECK (true);
```
**Concern**: No rate limiting on public insert policies. An attacker could flood the `subscribers` or `access_requests` tables. Consider Supabase Edge Functions with rate limiting.

#### No Input Sanitization
Newsletter email and access request forms validate format client-side but there's no server-side validation beyond Supabase column types.

#### No CORS Configuration
Not explicitly configured - Supabase handles this on its end.

#### No Security Headers
No CSP, HSTS, or X-Frame-Options configuration visible. These should be configured at the hosting layer (Lovable/Vercel/Netlify).

---

## 7. DATABASE & API LAYER

### Schema (3 tables)

```
subscribers
├── id (UUID, PK, auto-gen)
├── email (text, UNIQUE)
└── created_at (timestamptz, default now())

access_requests
├── id (UUID, PK, auto-gen)
├── name (text, NOT NULL)
├── email (text, NOT NULL)
├── country (text, NOT NULL)
├── organization (text, nullable)
├── role (text, nullable)
├── primary_interest (text, NOT NULL)
├── connection (text, NOT NULL)
├── description (text, nullable)
└── created_at (timestamptz, default now())

contact_messages
├── id (UUID, PK, auto-gen)
├── name (text, NOT NULL)
├── email (text, NOT NULL)
├── message (text, NOT NULL)
├── organization (text, nullable)
├── phone (text, nullable)
└── created_at (timestamptz, default now())
```

### Assessment

- Schema is minimal and appropriate for current functionality
- No relationships defined (no foreign keys) - fine for form submissions
- No indexes beyond primary keys - will need attention at scale
- Missing: `contact_messages` has no RLS policy visible in migrations (potential security gap)
- Auto-generated TypeScript types are properly typed via `types.ts`

### API Call Patterns

```tsx
// SiteFooter.tsx - Newsletter subscription
const { error } = await supabase.from("subscribers").insert({ email: trimmed });
if (error) {
  if (error.code === "23505") {
    // Duplicate email - show success anyway (good UX pattern)
  }
}

// AuthModal.tsx - Access request
await supabase.from("access_requests").insert({ name, email, country, ... });
```

**Missing**: No loading states on some forms, inconsistent error handling patterns, no retry logic.

---

## 8. DEPENDENCY AUDIT

### Installed but Unused Dependencies

| Package | Size | Status |
|---------|------|--------|
| `@tanstack/react-query` | ~40KB | Provider set up, zero queries used |
| `react-hook-form` | ~25KB | Installed, all forms use useState |
| `@hookform/resolvers` | ~5KB | Companion to react-hook-form, unused |
| `zod` | ~50KB | Installed, no schemas defined in app code |
| `next-themes` | ~3KB | Installed, no theme toggle UI exists |
| `date-fns` | ~30KB (tree-shakeable) | No date formatting found in app code |
| `embla-carousel-react` | ~15KB | Carousel component installed but not used in pages |
| `vaul` | ~10KB | Drawer component installed but not used |
| ~30 of 45 shadcn/ui components | ~100KB+ | Installed but never imported |

**Estimated wasted bundle**: ~150-200KB of unused JavaScript (before tree-shaking).

### Redundant Dependencies

- **Both `sonner` and `@/components/ui/toast`**: Two toast systems. `sonner` is mounted in App.tsx; the shadcn toast hook also exists. Pick one.
- **Both `bun.lock` and `package-lock.json`**: Two package managers' lock files present

### Dependencies That Are Fine

- Supabase, React Router, Recharts, Lucide, Tailwind, Radix UI - all appropriate choices
- Vite + SWC - excellent build performance

---

## 9. TESTING COVERAGE

### Current State: Effectively Zero

```typescript
// src/test/example.test.ts - THE ONLY TEST FILE
describe("example", () => {
  it("should pass", () => {
    expect(true).toBe(true);
  });
});
```

This is a Lovable.dev scaffold placeholder. There are zero meaningful tests.

### Testing Infrastructure

Vitest is properly configured with:
- JSDOM environment
- React Testing Library
- Setup file (`src/test/setup.ts`)
- File patterns for `.test.ts` and `.spec.ts`

The infrastructure is ready; tests just haven't been written.

### Critical Paths That Need Tests First

1. **AuthContext** - Sign in, sign out, session persistence, auth state changes
2. **ProtectedRoute** - Redirect behavior, loading state, authenticated rendering
3. **Newsletter subscription** (SiteFooter) - Submit, duplicate handling, error states
4. **Access request form** (AuthModal) - Multi-step validation, submission, error handling
5. **Contact form** (Contact.tsx) - Validation, submission flow

---

## 10. LOVABLE.DEV SPECIFIC PATTERNS

### Identified AI-Generated Patterns

1. **Monolithic page components**: Lovable generates entire pages as single files. It doesn't naturally decompose into reusable components. This is the #1 issue - every page is a self-contained 4,000-11,000 line file.

2. **Inline style objects everywhere**: Lovable favors `style={{}}` over Tailwind classes, despite Tailwind being in the project. This creates:
   - Enormous file sizes
   - No style reuse
   - New objects on every render
   - Inability to use responsive utilities

3. **Duplicated hooks per file**: Lovable doesn't know that `useIsMobile` already exists in `src/hooks/`. It generates a local copy in every page.

4. **Copy-paste sector pages**: Each sector page was likely generated independently by Lovable, resulting in 12 near-identical files instead of one parameterized template.

5. **Over-provisioned shadcn/ui**: Lovable installs the full shadcn/ui component library upfront but then generates custom inline implementations instead of using them.

6. **Google Fonts in JSX**: Lovable adds `<link>` tags for fonts inside React components instead of in `index.html`.

7. **CSS keyframes via dangerouslySetInnerHTML**: Instead of defining animations in CSS, Lovable injects them via `<style dangerouslySetInnerHTML>`.

### Supabase Integration (Lovable Pattern)

- Auto-generated `client.ts` and `types.ts` in `src/integrations/supabase/` - this is standard Lovable scaffolding
- Direct client-side Supabase calls without an abstraction layer
- RLS policies with permissive INSERT for public-facing forms

### What Needs Human Refinement

- **Every page file** needs decomposition into reusable components
- **Styling approach** needs migration from inline to Tailwind
- **Data** needs extraction from components into data files
- **Shared logic** needs consolidation (hooks, icons, navigation)

---

## 11. SCALABILITY ASSESSMENT

### What Will Break First

1. **Developer productivity** (already broken): No developer can efficiently work on a 7,000+ line file. Finding and modifying a specific section requires scrolling through thousands of lines of inline styles.

2. **Build times**: As more pages are added at this size, Vite's HMR will slow significantly. Each page change recompiles 5,000-11,000 lines.

3. **Bundle size**: Adding more sectors or intelligence pages at current sizes will push total bundle past reasonable limits, even with code splitting.

4. **Team collaboration**: Two developers cannot work on the same sector page without constant merge conflicts, because everything is in one file.

### Hardcoded Limits

- 12 sectors are hardcoded in navigation, footer, routes, and data - adding a 13th requires changes in 5+ files
- Community features (forum, members, resources) are UI-only with no backend - scaling to real community features requires significant backend work
- Intelligence dashboard data is all mocked/hardcoded - needs real data integration

### Can This Scale?

**No, not in its current form.** The architecture is appropriate for a marketing website proof-of-concept but needs significant refactoring before:
- Adding more features
- Onboarding additional developers
- Handling real-time data
- Supporting dynamic content

---

## 12. DEVELOPER EXPERIENCE

### Onboarding Assessment: Poor

- **README**: Generic Lovable template with no project-specific setup instructions
- **No contributing guide**: No code style guide, no component patterns documented
- **No Storybook**: 45 UI components with no visual documentation
- **No architecture docs**: Data flow, state management, and styling approach are undocumented
- **Environment setup**: `.env.example` exists (good), but no instructions for Supabase setup
- **Inconsistent patterns**: New developers won't know whether to use Tailwind or inline styles, shadcn or custom components, react-hook-form or useState

### Adding New Features

Adding a new sector page currently requires:
1. Copy-pasting an existing 7,000 line file
2. Modifying all hardcoded data within it
3. Adding a route in App.tsx
4. Adding navigation entries in SiteHeader.tsx AND SiteHeaderMinimal.tsx
5. Adding footer entry in SiteFooter.tsx
6. Adding it to the Sectors.tsx overview page

This should be: "Add a data file and register the route."

---

## B) PRIORITY ISSUES LIST

### CRITICAL - Fix Immediately

1. **`.env` with Supabase keys committed to git history** - Even though it's the anon key, rotate it and ensure `.env` is never committed again
2. **No RLS policy found for `contact_messages` table** - Verify this table has proper RLS in Supabase dashboard
3. **Zero test coverage** - Any change risks breaking existing functionality with no safety net

### HIGH - Fix Soon

4. **162K lines of monolithic page components** - Unmaintainable; blocks team scaling
5. **`useIsMobile()` duplicated 23 times** - Maintenance nightmare; inconsistent breakpoints (768px vs 480px vs 900px)
6. **~150KB of unused dependencies** in bundle (React Query, react-hook-form, zod, date-fns, next-themes, etc.)
7. **Inline styles instead of Tailwind** - Prevents responsive design utilities, inflates file sizes
8. **No rate limiting on public Supabase INSERT operations** - Vulnerable to spam/abuse
9. **12 sector pages with 84K lines of duplicated code** - Should be 1 template + 12 data files

### MEDIUM - Fix in Next Sprint

10. **Google Fonts loaded in JSX** instead of `index.html`
11. **BridgeLogo SVG duplicated 4 times** across components
12. **Navigation data duplicated** between SiteHeader and SiteHeaderMinimal
13. **Sector icons defined 3-4 times** across footer, sectors page, services page
14. **Two toast systems installed** (sonner + shadcn toast)
15. **Community section is UI-only** - forum, members, resources have no backend
16. **Intelligence dashboard data is all hardcoded/mocked**
17. **`ProtectedRoute` shows unstyled "Loading..." text**

### LOW - Nice to Have

18. **Add Storybook** for the 45 shadcn/ui components
19. **Add contributing guide and architecture documentation**
20. **Configure security headers** (CSP, HSTS) at hosting layer
21. **Remove `src/App.css`** - unused legacy file
22. **Standardize on one package manager** (bun.lock vs package-lock.json)

---

## C) TOP 10 SPECIFIC RECOMMENDATIONS

### 1. Extract Sector Page Template

**Problem**: 12 sector pages with 84,000 lines of nearly identical code.

**Why it matters**: This is the single biggest maintenance burden. Any design change to sector pages requires editing 12 files.

**Fix**: Create a `SectorPageTemplate` component and 12 data files.

```tsx
// src/components/SectorPageTemplate.tsx
interface SectorData {
  name: string;
  fullName: string;
  heroTitle: string;
  heroSubtitle: string;
  opportunities: Opportunity[];
  valueChain: ValueChainItem[];
  solutions: Solution[];
  // ... all section data
}

export function SectorPageTemplate({ data }: { data: SectorData }) {
  const isMobile = useIsMobile();
  return (
    <>
      <SiteHeader />
      <HeroSection data={data} isMobile={isMobile} />
      <OpportunitySection data={data} isMobile={isMobile} />
      <ValueChainSection data={data} isMobile={isMobile} />
      {/* ... */}
      <SiteFooter />
    </>
  );
}

// src/data/sectors/energy.ts
export const energySectorData: SectorData = {
  name: "Energy",
  fullName: "Energy & Renewable Resources",
  // ... all content
};

// src/pages/sectors/Energy.tsx (reduced to ~5 lines)
import { SectorPageTemplate } from "@/components/SectorPageTemplate";
import { energySectorData } from "@/data/sectors/energy";
export default () => <SectorPageTemplate data={energySectorData} />;
```

**Effort**: Large (1-2 weeks) | **Impact**: Reduces 84K lines to ~5K

---

### 2. Consolidate `useIsMobile` Hook

**Problem**: 23 separate implementations with inconsistent breakpoints.

**Why it matters**: Inconsistent responsive behavior across pages; maintenance burden.

**Fix**: Use the existing shared hook everywhere.

```tsx
// Already exists at src/hooks/use-mobile.tsx - just import it
import { useIsMobile } from "@/hooks/use-mobile";

// Delete ALL local useIsMobile definitions from:
// - All 12 sector pages
// - Index.tsx, About.tsx, Contact.tsx, Services.tsx
// - Insights.tsx, Resources.tsx, Methodology.tsx, Policy.tsx
// - SectorReport.tsx, AuthModal.tsx
// - intelligence/Analytics.tsx, intelligence/Resources.tsx
```

**Effort**: Small (1-2 hours) | **Impact**: Removes 23 duplicated functions, ensures consistent 768px breakpoint

---

### 3. Remove Unused Dependencies

**Problem**: ~150KB of unused JavaScript shipped to users.

**Why it matters**: Slower page loads, especially on mobile networks in Ghana (the target market).

**Fix**:
```bash
npm uninstall next-themes date-fns embla-carousel-react vaul
# OR start using them. If you plan to use React Query, keep it.
# If not, remove it too:
npm uninstall @tanstack/react-query
```

For react-hook-form and zod: either migrate forms to use them (recommended) or remove them.

**Effort**: Small (1 hour) | **Impact**: Meaningful bundle size reduction

---

### 4. Migrate Inline Styles to Tailwind

**Problem**: Pages use `style={{}}` objects creating new allocations on every render and preventing use of Tailwind's responsive utilities.

**Why it matters**: Performance, file size, maintainability, responsive design capabilities.

**Fix** (example from Index.tsx):
```tsx
// BEFORE (current)
<section style={{
  maxWidth: CONTENT_MAX_WIDTH,
  margin: "0 auto",
  padding: mobile ? "60px 20px" : "100px 80px",
  textAlign: "center" as const,
}}>

// AFTER (Tailwind)
<section className="max-w-[1200px] mx-auto px-5 py-15 md:px-20 md:py-25 text-center">
```

**Effort**: Large (2-4 weeks for full migration) | **Impact**: 50-70% reduction in file sizes, better performance

---

### 5. Use React Query for Supabase Calls

**Problem**: Direct Supabase calls with manual loading/error state in each component.

**Why it matters**: No caching, no retry logic, inconsistent error handling, duplicated boilerplate.

**Fix**:
```tsx
// src/hooks/useSubscribe.ts
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useSubscribe() {
  return useMutation({
    mutationFn: async (email: string) => {
      const { error } = await supabase.from("subscribers").insert({ email });
      if (error && error.code !== "23505") throw error;
    },
  });
}

// In SiteFooter.tsx
const { mutate: subscribe, isPending, isSuccess, isError } = useSubscribe();
```

**Effort**: Small (2-3 hours) | **Impact**: Consistent data fetching pattern, caching, error handling

---

### 6. Extract Shared Components (Logo, Icons, Navigation)

**Problem**: BridgeLogo duplicated 4x, sector icons 3-4x, navigation data 2x.

**Why it matters**: Changing the logo or adding a nav item requires editing multiple files.

**Fix**:
```tsx
// src/components/BridgeLogo.tsx
export function BridgeLogo({ height = 36, variant = "dark" }: {...}) {
  const fill = variant === "dark" ? "#1b4d3e" : "#ffffff";
  return <svg height={height} viewBox="0 0 3434.33 932.3">...</svg>;
}

// src/constants/navigation.ts
export const MAIN_NAV = [
  { label: "About", href: "/about" },
  { label: "Sectors", href: "/sectors" },
  // ...
];

export const SECTOR_ROUTES = {
  energy: { path: "/sectors/energy", label: "Energy & Renewable Resources", icon: EnergyIcon },
  // ...
};

// src/components/icons/SectorIcons.tsx
export const SectorIcons = { energy: EnergyIcon, tech: TechIcon, ... };
```

**Effort**: Medium (1-2 days) | **Impact**: Single source of truth for shared assets

---

### 7. Move Google Fonts to index.html

**Problem**: Font `<link>` tags rendered inside React components.

**Why it matters**: Fonts are re-requested on navigation, causing FOUT. Also creates invalid HTML (link tags in body).

**Fix**:
```html
<!-- index.html <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=Poppins:wght@700;800&display=swap" rel="stylesheet">
```

Then remove all `<link>` tags from sector pages and other components.

**Effort**: Small (30 minutes) | **Impact**: Faster font loading, valid HTML

---

### 8. Add Rate Limiting for Public Forms

**Problem**: `subscribers` and `access_requests` tables allow unlimited public INSERTs.

**Why it matters**: An attacker could fill the database with spam entries, potentially incurring Supabase costs.

**Fix**: Create a Supabase Edge Function with rate limiting:
```typescript
// supabase/functions/subscribe/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RATE_LIMIT = new Map<string, number>();

serve(async (req) => {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const lastRequest = RATE_LIMIT.get(ip) || 0;

  if (Date.now() - lastRequest < 60000) {
    return new Response("Rate limited", { status: 429 });
  }

  RATE_LIMIT.set(ip, Date.now());
  // ... insert logic
});
```

**Effort**: Medium (half day) | **Impact**: Prevents spam abuse

---

### 9. Write Tests for Critical Auth Flows

**Problem**: Zero test coverage on authentication, the most critical feature.

**Why it matters**: Auth bugs = users locked out or unauthorized access.

**Fix**:
```tsx
// src/context/__tests__/AuthContext.test.tsx
import { renderHook, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "../AuthContext";

// Mock Supabase
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
      onAuthStateChange: vi.fn().mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } },
      }),
      signInWithPassword: vi.fn(),
      signOut: vi.fn(),
    },
  },
}));

describe("AuthContext", () => {
  it("provides null user when not authenticated", async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    // Wait for loading to complete
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.user).toBeNull();
  });

  it("redirects to login when not authenticated", () => {
    // Test ProtectedRoute behavior
  });
});
```

**Effort**: Medium (1-2 days) | **Impact**: Safety net for the most critical feature

---

### 10. Implement Error Boundaries

**Problem**: No React Error Boundaries anywhere in the app. A rendering error in any component crashes the entire app.

**Why it matters**: Users see a white screen instead of a graceful error message.

**Fix**:
```tsx
// src/components/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from "react";

interface Props { children: ReactNode; fallback?: ReactNode; }
interface State { hasError: boolean; }

export class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h2>Something went wrong</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// In App.tsx, wrap routes:
<ErrorBoundary>
  <Suspense fallback={<PageLoading />}>
    <Routes>...</Routes>
  </Suspense>
</ErrorBoundary>
```

**Effort**: Small (1-2 hours) | **Impact**: Prevents white-screen crashes

---

## D) STRENGTHS REPORT

### What's Actually Well Done

1. **Code splitting**: Every page is lazy-loaded via `React.lazy()`. This is correctly implemented and significantly improves initial load time.

2. **AuthContext implementation** (`src/context/AuthContext.tsx`): Clean, properly typed, handles session initialization and subscription cleanup. This is production-quality code.

3. **Centralized design tokens** (`src/lib/theme.ts`): Having a single source of truth for colors and layout constants is excellent. All components import from here.

4. **Supabase integration**: The auto-generated types ensure type safety for database operations. RLS policies are in place for public-facing tables.

5. **Protected routes**: `ProtectedRoute` is a clean, simple HOC that correctly checks auth state and redirects.

6. **Consistent brand identity**: Despite the technical issues, the visual design is cohesive. The BRIDGE color palette (#1B4D3E primary, #B8D935 accent) is consistently applied.

7. **Comprehensive routing**: The route structure in `App.tsx` is well-organized with clear separation between public, protected, and community routes.

8. **Project configuration**: TypeScript strict mode, proper path aliases, Vite config, ESLint setup - the build tooling is solid.

9. **`.gitignore` includes `.env`**: Environment files are properly excluded (the historical commit was a one-time mistake).

10. **useEffect cleanup patterns**: Components properly clean up event listeners and subscriptions. No memory leak patterns detected.

---

## E) REFACTORING ROADMAP

### Phase 1: Quick Wins (1-2 days)

These changes are low-risk and high-impact:

| Task | Effort | Impact |
|------|--------|--------|
| Consolidate `useIsMobile()` - delete 22 duplicates, import shared hook | 2 hours | High |
| Move Google Fonts `<link>` to `index.html` | 30 min | Medium |
| Remove unused dependencies (next-themes, date-fns, etc.) | 1 hour | Medium |
| Extract `BridgeLogo` into shared component | 1 hour | Medium |
| Delete `src/App.css` | 5 min | Low |
| Remove one of the two toast systems | 1 hour | Low |
| Delete `bun.lock`/`bun.lockb` (standardize on npm) | 5 min | Low |
| Style `ProtectedRoute` loading state | 30 min | Low |
| Add Error Boundary to App.tsx | 1 hour | High |
| Extract navigation constants to `src/constants/` | 2 hours | Medium |

### Phase 2: Important Refactors (1-2 weeks)

These require more careful work but significantly improve the codebase:

| Task | Effort | Impact |
|------|--------|--------|
| Create `SectorPageTemplate` + extract 12 data files | 1 week | Critical |
| Extract shared section components (Hero, CTA, StatCard) | 3 days | High |
| Migrate forms to use react-hook-form + zod (or remove deps) | 2 days | Medium |
| Wrap Supabase calls in React Query hooks | 1 day | Medium |
| Write tests for AuthContext + ProtectedRoute | 1 day | High |
| Extract sector icons into shared component library | 1 day | Medium |
| Consolidate SiteHeader and SiteHeaderMinimal shared logic | 1 day | Medium |
| Add rate limiting via Supabase Edge Functions | 1 day | High |

### Phase 3: Architectural Improvements (1+ months)

These are longer-term investments for a production-ready platform:

| Task | Effort | Impact |
|------|--------|--------|
| Migrate inline styles to Tailwind CSS across all pages | 2-4 weeks | High |
| Build real backend for community features (forum, members) | 2-4 weeks | High |
| Connect intelligence dashboard to real data sources | 2-3 weeks | High |
| Add comprehensive test suite (unit + integration) | 2 weeks | High |
| Set up CI/CD pipeline with automated testing | 1 week | Medium |
| Add Storybook for component documentation | 1 week | Medium |
| Implement proper CMS for dynamic content (sector data, insights) | 2-3 weeks | High |
| Add i18n support (if targeting multilingual users) | 1-2 weeks | Medium |
| Set up monitoring and error tracking (Sentry) | 1 day | High |
| Performance audit with Lighthouse + optimize LCP/CLS | 1 week | Medium |

---

## Summary

This is a **well-designed proof-of-concept** that demonstrates the capabilities and limitations of AI-generated code from Lovable.dev. The visual design is polished, the Supabase integration is solid, and the routing/auth architecture is correct.

However, the codebase has severe maintainability problems caused by Lovable's tendency to generate monolithic, self-contained page files. The 162,000 lines of application code could likely be reduced to ~20,000-30,000 lines through proper componentization and data extraction.

**The most impactful single change**: Creating a `SectorPageTemplate` to replace 12 duplicated sector pages would eliminate ~80,000 lines of code and make the design system trivially changeable.

**Bottom line**: Solid foundation, needs human architecture intervention before scaling.
