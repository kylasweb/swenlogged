import { useState, useEffect } from 'react';
import { extractTextFromPuterResponse } from './aiResponseParser';

interface PuterConfig {
    isReady: boolean;
    isLoading: boolean;
    error: string | null;
}

interface AIRequestOptions {
    temperature?: number;
    maxTokens?: number;
    rawResponse?: boolean;
    stream?: boolean; // reserved for future streaming support
    model?: string;
    timeoutMs?: number;
}

interface AIParsedResponse<T = unknown> {
    text: string;
    raw: T;
    model?: string;
    cached?: boolean;
}

class PuterService {
    private static instance: PuterService;
    private isInitialized = false;
    private isReady = false;
    private initPromise: Promise<boolean> | null = null;
    private listeners: ((ready: boolean) => void)[] = [];
    private lastReadyCheck = 0;
    private readonly readinessTTL = 10_000; // 10s before re-validate underlying window object

    private constructor() { }

    static getInstance(): PuterService {
        if (!PuterService.instance) {
            PuterService.instance = new PuterService();
        }
        return PuterService.instance;
    }

    async initialize(): Promise<boolean> {
        if (this.initPromise) return this.initPromise;
        if (this.isInitialized) return this.isReady;

        this.initPromise = (async () => {
            this.isInitialized = true;
            try {
                if (typeof window === 'undefined' || typeof document === 'undefined') {
                    console.warn('PuterService: window/document unavailable (SSR?)');
                    return false;
                }
                const existingScript = document.querySelector('script[src="https://js.puter.com/v2/"]');
                if (!existingScript) {
                    const script = document.createElement('script');
                    script.src = 'https://js.puter.com/v2/';
                    script.async = true;
                    await new Promise<void>((resolve, reject) => {
                        script.onload = () => resolve();
                        script.onerror = () => reject(new Error('Failed to load Puter.js script'));
                        document.head.appendChild(script);
                    });
                }
                const maxAttempts = 50;
                for (let attempt = 0; attempt < maxAttempts; attempt++) {
                    if (window.puter && window.puter.ai) break;
                    await new Promise(r => setTimeout(r, 100));
                }
                if (window.puter && window.puter.ai) {
                    this.isReady = true;
                    this.lastReadyCheck = Date.now();
                    this.notifyListeners(true);
                    return true;
                }
                this.notifyListeners(false);
                return false;
            } catch (err) {
                console.error('Error initializing Puter.js:', err);
                this.notifyListeners(false);
                return false;
            }
        })();

        return this.initPromise;
    }

    isServiceReady(): boolean {
        if (!this.isReady) return false;
        // Re-validate underlying global in case of HMR / page transitions invalidating reference
        if (Date.now() - this.lastReadyCheck > this.readinessTTL) {
            this.isReady = !!(window.puter && window.puter.ai);
            this.lastReadyCheck = Date.now();
        }
        return this.isReady;
    }

    async ensureReady(timeoutMs = 5_000): Promise<boolean> {
        if (this.isServiceReady()) return true;
        await this.initialize();
        if (this.isServiceReady()) return true;
        return new Promise<boolean>((resolve) => {
            let settled = false;
            const timeout = setTimeout(() => { if (!settled) { settled = true; resolve(false); } }, timeoutMs);
            const unsubscribe = this.onReady((ready) => {
                if (!settled) {
                    settled = true;
                    clearTimeout(timeout);
                    unsubscribe();
                    resolve(ready);
                }
            });
        });
    }

    async makeAIRequest(prompt: string, options?: AIRequestOptions): Promise<AIParsedResponse | string | unknown> {
        const ready = await this.ensureReady(options?.timeoutMs);
        if (!ready) throw new Error('Puter.js AI service is not ready');

        try {
            const apiOptions: Record<string, unknown> = {
                model: options?.model || 'gpt-4o-mini',
                stream: options?.stream ?? false,
                temperature: options?.temperature ?? 0.7,
            };
            if (options?.maxTokens !== undefined) apiOptions['max_tokens'] = options.maxTokens;

            const responseRaw = await window.puter.ai.chat(prompt as unknown as string, apiOptions as Record<string, unknown>);

            if (options?.rawResponse) return responseRaw;

            let text: string;
            try {
                text = String(extractTextFromPuterResponse(responseRaw as unknown));
            } catch {
                text = String(responseRaw);
            }
            const structured: AIParsedResponse = { text, raw: responseRaw, model: apiOptions.model as string };
            return structured;
        } catch (error) {
            console.error('Puter.js AI request failed:', error);
            if (error instanceof Error) {
                if (error.message.includes('401') || error.message.includes('Unauthorized') || error.message.includes('authentication')) {
                    console.warn('Puter.js authentication failed. Using fallback responses.');
                    const fallback = this.getFallbackResponse(prompt);
                    return { text: fallback, raw: null, model: options?.model, cached: true } satisfies AIParsedResponse;
                }
            }
            throw error;
        }
    }

    private getFallbackResponse(prompt: string): string {
        const lowerPrompt = prompt.toLowerCase();

        // Simple fallback responses based on keywords
        if (lowerPrompt.includes('shipping')) {
            return 'Shipping involves transporting goods from one location to another. We offer ocean freight, air freight, and ground transportation services.';
        }
        if (lowerPrompt.includes('freight')) {
            return 'Freight refers to goods transported in bulk. We provide comprehensive freight solutions including FCL and LCL services.';
        }
        if (lowerPrompt.includes('logistics')) {
            return 'Logistics encompasses the planning and control of goods movement. Our services include supply chain management and distribution.';
        }
        if (lowerPrompt.includes('customs')) {
            return 'Customs clearance involves getting goods through border controls. We handle all documentation and compliance requirements.';
        }

        return 'Thank you for your question about logistics services. SWENLOG specializes in providing comprehensive shipping solutions worldwide.';
    }

    onReady(callback: (ready: boolean) => void): () => void {
        this.listeners.push(callback);

        // If already ready, call immediately
        if (this.isReady) {
            callback(true);
        }

        // Return unsubscribe function
        return () => {
            const index = this.listeners.indexOf(callback);
            if (index > -1) {
                this.listeners.splice(index, 1);
            }
        };
    }

    private notifyListeners(ready: boolean): void {
        this.listeners.forEach(callback => {
            try {
                callback(ready);
            } catch (error) {
                console.error('Error in Puter.js ready listener:', error);
            }
        });
    }
}

// React hook for using Puter.js
export const usePuter = () => {
    const [config, setConfig] = useState<PuterConfig>({
        isReady: false,
        isLoading: true,
        error: null
    });

    useEffect(() => {
        const puterService = PuterService.getInstance();

        const initialize = async () => {
            try {
                const ready = await puterService.initialize();
                setConfig({
                    isReady: ready,
                    isLoading: false,
                    error: null
                });
            } catch (error) {
                setConfig({
                    isReady: false,
                    isLoading: false,
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        };

        initialize();
    }, []);

    return {
        ...config,
        ensureReady: (timeoutMs?: number) => PuterService.getInstance().ensureReady(timeoutMs),
        makeAIRequest: (prompt: string, options?: AIRequestOptions) => PuterService.getInstance().makeAIRequest(prompt, options)
    };
};

// Global instance
export const puterService = PuterService.getInstance();
