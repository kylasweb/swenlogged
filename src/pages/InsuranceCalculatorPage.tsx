import React from 'react';
import { Helmet } from 'react-helmet-async';
import InsuranceCalculator from '@/components/resources/InsuranceCalculator';
import { Badge } from '@/components/ui/badge';
import { Shield, Calculator, AlertTriangle, CheckCircle } from 'lucide-react';

const InsuranceCalculatorPage = () => {
  return (
    <>
      <Helmet>
        <title>Insurance Calculator | SWENLOG - Shipping Insurance Coverage</title>
        <meta
          name="description"
          content="Calculate shipping insurance premiums and coverage options. Get comprehensive protection for your international shipments with our insurance calculator."
        />
        <meta
          name="keywords"
          content="shipping insurance, cargo insurance, freight insurance, insurance calculator, shipment protection"
        />
        <meta property="og:title" content="Insurance Calculator | SWENLOG" />
        <meta
          property="og:description"
          content="Calculate comprehensive shipping insurance coverage and premiums for your international shipments."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/resources/insurance-calculator" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="p-3 bg-white/10 rounded-full">
                  <Shield className="h-8 w-8" />
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Insurance Tool
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Insurance Calculator
              </h1>

              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
                Calculate comprehensive shipping insurance coverage and premiums.
                Protect your valuable shipments with confidence.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  <span>Instant Quotes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Full Coverage</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <InsuranceCalculator />
        </div>

        {/* Features Section */}
        <div className="bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose Our Insurance Coverage?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive protection for your shipments with fast claims processing
                and worldwide support.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Comprehensive Coverage
                </h3>
                <p className="text-gray-600">
                  Protection against loss, damage, theft, and customs issues.
                  Multiple coverage levels to fit your needs.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Transparent Pricing
                </h3>
                <p className="text-gray-600">
                  Clear pricing with no hidden fees. Get instant quotes based
                  on your shipment value and risk factors.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Fast Claims Process
                </h3>
                <p className="text-gray-600">
                  Streamlined claims process with dedicated support team.
                  Quick resolution for covered incidents.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Coverage Types Section */}
        <div className="bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Coverage Options
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose the right level of protection for your shipping needs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Basic Coverage</h3>
                  <div className="text-2xl font-bold text-blue-600 mt-2">0.5% of value</div>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✓ Loss and damage protection</li>
                  <li>✓ Basic claims support</li>
                  <li>✓ Standard documentation</li>
                  <li>✗ Theft coverage</li>
                  <li>✗ Customs issues</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-green-200 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-green-100 text-green-800 border-green-200">Recommended</Badge>
                </div>
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Comprehensive</h3>
                  <div className="text-2xl font-bold text-green-600 mt-2">0.8% of value</div>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✓ All basic coverage</li>
                  <li>✓ Theft protection</li>
                  <li>✓ Customs issues coverage</li>
                  <li>✓ Priority claims support</li>
                  <li>✓ Extended documentation</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Premium Protection</h3>
                  <div className="text-2xl font-bold text-purple-600 mt-2">1.2% of value</div>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✓ All comprehensive coverage</li>
                  <li>✓ Delay compensation</li>
                  <li>✓ War & political risk</li>
                  <li>✓ 24/7 emergency support</li>
                  <li>✓ Premium claims service</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                Need Professional Insurance Guidance?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Our insurance specialists can help you choose the right coverage
                for your specific shipping needs and risk profile.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                  Contact Insurance Team
                </button>
                <button className="border border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors">
                  View All Policies
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InsuranceCalculatorPage;
