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

// Cannabis Intelligence Series
export const CannabisIntelligenceDashboard = lazy(() => import("./pages/BRIDGE_Cannabis_Intelligence_Dashboard"));
export const CannabisIntelligenceSummary = lazy(() => import("./pages/BRIDGE_Cannabis_Intelligence_SeriesSummary"));
export const CannabisLicence01 = lazy(() => import("./pages/BRIDGE_Cannabis_Licence01_Cultivation"));
export const CannabisLicence02 = lazy(() => import("./pages/BRIDGE_Cannabis_Licence02_Processing"));
export const CannabisLicence03 = lazy(() => import("./pages/BRIDGE_Cannabis_Licence03_BreedingSeed"));
export const CannabisLicence04 = lazy(() => import("./pages/BRIDGE_Cannabis_Licence04_RD"));
export const CannabisLicence05 = lazy(() => import("./pages/BRIDGE_Cannabis_Licence05_TestingLab"));
export const CannabisLicence06 = lazy(() => import("./pages/BRIDGE_Cannabis_Licence06_Storage"));
export const CannabisLicence07 = lazy(() => import("./pages/BRIDGE_Cannabis_Licence07_Transportation"));
export const CannabisLicence08 = lazy(() => import("./pages/BRIDGE_Cannabis_Licence08_Import"));
export const CannabisLicence09 = lazy(() => import("./pages/BRIDGE_Cannabis_Licence09_Export"));
export const CannabisLicence10 = lazy(() => import("./pages/BRIDGE_Cannabis_Licence10_Wholesale"));
export const CannabisLicence11 = lazy(() => import("./pages/BRIDGE_Cannabis_Licence11_Dispensing"));

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
  {
    path: "/resources/cannabis-intelligence",
    title: "NCC Cannabis Licensing Intelligence",
    component: lazy(() => import("./pages/BRIDGE_Cannabis_Intelligence_Dashboard")),
    auth: "public",
  },
];

// ---------------------------------------------------------------------------
// Cannabis Licence routes (individual purchasable documents)
// ---------------------------------------------------------------------------

export interface CannabisLicenceRoute {
  num: string;
  slug: string;
  title: string;
  component: React.LazyExoticComponent<React.ComponentType>;
}

export const CANNABIS_LICENCE_ROUTES: CannabisLicenceRoute[] = [
  { num: "01", slug: "cultivation",     title: "Cultivation",                component: lazy(() => import("./pages/BRIDGE_Cannabis_Licence01_Cultivation")) },
  { num: "02", slug: "processing",      title: "Processing",                 component: lazy(() => import("./pages/BRIDGE_Cannabis_Licence02_Processing")) },
  { num: "03", slug: "breeding-seed",   title: "Breeding & Seed Supply",     component: lazy(() => import("./pages/BRIDGE_Cannabis_Licence03_BreedingSeed")) },
  { num: "04", slug: "research",        title: "Research & Development",     component: lazy(() => import("./pages/BRIDGE_Cannabis_Licence04_RD")) },
  { num: "05", slug: "testing-lab",     title: "Testing Laboratory",         component: lazy(() => import("./pages/BRIDGE_Cannabis_Licence05_TestingLab")) },
  { num: "06", slug: "storage",         title: "Storage & Warehousing",      component: lazy(() => import("./pages/BRIDGE_Cannabis_Licence06_Storage")) },
  { num: "07", slug: "transportation",  title: "Transportation",             component: lazy(() => import("./pages/BRIDGE_Cannabis_Licence07_Transportation")) },
  { num: "08", slug: "import",          title: "Import",                     component: lazy(() => import("./pages/BRIDGE_Cannabis_Licence08_Import")) },
  { num: "09", slug: "export",          title: "Export",                     component: lazy(() => import("./pages/BRIDGE_Cannabis_Licence09_Export")) },
  { num: "10", slug: "wholesale",       title: "Wholesale Distribution",     component: lazy(() => import("./pages/BRIDGE_Cannabis_Licence10_Wholesale")) },
  { num: "11", slug: "dispensing",      title: "Dispensing",                 component: lazy(() => import("./pages/BRIDGE_Cannabis_Licence11_Dispensing")) },
];
