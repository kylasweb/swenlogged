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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, Plus, Edit, Trash2, Search, Filter, Mail, Phone, MapPin, 
  Calendar, DollarSign, Clock, Eye, Download, Upload, Briefcase,
  UserCheck, UserX, Award, TrendingUp, Building, GraduationCap
} from 'lucide-react';
import DepartmentManager from './DepartmentManager';
import LeaveManager from './LeaveManager';
import PerformanceManager from './PerformanceManager';
import HRReportsManager from './HRReportsManager';
import RoleManager from './RoleManager';
import DepartmentsTab from './hrm/DepartmentsTab';
import LeaveManagementTab from './hrm/LeaveManagementTab';
import PerformanceTab from './hrm/PerformanceTab';

type EmployeeStatus = 'active' | 'inactive' | 'on_leave' | 'terminated' | 'probation';
type EmployeeType = 'full_time' | 'part_time' | 'contract' | 'intern' | 'consultant';

interface Employee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  manager: string;
  hireDate: string;
  salary: number;
  status: EmployeeStatus;
  type: EmployeeType;
  address: string;
  skills: string[];
  notes: string;
  emergency_contact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  created_at: string;
  updated_at: string;
}

interface Department {
  id: string;
  name: string;
  description: string;
  manager: string;
  budget: number;
  employee_count: number;
}

interface LeaveRequest {
  id: string;
  employee_id: string;
  type: 'vacation' | 'sick' | 'personal' | 'maternity' | 'paternity' | 'other';
  start_date: string;
  end_date: string;
  days_requested: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approved_by?: string;
  created_at: string;
}

interface Performance {
  id: string;
  employee_id: string;
  review_period: string;
  overall_rating: number; // 1-5
  goals: string[];
  achievements: string[];
  areas_for_improvement: string[];
  reviewer: string;
  review_date: string;
}

interface HRStats {
  totalEmployees: number;
  activeEmployees: number;
  newHires: number;
  pendingLeaveRequests: number;
  departmentCount: number;
  averageSalary: number;
  turnoverRate: number;
  employeeSatisfaction: number;
}

