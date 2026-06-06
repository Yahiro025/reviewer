# Spec: Add 3 New Topics + Review Existing Topics

> **Target model**: DeepSeek V4 Pro  
> **File to edit**: `src/lib/challenges.js`  
> **Secondary file**: `src/app/dashboard/page.js` (update `TOPIC_ORDER` array only)

---

## TASK OVERVIEW

You must do two things:
1. **ADD** 3 new topic objects to `challenges.js` (searching, predefined-functions, nested-structures)
2. **UPDATE** all 9 existing topic objects: change `number` fields, review titles/descriptions for realism, add missing `exampleInput` fields

After your changes, the file must contain exactly **12 topics × 5 tiers = 60 challenge objects**.

---

## STEP-BY-STEP EXECUTION PLAN

Execute these steps in order. Do NOT skip steps.

### Step 1: Update existing topic `number` fields

Change ONLY the `number` property of each existing topic. Do NOT change any challenge content yet.

| Topic Key | Old Number | New Number |
|-----------|-----------|-----------|
| `arrays` | `"01"` | `"01"` (no change) |
| `loops` | `"02"` | `"03"` |
| `conditionals` | `"03"` | `"04"` |
| `functions` | `"04"` | `"06"` |
| `pointers` | `"05"` | `"07"` |
| `structures` | `"06"` | `"08"` |
| `strings` | `"07"` | `"11"` |
| `struct-arrays` | `"08"` | `"10"` |
| `file-handling` | `"09"` | `"12"` |

### Step 2: Add missing `exampleInput` to existing challenges

Scan every existing challenge. If `starterCode` contains `scanf` or `fgets` AND the challenge does NOT already have an `exampleInput` field, add one.

Use this format for `exampleInput`:
```
exampleInput: "Prompt text: value\nNext prompt: value"
```

Check these specific challenges (they use scanf/fgets but may be missing exampleInput):
- `conditionals-novice` — has scanf, check if exampleInput exists
- `pointers-beginner` — no scanf (hardcoded), skip
- `pointers-intermediate` — no scanf (hardcoded), skip

### Step 3: Add 3 new topic objects

Insert these into the `challenges` object in this exact position:
- `searching` → after `arrays`
- `predefined-functions` → after `conditionals`, before `functions`
- `nested-structures` → after `structures`, before `strings`

### Step 4: Update `TOPIC_ORDER` in dashboard

In `src/app/dashboard/page.js`, update the array to:
```js
const TOPIC_ORDER = [
  'arrays', 'searching', 'loops', 'conditionals', 'predefined-functions',
  'functions', 'pointers', 'structures', 'nested-structures',
  'struct-arrays', 'strings', 'file-handling',
];
```

### Step 5: Verify

Count all challenge objects. Must be exactly 60. Count all topics. Must be exactly 12.

---

## EXACT TEMPLATE: How Each Challenge Object Must Look

Use this existing challenge as your **exact formatting reference**. Match its style precisely — same indentation, same quote style, same structure:

```js
novice: {
  id: "arrays-novice",
  title: "Print First & Last",
  description: "Declare an array of 5 integers with hardcoded values. Print only the first element and the last element.",
  starterCode: `#include <stdio.h>\n\nint main() {\n    int arr[5] = {10, 20, 30, 40, 50};\n\n    // TODO: Print the first element\n    // TODO: Print the last element\n\n    return 0;\n}`,
  expectedOutput: "10\n50",
  hint: "Use index 0 for the first element and index 4 for the last.",
},
```

**Rules for ALL challenge objects:**
- `id` format: `"{topic-key}-{tier}"` — e.g., `"searching-novice"`
- `title`: Short, descriptive, title case
- `description`: 1-3 sentences. State what to do. Include hardcoded values if relevant.
- `starterCode`: Template literal (backticks). Include `#include <stdio.h>`. Use `// TODO:` comments for student tasks. Must NOT contain the solution.
- `exampleInput` (OPTIONAL): Only add if `starterCode` contains `scanf` or `fgets`. Format: labeled prompts with values, separated by `\n`.
- `expectedOutput`: Exact string that `printf` would produce. Use `\n` for newlines. No trailing newline.
- `hint`: 1 sentence. Reference specific C syntax.

