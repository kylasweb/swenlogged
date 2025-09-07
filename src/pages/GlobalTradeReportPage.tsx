import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, TrendingUp, Globe, Download, Calendar, AlertTriangle } from 'lucide-react';

const GlobalTradeReportPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Global Trade Report | SWENLOG</title>
        <meta name="description" content="Monthly analysis of shipping trends, market conditions, and global trade insights for logistics professionals." />
        <meta name="keywords" content="global trade report, shipping trends, market analysis, logistics insights, trade data" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Global Trade Report
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Monthly analysis of shipping trends and market conditions
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  September 2025
                </Badge>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <Globe className="w-4 h-4 mr-2" />
                  Global Coverage
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="trends">Market Trends</TabsTrigger>
                <TabsTrigger value="insights">Key Insights</TabsTrigger>
                <TabsTrigger value="forecast">Forecast</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Executive Summary
                    </CardTitle>
                    <CardDescription>
                      Key highlights from September 2025 global trade data
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                          <div>
                            <p className="font-semibold text-green-800">Container Volume</p>
                            <p className="text-sm text-green-600">+8.2% YoY Growth</p>
                          </div>
                          <TrendingUp className="w-8 h-8 text-green-600" />
                        </div>
                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                          <div>
                            <p className="font-semibold text-blue-800">Average Freight Rates</p>
                            <p className="text-sm text-blue-600">$2,450/TEU</p>
                          </div>
                          <BarChart3 className="w-8 h-8 text-blue-600" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                          <div>
                            <p className="font-semibold text-orange-800">Port Congestion</p>
                            <p className="text-sm text-orange-600">12 Major Ports Affected</p>
                          </div>
                          <AlertTriangle className="w-8 h-8 text-orange-600" />
                        </div>
                        <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                          <div>
                            <p className="font-semibold text-purple-800">Sustainability Index</p>
                            <p className="text-sm text-purple-600">+15% Green Shipping</p>
                          </div>
                          <Globe className="w-8 h-8 text-purple-600" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Regional Performance</CardTitle>
                    <CardDescription>Trade volume by region</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { region: 'Asia-Pacific', volume: '45.2%', change: '+12.8%', status: 'strong' },
                        { region: 'North America', volume: '28.7%', change: '+5.3%', status: 'stable' },
                        { region: 'Europe', volume: '18.9%', change: '-2.1%', status: 'declining' },
                        { region: 'Middle East & Africa', volume: '7.2%', change: '+18.5%', status: 'growing' }
                      ].map((item) => (
                        <div key={item.region} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-semibold">{item.region}</p>
                            <p className="text-sm text-gray-600">{item.volume} of global trade</p>
                          </div>
                          <Badge variant={item.status === 'strong' ? 'default' : item.status === 'growing' ? 'secondary' : 'outline'}>
                            {item.change}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="trends" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Market Trends Analysis</CardTitle>
                    <CardDescription>Current market dynamics and emerging patterns</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Freight Rate Trends</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span>Asia-Europe</span>
                            <span className="font-semibold text-green-600">+$320/TEU</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Asia-North America</span>
                            <span className="font-semibold text-red-600">-$180/TEU</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Europe-Asia</span>
                            <span className="font-semibold text-green-600">+$250/TEU</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Commodity Performance</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span>Electronics</span>
                            <span className="font-semibold text-green-600">+22%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Automotive Parts</span>
                            <span className="font-semibold text-blue-600">+8%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Textiles</span>
                            <span className="font-semibold text-red-600">-5%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="insights" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Insights</CardTitle>
                    <CardDescription>Strategic insights for logistics decision-making</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      {[
                        {
                          title: 'Digital Transformation Acceleration',
                          insight: '75% of surveyed shippers report increased digital tool adoption, with AI-powered solutions showing 40% efficiency gains.',
                          impact: 'high'
                        },
                        {
                          title: 'Sustainability Pressure Growing',
                          insight: 'Regulatory changes in EU and US pushing for greener shipping practices, with carbon pricing expected to rise 25% by 2026.',
                          impact: 'high'
                        },
                        {
                          title: 'Supply Chain Resilience Focus',
                          insight: 'Post-pandemic focus on resilience continues, with 60% of companies investing in multi-sourcing strategies.',
                          impact: 'medium'
                        },
                        {
                          title: 'E-commerce Impact',
                          insight: 'E-commerce volumes continue to drive container demand, with specialized shipping solutions gaining traction.',
                          impact: 'medium'
                        }
                      ].map((item, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold">{item.title}</h4>
                            <Badge variant={item.impact === 'high' ? 'destructive' : 'secondary'}>
                              {item.impact} impact
                            </Badge>
                          </div>
                          <p className="text-gray-600">{item.insight}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="forecast" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Market Forecast</CardTitle>
                    <CardDescription>Q4 2025 and 2026 outlook</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Short-term Forecast (Q4 2025)</h3>
                        <div className="space-y-3">
                          <div className="p-3 bg-blue-50 rounded">
                            <p className="font-medium">Container Volume: +6-8%</p>
                            <p className="text-sm text-gray-600">Seasonal peak expected</p>
                          </div>
                          <div className="p-3 bg-green-50 rounded">
                            <p className="font-medium">Freight Rates: Stable to +5%</p>
                            <p className="text-sm text-gray-600">Peak season pricing</p>
                          </div>
                          <div className="p-3 bg-orange-50 rounded">
                            <p className="font-medium">Port Congestion: High Risk</p>
                            <p className="text-sm text-gray-600">Holiday season impact</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Long-term Outlook (2026)</h3>
                        <div className="space-y-3">
                          <div className="p-3 bg-purple-50 rounded">
                            <p className="font-medium">Digital Adoption: 85%</p>
                            <p className="text-sm text-gray-600">AI and automation focus</p>
                          </div>
                          <div className="p-3 bg-teal-50 rounded">
                            <p className="font-medium">Sustainability: Priority</p>
                            <p className="text-sm text-gray-600">Green shipping mandates</p>
                          </div>
                          <div className="p-3 bg-indigo-50 rounded">
                            <p className="font-medium">Resilience: Core Strategy</p>
                            <p className="text-sm text-gray-600">Multi-modal approaches</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Download Section */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="w-5 h-5 mr-2" />
                  Download Full Report
                </CardTitle>
                <CardDescription>
                  Get the complete Global Trade Report with detailed data and analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button>
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF (Free)
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Excel Data
                  </Button>
                  <Button variant="outline">
                    Subscribe to Monthly Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default GlobalTradeReportPage;
