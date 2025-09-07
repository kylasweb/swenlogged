import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Webhook, Code, TestTube, Settings, Bell, Shield, Zap, Copy, Play, Save } from 'lucide-react';

interface WebhookConfig {
  name: string;
  url: string;
  method: 'POST' | 'PUT' | 'PATCH';
  events: string[];
  headers: { key: string; value: string }[];
  secret: string;
  active: boolean;
  retryPolicy: 'none' | 'linear' | 'exponential';
  timeout: number;
}

const WebhookBuilderPage: React.FC = () => {
  const [webhookConfig, setWebhookConfig] = useState<WebhookConfig>({
    name: '',
    url: '',
    method: 'POST',
    events: [],
    headers: [{ key: '', value: '' }],
    secret: '',
    active: true,
    retryPolicy: 'exponential',
    timeout: 30
  });

  const [testResponse, setTestResponse] = useState<string>('');
  const [isTesting, setIsTesting] = useState(false);

  const availableEvents = [
    { id: 'shipment.created', name: 'Shipment Created', description: 'When a new shipment is created' },
    { id: 'shipment.updated', name: 'Shipment Updated', description: 'When shipment details are modified' },
    { id: 'shipment.tracking', name: 'Tracking Update', description: 'When tracking information changes' },
    { id: 'shipment.delivered', name: 'Shipment Delivered', description: 'When shipment reaches destination' },
    { id: 'invoice.generated', name: 'Invoice Generated', description: 'When invoice is created' },
    { id: 'payment.received', name: 'Payment Received', description: 'When payment is processed' },
    { id: 'order.status_changed', name: 'Order Status Changed', description: 'When order status updates' },
    { id: 'quote.requested', name: 'Quote Requested', description: 'When shipping quote is requested' },
    { id: 'document.uploaded', name: 'Document Uploaded', description: 'When customs documents are uploaded' },
    { id: 'compliance.alert', name: 'Compliance Alert', description: 'When compliance issues are detected' }
  ];

  const handleEventToggle = (eventId: string) => {
    setWebhookConfig(prev => ({
      ...prev,
      events: prev.events.includes(eventId)
        ? prev.events.filter(id => id !== eventId)
        : [...prev.events, eventId]
    }));
  };

  const addHeader = () => {
    setWebhookConfig(prev => ({
      ...prev,
      headers: [...prev.headers, { key: '', value: '' }]
    }));
  };

  const updateHeader = (index: number, field: 'key' | 'value', value: string) => {
    setWebhookConfig(prev => ({
      ...prev,
      headers: prev.headers.map((header, i) =>
        i === index ? { ...header, [field]: value } : header
      )
    }));
  };

  const removeHeader = (index: number) => {
    setWebhookConfig(prev => ({
      ...prev,
      headers: prev.headers.filter((_, i) => i !== index)
    }));
  };

  const generateSecret = () => {
    const secret = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setWebhookConfig(prev => ({ ...prev, secret }));
  };

  const testWebhook = async () => {
    setIsTesting(true);
    setTestResponse('');

    // Simulate webhook test
    setTimeout(() => {
      setTestResponse(JSON.stringify({
        status: 'success',
        message: 'Webhook test successful',
        timestamp: new Date().toISOString(),
        payload: {
          event: 'test.webhook',
          data: { message: 'This is a test payload' }
        }
      }, null, 2));
      setIsTesting(false);
    }, 2000);
  };

  const saveWebhook = () => {
    // Here you would typically save to backend
    console.log('Saving webhook:', webhookConfig);
    alert('Webhook configuration saved successfully!');
  };

  return (
    <>
      <Helmet>
        <title>Webhook Builder | SWENLOG</title>
        <meta name="description" content="Create and manage webhooks to receive real-time notifications about shipments, orders, and logistics events." />
        <meta name="keywords" content="webhooks, API integration, real-time notifications, logistics automation, event-driven architecture" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Webhook Builder
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-purple-100">
                Real-time notifications for your logistics operations
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <Webhook className="w-4 h-4 mr-2" />
                  Real-time Events
                </Badge>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <Zap className="w-4 h-4 mr-2" />
                  Instant Updates
                </Badge>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <Shield className="w-4 h-4 mr-2" />
                  Secure Delivery
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="builder" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="builder">Webhook Builder</TabsTrigger>
                <TabsTrigger value="events">Event Types</TabsTrigger>
                <TabsTrigger value="testing">Testing Tools</TabsTrigger>
                <TabsTrigger value="management">Management</TabsTrigger>
              </TabsList>

              <TabsContent value="builder" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Configure Webhook</CardTitle>
                    <CardDescription>
                      Set up your webhook endpoint to receive real-time notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="webhook-name">Webhook Name</Label>
                          <Input
                            id="webhook-name"
                            placeholder="e.g., Order Status Updates"
                            value={webhookConfig.name}
                            onChange={(e) => setWebhookConfig(prev => ({ ...prev, name: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="webhook-url">Endpoint URL</Label>
                          <Input
                            id="webhook-url"
                            placeholder="https://your-app.com/webhook"
                            value={webhookConfig.url}
                            onChange={(e) => setWebhookConfig(prev => ({ ...prev, url: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="method">HTTP Method</Label>
                          <Select
                            value={webhookConfig.method}
                            onValueChange={(value: 'POST' | 'PUT' | 'PATCH') =>
                              setWebhookConfig(prev => ({ ...prev, method: value }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="POST">POST</SelectItem>
                              <SelectItem value="PUT">PUT</SelectItem>
                              <SelectItem value="PATCH">PATCH</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="secret">Webhook Secret</Label>
                          <div className="flex gap-2">
                            <Input
                              id="secret"
                              placeholder="Generate a secure secret"
                              value={webhookConfig.secret}
                              onChange={(e) => setWebhookConfig(prev => ({ ...prev, secret: e.target.value }))}
                            />
                            <Button variant="outline" onClick={generateSecret}>
                              Generate
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="timeout">Timeout (seconds)</Label>
                          <Input
                            id="timeout"
                            type="number"
                            min="5"
                            max="300"
                            value={webhookConfig.timeout}
                            onChange={(e) => setWebhookConfig(prev => ({ ...prev, timeout: parseInt(e.target.value) || 30 }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="retry">Retry Policy</Label>
                          <Select
                            value={webhookConfig.retryPolicy}
                            onValueChange={(value: 'none' | 'linear' | 'exponential') =>
                              setWebhookConfig(prev => ({ ...prev, retryPolicy: value }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">No Retry</SelectItem>
                              <SelectItem value="linear">Linear Backoff</SelectItem>
                              <SelectItem value="exponential">Exponential Backoff</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="active"
                        checked={webhookConfig.active}
                        onCheckedChange={(checked) => setWebhookConfig(prev => ({ ...prev, active: checked }))}
                      />
                      <Label htmlFor="active">Active Webhook</Label>
                    </div>

                    <div>
                      <Label className="text-base font-semibold mb-4 block">Custom Headers</Label>
                      <div className="space-y-3">
                        {webhookConfig.headers.map((header, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              placeholder="Header Key"
                              value={header.key}
                              onChange={(e) => updateHeader(index, 'key', e.target.value)}
                            />
                            <Input
                              placeholder="Header Value"
                              value={header.value}
                              onChange={(e) => updateHeader(index, 'value', e.target.value)}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeHeader(index)}
                              disabled={webhookConfig.headers.length === 1}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                        <Button variant="outline" onClick={addHeader}>
                          Add Header
                        </Button>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button onClick={testWebhook} disabled={isTesting || !webhookConfig.url}>
                        <TestTube className="w-4 h-4 mr-2" />
                        {isTesting ? 'Testing...' : 'Test Webhook'}
                      </Button>
                      <Button onClick={saveWebhook} variant="outline">
                        <Save className="w-4 h-4 mr-2" />
                        Save Configuration
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {testResponse && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Test Response</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                        {testResponse}
                      </pre>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="events" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Events</CardTitle>
                    <CardDescription>
                      Select the events you want to receive notifications for
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {availableEvents.map((event) => (
                        <div
                          key={event.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            webhookConfig.events.includes(event.id)
                              ? 'border-purple-500 bg-purple-50'
                              : 'hover:border-gray-300'
                          }`}
                          onClick={() => handleEventToggle(event.id)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold">{event.name}</h3>
                            <input
                              type="checkbox"
                              checked={webhookConfig.events.includes(event.id)}
                              onChange={() => handleEventToggle(event.id)}
                              className="w-4 h-4 mt-1"
                            />
                          </div>
                          <p className="text-sm text-gray-600">{event.description}</p>
                          <Badge variant="outline" className="mt-2 text-xs">
                            {event.id}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Event Payload Examples</CardTitle>
                    <CardDescription>
                      Sample payloads for different event types
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold mb-3">Shipment Created</h3>
                        <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
{JSON.stringify({
  event: 'shipment.created',
  timestamp: '2024-01-15T10:30:00Z',
  data: {
    shipmentId: 'SHP-123456',
    trackingNumber: 'TRK-789012',
    status: 'created',
    origin: 'New York, NY',
    destination: 'Los Angeles, CA',
    estimatedDelivery: '2024-01-20T15:00:00Z'
  }
}, null, 2)}
                        </pre>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-3">Tracking Update</h3>
                        <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
{JSON.stringify({
  event: 'shipment.tracking',
  timestamp: '2024-01-16T14:45:00Z',
  data: {
    shipmentId: 'SHP-123456',
    trackingNumber: 'TRK-789012',
    status: 'in_transit',
    location: 'Chicago, IL',
    description: 'Package arrived at sorting facility',
    estimatedDelivery: '2024-01-20T15:00:00Z'
  }
}, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="testing" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Webhook Testing Tools</CardTitle>
                    <CardDescription>
                      Test your webhook endpoint with sample data
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-base font-semibold mb-4 block">Test Event</Label>
                        <Select defaultValue="shipment.created">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {availableEvents.map((event) => (
                              <SelectItem key={event.id} value={event.id}>
                                {event.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-base font-semibold mb-4 block">Custom Payload (Optional)</Label>
                        <Textarea
                          placeholder="Enter custom JSON payload..."
                          rows={4}
                        />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button>
                        <Play className="w-4 h-4 mr-2" />
                        Send Test Event
                      </Button>
                      <Button variant="outline">
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Sample Payload
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Webhook Logs</CardTitle>
                    <CardDescription>
                      Recent webhook delivery attempts and responses
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                            <span className="font-medium">shipment.created</span>
                          </div>
                          <Badge variant="outline">Success</Badge>
                        </div>
                        <p className="text-sm text-gray-600">Delivered at 2024-01-15 10:30:00 UTC</p>
                        <p className="text-sm text-gray-600">Response: 200 OK (45ms)</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                            <span className="font-medium">shipment.tracking</span>
                          </div>
                          <Badge variant="destructive">Failed</Badge>
                        </div>
                        <p className="text-sm text-gray-600">Failed at 2024-01-15 09:15:00 UTC</p>
                        <p className="text-sm text-gray-600">Error: Connection timeout (30s)</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                            <span className="font-medium">invoice.generated</span>
                          </div>
                          <Badge variant="secondary">Retrying</Badge>
                        </div>
                        <p className="text-sm text-gray-600">Retry 2/3 at 2024-01-15 08:45:00 UTC</p>
                        <p className="text-sm text-gray-600">Response: 500 Internal Server Error</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="management" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Webhook Management</CardTitle>
                    <CardDescription>
                      Manage your existing webhooks and monitor performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold">Order Status Updates</h3>
                            <p className="text-sm text-gray-600">https://api.example.com/webhooks/orders</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">Active</Badge>
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">Test</Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Events</p>
                            <p className="font-medium">5 active</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Success Rate</p>
                            <p className="font-medium text-green-600">98.5%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Avg Response</p>
                            <p className="font-medium">245ms</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold">Shipment Tracking</h3>
                            <p className="text-sm text-gray-600">https://webhooks.company.com/tracking</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">Active</Badge>
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">Test</Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Events</p>
                            <p className="font-medium">3 active</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Success Rate</p>
                            <p className="font-medium text-green-600">99.2%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Avg Response</p>
                            <p className="font-medium">189ms</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Security Best Practices</CardTitle>
                    <CardDescription>
                      Ensure your webhooks are secure and reliable
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert>
                      <Shield className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Webhook Secret:</strong> Always use a strong, unique secret for each webhook endpoint to verify request authenticity.
                      </AlertDescription>
                    </Alert>
                    <Alert>
                      <Bell className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Idempotency:</strong> Implement idempotency keys to handle duplicate webhook deliveries gracefully.
                      </AlertDescription>
                    </Alert>
                    <Alert>
                      <Settings className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Rate Limiting:</strong> Implement rate limiting on your webhook endpoints to prevent abuse.
                      </AlertDescription>
                    </Alert>
                    <Alert>
                      <Zap className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Monitoring:</strong> Set up monitoring and alerting for webhook failures and performance issues.
                      </AlertDescription>
                    </Alert>
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

export default WebhookBuilderPage;
