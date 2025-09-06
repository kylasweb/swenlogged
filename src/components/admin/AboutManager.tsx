
import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { defaultAboutData } from '@/data/defaults';
import { Textarea } from '../ui/textarea';

const AboutManager = () => {
  const [storedData, setStoredData] = useLocalStorage('aboutData', defaultAboutData);
  const [formData, setFormData] = useState(storedData);
  const { toast } = useToast();

  useEffect(() => {
    setFormData(storedData);
  }, [storedData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleValueChange = (index: number, field: string, value: string) => {
    if (!formData.values || !Array.isArray(formData.values)) {
      console.error('formData.values is not an array:', formData.values);
      return;
    }
    
    const newValues = [...formData.values];
    newValues[index] = { ...newValues[index], [field]: value };
    setFormData(prev => ({ ...prev, values: newValues }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStoredData(formData);
    toast({
      title: "Success!",
      description: "About section has been updated.",
    });
  };
  
  const handleReset = () => {
    setStoredData(defaultAboutData);
    setFormData(defaultAboutData);
     toast({
      title: "Reset!",
      description: "About section has been reset to default values.",
      variant: "destructive",
    });
  }

  // Add safety check for formData and values
  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Manage About Section</h2>
        <Button onClick={handleReset} variant="outline">Reset to Default</Button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" value={formData.title || ''} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="paragraph1">Paragraph 1</Label>
          <Textarea id="paragraph1" name="paragraph1" value={formData.paragraph1 || ''} onChange={handleChange} rows={4} />
        </div>
        <div>
          <Label htmlFor="paragraph2">Paragraph 2</Label>
          <Textarea id="paragraph2" name="paragraph2" value={formData.paragraph2 || ''} onChange={handleChange} rows={4} />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="stat1_value">Stat 1 Value</Label>
              <Input id="stat1_value" name="stat1_value" value={formData.stat1_value || ''} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="stat1_label">Stat 1 Label</Label>
              <Input id="stat1_label" name="stat1_label" value={formData.stat1_label || ''} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="stat2_value">Stat 2 Value</Label>
              <Input id="stat2_value" name="stat2_value" value={formData.stat2_value || ''} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="stat2_label">Stat 2 Label</Label>
              <Input id="stat2_label" name="stat2_label" value={formData.stat2_label || ''} onChange={handleChange} />
            </div>
        </div>
        
        <h3 className="text-xl font-bold pt-4 border-t">Core Values</h3>
        <div className="space-y-4">
            {formData.values && Array.isArray(formData.values) ? (
              formData.values.map((val, index) => (
                <div key={val?.id || index} className="p-4 border rounded-lg space-y-2">
                    <Label>Value {index + 1}</Label>
                    <Input 
                      value={val?.title || ''} 
                      onChange={(e) => handleValueChange(index, 'title', e.target.value)} 
                      placeholder="Title (e.g. Precision)" 
                    />
                    <Textarea 
                      value={val?.description || ''} 
                      onChange={(e) => handleValueChange(index, 'description', e.target.value)} 
                      placeholder="Description" 
                    />
                </div>
              ))
            ) : (
              <div className="text-gray-500 italic">No values data available</div>
            )}
        </div>

        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
};

export default AboutManager;
