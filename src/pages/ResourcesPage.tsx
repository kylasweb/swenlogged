import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ResourcesAIAssistantSection from '../components/resources/ResourcesAIAssistantSection';
import ResourcesCategoryList from '../components/resources/ResourcesCategoryList';
import ResourcesFeaturedSection from '../components/resources/ResourcesFeaturedSection';
import { resourceCategories } from '../data/resourceCategories';

const ResourcesPage = () => {
  useEffect(() => {
    // Load Puter.js script
    const script = document.createElement('script');
    script.src = 'https://js.puter.com/v2/';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.head.querySelector('script[src="https://js.puter.com/v2/"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <>
      <Header />
      <main className="pt-16">
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-blue-600">Resources</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Knowledge to Power Your Business
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Explore our comprehensive collection of tools, guides, and AI-powered solutions to optimize your logistics operations.
              </p>
            </div>
            <ResourcesAIAssistantSection />
            <ResourcesCategoryList />
            <ResourcesFeaturedSection />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ResourcesPage;
