
import React, { useState, useEffect } from 'react';
import { puterService } from '../../utils/puterService';
import { extractJson } from '../../utils/aiJson';
import { freightQuotePrompt } from '../../utils/toolPrompts';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Truck, Ship, Plane, Package } from "lucide-react";
import BackButton from '@/components/ui/BackButton';
import AIBadge from '../../components/ui/AIBadge';

const FreightCalculatorPage = () => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    weight: '',
    dimensions: { length: '', width: '', height: '' },
    shippingMode: '',
    packageType: ''
  });
  interface FreightResult {
    cost: string;
    transitTime: string;
    distance: number;
    surcharges?: Array<{ name: string; amount: string }>;
    carbonEmissionsKg?: number;
    modeRationale?: string;
    recommendations?: string[];
    error?: string;
  }
  const [result, setResult] = useState<FreightResult | null>(null);
  const [loading, setLoading] = useState(false);
  // Hydrate from cache
  useEffect(() => {
    try {
      const cached = localStorage.getItem('freight-calculator:last');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed?.formData) setFormData(parsed.formData);
        if (parsed?.result) setResult(parsed.result);
      }
    } catch {/* ignore */}
  }, []);

  const handleCalculate = async () => {
    setLoading(true);
    setResult(null);
    try {
      await puterService.ensureReady(4000);
      const weightKg = parseFloat(formData.weight) || 0;
      const dims = {
        length: parseFloat(formData.dimensions.length) || 0,
        width: parseFloat(formData.dimensions.width) || 0,
        height: parseFloat(formData.dimensions.height) || 0
      };
      const prompt = freightQuotePrompt({
        origin: formData.origin,
        destination: formData.destination,
        weightKg,
        dims,
        mode: formData.shippingMode,
        packageType: formData.packageType
      });
      const aiResp = await puterService.makeAIRequest(prompt, { temperature: 0.15, maxTokens: 700 });
      const text = typeof aiResp === 'string' ? aiResp : (aiResp as { text?: string }).text || '';
      const json = extractJson<{
        cost?: string|number;
        transitTime?: string;
        distance?: number|string;
        surcharges?: Array<{ name: string; amount: string }>;
        carbonEmissionsKg?: number;
        modeRationale?: string;
        recommendations?: string[];
      }>(text);
      if (json) {
        setResult({
          cost: (json.cost || '0').toString().replace(/[^0-9.]/g,'') ,
          transitTime: json.transitTime || 'N/A',
          distance: typeof json.distance === 'number' ? json.distance : parseInt(String(json.distance)) || 0,
          surcharges: json.surcharges,
          carbonEmissionsKg: json.carbonEmissionsKg,
          modeRationale: json.modeRationale,
          recommendations: json.recommendations
        });
        try { localStorage.setItem('freight-calculator:last', JSON.stringify({ formData, result: {
          cost: (json.cost || '0').toString().replace(/[^0-9.]/g,''),
          transitTime: json.transitTime || 'N/A',
          distance: typeof json.distance === 'number' ? json.distance : parseInt(String(json.distance)) || 0,
          surcharges: json.surcharges,
          carbonEmissionsKg: json.carbonEmissionsKg,
          modeRationale: json.modeRationale,
          recommendations: json.recommendations
        }})); } catch {/* ignore */}
      } else {
        setResult({ cost: '0', transitTime: 'N/A', distance: 0, error: 'Failed to parse AI response' });
      }
    } catch (err) {
      console.error('Freight AI error', err);
      setResult({ cost: '0', transitTime: 'N/A', distance: 0, error: 'AI calculation failed' });
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Header />
      <main className="pt-16">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-6">
              <BackButton to="/resources" label="Back to Resources" />
            </div>
            <div className="mx-auto max-w-2xl text-center mb-12">
              <Calculator className="h-16 w-16 text-blue-600 mx-auto mb-6" />
              <div className="flex items-center justify-center gap-3 mb-4">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  Freight Calculator
                </h1>
                <AIBadge />
              </div>
              <p className="text-lg leading-8 text-gray-600">
                Calculate shipping costs and transit times for your cargo
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Shipment Details
                  </CardTitle>
                  <CardDescription>
                    Enter your shipment information to get an accurate quote
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="origin">Origin</Label>
                      <Input
                        id="origin"
                        value={formData.origin}
                        onChange={(e) => setFormData({...formData, origin: e.target.value})}
                        placeholder="Port/City"
                      />
                    </div>
                    <div>
                      <Label htmlFor="destination">Destination</Label>
                      <Input
                        id="destination"
                        value={formData.destination}
                        onChange={(e) => setFormData({...formData, destination: e.target.value})}
                        placeholder="Port/City"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={formData.weight}
                      onChange={(e) => setFormData({...formData, weight: e.target.value})}
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <Label>Dimensions (cm)</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Input
                        value={formData.dimensions.length}
                        onChange={(e) => setFormData({...formData, dimensions: {...formData.dimensions, length: e.target.value}})}
                        placeholder="Length"
                      />
                      <Input
                        value={formData.dimensions.width}
                        onChange={(e) => setFormData({...formData, dimensions: {...formData.dimensions, width: e.target.value}})}
                        placeholder="Width"
                      />
                      <Input
                        value={formData.dimensions.height}
                        onChange={(e) => setFormData({...formData, dimensions: {...formData.dimensions, height: e.target.value}})}
                        placeholder="Height"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Shipping Mode</Label>
                    <Select value={formData.shippingMode} onValueChange={(value) => setFormData({...formData, shippingMode: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select shipping mode" />
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
                            Ground Transport
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    onClick={handleCalculate} 
                    className="w-full" 
                    disabled={loading || !formData.origin || !formData.destination || !formData.weight}
                  >
                    {loading ? 'Calculating...' : 'Calculate Freight'}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quote Results</CardTitle>
                  <CardDescription>
                    Estimated shipping cost and transit time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {result ? (
                    <div className="space-y-6">
                      <div className="text-center p-6 bg-blue-50 rounded-lg">
                        <h3 className="text-2xl font-bold text-blue-900 mb-2">
                          ${result.cost} USD
                        </h3>
                        <p className="text-blue-700">Estimated Total Cost</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-semibold text-gray-900">{result.transitTime}</h4>
                          <p className="text-sm text-gray-600">Transit Time</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-semibold text-gray-900">{result.distance} km</h4>
                          <p className="text-sm text-gray-600">Distance</p>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4 space-y-4">
                        {result.surcharges && result.surcharges.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-2">Surcharges:</h4>
                            <ul className="text-sm space-y-1 text-gray-600">
                              {result.surcharges.map((s, i) => (
                                <li key={i}>• {s.name}: {s.amount}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {result.modeRationale && (
                          <div>
                            <h4 className="font-semibold mb-2">Mode Rationale</h4>
                            <p className="text-sm text-gray-600">{result.modeRationale}</p>
                          </div>
                        )}
                        {result.recommendations && result.recommendations.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-2">Recommendations</h4>
                            <ul className="text-sm space-y-1 text-gray-600">
                              {result.recommendations.map((r,i)=>(<li key={i}>• {r}</li>))}
                            </ul>
                          </div>
                        )}
                        {result.error && (
                          <p className="text-sm text-red-600">{result.error}</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Calculator className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Enter shipment details to calculate freight costs</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FreightCalculatorPage;
