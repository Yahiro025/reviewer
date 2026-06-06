# Spec: Fuzzy Output Matching for C-LABS Challenge Arena

> **Target model**: DeepSeek V4 Pro
> **Primary file to create**: `src/lib/matchOutput.js`
> **Test file to create**: `src/lib/matchOutput.test.js`
> **Files to edit**: `src/app/challenge/[id]/page.js`, `src/lib/challenges.test.js`, `src/app/challenge/[id]/challenge.module.css`

---

## PROBLEM STATEMENT

The current output comparison in `src/app/challenge/[id]/page.js` uses strict equality after a simple `.trim()`:

```js
const expected = challenge.expectedOutput.trim();
const actual = runOut.trim();
if (actual === expected && !runSignal) {
  setExecStatus('pass');
  markCompleted(challenge.id);
  setChallengeStatus('completed');
  setShowSuccessModal(true);
} else {
  setExecStatus('fail');
}
```

This means minor whitespace or casing differences cause a `FAIL` result even when the student's solution is logically correct.

---

## STEP-BY-STEP EXECUTION PLAN

Execute these steps **in order**. Do NOT skip steps.

---

### Step 1: Create `src/lib/matchOutput.js`

Create a new file with exactly these three exported functions. **Use no external dependencies** — only plain JavaScript.

#### Function 1: `normalizeForComparison(str)`

```
/**
 * Normalizes a string for fuzzy comparison.
 *
 * Algorithm (apply in this exact order):
 * 1. If input is null/undefined, return ''
 * 2. Split string into lines by \n
 * 3. Trim each line (leading + trailing spaces)
 * 4. Remove empty lines (length === 0 after trim)
 * 5. Collapse multiple consecutive spaces within each line to a single space
 *    — Use regex: line.replace(/ {2,}/g, ' ')
 * 6. Rejoin lines with \n
 * 7. .toLowerCase() the entire result
 *
 * @param {string} str - The raw output string
 * @returns {string} - The normalized string
 */
export function normalizeForComparison(str) { ... }
```

**Mental trace — verify this produces correct results:**

| Input | Output |
|-------|--------|
| `"FOUND"` | `"found"` |
| `"Even  Sum:  30"` | `"even sum: 30"` |
| `"FOUND   \n"` | `"found"` |
| `"Line1\n\nLine2"` | `"line1\nline2"` |
| `"Hello\n"` | `"hello"` |
| `""` | `""` |
| `"✓ Done"` | `"✓ done"` |

**Rules:**
- Do NOT use `str.trim()` on the whole string before splitting — split first, then trim each line individually. This preserves intentional empty first/last lines during per-line processing (they get removed in step 4 anyway).
- Do NOT normalize Unicode characters. `✓` stays as `✓`. Only ASCII letters are lowercased and only ASCII spaces are collapsed.
- Do NOT use `str.replace(/\s+/g, ' ')` — that would collapse `\n` into spaces. Use `line.replace(/ {2,}/g, ' ')` on each individual line (after splitting by `\n`).

#### Function 2: `matchOutput(expected, actual)`

```
/**
 * Compares actual output against expected output using fuzzy matching.
 *
 * @param {string} expected - The challenge.expectedOutput value (raw)
 * @param {string} actual - The student's program stdout (raw)
 * @returns {{ match: boolean, details: string[] }}
 *   - match: true if outputs are equivalent after normalization
 *   - details: array of human-readable diff hints (empty array when match is true)
 */
export function matchOutput(expected, actual) {
  // 1. Normalize both strings
  // 2. Compare normalized strings
  // 3. If equal, return { match: true, details: [] }
  // 4. If not equal, call diffLines(expected, actual) to build details
  // 5. Return { match: false, details: [...] }
}
```

**Important:** The `details` array must ALWAYS be returned (empty array `[]` on match). Do NOT return `undefined` or omit it.

#### Function 3: `diffLines(expected, actual)`

```
/**
 * Computes a simple line-by-line diff between two raw output strings.
 * Returns an array of human-readable diff hint strings for mismatched lines.
 *
 * Algorithm:
 * 1. Normalize both strings using normalizeForComparison()
 * 2. Split each normalized string into lines by \n
 * 3. Iterate up to max(expectedLines.length, actualLines.length)
 * 4. For each line index:
 *    - If expectedLines[i] !== actualLines[i], push a diff string:
 *      `  Line ${i+1}: expected "...", got "..."`
 *    - If one string has fewer lines, use "" for the missing line
 * 5. Return only the mismatched lines array
 *
 * @param {string} expected - Raw expected output
 * @param {string} actual - Raw actual output
 * @returns {string[]} - Array of diff hint strings
 */
export function diffLines(expected, actual) { ... }
```

