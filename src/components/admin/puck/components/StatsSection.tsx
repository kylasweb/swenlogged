import React from 'react';
import { Globe, Clock, Shield, Award, Package, Truck } from 'lucide-react';
import { ComponentConfig } from '@measured/puck';

interface Stat {
  label: string;
  value: string;
  icon: string;
}

interface StatsSectionProps {
  title: string;
  stats: Stat[];
}

const iconMap = {
  Globe,
  Clock,
  Shield,
  Award,
  Package,
  Truck
};

export const StatsSection: ComponentConfig<StatsSectionProps>['render'] = ({
  title,
  stats
}) => {
  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats?.map((stat, index) => {
            const IconComponent = iconMap[stat.icon as keyof typeof iconMap] || Award;
            
            return (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-lg mb-4 mx-auto">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};