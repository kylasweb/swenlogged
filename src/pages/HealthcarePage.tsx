
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ICONS } from '@/components/icons';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Thermometer, Shield, Clock, Truck, FileCheck, Users, Award } from 'lucide-react';
import SEO from '@/components/SEO';

const HealthcarePage = () => {
  const Icon = ICONS['Heart'];

  const specializations = [
    {
      title: "Pharmaceuticals",
      description: "Temperature-controlled transport for vaccines, biologics, and medications",
      icon: Thermometer,
      features: ["GDP compliance", "Cold chain validation", "Real-time monitoring"]
    },
    {
      title: "Medical Devices",
      description: "Secure handling and transportation of sensitive medical equipment",
      icon: Shield,
      features: ["Sterile packaging", "Impact protection", "Regulatory compliance"]
    },
    {
      title: "Healthcare Supplies",
      description: "Reliable distribution of medical consumables and equipment",
      icon: Truck,
      features: ["Priority routing", "Track & trace", "Emergency delivery"]
    },
    {
      title: "Clinical Trials",
      description: "Specialized logistics for clinical trial materials and samples",
      icon: FileCheck,
      features: ["Chain of custody", "Documentation", "Quality assurance"]
    }
  ];

  const compliance = [
    "GDP (Good Distribution Practice) compliance",
    "WHO guidelines adherence",
    "FDA regulatory requirements",
    "ISO 9001:2015 certification",
    "Temperature mapping and validation",
    "Comprehensive documentation",
    "Quality management systems",
    "Emergency response protocols"
  ];

  const capabilities = [
    {
      title: "Cold Chain Logistics",
      description: "Advanced temperature-controlled transportation with 24/7 monitoring",
      details: ["Refrigerated vehicles", "Real-time temperature tracking", "Backup power systems"]
    },
    {
      title: "Hazardous Materials",
      description: "Certified handling of dangerous goods and hazardous substances",
      details: ["IATA certification", "UN compliance", "Specialized packaging"]
    },
    {
      title: "Express Healthcare Delivery",
      description: "Priority services for time-critical medical shipments",
      details: ["Same-day delivery", "Emergency routing", "Dedicated handlers"]
    }
  ];

  return (
    <>
      <SEO
        title="Healthcare Logistics Solutions | SWENLOG"
        description="Specialized healthcare logistics including pharmaceutical transport, medical device distribution, and cold chain management with full regulatory compliance."
        keywords="healthcare logistics, pharmaceutical transport, medical devices, cold chain, GDP compliance, healthcare supply chain"
        type="website"
      />

      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <Icon className="h-20 w-20 mx-auto mb-6 text-red-200" />
            <h1 className="text-5xl font-bold mb-6">Healthcare Logistics Excellence</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Temperature-controlled and compliant shipping for pharmaceuticals and medical devices.
              Your health depends on reliable logistics - we never compromise on safety, compliance, or timeliness.
            </p>
          </div>
        </div>

        {/* Specializations Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Healthcare Specializations</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive logistics solutions for every aspect of healthcare supply chains
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {specializations.map((spec, index) => {
                const SpecIcon = spec.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-8">
                      <SpecIcon className="h-12 w-12 text-red-600 mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{spec.title}</h3>
                      <p className="text-gray-600 mb-4">{spec.description}</p>
                      <ul className="space-y-2">
                        {spec.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-gray-700">
                            <div className="w-2 h-2 bg-red-600 rounded-full mr-3 flex-shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Compliance Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Regulatory Compliance & Safety</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Full compliance with healthcare industry standards and regulations
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {compliance.map((item, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <Award className="h-6 w-6 text-red-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-900 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Advanced Capabilities</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                State-of-the-art logistics technology and processes for healthcare
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {capabilities.map((capability, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{capability.title}</h3>
                    <p className="text-gray-600 mb-6">{capability.description}</p>
                    <ul className="space-y-2">
                      {capability.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center text-gray-700">
                          <div className="w-2 h-2 bg-red-600 rounded-full mr-3 flex-shrink-0"></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-20 bg-red-900 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Trusted by Healthcare Leaders</h2>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Serving hospitals, pharmaceutical companies, and medical device manufacturers worldwide
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">99.9%</div>
                <div className="text-red-200">On-time delivery rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-red-200">Monitoring & support</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-red-200">Regulatory compliance</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Secure Your Healthcare Supply Chain?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Contact our healthcare logistics specialists to discuss your specific requirements
              and ensure your critical medical shipments are handled with the highest standards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                Get Healthcare Quote
              </button>
              <button className="border-2 border-red-600 text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-colors">
                Speak to Expert
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HealthcarePage;
