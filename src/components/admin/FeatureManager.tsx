import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Save, Settings, Zap, Globe, Database, Users, MessageSquare, BarChart3, Shield, Wrench, Check, X, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { FEATURE_KEYS } from '@/constants/featureKeys';
import { useToast } from "@/hooks/use-toast";

interface FeatureToggle {
  id: string;
  feature_key: string;
  is_enabled: boolean;
  description: string;
  category: 'main' | 'micro' | 'macro';
  priority: number;
  dependencies?: string[];
  custom_fields?: FeatureCustomFields;
  created_at: string;
  updated_at: string;
}

interface CustomField {
  name: string;
  type: 'text' | 'number' | 'boolean' | 'select';
  options?: string[];
  required?: boolean;
}

interface FeatureCustomFields {
  __schema?: CustomField[];
  // Additional dynamic values indexed by field name
  [key: string]: unknown;
}

// Predefined features organized by category
const predefinedFeatures = {
  main: [
    { key: FEATURE_KEYS.CMS_SYSTEM, name: 'Content Management System', description: 'Full CMS with page builder and content management', icon: Globe },
    { key: FEATURE_KEYS.CRM_SYSTEM, name: 'Customer Relationship Management', description: 'Complete CRM with opportunities, activities, and reports', icon: Users },
    { key: FEATURE_KEYS.HRM_SYSTEM, name: 'Human Resource Management', description: 'HR system with departments, leave management, and performance tracking', icon: Users },
    { key: FEATURE_KEYS.WHATSAPP_INTEGRATION, name: 'WhatsApp Business Integration', description: 'WhatsApp Web integration for customer communication', icon: MessageSquare },
    { key: FEATURE_KEYS.AI_ASSISTANT, name: 'AI Assistant', description: 'AI-powered assistant for customer support and guidance', icon: Zap },
  ],
  micro: [
    { key: FEATURE_KEYS.LIVE_CHAT, name: 'Live Chat Widget', description: 'Real-time customer support chat widget', icon: MessageSquare },
    { key: FEATURE_KEYS.QUOTE_MANAGEMENT, name: 'Quote Management', description: 'Generate and manage customer quotes', icon: BarChart3 },
    { key: FEATURE_KEYS.MEDIA_LIBRARY, name: 'Advanced Media Manager', description: 'Upload and organize media files with categories', icon: Database },
    { key: FEATURE_KEYS.FORMS_BUILDER, name: 'Dynamic Forms Builder', description: 'Create custom forms with drag-and-drop builder', icon: Wrench },
    { key: FEATURE_KEYS.ROUTE_OPTIMIZER, name: 'Route Optimization Tools', description: 'Logistics route planning and optimization', icon: Globe },
    { key: FEATURE_KEYS.DOCUMENT_SCANNER, name: 'Document Scanner', description: 'OCR-powered document scanning and processing', icon: Database },
    { key: FEATURE_KEYS.MARINE_TRAFFIC, name: 'Marine Traffic Tracker', description: 'Real-time vessel tracking and port information', icon: Globe },
    { key: FEATURE_KEYS.FREIGHT_CALCULATOR, name: 'Freight Calculator', description: 'Calculate shipping costs and delivery times', icon: BarChart3 },
    { key: FEATURE_KEYS.CONTAINER_OPTIMIZER, name: 'Container Load Optimizer', description: 'Optimize container loading and space utilization', icon: Wrench },
  ],
  macro: [
    { key: FEATURE_KEYS.MULTI_TENANT, name: 'Multi-Tenant Architecture', description: 'Support for multiple organizations/tenants', icon: Users },
    { key: FEATURE_KEYS.API_GATEWAY, name: 'API Gateway & Integration Hub', description: 'Centralized API management and third-party integrations', icon: Settings },
    { key: FEATURE_KEYS.ADVANCED_ANALYTICS, name: 'Advanced Analytics Engine', description: 'Business intelligence and advanced reporting', icon: BarChart3 },
    { key: FEATURE_KEYS.SECURITY_FRAMEWORK, name: 'Enterprise Security Framework', description: 'Advanced security features and audit trails', icon: Shield },
    { key: FEATURE_KEYS.WORKFLOW_AUTOMATION, name: 'Workflow Automation Engine', description: 'Automated business processes and workflows', icon: Zap },
    { key: FEATURE_KEYS.NOTIFICATION_SYSTEM, name: 'Multi-Channel Notifications', description: 'Email, SMS, push notifications, and webhooks', icon: MessageSquare },
    { key: FEATURE_KEYS.BACKUP_RECOVERY, name: 'Backup & Recovery System', description: 'Automated backups and disaster recovery', icon: Database },
    { key: FEATURE_KEYS.PERFORMANCE_MONITORING, name: 'Performance Monitoring', description: 'Real-time application performance monitoring', icon: BarChart3 },
  ]
};

