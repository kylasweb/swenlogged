import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface FeatureFlagRecord {
  feature_key: string;
  is_enabled: boolean;
  description?: string;
  category?: string;
  priority?: number;
}

interface FeatureFlagsContextValue {
  flags: Record<string, FeatureFlagRecord>;
  loading: boolean;
  refresh: () => Promise<void>;
  isEnabled: (key: string | string[]) => boolean;
}

const FeatureFlagsContext = createContext<FeatureFlagsContextValue | undefined>(undefined);

const ALIAS_MAP: Record<string, string> = {
  puter_ai_assistant: 'ai_assistant'
};

const normalizeKey = (k: string) => ALIAS_MAP[k] || k;

export const FeatureFlagsProvider = ({ children }: { children: ReactNode }) => {
  const [flags, setFlags] = useState<Record<string, FeatureFlagRecord>>({});
  const [loading, setLoading] = useState(true);

  const fetchFlags = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('feature_toggles')
        .select('feature_key,is_enabled,description,category,priority');
      if (error) throw error;
      const map: Record<string, FeatureFlagRecord> = {};
      (data || []).forEach(row => {
        const key = normalizeKey(row.feature_key);
        if (!map[key]) {
          map[key] = { ...row, feature_key: key } as FeatureFlagRecord;
        } else if (row.feature_key === key) {
          map[key] = { ...row, feature_key: key } as FeatureFlagRecord;
        }
      });
      setFlags(map);
    } catch (e) {
      console.error('Failed to load feature flags', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchFlags(); }, [fetchFlags]);

  const isEnabled = (key: string | string[]) => {
    if (Array.isArray(key)) return key.every(k => flags[normalizeKey(k)]?.is_enabled);
    return !!flags[normalizeKey(key)]?.is_enabled;
  };

  return (
    <FeatureFlagsContext.Provider value={{ flags, loading, refresh: fetchFlags, isEnabled }}>
      {children}
    </FeatureFlagsContext.Provider>
  );
};

// eslint-disable-next-line
export const useFeatureFlag = (key: string | string[]) => {
  const ctx = useContext(FeatureFlagsContext);
  if (!ctx) throw new Error('useFeatureFlag must be used within FeatureFlagsProvider');
  return { enabled: ctx.isEnabled(key), loading: ctx.loading, refresh: ctx.refresh };
};

// eslint-disable-next-line
export const useAllFeatureFlags = () => {
  const ctx = useContext(FeatureFlagsContext);
  if (!ctx) throw new Error('useAllFeatureFlags must be used within FeatureFlagsProvider');
  return ctx;
};
