import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, TrendingUp, CheckCircle, Users, BarChart3, Globe, FileText } from "lucide-react";
import SupplyChainRiskAssessment from "@/components/resources/SupplyChainRiskAssessment";
import SEO from "@/components/SEO";

const SupplyChainRiskAssessmentPage = () => {
  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Comprehensive Risk Analysis",
      description: "Evaluate risks across geopolitical, operational, financial, logistical, and compliance dimensions"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Quantitative Scoring",
      description: "Get objective risk scores based on impact and probability assessments"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Actionable Insights",
      description: "Receive specific recommendations and mitigation strategies for identified risks"
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Continuous Monitoring",
      description: "Establish frameworks for ongoing risk monitoring and management"
    }
  ];

  const riskCategories = [
    {
      category: "Geopolitical Risks",
      icon: <Globe className="h-8 w-8" />,
      description: "Political instability, trade restrictions, sanctions, and regional conflicts",
      factors: ["Political Instability", "Trade Restrictions", "International Sanctions", "Regional Conflicts"]
    },
    {
      category: "Operational Risks",
      icon: <BarChart3 className="h-8 w-8" />,
      description: "Supplier capacity, quality control, labor issues, and equipment failures",
      factors: ["Supplier Capacity", "Quality Control", "Labor Shortages", "Equipment Failure"]
    },
    {
      category: "Financial Risks",
      icon: <TrendingUp className="h-8 w-8" />,
      description: "Currency fluctuations, supplier financial health, and economic factors",
      factors: ["Currency Fluctuation", "Financial Health", "Payment Delays", "Economic Downturn"]
    },
    {
      category: "Logistical Risks",
      icon: <AlertTriangle className="h-8 w-8" />,
      description: "Transportation delays, infrastructure issues, and customs clearance",
      factors: ["Transportation Delays", "Infrastructure Issues", "Customs Clearance", "Natural Disasters"]
    },
    {
      category: "Compliance Risks",
      icon: <FileText className="h-8 w-8" />,
      description: "Regulatory changes, environmental laws, and data privacy requirements",
      factors: ["Regulatory Changes", "Environmental Laws", "Labor Compliance", "Data Privacy"]
    }
  ];

  const benefits = [
    {
      title: "Proactive Risk Management",
      description: "Identify and address potential risks before they impact your operations",
      icon: <Shield className="h-6 w-6" />
    },
    {
      title: "Cost Reduction",
      description: "Minimize losses from supply chain disruptions through early intervention",
      icon: <TrendingUp className="h-6 w-6" />
    },
    {
      title: "Business Continuity",
      description: "Ensure uninterrupted operations with comprehensive risk mitigation plans",
      icon: <CheckCircle className="h-6 w-6" />
    },
    {
      title: "Stakeholder Confidence",
      description: "Build trust with investors and customers through demonstrated risk management",
      icon: <Users className="h-6 w-6" />
    }
  ];

  const testimonials = [
    {
      name: "Robert Chen",
      role: "Chief Supply Chain Officer",
      company: "Global Manufacturing Corp",
      content: "This risk assessment tool has transformed how we approach supplier risk management. We've reduced our exposure to supply chain disruptions by 40%."
    },
    {
      name: "Sarah Mitchell",
      role: "Risk Management Director",
      company: "International Retail Group",
      content: "The comprehensive analysis and actionable recommendations have been invaluable. It's helped us make data-driven decisions about our supplier relationships."
    },
    {
      name: "David Kumar",
      role: "Operations Manager",
      company: "Tech Solutions Inc",
      content: "The tool's ability to quantify risks and provide specific mitigation strategies has been a game-changer for our risk management framework."
    }
  ];

  return (
    <>
      <SEO
        title="Supply Chain Risk Assessment Tool | Identify & Mitigate Risks | SWENLOG"
        description="Comprehensive supply chain risk assessment tool. Evaluate geopolitical, operational, financial, logistical, and compliance risks. Get actionable mitigation strategies and monitoring frameworks."
        keywords="supply chain risk assessment, risk management, supplier risk, supply chain disruption, risk mitigation, business continuity, supplier evaluation"
        canonical="/resources/supply-chain-risk-assessment"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 via-white to-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Shield className="h-12 w-12 text-red-600" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Supply Chain Risk Assessment
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Identify, evaluate, and mitigate risks in your supply chain. Our comprehensive
              assessment tool helps you build resilience and ensure business continuity
              through data-driven risk management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-red-600 hover:bg-red-700">
                <Shield className="h-5 w-5 mr-2" />
                Start Risk Assessment
              </Button>
              <Button size="lg" variant="outline">
                <BarChart3 className="h-5 w-5 mr-2" />
                View Risk Categories
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
              Comprehensive Risk Assessment
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our tool evaluates risks across multiple dimensions to provide a complete picture
              of your supply chain vulnerabilities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-red-100 rounded-full text-red-600">
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

      {/* Risk Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Risk Categories Covered
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We analyze risks across five critical dimensions that can impact your supply chain
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {riskCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-red-100 to-orange-100 rounded-full text-red-600">
                      {category.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{category.category}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {category.description}
                  </CardDescription>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-gray-900">Key Factors:</h4>
                    <div className="flex flex-wrap gap-1">
                      {category.factors.map((factor, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {factor}
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
              Interactive Risk Assessment
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Use our advanced assessment tool to evaluate your suppliers and identify
              potential risks with detailed mitigation strategies
            </p>
          </div>

          <SupplyChainRiskAssessment />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Key Benefits
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transform your risk management approach with data-driven insights
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <div className="text-red-600">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how organizations are using our risk assessment tool to strengthen their supply chains
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
                    <div className="text-sm text-red-600">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Assessment Methodology
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Based on industry best practices and quantitative risk analysis
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Risk Identification</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <AlertTriangle className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-gray-600">
                  Comprehensive analysis of potential risk factors across all supply chain dimensions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Quantitative Scoring</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <BarChart3 className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-gray-600">
                  Objective risk scoring based on impact and probability assessments
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Mitigation Planning</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-gray-600">
                  Actionable mitigation strategies and continuous monitoring frameworks
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Strengthen Your Supply Chain Resilience
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Start assessing your supplier risks today and build a more resilient supply chain
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-gray-100">
              <Shield className="h-5 w-5 mr-2" />
              Begin Risk Assessment
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
              <Users className="h-5 w-5 mr-2" />
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default SupplyChainRiskAssessmentPage;