---

## NEW TOPIC 1: `searching`

```js
searching: {
  title: "Searching in Arrays",
  number: "02",
  description: "Learn to search for elements in arrays using linear search, binary search, and multi-criteria lookup techniques.",
  tiers: {
    // ... 5 challenges defined below
  }
}
```

### Tier: novice
- **id**: `"searching-novice"`
- **title**: `"Find a Number"`
- **description**: `"Given an array of 5 integers {10, 20, 30, 40, 50} and a target value 30, check if the target exists in the array. Print 'FOUND' if it exists, otherwise print 'NOT FOUND'."`
- **starterCode**: Include `#include <stdio.h>`, hardcode `int arr[5] = {10, 20, 30, 40, 50}` and `int target = 30`. Add TODO comments for the search loop.
- **expectedOutput**: `"FOUND"`
- **hint**: `"Loop through each element with a for loop and compare arr[i] with the target."`

### Tier: beginner
- **id**: `"searching-beginner"`
- **title**: `"Find the Index"`
- **description**: `"Given an array of 6 integers {10, 20, 25, 30, 35, 40} and a target value 25, use linear search to find the target. Print the 0-based index if found, or 'NOT FOUND' if not."`
- **starterCode**: Hardcode array `{10, 20, 25, 30, 35, 40}`, target `25`. TODO: loop and compare.
- **expectedOutput**: `"Target 25 found at index 2"`
- **hint**: `"Use a for loop. When arr[i] equals target, print i and break."`

### Tier: intermediate
- **id**: `"searching-intermediate"`
- **title**: `"Count Occurrences"`
- **description**: `"Given an array of 10 integers {3, 5, 7, 5, 9, 2, 5, 8, 1, 5} and a target value 5, count how many times the target appears and print all positions (1-based index)."`
- **starterCode**: Hardcode array `{3, 5, 7, 5, 9, 2, 5, 8, 1, 5}`, target `5`. TODO: scan entire array, count matches, print positions.
- **expectedOutput**: `"Value 5 appears 4 times at positions: 2, 4, 7, 10"`
- **hint**: `"Don't break at first match. Use a counter and print (i+1) for 1-based positions."`

### Tier: advanced
- **id**: `"searching-advanced"`
- **title**: `"Binary Search in Sorted Array"`
- **description**: `"Given a sorted array of 10 integers {2, 5, 8, 12, 16, 23, 38, 47, 56, 72} and a target value 47, implement binary search. Print the 0-based index if found, the number of comparisons made, or 'NOT FOUND' if not in the array."`
- **starterCode**: Hardcode sorted array `{2, 5, 8, 12, 16, 23, 38, 47, 56, 72}`, target `47`. TODO: implement binary search with comparison counter.
- **expectedOutput**: `"Found 47 at index 7 (3 comparisons)"`
- **hint**: `"Use low=0, high=9. Each iteration: mid = (low+high)/2, compare, then adjust low or high. Count each comparison."`

### Tier: expert
- **id**: `"searching-expert"`
- **title**: `"Student Contact Lookup System"`
- **description**: `"Build a student contact lookup system. Create a Student structure with fields: id (int), name (char[50]), phone (char[15]), course (char[30]). Use an array of 8 hardcoded students sorted by ID. Implement these functions:\n1. searchByID(int id) — binary search by student ID, print full details\n2. searchByName(char *name) — linear search, case-insensitive partial match using strstr()\n3. searchByCourse(char *course) — find all students in a given course\n4. compareSearchMethods() — search for the same ID using linear and binary search, print comparison count for each\nDemonstrate all functions in main with clear labels."`
- **starterCode**: Define Student struct, hardcoded array of 8 students sorted by ID. Function stubs with TODO. Includes: `<stdio.h>`, `<string.h>`, `<ctype.h>`, `<strings.h>`.
- **expectedOutput**: Must show all 4 function outputs with labels. Example:
  ```
  --- Search by ID (Binary) ---
  ID: 104 | Juan Dela Cruz | 09171234567 | Computer Science

  --- Search by Name ---
  Found: Ana Reyes (ID: 101)

  --- Students in Computer Science ---
  ID: 104 | Juan Dela Cruz
  ID: 107 | Maria Santos

  --- Search Method Comparison ---
  Linear search: 4 comparisons
  Binary search: 3 comparisons
  ```
