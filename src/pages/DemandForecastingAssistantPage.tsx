import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, BarChart3, Target, Zap, Clock, Shield, Users } from "lucide-react";
import DemandForecastingAssistant from "@/components/resources/DemandForecastingAssistant";
import SEO from "@/components/SEO";

const DemandForecastingAssistantPage = () => {
  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Predictions",
      description: "Machine learning algorithms analyze historical data and market trends for accurate forecasting"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Real-time Market Analysis",
      description: "Continuous monitoring of market conditions and demand patterns"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Inventory Optimization",
      description: "Optimize stock levels and reduce carrying costs with predictive insights"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Visual Analytics",
      description: "Interactive charts and graphs for easy interpretation of forecast data"
    }
  ];

  const benefits = [
    {
      title: "Reduce Stockouts",
      description: "Predict demand spikes and ensure product availability",
      icon: <TrendingUp className="h-6 w-6" />,
      stat: "35% reduction"
    },
    {
      title: "Optimize Inventory",
      description: "Minimize excess inventory and carrying costs",
      icon: <Target className="h-6 w-6" />,
      stat: "25% cost savings"
    },
    {
      title: "Improve Cash Flow",
      description: "Better working capital management through accurate forecasting",
      icon: <BarChart3 className="h-6 w-6" />,
      stat: "20% improvement"
    },
    {
      title: "Increase Accuracy",
      description: "85%+ forecast accuracy with AI-powered analysis",
      icon: <Brain className="h-6 w-6" />,
      stat: "85% accuracy"
    }
  ];

  const industries = [
    "Electronics & Technology",
    "Automotive & Manufacturing",
    "Retail & Consumer Goods",
    "Food & Beverage",
    "Pharmaceuticals & Healthcare",
    "Industrial Equipment",
    "Fashion & Textiles"
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Supply Chain Director",
      company: "TechCorp Global",
      content: "The demand forecasting tool has revolutionized our inventory management. We've reduced stockouts by 40% and improved our forecast accuracy significantly."
    },
    {
      name: "Michael Rodriguez",
      role: "Operations Manager",
      company: "RetailMax Solutions",
      content: "The AI-powered insights have helped us optimize our supply chain operations. The visual analytics make it easy to understand complex data patterns."
    },
    {
      name: "Emma Thompson",
      role: "Inventory Manager",
      company: "Manufacturing Plus",
      content: "This tool has transformed how we approach demand planning. The predictive capabilities have helped us make better business decisions."
    }
  ];

  return (
    <>
      <SEO
        title="Demand Forecasting Assistant - AI-Powered Predictive Analytics | SWENLOG"
        description="AI-powered demand forecasting tool for accurate inventory planning. Machine learning algorithms analyze market trends, historical data, and external factors for precise predictions."
        keywords="demand forecasting, predictive analytics, inventory optimization, AI forecasting, supply chain planning, machine learning, market analysis"
        canonical="/resources/demand-forecasting-assistant"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Brain className="h-12 w-12 text-purple-600" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Demand Forecasting Assistant
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Harness the power of artificial intelligence to predict product demand with
              unprecedented accuracy. Optimize your inventory, reduce costs, and improve
              customer satisfaction with data-driven forecasting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                <Brain className="h-5 w-5 mr-2" />
                Start Forecasting
              </Button>
              <Button size="lg" variant="outline">
                <BarChart3 className="h-5 w-5 mr-2" />
                View Analytics
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
              AI-Powered Forecasting Technology
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Advanced machine learning algorithms combined with real-time market data
              for the most accurate demand predictions available
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-purple-100 rounded-full text-purple-600">
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

      {/* Interactive Forecasting Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Interactive AI Forecasting
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Experience the power of machine learning with our advanced forecasting engine.
              Input your product data and get instant AI-powered predictions.
            </p>
          </div>

          <DemandForecastingAssistant />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Proven Business Benefits
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real results from AI-powered demand forecasting
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full text-purple-600">
                      {benefit.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-2">{benefit.title}</CardTitle>
                  <div className="text-3xl font-bold text-purple-600 mb-4">{benefit.stat}</div>
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

      {/* Industries Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Industries We Serve
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI forecasting technology works across diverse industries
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                    <h3 className="font-semibold text-gray-900">{industry}</h3>
                  </div>
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
              How AI Forecasting Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our advanced algorithm combines multiple data sources for accurate predictions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-center flex items-center justify-center gap-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold">1</span>
                  </div>
                  Data Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  AI analyzes historical sales data, market trends, seasonal patterns,
                  and external factors affecting demand.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center flex items-center justify-center gap-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold">2</span>
                  </div>
                  Pattern Recognition
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Machine learning identifies complex patterns and correlations
                  that traditional methods might miss.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center flex items-center justify-center gap-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold">3</span>
                  </div>
                  Predictive Modeling
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Generates accurate forecasts with confidence intervals and
                  actionable recommendations for inventory planning.
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
              Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how businesses are transforming their supply chains with AI forecasting
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
                    <div className="text-sm text-purple-600">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Demand Planning?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Start using AI-powered forecasting to optimize your inventory and improve business outcomes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
              <Brain className="h-5 w-5 mr-2" />
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
              <Users className="h-5 w-5 mr-2" />
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default DemandForecastingAssistantPage;