**Example output format** (exact string format matters for the UI):

Given expected output `"Even Sum: 30"` and actual output `"even  sum: 31"`:

```
[
  '  Line 1: expected "even sum: 30", got "even sum: 31"'
]
```

Note: Both values are **normalized** (lowercased, spaces collapsed). The diff shows the semantic difference (30 vs 31), not the cosmetic one (case/space).

**Rules:**
- Each diff line MUST start with exactly 2 spaces for indentation
- The expected/actual values in the diff MUST show the **normalized** versions (lowercased, spaces collapsed), not the raw values. This helps students see what the matcher actually compared.
- Do NOT use any diff library. Simple line-by-line comparison is sufficient.
- If one output has more lines than the other, show the missing lines as `""` (empty string in quotes).

---

### Step 2: Create `src/lib/matchOutput.test.js`

Create a unit test file using vitest (already installed as a devDependency). Match the style of the existing test file `src/lib/challenges.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { normalizeForComparison, matchOutput, diffLines } from '@/lib/matchOutput';
```

**Test cases for `normalizeForComparison`:**

| Input | Expected Output |
|-------|----------------|
| `"Hello World"` | `"hello world"` |
| `"FOUND"` | `"found"` |
| `"Sum:  15"` | `"sum: 15"` |
| `"FOUND   "` | `"found"` |
| `"A\n\nB"` | `"a\nb"` |
| `"Hello\n"` | `"hello"` |
| `"even  sum:  30"` | `"even sum: 30"` |
| `"✓ Done"` | `"✓ done"` |
| `"Hello\r\nWorld"` | `"hello\nworld"` |
| `""` | `""` |
| `null` | `""` |
| `undefined` | `""` |

**Test cases for `matchOutput`:**

| Expected | Actual | Should Match |
|----------|--------|:------------:|
| `"Hello World"` | `"Hello World"` | ✅ |
| `"FOUND"` | `"found"` | ✅ |
| `"Sum: 15"` | `"Sum:  15"` | ✅ |
| `"FOUND   "` | `"FOUND"` | ✅ |
| `"A\n\nB"` | `"A\nB"` | ✅ |
| `"Hello\n"` | `"Hello"` | ✅ |
| `"Even Sum: 30"` | `"even  sum: 30"` | ✅ |
| `"✓ Done"` | `"✓ Done"` | ✅ |
| `"✓ Done"` | `"Pass Done"` | ❌ |
| `"77.75"` | `"77.7499"` | ❌ |
| `"A: 1\nB: 2"` | `"A:1\nB:2"` | ✅ |
| `"Hello"` | `"World"` | ❌ |
| `""` | `"anything"` | ❌ |
| `""` | `""` | ✅ |

**Additional tests:**
- When `match` is `true`, verify `details` is an empty array `[]`
- When `match` is `false`, verify `details` is a non-empty array of strings
- Verify each detail string starts with "  Line " (2 spaces + "Line")

**Test cases for `diffLines`:**
- When outputs match, returns empty array
- When outputs differ, returns array with diff strings
- When one output has more lines than the other, missing lines shown as `""`

---

### Step 3: Modify `src/app/challenge/[id]/page.js`

Make these **exact changes** to the challenge page component:

#### 3a. Add import

At the top of the file, after the existing imports (the last import is `import AnimatePage from '@/components/AnimatePage';`), add a new import on the next line:

```js
import { matchOutput } from '@/lib/matchOutput';
```

#### 3b. Add state variable

Inside the `PracticeArena` function, after the existing state declarations (after `const [showSuccessModal, setShowSuccessModal] = useState(false);`), add:

```js
const [diffDetails, setDiffDetails] = useState([]);
```

#### 3c. Reset diffDetails on mount

Inside the `useEffect` that runs on `[id, result]` change, add (after `setOutput('')`):

```js
setDiffDetails([]);
```

#### 3d. Replace the output comparison block

Find this exact code block in the `runCode` function:

```js
      // Check against expected output
      const expected = challenge.expectedOutput.trim();
      const actual = runOut.trim();
      if (actual === expected && !runSignal) {
        setExecStatus('pass');
        markCompleted(challenge.id);
        setChallengeStatus('completed');
        setShowSuccessModal(true);
      } else {
        setExecStatus('fail');
      }
```

Replace it with:

```js
      // Check against expected output (fuzzy match)
      const result = matchOutput(challenge.expectedOutput, runOut);
      if (result.match && !runSignal) {
        setExecStatus('pass');
        markCompleted(challenge.id);
        setChallengeStatus('completed');
        setShowSuccessModal(true);
        setDiffDetails([]);
      } else {
        setExecStatus('fail');
        setDiffDetails(result.details || []);
      }
```

#### 3e. Reset diffDetails in resetCode function

In the `resetCode` function, after `setExecStatus(null)`, add:

```js
setDiffDetails([]);
```

#### 3f. Render diff hints in the terminal area

Find the terminal output section. Locate this block inside the `terminalOutput` div:

```jsx
<pre className={styles.outputText}>{output}</pre>
```

The `<pre className={styles.outputText}>{output}</pre>` line is inside a JSX fragment (`<>...</>`). Add the diff details block as the **last child inside that fragment**, right before the closing `</>`. The fragment should become:

```jsx
<>
  <p><span className={styles.prompt}>$</span> gcc main.c -o main &amp;&amp; ./main</p>
  <pre className={styles.outputText}>{output}</pre>
  {execStatus === 'fail' && diffDetails.length > 0 && (
    <div className={styles.diffDetails}>
      <pre className={styles.diffText}>
        {'\n'}Differences found:{'\n'}{diffDetails.join('\n')}
      </pre>
    </div>
  )}
</>
```

**CRITICAL:** The diff details block MUST be inside the `<>...</>` fragment. Do NOT place it outside the fragment — that would produce invalid JSX because a fragment cannot have sibling elements.

**IMPORTANT:** Do NOT modify the existing `statusBanner` logic or the existing `EXPECTED OUTPUT` sidebar display. The raw expected output sidebar and raw terminal output remain unchanged. The diff details are purely additive UI.

---

### Step 4: Add CSS for diff hints in `src/app/challenge/[id]/challenge.module.css`

Add these two new CSS classes at the end of the file (before the closing of the file):

```css
/* ── Diff Details (fuzzy match failure hints) ─────────────────────── */
.diffDetails {
  margin-top: 0.5rem;
  border-top: 1px solid #333;
  padding-top: 0.5rem;
}

.diffText {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: #ff6b00;
  line-height: 1.6;
  white-space: pre-wrap;
  margin: 0;
}
```

**Rules:**
- Use `#ff6b00` for the diff text color (matches the `fail` status color already defined in the `statusBanner` object).
- Keep the monospace font family consistent with existing terminal styles.
- Do NOT add any other CSS classes or modify existing ones.

---

### Step 5: Modify `src/lib/challenges.test.js`

Find the `expectedOutput conventions` describe block:

```js
  describe('expectedOutput conventions', () => {
    it('expectedOutput does not end with a trailing newline (except empty string)', () => {
      for (const [topicKey, topic] of Object.entries(challenges)) {
        for (const tier of EXPECTED_TIERS) {
          const ch = topic.tiers[tier];
          if (ch.expectedOutput.length > 0) {
            expect(
              ch.expectedOutput,
              `"${ch.id}" expectedOutput must not end with \\n`
            ).not.toMatch(/\n$/);
          }
        }
      }
    });
  });
```

Replace it with:

```js
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
```

**Rationale:** The fuzzy matcher now normalizes trailing newlines, so the strict no-trailing-newline check is no longer needed. Replace it with a simpler non-empty check.

---

### Step 6: Run tests

Run the test suite to verify everything passes:

```bash
npx vitest run
```

**Expected outcome:**
- All existing `challenges.test.js` tests pass
- All new `matchOutput.test.js` tests pass
- No test failures

If any tests fail, fix the implementation (not the tests) until all pass.

---

## ANTI-HALLUCINATION RULES

Follow these rules strictly:

1. **Do NOT use any npm packages.** The `matchOutput.js` utility must use ONLY plain JavaScript (string methods, regex, arrays). No lodash, no diff libraries, no external packages.

2. **Do NOT use `str.replace(/\s+/g, ' ')` on the whole string.** This collapses newlines into spaces, which destroys line structure. You MUST split by `\n` first, then collapse spaces within each line using `line.replace(/ {2,}/g, ' ')`.

3. **Do NOT use `str.trim()` before splitting.** Split by `\n` first, then trim each line. The order matters: `trim() → split` would merge the first/last empty segments with adjacent lines before you can detect them.

4. **Do NOT modify the `statusBanner` object or its rendering logic.** The status banner stays exactly as-is. Diff details are purely additive.

5. **Do NOT modify the `EXPECTED OUTPUT` sidebar or `TERMINAL` raw output display.** These continue to show raw (unnormalized) values. Diff hints are a separate section.

6. **Do NOT use `===` to compare normalized strings.** Use `===` — both sides are strings from `.toLowerCase()`, so strict equality is correct. (Do NOT use localeCompare or Intl.Collator.)

7. **Do NOT add `setDiffDetails` calls anywhere other than:** (a) the output comparison block in `runCode`, (b) the `useEffect` reset, and (c) the `resetCode` function.

