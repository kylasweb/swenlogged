import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calculator, FileText, AlertTriangle, CheckCircle, Info, Brain } from "lucide-react";
import { toast } from "sonner";
import { useAICachedAction } from '@/hooks/useAICachedAction';
import { customsDutyPrompt } from '@/utils/toolPrompts';
import AIBadge from '@/components/ui/AIBadge';

interface DutyCalculation {
  country: string;
  hsCode: string;
  value: number;
  dutyRate: number;
  totalDuty: number;
  additionalFees: {
    vat: number;
    processing: number;
    environmental: number;
    total: number;
  };
  grandTotal: number;
}

const CustomsDutyCalculator = () => {
  const [formData, setFormData] = useState({
    country: '',
    hsCode: '',
    description: '',
    value: '',
    quantity: '1',
    weight: '',
    origin: ''
  });

  const [result, setResult] = useState<DutyCalculation | null>(null);
  const [loading, setLoading] = useState(false);
  const [useAI, setUseAI] = useState(true);

  // AI hook
  const { data: aiData, loading: aiLoading, error: aiError, run: runAIDuty } = useAICachedAction<{
    hsCodeValidated: string;
    baseDutyRatePercent: number;
    estimatedDutyUSD: number;
    vatOrGSTPercent: number;
    estimatedVATUSD: number;
    otherChargesUSD: number;
    totalLandedCostUSD: number;
    notes: string[];
  }>({
    cacheKey: 'customs-duty:last',
    buildPrompt: () => customsDutyPrompt({
      origin: formData.origin || 'Unknown',
      destination: formData.country || 'Unknown',
      hsCode: formData.hsCode || '0000',
      valueUSD: parseFloat(formData.value || '0') || 0,
      incoterm: 'DAP'
    }),
    parseShape: () => null
  });

  useEffect(() => {
    if (aiData && useAI) {
      const value = parseFloat(formData.value || '0') || 0;
      const calculation: DutyCalculation = {
        country: formData.country,
        hsCode: aiData.hsCodeValidated || formData.hsCode,
        value,
        dutyRate: aiData.baseDutyRatePercent,
        totalDuty: aiData.estimatedDutyUSD,
        additionalFees: {
          vat: aiData.estimatedVATUSD,
          processing: aiData.otherChargesUSD * 0.4, // apportion for display
          environmental: aiData.otherChargesUSD * 0.6,
          total: aiData.estimatedVATUSD + aiData.otherChargesUSD
        },
        grandTotal: aiData.totalLandedCostUSD
      };
      setResult(calculation);
    }
  }, [aiData, useAI, formData]);

  // Mock duty rates by country and HS code category
  const dutyRates: Record<string, Record<string, number>> = {
    'US': {
      '8517': 0, // Phones - duty-free
      '8471': 0, // Computers - duty-free
      '6109': 16.5, // T-shirts
      '6204': 27.5, // Women's suits
      '8703': 2.5, // Cars
      '9403': 0, // Furniture - duty-free
    },
    'EU': {
      '8517': 0, // Phones - duty-free
      '8471': 0, // Computers - duty-free
      '6109': 12.0, // T-shirts
      '6204': 12.0, // Women's suits
      '8703': 10.0, // Cars
      '9403': 0, // Furniture - duty-free
    },
    'UK': {
      '8517': 0, // Phones - duty-free
      '8471': 0, // Computers - duty-free
      '6109': 12.0, // T-shirts
      '6204': 12.0, // Women's suits
      '8703': 10.0, // Cars
      '9403': 0, // Furniture - duty-free
    },
    'IN': {
      '8517': 15.0, // Phones
      '8471': 10.0, // Computers
      '6109': 20.0, // T-shirts
      '6204': 20.0, // Women's suits
      '8703': 60.0, // Cars (high for protection)
      '9403': 25.0, // Furniture
    },
    'CN': {
      '8517': 0, // Phones - duty-free
      '8471': 0, // Computers - duty-free
      '6109': 16.0, // T-shirts
      '6204': 16.0, // Women's suits
      '8703': 15.0, // Cars
      '9403': 0, // Furniture - duty-free
    }
  };

  const countries = [
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'EU', name: 'European Union', flag: '🇪🇺' },
    { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'IN', name: 'India', flag: '🇮🇳' },
    { code: 'CN', name: 'China', flag: '🇨🇳' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵' },
    { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
    { code: 'SG', name: 'Singapore', flag: '🇸🇬' }
  ];

  const hsCodeCategories = [
    { code: '8517', description: 'Telephones and mobile phones' },
    { code: '8471', description: 'Automatic data processing machines' },
    { code: '6109', description: 'T-shirts, singlets and other vests' },
    { code: '6204', description: 'Women\'s suits, jackets and trousers' },
    { code: '8703', description: 'Motor cars and other motor vehicles' },
    { code: '9403', description: 'Other furniture and parts thereof' },
    { code: '8504', description: 'Electrical transformers' },
    { code: '8414', description: 'Air or vacuum pumps' }
  ];

  const calculateDuty = async () => {
    if (!formData.country || !formData.hsCode || !formData.value) {
      toast.error('Please fill in all required fields');
      return;
    }

    const value = parseFloat(formData.value);
    if (isNaN(value) || value <= 0) {
      toast.error('Please enter a valid value');
      return;
    }

    if (useAI) {
      await runAIDuty();
      if (!aiError) toast.success('AI duty estimation requested');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1200));

      const dutyRate = dutyRates[formData.country]?.[formData.hsCode] || 5.0; // Default 5%
      const baseDuty = value * (dutyRate / 100);

      // Additional fees calculation
      const vat = value * 0.18; // 18% VAT
      const processing = Math.max(value * 0.005, 50); // 0.5% or minimum $50
      const environmental = value * 0.002; // 0.2% environmental fee

      const additionalFees = {
        vat,
        processing,
        environmental,
        total: vat + processing + environmental
      };

      const grandTotal = baseDuty + additionalFees.total;

      const calculation: DutyCalculation = {
        country: formData.country,
        hsCode: formData.hsCode,
        value,
        dutyRate,
        totalDuty: baseDuty,
        additionalFees,
        grandTotal
      };

      setResult(calculation);
      toast.success('Duty calculation completed!');

    } catch (error) {
      toast.error('Failed to calculate duties. Please try again.');
      console.error('Duty calculation error:', error);
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

  const getCountryInfo = (code: string) => {
    return countries.find(c => c.code === code);
  };

  const getHsCodeInfo = (code: string) => {
    return hsCodeCategories.find(c => c.code === code);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Calculator className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Customs Duty Calculator</h1>
        </div>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Calculate import duties and taxes for international shipments. Get accurate estimates
          for customs clearance costs based on HS codes, destination country, and shipment value.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 flex-wrap">
              <FileText className="h-5 w-5" />
              Shipment Details {useAI && <AIBadge />}
            </CardTitle>
            <CardDescription>
              Enter your shipment information for duty calculation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" className="h-4 w-4" checked={useAI} onChange={() => setUseAI(v => !v)} />
                <span className="font-medium">AI Mode</span>
              </label>
              {aiError && <span className="text-red-600 text-xs">{aiError}</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Destination Country *</Label>
              <Select value={formData.country} onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      <div className="flex items-center gap-2">
                        <span>{country.flag}</span>
                        <span>{country.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hsCode">HS Code *</Label>
              <Select value={formData.hsCode} onValueChange={(value) => setFormData(prev => ({ ...prev, hsCode: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select HS code category" />
                </SelectTrigger>
                <SelectContent>
                  {hsCodeCategories.map((category) => (
                    <SelectItem key={category.code} value={category.code}>
                      <div>
                        <div className="font-medium">{category.code}</div>
                        <div className="text-sm text-gray-600">{category.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Product Description</Label>
              <Input
                id="description"
                placeholder="e.g., Mobile phone, cotton t-shirt"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="value">Value (USD) *</Label>
                <Input
                  id="value"
                  type="number"
                  placeholder="1000"
                  value={formData.value}
                  onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
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
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="2.5"
                value={formData.weight}
                onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="origin">Country of Origin</Label>
              <Select value={formData.origin} onValueChange={(value) => setFormData(prev => ({ ...prev, origin: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select origin country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      <div className="flex items-center gap-2">
                        <span>{country.flag}</span>
                        <span>{country.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={calculateDuty} disabled={loading || aiLoading} className="w-full">
              {(loading || aiLoading) ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {useAI ? 'AI Estimating...' : 'Calculating...'}
                </>
              ) : (
                <>
                  {useAI ? <Brain className="h-4 w-4 mr-2" /> : <Calculator className="h-4 w-4 mr-2" />}
                  {useAI ? 'Generate AI Duty Estimate' : 'Calculate Duties'}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Duty Calculation Results {aiData && useAI && <AIBadge />}
            </CardTitle>
            <CardDescription>
              Breakdown of customs duties and additional fees
            </CardDescription>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-4">
                {/* Summary */}
                <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-900 mb-2">
                    {formatCurrency(result.grandTotal)}
                  </div>
                  <div className="text-sm text-blue-700">
                    Total customs cost for {formatCurrency(result.value)} shipment
                  </div>
                  {useAI && aiData?.notes && (
                    <div className="mt-3 text-xs text-blue-600 space-y-1">
                      {aiData.notes.slice(0,3).map((n,i)=>(<div key={i}>• {n}</div>))}
                    </div>
                  )}
                </div>

                {/* Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Import Duty ({result.dutyRate}%)</span>
                    <span className="font-semibold">{formatCurrency(result.totalDuty)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">VAT ({useAI && aiData ? aiData.vatOrGSTPercent : 18}%)</span>
                    <span className="font-semibold">{formatCurrency(result.additionalFees.vat)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Processing Fee</span>
                    <span className="font-semibold">{formatCurrency(result.additionalFees.processing)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">Environmental Fee</span>
                    <span className="font-semibold">{formatCurrency(result.additionalFees.environmental)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded">
                    <span className="font-bold text-green-900">Grand Total</span>
                    <span className="font-bold text-green-900">{formatCurrency(result.grandTotal)}</span>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div className="text-sm text-yellow-800">
                      <strong>Important:</strong> This is an estimate only. Actual duties may vary based on
                      specific product classification, trade agreements, and current regulations.
                      Consult with customs authorities for final determination.
                    </div>
                  </div>
                </div>

                {/* Country and HS Code Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-sm text-gray-600">Destination</div>
                    <div className="font-medium">{getCountryInfo(result.country)?.flag} {getCountryInfo(result.country)?.name}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-sm text-gray-600">HS Code</div>
                    <div className="font-medium">{result.hsCode}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Enter shipment details and click "Calculate Duties" to see the breakdown</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* HS Code Reference */}
      <Card>
        <CardHeader>
          <CardTitle>HS Code Reference</CardTitle>
          <CardDescription>
            Common HS codes for different product categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {hsCodeCategories.map((category) => (
              <div key={category.code} className="p-4 bg-gray-50 rounded-lg">
                <div className="font-semibold text-gray-900">{category.code}</div>
                <div className="text-sm text-gray-600">{category.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-2">Legal Disclaimer</h3>
              <p className="text-sm text-yellow-800">
                This calculator provides estimates only and should not be used as the sole basis for customs decisions.
                Actual duty rates may vary based on specific product characteristics, trade agreements, preferential tariffs,
                and current regulations. Always consult with qualified customs brokers or authorities for accurate duty calculations.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomsDutyCalculator;
