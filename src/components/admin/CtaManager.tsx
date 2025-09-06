import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Switch } from '@/components/ui/switch';
import { defaultCtaData } from '@/data/defaults';

const CtaManager = () => {
  const [storedCtaData, setStoredCtaData] = useLocalStorage('ctaData', defaultCtaData);
  const [formData, setFormData] = useState(storedCtaData);
  const { toast } = useToast();

  useEffect(() => {
    setFormData(storedCtaData);
  }, [storedCtaData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEnabledChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, enabled: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStoredCtaData(formData);
    toast({
      title: "Success!",
      description: "Global CTA has been updated.",
    });
  };

  const handleReset = () => {
    setStoredCtaData(defaultCtaData);
    setFormData(defaultCtaData);
    toast({
      title: "Reset!",
      description: "Global CTA has been reset to default values.",
      variant: "destructive",
    });
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Global CTA</h2>
        <Button onClick={handleReset} variant="outline">Reset to Default</Button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center space-x-2">
          <Switch id="enabled" checked={formData.enabled} onCheckedChange={handleEnabledChange} />
          <Label htmlFor="enabled" className="cursor-pointer">Enable Global CTA</Label>
        </div>
        <div>
          <Label htmlFor="text">CTA Text</Label>
          <Input id="text" name="text" value={formData.text} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="link">CTA Link URL</Label>
          <Input id="link" name="link" value={formData.link} onChange={handleChange} />
        </div>
        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
};

export default CtaManager;
