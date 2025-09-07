import React from 'react';
import { Helmet } from 'react-helmet-async';
import SupplyChainAcademy from '@/components/resources/SupplyChainAcademy';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Award, Users, TrendingUp } from 'lucide-react';
import BackButton from '@/components/ui/BackButton';

const SupplyChainAcademyPage = () => {
  return (
    <>
      <Helmet>
        <title>Supply Chain Academy | SWENLOG - Online Learning Platform</title>
        <meta
          name="description"
          content="Master supply chain management with comprehensive online courses. Learn logistics, international trade, and operations from industry experts."
        />
        <meta
          name="keywords"
          content="supply chain training, logistics courses, online learning, supply chain certification, logistics education"
        />
        <meta property="og:title" content="Supply Chain Academy | SWENLOG" />
        <meta
          property="og:description"
          content="Comprehensive online learning platform for supply chain management and logistics professionals."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/resources/supply-chain-academy" />
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
                  <BookOpen className="h-8 w-8" />
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Learning Platform
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Supply Chain Academy
              </h1>

              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
                Master supply chain management with our comprehensive online courses.
                Learn from industry experts and advance your logistics career.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Expert Instructors</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  <span>Certificates</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Community Learning</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <SupplyChainAcademy />
        </div>

        {/* Features Section */}
        <div className="bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Learn with Supply Chain Academy?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive education designed by industry professionals
                to accelerate your career in supply chain management.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Expert-Led Courses
                </h3>
                <p className="text-gray-600">
                  Learn from industry veterans with decades of experience in
                  logistics, supply chain management, and international trade.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Industry Recognition
                </h3>
                <p className="text-gray-600">
                  Earn certificates recognized by leading logistics companies.
                  Boost your resume with accredited professional development.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Career Advancement
                </h3>
                <p className="text-gray-600">
                  Gain practical skills and knowledge that directly translate
                  to higher-paying positions in the logistics industry.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Categories */}
        <div className="bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Course Categories
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Specialized training programs for every aspect of supply chain management
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Logistics</h3>
                <p className="text-sm text-gray-600">Transportation, warehousing, and distribution fundamentals</p>
                <div className="text-xs text-blue-600 mt-2">5 courses available</div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">International Trade</h3>
                <p className="text-sm text-gray-600">Customs, regulations, and global commerce</p>
                <div className="text-xs text-green-600 mt-2">3 courses available</div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Operations</h3>
                <p className="text-sm text-gray-600">Supply chain optimization and efficiency</p>
                <div className="text-xs text-purple-600 mt-2">4 courses available</div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Risk Management</h3>
                <p className="text-sm text-gray-600">Risk assessment and mitigation strategies</p>
                <div className="text-xs text-orange-600 mt-2">2 courses available</div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What Our Students Say
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Real success stories from professionals who advanced their careers
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    ★★★★★
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "The International Shipping course completely transformed my understanding
                  of global logistics. I got promoted within 6 months of completing it."
                </p>
                <div className="font-semibold text-gray-900">Sarah Chen</div>
                <div className="text-sm text-gray-600">Logistics Manager, TechCorp</div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    ★★★★★
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "Excellent practical knowledge that I use every day in my role.
                  The instructors are industry experts who know what they're talking about."
                </p>
                <div className="font-semibold text-gray-900">Michael Rodriguez</div>
                <div className="text-sm text-gray-600">Supply Chain Analyst, GlobalTrade Inc</div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    ★★★★★
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "The certifications from Supply Chain Academy opened doors for me.
                  Highly recommend for anyone serious about a logistics career."
                </p>
                <div className="font-semibold text-gray-900">Jennifer Park</div>
                <div className="text-sm text-gray-600">Operations Director, FastShip Logistics</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                Start Your Learning Journey Today
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who have advanced their careers
                with our comprehensive supply chain education programs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                  Browse Courses
                </button>
                <button className="border border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors">
                  View Certifications
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupplyChainAcademyPage;
