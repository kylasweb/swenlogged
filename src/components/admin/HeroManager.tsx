import React, { useState, useEffect, useRef } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { defaultHeroData } from '@/data/defaults';
import { Upload, X, ImageIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const HeroManager = () => {
  const [storedHeroData, setStoredHeroData] = useLocalStorage('heroData', defaultHeroData);
  const [formData, setFormData] = useState(storedHeroData);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    setFormData(storedHeroData);
  }, [storedHeroData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStoredHeroData(formData);
    toast({
      title: "Success!",
      description: "Hero section has been updated.",
    });
  };
  
  const handleReset = () => {
    setStoredHeroData(defaultHeroData);
    setFormData(defaultHeroData);
    toast({
      title: "Reset!",
      description: "Hero section has been reset to default values.",
      variant: "destructive",
    });
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Please select a valid image file.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `hero-image-${Date.now()}.${fileExt}`;
      const filePath = `hero/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, imageUrl: publicUrl }));
      
      toast({
        title: "Success!",
        description: "Image uploaded successfully.",
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, imageUrl: '' }));
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Hero Section</h2>
        <Button onClick={handleReset} variant="outline">Reset to Default</Button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="mainHeading">Main Heading</Label>
          <Input id="mainHeading" name="mainHeading" value={formData.mainHeading} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="subHeading">Sub Heading</Label>
          <Input id="subHeading" name="subHeading" value={formData.subHeading} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" />
        </div>
        <div>
          <Label htmlFor="imageUrl">Hero Image</Label>
          <div className="space-y-4">
            <Input 
              id="imageUrl" 
              name="imageUrl" 
              value={formData.imageUrl} 
              onChange={handleChange}
              placeholder="Or enter image URL directly"
            />
            
            {/* Image Upload Section */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              
              {formData.imageUrl ? (
                <div className="space-y-4">
                  <div className="relative">
                    <img 
                      src={formData.imageUrl} 
                      alt="Hero preview" 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={triggerFileUpload}
                    disabled={isUploading}
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {isUploading ? 'Uploading...' : 'Replace Image'}
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No image selected</p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={triggerFileUpload}
                    disabled={isUploading}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {isUploading ? 'Uploading...' : 'Upload Image'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
};

export default HeroManager;
