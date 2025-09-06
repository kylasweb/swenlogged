import React from 'react';
import { ComponentConfig } from '@measured/puck';

interface AboutSectionProps {
  title: string;
  description: string;
  image: string;
  stats: Array<{
    label: string;
    value: string;
  }>;
}

export const AboutSection: ComponentConfig<AboutSectionProps>['render'] = ({
  title,
  description,
  image,
  stats
}) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{title}</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {description}
            </p>
            
            {stats && stats.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <img
              src={image}
              alt={title}
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};