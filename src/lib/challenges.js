// All 9 topics with 5 difficulty tiers each (45 challenges total)
const challenges = {
  arrays: {
    title: "Arrays",
    number: "01",
    description: "Learn to store and manipulate collections of data using C arrays.",
    tiers: {
      novice: {
        id: "arrays-novice",
        title: "Print First & Last",
        description: "Declare an array of 5 integers with hardcoded values. Print only the first element and the last element.",
        starterCode: `#include <stdio.h>

int main() {
    int arr[5] = {10, 20, 30, 40, 50};

    // TODO: Print the first element
    // TODO: Print the last element

    return 0;
}`,
        expectedOutput: "10\n50",
        hint: "Use index 0 for the first element and index 4 for the last.",
      },
      beginner: {
        id: "arrays-beginner",
        title: "Replace Negatives with Zero",
        description: "Given an array of 5 integers (some may be negative), write a loop to check each number. If the number is negative, replace it with 0. Print the final array, one element per line.",
        starterCode: `#include <stdio.h>

int main() {
    int arr[5] = {3, -7, 5, -2, 8};

    // TODO: Loop through the array and replace negatives with 0
    // TODO: Print the final array

    return 0;
}`,
        expectedOutput: "3\n0\n5\n0\n8",
        hint: "Use an if statement inside your loop: if (arr[i] < 0) arr[i] = 0;",
      },
      intermediate: {
        id: "arrays-intermediate",
        title: "Even & Odd Sum Comparison",
        description: "Given an array of 10 integers, calculate the total sum of all even numbers and the total sum of all odd numbers. Print both sums, then print which is larger (or 'EQUAL' if they are the same).",
        starterCode: `#include <stdio.h>

int main() {
    int arr[10] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    int evenSum = 0, oddSum = 0;

    // TODO: Loop and accumulate even/odd sums
    // TODO: Print results and comparison

    return 0;
}`,
        expectedOutput: "Even Sum: 30\nOdd Sum: 25\nEven is larger",
        hint: "Use the modulus operator (%) to check if a number is even or odd.",
      },
      advanced: {
        id: "arrays-advanced",
        title: "In-Place Array Reversal",
        description: "Write a program that reverses the elements of an array of 6 integers without using a second array. You must swap elements in-place. Print the original array, then the reversed array.",
        starterCode: `#include <stdio.h>

int main() {
    int arr[6] = {1, 2, 3, 4, 5, 6};

    // TODO: Print original array
    // TODO: Reverse in-place using a temp variable and a loop
    // TODO: Print reversed array

    return 0;
}`,
        expectedOutput: "Original: 1 2 3 4 5 6\nReversed: 6 5 4 3 2 1",
        hint: "Loop from i=0 to i<n/2, swapping arr[i] with arr[n-1-i].",
      },
      expert: {
        id: "arrays-expert",
        title: "Class Performance Analyzer",
        description: "You are building an academic performance tool. Given an array of 8 student grades, implement the following in separate logical sections: (1) Compute and display the class average (2 decimal places), (2) Identify and display the highest and lowest grades with their positions (1-based index), (3) Generate a frequency distribution by grade range: A (90-100), B (80-89), C (70-79), D (60-69), F (below 60), (4) Count how many students scored above the average. Display all results with clear labels.",
        starterCode: `#include <stdio.h>

int main() {
    int grades[8] = {95, 82, 70, 88, 61, 78, 93, 55};
    int n = 8;
    float sum = 0, avg;
    int highest, lowest, highPos, lowPos;
    int a = 0, b = 0, c = 0, d = 0, f = 0;
    int aboveAvg = 0;

    // TODO: Compute sum and average
    // TODO: Find highest and lowest with positions
    // TODO: Count frequency per grade range
    // TODO: Count students above average
    // TODO: Print all results with clear labels

    return 0;
}`,
        expectedOutput: "Class Average: 77.75\nHighest: 95 (Student 1)\nLowest: 55 (Student 8)\n--- Grade Distribution ---\nA (90-100): 2\nB (80-89): 2\nC (70-79): 2\nD (60-69): 1\nF (Below 60): 1\nStudents Above Average: 4",
        hint: "Track positions using the loop index when updating highest/lowest. Use if-else chains for grade ranges.",
      },
    },
  },

  loops: {
    title: "Loops",
    number: "02",
    description: "Master repetition with for, while, and do-while loops in C.",
    tiers: {
      novice: {
        id: "loops-novice",
        title: "Count to Ten",
        description: "Write a for loop that prints the numbers 1 through 10, each on a new line.",
        starterCode: `#include <stdio.h>

int main() {
    // TODO: Use a for loop to print 1 to 10

    return 0;
}`,
        expectedOutput: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10",
        hint: "for (int i = 1; i <= 10; i++)",
      },
      beginner: {
        id: "loops-beginner",
        title: "Multiplication Table",
        description: "Ask the user for a number (use scanf). Print its multiplication table from 1 to 10 in the format: '5 x 1 = 5'.",
        starterCode: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);

    // TODO: Print the multiplication table for n

    return 0;
}`,
        expectedOutput: "5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50",
        hint: "Use printf(\"%d x %d = %d\\n\", n, i, n*i) inside your loop.",
      },
      intermediate: {
        id: "loops-intermediate",
        title: "Sum Until Sentinel",
        description: "Write a program that continuously reads integers from the user. Stop when the user enters -1 (the sentinel value). Print the sum of all entered numbers (not including -1).",
        starterCode: `#include <stdio.h>

int main() {
    int num, sum = 0;

    // TODO: Use a do-while or while loop to read until -1
    // TODO: Print the total sum

    return 0;
}`,
        expectedOutput: "Sum: 15",
        hint: "Use a while loop: read the number at the top, check if it's -1 before adding.",
      },
      advanced: {
        id: "loops-advanced",
        title: "FizzBuzz",
        description: "Print numbers from 1 to 50. For multiples of 3 print 'Fizz', for multiples of 5 print 'Buzz', for multiples of both print 'FizzBuzz', otherwise print the number.",
        starterCode: `#include <stdio.h>

int main() {
    // TODO: Implement FizzBuzz for 1 to 50

    return 0;
}`,
        expectedOutput: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz",
        hint: "Check divisibility by 15 first (FizzBuzz), then 3, then 5.",
      },
      expert: {
        id: "loops-expert",
        title: "Pascal's Triangle",
        description: "Print the first 6 rows of Pascal's Triangle. Each row must be generated mathematically using the previous row's values.",
        starterCode: `#include <stdio.h>

int main() {
    int rows = 6;
    int triangle[6][6];

    // TODO: Build and print Pascal's Triangle

    return 0;
}`,
        expectedOutput: "1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1\n1 5 10 10 5 1",
        hint: "triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j]. Remember triangle[i][0] = 1 and triangle[i][i] = 1.",
      },
    },
  },

  conditionals: {
    title: "Conditionals",
    number: "03",
    description: "Control program flow using if-else statements and switch cases.",
    tiers: {
      novice: {
        id: "conditionals-novice",
        title: "Positive or Negative",
        description: "Read one integer. Print 'POSITIVE' if it is greater than 0, 'NEGATIVE' if less than 0, or 'ZERO' if it equals 0.",
        starterCode: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);

    // TODO: Check and print POSITIVE, NEGATIVE, or ZERO

    return 0;
}`,
        expectedOutput: "POSITIVE",
        hint: "Use an if-else if-else chain.",
      },
      beginner: {
        id: "conditionals-beginner",
        title: "Grade Letter",
        description: "Read a numeric grade (0-100). Print the letter grade: A (90-100), B (80-89), C (70-79), D (60-69), F (below 60).",
        starterCode: `#include <stdio.h>

int main() {
    int grade;
    scanf("%d", &grade);

    // TODO: Print the corresponding letter grade

    return 0;
}`,
        expectedOutput: "B",
        hint: "Check the highest ranges first using else-if.",
      },
      intermediate: {
        id: "conditionals-intermediate",
        title: "Day of the Week",
        description: "Read a number 1-7. Use a switch statement to print the corresponding day (1=Monday, 7=Sunday). Print 'Invalid' for any other number.",
        starterCode: `#include <stdio.h>

int main() {
    int day;
    scanf("%d", &day);

    // TODO: Use switch to print day name

    return 0;
}`,
        expectedOutput: "Wednesday",
        hint: "Use switch(day) with cases 1 through 7 and a default case.",
      },
      advanced: {
        id: "conditionals-advanced",
        title: "Triangle Classifier",
        description: "Read three integers representing sides of a triangle. First check if they can form a valid triangle (sum of any two sides > third). If valid, classify it as Equilateral, Isosceles, or Scalene.",
        starterCode: `#include <stdio.h>

int main() {
    int a, b, c;
    scanf("%d %d %d", &a, &b, &c);

    // TODO: Validate triangle, then classify

    return 0;
}`,
        expectedOutput: "Isosceles",
        hint: "A triangle is valid if: a+b>c, b+c>a, and a+c>b.",
      },
      expert: {
        id: "conditionals-expert",
        title: "Advanced Calculator with Menu",
        description: "Build a menu-driven calculator program with the following operations: (1) Addition, (2) Subtraction, (3) Multiplication, (4) Division, (5) Modulus (integers only), (6) Power (using a loop, no math.h). The program must: accept two numbers, perform the selected operation, handle division by zero, modulus by zero, and invalid choices gracefully, and loop until the user selects option 7 (Exit). Display results with 2 decimal places.",
        starterCode: `#include <stdio.h>

int main() {
    int choice;
    float a, b, result;
    int ia, ib, iresult;

    // TODO: Display menu in a loop
    // TODO: Read two numbers and perform operation
    // TODO: Handle division by zero and invalid choices

    return 0;
}`,
        expectedOutput: "Result: 7.50\nResult: 12\nExiting calculator.",
        hint: "Use a do-while loop for the menu. For power, use a for-loop multiplying a by itself b times. Use a switch for operation selection.",
      },
    },
  },

  functions: {
    title: "User Defined Functions",
    number: "04",
    description: "Break code into reusable, modular functions with parameters and return values.",
    tiers: {
      novice: {
        id: "functions-novice",
        title: "Greet User",
        description: "Write a function called greetUser() that takes no arguments and prints 'Welcome to C-LABS!'. Call it from main.",
        starterCode: `#include <stdio.h>

// TODO: Define greetUser() here

int main() {
    // TODO: Call greetUser()
    return 0;
}`,
        expectedOutput: "Welcome to C-LABS!",
        hint: "void greetUser() { printf(\"...\"); }",
      },
      beginner: {
        id: "functions-beginner",
        title: "Discount Calculator",
        description: "Write a function getDiscount(float price) that returns a 10% discount value if the price is over 100, otherwise returns 0. Call it in main with a price of 150.00 and print the discount amount.",
        starterCode: `#include <stdio.h>

// TODO: Define getDiscount() function

int main() {
    float price = 150.00;
    // TODO: Call getDiscount and print the result
    return 0;
}`,
        expectedOutput: "Discount: 15.00",
        hint: "The function signature: float getDiscount(float price)",
      },
      intermediate: {
        id: "functions-intermediate",
        title: "Temperature Converter",
        description: "Create two functions: celsiusToFahrenheit(float c) and fahrenheitToCelsius(float f). In main, convert 100°C to Fahrenheit and 98.6°F to Celsius. Print both results.",
        starterCode: `#include <stdio.h>

// TODO: Define celsiusToFahrenheit()
// TODO: Define fahrenheitToCelsius()

int main() {
    // TODO: Call both functions and print results
    return 0;
}`,
        expectedOutput: "100.00C = 212.00F\n98.60F = 37.00C",
        hint: "F = C * 9/5 + 32. C = (F - 32) * 5/9.",
      },
      advanced: {
        id: "functions-advanced",
        title: "Recursive Factorial & Fibonacci",
        description: "Write two recursive functions: factorial(int n) and fibonacci(int n). In main, print the factorial of 6 and the 8th Fibonacci number.",
        starterCode: `#include <stdio.h>

// TODO: Define recursive factorial()
// TODO: Define recursive fibonacci()

int main() {
    // TODO: Print factorial(6) and fibonacci(8)
    return 0;
}`,
        expectedOutput: "6! = 720\nFibonacci(8) = 21",
        hint: "factorial(0) = 1, factorial(n) = n * factorial(n-1). Fibonacci(0)=0, Fibonacci(1)=1.",
      },
      expert: {
        id: "functions-expert",
        title: "Bank ATM Simulator",
        description: "Build a complete menu-driven ATM system. Implement the following functions: (1) checkBalance() — display current balance, (2) deposit(float amount) — add funds and confirm, (3) withdraw(float amount) — deduct funds if sufficient, print error if not, (4) printMiniStatement() — show the last 3 transactions stored in global arrays. The main menu must loop until the user selects 'Exit'. Transaction history must be tracked automatically.",
        starterCode: `#include <stdio.h>

float balance = 1000.00;
char transactions[3][50] = {"", "", ""};
int txnCount = 0;

void addTransaction(char *desc) { /* TODO: Shift old entries and add new */ }
void checkBalance() { /* TODO */ }
void deposit(float amount) { /* TODO: Add to balance and record txn */ }
void withdraw(float amount) { /* TODO: Check funds, deduct, record txn */ }
void printMiniStatement() { /* TODO: Print last 3 transactions */ }

int main() {
    int choice;
    float amount;
    // TODO: Display menu (1:Balance 2:Deposit 3:Withdraw 4:Statement 5:Exit)
    // TODO: Loop until choice == 5
    return 0;
}`,
        expectedOutput: "Deposit 500.00: Balance 1500.00\nWithdraw 200.00: Balance 1300.00\n--- Mini Statement ---\n1. Deposited: 500.00\n2. Withdrew: 200.00",
        hint: "Use a do-while loop for the menu. For transactions, shift elements down: txn[2]=txn[1], txn[1]=txn[0], then txn[0]=new.",
      },
    },
  },

  pointers: {
    title: "Pointers",
    number: "05",
    description: "Understand memory addresses, pointer arithmetic, and pass-by-reference.",
    tiers: {
      novice: {
        id: "pointers-novice",
        title: "Address & Dereference",
        description: "Declare an integer variable x = 42. Declare a pointer to it. Print the value of x using the pointer (dereference it).",
        starterCode: `#include <stdio.h>

int main() {
    int x = 42;
    // TODO: Declare pointer ptr pointing to x
    // TODO: Print the value via pointer

    return 0;
}`,
        expectedOutput: "Value via pointer: 42",
        hint: "int *ptr = &x; printf(\"%d\", *ptr);",
      },
      beginner: {
        id: "pointers-beginner",
        title: "Swap via Pointers",
        description: "Write a function swap(int *a, int *b) that swaps two integers using pointers. In main, declare two variables, call swap, and print before and after.",
        starterCode: `#include <stdio.h>

void swap(int *a, int *b) {
    // TODO: Swap values using a temp variable
}

int main() {
    int x = 5, y = 10;
    printf("Before: x=%d, y=%d\\n", x, y);
    swap(&x, &y);
    // TODO: Print after
    return 0;
}`,
        expectedOutput: "Before: x=5, y=10\nAfter: x=10, y=5",
        hint: "int temp = *a; *a = *b; *b = temp;",
      },
      intermediate: {
        id: "pointers-intermediate",
        title: "Array Traversal with Pointers",
        description: "Declare an array of 5 integers. Use a pointer to traverse the array and calculate the sum. Do NOT use array indexing (arr[i]) in your loop — use pointer arithmetic only.",
        starterCode: `#include <stdio.h>

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    int *ptr = arr;
    int sum = 0;

    // TODO: Use pointer arithmetic to sum all elements

    printf("Sum: %d\\n", sum);
    return 0;
}`,
        expectedOutput: "Sum: 150",
        hint: "Use *(ptr + i) or increment ptr with ptr++ to move through memory.",
      },
      advanced: {
        id: "pointers-advanced",
        title: "Find Max & Min via Pointers",
        description: "Write a function findMinMax(int *arr, int size, int *min, int *max) that finds both the minimum and maximum values in an array using pointers (pass-by-reference for min and max). Also write a function getAverage(int *arr, int size) that returns the average using pointer traversal. In main, print the min, max, and average.",
        starterCode: `#include <stdio.h>

void findMinMax(int *arr, int size, int *min, int *max) {
    // TODO: Find min and max via pointer traversal
}

float getAverage(int *arr, int size) {
    // TODO: Compute average using pointer traversal
}

int main() {
    int arr[6] = {3, 7, 1, 9, 4, 6};
    int min, max;
    findMinMax(arr, 6, &min, &max);
    float avg = getAverage(arr, 6);
    printf("Min: %d\\n", min);
    printf("Max: %d\\n", max);
    printf("Average: %.2f\\n", avg);
    return 0;
}`,
        expectedOutput: "Min: 1\nMax: 9\nAverage: 5.00",
        hint: "Start with *min = *max = arr[0]. Use pointer arithmetic *(arr+i) to compare each element.",
      },
      expert: {
        id: "pointers-expert",
        title: "String Utilities via Pointers",
        description: "Build a string utility library using only pointer arithmetic (no array indexing). Implement three functions: (1) reverseString(char *str) — reverse in-place, (2) countVowels(char *str) — return the number of vowels (case-insensitive), (3) toUpperCase(char *str) — convert all letters to uppercase in-place. In main, demonstrate all three functions on the string 'Programming'.",
        starterCode: `#include <stdio.h>
#include <string.h>
#include <ctype.h>

void reverseString(char *str) { /* TODO: Reverse in-place using pointers */ }
int countVowels(char *str) { /* TODO: Count a,e,i,o,u using pointer traversal */ }
void toUpperCase(char *str) { /* TODO: Convert in-place using pointers */ }

int main() {
    char word[] = "Programming";
    char reversed[50];
    strcpy(reversed, word);
    reverseString(reversed);
    printf("Reversed: %s\\n", reversed);

    printf("Vowels: %d\\n", countVowels(word));

    toUpperCase(reversed);
    printf("Uppercase: %s\\n", reversed);
    return 0;
}`,
        expectedOutput: "Reversed: gnimmargorP\nVowels: 3\nUppercase: GNIMMARGORP",
        hint: "For reverse: char *start=str, *end=str+strlen(str)-1, swap while start<end. For vowels, check each char with *(ptr++) against 'aeiouAEIOU'.",
      },
    },
  },

  structures: {
    title: "Structures",
    number: "06",
    description: "Group related data together using C structs.",
    tiers: {
      novice: {
        id: "structures-novice",
        title: "Point in Space",
        description: "Define a structure Point with integer fields x and y. Declare a point, assign x=5 and y=10, then print both values.",
        starterCode: `#include <stdio.h>

// TODO: Define the Point structure

int main() {
    // TODO: Declare and initialize a Point
    // TODO: Print its x and y
    return 0;
}`,
        expectedOutput: "Point: (5, 10)",
        hint: "struct Point { int x; int y; }; — then use dot notation: p.x = 5;",
      },
      beginner: {
        id: "structures-beginner",
        title: "Item with Tax",
        description: "Create a structure Item with fields: int id, char name[50], float price. Declare one item (hardcode the values). Print the item details along with a computed Total Price that includes 12% tax.",
        starterCode: `#include <stdio.h>

// TODO: Define the Item structure

int main() {
    // TODO: Create and initialize an Item
    // TODO: Print details with 12% tax total
    return 0;
}`,
        expectedOutput: "ID: 1\nName: Notebook\nPrice: 50.00\nTotal (with 12% tax): 56.00",
        hint: "float total = item.price * 1.12;",
      },
      intermediate: {
        id: "structures-intermediate",
        title: "Oldest Book Finder",
        description: "Create a Book structure (title, author, int year). Declare an array of 3 books with hardcoded values. Loop through them and print the title of the book with the earliest publication year.",
        starterCode: `#include <stdio.h>

// TODO: Define the Book structure

int main() {
    // TODO: Declare array of 3 Books with hardcoded data
    // TODO: Find and print the title of the oldest book
    return 0;
}`,
        expectedOutput: "Oldest book: The C Programming Language",
        hint: "Track the minimum year and the index of its book as you loop.",
      },
      advanced: {
        id: "structures-advanced",
        title: "Sports Team Manager",
        description: "Create an Athlete structure with fields: name (char[50]), jerseyNumber (int), sport (char[30]), and an array of 3 float scores. For an array of 5 athletes (hardcoded), implement the following: (1) calcAverages() — compute each athlete's average score, (2) findMVP() — find and display the athlete with the highest average (print all their details), (3) displayAll() — print a formatted table of all athletes with their averages. The output must match the expected format exactly.",
        starterCode: `#include <stdio.h>

typedef struct {
    char name[50];
    int jerseyNumber;
    char sport[30];
    float scores[3];
    float average;
} Athlete;

void calcAverages(Athlete team[], int n) {
    // TODO: Calculate average score for each athlete
}

void findMVP(Athlete team[], int n) {
    // TODO: Find and print the top athlete's full details
}

void displayAll(Athlete team[], int n) {
    // TODO: Print formatted table of all athletes
}

int main() {
    Athlete team[5] = {
        {"Jordan Cruz", 23, "Basketball", {22, 28, 25}},
        {"Alex Tan", 10, "Volleyball", {15, 18, 20}},
        {"Sam Reyes", 7, "Basketball", {30, 26, 29}},
        {"Jamie Lim", 14, "Swimming", {18, 22, 19}},
        {"Casey Go", 33, "Basketball", {12, 15, 10}}
    };
    calcAverages(team, 5);
    displayAll(team, 5);
    printf("\\n");
    findMVP(team, 5);
    return 0;
}`,
        expectedOutput: "--- Team Roster ---\nJordan Cruz (#23) - Basketball - Avg: 25.00\nAlex Tan (#10) - Volleyball - Avg: 17.67\nSam Reyes (#7) - Basketball - Avg: 28.33\nJamie Lim (#14) - Swimming - Avg: 19.67\nCasey Go (#33) - Basketball - Avg: 12.33\n\n=== MOST VALUABLE PLAYER ===\nSam Reyes (#7), Sport: Basketball, Average: 28.33",
        hint: "Loop once to calculate sum/3 for averages, then loop again to find the max average. For display, use printf with formatted columns.",
      },
      expert: {
        id: "structures-expert",
        title: "Personal Finance Tracker",
        description: "Build a finance tracking system using a Transaction structure with fields: date (char[11], format 'YYYY-MM-DD'), description (char[50]), category (char[20]), and amount (float, positive=income, negative=expense). Using an array of up to 6 hardcoded transactions, implement functions to: (1) displayAllTransactions() — print a formatted list, (2) computeNetBalance() — return total income minus total expenses, (3) filterByCategory(char *cat) — display only transactions of a given category, (4) findLargestExpense() — display the single largest expense transaction.",
        starterCode: `#include <stdio.h>
#include <string.h>

typedef struct {
    char date[11];
    char description[50];
    char category[20];
    float amount; // positive = income, negative = expense
} Transaction;

void displayAll(Transaction txns[], int n) { /* TODO: Print formatted list */ }
float computeNetBalance(Transaction txns[], int n) { /* TODO: Sum all amounts */ }
void filterByCategory(Transaction txns[], int n, char *cat) { /* TODO */ }
void findLargestExpense(Transaction txns[], int n) { /* TODO */ }

int main() {
    Transaction txns[6] = {
        {"2025-01-15", "Salary", "Income", 50000.00},
        {"2025-01-16", "Rent Payment", "Housing", -15000.00},
        {"2025-01-17", "Groceries", "Food", -3500.50},
        {"2025-01-18", "Freelance", "Income", 8000.00},
        {"2025-01-19", "Restaurant", "Food", -1200.00},
        {"2025-01-20", "Electric Bill", "Housing", -2800.00}
    };
    displayAll(txns, 6);
    printf("\nNet Balance: %.2f\n", computeNetBalance(txns, 6));
    printf("\n--- Food Transactions ---\n");
    filterByCategory(txns, 6, "Food");
    printf("\n--- Largest Expense ---\n");
    findLargestExpense(txns, 6);
    return 0;
}`,
        expectedOutput: "2025-01-15 | Salary           | Income      | +50000.00\n2025-01-16 | Rent Payment      | Housing     | -15000.00\n2025-01-17 | Groceries         | Food        |  -3500.50\n2025-01-18 | Freelance         | Income      |  +8000.00\n2025-01-19 | Restaurant        | Food        |  -1200.00\n2025-01-20 | Electric Bill     | Housing     |  -2800.00\n\nNet Balance: 35500.50\n\n--- Food Transactions ---\n2025-01-17 | Groceries         | Food        |  -3500.50\n2025-01-19 | Restaurant        | Food        |  -1200.00\n\n--- Largest Expense ---\nRent Payment: -15000.00",
        hint: "For filterByCategory, use strcmp(). For largest expense, only check transactions where amount < 0. Use strcmp() for category matching.",
      },
    },
  },

  strings: {
    title: "Strings",
    number: "07",
    description: "Manipulate text using C character arrays and string functions.",
    tiers: {
      novice: {
        id: "strings-novice",
        title: "Hello, Name!",
        description: "Declare a char array, store your name in it, and print a greeting in the format 'Hello, [name]!'.",
        starterCode: `#include <stdio.h>

int main() {
    char name[50] = "Maria";

    // TODO: Print the greeting

    return 0;
}`,
        expectedOutput: "Hello, Maria!",
        hint: "Use printf(\"Hello, %s!\", name);",
      },
      beginner: {
        id: "strings-beginner",
        title: "String Length & Uppercase",
        description: "Read a word. Print its length using strlen(). Then convert it to uppercase using toupper() and print it.",
        starterCode: `#include <stdio.h>
#include <string.h>
#include <ctype.h>

int main() {
    char word[100];
    scanf("%s", word);

    // TODO: Print length
    // TODO: Convert to uppercase and print

    return 0;
}`,
        expectedOutput: "Length: 5\nUppercase: HELLO",
        hint: "Loop through each character and apply toupper(word[i]).",
      },
      intermediate: {
        id: "strings-intermediate",
        title: "Palindrome Checker",
        description: "Read a word and check if it is a palindrome (reads the same forwards and backwards). Print 'PALINDROME' or 'NOT PALINDROME'.",
        starterCode: `#include <stdio.h>
#include <string.h>

int main() {
    char word[100];
    scanf("%s", word);

    // TODO: Check if word is a palindrome

    return 0;
}`,
        expectedOutput: "PALINDROME",
        hint: "Compare characters from both ends moving inward using two pointers.",
      },
      advanced: {
        id: "strings-advanced",
        title: "Word Counter",
        description: "Read a sentence (using fgets). Count and print: (1) total characters, (2) total words, (3) total vowels (a, e, i, o, u — case insensitive).",
        starterCode: `#include <stdio.h>
#include <string.h>
#include <ctype.h>

int main() {
    char sentence[200];
    fgets(sentence, sizeof(sentence), stdin);

    int chars = 0, words = 0, vowels = 0;

    // TODO: Count chars, words, and vowels

    return 0;
}`,
        expectedOutput: "Characters: 19\nWords: 4\nVowels: 7",
        hint: "A new word starts when you encounter a non-space after a space.",
      },
      expert: {
        id: "strings-expert",
        title: "Caesar Cipher",
        description: "Implement a Caesar cipher. Read a sentence and a shift value. Encrypt the message (shift letters only, preserve case and non-letters). Then decrypt it back and verify the original is restored.",
        starterCode: `#include <stdio.h>
#include <string.h>
#include <ctype.h>

void encrypt(char *msg, char *result, int shift) { /* TODO */ }
void decrypt(char *msg, char *result, int shift) { /* TODO */ }

int main() {
    char original[] = "Hello World";
    int shift = 3;
    char encrypted[100], decrypted[100];

    // TODO: Encrypt, print, then decrypt and print
    return 0;
}`,
        expectedOutput: "Original: Hello World\nEncrypted: Khoor Zruog\nDecrypted: Hello World",
        hint: "For uppercase: ((c - 'A' + shift) % 26) + 'A'. Handle wrap-around.",
      },
    },
  },

  "struct-arrays": {
    title: "Structure Arrays",
    number: "08",
    description: "Combine arrays and structures to model real-world data collections.",
    tiers: {
      novice: {
        id: "struct-arrays-novice",
        title: "Two Contacts",
        description: "Define a Contact structure (name, phone number as string). Declare an array of 2 contacts with hardcoded data. Print both contacts.",
        starterCode: `#include <stdio.h>

// TODO: Define Contact structure

int main() {
    // TODO: Declare array of 2 contacts and print them
    return 0;
}`,
        expectedOutput: "Contact 1: Juan Dela Cruz - 09171234567\nContact 2: Maria Santos - 09281234567",
        hint: "struct Contact contacts[2] = {{\"Juan Dela Cruz\", \"09171234567\"}, ...};",
      },
      beginner: {
        id: "struct-arrays-beginner",
        title: "Product Inventory",
        description: "Create a Product structure (name, float price, int stock). Declare 3 products. Print all products, then print a warning for any product with stock below 5.",
        starterCode: `#include <stdio.h>

typedef struct {
    char name[50];
    float price;
    int stock;
} Product;

int main() {
    Product products[3] = {
        {"Pencil", 5.00, 100},
        {"Notebook", 35.00, 3},
        {"Eraser", 10.00, 2}
    };
    // TODO: Print all products
    // TODO: Print low-stock warning
    return 0;
}`,
        expectedOutput: "Pencil - 5.00 (100 left)\nNotebook - 35.00 (3 left)\nEraser - 10.00 (2 left)\nLOW STOCK: Notebook\nLOW STOCK: Eraser",
        hint: "Use a single loop to print, then another loop to check stock.",
      },
      intermediate: {
        id: "struct-arrays-intermediate",
        title: "Class Roster Sorter",
        description: "Create a Student structure (name, float gpa). Declare 5 students. Write a bubble sort function that sorts them by GPA in descending order. Print the ranked roster.",
        starterCode: `#include <stdio.h>
#include <string.h>

typedef struct { char name[50]; float gpa; } Student;

void sortByGPA(Student students[], int n) {
    // TODO: Bubble sort by GPA descending
}

int main() {
    Student students[5] = {
        {"Ana", 3.5}, {"Ben", 3.8}, {"Cara", 3.2}, {"Dan", 3.9}, {"Eve", 3.6}
    };
    sortByGPA(students, 5);
    // TODO: Print ranked list
    return 0;
}`,
        expectedOutput: "1. Dan - 3.90\n2. Ben - 3.80\n3. Eve - 3.60\n4. Ana - 3.50\n5. Cara - 3.20",
        hint: "Swap entire struct objects, not just the GPA field.",
      },
      advanced: {
        id: "struct-arrays-advanced",
        title: "Hospital Staff Manager",
        description: "Create a Staff structure with fields: id (int), name (char[50]), role (char[30], e.g. 'Doctor', 'Nurse', 'Admin'), and float salary. With 5 hardcoded staff members, implement functions to: (1) displayAll() — print all staff in a formatted list, (2) findByID(int id) — search and print one staff member's full details, (3) updateSalary(int id, float newSalary) — update and confirm a staff member's salary, (4) computeRoleTotal(char *role) — calculate and return the total salary for a given role. Demonstrate all functions in main.",
        starterCode: `#include <stdio.h>
#include <string.h>

typedef struct {
    int id;
    char name[50];
    char role[30];
    float salary;
} Staff;

void displayAll(Staff s[], int n) { /* TODO: Print formatted list */ }
void findByID(Staff s[], int n, int id) { /* TODO: Print full details */ }
void updateSalary(Staff s[], int n, int id, float newSalary) { /* TODO */ }
float computeRoleTotal(Staff s[], int n, char *role) { /* TODO */ }

int main() {
    Staff staff[5] = {
        {201, "Dr. Ana Reyes", "Doctor", 85000},
        {202, "Ben Cruz, RN", "Nurse", 45000},
        {203, "Dr. Cara Lim", "Doctor", 92000},
        {204, "Dan Sy", "Admin", 35000},
        {205, "Eve Go, RN", "Nurse", 48000}
    };
    displayAll(staff, 5);
    printf("\n--- Find ID 203 ---\n");
    findByID(staff, 5, 203);
    printf("\nDoctor Total Payroll: %.2f\n", computeRoleTotal(staff, 5, "Doctor"));
    updateSalary(staff, 5, 204, 38000);
    printf("\n--- After Salary Update ---\n");
    findByID(staff, 5, 204);
    return 0;
}`,
        expectedOutput: "ID: 201 | Dr. Ana Reyes | Doctor | 85000.00\nID: 202 | Ben Cruz, RN | Nurse | 45000.00\nID: 203 | Dr. Cara Lim | Doctor | 92000.00\nID: 204 | Dan Sy | Admin | 35000.00\nID: 205 | Eve Go, RN | Nurse | 48000.00\n\n--- Find ID 203 ---\nDr. Cara Lim, Role: Doctor, Salary: 92000.00\n\nDoctor Total Payroll: 177000.00\n\n--- After Salary Update ---\nDan Sy, Role: Admin, Salary: 38000.00",
        hint: "For computeRoleTotal, use strcmp(s[i].role, role). For updateSalary, loop to find matching id, then update and print confirmation.",
      },
      expert: {
        id: "struct-arrays-expert",
        title: "Retail Sales Tracker",
        description: "Build a retail sales management system using a Sale structure with fields: date (char[11]), itemName (char[50]), category (char[20]), float unitPrice, and int quantity. Using arrays of structures (up to 10 hardcoded sales), implement: (1) listAllSales() — display all sales with computed total per item, (2) computeTotalRevenue() — return sum of all (unitPrice * quantity), (3) filterByCategory(char *cat) — display sales matching a category, (4) findBestSellingItem() — display the item with the highest quantity sold, (5) dailySalesReport(char *date) — show total revenue for a specific date.",
        starterCode: `#include <stdio.h>
#include <string.h>

typedef struct {
    char date[11];
    char itemName[50];
    char category[20];
    float unitPrice;
    int quantity;
} Sale;

void listAllSales(Sale sales[], int n) { /* TODO: Print each with line total */ }
float computeTotalRevenue(Sale sales[], int n) { /* TODO: Sum price*quantity */ }
void filterByCategory(Sale sales[], int n, char *cat) { /* TODO */ }
void findBestSellingItem(Sale sales[], int n) { /* TODO: Highest quantity */ }
float dailySalesReport(Sale sales[], int n, char *date) { /* TODO */ }

int main() {
    Sale sales[8] = {
        {"2025-03-01", "Laptop Pro", "Electronics", 45000.00, 2},
        {"2025-03-01", "Mouse", "Electronics", 1200.00, 5},
        {"2025-03-02", "Notebook", "School Supplies", 45.00, 20},
        {"2025-03-02", "Pen Set", "School Supplies", 150.00, 15},
        {"2025-03-03", "Keyboard", "Electronics", 2500.00, 3},
        {"2025-03-03", "Eraser", "School Supplies", 25.00, 30},
        {"2025-03-04", "Monitor 24\"", "Electronics", 8500.00, 1},
        {"2025-03-04", "Backpack", "School Supplies", 1200.00, 4}
    };
    listAllSales(sales, 8);
    printf("\nTotal Revenue: %.2f\n", computeTotalRevenue(sales, 8));
    printf("\n--- Electronics ---\n");
    filterByCategory(sales, 8, "Electronics");
    printf("\n--- Best Selling Item ---\n");
    findBestSellingItem(sales, 8);
    printf("\n--- Daily Report: 2025-03-02 ---\n");
    printf("Revenue: %.2f\n", dailySalesReport(sales, 8, "2025-03-02"));
    return 0;
}`,
        expectedOutput: "2025-03-01 | Laptop Pro | Electronics | 45000.00 x 2 = 90000.00\n2025-03-01 | Mouse | Electronics | 1200.00 x 5 = 6000.00\n2025-03-02 | Notebook | School Supplies | 45.00 x 20 = 900.00\n2025-03-02 | Pen Set | School Supplies | 150.00 x 15 = 2250.00\n2025-03-03 | Keyboard | Electronics | 2500.00 x 3 = 7500.00\n2025-03-03 | Eraser | School Supplies | 25.00 x 30 = 750.00\n2025-03-04 | Monitor 24\" | Electronics | 8500.00 x 1 = 8500.00\n2025-03-04 | Backpack | School Supplies | 1200.00 x 4 = 4800.00\n\nTotal Revenue: 120700.00\n\n--- Electronics ---\nLaptop Pro (45000.00 x 2 = 90000.00)\nMouse (1200.00 x 5 = 6000.00)\nKeyboard (2500.00 x 3 = 7500.00)\nMonitor 24\" (8500.00 x 1 = 8500.00)\n\n--- Best Selling Item ---\nEraser - 30 units sold\n\n--- Daily Report: 2025-03-02 ---\nRevenue: 3150.00",
        hint: "For filterByCategory, use strcmp(). For daily report, strcmp on date. For best seller, track max quantity. Use strcpy/strcmp from string.h.",
      },
    },
  },

  "file-handling": {
    title: "File Handling",
    number: "09",
    description: "Read from and write to files using C's stdio file I/O functions.",
    tiers: {
      novice: {
        id: "file-handling-novice",
        title: "Write to a File",
        description: "Open a file called 'output.txt' for writing. Write the line 'Hello, File!' to it. Close the file. Then open it again for reading and print its contents.",
        starterCode: `#include <stdio.h>

int main() {
    FILE *fp;

    // TODO: Open output.txt for writing
    // TODO: Write "Hello, File!" to it
    // TODO: Close the file
    // TODO: Open it again for reading and print

    return 0;
}`,
        expectedOutput: "Hello, File!",
        hint: "fopen(\"output.txt\", \"w\") to write. Use fprintf(fp, ...). Then fopen with \"r\" and fgets to read.",
      },
      beginner: {
        id: "file-handling-beginner",
        title: "Number Log",
        description: "Write numbers 1 to 10 to a file 'numbers.txt', one per line. Then read the file and calculate their sum. Print 'Sum from file: X'.",
        starterCode: `#include <stdio.h>

int main() {
    FILE *fp;

    // TODO: Write numbers 1-10 to numbers.txt
    // TODO: Read numbers.txt and compute the sum
    // TODO: Print the sum

    return 0;
}`,
        expectedOutput: "Sum from file: 55",
        hint: "Use fprintf for writing integers. Use fscanf(\"%d\", &num) for reading.",
      },
      intermediate: {
        id: "file-handling-intermediate",
        title: "Student File Writer",
        description: "Create 3 Student structs (name, grade). Write all student data to 'students.txt', one student per line (name and grade separated by comma). Then read the file back and print each line.",
        starterCode: `#include <stdio.h>

typedef struct { char name[50]; int grade; } Student;

int main() {
    Student students[3] = {{"Ana", 90}, {"Ben", 75}, {"Cara", 85}};
    FILE *fp;

    // TODO: Write students to students.txt
    // TODO: Read and print the file
    return 0;
}`,
        expectedOutput: "Ana,90\nBen,75\nCara,85",
        hint: "fprintf(fp, \"%s,%d\\n\", s.name, s.grade); for writing.",
      },
      advanced: {
        id: "file-handling-advanced",
        title: "Word Frequency Analyzer",
        description: "Create a text analysis tool. First, write a sample paragraph to 'input.txt' (at least 25 words with some repeated). Then implement the following: (1) Read the file word by word, (2) Count the frequency of each unique word (case-insensitive), (3) Write the frequency results sorted alphabetically to 'frequency.txt' in the format 'word: count', (4) Print to console the total word count and the top 3 most frequent words. Ignore punctuation and convert all words to lowercase.",
        starterCode: `#include <stdio.h>
#include <string.h>
#include <ctype.h>

int main() {
    // Create sample input
    FILE *fp = fopen("input.txt", "w");
    fprintf(fp, "the cat sat on the mat the cat sat on the chair");
    fclose(fp);

    char words[100][50];
    int counts[100] = {0};
    int uniqueCount = 0, totalWords = 0;

    // TODO: Read input.txt word by word
    // TODO: Count frequencies (convert to lowercase, skip punctuation)
    // TODO: Write results to frequency.txt (alphabetically sorted)
    // TODO: Print total word count and top 3 most frequent words

    return 0;
}`,
        expectedOutput: "Total words: 13\nTop 3: 'the' (3), 'cat' (2), 'sat' (2)",
        hint: "Use fscanf(fp, \"%s\", word) to read words. For each word, check if it exists in your unique words array; if so increment count, otherwise add it. Use strcasecmp() or convert to lowercase before comparing.",
      },
      expert: {
        id: "file-handling-expert",
        title: "CSV Gradebook Processor",
        description: "Build a complete gradebook processing system. Create a CSV file 'gradebook.csv' with student records (Name, Math, Science, English scores). Implement: (1) Read all records from the CSV, (2) Compute each student's average, (3) Determine PASSED (avg >= 75) or FAILED status, (4) Write the enriched data to 'gradebook_out.csv' with columns: Name,Math,Science,English,Average,Status, (5) Print a summary to console showing: total students, number passed, number failed, and the class average of all student averages.",
        starterCode: `#include <stdio.h>
#include <string.h>

typedef struct {
    char name[50];
    int math, science, english;
    float average;
    char status[10];
} Student;

int main() {
    // Create input CSV
    FILE *fp = fopen("gradebook.csv", "w");
    fprintf(fp, "Name,Math,Science,English\\n");
    fprintf(fp, "Ana,90,88,92\\n");
    fprintf(fp, "Ben,70,65,60\\n");
    fprintf(fp, "Cara,85,80,78\\n");
    fprintf(fp, "Dan,55,60,58\\n");
    fprintf(fp, "Eve,95,92,98\\n");
    fclose(fp);

    Student students[50];
    int count = 0;
    int passed = 0, failed = 0;
    float sumAverages = 0;

    // TODO: Read gradebook.csv (skip header line)
    // TODO: Compute each student's average
    // TODO: Set PASSED/FAILED status
    // TODO: Write gradebook_out.csv with header
    // TODO: Print summary to console

    return 0;
}`,
        expectedOutput: "--- Gradebook Summary ---\nTotal Students: 5\nPassed: 3\nFailed: 2\nClass Average: 77.87",
        hint: "Use fscanf with format: fscanf(fp, \"%[^,],%d,%d,%d\\n\", name, &m, &s, &e). Skip the header by reading it first. For status: strcpy(s.status, avg>=75 ? \"PASSED\" : \"FAILED\").",
      },
    },
  },
};

export default challenges;