8. **The `diffLines` function MUST return the normalized (lowercased) versions in its output strings**, not the raw versions. This is intentional — students need to see exactly how the matcher interpreted their output.

9. **If the normalized line contains double quotes, escape them** using `line.replaceAll('"', '\\"')` before inserting into the diff string. Example: if a line is `monitor 24"`, the diff should show `expected "monitor 24\""`, not `expected "monitor 24""` which would break the format.

10. **Do NOT touch `src/lib/challenges.js` or `src/app/dashboard/page.js`.** This task only affects the matching logic, challenge page UI, and tests.

11. **Use `export function` syntax (named exports), NOT `export default`.** The imports in page.js must use: `import { matchOutput } from '@/lib/matchOutput';`

12. **The CSS class names MUST be exactly `diffDetails` and `diffText`.** Do not invent different names. They must be added to `challenge.module.css` (CSS Modules), not `globals.css`.

13. **Do NOT wrap the CSS module class references in quotes or use string literals for `styles.diffDetails`.** Use `className={styles.diffDetails}` directly — standard Next.js CSS Modules pattern.

14. **The new `const result = matchOutput(...)` in `runCode` shadows the outer `const result` from `useMemo`.** This is intentional and safe — the outer `result` is only used to destructure `challenge` earlier in the function, and `matchOutput` is called after that. Do NOT rename the variable to avoid confusion.

---

## VALIDATION CHECKLIST (run these checks after implementation)

1. `src/lib/matchOutput.js` exists and exports exactly 3 functions: `normalizeForComparison`, `matchOutput`, `diffLines`
2. `src/lib/matchOutput.test.js` exists and imports from `@/lib/matchOutput`
3. `src/app/challenge/[id]/page.js` has `import { matchOutput } from '@/lib/matchOutput'` at the top
4. `src/app/challenge/[id]/page.js` has `diffDetails` state variable
5. `src/app/challenge/[id]/page.js` renders diff hints when `execStatus === 'fail'` and `diffDetails.length > 0`
6. `src/app/challenge/[id]/challenge.module.css` has `.diffDetails` and `.diffText` classes
7. `src/lib/challenges.test.js` no longer checks for trailing newlines in expectedOutput
8. Run `npx vitest run` — ALL tests pass (both old and new)
9. The strict `actual === expected` comparison is GONE from `page.js` — replaced by `matchOutput()` call
10. No files other than the 4 listed in the header were modified

---

## EDGE CASES TO WATCH

1. **Challenges with intentional column alignment** (e.g., Finance Tracker with `|` columns) — Multiple spaces will collapse to single spaces after normalization. This is acceptable per the spec.

2. **Challenges with `%.2f` format specifiers** — `15.00` vs `15` will NOT match (numbers must match exactly). The student needs to fix their printf format. This is correct behavior.

3. **C programs that read via scanf** — Expected output comparison is on stdout only. stdin handling is separate and unaffected.

4. **Wandbox API output quirks** — Platform-specific trailing newlines are handled by the normalization. If Wandbox returns `\r\n` line endings, `.trim()` on each line already removes the trailing `\r` after splitting by `\n`, so no extra handling is needed.

5. **Unicode characters in output** (e.g., `✓`, `✗`, `→`) — Must match exactly. The normalization only lowercases ASCII letters and collapses ASCII spaces.

---

## FILES TO MODIFY (summary)

| File | Action | What to do |
|------|--------|------------|
| `src/lib/matchOutput.js` | CREATE | New utility module with 3 exported functions |
| `src/lib/matchOutput.test.js` | CREATE | Unit tests for the matching utility |
| `src/app/challenge/[id]/page.js` | EDIT | Add import, state variable, replace comparison logic, render diff hints |
| `src/app/challenge/[id]/challenge.module.css` | EDIT | Add 2 new CSS classes for diff display |
| `src/lib/challenges.test.js` | EDIT | Replace trailing-newline test with non-empty check |

**Total: 2 new files, 3 modified files.**

---

## DECISION LOG

| Decision | Answer |
|----------|--------|
| Matching approach | Whitespace normalization + case-insensitive (toLower) |
| Numeric tolerance | None — exact match required after normalization |
| Unicode handling | Preserved as-is — no normalization |
| Diff display | Line-by-line, showing normalized values, orange (#ff6b00) monospace text |
| Diff location | Below the raw output in the terminal area, only on fail |
| Sidebar changes | None — expected output sidebar unchanged |
| New dependencies | None — plain JavaScript only |
| Test framework | Vitest (already installed) |
| CSS approach | CSS Modules (existing pattern in the project) |
