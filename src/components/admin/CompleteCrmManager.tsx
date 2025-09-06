import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, Plus, Edit, Trash2, Search, Filter, Mail, Phone, MapPin, 
  Calendar, DollarSign, Tag, Clock, Eye, Download, Upload, Briefcase,
  TrendingUp, TrendingDown, BarChart3, PieChart
} from 'lucide-react';
import CRMActivitiesManager from './CRMActivitiesManager';
import CRMReportsManager from './CRMReportsManager';
import LeadsTab from './crm/LeadsTab';
import OpportunitiesTab from './crm/OpportunitiesTab';

type ContactStatus = 'active' | 'inactive' | 'prospect' | 'customer' | 'lead';
type LeadSource = 'website' | 'referral' | 'cold_call' | 'advertisement' | 'social_media' | 'trade_show' | 'email_campaign' | 'other';
type OpportunityStage = 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  address: string;
  status: ContactStatus;
  tags: string[];
  notes: string;
  last_contacted: string;
  created_at: string;
  updated_at: string;
  social_links?: {
    linkedin?: string;
    twitter?: string;
  };
  custom_fields?: Record<string, any>;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source: LeadSource;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  assigned_to: string;
  lead_score: number;
  estimated_value?: number;
  notes?: string;
  created_at: string;
  last_activity?: string;
}

interface Opportunity {
  id: string;
  name: string;
  contact_id: string;
  stage: OpportunityStage;
  value: number;
  probability: number;
  close_date: string;
  description?: string;
  products?: string[];
  competitors?: string[];
  created_at: string;
  updated_at: string;
}

interface Activity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'task' | 'note';
  contact_id?: string;
  lead_id?: string;
  opportunity_id?: string;
  subject: string;
  description: string;
  completed: boolean;
  due_date?: string;
  created_at: string;
  created_by: string;
}

interface CRMStats {
  totalContacts: number;
  totalLeads: number;
  totalOpportunities: number;
  totalRevenue: number;
  conversionRate: number;
  avgDealSize: number;
  activeDeals: number;
  monthlyGrowth: number;
}

