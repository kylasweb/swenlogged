import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, CheckCircle, Clock, Activity } from 'lucide-react';

interface CRMActivity {
  id: string;
  contact_id?: string;
  lead_id?: string;
  opportunity_id?: string;
  activity_type: string;
  subject: string;
  description?: string;
  due_date?: string;
  completed_at?: string;
  assigned_to?: string;
  priority: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const CRMActivitiesManager = () => {
  const [activities, setActivities] = useState<CRMActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editingActivity, setEditingActivity] = useState<CRMActivity | null>(null);
  const [formData, setFormData] = useState({
    activity_type: '',
    subject: '',
    description: '',
    due_date: '',
    priority: 'medium',
    status: 'pending',
    contact_id: '',
    lead_id: '',
    opportunity_id: ''
  });
  const { toast } = useToast();

  const activityTypes = ['Call', 'Email', 'Meeting', 'Task', 'Follow-up', 'Demo', 'Proposal'];
  const priorities = ['low', 'medium', 'high', 'urgent'];
  const statuses = ['pending', 'in_progress', 'completed', 'cancelled'];

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  const priorityColors = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-blue-100 text-blue-800',
    high: 'bg-orange-100 text-orange-800',
    urgent: 'bg-red-100 text-red-800'
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const { data, error } = await supabase
        .from('crm_activities')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Error fetching activities:', error);
      toast({
        title: "Error",
        description: "Failed to fetch activities",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const activityData = {
        activity_type: formData.activity_type,
        subject: formData.subject,
        description: formData.description || null,
        due_date: formData.due_date || null,
        priority: formData.priority,
        status: formData.status,
        contact_id: formData.contact_id || null,
        lead_id: formData.lead_id || null,
        opportunity_id: formData.opportunity_id || null,
        assigned_to: '00000000-0000-0000-0000-000000000000' // Should be current user
      };

      if (editingActivity) {
        const { error } = await supabase
          .from('crm_activities')
          .update(activityData)
          .eq('id', editingActivity.id);

        if (error) throw error;
        toast({
          title: "Success!",
          description: "Activity updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('crm_activities')
          .insert([activityData]);

        if (error) throw error;
        toast({
          title: "Success!",
          description: "Activity created successfully",
        });
      }

      setShowDialog(false);
      setEditingActivity(null);
      setFormData({
        activity_type: '',
        subject: '',
        description: '',
        due_date: '',
        priority: 'medium',
        status: 'pending',
        contact_id: '',
        lead_id: '',
        opportunity_id: ''
      });
      fetchActivities();
    } catch (error) {
      console.error('Error saving activity:', error);
      toast({
        title: "Error",
        description: "Failed to save activity",
        variant: "destructive",
      });
    }
  };

  const handleComplete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('crm_activities')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success!",
        description: "Activity marked as completed",
      });
      fetchActivities();
    } catch (error) {
      console.error('Error completing activity:', error);
      toast({
        title: "Error",
        description: "Failed to complete activity",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (activity: CRMActivity) => {
    setEditingActivity(activity);
    setFormData({
      activity_type: activity.activity_type,
      subject: activity.subject,
      description: activity.description || '',
      due_date: activity.due_date ? activity.due_date.split('T')[0] : '',
      priority: activity.priority,
      status: activity.status,
      contact_id: activity.contact_id || '',
      lead_id: activity.lead_id || '',
      opportunity_id: activity.opportunity_id || ''
    });
    setShowDialog(true);
  };

  const handleAddNew = () => {
    setEditingActivity(null);
    setFormData({
      activity_type: '',
      subject: '',
      description: '',
      due_date: '',
      priority: 'medium',
      status: 'pending',
      contact_id: '',
      lead_id: '',
      opportunity_id: ''
    });
    setShowDialog(true);
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading activities...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6" />
          <h2 className="text-2xl font-bold">CRM Activities</h2>
        </div>
        <Button onClick={handleAddNew} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Activity
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Related To</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell className="font-medium">{activity.activity_type}</TableCell>
                <TableCell>{activity.subject}</TableCell>
                <TableCell>
                  {activity.due_date ? new Date(activity.due_date).toLocaleDateString() : 'No due date'}
                </TableCell>
                <TableCell>
                  <Badge className={priorityColors[activity.priority as keyof typeof priorityColors]}>
                    {activity.priority.charAt(0).toUpperCase() + activity.priority.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={statusColors[activity.status as keyof typeof statusColors]}>
                    {activity.status.replace('_', ' ').charAt(0).toUpperCase() + activity.status.replace('_', ' ').slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  {activity.contact_id && <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Contact</span>}
                  {activity.lead_id && <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Lead</span>}
                  {activity.opportunity_id && <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">Opportunity</span>}
                  {!activity.contact_id && !activity.lead_id && !activity.opportunity_id && (
                    <span className="text-sm text-gray-500">No relation</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {activity.status !== 'completed' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleComplete(activity.id)}
                        className="text-green-600 hover:text-green-700"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(activity)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingActivity ? 'Edit Activity' : 'New Activity'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="activity_type">Activity Type</Label>
                <Select value={formData.activity_type} onValueChange={(value) => setFormData(prev => ({ ...prev, activity_type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {activityTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="due_date">Due Date</Label>
                <Input
                  id="due_date"
                  type="date"
                  value={formData.due_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, due_date: e.target.value }))}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                required
                placeholder="Activity subject"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                placeholder="Activity details"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="contact_id">Contact ID (optional)</Label>
                <Input
                  id="contact_id"
                  value={formData.contact_id}
                  onChange={(e) => setFormData(prev => ({ ...prev, contact_id: e.target.value }))}
                  placeholder="Contact UUID"
                />
              </div>

              <div>
                <Label htmlFor="lead_id">Lead ID (optional)</Label>
                <Input
                  id="lead_id"
                  value={formData.lead_id}
                  onChange={(e) => setFormData(prev => ({ ...prev, lead_id: e.target.value }))}
                  placeholder="Lead UUID"
                />
              </div>

              <div>
                <Label htmlFor="opportunity_id">Opportunity ID (optional)</Label>
                <Input
                  id="opportunity_id"
                  value={formData.opportunity_id}
                  onChange={(e) => setFormData(prev => ({ ...prev, opportunity_id: e.target.value }))}
                  placeholder="Opportunity UUID"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingActivity ? 'Update' : 'Create'} Activity
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CRMActivitiesManager;