import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { vi } from 'vitest';

// Extend expect with jest-dom matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
    cleanup();
});

// Global mock for supabase client to avoid network calls in component tests
vi.mock('@/integrations/supabase/client', () => import('@/integrations/supabase/__mocks__/client'));
