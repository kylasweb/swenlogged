import React from 'react';
import { Card, CardContent } from './ui/card';

const ClientShowcase = () => {
  const industries = [
    {
      title: "Automotive",
      description: "Supply chain solutions for automotive manufacturers and suppliers",
      clients: ["Leading automotive OEMs", "Tier-1 & Tier-2 suppliers", "Auto component manufacturers"]
    },
    {
      title: "Pharmaceutical",
      description: "Temperature-controlled logistics for healthcare and pharmaceutical companies",
      clients: ["Global pharma companies", "API manufacturers", "Medical device companies"]
    },
    {
      title: "Engineering",
      description: "Heavy equipment and machinery transportation solutions",
      clients: ["Engineering contractors", "Heavy machinery manufacturers", "Industrial equipment suppliers"]
    },
    {
      title: "Fashion & Lifestyle",
      description: "Fast fashion and lifestyle product distribution",
      clients: ["Fashion retailers", "Lifestyle brands", "Garment exporters"]
    },
    {
      title: "FMCG",
      description: "Consumer goods distribution and warehousing",
      clients: ["FMCG giants", "Food & beverage companies", "Consumer products manufacturers"]
    },
    {
      title: "Electronics",
      description: "High-value electronics and technology product logistics",
      clients: ["Electronics manufacturers", "Tech companies", "Consumer electronics brands"]
    },
    {
      title: "Agricultural Produce",
      description: "Fresh produce and agricultural commodity handling",
      clients: ["Agricultural exporters", "Food processing companies", "Fresh produce suppliers"]
    },
    {
      title: "Chemicals & Allied",
      description: "Safe handling of chemicals and hazardous materials",
      clients: ["Chemical manufacturers", "Petrochemical companies", "Specialty chemicals suppliers"]
    },
    {
      title: "Marine",
      description: "Marine equipment and offshore logistics solutions",
      clients: ["Maritime companies", "Offshore equipment suppliers", "Port operators"]
    }
  ];


  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Industries Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Industries We Serve</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              SWENLOG provides specialized logistics solutions across diverse industries, delivering tailored services that meet unique sector requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{industry.title}</h3>
                  <p className="text-gray-600 mb-4">{industry.description}</p>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Typical Clients:</h4>
                    <ul className="space-y-1">
                      {industry.clients.map((client, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                          {client}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>


        {/* Stats Section */}
        <div className="mt-20 bg-blue-50 rounded-2xl p-12">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-700">Active Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-700">Strategic Partners</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
              <div className="text-gray-700">Destinations Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-700">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientShowcase;