import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertTriangle, XCircle, FileText, Globe, Shield, Truck, Cpu } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import AIBadge from '@/components/ui/AIBadge';
import { useAICachedAction } from '@/hooks/useAICachedAction';
import { complianceGapAnalysisPrompt } from '@/utils/toolPrompts';

interface ComplianceResult {
  overallStatus: 'pass' | 'warning' | 'fail';
  customsCompliance: {
    status: 'pass' | 'warning' | 'fail';
    requirements: string[];
    notes: string;
  };
  regulatoryCompliance: {
    status: 'pass' | 'warning' | 'fail';
    requirements: string[];
    notes: string;
  };
  tradeRestrictions: {
    status: 'pass' | 'warning' | 'fail';
    restrictions: string[];
    notes: string;
  };
  recommendations: string[];
}

interface AIComplianceRaw {
  overallStatus?: string;
  customsCompliance?: { status?: string; requirements?: string[]; notes?: string };
  regulatoryCompliance?: { status?: string; requirements?: string[]; notes?: string };
  tradeRestrictions?: { status?: string; restrictions?: string[]; notes?: string };
  missingDocuments?: string[];
  riskNotes?: string[];
  recommendations?: string[];
}

const ComplianceCheckerPage: React.FC = () => {
  const [shipmentData, setShipmentData] = useState({
    originCountry: '',
    destinationCountry: '',
    productCategory: '',
    productValue: '',
    productDescription: '',
    specialRequirements: ''
  });

  const [complianceResults, setComplianceResults] = useState<ComplianceResult | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(false);

  const { run: runComplianceAI } = useAICachedAction<AIComplianceRaw>({
    cacheKey: `compliance:${shipmentData.originCountry}:${shipmentData.destinationCountry}:${shipmentData.productCategory}:${shipmentData.productValue}`,
    buildPrompt: () => {
      if (!shipmentData.originCountry || !shipmentData.destinationCountry || !shipmentData.productCategory) return '';
      const value = parseFloat(shipmentData.productValue || '0') || 0;
      return complianceGapAnalysisPrompt({
        origin: shipmentData.originCountry,
        destination: shipmentData.destinationCountry,
        productCategory: shipmentData.productCategory,
        valueUSD: value,
        description: shipmentData.productDescription,
        specialRequirements: shipmentData.specialRequirements
      });
    },
    parseShape: () => null
  });

  const checkCompliance = async () => {
    setIsChecking(true);
    if (aiEnabled) {
      try {
  const aiData = await runComplianceAI();
        if (aiData && typeof aiData === 'object') {
          const raw = aiData as AIComplianceRaw;
          const mapped: ComplianceResult = {
            overallStatus: (raw.overallStatus && ['pass','warning','fail'].includes(raw.overallStatus)) ? raw.overallStatus as ComplianceResult['overallStatus'] : 'warning',
            customsCompliance: {
              status: raw.customsCompliance?.status && ['pass','warning','fail'].includes(raw.customsCompliance.status) ? raw.customsCompliance.status as ComplianceResult['overallStatus'] : 'warning',
              requirements: raw.customsCompliance?.requirements || [],
              notes: raw.customsCompliance?.notes || ''
            },
            regulatoryCompliance: {
              status: raw.regulatoryCompliance?.status && ['pass','warning','fail'].includes(raw.regulatoryCompliance.status) ? raw.regulatoryCompliance.status as ComplianceResult['overallStatus'] : 'warning',
              requirements: raw.regulatoryCompliance?.requirements || [],
              notes: raw.regulatoryCompliance?.notes || ''
            },
            tradeRestrictions: {
              status: raw.tradeRestrictions?.status && ['pass','warning','fail'].includes(raw.tradeRestrictions.status) ? raw.tradeRestrictions.status as ComplianceResult['overallStatus'] : 'pass',
              restrictions: raw.tradeRestrictions?.restrictions || [],
              notes: raw.tradeRestrictions?.notes || ''
            },
            recommendations: raw.recommendations || []
          };
          // Merge missing docs & risk notes into recommendations tail if present
          if (Array.isArray(raw.missingDocuments) && raw.missingDocuments.length) {
            mapped.recommendations.push('Missing Documents: ' + raw.missingDocuments.join(', '));
          }
            if (Array.isArray(raw.riskNotes) && raw.riskNotes.length) {
              mapped.recommendations.push(...raw.riskNotes.map((r: string) => `Risk: ${r}`));
            }
          setComplianceResults(mapped);
          setIsChecking(false);
          return;
        }
      } catch (e) {
        // fall back
      }
    }
    // fallback legacy mock
    setTimeout(() => {
      const mockResults: ComplianceResult = {
        overallStatus: 'warning',
        customsCompliance: {
          status: 'pass',
          requirements: ['Commercial Invoice', 'Packing List', 'Certificate of Origin'],
          notes: 'All basic documentation requirements met'
        },
        regulatoryCompliance: {
          status: shipmentData.productCategory === 'electronics' ? 'warning' : 'pass',
          requirements: shipmentData.productCategory === 'electronics'
            ? ['RoHS Certificate', 'Safety Standards Certificate']
            : ['Standard Compliance Certificate'],
          notes: shipmentData.productCategory === 'electronics'
            ? 'Additional certifications required for electronic products'
            : 'Standard regulatory requirements satisfied'
        },
        tradeRestrictions: {
          status: shipmentData.destinationCountry === 'china' ? 'warning' : 'pass',
          restrictions: shipmentData.destinationCountry === 'china'
            ? ['Import License Required', 'Tariff Classification Check']
            : [],
          notes: shipmentData.destinationCountry === 'china'
            ? 'Additional import licensing may be required'
            : 'No significant trade restrictions identified'
        },
        recommendations: [
          'Ensure all certificates are up-to-date and properly authenticated',
          'Consider consulting with a licensed customs broker',
          'Verify HS codes match product specifications',
          'Check for any country-specific labeling requirements'
        ]
      };
      setComplianceResults(mockResults);
      setIsChecking(false);
    }, 1500);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'fail': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return <AlertTriangle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'fail': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <>
      <Helmet>
        <title>Compliance Checker | SWENLOG</title>
        <meta name="description" content="Verify shipments meet destination country requirements and ensure regulatory compliance for international shipping." />
        <meta name="keywords" content="compliance checker, shipping regulations, customs compliance, trade requirements, international shipping" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-teal-600 to-cyan-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 flex items-center justify-center gap-3">
                Compliance Checker {aiEnabled && <AIBadge />}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-teal-100">
                Verify shipments meet destination country requirements
              </p>
              <div className="flex items-center justify-center gap-2 mb-4 text-sm">
                <Cpu className={`h-4 w-4 ${aiEnabled ? 'text-white' : 'text-teal-200'}`} />
                <span>AI Mode</span>
                <Switch checked={aiEnabled} onCheckedChange={setAiEnabled} />
              </div>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <Shield className="w-4 h-4 mr-2" />
                  Regulatory Compliance
                </Badge>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <Globe className="w-4 h-4 mr-2" />
                  Global Coverage
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="checker" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="checker">Compliance Checker</TabsTrigger>
                <TabsTrigger value="requirements">Requirements Guide</TabsTrigger>
                <TabsTrigger value="resources">Help Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="checker" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Shipment Compliance Check
                    </CardTitle>
                    <CardDescription>
                      Enter your shipment details to check compliance requirements
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="originCountry">Origin Country</Label>
                          <Select value={shipmentData.originCountry} onValueChange={(value) => setShipmentData({...shipmentData, originCountry: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select origin country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="china">China</SelectItem>
                              <SelectItem value="usa">United States</SelectItem>
                              <SelectItem value="germany">Germany</SelectItem>
                              <SelectItem value="japan">Japan</SelectItem>
                              <SelectItem value="vietnam">Vietnam</SelectItem>
                              <SelectItem value="india">India</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="destinationCountry">Destination Country</Label>
                          <Select value={shipmentData.destinationCountry} onValueChange={(value) => setShipmentData({...shipmentData, destinationCountry: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select destination country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="usa">United States</SelectItem>
                              <SelectItem value="china">China</SelectItem>
                              <SelectItem value="germany">Germany</SelectItem>
                              <SelectItem value="uk">United Kingdom</SelectItem>
                              <SelectItem value="japan">Japan</SelectItem>
                              <SelectItem value="canada">Canada</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="productCategory">Product Category</Label>
                          <Select value={shipmentData.productCategory} onValueChange={(value) => setShipmentData({...shipmentData, productCategory: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select product category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="electronics">Electronics</SelectItem>
                              <SelectItem value="textiles">Textiles & Apparel</SelectItem>
                              <SelectItem value="machinery">Machinery & Equipment</SelectItem>
                              <SelectItem value="chemicals">Chemicals</SelectItem>
                              <SelectItem value="food">Food & Beverages</SelectItem>
                              <SelectItem value="automotive">Automotive Parts</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="productValue">Product Value (USD)</Label>
                          <Input
                            id="productValue"
                            type="number"
                            placeholder="Enter product value"
                            value={shipmentData.productValue}
                            onChange={(e) => setShipmentData({...shipmentData, productValue: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="productDescription">Product Description</Label>
                          <Textarea
                            id="productDescription"
                            placeholder="Describe your product"
                            value={shipmentData.productDescription}
                            onChange={(e) => setShipmentData({...shipmentData, productDescription: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="specialRequirements">Special Requirements</Label>
                          <Textarea
                            id="specialRequirements"
                            placeholder="Any special handling or certification requirements"
                            value={shipmentData.specialRequirements}
                            onChange={(e) => setShipmentData({...shipmentData, specialRequirements: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={checkCompliance}
                      disabled={isChecking || !shipmentData.originCountry || !shipmentData.destinationCountry}
                      className="w-full md:w-auto"
                    >
                      {isChecking ? 'Checking Compliance...' : 'Check Compliance'}
                    </Button>
                  </CardContent>
                </Card>

                {complianceResults && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        {getStatusIcon(complianceResults.overallStatus)}
                        <span className="ml-2">Compliance Results {aiEnabled && <AIBadge />}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <Alert className={getStatusColor(complianceResults.overallStatus)}>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          {complianceResults.overallStatus === 'pass'
                            ? 'Your shipment appears to meet basic compliance requirements.'
                            : complianceResults.overallStatus === 'warning'
                            ? 'Some additional requirements or documentation may be needed.'
                            : 'Significant compliance issues identified. Professional consultation recommended.'
                          }
                        </AlertDescription>
                      </Alert>

                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="space-y-3">
                          <h3 className="font-semibold flex items-center">
                            {getStatusIcon(complianceResults.customsCompliance.status)}
                            <span className="ml-2">Customs Compliance</span>
                          </h3>
                          <div className="space-y-2">
                            {(complianceResults.customsCompliance.requirements || []).map((req: string, index: number) => (
                              <div key={index} className="flex items-center text-sm">
                                <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                                {req}
                              </div>
                            ))}
                          </div>
                          <p className="text-sm text-gray-600">{complianceResults.customsCompliance.notes}</p>
                        </div>

                        <div className="space-y-3">
                          <h3 className="font-semibold flex items-center">
                            {getStatusIcon(complianceResults.regulatoryCompliance.status)}
                            <span className="ml-2">Regulatory Compliance</span>
                          </h3>
                          <div className="space-y-2">
                            {(complianceResults.regulatoryCompliance.requirements || []).map((req: string, index: number) => (
                              <div key={index} className="flex items-center text-sm">
                                <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                                {req}
                              </div>
                            ))}
                          </div>
                          <p className="text-sm text-gray-600">{complianceResults.regulatoryCompliance.notes}</p>
                        </div>

                        <div className="space-y-3">
                          <h3 className="font-semibold flex items-center">
                            {getStatusIcon(complianceResults.tradeRestrictions.status)}
                            <span className="ml-2">Trade Restrictions</span>
                          </h3>
                          <div className="space-y-2">
                            {(complianceResults.tradeRestrictions.restrictions || []).length > 0 ? (
                              (complianceResults.tradeRestrictions.restrictions || []).map((restriction: string, index: number) => (
                                <div key={index} className="flex items-center text-sm">
                                  <AlertTriangle className="w-4 h-4 mr-2 text-yellow-600" />
                                  {restriction}
                                </div>
                              ))
                            ) : (
                              <div className="flex items-center text-sm">
                                <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                                No significant restrictions
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{complianceResults.tradeRestrictions.notes}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-3">Recommendations</h3>
                        <ul className="space-y-2">
                          {(complianceResults.recommendations || []).map((rec: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="w-4 h-4 mr-2 mt-1 text-blue-600" />
                              <span className="text-sm">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="requirements" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Compliance Requirements Guide</CardTitle>
                    <CardDescription>
                      Common requirements for international shipments
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Documentation Requirements</h3>
                        <div className="space-y-3">
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium">Commercial Invoice</h4>
                            <p className="text-sm text-gray-600">Required for all international shipments</p>
                            <ul className="text-sm mt-2 space-y-1">
                              <li>• Seller and buyer details</li>
                              <li>• Product description and HS code</li>
                              <li>• Value and currency</li>
                            </ul>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium">Packing List</h4>
                            <p className="text-sm text-gray-600">Detailed contents of each package</p>
                            <ul className="text-sm mt-2 space-y-1">
                              <li>• Item descriptions</li>
                              <li>• Quantities and weights</li>
                              <li>• Package dimensions</li>
                            </ul>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium">Certificate of Origin</h4>
                            <p className="text-sm text-gray-600">Proves country of manufacture</p>
                            <ul className="text-sm mt-2 space-y-1">
                              <li>• Chamber of Commerce certification</li>
                              <li>• Required for preferential tariffs</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Product-Specific Requirements</h3>
                        <div className="space-y-3">
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium">Electronics & Electrical</h4>
                            <p className="text-sm text-gray-600">Safety and environmental standards</p>
                            <ul className="text-sm mt-2 space-y-1">
                              <li>• CE marking (EU)</li>
                              <li>• FCC certification (US)</li>
                              <li>• RoHS compliance</li>
                            </ul>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium">Food & Pharmaceuticals</h4>
                            <p className="text-sm text-gray-600">Health and safety regulations</p>
                            <ul className="text-sm mt-2 space-y-1">
                              <li>• FDA registration (US)</li>
                              <li>• GMP certification</li>
                              <li>• Import permits</li>
                            </ul>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium">Chemicals & Hazardous</h4>
                            <p className="text-sm text-gray-600">Safety and transportation rules</p>
                            <ul className="text-sm mt-2 space-y-1">
                              <li>• MSDS documentation</li>
                              <li>• UN number classification</li>
                              <li>• Special packaging requirements</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resources" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Help Resources</CardTitle>
                    <CardDescription>
                      Additional resources for compliance assistance
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Regulatory Bodies</h3>
                        <div className="space-y-3">
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium">US Customs and Border Protection</h4>
                            <p className="text-sm text-gray-600">US import/export regulations</p>
                            <Button variant="outline" size="sm" className="mt-2">
                              Visit Website
                            </Button>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium">European Commission Customs</h4>
                            <p className="text-sm text-gray-600">EU customs regulations and procedures</p>
                            <Button variant="outline" size="sm" className="mt-2">
                              Visit Website
                            </Button>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium">China Customs</h4>
                            <p className="text-sm text-gray-600">Chinese import regulations</p>
                            <Button variant="outline" size="sm" className="mt-2">
                              Visit Website
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Professional Services</h3>
                        <div className="space-y-3">
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium">Customs Broker Services</h4>
                            <p className="text-sm text-gray-600">Licensed professionals for customs clearance</p>
                            <Button variant="outline" size="sm" className="mt-2">
                              Find Broker
                            </Button>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium">Legal Consultation</h4>
                            <p className="text-sm text-gray-600">Trade law and compliance experts</p>
                            <Button variant="outline" size="sm" className="mt-2">
                              Get Consultation
                            </Button>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium">Compliance Training</h4>
                            <p className="text-sm text-gray-600">Courses on international trade compliance</p>
                            <Button variant="outline" size="sm" className="mt-2">
                              View Courses
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComplianceCheckerPage;
