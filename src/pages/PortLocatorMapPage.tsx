import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Ship, Plane, Truck, Globe, Clock, Shield, Users } from "lucide-react";
import PortLocatorMap from "@/components/resources/PortLocatorMap";
import SEO from "@/components/SEO";

const PortLocatorMapPage = () => {
  const features = [
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Coverage",
      description: "Access information about ports in over 150 countries worldwide"
    },
    {
      icon: <Ship className="h-6 w-6" />,
      title: "Multiple Transport Modes",
      description: "Sea ports, air ports, and inland terminals all in one place"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Real-time Updates",
      description: "Stay informed with the latest port information and schedules"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Verified Information",
      description: "Accurate and up-to-date port data from reliable sources"
    }
  ];

  const portTypes = [
    {
      type: "Sea Ports",
      icon: <Ship className="h-8 w-8" />,
      description: "Major container terminals and maritime facilities",
      count: "500+"
    },
    {
      type: "Air Ports",
      icon: <Plane className="h-8 w-8" />,
      description: "International airports with cargo capabilities",
      count: "200+"
    },
    {
      type: "Inland Ports",
      icon: <Truck className="h-8 w-8" />,
      description: "Rail and road terminals for domestic distribution",
      count: "300+"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Logistics Manager",
      company: "Global Trade Solutions",
      content: "The Port Locator Map has revolutionized how we plan our shipping routes. The detailed information helps us make informed decisions quickly."
    },
    {
      name: "Michael Chen",
      role: "Supply Chain Director",
      company: "Pacific Shipping Co.",
      content: "Having all port information in one place saves us hours of research. The connectivity details are particularly valuable for multimodal transport."
    },
    {
      name: "Emma Rodriguez",
      role: "Operations Manager",
      company: "Intermodal Logistics",
      content: "The interactive features and real-time updates keep our team informed about port conditions and help us avoid delays."
    }
  ];

  return (
    <>
      <SEO
        title="Port Locator Map - Find Global Ports & Terminals | SWENLOG"
        description="Interactive port locator map with detailed information about sea ports, air ports, and inland terminals worldwide. Find capacity, services, and connectivity for your shipping needs."
        keywords="port locator, shipping ports, container terminals, air cargo, inland ports, maritime facilities, port capacity, shipping routes"
        canonical="/resources/port-locator-map"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <MapPin className="h-12 w-12 text-blue-600" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Port Locator Map
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover and explore major ports worldwide with our interactive locator.
              Find detailed information about facilities, services, capacity, and connectivity
              to optimize your shipping and logistics operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <MapPin className="h-5 w-5 mr-2" />
                Explore Ports
              </Button>
              <Button size="lg" variant="outline">
                <Globe className="h-5 w-5 mr-2" />
                View Global Map
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Port Locator?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive port information at your fingertips to streamline your logistics planning
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Port Types Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Port Coverage
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Access detailed information about all types of transportation hubs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {portTypes.map((portType, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-gradient-to-br from-blue-100 to-green-100 rounded-full text-blue-600">
                      {portType.icon}
                    </div>
                  </div>
                  <CardTitle className="text-2xl mb-2">{portType.type}</CardTitle>
                  <div className="text-3xl font-bold text-blue-600 mb-4">{portType.count}</div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {portType.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Interactive Port Locator
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Use our advanced search and filtering tools to find the perfect port for your needs
            </p>
          </div>

          <PortLocatorMap />
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Key Benefits
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Streamline your logistics operations with comprehensive port data
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Save Time</h3>
              <p className="text-gray-600">
                Quickly find and compare ports without extensive research
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Reduce Risk</h3>
              <p className="text-gray-600">
                Make informed decisions with accurate port information
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
              <p className="text-gray-600">
                Share port information easily with your logistics team
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trusted by logistics professionals worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="flex text-yellow-400 mb-2">
                      {'★'.repeat(5)}
                    </div>
                    <p className="text-gray-600 italic">"{testimonial.content}"</p>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-sm text-blue-600">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Optimize Your Shipping Routes?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Start exploring ports worldwide and find the best options for your logistics needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              <MapPin className="h-5 w-5 mr-2" />
              Start Exploring Ports
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Users className="h-5 w-5 mr-2" />
              Contact Our Team
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default PortLocatorMapPage;
