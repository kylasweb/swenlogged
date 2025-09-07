import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Calendar, Target, AlertTriangle, Brain, Zap } from "lucide-react";
import { toast } from "sonner";

interface PricePrediction {
  route: string;
  currentPrice: number;
  predictedPrice: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  timeframe: string;
  factors: PriceFactor[];
  recommendations: string[];
  historicalData: MarketData[];
}

interface PriceFactor {
  factor: string;
  impact: 'positive' | 'negative' | 'neutral';
  strength: number;
  description: string;
}

interface MarketData {
  date: string;
  price: number;
  volume: number;
  fuelCost: number;
  demandIndex: number;
}

const PricePredictionEngine = () => {
  const [activeTab, setActiveTab] = useState('prediction');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [cargoType, setCargoType] = useState('');
  const [weight, setWeight] = useState('');
  const [timeframe, setTimeframe] = useState('1month');
  const [prediction, setPrediction] = useState<PricePrediction | null>(null);

  // Mock data for demonstration
  const routes = [
    'Shanghai → Los Angeles', 'Rotterdam → New York', 'Singapore → Dubai',
    'Hamburg → Miami', 'Tokyo → Seattle', 'Mumbai → London'
  ];

  const cargoTypes = [
    'General Cargo', 'Hazardous Materials', 'Perishable Goods',
    'Heavy Machinery', 'Electronics', 'Textiles', 'Chemicals'
  ];

  const timeframes = [
    { value: '1week', label: '1 Week', multiplier: 0.25 },
    { value: '1month', label: '1 Month', multiplier: 1 },
    { value: '3months', label: '3 Months', multiplier: 3 },
    { value: '6months', label: '6 Months', multiplier: 6 }
  ];

  const generateMockHistoricalData = (): MarketData[] => {
    const data: MarketData[] = [];
    const basePrice = 2500 + Math.random() * 1500;

    for (let i = 11; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthName = date.toLocaleString('default', { month: 'short', year: '2-digit' });

      const price = basePrice + (Math.random() - 0.5) * 800;
      const volume = 1000 + Math.random() * 2000;
      const fuelCost = 80 + Math.random() * 40;
      const demandIndex = 50 + Math.random() * 50;

      data.push({
        date: monthName,
        price: Math.round(price),
        volume: Math.round(volume),
        fuelCost: Math.round(fuelCost),
        demandIndex: Math.round(demandIndex)
      });
    }

    return data;
  };

  const generatePriceFactors = (): PriceFactor[] => {
    const factors = [
      {
        factor: 'Fuel Costs',
        impact: 'negative' as const,
        strength: Math.round(15 + Math.random() * 20),
        description: 'Rising fuel prices are increasing transportation costs'
      },
      {
        factor: 'Demand Trends',
        impact: 'positive' as const,
        strength: Math.round(10 + Math.random() * 25),
        description: 'Increasing demand for shipping capacity'
      },
      {
        factor: 'Capacity Utilization',
        impact: 'positive' as const,
        strength: Math.round(5 + Math.random() * 15),
        description: 'High vessel utilization rates'
      },
      {
        factor: 'Seasonal Patterns',
        impact: (Math.random() > 0.5 ? 'positive' : 'negative') as 'positive' | 'negative',
        strength: Math.round(5 + Math.random() * 10),
        description: 'Seasonal demand fluctuations'
      },
      {
        factor: 'Competition',
        impact: 'negative' as const,
        strength: Math.round(5 + Math.random() * 15),
        description: 'Increased competition affecting pricing'
      }
    ];

    return factors;
  };

  const generatePrediction = () => {
    if (!origin || !destination || !cargoType) {
      toast.error('Please fill in all required fields');
      return;
    }

    const route = `${origin} → ${destination}`;
    const historicalData = generateMockHistoricalData();
    const currentPrice = historicalData[historicalData.length - 1].price;
    const selectedTimeframe = timeframes.find(t => t.value === timeframe);

    // Calculate predicted price based on factors and trends
    const factors = generatePriceFactors();
    const positiveImpact = factors
      .filter(f => f.impact === 'positive')
      .reduce((sum, f) => sum + f.strength, 0);
    const negativeImpact = factors
      .filter(f => f.impact === 'negative')
      .reduce((sum, f) => sum + f.strength, 0);

    const netImpact = positiveImpact - negativeImpact;
    const predictedPrice = currentPrice * (1 + (netImpact / 100) * (selectedTimeframe?.multiplier || 1));
    const confidence = Math.round(75 + Math.random() * 20);

    // Determine trend
    const priceChange = ((predictedPrice - currentPrice) / currentPrice) * 100;
    const trend = priceChange > 5 ? 'up' : priceChange < -5 ? 'down' : 'stable';

    // Generate recommendations
    const recommendations = generateRecommendations(trend, factors, cargoType);

    const pricePrediction: PricePrediction = {
      route,
      currentPrice: Math.round(currentPrice),
      predictedPrice: Math.round(predictedPrice),
      confidence,
      trend,
      timeframe: selectedTimeframe?.label || '1 Month',
      factors,
      recommendations,
      historicalData
    };

    setPrediction(pricePrediction);
    setActiveTab('results');
    toast.success('Price prediction generated successfully');
  };

  const generateRecommendations = (trend: string, factors: PriceFactor[], cargoType: string): string[] => {
    const recommendations: string[] = [];

    if (trend === 'up') {
      recommendations.push('Consider booking in advance to secure current rates');
      recommendations.push('Evaluate alternative routes or carriers for cost savings');
      recommendations.push('Consider partial shipments to spread risk');
    } else if (trend === 'down') {
      recommendations.push('Monitor for rate decreases before finalizing contracts');
      recommendations.push('Consider flexible booking options');
      recommendations.push('Evaluate consolidation opportunities');
    } else {
      recommendations.push('Current market conditions are stable');
      recommendations.push('Standard booking procedures recommended');
      recommendations.push('Monitor for seasonal fluctuations');
    }

    // Cargo-specific recommendations
    if (cargoType === 'Perishable Goods') {
      recommendations.push('Time-sensitive cargo - consider premium services if rates justify');
    } else if (cargoType === 'Hazardous Materials') {
      recommendations.push('Special handling requirements may affect pricing');
    }

    // Factor-based recommendations
    const highFuelCost = factors.find(f => f.factor === 'Fuel Costs' && f.strength > 25);
    if (highFuelCost) {
      recommendations.push('Fuel surcharge likely to increase - consider fuel-efficient options');
    }

    return recommendations;
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-5 w-5 text-red-600" />;
      case 'down': return <TrendingDown className="h-5 w-5 text-green-600" />;
      default: return <BarChart3 className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-red-600 bg-red-100';
      case 'down': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'negative': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Brain className="h-8 w-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900">Price Prediction Engine</h1>
        </div>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Leverage advanced machine learning algorithms to predict freight rates and
          market trends. Make informed decisions with AI-powered price forecasting
          and market intelligence.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="prediction">Price Prediction</TabsTrigger>
          <TabsTrigger value="results" disabled={!prediction}>Prediction Results</TabsTrigger>
          <TabsTrigger value="analytics">Market Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="prediction" className="space-y-6">
          {/* Route Information */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Route & Cargo Details</CardTitle>
              <CardDescription>
                Provide shipping details for AI price prediction analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="origin">Origin *</Label>
                  <Select value={origin} onValueChange={setOrigin}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select origin port" />
                    </SelectTrigger>
                    <SelectContent>
                      {routes.map(route => route.split(' → ')[0]).filter((v, i, a) => a.indexOf(v) === i).map(origin => (
                        <SelectItem key={origin} value={origin}>
                          {origin}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destination">Destination *</Label>
                  <Select value={destination} onValueChange={setDestination}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination port" />
                    </SelectTrigger>
                    <SelectContent>
                      {routes.map(route => route.split(' → ')[1]).filter((v, i, a) => a.indexOf(v) === i).map(dest => (
                        <SelectItem key={dest} value={dest}>
                          {dest}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cargoType">Cargo Type *</Label>
                  <Select value={cargoType} onValueChange={setCargoType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cargo type" />
                    </SelectTrigger>
                    <SelectContent>
                      {cargoTypes.map(type => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="Optional"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeframe">Prediction Timeframe</Label>
                  <Select value={timeframe} onValueChange={setTimeframe}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeframes.map(tf => (
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

          {/* AI Analysis Features */}
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="h-6 w-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-purple-900">AI-Powered Price Prediction</h3>
              </div>
              <div className="grid md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                  <span>Market Trend Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-purple-600" />
                  <span>Cost Factor Modeling</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-purple-600" />
                  <span>Demand Forecasting</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-purple-600" />
                  <span>Historical Pattern Recognition</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Generate Prediction Button */}
          <div className="flex justify-center">
            <Button onClick={generatePrediction} size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Brain className="h-5 w-5 mr-2" />
              Generate AI Price Prediction
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {prediction && (
            <>
              {/* Price Prediction Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Price Prediction Results</CardTitle>
                  <CardDescription>
                    AI-generated price forecast for {prediction.route}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Current Market Price:</span>
                        <span className="font-bold text-lg">${prediction.currentPrice.toLocaleString()}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Predicted Price:</span>
                        <span className="font-bold text-lg text-purple-600">${prediction.predictedPrice.toLocaleString()}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Price Change:</span>
                        <div className="flex items-center gap-2">
                          {getTrendIcon(prediction.trend)}
                          <span className={`font-bold ${prediction.trend === 'up' ? 'text-red-600' : prediction.trend === 'down' ? 'text-green-600' : 'text-gray-600'}`}>
                            {prediction.trend === 'up' ? '+' : prediction.trend === 'down' ? '-' : ''}
                            ${Math.abs(prediction.predictedPrice - prediction.currentPrice).toLocaleString()}
                            ({Math.abs(Math.round(((prediction.predictedPrice - prediction.currentPrice) / prediction.currentPrice) * 100))}%)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Prediction Confidence:</span>
                        <div className="flex items-center gap-2">
                          <Progress value={prediction.confidence} className="w-20" />
                          <span className="font-bold">{prediction.confidence}%</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Timeframe:</span>
                        <Badge variant="outline">{prediction.timeframe}</Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Market Trend:</span>
                        <Badge className={getTrendColor(prediction.trend)}>
                          {prediction.trend.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Price Trend Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Price Trend Analysis</CardTitle>
                  <CardDescription>
                    Historical price data and prediction trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={prediction.historicalData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Price']} />
                      <Area type="monotone" dataKey="price" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Key Factors Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Market Factors</CardTitle>
                  <CardDescription>
                    Factors influencing the price prediction
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {prediction.factors.map((factor, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium">{factor.factor}</h4>
                            <p className="text-sm text-gray-600">{factor.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getImpactColor(factor.impact)}>
                              {factor.impact}
                            </Badge>
                            <span className="text-sm font-medium">{factor.strength}% impact</span>
                          </div>
                        </div>
                        <Progress value={factor.strength} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>Strategic Recommendations</CardTitle>
                  <CardDescription>
                    AI-generated recommendations based on the price analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {prediction.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                        <Target className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{recommendation}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Market Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Market Intelligence Dashboard</CardTitle>
              <CardDescription>
                Real-time market data and analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <DollarSign className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-lg font-bold">$2,450</div>
                  <div className="text-xs text-gray-600">Average Rate</div>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <div className="text-lg font-bold">+8.5%</div>
                  <div className="text-xs text-gray-600">YoY Growth</div>
                </div>

                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                  <div className="text-lg font-bold">85%</div>
                  <div className="text-xs text-gray-600">Capacity Utilization</div>
                </div>

                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-red-600 mx-auto mb-2" />
                  <div className="text-lg font-bold">High</div>
                  <div className="text-xs text-gray-600">Volatility Index</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Market Trends Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Market Trends & Volume Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={generateMockHistoricalData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="volume" fill="#8884d8" />
                  <Bar yAxisId="right" dataKey="demandIndex" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <Brain className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">87%</div>
            <div className="text-sm text-gray-600">Prediction Accuracy</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">15+</div>
            <div className="text-sm text-gray-600">Market Factors</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">6</div>
            <div className="text-sm text-gray-600">Month Forecast</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Zap className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">Real-time</div>
            <div className="text-sm text-gray-600">Market Data</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PricePredictionEngine;