const FeatureManager = () => {
  const [features, setFeatures] = useState<FeatureToggle[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFeature, setEditingFeature] = useState<FeatureToggle | null>(null);
  const [activeTab, setActiveTab] = useState('main');
  const { toast } = useToast();
  const [selectedFunctions, setSelectedFunctions] = useState<string[]>([]);
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [showCustomFields, setShowCustomFields] = useState(false);
  const [formData, setFormData] = useState({
    feature_key: '',
    description: '',
    is_enabled: true,
    category: 'main' as 'main' | 'micro' | 'macro',
    priority: 1,
    dependencies: [] as string[],
    custom_fields: {} as FeatureCustomFields
  });
  const [togglingIds, setTogglingIds] = useState<Set<string>>(new Set());

  const aliasMap = useMemo(() => ({ puter_ai_assistant: 'ai_assistant' }), []);

  const fetchFeatures = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('feature_toggles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      // Transform data to include default values for new fields
      const transformedData = (data || []).map(raw => {
        const feature = raw as FeatureToggle;
        const key = aliasMap[feature.feature_key] || feature.feature_key;
        return {
          ...feature,
          feature_key: key,
          category: feature.category || 'main',
          priority: feature.priority || 1,
          dependencies: feature.dependencies || []
        } as FeatureToggle;
      });
      setFeatures(transformedData);
    } catch (error) {
      console.error('Error fetching features:', error);
      toast({
        title: "Error",
        description: "Failed to fetch features",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast, aliasMap]);

  useEffect(() => {
    fetchFeatures();
  }, [fetchFeatures]);

  const handleToggleFeature = async (id: string, currentValue: boolean) => {
    setTogglingIds(prev => new Set(prev).add(id));
    try {
      const { error } = await supabase
        .from('feature_toggles')
        .update({ is_enabled: !currentValue, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      setFeatures(prev => prev.map(feature => 
        feature.id === id ? { ...feature, is_enabled: !currentValue, updated_at: new Date().toISOString() } : feature
      ));
      toast({
        title: 'Success',
        description: `Feature ${!currentValue ? 'enabled' : 'disabled'} successfully`,
      });
    } catch (error) {
      console.error('Error updating feature:', error);
      toast({
        title: 'Error',
        description: 'Failed to update feature',
        variant: 'destructive',
      });
    } finally {
      setTogglingIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const validateFeature = (proposedKey: string) => {
    if (!proposedKey.trim()) {
      toast({ title: 'Validation Error', description: 'Feature key is required', variant: 'destructive' });
      return false;
    }
    if (!/^[a-z0-9_]+$/.test(proposedKey)) {
      toast({ title: 'Validation Error', description: 'Feature key must be lowercase alphanumeric with underscores', variant: 'destructive' });
      return false;
    }
    const dup = features.find(f => f.feature_key === proposedKey && (!editingFeature || f.id !== editingFeature.id));
    if (dup) {
      toast({ title: 'Validation Error', description: 'Feature key already exists', variant: 'destructive' });
      return false;
    }
    return true;
  };

  const handleSaveFeature = async () => {
    try {
      if (!validateFeature(formData.feature_key)) return;

      // Build merged dependencies (dedupe)
      const mergedDependencies = Array.from(new Set([...(formData.dependencies || []), ...selectedFunctions]));

      // Persist custom field schema
      const customFieldSchema = customFields.length ? { __schema: customFields } : {};
      const mergedCustomFields = { ...formData.custom_fields, ...customFieldSchema };

      if (editingFeature) {
        const { error } = await supabase
          .from('feature_toggles')
          .update({
            feature_key: formData.feature_key,
            description: formData.description,
            is_enabled: formData.is_enabled,
            category: formData.category,
            priority: formData.priority,
            dependencies: mergedDependencies,
            custom_fields: mergedCustomFields
          })
          .eq('id', editingFeature.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Feature updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('feature_toggles')
          .insert([{
            ...formData,
            dependencies: mergedDependencies,
            custom_fields: mergedCustomFields
          }]);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Feature created successfully",
        });
      }

      setIsDialogOpen(false);
      setEditingFeature(null);
      setFormData({ 
        feature_key: '', 
        description: '', 
        is_enabled: true,
        category: 'main',
        priority: 1,
        dependencies: [],
        custom_fields: {}
      });
      setSelectedFunctions([]);
      setCustomFields([]);
      fetchFeatures();
    } catch (error) {
      console.error('Error saving feature:', error);
      toast({
        title: "Error",
        description: "Failed to save feature",
        variant: "destructive",
      });
    }
  };

  const initializePredefinedFeatures = async () => {
    try {
      const allPredefined = [
        ...predefinedFeatures.main.map((f, idx) => ({ ...f, category: 'main', priority: idx + 1 })),
        ...predefinedFeatures.micro.map((f, idx) => ({ ...f, category: 'micro', priority: idx + 1 })),
        ...predefinedFeatures.macro.map((f, idx) => ({ ...f, category: 'macro', priority: idx + 1 }))
      ];

      const keys = allPredefined.map(f => f.key);
      const { data: existing, error: existingError } = await supabase
        .from('feature_toggles')
        .select('feature_key')
        .in('feature_key', keys);
      if (existingError) throw existingError;
      const existingKeys = new Set((existing || []).map(e => e.feature_key));
      const toInsert = allPredefined.filter(f => !existingKeys.has(f.key)).map(feature => ({
        feature_key: feature.key,
        description: feature.description,
        is_enabled: feature.category === 'main',
        category: feature.category,
        priority: feature.priority,
        dependencies: []
      }));

      if (toInsert.length) {
        const { error: insertError } = await supabase.from('feature_toggles').insert(toInsert);
        if (insertError) throw insertError;
      }

      fetchFeatures();
      toast({
        title: 'Success',
        description: toInsert.length ? 'Predefined features initialized successfully' : 'All predefined features already exist',
      });
    } catch (error) {
      console.error('Error initializing features:', error);
      toast({
        title: 'Error',
        description: 'Failed to initialize predefined features',
        variant: 'destructive',
      });
    }
  };

  const openEditDialog = (feature: FeatureToggle) => {
    setEditingFeature(feature);
    setFormData({
      feature_key: feature.feature_key,
      description: feature.description,
      is_enabled: feature.is_enabled,
      category: feature.category || 'main',
      priority: feature.priority || 1,
      dependencies: feature.dependencies || [],
      custom_fields: feature.custom_fields || {}
    });
    setSelectedFunctions([]); // Reset selection each edit
    // Load custom field schema if present
  const schema = (feature.custom_fields && feature.custom_fields.__schema) || [];
    setCustomFields(Array.isArray(schema) ? schema : []);
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingFeature(null);
    setFormData({ 
      feature_key: '', 
      description: '', 
      is_enabled: true,
      category: 'main',
      priority: 1,
      dependencies: [],
      custom_fields: {}
    });
    setSelectedFunctions([]);
    setCustomFields([]);
    setIsDialogOpen(true);
  };

  const addCustomField = () => {
    const newField: CustomField = {
      name: `custom_field_${customFields.length + 1}`,
      type: 'text',
      required: false
    };
    setCustomFields([...customFields, newField]);
  };

  const removeCustomField = (index: number) => {
    setCustomFields(customFields.filter((_, i) => i !== index));
  };

  const updateCustomField = (index: number, field: Partial<CustomField>) => {
    setCustomFields(customFields.map((f, i) => i === index ? { ...f, ...field } : f));
  };

  const toggleFunction = (functionKey: string) => {
    setSelectedFunctions(prev => 
      prev.includes(functionKey) 
        ? prev.filter(f => f !== functionKey)
        : [...prev, functionKey]
    );
  };

  const availableFunctions = [
    { key: 'cms_page_builder', name: 'CMS Page Builder' },
    { key: 'visual_editor', name: 'Visual Editor' },
    { key: 'form_builder', name: 'Form Builder' },
    { key: 'media_manager', name: 'Media Manager' },
    { key: 'user_management', name: 'User Management' },
    { key: 'analytics_tracking', name: 'Analytics Tracking' },
    { key: 'email_notifications', name: 'Email Notifications' },
    { key: 'data_export', name: 'Data Export' },
    { key: 'api_integration', name: 'API Integration' },
    { key: 'backup_restore', name: 'Backup & Restore' }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'main': return Globe;
      case 'micro': return Zap;
      case 'macro': return Database;
      default: return Settings;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'main': return 'bg-blue-500';
      case 'micro': return 'bg-green-500';
      case 'macro': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getFeaturesByCategory = (category: string) => {
    return features.filter(f => f.category === category).sort((a, b) => (a.priority || 0) - (b.priority || 0));
  };

  if (loading) {
    return <div className="p-6">Loading features...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Feature Management</h1>
          <p className="text-muted-foreground">Control which features are enabled across the website</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={initializePredefinedFeatures}>
            <Settings className="h-4 w-4 mr-2" />
            Initialize Features
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreateDialog}>
                <Plus className="h-4 w-4 mr-2" />
                Add Feature
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingFeature ? 'Edit Feature' : 'Add New Feature'}</DialogTitle>
                <DialogDescription>
                  Configure feature toggle settings and dependencies
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="feature_key">Feature Key</Label>
                    <Input
                      id="feature_key"
                      value={formData.feature_key}
                      onChange={(e) => setFormData({ ...formData, feature_key: e.target.value })}
                      placeholder="e.g., ai_assistant"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value: 'main' | 'micro' | 'macro') => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">Main Features</SelectItem>
                        <SelectItem value="micro">Micro Features</SelectItem>
                        <SelectItem value="macro">Macro Features</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe what this feature does"
                  />
                </div>
                
                {/* Function Selection */}
                <div>
                  <Label>Available Functions</Label>
                  <div className="border rounded-lg p-4 max-h-32 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-2">
                      {availableFunctions.map((func) => (
                        <div key={func.key} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={func.key}
                            checked={selectedFunctions.includes(func.key)}
                            onChange={() => toggleFunction(func.key)}
                            className="rounded border-gray-300"
                          />
                          <Label htmlFor={func.key} className="text-sm">{func.name}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  {selectedFunctions.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-muted-foreground">Selected: {selectedFunctions.length} functions</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedFunctions.map((funcKey) => (
                          <Badge key={funcKey} variant="secondary" className="text-xs">
                            {availableFunctions.find(f => f.key === funcKey)?.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Custom Fields */}
                <div>
                  <div className="flex items-center justify-between">
                    <Label>Custom Fields</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowCustomFields(!showCustomFields)}
                    >
                      {showCustomFields ? 'Hide' : 'Show'} Custom Fields
                    </Button>
                  </div>
                  
                  {showCustomFields && (
                    <div className="space-y-3 mt-3 border rounded-lg p-4">
                      {customFields.map((field, index) => (
                        <div key={index} className="grid grid-cols-12 gap-2 items-end">
                          <div className="col-span-3">
                            <Input
                              placeholder="Field name"
                              value={field.name}
                              onChange={(e) => updateCustomField(index, { name: e.target.value })}
                            />
                          </div>
                          <div className="col-span-3">
                            <Select 
                              value={field.type} 
                              onValueChange={(value: 'text' | 'number' | 'boolean' | 'select') => 
                                updateCustomField(index, { type: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="text">Text</SelectItem>
                                <SelectItem value="number">Number</SelectItem>
                                <SelectItem value="boolean">Boolean</SelectItem>
                                <SelectItem value="select">Select</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {field.type === 'select' && (
                            <div className="col-span-4">
                              <Input
                                placeholder="Options (comma-separated)"
                                value={field.options?.join(',') || ''}
                                onChange={(e) => updateCustomField(index, { 
                                  options: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                                })}
                              />
                            </div>
                          )}
                          <div className="col-span-1 flex items-center">
                            <input
                              type="checkbox"
                              checked={field.required || false}
                              onChange={(e) => updateCustomField(index, { required: e.target.checked })}
                              className="rounded border-gray-300"
                            />
                          </div>
                          <div className="col-span-1">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeCustomField(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addCustomField}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Custom Field
                      </Button>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Input
                      id="priority"
                      type="number"
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 1 })}
                      min="1"
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-6">
                    <Switch
                      id="is_enabled"
                      checked={formData.is_enabled}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_enabled: checked })}
                    />
                    <Label htmlFor="is_enabled">Enabled by default</Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSaveFeature}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Feature
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="main" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Main Features ({getFeaturesByCategory('main').length})
          </TabsTrigger>
          <TabsTrigger value="micro" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Micro Features ({getFeaturesByCategory('micro').length})
          </TabsTrigger>
          <TabsTrigger value="macro" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Macro Features ({getFeaturesByCategory('macro').length})
          </TabsTrigger>
        </TabsList>

        {['main', 'micro', 'macro'].map((category) => (
          <TabsContent key={category} value={category} className="space-y-4">
            <div className="grid gap-4">
              {getFeaturesByCategory(category).map((feature) => {
                const predefinedFeature = predefinedFeatures[category as keyof typeof predefinedFeatures]?.find(
                  pf => pf.key === feature.feature_key
                );
                const IconComponent = predefinedFeature?.icon || Settings;
                
                return (
                  <Card key={feature.id} className={`border-l-4 ${feature.is_enabled ? 'border-l-green-500' : 'border-l-gray-300'}`}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${getCategoryColor(feature.category || 'main')} text-white`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-base font-medium">
                              {predefinedFeature?.name || feature.feature_key}
                            </CardTitle>
                            <Badge variant={feature.is_enabled ? "default" : "secondary"}>
                              {feature.is_enabled ? "Active" : "Inactive"}
                            </Badge>
                            {feature.priority && (
                              <Badge variant="outline">P{feature.priority}</Badge>
                            )}
                          </div>
                          <CardDescription className="mt-1">{feature.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(feature)}
                          aria-label="Edit feature"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={async () => {
                            const confirmDelete = window.confirm('Delete this feature? This cannot be undone.');
                            if (!confirmDelete) return;
                            try {
                              const { error } = await supabase.from('feature_toggles').delete().eq('id', feature.id);
                              if (error) throw error;
                              setFeatures(prev => prev.filter(f => f.id !== feature.id));
                              toast({ title: 'Deleted', description: 'Feature removed' });
                            } catch (err) {
                              console.error('Delete failed', err);
                              toast({ title: 'Error', description: 'Failed to delete feature', variant: 'destructive' });
                            }
                          }}
                          aria-label="Delete feature"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Switch
                          checked={feature.is_enabled}
                          onCheckedChange={() => handleToggleFeature(feature.id, feature.is_enabled)}
                          disabled={togglingIds.has(feature.id)}
                        />
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
              {getFeaturesByCategory(category).length === 0 && (
                <Card className="border-dashed border-2">
                  <CardContent className="flex flex-col items-center justify-center py-8">
                    <div className="text-muted-foreground text-center">
                      <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <h3 className="text-lg font-medium mb-2">No {category} features yet</h3>
                      <p className="text-sm">Click "Initialize Features" to add predefined features or create custom ones.</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default FeatureManager;