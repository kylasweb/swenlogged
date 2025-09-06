
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import ClientShowcase from '../components/ClientShowcase';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import LiveChat from '../components/LiveChat';

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
    </div>
  );
};

export default Index;
