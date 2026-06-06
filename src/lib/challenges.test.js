import { describe, it, expect } from 'vitest';
import challenges from '@/lib/challenges';

const EXPECTED_TOPIC_ORDER = [
  'arrays', 'searching', 'loops', 'conditionals', 'predefined-functions',
  'functions', 'pointers', 'structures', 'nested-structures',
  'strings', 'struct-arrays', 'file-handling',
];

const EXPECTED_NUMBERS = {
  arrays: '01', searching: '02', loops: '03', conditionals: '04',
  'predefined-functions': '05', functions: '06', pointers: '07',
  structures: '08', 'nested-structures': '09', 'struct-arrays': '10',
  strings: '11', 'file-handling': '12',
};

const EXPECTED_TIERS = ['novice', 'beginner', 'intermediate', 'advanced', 'expert'];

const REQUIRED_FIELDS = ['id', 'title', 'description', 'starterCode', 'expectedOutput', 'hint'];

describe('challenges.js — structure validation', () => {
  it('has exactly 12 topic objects', () => {
    const keys = Object.keys(challenges);
    expect(keys).toHaveLength(12);
  });

  it('topic keys match the expected order', () => {
    const keys = Object.keys(challenges);
    expect(keys).toEqual(EXPECTED_TOPIC_ORDER);
  });

  it('every topic has exactly 5 tiers (60 challenges total)', () => {
    let totalChallenges = 0;
    for (const [key, topic] of Object.entries(challenges)) {
      const tiers = Object.keys(topic.tiers);
      expect(tiers).toHaveLength(5);
      expect(tiers).toEqual(EXPECTED_TIERS);
      totalChallenges += tiers.length;
    }
    expect(totalChallenges).toBe(60);
  });

  describe('topic metadata', () => {
    for (const [key, expectedNum] of Object.entries(EXPECTED_NUMBERS)) {
      it(`topic "${key}" has number "${expectedNum}"`, () => {
        expect(challenges[key]).toBeDefined();
        expect(challenges[key].number).toBe(expectedNum);
      });

      it(`topic "${key}" has title and description`, () => {
        expect(challenges[key].title).toBeTruthy();
        expect(typeof challenges[key].title).toBe('string');
        expect(challenges[key].description).toBeTruthy();
        expect(typeof challenges[key].description).toBe('string');
      });
    }
  });

  describe('challenge object validation', () => {
    for (const [topicKey, topic] of Object.entries(challenges)) {
      for (const tier of EXPECTED_TIERS) {
        const challenge = topic.tiers[tier];

        it(`"${topicKey}-${tier}" exists`, () => {
          expect(challenge).toBeDefined();
        });

        it(`"${topicKey}-${tier}" has all required fields: ${REQUIRED_FIELDS.join(', ')}`, () => {
          for (const field of REQUIRED_FIELDS) {
            expect(challenge[field], `missing field "${field}"`).toBeDefined();
            expect(typeof challenge[field], `field "${field}" must be a string`).toBe('string');
            expect(challenge[field].length, `field "${field}" must not be empty`).toBeGreaterThan(0);
          }
        });

        it(`"${topicKey}-${tier}" has correct id format`, () => {
          expect(challenge.id).toBe(`${topicKey}-${tier}`);
        });
      }
    }
  });

  describe('no duplicate challenge IDs', () => {
    it('all 60 IDs are unique', () => {
      const ids = [];
      for (const [, topic] of Object.entries(challenges)) {
        for (const tier of EXPECTED_TIERS) {
          ids.push(topic.tiers[tier].id);
        }
      }
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(60);
    });
  });

  describe('title non-empty per challenge', () => {
    it('every challenge title is a non-empty string', () => {
      for (const [topicKey, topic] of Object.entries(challenges)) {
        for (const tier of EXPECTED_TIERS) {
          const ch = topic.tiers[tier];
          expect(
            ch.title.trim().length,
            `"${ch.id}" title must not be empty`
          ).toBeGreaterThan(0);
        }
      }
    });
  });

  describe('description non-empty per challenge', () => {
    it('every challenge description is a non-empty string', () => {
      for (const [topicKey, topic] of Object.entries(challenges)) {
        for (const tier of EXPECTED_TIERS) {
          const ch = topic.tiers[tier];
          expect(
            ch.description.trim().length,
            `"${ch.id}" description must not be empty`
          ).toBeGreaterThan(0);
        }
      }
    });
  });

  describe('starterCode non-empty per challenge', () => {
    it('every challenge starterCode is a non-empty string', () => {
      for (const [topicKey, topic] of Object.entries(challenges)) {
        for (const tier of EXPECTED_TIERS) {
          const ch = topic.tiers[tier];
          expect(
            ch.starterCode.trim().length,
            `"${ch.id}" starterCode must not be empty`
          ).toBeGreaterThan(0);
        }
      }
    });
  });

  describe('exampleInput validation', () => {
    it('every challenge using scanf or fgets in starterCode has an exampleInput field', () => {
      for (const [topicKey, topic] of Object.entries(challenges)) {
        for (const tier of EXPECTED_TIERS) {
          const ch = topic.tiers[tier];
          const hasScanf = ch.starterCode.includes('scanf');
          const hasFgets = ch.starterCode.includes('fgets');

          if (hasScanf || hasFgets) {
            expect(
              ch.exampleInput,
              `"${ch.id}" uses scanf/fgets but is missing exampleInput`
            ).toBeDefined();
            expect(
              typeof ch.exampleInput,
              `"${ch.id}" exampleInput must be a string`
            ).toBe('string');
            expect(
              ch.exampleInput.length,
              `"${ch.id}" exampleInput must not be empty`
            ).toBeGreaterThan(0);
          }
        }
      }
    });
  });

  describe('starterCode conventions', () => {
    it('every challenge starterCode includes #include <stdio.h>', () => {
      for (const [topicKey, topic] of Object.entries(challenges)) {
        for (const tier of EXPECTED_TIERS) {
          const ch = topic.tiers[tier];
          expect(
            ch.starterCode,
            `"${ch.id}" starterCode must include #include <stdio.h>`
          ).toMatch(/#include\s+<stdio\.h>/);
        }
      }
    });
  });

  describe('expectedOutput conventions', () => {
    it('expectedOutput is a non-empty string for every challenge', () => {
      for (const [topicKey, topic] of Object.entries(challenges)) {
        for (const tier of EXPECTED_TIERS) {
          const ch = topic.tiers[tier];
          expect(
            ch.expectedOutput.length,
            `"${ch.id}" expectedOutput must not be empty`
          ).toBeGreaterThan(0);
        }
      }
    });
  });

  describe('hint conventions', () => {
    it('every hint is a single sentence ending with punctuation', () => {
      for (const [topicKey, topic] of Object.entries(challenges)) {
        for (const tier of EXPECTED_TIERS) {
          const ch = topic.tiers[tier];
          expect(
            ch.hint.trim().length,
            `"${ch.id}" hint must be at least 20 chars`
          ).toBeGreaterThanOrEqual(20);
          expect(
            ch.hint.trim(),
            `"${ch.id}" hint must end with punctuation (. ! ?)`
          ).toMatch(/[.!?]$/);
        }
      }
    });
  });
});