const CompleteHrmManager = () => {
  const [employees, setEmployees] = useLocalStorage<Employee[]>('hrmEmployees', []);
  const [departments, setDepartments] = useLocalStorage<Department[]>('hrmDepartments', []);
  const [leaveRequests, setLeaveRequests] = useLocalStorage<LeaveRequest[]>('hrmLeaveRequests', []);
  const [performance, setPerformance] = useLocalStorage<Performance[]>('hrmPerformance', []);
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'employee' | 'department' | 'leave'>('employee');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  
  const { toast } = useToast();

  // Generate employee ID
  const generateEmployeeId = () => {
    const prefix = 'EMP';
    const nextNumber = employees.length + 1;
    return `${prefix}${nextNumber.toString().padStart(4, '0')}`;
  };

  // Calculate HR statistics
  const calculateStats = (): HRStats => {
    const totalEmployees = employees.length;
    const activeEmployees = employees.filter(emp => emp.status === 'active').length;
    const newHires = employees.filter(emp => {
      const hireDate = new Date(emp.hireDate);
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return hireDate >= monthAgo;
    }).length;
    
    const pendingLeaveRequests = leaveRequests.filter(req => req.status === 'pending').length;
    const departmentCount = departments.length;
    
    const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
    const averageSalary = totalEmployees > 0 ? totalSalary / totalEmployees : 0;
    
    // Mock calculations for complex metrics
    const turnoverRate = 5.2; // percentage
    const employeeSatisfaction = 4.2; // out of 5

    return {
      totalEmployees,
      activeEmployees,
      newHires,
      pendingLeaveRequests,
      departmentCount,
      averageSalary,
      turnoverRate,
      employeeSatisfaction
    };
  };

  const stats = calculateStats();

  // CRUD Operations for Employees
  const handleSaveEmployee = (employeeData: Partial<Employee>) => {
    if (selectedEmployee) {
      setEmployees(prev => prev.map(emp => 
        emp.id === selectedEmployee.id 
          ? { ...emp, ...employeeData, updated_at: new Date().toISOString() }
          : emp
      ));
      toast({ title: "Employee updated successfully!" });
    } else {
      const newEmployee: Employee = {
        id: crypto.randomUUID(),
        employeeId: generateEmployeeId(),
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        position: '',
        department: '',
        manager: '',
        hireDate: '',
        salary: 0,
        status: 'active',
        type: 'full_time',
        address: '',
        skills: [],
        notes: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...employeeData
      };
      setEmployees(prev => [...prev, newEmployee]);
      toast({ title: "Employee created successfully!" });
    }
    setIsDialogOpen(false);
    setSelectedEmployee(null);
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
    toast({ title: "Employee deleted successfully!" });
  };

  // CRUD Operations for Departments
  const handleSaveDepartment = (departmentData: Partial<Department>) => {
    if (selectedDepartment) {
      setDepartments(prev => prev.map(dept => 
        dept.id === selectedDepartment.id 
          ? { ...dept, ...departmentData }
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

  // Filtered data
  const filteredEmployees = employees.filter(employee => {
    const fullName = `${employee.firstName} ${employee.lastName}`;
    const matchesSearch = fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || employee.status === filterStatus;
    const matchesDepartment = filterDepartment === 'all' || employee.department === filterDepartment;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEmployees}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeEmployees} active employees
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">New Hires</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newHires}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Salary</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.averageSalary.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across all employees
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingLeaveRequests}</div>
            <p className="text-xs text-muted-foreground">
              Leave requests
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => {
                setDialogType('employee');
                setSelectedEmployee(null);
                setIsDialogOpen(true);
              }}>
          <CardContent className="p-6 text-center">
            <Plus className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <h3 className="font-semibold">Add New Employee</h3>
            <p className="text-sm text-muted-foreground">Create a new employee record</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => {
                setDialogType('department');
                setSelectedDepartment(null);
                setIsDialogOpen(true);
              }}>
          <CardContent className="p-6 text-center">
            <Building className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <h3 className="font-semibold">Add Department</h3>
            <p className="text-sm text-muted-foreground">Create a new department</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setActiveTab('reports')}>
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <h3 className="font-semibold">View Reports</h3>
            <p className="text-sm text-muted-foreground">HR analytics and reports</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent HR Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Mock recent activities */}
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">New employee onboarded</p>
                <p className="text-xs text-muted-foreground">John Doe joined as Software Engineer</p>
              </div>
              <Badge variant="default">Today</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Leave request approved</p>
                <p className="text-xs text-muted-foreground">Sarah Smith's vacation request</p>
              </div>
              <Badge variant="secondary">Yesterday</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Performance review completed</p>
                <p className="text-xs text-muted-foreground">Q4 2024 reviews submitted</p>
              </div>
              <Badge variant="outline">2 days ago</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderEmployees = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <Input
            placeholder="Search employees..."
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
              <SelectItem value="on_leave">On Leave</SelectItem>
              <SelectItem value="terminated">Terminated</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterDepartment} onValueChange={setFilterDepartment}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept.id} value={dept.name}>{dept.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => {
          setDialogType('employee');
          setSelectedEmployee(null);
          setIsDialogOpen(true);
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Employee
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Hire Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.employeeId}</TableCell>
                  <TableCell>{`${employee.firstName} ${employee.lastName}`}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>
                    <Badge variant={employee.status === 'active' ? 'default' : 'secondary'}>
                      {employee.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {employee.hireDate ? 
                      new Date(employee.hireDate).toLocaleDateString() : 
                      'N/A'
                    }
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setDialogType('employee');
                          setSelectedEmployee(employee);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteEmployee(employee.id)}
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

  const renderEmployeeForm = () => (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const employeeData = {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        position: formData.get('position') as string,
        department: formData.get('department') as string,
        manager: formData.get('manager') as string,
        hireDate: formData.get('hireDate') as string,
        salary: Number(formData.get('salary')),
        status: formData.get('status') as EmployeeStatus,
        type: formData.get('type') as EmployeeType,
        address: formData.get('address') as string,
        notes: formData.get('notes') as string,
      };
      handleSaveEmployee(employeeData);
    }}>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            name="firstName"
            defaultValue={selectedEmployee?.firstName || ''}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            name="lastName"
            defaultValue={selectedEmployee?.lastName || ''}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={selectedEmployee?.email || ''}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            defaultValue={selectedEmployee?.phone || ''}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="position">Position *</Label>
          <Input
            id="position"
            name="position"
            defaultValue={selectedEmployee?.position || ''}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Select name="department" defaultValue={selectedEmployee?.department || ''}>
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept.id} value={dept.name}>{dept.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="manager">Manager</Label>
          <Input
            id="manager"
            name="manager"
            defaultValue={selectedEmployee?.manager || ''}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hireDate">Hire Date</Label>
          <Input
            id="hireDate"
            name="hireDate"
            type="date"
            defaultValue={selectedEmployee?.hireDate || ''}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="salary">Salary</Label>
          <Input
            id="salary"
            name="salary"
            type="number"
            defaultValue={selectedEmployee?.salary || 0}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select name="status" defaultValue={selectedEmployee?.status || 'active'}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="on_leave">On Leave</SelectItem>
              <SelectItem value="terminated">Terminated</SelectItem>
              <SelectItem value="probation">Probation</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Employment Type</Label>
          <Select name="type" defaultValue={selectedEmployee?.type || 'full_time'}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full_time">Full Time</SelectItem>
              <SelectItem value="part_time">Part Time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="intern">Intern</SelectItem>
              <SelectItem value="consultant">Consultant</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-2 space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            defaultValue={selectedEmployee?.address || ''}
          />
        </div>
        <div className="col-span-2 space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            defaultValue={selectedEmployee?.notes || ''}
            rows={3}
          />
        </div>
      </div>
      
      <div className="flex justify-end gap-2 mt-6">
        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
          Cancel
        </Button>
        <Button type="submit">
          {selectedEmployee ? 'Update' : 'Create'} Employee
        </Button>
      </div>
    </form>
  );

  // Component wrappers for tabs
  const DepartmentManagerContent = () => <DepartmentManager />;
  const LeaveManagerContent = () => <LeaveManager />;
  const PerformanceManagerContent = () => <PerformanceManager />;
  const HRReportsManagerContent = () => <HRReportsManager />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Complete HRM System</h2>
          <p className="text-muted-foreground">Manage your human resources and employee data</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="leave">Leave Management</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="roles">User Roles</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          {renderDashboard()}
        </TabsContent>

        <TabsContent value="employees">
          {renderEmployees()}
        </TabsContent>

        <TabsContent value="departments">
          <DepartmentsTab />
        </TabsContent>

        <TabsContent value="leave">
          <LeaveManagementTab />
        </TabsContent>

        <TabsContent value="performance">
          <PerformanceTab />
        </TabsContent>

        <TabsContent value="roles">
          <RoleManager />
        </TabsContent>

        <TabsContent value="reports">
          <HRReportsManagerContent />
        </TabsContent>
      </Tabs>

      {/* Employee/Department Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {dialogType === 'employee' ? 
                (selectedEmployee ? 'Edit Employee' : 'Add New Employee') :
                (selectedDepartment ? 'Edit Department' : 'Add New Department')
              }
            </DialogTitle>
          </DialogHeader>
          
          {dialogType === 'employee' && renderEmployeeForm()}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompleteHrmManager;
