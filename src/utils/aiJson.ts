// Utility to extract the first valid JSON object or array from an AI response string.
// Tries strict parse first; if fails, scans for balanced braces/brackets.
export function extractJson<T = unknown>(text: string): T | null {
    if (!text) return null;
    const trimmed = text.trim();
    // Fast path: whole string is JSON
    if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
        try { return JSON.parse(trimmed) as T; } catch {/* ignore */ }
    }

    // Scan for first balanced object
    const candidates: string[] = [];
    const pushIfJson = (s: string) => {
        const candidate = s.trim();
        if (!candidate) return;
        if ((candidate.startsWith('{') && candidate.endsWith('}')) || (candidate.startsWith('[') && candidate.endsWith(']'))) {
            try { candidates.push(JSON.parse(candidate)); } catch {/* ignore */ }
        }
    };

    // Simple brace matching
    let depth = 0; let start = -1;
    for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === '{' || ch === '[') {
            if (depth === 0) start = i;
            depth++;
        } else if (ch === '}' || ch === ']') {
            depth--;
            if (depth === 0 && start !== -1) {
                pushIfJson(text.slice(start, i + 1));
                start = -1;
            }
        }
    }

    return (candidates[0] as T) || null;
}

export function safeNumber(val: unknown, fallback = 0): number {
    const n = typeof val === 'number' ? val : parseFloat(String(val));
    return Number.isFinite(n) ? n : fallback;
}

export function coerceArray<T = unknown>(val: unknown): T[] {
    if (Array.isArray(val)) return val as T[];
    if (val == null) return [];
    return [val as T];
}
