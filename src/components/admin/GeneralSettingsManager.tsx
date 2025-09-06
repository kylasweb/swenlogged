import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { 
  Mail, Database, Zap, Globe, Webhook, Settings, Shield, 
  Truck, MessageSquare, Phone, CreditCard, Key, Copy, RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface GeneralSettings {
  // Site Settings
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  timezone: string;
  
  // SMTP Settings
  smtpEnabled: boolean;
  smtpHost: string;
  smtpPort: string;
  smtpUsername: string;
  smtpPassword: string;
  smtpSecure: boolean;
  
  // API Settings
  apiKey: string;
  apiSecret: string;
  rateLimitEnabled: boolean;
  rateLimitPerMinute: string;
  
  // Integration Settings
  zapierWebhook: string;
  iftttKey: string;
  pabblyWebhook: string;
  makeWebhook: string;
  
  // Webhook Settings
  webhookUrl: string;
  webhookSecret: string;
  webhookEvents: string[];
  
  // CRM Integrations
  salesforceEnabled: boolean;
  salesforceApiKey: string;
  hubspotEnabled: boolean;
  hubspotApiKey: string;
  
  // Logistics Services
  fedexEnabled: boolean;
  fedexApiKey: string;
  upsEnabled: boolean;
  upsApiKey: string;
  dhlEnabled: boolean;
  dhlApiKey: string;
  
  // Communication
  twilioEnabled: boolean;
  twilioSid: string;
  twilioToken: string;
  slackWebhook: string;
  
  // Payment Gateways
  stripeEnabled: boolean;
  stripePublishableKey: string;
  stripeSecretKey: string;
  paypalEnabled: boolean;
  paypalClientId: string;
}

const defaultSettings: GeneralSettings = {
  siteName: 'SWENLOG',
  siteDescription: 'Global Logistics Solutions',
  siteUrl: 'https://swenlog.com',
  timezone: 'UTC',
  
  smtpEnabled: false,
  smtpHost: '',
  smtpPort: '587',
  smtpUsername: '',
  smtpPassword: '',
  smtpSecure: true,
  
  apiKey: '',
  apiSecret: '',
  rateLimitEnabled: true,
  rateLimitPerMinute: '100',
  
  zapierWebhook: '',
  iftttKey: '',
  pabblyWebhook: '',
  makeWebhook: '',
  
  webhookUrl: '',
  webhookSecret: '',
  webhookEvents: [],
  
  salesforceEnabled: false,
  salesforceApiKey: '',
  hubspotEnabled: false,
  hubspotApiKey: '',
  
  fedexEnabled: false,
  fedexApiKey: '',
  upsEnabled: false,
  upsApiKey: '',
  dhlEnabled: false,
  dhlApiKey: '',
  
  twilioEnabled: false,
  twilioSid: '',
  twilioToken: '',
  slackWebhook: '',
  
  stripeEnabled: false,
  stripePublishableKey: '',
  stripeSecretKey: '',
  paypalEnabled: false,
  paypalClientId: '',
};

const sidebarItems = [
  { id: 'site', label: 'Site Settings', icon: Globe },
  { id: 'smtp', label: 'SMTP Email', icon: Mail },
  { id: 'api', label: 'API Management', icon: Database },
  { id: 'integrations', label: 'Integrations', icon: Zap },
  { id: 'webhooks', label: 'Webhooks', icon: Webhook },
  { id: 'crm', label: 'CRM Systems', icon: Shield },
  { id: 'logistics', label: 'Logistics', icon: Truck },
  { id: 'communication', label: 'Communication', icon: MessageSquare },
  { id: 'payment', label: 'Payments', icon: CreditCard },
];

const GeneralSettingsManager = () => {
  const [settings, setSettings] = useLocalStorage('generalSettings', defaultSettings);
  const [formData, setFormData] = useState<GeneralSettings>(settings);
  const [activeSection, setActiveSection] = useState('site');
  const { toast } = useToast();

  const handleInputChange = (field: keyof GeneralSettings, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setSettings(formData);
    toast({
      title: "Settings Saved",
      description: "Your general settings have been updated successfully.",
    });
  };

  const generateApiKey = () => {
    const newApiKey = 'sk_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    handleInputChange('apiKey', newApiKey);
    toast({
      title: "API Key Generated",
      description: "A new API key has been generated.",
    });
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard.`,
    });
  };

  const handleTestConnection = (service: string) => {
    toast({
      title: `Testing ${service}`,
      description: "Connection test initiated. Check the logs for results.",
    });
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'site':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Site Configuration
              </CardTitle>
              <CardDescription>
                Basic site settings and configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={formData.siteName}
                    onChange={(e) => handleInputChange('siteName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="siteUrl">Site URL</Label>
                  <Input
                    id="siteUrl"
                    value={formData.siteUrl}
                    onChange={(e) => handleInputChange('siteUrl', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={formData.siteDescription}
                  onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Input
                  id="timezone"
                  value={formData.timezone}
                  onChange={(e) => handleInputChange('timezone', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        );

      case 'smtp':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                SMTP Email Configuration
              </CardTitle>
              <CardDescription>
                Configure SMTP settings for sending emails
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="smtpEnabled"
                  checked={formData.smtpEnabled}
                  onCheckedChange={(checked) => handleInputChange('smtpEnabled', checked)}
                />
                <Label htmlFor="smtpEnabled">Enable SMTP</Label>
              </div>
              
              {formData.smtpEnabled && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="smtpHost">SMTP Host</Label>
                      <Input
                        id="smtpHost"
                        value={formData.smtpHost}
                        onChange={(e) => handleInputChange('smtpHost', e.target.value)}
                        placeholder="smtp.gmail.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="smtpPort">SMTP Port</Label>
                      <Input
                        id="smtpPort"
                        value={formData.smtpPort}
                        onChange={(e) => handleInputChange('smtpPort', e.target.value)}
                        placeholder="587"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="smtpUsername">Username</Label>
                      <Input
                        id="smtpUsername"
                        value={formData.smtpUsername}
                        onChange={(e) => handleInputChange('smtpUsername', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="smtpPassword">Password</Label>
                      <Input
                        id="smtpPassword"
                        type="password"
                        value={formData.smtpPassword}
                        onChange={(e) => handleInputChange('smtpPassword', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="smtpSecure"
                      checked={formData.smtpSecure}
                      onCheckedChange={(checked) => handleInputChange('smtpSecure', checked)}
                    />
                    <Label htmlFor="smtpSecure">Use TLS/SSL</Label>
                  </div>
                  <Button onClick={() => handleTestConnection('SMTP')}>
                    Test SMTP Connection
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        );

      case 'api':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  API Key Management
                </CardTitle>
                <CardDescription>
                  Generate and manage API keys for external access to your site data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="apiKey">Website API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="apiKey"
                      value={formData.apiKey}
                      onChange={(e) => handleInputChange('apiKey', e.target.value)}
                      placeholder="Click generate to create an API key"
                      readOnly
                    />
                    <Button 
                      variant="outline" 
                      onClick={generateApiKey}
                      className="flex items-center gap-2"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Generate
                    </Button>
                    {formData.apiKey && (
                      <Button 
                        variant="outline" 
                        onClick={() => copyToClipboard(formData.apiKey, 'API Key')}
                        className="flex items-center gap-2"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="rateLimitEnabled"
                    checked={formData.rateLimitEnabled}
                    onCheckedChange={(checked) => handleInputChange('rateLimitEnabled', checked)}
                  />
                  <Label htmlFor="rateLimitEnabled">Enable Rate Limiting</Label>
                </div>
                
                {formData.rateLimitEnabled && (
                  <div>
                    <Label htmlFor="rateLimitPerMinute">Requests per minute</Label>
                    <Input
                      id="rateLimitPerMinute"
                      value={formData.rateLimitPerMinute}
                      onChange={(e) => handleInputChange('rateLimitPerMinute', e.target.value)}
                      placeholder="100"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  API Documentation
                </CardTitle>
                <CardDescription>
                  Access API endpoints and documentation for developers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Available Endpoints:</h4>
                  <div className="space-y-2 text-sm font-mono">
                    <div>GET /api/v1/shipments - Get all shipments</div>
                    <div>GET /api/v1/contacts - Get CRM contacts</div>
                    <div>GET /api/v1/leads - Get CRM leads</div>
                    <div>GET /api/v1/media - Get media items</div>
                    <div>POST /api/v1/webhooks - Receive webhook data</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  View Full API Documentation
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case 'integrations':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Integration Platforms
              </CardTitle>
              <CardDescription>
                Connect with automation and integration platforms
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Zapier Integration</h4>
                <div>
                  <Label htmlFor="zapierWebhook">Zapier Webhook URL</Label>
                  <Input
                    id="zapierWebhook"
                    value={formData.zapierWebhook}
                    onChange={(e) => handleInputChange('zapierWebhook', e.target.value)}
                    placeholder="https://hooks.zapier.com/hooks/catch/..."
                  />
                </div>
                <Button onClick={() => handleTestConnection('Zapier')}>Test Zapier</Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">IFTTT Integration</h4>
                <div>
                  <Label htmlFor="iftttKey">IFTTT Maker Key</Label>
                  <Input
                    id="iftttKey"
                    value={formData.iftttKey}
                    onChange={(e) => handleInputChange('iftttKey', e.target.value)}
                    placeholder="Your IFTTT Maker key"
                  />
                </div>
                <Button onClick={() => handleTestConnection('IFTTT')}>Test IFTTT</Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Pabbly Connect</h4>
                <div>
                  <Label htmlFor="pabblyWebhook">Pabbly Webhook URL</Label>
                  <Input
                    id="pabblyWebhook"
                    value={formData.pabblyWebhook}
                    onChange={(e) => handleInputChange('pabblyWebhook', e.target.value)}
                    placeholder="https://connect.pabbly.com/workflow/sendwebhookdata/..."
                  />
                </div>
                <Button onClick={() => handleTestConnection('Pabbly')}>Test Pabbly</Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Make (formerly Integromat)</h4>
                <div>
                  <Label htmlFor="makeWebhook">Make Webhook URL</Label>
                  <Input
                    id="makeWebhook"
                    value={formData.makeWebhook}
                    onChange={(e) => handleInputChange('makeWebhook', e.target.value)}
                    placeholder="https://hook.eu1.make.com/..."
                  />
                </div>
                <Button onClick={() => handleTestConnection('Make')}>Test Make</Button>
              </div>
            </CardContent>
          </Card>
        );

      case 'webhooks':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Webhook className="h-5 w-5" />
                Webhook Settings
              </CardTitle>
              <CardDescription>
                Configure webhooks to receive real-time updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="webhookUrl">Webhook URL</Label>
                  <Input
                    id="webhookUrl"
                    value={formData.webhookUrl}
                    onChange={(e) => handleInputChange('webhookUrl', e.target.value)}
                    placeholder="https://your-endpoint.com/webhook"
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <Label htmlFor="webhookSecret">Webhook Secret</Label>
                  <Input
                    id="webhookSecret"
                    value={formData.webhookSecret}
                    onChange={(e) => handleInputChange('webhookSecret', e.target.value)}
                    placeholder="Secret key for verifying webhooks"
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <Label htmlFor="webhookEvents">Webhook Events</Label>
                  <Input
                    id="webhookEvents"
                    value={formData.webhookEvents.join(', ')}
                    onChange={(e) => handleInputChange('webhookEvents', e.target.value.split(', ').filter(item => item.trim()))}
                    placeholder="shipment.created, shipment.updated"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'crm':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                CRM Integrations
              </CardTitle>
              <CardDescription>
                Connect with CRM systems for customer data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Salesforce Integration</h4>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="salesforceEnabled"
                    checked={formData.salesforceEnabled}
                    onCheckedChange={(checked) => handleInputChange('salesforceEnabled', checked)}
                  />
                  <Label htmlFor="salesforceEnabled">Enable Salesforce</Label>
                </div>
                {formData.salesforceEnabled && (
                  <div>
                    <Label htmlFor="salesforceApiKey">Salesforce API Key</Label>
                    <Input
                      id="salesforceApiKey"
                      value={formData.salesforceApiKey}
                      onChange={(e) => handleInputChange('salesforceApiKey', e.target.value)}
                      placeholder="Your Salesforce API key"
                    />
                    <Button onClick={() => handleTestConnection('Salesforce')}>Test Salesforce</Button>
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">HubSpot Integration</h4>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="hubspotEnabled"
                    checked={formData.hubspotEnabled}
                    onCheckedChange={(checked) => handleInputChange('hubspotEnabled', checked)}
                  />
                  <Label htmlFor="hubspotEnabled">Enable HubSpot</Label>
                </div>
                {formData.hubspotEnabled && (
                  <div>
                    <Label htmlFor="hubspotApiKey">HubSpot API Key</Label>
                    <Input
                      id="hubspotApiKey"
                      value={formData.hubspotApiKey}
                      onChange={(e) => handleInputChange('hubspotApiKey', e.target.value)}
                      placeholder="Your HubSpot API key"
                    />
                    <Button onClick={() => handleTestConnection('HubSpot')}>Test HubSpot</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );

      case 'logistics':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Logistics Services
              </CardTitle>
              <CardDescription>
                Configure logistics services integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">FedEx Integration</h4>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="fedexEnabled"
                    checked={formData.fedexEnabled}
                    onCheckedChange={(checked) => handleInputChange('fedexEnabled', checked)}
                  />
                  <Label htmlFor="fedexEnabled">Enable FedEx</Label>
                </div>
                {formData.fedexEnabled && (
                  <div>
                    <Label htmlFor="fedexApiKey">FedEx API Key</Label>
                    <Input
                      id="fedexApiKey"
                      value={formData.fedexApiKey}
                      onChange={(e) => handleInputChange('fedexApiKey', e.target.value)}
                      placeholder="Your FedEx API key"
                    />
                    <Button onClick={() => handleTestConnection('FedEx')}>Test FedEx</Button>
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">UPS Integration</h4>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="upsEnabled"
                    checked={formData.upsEnabled}
                    onCheckedChange={(checked) => handleInputChange('upsEnabled', checked)}
                  />
                  <Label htmlFor="upsEnabled">Enable UPS</Label>
                </div>
                {formData.upsEnabled && (
                  <div>
                    <Label htmlFor="upsApiKey">UPS API Key</Label>
                    <Input
                      id="upsApiKey"
                      value={formData.upsApiKey}
                      onChange={(e) => handleInputChange('upsApiKey', e.target.value)}
                      placeholder="Your UPS API key"
                    />
                    <Button onClick={() => handleTestConnection('UPS')}>Test UPS</Button>
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">DHL Integration</h4>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="dhlEnabled"
                    checked={formData.dhlEnabled}
                    onCheckedChange={(checked) => handleInputChange('dhlEnabled', checked)}
                  />
                  <Label htmlFor="dhlEnabled">Enable DHL</Label>
                </div>
                {formData.dhlEnabled && (
                  <div>
                    <Label htmlFor="dhlApiKey">DHL API Key</Label>
                    <Input
                      id="dhlApiKey"
                      value={formData.dhlApiKey}
                      onChange={(e) => handleInputChange('dhlApiKey', e.target.value)}
                      placeholder="Your DHL API key"
                    />
                    <Button onClick={() => handleTestConnection('DHL')}>Test DHL</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );

      case 'communication':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Communication Channels
              </CardTitle>
              <CardDescription>
                Configure communication channels for notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Twilio (SMS)</h4>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="twilioEnabled"
                    checked={formData.twilioEnabled}
                    onCheckedChange={(checked) => handleInputChange('twilioEnabled', checked)}
                  />
                  <Label htmlFor="twilioEnabled">Enable Twilio</Label>
                </div>
                {formData.twilioEnabled && (
                  <>
                    <div>
                      <Label htmlFor="twilioSid">Twilio SID</Label>
                      <Input
                        id="twilioSid"
                        value={formData.twilioSid}
                        onChange={(e) => handleInputChange('twilioSid', e.target.value)}
                        placeholder="Your Twilio SID"
                      />
                    </div>
                    <div>
                      <Label htmlFor="twilioToken">Twilio Token</Label>
                      <Input
                        id="twilioToken"
                        value={formData.twilioToken}
                        onChange={(e) => handleInputChange('twilioToken', e.target.value)}
                        placeholder="Your Twilio Token"
                      />
                    </div>
                    <Button onClick={() => handleTestConnection('Twilio')}>Test Twilio</Button>
                  </>
                )}
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Slack Integration</h4>
                <div>
                  <Label htmlFor="slackWebhook">Slack Webhook URL</Label>
                  <Input
                    id="slackWebhook"
                    value={formData.slackWebhook}
                    onChange={(e) => handleInputChange('slackWebhook', e.target.value)}
                    placeholder="Your Slack Webhook URL"
                  />
                </div>
                <Button onClick={() => handleTestConnection('Slack')}>Test Slack</Button>
              </div>
            </CardContent>
          </Card>
        );

      case 'payment':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Gateways
              </CardTitle>
              <CardDescription>
                Configure payment gateways for transactions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Stripe Integration</h4>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="stripeEnabled"
                    checked={formData.stripeEnabled}
                    onCheckedChange={(checked) => handleInputChange('stripeEnabled', checked)}
                  />
                  <Label htmlFor="stripeEnabled">Enable Stripe</Label>
                </div>
                {formData.stripeEnabled && (
                  <>
                    <div>
                      <Label htmlFor="stripePublishableKey">Stripe Publishable Key</Label>
                      <Input
                        id="stripePublishableKey"
                        value={formData.stripePublishableKey}
                        onChange={(e) => handleInputChange('stripePublishableKey', e.target.value)}
                        placeholder="Your Stripe Publishable Key"
                      />
                    </div>
                    <div>
                      <Label htmlFor="stripeSecretKey">Stripe Secret Key</Label>
                      <Input
                        id="stripeSecretKey"
                        value={formData.stripeSecretKey}
                        onChange={(e) => handleInputChange('stripeSecretKey', e.target.value)}
                        placeholder="Your Stripe Secret Key"
                      />
                    </div>
                    <Button onClick={() => handleTestConnection('Stripe')}>Test Stripe</Button>
                  </>
                )}
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">PayPal Integration</h4>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="paypalEnabled"
                    checked={formData.paypalEnabled}
                    onCheckedChange={(checked) => handleInputChange('paypalEnabled', checked)}
                  />
                  <Label htmlFor="paypalEnabled">Enable PayPal</Label>
                </div>
                {formData.paypalEnabled && (
                  <>
                    <div>
                      <Label htmlFor="paypalClientId">PayPal Client ID</Label>
                      <Input
                        id="paypalClientId"
                        value={formData.paypalClientId}
                        onChange={(e) => handleInputChange('paypalClientId', e.target.value)}
                        placeholder="Your PayPal Client ID"
                      />
                    </div>
                    <Button onClick={() => handleTestConnection('PayPal')}>Test PayPal</Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        );

      default:
        return <div>Select a section from the sidebar</div>;
    }
  };

  return (
    <div className="flex h-full bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r bg-card">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">General Settings</h2>
          <p className="text-sm text-muted-foreground">Configure site settings</p>
        </div>
        <nav className="p-4 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors",
                  activeSection === item.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              {sidebarItems.find(item => item.id === activeSection)?.label}
            </h1>
          </div>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Save Settings
          </Button>
        </div>
        
        <div className="max-w-4xl">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default GeneralSettingsManager;
