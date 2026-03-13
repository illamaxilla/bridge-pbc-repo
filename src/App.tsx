import { lazy, Suspense } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ProtectedRoute } from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

// Lazy-loaded pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Resources = lazy(() => import("./pages/Resources"));
const Insights = lazy(() => import("./pages/Insights"));
const Methodology = lazy(() => import("./pages/Methodology"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const Sectors = lazy(() => import("./pages/Sectors"));
const Policy = lazy(() => import("./pages/Policy"));

// Intelligence (protected)
const Intelligence = lazy(() => import("./pages/intelligence/Intelligence"));
const IntelDashboard = lazy(() => import("./pages/intelligence/Dashboard"));
const MarketOverview = lazy(() => import("./pages/intelligence/MarketOverview"));
const Reports = lazy(() => import("./pages/intelligence/Reports"));
const Watchlist = lazy(() => import("./pages/intelligence/Watchlist"));
const Analytics = lazy(() => import("./pages/intelligence/Analytics"));
const IntelResources = lazy(() => import("./pages/intelligence/Resources"));

// Community
const Community = lazy(() => import("./pages/community/Community"));
const CommunityHome = lazy(() => import("./pages/community/index"));

// Reports
const SectorReport = lazy(() => import("./pages/reports/SectorReport"));

// Resource teasers / viewers
const PolicyBriefTeaser = lazy(() => import("./pages/resources/PolicyBriefTeaser"));
const AnnualReviewTeaser = lazy(() => import("./pages/resources/AnnualReviewTeaser"));
const SectorBriefViewer = lazy(() => import("./pages/resources/SectorBriefViewer"));

// BRIDGE document pages
const BudgetAlignment = lazy(() => import("./pages/BRIDGE_BudgetAlignment_2026"));
const GhanaIntelligence = lazy(() => import("./pages/BRIDGE_GhanaIntelligence_Q1_2026"));
const AllSectorsFree = lazy(() => import("./pages/BRIDGE_AllSectors_Free"));
const AllSectorsPaid = lazy(() => import("./pages/BRIDGE_AllSectors_Paid_version"));
const WhitePaper = lazy(() => import("./pages/BRIDGE_ResearchBrief_WhitePaper_Public"));
const AnnualReview2025 = lazy(() => import("./pages/BRIDGE_AnnualReview_2025_Public"));
const PolicyTracker = lazy(() => import("./pages/BRIDGE_PolicyTracker_2025_2026"));
const MonthlyDashboard = lazy(() => import("./pages/BRIDGE_MonthlyDashboard_Mar2026"));
import SectorIntelligenceWrapper from "./components/SectorIntelligenceWrapper";

// New pages: FAQ, Membership, Search
const FAQPage = lazy(() => import("./pages/BRIDGE_FAQ_Page"));
const MembershipPage = lazy(() => import("./pages/BRIDGE_MembershipPage"));
const SearchPage = lazy(() => import("./pages/Search"));

// Paid member document library + paid-only report pages
const PaidDocumentLibrary = lazy(() => import("./pages/BRIDGE_PAID_Document_Library"));
const ImpactScore = lazy(() => import("./pages/BRIDGE_ImpactScore"));
const PeaceProsperity = lazy(() => import("./pages/BRIDGE_PeaceProsperity"));
const Portfolio = lazy(() => import("./pages/BRIDGE_Portfolio"));

// Sectors
const Energy = lazy(() => import("./pages/sectors/Energy"));
const Technology = lazy(() => import("./pages/sectors/Technology"));
const Sports = lazy(() => import("./pages/sectors/Sports"));
const Transport = lazy(() => import("./pages/sectors/Transport"));
const Manufacturing = lazy(() => import("./pages/sectors/Manufacturing"));
const Housing = lazy(() => import("./pages/sectors/Housing"));
const Financial = lazy(() => import("./pages/sectors/Financial"));
const Health = lazy(() => import("./pages/sectors/Health"));
const Infrastructure = lazy(() => import("./pages/sectors/Infrastructure"));
const Tourism = lazy(() => import("./pages/sectors/Tourism"));
const Education = lazy(() => import("./pages/sectors/Education"));
const Agriculture = lazy(() => import("./pages/sectors/Agriculture"));

const queryClient = new QueryClient();

const PageLoading = () => (
  <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        border: "3px solid #e5e7eb",
        borderTopColor: "#1B4D3E",
        animation: "bridge-page-spin 0.8s linear infinite",
      }}
    />
    <style>{`@keyframes bridge-page-spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoading />}>
            <Routes>
              {/* Public pages */}
              <Route path="/" element={<ErrorBoundary><Index /></ErrorBoundary>} />
              <Route path="/about" element={<ErrorBoundary><About /></ErrorBoundary>} />
              <Route path="/services" element={<ErrorBoundary><Services /></ErrorBoundary>} />
              <Route path="/resources" element={<ErrorBoundary><Resources /></ErrorBoundary>} />
              <Route path="/insights" element={<ErrorBoundary><Insights /></ErrorBoundary>} />
              <Route path="/methodology" element={<ErrorBoundary><Methodology /></ErrorBoundary>} />
              <Route path="/contact" element={<ErrorBoundary><Contact /></ErrorBoundary>} />
              <Route path="/login" element={<ErrorBoundary><Login /></ErrorBoundary>} />
              <Route path="/sectors" element={<ErrorBoundary><Sectors /></ErrorBoundary>} />
              <Route path="/policy" element={<ErrorBoundary><Policy /></ErrorBoundary>} />

              {/* Intelligence (protected) */}
              <Route path="/intelligence/*" element={<ErrorBoundary><ProtectedRoute><Intelligence /></ProtectedRoute></ErrorBoundary>}>
                <Route path="dashboard" element={<IntelDashboard />} />
                <Route path="market" element={<MarketOverview />} />
                <Route path="reports" element={<Reports />} />
                <Route path="watchlist" element={<Watchlist />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="resources" element={<IntelResources />} />
              </Route>

              {/* Reports */}
              <Route path="/reports/:slug" element={<ErrorBoundary><SectorReport /></ErrorBoundary>} />

              {/* Sector pages */}
              <Route path="/sectors/energy" element={<ErrorBoundary><Energy /></ErrorBoundary>} />
              <Route path="/sectors/technology" element={<ErrorBoundary><Technology /></ErrorBoundary>} />
              <Route path="/sectors/sports" element={<ErrorBoundary><Sports /></ErrorBoundary>} />
              <Route path="/sectors/transport" element={<ErrorBoundary><Transport /></ErrorBoundary>} />
              <Route path="/sectors/manufacturing" element={<ErrorBoundary><Manufacturing /></ErrorBoundary>} />
              <Route path="/sectors/housing" element={<ErrorBoundary><Housing /></ErrorBoundary>} />
              <Route path="/sectors/financial" element={<ErrorBoundary><Financial /></ErrorBoundary>} />
              <Route path="/sectors/health" element={<ErrorBoundary><Health /></ErrorBoundary>} />
              <Route path="/sectors/infrastructure" element={<ErrorBoundary><Infrastructure /></ErrorBoundary>} />
              <Route path="/sectors/tourism" element={<ErrorBoundary><Tourism /></ErrorBoundary>} />
              <Route path="/sectors/education" element={<ErrorBoundary><Education /></ErrorBoundary>} />
              <Route path="/sectors/agriculture" element={<ErrorBoundary><Agriculture /></ErrorBoundary>} />

              {/* Community */}
              <Route path="/community" element={<ErrorBoundary><Community /></ErrorBoundary>}>
                <Route index element={<CommunityHome />} />
                <Route path="forum" element={<CommunityHome />} />
                <Route path="forum/*" element={<CommunityHome />} />
                <Route path="members" element={<CommunityHome />} />
                <Route path="resources" element={<CommunityHome />} />
              </Route>

              {/* Resource viewer routes */}
              <Route path="/resources/policy-brief" element={<ErrorBoundary><PolicyBriefTeaser /></ErrorBoundary>} />
              <Route path="/resources/sector-brief/:slug" element={<ErrorBoundary><ProtectedRoute><SectorBriefViewer /></ProtectedRoute></ErrorBoundary>} />
              <Route path="/resources/annual-review" element={<ErrorBoundary><ProtectedRoute><AnnualReviewTeaser /></ProtectedRoute></ErrorBoundary>} />

              {/* BRIDGE document pages — sector intelligence with wrapper */}
              <Route path="/resources/budget-alignment" element={
                <ErrorBoundary>
                  <SectorIntelligenceWrapper title="2026 Budget Alignment" freePreviewPath="/resources/policy-brief">
                    <BudgetAlignment />
                  </SectorIntelligenceWrapper>
                </ErrorBoundary>
              } />
              <Route path="/resources/ghana-intelligence" element={
                <ErrorBoundary>
                  <SectorIntelligenceWrapper title="Ghana Intelligence Q1 2026" freePreviewPath="/resources/annual-review">
                    <GhanaIntelligence />
                  </SectorIntelligenceWrapper>
                </ErrorBoundary>
              } />
              <Route path="/resources/sector-briefs" element={
                <ErrorBoundary>
                  <SectorIntelligenceWrapper title="Sector Intelligence Briefs">
                    <AllSectorsFree />
                  </SectorIntelligenceWrapper>
                </ErrorBoundary>
              } />
              <Route path="/resources/sector-briefs-full" element={
                <ErrorBoundary>
                  <ProtectedRoute>
                    <SectorIntelligenceWrapper title="Sector Intelligence Briefs — Full">
                      <AllSectorsPaid />
                    </SectorIntelligenceWrapper>
                  </ProtectedRoute>
                </ErrorBoundary>
              } />
              <Route path="/resources/white-paper" element={
                <ErrorBoundary>
                  <SectorIntelligenceWrapper title="BRIDGE Foundational White Paper">
                    <WhitePaper />
                  </SectorIntelligenceWrapper>
                </ErrorBoundary>
              } />
              <Route path="/resources/annual-review-2025" element={
                <ErrorBoundary>
                  <SectorIntelligenceWrapper title="BRIDGE 2025 Annual Review">
                    <AnnualReview2025 />
                  </SectorIntelligenceWrapper>
                </ErrorBoundary>
              } />
              <Route path="/resources/policy-tracker" element={
                <ErrorBoundary>
                  <SectorIntelligenceWrapper title="Ghana Policy Tracker 2025–2026">
                    <PolicyTracker />
                  </SectorIntelligenceWrapper>
                </ErrorBoundary>
              } />
              <Route path="/resources/monthly-dashboard" element={
                <ErrorBoundary>
                  <SectorIntelligenceWrapper title="Monthly Dashboard — March 2026">
                    <MonthlyDashboard />
                  </SectorIntelligenceWrapper>
                </ErrorBoundary>
              } />

              {/* New public pages: FAQ, Membership, Search */}
              <Route path="/faq" element={<ErrorBoundary><FAQPage /></ErrorBoundary>} />
              <Route path="/membership" element={<ErrorBoundary><MembershipPage /></ErrorBoundary>} />
              <Route path="/search" element={<ErrorBoundary><SearchPage /></ErrorBoundary>} />

              {/* Paid member document library */}
              <Route path="/resources/document-library" element={
                <ErrorBoundary>
                  <ProtectedRoute>
                    <SectorIntelligenceWrapper title="Member Document Dashboard">
                      <PaidDocumentLibrary />
                    </SectorIntelligenceWrapper>
                  </ProtectedRoute>
                </ErrorBoundary>
              } />

              {/* Paid-only report pages */}
              <Route path="/resources/impact-score" element={
                <ErrorBoundary>
                  <ProtectedRoute>
                    <SectorIntelligenceWrapper title="BRIDGE Impact Score™ Methodology">
                      <ImpactScore />
                    </SectorIntelligenceWrapper>
                  </ProtectedRoute>
                </ErrorBoundary>
              } />
              <Route path="/resources/peace-prosperity" element={
                <ErrorBoundary>
                  <ProtectedRoute>
                    <SectorIntelligenceWrapper title="Peace & Prosperity Framework">
                      <PeaceProsperity />
                    </SectorIntelligenceWrapper>
                  </ProtectedRoute>
                </ErrorBoundary>
              } />
              <Route path="/resources/portfolio" element={
                <ErrorBoundary>
                  <ProtectedRoute>
                    <SectorIntelligenceWrapper title="BRIDGE Venture Portfolio Overview">
                      <Portfolio />
                    </SectorIntelligenceWrapper>
                  </ProtectedRoute>
                </ErrorBoundary>
              } />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
