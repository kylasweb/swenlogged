import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { 
  Users, UserPlus, Building, DollarSign, Calendar, Phone, Mail, 
  MapPin, Tag, Archive, Edit, Trash2, Eye, Activity, TrendingUp,
  Filter, Search, Plus, Download, Upload
} from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  position?: string;
  address?: string;
  tags?: string[];
  status: string; // Made flexible instead of strict union
  lead_source?: string;
  last_contacted?: string;
  notes?: string;
  created_at: string;
}

interface Lead {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  source: string; // Made flexible instead of strict union
  status: string; // Made flexible instead of strict union
  score?: number;
  assigned_to?: string;
  estimated_value?: number;
  expected_close_date?: string;
  notes?: string;
  created_at: string;
}

interface Opportunity {
  id: string;
  name: string;
  description?: string;
  value: number;
  stage: string; // Made flexible instead of strict union
  probability?: number;
  close_date: string;
  contact_id?: string;
  assigned_to?: string;
  competitors?: string[];
  notes?: string;
  created_at: string;
}

interface Deal {
  id: string;
  title: string;
  value: number;
  stage: string;
  probability: number;
  expected_close: string;
  contact_id: string;
  created_at: string;
}

interface Activity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note';
  subject: string;
  description?: string;
  contact_id?: string;
  lead_id?: string;
  opportunity_id?: string;
  due_date?: string;
  completed: boolean;
  created_at: string;
}

const fetchContacts = async (): Promise<Contact[]> => {
  const { data, error } = await supabase.from('crm_contacts').select('*');
  if (error) throw error;
  return data || [];
};

const fetchLeads = async (): Promise<Lead[]> => {
  const { data, error } = await supabase.from('crm_leads').select('*');
  if (error) throw error;
  return data || [];
};

const fetchOpportunities = async (): Promise<Opportunity[]> => {
  const { data, error } = await supabase.from('crm_opportunities').select('*');
  if (error) throw error;
  return data || [];
};

