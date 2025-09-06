
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { defaultServicesData } from '@/data/defaults';
import { ICONS } from './icons';
import { Link } from 'react-router-dom';

const Services = () => {
  const [servicesData] = useLocalStorage('servicesData', defaultServicesData);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {servicesData.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {servicesData.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.services.map((service) => {
            const Icon = ICONS[service.icon];
            return (
              <Link to={`/services/${service.slug}`} key={service.id} className="block bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    {Icon && <Icon className="h-8 w-8 text-blue-800" />}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 ml-4">{service.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.split('\n').map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <p className="mt-6 text-blue-800 font-semibold hover:text-blue-900 transition-colors">
                  Learn More →
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
