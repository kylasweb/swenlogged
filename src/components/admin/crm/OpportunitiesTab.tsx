
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

type OpportunityStage = 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';

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

const OpportunitiesTab = () => {
  const [opportunities, setOpportunities] = useLocalStorage<Opportunity[]>('crmOpportunities', []);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState<string>('all');
  const { toast } = useToast();

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

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStage === 'all' || opp.stage === filterStage;
    return matchesSearch && matchesFilter;
  });

  const getStageColor = (stage: OpportunityStage) => {
    switch (stage) {
      case 'closed_won': return 'default';
      case 'closed_lost': return 'destructive';
      case 'negotiation': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search opportunities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={filterStage} onValueChange={setFilterStage}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages</SelectItem>
              <SelectItem value="prospecting">Prospecting</SelectItem>
              <SelectItem value="qualification">Qualification</SelectItem>
              <SelectItem value="proposal">Proposal</SelectItem>
              <SelectItem value="negotiation">Negotiation</SelectItem>
              <SelectItem value="closed_won">Closed Won</SelectItem>
              <SelectItem value="closed_lost">Closed Lost</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => {
          setSelectedOpportunity(null);
          setIsDialogOpen(true);
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Opportunity
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Probability</TableHead>
                <TableHead>Close Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOpportunities.map((opportunity) => (
                <TableRow key={opportunity.id}>
                  <TableCell className="font-medium">{opportunity.name}</TableCell>
                  <TableCell>
                    <Badge variant={getStageColor(opportunity.stage)}>
                      {opportunity.stage.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>${opportunity.value.toLocaleString()}</TableCell>
                  <TableCell>{opportunity.probability}%</TableCell>
                  <TableCell>
                    {opportunity.close_date ? 
                      new Date(opportunity.close_date).toLocaleDateString() : 
                      'Not set'
                    }
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedOpportunity(opportunity);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteOpportunity(opportunity.id)}
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
              {selectedOpportunity ? 'Edit Opportunity' : 'Add New Opportunity'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const opportunityData = {
              name: formData.get('name') as string,
              contact_id: formData.get('contact_id') as string,
              stage: formData.get('stage') as OpportunityStage,
              value: Number(formData.get('value')),
              probability: Number(formData.get('probability')),
              close_date: formData.get('close_date') as string,
              description: formData.get('description') as string,
            };
            handleSaveOpportunity(opportunityData);
          }}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={selectedOpportunity?.name || ''}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_id">Contact</Label>
                <Input
                  id="contact_id"
                  name="contact_id"
                  defaultValue={selectedOpportunity?.contact_id || ''}
                  placeholder="Contact ID or Name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stage">Stage</Label>
                <Select name="stage" defaultValue={selectedOpportunity?.stage || 'prospecting'}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prospecting">Prospecting</SelectItem>
                    <SelectItem value="qualification">Qualification</SelectItem>
                    <SelectItem value="proposal">Proposal</SelectItem>
                    <SelectItem value="negotiation">Negotiation</SelectItem>
                    <SelectItem value="closed_won">Closed Won</SelectItem>
                    <SelectItem value="closed_lost">Closed Lost</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="value">Value *</Label>
                <Input
                  id="value"
                  name="value"
                  type="number"
                  defaultValue={selectedOpportunity?.value || 0}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="probability">Probability (%)</Label>
                <Input
                  id="probability"
                  name="probability"
                  type="number"
                  min="0"
                  max="100"
                  defaultValue={selectedOpportunity?.probability || 0}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="close_date">Expected Close Date</Label>
                <Input
                  id="close_date"
                  name="close_date"
                  type="date"
                  defaultValue={selectedOpportunity?.close_date || ''}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  defaultValue={selectedOpportunity?.description || ''}
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {selectedOpportunity ? 'Update' : 'Create'} Opportunity
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OpportunitiesTab;
