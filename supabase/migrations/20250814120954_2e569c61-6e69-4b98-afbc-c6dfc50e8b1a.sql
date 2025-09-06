-- Create tasks table for staff dashboard and HRM
CREATE TABLE public.tasks (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  priority text NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  due_date date,
  assigned_to uuid REFERENCES auth.users(id),
  created_by uuid REFERENCES auth.users(id),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS for tasks
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Create policies for tasks
CREATE POLICY "Users can view tasks assigned to them"
ON public.tasks
FOR SELECT
USING (assigned_to = auth.uid() OR created_by = auth.uid() OR has_role('admin'));

CREATE POLICY "Admins can manage all tasks"
ON public.tasks
FOR ALL
USING (has_role('admin'));

CREATE POLICY "Users can create tasks"
ON public.tasks
FOR INSERT
WITH CHECK (created_by = auth.uid() OR has_role('admin'));

CREATE POLICY "Users can update their own tasks"
ON public.tasks
FOR UPDATE
USING (assigned_to = auth.uid() OR created_by = auth.uid() OR has_role('admin'));

-- Create application processes table for career management
CREATE TABLE public.application_processes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id uuid REFERENCES public.jobs(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  form_schema jsonb NOT NULL DEFAULT '{}',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS for application processes
ALTER TABLE public.application_processes ENABLE ROW LEVEL SECURITY;

-- Create policies for application processes
CREATE POLICY "Admins can manage application processes"
ON public.application_processes
FOR ALL
USING (has_role('admin'));

CREATE POLICY "Application processes are viewable by everyone for active jobs"
ON public.application_processes
FOR SELECT
USING (is_active = true);

-- Create user role assignments table for better role management
CREATE TABLE public.user_role_assignments (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  assigned_by uuid REFERENCES auth.users(id),
  assigned_at timestamp with time zone NOT NULL DEFAULT now(),
  role app_role NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  notes text
);

-- Enable RLS for user role assignments
ALTER TABLE public.user_role_assignments ENABLE ROW LEVEL SECURITY;

-- Create policies for user role assignments
CREATE POLICY "Admins can manage role assignments"
ON public.user_role_assignments
FOR ALL
USING (has_role('admin'));

-- Create triggers for updated_at columns
CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON public.tasks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_application_processes_updated_at
  BEFORE UPDATE ON public.application_processes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();