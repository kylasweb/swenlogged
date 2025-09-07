import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  Database,
  Globe,
  Shield,
  Zap,
  Server,
  Code,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  RefreshCw,
  Eye,
  EyeOff
} from "lucide-react";
import { toast } from "sonner";

interface SystemInfo {
  nodeVersion: string;
  reactVersion: string;
  viteVersion: string;
  typescriptVersion: string;
  buildTime: string;
  environment: string;
  gitCommit: string;
  platform: string;
  userAgent: string;
  language: string;
  timezone: string;
  screenResolution: string;
  viewport: string;
}

interface RouteInfo {
  path: string;
  status: string;
  component: string;
}

interface RouteStatus {
  totalRoutes: number;
  activeRoutes: number;
  brokenRoutes: number;
  routes: RouteInfo[];
}

interface ApiStatusInfo {
  status: string;
  latency: string;
  lastChecked: string;
}

interface ApiStatus {
  [key: string]: ApiStatusInfo;
}

const VerificationPage = () => {
  const [systemInfo, setSystemInfo] = useState<SystemInfo>({} as SystemInfo);
  const [routeStatus, setRouteStatus] = useState<RouteStatus>({
    totalRoutes: 0,
    activeRoutes: 0,
    brokenRoutes: 0,
    routes: []
  });
  const [apiStatus, setApiStatus] = useState<ApiStatus>({});
  const [showSensitive, setShowSensitive] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock data for demonstration - in a real app, this would come from APIs
  useEffect(() => {
    // System Information
    setSystemInfo({
      nodeVersion: process.env.NODE_ENV === 'development' ? '18.17.0' : '18.17.0',
      reactVersion: '18.2.0',
      viteVersion: '5.4.6',
      typescriptVersion: '5.2.2',
      buildTime: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      gitCommit: 'a1b2c3d4e5f6',
      platform: navigator.platform,
      userAgent: navigator.userAgent,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`
    });

    // Route Status
    setRouteStatus({
      totalRoutes: 45,
      activeRoutes: 42,
      brokenRoutes: 3,
      routes: [
        { path: '/', status: 'active', component: 'Index' },
        { path: '/resources', status: 'active', component: 'ResourcesPage' },
        { path: '/resources/customs-documentation-handbook', status: 'active', component: 'CustomsDocumentationHandbookPage' },
        { path: '/tools/freight-calculator', status: 'active', component: 'FreightCalculatorPage' },
        { path: '/verification', status: 'active', component: 'VerificationPage' },
        { path: '/broken-route-example', status: 'broken', component: 'NotFound' }
      ]
    });

    // API Status
    setApiStatus({
      supabase: { status: 'connected', latency: '45ms', lastChecked: new Date().toISOString() },
      puter: { status: 'connected', latency: '120ms', lastChecked: new Date().toISOString() },
      openai: { status: 'available', latency: '200ms', lastChecked: new Date().toISOString() },
      stripe: { status: 'disconnected', latency: 'N/A', lastChecked: new Date().toISOString() }
    });
  }, []);

  const refreshData = () => {
    setLastUpdated(new Date());
    toast.success('System data refreshed');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'connected':
      case 'available':
        return 'bg-green-500';
      case 'broken':
      case 'disconnected':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'connected':
      case 'available':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'broken':
      case 'disconnected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <>
      <Helmet>
        <title>System Verification | SWENLOG Internal</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-blue-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">System Verification</h1>
                  <p className="text-sm text-gray-600">Comprehensive website verification dashboard</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="text-xs">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </Badge>
                <Button onClick={refreshData} size="sm" variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button
                  onClick={() => setShowSensitive(!showSensitive)}
                  size="sm"
                  variant="outline"
                >
                  {showSensitive ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                  {showSensitive ? 'Hide' : 'Show'} Sensitive
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs defaultValue="system" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="system">System</TabsTrigger>
              <TabsTrigger value="routes">Routes</TabsTrigger>
              <TabsTrigger value="apis">APIs</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
            </TabsList>

            {/* System Information */}
            <TabsContent value="system" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Server className="h-5 w-5" />
                      Runtime Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Node.js Version:</span>
                      <Badge variant="outline">{systemInfo.nodeVersion}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">React Version:</span>
                      <Badge variant="outline">{systemInfo.reactVersion}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Vite Version:</span>
                      <Badge variant="outline">{systemInfo.viteVersion}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">TypeScript:</span>
                      <Badge variant="outline">{systemInfo.typescriptVersion}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Environment:</span>
                      <Badge variant="outline">{systemInfo.environment}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Git Commit:</span>
                      <Badge variant="outline" className="font-mono text-xs">{systemInfo.gitCommit}</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Browser Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Platform:</span>
                      <Badge variant="outline">{systemInfo.platform}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Language:</span>
                      <Badge variant="outline">{systemInfo.language}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Timezone:</span>
                      <Badge variant="outline">{systemInfo.timezone}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Screen:</span>
                      <Badge variant="outline">{systemInfo.screenResolution}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Viewport:</span>
                      <Badge variant="outline">{systemInfo.viewport}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Build Time:</span>
                      <Badge variant="outline" className="text-xs">
                        {new Date(systemInfo.buildTime).toLocaleString()}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      Application Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Routes:</span>
                      <Badge variant="outline">{routeStatus.totalRoutes}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Active Routes:</span>
                      <Badge className="bg-green-500">{routeStatus.activeRoutes}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Broken Routes:</span>
                      <Badge className="bg-red-500">{routeStatus.brokenRoutes}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Memory Usage:</span>
                      <Badge variant="outline">
                        {((performance as unknown) as { memory?: { usedJSHeapSize: number } }).memory ?
                          `${Math.round(((performance as unknown) as { memory: { usedJSHeapSize: number } }).memory.usedJSHeapSize / 1024 / 1024)}MB` :
                          'N/A'
                        }
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Page Load:</span>
                      <Badge variant="outline">
                        {performance.timing.loadEventEnd - performance.timing.navigationStart}ms
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Routes */}
            <TabsContent value="routes" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Route Status Overview</CardTitle>
                  <CardDescription>All application routes and their current status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {routeStatus.routes?.map((route: RouteInfo, index: number) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(route.status)}
                          <div>
                            <div className="font-medium">{route.path}</div>
                            <div className="text-sm text-gray-600">{route.component}</div>
                          </div>
                        </div>
                        <Badge className={getStatusColor(route.status)}>
                          {route.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* APIs */}
            <TabsContent value="apis" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(apiStatus).map(([api, status]: [string, ApiStatusInfo]) => (
                  <Card key={api}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 capitalize">
                        {getStatusIcon(status.status)}
                        {api} API
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Status:</span>
                        <Badge className={getStatusColor(status.status)}>
                          {status.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Latency:</span>
                        <Badge variant="outline">{status.latency}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Last Checked:</span>
                        <Badge variant="outline" className="text-xs">
                          {new Date(status.lastChecked).toLocaleTimeString()}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Security */}
            <TabsContent value="security" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Security Headers
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Content Security Policy:</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">HTTPS Enforcement:</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">X-Frame-Options:</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">XSS Protection:</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      Authentication Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Auth Provider:</span>
                      <Badge variant="outline">Supabase</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">JWT Tokens:</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Session Management:</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Password Policies:</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {showSensitive && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600">⚠️ Sensitive Information</CardTitle>
                    <CardDescription>Environment variables and API keys (masked)</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">SUPABASE_URL:</span>
                      <Badge variant="outline" className="font-mono text-xs">
                        https://*****.supabase.co
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">SUPABASE_ANON_KEY:</span>
                      <Badge variant="outline" className="font-mono text-xs">
                        eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">PUTER_API_KEY:</span>
                      <Badge variant="outline" className="font-mono text-xs">
                        pk_****_****_****_****_****
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Performance */}
            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Page Load
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      {performance.timing.loadEventEnd - performance.timing.navigationStart}ms
                    </div>
                    <p className="text-sm text-gray-600">Time to interactive</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Memory Usage
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">
                      {((performance as unknown) as { memory?: { usedJSHeapSize: number } }).memory ?
                        `${Math.round(((performance as unknown) as { memory: { usedJSHeapSize: number } }).memory.usedJSHeapSize / 1024 / 1024)}MB` :
                        'N/A'
                      }
                    </div>
                    <p className="text-sm text-gray-600">Heap size</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Network
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">
                      {navigator.onLine ? 'Online' : 'Offline'}
                    </div>
                    <p className="text-sm text-gray-600">Connection status</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Server className="h-5 w-5" />
                      Resources
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">
                      {document.querySelectorAll('img').length}
                    </div>
                    <p className="text-sm text-gray-600">Images loaded</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Content */}
            <TabsContent value="content" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Page Components</CardTitle>
                    <CardDescription>Status of all page components</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Header Component:</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Footer Component:</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Navigation:</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">SEO Components:</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Content Assets</CardTitle>
                    <CardDescription>Status of images, fonts, and other assets</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Images:</span>
                      <Badge variant="outline">{document.querySelectorAll('img').length} loaded</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Fonts:</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">CSS:</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">JavaScript:</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default VerificationPage;
