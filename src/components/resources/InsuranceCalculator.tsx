import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Calculator, AlertTriangle, CheckCircle, Info, DollarSign } from "lucide-react";
import { toast } from "sonner";

interface InsuranceQuote {
  coverageType: string;
  basePremium: number;
  additionalCoverage: number;
  totalPremium: number;
  coverageAmount: number;
  deductible: number;
  coverageDetails: {
    theft: boolean;
    damage: boolean;
    loss: boolean;
    delay: boolean;
    customsIssues: boolean;
  };
  exclusions: string[];
  recommended: boolean;
}

const InsuranceCalculator = () => {
  const [formData, setFormData] = useState({
    shipmentValue: '',
    shippingMethod: '',
    destination: '',
    productType: '',
    coverageType: 'basic',
    additionalCoverage: [] as string[],
    highValue: false
  });

  const [quotes, setQuotes] = useState<InsuranceQuote[]>([]);
  const [loading, setLoading] = useState(false);

  const shippingMethods = [
    { value: 'air', label: 'Air Freight', risk: 'low', icon: '✈️' },
    { value: 'sea', label: 'Sea Freight', risk: 'high', icon: '🚢' },
    { value: 'ground', label: 'Ground Transport', risk: 'medium', icon: '🚛' },
    { value: 'express', label: 'Express Courier', risk: 'low', icon: '📦' }
  ];

  const destinations = [
    { value: 'domestic', label: 'Domestic', risk: 'low' },
    { value: 'regional', label: 'Regional', risk: 'medium' },
    { value: 'international', label: 'International', risk: 'high' },
    { value: 'remote', label: 'Remote Areas', risk: 'very-high' }
  ];

  const productTypes = [
    { value: 'electronics', label: 'Electronics', risk: 'high', icon: '📱' },
    { value: 'clothing', label: 'Clothing', risk: 'low', icon: '👕' },
    { value: 'machinery', label: 'Machinery', risk: 'very-high', icon: '⚙️' },
    { value: 'fragile', label: 'Fragile Items', risk: 'high', icon: '🏺' },
    { value: 'food', label: 'Food & Beverages', risk: 'medium', icon: '🍎' },
    { value: 'chemicals', label: 'Chemicals', risk: 'very-high', icon: '⚗️' },
    { value: 'artwork', label: 'Artwork', risk: 'very-high', icon: '🎨' },
    { value: 'documents', label: 'Documents', risk: 'low', icon: '📄' }
  ];

  const coverageTypes = [
    {
      value: 'basic',
      label: 'Basic Coverage',
      description: 'Essential protection against loss and damage',
      baseRate: 0.005 // 0.5%
    },
    {
      value: 'comprehensive',
      label: 'Comprehensive',
      description: 'Full protection including theft and customs issues',
      baseRate: 0.008 // 0.8%
    },
    {
      value: 'premium',
      label: 'Premium Protection',
      description: 'Maximum coverage with additional benefits',
      baseRate: 0.012 // 1.2%
    }
  ];

  const additionalCoverages = [
    { value: 'theft', label: 'Theft Protection', cost: 0.002, description: 'Coverage for theft during transit' },
    { value: 'delay', label: 'Delay Coverage', cost: 0.001, description: 'Compensation for shipping delays' },
    { value: 'customs', label: 'Customs Issues', cost: 0.003, description: 'Protection against customs complications' },
    { value: 'war', label: 'War & Political Risk', cost: 0.005, description: 'Coverage for political unrest' }
  ];

  const calculateInsurance = async () => {
    if (!formData.shipmentValue || !formData.shippingMethod || !formData.destination || !formData.productType) {
      toast.error('Please fill in all required fields');
      return;
    }

    const value = parseFloat(formData.shipmentValue);
    if (isNaN(value) || value <= 0) {
      toast.error('Please enter a valid shipment value');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1200));

      const quotes = generateQuotes(value, formData);
      setQuotes(quotes);
      toast.success('Insurance quotes calculated!');

    } catch (error) {
      toast.error('Failed to calculate insurance quotes. Please try again.');
      console.error('Insurance calculation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateQuotes = (value: number, data: typeof formData): InsuranceQuote[] => {
    const shippingRisk = shippingMethods.find(m => m.value === data.shippingMethod)?.risk || 'medium';
    const destinationRisk = destinations.find(d => d.value === data.destination)?.risk || 'medium';
    const productRisk = productTypes.find(p => p.value === data.productType)?.risk || 'medium';

    // Risk multipliers
    const riskMultipliers = {
      low: 0.8,
      medium: 1.0,
      high: 1.3,
      'very-high': 1.6
    };

    const shippingMultiplier = riskMultipliers[shippingRisk as keyof typeof riskMultipliers];
    const destinationMultiplier = riskMultipliers[destinationRisk as keyof typeof riskMultipliers];
    const productMultiplier = riskMultipliers[productRisk as keyof typeof riskMultipliers];

    const combinedMultiplier = shippingMultiplier * destinationMultiplier * productMultiplier;

    return coverageTypes.map((coverage, index) => {
      const basePremium = value * coverage.baseRate * combinedMultiplier;
      const minPremium = Math.max(basePremium, 50); // Minimum premium of $50

      // Additional coverage costs
      const additionalCost = data.additionalCoverage.reduce((total, coverageType) => {
        const coverageOption = additionalCoverages.find(c => c.value === coverageType);
        return total + (coverageOption ? value * coverageOption.cost : 0);
      }, 0);

      const totalPremium = minPremium + additionalCost;
      const deductible = Math.min(value * 0.01, 500); // 1% of value or $500 max

      // Coverage details based on type
      const coverageDetails = {
        theft: coverage.value !== 'basic',
        damage: true,
        loss: true,
        delay: coverage.value === 'premium',
        customsIssues: coverage.value !== 'basic'
      };

      // Exclusions
      const exclusions = [];
      if (coverage.value === 'basic') {
        exclusions.push('Theft coverage', 'Customs issues');
      }
      if (coverage.value !== 'premium') {
        exclusions.push('Delay compensation');
      }

      return {
        coverageType: coverage.label,
        basePremium: Math.round(minPremium),
        additionalCoverage: Math.round(additionalCost),
        totalPremium: Math.round(totalPremium),
        coverageAmount: value,
        deductible: Math.round(deductible),
        coverageDetails,
        exclusions,
        recommended: index === 1 // Comprehensive is recommended by default
      };
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'very-high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Shield className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Insurance Calculator</h1>
        </div>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Calculate comprehensive shipping insurance coverage and premiums.
          Protect your valuable shipments with the right insurance policy.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Shipment Details
            </CardTitle>
            <CardDescription>
              Enter your shipment information for insurance calculation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="shipmentValue">Shipment Value (USD) *</Label>
              <Input
                id="shipmentValue"
                type="number"
                placeholder="10000"
                value={formData.shipmentValue}
                onChange={(e) => setFormData(prev => ({ ...prev, shipmentValue: e.target.value }))}
              />
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
                          <Badge className={`text-xs ${getRiskColor(method.risk)}`}>
                            {method.risk} risk
                          </Badge>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination">Destination *</Label>
              <Select value={formData.destination} onValueChange={(value) => setFormData(prev => ({ ...prev, destination: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  {destinations.map((dest) => (
                    <SelectItem key={dest.value} value={dest.value}>
                      <div>
                        <div className="font-medium">{dest.label}</div>
                        <Badge className={`text-xs ${getRiskColor(dest.risk)}`}>
                          {dest.risk} risk
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="productType">Product Type *</Label>
              <Select value={formData.productType} onValueChange={(value) => setFormData(prev => ({ ...prev, productType: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select product type" />
                </SelectTrigger>
                <SelectContent>
                  {productTypes.map((product) => (
                    <SelectItem key={product.value} value={product.value}>
                      <div className="flex items-center gap-2">
                        <span>{product.icon}</span>
                        <div>
                          <div className="font-medium">{product.label}</div>
                          <Badge className={`text-xs ${getRiskColor(product.risk)}`}>
                            {product.risk} risk
                          </Badge>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Coverage Type</Label>
              <RadioGroup
                value={formData.coverageType}
                onValueChange={(value) => setFormData(prev => ({ ...prev, coverageType: value }))}
              >
                {coverageTypes.map((coverage) => (
                  <div key={coverage.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={coverage.value} id={coverage.value} />
                    <Label htmlFor={coverage.value} className="flex-1">
                      <div className="font-medium">{coverage.label}</div>
                      <div className="text-sm text-gray-600">{coverage.description}</div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label>Additional Coverage Options</Label>
              {additionalCoverages.map((coverage) => (
                <div key={coverage.value} className="flex items-start space-x-2">
                  <Checkbox
                    id={coverage.value}
                    checked={formData.additionalCoverage.includes(coverage.value)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFormData(prev => ({
                          ...prev,
                          additionalCoverage: [...prev.additionalCoverage, coverage.value]
                        }));
                      } else {
                        setFormData(prev => ({
                          ...prev,
                          additionalCoverage: prev.additionalCoverage.filter(c => c !== coverage.value)
                        }));
                      }
                    }}
                  />
                  <Label htmlFor={coverage.value} className="flex-1 text-sm">
                    <div className="font-medium">{coverage.label}</div>
                    <div className="text-gray-600">{coverage.description}</div>
                    <div className="text-xs text-blue-600">+{coverage.cost * 100}% of shipment value</div>
                  </Label>
                </div>
              ))}
            </div>

            <Button
              onClick={calculateInsurance}
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
                  <Shield className="h-4 w-4 mr-2" />
                  Calculate Insurance
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle>Insurance Quotes</CardTitle>
            <CardDescription>
              Compare coverage options and premiums
            </CardDescription>
          </CardHeader>
          <CardContent>
            {quotes.length > 0 ? (
              <div className="space-y-4">
                {quotes.map((quote, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      quote.recommended
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    {quote.recommended && (
                      <Badge className="mb-2 bg-green-100 text-green-800 border-green-200">
                        Recommended
                      </Badge>
                    )}

                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-gray-900">{quote.coverageType}</h3>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {formatCurrency(quote.totalPremium)}
                        </div>
                        <div className="text-sm text-gray-600">per shipment</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                      <div>
                        <span className="text-gray-600">Coverage:</span>
                        <div className="font-medium">{formatCurrency(quote.coverageAmount)}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Deductible:</span>
                        <div className="font-medium">{formatCurrency(quote.deductible)}</div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="text-sm font-medium text-gray-900">Coverage Includes:</div>
                      <div className="flex flex-wrap gap-1">
                        {quote.coverageDetails.damage && (
                          <Badge variant="outline" className="text-xs">Damage</Badge>
                        )}
                        {quote.coverageDetails.loss && (
                          <Badge variant="outline" className="text-xs">Loss</Badge>
                        )}
                        {quote.coverageDetails.theft && (
                          <Badge variant="outline" className="text-xs">Theft</Badge>
                        )}
                        {quote.coverageDetails.delay && (
                          <Badge variant="outline" className="text-xs">Delay</Badge>
                        )}
                        {quote.coverageDetails.customsIssues && (
                          <Badge variant="outline" className="text-xs">Customs</Badge>
                        )}
                      </div>
                    </div>

                    {quote.exclusions.length > 0 && (
                      <div className="text-sm text-orange-600">
                        <strong>Exclusions:</strong> {quote.exclusions.join(', ')}
                      </div>
                    )}
                  </div>
                ))}

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-900">Insurance Benefits</span>
                  </div>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• 24/7 claims support worldwide</li>
                    <li>• Fast claims processing</li>
                    <li>• Professional claims assistance</li>
                    <li>• Coverage for most shipping risks</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Enter shipment details and click "Calculate Insurance" to see coverage options</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Risk Assessment Guide
          </CardTitle>
          <CardDescription>
            Understanding insurance risks for different shipment types
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Low Risk</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Domestic ground shipping</li>
                <li>• Non-fragile goods</li>
                <li>• Standard packaging</li>
                <li>• Well-established routes</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Medium Risk</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• International air freight</li>
                <li>• Fragile electronics</li>
                <li>• Regional shipping</li>
                <li>• Food products</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">High Risk</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Sea freight</li>
                <li>• High-value artwork</li>
                <li>• Hazardous materials</li>
                <li>• Remote destinations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-2">Important Disclaimer</h3>
              <p className="text-sm text-yellow-800">
                These calculations are estimates only and should not be used as the sole basis for insurance decisions.
                Actual premiums may vary based on specific cargo details, carrier terms, and current market conditions.
                Consult with licensed insurance professionals for final coverage recommendations and binding quotes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsuranceCalculator;
