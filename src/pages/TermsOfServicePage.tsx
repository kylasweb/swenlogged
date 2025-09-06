import React from 'react';

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-4">
            Terms of Service
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              <strong>Last updated: {new Date().toLocaleDateString()}</strong>
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using SWENLOG's services, you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please do not 
                use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Service Description</h2>
              <p className="text-gray-700 mb-4">
                SWENLOG provides comprehensive logistics and supply chain solutions including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Ocean and air freight services</li>
                <li>Ground transportation and warehousing</li>
                <li>Customs brokerage and compliance</li>
                <li>Supply chain consulting and optimization</li>
                <li>Technology platforms for shipment management</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. User Responsibilities</h2>
              <p className="text-gray-700 mb-4">As a user of our services, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Provide accurate and complete information</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Pay all fees and charges when due</li>
                <li>Properly package and label shipments</li>
                <li>Declare hazardous materials accurately</li>
                <li>Maintain the confidentiality of your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Pricing and Payment</h2>
              <p className="text-gray-700 mb-4">
                Pricing for services is based on current tariffs and may be subject to change. Payment terms 
                are net 30 days unless otherwise agreed in writing. Late payments may incur interest charges 
                at 1.5% per month or the maximum rate allowed by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Liability and Insurance</h2>
              <p className="text-gray-700 mb-4">
                SWENLOG's liability is limited to the declared value of goods or actual damages, whichever is less. 
                We recommend customers obtain adequate insurance coverage for their shipments. Claims must be 
                filed within 90 days of delivery or expected delivery date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Force Majeure</h2>
              <p className="text-gray-700 mb-4">
                SWENLOG shall not be liable for delays or failures in performance resulting from acts beyond our 
                reasonable control, including but not limited to acts of God, war, terrorism, labor disputes, 
                or government regulations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Termination</h2>
              <p className="text-gray-700 mb-4">
                Either party may terminate this agreement with 30 days written notice. Upon termination, 
                all outstanding obligations shall remain in effect until satisfied.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Governing Law</h2>
              <p className="text-gray-700 mb-4">
                These terms shall be governed by and construed in accordance with the laws of the jurisdiction 
                where SWENLOG's principal office is located, without regard to conflict of law principles.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Contact Information</h2>
              <p className="text-gray-700">
                For questions regarding these Terms of Service, please contact:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <p className="text-gray-700">
                  <strong>SWENLOG Legal Department</strong><br />
                  Email: legal@swenlog.com<br />
                  Phone: +1 (555) 123-4567<br />
                  Address: 123 Logistics Ave, Shipping City, SC 12345
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;