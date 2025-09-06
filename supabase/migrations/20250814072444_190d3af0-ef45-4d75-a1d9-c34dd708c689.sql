-- Create feature toggles table
CREATE TABLE public.feature_toggles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  feature_key TEXT NOT NULL UNIQUE,
  is_enabled BOOLEAN NOT NULL DEFAULT true,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.feature_toggles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Feature toggles are viewable by everyone" 
ON public.feature_toggles 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage feature toggles" 
ON public.feature_toggles 
FOR ALL
USING (has_role('admin'::app_role))
WITH CHECK (has_role('admin'::app_role));

-- Create team members table for staff management
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  department TEXT,
  role TEXT NOT NULL,
  permissions TEXT[] DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  hire_date DATE,
  salary NUMERIC,
  manager_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Create policies for team members
CREATE POLICY "Team members can view their own profile" 
ON public.team_members 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all team members" 
ON public.team_members 
FOR ALL
USING (has_role('admin'::app_role))
WITH CHECK (has_role('admin'::app_role));

-- Create team chat table
CREATE TABLE public.team_chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID NOT NULL,
  channel_id TEXT NOT NULL DEFAULT 'general',
  message TEXT NOT NULL,
  message_type TEXT DEFAULT 'text',
  attachments JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.team_chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for team chat
CREATE POLICY "Team members can view chat messages" 
ON public.team_chat_messages 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.team_members 
    WHERE user_id = auth.uid() AND is_active = true
  ) OR has_role('admin'::app_role)
);

CREATE POLICY "Team members can send messages" 
ON public.team_chat_messages 
FOR INSERT 
WITH CHECK (
  auth.uid() = sender_id AND (
    EXISTS (
      SELECT 1 FROM public.team_members 
      WHERE user_id = auth.uid() AND is_active = true
    ) OR has_role('admin'::app_role)
  )
);

-- Create departments table for HRM
CREATE TABLE public.departments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  manager_id UUID,
  budget NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;

-- Create policies for departments
CREATE POLICY "Departments are viewable by team members" 
ON public.departments 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.team_members 
    WHERE user_id = auth.uid() AND is_active = true
  ) OR has_role('admin'::app_role)
);

CREATE POLICY "Admins can manage departments" 
ON public.departments 
FOR ALL
USING (has_role('admin'::app_role))
WITH CHECK (has_role('admin'::app_role));

-- Create resource configurations table
CREATE TABLE public.resource_configurations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  resource_key TEXT NOT NULL UNIQUE,
  configuration JSONB,
  is_enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.resource_configurations ENABLE ROW LEVEL SECURITY;

-- Create policies for resource configurations
CREATE POLICY "Resource configurations are viewable by everyone" 
ON public.resource_configurations 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage resource configurations" 
ON public.resource_configurations 
FOR ALL
USING (has_role('admin'::app_role))
WITH CHECK (has_role('admin'::app_role));

-- Create whatsapp contacts table
CREATE TABLE public.whatsapp_contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone_number TEXT NOT NULL UNIQUE,
  profile_picture_url TEXT,
  last_seen TIMESTAMP WITH TIME ZONE,
  is_blocked BOOLEAN DEFAULT false,
  tags TEXT[],
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.whatsapp_contacts ENABLE ROW LEVEL SECURITY;

-- Create policies for whatsapp contacts
CREATE POLICY "Admins can manage whatsapp contacts" 
ON public.whatsapp_contacts 
FOR ALL
USING (has_role('admin'::app_role))
WITH CHECK (has_role('admin'::app_role));

-- Create whatsapp messages table
CREATE TABLE public.whatsapp_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_id UUID NOT NULL REFERENCES public.whatsapp_contacts(id) ON DELETE CASCADE,
  message_text TEXT,
  message_type TEXT DEFAULT 'text',
  media_url TEXT,
  is_outgoing BOOLEAN NOT NULL,
  is_read BOOLEAN DEFAULT false,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.whatsapp_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for whatsapp messages
CREATE POLICY "Admins can manage whatsapp messages" 
ON public.whatsapp_messages 
FOR ALL
USING (has_role('admin'::app_role))
WITH CHECK (has_role('admin'::app_role));

-- Add foreign key constraint for team members manager
ALTER TABLE public.team_members ADD CONSTRAINT fk_team_members_manager 
FOREIGN KEY (manager_id) REFERENCES public.team_members(id);

-- Add foreign key constraint for departments manager
ALTER TABLE public.departments ADD CONSTRAINT fk_departments_manager 
FOREIGN KEY (manager_id) REFERENCES public.team_members(id);

-- Insert default feature toggles
INSERT INTO public.feature_toggles (feature_key, is_enabled, description) VALUES
('puter_ai_assistant', true, 'Enable PuterJS AI Assistant in Resources'),
('live_chat', true, 'Enable Live Chat Feature'),
('team_chat', true, 'Enable Team Chat Feature'),
('whatsapp_integration', true, 'Enable WhatsApp Web Integration'),
('marine_traffic', true, 'Enable Marine Traffic Tool'),
('freight_calculator', true, 'Enable Freight Calculator Tool'),
('route_optimizer', true, 'Enable Route Optimizer Tool'),
('document_scanner', true, 'Enable Document Scanner Tool'),
('container_optimizer', true, 'Enable Container Load Optimizer Tool');

-- Insert default departments
INSERT INTO public.departments (name, description) VALUES
('Sales', 'Handles customer acquisition and sales operations'),
('Operations', 'Manages logistics and operational activities'),
('Customer Service', 'Provides customer support and assistance'),
('Finance', 'Manages financial operations and accounting'),
('Human Resources', 'Handles employee management and HR policies'),
('IT', 'Manages technology infrastructure and support');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_feature_toggles_updated_at
BEFORE UPDATE ON public.feature_toggles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at
BEFORE UPDATE ON public.team_members
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_departments_updated_at
BEFORE UPDATE ON public.departments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_resource_configurations_updated_at
BEFORE UPDATE ON public.resource_configurations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_whatsapp_contacts_updated_at
BEFORE UPDATE ON public.whatsapp_contacts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();