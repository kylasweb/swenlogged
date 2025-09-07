
import React from 'react';
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
import AITestPage from "./pages/AITestPage";

// Resource Pages
import TransitTimeCalculatorPage from "./pages/resources/TransitTimeCalculatorPage";
import PricePredictionEnginePage from "./pages/PricePredictionEnginePage";
import DemandForecastingAssistantPage from "./pages/DemandForecastingAssistantPage";
import RiskAssessmentAIPage from "./pages/RiskAssessmentAIPage";
import SupplyChainAcademyPage from "./pages/SupplyChainAcademyPage";
import FreightCalculatorGuidePage from "./pages/FreightCalculatorGuidePage";
import CustomsDocumentationHandbookPage from "./pages/CustomsDocumentationHandbookPage";
import CurrencyConverterPage from "./pages/resources/CurrencyConverterPage";
import CustomsDutyCalculatorPage from "./pages/CustomsDutyCalculatorPage";
import PackagingAdvisorPage from "./pages/PackagingAdvisorPage";
import InsuranceCalculatorPage from "./pages/InsuranceCalculatorPage";
import PortLocatorMapPage from "./pages/PortLocatorMapPage";
import SupplyChainRiskAssessmentPage from "./pages/SupplyChainRiskAssessmentPage";
import GlobalTradeReportPage from "./pages/GlobalTradeReportPage";
import SustainabilityTrackerPage from "./pages/SustainabilityTrackerPage";
import PortPerformanceDashboardPage from "./pages/PortPerformanceDashboardPage";
import TradeLaneAnalyticsPage from "./pages/TradeLaneAnalyticsPage";

// Phase 3 Resource Pages
import ComplianceCheckerPage from "./pages/ComplianceCheckerPage";
import MobileTrackingAppPage from "./pages/MobileTrackingAppPage";
import ApiDocumentationPage from "./pages/ApiDocumentationPage";
import ErpIntegrationGuidesPage from "./pages/ErpIntegrationGuidesPage";
import WebhookBuilderPage from "./pages/WebhookBuilderPage";
import ShipperCommunityForumPage from "./pages/ShipperCommunityForumPage";
import ExpertWebinarSeriesPage from "./pages/ExpertWebinarSeriesPage";
import CaseStudyLibraryPage from "./pages/CaseStudyLibraryPage";
import VideoTutorialLibraryPage from "./pages/VideoTutorialLibraryPage";

import BottomNav from "@/components/BottomNav";
import ErrorBoundary from "@/components/ErrorBoundary";
import VerificationPage from "./pages/VerificationPage";

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
    <ErrorBoundary>
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
              <Route path="/resources/transit-time-calculator" element={<TransitTimeCalculatorPage />} />
              <Route path="/resources/price-prediction-engine" element={<PricePredictionEnginePage />} />
              <Route path="/resources/demand-forecasting-assistant" element={<DemandForecastingAssistantPage />} />
              <Route path="/resources/risk-assessment-ai" element={<RiskAssessmentAIPage />} />
              <Route path="/resources/supply-chain-academy" element={<SupplyChainAcademyPage />} />
              <Route path="/resources/freight-calculator-guide" element={<FreightCalculatorGuidePage />} />
              <Route path="/resources/customs-documentation-handbook" element={<CustomsDocumentationHandbookPage />} />
              <Route path="/resources/currency-converter" element={<CurrencyConverterPage />} />
              <Route path="/resources/customs-duty-calculator" element={<CustomsDutyCalculatorPage />} />
              <Route path="/resources/packaging-advisor" element={<PackagingAdvisorPage />} />
              <Route path="/resources/insurance-calculator" element={<InsuranceCalculatorPage />} />
              <Route path="/resources/port-locator-map" element={<PortLocatorMapPage />} />
              <Route path="/resources/supply-chain-risk-assessment" element={<SupplyChainRiskAssessmentPage />} />
              <Route path="/resources/global-trade-report" element={<GlobalTradeReportPage />} />
              <Route path="/resources/sustainability-tracker" element={<SustainabilityTrackerPage />} />
              <Route path="/resources/port-performance-dashboard" element={<PortPerformanceDashboardPage />} />
              <Route path="/resources/trade-lane-analytics" element={<TradeLaneAnalyticsPage />} />

              {/* Phase 3 Resource Routes */}
              <Route path="/resources/compliance-checker" element={<ComplianceCheckerPage />} />
              <Route path="/resources/mobile-tracking-app" element={<MobileTrackingAppPage />} />
              <Route path="/resources/api-documentation" element={<ApiDocumentationPage />} />
              <Route path="/resources/erp-integration-guides" element={<ErpIntegrationGuidesPage />} />
              <Route path="/resources/webhook-builder" element={<WebhookBuilderPage />} />
              <Route path="/resources/shipper-community-forum" element={<ShipperCommunityForumPage />} />
              <Route path="/resources/expert-webinar-series" element={<ExpertWebinarSeriesPage />} />
              <Route path="/resources/case-study-library" element={<CaseStudyLibraryPage />} />
              <Route path="/resources/video-tutorial-library" element={<VideoTutorialLibraryPage />} />

              {/* Verification Route - Stealth Access Only */}
              <Route path="/verification" element={<VerificationPage />} />

              {/* Tool Routes */}
              <Route path="/tools/freight-calculator" element={<FreightCalculatorPage />} />
              <Route path="/tools/route-optimizer" element={<RouteOptimizerPage />} />
              <Route path="/tools/document-scanner" element={<DocumentScannerPage />} />
              <Route path="/tools/marine-traffic" element={<MarineTrafficPage />} />
              <Route path="/tools/container-optimizer" element={<ContainerLoadOptimizerPage />} />
              <Route path="/ai-test" element={<AITestPage />} />
              
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
    </ErrorBoundary>
  );
};

export default App;
