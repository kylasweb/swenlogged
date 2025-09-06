import React from 'react';
import { ArrowRight, Globe, Clock, Shield } from 'lucide-react';
import { ComponentConfig } from '@measured/puck';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  ctaText: string;
  ctaLink: string;
  showStats: boolean;
}

export const HeroSection: ComponentConfig<HeroSectionProps>['render'] = ({
  title,
  subtitle,
  description,
  backgroundImage,
  ctaText,
  ctaLink,
  showStats
}) => {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              {title}
              <span className="block text-blue-200">{subtitle}</span>
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              {description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-blue-800 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold flex items-center justify-center">
                {ctaText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-800 transition-colors font-semibold">
                View Our Services
              </button>
            </div>

            {showStats && (
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <Globe className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                  <div className="text-2xl font-bold">150+</div>
                  <div className="text-sm text-blue-200">Countries Served</div>
                </div>
                <div className="text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm text-blue-200">Customer Support</div>
                </div>
                <div className="text-center">
                  <Shield className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                  <div className="text-2xl font-bold">99.9%</div>
                  <div className="text-sm text-blue-200">On-Time Delivery</div>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <img
              src={backgroundImage}
              alt="Global logistics and shipping"
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white text-blue-800 p-6 rounded-lg shadow-lg">
              <div className="text-2xl font-bold">10+ Years</div>
              <div className="text-sm">Industry Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};