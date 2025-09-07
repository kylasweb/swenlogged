import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Package, Truck, Shield, Zap, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { toast } from "sonner";

interface PackagingRecommendation {
  primaryPackage: {
    type: string;
    material: string;
    dimensions: string;
    weight: string;
    cost: number;
  };
  secondaryPackaging: {
    type: string;
    material: string;
    protection: string[];
  };
  shippingMethod: string;
  estimatedCost: number;
  environmental: {
    recyclable: boolean;
    carbonFootprint: string;
    sustainable: boolean;
  };
  specialRequirements: string[];
}

const PackagingAdvisor = () => {
  const [formData, setFormData] = useState({
    productType: '',
    dimensions: {
      length: '',
      width: '',
      height: ''
    },
    weight: '',
    fragility: '',
    shippingMethod: '',
    destination: '',
    quantity: '1',
    specialRequirements: '',
    budget: ''
  });

  const [recommendation, setRecommendation] = useState<PackagingRecommendation | null>(null);
  const [loading, setLoading] = useState(false);

  const productTypes = [
    { value: 'electronics', label: 'Electronics & Gadgets', icon: '📱' },
    { value: 'fragile', label: 'Fragile Items (Glass/Ceramics)', icon: '🏺' },
    { value: 'clothing', label: 'Clothing & Textiles', icon: '👕' },
    { value: 'books', label: 'Books & Documents', icon: '📚' },
    { value: 'food', label: 'Food & Beverages', icon: '🍎' },
    { value: 'chemicals', label: 'Chemicals & Liquids', icon: '⚗️' },
    { value: 'machinery', label: 'Machinery & Parts', icon: '⚙️' },
    { value: 'furniture', label: 'Furniture', icon: '🪑' },
    { value: 'artwork', label: 'Artwork & Antiques', icon: '🎨' },
    { value: 'medical', label: 'Medical Equipment', icon: '⚕️' }
  ];

  const fragilityLevels = [
    { value: 'low', label: 'Low Fragility', description: 'Books, clothing, sturdy items' },
    { value: 'medium', label: 'Medium Fragility', description: 'Electronics, small appliances' },
    { value: 'high', label: 'High Fragility', description: 'Glass, ceramics, delicate items' },
    { value: 'extreme', label: 'Extreme Fragility', description: 'Antiques, artwork, precision instruments' }
  ];

  const shippingMethods = [
    { value: 'air', label: 'Air Freight', icon: '✈️', description: 'Fast, expensive, good for urgent/valuable items' },
    { value: 'sea', label: 'Sea Freight', icon: '🚢', description: 'Slow, cost-effective, good for bulk/heavy items' },
    { value: 'ground', label: 'Ground Transport', icon: '🚛', description: 'Reliable, moderate speed, domestic shipping' },
    { value: 'express', label: 'Express Courier', icon: '📦', description: 'Very fast, premium service, high cost' }
  ];

  const destinations = [
    { value: 'domestic', label: 'Domestic', description: 'Within same country' },
    { value: 'regional', label: 'Regional', description: 'Within same continent' },
    { value: 'international', label: 'International', description: 'Cross-continent' },
    { value: 'remote', label: 'Remote Areas', description: 'Difficult access locations' }
  ];

  const getPackagingRecommendation = (data: typeof formData): PackagingRecommendation => {
    const weight = parseFloat(data.weight) || 0;
    const volume = (parseFloat(data.dimensions.length) || 0) *
                   (parseFloat(data.dimensions.width) || 0) *
                   (parseFloat(data.dimensions.height) || 0);

    // Base recommendations by product type
    const baseRecommendations: Record<string, Partial<PackagingRecommendation>> = {
      electronics: {
        primaryPackage: {
          type: 'Corrugated Box',
          material: 'Double-wall cardboard',
          dimensions: 'Custom sized',
          weight: 'Lightweight',
          cost: 15
        },
        secondaryPackaging: {
          type: 'Foam padding + Bubble wrap',
          material: 'PE foam + Plastic',
          protection: ['Shock absorption', 'Static protection', 'Moisture resistance']
        }
      },
      fragile: {
        primaryPackage: {
          type: 'Wooden Crate',
          material: 'Plywood',
          dimensions: 'Custom sized',
          weight: 'Heavy duty',
          cost: 45
        },
        secondaryPackaging: {
          type: 'Multi-layer protection',
          material: 'Foam + Cardboard + Plastic',
          protection: ['Impact resistance', 'Vibration dampening', 'Secure fastening']
        }
      },
      clothing: {
        primaryPackage: {
          type: 'Cardboard Box',
          material: 'Single-wall cardboard',
          dimensions: 'Standard sizes',
          weight: 'Lightweight',
          cost: 8
        },
        secondaryPackaging: {
          type: 'Plastic bags',
          material: 'Polyethylene',
          protection: ['Dust protection', 'Basic moisture resistance']
        }
      },
      food: {
        primaryPackage: {
          type: 'Food-grade Container',
          material: 'Cardboard + Plastic lining',
          dimensions: 'Standard sizes',
          weight: 'Medium weight',
          cost: 12
        },
        secondaryPackaging: {
          type: 'Insulated packaging',
          material: 'Foam + Refrigerant gel',
          protection: ['Temperature control', 'Contamination prevention']
        }
      },
      machinery: {
        primaryPackage: {
          type: 'Industrial Crate',
          material: 'Wood + Metal reinforcements',
          dimensions: 'Custom oversized',
          weight: 'Heavy duty',
          cost: 120
        },
        secondaryPackaging: {
          type: 'Industrial wrapping',
          material: 'Stretch film + Strapping',
          protection: ['Structural integrity', 'Weather protection', 'Secure transport']
        }
      }
    };

    const baseRec = baseRecommendations[data.productType] || baseRecommendations.clothing;

    // Adjust for fragility
    let costMultiplier = 1;
    let protectionLevel = ['Basic protection'];

    switch (data.fragility) {
      case 'medium':
        costMultiplier = 1.3;
        protectionLevel = ['Shock absorption', 'Basic cushioning'];
        break;
      case 'high':
        costMultiplier = 1.8;
        protectionLevel = ['Impact resistance', 'Vibration dampening', 'Secure fastening'];
        break;
      case 'extreme':
        costMultiplier = 2.5;
        protectionLevel = ['Museum-quality protection', 'Climate control', 'Professional crating'];
        break;
    }

    // Adjust for shipping method
    let shippingCost = 0;
    const shippingMethod = data.shippingMethod;

    switch (data.shippingMethod) {
      case 'air':
        shippingCost = weight * 8 + volume * 0.001;
        break;
      case 'sea':
        shippingCost = weight * 2 + volume * 0.0005;
        break;
      case 'ground':
        shippingCost = weight * 3 + volume * 0.0008;
        break;
      case 'express':
        shippingCost = weight * 12 + volume * 0.002;
        break;
    }

    // Environmental considerations
    const isSustainable = ['clothing', 'books'].includes(data.productType);
    const carbonFootprint = data.shippingMethod === 'air' ? 'High' :
                           data.shippingMethod === 'sea' ? 'Medium' : 'Low';

    return {
      primaryPackage: {
        ...baseRec.primaryPackage!,
        cost: Math.round(baseRec.primaryPackage!.cost * costMultiplier)
      },
      secondaryPackaging: {
        ...baseRec.secondaryPackaging!,
        protection: protectionLevel
      },
      shippingMethod: shippingMethods.find(m => m.value === data.shippingMethod)?.label || 'Standard Shipping',
      estimatedCost: Math.round((baseRec.primaryPackage!.cost * costMultiplier) + shippingCost),
      environmental: {
        recyclable: isSustainable,
        carbonFootprint,
        sustainable: isSustainable
      },
      specialRequirements: data.specialRequirements ? [data.specialRequirements] : []
    };
  };

  const handleSubmit = async () => {
    if (!formData.productType || !formData.weight || !formData.fragility || !formData.shippingMethod) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const rec = getPackagingRecommendation(formData);
      setRecommendation(rec);
      toast.success('Packaging recommendation generated!');

    } catch (error) {
      toast.error('Failed to generate recommendation. Please try again.');
      console.error('Packaging recommendation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Package className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-900">Packaging Advisor</h1>
        </div>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Get personalized packaging recommendations based on your product type, dimensions,
          fragility, and shipping requirements. Optimize protection while minimizing costs.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Product & Shipping Details
            </CardTitle>
            <CardDescription>
              Tell us about your product to get the best packaging recommendation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="productType">Product Type *</Label>
              <Select value={formData.productType} onValueChange={(value) => setFormData(prev => ({ ...prev, productType: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select product type" />
                </SelectTrigger>
                <SelectContent>
                  {productTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <span>{type.icon}</span>
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="length">Length (cm)</Label>
                <Input
                  id="length"
                  type="number"
                  placeholder="30"
                  value={formData.dimensions.length}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    dimensions: { ...prev.dimensions, length: e.target.value }
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="width">Width (cm)</Label>
                <Input
                  id="width"
                  type="number"
                  placeholder="20"
                  value={formData.dimensions.width}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    dimensions: { ...prev.dimensions, width: e.target.value }
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="15"
                  value={formData.dimensions.height}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    dimensions: { ...prev.dimensions, height: e.target.value }
                  }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg) *</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="2.5"
                  value={formData.weight}
                  onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fragility">Fragility Level *</Label>
              <Select value={formData.fragility} onValueChange={(value) => setFormData(prev => ({ ...prev, fragility: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select fragility level" />
                </SelectTrigger>
                <SelectContent>
                  {fragilityLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      <div>
                        <div className="font-medium">{level.label}</div>
                        <div className="text-sm text-gray-600">{level.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shippingMethod">Shipping Method *</Label>
              <Select value={formData.shippingMethod} onValueChange={(value) => setFormData(prev => ({ ...prev, shippingMethod: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select shipping method" />
                </SelectTrigger>
                <SelectContent>
                  {shippingMethods.map((method) => (
                    <SelectItem key={method.value} value={method.value}>
                      <div className="flex items-center gap-2">
                        <span>{method.icon}</span>
                        <div>
                          <div className="font-medium">{method.label}</div>
                          <div className="text-sm text-gray-600">{method.description}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination">Destination Type</Label>
              <Select value={formData.destination} onValueChange={(value) => setFormData(prev => ({ ...prev, destination: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination type" />
                </SelectTrigger>
                <SelectContent>
                  {destinations.map((dest) => (
                    <SelectItem key={dest.value} value={dest.value}>
                      <div>
                        <div className="font-medium">{dest.label}</div>
                        <div className="text-sm text-gray-600">{dest.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialRequirements">Special Requirements</Label>
              <Textarea
                id="specialRequirements"
                placeholder="e.g., Temperature sensitive, hazardous materials, fragile artwork..."
                value={formData.specialRequirements}
                onChange={(e) => setFormData(prev => ({ ...prev, specialRequirements: e.target.value }))}
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Package className="h-4 w-4 mr-2" />
                  Get Packaging Recommendation
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle>Packaging Recommendation</CardTitle>
            <CardDescription>
              Optimized packaging solution for your shipment
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recommendation ? (
              <div className="space-y-6">
                {/* Primary Packaging */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Package className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-blue-900">Primary Packaging</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div><strong>Type:</strong> {recommendation.primaryPackage.type}</div>
                    <div><strong>Material:</strong> {recommendation.primaryPackage.material}</div>
                    <div><strong>Dimensions:</strong> {recommendation.primaryPackage.dimensions}</div>
                    <div><strong>Weight Rating:</strong> {recommendation.primaryPackage.weight}</div>
                    <div><strong>Cost:</strong> {formatCurrency(recommendation.primaryPackage.cost)}</div>
                  </div>
                </div>

                {/* Secondary Packaging */}
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold text-green-900">Secondary Packaging</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div><strong>Type:</strong> {recommendation.secondaryPackaging.type}</div>
                    <div><strong>Material:</strong> {recommendation.secondaryPackaging.material}</div>
                    <div><strong>Protection Features:</strong></div>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      {recommendation.secondaryPackaging.protection.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Shipping & Cost */}
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Truck className="h-5 w-5 text-purple-600" />
                    <h3 className="font-semibold text-purple-900">Shipping & Cost</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div><strong>Recommended Method:</strong> {recommendation.shippingMethod}</div>
                    <div><strong>Estimated Total Cost:</strong> {formatCurrency(recommendation.estimatedCost)}</div>
                  </div>
                </div>

                {/* Environmental Impact */}
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="h-5 w-5 text-orange-600" />
                    <h3 className="font-semibold text-orange-900">Environmental Impact</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div><strong>Recyclable:</strong> {recommendation.environmental.recyclable ? 'Yes' : 'No'}</div>
                    <div><strong>Carbon Footprint:</strong> {recommendation.environmental.carbonFootprint}</div>
                    <div><strong>Sustainable Option:</strong> {recommendation.environmental.sustainable ? 'Yes' : 'No'}</div>
                  </div>
                </div>

                {/* Special Requirements */}
                {recommendation.specialRequirements.length > 0 && (
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      <h3 className="font-semibold text-yellow-900">Special Considerations</h3>
                    </div>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {recommendation.specialRequirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Success Message */}
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div className="text-sm text-green-800">
                      <strong>Recommendation Generated!</strong> This packaging solution optimizes protection,
                      cost, and environmental impact for your specific requirements.
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Fill out the form and click "Get Packaging Recommendation" to see optimized packaging solutions</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tips Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Packaging Best Practices
          </CardTitle>
          <CardDescription>
            Tips for successful international shipping
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">General Tips</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Always use new packaging materials for international shipments</li>
                <li>• Double-box fragile items for extra protection</li>
                <li>• Label packages clearly with contents and handling instructions</li>
                <li>• Consider weight distribution for stable transport</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Cost Optimization</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Choose appropriate box sizes to avoid wasted space</li>
                <li>• Consider reusable packaging for frequent shipments</li>
                <li>• Evaluate trade-offs between protection and cost</li>
                <li>• Use volume-based pricing when available</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PackagingAdvisor;
