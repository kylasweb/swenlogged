import { vi } from 'vitest';

// Auto-mock supabase client for components using AuthProvider
vi.mock('@/integrations/supabase/client', () => import('@/integrations/supabase/__mocks__/client'));
