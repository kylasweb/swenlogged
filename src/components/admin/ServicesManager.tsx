import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/components/ui/use-toast';
import { Plus, Edit, Trash } from 'lucide-react';
import { defaultServicesData } from '@/data/defaults';
import { ICON_NAMES } from '../icons';

type Service = { id: string; slug: string; icon: string; title: string; description: string; features: string; };
type ServicesData = { title: string; subtitle: string; services: Service[]; };

const createSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/ & /g, ' and ')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .trim();

const ServicesManager = () => {
  const [storedData, setStoredData] = useLocalStorage<ServicesData>('servicesData', defaultServicesData);
  const [formData, setFormData] = useState(storedData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Service | null>(null);
  const [serviceForm, setServiceForm] = useState<Omit<Service, 'id' | 'slug'>>({ icon: '', title: '', description: '', features: '' });
  const { toast } = useToast();

  useEffect(() => {
    let dataToSet = storedData;
    const needsMigration = storedData.services.some(s => !s.slug);

    if (needsMigration) {
      dataToSet = {
        ...storedData,
        services: storedData.services.map(s => ({
          ...s,
          slug: s.slug || createSlug(s.title),
        })),
      };
      setStoredData(dataToSet);
    }
    
    setFormData(dataToSet);
  }, [storedData, setStoredData]);

  const handleMainChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const openDialog = (item: Service | null = null) => {
    setCurrentItem(item);
    setServiceForm(item ? { icon: item.icon, title: item.title, description: item.description, features: item.features } : { icon: ICON_NAMES[0], title: '', description: '', features: '' });
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setCurrentItem(null);
  };

  const handleServiceFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setServiceForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleIconChange = (value: string) => {
    setServiceForm(prev => ({ ...prev, icon: value }));
  };

  const handleServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let newServices;
    if (currentItem) {
      newServices = formData.services.map(s => 
        s.id === currentItem.id 
        ? { ...s, ...serviceForm, slug: createSlug(serviceForm.title) } 
        : s
      );
      toast({ title: "Success!", description: "Service updated." });
    } else {
      const newService = { 
        id: crypto.randomUUID(), 
        ...serviceForm,
        slug: createSlug(serviceForm.title) 
      };
      newServices = [...formData.services, newService];
      toast({ title: "Success!", description: "New service added." });
    }
    setFormData(prev => ({ ...prev, services: newServices }));
    closeDialog();
  };
  
  const handleServiceDelete = (id: string) => {
    if (window.confirm('Are you sure?')) {
      const newServices = formData.services.filter(s => s.id !== id);
      setFormData(prev => ({...prev, services: newServices}));
      toast({ title: "Deleted!", description: "Service removed.", variant: 'destructive' });
    }
  };
  
  const handleSaveChanges = () => {
    setStoredData(formData);
    toast({ title: "Success!", description: "Services section has been saved." });
  };
  
  const handleReset = () => {
    setStoredData(defaultServicesData);
    setFormData(defaultServicesData);
    toast({ title: "Reset!", description: "Services section reset to default.", variant: 'destructive' });
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Manage Services Section</h2>
        <div>
          <Button onClick={handleReset} variant="outline" className="mr-2">Reset</Button>
          <Button onClick={handleSaveChanges}>Save All Changes</Button>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" value={formData.title} onChange={handleMainChange} />
        </div>
        <div>
          <Label htmlFor="subtitle">Subtitle</Label>
          <Textarea id="subtitle" name="subtitle" value={formData.subtitle} onChange={handleMainChange} rows={3}/>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Services</h3>
          <Button onClick={() => openDialog()}><Plus className="mr-2 h-4 w-4" /> Add Service</Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader><TableRow><TableHead>Icon</TableHead><TableHead>Title</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {formData.services.map(s => (
                <TableRow key={s.id}>
                  <TableCell>{s.icon}</TableCell>
                  <TableCell className="font-medium">{s.title}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => openDialog(s)}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleServiceDelete(s.id)}><Trash className="h-4 w-4 text-red-500" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{currentItem ? 'Edit Service' : 'Add New Service'}</DialogTitle></DialogHeader>
          <form onSubmit={handleServiceSubmit} className="space-y-4 py-4">
            <div><Label htmlFor="icon">Icon</Label><Select onValueChange={handleIconChange} value={serviceForm.icon}><SelectTrigger><SelectValue placeholder="Select icon" /></SelectTrigger><SelectContent>{ICON_NAMES.map(name => <SelectItem key={name} value={name}>{name}</SelectItem>)}</SelectContent></Select></div>
            <div><Label htmlFor="title">Title</Label><Input id="title" name="title" value={serviceForm.title} onChange={handleServiceFormChange} required /></div>
            <div><Label htmlFor="description">Description</Label><Textarea id="description" name="description" value={serviceForm.description} onChange={handleServiceFormChange} required /></div>
            <div><Label htmlFor="features">Features (one per line)</Label><Textarea id="features" name="features" value={serviceForm.features} onChange={handleServiceFormChange} required rows={4} /></div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeDialog}>Cancel</Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServicesManager;
