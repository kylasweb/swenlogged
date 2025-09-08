import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { aiDiagnosticsListeners, type AIDiagnosticsEntry } from './aiDiagnosticsBus';

export const AIDiagnosticsPanel: React.FC = () => {
  const [entries, setEntries] = useState<AIDiagnosticsEntry[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
  const handler = (e: AIDiagnosticsEntry) => setEntries(prev => [e, ...prev.slice(0,49)]);
  aiDiagnosticsListeners.push(handler);
  return () => { const i = aiDiagnosticsListeners.indexOf(handler); if (i>-1) aiDiagnosticsListeners.splice(i,1); };
  }, []);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'a') setVisible(v => !v);
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, []);

  if (!import.meta.env.DEV || !visible) return null;

  return (
    <div style={{ position: 'fixed', bottom: 12, right: 12, zIndex: 4000, width: 360 }}>
      <Card className="shadow-lg border border-gray-300 bg-white/90 backdrop-blur">
        <CardHeader className="py-3">
          <CardTitle className="text-sm flex items-center gap-2">AI Diagnostics <Badge variant="outline">DEV</Badge></CardTitle>
        </CardHeader>
        <CardContent className="max-h-72 overflow-auto space-y-2">
          {entries.length === 0 && <div className="text-xs text-gray-500">No AI invocations yet</div>}
          {entries.map(e => (
            <div key={e.timestamp+e.key} className="text-[11px] flex justify-between items-center border-b pb-1 last:border-none">
              <span className="truncate max-w-[200px]" title={e.key}>{e.key}</span>
              {e.fromFallback ? <Badge variant="destructive">fallback</Badge> : <Badge variant="secondary">live</Badge>}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
