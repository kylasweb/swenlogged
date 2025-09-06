
import React, { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Users, DollarSign, Building } from 'lucide-react';

interface Department {
  id: string;
  name: string;
  description: string;
  manager: string;
  budget: number;
  employee_count: number;
  created_at: string;
  updated_at: string;
}

const DepartmentsTab = () => {
  const [departments, setDepartments] = useLocalStorage<Department[]>('hrmDepartments', []);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSaveDepartment = (departmentData: Partial<Department>) => {
    if (selectedDepartment) {
      setDepartments(prev => prev.map(dept => 
        dept.id === selectedDepartment.id 
          ? { ...dept, ...departmentData, updated_at: new Date().toISOString() }
          : dept
      ));
      toast({ title: "Department updated successfully!" });
    } else {
      const newDepartment: Department = {
        id: crypto.randomUUID(),
        name: '',
        description: '',
        manager: '',
        budget: 0,
        employee_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...departmentData
      };
      setDepartments(prev => [...prev, newDepartment]);
      toast({ title: "Department created successfully!" });
    }
    setIsDialogOpen(false);
    setSelectedDepartment(null);
  };

  const handleDeleteDepartment = (id: string) => {
    setDepartments(prev => prev.filter(dept => dept.id !== id));
    toast({ title: "Department deleted successfully!" });
  };

  return (
    <div className="space-y-6">
      {/* Department Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Departments</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {departments.reduce((sum, dept) => sum + dept.employee_count, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${departments.reduce((sum, dept) => sum + dept.budget, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Department Management</h3>
        <Button onClick={() => {
          setSelectedDepartment(null);
          setIsDialogOpen(true);
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Department
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.map((department) => (
                <TableRow key={department.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{department.name}</div>
                      <div className="text-sm text-muted-foreground">{department.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>{department.manager || 'No manager assigned'}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{department.employee_count}</Badge>
                  </TableCell>
                  <TableCell>${department.budget.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={department.employee_count > 0 ? 'default' : 'secondary'}>
                      {department.employee_count > 0 ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedDepartment(department);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteDepartment(department.id)}
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
              {selectedDepartment ? 'Edit Department' : 'Add New Department'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const departmentData = {
              name: formData.get('name') as string,
              description: formData.get('description') as string,
              manager: formData.get('manager') as string,
              budget: Number(formData.get('budget')),
              employee_count: Number(formData.get('employee_count')),
            };
            handleSaveDepartment(departmentData);
          }}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="name">Department Name *</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={selectedDepartment?.name || ''}
                  required
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={selectedDepartment?.description || ''}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="manager">Department Manager</Label>
                <Input
                  id="manager"
                  name="manager"
                  defaultValue={selectedDepartment?.manager || ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Annual Budget</Label>
                <Input
                  id="budget"
                  name="budget"
                  type="number"
                  defaultValue={selectedDepartment?.budget || 0}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employee_count">Number of Employees</Label>
                <Input
                  id="employee_count"
                  name="employee_count"
                  type="number"
                  defaultValue={selectedDepartment?.employee_count || 0}
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {selectedDepartment ? 'Update' : 'Create'} Department
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DepartmentsTab;
