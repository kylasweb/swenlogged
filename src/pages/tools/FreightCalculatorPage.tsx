
import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Truck, Ship, Plane, Package } from "lucide-react";

const FreightCalculatorPage = () => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    weight: '',
    dimensions: { length: '', width: '', height: '' },
    shippingMode: '',
    packageType: ''
  });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    setLoading(true);
    
    // Simulate calculation
    setTimeout(() => {
      const baseRate = {
        air: 8.5,
        sea: 2.1,
        ground: 1.5
      }[formData.shippingMode as keyof typeof baseRate] || 3.0;
      
      const weight = parseFloat(formData.weight) || 0;
      const volume = (parseFloat(formData.dimensions.length) || 0) * 
                    (parseFloat(formData.dimensions.width) || 0) * 
                    (parseFloat(formData.dimensions.height) || 0) / 1000000; // m³
      
      const estimatedCost = (weight * baseRate) + (volume * 150);
      const transitTime = {
        air: '1-3 days',
        sea: '15-30 days', 
        ground: '3-7 days'
      }[formData.shippingMode as keyof typeof transitTime] || '5-10 days';
      
      setResult({
        cost: estimatedCost.toFixed(2),
        transitTime,
        distance: Math.floor(Math.random() * 5000) + 500
      });
      setLoading(false);
    }, 1500);
  };


  return (
    <>
      <Header />
      <main className="pt-16">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <Calculator className="h-16 w-16 text-blue-600 mx-auto mb-6" />
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
                Freight Calculator
              </h1>
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
                      
                      <div className="border-t pt-4">
                        <h4 className="font-semibold mb-2">Included Services:</h4>
                        <ul className="text-sm space-y-1 text-gray-600">
                          <li>• Door-to-door pickup</li>
                          <li>• Insurance coverage</li>
                          <li>• Tracking service</li>
                          <li>• Basic customs clearance</li>
                        </ul>
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
