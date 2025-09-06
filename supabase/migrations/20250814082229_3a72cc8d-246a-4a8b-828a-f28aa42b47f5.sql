-- Create header_settings table for logo and favicon management
CREATE TABLE public.header_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  logo_url TEXT,
  favicon_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.header_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can manage header settings" 
ON public.header_settings 
FOR ALL 
USING (has_role('admin'::app_role))
WITH CHECK (has_role('admin'::app_role));

CREATE POLICY "Header settings are viewable by everyone" 
ON public.header_settings 
FOR SELECT 
USING (true);

-- Create leave_requests table
CREATE TABLE public.leave_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID NOT NULL,
  leave_type TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  days_requested INTEGER NOT NULL,
  reason TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  approved_by UUID,
  approved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.leave_requests ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can manage leave requests" 
ON public.leave_requests 
FOR ALL 
USING (has_role('admin'::app_role))
WITH CHECK (has_role('admin'::app_role));

CREATE POLICY "Employees can view their own leave requests" 
ON public.leave_requests 
FOR SELECT 
USING (employee_id = auth.uid());

-- Create performance_reviews table
CREATE TABLE public.performance_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID NOT NULL,
  reviewer_id UUID NOT NULL,
  review_period_start DATE NOT NULL,
  review_period_end DATE NOT NULL,
  overall_rating INTEGER CHECK (overall_rating >= 1 AND overall_rating <= 5),
  goals_achievement TEXT,
  strengths TEXT,
  areas_for_improvement TEXT,
  comments TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.performance_reviews ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can manage performance reviews" 
ON public.performance_reviews 
FOR ALL 
USING (has_role('admin'::app_role))
WITH CHECK (has_role('admin'::app_role));

CREATE POLICY "Employees can view their own performance reviews" 
ON public.performance_reviews 
FOR SELECT 
USING (employee_id = auth.uid() OR reviewer_id = auth.uid());

-- Create activities table for CRM
CREATE TABLE public.crm_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_id UUID,
  lead_id UUID,
  opportunity_id UUID,
  activity_type TEXT NOT NULL,
  subject TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  assigned_to UUID,
  priority TEXT DEFAULT 'medium',
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.crm_activities ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can manage activities" 
ON public.crm_activities 
FOR ALL 
USING (has_role('admin'::app_role))
WITH CHECK (has_role('admin'::app_role));

-- Create cta_forms table
CREATE TABLE public.cta_forms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  button_text TEXT NOT NULL DEFAULT 'Get Started',
  form_fields JSONB NOT NULL DEFAULT '[]',
  success_message TEXT DEFAULT 'Thank you for your submission!',
  redirect_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.cta_forms ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can manage CTA forms" 
ON public.cta_forms 
FOR ALL 
USING (has_role('admin'::app_role))
WITH CHECK (has_role('admin'::app_role));

CREATE POLICY "CTA forms are viewable by everyone" 
ON public.cta_forms 
FOR SELECT 
USING (true);

-- Create form_submissions table
CREATE TABLE public.form_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  form_id UUID NOT NULL,
  form_type TEXT NOT NULL DEFAULT 'contact',
  data JSONB NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can view form submissions" 
ON public.form_submissions 
FOR SELECT 
USING (has_role('admin'::app_role));

CREATE POLICY "Anyone can submit forms" 
ON public.form_submissions 
FOR INSERT 
WITH CHECK (true);

-- Add triggers for updated_at columns
CREATE TRIGGER update_header_settings_updated_at
BEFORE UPDATE ON public.header_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_leave_requests_updated_at
BEFORE UPDATE ON public.leave_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_performance_reviews_updated_at
BEFORE UPDATE ON public.performance_reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_crm_activities_updated_at
BEFORE UPDATE ON public.crm_activities
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cta_forms_updated_at
BEFORE UPDATE ON public.cta_forms
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();