- **hint**: `"For binary search, the array is pre-sorted by ID. For name search, convert both strings to lowercase before using strstr(). For comparison counting, increment a counter each time you compare."`
- **NO exampleInput** (all hardcoded data, no scanf/fgets)

---

## NEW TOPIC 2: `predefined-functions`

```js
"predefined-functions": {
  title: "Predefined Functions",
  number: "05",
  description: "Explore C's powerful standard library — from formatted I/O and string manipulation to math operations and character classification.",
  tiers: {
    // ... 5 challenges defined below
  }
}
```

### Tier: novice
- **id**: `"predefined-functions-novice"`
- **title**: `"Character Inspector"`
- **description**: `"Given a hardcoded character 'a', use ctype.h functions to check and print: whether it is a letter, whether it is a digit, whether it is uppercase, and print its uppercase version."`
- **starterCode**: `#include <stdio.h>`, `#include <ctype.h>`. Hardcode `char ch = 'a'`. TODO: use isalpha, isdigit, isupper, toupper.
- **expectedOutput**:
  ```
  Character: 'a'
  Is letter: Yes
  Is digit: No
  Uppercase: A
  ```
- **hint**: `"Use isalpha(ch) which returns non-zero if letter. Use toupper(ch) to convert."`

### Tier: beginner
- **id**: `"predefined-functions-beginner"`
- **title**: `"String Toolkit"`
- **description**: `"Given two hardcoded strings 'Hello' and 'World', use string.h functions to print: length of each string, concatenated result, comparison result (which comes first alphabetically), and whether 'World' is found inside the concatenated string."`
- **starterCode**: `#include <stdio.h>`, `#include <string.h>`. Hardcode `char str1[] = "Hello"` and `char str2[] = "World"`. TODO: use strlen, strcat (into buffer), strcmp, strstr.
- **expectedOutput**:
  ```
  Length of 'Hello': 5
  Length of 'World': 5
  Concatenated: HelloWorld
  'Hello' comes before 'World'
  'World' found in 'HelloWorld': Yes
  ```
- **hint**: `"strcmp returns negative if first < second. strstr returns NULL if not found. Use a buffer[100] for concatenation."`

### Tier: intermediate
- **id**: `"predefined-functions-intermediate"`
- **title**: `"Math Operations Suite"`
- **description**: `"Given two hardcoded numbers a=14.7 and b=3.2, use math.h to compute and print: sqrt(a), pow(a, b), ceil(a), floor(a), fabs(-8.5), and fmod(a, b). Print all results with 2 decimal places."`
- **starterCode**: `#include <stdio.h>`, `#include <math.h>`. Hardcode `double a = 14.7, b = 3.2`. TODO: compute and print each operation.
- **expectedOutput**:
  ```
  sqrt(14.70) = 3.83
  pow(14.70, 3.20) = 4528.47
  ceil(14.70) = 15.00
  floor(14.70) = 14.00
  fabs(-8.50) = 8.50
  fmod(14.70, 3.20) = 1.90
  ```
- **hint**: `"Use %.2f for all printf formats. Include math.h. pow(base, exp) returns double."`
- **IMPORTANT**: Verify these math values are correct for the given inputs. `pow(14.7, 3.2)` should be approximately 4528.47. `fmod(14.7, 3.2)` should be approximately 1.90. Double-check before finalizing.

