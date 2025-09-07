import { describe, it, expect } from 'vitest';
import { extractTextFromPuterResponse } from './aiResponseParser';

describe('extractTextFromPuterResponse', () => {
    it('returns string for plain string response', () => {
        expect(extractTextFromPuterResponse('hello')).toBe('hello');
    });

    it('extracts from OpenAI-like choices array', () => {
        const resp = {
            choices: [
                { message: { content: [{ type: 'text', text: 'Part1' }, { type: 'text', text: 'Part2' }] } }
            ]
        };
        expect(extractTextFromPuterResponse(resp)).toBe('Part1 Part2');
    });

    it('extracts from puter.message.content array', () => {
        const resp = {
            message: { content: [{ type: 'text', text: 'Hello' }, { type: 'text', text: 'World' }] }
        };
        expect(extractTextFromPuterResponse(resp)).toBe('Hello World');
    });

    it('falls back to top-level text or content', () => {
        expect(extractTextFromPuterResponse({ text: 'top' })).toBe('top');
        expect(extractTextFromPuterResponse({ content: 'cont' })).toBe('cont');
    });

    it('returns fallback for unknown shapes', () => {
        const res = extractTextFromPuterResponse({ foo: 'bar' });
        expect(res).toContain('I apologize');
    });

    it('handles message.content as a plain string', () => {
        const resp = { message: { content: 'plain text content' } };
        expect(extractTextFromPuterResponse(resp)).toBe('plain text content');
    });

    it('ignores non-text parts in arrays and joins text parts', () => {
        const resp = { message: { content: [{ type: 'meta', note: 'x' }, { type: 'text', text: 'Good' }, { some: 'thing' }, { type: 'text', text: 'Day' }] } };
        expect(extractTextFromPuterResponse(resp)).toBe('Good Day');
    });

    it('handles choices[0].message.content as a plain string', () => {
        const resp = { choices: [{ message: { content: 'choice text' } }] };
        expect(extractTextFromPuterResponse(resp)).toBe('choice text');
    });

    it('returns polite fallback for null/undefined', () => {
        expect(extractTextFromPuterResponse(null)).toContain('did not receive a response');
        // @ts-expect-error testing runtime behavior
        expect(extractTextFromPuterResponse(undefined)).toContain('did not receive a response');
    });
});
