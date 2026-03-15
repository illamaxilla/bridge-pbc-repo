import { Suspense } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PaidRoute } from "./components/PaidRoute";
import SectorIntelligenceWrapper from "./components/SectorIntelligenceWrapper";
import NotFound from "./pages/NotFound";

import {
  Index, About, Services, Resources, Insights, Methodology,
  Contact, Login, Sectors, Policy, FAQPage, MembershipPage, SearchPage,
  TermsPage, PrivacyPage, AccessibilityPage,
  Intelligence, IntelDashboard, MarketOverview, Reports, Watchlist, Analytics, IntelResources,
  Community, CommunityHome,
  SectorReport, PolicyBriefTeaser, AnnualReviewTeaser, SectorBriefViewer,
  SECTOR_PAGES, BRIDGE_DOC_ROUTES,
  CannabisIntelligenceDashboard, CannabisIntelligenceSummary,
  CANNABIS_LICENCE_ROUTES,
} from "./routeConfig";

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
              <Route path="/faq" element={<ErrorBoundary><FAQPage /></ErrorBoundary>} />
              <Route path="/membership" element={<ErrorBoundary><MembershipPage /></ErrorBoundary>} />
              <Route path="/search" element={<ErrorBoundary><SearchPage /></ErrorBoundary>} />
              <Route path="/terms" element={<ErrorBoundary><TermsPage /></ErrorBoundary>} />
              <Route path="/privacy" element={<ErrorBoundary><PrivacyPage /></ErrorBoundary>} />
              <Route path="/accessibility" element={<ErrorBoundary><AccessibilityPage /></ErrorBoundary>} />

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

              {/* Sector pages (config-driven) */}
              {Object.entries(SECTOR_PAGES).map(([slug, Component]) => (
                <Route key={slug} path={`/sectors/${slug}`} element={<ErrorBoundary><Component /></ErrorBoundary>} />
              ))}

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

              {/* BRIDGE document pages (config-driven) */}
              {BRIDGE_DOC_ROUTES.map(({ path, title, component: DocComponent, auth, freePreviewPath }) => {
                const content = (
                  <SectorIntelligenceWrapper title={title} freePreviewPath={freePreviewPath}>
                    <DocComponent />
                  </SectorIntelligenceWrapper>
                );
                const wrapped =
                  auth === "paid" ? <PaidRoute>{content}</PaidRoute> :
                  auth === "protected" ? <ProtectedRoute>{content}</ProtectedRoute> :
                  content;
                return (
                  <Route
                    key={path}
                    path={path}
                    element={<ErrorBoundary>{wrapped}</ErrorBoundary>}
                  />
                );
              })}

              {/* Cannabis Intelligence Series */}
              <Route path="/resources/cannabis-intelligence" element={<ErrorBoundary><CannabisIntelligenceDashboard /></ErrorBoundary>} />
              <Route path="/resources/cannabis-intelligence/summary" element={<ErrorBoundary><CannabisIntelligenceSummary /></ErrorBoundary>} />
              {CANNABIS_LICENCE_ROUTES.map(({ slug, component: LicenceComponent }) => (
                <Route
                  key={slug}
                  path={`/resources/cannabis-intelligence/${slug}`}
                  element={<ErrorBoundary><PaidRoute><LicenceComponent /></PaidRoute></ErrorBoundary>}
                />
              ))}

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
