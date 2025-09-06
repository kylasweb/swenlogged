import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { 
  Users, UserPlus, Briefcase, Calendar, DollarSign, Clock, 
  Award, TrendingUp, FileText, Edit, Trash2, Eye, Plus,
  Download, Upload, Filter, Search, Mail, Phone, MapPin
} from 'lucide-react';
import RoleManager from './RoleManager';

interface Employee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  position: string;
  department: string;
  manager?: string;
  hireDate: string;
  salary: number;
  status: 'active' | 'inactive' | 'terminated' | 'on_leave';
  address?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  skills: string[];
  performanceRating?: number;
  notes?: string;
  avatar?: string;
  created_at: string;
}

interface Department {
  id: string;
  name: string;
  description?: string;
  manager: string;
  budget: number;
  employeeCount: number;
}

interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'vacation' | 'sick' | 'personal' | 'maternity' | 'paternity' | 'other';
  startDate: string;
  endDate: string;
  days: number;
  reason?: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  requestDate: string;
}

interface Payroll {
  id: string;
  employeeId: string;
  employeeName: string;
  period: string;
  baseSalary: number;
  overtime: number;
  bonuses: number;
  deductions: number;
  totalPay: number;
  status: 'draft' | 'processed' | 'paid';
  payDate?: string;
}

const defaultEmployees: Employee[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@company.com',
    phone: '+1 (555) 123-4567',
    position: 'Senior Developer',
    department: 'Engineering',
    manager: 'Jane Wilson',
    hireDate: '2022-03-15',
    salary: 85000,
    status: 'active',
    skills: ['React', 'Node.js', 'TypeScript'],
    performanceRating: 4.5,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    employeeId: 'EMP002',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@company.com',
    phone: '+1 (555) 234-5678',
    position: 'Marketing Manager',
    department: 'Marketing',
    hireDate: '2021-08-20',
    salary: 75000,
    status: 'active',
    skills: ['Digital Marketing', 'SEO', 'Content Strategy'],
    performanceRating: 4.2,
    created_at: new Date().toISOString()
  }
];

const defaultDepartments: Department[] = [
  { id: '1', name: 'Engineering', description: 'Software development and technical operations', manager: 'Jane Wilson', budget: 500000, employeeCount: 12 },
  { id: '2', name: 'Marketing', description: 'Brand promotion and customer acquisition', manager: 'Mike Chen', budget: 200000, employeeCount: 8 },
  { id: '3', name: 'Sales', description: 'Revenue generation and customer relations', manager: 'Lisa Brown', budget: 150000, employeeCount: 6 },
  { id: '4', name: 'HR', description: 'Human resources and employee relations', manager: 'David Lee', budget: 100000, employeeCount: 4 }
];

