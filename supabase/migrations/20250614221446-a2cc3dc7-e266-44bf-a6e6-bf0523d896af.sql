
-- CRM Tables
CREATE TABLE public.crm_contacts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  phone text,
  status text,
  tags text[],
  last_contacted timestamptz,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.crm_contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage contacts" ON public.crm_contacts FOR ALL USING (public.has_role('admin')) WITH CHECK (public.has_role('admin'));

CREATE TABLE public.crm_leads (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  source text,
  status text,
  assigned_to text,
  email text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.crm_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage leads" ON public.crm_leads FOR ALL USING (public.has_role('admin')) WITH CHECK (public.has_role('admin'));

CREATE TABLE public.crm_opportunities (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  stage text,
  value numeric,
  close_date date,
  contact_id uuid REFERENCES public.crm_contacts(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.crm_opportunities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage opportunities" ON public.crm_opportunities FOR ALL USING (public.has_role('admin')) WITH CHECK (public.has_role('admin'));

-- Media Table
CREATE TABLE public.media_items (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  url text NOT NULL,
  alt text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.media_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage media items" ON public.media_items FOR ALL USING (public.has_role('admin')) WITH CHECK (public.has_role('admin'));
CREATE POLICY "Media items are viewable by everyone" ON public.media_items FOR SELECT USING (true);

-- WhatsApp Tables
CREATE TABLE public.whatsapp_settings (
  id int PRIMARY KEY CHECK (id = 1),
  is_connected boolean NOT NULL DEFAULT false
);
INSERT INTO public.whatsapp_settings (id, is_connected) VALUES (1, false);
ALTER TABLE public.whatsapp_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage whatsapp settings" ON public.whatsapp_settings FOR ALL USING (public.has_role('admin')) WITH CHECK (public.has_role('admin'));

CREATE TABLE public.whatsapp_templates (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  content text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.whatsapp_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage whatsapp templates" ON public.whatsapp_templates FOR ALL USING (public.has_role('admin')) WITH CHECK (public.has_role('admin'));

CREATE TABLE public.whatsapp_flows (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  trigger text,
  steps jsonb,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.whatsapp_flows ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage whatsapp flows" ON public.whatsapp_flows FOR ALL USING (public.has_role('admin')) WITH CHECK (public.has_role('admin'));

-- Generic Page Content Table
CREATE TABLE public.page_content (
  key text PRIMARY KEY,
  content jsonb,
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage page content" ON public.page_content FOR ALL USING (public.has_role('admin')) WITH CHECK (public.has_role('admin'));
CREATE POLICY "Page content is viewable by everyone" ON public.page_content FOR SELECT USING (true);
