
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ICONS } from '@/components/icons';

const ManufacturingPage = () => {
  const Icon = ICONS['Wrench'];

  return (
    <>
      <Header />
      <main className="pt-16">
        <div className="bg-blue-800 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Icon className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-5xl font-bold">Manufacturing</h1>
            <p className="text-xl mt-4 opacity-90">Streamlined logistics for raw materials and finished goods to keep production lines moving.</p>
          </div>
        </div>
        <article className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 prose lg:prose-xl">
            <p>We support your manufacturing operations with end-to-end logistics for raw materials and finished products. Our solutions are designed to optimize your supply chain, reduce costs, and minimize downtime.</p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default ManufacturingPage;
