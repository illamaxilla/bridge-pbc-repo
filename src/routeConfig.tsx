// ============================================================================
// BRIDGE PBC — Route Configuration
// Centralized route definitions to eliminate repetitive <Route> JSX.
// ============================================================================

import { lazy } from "react";

// ---------------------------------------------------------------------------
// Lazy-loaded page components
// ---------------------------------------------------------------------------

// Public pages
export const Index = lazy(() => import("./pages/Index"));
export const About = lazy(() => import("./pages/About"));
export const Services = lazy(() => import("./pages/Services"));
export const Resources = lazy(() => import("./pages/Resources"));
export const Insights = lazy(() => import("./pages/Insights"));
export const Methodology = lazy(() => import("./pages/Methodology"));
export const Contact = lazy(() => import("./pages/Contact"));
export const Login = lazy(() => import("./pages/Login"));
export const Sectors = lazy(() => import("./pages/Sectors"));
export const Policy = lazy(() => import("./pages/Policy"));
export const FAQPage = lazy(() => import("./pages/BRIDGE_FAQ_Page"));
export const MembershipPage = lazy(() => import("./pages/BRIDGE_MembershipPage"));
export const SearchPage = lazy(() => import("./pages/Search"));

// Intelligence (protected)
export const Intelligence = lazy(() => import("./pages/intelligence/Intelligence"));
export const IntelDashboard = lazy(() => import("./pages/intelligence/Dashboard"));
export const MarketOverview = lazy(() => import("./pages/intelligence/MarketOverview"));
export const Reports = lazy(() => import("./pages/intelligence/Reports"));
export const Watchlist = lazy(() => import("./pages/intelligence/Watchlist"));
export const Analytics = lazy(() => import("./pages/intelligence/Analytics"));
export const IntelResources = lazy(() => import("./pages/intelligence/Resources"));

// Community
export const Community = lazy(() => import("./pages/community/Community"));
export const CommunityHome = lazy(() => import("./pages/community/index"));

// Reports
export const SectorReport = lazy(() => import("./pages/reports/SectorReport"));

// Resource teasers / viewers
export const PolicyBriefTeaser = lazy(() => import("./pages/resources/PolicyBriefTeaser"));
export const AnnualReviewTeaser = lazy(() => import("./pages/resources/AnnualReviewTeaser"));
export const SectorBriefViewer = lazy(() => import("./pages/resources/SectorBriefViewer"));

// ---------------------------------------------------------------------------
// Sector page lazy imports (12 sectors)
// ---------------------------------------------------------------------------

export const SECTOR_PAGES: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  energy: lazy(() => import("./pages/sectors/Energy")),
  technology: lazy(() => import("./pages/sectors/Technology")),
  sports: lazy(() => import("./pages/sectors/Sports")),
  transport: lazy(() => import("./pages/sectors/Transport")),
  manufacturing: lazy(() => import("./pages/sectors/Manufacturing")),
  housing: lazy(() => import("./pages/sectors/Housing")),
  financial: lazy(() => import("./pages/sectors/Financial")),
  health: lazy(() => import("./pages/sectors/Health")),
  infrastructure: lazy(() => import("./pages/sectors/Infrastructure")),
  tourism: lazy(() => import("./pages/sectors/Tourism")),
  education: lazy(() => import("./pages/sectors/Education")),
  agriculture: lazy(() => import("./pages/sectors/Agriculture")),
};

// ---------------------------------------------------------------------------
// BRIDGE document routes (wrapped in SectorIntelligenceWrapper)
// ---------------------------------------------------------------------------

export interface BridgeDocRoute {
  path: string;
  title: string;
  component: React.LazyExoticComponent<React.ComponentType>;
  auth: "public" | "protected" | "paid";
  freePreviewPath?: string;
}

export const BRIDGE_DOC_ROUTES: BridgeDocRoute[] = [
  {
    path: "/resources/budget-alignment",
    title: "2026 Budget Alignment",
    component: lazy(() => import("./pages/BRIDGE_BudgetAlignment_2026")),
    auth: "public",
    freePreviewPath: "/resources/policy-brief",
  },
  {
    path: "/resources/ghana-intelligence",
    title: "Ghana Intelligence Q1 2026",
    component: lazy(() => import("./pages/BRIDGE_GhanaIntelligence_Q1_2026")),
    auth: "public",
    freePreviewPath: "/resources/annual-review",
  },
  {
    path: "/resources/sector-briefs",
    title: "Sector Intelligence Briefs",
    component: lazy(() => import("./pages/BRIDGE_AllSectors_Free")),
    auth: "public",
  },
  {
    path: "/resources/sector-briefs-full",
    title: "Sector Intelligence Briefs — Full",
    component: lazy(() => import("./pages/BRIDGE_AllSectors_Paid_version")),
    auth: "paid",
  },
  {
    path: "/resources/white-paper",
    title: "BRIDGE Foundational White Paper",
    component: lazy(() => import("./pages/BRIDGE_ResearchBrief_WhitePaper_Public")),
    auth: "public",
  },
  {
    path: "/resources/annual-review-2025",
    title: "BRIDGE 2025 Annual Review",
    component: lazy(() => import("./pages/BRIDGE_AnnualReview_2025_Public")),
    auth: "public",
  },
  {
    path: "/resources/policy-tracker",
    title: "Ghana Policy Tracker 2025–2026",
    component: lazy(() => import("./pages/BRIDGE_PolicyTracker_2025_2026")),
    auth: "public",
  },
  {
    path: "/resources/monthly-dashboard",
    title: "Monthly Dashboard — March 2026",
    component: lazy(() => import("./pages/BRIDGE_MonthlyDashboard_Mar2026")),
    auth: "public",
  },
  {
    path: "/resources/document-library",
    title: "Member Document Dashboard",
    component: lazy(() => import("./pages/BRIDGE_PAID_Document_Library")),
    auth: "paid",
  },
  {
    path: "/resources/impact-score",
    title: "BRIDGE Impact Score™ Methodology",
    component: lazy(() => import("./pages/BRIDGE_ImpactScore")),
    auth: "paid",
  },
  {
    path: "/resources/peace-prosperity",
    title: "Peace & Prosperity Framework",
    component: lazy(() => import("./pages/BRIDGE_PeaceProsperity")),
    auth: "paid",
  },
  {
    path: "/resources/portfolio",
    title: "BRIDGE Venture Portfolio Overview",
    component: lazy(() => import("./pages/BRIDGE_Portfolio")),
    auth: "paid",
  },
];
