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
import { AlertTriangle, Shield, TrendingUp, AlertCircle, CheckCircle, XCircle, BarChart3, FileText, Users, Globe } from "lucide-react";
import { toast } from "sonner";

interface RiskFactor {
  id: string;
  category: string;
  factor: string;
  description: string;
  impact: 'low' | 'medium' | 'high' | 'critical';
  probability: 'low' | 'medium' | 'high';
  mitigation: string[];
}

interface RiskAssessment {
  supplierName: string;
  location: string;
  industry: string;
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  factors: RiskFactor[];
  recommendations: string[];
  lastUpdated: string;
}

const SupplyChainRiskAssessment = () => {
  const [activeTab, setActiveTab] = useState('assessment');
  const [supplierName, setSupplierName] = useState('');
  const [location, setLocation] = useState('');
  const [industry, setIndustry] = useState('');
  const [selectedRisks, setSelectedRisks] = useState<string[]>([]);
  const [customRisks, setCustomRisks] = useState('');
  const [assessment, setAssessment] = useState<RiskAssessment | null>(null);

  const riskCategories = [
    {
      category: 'Geopolitical',
      icon: <Globe className="h-5 w-5" />,
      factors: [
        { id: 'political_instability', factor: 'Political Instability', impact: 'high' as const, probability: 'medium' as const },
        { id: 'trade_restrictions', factor: 'Trade Restrictions', impact: 'critical' as const, probability: 'medium' as const },
        { id: 'sanctions', factor: 'International Sanctions', impact: 'critical' as const, probability: 'low' as const },
        { id: 'regional_conflicts', factor: 'Regional Conflicts', impact: 'high' as const, probability: 'medium' as const }
      ]
    },
    {
      category: 'Operational',
      icon: <BarChart3 className="h-5 w-5" />,
      factors: [
        { id: 'supplier_capacity', factor: 'Supplier Capacity Issues', impact: 'medium' as const, probability: 'high' as const },
        { id: 'quality_control', factor: 'Quality Control Problems', impact: 'high' as const, probability: 'medium' as const },
        { id: 'labor_shortages', factor: 'Labor Shortages', impact: 'medium' as const, probability: 'high' as const },
        { id: 'equipment_failure', factor: 'Equipment Failure', impact: 'medium' as const, probability: 'low' as const }
      ]
    },
    {
      category: 'Financial',
      icon: <TrendingUp className="h-5 w-5" />,
      factors: [
        { id: 'currency_fluctuation', factor: 'Currency Fluctuation', impact: 'medium' as const, probability: 'high' as const },
        { id: 'supplier_financial', factor: 'Supplier Financial Health', impact: 'high' as const, probability: 'medium' as const },
        { id: 'payment_delays', factor: 'Payment Delays', impact: 'low' as const, probability: 'medium' as const },
        { id: 'economic_downturn', factor: 'Economic Downturn', impact: 'high' as const, probability: 'medium' as const }
      ]
    },
    {
      category: 'Logistical',
      icon: <AlertTriangle className="h-5 w-5" />,
      factors: [
        { id: 'transportation_delays', factor: 'Transportation Delays', impact: 'medium' as const, probability: 'high' as const },
        { id: 'infrastructure_issues', factor: 'Infrastructure Issues', impact: 'high' as const, probability: 'medium' as const },
        { id: 'customs_clearance', factor: 'Customs Clearance Delays', impact: 'medium' as const, probability: 'medium' as const },
        { id: 'natural_disasters', factor: 'Natural Disasters', impact: 'critical' as const, probability: 'low' as const }
      ]
    },
    {
      category: 'Compliance & Regulatory',
      icon: <Shield className="h-5 w-5" />,
      factors: [
        { id: 'regulatory_changes', factor: 'Regulatory Changes', impact: 'high' as const, probability: 'medium' as const },
        { id: 'environmental_regs', factor: 'Environmental Regulations', impact: 'medium' as const, probability: 'medium' as const },
        { id: 'labor_laws', factor: 'Labor Law Compliance', impact: 'medium' as const, probability: 'low' as const },
        { id: 'data_privacy', factor: 'Data Privacy Requirements', impact: 'high' as const, probability: 'medium' as const }
      ]
    }
  ];

  const industries = [
    'Manufacturing', 'Technology', 'Automotive', 'Pharmaceuticals',
    'Food & Beverage', 'Retail', 'Energy', 'Construction', 'Other'
  ];

  const locations = [
    'United States', 'China', 'Germany', 'Japan', 'South Korea',
    'India', 'Vietnam', 'Mexico', 'Brazil', 'United Kingdom',
    'Italy', 'France', 'Canada', 'Australia', 'Other'
  ];

  const calculateRiskScore = (selectedRiskIds: string[]): number => {
    let totalScore = 0;
    let factorCount = 0;

    selectedRiskIds.forEach(riskId => {
      riskCategories.forEach(category => {
        const factor = category.factors.find(f => f.id === riskId);
        if (factor) {
          const impactScore = factor.impact === 'low' ? 1 : factor.impact === 'medium' ? 2 : factor.impact === 'high' ? 3 : 4;
          const probScore = factor.probability === 'low' ? 1 : factor.probability === 'medium' ? 2 : 3;
          totalScore += impactScore * probScore;
          factorCount++;
        }
      });
    });

    return factorCount > 0 ? Math.min(100, (totalScore / (factorCount * 12)) * 100) : 0;
  };

  const getRiskLevel = (score: number): 'low' | 'medium' | 'high' | 'critical' => {
    if (score < 25) return 'low';
    if (score < 50) return 'medium';
    if (score < 75) return 'high';
    return 'critical';
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

  const generateRecommendations = (riskLevel: string, selectedRisks: string[]): string[] => {
    const recommendations: string[] = [];

    if (riskLevel === 'critical') {
      recommendations.push('Immediate action required - consider alternative suppliers');
      recommendations.push('Implement emergency contingency plans');
      recommendations.push('Conduct thorough supplier audit');
    } else if (riskLevel === 'high') {
      recommendations.push('Develop risk mitigation strategies');
      recommendations.push('Increase supplier monitoring frequency');
      recommendations.push('Consider dual sourcing options');
    } else if (riskLevel === 'medium') {
      recommendations.push('Regular risk monitoring and reporting');
      recommendations.push('Build supplier relationship management');
      recommendations.push('Review and update contingency plans');
    } else {
      recommendations.push('Continue standard monitoring procedures');
      recommendations.push('Maintain good supplier relationships');
      recommendations.push('Regular performance reviews');
    }

    // Add specific recommendations based on selected risks
    if (selectedRisks.includes('political_instability')) {
      recommendations.push('Monitor geopolitical developments in supplier region');
    }
    if (selectedRisks.includes('supplier_capacity')) {
      recommendations.push('Negotiate capacity reservation agreements');
    }
    if (selectedRisks.includes('currency_fluctuation')) {
      recommendations.push('Consider currency hedging strategies');
    }

    return recommendations;
  };

  const handleRiskSelection = (riskId: string) => {
    setSelectedRisks(prev =>
      prev.includes(riskId)
        ? prev.filter(id => id !== riskId)
        : [...prev, riskId]
    );
  };

  const performAssessment = () => {
    if (!supplierName || !location || !industry) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (selectedRisks.length === 0 && !customRisks.trim()) {
      toast.error('Please select at least one risk factor or add custom risks');
      return;
    }

    const riskScore = calculateRiskScore(selectedRisks);
    const riskLevel = getRiskLevel(riskScore);

    // Create risk factors array
    const factors: RiskFactor[] = [];
    selectedRisks.forEach(riskId => {
      riskCategories.forEach(category => {
        const factor = category.factors.find(f => f.id === riskId);
        if (factor) {
          factors.push({
            ...factor,
            category: category.category,
            description: `${factor.factor} in ${location}`,
            mitigation: generateRecommendations(riskLevel, [riskId])
          });
        }
      });
    });

    // Add custom risks if provided
    if (customRisks.trim()) {
      customRisks.split('\n').forEach(risk => {
        if (risk.trim()) {
          factors.push({
            id: `custom_${Date.now()}_${Math.random()}`,
            category: 'Custom',
            factor: risk.trim(),
            description: risk.trim(),
            impact: 'medium',
            probability: 'medium',
            mitigation: ['Monitor closely', 'Develop mitigation plan']
          });
        }
      });
    }

    const newAssessment: RiskAssessment = {
      supplierName,
      location,
      industry,
      riskScore,
      riskLevel,
      factors,
      recommendations: generateRecommendations(riskLevel, selectedRisks),
      lastUpdated: new Date().toISOString()
    };

    setAssessment(newAssessment);
    setActiveTab('results');
    toast.success('Risk assessment completed successfully');
  };

  const resetAssessment = () => {
    setSupplierName('');
    setLocation('');
    setIndustry('');
    setSelectedRisks([]);
    setCustomRisks('');
    setAssessment(null);
    setActiveTab('assessment');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Shield className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Supply Chain Risk Assessment</h1>
        </div>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Evaluate and mitigate risks in your supply chain. Identify potential vulnerabilities
          and develop strategies to ensure business continuity and resilience.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="assessment">Risk Assessment</TabsTrigger>
          <TabsTrigger value="results" disabled={!assessment}>Results</TabsTrigger>
          <TabsTrigger value="mitigation">Mitigation Plan</TabsTrigger>
        </TabsList>

        <TabsContent value="assessment" className="space-y-6">
          {/* Supplier Information */}
          <Card>
            <CardHeader>
              <CardTitle>Supplier Information</CardTitle>
              <CardDescription>
                Provide basic information about the supplier to be assessed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="supplier">Supplier Name *</Label>
                  <Input
                    id="supplier"
                    placeholder="Enter supplier name"
                    value={supplierName}
                    onChange={(e) => setSupplierName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((loc) => (
                        <SelectItem key={loc} value={loc}>
                          {loc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
              </div>
            </CardContent>
          </Card>

          {/* Risk Factors */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Factors</CardTitle>
              <CardDescription>
                Select the risk factors that may affect this supplier
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {riskCategories.map((category) => (
                  <div key={category.category} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                        {category.icon}
                      </div>
                      <h3 className="text-lg font-semibold">{category.category} Risks</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3 ml-12">
                      {category.factors.map((factor) => (
                        <div
                          key={factor.id}
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            selectedRisks.includes(factor.id)
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleRiskSelection(factor.id)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <input
                                  type="checkbox"
                                  checked={selectedRisks.includes(factor.id)}
                                  onChange={() => handleRiskSelection(factor.id)}
                                  className="rounded"
                                />
                                <span className="font-medium text-sm">{factor.factor}</span>
                              </div>
                              <div className="flex gap-2 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  Impact: {factor.impact}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  Probability: {factor.probability}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Custom Risks */}
          <Card>
            <CardHeader>
              <CardTitle>Custom Risk Factors</CardTitle>
              <CardDescription>
                Add any additional risks specific to this supplier (one per line)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter custom risk factors..."
                value={customRisks}
                onChange={(e) => setCustomRisks(e.target.value)}
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Assessment Actions */}
          <div className="flex justify-center gap-4">
            <Button onClick={performAssessment} size="lg">
              <Shield className="h-5 w-5 mr-2" />
              Perform Risk Assessment
            </Button>
            <Button variant="outline" onClick={resetAssessment}>
              Reset Form
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {assessment && (
            <>
              {/* Risk Score Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Risk Assessment Results</CardTitle>
                  <CardDescription>
                    Risk assessment for {assessment.supplierName} in {assessment.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Risk Score</span>
                          <span className="text-2xl font-bold">{Math.round(assessment.riskScore)}/100</span>
                        </div>
                        <Progress value={assessment.riskScore} className="h-3" />
                      </div>

                      <div className="flex items-center gap-2">
                        {getRiskIcon(assessment.riskLevel)}
                        <Badge className={getRiskColor(assessment.riskLevel)}>
                          {assessment.riskLevel.toUpperCase()} RISK
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">Assessment Details</div>
                      <div className="space-y-1 text-sm">
                        <div>Supplier: <span className="font-medium">{assessment.supplierName}</span></div>
                        <div>Location: <span className="font-medium">{assessment.location}</span></div>
                        <div>Industry: <span className="font-medium">{assessment.industry}</span></div>
                        <div>Risk Factors: <span className="font-medium">{assessment.factors.length}</span></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Risk Factors Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Risk Factors Identified</CardTitle>
                  <CardDescription>
                    Detailed breakdown of identified risk factors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assessment.factors.map((factor, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium">{factor.factor}</h4>
                            <p className="text-sm text-gray-600">{factor.description}</p>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="outline" className="text-xs">
                              {factor.category}
                            </Badge>
                            <Badge className={getRiskColor(factor.impact)}>
                              {factor.impact}
                            </Badge>
                          </div>
                        </div>

                        <div className="text-sm text-gray-600">
                          <strong>Mitigation:</strong> {factor.mitigation.join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Actions</CardTitle>
                  <CardDescription>
                    Priority actions to mitigate identified risks
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
            </>
          )}
        </TabsContent>

        <TabsContent value="mitigation" className="space-y-6">
          {/* Mitigation Strategies */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Mitigation Strategies</CardTitle>
              <CardDescription>
                Comprehensive strategies to reduce supply chain risks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Short-term Actions</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-900">Diversify Suppliers</h4>
                      <p className="text-sm text-green-700">Identify and qualify alternative suppliers to reduce dependency</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900">Increase Inventory</h4>
                      <p className="text-sm text-blue-700">Build strategic inventory buffers for critical components</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <h4 className="font-medium text-purple-900">Monitor Suppliers</h4>
                      <p className="text-sm text-purple-700">Implement regular performance monitoring and reporting</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Long-term Strategies</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <h4 className="font-medium text-orange-900">Regional Diversification</h4>
                      <p className="text-sm text-orange-700">Expand supplier base across different geographic regions</p>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <h4 className="font-medium text-red-900">Technology Investment</h4>
                      <p className="text-sm text-red-700">Implement advanced supply chain visibility and analytics tools</p>
                    </div>
                    <div className="p-3 bg-indigo-50 rounded-lg">
                      <h4 className="font-medium text-indigo-900">Partnership Development</h4>
                      <p className="text-sm text-indigo-700">Build strong relationships with key suppliers and stakeholders</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Monitoring Framework */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Monitoring Framework</CardTitle>
              <CardDescription>
                Establish continuous monitoring to identify emerging risks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <FileText className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                    <h4 className="font-medium">Weekly Reports</h4>
                    <p className="text-sm text-gray-600">Monitor key risk indicators</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Users className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                    <h4 className="font-medium">Stakeholder Updates</h4>
                    <p className="text-sm text-gray-600">Regular communication with suppliers</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <TrendingUp className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                    <h4 className="font-medium">Performance Metrics</h4>
                    <p className="text-sm text-gray-600">Track supplier performance trends</p>
                  </div>
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
            <div className="text-2xl font-bold text-gray-900">5</div>
            <div className="text-sm text-gray-600">Risk Categories</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">20+</div>
            <div className="text-sm text-gray-600">Risk Factors</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">4</div>
            <div className="text-sm text-gray-600">Risk Levels</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">100%</div>
            <div className="text-sm text-gray-600">Assessment Coverage</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupplyChainRiskAssessment;
