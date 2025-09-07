import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, Settings, Database, Zap, FileText, Download, ExternalLink, Code, Play } from 'lucide-react';

const ErpIntegrationGuidesPage: React.FC = () => {
  const [selectedErp, setSelectedErp] = useState('sap');

  const erpSystems = [
    {
      id: 'sap',
      name: 'SAP',
      logo: 'SAP',
      description: 'Enterprise resource planning system',
      integrationLevel: 'Full',
      supportedModules: ['SD', 'MM', 'FI', 'CO']
    },
    {
      id: 'oracle',
      name: 'Oracle ERP',
      logo: 'Oracle',
      description: 'Comprehensive ERP and CRM solution',
      integrationLevel: 'Full',
      supportedModules: ['Order Management', 'Inventory', 'Finance', 'Procurement']
    },
    {
      id: 'microsoft_dynamics',
      name: 'Microsoft Dynamics 365',
      logo: 'Dynamics',
      description: 'Cloud-based ERP and CRM platform',
      integrationLevel: 'Full',
      supportedModules: ['Sales', 'Finance', 'Supply Chain', 'Operations']
    },
    {
      id: 'netsuite',
      name: 'NetSuite',
      logo: 'NetSuite',
      description: 'Cloud ERP for small to medium businesses',
      integrationLevel: 'Full',
      supportedModules: ['Transactions', 'Items', 'Customers', 'Vendors']
    },
    {
      id: 'quickbooks',
      name: 'QuickBooks',
      logo: 'QuickBooks',
      description: 'Accounting and business management software',
      integrationLevel: 'Standard',
      supportedModules: ['Invoices', 'Bills', 'Customers', 'Items']
    },
    {
      id: 'sage',
      name: 'Sage 100/500',
      logo: 'Sage',
      description: 'Business management and ERP software',
      integrationLevel: 'Standard',
      supportedModules: ['Sales Orders', 'Purchase Orders', 'Inventory', 'AR/AP']
    }
  ];

  const selectedErpData = erpSystems.find(erp => erp.id === selectedErp) || erpSystems[0];

  const integrationSteps = [
    {
      step: 1,
      title: 'System Assessment',
      description: 'Evaluate your ERP system capabilities and data structure',
      duration: '1-2 days'
    },
    {
      step: 2,
      title: 'API Configuration',
      description: 'Set up API endpoints and authentication credentials',
      duration: '2-3 days'
    },
    {
      step: 3,
      title: 'Data Mapping',
      description: 'Map ERP fields to Swenlog data structures',
      duration: '3-5 days'
    },
    {
      step: 4,
      title: 'Integration Testing',
      description: 'Test data synchronization and error handling',
      duration: '2-4 days'
    },
    {
      step: 5,
      title: 'Go-Live & Monitoring',
      description: 'Deploy integration and monitor performance',
      duration: '1-2 days'
    }
  ];

  return (
    <>
      <Helmet>
        <title>ERP Integration Guides | SWENLOG</title>
        <meta name="description" content="Connect with popular business systems including SAP, Oracle, Microsoft Dynamics, and more for seamless logistics integration." />
        <meta name="keywords" content="ERP integration, SAP integration, Oracle ERP, Microsoft Dynamics, business system integration, logistics software" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                ERP Integration Guides
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Connect with popular business systems
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <Database className="w-4 h-4 mr-2" />
                  ERP Systems
                </Badge>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <Zap className="w-4 h-4 mr-2" />
                  Real-time Sync
                </Badge>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <Settings className="w-4 h-4 mr-2" />
                  Automated
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Supported Systems</TabsTrigger>
                <TabsTrigger value="integration">Integration Process</TabsTrigger>
                <TabsTrigger value="documentation">Documentation</TabsTrigger>
                <TabsTrigger value="support">Support</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Supported ERP Systems</CardTitle>
                    <CardDescription>
                      Comprehensive integration with leading business systems
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {erpSystems.map((erp) => (
                        <div
                          key={erp.id}
                          className={`p-6 border rounded-lg cursor-pointer transition-all ${
                            selectedErp === erp.id ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedErp(erp.id)}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-lg">{erp.name}</h3>
                            <Badge variant={erp.integrationLevel === 'Full' ? 'default' : 'secondary'}>
                              {erp.integrationLevel}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-4">{erp.description}</p>
                          <div>
                            <p className="text-sm font-medium mb-2">Supported Modules:</p>
                            <div className="flex flex-wrap gap-1">
                              {erp.supportedModules.map((module, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {module}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{selectedErpData.name} Integration Details</CardTitle>
                    <CardDescription>
                      Detailed information about {selectedErpData.name} integration capabilities
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Integration Features</h3>
                        <ul className="space-y-3">
                          <li className="flex items-center">
                            <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                            <span className="text-sm">Real-time data synchronization</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                            <span className="text-sm">Automated order processing</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                            <span className="text-sm">Inventory level updates</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                            <span className="text-sm">Shipping status tracking</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                            <span className="text-sm">Cost and invoice integration</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Data Flow</h3>
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-blue-600 font-semibold text-sm">1</span>
                            </div>
                            <span className="text-sm">ERP → Swenlog: Order data, customer info</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-green-600 font-semibold text-sm">2</span>
                            </div>
                            <span className="text-sm">Swenlog → ERP: Tracking updates, shipping costs</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-purple-600 font-semibold text-sm">3</span>
                            </div>
                            <span className="text-sm">Real-time synchronization every 15 minutes</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="integration" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Integration Process</CardTitle>
                    <CardDescription>
                      Step-by-step guide to integrate {selectedErpData.name} with Swenlog
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {integrationSteps.map((step, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <span className="text-blue-600 font-semibold">{step.step}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-lg font-semibold">{step.title}</h3>
                              <Badge variant="outline">{step.duration}</Badge>
                            </div>
                            <p className="text-gray-600 mb-4">{step.description}</p>
                            {step.step === 1 && (
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-medium mb-2">Prerequisites Checklist:</h4>
                                <ul className="text-sm space-y-1">
                                  <li>• ERP system administrator access</li>
                                  <li>• API/Web service enablement</li>
                                  <li>• Network connectivity to Swenlog</li>
                                  <li>• Data export capabilities</li>
                                </ul>
                              </div>
                            )}
                            {step.step === 2 && (
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-medium mb-2">Configuration Steps:</h4>
                                <ul className="text-sm space-y-1">
                                  <li>• Generate API credentials in ERP system</li>
                                  <li>• Configure webhook endpoints</li>
                                  <li>• Set up data synchronization schedules</li>
                                  <li>• Test connectivity and authentication</li>
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Integration Options</CardTitle>
                    <CardDescription>
                      Choose the best integration method for your needs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="p-6 border rounded-lg">
                        <div className="flex items-center mb-4">
                          <Zap className="w-8 h-8 mr-3 text-yellow-600" />
                          <h3 className="font-semibold">Real-time API</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          Immediate data synchronization with webhooks
                        </p>
                        <ul className="text-sm space-y-1 mb-4">
                          <li>• Instant updates</li>
                          <li>• Event-driven</li>
                          <li>• Most reliable</li>
                        </ul>
                        <Badge>Recommended</Badge>
                      </div>

                      <div className="p-6 border rounded-lg">
                        <div className="flex items-center mb-4">
                          <Settings className="w-8 h-8 mr-3 text-blue-600" />
                          <h3 className="font-semibold">Scheduled Sync</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          Batch processing at regular intervals
                        </p>
                        <ul className="text-sm space-y-1 mb-4">
                          <li>• Configurable frequency</li>
                          <li>• Lower API usage</li>
                          <li>• Batch processing</li>
                        </ul>
                        <Badge variant="secondary">Alternative</Badge>
                      </div>

                      <div className="p-6 border rounded-lg">
                        <div className="flex items-center mb-4">
                          <FileText className="w-8 h-8 mr-3 text-green-600" />
                          <h3 className="font-semibold">File Import/Export</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          CSV/Excel file-based data exchange
                        </p>
                        <ul className="text-sm space-y-1 mb-4">
                          <li>• No API required</li>
                          <li>• Manual or automated</li>
                          <li>• Simple setup</li>
                        </ul>
                        <Badge variant="outline">Basic</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documentation" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Documentation & Resources</CardTitle>
                    <CardDescription>
                      Comprehensive guides and technical documentation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Integration Guides</h3>
                        <div className="space-y-3">
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium mb-2">Quick Start Guide</h4>
                            <p className="text-sm text-gray-600 mb-3">
                              Step-by-step setup instructions for {selectedErpData.name}
                            </p>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Download PDF
                            </Button>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium mb-2">API Reference</h4>
                            <p className="text-sm text-gray-600 mb-3">
                              Complete API documentation with examples
                            </p>
                            <Button variant="outline" size="sm">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View Docs
                            </Button>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium mb-2">Data Mapping Guide</h4>
                            <p className="text-sm text-gray-600 mb-3">
                              Field mapping between ERP and Swenlog
                            </p>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Download Excel
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Code Samples</h3>
                        <div className="space-y-3">
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium mb-2">Configuration Scripts</h4>
                            <p className="text-sm text-gray-600 mb-3">
                              Ready-to-use scripts for common integrations
                            </p>
                            <Button variant="outline" size="sm">
                              <Code className="w-4 h-4 mr-2" />
                              View Code
                            </Button>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium mb-2">Test Scenarios</h4>
                            <p className="text-sm text-gray-600 mb-3">
                              Sample data and test cases for validation
                            </p>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium mb-2">Troubleshooting Guide</h4>
                            <p className="text-sm text-gray-600 mb-3">
                              Common issues and resolution steps
                            </p>
                            <Button variant="outline" size="sm">
                              <FileText className="w-4 h-4 mr-2" />
                              View Guide
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Video Tutorials</CardTitle>
                    <CardDescription>
                      Step-by-step video guides for integration setup
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="bg-gray-200 rounded-lg h-32 mb-4 flex items-center justify-center">
                          <Play className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="font-semibold mb-2">Initial Setup</h3>
                        <p className="text-sm text-gray-600">Getting started with {selectedErpData.name} integration</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-gray-200 rounded-lg h-32 mb-4 flex items-center justify-center">
                          <Play className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="font-semibold mb-2">Data Mapping</h3>
                        <p className="text-sm text-gray-600">Configuring field mappings and data flow</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-gray-200 rounded-lg h-32 mb-4 flex items-center justify-center">
                          <Play className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="font-semibold mb-2">Testing & Go-Live</h3>
                        <p className="text-sm text-gray-600">Validation and deployment procedures</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="support" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Integration Support</CardTitle>
                    <CardDescription>
                      Get help with your ERP integration project
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Support Options</h3>
                        <div className="space-y-3">
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium mb-2">Technical Consultation</h4>
                            <p className="text-sm text-gray-600 mb-3">
                              1-on-1 consultation with integration specialists
                            </p>
                            <Button variant="outline" size="sm">
                              Schedule Call
                            </Button>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium mb-2">Implementation Services</h4>
                            <p className="text-sm text-gray-600 mb-3">
                              Full-service integration setup and configuration
                            </p>
                            <Button variant="outline" size="sm">
                              Get Quote
                            </Button>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium mb-2">Training Programs</h4>
                            <p className="text-sm text-gray-600 mb-3">
                              Comprehensive training for your integration team
                            </p>
                            <Button variant="outline" size="sm">
                              Learn More
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Resources</h3>
                        <div className="space-y-3">
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium mb-2">Knowledge Base</h4>
                            <p className="text-sm text-gray-600 mb-3">
                              Self-service articles and troubleshooting guides
                            </p>
                            <Button variant="outline" size="sm">
                              Browse Articles
                            </Button>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium mb-2">Community Forum</h4>
                            <p className="text-sm text-gray-600 mb-3">
                              Connect with other ERP integration users
                            </p>
                            <Button variant="outline" size="sm">
                              Join Community
                            </Button>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-medium mb-2">Status Page</h4>
                            <p className="text-sm text-gray-600 mb-3">
                              Real-time integration service status and updates
                            </p>
                            <Button variant="outline" size="sm">
                              View Status
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>
                      Reach out to our integration support team
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center p-6 border rounded-lg">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Settings className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="font-semibold mb-2">Technical Support</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          integration@swenlog.com
                        </p>
                        <p className="text-sm text-gray-600">
                          24/7 technical assistance
                        </p>
                      </div>
                      <div className="text-center p-6 border rounded-lg">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Database className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="font-semibold mb-2">Implementation</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          implementation@swenlog.com
                        </p>
                        <p className="text-sm text-gray-600">
                          Project management and setup
                        </p>
                      </div>
                      <div className="text-center p-6 border rounded-lg">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FileText className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="font-semibold mb-2">Documentation</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          docs@swenlog.com
                        </p>
                        <p className="text-sm text-gray-600">
                          Documentation and training
                        </p>
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

export default ErpIntegrationGuidesPage;
