import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, FormInput, FileText, Calendar, Hash } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface FormField {
  id: string;
  type: 'text' | 'textarea' | 'select' | 'number' | 'date' | 'email' | 'file';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

interface ApplicationProcess {
  id: string;
  job_id: string;
  name: string;
  description?: string;
  form_schema: any;
  is_active: boolean;
  created_at: string;
  jobs?: {
    title: string;
  };
}

interface Job {
  id: string;
  title: string;
  department: string;
  is_active: boolean;
}

const ApplicationProcessBuilder = () => {
  const [processes, setProcesses] = useState<ApplicationProcess[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProcess, setEditingProcess] = useState<ApplicationProcess | null>(null);
  const [formData, setFormData] = useState({
    job_id: '',
    name: '',
    description: '',
    fields: [] as FormField[]
  });
  const [newField, setNewField] = useState({
    type: 'text' as FormField['type'],
    label: '',
    placeholder: '',
    required: false,
    options: [] as string[]
  });

  useEffect(() => {
    fetchProcesses();
    fetchJobs();
  }, []);

  const fetchProcesses = async () => {
    try {
      const { data, error } = await supabase
        .from('application_processes')
        .select(`
          *,
          jobs (title)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProcesses(data || []);
    } catch (error) {
      console.error('Error fetching processes:', error);
      toast.error('Failed to fetch application processes');
    }
  };

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('id, title, department, is_active')
        .eq('is_active', true)
        .order('title');

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProcess = async () => {
    try {
      const processData = {
        job_id: formData.job_id,
        name: formData.name,
        description: formData.description,
        form_schema: JSON.stringify({ fields: formData.fields }),
        is_active: true
      };

      if (editingProcess) {
        const { error } = await supabase
          .from('application_processes')
          .update(processData)
          .eq('id', editingProcess.id);
        
        if (error) throw error;
        toast.success('Application process updated successfully');
      } else {
        const { error } = await supabase
          .from('application_processes')
          .insert([processData]);
        
        if (error) throw error;
        toast.success('Application process created successfully');
      }

      setIsDialogOpen(false);
      setEditingProcess(null);
      resetForm();
      fetchProcesses();
    } catch (error) {
      console.error('Error saving process:', error);
      toast.error('Failed to save application process');
    }
  };

  const handleDeleteProcess = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application process?')) return;

    try {
      const { error } = await supabase
        .from('application_processes')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast.success('Application process deleted successfully');
      fetchProcesses();
    } catch (error) {
      console.error('Error deleting process:', error);
      toast.error('Failed to delete application process');
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('application_processes')
        .update({ is_active: !currentStatus })
        .eq('id', id);
      
      if (error) throw error;
      toast.success(`Process ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
      fetchProcesses();
    } catch (error) {
      console.error('Error updating process status:', error);
      toast.error('Failed to update process status');
    }
  };

  const addField = () => {
    if (!newField.label.trim()) {
      toast.error('Field label is required');
      return;
    }

    const field: FormField = {
      id: Date.now().toString(),
      type: newField.type,
      label: newField.label,
      placeholder: newField.placeholder,
      required: newField.required,
      options: newField.type === 'select' ? newField.options : undefined
    };

    setFormData(prev => ({
      ...prev,
      fields: [...prev.fields, field]
    }));

    setNewField({
      type: 'text',
      label: '',
      placeholder: '',
      required: false,
      options: []
    });
  };

  const removeField = (fieldId: string) => {
    setFormData(prev => ({
      ...prev,
      fields: prev.fields.filter(f => f.id !== fieldId)
    }));
  };

  const resetForm = () => {
    setFormData({
      job_id: '',
      name: '',
      description: '',
      fields: []
    });
    setNewField({
      type: 'text',
      label: '',
      placeholder: '',
      required: false,
      options: []
    });
  };

  const openEditDialog = (process: ApplicationProcess) => {
    setEditingProcess(process);
    setFormData({
      job_id: process.job_id,
      name: process.name,
      description: process.description || '',
      fields: typeof process.form_schema === 'string' ? JSON.parse(process.form_schema).fields || [] : process.form_schema.fields || []
    });
    setIsDialogOpen(true);
  };

  const getFieldIcon = (type: string) => {
    switch (type) {
      case 'textarea': return <FileText className="h-4 w-4" />;
      case 'date': return <Calendar className="h-4 w-4" />;
      case 'number': return <Hash className="h-4 w-4" />;
      default: return <FormInput className="h-4 w-4" />;
    }
  };

  if (loading) {
    return <div className="p-6">Loading application processes...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Application Process Builder</h1>
          <p className="text-muted-foreground">Create custom application forms for job positions</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setEditingProcess(null); }}>
              <Plus className="mr-2 h-4 w-4" />
              Create Process
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProcess ? 'Edit Application Process' : 'Create Application Process'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 mt-4">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="job_id">Job Position</Label>
                  <Select value={formData.job_id} onValueChange={(value) => setFormData(prev => ({ ...prev, job_id: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a job" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobs.map((job) => (
                        <SelectItem key={job.id} value={job.id}>
                          {job.title} - {job.department}
                        </SelectItem>
                      ))
                      }
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="name">Process Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Standard Application Form"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe this application process..."
                  rows={3}
                />
              </div>

              {/* Form Builder */}
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Form Fields</h3>
                
                {/* Add New Field */}
                <div className="border rounded-lg p-4 mb-4 bg-gray-50">
                  <h4 className="font-medium mb-3">Add New Field</h4>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <Label>Field Type</Label>
                      <Select value={newField.type} onValueChange={(value: FormField['type']) => setNewField(prev => ({ ...prev, type: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Text Input</SelectItem>
                          <SelectItem value="textarea">Text Area</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="number">Number</SelectItem>
                          <SelectItem value="date">Date</SelectItem>
                          <SelectItem value="select">Dropdown</SelectItem>
                          <SelectItem value="file">File Upload</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Field Label</Label>
                      <Input
                        value={newField.label}
                        onChange={(e) => setNewField(prev => ({ ...prev, label: e.target.value }))}
                        placeholder="e.g., Years of Experience"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <Label>Placeholder (Optional)</Label>
                      <Input
                        value={newField.placeholder}
                        onChange={(e) => setNewField(prev => ({ ...prev, placeholder: e.target.value }))}
                        placeholder="Enter placeholder text..."
                      />
                    </div>
                    <div className="flex items-center space-x-2 mt-6">
                      <input
                        type="checkbox"
                        id="required"
                        checked={newField.required}
                        onChange={(e) => setNewField(prev => ({ ...prev, required: e.target.checked }))}
                      />
                      <Label htmlFor="required">Required Field</Label>
                    </div>
                  </div>
                  {newField.type === 'select' && (
                    <div>
                      <Label>Options (comma-separated)</Label>
                      <Input
                        value={newField.options.join(', ')}
                        onChange={(e) => setNewField(prev => ({ 
                          ...prev, 
                          options: e.target.value.split(',').map(opt => opt.trim()).filter(Boolean)
                        }))}
                        placeholder="Option 1, Option 2, Option 3"
                      />
                    </div>
                  )}
                  <Button onClick={addField} className="mt-3">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Field
                  </Button>
                </div>

                {/* Existing Fields */}
                <div className="space-y-2">
                  {formData.fields.map((field, index) => (
                    <div key={field.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getFieldIcon(field.type)}
                        <div>
                          <span className="font-medium">{field.label}</span>
                          {field.required && <Badge variant="secondary" className="ml-2">Required</Badge>}
                          <p className="text-sm text-muted-foreground">{field.type}</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeField(field.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {formData.fields.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      No fields added yet. Add your first field above.
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveProcess}>
                {editingProcess ? 'Update Process' : 'Create Process'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Processes List */}
      <div className="grid gap-4">
        {processes.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-gray-500">
                <FormInput className="mx-auto h-12 w-12 mb-4" />
                <p>No application processes created yet. Create your first one!</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          processes.map((process) => (
            <Card key={process.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {process.name}
                      <Badge variant={process.is_active ? "default" : "secondary"}>
                        {process.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      {process.jobs?.title} • {process.form_schema.fields?.length || 0} fields
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleStatus(process.id, process.is_active)}
                    >
                      {process.is_active ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(process)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteProcess(process.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{process.description}</p>
                <div className="flex flex-wrap gap-2">
                  {process.form_schema.fields?.map((field) => (
                    <Badge key={field.id} variant="outline" className="text-xs">
                      {field.label} ({field.type})
                    </Badge>
                  ))
                  }
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ApplicationProcessBuilder;
