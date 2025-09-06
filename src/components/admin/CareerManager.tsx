import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit, Trash2, Eye, Plus, Briefcase, Users, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import ApplicationProcessBuilder from './ApplicationProcessBuilder';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  employment_type: string;
  experience_level: string;
  salary_range?: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  category: string;
  is_active: boolean;
  application_deadline?: string;
  created_at: string;
}

interface JobApplication {
  id: string;
  job_id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone?: string;
  resume_url?: string;
  cover_letter?: string;
  experience_years?: number;
  current_position?: string;
  current_company?: string;
  salary_expectation?: string;
  status: string;
  created_at: string;
  jobs: { title: string };
}

const CareerManager = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [newJobData, setNewJobData] = useState({
    title: '',
    department: '',
    location: '',
    employment_type: 'full-time',
    experience_level: 'mid-level',
    salary_range: '',
    description: '',
    requirements: '',
    responsibilities: '',
    benefits: '',
    category: 'logistics',
    application_deadline: ''
  });

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to fetch jobs');
    }
  };

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select(`
          *,
          jobs:job_id (title)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveJob = async () => {
    try {
      const jobData = {
        ...newJobData,
        requirements: newJobData.requirements.split('\n').filter(r => r.trim()),
        responsibilities: newJobData.responsibilities.split('\n').filter(r => r.trim()),
        benefits: newJobData.benefits.split('\n').filter(b => b.trim()),
        application_deadline: newJobData.application_deadline || null
      };

      if (editingJob) {
        const { error } = await supabase
          .from('jobs')
          .update(jobData)
          .eq('id', editingJob.id);
        
        if (error) throw error;
        toast.success('Job updated successfully');
      } else {
        const { error } = await supabase
          .from('jobs')
          .insert([jobData]);
        
        if (error) throw error;
        toast.success('Job created successfully');
      }

      setIsDialogOpen(false);
      setEditingJob(null);
      resetForm();
      fetchJobs();
    } catch (error) {
      console.error('Error saving job:', error);
      toast.error('Failed to save job');
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return;

    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast.success('Job deleted successfully');
      fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('Failed to delete job');
    }
  };

  const handleToggleJobStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('jobs')
        .update({ is_active: !currentStatus })
        .eq('id', id);
      
      if (error) throw error;
      toast.success(`Job ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
      fetchJobs();
    } catch (error) {
      console.error('Error updating job status:', error);
      toast.error('Failed to update job status');
    }
  };

  const handleApplicationStatusUpdate = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ 
          status,
          reviewed_at: new Date().toISOString(),
          reviewed_by: (await supabase.auth.getUser()).data.user?.id
        })
        .eq('id', id);
      
      if (error) throw error;
      toast.success('Application status updated successfully');
      fetchApplications();
    } catch (error) {
      console.error('Error updating application status:', error);
      toast.error('Failed to update application status');
    }
  };

  const resetForm = () => {
    setNewJobData({
      title: '',
      department: '',
      location: '',
      employment_type: 'full-time',
      experience_level: 'mid-level',
      salary_range: '',
      description: '',
      requirements: '',
      responsibilities: '',
      benefits: '',
      category: 'logistics',
      application_deadline: ''
    });
  };

  const openEditDialog = (job: Job) => {
    setEditingJob(job);
    setNewJobData({
      title: job.title,
      department: job.department,
      location: job.location,
      employment_type: job.employment_type,
      experience_level: job.experience_level,
      salary_range: job.salary_range || '',
      description: job.description,
      requirements: job.requirements.join('\n'),
      responsibilities: job.responsibilities.join('\n'),
      benefits: job.benefits.join('\n'),
      category: job.category,
      application_deadline: job.application_deadline || ''
    });
    setIsDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'under-review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Career Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setEditingJob(null); }}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Job
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingJob ? 'Edit Job' : 'Create New Job'}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  value={newJobData.title}
                  onChange={(e) => setNewJobData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Senior Logistics Coordinator"
                />
              </div>
              <div>
                <Label htmlFor="department">Department *</Label>
                <Input
                  id="department"
                  value={newJobData.department}
                  onChange={(e) => setNewJobData(prev => ({ ...prev, department: e.target.value }))}
                  placeholder="e.g., Operations"
                />
              </div>
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={newJobData.location}
                  onChange={(e) => setNewJobData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g., New York, NY or Remote"
                />
              </div>
              <div>
                <Label htmlFor="employment_type">Employment Type</Label>
                <Select value={newJobData.employment_type} onValueChange={(value) => setNewJobData(prev => ({ ...prev, employment_type: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="experience_level">Experience Level</Label>
                <Select value={newJobData.experience_level} onValueChange={(value) => setNewJobData(prev => ({ ...prev, experience_level: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry-level">Entry Level</SelectItem>
                    <SelectItem value="mid-level">Mid Level</SelectItem>
                    <SelectItem value="senior-level">Senior Level</SelectItem>
                    <SelectItem value="executive">Executive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={newJobData.category} onValueChange={(value) => setNewJobData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="logistics">Logistics</SelectItem>
                    <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                    <SelectItem value="branding">Branding</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="salary_range">Salary Range</Label>
                <Input
                  id="salary_range"
                  value={newJobData.salary_range}
                  onChange={(e) => setNewJobData(prev => ({ ...prev, salary_range: e.target.value }))}
                  placeholder="e.g., $50,000 - $70,000"
                />
              </div>
              <div>
                <Label htmlFor="application_deadline">Application Deadline</Label>
                <Input
                  type="date"
                  id="application_deadline"
                  value={newJobData.application_deadline}
                  onChange={(e) => setNewJobData(prev => ({ ...prev, application_deadline: e.target.value }))}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                  id="description"
                  value={newJobData.description}
                  onChange={(e) => setNewJobData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the role, company, and what makes this opportunity exciting..."
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="requirements">Requirements (one per line) *</Label>
                <Textarea
                  id="requirements"
                  value={newJobData.requirements}
                  onChange={(e) => setNewJobData(prev => ({ ...prev, requirements: e.target.value }))}
                  placeholder="Bachelor's degree in relevant field&#10;3+ years of experience&#10;Strong communication skills"
                  rows={6}
                />
              </div>
              <div>
                <Label htmlFor="responsibilities">Responsibilities (one per line) *</Label>
                <Textarea
                  id="responsibilities"
                  value={newJobData.responsibilities}
                  onChange={(e) => setNewJobData(prev => ({ ...prev, responsibilities: e.target.value }))}
                  placeholder="Manage daily operations&#10;Coordinate with team members&#10;Analyze performance metrics"
                  rows={6}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="benefits">Benefits (one per line)</Label>
                <Textarea
                  id="benefits"
                  value={newJobData.benefits}
                  onChange={(e) => setNewJobData(prev => ({ ...prev, benefits: e.target.value }))}
                  placeholder="Health insurance&#10;401(k) matching&#10;Flexible work arrangements"
                  rows={4}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveJob}>
                {editingJob ? 'Update Job' : 'Create Job'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="jobs" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="jobs">Job Listings</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="processes">Application Processes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="jobs" className="space-y-4">
          {jobs.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-gray-500">
                  <Briefcase className="mx-auto h-12 w-12 mb-4" />
                  <p>No jobs posted yet. Create your first job listing!</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            jobs.map((job) => (
              <Card key={job.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {job.title}
                        <Badge variant={job.is_active ? "default" : "secondary"}>
                          {job.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {job.department} • {job.location} • {job.employment_type}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleJobStatus(job.id, job.is_active)}
                      >
                        {job.is_active ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(job)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteJob(job.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Category:</strong> {job.category}
                    </div>
                    <div>
                      <strong>Experience:</strong> {job.experience_level}
                    </div>
                    {job.salary_range && (
                      <div>
                        <strong>Salary:</strong> {job.salary_range}
                      </div>
                    )}
                    {job.application_deadline && (
                      <div>
                        <strong>Deadline:</strong> {new Date(job.application_deadline).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  <p className="mt-4 text-gray-600 line-clamp-2">{job.description}</p>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          {applications.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-gray-500">
                  <Users className="mx-auto h-12 w-12 mb-4" />
                  <p>No applications received yet.</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            applications.map((application) => (
              <Card key={application.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{application.applicant_name}</CardTitle>
                      <CardDescription>
                        Applied for: {application.jobs?.title} • {application.applicant_email}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(application.status)}>
                        {application.status.replace('-', ' ').toUpperCase()}
                      </Badge>
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleApplicationStatusUpdate(application.id, 'approved')}
                          disabled={application.status === 'approved'}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleApplicationStatusUpdate(application.id, 'rejected')}
                          disabled={application.status === 'rejected'}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {application.applicant_phone && (
                      <div>
                        <strong>Phone:</strong> {application.applicant_phone}
                      </div>
                    )}
                    {application.experience_years && (
                      <div>
                        <strong>Experience:</strong> {application.experience_years} years
                      </div>
                    )}
                    {application.current_position && (
                      <div>
                        <strong>Current Position:</strong> {application.current_position}
                      </div>
                    )}
                    {application.current_company && (
                      <div>
                        <strong>Current Company:</strong> {application.current_company}
                      </div>
                    )}
                  </div>
                  {application.cover_letter && (
                    <div className="mt-4">
                      <strong>Cover Letter:</strong>
                      <p className="mt-1 text-gray-600 line-clamp-3">{application.cover_letter}</p>
                    </div>
                  )}
                  <div className="mt-4 text-xs text-gray-500">
                    Applied on: {new Date(application.created_at).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="processes" className="space-y-4">
          <ApplicationProcessBuilder />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CareerManager;