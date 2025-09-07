import { useState, useEffect, useCallback } from 'react';
import { puterService } from '../utils/puterService';
import { extractJson } from '../utils/aiJson';

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

    // hydrate
    useEffect(() => {
        try {
            const cached = localStorage.getItem(cacheKey);
            if (cached) setData(JSON.parse(cached));
        } catch { /* ignore */ }
    }, [cacheKey]);

    const run = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            await puterService.ensureReady(4000);
            const prompt = buildPrompt();
            const aiResp = await puterService.makeAIRequest(prompt, { temperature, maxTokens });
            const text = typeof aiResp === 'string' ? aiResp : (aiResp as { text?: string }).text || '';
            const parsed = parseShape() || extractJson<TParsed>(text) || null;
            if (!parsed) throw new Error('Parse failure');
            setData(parsed);
            try { localStorage.setItem(cacheKey, JSON.stringify(parsed)); } catch {/* ignore */ }
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    }, [buildPrompt, cacheKey, temperature, maxTokens, parseShape]);

    return { data, loading, error, run };
}
