import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Smartphone, Download, Bell, MapPin, Clock, Package, Shield, Zap } from 'lucide-react';

const MobileTrackingAppPage: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<'ios' | 'android'>('ios');

  const features = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Real-time Tracking',
      description: 'Track your shipments in real-time with GPS coordinates and ETAs'
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: 'Push Notifications',
      description: 'Get instant alerts for status updates, delays, and delivery confirmations'
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: 'Multi-Shipment View',
      description: 'Monitor multiple shipments simultaneously with consolidated dashboard'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Delivery Scheduling',
      description: 'Schedule deliveries and receive reminders for upcoming pickups'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure Access',
      description: 'Biometric authentication and encrypted data transmission'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Offline Mode',
      description: 'Access shipment data even without internet connection'
    }
  ];

  const screenshots = [
    {
      title: 'Dashboard Overview',
      description: 'Comprehensive view of all your shipments',
      image: '/api/placeholder/300/600'
    },
    {
      title: 'Shipment Details',
      description: 'Detailed tracking information and history',
      image: '/api/placeholder/300/600'
    },
    {
      title: 'Notifications Center',
      description: 'Manage alerts and notification preferences',
      image: '/api/placeholder/300/600'
    },
    {
      title: 'Route Visualization',
      description: 'Interactive map with shipment routes',
      image: '/api/placeholder/300/600'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Mobile Tracking App | SWENLOG</title>
        <meta name="description" content="Real-time shipment tracking with push notifications for iOS and Android devices." />
        <meta name="keywords" content="mobile tracking app, shipment tracking, iOS app, Android app, push notifications, real-time tracking" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Mobile Tracking App
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-indigo-100">
                Real-time shipment tracking with push notifications
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <Smartphone className="w-4 h-4 mr-2" />
                  iOS & Android
                </Badge>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <Bell className="w-4 h-4 mr-2" />
                  Push Notifications
                </Badge>
              </div>

              {/* Download Buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-black hover:bg-gray-800"
                  onClick={() => setSelectedPlatform('ios')}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download for iOS
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-indigo-600"
                  onClick={() => setSelectedPlatform('android')}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download for Android
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="features" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="screenshots">Screenshots</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="support">Support</TabsTrigger>
              </TabsList>

              <TabsContent value="features" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>App Features</CardTitle>
                    <CardDescription>
                      Powerful tools for shipment tracking and management
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {features.map((feature, index) => (
                        <div key={index} className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                          <div className="text-indigo-600 mb-4">
                            {feature.icon}
                          </div>
                          <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                          <p className="text-gray-600 text-sm">{feature.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Advanced Capabilities</CardTitle>
                    <CardDescription>
                      Cutting-edge features for modern logistics management
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Smart Notifications</h3>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                            <span className="text-sm">Customizable alert preferences</span>
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                            <span className="text-sm">Geofencing alerts for delivery areas</span>
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                            <span className="text-sm">ETA updates and delay notifications</span>
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                            <span className="text-sm">Exception alerts for urgent issues</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Integration Features</h3>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                            <span className="text-sm">Calendar integration for delivery scheduling</span>
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                            <span className="text-sm">Contact integration for recipient details</span>
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                            <span className="text-sm">Widget support for home screen</span>
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                            <span className="text-sm">Siri/Google Assistant integration</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="screenshots" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>App Screenshots</CardTitle>
                    <CardDescription>
                      Preview the mobile app interface and features
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {screenshots.map((screenshot, index) => (
                        <div key={index} className="text-center">
                          <div className="bg-gray-200 rounded-lg h-64 mb-4 flex items-center justify-center">
                            <Smartphone className="w-12 h-12 text-gray-400" />
                          </div>
                          <h3 className="font-semibold mb-2">{screenshot.title}</h3>
                          <p className="text-sm text-gray-600">{screenshot.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="requirements" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>System Requirements</CardTitle>
                    <CardDescription>
                      Minimum requirements for optimal app performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-blue-600">iOS Requirements</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm">iOS Version</span>
                            <span className="text-sm font-medium">13.0 or later</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Device</span>
                            <span className="text-sm font-medium">iPhone 6s or later</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Storage</span>
                            <span className="text-sm font-medium">100 MB available</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Internet</span>
                            <span className="text-sm font-medium">Required for tracking</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-green-600">Android Requirements</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm">Android Version</span>
                            <span className="text-sm font-medium">8.0 or later</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Device</span>
                            <span className="text-sm font-medium">Any supported device</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Storage</span>
                            <span className="text-sm font-medium">120 MB available</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Google Play Services</span>
                            <span className="text-sm font-medium">Required</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Permissions Required</CardTitle>
                    <CardDescription>
                      App permissions for full functionality
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-medium">Location Services</h4>
                        <p className="text-sm text-gray-600">For accurate delivery tracking and geofencing alerts</p>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-medium">Push Notifications</h4>
                        <p className="text-sm text-gray-600">For real-time shipment updates and alerts</p>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-medium">Camera</h4>
                        <p className="text-sm text-gray-600">For scanning tracking numbers and QR codes</p>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-medium">Storage</h4>
                        <p className="text-sm text-gray-600">For offline data storage and app performance</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="support" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Support & Resources</CardTitle>
                    <CardDescription>
                      Get help with the mobile tracking app
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Help Resources</h3>
                        <div className="space-y-3">
                          <Button variant="outline" className="w-full justify-start">
                            📖 User Guide & Tutorials
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            ❓ FAQ & Troubleshooting
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            🎥 Video Tutorials
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            📱 App Update Notes
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Contact Support</h3>
                        <div className="space-y-3">
                          <Button variant="outline" className="w-full justify-start">
                            💬 Live Chat Support
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            📧 Email Support
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            📞 Phone Support
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            🐛 Report a Bug
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>App Updates</CardTitle>
                    <CardDescription>
                      Latest features and improvements
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">Version 2.1.0</h4>
                          <Badge>Latest</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Released: September 2025</p>
                        <ul className="text-sm space-y-1">
                          <li>• Enhanced offline mode capabilities</li>
                          <li>• Improved notification customization</li>
                          <li>• New multi-language support</li>
                          <li>• Bug fixes and performance improvements</li>
                        </ul>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">Version 2.0.5</h4>
                          <Badge variant="secondary">Previous</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Released: August 2025</p>
                        <ul className="text-sm space-y-1">
                          <li>• Real-time GPS tracking improvements</li>
                          <li>• New shipment filtering options</li>
                          <li>• Enhanced security features</li>
                        </ul>
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

export default MobileTrackingAppPage;
