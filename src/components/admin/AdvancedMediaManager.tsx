import React, { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Database, Tables } from '@/integrations/supabase/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
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
import { 
  Plus, Edit, Trash, Upload, FolderPlus, Grid, List, 
  Search, Filter, Download, Copy, Eye, Trash2 
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

type MediaItem = Tables<'media_items'>;
type MediaItemInsert = Database['public']['Tables']['media_items']['Insert'];
type MediaItemUpdate = Database['public']['Tables']['media_items']['Update'];

interface UploadFile {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  id: string;
  preview?: string;
}

const fetchMediaItems = async (): Promise<MediaItem[]> => {
  const { data, error } = await supabase
    .from('media_items')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data || [];
};

const AdvancedMediaManager = () => {
  const queryClient = useQueryClient();
  const { data: mediaItems = [], isLoading } = useQuery<MediaItem[]>({
    queryKey: ['mediaItems'],
    queryFn: fetchMediaItems,
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<MediaItem | null>(null);
  const [formData, setFormData] = useState<Omit<MediaItem, 'id' | 'created_at'>>({ name: '', url: '', alt: '' });
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'images' | 'documents'>('all');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handleBulkDelete = () => {
    if (selectedItems.length === 0) return;
    if (window.confirm(`Are you sure you want to delete ${selectedItems.length} items?`)) {
      selectedItems.forEach(id => deleteMutation.mutate(id));
      setSelectedItems([]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newUploadFiles: UploadFile[] = files.map(file => ({
      file,
      progress: 0,
      status: 'pending',
      id: Math.random().toString(36).substr(2, 9),
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    }));
    
    setUploadFiles(prev => [...prev, ...newUploadFiles]);
    setIsUploadDialogOpen(true);
  };

  const uploadFileToSupabase = async (uploadFile: UploadFile) => {
    try {
      setUploadFiles(prev => prev.map(uf => 
        uf.id === uploadFile.id ? { ...uf, status: 'uploading', progress: 10 } : uf
      ));

      const fileName = `${Date.now()}-${uploadFile.file.name}`;
      const { data, error } = await supabase.storage
        .from('media')
        .upload(fileName, uploadFile.file);

      if (error) throw error;

      setUploadFiles(prev => prev.map(uf => 
        uf.id === uploadFile.id ? { ...uf, progress: 50 } : uf
      ));

      const { data: publicUrl } = supabase.storage
        .from('media')
        .getPublicUrl(fileName);

      const mediaItem: MediaItemInsert = {
        name: uploadFile.file.name,
        url: publicUrl.publicUrl,
        alt: uploadFile.file.name
      };

      await addMutation.mutateAsync(mediaItem);

      setUploadFiles(prev => prev.map(uf => 
        uf.id === uploadFile.id ? { ...uf, status: 'success', progress: 100 } : uf
      ));

    } catch (error) {
      setUploadFiles(prev => prev.map(uf => 
        uf.id === uploadFile.id ? { ...uf, status: 'error' } : uf
      ));
    }
  };

  const handleBulkUpload = async () => {
    const pendingFiles = uploadFiles.filter(uf => uf.status === 'pending');
    for (const uploadFile of pendingFiles) {
      await uploadFileToSupabase(uploadFile);
    }
  };

  const filteredMediaItems = mediaItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.alt?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === 'all') return matchesSearch;
    if (filterType === 'images') return matchesSearch && item.url.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i);
    if (filterType === 'documents') return matchesSearch && item.url.match(/\.(pdf|doc|docx|xls|xlsx|ppt|pptx)$/i);
    
    return matchesSearch;
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "URL copied to clipboard." });
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Advanced Media Library</h2>
          <p className="text-gray-600">Manage your media files with advanced upload and organization features</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Bulk Upload
          </Button>
          <Button onClick={() => openDialog()}>
            <Plus className="mr-2 h-4 w-4" /> Add Media URL
          </Button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Filters and Search */}
      <div className="flex justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search media..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Files</SelectItem>
              <SelectItem value="images">Images</SelectItem>
              <SelectItem value="documents">Documents</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          {selectedItems.length > 0 && (
            <Button onClick={handleBulkDelete} variant="destructive" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected ({selectedItems.length})
            </Button>
          )}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <Tabs value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
        <TabsContent value="grid">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <Skeleton className="h-32 w-full rounded-md mb-3" />
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/2" />
                  </CardContent>
                </Card>
              ))
            ) : filteredMediaItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="relative mb-3">
                    <Checkbox
                      className="absolute top-2 left-2 z-10"
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedItems(prev => [...prev, item.id]);
                        } else {
                          setSelectedItems(prev => prev.filter(id => id !== item.id));
                        }
                      }}
                    />
                    <img 
                      src={item.url} 
                      alt={item.alt || item.name} 
                      className="h-32 w-full object-cover rounded-md bg-gray-100" 
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary" onClick={() => window.open(item.url, '_blank')}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="secondary" onClick={() => copyToClipboard(item.url)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="secondary" onClick={() => openDialog(item)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-medium text-sm truncate">{item.name}</h3>
                  <p className="text-xs text-gray-500 truncate">{item.alt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedItems.length === filteredMediaItems.length && filteredMediaItems.length > 0}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedItems(filteredMediaItems.map(item => item.id));
                        } else {
                          setSelectedItems([]);
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead className="w-[100px]">Preview</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Alt Text</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead className="text-right w-[200px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                      <TableCell><Skeleton className="h-16 w-16 rounded-md" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-3/4" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-1/2" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                      <TableCell className="text-right"><Skeleton className="h-8 w-32" /></TableCell>
                    </TableRow>
                  ))
                ) : filteredMediaItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedItems(prev => [...prev, item.id]);
                          } else {
                            setSelectedItems(prev => prev.filter(id => id !== item.id));
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <img src={item.url} alt={item.alt || item.name} className="h-16 w-16 object-cover rounded-md bg-gray-100" />
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-gray-600">{item.alt}</TableCell>
                    <TableCell>
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline max-w-xs truncate block">
                        {item.url}
                      </a>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => window.open(item.url, '_blank')}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => copyToClipboard(item.url)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openDialog(item)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Edit/Add Dialog */}
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
              <Label htmlFor="url">Media URL</Label>
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

      {/* Bulk Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Bulk Upload Files</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4 max-h-96 overflow-y-auto">
            {uploadFiles.map((uploadFile) => (
              <div key={uploadFile.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                {uploadFile.preview && (
                  <img src={uploadFile.preview} alt="" className="h-12 w-12 object-cover rounded" />
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium">{uploadFile.file.name}</p>
                  <p className="text-xs text-gray-500">{(uploadFile.file.size / 1024 / 1024).toFixed(2)} MB</p>
                  {uploadFile.status === 'uploading' && (
                    <Progress value={uploadFile.progress} className="mt-2" />
                  )}
                </div>
                <div className="text-sm">
                  {uploadFile.status === 'pending' && '⏳ Pending'}
                  {uploadFile.status === 'uploading' && '⬆️ Uploading'}
                  {uploadFile.status === 'success' && '✅ Success'}
                  {uploadFile.status === 'error' && '❌ Error'}
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleBulkUpload} disabled={uploadFiles.length === 0}>
              Upload All Files
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdvancedMediaManager;