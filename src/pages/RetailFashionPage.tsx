
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ICONS } from '@/components/icons';

const RetailFashionPage = () => {
  const Icon = ICONS['Archive'];

  return (
    <>
      <Header />
      <main className="pt-16">
        <div className="bg-blue-800 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Icon className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-5xl font-bold">Retail & Fashion</h1>
            <p className="text-xl mt-4 opacity-90">Fast-paced logistics solutions to keep up with consumer demand and seasonal trends.</p>
          </div>
        </div>
        <article className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 prose lg:prose-xl">
            <p>In the fast-moving world of retail and fashion, speed and accuracy are key. We provide agile logistics solutions, including e-commerce fulfillment and store distribution, to help you stay ahead of trends.</p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default RetailFashionPage;
