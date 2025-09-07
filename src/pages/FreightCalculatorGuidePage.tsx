import React from 'react';
import { Helmet } from 'react-helmet-async';
import FreightCalculatorGuide from '@/components/resources/FreightCalculatorGuide';
import { Badge } from '@/components/ui/badge';
import { Calculator, BookOpen, TrendingUp, CheckCircle } from 'lucide-react';
import BackButton from '@/components/ui/BackButton';

const FreightCalculatorGuidePage = () => {
  return (
    <>
      <Helmet>
        <title>Freight Calculator Guide | SWENLOG - Step-by-Step Freight Cost Calculation</title>
        <meta
          name="description"
          content="Learn how to calculate freight costs with our comprehensive step-by-step guide. Master freight pricing, shipping methods, and cost optimization strategies."
        />
        <meta
          name="keywords"
          content="freight calculator guide, shipping cost calculation, freight pricing, LTL rates, freight class, shipping tutorial"
        />
        <meta property="og:title" content="Freight Calculator Guide | SWENLOG" />
        <meta
          property="og:description"
          content="Master freight cost calculation with our interactive step-by-step guide and learn to optimize shipping expenses."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/resources/freight-calculator-guide" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="mb-6">
              <BackButton to="/resources" label="Back to Resources" />
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="p-3 bg-white/10 rounded-full">
                  <Calculator className="h-8 w-8" />
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Interactive Guide
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Freight Calculator Guide
              </h1>

              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
                Master the art of freight cost calculation with our comprehensive,
                step-by-step interactive guide designed for shipping professionals.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Step-by-Step Learning</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  <span>Live Calculations</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Cost Optimization</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <FreightCalculatorGuide />
        </div>

        {/* Features Section */}
        <div className="bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What You'll Learn
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive knowledge to calculate freight costs accurately
                and optimize your shipping expenses.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Freight Fundamentals
                </h3>
                <p className="text-gray-600">
                  Understand the core concepts of freight pricing, including weight,
                  dimensions, freight class, and distance-based calculations.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Cost Calculation
                </h3>
                <p className="text-gray-600">
                  Learn to calculate base rates, fuel surcharges, accessorial fees,
                  and total landed costs for any shipment.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Optimization Strategies
                </h3>
                <p className="text-gray-600">
                  Discover techniques to minimize shipping costs through better
                  planning, consolidation, and carrier selection.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Guide Benefits */}
        <div className="bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Guide Benefits
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Practical skills and knowledge that deliver immediate value
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-center">Accurate Estimates</h3>
                <p className="text-sm text-gray-600 text-center">
                  Get precise freight cost calculations for better budgeting and pricing decisions.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-center">Cost Savings</h3>
                <p className="text-sm text-gray-600 text-center">
                  Identify opportunities to reduce shipping costs through optimization techniques.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-center">Industry Knowledge</h3>
                <p className="text-sm text-gray-600 text-center">
                  Gain deep understanding of freight pricing structures and industry standards.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-center">Professional Growth</h3>
                <p className="text-sm text-gray-600 text-center">
                  Enhance your expertise and advance your career in logistics and supply chain.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Path */}
        <div className="bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Learning Path
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Structured approach to mastering freight cost calculation
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Freight Calculation Basics</h3>
                    <p className="text-gray-600">Understand fundamental concepts and pricing factors</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">15 min</Badge>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">2</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Shipment Details Input</h3>
                    <p className="text-gray-600">Learn to gather and input shipment information accurately</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">20 min</Badge>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold">3</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Shipping Options Selection</h3>
                    <p className="text-gray-600">Choose optimal shipping methods and additional services</p>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">25 min</Badge>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-bold">4</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Cost Calculation & Analysis</h3>
                    <p className="text-gray-600">Perform calculations and analyze cost breakdowns</p>
                  </div>
                  <Badge className="bg-orange-100 text-orange-800">30 min</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Master Freight Calculations?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Start your journey to becoming a freight calculation expert.
                Our interactive guide will walk you through every step of the process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                  Start the Guide
                </button>
                <button className="border border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors">
                  Download Checklist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FreightCalculatorGuidePage;
