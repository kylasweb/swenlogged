import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { MapPin, Clock, Briefcase, DollarSign, Upload, CheckCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

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
  application_deadline?: string;
}

const JobApplicationPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    applicant_name: '',
    applicant_email: '',
    applicant_phone: '',
    experience_years: '',
    current_position: '',
    current_company: '',
    salary_expectation: '',
    availability_date: '',
    portfolio_url: '',
    linkedin_url: '',
    cover_letter: '',
    additional_info: ''
  });

  useEffect(() => {
    if (jobId) {
      fetchJob();
    }
  }, [jobId]);

  const fetchJob = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .eq('is_active', true)
        .single();
      
      if (error) throw error;
      
      // Check if job deadline has passed
      if (data.application_deadline && new Date(data.application_deadline) < new Date()) {
        toast.error('Application deadline has passed for this position');
        navigate('/careers');
        return;
      }
      
      setJob(data);
    } catch (error) {
      console.error('Error fetching job:', error);
      toast.error('Job not found or no longer available');
      navigate('/careers');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.applicant_name && formData.applicant_email && formData.applicant_phone;
      case 2:
        return formData.experience_years && formData.current_position;
      case 3:
        return formData.cover_letter.length >= 100;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    } else {
      toast.error('Please fill in all required fields before proceeding');
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) {
      toast.error('Please complete all required fields');
      return;
    }

    setSubmitting(true);
    try {
      const applicationData = {
        job_id: jobId,
        ...formData,
        experience_years: parseInt(formData.experience_years) || null,
        availability_date: formData.availability_date || null
      };

      const { error } = await supabase
        .from('job_applications')
        .insert([applicationData]);
      
      if (error) throw error;
      
      setSubmitted(true);
      toast.success('Application submitted successfully!');
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'logistics': 'bg-blue-100 text-blue-800',
      'digital-marketing': 'bg-green-100 text-green-800',
      'branding': 'bg-purple-100 text-purple-800',
      'operations': 'bg-orange-100 text-orange-800',
      'technology': 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="pt-16">
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!job) {
    return (
      <>
        <Header />
        <main className="pt-16">
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
              <Button onClick={() => navigate('/careers')}>Back to Careers</Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (submitted) {
    return (
      <>
        <Header />
        <main className="pt-16">
          <div className="min-h-screen flex items-center justify-center">
            <Card className="max-w-md w-full mx-4">
              <CardContent className="pt-6 text-center">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for your interest in the {job.title} position. We'll review your application and get back to you soon.
                </p>
                <div className="space-y-2">
                  <Button onClick={() => navigate('/careers')} className="w-full">
                    View More Opportunities
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/')} className="w-full">
                    Return Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-16">
        <div className="bg-white py-12">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            {/* Back Button */}
            <Button 
              variant="outline" 
              onClick={() => navigate('/careers')}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Careers
            </Button>

            {/* Job Summary */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge className={getCategoryColor(job.category)}>
                    {job.category.replace('-', ' ').toUpperCase()}
                  </Badge>
                  {job.application_deadline && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      Deadline: {new Date(job.application_deadline).toLocaleDateString()}
                    </div>
                  )}
                </div>
                <CardTitle className="text-2xl">{job.title}</CardTitle>
                <CardDescription className="space-y-1">
                  <div className="flex items-center text-sm">
                    <Briefcase className="w-4 h-4 mr-2" />
                    {job.department}
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    {job.location}
                  </div>
                  {job.salary_range && (
                    <div className="flex items-center text-sm">
                      <DollarSign className="w-4 h-4 mr-2" />
                      {job.salary_range}
                    </div>
                  )}
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {step}
                    </div>
                    {step < 3 && (
                      <div className={`w-12 h-1 mx-2 ${
                        currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>Personal Info</span>
                <span>Experience</span>
                <span>Application</span>
              </div>
            </div>

            {/* Application Form */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {currentStep === 1 && "Personal Information"}
                  {currentStep === 2 && "Professional Experience"}
                  {currentStep === 3 && "Application Details"}
                </CardTitle>
                <CardDescription>
                  {currentStep === 1 && "Let's start with your basic information"}
                  {currentStep === 2 && "Tell us about your professional background"}
                  {currentStep === 3 && "Share why you're interested in this role"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {currentStep === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.applicant_name}
                        onChange={(e) => handleInputChange('applicant_name', e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.applicant_email}
                        onChange={(e) => handleInputChange('applicant_email', e.target.value)}
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.applicant_phone}
                        onChange={(e) => handleInputChange('applicant_phone', e.target.value)}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="linkedin">LinkedIn Profile</Label>
                      <Input
                        id="linkedin"
                        value={formData.linkedin_url}
                        onChange={(e) => handleInputChange('linkedin_url', e.target.value)}
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="portfolio">Portfolio/Website</Label>
                      <Input
                        id="portfolio"
                        value={formData.portfolio_url}
                        onChange={(e) => handleInputChange('portfolio_url', e.target.value)}
                        placeholder="https://yourportfolio.com"
                      />
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="experience">Years of Experience *</Label>
                      <Select value={formData.experience_years} onValueChange={(value) => handleInputChange('experience_years', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Less than 1 year</SelectItem>
                          <SelectItem value="1">1-2 years</SelectItem>
                          <SelectItem value="3">3-5 years</SelectItem>
                          <SelectItem value="6">6-10 years</SelectItem>
                          <SelectItem value="11">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="current_position">Current Position *</Label>
                      <Input
                        id="current_position"
                        value={formData.current_position}
                        onChange={(e) => handleInputChange('current_position', e.target.value)}
                        placeholder="e.g., Logistics Coordinator"
                      />
                    </div>
                    <div>
                      <Label htmlFor="current_company">Current Company</Label>
                      <Input
                        id="current_company"
                        value={formData.current_company}
                        onChange={(e) => handleInputChange('current_company', e.target.value)}
                        placeholder="Company name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="salary_expectation">Salary Expectation</Label>
                      <Input
                        id="salary_expectation"
                        value={formData.salary_expectation}
                        onChange={(e) => handleInputChange('salary_expectation', e.target.value)}
                        placeholder="e.g., $60,000 - $70,000"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="availability">Availability Date</Label>
                      <Input
                        id="availability"
                        type="date"
                        value={formData.availability_date}
                        onChange={(e) => handleInputChange('availability_date', e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cover_letter">Cover Letter * (minimum 100 characters)</Label>
                      <Textarea
                        id="cover_letter"
                        value={formData.cover_letter}
                        onChange={(e) => handleInputChange('cover_letter', e.target.value)}
                        placeholder="Tell us why you're interested in this role and what makes you a great fit..."
                        rows={8}
                        className="resize-none"
                      />
                      <div className="text-sm text-gray-500 mt-1">
                        {formData.cover_letter.length}/100 characters minimum
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="additional_info">Additional Information</Label>
                      <Textarea
                        id="additional_info"
                        value={formData.additional_info}
                        onChange={(e) => handleInputChange('additional_info', e.target.value)}
                        placeholder="Any additional information you'd like to share..."
                        rows={4}
                      />
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Resume Upload</h4>
                      <p className="text-sm text-blue-700 mb-3">
                        Please email your resume to hr@swenlog.com with the subject line: "Application for {job.title} - {formData.applicant_name}"
                      </p>
                      <p className="text-xs text-blue-600">
                        We'll process your application once we receive your resume.
                      </p>
                    </div>
                  </div>
                )}

                {/* Form Navigation */}
                <div className="flex justify-between pt-6 border-t">
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>
                  {currentStep < 3 ? (
                    <Button onClick={handleNext}>
                      Next
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleSubmit}
                      disabled={submitting || !validateStep(3)}
                    >
                      {submitting ? 'Submitting...' : 'Submit Application'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default JobApplicationPage;