
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalDataProvider } from './contexts/GlobalDataProvider';

// Auth
import { AuthProvider } from "./contexts/AuthProvider";
import AuthPage from "./pages/AuthPage";
import AdminRoute from "./components/AdminRoute";

import Index from "./pages/Index";
import AdminPage from "./pages/Admin";
import DynamicPage from "./pages/DynamicPage";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/AboutPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import CookiePolicyPage from "./pages/CookiePolicyPage";
import CareersPage from "./pages/CareersPage";
import JobApplicationPage from "./pages/JobApplicationPage";
import ContactPage from "./pages/ContactPage";
import LocationsPage from "./pages/LocationsPage";
import QuotePage from "./pages/QuotePage";
import NetworksPage from "./pages/NetworksPage";
import ResourcesPage from "./pages/ResourcesPage";

// Service Pages
import OceanFreightPage from "./pages/OceanFreightPage";
import AirFreightPage from "./pages/AirFreightPage";
import GroundTransportationPage from "./pages/GroundTransportationPage";
import CustomsBrokeragePage from "./pages/CustomsBrokeragePage";
import WarehousingDistributionPage from "./pages/WarehousingDistributionPage";
import SupplyChainSolutionsPage from "./pages/SupplyChainSolutionsPage";

// Industry Pages
import AutomotivePage from "./pages/AutomotivePage";
import TechnologyPage from "./pages/TechnologyPage";
import RetailFashionPage from "./pages/RetailFashionPage";
import HealthcarePage from "./pages/HealthcarePage";
import ManufacturingPage from "./pages/ManufacturingPage";
import EnergyPage from "./pages/EnergyPage";

// Tool Pages
import FreightCalculatorPage from "./pages/tools/FreightCalculatorPage";
import RouteOptimizerPage from "./pages/tools/RouteOptimizerPage";
import DocumentScannerPage from "./pages/tools/DocumentScannerPage";
import MarineTrafficPage from "./pages/tools/MarineTrafficPage";
import ContainerLoadOptimizerPage from "./pages/tools/ContainerLoadOptimizerPage";

import BottomNav from "@/components/BottomNav";

const App = () => {
  // Initialize QueryClient inside the component to ensure React is ready
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <GlobalDataProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/admin" element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            } />
            <Route path="/about-us" element={<AboutPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/careers/apply/:jobId" element={<JobApplicationPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/quote" element={<QuotePage />} />
            <Route path="/networks" element={<NetworksPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            
            {/* Tool Routes */}
            <Route path="/tools/freight-calculator" element={<FreightCalculatorPage />} />
            <Route path="/tools/route-optimizer" element={<RouteOptimizerPage />} />
            <Route path="/tools/document-scanner" element={<DocumentScannerPage />} />
            <Route path="/tools/marine-traffic" element={<MarineTrafficPage />} />
            <Route path="/tools/container-optimizer" element={<ContainerLoadOptimizerPage />} />
            
            {/* Service Routes */}
            <Route path="/services/ocean-freight" element={<OceanFreightPage />} />
            <Route path="/services/air-freight" element={<AirFreightPage />} />
            <Route path="/services/ground-transportation" element={<GroundTransportationPage />} />
            <Route path="/services/customs-brokerage" element={<CustomsBrokeragePage />} />
            <Route path="/services/warehousing-distribution" element={<WarehousingDistributionPage />} />
            <Route path="/services/supply-chain-solutions" element={<SupplyChainSolutionsPage />} />
            
            {/* Industry Routes */}
            <Route path="/industries/automotive" element={<AutomotivePage />} />
            <Route path="/industries/technology" element={<TechnologyPage />} />
            <Route path="/industries/retail-fashion" element={<RetailFashionPage />} />
            <Route path="/industries/healthcare" element={<HealthcarePage />} />
            <Route path="/industries/manufacturing" element={<ManufacturingPage />} />
            <Route path="/industries/energy" element={<EnergyPage />} />
            
            <Route path="/page/:slug" element={<DynamicPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/cookie-policy" element={<CookiePolicyPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* Show BottomNav only on mobile */}
          <BottomNav />
        </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </GlobalDataProvider>
  );
};

export default App;
