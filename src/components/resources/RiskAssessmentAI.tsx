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
import { AlertTriangle, Shield, Cloud, Wind, Waves, Thermometer, MapPin, Clock, AlertCircle, CheckCircle, XCircle, Navigation, Eye } from "lucide-react";
import { toast } from "sonner";

interface RiskFactor {
  id: string;
  category: string;
  factor: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  probability: number;
  description: string;
  impact: string;
}

interface RouteSegment {
  id: string;
  from: string;
  to: string;
  distance: number;
  duration: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  weatherConditions: string[];
  risks: RiskFactor[];
}

interface RiskAssessment {
  routeId: string;
  origin: string;
  destination: string;
  totalDistance: number;
  estimatedDuration: number;
  overallRiskLevel: 'low' | 'medium' | 'high' | 'critical';
  riskScore: number;
  routeSegments: RouteSegment[];
  recommendations: string[];
  alternativeRoutes: RouteSegment[];
  lastUpdated: string;
}

const RiskAssessmentAI = () => {
  const [activeTab, setActiveTab] = useState('assessment');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [transportMode, setTransportMode] = useState('sea');
  const [urgency, setUrgency] = useState('standard');
  const [cargoValue, setCargoValue] = useState('');
  const [assessment, setAssessment] = useState<RiskAssessment | null>(null);

  const transportModes = [
    { value: 'sea', label: 'Sea Freight', icon: '🚢' },
    { value: 'air', label: 'Air Freight', icon: '✈️' },
    { value: 'ground', label: 'Ground Transport', icon: '🚛' },
    { value: 'rail', label: 'Rail Transport', icon: '🚂' }
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Low Urgency', description: 'Flexible timeline, cost optimization priority' },
    { value: 'standard', label: 'Standard', description: 'Balanced cost and time considerations' },
    { value: 'high', label: 'High Urgency', description: 'Time-critical, willing to accept higher costs' },
    { value: 'critical', label: 'Critical', description: 'Emergency shipment, cost is secondary' }
  ];

  // Mock major ports and cities for demonstration
  const locations = [
    'Los Angeles, USA', 'Long Beach, USA', 'Shanghai, China', 'Singapore', 'Rotterdam, Netherlands',
    'Hamburg, Germany', 'New York, USA', 'Tokyo, Japan', 'Hong Kong', 'Dubai, UAE',
    'London, UK', 'Sydney, Australia', 'Mumbai, India', 'São Paulo, Brazil', 'Mexico City, Mexico'
  ];

  const generateRiskAssessment = () => {
    if (!origin || !destination) {
      toast.error('Please select both origin and destination');
      return;
    }

    // Simulate AI risk analysis
    const riskScore = Math.round(25 + Math.random() * 60); // 25-85 risk score
    const overallRiskLevel = riskScore < 35 ? 'low' : riskScore < 55 ? 'medium' : riskScore < 75 ? 'high' : 'critical';

    // Generate route segments based on transport mode
    const segments = generateRouteSegments(origin, destination, transportMode);
    const totalDistance = segments.reduce((sum, seg) => sum + seg.distance, 0);
    const totalDuration = segments.reduce((sum, seg) => sum + seg.duration, 0);

    // Generate recommendations based on risk level
    const recommendations = generateRecommendations(overallRiskLevel, transportMode, urgency);

    // Generate alternative routes
    const alternativeRoutes = generateAlternativeRoutes(origin, destination, transportMode);

    const riskAssessment: RiskAssessment = {
      routeId: `RT-${Date.now()}`,
      origin,
      destination,
      totalDistance,
      estimatedDuration: totalDuration,
      overallRiskLevel,
      riskScore,
      routeSegments: segments,
      recommendations,
      alternativeRoutes,
      lastUpdated: new Date().toISOString()
    };

    setAssessment(riskAssessment);
    setActiveTab('results');
    toast.success('AI risk assessment completed');
  };

  const generateRouteSegments = (from: string, to: string, mode: string): RouteSegment[] => {
    const segments: RouteSegment[] = [];
    const numSegments = Math.floor(Math.random() * 3) + 2; // 2-4 segments

    for (let i = 0; i < numSegments; i++) {
      const segmentRisk = Math.random();
      const riskLevel = segmentRisk < 0.3 ? 'low' : segmentRisk < 0.6 ? 'medium' : segmentRisk < 0.8 ? 'high' : 'critical';

      const weatherConditions = generateWeatherConditions(mode);
      const risks = generateSegmentRisks(mode, riskLevel);

      segments.push({
        id: `SEG-${i + 1}`,
        from: i === 0 ? from : `Waypoint ${i}`,
        to: i === numSegments - 1 ? to : `Waypoint ${i + 1}`,
        distance: Math.round(Math.random() * 2000) + 500,
        duration: Math.round(Math.random() * 48) + 12,
        riskLevel: riskLevel as 'low' | 'medium' | 'high' | 'critical',
        weatherConditions,
        risks
      });
    }

    return segments;
  };

  const generateWeatherConditions = (mode: string): string[] => {
    const conditions = [];

    if (mode === 'sea') {
      const seaConditions = ['Calm seas', 'Moderate waves', 'High winds', 'Storm warning', 'Foggy conditions'];
      const numConditions = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < numConditions; i++) {
        conditions.push(seaConditions[Math.floor(Math.random() * seaConditions.length)]);
      }
    } else if (mode === 'air') {
      const airConditions = ['Clear skies', 'Crosswinds', 'Thunderstorms', 'Icing conditions', 'Low visibility'];
      const numConditions = Math.floor(Math.random() * 2) + 1;
      for (let i = 0; i < numConditions; i++) {
        conditions.push(airConditions[Math.floor(Math.random() * airConditions.length)]);
      }
    } else {
      const groundConditions = ['Clear roads', 'Rain', 'Snow', 'Fog', 'High winds'];
      const numConditions = Math.floor(Math.random() * 2) + 1;
      for (let i = 0; i < numConditions; i++) {
        conditions.push(groundConditions[Math.floor(Math.random() * groundConditions.length)]);
      }
    }

    return conditions;
  };

  const generateSegmentRisks = (mode: string, riskLevel: string): RiskFactor[] => {
    const risks: RiskFactor[] = [];

    if (mode === 'sea') {
      risks.push({
        id: 'weather_sea',
        category: 'Weather',
        factor: 'Marine Weather Conditions',
        severity: riskLevel as 'low' | 'medium' | 'high' | 'critical',
        probability: Math.round(Math.random() * 40) + 30,
        description: 'Storm systems, high waves, or adverse weather patterns',
        impact: 'Delays, cargo damage, or route changes'
      });

      risks.push({
        id: 'piracy_sea',
        category: 'Security',
        factor: 'Piracy & Security Threats',
        severity: riskLevel === 'critical' ? 'high' : 'medium',
        probability: Math.round(Math.random() * 20) + 10,
        description: 'Potential security threats in certain maritime regions',
        impact: 'Cargo theft, crew safety, or route diversions'
      });
    } else if (mode === 'air') {
      risks.push({
        id: 'weather_air',
        category: 'Weather',
        factor: 'Aviation Weather',
        severity: riskLevel as 'low' | 'medium' | 'high' | 'critical',
        probability: Math.round(Math.random() * 35) + 25,
        description: 'Thunderstorms, icing, or low visibility affecting flights',
        impact: 'Flight delays, cancellations, or diversions'
      });

      risks.push({
        id: 'airspace_air',
        category: 'Regulatory',
        factor: 'Airspace Restrictions',
        severity: 'medium',
        probability: Math.round(Math.random() * 15) + 5,
        description: 'Temporary flight restrictions or airspace closures',
        impact: 'Route changes or delays'
      });
    } else {
      risks.push({
        id: 'weather_ground',
        category: 'Weather',
        factor: 'Road Conditions',
        severity: riskLevel as 'low' | 'medium' | 'high' | 'critical',
        probability: Math.round(Math.random() * 45) + 20,
        description: 'Snow, rain, fog, or other weather affecting road transport',
        impact: 'Delays, accidents, or route blockages'
      });

      risks.push({
        id: 'infrastructure_ground',
        category: 'Infrastructure',
        factor: 'Infrastructure Issues',
        severity: 'medium',
        probability: Math.round(Math.random() * 25) + 15,
        description: 'Road construction, bridge issues, or traffic congestion',
        impact: 'Delays or route changes'
      });
    }

    return risks;
  };

  const generateRecommendations = (riskLevel: string, mode: string, urgency: string): string[] => {
    const recommendations: string[] = [];

    if (riskLevel === 'critical') {
      recommendations.push('Consider alternative transport modes with lower risk profiles');
      recommendations.push('Implement comprehensive insurance coverage');
      recommendations.push('Establish contingency plans and backup routes');
      recommendations.push('Monitor weather and security updates continuously');
    } else if (riskLevel === 'high') {
      recommendations.push('Increase monitoring frequency for weather and route conditions');
      recommendations.push('Consider additional insurance for high-risk segments');
      recommendations.push('Plan buffer time for potential delays');
      recommendations.push('Maintain regular communication with carriers');
    } else if (riskLevel === 'medium') {
      recommendations.push('Monitor key risk indicators regularly');
      recommendations.push('Have contingency plans ready');
      recommendations.push('Consider partial insurance coverage');
    } else {
      recommendations.push('Standard monitoring procedures sufficient');
      recommendations.push('Basic insurance coverage recommended');
      recommendations.push('Regular route performance reviews');
    }

    // Mode-specific recommendations
    if (mode === 'sea' && riskLevel !== 'low') {
      recommendations.push('Consider weather routing services for optimal path selection');
    }
    if (mode === 'air' && urgency === 'critical') {
      recommendations.push('Priority handling and expedited customs clearance recommended');
    }

    return recommendations;
  };

  const generateAlternativeRoutes = (from: string, to: string, mode: string): RouteSegment[] => {
    const alternatives: RouteSegment[] = [];
    const numAlternatives = Math.floor(Math.random() * 2) + 1; // 1-2 alternatives

    for (let i = 0; i < numAlternatives; i++) {
      const altRoute = generateRouteSegments(from, to, mode);
      alternatives.push(...altRoute);
    }

    return alternatives.slice(0, 3); // Limit to 3 alternative segments
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'low': return <CheckCircle className="h-5 w-5" />;
      case 'medium': return <AlertCircle className="h-5 w-5" />;
      case 'high': return <AlertTriangle className="h-5 w-5" />;
      case 'critical': return <XCircle className="h-5 w-5" />;
      default: return <AlertCircle className="h-5 w-5" />;
    }
  };

  const getTransportIcon = (mode: string) => {
    switch (mode) {
      case 'sea': return <Waves className="h-5 w-5" />;
      case 'air': return <Cloud className="h-5 w-5" />;
      case 'ground': return <Navigation className="h-5 w-5" />;
      case 'rail': return <Wind className="h-5 w-5" />;
      default: return <MapPin className="h-5 w-5" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Shield className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">AI Risk Assessment</h1>
        </div>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Advanced artificial intelligence analyzes weather patterns, security threats,
          and logistical risks to provide comprehensive route risk assessments and
          mitigation strategies.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="assessment">Risk Assessment</TabsTrigger>
          <TabsTrigger value="results" disabled={!assessment}>Assessment Results</TabsTrigger>
          <TabsTrigger value="monitoring">Risk Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="assessment" className="space-y-6">
          {/* Route Information */}
          <Card>
            <CardHeader>
              <CardTitle>Route Information</CardTitle>
              <CardDescription>
                Define your shipping route and parameters for AI risk analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="origin">Origin *</Label>
                  <Select value={origin} onValueChange={setOrigin}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select origin" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destination">Destination *</Label>
                  <Select value={destination} onValueChange={setDestination}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="transport">Transport Mode</Label>
                  <Select value={transportMode} onValueChange={setTransportMode}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      {transportModes.map((mode) => (
                        <SelectItem key={mode.value} value={mode.value}>
                          <div className="flex items-center gap-2">
                            <span>{mode.icon}</span>
                            <span>{mode.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency Level</Label>
                  <Select value={urgency} onValueChange={setUrgency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      {urgencyLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cargoValue">Cargo Value (USD)</Label>
                  <Input
                    id="cargoValue"
                    type="number"
                    placeholder="Optional"
                    value={cargoValue}
                    onChange={(e) => setCargoValue(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Analysis Features */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-900">AI-Powered Risk Analysis</h3>
              </div>
              <div className="grid md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Cloud className="h-4 w-4 text-blue-600" />
                  <span>Weather Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-blue-600" />
                  <span>Security Assessment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-blue-600" />
                  <span>Route Optimization</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-blue-600" />
                  <span>Real-time Monitoring</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Generate Assessment Button */}
          <div className="flex justify-center">
            <Button onClick={generateRiskAssessment} size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Shield className="h-5 w-5 mr-2" />
              Generate AI Risk Assessment
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {assessment && (
            <>
              {/* Overall Risk Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Risk Assessment Summary</CardTitle>
                  <CardDescription>
                    AI-generated risk analysis for {assessment.origin} → {assessment.destination}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Overall Risk Level:</span>
                        <div className="flex items-center gap-2">
                          {getRiskIcon(assessment.overallRiskLevel)}
                          <Badge className={getRiskColor(assessment.overallRiskLevel)}>
                            {assessment.overallRiskLevel.toUpperCase()}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Risk Score:</span>
                        <div className="flex items-center gap-2">
                          <Progress value={assessment.riskScore} className="w-20" />
                          <span className="font-bold">{assessment.riskScore}/100</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">Route Details</div>
                      <div className="space-y-1 text-sm">
                        <div>Route ID: <span className="font-medium">{assessment.routeId}</span></div>
                        <div>Distance: <span className="font-medium">{assessment.totalDistance.toLocaleString()} km</span></div>
                        <div>Duration: <span className="font-medium">{Math.round(assessment.estimatedDuration)} hours</span></div>
                        <div>Transport: <span className="font-medium">{transportModes.find(m => m.value === transportMode)?.label}</span></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Route Segments Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Route Segment Analysis</CardTitle>
                  <CardDescription>
                    Detailed risk breakdown by route segments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assessment.routeSegments.map((segment, index) => (
                      <div key={segment.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-medium">Segment {index + 1}: {segment.from} → {segment.to}</h4>
                            <p className="text-sm text-gray-600">
                              {segment.distance} km • {segment.duration} hours
                            </p>
                          </div>
                          <Badge className={getRiskColor(segment.riskLevel)}>
                            {segment.riskLevel.toUpperCase()}
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="text-sm font-medium mb-2">Weather Conditions</h5>
                            <div className="flex flex-wrap gap-1">
                              {segment.weatherConditions.map((condition, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {condition}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h5 className="text-sm font-medium mb-2">Key Risks</h5>
                            <div className="space-y-1">
                              {segment.risks.slice(0, 2).map((risk) => (
                                <div key={risk.id} className="text-xs text-gray-600">
                                  • {risk.factor} ({risk.probability}% probability)
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>AI Recommendations</CardTitle>
                  <CardDescription>
                    Strategic recommendations to mitigate identified risks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {assessment.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{recommendation}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Alternative Routes */}
              {assessment.alternativeRoutes.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Alternative Route Options</CardTitle>
                    <CardDescription>
                      Lower-risk routing alternatives identified by AI
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {assessment.alternativeRoutes.slice(0, 2).map((route, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Alternative Route {index + 1}</span>
                            <Badge className={getRiskColor(route.riskLevel)}>
                              {route.riskLevel} risk
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {route.from} → {route.to} • {route.distance} km • {route.duration} hours
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          {/* Real-time Monitoring */}
          <Card>
            <CardHeader>
              <CardTitle>Real-time Risk Monitoring</CardTitle>
              <CardDescription>
                Continuous monitoring of route conditions and risk factors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Cloud className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-medium text-green-900">Weather Monitoring</h4>
                  <p className="text-sm text-green-700">Real-time weather updates and forecasts</p>
                </div>

                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-medium text-blue-900">Security Alerts</h4>
                  <p className="text-sm text-blue-700">Security threat monitoring and alerts</p>
                </div>

                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Navigation className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-medium text-purple-900">Route Tracking</h4>
                  <p className="text-sm text-purple-700">GPS tracking and route optimization</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Dashboard */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Dashboard</CardTitle>
              <CardDescription>
                Live risk metrics and alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Thermometer className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                  <div className="text-lg font-bold">72°F</div>
                  <div className="text-xs text-gray-600">Current Temp</div>
                </div>

                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Wind className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                  <div className="text-lg font-bold">15 mph</div>
                  <div className="text-xs text-gray-600">Wind Speed</div>
                </div>

                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                  <div className="text-lg font-bold">Medium</div>
                  <div className="text-xs text-gray-600">Weather Risk</div>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <div className="text-lg font-bold">Normal</div>
                  <div className="text-xs text-gray-600">Security Status</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">85%</div>
            <div className="text-sm text-gray-600">Prediction Accuracy</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Cloud className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">24/7</div>
            <div className="text-sm text-gray-600">Weather Monitoring</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Navigation className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">150+</div>
            <div className="text-sm text-gray-600">Risk Factors</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">Real-time</div>
            <div className="text-sm text-gray-600">Updates</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RiskAssessmentAI;
