
import { FileText, BookOpen, Podcast } from 'lucide-react';

const FeaturedResources = () => {
  return (
    <div className="mx-auto mt-16 max-w-2xl lg:max-w-4xl">
      <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Featured Resources</h3>
      <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
        <div className="relative pl-16">
          <dt className="text-base font-semibold leading-7 text-gray-900">
            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
              <FileText className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            Whitepaper: The Future of Supply Chains
          </dt>
          <dd className="mt-2 text-base leading-7 text-gray-600">An in-depth look at the trends shaping modern logistics.</dd>
        </div>
        
        <div className="relative pl-16">
          <dt className="text-base font-semibold leading-7 text-gray-900">
            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
              <BookOpen className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            Guide: International Shipping Checklist
          </dt>
          <dd className="mt-2 text-base leading-7 text-gray-600">A comprehensive guide to help you navigate the complexities of international shipping.</dd>
        </div>
        
        <div className="relative pl-16">
          <dt className="text-base font-semibold leading-7 text-gray-900">
            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
              <Podcast className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            Podcast: Logistics Unlocked
          </dt>
          <dd className="mt-2 text-base leading-7 text-gray-600">Tune in to our podcast for expert interviews and industry insights.</dd>
        </div>
      </dl>
    </div>
  );
};

export default FeaturedResources;
