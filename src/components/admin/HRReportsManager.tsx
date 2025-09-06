import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart3, Users, Calendar, TrendingUp, Download, FileText } from 'lucide-react';

interface HRStats {
  totalEmployees: number;
  totalDepartments: number;
  pendingLeaveRequests: number;
  completedReviews: number;
  averageRating: number;
  leaveRequestsByType: Record<string, number>;
  departmentBreakdown: Record<string, number>;
  monthlyLeaveRequests: Record<string, number>;
}

const HRReportsManager = () => {
  const [stats, setStats] = useState<HRStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('30');

  useEffect(() => {
    fetchHRStats();
  }, [selectedPeriod]);

  const fetchHRStats = async () => {
    try {
      const [
        departmentsResult,
        leaveRequestsResult,
        performanceReviewsResult,
        teamMembersResult
      ] = await Promise.all([
        supabase.from('departments').select('*'),
        supabase.from('leave_requests').select('*'),
        supabase.from('performance_reviews').select('*'),
        supabase.from('team_members').select('*')
      ]);

      const departments = departmentsResult.data || [];
      const leaveRequests = leaveRequestsResult.data || [];
      const performanceReviews = performanceReviewsResult.data || [];
      const teamMembers = teamMembersResult.data || [];

      // Calculate leave requests by type
      const leaveRequestsByType = leaveRequests.reduce((acc, request) => {
        acc[request.leave_type] = (acc[request.leave_type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      // Calculate department breakdown
      const departmentBreakdown = teamMembers.reduce((acc, member) => {
        const dept = member.department || 'Unassigned';
        acc[dept] = (acc[dept] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      // Calculate monthly leave requests
      const monthlyLeaveRequests = leaveRequests.reduce((acc, request) => {
        const month = new Date(request.created_at).toLocaleString('default', { month: 'short' });
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      // Calculate average rating
      const ratingsSum = performanceReviews
        .filter(review => review.overall_rating)
        .reduce((sum, review) => sum + (review.overall_rating || 0), 0);
      const ratingsCount = performanceReviews.filter(review => review.overall_rating).length;
      const averageRating = ratingsCount > 0 ? ratingsSum / ratingsCount : 0;

      setStats({
        totalEmployees: teamMembers.length,
        totalDepartments: departments.length,
        pendingLeaveRequests: leaveRequests.filter(req => req.status === 'pending').length,
        completedReviews: performanceReviews.filter(review => review.status === 'completed').length,
        averageRating: parseFloat(averageRating.toFixed(1)),
        leaveRequestsByType,
        departmentBreakdown,
        monthlyLeaveRequests
      });
    } catch (error) {
      console.error('Error fetching HR stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportReport = () => {
    if (!stats) return;
    
    const reportData = {
      generatedAt: new Date().toISOString(),
      period: `Last ${selectedPeriod} days`,
      ...stats
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hr-report-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading HR reports...</div>;
  }

  if (!stats) {
    return <div className="flex justify-center p-8">No data available</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6" />
          <h2 className="text-2xl font-bold">HR Reports & Analytics</h2>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={exportReport} variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEmployees}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDepartments}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Leave</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingLeaveRequests}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reviews Done</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedReviews}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageRating}/5</div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Leave Requests by Type</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {Object.entries(stats.leaveRequestsByType).map(([type, count]) => (
              <div key={type} className="flex justify-between items-center">
                <span className="text-sm font-medium">{type}</span>
                <Badge variant="secondary">{count}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {Object.entries(stats.departmentBreakdown).map(([dept, count]) => (
              <div key={dept} className="flex justify-between items-center">
                <span className="text-sm font-medium">{dept}</span>
                <Badge variant="outline">{count} employees</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Leave Trends</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {Object.entries(stats.monthlyLeaveRequests).map(([month, count]) => (
              <div key={month} className="flex justify-between items-center">
                <span className="text-sm font-medium">{month}</span>
                <Badge variant="outline">{count} requests</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900">Employee Growth</h4>
              <p className="text-sm text-blue-700">
                Currently managing {stats.totalEmployees} employees across {stats.totalDepartments} departments.
              </p>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold text-yellow-900">Leave Management</h4>
              <p className="text-sm text-yellow-700">
                {stats.pendingLeaveRequests} leave requests pending approval. Most common type: {
                  Object.entries(stats.leaveRequestsByType).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'
                }.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900">Performance</h4>
              <p className="text-sm text-green-700">
                Average performance rating is {stats.averageRating}/5 with {stats.completedReviews} completed reviews.
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900">Department Distribution</h4>
              <p className="text-sm text-purple-700">
                Largest department: {
                  Object.entries(stats.departmentBreakdown).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'
                } with {
                  Object.entries(stats.departmentBreakdown).sort(([,a], [,b]) => b - a)[0]?.[1] || 0
                } employees.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HRReportsManager;