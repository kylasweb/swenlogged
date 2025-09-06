
import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { defaultFooterData } from '@/data/defaults';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Textarea } from '../ui/textarea';

const FooterManager = () => {
  const [storedData, setStoredData] = useLocalStorage('footerData', defaultFooterData);
  const [formData, setFormData] = useState(storedData);
  const { toast } = useToast();

  useEffect(() => {
    setFormData(storedData);
  }, [storedData]);

  const handleMainChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (index: number, field: string, value: string) => {
    const newSocials = [...formData.socials];
    newSocials[index] = { ...newSocials[index], [field]: value } as any;
    setFormData(prev => ({...prev, socials: newSocials}));
  };

  const handleColumnTitleChange = (colIndex: number, value: string) => {
    const newColumns = [...formData.columns];
    newColumns[colIndex].title = value;
    setFormData(prev => ({...prev, columns: newColumns}));
  }

  const handleLinkChange = (colIndex: number, linkIndex: number, field: string, value: string) => {
    const newColumns = [...formData.columns];
    newColumns[colIndex].links[linkIndex] = { ...newColumns[colIndex].links[linkIndex], [field]: value };
    setFormData(prev => ({...prev, columns: newColumns}));
  };

  const handleBottomLinkChange = (index: number, field: string, value: string) => {
    const newLinks = [...formData.bottomLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setFormData(prev => ({...prev, bottomLinks: newLinks}));
  };

  const handleSaveChanges = () => {
    setStoredData(formData);
    toast({
      title: "Success!",
      description: "Footer has been updated.",
    });
  };
  
  const handleReset = () => {
    setStoredData(defaultFooterData);
    setFormData(defaultFooterData);
     toast({
      title: "Reset!",
      description: "Footer has been reset to default values.",
      variant: "destructive",
    });
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Manage Footer</h2>
        <div>
            <Button onClick={handleReset} variant="outline" className="mr-2" type="button">Reset to Default</Button>
            <Button onClick={handleSaveChanges} type="button">Save Changes</Button>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <Label htmlFor="logoText">Logo Text</Label>
          <Input id="logoText" name="logoText" value={formData.logoText} onChange={handleMainChange} />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" value={formData.description} onChange={handleMainChange} />
        </div>
        
        <h3 className="text-xl font-bold pt-4 border-t">Social Media Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.socials.map((social, index) => (
                <div key={index} className="p-2 border rounded-md space-y-2">
                    <Label>{social.name} URL</Label>
                    <Input value={social.url} onChange={(e) => handleSocialChange(index, 'url', e.target.value)} />
                </div>
            ))}
        </div>

        <h3 className="text-xl font-bold pt-4 border-t">Link Columns</h3>
        <Accordion type="multiple" className="w-full">
            {formData.columns.map((col, colIndex) => (
                <AccordionItem value={`col-${colIndex}`} key={colIndex}>
                    <AccordionTrigger>{col.title}</AccordionTrigger>
                    <AccordionContent className="space-y-2 p-4 bg-gray-50 rounded-md">
                        <Label>Column Title</Label>
                        <Input value={col.title} onChange={e => handleColumnTitleChange(colIndex, e.target.value)} />
                        <Label className="pt-2 block font-semibold">Links</Label>
                        {col.links.map((link, linkIndex) => (
                            <div key={linkIndex} className="flex gap-2 items-center">
                                <Input value={link.name} onChange={e => handleLinkChange(colIndex, linkIndex, 'name', e.target.value)} placeholder="Link Name"/>
                                <Input value={link.url} onChange={e => handleLinkChange(colIndex, linkIndex, 'url', e.target.value)} placeholder="URL"/>
                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>

        <h3 className="text-xl font-bold pt-4 border-t">Footer Bottom</h3>
        <div>
          <Label htmlFor="bottomText">Copyright Text</Label>
          <Input id="bottomText" name="bottomText" value={formData.bottomText} onChange={handleMainChange} />
        </div>
        <div>
            <Label>Bottom Links</Label>
            <div className="space-y-2">
            {formData.bottomLinks.map((link, index) => (
                <div key={index} className="flex gap-2 items-center">
                    <Input value={link.name} onChange={e => handleBottomLinkChange(index, 'name', e.target.value)} placeholder="Link Name" />
                    <Input value={link.url} onChange={e => handleBottomLinkChange(index, 'url', e.target.value)} placeholder="URL" />
                </div>
            ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default FooterManager;
