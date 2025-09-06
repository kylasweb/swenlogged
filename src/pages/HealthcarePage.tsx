
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ICONS } from '@/components/icons';

const HealthcarePage = () => {
  const Icon = ICONS['Heart'];

  return (
    <>
      <Header />
      <main className="pt-16">
        <div className="bg-blue-800 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Icon className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-5xl font-bold">Healthcare</h1>
            <p className="text-xl mt-4 opacity-90">Temperature-controlled and compliant shipping for pharmaceuticals and medical devices.</p>
          </div>
        </div>
        <article className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 prose lg:prose-xl">
            <p>Our healthcare logistics services are fully compliant with industry regulations. We offer temperature-controlled shipping, secure warehousing, and specialized handling for pharmaceuticals, medical devices, and other healthcare products.</p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default HealthcarePage;
