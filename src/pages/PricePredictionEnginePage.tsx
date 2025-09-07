import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PricePredictionEngine from '@/components/resources/PricePredictionEngine';
import { Brain, TrendingUp, DollarSign, BarChart3, Target, AlertTriangle, Zap, Shield, Clock, Users } from "lucide-react";
import BackButton from '@/components/ui/BackButton';

const PricePredictionEnginePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Price Prediction Engine - AI-Powered Freight Rate Forecasting | SWENLOG</title>
        <meta name="description" content="Leverage advanced AI algorithms to predict freight rates and market trends. Make informed shipping decisions with machine learning-powered price forecasting and market intelligence." />
        <meta name="keywords" content="freight rate prediction, AI price forecasting, market trends, shipping costs, machine learning, logistics pricing" />
        <meta property="og:title" content="Price Prediction Engine - AI-Powered Freight Rate Forecasting" />
        <meta property="og:description" content="Advanced AI-powered tool for predicting freight rates and market trends with 87% accuracy" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://swenlog.com/resources/price-prediction-engine" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-6">
            <BackButton to="/resources" label="Back to Resources" />
          </div>
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Brain className="h-12 w-12 text-purple-300" />
              <h1 className="text-4xl md:text-6xl font-bold">Price Prediction Engine</h1>
            </div>
            <p className="text-xl md:text-2xl text-purple-100 max-w-4xl mx-auto leading-relaxed">
              Harness the power of artificial intelligence to predict freight rates and market trends.
              Make data-driven decisions with machine learning-powered price forecasting.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Badge className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2">
                <Brain className="h-4 w-4 mr-2" />
                AI-Powered
              </Badge>
              <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2">
                <TrendingUp className="h-4 w-4 mr-2" />
                87% Accuracy
              </Badge>
              <Badge className="bg-green-600 hover:bg-green-700 text-white px-4 py-2">
                <Zap className="h-4 w-4 mr-2" />
                Real-time Data
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <PricePredictionEngine />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Advanced AI Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our Price Prediction Engine combines multiple AI technologies to deliver
              accurate, actionable insights for your shipping decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <Brain className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Machine Learning Models</h3>
                <p className="text-gray-600">
                  Advanced algorithms analyze historical data, market trends, and external
                  factors to predict price movements with high accuracy.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Real-time Analytics</h3>
                <p className="text-gray-600">
                  Live market data integration provides up-to-the-minute insights
                  and continuous prediction updates.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <Target className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Strategic Recommendations</h3>
                <p className="text-gray-600">
                  AI-generated recommendations help you optimize timing, routes,
                  and booking strategies for maximum cost efficiency.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Market Factors Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Market Analysis</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI analyzes 15+ market factors to provide comprehensive price predictions
              and strategic insights.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Fuel Costs</h4>
                <p className="text-sm text-gray-600">Real-time fuel price monitoring and impact analysis</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Demand Trends</h4>
                <p className="text-sm text-gray-600">Market demand patterns and seasonal fluctuations</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Shield className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Capacity Utilization</h4>
                <p className="text-sm text-gray-600">Shipping capacity availability and utilization rates</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Market Volatility</h4>
                <p className="text-sm text-gray-600">Risk assessment and volatility impact analysis</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Price Prediction Engine?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the advantages of AI-powered price forecasting for your logistics operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">87% Prediction Accuracy</h3>
                  <p className="text-gray-600">
                    Our machine learning models deliver industry-leading accuracy
                    in freight rate predictions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Real-time Updates</h3>
                  <p className="text-gray-600">
                    Continuous market monitoring ensures your predictions stay
                    current with the latest data.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Strategic Insights</h3>
                  <p className="text-gray-600">
                    Get actionable recommendations to optimize your shipping
                    costs and timing.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Comprehensive Analytics</h3>
                  <p className="text-gray-600">
                    Detailed market analysis with 15+ factors influencing
                    price predictions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-red-100 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Expert Support</h3>
                  <p className="text-gray-600">
                    Access to logistics experts for interpretation of AI
                    predictions and strategic guidance.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <Zap className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Instant Results</h3>
                  <p className="text-gray-600">
                    Generate comprehensive price predictions in seconds
                    with our optimized AI algorithms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Logistics Professionals</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See how our AI-powered price prediction engine is transforming
              decision-making for logistics companies worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold">GS</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Global Shipping Co.</h4>
                    <p className="text-sm text-gray-600">Logistics Director</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "The Price Prediction Engine has revolutionized our procurement strategy.
                  We've reduced shipping costs by 12% through better timing of our bookings."
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">IL</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">International Logistics</h4>
                    <p className="text-sm text-gray-600">Operations Manager</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "The accuracy of the predictions is remarkable. We've been able to
                  negotiate better contracts and optimize our supply chain costs significantly."
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">TC</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Transcontinental Corp</h4>
                    <p className="text-sm text-gray-600">Procurement Lead</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "The real-time market insights and strategic recommendations have
                  become essential to our decision-making process. Highly recommended!"
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Shipping Costs?</h2>
          <p className="text-xl mb-8 text-purple-100">
            Join thousands of logistics professionals using AI-powered price prediction
            to make smarter, more profitable shipping decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              <Brain className="h-5 w-5 mr-2" />
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricePredictionEnginePage;