const EnhancedCrmManager = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: contacts = [], isLoading: contactsLoading } = useQuery({
    queryKey: ['contacts'],
    queryFn: fetchContacts,
  });

  const { data: leads = [], isLoading: leadsLoading } = useQuery({
    queryKey: ['leads'],
    queryFn: fetchLeads,
  });

  const { data: opportunities = [], isLoading: opportunitiesLoading } = useQuery({
    queryKey: ['opportunities'],
    queryFn: fetchOpportunities,
  });

  const addContactMutation = useMutation({
    mutationFn: async (contact: any) => {
      const { data, error } = await supabase.from('crm_contacts').insert([contact]);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast({ title: "Success", description: "Contact added successfully." });
      setIsDialogOpen(false);
      setFormData({});
    },
    onError: (error) => {
      toast({ title: "Error", description: "Failed to add contact.", variant: "destructive" });
    }
  });

  const updateContactMutation = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Contact> & { id: string }) => {
      const { data, error } = await supabase.from('crm_contacts').update(updates).eq('id', id);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast({ title: "Success", description: "Contact updated successfully." });
      setIsDialogOpen(false);
      setEditingItem(null);
      setFormData({});
    }
  });

  const deleteContactMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('crm_contacts').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast({ title: "Success", description: "Contact deleted successfully." });
    }
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const openDialog = (item: any = null, type: string = 'contact') => {
    setEditingItem(item);
    setFormData(item || { type });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (editingItem) {
      updateContactMutation.mutate({ ...formData, id: editingItem.id });
    } else {
      addContactMutation.mutate(formData);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      deleteContactMutation.mutate(id);
    }
  };

  const getDashboardStats = () => {
    const totalContacts = contacts.length;
    const totalLeads = leads.length;
    const totalOpportunities = opportunities.length;
    const totalValue = opportunities.reduce((sum, opp) => sum + (opp.value || 0), 0);
    const wonOpportunities = opportunities.filter(opp => opp.stage === 'closed_won').length;
    const conversionRate = totalOpportunities > 0 ? (wonOpportunities / totalOpportunities) * 100 : 0;

    return {
      totalContacts,
      totalLeads,
      totalOpportunities,
      totalValue,
      conversionRate: conversionRate.toFixed(1)
    };
  };

  const stats = getDashboardStats();

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Contacts</p>
                <p className="text-2xl font-bold">{stats.totalContacts}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Leads</p>
                <p className="text-2xl font-bold">{stats.totalLeads}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Opportunities</p>
                <p className="text-2xl font-bold">{stats.totalOpportunities}</p>
              </div>
              <Activity className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pipeline Value</p>
                <p className="text-2xl font-bold">${stats.totalValue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold">{stats.conversionRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Latest interactions and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 border rounded-lg">
              <Phone className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <p className="font-medium">Called John Smith</p>
                <p className="text-sm text-muted-foreground">Discussed project requirements - Follow up in 3 days</p>
              </div>
              <span className="text-sm text-muted-foreground">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-4 p-4 border rounded-lg">
              <Mail className="h-5 w-5 text-green-600" />
              <div className="flex-1">
                <p className="font-medium">Email sent to Tech Corp</p>
                <p className="text-sm text-muted-foreground">Proposal sent for logistics services</p>
              </div>
              <span className="text-sm text-muted-foreground">4 hours ago</span>
            </div>
            <div className="flex items-center space-x-4 p-4 border rounded-lg">
              <Calendar className="h-5 w-5 text-purple-600" />
              <div className="flex-1">
                <p className="font-medium">Meeting scheduled</p>
                <p className="text-sm text-muted-foreground">Product demo with Global Industries</p>
              </div>
              <span className="text-sm text-muted-foreground">6 hours ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContacts = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-[300px]"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="prospect">Prospect</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button onClick={() => openDialog()} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Contact</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts
              .filter(contact => 
                (filterStatus === 'all' || contact.status === filterStatus) &&
                (searchTerm === '' || 
                 contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 contact.email?.toLowerCase().includes(searchTerm.toLowerCase())
                )
              )
              .map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>{contact.company || '-'}</TableCell>
                  <TableCell>{contact.email || '-'}</TableCell>
                  <TableCell>{contact.phone || '-'}</TableCell>
                  <TableCell>
                    <Badge variant={
                      contact.status === 'active' ? 'default' :
                      contact.status === 'prospect' ? 'secondary' : 'outline'
                    }>
                      {contact.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {contact.last_contacted ? new Date(contact.last_contacted).toLocaleDateString() : 'Never'}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => openDialog(contact)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(contact.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Enhanced CRM</h2>
          <p className="text-muted-foreground">Comprehensive customer relationship management</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="deals">Deals</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          {renderDashboard()}
        </TabsContent>

        <TabsContent value="contacts">
          {renderContacts()}
        </TabsContent>

        <TabsContent value="leads">
          <div>Leads management - Coming soon</div>
        </TabsContent>

        <TabsContent value="opportunities">
          <div>Opportunities management - Coming soon</div>
        </TabsContent>

        <TabsContent value="deals">
          <div>Deals pipeline - Coming soon</div>
        </TabsContent>

        <TabsContent value="activities">
          <div>Activities tracking - Coming soon</div>
        </TabsContent>

        <TabsContent value="reports">
          <div>Reports and analytics - Coming soon</div>
        </TabsContent>
      </Tabs>

      {/* Dialog for Add/Edit Contact */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Edit Contact' : 'Add New Contact'}
            </DialogTitle>
            <DialogDescription>
              {editingItem ? 'Update contact information' : 'Add a new contact to your CRM'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={(formData as any).name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Contact name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="contact@example.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone || ''}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company || ''}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="Company name"
              />
            </div>
            <div>
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                value={formData.position || ''}
                onChange={(e) => handleInputChange('position', e.target.value)}
                placeholder="Job title"
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status || 'active'} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="prospect">Prospect</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address || ''}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Full address"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes || ''}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Additional notes..."
                rows={3}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {editingItem ? 'Update' : 'Add'} Contact
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnhancedCrmManager;