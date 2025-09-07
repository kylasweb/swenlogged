import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CurrencyConverter from '@/components/resources/CurrencyConverter';
import { DollarSign, TrendingUp, Globe, Calculator, RefreshCw, Shield } from "lucide-react";
import BackButton from '@/components/ui/BackButton';

const CurrencyConverterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Currency Converter - Real-time Exchange Rates | SWENLOG</title>
        <meta name="description" content="Convert currencies instantly with real-time exchange rates. Perfect for international trade, logistics pricing, and financial calculations." />
        <meta name="keywords" content="currency converter, exchange rates, international trade, forex, logistics finance" />
        <meta property="og:title" content="Currency Converter - Real-time Exchange Rates" />
        <meta property="og:description" content="Real-time currency conversion for international trade and logistics" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://swenlog.com/resources/currency-converter" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-900 via-blue-900 to-indigo-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-6">
            <BackButton to="/resources" label="Back to Resources" />
          </div>
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-6">
              <DollarSign className="h-12 w-12 text-green-300" />
              <h1 className="text-4xl md:text-6xl font-bold">Currency Converter</h1>
            </div>
            <p className="text-xl md:text-2xl text-green-100 max-w-4xl mx-auto leading-relaxed">
              Real-time currency conversion for international trade and logistics.
              Get accurate exchange rates for your shipping and financial calculations.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Badge className="bg-green-600 hover:bg-green-700 text-white px-4 py-2">
                <RefreshCw className="h-4 w-4 mr-2" />
                Real-time Rates
              </Badge>
              <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2">
                <Globe className="h-4 w-4 mr-2" />
                150+ Currencies
              </Badge>
              <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2">
                <Calculator className="h-4 w-4 mr-2" />
                Accurate Calculations
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <CurrencyConverter />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Currency Converter?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Built specifically for logistics and international trade professionals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <RefreshCw className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Real-time Updates</h3>
                <p className="text-gray-600">
                  Live exchange rates updated every minute to ensure accuracy
                  for your international transactions.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Global Coverage</h3>
                <p className="text-gray-600">
                  Support for 150+ currencies from every major economy,
                  perfect for international logistics.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <Shield className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Reliable Data</h3>
                <p className="text-gray-600">
                  Trusted financial data sources ensure accurate conversions
                  for your business calculations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Perfect for Logistics Professionals</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Essential tool for international shipping, customs calculations, and financial planning
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-green-100 p-3 rounded-lg w-fit mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold mb-2">Shipping Quotes</h4>
                <p className="text-sm text-gray-600">Convert freight rates between currencies</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-blue-100 p-3 rounded-lg w-fit mx-auto mb-3">
                  <Calculator className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold mb-2">Customs Duties</h4>
                <p className="text-sm text-gray-600">Calculate import/export duties</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-purple-100 p-3 rounded-lg w-fit mx-auto mb-3">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold mb-2">Financial Planning</h4>
                <p className="text-sm text-gray-600">Budget international projects</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-orange-100 p-3 rounded-lg w-fit mx-auto mb-3">
                  <Globe className="h-6 w-6 text-orange-600" />
                </div>
                <h4 className="font-semibold mb-2">Global Trade</h4>
                <p className="text-sm text-gray-600">Handle multi-currency transactions</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">150+</div>
              <div className="text-gray-600">Currencies Supported</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">1min</div>
              <div className="text-gray-600">Update Frequency</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Converting Currencies Today</h2>
          <p className="text-xl mb-8 text-green-100">
            Get accurate, real-time exchange rates for your international logistics operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              <Calculator className="h-5 w-5 mr-2" />
              Start Converting
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CurrencyConverterPage;
