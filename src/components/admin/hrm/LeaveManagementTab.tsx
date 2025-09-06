
import React, { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';

type LeaveType = 'vacation' | 'sick' | 'personal' | 'maternity' | 'paternity' | 'other';
type LeaveStatus = 'pending' | 'approved' | 'rejected';

interface LeaveRequest {
  id: string;
  employee_id: string;
  employee_name: string;
  type: LeaveType;
  start_date: string;
  end_date: string;
  days_requested: number;
  reason: string;
  status: LeaveStatus;
  approved_by?: string;
  approved_at?: string;
  created_at: string;
  updated_at: string;
}

const LeaveManagementTab = () => {
  const [leaveRequests, setLeaveRequests] = useLocalStorage<LeaveRequest[]>('hrmLeaveRequests', []);
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const { toast } = useToast();

  const handleSaveLeaveRequest = (requestData: Partial<LeaveRequest>) => {
    if (selectedRequest) {
      setLeaveRequests(prev => prev.map(req => 
        req.id === selectedRequest.id 
          ? { ...req, ...requestData, updated_at: new Date().toISOString() }
          : req
      ));
      toast({ title: "Leave request updated successfully!" });
    } else {
      const newRequest: LeaveRequest = {
        id: crypto.randomUUID(),
        employee_id: '',
        employee_name: '',
        type: 'vacation',
        start_date: '',
        end_date: '',
        days_requested: 1,
        reason: '',
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...requestData
      };
      setLeaveRequests(prev => [...prev, newRequest]);
      toast({ title: "Leave request created successfully!" });
    }
    setIsDialogOpen(false);
    setSelectedRequest(null);
  };

  const handleDeleteLeaveRequest = (id: string) => {
    setLeaveRequests(prev => prev.filter(req => req.id !== id));
    toast({ title: "Leave request deleted successfully!" });
  };

  const handleApproveReject = (id: string, status: 'approved' | 'rejected') => {
    setLeaveRequests(prev => prev.map(req => 
      req.id === id 
        ? { 
            ...req, 
            status,
            approved_by: 'Admin',
            approved_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        : req
    ));
    toast({ title: `Leave request ${status} successfully!` });
  };

  const filteredRequests = leaveRequests.filter(req => 
    filterStatus === 'all' || req.status === filterStatus
  );

  const getStatusColor = (status: LeaveStatus) => {
    switch (status) {
      case 'approved': return 'default';
      case 'rejected': return 'destructive';
      default: return 'secondary';
    }
  };

  const pendingCount = leaveRequests.filter(req => req.status === 'pending').length;
  const approvedCount = leaveRequests.filter(req => req.status === 'approved').length;
  const totalDays = leaveRequests
    .filter(req => req.status === 'approved')
    .reduce((sum, req) => sum + req.days_requested, 0);

  return (
    <div className="space-y-6">
      {/* Leave Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Requests</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leave Days</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDays}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leaveRequests.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <h3 className="text-lg font-semibold">Leave Requests</h3>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => {
          setSelectedRequest(null);
          setIsDialogOpen(true);
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Leave Request
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Leave Type</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.employee_name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{request.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{new Date(request.start_date).toLocaleDateString()}</div>
                      <div className="text-muted-foreground">
                        to {new Date(request.end_date).toLocaleDateString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{request.days_requested}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(request.status)}>
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-32 truncate">{request.reason}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {request.status === 'pending' && (
                        <>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleApproveReject(request.id, 'approved')}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleApproveReject(request.id, 'rejected')}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedRequest(request);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteLeaveRequest(request.id)}
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
              {selectedRequest ? 'Edit Leave Request' : 'Add New Leave Request'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const requestData = {
              employee_id: formData.get('employee_id') as string,
              employee_name: formData.get('employee_name') as string,
              type: formData.get('type') as LeaveType,
              start_date: formData.get('start_date') as string,
              end_date: formData.get('end_date') as string,
              days_requested: Number(formData.get('days_requested')),
              reason: formData.get('reason') as string,
              status: formData.get('status') as LeaveStatus,
            };
            handleSaveLeaveRequest(requestData);
          }}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employee_name">Employee Name *</Label>
                <Input
                  id="employee_name"
                  name="employee_name"
                  defaultValue={selectedRequest?.employee_name || ''}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employee_id">Employee ID</Label>
                <Input
                  id="employee_id"
                  name="employee_id"
                  defaultValue={selectedRequest?.employee_id || ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Leave Type</Label>
                <Select name="type" defaultValue={selectedRequest?.type || 'vacation'}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vacation">Vacation</SelectItem>
                    <SelectItem value="sick">Sick Leave</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="maternity">Maternity</SelectItem>
                    <SelectItem value="paternity">Paternity</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select name="status" defaultValue={selectedRequest?.status || 'pending'}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="start_date">Start Date</Label>
                <Input
                  id="start_date"
                  name="start_date"
                  type="date"
                  defaultValue={selectedRequest?.start_date || ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end_date">End Date</Label>
                <Input
                  id="end_date"
                  name="end_date"
                  type="date"
                  defaultValue={selectedRequest?.end_date || ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="days_requested">Days Requested</Label>
                <Input
                  id="days_requested"
                  name="days_requested"
                  type="number"
                  defaultValue={selectedRequest?.days_requested || 1}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="reason">Reason</Label>
                <Textarea
                  id="reason"
                  name="reason"
                  defaultValue={selectedRequest?.reason || ''}
                  rows={3}
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {selectedRequest ? 'Update' : 'Create'} Leave Request
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeaveManagementTab;
