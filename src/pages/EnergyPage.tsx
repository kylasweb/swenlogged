
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ICONS } from '@/components/icons';

const EnergyPage = () => {
  const Icon = ICONS['Power'];

  return (
    <>
      <Header />
      <main className="pt-16">
        <div className="bg-blue-800 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Icon className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-5xl font-bold">Energy</h1>
            <p className="text-xl mt-4 opacity-90">Specialized logistics for the energy sector, including oversized and hazardous materials.</p>
          </div>
        </div>
        <article className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 prose lg:prose-xl">
            <p>We have the expertise and equipment to handle the unique logistics challenges of the energy sector. We can transport oversized equipment, hazardous materials, and provide support for remote project sites.</p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default EnergyPage;
