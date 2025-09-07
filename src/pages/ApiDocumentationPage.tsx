import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Code, BookOpen, Zap, Shield, Download, ExternalLink, Copy, Play } from 'lucide-react';

const ApiDocumentationPage: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState('tracking');
  const [apiKey, setApiKey] = useState('your-api-key-here');

  const endpoints = [
    {
      id: 'tracking',
      name: 'Shipment Tracking',
      method: 'GET',
      path: '/api/v1/shipments/{tracking_number}',
      description: 'Retrieve real-time shipment tracking information'
    },
    {
      id: 'create_shipment',
      name: 'Create Shipment',
      method: 'POST',
      path: '/api/v1/shipments',
      description: 'Create a new shipment and receive tracking number'
    },
    {
      id: 'quote',
      name: 'Get Quote',
      method: 'POST',
      path: '/api/v1/quotes',
      description: 'Calculate shipping costs and transit times'
    },
    {
      id: 'webhook',
      name: 'Webhook Management',
      method: 'POST',
      path: '/api/v1/webhooks',
      description: 'Register webhooks for shipment status updates'
    }
  ];

  const selectedEndpointData = endpoints.find(ep => ep.id === selectedEndpoint) || endpoints[0];

  const sampleResponse = {
    tracking: `{
  "tracking_number": "SWN123456789",
  "status": "in_transit",
  "current_location": {
    "city": "Los Angeles",
    "country": "USA",
    "facility": "Port of Los Angeles"
  },
  "estimated_delivery": "2025-09-15T14:30:00Z",
  "events": [
    {
      "timestamp": "2025-09-10T08:00:00Z",
      "status": "picked_up",
      "location": "Shanghai, China",
      "description": "Shipment picked up from origin"
    },
    {
      "timestamp": "2025-09-12T16:45:00Z",
      "status": "in_transit",
      "location": "Port of Los Angeles",
      "description": "Arrived at destination port"
    }
  ]
}`,
    create_shipment: `{
  "tracking_number": "SWN123456789",
  "status": "created",
  "estimated_cost": 2450.00,
  "estimated_delivery": "2025-09-15T14:30:00Z",
  "pickup_date": "2025-09-08T09:00:00Z"
}`,
    quote: `{
  "origin": "Shanghai, China",
  "destination": "Los Angeles, USA",
  "service_type": "ocean_freight",
  "weight_kg": 1000,
  "volume_cbm": 5.0,
  "currency": "USD",
  "quotes": [
    {
      "service": "Standard Ocean Freight",
      "cost": 2450.00,
      "transit_days": 28,
      "estimated_delivery": "2025-09-15"
    },
    {
      "service": "Express Ocean Freight",
      "cost": 3200.00,
      "transit_days": 18,
      "estimated_delivery": "2025-09-05"
    }
  ]
}`,
    webhook: `{
  "webhook_id": "wh_123456789",
  "url": "https://your-app.com/webhooks/swenglog",
  "events": ["shipment.created", "shipment.delivered", "shipment.exception"],
  "status": "active",
  "created_at": "2025-09-07T10:30:00Z"
}`
  };

  return (
    <>
      <Helmet>
        <title>API Documentation | SWENLOG</title>
        <meta name="description" content="Complete API documentation for developers integrating Swenlog services including shipment tracking, quotes, and webhooks." />
        <meta name="keywords" content="API documentation, developer docs, shipment tracking API, shipping API, webhook integration" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-slate-600 to-gray-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                API Documentation
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-slate-100">
                For developers integrating Swenlog services
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <Code className="w-4 h-4 mr-2" />
                  REST API
                </Badge>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <Zap className="w-4 h-4 mr-2" />
                  Real-time
                </Badge>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <Shield className="w-4 h-4 mr-2" />
                  Secure
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
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
                <TabsTrigger value="authentication">Authentication</TabsTrigger>
                <TabsTrigger value="sdks">SDKs & Tools</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Getting Started</CardTitle>
                    <CardDescription>
                      Quick start guide for integrating with Swenlog API
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Base URL</h3>
                        <code className="bg-gray-100 px-3 py-2 rounded text-sm block">
                          https://api.swenglog.com/v1
                        </code>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Rate Limits</h3>
                        <div className="space-y-2">
                          <p className="text-sm">1000 requests per hour</p>
                          <p className="text-sm">10,000 requests per day</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Quick Start Steps</h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-blue-600 font-semibold">1</span>
                          </div>
                          <span>Sign up for an API key in your dashboard</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-blue-600 font-semibold">2</span>
                          </div>
                          <span>Include your API key in request headers</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-blue-600 font-semibold">3</span>
                          </div>
                          <span>Make your first API call</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-blue-600 font-semibold">4</span>
                          </div>
                          <span>Handle responses and implement error handling</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>API Features</CardTitle>
                    <CardDescription>
                      Powerful capabilities for logistics integration
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center p-6 border rounded-lg">
                        <BookOpen className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                        <h3 className="font-semibold mb-2">Comprehensive Docs</h3>
                        <p className="text-sm text-gray-600">Detailed documentation with examples</p>
                      </div>
                      <div className="text-center p-6 border rounded-lg">
                        <Zap className="w-12 h-12 mx-auto mb-4 text-green-600" />
                        <h3 className="font-semibold mb-2">Real-time Updates</h3>
                        <p className="text-sm text-gray-600">Live shipment tracking and status updates</p>
                      </div>
                      <div className="text-center p-6 border rounded-lg">
                        <Shield className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                        <h3 className="font-semibold mb-2">Enterprise Security</h3>
                        <p className="text-sm text-gray-600">Bank-level encryption and security</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="endpoints" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>API Endpoints</CardTitle>
                    <CardDescription>
                      Complete list of available API endpoints
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Endpoint Selector */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Select Endpoint</label>
                      <Select value={selectedEndpoint} onValueChange={setSelectedEndpoint}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {endpoints.map((endpoint) => (
                            <SelectItem key={endpoint.id} value={endpoint.id}>
                              {endpoint.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Endpoint Details */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Badge variant={selectedEndpointData.method === 'GET' ? 'default' : 'secondary'}>
                          {selectedEndpointData.method}
                        </Badge>
                        <code className="bg-gray-100 px-3 py-1 rounded text-sm">
                          {selectedEndpointData.path}
                        </code>
                      </div>
                      <p className="text-gray-600">{selectedEndpointData.description}</p>
                    </div>

                    {/* Request Example */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Request Example</h3>
                      <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                        <div className="mb-2">
                          <span className="text-blue-400">{selectedEndpointData.method}</span>
                          <span className="text-white"> {selectedEndpointData.path}</span>
                        </div>
                        <div className="text-gray-400">
                          Authorization: Bearer {apiKey}
                        </div>
                        <div className="text-gray-400">
                          Content-Type: application/json
                        </div>
                      </div>
                    </div>

                    {/* Response Example */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Response Example</h3>
                      <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                        <pre>{sampleResponse[selectedEndpoint as keyof typeof sampleResponse]}</pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Response Codes</CardTitle>
                    <CardDescription>
                      HTTP status codes and their meanings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-medium text-green-600">Success Codes</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">200 OK</span>
                            <span className="text-sm text-gray-600">Request successful</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">201 Created</span>
                            <span className="text-sm text-gray-600">Resource created</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">202 Accepted</span>
                            <span className="text-sm text-gray-600">Request accepted for processing</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-medium text-red-600">Error Codes</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">400 Bad Request</span>
                            <span className="text-sm text-gray-600">Invalid request parameters</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">401 Unauthorized</span>
                            <span className="text-sm text-gray-600">Invalid API key</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">429 Too Many Requests</span>
                            <span className="text-sm text-gray-600">Rate limit exceeded</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="authentication" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Authentication</CardTitle>
                    <CardDescription>
                      Secure access to Swenlog API
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">API Key Authentication</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Your API Key</label>
                          <div className="flex gap-2">
                            <Input
                              value={apiKey}
                              onChange={(e) => setApiKey(e.target.value)}
                              className="font-mono"
                            />
                            <Button variant="outline" size="sm">
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Include in Headers</h4>
                          <code className="text-sm bg-white px-2 py-1 rounded">
                            Authorization: Bearer {apiKey}
                          </code>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Security Best Practices</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Shield className="w-4 h-4 mr-2 mt-1 text-green-600" />
                          <span className="text-sm">Store API keys securely, never in client-side code</span>
                        </li>
                        <li className="flex items-start">
                          <Shield className="w-4 h-4 mr-2 mt-1 text-green-600" />
                          <span className="text-sm">Use HTTPS for all API requests</span>
                        </li>
                        <li className="flex items-start">
                          <Shield className="w-4 h-4 mr-2 mt-1 text-green-600" />
                          <span className="text-sm">Rotate API keys regularly for security</span>
                        </li>
                        <li className="flex items-start">
                          <Shield className="w-4 h-4 mr-2 mt-1 text-green-600" />
                          <span className="text-sm">Monitor API usage and set up alerts</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sdks" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>SDKs & Development Tools</CardTitle>
                    <CardDescription>
                      Official libraries and tools for easy integration
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="p-6 border rounded-lg">
                        <div className="flex items-center mb-4">
                          <Code className="w-8 h-8 mr-3 text-blue-600" />
                          <h3 className="font-semibold">JavaScript SDK</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          Official JavaScript library for Node.js and browsers
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>

                      <div className="p-6 border rounded-lg">
                        <div className="flex items-center mb-4">
                          <Code className="w-8 h-8 mr-3 text-green-600" />
                          <h3 className="font-semibold">Python SDK</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          Python library for Django and Flask applications
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>

                      <div className="p-6 border rounded-lg">
                        <div className="flex items-center mb-4">
                          <Code className="w-8 h-8 mr-3 text-purple-600" />
                          <h3 className="font-semibold">PHP SDK</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          PHP library for Laravel and other frameworks
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>

                      <div className="p-6 border rounded-lg">
                        <div className="flex items-center mb-4">
                          <Code className="w-8 h-8 mr-3 text-red-600" />
                          <h3 className="font-semibold">Postman Collection</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          Pre-configured API requests for testing
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>

                      <div className="p-6 border rounded-lg">
                        <div className="flex items-center mb-4">
                          <Code className="w-8 h-8 mr-3 text-orange-600" />
                          <h3 className="font-semibold">OpenAPI Spec</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          Complete API specification in OpenAPI format
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Spec
                        </Button>
                      </div>

                      <div className="p-6 border rounded-lg">
                        <div className="flex items-center mb-4">
                          <Play className="w-8 h-8 mr-3 text-indigo-600" />
                          <h3 className="font-semibold">API Playground</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          Interactive API testing environment
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          <Play className="w-4 h-4 mr-2" />
                          Try Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Code Examples</CardTitle>
                    <CardDescription>
                      Sample code for common integration scenarios
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="javascript" className="w-full">
                      <TabsList>
                        <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                        <TabsTrigger value="python">Python</TabsTrigger>
                        <TabsTrigger value="php">PHP</TabsTrigger>
                      </TabsList>

                      <TabsContent value="javascript">
                        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                          <pre>{`const swenlog = require('swenlog-api')('your-api-key');

async function trackShipment() {
  try {
    const tracking = await swenlog.shipments.track('SWN123456789');
    console.log('Shipment status:', tracking.status);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

trackShipment();`}</pre>
                        </div>
                      </TabsContent>

                      <TabsContent value="python">
                        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                          <pre>{`import swenlog

client = swenlog.Client('your-api-key')

try:
    tracking = client.shipments.track('SWN123456789')
    print(f'Shipment status: {tracking.status}')
except Exception as e:
    print(f'Error: {e}')`}</pre>
                        </div>
                      </TabsContent>

                      <TabsContent value="php">
                        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                          <pre>{`$swenlog = new Swenlog\\Client('your-api-key');

try {
    $tracking = $swenlog->shipments->track('SWN123456789');
    echo 'Shipment status: ' . $tracking->status;
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage();
}`}</pre>
                        </div>
                      </TabsContent>
                    </Tabs>
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

export default ApiDocumentationPage;
