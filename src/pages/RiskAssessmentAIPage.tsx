import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, Cloud, Navigation, Eye, Clock, TrendingUp, Users } from "lucide-react";
import RiskAssessmentAI from "@/components/resources/RiskAssessmentAI";
import SEO from "@/components/SEO";

const RiskAssessmentAIPage = () => {
  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Comprehensive Risk Analysis",
      description: "AI analyzes weather patterns, security threats, and logistical risks across all transport modes"
    },
    {
      icon: <Cloud className="h-6 w-6" />,
      title: "Real-time Weather Monitoring",
      description: "Continuous weather data integration with predictive analytics for route optimization"
    },
    {
      icon: <Navigation className="h-6 w-6" />,
      title: "Route Optimization",
      description: "AI-powered route suggestions with risk-weighted decision making"
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Predictive Risk Assessment",
      description: "Machine learning models predict potential disruptions before they occur"
    }
  ];

  const transportModes = [
    {
      mode: "Sea Freight",
      icon: "🚢",
      risks: ["Weather patterns", "Piracy threats", "Port congestion", "Geopolitical issues"],
      coverage: "95% of global trade routes"
    },
    {
      mode: "Air Freight",
      icon: "✈️",
      risks: ["Weather conditions", "Airspace restrictions", "Security protocols", "Fuel costs"],
      coverage: "500+ airports worldwide"
    },
    {
      mode: "Ground Transport",
      icon: "🚛",
      risks: ["Road conditions", "Traffic congestion", "Border delays", "Theft risks"],
      coverage: "Major highways and corridors"
    },
    {
      mode: "Rail Transport",
      icon: "🚂",
      risks: ["Track conditions", "Scheduling conflicts", "Infrastructure issues", "Weather impact"],
      coverage: "Intercontinental rail networks"
    }
  ];

  const benefits = [
    {
      title: "Reduce Delays",
      description: "Proactive risk identification prevents costly shipment delays",
      icon: <Clock className="h-6 w-6" />,
      stat: "40% fewer delays"
    },
    {
      title: "Cost Optimization",
      description: "Optimize routes and timing to reduce transportation costs",
      icon: <TrendingUp className="h-6 w-6" />,
      stat: "25% cost savings"
    },
    {
      title: "Enhanced Safety",
      description: "Minimize risks to cargo, crew, and vehicles through predictive analysis",
      icon: <Shield className="h-6 w-6" />,
      stat: "90% risk reduction"
    },
    {
      title: "Real-time Alerts",
      description: "Instant notifications of changing conditions and emerging risks",
      icon: <AlertTriangle className="h-6 w-6" />,
      stat: "24/7 monitoring"
    }
  ];

  const testimonials = [
    {
      name: "Captain Maria Santos",
      role: "Fleet Operations Manager",
      company: "Global Shipping Lines",
      content: "The AI risk assessment has transformed how we plan our maritime routes. We've avoided several major weather events and reduced our insurance claims by 60%."
    },
    {
      name: "David Chen",
      role: "Logistics Director",
      company: "Air Cargo International",
      content: "The predictive capabilities are incredible. We now receive alerts about potential airspace restrictions and weather issues hours before they impact our flights."
    },
    {
      name: "Sarah Johnson",
      role: "Supply Chain Risk Manager",
      company: "Manufacturing Solutions Inc",
      content: "This tool has become essential for our risk management strategy. The comprehensive analysis helps us make informed decisions about route selection and timing."
    }
  ];

  return (
    <>
      <SEO
        title="AI Risk Assessment - Weather & Route Analysis | SWENLOG"
        description="Advanced AI-powered risk assessment for shipping routes. Analyze weather patterns, security threats, and logistical risks with real-time monitoring and predictive analytics."
        keywords="AI risk assessment, shipping risks, weather analysis, route optimization, predictive analytics, supply chain security, logistics monitoring"
        canonical="/resources/risk-assessment-ai"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-red-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Shield className="h-12 w-12 text-blue-600" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                AI Risk Assessment
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Harness the power of artificial intelligence to identify, analyze, and mitigate
              risks in your supply chain. From weather patterns to security threats, our AI
              provides comprehensive risk assessments for safer, more reliable shipping.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Shield className="h-5 w-5 mr-2" />
                Start Risk Assessment
              </Button>
              <Button size="lg" variant="outline">
                <Eye className="h-5 w-5 mr-2" />
                View Live Monitoring
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
              Advanced AI Risk Analysis
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI combines multiple data sources and predictive models to provide
              the most comprehensive risk assessment available
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

      {/* Transport Modes Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Transport Coverage
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Risk assessment for all major transport modes with mode-specific analysis
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {transportModes.map((transport, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{transport.icon}</div>
                    <div>
                      <CardTitle className="text-xl">{transport.mode}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {transport.coverage}
                  </CardDescription>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-gray-900">Key Risk Factors:</h4>
                    <div className="flex flex-wrap gap-1">
                      {transport.risks.map((risk, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {risk}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Assessment Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Interactive AI Assessment
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Experience the power of AI-driven risk analysis with our interactive assessment tool.
              Get instant risk evaluations and mitigation strategies for your routes.
            </p>
          </div>

          <RiskAssessmentAI />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Measurable Business Impact
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real results from AI-powered risk assessment and mitigation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-gradient-to-br from-blue-100 to-red-100 rounded-full text-blue-600">
                      {benefit.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-2">{benefit.title}</CardTitle>
                  <div className="text-3xl font-bold text-blue-600 mb-4">{benefit.stat}</div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How AI Risk Assessment Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our advanced AI processes multiple data streams for comprehensive risk analysis
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-center flex items-center justify-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  Data Collection
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  AI aggregates weather data, security reports, historical incidents,
                  and real-time conditions from multiple sources.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center flex items-center justify-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  Risk Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Machine learning models analyze patterns and predict potential
                  risks based on historical data and current conditions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center flex items-center justify-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  Route Optimization
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  AI suggests optimal routes and timing, factoring in all identified
                  risks and mitigation strategies.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center flex items-center justify-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">4</span>
                  </div>
                  Continuous Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Real-time monitoring provides alerts for changing conditions
                  and recommends adjustments as needed.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Logistics Professionals
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how organizations are using AI risk assessment to improve their operations
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
            Ready to Minimize Shipping Risks?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Start using AI-powered risk assessment to protect your shipments and optimize your routes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              <Shield className="h-5 w-5 mr-2" />
              Start Risk Assessment
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Users className="h-5 w-5 mr-2" />
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default RiskAssessmentAIPage;
