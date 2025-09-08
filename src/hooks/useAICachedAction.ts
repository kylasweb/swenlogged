import { useState, useEffect, useCallback } from 'react';
import { puterService } from '../utils/puterService';
import { extractJson } from '../utils/aiJson';
import { getAIFallback } from '@/data/aiFallbacks';
import { pushAIDiagnostics } from '@/components/dev/aiDiagnosticsBus';

interface UseAICachedActionOptions<TParsed> {
    cacheKey: string;
    buildPrompt: () => string;
    temperature?: number;
    maxTokens?: number;
    parseShape: () => TParsed | null; // optional additional parser layering
}

export function useAICachedAction<TParsed = unknown>(opts: UseAICachedActionOptions<TParsed>) {
    const { cacheKey, buildPrompt, temperature = 0.2, maxTokens = 700, parseShape } = opts;
    const [data, setData] = useState<TParsed | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fromFallback, setFromFallback] = useState(false);

    // hydrate
    useEffect(() => {
        try {
            const cached = localStorage.getItem(cacheKey);
            if (cached) setData(JSON.parse(cached));
        } catch { /* ignore */ }
    }, [cacheKey]);

    const run = useCallback(async (): Promise<TParsed | null> => {
        setLoading(true);
        setFromFallback(false);
        setError(null);
        let parsed: TParsed | null = null;
        try {
            await puterService.ensureReady(4000);
            const prompt = buildPrompt();
            if (!prompt) throw new Error('Empty prompt');
            const aiResp = await puterService.makeAIRequest(prompt, { temperature, maxTokens });
            const text = typeof aiResp === 'string' ? aiResp : (aiResp as { text?: string }).text || '';
            parsed = parseShape() || extractJson<TParsed>(text) || null;
            if (!parsed) throw new Error('Parse failure');
            setData(parsed);
            if (import.meta.env.DEV) pushAIDiagnostics({ key: cacheKey, fromFallback: false, timestamp: Date.now() });
            try { localStorage.setItem(cacheKey, JSON.stringify(parsed)); } catch {/* ignore */ }
        } catch (e) {
            // Attempt fallback
            const fb = getAIFallback(cacheKey);
            if (fb) {
                parsed = fb as TParsed;
                setData(parsed);
                setFromFallback(true);
                if (import.meta.env.DEV) pushAIDiagnostics({ key: cacheKey, fromFallback: true, timestamp: Date.now() });
                setError(null); // treat fallback as successful resolution
            } else {
                setError(e instanceof Error ? e.message : 'Unknown error');
            }
        } finally {
            setLoading(false);
        }
        return parsed;
    }, [buildPrompt, cacheKey, temperature, maxTokens, parseShape]);

    return { data, loading, error, run, fromFallback };
}
