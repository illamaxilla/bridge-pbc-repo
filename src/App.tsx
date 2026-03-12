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
const CommunityHome = lazy(() => import("./pages/community/index"));

// Reports
const SectorReport = lazy(() => import("./pages/reports/SectorReport"));

// Resource teasers / viewers
const PolicyBriefTeaser = lazy(() => import("./pages/resources/PolicyBriefTeaser"));
const AnnualReviewTeaser = lazy(() => import("./pages/resources/AnnualReviewTeaser"));
const SectorBriefViewer = lazy(() => import("./pages/resources/SectorBriefViewer"));

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
  <div style={{ minHeight: "100vh" }} />
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <ErrorBoundary>
          <Suspense fallback={<PageLoading />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/methodology" element={<Methodology />} />
              <Route path="/intelligence/*" element={<ProtectedRoute><Intelligence /></ProtectedRoute>}>
                <Route path="dashboard" element={<IntelDashboard />} />
                <Route path="market" element={<MarketOverview />} />
                <Route path="reports" element={<Reports />} />
                <Route path="watchlist" element={<Watchlist />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="resources" element={<IntelResources />} />
              </Route>
              <Route path="/reports/:slug" element={<SectorReport />} />
              <Route path="/sectors/energy" element={<Energy />} />
              <Route path="/sectors/technology" element={<Technology />} />
              <Route path="/sectors/sports" element={<Sports />} />
              <Route path="/sectors/transport" element={<Transport />} />
              <Route path="/sectors/manufacturing" element={<Manufacturing />} />
              <Route path="/sectors/housing" element={<Housing />} />
              <Route path="/sectors/financial" element={<Financial />} />
              <Route path="/sectors/health" element={<Health />} />
              <Route path="/sectors/infrastructure" element={<Infrastructure />} />
              <Route path="/sectors/tourism" element={<Tourism />} />
              <Route path="/sectors/education" element={<Education />} />
              <Route path="/sectors/agriculture" element={<Agriculture />} />
              <Route path="/community" element={<CommunityHome />} />
              <Route path="/community/forum" element={<CommunityHome />} />
              <Route path="/community/forum/questions" element={<CommunityHome />} />
              <Route path="/community/forum/most-answered" element={<CommunityHome />} />
              <Route path="/community/forum/polls" element={<CommunityHome />} />
              <Route path="/community/forum/groups" element={<CommunityHome />} />
              <Route path="/community/forum/tags" element={<CommunityHome />} />
              <Route path="/community/forum/sectors" element={<CommunityHome />} />
              <Route path="/community/forum/badges" element={<CommunityHome />} />
              <Route path="/community/forum/members" element={<CommunityHome />} />
              <Route path="/community/members" element={<CommunityHome />} />
              <Route path="/community/resources" element={<CommunityHome />} />

              {/* Resource viewer routes */}
              {/* Policy brief: public (General Public) */}
              <Route path="/resources/policy-brief" element={<PolicyBriefTeaser />} />
              {/* Sector briefs: Free Membership (must sign in) */}
              <Route path="/resources/sector-brief/:slug" element={<ProtectedRoute><SectorBriefViewer /></ProtectedRoute>} />
              {/* Annual review: Free Membership (must sign in) */}
              <Route path="/resources/annual-review" element={<ProtectedRoute><AnnualReviewTeaser /></ProtectedRoute>} />

              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/sectors" element={<Sectors />} />
              <Route path="/policy" element={<Policy />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          </ErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
