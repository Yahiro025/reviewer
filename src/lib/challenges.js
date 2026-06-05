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
        title: "Student Grade Analyzer",
        description: "Accept grades for 5 students in an array. The program must: (1) Compute the class average, (2) Find and print the highest and lowest grades, (3) Print a frequency count for grade ranges: 90-100, 80-89, 70-79, below 70.",
        starterCode: `#include <stdio.h>

int main() {
    int grades[5] = {95, 82, 70, 88, 61};
    float avg = 0;
    int highest, lowest;
    int a = 0, b = 0, c = 0, f = 0; // Grade range counters

    // TODO: Compute average
    // TODO: Find highest and lowest
    // TODO: Count grade ranges
    // TODO: Print all results

    return 0;
}`,
        expectedOutput: "Average: 79.20\nHighest: 95\nLowest: 61\n90-100: 1\n80-89: 2\n70-79: 1\nBelow 70: 1",
        hint: "Use a single loop to compute average, find min/max, and count ranges simultaneously.",
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
        title: "Simple Calculator",
        description: "Build a calculator that reads two numbers and an operator (+, -, *, /). Perform the operation and print the result. Handle division by zero and invalid operators gracefully.",
        starterCode: `#include <stdio.h>

int main() {
    float a, b, result;
    char op;
    scanf("%f %c %f", &a, &op, &b);

    // TODO: Perform operation based on op
    // TODO: Handle division by zero and invalid operator

    return 0;
}`,
        expectedOutput: "Result: 7.50",
        hint: "Use a switch on the char operator. For division, check if b == 0 first.",
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
        description: "Build a menu-driven ATM. Implement checkBalance(), deposit(float amount), and withdraw(float amount) functions. The menu loops until the user selects 'Exit'. Handle insufficient funds.",
        starterCode: `#include <stdio.h>

float balance = 1000.00;

void checkBalance() { /* TODO */ }
void deposit(float amount) { /* TODO */ }
void withdraw(float amount) { /* TODO */ }

int main() {
    int choice;
    float amount;
    // TODO: Implement menu loop
    return 0;
}`,
        expectedOutput: "Balance: 1000.00\nDeposit 500.00: Balance 1500.00\nWithdraw 200.00: Balance 1300.00",
        hint: "Use a do-while loop for the menu. Check balance >= amount before withdrawing.",
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
        title: "Find Max via Pointer",
        description: "Write a function findMax(int *arr, int size) that returns a pointer to the largest element in the array. In main, print the max value by dereferencing the returned pointer.",
        starterCode: `#include <stdio.h>

int* findMax(int *arr, int size) {
    // TODO: Find and return pointer to max element
}

int main() {
    int arr[6] = {3, 7, 1, 9, 4, 6};
    int *maxPtr = findMax(arr, 6);
    printf("Max: %d\\n", *maxPtr);
    return 0;
}`,
        expectedOutput: "Max: 9",
        hint: "Start with int *max = arr; then loop comparing *max with *(arr+i).",
      },
      expert: {
        id: "pointers-expert",
        title: "Dynamic String Reversal",
        description: "Write a function reverseString(char *str) that reverses a string in-place using pointer arithmetic (no array indexing). In main, reverse and print the string 'CLABS'.",
        starterCode: `#include <stdio.h>
#include <string.h>

void reverseString(char *str) {
    // TODO: Reverse string in-place using pointers
}

int main() {
    char word[] = "CLABS";
    reverseString(word);
    printf("%s\\n", word);
    return 0;
}`,
        expectedOutput: "SBALC",
        hint: "Use a char *start = str and char *end = str + strlen(str) - 1, then swap while start < end.",
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
        title: "Student Database System",
        description: "Create a Student structure with name (char[50]), studentNumber (char[20]), age (int), and an array of 3 float grades. For an array of 5 students (hardcoded), write a function that calculates each student's average and another that finds and prints the top performer's full details.",
        starterCode: `#include <stdio.h>

typedef struct {
    char name[50];
    char studentNumber[20];
    int age;
    float grades[3];
    float average;
} Student;

void calcAverages(Student students[], int n) {
    // TODO: Calculate average for each student
}

void printTopPerformer(Student students[], int n) {
    // TODO: Find and print the top student
}

int main() {
    Student students[5] = {
        {"Ana Reyes", "2023-001", 19, {88, 92, 85}},
        {"Ben Cruz", "2023-002", 20, {75, 80, 70}},
        {"Cara Lim", "2023-003", 18, {95, 98, 100}},
        {"Dan Sy", "2023-004", 21, {60, 65, 70}},
        {"Eve Go", "2023-005", 19, {85, 88, 90}}
    };
    // TODO: Call your functions
    return 0;
}`,
        expectedOutput: "Top Performer: Cara Lim (2023-003), Age: 18, Average: 97.67",
        hint: "Loop once to calculate averages, then loop again to find the max average.",
      },
      expert: {
        id: "structures-expert",
        title: "Library Catalog System",
        description: "Create a Book structure (title, author, year, float price, int quantity). Using an array of 5 books, implement functions to: (1) Display all books, (2) Search for a book by title, (3) Calculate total inventory value (price * quantity for all books), (4) Find the most expensive book.",
        starterCode: `#include <stdio.h>
#include <string.h>

typedef struct {
    char title[100];
    char author[50];
    int year;
    float price;
    int quantity;
} Book;

void displayAll(Book books[], int n) { /* TODO */ }
void searchByTitle(Book books[], int n, char *query) { /* TODO */ }
float totalValue(Book books[], int n) { /* TODO */ }
void mostExpensive(Book books[], int n) { /* TODO */ }

int main() {
    Book books[5] = {
        {"The C Programming Language", "Kernighan", 1978, 850.00, 3},
        {"Clean Code", "Martin", 2008, 1200.00, 2},
        {"SICP", "Abelson", 1996, 980.00, 1},
        {"Pragmatic Programmer", "Hunt", 1999, 1100.00, 4},
        {"Code Complete", "McConnell", 2004, 750.00, 2}
    };
    // TODO: Call all functions
    return 0;
}`,
        expectedOutput: "Total Inventory Value: 14750.00\nMost Expensive: Clean Code at 1200.00",
        hint: "For search, use strcmp() or strstr() to compare strings.",
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
        title: "Employee Payroll System",
        description: "Create an Employee structure (id, name, department, float salary). With 5 hardcoded employees, implement: displayAll(), findByID(int id), updateSalary(int id, float newSalary), and computeDeptTotal(char *dept).",
        starterCode: `#include <stdio.h>
#include <string.h>

typedef struct {
    int id;
    char name[50];
    char department[30];
    float salary;
} Employee;

void displayAll(Employee e[], int n) { /* TODO */ }
void findByID(Employee e[], int n, int id) { /* TODO */ }
void updateSalary(Employee e[], int n, int id, float newSalary) { /* TODO */ }
float computeDeptTotal(Employee e[], int n, char *dept) { /* TODO */ }

int main() {
    Employee emps[5] = {
        {101, "Ana Reyes", "Engineering", 55000},
        {102, "Ben Cruz", "Marketing", 42000},
        {103, "Cara Lim", "Engineering", 62000},
        {104, "Dan Sy", "HR", 38000},
        {105, "Eve Go", "Engineering", 58000}
    };
    // TODO: Demonstrate all functions
    return 0;
}`,
        expectedOutput: "Engineering Total Payroll: 175000.00",
        hint: "For computeDeptTotal, use strcmp(e[i].department, dept) to match.",
      },
      expert: {
        id: "struct-arrays-expert",
        title: "Mini-ERP System",
        description: "Build a system managing two entities: Employee (id, name, float salary) and Department (deptName, managerID). Implement: addEmployee(), listByDepartment(), computeDeptPayroll(), and applyBonus(char *dept, float bonusPct) that increases all salaries in a department by a percentage.",
        starterCode: `#include <stdio.h>
#include <string.h>

typedef struct { int id; char name[50]; char dept[30]; float salary; } Employee;
typedef struct { char deptName[30]; int managerID; } Department;

Employee employees[20];
Department departments[5];
int empCount = 0, deptCount = 0;

void addEmployee(int id, char *name, char *dept, float salary) { /* TODO */ }
void listByDepartment(char *dept) { /* TODO */ }
float computeDeptPayroll(char *dept) { /* TODO */ }
void applyBonus(char *dept, float bonusPct) { /* TODO */ }

int main() {
    // TODO: Add sample data, demonstrate all functions
    return 0;
}`,
        expectedOutput: "Engineering payroll before bonus: 175000.00\nApplying 10% bonus...\nEngineering payroll after bonus: 192500.00",
        hint: "For applyBonus: e[i].salary *= (1 + bonusPct/100) for matching department.",
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
        title: "Word Frequency Counter",
        description: "Read a text file 'input.txt' (create it first with at least 20 words). Count how many times each unique word appears. Write the results to 'frequency.txt' in the format 'word: count'.",
        starterCode: `#include <stdio.h>
#include <string.h>
#include <ctype.h>

int main() {
    // First, create a sample input.txt
    FILE *fp = fopen("input.txt", "w");
    fprintf(fp, "the cat sat on the mat the cat sat");
    fclose(fp);

    // TODO: Read input.txt, count word frequencies
    // TODO: Write results to frequency.txt
    // TODO: Print results to console

    return 0;
}`,
        expectedOutput: "the: 3\ncat: 2\nsat: 2\non: 1\nmat: 1",
        hint: "Store words in a parallel array. For each new word, check if it exists; increment count if it does.",
      },
      expert: {
        id: "file-handling-expert",
        title: "CSV Gradebook",
        description: "Build a gradebook system that reads student records from a CSV file, calculates averages, appends a 'PASSED' or 'FAILED' column based on average >= 75, and writes the updated records to a new file 'gradebook_out.csv'.",
        starterCode: `#include <stdio.h>
#include <string.h>

int main() {
    // Create input CSV
    FILE *fp = fopen("gradebook.csv", "w");
    fprintf(fp, "Name,Math,Science,English\\n");
    fprintf(fp, "Ana,90,88,92\\nBen,70,65,60\\nCara,85,80,78\\n");
    fclose(fp);

    // TODO: Read gradebook.csv
    // TODO: Calculate average for each student
    // TODO: Write gradebook_out.csv with average and status
    // TODO: Print final results to console

    return 0;
}`,
        expectedOutput: "Ana,90,88,92,90.00,PASSED\nBen,70,65,60,65.00,FAILED\nCara,85,80,78,81.00,PASSED",
        hint: "Use fscanf with a comma format: fscanf(fp, \"%[^,],%d,%d,%d\\n\", name, &m, &s, &e);",
      },
    },
  },
};

export default challenges;
