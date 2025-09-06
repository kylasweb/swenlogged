-- Create jobs table
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  employment_type TEXT NOT NULL DEFAULT 'full-time',
  experience_level TEXT NOT NULL DEFAULT 'mid-level',
  salary_range TEXT,
  description TEXT NOT NULL,
  requirements TEXT[] NOT NULL DEFAULT '{}',
  responsibilities TEXT[] NOT NULL DEFAULT '{}',
  benefits TEXT[] DEFAULT '{}',
  category TEXT NOT NULL DEFAULT 'logistics',
  is_active BOOLEAN NOT NULL DEFAULT true,
  posted_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  application_deadline DATE
);

-- Create job applications table
CREATE TABLE public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  applicant_name TEXT NOT NULL,
  applicant_email TEXT NOT NULL,
  applicant_phone TEXT,
  resume_url TEXT,
  cover_letter TEXT,
  experience_years INTEGER,
  current_position TEXT,
  current_company TEXT,
  salary_expectation TEXT,
  availability_date DATE,
  portfolio_url TEXT,
  linkedin_url TEXT,
  additional_info TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Create policies for jobs
CREATE POLICY "Jobs are viewable by everyone" 
ON public.jobs 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage jobs" 
ON public.jobs 
FOR ALL 
USING (has_role('admin'::app_role))
WITH CHECK (has_role('admin'::app_role));

-- Create policies for job applications
CREATE POLICY "Anyone can submit job applications" 
ON public.job_applications 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can view all job applications" 
ON public.job_applications 
FOR SELECT 
USING (has_role('admin'::app_role));

CREATE POLICY "Admins can update job applications" 
ON public.job_applications 
FOR UPDATE 
USING (has_role('admin'::app_role))
WITH CHECK (has_role('admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_jobs_updated_at
BEFORE UPDATE ON public.jobs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_job_applications_updated_at
BEFORE UPDATE ON public.job_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some default job categories and sample data
INSERT INTO public.jobs (title, department, location, employment_type, experience_level, salary_range, description, requirements, responsibilities, benefits, category, posted_by) VALUES
('Logistics Coordinator', 'Operations', 'New York, NY', 'full-time', 'entry-level', '$45,000 - $55,000', 'We are looking for an organized and detail-oriented Logistics Coordinator to join our team. You will be responsible for managing shipments, coordinating with carriers, and ensuring timely delivery.', ARRAY['Bachelor''s degree in Logistics, Supply Chain, or related field', '1-2 years of experience in logistics or operations', 'Strong organizational and communication skills', 'Proficiency in logistics software and MS Office'], ARRAY['Coordinate and manage shipping schedules', 'Track shipments and resolve delivery issues', 'Maintain relationships with carriers and vendors', 'Prepare shipping documentation and reports', 'Optimize logistics processes for efficiency'], ARRAY['Health insurance', 'Dental and vision coverage', '401(k) with company match', 'Paid time off', 'Professional development opportunities'], 'logistics', (SELECT id FROM auth.users WHERE email = 'swenlogsocial@gmail.com' LIMIT 1)),
('Digital Marketing Specialist', 'Marketing', 'Remote', 'full-time', 'mid-level', '$55,000 - $70,000', 'Join our marketing team to develop and execute digital marketing strategies that drive brand awareness and customer engagement in the logistics industry.', ARRAY['Bachelor''s degree in Marketing, Communications, or related field', '3-5 years of digital marketing experience', 'Experience with SEO, SEM, and social media marketing', 'Proficiency in Google Analytics and marketing automation tools'], ARRAY['Develop and implement digital marketing campaigns', 'Manage social media accounts and content creation', 'Analyze marketing performance and optimize strategies', 'Collaborate with sales team on lead generation', 'Stay updated on industry trends and best practices'], ARRAY['Flexible work arrangements', 'Health and wellness benefits', 'Performance bonuses', 'Professional development budget', 'Modern equipment and tools'], 'digital-marketing', (SELECT id FROM auth.users WHERE email = 'swenlogsocial@gmail.com' LIMIT 1)),
('Brand Manager', 'Marketing', 'Los Angeles, CA', 'full-time', 'senior-level', '$75,000 - $95,000', 'Lead our brand strategy and ensure consistent brand messaging across all touchpoints in the logistics and supply chain industry.', ARRAY['Bachelor''s degree in Marketing, Business, or related field', '5+ years of brand management experience', 'Strong analytical and strategic thinking skills', 'Experience in B2B marketing preferred'], ARRAY['Develop and execute brand strategy and positioning', 'Manage brand guidelines and ensure consistency', 'Oversee marketing campaigns and brand communications', 'Conduct market research and competitive analysis', 'Collaborate with cross-functional teams'], ARRAY['Competitive salary and equity', 'Comprehensive benefits package', 'Flexible PTO policy', 'Career advancement opportunities', 'Team building and company events'], 'branding', (SELECT id FROM auth.users WHERE email = 'swenlogsocial@gmail.com' LIMIT 1));