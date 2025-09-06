
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Database, Tables } from '@/integrations/supabase/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from 'date-fns';
import { useToast } from '../ui/use-toast';
import { Skeleton } from '../ui/skeleton';

type Contact = Tables<'crm_contacts'>;
type Lead = Tables<'crm_leads'>;
type Opportunity = Tables<'crm_opportunities'>;
type CrmTableName = 'crm_contacts' | 'crm_leads' | 'crm_opportunities';

type Item = Contact | Lead | Opportunity;

const fetchContacts = async (): Promise<Contact[]> => {
    const { data, error } = await supabase.from('crm_contacts').select('*').order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return data || [];
}

const fetchLeads = async (): Promise<Lead[]> => {
    const { data, error } = await supabase.from('crm_leads').select('*').order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return data || [];
}

const fetchOpportunities = async (): Promise<Opportunity[]> => {
    const { data, error } = await supabase.from('crm_opportunities').select('*').order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return data || [];
}

const CrmManager = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState('contacts');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Item | null>(null);
    const [formState, setFormState] = useState<any>({});
    
    const { data: contacts = [], isLoading: isLoadingContacts } = useQuery<Contact[]>({ queryKey: ['contacts'], queryFn: fetchContacts });
    const { data: leads = [], isLoading: isLoadingLeads } = useQuery<Lead[]>({ queryKey: ['leads'], queryFn: fetchLeads });
    const { data: opportunities = [], isLoading: isLoadingOpportunities } = useQuery<Opportunity[]>({ queryKey: ['opportunities'], queryFn: fetchOpportunities });

    const mutationOptions = (queryKey: string) => ({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKey] });
            closeDialog();
        },
        onError: (error: Error) => {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        }
    });

    const addMutation = useMutation({
        mutationFn: async ({ table, item }: { table: CrmTableName, item: any }) => {
            const { error } = await supabase.from(table).insert(item);
            if (error) throw error;
        },
        ...mutationOptions(activeTab)
    });

    const updateMutation = useMutation({
        mutationFn: async ({ table, id, item }: { table: CrmTableName, id: string, item: any }) => {
            const { error } = await supabase.from(table).update(item).eq('id', id);
            if (error) throw error;
        },
        ...mutationOptions(activeTab)
    });
    
    const deleteMutation = useMutation({
        mutationFn: async ({ table, id }: { table: CrmTableName, id: string }) => {
            const { error } = await supabase.from(table).delete().eq('id', id);
            if (error) throw error;
        },
        ...mutationOptions(activeTab)
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormState(prev => ({ ...prev, [name]: type === 'number' ? parseFloat(value) : value }));
    };

    const openDialog = (item: Item | null = null) => {
        setEditingItem(item);
        if (item) {
            setFormState(item);
        } else {
            switch(activeTab) {
                case 'leads': setFormState({ name: '', source: '', status: 'New', assignedTo: '', email: '' }); break;
                case 'opportunities': setFormState({ name: '', stage: 'Qualification', value: 0, closeDate: new Date().toISOString().split('T')[0], contactId: '' }); break;
                default: setFormState({ name: '', phone: '', status: 'New', tags: [] });
            }
        }
        setIsDialogOpen(true);
    };
  
    const closeDialog = () => {
        setIsDialogOpen(false);
        setEditingItem(null);
        setFormState({});
    };

    const handleSubmit = () => {
        const tableMap: { [key: string]: CrmTableName } = { contacts: 'crm_contacts', leads: 'crm_leads', opportunities: 'crm_opportunities' };
        const table = tableMap[activeTab];
        const { id, created_at, ...restOfForm } = formState;

        if (editingItem) {
            updateMutation.mutate({ table, id: editingItem.id, item: restOfForm });
            toast({ title: 'Success', description: `${activeTab.slice(0, -1)} updated.`});
        } else {
            const newItem = activeTab === 'contacts' ? { ...restOfForm, last_contacted: new Date().toISOString() } : restOfForm;
            addMutation.mutate({ table, item: newItem });
            toast({ title: 'Success', description: `New ${activeTab.slice(0, -1)} added.`});
        }
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            const tableMap: { [key: string]: CrmTableName } = { contacts: 'crm_contacts', leads: 'crm_leads', opportunities: 'crm_opportunities' };
            const table = tableMap[activeTab];
            deleteMutation.mutate({ table, id });
            toast({ title: 'Deleted', description: 'Item has been removed.', variant: 'destructive'});
        }
    };
    
    const renderFormFields = () => {
        switch(activeTab) {
          case 'leads':
            return (
              <>
                <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="name" className="text-right">Name</Label><Input id="name" name="name" value={formState.name || ''} onChange={handleInputChange} className="col-span-3" /></div>
                <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="email" className="text-right">Email</Label><Input id="email" name="email" value={formState.email || ''} onChange={handleInputChange} className="col-span-3" /></div>
                <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="source" className="text-right">Source</Label><Input id="source" name="source" value={formState.source || ''} onChange={handleInputChange} className="col-span-3" /></div>
                <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="status" className="text-right">Status</Label><Input id="status" name="status" value={formState.status || ''} onChange={handleInputChange} className="col-span-3" /></div>
                <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="assignedTo" className="text-right">Assigned To</Label><Input id="assignedTo" name="assignedTo" value={formState.assignedTo || ''} onChange={handleInputChange} className="col-span-3" /></div>
              </>
            );
          case 'opportunities':
            return (
              <>
                <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="name" className="text-right">Name</Label><Input id="name" name="name" value={formState.name || ''} onChange={handleInputChange} className="col-span-3" /></div>
                <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="stage" className="text-right">Stage</Label><Input id="stage" name="stage" value={formState.stage || ''} onChange={handleInputChange} className="col-span-3" /></div>
                <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="value" className="text-right">Value ($)</Label><Input id="value" name="value" type="number" value={formState.value || 0} onChange={handleInputChange} className="col-span-3" /></div>
                <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="closeDate" className="text-right">Close Date</Label><Input id="closeDate" name="closeDate" type="date" value={formState.closeDate ? format(new Date(formState.closeDate), 'yyyy-MM-dd') : ''} onChange={handleInputChange} className="col-span-3" /></div>
                <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="contactId" className="text-right">Contact ID</Label><Input id="contactId" name="contactId" value={formState.contactId || ''} onChange={handleInputChange} className="col-span-3" placeholder="Link to contact ID (e.g., c1)"/></div>
              </>
            );
          default: // contacts
            return (
              <>
                <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="name" className="text-right">Name</Label><Input id="name" name="name" value={formState.name || ''} onChange={handleInputChange} className="col-span-3" /></div>
                <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="phone" className="text-right">Phone</Label><Input id="phone" name="phone" value={formState.phone || ''} onChange={handleInputChange} className="col-span-3" /></div>
                <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="status" className="text-right">Status</Label><Input id="status" name="status" value={formState.status || ''} onChange={handleInputChange} className="col-span-3" /></div>
                <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="tags" className="text-right">Tags</Label><Input id="tags" name="tags" value={Array.isArray(formState.tags) ? formState.tags.join(', ') : ''} onChange={(e) => setFormState(prev => ({...prev, tags: e.target.value.split(',').map(t => t.trim())}))} className="col-span-3" placeholder="tag1, tag2" /></div>
              </>
            );
        }
    };
  
    const getDialogTitle = () => {
        const action = editingItem ? 'Edit' : 'Add New';
        switch(activeTab) {
          case 'leads': return `${action} Lead`;
          case 'opportunities': return `${action} Opportunity`;
          default: return `${action} Contact`;
        }
    }

    const renderLoadingSkeletons = (cols: number) => Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className={`grid grid-cols-1 md:grid-cols-${cols} p-4 border-b items-center gap-4`}>
            {Array.from({ length: cols }).map((_, j) => <Skeleton key={j} className="h-5 w-full" />)}
        </div>
    ));

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>CRM</CardTitle>
                    <Button onClick={() => openDialog()}><PlusCircle className="mr-2 h-4 w-4" /> Add New {activeTab.slice(0, -1)}</Button>
                </CardHeader>
                <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList>
                            <TabsTrigger value="contacts">Contacts</TabsTrigger>
                            <TabsTrigger value="leads">Leads</TabsTrigger>
                            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
                        </TabsList>
                        <TabsContent value="contacts">
                            <div className="border rounded-lg mt-4">
                                <div className="hidden md:grid md:grid-cols-6 p-4 font-bold border-b bg-gray-50">
                                    <div className="col-span-2">Name</div><div>Phone</div><div>Status</div><div>Last Contacted</div><div className="text-right">Actions</div>
                                </div>
                                {isLoadingContacts ? renderLoadingSkeletons(6) : contacts.map(contact => (
                                    <div key={contact.id} className="grid grid-cols-1 md:grid-cols-6 p-4 border-b items-center">
                                        <div className="col-span-2"><div className="font-medium">{contact.name}</div><div className="text-sm text-gray-500">{contact.tags?.join(', ')}</div></div>
                                        <div>{contact.phone}</div>
                                        <div>{contact.status}</div>
                                        <div>{contact.last_contacted ? format(new Date(contact.last_contacted), 'PP') : 'N/A'}</div>
                                        <div className="flex justify-start md:justify-end space-x-2 mt-2 md:mt-0">
                                            <Button variant="ghost" size="icon" onClick={() => openDialog(contact)}><Edit className="h-4 w-4" /></Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(contact.id)}><Trash2 className="h-4 w-4" /></Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="leads">
                            <div className="border rounded-lg mt-4">
                                <div className="hidden md:grid md:grid-cols-5 p-4 font-bold border-b bg-gray-50">
                                    <div>Name</div><div>Email</div><div>Source</div><div>Status</div><div className="text-right">Actions</div>
                                </div>
                                {isLoadingLeads ? renderLoadingSkeletons(5) : leads.map(lead => (
                                    <div key={lead.id} className="grid grid-cols-1 md:grid-cols-5 p-4 border-b items-center">
                                        <div className="font-medium">{lead.name}</div>
                                        <div>{lead.email}</div>
                                        <div>{lead.source}</div>
                                        <div>{lead.status}</div>
                                        <div className="flex justify-start md:justify-end space-x-2 mt-2 md:mt-0">
                                            <Button variant="ghost" size="icon" onClick={() => openDialog(lead)}><Edit className="h-4 w-4" /></Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(lead.id)}><Trash2 className="h-4 w-4" /></Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="opportunities">
                            <div className="border rounded-lg mt-4">
                                <div className="hidden md:grid md:grid-cols-5 p-4 font-bold border-b bg-gray-50">
                                    <div>Name</div><div>Stage</div><div>Value</div><div>Close Date</div><div className="text-right">Actions</div>
                                </div>
                                {isLoadingOpportunities ? renderLoadingSkeletons(5) : opportunities.map(opp => (
                                    <div key={opp.id} className="grid grid-cols-1 md:grid-cols-5 p-4 border-b items-center">
                                        <div className="font-medium">{opp.name}</div>
                                        <div>{opp.stage}</div>
                                        <div>${opp.value?.toLocaleString()}</div>
                                        <div>{opp.close_date ? format(new Date(opp.close_date), 'PP') : 'N/A'}</div>
                                        <div className="flex justify-start md:justify-end space-x-2 mt-2 md:mt-0">
                                            <Button variant="ghost" size="icon" onClick={() => openDialog(opp)}><Edit className="h-4 w-4" /></Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(opp.id)}><Trash2 className="h-4 w-4" /></Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{getDialogTitle()}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {renderFormFields()}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={closeDialog}>Cancel</Button>
                    <Button onClick={handleSubmit} disabled={addMutation.isPending || updateMutation.isPending}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CrmManager;
