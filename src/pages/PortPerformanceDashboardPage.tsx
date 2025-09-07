import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { MapPin, Clock, AlertTriangle, CheckCircle, TrendingUp, Ship, Anchor, Activity } from 'lucide-react';

const PortPerformanceDashboardPage: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('global');

  const portData = [
    {
      name: 'Port of Shanghai',
      region: 'Asia',
      status: 'congested',
      delay: '48-72 hours',
      efficiency: 65,
      vessels: 45,
      throughput: '92%'
    },
    {
      name: 'Port of Singapore',
      region: 'Asia',
      status: 'normal',
      delay: '2-4 hours',
      efficiency: 88,
      vessels: 32,
      throughput: '96%'
    },
    {
      name: 'Port of Rotterdam',
      region: 'Europe',
      status: 'normal',
      delay: '1-2 hours',
      efficiency: 92,
      vessels: 28,
      throughput: '98%'
    },
    {
      name: 'Port of Los Angeles',
      region: 'North America',
      status: 'moderate',
      delay: '12-24 hours',
      efficiency: 78,
      vessels: 38,
      throughput: '89%'
    },
    {
      name: 'Port of Dubai',
      region: 'Middle East',
      status: 'normal',
      delay: '1-3 hours',
      efficiency: 85,
      vessels: 25,
      throughput: '94%'
    },
    {
      name: 'Port of Sydney',
      region: 'Oceania',
      status: 'normal',
      delay: '2-4 hours',
      efficiency: 82,
      vessels: 18,
      throughput: '91%'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'congested': return 'text-red-600 bg-red-50';
      case 'moderate': return 'text-yellow-600 bg-yellow-50';
      case 'normal': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'congested': return <AlertTriangle className="w-4 h-4" />;
      case 'moderate': return <Clock className="w-4 h-4" />;
      case 'normal': return <CheckCircle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const filteredPorts = selectedRegion === 'global'
    ? portData
    : portData.filter(port => port.region.toLowerCase() === selectedRegion);

  return (
    <>
      <Helmet>
        <title>Port Performance Dashboard | SWENLOG</title>
        <meta name="description" content="Real-time data on port delays, efficiency metrics, and performance analytics for global shipping ports." />
        <meta name="keywords" content="port performance, shipping delays, port efficiency, global ports, maritime analytics" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Port Performance Dashboard
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Real-time data on port delays and efficiency metrics
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <Activity className="w-4 h-4 mr-2" />
                  Live Updates
                </Badge>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  Global Coverage
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Filters */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex flex-wrap items-center gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Region Filter</label>
                    <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="global">Global</SelectItem>
                        <SelectItem value="asia">Asia</SelectItem>
                        <SelectItem value="europe">Europe</SelectItem>
                        <SelectItem value="north america">North America</SelectItem>
                        <SelectItem value="middle east">Middle East</SelectItem>
                        <SelectItem value="oceania">Oceania</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Normal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">Moderate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm">Congested</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Port Overview</TabsTrigger>
                <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
                <TabsTrigger value="forecast">Delay Forecast</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Port Status Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPorts.map((port, index) => (
                    <Card key={index} className="relative">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{port.name}</CardTitle>
                          <Badge className={getStatusColor(port.status)}>
                            {getStatusIcon(port.status)}
                            <span className="ml-1 capitalize">{port.status}</span>
                          </Badge>
                        </div>
                        <CardDescription>{port.region}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Avg. Delay</p>
                            <p className="font-semibold">{port.delay}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Vessels Waiting</p>
                            <p className="font-semibold">{port.vessels}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Efficiency</p>
                            <p className="font-semibold">{port.efficiency}%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Throughput</p>
                            <p className="font-semibold">{port.throughput}</p>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Efficiency Rate</span>
                            <span>{port.efficiency}%</span>
                          </div>
                          <Progress value={port.efficiency} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Summary Statistics */}
                <Card>
                  <CardHeader>
                    <CardTitle>Global Port Summary</CardTitle>
                    <CardDescription>Current status across all monitored ports</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {filteredPorts.filter(p => p.status === 'normal').length}
                        </div>
                        <p className="text-sm text-gray-600">Normal Operations</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-600">
                          {filteredPorts.filter(p => p.status === 'moderate').length}
                        </div>
                        <p className="text-sm text-gray-600">Moderate Delays</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                          {filteredPorts.filter(p => p.status === 'congested').length}
                        </div>
                        <p className="text-sm text-gray-600">Congested</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {Math.round(filteredPorts.reduce((acc, port) => acc + port.efficiency, 0) / filteredPorts.length)}%
                        </div>
                        <p className="text-sm text-gray-600">Avg Efficiency</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Performance Analytics
                    </CardTitle>
                    <CardDescription>
                      Detailed performance metrics and trends
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Efficiency Trends</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                            <span>Top Performer</span>
                            <span className="font-semibold text-green-600">Port of Rotterdam (92%)</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-red-50 rounded">
                            <span>Needs Attention</span>
                            <span className="font-semibold text-red-600">Port of Shanghai (65%)</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                            <span>Average Efficiency</span>
                            <span className="font-semibold text-blue-600">82%</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Delay Analysis</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded">
                            <span>Most Delayed</span>
                            <span className="font-semibold text-yellow-600">48-72 hours</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                            <span>Fastest Processing</span>
                            <span className="font-semibold text-green-600">1-2 hours</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                            <span>Average Delay</span>
                            <span className="font-semibold text-blue-600">12 hours</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Regional Performance</CardTitle>
                    <CardDescription>Efficiency by geographic region</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { region: 'Europe', efficiency: 89, ports: 12, trend: '+2%' },
                        { region: 'Asia', efficiency: 78, ports: 25, trend: '-1%' },
                        { region: 'North America', efficiency: 82, ports: 15, trend: '+3%' },
                        { region: 'Middle East', efficiency: 85, ports: 8, trend: '+1%' },
                        { region: 'Oceania', efficiency: 88, ports: 6, trend: '+2%' }
                      ].map((region, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-semibold">{region.region}</h4>
                            <p className="text-sm text-gray-600">{region.ports} ports monitored</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{region.efficiency}% efficiency</p>
                            <Badge variant={region.trend.startsWith('+') ? 'default' : 'secondary'}>
                              {region.trend}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="forecast" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Delay Forecast (Next 7 Days)
                    </CardTitle>
                    <CardDescription>
                      Predicted congestion and delay patterns
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-red-600">High Risk Ports</h3>
                        <div className="space-y-3">
                          <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">Port of Shanghai</h4>
                              <Badge variant="destructive">Critical</Badge>
                            </div>
                            <p className="text-sm text-gray-600">Expected delays: 72-96 hours</p>
                            <p className="text-sm text-gray-600">Peak congestion: Sep 12-15</p>
                          </div>
                          <div className="p-4 border border-orange-200 rounded-lg bg-orange-50">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">Port of Los Angeles</h4>
                              <Badge variant="secondary">High</Badge>
                            </div>
                            <p className="text-sm text-gray-600">Expected delays: 24-48 hours</p>
                            <p className="text-sm text-gray-600">Peak congestion: Sep 10-12</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-green-600">Stable Ports</h3>
                        <div className="space-y-3">
                          <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">Port of Rotterdam</h4>
                              <Badge variant="default">Stable</Badge>
                            </div>
                            <p className="text-sm text-gray-600">Expected delays: 1-3 hours</p>
                            <p className="text-sm text-gray-600">Normal operations expected</p>
                          </div>
                          <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">Port of Singapore</h4>
                              <Badge variant="default">Stable</Badge>
                            </div>
                            <p className="text-sm text-gray-600">Expected delays: 2-4 hours</p>
                            <p className="text-sm text-gray-600">Minor fluctuations possible</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recommendations</CardTitle>
                    <CardDescription>Strategies to minimize delays</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold text-blue-600">Immediate Actions</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-600" />
                            <span className="text-sm">Monitor port status daily for critical updates</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-600" />
                            <span className="text-sm">Consider alternative ports for high-risk destinations</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-600" />
                            <span className="text-sm">Build buffer time (2-3 days) for peak season</span>
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h3 className="font-semibold text-purple-600">Long-term Strategies</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-600" />
                            <span className="text-sm">Diversify shipping routes and carriers</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-600" />
                            <span className="text-sm">Implement real-time tracking systems</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-600" />
                            <span className="text-sm">Partner with freight forwarders for contingency planning</span>
                          </li>
                        </ul>
                      </div>
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

export default PortPerformanceDashboardPage;
