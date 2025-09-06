import React from 'react';
import { Ship, Plane, Truck, Package, Warehouse, Globe } from 'lucide-react';
import { ComponentConfig } from '@measured/puck';

interface Service {
  title: string;
  description: string;
  icon: string;
  link: string;
}

interface ServicesSectionProps {
  title: string;
  description: string;
  services: Service[];
}

const iconMap = {
  Ship,
  Plane,
  Truck,
  Package,
  Warehouse,
  Globe
};

export const ServicesSection: ComponentConfig<ServicesSectionProps>['render'] = ({
  title,
  description,
  services
}) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Package;
            
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-lg mb-6 mx-auto">
                  <IconComponent className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};