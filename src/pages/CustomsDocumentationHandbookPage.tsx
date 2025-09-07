import React from 'react';
import { Helmet } from 'react-helmet-async';
import CustomsDocumentationHandbook from '@/components/resources/CustomsDocumentationHandbook';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Globe, CheckCircle } from 'lucide-react';
import BackButton from '@/components/ui/BackButton';

const CustomsDocumentationHandbookPage = () => {
  return (
    <>
      <Helmet>
        <title>Customs Documentation Handbook | SWENLOG - International Shipping Documents</title>
        <meta
          name="description"
          content="Complete guide to customs documentation with downloadable templates, checklists, and country-specific requirements for smooth international shipping."
        />
        <meta
          name="keywords"
          content="customs documentation, shipping documents, commercial invoice, bill of lading, customs clearance, import documents"
        />
        <meta property="og:title" content="Customs Documentation Handbook | SWENLOG" />
        <meta
          property="og:description"
          content="Access comprehensive customs documentation templates and guides for international shipping compliance."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/resources/customs-documentation-handbook" />
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
                  <FileText className="h-8 w-8" />
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Documentation Hub
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Customs Documentation Handbook
              </h1>

              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
                Your complete resource for international shipping documentation.
                Access templates, checklists, and compliance guides for global trade.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span>Download Templates</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>Global Coverage</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Compliance Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <CustomsDocumentationHandbook />
        </div>

        {/* Features Section */}
        <div className="bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Use Our Documentation Handbook?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Streamline your customs clearance process with professional documentation tools
                and expert guidance for international shipping.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Professional Templates
                </h3>
                <p className="text-gray-600">
                  Download professionally formatted templates for all essential
                  shipping documents, ready for customization and use.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Country-Specific Guidance
                </h3>
                <p className="text-gray-600">
                  Get detailed requirements for major trading nations including
                  documentation, certifications, and compliance procedures.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Compliance Assurance
                </h3>
                <p className="text-gray-600">
                  Ensure your shipments meet all regulatory requirements with
                  our comprehensive checklists and compliance guides.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Document Categories */}
        <div className="bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Essential Document Categories
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive coverage of all documentation types required for international shipping
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-center">Essential Documents</h3>
                <p className="text-sm text-gray-600 text-center">
                  Commercial invoices, packing lists, bills of lading - the core documents for every shipment.
                </p>
                <div className="text-xs text-red-600 mt-2 text-center">Always Required</div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-center">Certificates of Origin</h3>
                <p className="text-sm text-gray-600 text-center">
                  Proof of manufacturing country for preferential trade agreements and customs purposes.
                </p>
                <div className="text-xs text-blue-600 mt-2 text-center">Often Required</div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-center">Permits & Licenses</h3>
                <p className="text-sm text-gray-600 text-center">
                  Special permissions for restricted items, hazardous materials, and regulated products.
                </p>
                <div className="text-xs text-green-600 mt-2 text-center">Product-Specific</div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-center">Customs Forms</h3>
                <p className="text-sm text-gray-600 text-center">
                  Official customs declarations and forms required for import/export clearance.
                </p>
                <div className="text-xs text-purple-600 mt-2 text-center">Country-Specific</div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Downloads */}
        <div className="bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Most Popular Downloads
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The most frequently used templates and guides in our documentation library
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Commercial Invoice Template</h3>
                    <p className="text-sm text-gray-600">Universal format accepted worldwide</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge className="bg-blue-100 text-blue-800">5,230 downloads</Badge>
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                    Download →
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Packing List Template</h3>
                    <p className="text-sm text-gray-600">Detailed itemized packing documentation</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge className="bg-green-100 text-green-800">4,180 downloads</Badge>
                  <button className="text-green-600 hover:text-green-800 font-medium text-sm">
                    Download →
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-lg border border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="h-8 w-8 text-purple-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Documentation Checklist</h3>
                    <p className="text-sm text-gray-600">Comprehensive compliance checklist</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge className="bg-purple-100 text-purple-800">3,450 downloads</Badge>
                  <button className="text-purple-600 hover:text-purple-800 font-medium text-sm">
                    Download →
                  </button>
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
                Need Help with Customs Documentation?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Our team of customs documentation experts can help you prepare
                compliant documents and navigate complex regulatory requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                  Contact Documentation Team
                </button>
                <button className="border border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors">
                  Schedule Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomsDocumentationHandbookPage;
