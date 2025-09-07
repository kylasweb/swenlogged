import { describe, it, expect } from 'vitest';
import { extractJson } from '../utils/aiJson';

describe('extractJson', () => {
    it('parses clean JSON object', () => {
        const obj = extractJson<{ a: number; b: string }>('{"a":1,"b":"x"}');
        expect(obj).toEqual({ a: 1, b: 'x' });
    });

    it('parses JSON embedded in explanatory text', () => {
        const input = 'Here is your data -> {"value":42,"list":[1,2,3]} Have a nice day';
        const obj = extractJson<{ value: number; list: number[] }>(input);
        expect(obj?.value).toBe(42);
        expect(obj?.list).toEqual([1, 2, 3]);
    });

    it('returns first JSON when multiple present', () => {
        const input = '{"first":1}{"second":2}';
        const obj = extractJson<{ first: number }>(input);
        expect(obj).toEqual({ first: 1 });
    });

    it('handles arrays', () => {
        const arr = extractJson<number[]>('[1,2,3]');
        expect(arr).toEqual([1, 2, 3]);
    });

    it('returns null for invalid', () => {
        const v = extractJson('no json here');
        expect(v).toBeNull();
    });
});
