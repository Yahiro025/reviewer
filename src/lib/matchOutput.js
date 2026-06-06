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
export function normalizeForComparison(str) {
  if (str == null) return '';

  return str
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => line.replace(/ {2,}/g, ' '))
    .join('\n')
    .toLowerCase();
}

/**
 * Escapes double quotes in a string for safe inclusion in a quoted diff string.
 *
 * @param {string} str - The string to escape
 * @returns {string} - The escaped string
 */
function escapeQuotes(str) {
  return str.replaceAll('"', '\\"');
}

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
export function diffLines(expected, actual) {
  const normExpected = normalizeForComparison(expected);
  const normActual = normalizeForComparison(actual);

  const expectedLines = normExpected.split('\n');
  const actualLines = normActual.split('\n');

  const maxLen = Math.max(expectedLines.length, actualLines.length);
  const diffs = [];

  for (let i = 0; i < maxLen; i++) {
    const expLine = i < expectedLines.length ? expectedLines[i] : '';
    const actLine = i < actualLines.length ? actualLines[i] : '';

    if (expLine !== actLine) {
      diffs.push(
        `  Line ${i + 1}: expected "${escapeQuotes(expLine)}", got "${escapeQuotes(actLine)}"`
      );
    }
  }

  return diffs;
}

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
  const normExpected = normalizeForComparison(expected);
  const normActual = normalizeForComparison(actual);

  // 2. Compare normalized strings
  if (normExpected === normActual) {
    return { match: true, details: [] };
  }

  // 3. If not equal, call diffLines to build details
  const details = diffLines(expected, actual);

  return { match: false, details };
}
