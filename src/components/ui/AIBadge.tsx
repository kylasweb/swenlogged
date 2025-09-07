import React from 'react';
import { Sparkles } from 'lucide-react';

const AIBadge: React.FC = () => (
  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-indigo-100 text-indigo-700 border border-indigo-200">
    <Sparkles className="h-3 w-3" /> AI Powered
  </span>
);

export default AIBadge;
