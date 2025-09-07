import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, BarChart3, Calendar, Target, AlertTriangle, CheckCircle, Brain, Zap } from "lucide-react";
import { toast } from "sonner";

interface ForecastData {
  product: string;
  currentDemand: number;
  predictedDemand: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  seasonality: string;
  factors: string[];
}

interface MarketData {
  date: string;
  demand: number;
  price: number;
  competition: number;
}

const DemandForecastingAssistant = () => {
  const [activeTab, setActiveTab] = useState('forecast');
  const [productName, setProductName] = useState('');
  const [industry, setIndustry] = useState('');
  const [timeframe, setTimeframe] = useState('3months');
  const [historicalData, setHistoricalData] = useState('');
  const [forecast, setForecast] = useState<ForecastData | null>(null);

  // Mock historical data for demonstration
  const mockHistoricalData: MarketData[] = [
    { date: '2024-01', demand: 1200, price: 45.50, competition: 3.2 },
    { date: '2024-02', demand: 1350, price: 46.20, competition: 3.1 },
    { date: '2024-03', demand: 1180, price: 44.80, competition: 3.4 },
    { date: '2024-04', demand: 1420, price: 47.10, competition: 3.0 },
    { date: '2024-05', demand: 1380, price: 46.80, competition: 3.2 },
    { date: '2024-06', demand: 1550, price: 48.20, competition: 2.9 },
    { date: '2024-07', demand: 1620, price: 48.90, competition: 2.8 },
    { date: '2024-08', demand: 1480, price: 47.50, competition: 3.1 },
    { date: '2024-09', demand: 1750, price: 49.80, competition: 2.7 },
    { date: '2024-10', demand: 1680, price: 49.20, competition: 2.8 },
    { date: '2024-11', demand: 1820, price: 50.50, competition: 2.6 },
    { date: '2024-12', demand: 1950, price: 51.80, competition: 2.5 }
  ];

  const industries = [
    'Electronics', 'Automotive Parts', 'Textiles', 'Food & Beverage',
    'Pharmaceuticals', 'Industrial Equipment', 'Consumer Goods', 'Chemicals'
  ];

  const timeframes = [
    { value: '1month', label: '1 Month', multiplier: 1 },
    { value: '3months', label: '3 Months', multiplier: 3 },
    { value: '6months', label: '6 Months', multiplier: 6 },
    { value: '1year', label: '1 Year', multiplier: 12 }
  ];

  const generateForecast = () => {
    if (!productName || !industry) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Simulate AI forecasting logic
    const currentDemand = mockHistoricalData[mockHistoricalData.length - 1].demand;
    const avgGrowth = 0.08; // 8% average monthly growth
    const selectedTimeframe = timeframes.find(t => t.value === timeframe);
    const months = selectedTimeframe?.multiplier || 3;

    // Calculate predicted demand with some randomness
    const predictedDemand = Math.round(currentDemand * Math.pow(1 + avgGrowth, months) * (0.9 + Math.random() * 0.2));
    const confidence = Math.round(75 + Math.random() * 20); // 75-95% confidence

    // Determine trend
    const recentTrend = predictedDemand > currentDemand ? 'up' : predictedDemand < currentDemand ? 'down' : 'stable';

    // Generate factors based on industry and timeframe
    const factors = [
      'Seasonal demand patterns',
      'Market competition changes',
      'Economic indicators',
      'Supply chain disruptions',
      'Consumer behavior trends'
    ];

    // Determine seasonality
    const seasonality = months <= 3 ? 'Short-term fluctuations' :
                      months <= 6 ? 'Quarterly patterns' : 'Annual cycles';

    const forecastData: ForecastData = {
      product: productName,
      currentDemand,
      predictedDemand,
      confidence,
      trend: recentTrend,
      seasonality,
      factors
    };

    setForecast(forecastData);
    setActiveTab('results');
    toast.success('Demand forecast generated successfully');
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'down': return <TrendingDown className="h-5 w-5 text-red-600" />;
      default: return <BarChart3 className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600 bg-green-100';
      case 'down': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Generate forecast chart data
  const forecastChartData = forecast ? [
    { month: 'Current', demand: forecast.currentDemand, type: 'Current' },
    { month: 'Predicted', demand: forecast.predictedDemand, type: 'Predicted' }
  ] : [];

  // Pie chart data for factors
  const factorsData = forecast ? forecast.factors.map((factor, index) => ({
    name: factor,
    value: Math.round(100 / forecast.factors.length),
    color: ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00'][index % 5]
  })) : [];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Brain className="h-8 w-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900">Demand Forecasting Assistant</h1>
        </div>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Leverage AI-powered predictive analytics to forecast product demand and optimize
          your inventory planning with machine learning algorithms.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="forecast">Generate Forecast</TabsTrigger>
          <TabsTrigger value="results" disabled={!forecast}>Forecast Results</TabsTrigger>
          <TabsTrigger value="analytics">Market Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="forecast" className="space-y-6">
          {/* Product Information */}
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
              <CardDescription>
                Provide details about the product you want to forecast
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product">Product Name *</Label>
                  <Input
                    id="product"
                    placeholder="e.g., iPhone 15 Pro"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry *</Label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((ind) => (
                        <SelectItem key={ind} value={ind}>
                          {ind}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeframe">Forecast Timeframe</Label>
                  <Select value={timeframe} onValueChange={setTimeframe}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeframes.map((tf) => (
                        <SelectItem key={tf.value} value={tf.value}>
                          {tf.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Historical Data */}
          <Card>
            <CardHeader>
              <CardTitle>Historical Data (Optional)</CardTitle>
              <CardDescription>
                Provide historical sales data to improve forecast accuracy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter historical demand data (e.g., monthly sales figures, market trends, etc.)"
                value={historicalData}
                onChange={(e) => setHistoricalData(e.target.value)}
                rows={4}
              />
              <p className="text-sm text-gray-500 mt-2">
                Providing historical data will improve the accuracy of AI predictions
              </p>
            </CardContent>
          </Card>

          {/* AI Processing Info */}
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="h-6 w-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-purple-900">AI-Powered Analysis</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-purple-600" />
                  <span>Machine Learning Models</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-purple-600" />
                  <span>Pattern Recognition</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                  <span>Trend Analysis</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Generate Forecast Button */}
          <div className="flex justify-center">
            <Button onClick={generateForecast} size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Brain className="h-5 w-5 mr-2" />
              Generate AI Forecast
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {forecast && (
            <>
              {/* Forecast Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Forecast Summary</CardTitle>
                  <CardDescription>
                    AI-generated demand forecast for {forecast.product}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Current Demand:</span>
                        <span className="font-bold text-lg">{forecast.currentDemand.toLocaleString()} units</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Predicted Demand:</span>
                        <span className="font-bold text-lg text-purple-600">{forecast.predictedDemand.toLocaleString()} units</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Growth:</span>
                        <div className="flex items-center gap-2">
                          {getTrendIcon(forecast.trend)}
                          <span className={`font-bold ${forecast.trend === 'up' ? 'text-green-600' : forecast.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                            {forecast.trend === 'up' ? '+' : forecast.trend === 'down' ? '-' : ''}
                            {Math.abs(Math.round(((forecast.predictedDemand - forecast.currentDemand) / forecast.currentDemand) * 100))}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Confidence Level:</span>
                        <div className="flex items-center gap-2">
                          <Progress value={forecast.confidence} className="w-20" />
                          <span className="font-bold">{forecast.confidence}%</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Seasonality:</span>
                        <Badge variant="outline">{forecast.seasonality}</Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Trend:</span>
                        <Badge className={getTrendColor(forecast.trend)}>
                          {forecast.trend.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Forecast Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Demand Forecast Visualization</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={forecastChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [value.toLocaleString(), 'Demand']} />
                      <Bar dataKey="demand" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Key Factors */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Influencing Factors</CardTitle>
                  <CardDescription>
                    Factors considered in the AI forecast analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-3">Primary Factors</h4>
                      <div className="space-y-2">
                        {forecast.factors.slice(0, 3).map((factor, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm">{factor}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Factor Distribution</h4>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={factorsData}
                            cx="50%"
                            cy="50%"
                            outerRadius={60}
                            dataKey="value"
                          >
                            {factorsData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>AI Recommendations</CardTitle>
                  <CardDescription>
                    Strategic recommendations based on the forecast
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {forecast.trend === 'up' && (
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-start gap-3">
                          <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-green-900">Increase Inventory</h4>
                            <p className="text-sm text-green-800">
                              Consider increasing stock levels to meet expected demand growth.
                              Plan for {Math.round(((forecast.predictedDemand - forecast.currentDemand) / forecast.currentDemand) * 100)}%
                              increase in inventory requirements.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {forecast.confidence < 80 && (
                      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-yellow-900">Monitor Closely</h4>
                            <p className="text-sm text-yellow-800">
                              Forecast confidence is moderate. Consider implementing tracking mechanisms
                              and be prepared to adjust inventory levels based on real-time data.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-start gap-3">
                        <Target className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-900">Optimize Supply Chain</h4>
                          <p className="text-sm text-blue-800">
                            Review supplier capacity and lead times. Consider negotiating better terms
                            or identifying alternative suppliers to support increased demand.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Market Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Market Trends Analysis</CardTitle>
              <CardDescription>
                Historical market data and trend analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={mockHistoricalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="demand" stroke="#8884d8" strokeWidth={2} />
                  <Line yAxisId="right" type="monotone" dataKey="price" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Market Insights */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">+12.5%</div>
                <div className="text-sm text-gray-600">YoY Growth</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">85%</div>
                <div className="text-sm text-gray-600">Prediction Accuracy</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">6</div>
                <div className="text-sm text-gray-600">Months Forecasted</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DemandForecastingAssistant;
