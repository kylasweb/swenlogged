import React from 'react';
import { useFeatureFlag } from '@/contexts/FeatureFlagsProvider';

interface FeatureGateProps {
  feature: string | string[];
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

const FeatureGate: React.FC<FeatureGateProps> = ({ feature, fallback = null, children }) => {
  const { enabled, loading } = useFeatureFlag(feature);
  if (loading) return null;
  if (!enabled) return <>{fallback}</>;
  return <>{children}</>;
};

export default FeatureGate;
