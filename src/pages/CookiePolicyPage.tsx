import React from 'react';

const CookiePolicyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-4">
            Cookie Policy
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              <strong>Last updated: {new Date().toLocaleDateString()}</strong>
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">What Are Cookies?</h2>
              <p className="text-gray-700 mb-4">
                Cookies are small text files that are stored on your computer or mobile device when you visit 
                our website. They help us provide you with a better experience by remembering your preferences 
                and understanding how you use our site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Types of Cookies We Use</h2>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Essential Cookies</h3>
                <p className="text-gray-700 mb-2">
                  These cookies are necessary for the website to function properly. They include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Authentication cookies to keep you logged in</li>
                  <li>Security cookies to protect against fraud</li>
                  <li>Load balancing cookies to ensure site performance</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Performance Cookies</h3>
                <p className="text-gray-700 mb-2">
                  These cookies help us understand how visitors interact with our website:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Google Analytics cookies for usage statistics</li>
                  <li>Performance monitoring cookies</li>
                  <li>Error tracking cookies for technical improvements</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Functional Cookies</h3>
                <p className="text-gray-700 mb-2">
                  These cookies enable enhanced functionality:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Preference cookies to remember your settings</li>
                  <li>Language selection cookies</li>
                  <li>Customer support chat cookies</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Marketing Cookies</h3>
                <p className="text-gray-700 mb-2">
                  These cookies are used to deliver relevant advertisements:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Advertising platform cookies</li>
                  <li>Social media integration cookies</li>
                  <li>Remarketing cookies for targeted ads</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Third-Party Cookies</h2>
              <p className="text-gray-700 mb-4">
                We may also use third-party services that set cookies on your device:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Google Analytics:</strong> For website usage analysis</li>
                <li><strong>Google Maps:</strong> For location services and mapping</li>
                <li><strong>LinkedIn:</strong> For professional networking integration</li>
                <li><strong>Facebook:</strong> For social media features</li>
                <li><strong>Intercom:</strong> For customer support chat</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Managing Your Cookie Preferences</h2>
              <p className="text-gray-700 mb-4">
                You can control cookies through your browser settings:
              </p>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">Browser Settings</h4>
                <ul className="list-disc pl-6 space-y-1 text-blue-700">
                  <li>Chrome: Settings → Privacy and Security → Cookies</li>
                  <li>Firefox: Options → Privacy & Security → Cookies</li>
                  <li>Safari: Preferences → Privacy → Cookies</li>
                  <li>Edge: Settings → Cookies and Site Permissions</li>
                </ul>
              </div>

              <p className="text-gray-700 mb-4">
                Please note that disabling certain cookies may affect the functionality of our website 
                and your user experience.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cookie Retention</h2>
              <p className="text-gray-700 mb-4">
                Different cookies have different retention periods:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
                <li><strong>Persistent cookies:</strong> Remain for a set period (typically 1-24 months)</li>
                <li><strong>Authentication cookies:</strong> Usually expire after 30 days of inactivity</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Updates to This Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices 
                or applicable laws. We will notify you of any material changes by posting the updated 
                policy on our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
              <p className="text-gray-700">
                If you have questions about our use of cookies, please contact us:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <p className="text-gray-700">
                  <strong>SWENLOG Privacy Team</strong><br />
                  Email: privacy@swenlog.com<br />
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

export default CookiePolicyPage;