const CompleteCrmManager = () => {
  const [contacts, setContacts] = useLocalStorage<Contact[]>('crmContacts', []);
  const [leads, setLeads] = useLocalStorage<Lead[]>('crmLeads', []);
  const [opportunities, setOpportunities] = useLocalStorage<Opportunity[]>('crmOpportunities', []);
  const [activities, setActivities] = useLocalStorage<Activity[]>('crmActivities', []);
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  const { toast } = useToast();

  // Calculate CRM statistics
  const calculateStats = (): CRMStats => {
    const totalContacts = contacts.length;
    const totalLeads = leads.length;
    const totalOpportunities = opportunities.length;
    const totalRevenue = opportunities
      .filter(opp => opp.stage === 'closed_won')
      .reduce((sum, opp) => sum + opp.value, 0);
    
    const convertedLeads = leads.filter(lead => lead.status === 'converted').length;
    const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;
    
    const closedDeals = opportunities.filter(opp => opp.stage === 'closed_won');
    const avgDealSize = closedDeals.length > 0 ? totalRevenue / closedDeals.length : 0;
    
    const activeDeals = opportunities.filter(opp => 
      !['closed_won', 'closed_lost'].includes(opp.stage)
    ).length;
    
    // Mock monthly growth calculation
    const monthlyGrowth = 12.5;

    return {
      totalContacts,
      totalLeads,
      totalOpportunities,
      totalRevenue,
      conversionRate,
      avgDealSize,
      activeDeals,
      monthlyGrowth
    };
  };

  const stats = calculateStats();

  // CRUD Operations for Contacts
  const handleSaveContact = (contactData: Partial<Contact>) => {
    if (selectedContact) {
      setContacts(prev => prev.map(contact => 
        contact.id === selectedContact.id 
          ? { ...contact, ...contactData, updated_at: new Date().toISOString() }
          : contact
      ));
      toast({ title: "Contact updated successfully!" });
    } else {
      const newContact: Contact = {
        id: crypto.randomUUID(),
        name: '',
        email: '',
        phone: '',
        company: '',
        position: '',
        address: '',
        status: 'prospect',
        tags: [],
        notes: '',
        last_contacted: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...contactData
      };
      setContacts(prev => [...prev, newContact]);
      toast({ title: "Contact created successfully!" });
    }
    setIsDialogOpen(false);
    setSelectedContact(null);
  };

  const handleDeleteContact = (id: string) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
    toast({ title: "Contact deleted successfully!" });
  };

  // CRUD Operations for Leads
  const handleSaveLead = (leadData: Partial<Lead>) => {
    if (selectedLead) {
      setLeads(prev => prev.map(lead => 
        lead.id === selectedLead.id 
          ? { ...lead, ...leadData, last_activity: new Date().toISOString() }
          : lead
      ));
      toast({ title: "Lead updated successfully!" });
    } else {
      const newLead: Lead = {
        id: crypto.randomUUID(),
        name: '',
        email: '',
        source: 'website',
        status: 'new',
        assigned_to: 'unassigned',
        lead_score: 0,
        created_at: new Date().toISOString(),
        ...leadData
      };
      setLeads(prev => [...prev, newLead]);
      toast({ title: "Lead created successfully!" });
    }
    setIsDialogOpen(false);
    setSelectedLead(null);
  };

  const handleDeleteLead = (id: string) => {
    setLeads(prev => prev.filter(lead => lead.id !== id));
    toast({ title: "Lead deleted successfully!" });
  };

  // CRUD Operations for Opportunities
  const handleSaveOpportunity = (opportunityData: Partial<Opportunity>) => {
    if (selectedOpportunity) {
      setOpportunities(prev => prev.map(opp => 
        opp.id === selectedOpportunity.id 
          ? { ...opp, ...opportunityData, updated_at: new Date().toISOString() }
          : opp
      ));
      toast({ title: "Opportunity updated successfully!" });
    } else {
      const newOpportunity: Opportunity = {
        id: crypto.randomUUID(),
        name: '',
        contact_id: '',
        stage: 'prospecting',
        value: 0,
        probability: 0,
        close_date: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...opportunityData
      };
      setOpportunities(prev => [...prev, newOpportunity]);
      toast({ title: "Opportunity created successfully!" });
    }
    setIsDialogOpen(false);
    setSelectedOpportunity(null);
  };

  const handleDeleteOpportunity = (id: string) => {
    setOpportunities(prev => prev.filter(opp => opp.id !== id));
    toast({ title: "Opportunity deleted successfully!" });
  };

  // Filtered data
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || contact.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || lead.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalContacts}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.monthlyGrowth}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Leads</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLeads}</div>
            <p className="text-xs text-muted-foreground">
              {stats.conversionRate.toFixed(1)}% conversion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeDeals} active deals
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Deal Size</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.avgDealSize.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalOpportunities} total opportunities
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.slice(0, 5).map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.subject}</p>
                  <p className="text-xs text-muted-foreground">{activity.description}</p>
                </div>
                <Badge variant={activity.completed ? "default" : "secondary"}>
                  {activity.completed ? "Completed" : "Pending"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContacts = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <Input
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="prospect">Prospect</SelectItem>
              <SelectItem value="customer">Customer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => {
          setSelectedContact(null);
          setIsDialogOpen(true);
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Contact
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.company}</TableCell>
                  <TableCell>
                    <Badge variant={contact.status === 'active' ? 'default' : 'secondary'}>
                      {contact.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {contact.last_contacted ? 
                      new Date(contact.last_contacted).toLocaleDateString() : 
                      'Never'
                    }
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedContact(contact);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteContact(contact.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  // Component wrappers for tabs
  const CRMActivitiesManagerContent = () => <CRMActivitiesManager />;
  const CRMReportsManagerContent = () => <CRMReportsManager />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Complete CRM System</h2>
          <p className="text-muted-foreground">Manage your customer relationships and sales pipeline</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
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
          <LeadsTab />
        </TabsContent>

        <TabsContent value="opportunities">
          <OpportunitiesTab />
        </TabsContent>

        <TabsContent value="activities">
          <CRMActivitiesManagerContent />
        </TabsContent>

        <TabsContent value="reports">
          <CRMReportsManagerContent />
        </TabsContent>
      </Tabs>

      {/* Contact Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedContact ? 'Edit Contact' : 'Add New Contact'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const contactData = {
              name: formData.get('name') as string,
              email: formData.get('email') as string,
              phone: formData.get('phone') as string,
              company: formData.get('company') as string,
              position: formData.get('position') as string,
              address: formData.get('address') as string,
              status: formData.get('status') as ContactStatus,
              notes: formData.get('notes') as string,
            };
            handleSaveContact(contactData);
          }}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={selectedContact?.name || ''}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={selectedContact?.email || ''}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  defaultValue={selectedContact?.phone || ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  defaultValue={selectedContact?.company || ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  name="position"
                  defaultValue={selectedContact?.position || ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select name="status" defaultValue={selectedContact?.status || 'prospect'}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="prospect">Prospect</SelectItem>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="lead">Lead</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  defaultValue={selectedContact?.address || ''}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  defaultValue={selectedContact?.notes || ''}
                  rows={3}
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {selectedContact ? 'Update' : 'Create'} Contact
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompleteCrmManager;
