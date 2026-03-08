import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
import About from "./pages/About";
import Resources from "./pages/Resources";
import Insights from "./pages/Insights";
import Methodology from "./pages/Methodology";
import Intelligence from "./pages/intelligence/Intelligence";
import { ProtectedRoute } from "./components/ProtectedRoute";
import CommunityHome from "./pages/community/index";
import IntelDashboard from "./pages/intelligence/Dashboard";
import MarketOverview from "./pages/intelligence/MarketOverview";
import Reports from "./pages/intelligence/Reports";
import Watchlist from "./pages/intelligence/Watchlist";
import Analytics from "./pages/intelligence/Analytics";
import IntelResources from "./pages/intelligence/Resources";
import Energy from "./pages/sectors/Energy";
import Technology from "./pages/sectors/Technology";
import Sports from "./pages/sectors/Sports";
import Transport from "./pages/sectors/Transport";
import Manufacturing from "./pages/sectors/Manufacturing";
import Housing from "./pages/sectors/Housing";
import Financial from "./pages/sectors/Financial";
import Health from "./pages/sectors/Health";
import Infrastructure from "./pages/sectors/Infrastructure";
import Tourism from "./pages/sectors/Tourism";
import Education from "./pages/sectors/Education";
import Agriculture from "./pages/sectors/Agriculture";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Sectors from "./pages/Sectors";
import Policy from "./pages/Policy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/methodology" element={<Methodology />} />
          <Route path="/intelligence/*" element={<Intelligence />}>
            <Route path="dashboard" element={<IntelDashboard />} />
            <Route path="market" element={<MarketOverview />} />
            <Route path="reports" element={<Reports />} />
            <Route path="watchlist" element={<Watchlist />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="resources" element={<IntelResources />} />
          </Route>
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
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sectors" element={<Sectors />} />
          <Route path="/policy" element={<Policy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
