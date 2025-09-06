
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { defaultServicesData } from '@/data/defaults';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ICONS } from '@/components/icons';

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [data] = useLocalStorage('servicesData', defaultServicesData);
  
  const service = data.services.find(s => s.slug === slug);

  if (!service) {
    return (
      <>
        <Header />
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
            <h1 className="text-4xl font-bold">404 - Service Not Found</h1>
            <p className="mt-4 text-lg">The service page you are looking for does not exist.</p>
            <Link to="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Go to Homepage
            </Link>
        </div>
        <Footer />
      </>
    );
  }

  const Icon = ICONS[service.icon] || (() => null);

  return (
    <>
      <Header />
      <main className="pt-16">
        <div className="bg-gray-100 py-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <Icon className="h-16 w-16 text-blue-800 mx-auto mb-4" />
                <h1 className="text-5xl font-bold text-gray-900">{service.title}</h1>
                <p className="text-xl mt-4 text-gray-600">{service.description}</p>
            </div>
        </div>
        <article className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 grid md:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
                    <ul className="space-y-4">
                      {service.features.split('\n').map((feature) => (
                        <li key={feature} className="flex items-center text-lg text-gray-700">
                          <div className="w-3 h-3 bg-blue-600 rounded-full mr-4 flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                </div>
                <div>
                     <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Us?</h2>
                     <p className="text-lg text-gray-700">With our extensive network and deep expertise in {service.title.toLowerCase()}, we provide reliable and cost-effective solutions tailored to your specific needs. Our dedicated team is available 24/7 to ensure your shipments are handled with the utmost care and efficiency.</p>
                </div>
            </div>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default ServicePage;
