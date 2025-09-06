import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Plus, Edit, Trash2, Eye, Code, Mail, Phone, User, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

type FormField = {
  id: string;
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'checkbox' | 'radio';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  validation?: string;
};

type Form = {
  id: string;
  name: string;
  title: string;
  description?: string;
  fields: FormField[];
  submitText: string;
  successMessage: string;
  redirectUrl?: string;
  emailNotification: boolean;
  notificationEmail?: string;
  styling: {
    layout: 'vertical' | 'horizontal' | 'inline';
    theme: 'default' | 'modern' | 'minimal' | 'gradient';
    size: 'sm' | 'md' | 'lg';
    buttonStyle: 'primary' | 'secondary' | 'outline' | 'ghost';
  };
  active: boolean;
  placement: {
    pages: string[];
    position: 'header' | 'footer' | 'sidebar' | 'content' | 'popup' | 'floating';
    trigger?: 'immediate' | 'scroll' | 'time' | 'exit';
    delay?: number;
  };
  created_at: string;
  updated_at: string;
};

type FormSubmission = {
  id: string;
  formId: string;
  formName: string;
  data: Record<string, any>;
  submittedAt: string;
  userAgent?: string;
  ipAddress?: string;
  source: string;
};

const defaultForm: Omit<Form, 'id' | 'created_at' | 'updated_at'> = {
  name: 'New Form',
  title: 'Contact Us',
  description: '',
  fields: [
    { id: '1', type: 'text', label: 'Name', placeholder: 'Enter your name', required: true },
    { id: '2', type: 'email', label: 'Email', placeholder: 'Enter your email', required: true },
    { id: '3', type: 'textarea', label: 'Message', placeholder: 'Enter your message', required: true }
  ],
  submitText: 'Submit',
  successMessage: 'Thank you for your submission!',
  emailNotification: true,
  styling: {
    layout: 'vertical',
    theme: 'default',
    size: 'md',
    buttonStyle: 'primary'
  },
  active: true,
  placement: {
    pages: ['all'],
    position: 'content'
  }
};