### Tier: advanced
- **id**: `"predefined-functions-advanced"`
- **title**: `"Random Quiz Generator"`
- **description**: `"Build a math quiz generator. Use srand(time(NULL)) and rand() to generate 5 random math questions (addition with numbers 1-50). Display each question, read the user's answer via scanf, track the score, and print a summary at the end."`
- **starterCode**: `#include <stdio.h>`, `#include <stdlib.h>`, `#include <time.h>`. TODO: seed random, generate questions, read answers, track score.
- **exampleInput**: `"17\n42\n8\n35\n29"` (5 answers the user would type)
- **expectedOutput**: (Note: random numbers vary, so use a conditional example)
  ```
  Q1: 12 + 17 = ? Your answer: 29 ✓
  Q2: 8 + 34 = ? Your answer: 42 ✓
  Q3: 25 + 6 = ? Your answer: 31 ✓
  Q4: 3 + 45 = ? Your answer: 48 ✓
  Q5: 19 + 10 = ? Your answer: 29 ✓
  Score: 5/5 — EXCELLENT!
  ```
- **hint**: `"Use rand() % 50 + 1 for each operand. Use srand(time(NULL)) once at the start of main."`
- **IMPORTANT NOTE**: Since this uses random numbers, the expectedOutput cannot be exact. Set expectedOutput to a representative example showing the format. The actual numbers will vary per run.

### Tier: expert
- **id**: `"predefined-functions-expert"`
- **title**: `"Document Analyzer"`
- **description**: `"Build a text analysis tool using a hardcoded paragraph. Implement these functions using string.h, ctype.h, and stdlib.h:\n1. wordCount(char *text) — count total words\n2. charFrequency(char *text) — count frequency of each vowel (a, e, i, o, u, case-insensitive)\n3. findLongestWord(char *text) — find and print the longest word\n4. replaceWord(char *text, char *old, char *new, char *result) — replace all occurrences of old with new in text\n5. extractNumbers(char *text) — find and print all numeric tokens\nUse strtok, strstr, strlen, strcpy, strcat, strcmp, isdigit, tolower extensively. Demonstrate all functions in main."`
- **starterCode**: `#include <stdio.h>`, `#include <string.h>`, `#include <ctype.h>`, `#include <stdlib.h>`. Hardcode a paragraph of ~40 words. Function stubs with TODO.
- **expectedOutput**: Must show all 5 function results with clear labels.
- **hint**: `"Use strtok(text, ' ') to split into words. For replace, scan with strstr and build result string. For numbers, check each token character with isdigit()."`

---

## NEW TOPIC 3: `nested-structures`

```js
"nested-structures": {
  title: "Nested Structure",
  number: "09",
  description: "Learn to model complex real-world data by nesting structures within structures and combining them with arrays.",
  tiers: {
    // ... 5 challenges defined below
  }
}
```

### Tier: novice
- **id**: `"nested-structures-novice"`
- **title**: `"Point with Color"`
- **description**: `"Define a Color structure with fields r, g, b (all int). Define a ColoredPoint structure with fields x (int), y (int), and c (Color). Create one ColoredPoint with x=3, y=7, and color RGB(255, 128, 0). Print the point coordinates and color values."`
- **starterCode**: `#include <stdio.h>`. Define both structs. Hardcode one instance. TODO: print using nested access.
- **expectedOutput**:
  ```
  Point: (3, 7)
  Color: RGB(255, 128, 0)
  ```
- **hint**: `"Access nested fields with dot notation: point.c.r, point.c.g, point.c.b."`

### Tier: beginner
- **id**: `"nested-structures-beginner"`
- **title**: `"Student with Address"`
- **description**: `"Define an Address structure with fields: street[50], city[30], zipCode[10]. Define a Student structure with fields: name[50], grade (int), and addr (Address). Create one student: Ana Reyes, grade 92, address '123 Main St, Quezon City, 1100'. Print all details including the nested address."`
- **starterCode**: `#include <stdio.h>`, `#include <string.h>`. Define both structs. Hardcode one student. TODO: print all fields.
- **expectedOutput**:
  ```
  Student: Ana Reyes
  Grade: 92
  Address: 123 Main St, Quezon City, 1100
  ```
