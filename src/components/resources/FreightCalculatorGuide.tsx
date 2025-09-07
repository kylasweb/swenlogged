import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, ArrowRight, CheckCircle, BookOpen, Lightbulb, AlertCircle, Truck } from "lucide-react";
import { toast } from "sonner";

interface GuideStep {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
  completed: boolean;
  required: boolean;
}

interface CalculationResult {
  baseRate: number;
  fuelSurcharge: number;
  additionalFees: number;
  totalCost: number;
  breakdown: {
    transportation: number;
    handling: number;
    documentation: number;
    insurance: number;
  };
}

const FreightCalculatorGuide = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    weight: '',
    dimensions: { length: '', width: '', height: '' },
    freightClass: '',
    shippingMethod: '',
    value: '',
    specialServices: [] as string[]
  });
  const [result, setResult] = useState<CalculationResult | null>(null);

  const isFormValid = () => {
    return formData.origin && formData.destination && formData.weight &&
           formData.freightClass && formData.shippingMethod;
  };

  const calculateFreight = () => {
    if (!isFormValid()) {
      toast.error('Please complete all required fields');
      return;
    }

    const weight = parseFloat(formData.weight);
    const freightClass = parseFloat(formData.freightClass);
  };

  const steps: GuideStep[] = [
    {
      id: 'basics',
      title: 'Freight Calculation Basics',
      description: 'Understanding the fundamentals of freight pricing',
      completed: false,
      required: true,
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">What is Freight Calculation?</h3>
            <p className="text-blue-800 text-sm">
              Freight calculation determines the cost of shipping goods based on weight, dimensions,
              distance, and various additional factors. Understanding these components helps you
              make informed shipping decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Key Factors:</h4>
              <ul className="text-sm space-y-1">
                <li>• Weight and dimensions</li>
                <li>• Distance and route</li>
                <li>• Freight class/category</li>
                <li>• Shipping method</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Additional Costs:</h4>
              <ul className="text-sm space-y-1">
                <li>• Fuel surcharges</li>
                <li>• Handling fees</li>
                <li>• Insurance</li>
                <li>• Special services</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-900">Pro Tip</h4>
                <p className="text-yellow-800 text-sm">
                  Always get quotes from multiple carriers to ensure you're getting the best rate.
                  Different carriers may have different pricing structures and service levels.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'shipment-details',
      title: 'Enter Shipment Details',
      description: 'Provide information about your shipment',
      completed: false,
      required: true,
      content: (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="origin">Origin City/State *</Label>
              <Input
                id="origin"
                placeholder="e.g., Los Angeles, CA"
                value={formData.origin}
                onChange={(e) => setFormData(prev => ({ ...prev, origin: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination">Destination City/State *</Label>
              <Input
                id="destination"
                placeholder="e.g., New York, NY"
                value={formData.destination}
                onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">Weight (lbs) *</Label>
            <Input
              id="weight"
              type="number"
              placeholder="500"
              value={formData.weight}
              onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label>Dimensions (inches)</Label>
            <div className="grid grid-cols-3 gap-2">
              <Input
                placeholder="Length"
                value={formData.dimensions.length}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  dimensions: { ...prev.dimensions, length: e.target.value }
                }))}
              />
              <Input
                placeholder="Width"
                value={formData.dimensions.width}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  dimensions: { ...prev.dimensions, width: e.target.value }
                }))}
              />
              <Input
                placeholder="Height"
                value={formData.dimensions.height}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  dimensions: { ...prev.dimensions, height: e.target.value }
                }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="freightClass">Freight Class *</Label>
            <Select value={formData.freightClass} onValueChange={(value) => setFormData(prev => ({ ...prev, freightClass: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select freight class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="50">Class 50 - Very Dense (bricks, cement)</SelectItem>
                <SelectItem value="55">Class 55 - Dense (castings, machinery)</SelectItem>
                <SelectItem value="60">Class 60 - Moderately Dense (auto parts)</SelectItem>
                <SelectItem value="65">Class 65 - Semi-Dense (appliances)</SelectItem>
                <SelectItem value="70">Class 70 - Average Density (furniture)</SelectItem>
                <SelectItem value="85">Class 85 - Semi-Light (carpets, clothing)</SelectItem>
                <SelectItem value="92.5">Class 92.5 - Light (books, empty containers)</SelectItem>
                <SelectItem value="125">Class 125 - Very Light (mattresses, pillows)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Freight Class Explanation</h4>
            <p className="text-blue-800 text-sm">
              Freight class determines pricing based on density, stowability, and handling characteristics.
              Lower class numbers mean higher density and typically lower rates.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'shipping-options',
      title: 'Select Shipping Options',
      description: 'Choose your preferred shipping method and services',
      completed: false,
      required: true,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="shippingMethod">Shipping Method *</Label>
            <Select value={formData.shippingMethod} onValueChange={(value) => setFormData(prev => ({ ...prev, shippingMethod: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select shipping method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ltl">Less Than Truckload (LTL)</SelectItem>
                <SelectItem value="ftl">Full Truckload (FTL)</SelectItem>
                <SelectItem value="air">Air Freight</SelectItem>
                <SelectItem value="ocean">Ocean Freight</SelectItem>
                <SelectItem value="express">Express Courier</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="value">Shipment Value (USD)</Label>
            <Input
              id="value"
              type="number"
              placeholder="10000"
              value={formData.value}
              onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
            />
          </div>

          <div className="space-y-3">
            <Label>Special Services</Label>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { id: 'liftgate', label: 'Liftgate Service', desc: 'For loading/unloading assistance' },
                { id: 'inside', label: 'Inside Delivery', desc: 'Delivery inside building' },
                { id: 'appointment', label: 'Appointment Delivery', desc: 'Scheduled delivery time' },
                { id: 'insurance', label: 'Additional Insurance', desc: 'Extra cargo insurance' },
                { id: 'tracking', label: 'Premium Tracking', desc: 'Advanced shipment tracking' },
                { id: 'hazmat', label: 'Hazardous Materials', desc: 'Special handling for hazmat' }
              ].map((service) => (
                <div key={service.id} className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id={service.id}
                    checked={formData.specialServices.includes(service.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData(prev => ({
                          ...prev,
                          specialServices: [...prev.specialServices, service.id]
                        }));
                      } else {
                        setFormData(prev => ({
                          ...prev,
                          specialServices: prev.specialServices.filter(s => s !== service.id)
                        }));
                      }
                    }}
                    className="mt-1"
                  />
                  <div>
                    <Label htmlFor={service.id} className="text-sm font-medium cursor-pointer">
                      {service.label}
                    </Label>
                    <p className="text-xs text-gray-600">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Service Recommendations</h4>
            <ul className="text-green-800 text-sm space-y-1">
              <li>• LTL: Best for shipments under 15,000 lbs</li>
              <li>• FTL: Most cost-effective for full truckloads</li>
              <li>• Air Freight: Fastest but most expensive</li>
              <li>• Express: Premium service with guaranteed delivery</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'calculate',
      title: 'Calculate Freight Cost',
      description: 'Review your inputs and get the freight calculation',
      completed: false,
      required: true,
      content: (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3">Shipment Summary</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Route:</strong> {formData.origin} → {formData.destination}
              </div>
              <div>
                <strong>Weight:</strong> {formData.weight} lbs
              </div>
              <div>
                <strong>Dimensions:</strong> {formData.dimensions.length}" × {formData.dimensions.width}" × {formData.dimensions.height}"
              </div>
              <div>
                <strong>Method:</strong> {formData.shippingMethod?.toUpperCase()}
              </div>
              <div>
                <strong>Freight Class:</strong> {formData.freightClass}
              </div>
              <div>
                <strong>Value:</strong> ${formData.value}
              </div>
            </div>
          </div>

          {result ? (
            <div className="space-y-4">
              <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
                <div className="text-3xl font-bold text-green-900 mb-2">
                  ${result.totalCost.toFixed(2)}
                </div>
                <div className="text-sm text-green-700">
                  Estimated Total Freight Cost
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Cost Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span>Base Transportation:</span>
                      <span>${result.breakdown.transportation.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Handling & Pickup:</span>
                      <span>${result.breakdown.handling.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Documentation:</span>
                      <span>${result.breakdown.documentation.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Insurance:</span>
                      <span>${result.breakdown.insurance.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-2">
                      <span>Total:</span>
                      <span>${result.totalCost.toFixed(2)}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Additional Fees</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span>Fuel Surcharge:</span>
                      <span>${result.fuelSurcharge.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Accessorial Fees:</span>
                      <span>${result.additionalFees.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Taxes & Surcharges:</span>
                      <span>Included</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Important Notes</h4>
                    <ul className="text-blue-800 text-sm mt-1 space-y-1">
                      <li>• This is an estimate only. Actual rates may vary.</li>
                      <li>• Fuel surcharges are subject to change.</li>
                      <li>• Additional fees may apply for special circumstances.</li>
                      <li>• Contact carriers for exact quotes and availability.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Calculator className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 mb-4">Click "Calculate Cost" to see your freight estimate</p>
              <Button
                onClick={calculateFreight}
                disabled={!isFormValid()}
                className="px-8"
              >
                Calculate Freight Cost
              </Button>
            </div>
          )}
        </div>
      )
    }
  ];

  const progress = ((completedSteps.size + (result ? 1 : 0)) / steps.length) * 100;

  const handleStepComplete = (stepIndex: number) => {
    if (!isFormValid()) {
      toast.error('Please complete all required fields');
      return;
    }

    const weight = parseFloat(formData.weight);
    const freightClass = parseFloat(formData.freightClass);
    const value = parseFloat(formData.value) || 0;

    // Base rate calculation (simplified)
    const baseRatePerHundredweight = freightClass * 0.5; // Simplified calculation
    const baseTransportation = (weight / 100) * baseRatePerHundredweight * 100; // Distance factor

    // Fuel surcharge (approximately 20% of base)
    const fuelSurcharge = baseTransportation * 0.20;

    // Additional fees based on services
    let additionalFees = 0;
    if (formData.specialServices.includes('liftgate')) additionalFees += 75;
    if (formData.specialServices.includes('inside')) additionalFees += 50;
    if (formData.specialServices.includes('appointment')) additionalFees += 25;
    if (formData.specialServices.includes('insurance')) additionalFees += value * 0.005;
    if (formData.specialServices.includes('tracking')) additionalFees += 15;
    if (formData.specialServices.includes('hazmat')) additionalFees += 100;

    // Breakdown
    const breakdown = {
      transportation: baseTransportation,
      handling: baseTransportation * 0.15,
      documentation: 25,
      insurance: value * 0.003
    };

    const totalCost = baseTransportation + fuelSurcharge + additionalFees +
                     breakdown.handling + breakdown.documentation + breakdown.insurance;

    setResult({
      baseRate: baseTransportation,
      fuelSurcharge,
      additionalFees,
      totalCost,
      breakdown
    });

    toast.success('Freight cost calculated successfully!');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Calculator className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Freight Calculator Guide</h1>
        </div>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Step-by-step guide to calculating freight costs. Learn the process and get accurate
          estimates for your shipping needs.
        </p>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="font-medium">Guide Progress</span>
            <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="w-full" />
          <div className="flex justify-between mt-2 text-xs text-gray-600">
            {steps.map((step, index) => (
              <span key={step.id} className={completedSteps.has(index) ? 'text-green-600 font-medium' : ''}>
                {step.title}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {steps.map((step, index) => (
          <Button
            key={step.id}
            variant={currentStep === index ? "default" : completedSteps.has(index) ? "outline" : "ghost"}
            size="sm"
            onClick={() => setCurrentStep(index)}
            className="flex items-center gap-2"
          >
            {completedSteps.has(index) ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <div className="w-4 h-4 rounded-full border-2 border-current" />
            )}
            <span className="hidden sm:inline">{step.title}</span>
            <span className="sm:hidden">Step {index + 1}</span>
          </Button>
        ))}
      </div>

      {/* Current Step Content */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                  Step {currentStep + 1}
                </span>
                {steps[currentStep].title}
              </CardTitle>
              <CardDescription>{steps[currentStep].description}</CardDescription>
            </div>
            {steps[currentStep].required && (
              <Badge variant="outline" className="text-red-600 border-red-200">
                Required
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {steps[currentStep].content}

          <div className="flex justify-between mt-6 pt-6 border-t">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              Previous Step
            </Button>

            <div className="flex gap-2">
              {currentStep === steps.length - 1 ? (
                <Button
                  onClick={() => toast.success('Guide completed! You now know how to calculate freight costs.')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Complete Guide
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => handleStepComplete(currentStep)}
                  >
                    Mark Complete
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="flex items-center gap-2"
                  >
                    Next Step
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Freight Calculation Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Cost Saving Strategies</h4>
              <ul className="text-sm space-y-1">
                <li>• Consolidate shipments when possible</li>
                <li>• Choose the right freight class</li>
                <li>• Plan routes to minimize distance</li>
                <li>• Negotiate rates with carriers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Common Mistakes to Avoid</h4>
              <ul className="text-sm space-y-1">
                <li>• Underestimating dimensional weight</li>
                <li>• Forgetting fuel surcharges</li>
                <li>• Not accounting for accessorial fees</li>
                <li>• Choosing wrong shipping method</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreightCalculatorGuide;
