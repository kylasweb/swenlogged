
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import ClientShowcase from '../components/ClientShowcase';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import LiveChat from '../components/LiveChat';
import React, { Suspense } from 'react';
const AIChatConsole = React.lazy(()=> import('@/components/ai/AIChatConsole'));

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <About />
      <ClientShowcase />
      <Contact />
      <Footer />
      <LiveChat />
      <div className="pt-2">
        <h2 className="text-lg font-semibold mb-2">AI Chat (Preview)</h2>
        <Suspense fallback={<div className="text-sm text-muted-foreground">Loading AI console…</div>}>
          <AIChatConsole />
        </Suspense>
      </div>
    </div>
  );
};

export default Index;
