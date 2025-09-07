// Centralized, defensive extractor for Puter.js / AI responses
export function extractTextFromPuterResponse(response: unknown): string {
    const fallback = 'I apologize, but I could not process the response properly.';

    if (!response) return 'I apologize, but I did not receive a response. Please try again.';

    try {
        // Plain string
        if (typeof response === 'string') return response;

        if (typeof response === 'object' && response !== null) {
            const resp = response as Record<string, unknown>;

            // 1) choices[0].message.content (OpenAI-like wrappers)
            if (Array.isArray(resp['choices'])) {
                const choices = resp['choices'] as unknown[];
                const first = choices[0] as Record<string, unknown> | undefined;
                const msg = first?.['message'] as Record<string, unknown> | undefined;
                const content = msg?.['content'];
                if (content) {
                    if (typeof content === 'string') return content;
                    if (Array.isArray(content)) {
                        const arr = content as unknown[];
                        const text = arr
                            .filter(item => typeof item === 'object' && item !== null && 'type' in (item as Record<string, unknown>) && (item as Record<string, unknown>)['type'] === 'text')
                            .map(item => String((item as Record<string, unknown>)['text'] ?? ''))
                            .join(' ')
                            .trim();
                        if (text) return text;
                    }
                }
            }

            // 2) response.message.content (Puter.js streaming parts)
            if ('message' in resp && resp['message']) {
                const messageObj = resp['message'] as Record<string, unknown>;
                const content = messageObj['content'];
                if (content) {
                    if (typeof content === 'string') return content;
                    if (Array.isArray(content)) {
                        const arr = content as unknown[];
                        const text = arr
                            .filter(item => typeof item === 'object' && item !== null && 'type' in (item as Record<string, unknown>) && (item as Record<string, unknown>)['type'] === 'text')
                            .map(item => String((item as Record<string, unknown>)['text'] ?? ''))
                            .join(' ')
                            .trim();
                        if (text) return text;
                    }
                }
            }

            // 3) top-level content / text fields
            if (resp['content']) return String(resp['content']);
            if (resp['text']) return String(resp['text']);
        }

        return fallback;
    } catch (err) {
        // keep defensive: do not crash the app when parsing unexpected shapes
        console.error('Error parsing AI response:', err, response);
        return 'I apologize, but there was an error processing the response.';
    }
}
