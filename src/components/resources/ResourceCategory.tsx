
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Resource {
  title: string;
  description: string;
  link?: string;
}

interface ResourceCategoryProps {
  title: string;
  icon: LucideIcon;
  color: string;
  resources: Resource[];
}

const ResourceCategory = ({ title, icon: Icon, color, resources }: ResourceCategoryProps) => {
  const getResourceLink = (resourceTitle: string) => {
    switch (resourceTitle) {
      case 'Freight Rate Calculator':
        return '/tools/freight-calculator';
      case 'Container Load Optimizer':
        return '/tools/container-optimizer';
      case 'Smart Route Optimizer':
        return '/tools/route-optimizer';
      case 'Document Scanner & Processor':
        return '/tools/document-scanner';
      case 'Marine Traffic Monitor':
        return '/tools/marine-traffic';
      default:
        return '#';
    }
  };

  return (
    <div className="mb-16">
      <div className="flex items-center mb-8">
        <div className={`${color} p-3 rounded-lg mr-4`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <div key={resource.title} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h4>
            <p className="text-gray-600 mb-4">{resource.description}</p>
            {getResourceLink(resource.title) !== '#' ? (
              <Link 
                to={getResourceLink(resource.title)}
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Access Tool →
              </Link>
            ) : (
              <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                Access Tool →
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceCategory;
