import { useState, useCallback, useRef } from 'react';
import { puterService } from '@/utils/puterService';

export interface StreamingMessage {
    role: 'system' | 'user' | 'assistant' | 'function' | 'tool';
    content: unknown;
}

interface UseAIStreamingChatOptions {
    initialMessages?: StreamingMessage[];
    model?: string;
    temperature?: number;
    maxTokens?: number;
    testMode?: boolean;
}

export function useAIStreamingChat(opts: UseAIStreamingChatOptions = {}) {
    const { initialMessages = [], model, temperature, maxTokens, testMode } = opts;
    const [messages, setMessages] = useState<StreamingMessage[]>(initialMessages);
    const [streamText, setStreamText] = useState('');
    const [isStreaming, setIsStreaming] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const abortRef = useRef<boolean>(false);

    const appendUser = useCallback((content: string) => {
        setMessages(prev => [...prev, { role: 'user', content }]);
    }, []);

    const reset = useCallback(() => {
        setStreamText('');
        setError(null);
        setIsStreaming(false);
        abortRef.current = false;
    }, []);

    const run = useCallback(async () => {
        setError(null);
        setStreamText('');
        setIsStreaming(true);
        abortRef.current = false;
        try {
            const response = await puterService.makeAIChat({
                messages,
                options: {
                    model,
                    temperature,
                    maxTokens,
                    testMode,
                    stream: true,
                    onChunk: (chunk) => {
                        if (abortRef.current) return;
                        setStreamText(prev => prev + chunk);
                    }
                }
            });
            if (!abortRef.current) {
                setMessages(prev => [...prev, { role: 'assistant', content: response.text }]);
            }
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Unknown AI error');
        } finally {
            setIsStreaming(false);
        }
    }, [messages, model, temperature, maxTokens, testMode]);

    const abort = useCallback(() => {
        abortRef.current = true;
        setIsStreaming(false);
    }, []);

    return {
        messages,
        setMessages,
        appendUser,
        streamText,
        isStreaming,
        error,
        run,
        reset,
        abort
    };
}

export default useAIStreamingChat;