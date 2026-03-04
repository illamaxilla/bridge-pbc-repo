import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
import About from "./pages/About";
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
