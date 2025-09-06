import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { Globe, Users, Handshake, Award, Network, Building } from 'lucide-react';

const NetworksPage = () => {
  const partnershipTypes = [
    {
      title: "Strategic Partners",
      icon: Handshake,
      items: ["Global shipping lines", "International freight forwarders", "Customs clearing agents"],
      description: "Long-term partnerships with established logistics providers"
    },
    {
      title: "Technology Partners",
      icon: Network,
      items: ["ERP system integrators", "Track & trace solution providers", "Digital logistics platforms"],
      description: "Innovation-focused partnerships for digital transformation"
    },
    {
      title: "Service Partners",
      icon: Building,
      items: ["Warehouse operators", "Last-mile delivery partners", "Specialized transport providers"],
      description: "Operational partnerships for comprehensive service delivery"
    }
  ];

  const globalReach = [
    {
      region: "Asia Pacific",
      countries: ["India", "China", "Singapore", "Malaysia", "Thailand", "Vietnam", "Indonesia"],
      hubs: ["Mumbai", "Chennai", "Singapore", "Hong Kong", "Shanghai"]
    },
    {
      region: "Middle East & Africa",
      countries: ["UAE", "Saudi Arabia", "Qatar", "Egypt", "South Africa", "Kenya"],
      hubs: ["Dubai", "Jebel Ali", "Riyadh", "Cairo", "Cape Town"]
    },
    {
      region: "Europe",
      countries: ["Germany", "UK", "Netherlands", "France", "Italy", "Spain"],
      hubs: ["Hamburg", "Rotterdam", "Felixstowe", "Le Havre", "Antwerp"]
    },
    {
      region: "Americas",
      countries: ["USA", "Canada", "Mexico", "Brazil", "Argentina", "Chile"],
      hubs: ["Los Angeles", "New York", "Long Beach", "Santos", "Buenos Aires"]
    }
  ];

  const capabilities = [
    {
      title: "Ocean Freight Network",
      description: "Access to major shipping lines and global port facilities",
      partners: "50+ shipping line partners"
    },
    {
      title: "Air Cargo Network",
      description: "Partnerships with leading airlines and cargo carriers",
      partners: "30+ airline partners"
    },
    {
      title: "Ground Transportation",
      description: "Extensive trucking and rail networks across continents",
      partners: "200+ transport providers"
    },
    {
      title: "Warehousing Network",
      description: "Strategic warehouse locations for efficient distribution",
      partners: "100+ warehouse facilities"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Global Partnership Network</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Strong partnerships enable us to deliver comprehensive logistics solutions across the globe. Our extensive network ensures seamless service delivery wherever your business takes you.
            </p>
          </div>

          {/* Partnership Types */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Partnership Framework</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {partnershipTypes.map((partner, index) => {
                const IconComponent = partner.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-8">
                      <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                        <IconComponent className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">{partner.title}</h3>
                      <p className="text-gray-600 mb-6">{partner.description}</p>
                      <div className="space-y-3">
                        {partner.items.map((item, idx) => (
                          <div key={idx} className="bg-blue-50 text-blue-800 px-4 py-2 rounded-lg text-sm font-medium">
                            {item}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Global Reach */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Global Reach</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {globalReach.map((region, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Globe className="h-6 w-6 text-blue-600 mr-2" />
                      <h3 className="text-lg font-bold text-gray-900">{region.region}</h3>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Countries:</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        {region.countries.map((country, idx) => (
                          <div key={idx} className="flex items-center">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                            {country}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Major Hubs:</h4>
                      <div className="flex flex-wrap gap-1">
                        {region.hubs.map((hub, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            {hub}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Network Capabilities */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Network Capabilities</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {capabilities.map((capability, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{capability.title}</h3>
                    <p className="text-gray-600 mb-4">{capability.description}</p>
                    <div className="bg-blue-50 text-blue-800 px-4 py-2 rounded-lg text-sm font-medium inline-block">
                      {capability.partners}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Partnership Benefits */}
          <div className="bg-white rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Partnership Benefits</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Quality Assurance</h3>
                <p className="text-gray-600 text-sm">Vetted partners ensuring consistent service quality</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Global Coverage</h3>
                <p className="text-gray-600 text-sm">Comprehensive coverage across all major trade routes</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Local Expertise</h3>
                <p className="text-gray-600 text-sm">Local knowledge and cultural understanding</p>
              </div>
              
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Network className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Integrated Solutions</h3>
                <p className="text-gray-600 text-sm">Seamless integration across multiple service providers</p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-20 bg-blue-50 rounded-2xl p-12">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">150+</div>
                <div className="text-gray-700">Global Partners</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-700">Countries Served</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">200+</div>
                <div className="text-gray-700">Port Connections</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
                <div className="text-gray-700">Global Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NetworksPage;