const HrmManager = () => {
  const [employees, setEmployees] = useLocalStorage('employees', defaultEmployees);
  const [departments, setDepartments] = useLocalStorage('departments', defaultDepartments);
  const [leaveRequests, setLeaveRequests] = useLocalStorage('leaveRequests', []);
  const [payrollRecords, setPayrollRecords] = useLocalStorage('payrollRecords', []);
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const { toast } = useToast();

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const openDialog = (item: any = null, type: string = 'employee') => {
    setEditingItem(item);
    setFormData(item || { 
      id: Date.now().toString(),
      firstName: '',
      lastName: '',
      email: '',
      position: '',
      department: '',
      hireDate: '',
      salary: 0,
      status: 'active'
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (editingItem) {
      setEmployees(prev => prev.map(emp => emp.id === editingItem.id ? { ...formData } as Employee : emp));
      toast({ title: "Success", description: "Employee updated successfully." });
    } else {
      const newEmployee: Employee = {
        ...formData,
        id: Date.now().toString(),
        employeeId: `EMP${String(employees.length + 1).padStart(3, '0')}`,
        created_at: new Date().toISOString()
      };
      setEmployees(prev => [...prev, newEmployee]);
      toast({ title: "Success", description: "Employee added successfully." });
    }
    setIsDialogOpen(false);
    setEditingItem(null);
    setFormData({});
  };

  const handleDelete = (id: string, type: string = 'employee') => {
    if (confirm(`Are you sure you want to delete this ${type}?`)) {
      if (type === 'employee') {
        setEmployees(prev => prev.filter(emp => emp.id !== id));
      }
      toast({ title: "Success", description: `${type} deleted successfully.` });
    }
  };

  const getDashboardStats = () => {
    const totalEmployees = employees.length;
    const activeEmployees = employees.filter(emp => emp.status === 'active').length;
    const avgSalary = employees.reduce((sum, emp) => sum + emp.salary, 0) / totalEmployees;
    const totalPayroll = employees.reduce((sum, emp) => sum + emp.salary, 0);
    const pendingLeaves = leaveRequests.filter(req => req.status === 'pending').length;

    return {
      totalEmployees,
      activeEmployees,
      avgSalary: Math.round(avgSalary),
      totalPayroll,
      pendingLeaves
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
                <p className="text-sm font-medium text-muted-foreground">Total Employees</p>
                <p className="text-2xl font-bold">{stats.totalEmployees}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Employees</p>
                <p className="text-2xl font-bold">{stats.activeEmployees}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Salary</p>
                <p className="text-2xl font-bold">${stats.avgSalary.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Payroll</p>
                <p className="text-2xl font-bold">${Math.round(stats.totalPayroll/12).toLocaleString()}</p>
              </div>
              <Briefcase className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Leaves</p>
                <p className="text-2xl font-bold">{stats.pendingLeaves}</p>
              </div>
              <Calendar className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Department Overview</CardTitle>
          <CardDescription>Employee distribution by department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {departments.map((dept) => (
              <Card key={dept.id}>
                <CardContent className="p-4">
                  <h4 className="font-semibold">{dept.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{dept.description}</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Employees:</span>
                      <span className="font-medium">{dept.employeeCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Manager:</span>
                      <span className="font-medium">{dept.manager}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Budget:</span>
                      <span className="font-medium">${dept.budget.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent HR Activities</CardTitle>
          <CardDescription>Latest employee-related activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 border rounded-lg">
              <UserPlus className="h-5 w-5 text-green-600" />
              <div className="flex-1">
                <p className="font-medium">New Employee Onboarded</p>
                <p className="text-sm text-muted-foreground">John Smith joined the Engineering team</p>
              </div>
              <span className="text-sm text-muted-foreground">2 days ago</span>
            </div>
            <div className="flex items-center space-x-4 p-4 border rounded-lg">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <p className="font-medium">Leave Request Approved</p>
                <p className="text-sm text-muted-foreground">Sarah Johnson's vacation request for next week</p>
              </div>
              <span className="text-sm text-muted-foreground">3 days ago</span>
            </div>
            <div className="flex items-center space-x-4 p-4 border rounded-lg">
              <Award className="h-5 w-5 text-purple-600" />
              <div className="flex-1">
                <p className="font-medium">Performance Review Completed</p>
                <p className="text-sm text-muted-foreground">Q4 performance reviews for Marketing team</p>
              </div>
              <span className="text-sm text-muted-foreground">1 week ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderEmployees = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-[300px]"
            />
          </div>
          <Select value={filterDepartment} onValueChange={setFilterDepartment}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map(dept => (
                <SelectItem key={dept.id} value={dept.name}>{dept.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="on_leave">On Leave</SelectItem>
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
            Add Employee
          </Button>
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees
              .filter(employee => 
                (filterDepartment === 'all' || employee.department === filterDepartment) &&
                (filterStatus === 'all' || employee.status === filterStatus) &&
                (searchTerm === '' || 
                 `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
                )
              )
              .map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.employeeId}</TableCell>
                  <TableCell>{employee.firstName} {employee.lastName}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>
                    <Badge variant={
                      employee.status === 'active' ? 'default' :
                      employee.status === 'on_leave' ? 'secondary' : 'outline'
                    }>
                      {employee.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>${employee.salary.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => openDialog(employee)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(employee.id)}>
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
          <h2 className="text-2xl font-bold">Human Resource Management</h2>
          <p className="text-muted-foreground">Comprehensive employee management system</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="leaves">Leave Management</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="recruitment">Recruitment</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          {renderDashboard()}
        </TabsContent>

        <TabsContent value="employees">
          {renderEmployees()}
        </TabsContent>

        <TabsContent value="departments">
          <div>Department management - Coming soon</div>
        </TabsContent>

        <TabsContent value="leaves">
          <div>Leave management - Coming soon</div>
        </TabsContent>

        <TabsContent value="payroll">
          <div>Payroll management - Coming soon</div>
        </TabsContent>

        <TabsContent value="performance">
          <div>Performance management - Coming soon</div>
        </TabsContent>

        <TabsContent value="recruitment">
          <div>Recruitment management - Coming soon</div>
        </TabsContent>
      </Tabs>

      {/* Dialog for Add/Edit Employee */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Edit Employee' : 'Add New Employee'}
            </DialogTitle>
            <DialogDescription>
              {editingItem ? 'Update employee information' : 'Add a new employee to the system'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName || ''}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="First name"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName || ''}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Last name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="employee@company.com"
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
              <Label htmlFor="position">Position *</Label>
              <Input
                id="position"
                value={formData.position || ''}
                onChange={(e) => handleInputChange('position', e.target.value)}
                placeholder="Job title"
              />
            </div>
            <div>
              <Label htmlFor="department">Department *</Label>
              <Select value={formData.department || ''} onValueChange={(value) => handleInputChange('department', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(dept => (
                    <SelectItem key={dept.id} value={dept.name}>{dept.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="manager">Manager</Label>
              <Input
                id="manager"
                value={formData.manager || ''}
                onChange={(e) => handleInputChange('manager', e.target.value)}
                placeholder="Manager name"
              />
            </div>
            <div>
              <Label htmlFor="hireDate">Hire Date *</Label>
              <Input
                id="hireDate"
                type="date"
                value={formData.hireDate || ''}
                onChange={(e) => handleInputChange('hireDate', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="salary">Annual Salary *</Label>
              <Input
                id="salary"
                type="number"
                value={formData.salary || ''}
                onChange={(e) => handleInputChange('salary', parseInt(e.target.value))}
                placeholder="50000"
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
                  <SelectItem value="on_leave">On Leave</SelectItem>
                  <SelectItem value="terminated">Terminated</SelectItem>
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
              <Label htmlFor="skills">Skills (comma separated)</Label>
              <Input
                id="skills"
                value={formData.skills?.join(', ') || ''}
                onChange={(e) => handleInputChange('skills', e.target.value.split(', ').filter(s => s.trim()))}
                placeholder="React, Node.js, TypeScript"
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
              {editingItem ? 'Update' : 'Add'} Employee
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HrmManager;