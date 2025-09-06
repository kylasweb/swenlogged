import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Save, Settings, Bot, Calculator, Map, Wrench } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ResourceConfiguration {
  id: string;
  resource_key: string;
  configuration: any;
  is_enabled: boolean;
  created_at: string;
  updated_at: string;
}

const ResourcesManager = () => {
  const [configurations, setConfigurations] = useState<ResourceConfiguration[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingConfig, setEditingConfig] = useState<ResourceConfiguration | null>(null);
  const [formData, setFormData] = useState({
    resource_key: '',
    configuration: '{}',
    is_enabled: true
  });

  const resourceTypes = [
    { key: 'ai_assistant', name: 'AI Assistant', icon: Bot, description: 'PuterJS AI Assistant configuration' },
    { key: 'freight_calculator', name: 'Freight Calculator', icon: Calculator, description: 'Freight calculation tool settings' },
    { key: 'marine_traffic', name: 'Marine Traffic', icon: Map, description: 'Marine traffic monitoring tool' },
    { key: 'route_optimizer', name: 'Route Optimizer', icon: Wrench, description: 'Route optimization engine' },
    { key: 'document_scanner', name: 'Document Scanner', icon: Settings, description: 'AI document processing tool' },
    { key: 'container_optimizer', name: 'Container Optimizer', icon: Calculator, description: 'Container load optimization' }
  ];

  useEffect(() => {
    fetchConfigurations();
    initializeDefaultConfigurations();
  }, []);

  const fetchConfigurations = async () => {
    try {
      const { data, error } = await supabase
        .from('resource_configurations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setConfigurations(data || []);
    } catch (error) {
      console.error('Error fetching configurations:', error);
      toast.error('Failed to fetch configurations');
    } finally {
      setLoading(false);
    }
  };

  const initializeDefaultConfigurations = async () => {
    const defaultConfigs = [
      {
        resource_key: 'ai_assistant',
        configuration: {
          model: 'gpt-4o-mini',
          maxTokens: 1000,
          temperature: 0.7,
          systemPrompt: 'You are SwenAI, a logistics expert assistant.'
        },
        is_enabled: true
      },
      {
        resource_key: 'freight_calculator',
        configuration: {
          defaultCurrency: 'USD',
          includeTaxes: true,
          shippingModes: ['air', 'sea', 'ground'],
          calculations: ['weight', 'volume', 'distance']
        },
        is_enabled: true
      },
      {
        resource_key: 'marine_traffic',
        configuration: {
          defaultZoom: 6,
          centerLat: 51.6,
          centerLng: 1.9,
          refreshInterval: 30000,
          showVesselDetails: true
        },
        is_enabled: true
      }
    ];

    for (const config of defaultConfigs) {
      const { data: existing } = await supabase
        .from('resource_configurations')
        .select('id')
        .eq('resource_key', config.resource_key)
        .single();

      if (!existing) {
        await supabase
          .from('resource_configurations')
          .insert([config]);
      }
    }
  };

  const handleToggleResource = async (id: string, currentValue: boolean) => {
    try {
      const { error } = await supabase
        .from('resource_configurations')
        .update({ is_enabled: !currentValue })
        .eq('id', id);

      if (error) throw error;

      setConfigurations(configurations.map(config => 
        config.id === id ? { ...config, is_enabled: !currentValue } : config
      ));
      toast.success('Resource updated successfully');
    } catch (error) {
      console.error('Error updating resource:', error);
      toast.error('Failed to update resource');
    }
  };

  const handleSaveConfiguration = async () => {
    try {
      let configObject;
      try {
        configObject = JSON.parse(formData.configuration);
      } catch {
        toast.error('Invalid JSON configuration');
        return;
      }

      if (editingConfig) {
        const { error } = await supabase
          .from('resource_configurations')
          .update({
            resource_key: formData.resource_key,
            configuration: configObject,
            is_enabled: formData.is_enabled
          })
          .eq('id', editingConfig.id);

        if (error) throw error;
        toast.success('Configuration updated successfully');
      } else {
        const { error } = await supabase
          .from('resource_configurations')
          .insert([{
            resource_key: formData.resource_key,
            configuration: configObject,
            is_enabled: formData.is_enabled
          }]);

        if (error) throw error;
        toast.success('Configuration created successfully');
      }

      setIsDialogOpen(false);
      setEditingConfig(null);
      setFormData({ resource_key: '', configuration: '{}', is_enabled: true });
      fetchConfigurations();
    } catch (error) {
      console.error('Error saving configuration:', error);
      toast.error('Failed to save configuration');
    }
  };

  const openEditDialog = (config: ResourceConfiguration) => {
    setEditingConfig(config);
    setFormData({
      resource_key: config.resource_key,
      configuration: JSON.stringify(config.configuration, null, 2),
      is_enabled: config.is_enabled
    });
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingConfig(null);
    setFormData({ resource_key: '', configuration: '{}', is_enabled: true });
    setIsDialogOpen(true);
  };

  const getResourceInfo = (key: string) => {
    return resourceTypes.find(r => r.key === key) || { 
      name: key, 
      icon: Settings, 
      description: 'Custom resource configuration' 
    };
  };

  if (loading) {
    return <div className="p-6">Loading resources...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Resources Management</h1>
          <p className="text-muted-foreground">Configure and manage all resource tools and features</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Configuration
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingConfig ? 'Edit Configuration' : 'Add New Configuration'}</DialogTitle>
              <DialogDescription>
                Configure resource settings and behavior
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="resource_key">Resource Key</Label>
                <Input
                  id="resource_key"
                  value={formData.resource_key}
                  onChange={(e) => setFormData({ ...formData, resource_key: e.target.value })}
                  placeholder="e.g., ai_assistant"
                />
              </div>
              <div>
                <Label htmlFor="configuration">Configuration (JSON)</Label>
                <Textarea
                  id="configuration"
                  value={formData.configuration}
                  onChange={(e) => setFormData({ ...formData, configuration: e.target.value })}
                  placeholder='{"key": "value"}'
                  className="h-32 font-mono"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_enabled"
                  checked={formData.is_enabled}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_enabled: checked })}
                />
                <Label htmlFor="is_enabled">Enabled</Label>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSaveConfiguration}>
                <Save className="h-4 w-4 mr-2" />
                Save Configuration
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="configurations">Configurations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resourceTypes.map((resource) => {
              const config = configurations.find(c => c.resource_key === resource.key);
              const Icon = resource.icon;
              
              return (
                <Card key={resource.key}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex items-center space-x-2">
                      <Icon className="h-5 w-5 text-primary" />
                      <CardTitle className="text-sm font-medium">{resource.name}</CardTitle>
                    </div>
                    <Switch
                      checked={config?.is_enabled || false}
                      onCheckedChange={() => config && handleToggleResource(config.id, config.is_enabled)}
                      disabled={!config}
                    />
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-xs">{resource.description}</CardDescription>
                    <div className="mt-2">
                      <p className="text-xs text-muted-foreground">
                        Status: {config?.is_enabled ? 'Enabled' : 'Disabled'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="configurations" className="space-y-4">
          <div className="grid gap-4">
            {configurations.map((config) => {
              const resourceInfo = getResourceInfo(config.resource_key);
              const Icon = resourceInfo.icon;
              
              return (
                <Card key={config.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <div className="flex items-center space-x-3">
                      <Icon className="h-5 w-5 text-primary" />
                      <div>
                        <CardTitle className="text-base font-medium">{resourceInfo.name}</CardTitle>
                        <CardDescription className="text-sm">{config.resource_key}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(config)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Switch
                        checked={config.is_enabled}
                        onCheckedChange={() => handleToggleResource(config.id, config.is_enabled)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted rounded-lg p-3">
                      <pre className="text-xs text-muted-foreground overflow-auto">
                        {JSON.stringify(config.configuration, null, 2)}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResourcesManager;