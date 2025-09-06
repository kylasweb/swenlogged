
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ICONS } from '@/components/icons';

const AutomotivePage = () => {
  const Icon = ICONS['Truck'];

  return (
    <>
      <Header />
      <main className="pt-16">
        <div className="bg-blue-800 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Icon className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-5xl font-bold">Automotive</h1>
            <p className="text-xl mt-4 opacity-90">Just-in-time delivery and specialized handling for the automotive supply chain.</p>
          </div>
        </div>
        <article className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 prose lg:prose-xl">
            <p>Our automotive logistics solutions are designed to meet the high-pressure demands of the automotive industry. We provide reliable and efficient transportation for parts and finished vehicles, ensuring your supply chain runs smoothly.</p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default AutomotivePage;
