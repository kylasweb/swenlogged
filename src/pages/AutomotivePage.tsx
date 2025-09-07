
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ICONS } from '@/components/icons';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Truck, Clock, Shield, BarChart3, Users, Cog, ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';

const AutomotivePage = () => {
  const Icon = ICONS['Truck'];

  const challenges = [
    {
      title: "Just-in-Time Delivery",
      description: "Precise timing requirements for automotive parts and components",
      icon: Clock
    },
    {
      title: "Quality Assurance",
      description: "Maintaining product integrity throughout the supply chain",
      icon: Shield
    },
    {
      title: "Cost Optimization",
      description: "Balancing speed, reliability, and cost-effectiveness",
      icon: BarChart3
    },
    {
      title: "Global Sourcing",
      description: "Managing complex international supply chains",
      icon: Users
    }
  ];

  const solutions = [
    {
      title: "Dedicated Automotive Teams",
      description: "Specialized logistics professionals with automotive industry expertise",
      features: ["Industry-specific training", "Technical knowledge", "Quality certifications"]
    },
    {
      title: "Advanced Tracking Systems",
      description: "Real-time visibility and monitoring of automotive shipments",
      features: ["GPS tracking", "Temperature monitoring", "Impact detection", "ETA predictions"]
    },
    {
      title: "Specialized Equipment",
      description: "Purpose-built vehicles and handling equipment for automotive cargo",
      features: ["Air-ride suspensions", "Secure tie-down systems", "Climate-controlled transport"]
    },
    {
      title: "Regulatory Compliance",
      description: "Full compliance with automotive industry standards and regulations",
      features: ["IMDS compliance", "PPAP documentation", "Quality management systems"]
    }
  ];

  const services = [
    "Finished vehicle transportation",
    "Parts and components logistics",
    "Aftermarket parts distribution",
    "Cross-dock operations",
    "Vendor managed inventory",
    "Reverse logistics",
    "Import/export services",
    "Customs clearance"
  ];

  return (
    <>
      <SEO
        title="Automotive Logistics Solutions | SWENLOG"
        description="Comprehensive automotive logistics services including just-in-time delivery, specialized transport, and supply chain management for the automotive industry."
        keywords="automotive logistics, automotive supply chain, vehicle transportation, automotive parts, JIT delivery, automotive freight"
        type="website"
      />

      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <Icon className="h-20 w-20 mx-auto mb-6 text-blue-200" />
            <h1 className="text-5xl font-bold mb-6">Automotive Logistics Excellence</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Just-in-time delivery and specialized handling for the automotive supply chain.
              We understand the unique demands of automotive logistics and deliver solutions
              that keep your production lines moving.
            </p>
          </div>
        </div>

        {/* Key Challenges Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Industry Challenges We Solve</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The automotive industry faces unique logistics challenges that require specialized expertise
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {challenges.map((challenge, index) => {
                const ChallengeIcon = challenge.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <ChallengeIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{challenge.title}</h3>
                      <p className="text-gray-600">{challenge.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Automotive Solutions</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive logistics solutions designed specifically for the automotive industry
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {solutions.map((solution, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{solution.title}</h3>
                    <p className="text-gray-600 mb-6">{solution.description}</p>
                    <ul className="space-y-2">
                      {solution.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-gray-700">
                          <ArrowRight className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Services</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                End-to-end automotive logistics services tailored to your needs
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center">
                    <Cog className="h-6 w-6 text-blue-600 mr-3" />
                    <span className="text-gray-900 font-medium">{service}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-900 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Optimize Your Automotive Supply Chain?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Contact our automotive logistics experts to discuss your specific requirements
              and discover how we can improve your supply chain efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get Quote
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors">
                Contact Expert
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AutomotivePage;
