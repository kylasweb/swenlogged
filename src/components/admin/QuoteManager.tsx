import React, { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { Badge } from '@/components/ui/badge';
import { defaultSubmissions } from '@/data/defaults';

type QuoteSubmission = {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  status: 'new' | 'contacted' | 'closed';
  createdAt: string;
};

const QuoteManager = () => {
  const [submissions, setSubmissions] = useLocalStorage<QuoteSubmission[]>('quoteSubmissions', defaultSubmissions);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<QuoteSubmission | null>(null);
  const [formData, setFormData] = useState<Omit<QuoteSubmission, 'id' | 'createdAt'>>({ name: '', email: '', service: '', message: '', status: 'new' });
  const { toast } = useToast();

  const openDialog = (item: QuoteSubmission | null = null) => {
    setCurrentItem(item);
    setFormData(item ? { ...item } : { name: '', email: '', service: '', message: '', status: 'new' });
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setCurrentItem(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleStatusChange = (value: 'new' | 'contacted' | 'closed') => {
      setFormData(prev => ({ ...prev, status: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentItem) {
      setSubmissions(submissions.map(s => s.id === currentItem.id ? { ...currentItem, ...formData } : s));
      toast({ title: "Success!", description: "Quote submission updated." });
    } else {
      const newSubmission = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...formData };
      setSubmissions([newSubmission, ...submissions]);
      toast({ title: "Success!", description: "New quote submission added." });
    }
    closeDialog();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
        setSubmissions(submissions.filter(s => s.id !== id));
        toast({ title: "Deleted!", description: "Submission has been removed.", variant: 'destructive' });
    }
  };

  const statusColors = {
    new: 'bg-blue-500',
    contacted: 'bg-yellow-500',
    closed: 'bg-green-500',
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Quote Submissions</h2>
        <Button onClick={() => openDialog()}>
          <Plus className="mr-2 h-4 w-4" /> Add New Quote
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((s) => (
              <TableRow key={s.id}>
                <TableCell>
                    <div className="font-medium">{s.name}</div>
                    <div className="text-sm text-muted-foreground">{s.email}</div>
                </TableCell>
                <TableCell>{s.service}</TableCell>
                <TableCell><Badge variant={s.status === 'new' ? 'default' : s.status === 'contacted' ? 'secondary' : 'outline'}>{s.status}</Badge></TableCell>
                <TableCell>{new Date(s.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => openDialog(s)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(s.id)}>
                    <Trash className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentItem ? 'Edit Quote' : 'Add New Quote'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
            </div>
            <div>
              <Label htmlFor="service">Service</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, service: value }))} value={formData.service}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ocean Freight">Ocean Freight</SelectItem>
                  <SelectItem value="Air Freight">Air Freight</SelectItem>
                  <SelectItem value="Ground Transportation">Ground Transportation</SelectItem>
                  <SelectItem value="Customs Brokerage">Customs Brokerage</SelectItem>
                  <SelectItem value="Warehousing & Distribution">Warehousing & Distribution</SelectItem>
                  <SelectItem value="Supply Chain Solutions">Supply Chain Solutions</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required />
            </div>
             <div>
              <Label htmlFor="status">Status</Label>
              <Select onValueChange={handleStatusChange} value={formData.status}>
                  <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
              </Select>
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

export default QuoteManager;
