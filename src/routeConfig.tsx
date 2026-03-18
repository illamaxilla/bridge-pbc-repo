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
export const TermsPage = lazy(() => import("./pages/Terms"));
export const PrivacyPage = lazy(() => import("./pages/Privacy"));
export const AccessibilityPage = lazy(() => import("./pages/Accessibility"));

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

// Founders Portal (hidden — password-gated, not in nav)
export const FoundersPortal = lazy(() => import("./pages/founders/BRIDGE_FoundersPortal_Private"));
export const FoundersAppsWhitepaper = lazy(() => import("./pages/founders/BRIDGE_Apps_Whitepaper"));

// Founders-accessible document routes — fully decoupled copies in src/pages/founders/
export const FOUNDERS_DOC_ROUTES: { path: string; title: string; component: React.LazyExoticComponent<React.ComponentType> }[] = [
  { path: "/founders/white-paper",             title: "BRIDGE White Paper — Full",                component: lazy(() => import("./pages/founders/BRIDGE_WhitePaper_Full_Members")) },
  { path: "/founders/annual-review",           title: "BRIDGE 2025 Annual Review — Full",         component: lazy(() => import("./pages/founders/BRIDGE_AnnualReview_2025_Members")) },
  { path: "/founders/intelligence-whitepaper", title: "Closing the Intelligence Gap",             component: lazy(() => import("./pages/founders/BRIDGE_Intelligence_Whitepaper")) },
  { path: "/founders/portfolio",               title: "BRIDGE Portfolio Data — Full",              component: lazy(() => import("./pages/founders/BRIDGE_OpportunityDB_Members")) },
  { path: "/founders/impact-score",            title: "BRIDGE Impact Score™ — Full",              component: lazy(() => import("./pages/founders/BRIDGE_ImpactScoreDoc_Members")) },
  { path: "/founders/peace-prosperity",        title: "Peace & Prosperity — Full",                component: lazy(() => import("./pages/founders/BRIDGE_PeaceProsperity_Members")) },
  { path: "/founders/budget-alignment",        title: "2026 Budget Alignment — Full",             component: lazy(() => import("./pages/founders/BRIDGE_2026_BudgetAlignment_Members")) },
  { path: "/founders/policy-tracker",          title: "Ghana Policy Tracker — Full",              component: lazy(() => import("./pages/founders/BRIDGE_PolicyTracker_Members")) },
  { path: "/founders/analytics-dashboard",     title: "Monthly Analytics Report",                 component: lazy(() => import("./pages/founders/BRIDGE_MonthlyAnalyticsReport_Members")) },
  { path: "/founders/sector-briefs-full",      title: "Sector Intelligence Briefs — All 12",      component: lazy(() => import("./pages/founders/BRIDGE_AllSectorBriefsFull_PAID")) },
  { path: "/founders/connect-whitepaper",      title: "BRIDGE Connect — Whitepaper",              component: lazy(() => import("./pages/founders/BRIDGE_Connect_Whitepaper")) },
  { path: "/founders/document-library",        title: "Resource Hub — Members Only",              component: lazy(() => import("./pages/founders/BRIDGE_Bridge_ResourceHub_MembersOnly")) },
  // Cannabis — dashboard + all 11 individual licence briefs (founders copies)
  { path: "/founders/cannabis-intelligence",            title: "Cannabis Intelligence Dashboard",       component: lazy(() => import("./pages/founders/BRIDGE_Cannabis_Intelligence_DEMODashboard")) },
  { path: "/founders/cannabis-intelligence/summary",    title: "Cannabis Intelligence Summary",         component: lazy(() => import("./pages/founders/BRIDGE_Cannabis_Intelligence_SeriesSummary")) },
  { path: "/founders/cannabis/cultivation",             title: "Cannabis — Cultivation",                component: lazy(() => import("./pages/founders/BRIDGE_Cannabis_Licence01_Cultivation")) },
  { path: "/founders/cannabis/processing",              title: "Cannabis — Processing",                 component: lazy(() => import("./pages/founders/BRIDGE_Cannabis_Licence02_Processing")) },
  { path: "/founders/cannabis/breeding-seed",           title: "Cannabis — Breeding & Seed",            component: lazy(() => import("./pages/founders/BRIDGE_Cannabis_Licence03_BreedingSeed")) },
  { path: "/founders/cannabis/research",                title: "Cannabis — R&D",                        component: lazy(() => import("./pages/founders/BRIDGE_Cannabis_Licence04_RD")) },
  { path: "/founders/cannabis/testing-lab",             title: "Cannabis — Testing Laboratory",         component: lazy(() => import("./pages/founders/BRIDGE_Cannabis_Licence05_TestingLab")) },
  { path: "/founders/cannabis/storage",                 title: "Cannabis — Storage & Warehousing",      component: lazy(() => import("./pages/founders/BRIDGE_Cannabis_Licence06_Storage")) },
  { path: "/founders/cannabis/transportation",          title: "Cannabis — Transportation",             component: lazy(() => import("./pages/founders/BRIDGE_Cannabis_Licence07_Transportation")) },
  { path: "/founders/cannabis/import",                  title: "Cannabis — Import",                     component: lazy(() => import("./pages/founders/BRIDGE_Cannabis_Licence08_Import")) },
  { path: "/founders/cannabis/export",                  title: "Cannabis — Export",                     component: lazy(() => import("./pages/founders/BRIDGE_Cannabis_Licence09_Export")) },
  { path: "/founders/cannabis/wholesale",               title: "Cannabis — Wholesale Distribution",     component: lazy(() => import("./pages/founders/BRIDGE_Cannabis_Licence10_Wholesale")) },
  { path: "/founders/cannabis/dispensing",              title: "Cannabis — Dispensing",                 component: lazy(() => import("./pages/founders/BRIDGE_Cannabis_Licence11_Dispensing")) },
];

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
    component: lazy(() => import("./pages/resources/BRIDGE_AllSectorBriefsFull_PAID")),
    auth: "paid",
  },
  {
    path: "/resources/white-paper",
    title: "BRIDGE Foundational White Paper",
    component: lazy(() => import("./pages/resources/BRIDGE_WhitePaper_Public")),
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
    title: "Resource Hub — Members Only",
    component: lazy(() => import("./pages/resources/BRIDGE_Bridge_ResourceHub_MembersOnly")),
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
  {
    path: "/resources/portfolio-data",
    title: "BRIDGE Portfolio Data — 174+ Ventures",
    component: lazy(() => import("./pages/resources/BRIDGE_OpportunityDB_Public")),
    auth: "protected",
  },
  {
    path: "/resources/budget-alignment-public",
    title: "2026 Budget Alignment — What It Means for Investors",
    component: lazy(() => import("./pages/resources/BRIDGE_2026_BudgetAlignment_public")),
    auth: "public",
  },
  {
    path: "/resources/annual-review-2025-public",
    title: "BRIDGE 2025 Sector Intelligence Review",
    component: lazy(() => import("./pages/resources/BRIDGE_AnnualReview_2025_Public")),
    auth: "protected",
  },
  {
    path: "/resources/peace-prosperity-public",
    title: "Peace & Prosperity — Public Preview",
    component: lazy(() => import("./pages/resources/PeaceProsperity_public")),
    auth: "protected",
  },
  {
    path: "/resources/impact-score-public",
    title: "BRIDGE Impact Score™ — Public Preview",
    component: lazy(() => import("./pages/resources/BRIDGE_ImpactScoreDoc_Public")),
    auth: "protected",
  },
  {
    path: "/resources/policy-tracker-public",
    title: "Ghana Policy Tracker — Public Preview",
    component: lazy(() => import("./pages/resources/BRIDGE_PolicyTracker_public")),
    auth: "protected",
  },
  {
    path: "/resources/monthly-dashboard-public",
    title: "Monthly Dashboard — March 2026",
    component: lazy(() => import("./pages/resources/MonthlyDashboard_public")),
    auth: "public",
  },
  // ── Members-Only Document Pages ──────────────────────────────────────────
  {
    path: "/resources/members/impact-score",
    title: "BRIDGE Impact Score™ — Full Document",
    component: lazy(() => import("./pages/resources/BRIDGE_ImpactScoreDoc_Members")),
    auth: "paid",
  },
  {
    path: "/resources/members/peace-prosperity",
    title: "Peace & Prosperity — Full Document",
    component: lazy(() => import("./pages/resources/BRIDGE_PeaceProsperity_Members")),
    auth: "paid",
  },
  {
    path: "/resources/members/portfolio",
    title: "BRIDGE Portfolio Data — Full Document",
    component: lazy(() => import("./pages/resources/BRIDGE_OpportunityDB_Members")),
    auth: "paid",
  },
  {
    path: "/resources/members/white-paper",
    title: "BRIDGE White Paper — Full Members Edition",
    component: lazy(() => import("./pages/resources/BRIDGE_WhitePaper_Full_Members")),
    auth: "paid",
  },
  {
    path: "/resources/members/annual-review",
    title: "BRIDGE 2025 Annual Review — Full Document",
    component: lazy(() => import("./pages/resources/BRIDGE_AnnualReview_2025_Members")),
    auth: "paid",
  },
  {
    path: "/resources/members/budget-alignment",
    title: "2026 Budget Alignment — Full Document",
    component: lazy(() => import("./pages/resources/BRIDGE_2026_BudgetAlignment_Members")),
    auth: "paid",
  },
  {
    path: "/resources/members/policy-tracker",
    title: "Ghana Policy Tracker — Full Document",
    component: lazy(() => import("./pages/resources/BRIDGE_PolicyTracker_Members")),
    auth: "paid",
  },
  {
    path: "/resources/members/analytics-dashboard",
    title: "Monthly Analytics Report — Members",
    component: lazy(() => import("./pages/resources/BRIDGE_MonthlyAnalyticsReport_Members")),
    auth: "paid",
  },
  {
    path: "/resources/members/intelligence-whitepaper",
    title: "Closing the Intelligence Gap — Whitepaper",
    component: lazy(() => import("./pages/resources/BRIDGE_Intelligence_Whitepaper")),
    auth: "paid",
  },
  {
    path: "/resources/members/connect-whitepaper",
    title: "BRIDGE Connect — Whitepaper",
    component: lazy(() => import("./pages/resources/BRIDGE_Connect_Whitepaper")),
    auth: "paid",
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