- **hint**: `"Initialize with nested braces: {\"Ana Reyes\", 92, {\"123 Main St\", \"Quezon City\", \"1100\"}}."`

### Tier: intermediate
- **id**: `"nested-structures-intermediate"`
- **title**: `"Employee with Department"`
- **description**: `"Define a Department structure with fields: deptName[30], floor (int). Define an Employee structure with fields: name[50], id (int), salary (float), dept (Department). Create 3 employees:\n- ID 101, Ana Reyes, 45000.00, Engineering, Floor 3\n- ID 102, Ben Cruz, 38000.00, Marketing, Floor 1\n- ID 103, Cara Lim, 52000.00, Engineering, Floor 3\nPrint a formatted roster showing all employees. Then find and print the employee with the highest salary."`
- **starterCode**: `#include <stdio.h>`. Define both structs. Hardcode 3 employees. TODO: print roster, find highest salary.
- **expectedOutput**:
  ```
  --- Employee Roster ---
  ID: 101 | Ana Reyes | 45000.00 | Engineering (Floor 3)
  ID: 102 | Ben Cruz | 38000.00 | Marketing (Floor 1)
  ID: 103 | Cara Lim | 52000.00 | Engineering (Floor 3)

  Highest Paid: Cara Lim — 52000.00
  ```
- **hint**: `"Access nested fields: employees[i].dept.deptName. Compare salaries in a loop to find the maximum."`

### Tier: advanced
- **id**: `"nested-structures-advanced"`
- **title**: `"Course Enrollment Manager"`
- **description**: `"Define a Course structure with fields: code[10], title[50], units (int), grade (float). Define a Student structure with fields: name[50], id (int), courses[4] (Course array), courseCount (int), gpa (float). Create 3 students with 2-4 courses each:\n- Student 1: Ana Reyes (ID: 101) — CS101 (3 units, 3.5), MATH201 (4 units, 3.0), ENG101 (2 units, 3.7)\n- Student 2: Ben Cruz (ID: 102) — CS101 (3 units, 2.5), CS201 (3 units, 2.0)\n- Student 3: Cara Lim (ID: 103) — MATH201 (4 units, 3.8), CS201 (3 units, 3.9), ENG101 (2 units, 3.5), CS301 (3 units, 4.0)\nImplement:\n1. computeGPA() — weighted average: sum(grade * units) / sum(units)\n2. findDeansList() — print students with GPA >= 3.5\n3. printTranscript(int idx) — print full formatted transcript for student at index idx\nDemonstrate all functions in main."`
- **starterCode**: `#include <stdio.h>`. Define both structs. Hardcode students with courses. Function stubs with TODO.
- **expectedOutput**:
  ```
  --- Student GPAs ---
  Ana Reyes: GPA 3.34
  Ben Cruz: GPA 2.25
  Cara Lim: GPA 3.85

  --- Dean's List (GPA >= 3.5) ---
  Cara Lim — GPA 3.85

  --- Transcript: Ana Reyes (ID: 101) ---
  CS101 - Introduction to Programming | 3 units | Grade: 3.50
  MATH201 - Calculus II | 4 units | Grade: 3.00
  ENG101 - English Composition | 2 units | Grade: 3.70
  GPA: 3.34
  ```
- **hint**: `"GPA = sum(grade * units) / sum(units). Use nested loops: outer for students, inner for their courses."`

### Tier: expert
- **id**: `"nested-structures-expert"`
- **title**: `"School Enrollment System"`
- **description**: `"Build a school enrollment system with nested structures:\n\nSchedule: day[10], startTime[6], endTime[6], room[10]\nCourse: code[10], title[50], units (int), schedule[3] (Schedule array), scheduleCount (int)\nStudent: name[50], id (int), courses[5] (Course array), courseCount (int)\n\nCreate 4 students and 6 available courses with schedules. Implement:\n1. enrollStudent(Student *s, Course c) — add course if no time conflict and space available\n2. dropCourse(Student *s, char *code) — remove course by code\n3. printSchedule(Student *s) — display formatted weekly schedule with times and rooms\n4. findConflicts(Student students[], int n) — check all students for time conflicts\n5. departmentLoad(Student students[], int n) — count enrollments per course code\n\nDemonstrate enrollment, dropping, schedule printing, conflict detection, and load report in main."`
- **starterCode**: Define all 3 structs. Hardcode 4 students and 6 courses. Function stubs with TODO. Includes: `<stdio.h>`, `<string.h>`.
- **expectedOutput**: Must demonstrate all 5 functions with clear section labels.
- **hint**: `"For time conflicts: same day AND overlapping time ranges = conflict. Overlap check: start1 < end2 AND start2 < end1. Use strcmp for day and code matching."`

---

## ANTI-HALLUCINATION RULES

Follow these rules strictly:

1. **ONLY use functions from headers you include.** Do NOT call strlen without `#include <string.h>`, etc.
2. **Do NOT use `math.h` functions unless the challenge explicitly requires it.** The execution environment may not link `-lm` by default.
3. **expectedOutput must be EXACTLY what the C code would print.** Trace through the code mentally. Do NOT guess.
4. **Do NOT add `#include <stdlib.h>` unless the challenge uses `rand()`, `srand()`, `atoi()`, `abs()`, or `malloc()`.**
5. **Do NOT use `strcasecmp()` — it's POSIX, not standard C.** Use `tolower()` on each character instead.
6. **Do NOT use Variable Length Arrays (VLAs).** Use fixed-size arrays with constant sizes.
7. **All string comparisons in starter code must use `strcmp()` or manual character comparison, NOT `==`.**
8. **For the Advanced Quiz Generator**: Since it uses `rand()`, the expectedOutput cannot be deterministic. Set expectedOutput to a representative example format, and note this in a comment.
9. **For GPA calculations**: Use `float` not `double` for consistency with existing code. Round to 2 decimal places in printf with `%.2f`.
10. **starterCode must NOT contain the solution.** Only `#include` directives, struct definitions, variable declarations with hardcoded values, and `// TODO:` comments.

---

## VALIDATION CHECKLIST (run these checks after implementation)

1. Count topics in `challenges` object → must be 12
2. Count total challenge objects → must be 60 (12 × 5)
3. Verify every challenge has: `id`, `title`, `description`, `starterCode`, `expectedOutput`, `hint`
4. Verify `id` format: `"{topic-key}-{tier}"` for all 60
5. Verify no duplicate `id` values
6. Verify `TOPIC_ORDER` in `dashboard/page.js` has exactly 12 entries matching the topic keys
7. Verify `number` fields: arrays=01, searching=02, loops=03, conditionals=04, predefined-functions=05, functions=06, pointers=07, structures=08, nested-structures=09, struct-arrays=10, strings=11, file-handling=12
8. Run `npm run build` to verify no syntax errors

---

## FILES TO MODIFY

| File | What to change |
|------|----------------|
| `src/lib/challenges.js` | Add 3 new topic objects, update 9 `number` fields, add missing `exampleInput` |
| `src/app/dashboard/page.js` | Update `TOPIC_ORDER` array (line ~10) to include 3 new keys |

---

## DECISION LOG

| Decision | Answer |
|----------|--------|
| Scope | Add 3 missing topics + review existing for PDF style |
| PDF style | Apply to ALL topics (realistic scenarios, Filipino names) |
| Numbering | Insert in logical C curriculum order (12 topics) |
| Search algorithms | Linear + binary + multi-criteria |
| Predefined functions | Broad: stdio, stdlib, string, math, ctype |
| Nested structures | Nesting + composition (struct-in-struct + arrays of nested structs) |
| Expert domains | Real-world: Student Contact Lookup, Document Analyzer, School Enrollment |
| Input approach | Novice-Beginner: hardcoded. Intermediate+: mix of hardcoded and scanf |
| exampleInput | Add to ALL scanf/fgets challenges across all topics |
| Title changes | Allowed for PDF-style alignment |
