
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ICONS } from '@/components/icons';

const GroundTransportationPage = () => {
  const Icon = ICONS['Truck'];

  return (
    <>
      <Header />
      <main className="pt-16">
        <div className="bg-gray-100 py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Icon className="h-16 w-16 text-blue-800 mx-auto mb-4" />
            <h1 className="text-5xl font-bold text-gray-900">Ground Transportation</h1>
            <p className="text-xl mt-4 text-gray-600">Comprehensive trucking and rail services for domestic and cross-border transportation needs.</p>
          </div>
        </div>
        <article className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
              <ul className="space-y-4">
                <li className="flex items-center text-lg text-gray-700">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-4 flex-shrink-0"></div>
                  LTL & FTL services
                </li>
                <li className="flex items-center text-lg text-gray-700">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-4 flex-shrink-0"></div>
                  Cross-docking
                </li>
                <li className="flex items-center text-lg text-gray-700">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-4 flex-shrink-0"></div>
                  Last-mile delivery
                </li>
                <li className="flex items-center text-lg text-gray-700">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-4 flex-shrink-0"></div>
                  Specialized equipment
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Us?</h2>
              <p className="text-lg text-gray-700">With our extensive network and deep expertise in ground transportation, we provide reliable and cost-effective solutions tailored to your specific needs. Our dedicated team is available 24/7 to ensure your shipments are handled with the utmost care and efficiency.</p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default GroundTransportationPage;
