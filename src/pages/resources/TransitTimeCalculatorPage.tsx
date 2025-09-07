import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TransitTimeCalculator from '@/components/resources/TransitTimeCalculator';
import SEO from '@/components/SEO';

const TransitTimeCalculatorPage = () => {
  return (
    <>
      <SEO
        title="Transit Time Calculator | SWENLOG"
        description="Calculate estimated transit times for shipments between any two locations worldwide. Get accurate delivery time estimates for air, sea, and ground transportation."
        keywords="transit time calculator, shipping time, delivery estimate, logistics calculator, freight transit time"
        type="website"
      />

      <Header />
      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="py-12">
          <TransitTimeCalculator />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TransitTimeCalculatorPage;
