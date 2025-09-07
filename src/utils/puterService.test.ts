import { describe, it, expect, beforeAll } from 'vitest';
import { puterService } from './puterService';

type MockChatReturn = { message: { text: string } };
type MockChatFn = (promptOrMsgs: string | Array<{ role: string; content: string }>) => Promise<MockChatReturn>;

// Mock minimal window.puter implementation
beforeAll(() => {
    // @ts-expect-error setting up jsdom-less window for test
    global.window = global.window || {};
    const chat: MockChatFn = async (promptOrMsgs) => {
        return {
            message: {
                text: typeof promptOrMsgs === 'string' ? `Echo:${promptOrMsgs.slice(0, 20)}` : 'Echo:messages'
            }
        };
    };
    (window as unknown as { puter: { ai: { chat: MockChatFn } } }).puter = { ai: { chat } };
});

describe('puterService basic', () => {
    it('initializes without throwing', async () => {
        const ready = await puterService.initialize();
        expect(ready).toBe(true);
    });

    it('makes simple AI request', async () => {
        const resp = await puterService.makeAIRequest('Test prompt', { testMode: true });
        const text = typeof resp === 'string' ? resp : (resp as { text: string }).text;
        expect(text).toContain('Echo:Test prompt');
    });

    it('supports messages chat', async () => {
        const chat = await puterService.makeAIChat({
            messages: [
                { role: 'system', content: 'You are a test.' },
                { role: 'user', content: 'Hi' }
            ],
            options: { testMode: true }
        });
        expect(chat.text).toContain('Echo');
    });
});