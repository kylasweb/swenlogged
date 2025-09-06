
import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { defaultHeaderData } from '@/data/defaults';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Trash2, Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const HeaderManager = () => {
  const [storedData, setStoredData] = useLocalStorage('headerData', defaultHeaderData);
  const [formData, setFormData] = useState(storedData);
  const [headerSettings, setHeaderSettings] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [showNavDialog, setShowNavDialog] = useState(false);
  const [editingNavIndex, setEditingNavIndex] = useState<number | null>(null);
  const [navFormData, setNavFormData] = useState({ name: '', url: '', dropdown: [] as any[] });
  const { toast } = useToast();

  useEffect(() => {
    setFormData(storedData);
    fetchHeaderSettings();
  }, [storedData]);

  const fetchHeaderSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('header_settings')
        .select('*')
        .maybeSingle();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching header settings:', error);
        return;
      }
      
      setHeaderSettings(data);
    } catch (error) {
      console.error('Error fetching header settings:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNavItemChange = (itemIndex: number, field: string, value: string) => {
    const newNavItems = [...(formData.navigationItems || [])];
    const navItem = { ...newNavItems[itemIndex], [field]: value };
    newNavItems[itemIndex] = navItem as any; // Quick fix for TS issue with dropdown
    setFormData(prev => ({ ...prev, navigationItems: newNavItems }));
  };
  
  const handleDropdownItemChange = (itemIndex: number, subItemIndex: number, field: string, value: string) => {
    const newNavItems = [...(formData.navigationItems || [])];
    const newDropdown = [...(newNavItems[itemIndex].dropdown || [])];
    newDropdown[subItemIndex] = { ...newDropdown[subItemIndex], [field]: value };
    (newNavItems[itemIndex] as any).dropdown = newDropdown;
    setFormData(prev => ({ ...prev, navigationItems: newNavItems }));
  }

  const handleFileUpload = async (file: File, type: 'logo' | 'favicon') => {
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${type}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      const url = data.publicUrl;

      if (headerSettings) {
        const { error } = await supabase
          .from('header_settings')
          .update({ [`${type}_url`]: url })
          .eq('id', headerSettings.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('header_settings')
          .insert({ [`${type}_url`]: url });
        
        if (error) throw error;
      }

      await fetchHeaderSettings();
      
      toast({
        title: "Success!",
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully.`,
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Error",
        description: `Failed to upload ${type}.`,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSaveChanges = () => {
    setStoredData(formData);
    toast({
      title: "Success!",
      description: "Header has been updated.",
    });
  };

  const handleAddNavItem = () => {
    setNavFormData({ name: '', url: '', dropdown: [] });
    setEditingNavIndex(null);
    setShowNavDialog(true);
  };

  const handleEditNavItem = (index: number) => {
    const item = (formData.navigationItems || [])[index];
    setNavFormData({ 
      name: item.name, 
      url: item.url || '', 
      dropdown: item.dropdown || [] 
    });
    setEditingNavIndex(index);
    setShowNavDialog(true);
  };

  const handleSaveNavItem = () => {
    const newNavItems = [...(formData.navigationItems || [])];
    if (editingNavIndex !== null) {
      newNavItems[editingNavIndex] = navFormData;
    } else {
      newNavItems.push(navFormData);
    }
    setFormData(prev => ({ ...prev, navigationItems: newNavItems }));
    setShowNavDialog(false);
  };

  const handleDeleteNavItem = (index: number) => {
    const newNavItems = (formData.navigationItems || []).filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, navigationItems: newNavItems }));
  };

  const handleAddDropdownItem = () => {
    setNavFormData(prev => ({
      ...prev,
      dropdown: [...prev.dropdown, { name: '', url: '' }]
    }));
  };

  const handleRemoveDropdownItem = (index: number) => {
    setNavFormData(prev => ({
      ...prev,
      dropdown: prev.dropdown.filter((_, i) => i !== index)
    }));
  };
  
  const handleReset = () => {
    setStoredData(defaultHeaderData);
    setFormData(defaultHeaderData);
     toast({
      title: "Reset!",
      description: "Header has been reset to default values.",
      variant: "destructive",
    });
  }

  return (
    <div className="bg-background p-8 rounded-lg border space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Manage Header</h2>
        <div>
          <Button onClick={handleReset} variant="outline" className="mr-2" type="button">Reset to Default</Button>
          <Button onClick={handleSaveChanges} type="button">Save Changes</Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Settings</TabsTrigger>
          <TabsTrigger value="media">Logo & Favicon</TabsTrigger>
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="logoText">Logo Text</Label>
              <Input id="logoText" name="logoText" value={formData.logoText} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="logoSubtext">Logo Subtext</Label>
              <Input id="logoSubtext" name="logoSubtext" value={formData.logoSubtext} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="ctaButtonText">CTA Button Text</Label>
              <Input id="ctaButtonText" name="ctaButtonText" value={formData.ctaButtonText} onChange={handleChange} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="media" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label>Logo Upload</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                {headerSettings?.logo_url ? (
                  <div className="space-y-2">
                    <img src={headerSettings.logo_url} alt="Logo" className="h-16 mx-auto" />
                    <p className="text-sm text-muted-foreground">Current Logo</p>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No logo uploaded</p>
                )}
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'logo')}
                  className="mt-2"
                  disabled={uploading}
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label>Favicon Upload</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                {headerSettings?.favicon_url ? (
                  <div className="space-y-2">
                    <img src={headerSettings.favicon_url} alt="Favicon" className="h-8 mx-auto" />
                    <p className="text-sm text-muted-foreground">Current Favicon</p>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No favicon uploaded</p>
                )}
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'favicon')}
                  className="mt-2"
                  disabled={uploading}
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="navigation" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Navigation Items</h3>
            <Button onClick={handleAddNavItem} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Navigation Item
            </Button>
          </div>

          <div className="space-y-4">
            {(formData.navigationItems || []).map((item, index) => (
              <div key={index} className="border rounded-lg p-4 bg-muted/50">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">{item.name || "Untitled"}</h4>
                    <p className="text-sm text-muted-foreground">{item.url || "No URL"}</p>
                    {item.dropdown?.length > 0 && (
                      <p className="text-xs text-muted-foreground">{item.dropdown.length} dropdown items</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditNavItem(index)}>
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteNavItem(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showNavDialog} onOpenChange={setShowNavDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingNavIndex !== null ? "Edit Navigation Item" : "Add Navigation Item"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="navName">Name</Label>
                <Input
                  id="navName"
                  value={navFormData.name}
                  onChange={(e) => setNavFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Navigation item name"
                />
              </div>
              <div>
                <Label htmlFor="navUrl">URL</Label>
                <Input
                  id="navUrl"
                  value={navFormData.url}
                  onChange={(e) => setNavFormData(prev => ({ ...prev, url: e.target.value }))}
                  placeholder="/page-url"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Dropdown Items</Label>
                <Button type="button" variant="outline" size="sm" onClick={handleAddDropdownItem}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Dropdown Item
                </Button>
              </div>
              
              {navFormData.dropdown.map((dropdownItem, index) => (
                <div key={index} className="grid grid-cols-2 gap-2 items-center">
                  <Input
                    value={dropdownItem.name}
                    onChange={(e) => {
                      const newDropdown = [...navFormData.dropdown];
                      newDropdown[index] = { ...newDropdown[index], name: e.target.value };
                      setNavFormData(prev => ({ ...prev, dropdown: newDropdown }));
                    }}
                    placeholder="Dropdown item name"
                  />
                  <div className="flex gap-2">
                    <Input
                      value={dropdownItem.url}
                      onChange={(e) => {
                        const newDropdown = [...navFormData.dropdown];
                        newDropdown[index] = { ...newDropdown[index], url: e.target.value };
                        setNavFormData(prev => ({ ...prev, dropdown: newDropdown }));
                      }}
                      placeholder="/dropdown-url"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveDropdownItem(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowNavDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveNavItem}>
                Save Navigation Item
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HeaderManager;
