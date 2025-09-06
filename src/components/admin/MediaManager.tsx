
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Database, Tables } from '@/integrations/supabase/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Edit, Trash } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

type MediaItem = Tables<'media_items'>;
type MediaItemInsert = Database['public']['Tables']['media_items']['Insert'];
type MediaItemUpdate = Database['public']['Tables']['media_items']['Update'];

const fetchMediaItems = async (): Promise<MediaItem[]> => {
  const { data, error } = await supabase
    .from('media_items')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data || [];
};

const MediaManager = () => {
  const queryClient = useQueryClient();
  const { data: mediaItems = [], isLoading } = useQuery<MediaItem[]>({
    queryKey: ['mediaItems'],
    queryFn: fetchMediaItems,
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<MediaItem | null>(null);
  const [formData, setFormData] = useState<Omit<MediaItem, 'id' | 'created_at'>>({ name: '', url: '', alt: '' });
  const { toast } = useToast();

  const addMutation = useMutation({
    mutationFn: async (newItem: MediaItemInsert) => {
      const { error } = await supabase.from('media_items').insert(newItem);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mediaItems'] });
      toast({ title: "Success!", description: "New media item added." });
      closeDialog();
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: 'destructive' });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updatedItem }: { id: string, updatedItem: MediaItemUpdate }) => {
      const { error } = await supabase.from('media_items').update(updatedItem).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mediaItems'] });
      toast({ title: "Success!", description: "Media item updated." });
      closeDialog();
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: 'destructive' });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('media_items').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mediaItems'] });
      toast({ title: "Deleted!", description: "Media item has been removed.", variant: 'destructive' });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: 'destructive' });
    }
  });

  const openDialog = (item: MediaItem | null = null) => {
    setCurrentItem(item);
    setFormData(item ? { name: item.name, url: item.url, alt: item.alt || '' } : { name: '', url: '', alt: '' });
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setCurrentItem(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentItem) {
      updateMutation.mutate({ id: currentItem.id, updatedItem: formData });
    } else {
      addMutation.mutate(formData);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Media Library</h2>
        <Button onClick={() => openDialog()}>
          <Plus className="mr-2 h-4 w-4" /> Add New Media
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Preview</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>URL</TableHead>
              <TableHead className="text-right w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-16 w-16 rounded-md" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-3/4" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-8 w-20" /></TableCell>
                </TableRow>
              ))
            ) : mediaItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <img src={item.url} alt={item.alt || item.name} className="h-16 w-16 object-cover rounded-md bg-gray-100" />
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline max-w-xs truncate block">{item.url}</a>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => openDialog(item)} disabled={updateMutation.isPending}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} disabled={deleteMutation.isPending}>
                    <Trash className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentItem ? 'Edit Media Item' : 'Add New Media Item'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="url">Image URL</Label>
              <Input id="url" name="url" type="url" value={formData.url} onChange={handleChange} required />
            </div>
             <div>
              <Label htmlFor="alt">Alt Text</Label>
              <Input id="alt" name="alt" value={formData.alt || ''} onChange={handleChange} required />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeDialog}>Cancel</Button>
              <Button type="submit" disabled={addMutation.isPending || updateMutation.isPending}>Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MediaManager;
