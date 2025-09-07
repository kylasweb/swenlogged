
import {
  BookOpen,
  Calculator,
  Bot,
  TrendingUp,
  Map,
  Smartphone,
  Users
} from 'lucide-react';

export const resourceCategories = [
  {
    title: "Educational Resources",
    icon: BookOpen,
    color: "bg-blue-600",
    resources: [
      { title: 'Supply Chain Academy', description: 'Interactive courses on logistics fundamentals and best practices.', url: '/resources/supply-chain-academy' },
      { title: 'Freight Calculator Guide', description: 'Step-by-step tutorials on calculating shipping costs and taxes.', url: '/resources/freight-calculator-guide' },
      { title: 'Customs Documentation Handbook', description: 'Comprehensive guide to required paperwork for different countries.', url: '/resources/customs-documentation-handbook' },
      { title: 'Incoterms 2020 Interactive Guide', description: 'Visual explanations of shipping terms with real-world examples.', url: '/resources/incoterms-guide' }
    ]
  },
  {
    title: "Digital Tools & Calculators",
    icon: Calculator,
    color: "bg-green-600",
    resources: [
      { title: 'Freight Rate Calculator', description: 'Real-time shipping cost estimates for different transport modes.', url: '/tools/freight-calculator' },
      { title: 'Container Load Optimizer', description: 'Maximize container space utilization efficiently.', url: '/tools/container-optimizer' },
      { title: 'Transit Time Calculator', description: 'Estimated delivery times between global ports and cities.', url: '/resources/transit-time-calculator' },
      { title: 'Currency Converter', description: 'Real-time exchange rates for international transactions.', url: '/resources/currency-converter' },
      { title: 'Customs Duty Calculator', description: 'Estimate import/export duties and taxes by country.', url: '/resources/customs-duty-calculator' }
    ]
  },
  {
    title: "AI-Powered Tools",
    icon: Bot,
    color: "bg-purple-600",
    resources: [
      { title: 'Smart Route Optimizer', description: 'AI suggests most efficient shipping routes based on cost and time.', url: '/tools/route-optimizer' },
      { title: 'Demand Forecasting Assistant', description: 'Predictive analytics for inventory planning and demand.', url: '/resources/demand-forecasting-assistant' },
      { title: 'Risk Assessment AI', description: 'Automated analysis of shipping risks and weather patterns.', url: '/resources/risk-assessment-ai' },
      { title: 'Supply Chain Risk Assessment', description: 'Comprehensive risk analysis for supply chain vulnerabilities.', url: '/resources/supply-chain-risk-assessment' },
      { title: 'Document Scanner & Processor', description: 'AI-powered tool to extract data from shipping documents.', url: '/tools/document-scanner' },
      { title: 'Price Prediction Engine', description: 'ML-based forecasting of freight rates and market trends.', url: '/resources/price-prediction-engine' }
    ]
  },
  {
    title: "Industry Insights & Reports",
    icon: TrendingUp,
    color: "bg-orange-600",
    resources: [
      { title: 'Global Trade Report', description: 'Monthly analysis of shipping trends and market conditions.', url: '/resources/global-trade-report' },
      { title: 'Sustainability Tracker', description: 'Carbon footprint calculator and green logistics recommendations.', url: '/resources/sustainability-tracker' },
      { title: 'Port Performance Dashboard', description: 'Real-time data on port delays and efficiency metrics.', url: '/resources/port-performance-dashboard' },
      { title: 'Trade Lane Analytics', description: 'Detailed insights on shipping routes and performance.', url: '/resources/trade-lane-analytics' }
    ]
  },
  {
    title: "Interactive Tools",
    icon: Map,
    color: "bg-teal-600",
    resources: [
      { title: 'Marine Traffic Monitor', description: 'Real-time vessel tracking and global maritime traffic monitoring.', url: '/tools/marine-traffic' },
      { title: 'Port Locator Map', description: 'Interactive global map showing ports and real-time status.', url: '/resources/port-locator-map' },
      { title: 'Packaging Advisor', description: 'Recommend optimal packaging based on product and destination.', url: '/resources/packaging-advisor' },
      { title: 'Insurance Calculator', description: 'Cargo insurance cost estimator with coverage recommendations.', url: '/resources/insurance-calculator' },
      { title: 'Compliance Checker', description: 'Verify shipments meet destination country requirements.', url: '/resources/compliance-checker' }
    ]
  },
  {
    title: "Mobile & Integration",
    icon: Smartphone,
    color: "bg-indigo-600",
    resources: [
      { title: 'Mobile Tracking App', description: 'Real-time shipment tracking with push notifications.', url: '/resources/mobile-tracking-app' },
      { title: 'API Documentation', description: 'For developers integrating Swenlog services.', url: '/resources/api-documentation' },
      { title: 'ERP Integration Guides', description: 'Connect with popular business systems.', url: '/resources/erp-integration-guides' },
      { title: 'Webhook Builder', description: 'Set up automated notifications and data syncing.', url: '/resources/webhook-builder' }
    ]
  },
  {
    title: "Community & Support",
    icon: Users,
    color: "bg-pink-600",
    resources: [
      { title: 'Shipper Community Forum', description: 'Platform for customers to share experiences and ask questions.', url: '/resources/shipper-community-forum' },
      { title: 'Expert Webinar Series', description: 'Regular online sessions with logistics professionals.', url: '/resources/expert-webinar-series' },
      { title: 'Case Study Library', description: 'Real success stories from different industries.', url: '/resources/case-study-library' },
      { title: 'Video Tutorial Library', description: 'Step-by-step guides for using Swenlog services.', url: '/resources/video-tutorial-library' }
    ]
  }
];
