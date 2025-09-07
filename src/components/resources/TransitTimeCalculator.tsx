import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Truck, Ship, Plane, Calculator } from "lucide-react";
import { toast } from "sonner";

interface TransitTimeResult {
  origin: string;
  destination: string;
  mode: 'air' | 'sea' | 'ground';
  distance: number;
  estimatedTime: {
    min: number;
    max: number;
    unit: 'hours' | 'days';
  };
  factors: string[];
  reliability: 'high' | 'medium' | 'low';
}

const TransitTimeCalculator = () => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    mode: '' as 'air' | 'sea' | 'ground' | '',
    cargoType: 'general'
  });

  const [result, setResult] = useState<TransitTimeResult | null>(null);
  const [loading, setLoading] = useState(false);

  // Mock data for demonstration - replace with real API calls
  const mockTransitData = {
    air: {
      domestic: { min: 4, max: 24, unit: 'hours' as const, reliability: 'high' as const },
      international: { min: 8, max: 48, unit: 'hours' as const, reliability: 'high' as const },
      factors: ['Weather conditions', 'Customs clearance', 'Airport congestion']
    },
    sea: {
      domestic: { min: 2, max: 5, unit: 'days' as const, reliability: 'medium' as const },
      international: { min: 15, max: 35, unit: 'days' as const, reliability: 'medium' as const },
      factors: ['Port congestion', 'Weather at sea', 'Customs processing', 'Transshipment']
    },
    ground: {
      domestic: { min: 1, max: 3, unit: 'days' as const, reliability: 'high' as const },
      international: { min: 5, max: 14, unit: 'days' as const, reliability: 'medium' as const },
      factors: ['Border crossings', 'Road conditions', 'Driver availability', 'Customs delays']
    }
  };

  const handleCalculate = async () => {
    if (!formData.origin || !formData.destination || !formData.mode) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Determine if route is domestic or international (simplified logic)
      const isDomestic = formData.origin.split(',').pop()?.trim() === formData.destination.split(',').pop()?.trim();

      const modeData = mockTransitData[formData.mode];
      const routeType = isDomestic ? 'domestic' : 'international';
      const timeData = modeData[routeType];

      // Calculate approximate distance (simplified)
      const distance = Math.floor(Math.random() * 8000) + 500;

      const result: TransitTimeResult = {
        origin: formData.origin,
        destination: formData.destination,
        mode: formData.mode,
        distance,
        estimatedTime: timeData,
        factors: modeData.factors,
        reliability: timeData.reliability
      };

      setResult(result);
      toast.success('Transit time calculated successfully!');

    } catch (error) {
      toast.error('Failed to calculate transit time. Please try again.');
      console.error('Transit time calculation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'air': return <Plane className="h-5 w-5" />;
      case 'sea': return <Ship className="h-5 w-5" />;
      case 'ground': return <Truck className="h-5 w-5" />;
      default: return <Calculator className="h-5 w-5" />;
    }
  };

  const getReliabilityColor = (reliability: string) => {
    switch (reliability) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Clock className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Transit Time Calculator</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Calculate estimated transit times for your shipments based on origin, destination, and transportation mode.
          Get accurate estimates to plan your logistics effectively.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Route Information
            </CardTitle>
            <CardDescription>
              Enter your shipment details to calculate transit time
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="origin">Origin *</Label>
              <Input
                id="origin"
                placeholder="e.g., New York, NY, USA"
                value={formData.origin}
                onChange={(e) => handleInputChange('origin', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination">Destination *</Label>
              <Input
                id="destination"
                placeholder="e.g., London, UK"
                value={formData.destination}
                onChange={(e) => handleInputChange('destination', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mode">Transportation Mode *</Label>
              <Select value={formData.mode} onValueChange={(value) => handleInputChange('mode', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select transportation mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="air">
                    <div className="flex items-center gap-2">
                      <Plane className="h-4 w-4" />
                      Air Freight
                    </div>
                  </SelectItem>
                  <SelectItem value="sea">
                    <div className="flex items-center gap-2">
                      <Ship className="h-4 w-4" />
                      Ocean Freight
                    </div>
                  </SelectItem>
                  <SelectItem value="ground">
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4" />
                      Ground Transportation
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cargoType">Cargo Type</Label>
              <Select value={formData.cargoType} onValueChange={(value) => handleInputChange('cargoType', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Cargo</SelectItem>
                  <SelectItem value="perishable">Perishable Goods</SelectItem>
                  <SelectItem value="hazardous">Hazardous Materials</SelectItem>
                  <SelectItem value="fragile">Fragile Items</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleCalculate}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Calculating...
                </>
              ) : (
                <>
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate Transit Time
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle>Transit Time Results</CardTitle>
            <CardDescription>
              Estimated delivery time and factors affecting transit
            </CardDescription>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg">
                  {getModeIcon(result.mode)}
                  <div>
                    <div className="font-semibold text-blue-900">
                      {result.origin} → {result.destination}
                    </div>
                    <div className="text-sm text-blue-700">
                      via {result.mode.charAt(0).toUpperCase() + result.mode.slice(1)} Freight
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">
                      {result.estimatedTime.min}-{result.estimatedTime.max}
                    </div>
                    <div className="text-sm text-gray-600">
                      {result.estimatedTime.unit}
                    </div>
                  </div>

                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">
                      {result.distance.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">km</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Reliability:</span>
                  <Badge className={getReliabilityColor(result.reliability)}>
                    {result.reliability.charAt(0).toUpperCase() + result.reliability.slice(1)}
                  </Badge>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Factors Affecting Transit:</h4>
                  <ul className="space-y-1">
                    {(result.factors || []).map((factor, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> These are estimated times based on typical conditions.
                    Actual transit times may vary due to weather, customs, or other factors.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Enter your route details and click "Calculate" to see transit time estimates</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle>Understanding Transit Times</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Plane className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold mb-2">Air Freight</h3>
              <p className="text-sm text-gray-600">Fastest option, 1-5 days internationally. Best for urgent shipments.</p>
            </div>

            <div className="text-center">
              <Ship className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold mb-2">Ocean Freight</h3>
              <p className="text-sm text-gray-600">Cost-effective for large volumes, 15-35 days internationally.</p>
            </div>

            <div className="text-center">
              <Truck className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold mb-2">Ground Transport</h3>
              <p className="text-sm text-gray-600">Reliable for domestic shipping, 1-14 days depending on distance.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransitTimeCalculator;
