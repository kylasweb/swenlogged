
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { defaultIndustriesData } from '@/data/defaults';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ICONS } from '@/components/icons';

const IndustryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [data] = useLocalStorage('industriesData', defaultIndustriesData);
  
  const industry = data.industries.find(i => i.slug === slug);

  if (!industry) {
    return (
      <>
        <Header />
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
            <h1 className="text-4xl font-bold">404 - Industry Not Found</h1>
            <p className="mt-4 text-lg">The industry page you are looking for does not exist.</p>
            <Link to="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Go to Homepage
            </Link>
        </div>
        <Footer />
      </>
    );
  }

  const Icon = ICONS[industry.icon] || (() => null);

  return (
    <>
      <Header />
      <main className="pt-16">
        <div className="bg-blue-800 text-white py-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <Icon className="h-16 w-16 mx-auto mb-4" />
                <h1 className="text-5xl font-bold">{industry.title}</h1>
                <p className="text-xl mt-4 opacity-90">{industry.description}</p>
            </div>
        </div>
        <article className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 prose lg:prose-xl">
                <p>{industry.content}</p>
            </div>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default IndustryPage;
