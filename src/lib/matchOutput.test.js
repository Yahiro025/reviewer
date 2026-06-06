import { describe, it, expect } from 'vitest';
import { normalizeForComparison, matchOutput, diffLines } from '@/lib/matchOutput';

describe('normalizeForComparison', () => {
  it('lowercases a simple string', () => {
    expect(normalizeForComparison('Hello World')).toBe('hello world');
  });

  it('lowercases single word', () => {
    expect(normalizeForComparison('FOUND')).toBe('found');
  });

  it('collapses multiple spaces', () => {
    expect(normalizeForComparison('Sum:  15')).toBe('sum: 15');
  });

  it('trims trailing spaces', () => {
    expect(normalizeForComparison('FOUND   ')).toBe('found');
  });

  it('removes empty lines between content', () => {
    expect(normalizeForComparison('A\n\nB')).toBe('a\nb');
  });

  it('removes trailing newline', () => {
    expect(normalizeForComparison('Hello\n')).toBe('hello');
  });

  it('collapses multiple spaces and lowercases', () => {
    expect(normalizeForComparison('even  sum:  30')).toBe('even sum: 30');
  });

  it('preserves unicode characters (only lowercases ASCII)', () => {
    expect(normalizeForComparison('\u2713 Done')).toBe('\u2713 done');
  });

  it('handles \\r\\n line endings (trims \\r as trailing space)', () => {
    expect(normalizeForComparison('Hello\r\nWorld')).toBe('hello\nworld');
  });

  it('returns empty string for empty input', () => {
    expect(normalizeForComparison('')).toBe('');
  });

  it('returns empty string for null', () => {
    expect(normalizeForComparison(null)).toBe('');
  });

  it('returns empty string for undefined', () => {
    expect(normalizeForComparison(undefined)).toBe('');
  });
});

describe('matchOutput', () => {
  it('exact match', () => {
    const result = matchOutput('Hello World', 'Hello World');
    expect(result.match).toBe(true);
    expect(result.details).toEqual([]);
  });

  it('case-insensitive match', () => {
    const result = matchOutput('FOUND', 'found');
    expect(result.match).toBe(true);
    expect(result.details).toEqual([]);
  });

  it('space-normalized match', () => {
    const result = matchOutput('Sum: 15', 'Sum:  15');
    expect(result.match).toBe(true);
    expect(result.details).toEqual([]);
  });

  it('trailing space match', () => {
    const result = matchOutput('FOUND   ', 'FOUND');
    expect(result.match).toBe(true);
    expect(result.details).toEqual([]);
  });

  it('empty line removal match', () => {
    const result = matchOutput('A\n\nB', 'A\nB');
    expect(result.match).toBe(true);
    expect(result.details).toEqual([]);
  });

  it('trailing newline match', () => {
    const result = matchOutput('Hello\n', 'Hello');
    expect(result.match).toBe(true);
    expect(result.details).toEqual([]);
  });

  it('space and case normalized match', () => {
    const result = matchOutput('Even Sum: 30', 'even  sum: 30');
    expect(result.match).toBe(true);
    expect(result.details).toEqual([]);
  });

  it('unicode exact match', () => {
    const result = matchOutput('\u2713 Done', '\u2713 Done');
    expect(result.match).toBe(true);
    expect(result.details).toEqual([]);
  });

  it('unicode characters must match exactly (no match when different)', () => {
    const result = matchOutput('\u2713 Done', 'Pass Done');
    expect(result.match).toBe(false);
    expect(result.details.length).toBeGreaterThan(0);
  });

  it('numeric values must match exactly', () => {
    const result = matchOutput('77.75', '77.7499');
    expect(result.match).toBe(false);
    expect(result.details.length).toBeGreaterThan(0);
  });

  it('single spaces are preserved (only 2+ spaces collapsed)', () => {
    // Per the spec: algorithm collapses ONLY 2+ consecutive spaces.
    // "A: 1" has a single space, "A:1" has zero — these differ after normalization.
    const result = matchOutput('A: 1\nB: 2', 'A:1\nB:2');
    expect(result.match).toBe(false);
    expect(result.details.length).toBeGreaterThan(0);
  });

  it('completely different strings do not match', () => {
    const result = matchOutput('Hello', 'World');
    expect(result.match).toBe(false);
    expect(result.details.length).toBeGreaterThan(0);
  });

  it('empty expected vs non-empty actual does not match', () => {
    const result = matchOutput('', 'anything');
    expect(result.match).toBe(false);
    expect(result.details.length).toBeGreaterThan(0);
  });

  it('empty vs empty matches', () => {
    const result = matchOutput('', '');
    expect(result.match).toBe(true);
    expect(result.details).toEqual([]);
  });

  it('details is an empty array when match is true', () => {
    const result = matchOutput('Hello', 'hello');
    expect(result.match).toBe(true);
    expect(Array.isArray(result.details)).toBe(true);
    expect(result.details).toHaveLength(0);
  });

  it('details is a non-empty array of strings when match is false', () => {
    const result = matchOutput('Hello', 'World');
    expect(result.match).toBe(false);
    expect(Array.isArray(result.details)).toBe(true);
    expect(result.details.length).toBeGreaterThan(0);
    for (const detail of result.details) {
      expect(typeof detail).toBe('string');
    }
  });

  it('each detail string starts with "  Line "', () => {
    const result = matchOutput('A\nB', 'A\nC');
    expect(result.match).toBe(false);
    for (const detail of result.details) {
      expect(detail.startsWith('  Line ')).toBe(true);
    }
  });
});

describe('diffLines', () => {
  it('returns empty array when outputs match', () => {
    const diffs = diffLines('Hello', 'Hello');
    expect(diffs).toEqual([]);
  });

  it('returns diff strings when outputs differ', () => {
    const diffs = diffLines('Even Sum: 30', 'even  sum: 31');
    expect(diffs).toHaveLength(1);
    expect(diffs[0]).toBe('  Line 1: expected "even sum: 30", got "even sum: 31"');
  });

  it('shows missing lines as "" when one output has fewer lines', () => {
    const diffs = diffLines('Line1\nLine2\nLine3', 'Line1');
    // Lines 2 and 3 from expected vs missing from actual
    expect(diffs).toHaveLength(2);
    expect(diffs[0]).toBe('  Line 2: expected "line2", got ""');
    expect(diffs[1]).toBe('  Line 3: expected "line3", got ""');
  });

  it('shows extra lines in actual as "" expected', () => {
    const diffs = diffLines('Line1', 'Line1\nExtra');
    expect(diffs).toHaveLength(1);
    expect(diffs[0]).toBe('  Line 2: expected "", got "extra"');
  });

  it('escapes double quotes in diff output', () => {
    const diffs = diffLines('monitor 24"', 'monitor 24"');
    expect(diffs).toEqual([]);
  });

  it('escapes double quotes in mismatched diff', () => {
    const diffs = diffLines('monitor 24"', 'monitor 25"');
    expect(diffs).toHaveLength(1);
    expect(diffs[0]).toContain('\\"');
  });
});
