
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ICONS } from '@/components/icons';

const AirFreightPage = () => {
  const Icon = ICONS['Plane'];

  return (
    <>
      <Header />
      <main className="pt-16">
        <div className="bg-gray-100 py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Icon className="h-16 w-16 text-blue-800 mx-auto mb-4" />
            <h1 className="text-5xl font-bold text-gray-900">Air Freight</h1>
            <p className="text-xl mt-4 text-gray-600">Fast, reliable air cargo services for time-sensitive shipments with global network coverage.</p>
          </div>
        </div>
        <article className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
              <ul className="space-y-4">
                <li className="flex items-center text-lg text-gray-700">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-4 flex-shrink-0"></div>
                  Express delivery
                </li>
                <li className="flex items-center text-lg text-gray-700">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-4 flex-shrink-0"></div>
                  Temperature controlled
                </li>
                <li className="flex items-center text-lg text-gray-700">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-4 flex-shrink-0"></div>
                  Dangerous goods handling
                </li>
                <li className="flex items-center text-lg text-gray-700">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-4 flex-shrink-0"></div>
                  Charter services
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Us?</h2>
              <p className="text-lg text-gray-700">With our extensive network and deep expertise in air freight, we provide reliable and cost-effective solutions tailored to your specific needs. Our dedicated team is available 24/7 to ensure your shipments are handled with the utmost care and efficiency.</p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default AirFreightPage;
