-- Add new columns to feature_toggles table
ALTER TABLE public.feature_toggles 
ADD COLUMN category text DEFAULT 'main',
ADD COLUMN priority integer DEFAULT 1,
ADD COLUMN dependencies text[] DEFAULT '{}';

-- Add indexes for better performance
CREATE INDEX idx_feature_toggles_category ON public.feature_toggles(category);
CREATE INDEX idx_feature_toggles_priority ON public.feature_toggles(priority);