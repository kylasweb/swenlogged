export interface AIDiagnosticsEntry { key: string; fromFallback: boolean; timestamp: number; }
export const aiDiagnosticsListeners: Array<(e: AIDiagnosticsEntry) => void> = [];
export function pushAIDiagnostics(e: AIDiagnosticsEntry) { aiDiagnosticsListeners.forEach(l => l(e)); }