const FormsManager = () => {
  const [forms, setForms] = useLocalStorage<Form[]>('formsData', []);
  const [submissions, setSubmissions] = useLocalStorage<FormSubmission[]>('formSubmissions', []);
  const [ctaForms, setCtaForms] = useState<any[]>([]);
  const [selectedForm, setSelectedForm] = useState<Form | null>(null);
  const [formData, setFormData] = useState(defaultForm);
  const [activeTab, setActiveTab] = useState('forms');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchCtaForms();
  }, []);

  const fetchCtaForms = async () => {
    try {
      const { data, error } = await supabase
        .from('cta_forms')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCtaForms(data || []);
    } catch (error) {
      console.error('Error fetching CTA forms:', error);
    }
  };

  const generateShortcode = (formId: string) => `[form id="${formId}"]`;

  const handleCreateForm = () => {
    setSelectedForm(null);
    setFormData(defaultForm);
    setIsDialogOpen(true);
  };

  const handleEditForm = (form: Form) => {
    setSelectedForm(form);
    setFormData(form);
    setIsDialogOpen(true);
  };

  const handleSaveForm = () => {
    const now = new Date().toISOString();
    if (selectedForm) {
      setForms(prev => prev.map(form => 
        form.id === selectedForm.id 
          ? { ...formData, id: selectedForm.id, created_at: selectedForm.created_at, updated_at: now }
          : form
      ));
      toast({ title: "Form updated successfully!" });
    } else {
      const newForm: Form = {
        ...formData,
        id: crypto.randomUUID(),
        created_at: now,
        updated_at: now
      };
      setForms(prev => [...prev, newForm]);
      toast({ title: "Form created successfully!" });
    }
    setIsDialogOpen(false);
  };

  const handleDeleteForm = (id: string) => {
    setForms(prev => prev.filter(form => form.id !== id));
    setSubmissions(prev => prev.filter(sub => sub.formId !== id));
    toast({ title: "Form deleted successfully!" });
  };

  const handleDuplicateForm = (form: Form) => {
    const duplicatedForm: Form = {
      ...form,
      id: crypto.randomUUID(),
      name: `${form.name} (Copy)`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setForms(prev => [...prev, duplicatedForm]);
    toast({ title: "Form duplicated successfully!" });
  };

  const addField = () => {
    const newField: FormField = {
      id: crypto.randomUUID(),
      type: 'text',
      label: 'New Field',
      placeholder: '',
      required: false
    };
    setFormData(prev => ({
      ...prev,
      fields: [...prev.fields, newField]
    }));
  };

  const updateField = (index: number, field: Partial<FormField>) => {
    setFormData(prev => ({
      ...prev,
      fields: prev.fields.map((f, i) => i === index ? { ...f, ...field } : f)
    }));
  };

  const removeField = (index: number) => {
    setFormData(prev => ({
      ...prev,
      fields: prev.fields.filter((_, i) => i !== index)
    }));
  };

  const copyShortcode = (formId: string) => {
    navigator.clipboard.writeText(generateShortcode(formId));
    toast({ title: "Shortcode copied to clipboard!" });
  };

  const getSubmissionsByForm = (formId: string) => {
    return submissions.filter(sub => sub.formId === formId);
  };

  const renderFormPreview = () => {
    if (!formData) return null;

    return (
      <div className="p-6 bg-background border rounded-lg">
        <h3 className="text-lg font-semibold mb-2">{formData.title}</h3>
        {formData.description && (
          <p className="text-muted-foreground mb-4">{formData.description}</p>
        )}
        <div className={`space-y-4 ${formData.styling.layout === 'horizontal' ? 'grid grid-cols-2 gap-4' : ''}`}>
          {formData.fields.map((field, index) => (
            <div key={field.id} className="space-y-2">
              <Label>{field.label} {field.required && '*'}</Label>
              {field.type === 'textarea' ? (
                <Textarea placeholder={field.placeholder} disabled />
              ) : field.type === 'select' ? (
                <Select disabled>
                  <SelectTrigger>
                    <SelectValue placeholder={field.placeholder} />
                  </SelectTrigger>
                </Select>
              ) : (
                <Input 
                  type={field.type} 
                  placeholder={field.placeholder} 
                  disabled 
                />
              )}
            </div>
          ))}
        </div>
        <Button className="mt-4" disabled>{formData.submitText}</Button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Forms Management</h2>
          <p className="text-muted-foreground">Create and manage forms with shortcode integration</p>
        </div>
        <Button onClick={handleCreateForm}>
          <Plus className="h-4 w-4 mr-2" />
          Create Form
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="forms">Forms</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
          <TabsTrigger value="shortcodes">Shortcodes</TabsTrigger>
        </TabsList>

        <TabsContent value="forms" className="space-y-4">
          <div className="grid gap-4">
            {forms.map((form) => (
              <Card key={form.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {form.name}
                        <Badge variant={form.active ? "default" : "secondary"}>
                          {form.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {form.description || form.title}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => copyShortcode(form.id)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEditForm(form)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDuplicateForm(form)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleDeleteForm(form.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Fields:</span> {form.fields.length}
                    </div>
                    <div>
                      <span className="font-medium">Submissions:</span> {getSubmissionsByForm(form.id).length}
                    </div>
                    <div>
                      <span className="font-medium">Position:</span> {form.placement.position}
                    </div>
                    <div>
                      <span className="font-medium">Shortcode:</span> 
                      <code className="ml-1 text-xs bg-muted px-1 rounded">
                        {generateShortcode(form.id)}
                      </code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="submissions" className="space-y-4">
          <div className="grid gap-4">
            {submissions.map((submission) => (
              <Card key={submission.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{submission.formName}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Submitted on {new Date(submission.submittedAt).toLocaleString()}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(submission.data).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="font-medium capitalize">{key}:</span>
                        <span className="text-muted-foreground">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="shortcodes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shortcode Usage</CardTitle>
              <p className="text-sm text-muted-foreground">
                Use these shortcodes to embed forms anywhere on your site
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Available Form Shortcodes:</h4>
                  <div className="space-y-2">
                    {forms.map((form) => (
                      <div key={form.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <span className="font-medium">{form.name}</span>
                          <p className="text-sm text-muted-foreground">{form.title}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <code className="bg-background px-2 py-1 rounded text-sm">
                            {generateShortcode(form.id)}
                          </code>
                          <Button variant="outline" size="sm" onClick={() => copyShortcode(form.id)}>
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Other Shortcodes:</h4>
                  <div className="space-y-2 text-sm">
                    <div><code>[cta]</code> - Global CTA</div>
                    <div><code>[contact]</code> - Contact Information</div>
                    <div><code>[social]</code> - Social Media Links</div>
                    <div><code>[newsletter]</code> - Newsletter Signup</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedForm ? 'Edit Form' : 'Create New Form'}
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="basic" className="space-y-4">
            <TabsList>
              <TabsTrigger value="basic">Basic Settings</TabsTrigger>
              <TabsTrigger value="fields">Form Fields</TabsTrigger>
              <TabsTrigger value="styling">Styling</TabsTrigger>
              <TabsTrigger value="placement">Placement</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Form Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Internal name for the form"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Form Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Title shown to users"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Optional description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="submitText">Submit Button Text</Label>
                  <Input
                    id="submitText"
                    value={formData.submitText}
                    onChange={(e) => setFormData(prev => ({ ...prev, submitText: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="successMessage">Success Message</Label>
                  <Input
                    id="successMessage"
                    value={formData.successMessage}
                    onChange={(e) => setFormData(prev => ({ ...prev, successMessage: e.target.value }))}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="emailNotification"
                  checked={formData.emailNotification}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, emailNotification: checked }))}
                />
                <Label htmlFor="emailNotification">Email Notifications</Label>
              </div>

              {formData.emailNotification && (
                <div className="space-y-2">
                  <Label htmlFor="notificationEmail">Notification Email</Label>
                  <Input
                    id="notificationEmail"
                    type="email"
                    value={formData.notificationEmail || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, notificationEmail: e.target.value }))}
                    placeholder="admin@example.com"
                  />
                </div>
              )}
            </TabsContent>

            <TabsContent value="fields" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Form Fields</h3>
                <Button onClick={addField} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Field
                </Button>
              </div>

              <div className="space-y-4">
                {formData.fields.map((field, index) => (
                  <Card key={field.id}>
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Field Type</Label>
                          <Select
                            value={field.type}
                            onValueChange={(value: FormField['type']) => updateField(index, { type: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="text">Text</SelectItem>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="phone">Phone</SelectItem>
                              <SelectItem value="textarea">Textarea</SelectItem>
                              <SelectItem value="select">Select</SelectItem>
                              <SelectItem value="checkbox">Checkbox</SelectItem>
                              <SelectItem value="radio">Radio</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Label</Label>
                          <Input
                            value={field.label}
                            onChange={(e) => updateField(index, { label: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Placeholder</Label>
                          <Input
                            value={field.placeholder || ''}
                            onChange={(e) => updateField(index, { placeholder: e.target.value })}
                          />
                        </div>
                        <div className="flex items-center space-x-2 pt-6">
                          <Switch
                            checked={field.required}
                            onCheckedChange={(checked) => updateField(index, { required: checked })}
                          />
                          <Label>Required</Label>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeField(index)}
                            className="ml-auto"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="styling" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Layout</Label>
                  <Select
                    value={formData.styling.layout}
                    onValueChange={(value: any) => setFormData(prev => ({
                      ...prev,
                      styling: { ...prev.styling, layout: value }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vertical">Vertical</SelectItem>
                      <SelectItem value="horizontal">Horizontal</SelectItem>
                      <SelectItem value="inline">Inline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select
                    value={formData.styling.theme}
                    onValueChange={(value: any) => setFormData(prev => ({
                      ...prev,
                      styling: { ...prev.styling, theme: value }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                      <SelectItem value="gradient">Gradient</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Size</Label>
                  <Select
                    value={formData.styling.size}
                    onValueChange={(value: any) => setFormData(prev => ({
                      ...prev,
                      styling: { ...prev.styling, size: value }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sm">Small</SelectItem>
                      <SelectItem value="md">Medium</SelectItem>
                      <SelectItem value="lg">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Button Style</Label>
                  <Select
                    value={formData.styling.buttonStyle}
                    onValueChange={(value: any) => setFormData(prev => ({
                      ...prev,
                      styling: { ...prev.styling, buttonStyle: value }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary">Primary</SelectItem>
                      <SelectItem value="secondary">Secondary</SelectItem>
                      <SelectItem value="outline">Outline</SelectItem>
                      <SelectItem value="ghost">Ghost</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="placement" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Position</Label>
                  <Select
                    value={formData.placement.position}
                    onValueChange={(value: any) => setFormData(prev => ({
                      ...prev,
                      placement: { ...prev.placement, position: value }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="header">Header</SelectItem>
                      <SelectItem value="footer">Footer</SelectItem>
                      <SelectItem value="sidebar">Sidebar</SelectItem>
                      <SelectItem value="content">Content</SelectItem>
                      <SelectItem value="popup">Popup</SelectItem>
                      <SelectItem value="floating">Floating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {formData.placement.position === 'popup' && (
                  <div className="space-y-2">
                    <Label>Trigger</Label>
                    <Select
                      value={formData.placement.trigger}
                      onValueChange={(value: any) => setFormData(prev => ({
                        ...prev,
                        placement: { ...prev.placement, trigger: value }
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="scroll">On Scroll</SelectItem>
                        <SelectItem value="time">Time Delay</SelectItem>
                        <SelectItem value="exit">Exit Intent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Pages (comma-separated or 'all')</Label>
                <Input
                  value={formData.placement.pages.join(', ')}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    placement: {
                      ...prev.placement,
                      pages: e.target.value.split(',').map(p => p.trim())
                    }
                  }))}
                  placeholder="all, home, about, contact"
                />
              </div>
            </TabsContent>

            <TabsContent value="preview" className="space-y-4">
              <h3 className="text-lg font-medium">Form Preview</h3>
              {renderFormPreview()}
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveForm}>
              {selectedForm ? 'Update Form' : 'Create Form'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormsManager;