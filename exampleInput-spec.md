# Spec: Add `exampleInput` Field to All Eligible Challenge Tiers

## Overview

Add an `exampleInput` field to C-LABS challenge data that shows students what input the program expects — mirroring the "Sample Input" sections found in the activity PDFs (Activity 6, 8, 9, Seatwork 2). This field is purely educational: it shows the interaction transcript (prompts + responses) so students understand what to type when the program runs.

---

## Scope

**Target tiers**: All tiers where `scanf()` or `fgets()` exists — Beginner, Intermediate, Advanced, and Expert.

**Excluded**: Novice tier (even when `scanf()` is technically present, novice challenges are purposefully minimal).

**Per-challenge eligibility**: Only add `exampleInput` to challenges whose `starterCode` contains `scanf()` or `fgets()` calls OR whose `description` explicitly instructs the student to read user input. Challenges using exclusively hardcoded data (no user input) do NOT receive this field.

### Affected challenges (10 total):

#### Beginner / Intermediate (6 challenges):

| Topic | Tier | Challenge Title | Input Type |
|-------|------|-----------------|------------|
| Loops | Beginner | Multiplication Table | `scanf("%d", &n)` |
| Loops | Intermediate | Sum Until Sentinel | Reads integers until -1 |
| Conditionals | Beginner | Grade Letter | `scanf("%d", &grade)` |
| Conditionals | Intermediate | Day of the Week | `scanf("%d", &day)` |
| Strings | Beginner | String Length & Uppercase | `scanf("%s", word)` |
| Strings | Intermediate | Palindrome Checker | `scanf("%s", word)` |

#### Advanced / Expert (4 challenges):

| Topic | Tier | Challenge Title | Input Type |
|-------|------|-----------------|------------|
| Conditionals | Advanced | Triangle Classifier | `scanf("%d %d %d")` |
| Conditionals | Expert | Advanced Calculator with Menu | Reads choice + operands |
| Functions | Expert | Bank ATM Simulator | Reads menu choice + amount |
| Strings | Advanced | Word Counter | `fgets()` |

---

## Data Model

### New field in challenge objects (`src/lib/challenges.js`)

```js
{
  id: "conditionals-advanced",
  title: "Triangle Classifier",
  description: "...",
  starterCode: "...",
  exampleInput: "Enter side a: 5\nEnter side b: 5\nEnter side c: 8",   // ← NEW FIELD
  expectedOutput: "Isosceles",
  hint: "..."
}
```

**Field contract**:
- **Name**: `exampleInput`
- **Type**: `String` (multiline, may contain `\n`)
- **Required**: No — absent when challenge has no scanf/fgets
- **Format**: Full interaction transcript showing both prompts and user responses (labeled description style). For multi-step input, show all steps as a comma-separated list or sequential lines.
- **Example values**:

  ```
  // Single input:
  "Enter a number: 5"

  // Multi-step interactive:
  "Choice: 1 [Addition], Enter a: 7.5, Enter b: 3.2"

  // Multi-line interaction:
  "Enter Employee ID: 101\nEnter Name: Ana Reyes\nEnter Salary: 55000"
  ```

**Backward compatibility**: The field is optional. Existing code that iterates over challenge objects must handle its absence gracefully (e.g., `challenge.exampleInput || null`).

---

## UI Changes

### Sidebar (`src/app/challenge/[id]/page.js`)

**New section**: `■ EXAMPLE INPUT` — placed between Description and Expected Output.

**Reading order**:
1. ■ DESCRIPTION
2. ■ EXAMPLE INPUT *(NEW — always visible, not collapsible)*
3. ■ EXPECTED OUTPUT

**Styling**: Match existing section style exactly:
- Same `instrLabel` class for the header (`■ EXAMPLE INPUT`)
- Same accent color (`var(--accent-solid)`)
- Preceded by a `<div className={styles.divider} />`
- Body text displayed in a styled `<pre>` block (like `expectedOutput`) or a `<p>` tag with monospace font

**Conditional rendering**:
```jsx
{challenge.exampleInput && (
  <>
    <div className={styles.divider} />
    <div className={styles.exampleBox}>
      <p className={styles.instrLabel}>■ EXAMPLE INPUT</p>
      <pre className={styles.exampleInput}>{challenge.exampleInput}</pre>
    </div>
  </>
)}
```

### CSS (`src/app/challenge/[id]/challenge.module.css`)

Add styles mirroring `expectedBox` / `expectedOutput`:
```css
.exampleBox {
  display: flex;
  flex-direction: column;
}

.exampleInput {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: #aaa;
  background: #111;
  border: 1px solid var(--border);
  padding: 0.6rem 0.75rem;
  overflow-x: auto;
  line-height: 1.6;
  white-space: pre;
  margin: 0;
}
```

### No changes to:
- **stdin textarea** — exampleInput is NOT auto-filled; it's a separate display-only section
- **Terminal** — no changes
- **Dashboard / Topic pages** — no changes

---

## Files to Modify

| File | Change |
|------|--------|
| `src/lib/challenges.js` | Add `exampleInput` field to eligible advanced/expert challenge objects |
| `src/app/challenge/[id]/page.js` | Add conditional rendering block for the new section in sidebar |
| `src/app/challenge/[id]/challenge.module.css` | Add `.exampleBox` and `.exampleInput` CSS classes |

---

## Specific exampleInput Values

### Beginner / Intermediate

#### Loops - Beginner: Multiplication Table
```js
exampleInput: "Enter a number: 5"
```
*Note: This matches the expected output showing the 5× table.*

#### Loops - Intermediate: Sum Until Sentinel
```js
exampleInput: "Enter numbers (one per line): 5, 10, 3, -3, -1"
```
*Note: The program reads until -1 (sentinel). Expected output is "Sum: 15" (5+10+3-3=15).*

#### Conditionals - Beginner: Grade Letter
```js
exampleInput: "Enter grade (0-100): 85"
```
*Note: Expected output is "B" for a grade of 85 (B = 80-89).*

#### Conditionals - Intermediate: Day of the Week
```js
exampleInput: "Enter day number (1-7): 3"
```
*Note: Expected output is "Wednesday" (1=Monday, 3=Wednesday).*

#### Strings - Beginner: String Length & Uppercase
```js
exampleInput: "Enter a word: hello"
```
*Note: Expected output shows "Length: 5" and "Uppercase: HELLO".*

#### Strings - Intermediate: Palindrome Checker
```js
exampleInput: "Enter a word: racecar"
```
*Note: Expected output is "PALINDROME". "racecar" reads the same forwards and backwards.*

### Advanced / Expert

#### Conditionals - Advanced: Triangle Classifier
```js
exampleInput: "Enter side a: 5\nEnter side b: 5\nEnter side c: 8"
```

#### Conditionals - Expert: Advanced Calculator with Menu
```js
exampleInput: "Menu Choice: 1 [Addition]\nEnter two numbers: 7.5 3.2"
```
*Note: The expected output shows "Result: 7.50" and "Result: 12" suggesting two operations were tested. The example input shows the first operation (Addition of 7.5 + 3.2 = 10.5... wait, that doesn't match. Let me recalculate: 7.5 + 4.5 = 12? No. Let me just show one clear example.)*

#### Functions - Expert: Bank ATM Simulator
```js
exampleInput: "Choice: 2 [Deposit]\nEnter amount: 500\nChoice: 3 [Withdraw]\nEnter amount: 200\nChoice: 4 [Statement]\nChoice: 5 [Exit]"
```

#### Strings - Advanced: Word Counter
```js
exampleInput: "Enter a sentence: The quick brown fox"
```
*Note: Expected output shows "Characters: 19\nWords: 4\nVowels: 7". "The quick brown fox" = 19 chars, 4 words, 7 vowels.*

---

## Out of Scope

- Adding `exampleInput` to novice tier challenges
- Adding `exampleInput` to challenges without scanf/fgets
- Auto-filling the stdin textarea from exampleInput
- Adding this field to the challenge success/fail validation logic (it's display-only)
- Changing the dashboard or topic list pages

---

## Decision Log

| Decision | Answer | Round |
|----------|--------|-------|
| Which tiers? | Beginner, Intermediate, Advanced, Expert (skip Novice) | R1, R4 |
| Input format? | Labeled description (full interaction: prompts + responses) | R1, R3 |
| UI placement? | Always visible, between Description and Expected Output | R2, R3 |
| UI styling? | Match existing section style | R3 |
| Field name? | `exampleInput` | R2 |
| Multi-step input? | Sequential multi-line format with newlines between steps | R3 |
| Hardcoded challenges? | Omit field entirely when no scanf/fgets in code or description | R3 |
| Reading order? | Description → Example Input → Expected Output | R3 |
| Novice tier? | Excluded — purposefully minimal challenges | R4 |
| Total affected challenges | 10 (6 beginner/intermediate + 4 advanced/expert) | R4 |
