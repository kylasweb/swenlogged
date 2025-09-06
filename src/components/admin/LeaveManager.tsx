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
import { Plus, Edit, Calendar, CheckCircle, XCircle } from 'lucide-react';

interface LeaveRequest {
  id: string;
  employee_id: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  days_requested: number;
  reason?: string;
  status: string;
  approved_by?: string;
  approved_at?: string;
  created_at: string;
}

const LeaveManager = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editingLeave, setEditingLeave] = useState<LeaveRequest | null>(null);
  const [formData, setFormData] = useState({
    leave_type: '',
    start_date: '',
    end_date: '',
    reason: ''
  });
  const { toast } = useToast();

  const leaveTypes = ['Annual', 'Sick', 'Maternity', 'Paternity', 'Personal', 'Emergency'];
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('leave_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeaveRequests(data || []);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
      toast({
        title: "Error",
        description: "Failed to fetch leave requests",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const daysRequested = calculateDays(formData.start_date, formData.end_date);
      
      const leaveData = {
        employee_id: '00000000-0000-0000-0000-000000000000', // Placeholder - should be current user
        leave_type: formData.leave_type,
        start_date: formData.start_date,
        end_date: formData.end_date,
        days_requested: daysRequested,
        reason: formData.reason || null,
        status: 'pending'
      };

      if (editingLeave) {
        const { error } = await supabase
          .from('leave_requests')
          .update(leaveData)
          .eq('id', editingLeave.id);

        if (error) throw error;
        toast({
          title: "Success!",
          description: "Leave request updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('leave_requests')
          .insert([leaveData]);

        if (error) throw error;
        toast({
          title: "Success!",
          description: "Leave request submitted successfully",
        });
      }

      setShowDialog(false);
      setEditingLeave(null);
      setFormData({ leave_type: '', start_date: '', end_date: '', reason: '' });
      fetchLeaveRequests();
    } catch (error) {
      console.error('Error saving leave request:', error);
      toast({
        title: "Error",
        description: "Failed to save leave request",
        variant: "destructive",
      });
    }
  };

  const handleStatusUpdate = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const updateData: any = { status };
      if (status === 'approved') {
        updateData.approved_at = new Date().toISOString();
        updateData.approved_by = '00000000-0000-0000-0000-000000000000'; // Should be current admin user
      }

      const { error } = await supabase
        .from('leave_requests')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success!",
        description: `Leave request ${status} successfully`,
      });
      fetchLeaveRequests();
    } catch (error) {
      console.error('Error updating leave status:', error);
      toast({
        title: "Error",
        description: "Failed to update leave status",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (leave: LeaveRequest) => {
    setEditingLeave(leave);
    setFormData({
      leave_type: leave.leave_type,
      start_date: leave.start_date,
      end_date: leave.end_date,
      reason: leave.reason || '',
    });
    setShowDialog(true);
  };

  const handleAddNew = () => {
    setEditingLeave(null);
    setFormData({ leave_type: '', start_date: '', end_date: '', reason: '' });
    setShowDialog(true);
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading leave requests...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Calendar className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Leave Management</h2>
        </div>
        <Button onClick={handleAddNew} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Request Leave
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Leave Type</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Days</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaveRequests.map((leave) => (
              <TableRow key={leave.id}>
                <TableCell>Employee {leave.employee_id.substring(0, 8)}</TableCell>
                <TableCell>{leave.leave_type}</TableCell>
                <TableCell>{new Date(leave.start_date).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(leave.end_date).toLocaleDateString()}</TableCell>
                <TableCell>{leave.days_requested}</TableCell>
                <TableCell>
                  <Badge className={statusColors[leave.status as keyof typeof statusColors]}>
                    {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{leave.reason || 'No reason provided'}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {leave.status === 'pending' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusUpdate(leave.id, 'approved')}
                          className="text-green-600 hover:text-green-700"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusUpdate(leave.id, 'rejected')}
                          className="text-red-600 hover:text-red-700"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(leave)}
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingLeave ? 'Edit Leave Request' : 'New Leave Request'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="leave_type">Leave Type</Label>
              <Select value={formData.leave_type} onValueChange={(value) => setFormData(prev => ({ ...prev, leave_type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select leave type" />
                </SelectTrigger>
                <SelectContent>
                  {leaveTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start_date">Start Date</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="end_date">End Date</Label>
                <Input
                  id="end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="reason">Reason</Label>
              <Textarea
                id="reason"
                value={formData.reason}
                onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                rows={3}
                placeholder="Optional reason for leave"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingLeave ? 'Update' : 'Submit'} Request
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeaveManager;