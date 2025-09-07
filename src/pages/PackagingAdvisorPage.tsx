import React from 'react';
import { Helmet } from 'react-helmet-async';
import PackagingAdvisor from '@/components/resources/PackagingAdvisor';
import { Badge } from '@/components/ui/badge';
import { Package, Shield, Truck, Leaf } from 'lucide-react';

const PackagingAdvisorPage = () => {
  return (
    <>
      <Helmet>
        <title>Packaging Advisor | SWENLOG - Smart Packaging Solutions</title>
        <meta
          name="description"
          content="Get personalized packaging recommendations for your shipments. Optimize protection, cost, and sustainability with our intelligent packaging advisor."
        />
        <meta
          name="keywords"
          content="packaging advisor, shipping packaging, protective packaging, sustainable packaging, packaging recommendations"
        />
        <meta property="og:title" content="Packaging Advisor | SWENLOG" />
        <meta
          property="og:description"
          content="Get smart packaging recommendations for your international shipments with our AI-powered advisor."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/resources/packaging-advisor" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="p-3 bg-white/10 rounded-full">
                  <Package className="h-8 w-8" />
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Smart Packaging
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Packaging Advisor
              </h1>

              <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto mb-8">
                Get intelligent packaging recommendations tailored to your product type,
                shipping method, and destination requirements.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Optimal Protection</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  <span>Cost Optimization</span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="h-4 w-4" />
                  <span>Sustainable Solutions</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <PackagingAdvisor />
        </div>

        {/* Features Section */}
        <div className="bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose Our Packaging Advisor?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Advanced algorithms analyze your specific requirements to recommend
                the most effective and cost-efficient packaging solutions.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Maximum Protection
                </h3>
                <p className="text-gray-600">
                  AI-powered recommendations ensure your products arrive safely,
                  regardless of fragility level or shipping distance.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Cost Optimization
                </h3>
                <p className="text-gray-600">
                  Balance protection with cost efficiency. Get recommendations that
                  minimize packaging expenses without compromising safety.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Sustainable Choices
                </h3>
                <p className="text-gray-600">
                  Environmentally conscious recommendations with recyclable materials
                  and reduced carbon footprint options.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Types Section */}
        <div className="bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Supported Product Types
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive packaging solutions for all types of products and industries
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="text-3xl mb-3">📱</div>
                <h3 className="font-semibold text-gray-900 mb-2">Electronics</h3>
                <p className="text-sm text-gray-600">Anti-static, shock-absorbing packaging for gadgets and devices</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="text-3xl mb-3">🏺</div>
                <h3 className="font-semibold text-gray-900 mb-2">Fragile Items</h3>
                <p className="text-sm text-gray-600">Museum-quality protection for glass, ceramics, and delicate items</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="text-3xl mb-3">⚙️</div>
                <h3 className="font-semibold text-gray-900 mb-2">Machinery</h3>
                <p className="text-sm text-gray-600">Heavy-duty industrial packaging for equipment and parts</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="text-3xl mb-3">🍎</div>
                <h3 className="font-semibold text-gray-900 mb-2">Food & Beverages</h3>
                <p className="text-sm text-gray-600">Food-grade, temperature-controlled packaging solutions</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                Need Custom Packaging Solutions?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Our packaging experts can design custom solutions for unique or complex
                shipping requirements. Get professional consultation today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                  Contact Packaging Experts
                </button>
                <button className="border border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors">
                  View Packaging Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PackagingAdvisorPage;
