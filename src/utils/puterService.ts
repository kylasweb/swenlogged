import { useState, useEffect } from 'react';
import { extractTextFromPuterResponse } from './aiResponseParser';

interface PuterConfig {
    isReady: boolean;
    isLoading: boolean;
    error: string | null;
}

class PuterService {
    private static instance: PuterService;
    private isInitialized = false;
    private isReady = false;
    private listeners: ((ready: boolean) => void)[] = [];

    private constructor() { }

    static getInstance(): PuterService {
        if (!PuterService.instance) {
            PuterService.instance = new PuterService();
        }
        return PuterService.instance;
    }

    async initialize(): Promise<boolean> {
        if (this.isInitialized) {
            return this.isReady;
        }

        this.isInitialized = true;

        try {
            // Check if script is already loaded
            const existingScript = document.querySelector('script[src="https://js.puter.com/v2/"]');

            if (!existingScript) {
                // Load Puter.js script
                const script = document.createElement('script');
                script.src = 'https://js.puter.com/v2/';
                script.async = true;

                const loadPromise = new Promise<void>((resolve, reject) => {
                    script.onload = () => {
                        console.log('Puter.js script loaded successfully');
                        resolve();
                    };
                    script.onerror = () => {
                        console.error('Failed to load Puter.js script');
                        reject(new Error('Failed to load Puter.js script'));
                    };
                    document.head.appendChild(script);
                });

                await loadPromise;
            }

            // Wait for Puter.js to be fully available (poll with a fixed max attempts)
            const maxAttempts = 50;
            for (let attempt = 0; attempt < maxAttempts; attempt++) {
                if (window.puter && window.puter.ai) break;
                await new Promise(resolve => setTimeout(resolve, 100));
            }

            if (window.puter && window.puter.ai) {
                this.isReady = true;
                console.log('Puter.js AI service is ready');
                this.notifyListeners(true);
                return true;
            } else {
                console.warn('Puter.js AI service not available after initialization');
                this.notifyListeners(false);
                return false;
            }
        } catch (error) {
            console.error('Error initializing Puter.js:', error);
            this.notifyListeners(false);
            return false;
        }
    }

    isServiceReady(): boolean {
        return this.isReady && !!(window.puter && window.puter.ai);
    }

    async makeAIRequest(prompt: string, options?: { temperature?: number; maxTokens?: number; rawResponse?: boolean; stream?: boolean }): Promise<unknown> {
        if (!this.isServiceReady()) {
            throw new Error('Puter.js AI service is not ready');
        }

        try {
            // Map camelCase options to SDK expected keys (e.g., maxTokens -> max_tokens)
            const apiOptions: Record<string, unknown> = {
                model: 'gpt-4o-mini',
                stream: options?.stream ?? false,
                temperature: options?.temperature ?? 0.7,
            };

            if (options?.maxTokens !== undefined) apiOptions['max_tokens'] = options.maxTokens;

            const responseRaw = await window.puter.ai.chat(prompt as unknown as string, apiOptions as unknown as Record<string, unknown>);

            // If caller wants raw response (for tool_calls / function-calling workflows), return it
            if (options?.rawResponse) return responseRaw;

            // Otherwise, return extracted text for convenience
            try {
                return extractTextFromPuterResponse(responseRaw as unknown);
            } catch (err) {
                return String(responseRaw);
            }
        } catch (error) {
            console.error('Puter.js AI request failed:', error);

            // Check if it's an authentication error
            if (error instanceof Error) {
                if (error.message.includes('401') || error.message.includes('Unauthorized') || error.message.includes('authentication')) {
                    console.warn('Puter.js authentication failed. Using fallback responses.');
                    return this.getFallbackResponse(prompt);
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
        makeAIRequest: (prompt: string, options?: { temperature?: number; maxTokens?: number }) => {
            const puterService = PuterService.getInstance();
            return puterService.makeAIRequest(prompt, options);
        }
    };
};

// Global instance
export const puterService = PuterService.getInstance();
