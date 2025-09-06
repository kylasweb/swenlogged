import React, { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
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
import { Plus, Edit, Trash, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { defaultPages } from '@/data/defaults';

type Page = {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
};

const PageManager = () => {
  const [pages, setPages] = useLocalStorage<Page[]>('pagesData', defaultPages);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Page | null>(null);
  const [formData, setFormData] = useState<Omit<Page, 'id'>>({ title: '', slug: '', content: '', published: false });
  const { toast } = useToast();

  const slugify = (text: string) => text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

  const openDialog = (item: Page | null = null) => {
    setCurrentItem(item);
    setFormData(item ? { ...item } : { title: '', slug: '', content: '', published: false });
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setCurrentItem(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let { name, value } = e.target;
    if (name === 'title') {
      setFormData(prev => ({ ...prev, title: value, slug: slugify(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handlePublishedChange = (checked: boolean) => {
    setFormData(prev => ({...prev, published: checked}));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentItem) {
      setPages(pages.map(p => p.id === currentItem.id ? { ...currentItem, ...formData, slug: slugify(formData.slug) } : p));
      toast({ title: "Success!", description: "Page updated." });
    } else {
      const newPage = { id: crypto.randomUUID(), ...formData, slug: slugify(formData.slug) || slugify(formData.title) };
      setPages([newPage, ...pages]);
      toast({ title: "Success!", description: "New page created." });
    }
    closeDialog();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this page?')) {
        setPages(pages.filter(p => p.id !== id));
        toast({ title: "Deleted!", description: "Page has been removed.", variant: 'destructive' });
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Page Management</h2>
        <Button onClick={() => openDialog()}>
          <Plus className="mr-2 h-4 w-4" /> Create New Page
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.title}</TableCell>
                <TableCell className="text-muted-foreground">/page/{p.slug}</TableCell>
                <TableCell>
                  <Badge variant={p.published ? 'default' : 'outline'}>{p.published ? 'Published' : 'Draft'}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  {p.published && <Button asChild variant="ghost" size="icon"><Link to={`/page/${p.slug}`} target="_blank"><Eye className="h-4 w-4" /></Link></Button>}
                  <Button variant="ghost" size="icon" onClick={() => openDialog(p)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)}>
                    <Trash className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{currentItem ? 'Edit Page' : 'Create New Page'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="flex items-center space-x-2">
                <Switch id="published" checked={formData.published} onCheckedChange={handlePublishedChange} />
                <Label htmlFor="published">Published</Label>
            </div>
            <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div>
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" name="slug" value={formData.slug} onChange={handleChange} required />
            </div>
            <div>
                <Label htmlFor="content">Content (Markdown supported)</Label>
                <Textarea id="content" name="content" value={formData.content} onChange={handleChange} required rows={10} />
            </div>
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

export default PageManager;
