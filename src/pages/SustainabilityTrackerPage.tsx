import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Leaf, Calculator, BarChart3, Target, Award, AlertCircle, CheckCircle, Zap } from 'lucide-react';

const SustainabilityTrackerPage: React.FC = () => {
  const [shipmentData, setShipmentData] = useState({
    weight: '',
    distance: '',
    mode: '',
    fuelType: ''
  });

  const [carbonFootprint, setCarbonFootprint] = useState<number | null>(null);

  const calculateFootprint = () => {
    const weight = parseFloat(shipmentData.weight);
    const distance = parseFloat(shipmentData.distance);

    if (weight && distance) {
      // Simplified calculation - in real app this would use more complex formulas
      let baseEmission = weight * distance * 0.0001; // kg CO2

      // Adjust based on transport mode
      switch (shipmentData.mode) {
        case 'air':
          baseEmission *= 3.5;
          break;
        case 'sea':
          baseEmission *= 0.02;
          break;
        case 'road':
          baseEmission *= 0.1;
          break;
        case 'rail':
          baseEmission *= 0.03;
          break;
        default:
          baseEmission *= 0.05;
      }

      // Adjust based on fuel type
      if (shipmentData.fuelType === 'diesel') {
        baseEmission *= 1.2;
      } else if (shipmentData.fuelType === 'electric') {
        baseEmission *= 0.1;
      }

      setCarbonFootprint(Math.round(baseEmission * 100) / 100);
    }
  };

  const getSustainabilityScore = (footprint: number) => {
    if (footprint < 10) return { score: 95, label: 'Excellent', color: 'text-green-600' };
    if (footprint < 50) return { score: 80, label: 'Good', color: 'text-blue-600' };
    if (footprint < 100) return { score: 65, label: 'Fair', color: 'text-yellow-600' };
    return { score: 40, label: 'Needs Improvement', color: 'text-red-600' };
  };

  return (
    <>
      <Helmet>
        <title>Sustainability Tracker | SWENLOG</title>
        <meta name="description" content="Calculate your carbon footprint and get green logistics recommendations for sustainable shipping." />
        <meta name="keywords" content="sustainability tracker, carbon footprint, green logistics, sustainable shipping, emissions calculator" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Sustainability Tracker
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-green-100">
                Carbon footprint calculator and green logistics recommendations
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <Leaf className="w-4 h-4 mr-2" />
                  Carbon Calculator
                </Badge>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <Target className="w-4 h-4 mr-2" />
                  Green Recommendations
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="calculator" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="calculator">Carbon Calculator</TabsTrigger>
                <TabsTrigger value="insights">Sustainability Insights</TabsTrigger>
                <TabsTrigger value="recommendations">Green Solutions</TabsTrigger>
              </TabsList>

              <TabsContent value="calculator" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calculator className="w-5 h-5 mr-2" />
                      Carbon Footprint Calculator
                    </CardTitle>
                    <CardDescription>
                      Calculate the environmental impact of your shipment
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="weight">Shipment Weight (kg)</Label>
                          <Input
                            id="weight"
                            type="number"
                            placeholder="Enter weight in kg"
                            value={shipmentData.weight}
                            onChange={(e) => setShipmentData({...shipmentData, weight: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="distance">Shipping Distance (km)</Label>
                          <Input
                            id="distance"
                            type="number"
                            placeholder="Enter distance in km"
                            value={shipmentData.distance}
                            onChange={(e) => setShipmentData({...shipmentData, distance: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="mode">Transport Mode</Label>
                          <Select value={shipmentData.mode} onValueChange={(value) => setShipmentData({...shipmentData, mode: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select transport mode" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="air">Air Freight</SelectItem>
                              <SelectItem value="sea">Sea Freight</SelectItem>
                              <SelectItem value="road">Road Freight</SelectItem>
                              <SelectItem value="rail">Rail Freight</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="fuel">Fuel Type</Label>
                          <Select value={shipmentData.fuelType} onValueChange={(value) => setShipmentData({...shipmentData, fuelType: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select fuel type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="diesel">Diesel</SelectItem>
                              <SelectItem value="petrol">Petrol</SelectItem>
                              <SelectItem value="electric">Electric</SelectItem>
                              <SelectItem value="hybrid">Hybrid</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <Button onClick={calculateFootprint} className="w-full md:w-auto">
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate Carbon Footprint
                    </Button>

                    {carbonFootprint !== null && (
                      <Card className="mt-6">
                        <CardHeader>
                          <CardTitle className="text-center">Your Carbon Footprint</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center space-y-4">
                          <div className="text-4xl font-bold text-green-600">
                            {carbonFootprint} kg CO₂
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-center">
                              <span className="text-lg mr-2">Sustainability Score:</span>
                              <Badge variant="outline" className={getSustainabilityScore(carbonFootprint).color}>
                                {getSustainabilityScore(carbonFootprint).label}
                              </Badge>
                            </div>
                            <Progress value={getSustainabilityScore(carbonFootprint).score} className="w-full" />
                          </div>
                          <p className="text-sm text-gray-600">
                            This equals the carbon footprint of driving {Math.round(carbonFootprint / 0.12)} km in an average car
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="insights" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Sustainability Insights
                    </CardTitle>
                    <CardDescription>
                      Industry trends and environmental impact data
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Industry Impact</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                            <span>Global Shipping Emissions</span>
                            <span className="font-semibold text-red-600">3.1% of total CO₂</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                            <span>Container Shipping</span>
                            <span className="font-semibold text-orange-600">2.8% of maritime emissions</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                            <span>Air Freight Impact</span>
                            <span className="font-semibold text-blue-600">35x more than sea freight</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Progress Metrics</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                            <span>Green Shipping Adoption</span>
                            <span className="font-semibold text-green-600">+15% YoY</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-teal-50 rounded">
                            <span>Carbon Reduction Goals</span>
                            <span className="font-semibold text-teal-600">50% by 2050</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                            <span>Sustainable Fuel Usage</span>
                            <span className="font-semibold text-purple-600">8% of fleet</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Environmental Regulations</CardTitle>
                    <CardDescription>Key sustainability regulations affecting logistics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          regulation: 'EU ETS Expansion',
                          description: 'Extended emissions trading system to include maritime transport',
                          impact: 'High',
                          status: 'Active'
                        },
                        {
                          regulation: 'IMO 2020',
                          description: 'Global sulfur cap reduction for marine fuels',
                          impact: 'High',
                          status: 'Active'
                        },
                        {
                          regulation: 'US Clean Air Act',
                          description: 'Enhanced emissions standards for port operations',
                          impact: 'Medium',
                          status: 'Pending'
                        },
                        {
                          regulation: 'Carbon Border Adjustment',
                          description: 'EU tax on high-emission imports',
                          impact: 'High',
                          status: 'Proposed'
                        }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-semibold">{item.regulation}</h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={item.impact === 'High' ? 'destructive' : 'secondary'}>
                              {item.impact}
                            </Badge>
                            <Badge variant="outline">{item.status}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="w-5 h-5 mr-2" />
                      Green Logistics Recommendations
                    </CardTitle>
                    <CardDescription>
                      Practical solutions to reduce your carbon footprint
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center">
                          <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                          Transport Optimization
                        </h3>
                        <div className="space-y-3">
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium">Consolidate Shipments</h4>
                            <p className="text-sm text-gray-600">Combine multiple shipments to reduce transport frequency</p>
                            <Badge className="mt-2">Up to 30% reduction</Badge>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium">Choose Sea Over Air</h4>
                            <p className="text-sm text-gray-600">Opt for maritime transport when time permits</p>
                            <Badge className="mt-2">90% emissions reduction</Badge>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium">Rail Intermodal</h4>
                            <p className="text-sm text-gray-600">Use rail for long-distance ground transport</p>
                            <Badge className="mt-2">75% less than road</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center">
                          <Zap className="w-5 h-5 mr-2 text-blue-600" />
                          Technology Solutions
                        </h3>
                        <div className="space-y-3">
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium">Route Optimization</h4>
                            <p className="text-sm text-gray-600">AI-powered routing for efficient transportation</p>
                            <Badge className="mt-2">15-25% fuel savings</Badge>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium">Electric Vehicles</h4>
                            <p className="text-sm text-gray-600">Transition to electric or hybrid fleet</p>
                            <Badge className="mt-2">Zero tailpipe emissions</Badge>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium">Sustainable Packaging</h4>
                            <p className="text-sm text-gray-600">Use recycled and minimal packaging materials</p>
                            <Badge className="mt-2">20% weight reduction</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Certification Programs</CardTitle>
                    <CardDescription>Earn recognition for your sustainability efforts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        {
                          name: 'Green Shipping Partner',
                          description: 'For companies achieving 20% emissions reduction',
                          benefits: ['Priority booking', 'Reduced rates', 'Marketing support']
                        },
                        {
                          name: 'Carbon Neutral Certified',
                          description: 'Complete offset of shipping emissions',
                          benefits: ['Full offset coverage', 'Sustainability reporting', 'Brand recognition']
                        },
                        {
                          name: 'Sustainable Supply Chain',
                          description: 'End-to-end green logistics implementation',
                          benefits: ['Comprehensive audit', 'Optimization plan', 'Ongoing monitoring']
                        }
                      ].map((cert, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">{cert.name}</h4>
                          <p className="text-sm text-gray-600 mb-3">{cert.description}</p>
                          <ul className="text-sm space-y-1">
                            {cert.benefits.map((benefit, i) => (
                              <li key={i} className="flex items-center">
                                <CheckCircle className="w-3 h-3 mr-2 text-green-600" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                          <Button className="w-full mt-3" size="sm">
                            Learn More
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default SustainabilityTrackerPage;
