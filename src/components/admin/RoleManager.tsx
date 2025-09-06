import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Users, Shield, UserCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface UserRoleAssignment {
  id: string;
  user_id: string;
  role: string;
  assigned_by: string;
  assigned_at: string;
  is_active: boolean;
  notes?: string;
  profiles?: {
    full_name: string;
    avatar_url?: string;
  };
}

interface User {
  id: string;
  email: string;
  full_name?: string;
}

const RoleManager = () => {
  const [assignments, setAssignments] = useState<UserRoleAssignment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<UserRoleAssignment | null>(null);
  const [formData, setFormData] = useState({
    user_id: '',
    role: 'user',
    notes: ''
  });

  useEffect(() => {
    fetchRoleAssignments();
    fetchUsers();
  }, []);

  const fetchRoleAssignments = async () => {
    try {
      const { data, error } = await supabase
        .from('user_role_assignments')
        .select(`
          *
        `)
        .order('assigned_at', { ascending: false });

      if (error) throw error;
      setAssignments(data || []);
    } catch (error) {
      console.error('Error fetching role assignments:', error);
      toast.error('Failed to fetch role assignments');
    }
  };

  const fetchUsers = async () => {
    try {
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      if (authError) throw authError;
      
      const userEmails = authUsers.users.map(user => ({
        id: user.id,
        email: user.email || 'Unknown',
        full_name: user.user_metadata?.full_name || user.email || 'Unknown User'
      }));

      setUsers(userEmails || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAssignment = async () => {
    try {
      const currentUser = await supabase.auth.getUser();
      
      const assignmentData = {
        ...formData,
        assigned_by: currentUser.data.user?.id,
        is_active: true,
        role: formData.role as 'user' | 'admin'
      };

      if (editingAssignment) {
        const { error } = await supabase
          .from('user_role_assignments')
          .update(assignmentData)
          .eq('id', editingAssignment.id);
        
        if (error) throw error;
        toast.success('Role assignment updated successfully');
      } else {
        const { error } = await supabase
          .from('user_role_assignments')
          .insert([assignmentData]);
        
        if (error) throw error;
        toast.success('Role assigned successfully');
      }

      setIsDialogOpen(false);
      setEditingAssignment(null);
      resetForm();
      fetchRoleAssignments();
    } catch (error) {
      console.error('Error saving role assignment:', error);
      toast.error('Failed to save role assignment');
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('user_role_assignments')
        .update({ is_active: !currentStatus })
        .eq('id', id);
      
      if (error) throw error;
      toast.success(`Role ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
      fetchRoleAssignments();
    } catch (error) {
      console.error('Error updating role status:', error);
      toast.error('Failed to update role status');
    }
  };

  const handleDeleteAssignment = async (id: string) => {
    if (!confirm('Are you sure you want to delete this role assignment?')) return;

    try {
      const { error } = await supabase
        .from('user_role_assignments')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast.success('Role assignment deleted successfully');
      fetchRoleAssignments();
    } catch (error) {
      console.error('Error deleting role assignment:', error);
      toast.error('Failed to delete role assignment');
    }
  };

  const resetForm = () => {
    setFormData({
      user_id: '',
      role: 'user',
      notes: ''
    });
  };

  const openEditDialog = (assignment: UserRoleAssignment) => {
    setEditingAssignment(assignment);
    setFormData({
      user_id: assignment.user_id,
      role: assignment.role,
      notes: assignment.notes || ''
    });
    setIsDialogOpen(true);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'moderator': return 'bg-yellow-100 text-yellow-800';
      case 'user': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="p-6">Loading role assignments...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">User Role Manager</h1>
          <p className="text-muted-foreground">Manage user roles and permissions</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setEditingAssignment(null); }}>
              <Plus className="mr-2 h-4 w-4" />
              Assign Role
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingAssignment ? 'Edit Role Assignment' : 'Assign New Role'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="user_id">User</Label>
                <Select value={formData.user_id} onValueChange={(value) => setFormData(prev => ({ ...prev, user_id: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a user" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.full_name || 'Unknown User'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="moderator">Moderator</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Add any notes about this role assignment..."
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveAssignment}>
                {editingAssignment ? 'Update Assignment' : 'Assign Role'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Total Users</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="bg-red-100 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="font-medium">Admins</p>
                <p className="text-2xl font-bold">
                  {assignments.filter(a => a.role === 'admin' && a.is_active).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <UserCheck className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="font-medium">Moderators</p>
                <p className="text-2xl font-bold">
                  {assignments.filter(a => a.role === 'moderator' && a.is_active).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="bg-green-100 p-2 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Active Assignments</p>
                <p className="text-2xl font-bold">
                  {assignments.filter(a => a.is_active).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Role Assignments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Role Assignments</CardTitle>
          <CardDescription>Manage user roles and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned Date</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell>
                    <div className="font-medium">
                      {users.find(u => u.id === assignment.user_id)?.full_name || 'Unknown User'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(assignment.role)}>
                      {assignment.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={assignment.is_active ? "default" : "secondary"}>
                      {assignment.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(assignment.assigned_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate">
                      {assignment.notes || '-'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleStatus(assignment.id, assignment.is_active)}
                      >
                        {assignment.is_active ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(assignment)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteAssignment(assignment.id)}
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
};

export default RoleManager;