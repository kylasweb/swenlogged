import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { BarChart3, TrendingUp, Route, Clock, DollarSign, Package, ArrowRight, MapPin } from 'lucide-react';

const TradeLaneAnalyticsPage: React.FC = () => {
  const [selectedLane, setSelectedLane] = useState('asia-europe');

  const tradeLanes = [
    {
      id: 'asia-europe',
      name: 'Asia to Europe',
      origin: 'Shanghai, China',
      destination: 'Rotterdam, Netherlands',
      distance: '12,500 km',
      avgTransitTime: '28 days',
      avgCost: '$2,450/TEU',
      reliability: 85,
      volume: 'High',
      trend: '+12%'
    },
    {
      id: 'asia-north-america',
      name: 'Asia to North America',
      origin: 'Singapore',
      destination: 'Los Angeles, USA',
      distance: '14,200 km',
      avgTransitTime: '22 days',
      avgCost: '$3,200/TEU',
      reliability: 78,
      volume: 'High',
      trend: '+8%'
    },
    {
      id: 'europe-asia',
      name: 'Europe to Asia',
      origin: 'Hamburg, Germany',
      destination: 'Tokyo, Japan',
      distance: '9,100 km',
      avgTransitTime: '32 days',
      avgCost: '$2,800/TEU',
      reliability: 82,
      volume: 'Medium',
      trend: '+5%'
    },
    {
      id: 'transpacific',
      name: 'Transpacific Eastbound',
      origin: 'Los Angeles, USA',
      destination: 'Shanghai, China',
      distance: '10,800 km',
      avgTransitTime: '18 days',
      avgCost: '$2,900/TEU',
      reliability: 88,
      volume: 'High',
      trend: '+15%'
    },
    {
      id: 'transatlantic',
      name: 'Transatlantic',
      origin: 'New York, USA',
      destination: 'London, UK',
      distance: '5,570 km',
      avgTransitTime: '12 days',
      avgCost: '$1,800/TEU',
      reliability: 92,
      volume: 'Medium',
      trend: '+3%'
    }
  ];

  const selectedLaneData = tradeLanes.find(lane => lane.id === selectedLane) || tradeLanes[0];

  const getVolumeColor = (volume: string) => {
    switch (volume) {
      case 'High': return 'text-green-600 bg-green-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrendColor = (trend: string) => {
    return trend.startsWith('+') ? 'text-green-600' : 'text-red-600';
  };

  return (
    <>
      <Helmet>
        <title>Trade Lane Analytics | SWENLOG</title>
        <meta name="description" content="Detailed insights on shipping routes and performance analytics for global trade lanes." />
        <meta name="keywords" content="trade lane analytics, shipping routes, global trade, performance metrics, logistics insights" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Trade Lane Analytics
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-purple-100">
                Detailed insights on shipping routes and performance
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <Route className="w-4 h-4 mr-2" />
                  Global Routes
                </Badge>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Performance Data
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Lane Selector */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex flex-wrap items-center gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Select Trade Lane</label>
                    <Select value={selectedLane} onValueChange={setSelectedLane}>
                      <SelectTrigger className="w-64">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {tradeLanes.map((lane) => (
                          <SelectItem key={lane.id} value={lane.id}>
                            {lane.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">{selectedLaneData.origin}</span>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium">{selectedLaneData.destination}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
                <TabsTrigger value="forecast">Forecast</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Lane Overview Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center">
                        <Route className="w-4 h-4 mr-2" />
                        Distance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{selectedLaneData.distance}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        Transit Time
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{selectedLaneData.avgTransitTime}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center">
                        <DollarSign className="w-4 h-4 mr-2" />
                        Avg Cost
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{selectedLaneData.avgCost}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Reliability
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{selectedLaneData.reliability}%</div>
                      <Progress value={selectedLaneData.reliability} className="mt-2" />
                    </CardContent>
                  </Card>
                </div>

                {/* Trade Lane Comparison */}
                <Card>
                  <CardHeader>
                    <CardTitle>Trade Lane Comparison</CardTitle>
                    <CardDescription>Performance metrics across major trade routes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {tradeLanes.map((lane, index) => (
                        <div key={index} className={`p-4 border rounded-lg ${selectedLane === lane.id ? 'border-purple-300 bg-purple-50' : 'border-gray-200'}`}>
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-semibold">{lane.name}</h4>
                              <p className="text-sm text-gray-600">{lane.origin} → {lane.destination}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getVolumeColor(lane.volume)}>
                                {lane.volume} Volume
                              </Badge>
                              <Badge variant="outline" className={getTrendColor(lane.trend)}>
                                {lane.trend}
                              </Badge>
                            </div>
                          </div>
                          <div className="grid grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Distance</p>
                              <p className="font-semibold">{lane.distance}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Transit</p>
                              <p className="font-semibold">{lane.avgTransitTime}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Cost/TEU</p>
                              <p className="font-semibold">{lane.avgCost}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Reliability</p>
                              <p className="font-semibold">{lane.reliability}%</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="performance" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                    <CardDescription>Detailed performance analysis for {selectedLaneData.name}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Reliability Factors</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span>On-time Delivery</span>
                            <span className="font-semibold text-green-600">{selectedLaneData.reliability}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Schedule Adherence</span>
                            <span className="font-semibold text-blue-600">89%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Documentation Accuracy</span>
                            <span className="font-semibold text-purple-600">94%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Cargo Safety</span>
                            <span className="font-semibold text-green-600">96%</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Service Quality</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span>Customer Satisfaction</span>
                            <span className="font-semibold text-yellow-600">4.2/5</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Communication</span>
                            <span className="font-semibold text-blue-600">4.5/5</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Problem Resolution</span>
                            <span className="font-semibold text-green-600">4.3/5</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Flexibility</span>
                            <span className="font-semibold text-purple-600">4.1/5</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Seasonal Performance</CardTitle>
                    <CardDescription>Performance variations throughout the year</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { month: 'Q1 (Jan-Mar)', performance: 82, factor: 'Weather disruptions' },
                        { month: 'Q2 (Apr-Jun)', performance: 88, factor: 'Peak season efficiency' },
                        { month: 'Q3 (Jul-Sep)', performance: 85, factor: 'Summer maintenance' },
                        { month: 'Q4 (Oct-Dec)', performance: 78, factor: 'Holiday congestion' }
                      ].map((quarter, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-semibold">{quarter.month}</h4>
                            <p className="text-sm text-gray-600">{quarter.factor}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{quarter.performance}%</p>
                            <Progress value={quarter.performance} className="w-24 mt-1" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="costs" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Cost Breakdown Analysis</CardTitle>
                    <CardDescription>Detailed cost components for {selectedLaneData.name}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Cost Components</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                            <span>Base Freight</span>
                            <span className="font-semibold">$1,850/TEU</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                            <span>Fuel Surcharge</span>
                            <span className="font-semibold">$320/TEU</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                            <span>Terminal Handling</span>
                            <span className="font-semibold">$180/TEU</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                            <span>Documentation</span>
                            <span className="font-semibold">$100/TEU</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Cost Trends</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                            <span>3-Month Change</span>
                            <span className="font-semibold text-red-600">+8.5%</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                            <span>YoY Change</span>
                            <span className="font-semibold text-orange-600">+12.2%</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                            <span>Peak Season Premium</span>
                            <span className="font-semibold text-blue-600">+15%</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                            <span>Volume Discount</span>
                            <span className="font-semibold text-green-600">-5%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cost Optimization Strategies</CardTitle>
                    <CardDescription>Recommendations to reduce shipping costs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold text-blue-600">Short-term Savings</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <Package className="w-4 h-4 mr-2 mt-1 text-green-600" />
                            <span className="text-sm">Consolidate shipments for volume discounts</span>
                          </li>
                          <li className="flex items-start">
                            <Package className="w-4 h-4 mr-2 mt-1 text-green-600" />
                            <span className="text-sm">Book during off-peak seasons</span>
                          </li>
                          <li className="flex items-start">
                            <Package className="w-4 h-4 mr-2 mt-1 text-green-600" />
                            <span className="text-sm">Use electronic documentation to reduce fees</span>
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h3 className="font-semibold text-purple-600">Long-term Strategies</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <Package className="w-4 h-4 mr-2 mt-1 text-green-600" />
                            <span className="text-sm">Negotiate annual contracts with carriers</span>
                          </li>
                          <li className="flex items-start">
                            <Package className="w-4 h-4 mr-2 mt-1 text-green-600" />
                            <span className="text-sm">Implement just-in-time inventory</span>
                          </li>
                          <li className="flex items-start">
                            <Package className="w-4 h-4 mr-2 mt-1 text-green-600" />
                            <span className="text-sm">Explore alternative trade lanes</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="forecast" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Trade Lane Forecast</CardTitle>
                    <CardDescription>Predicted performance and cost trends</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Performance Forecast</h3>
                        <div className="space-y-4">
                          <div className="p-4 border rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">Q4 2025</span>
                              <Badge variant="secondary">Stable</Badge>
                            </div>
                            <p className="text-sm text-gray-600">Expected reliability: 84-86%</p>
                            <p className="text-sm text-gray-600">Transit time: 26-30 days</p>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">Q1 2026</span>
                              <Badge variant="default">Improving</Badge>
                            </div>
                            <p className="text-sm text-gray-600">Expected reliability: 87-89%</p>
                            <p className="text-sm text-gray-600">Transit time: 24-28 days</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Cost Forecast</h3>
                        <div className="space-y-4">
                          <div className="p-4 border rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">Q4 2025</span>
                              <Badge variant="destructive">Increasing</Badge>
                            </div>
                            <p className="text-sm text-gray-600">Expected cost: $2,600-2,800/TEU</p>
                            <p className="text-sm text-gray-600">Peak season premium: +12%</p>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">Q1 2026</span>
                              <Badge variant="secondary">Moderate</Badge>
                            </div>
                            <p className="text-sm text-gray-600">Expected cost: $2,700-2,900/TEU</p>
                            <p className="text-sm text-gray-600">Fuel surcharge: +8%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Risk Assessment</CardTitle>
                    <CardDescription>Potential challenges and mitigation strategies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          risk: 'Port Congestion',
                          probability: 'High',
                          impact: 'Medium',
                          mitigation: 'Diversify port options and build buffer time'
                        },
                        {
                          risk: 'Fuel Price Volatility',
                          probability: 'Medium',
                          impact: 'High',
                          mitigation: 'Use fuel surcharge protection and long-term contracts'
                        },
                        {
                          risk: 'Regulatory Changes',
                          probability: 'Medium',
                          impact: 'Medium',
                          mitigation: 'Monitor trade policy updates and maintain compliance'
                        },
                        {
                          risk: 'Weather Disruptions',
                          probability: 'Low',
                          impact: 'High',
                          mitigation: 'Track weather patterns and have contingency routes'
                        }
                      ].map((item, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{item.risk}</h4>
                            <div className="flex gap-2">
                              <Badge variant={item.probability === 'High' ? 'destructive' : item.probability === 'Medium' ? 'secondary' : 'outline'}>
                                {item.probability}
                              </Badge>
                              <Badge variant="outline">{item.impact}</Badge>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{item.mitigation}</p>
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

export default TradeLaneAnalyticsPage;
