
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ICONS } from '@/components/icons';

const TechnologyPage = () => {
  const Icon = ICONS['Zap'];

  return (
    <>
      <Header />
      <main className="pt-16">
        <div className="bg-blue-800 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Icon className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-5xl font-bold">Technology</h1>
            <p className="text-xl mt-4 opacity-90">Secure and efficient transport for high-value electronics and components.</p>
          </div>
        </div>
        <article className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 prose lg:prose-xl">
            <p>We offer secure, climate-controlled shipping and warehousing for sensitive and high-value technology products. Our robust security measures and real-time tracking give you peace of mind.</p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default TechnologyPage;
