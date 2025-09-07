import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Search, CheckCircle, AlertTriangle, Info, Globe } from "lucide-react";
import { toast } from "sonner";

interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  required: boolean;
  countries: string[];
  downloadUrl?: string;
}

interface DocumentChecklist {
  commercialInvoice: boolean;
  packingList: boolean;
  billOfLading: boolean;
  certificateOfOrigin: boolean;
  insuranceCertificate: boolean;
  customsDeclaration: boolean;
  permits: boolean;
  other: string[];
}

const CustomsDocumentationHandbook = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [checklist, setChecklist] = useState<DocumentChecklist>({
    commercialInvoice: false,
    packingList: false,
    billOfLading: false,
    certificateOfOrigin: false,
    insuranceCertificate: false,
    customsDeclaration: false,
    permits: false,
    other: []
  });

  const countries = [
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'EU', name: 'European Union', flag: '🇪🇺' },
    { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'CN', name: 'China', flag: '🇨🇳' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵' },
    { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
    { code: 'IN', name: 'India', flag: '🇮🇳' },
    { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' }
  ];

  const documentTemplates: DocumentTemplate[] = [
    {
      id: 'commercial-invoice',
      name: 'Commercial Invoice',
      description: 'Official document describing the transaction between exporter and importer',
      category: 'essential',
      required: true,
      countries: ['US', 'EU', 'UK', 'CN', 'JP', 'KR', 'IN', 'SG', 'AU', 'CA']
    },
    {
      id: 'packing-list',
      name: 'Packing List',
      description: 'Detailed list of goods in each package with quantities and weights',
      category: 'essential',
      required: true,
      countries: ['US', 'EU', 'UK', 'CN', 'JP', 'KR', 'IN', 'SG', 'AU', 'CA']
    },
    {
      id: 'bill-of-lading',
      name: 'Bill of Lading',
      description: 'Contract between shipper and carrier for transportation of goods',
      category: 'transport',
      required: true,
      countries: ['US', 'EU', 'UK', 'CN', 'JP', 'KR', 'IN', 'SG', 'AU', 'CA']
    },
    {
      id: 'certificate-origin',
      name: 'Certificate of Origin',
      description: 'Document declaring the country where the goods were produced',
      category: 'origin',
      required: false,
      countries: ['US', 'EU', 'UK', 'CN', 'JP', 'KR', 'IN', 'AU', 'CA']
    },
    {
      id: 'insurance-cert',
      name: 'Insurance Certificate',
      description: 'Proof of cargo insurance coverage for the shipment',
      category: 'insurance',
      required: false,
      countries: ['US', 'EU', 'UK', 'CN', 'JP', 'KR', 'IN', 'SG', 'AU', 'CA']
    },
    {
      id: 'customs-declaration',
      name: 'Customs Declaration',
      description: 'Formal statement to customs authorities about goods being imported',
      category: 'customs',
      required: true,
      countries: ['US', 'EU', 'UK', 'CN', 'JP', 'KR', 'IN', 'SG', 'AU', 'CA']
    },
    {
      id: 'import-license',
      name: 'Import License',
      description: 'Government permission required for certain types of imports',
      category: 'permits',
      required: false,
      countries: ['IN', 'CN', 'KR']
    },
    {
      id: 'health-certificate',
      name: 'Health Certificate',
      description: 'Required for food, pharmaceuticals, and agricultural products',
      category: 'permits',
      required: false,
      countries: ['US', 'EU', 'UK', 'CN', 'JP', 'KR', 'AU', 'CA']
    },
    {
      id: 'safety-data-sheet',
      name: 'Safety Data Sheet',
      description: 'Technical document for hazardous materials and chemicals',
      category: 'permits',
      required: false,
      countries: ['US', 'EU', 'UK', 'CN', 'JP', 'KR', 'IN', 'SG', 'AU', 'CA']
    },
    {
      id: 'eur1-movement-certificate',
      name: 'EUR.1 Movement Certificate',
      description: 'Proof of preferential origin for reduced customs duties in EU',
      category: 'preferential',
      required: false,
      countries: ['EU', 'UK']
    }
  ];

  const categories = [
    { value: 'all', label: 'All Documents' },
    { value: 'essential', label: 'Essential Documents' },
    { value: 'transport', label: 'Transportation' },
    { value: 'customs', label: 'Customs & Compliance' },
    { value: 'origin', label: 'Certificates of Origin' },
    { value: 'permits', label: 'Permits & Licenses' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'preferential', label: 'Preferential Trade' }
  ];

  const filteredDocuments = documentTemplates.filter(doc => {
    const matchesCountry = !selectedCountry || doc.countries.includes(selectedCountry);
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesSearch = !searchTerm ||
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCountry && matchesCategory && matchesSearch;
  });

  const getRequiredDocuments = (country: string) => {
    return documentTemplates.filter(doc =>
      doc.required && doc.countries.includes(country)
    );
  };

  const getCountrySpecificDocuments = (country: string) => {
    return documentTemplates.filter(doc =>
      doc.countries.includes(country) && !doc.required
    );
  };

  const handleDownloadTemplate = (documentId: string) => {
    // Simulate download
    toast.success(`Downloading ${documentTemplates.find(d => d.id === documentId)?.name} template...`);
  };

  const generateChecklist = () => {
    if (!selectedCountry) {
      toast.error('Please select a destination country first');
      return;
    }

    const required = getRequiredDocuments(selectedCountry);
    const countrySpecific = getCountrySpecificDocuments(selectedCountry);

    // This would generate a PDF or printable checklist
    toast.success('Documentation checklist generated! Check your downloads.');
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      essential: 'bg-red-100 text-red-800',
      transport: 'bg-blue-100 text-blue-800',
      customs: 'bg-green-100 text-green-800',
      origin: 'bg-purple-100 text-purple-800',
      permits: 'bg-orange-100 text-orange-800',
      insurance: 'bg-yellow-100 text-yellow-800',
      preferential: 'bg-indigo-100 text-indigo-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <FileText className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Customs Documentation Handbook</h1>
        </div>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Complete guide to international shipping documentation. Access templates,
          checklists, and country-specific requirements for smooth customs clearance.
        </p>
      </div>

      <Tabs defaultValue="documents" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="documents">Document Library</TabsTrigger>
          <TabsTrigger value="checklist">Documentation Checklist</TabsTrigger>
          <TabsTrigger value="guide">Compliance Guide</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Find Documentation</CardTitle>
              <CardDescription>
                Filter documents by country, category, or search terms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">Destination Country</Label>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
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
                  <Label htmlFor="category">Document Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="search">Search Documents</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Search by name or description"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document List */}
          <div className="grid md:grid-cols-2 gap-4">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {doc.name}
                        {doc.required && (
                          <Badge variant="destructive" className="text-xs">Required</Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="mt-1">{doc.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className={getCategoryColor(doc.category)}>
                      {categories.find(c => c.value === doc.category)?.label || doc.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Globe className="h-3 w-3" />
                      <span>{doc.countries.length} countries</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Applicable to: {doc.countries.slice(0, 3).join(', ')}
                      {doc.countries.length > 3 && ` +${doc.countries.length - 3} more`}
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleDownloadTemplate(doc.id)}
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="checklist" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Documentation Checklist Generator</CardTitle>
              <CardDescription>
                Generate a customized checklist based on your shipment destination
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="checklist-country">Destination Country *</Label>
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
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

              {selectedCountry && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Required Documents</h3>
                    <div className="space-y-2">
                      {getRequiredDocuments(selectedCountry).map((doc) => (
                        <div key={doc.id} className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-red-600" />
                          <div>
                            <div className="font-medium text-red-900">{doc.name}</div>
                            <div className="text-sm text-red-700">{doc.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Country-Specific Documents</h3>
                    <div className="space-y-2">
                      {getCountrySpecificDocuments(selectedCountry).map((doc) => (
                        <div key={doc.id} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                          <Info className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="font-medium text-blue-900">{doc.name}</div>
                            <div className="text-sm text-blue-700">{doc.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button onClick={generateChecklist} className="w-full">
                    Generate Printable Checklist
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guide" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Documentation Best Practices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Accuracy First</h4>
                      <p className="text-sm text-gray-600">Ensure all information is accurate and matches across all documents</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Complete Information</h4>
                      <p className="text-sm text-gray-600">Include all required fields and avoid abbreviations</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Proper Signatures</h4>
                      <p className="text-sm text-gray-600">Use authorized signatures and company stamps where required</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Multiple Copies</h4>
                      <p className="text-sm text-gray-600">Prepare sufficient copies for all parties involved</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Common Mistakes to Avoid</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Inconsistent Values</h4>
                      <p className="text-sm text-gray-600">Values must match across commercial invoice and other documents</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Missing HS Codes</h4>
                      <p className="text-sm text-gray-600">Include proper Harmonized System codes for accurate classification</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Incorrect Addresses</h4>
                      <p className="text-sm text-gray-600">Verify all addresses are complete and accurate</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Expired Documents</h4>
                      <p className="text-sm text-gray-600">Check expiration dates on certificates and licenses</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Country-Specific Requirements</CardTitle>
              <CardDescription>
                Additional documentation requirements by destination
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">United States</h4>
                  <ul className="text-sm space-y-1">
                    <li>• FDA registration for food/medical products</li>
                    <li>• CITES permits for endangered species</li>
                    <li>• FCC certification for electronics</li>
                    <li>• EPA registration for pesticides</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">European Union</h4>
                  <ul className="text-sm space-y-1">
                    <li>• CE marking for certain products</li>
                    <li>• REACH compliance for chemicals</li>
                    <li>• WEEE directive for electronics</li>
                    <li>• RoHS compliance requirements</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">China</h4>
                  <ul className="text-sm space-y-1">
                    <li>• CCC certification for many products</li>
                    <li>• Import license for restricted items</li>
                    <li>• CIQ inspection for food/agricultural</li>
                    <li>• CNCA certification requirements</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">India</h4>
                  <ul className="text-sm space-y-1">
                    <li>• BIS certification for certain products</li>
                    <li>• Import license for restricted items</li>
                    <li>• FSSAI registration for food products</li>
                    <li>• DGFT compliance requirements</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomsDocumentationHandbook;
