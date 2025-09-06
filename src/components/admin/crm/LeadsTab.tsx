
import React, { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Search } from 'lucide-react';

type LeadSource = 'website' | 'referral' | 'cold_call' | 'advertisement' | 'social_media' | 'trade_show' | 'email_campaign' | 'other';
type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source: LeadSource;
  status: LeadStatus;
  assigned_to: string;
  lead_score: number;
  estimated_value?: number;
  notes?: string;
  created_at: string;
  last_activity?: string;
}

const LeadsTab = () => {
  const [leads, setLeads] = useLocalStorage<Lead[]>('crmLeads', []);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const { toast } = useToast();

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

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || lead.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
              <SelectItem value="converted">Converted</SelectItem>
              <SelectItem value="lost">Lost</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => {
          setSelectedLead(null);
          setIsDialogOpen(true);
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Lead
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
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.company || 'N/A'}</TableCell>
                  <TableCell>{lead.source}</TableCell>
                  <TableCell>
                    <Badge variant={lead.status === 'converted' ? 'default' : 'secondary'}>
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{lead.lead_score}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedLead(lead);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteLead(lead.id)}
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedLead ? 'Edit Lead' : 'Add New Lead'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const leadData = {
              name: formData.get('name') as string,
              email: formData.get('email') as string,
              phone: formData.get('phone') as string,
              company: formData.get('company') as string,
              source: formData.get('source') as LeadSource,
              status: formData.get('status') as LeadStatus,
              assigned_to: formData.get('assigned_to') as string,
              lead_score: Number(formData.get('lead_score')),
              estimated_value: Number(formData.get('estimated_value')) || undefined,
              notes: formData.get('notes') as string,
            };
            handleSaveLead(leadData);
          }}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={selectedLead?.name || ''}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={selectedLead?.email || ''}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  defaultValue={selectedLead?.phone || ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  defaultValue={selectedLead?.company || ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="source">Source</Label>
                <Select name="source" defaultValue={selectedLead?.source || 'website'}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                    <SelectItem value="cold_call">Cold Call</SelectItem>
                    <SelectItem value="advertisement">Advertisement</SelectItem>
                    <SelectItem value="social_media">Social Media</SelectItem>
                    <SelectItem value="trade_show">Trade Show</SelectItem>
                    <SelectItem value="email_campaign">Email Campaign</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select name="status" defaultValue={selectedLead?.status || 'new'}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                    <SelectItem value="converted">Converted</SelectItem>
                    <SelectItem value="lost">Lost</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="assigned_to">Assigned To</Label>
                <Input
                  id="assigned_to"
                  name="assigned_to"
                  defaultValue={selectedLead?.assigned_to || ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lead_score">Lead Score</Label>
                <Input
                  id="lead_score"
                  name="lead_score"
                  type="number"
                  min="0"
                  max="100"
                  defaultValue={selectedLead?.lead_score || 0}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estimated_value">Estimated Value</Label>
                <Input
                  id="estimated_value"
                  name="estimated_value"
                  type="number"
                  defaultValue={selectedLead?.estimated_value || ''}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Input
                  id="notes"
                  name="notes"
                  defaultValue={selectedLead?.notes || ''}
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {selectedLead ? 'Update' : 'Create'} Lead
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeadsTab;
