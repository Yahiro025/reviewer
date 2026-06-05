**C Programming Hands-On Practice Platform**  
   
 This document outlines the proposed implementation plan for a web-based educational platform designed to help college students practice hands-on C programming exams. The platform features layered difficulty tiers to accommodate beginners through advanced learners, covering 9 core C programming topics.  
**Proposed Architecture & Tech Stack**  
   
 **1. Technology Stack**  
- **Frontend Framework:** Next.js (React) for robust routing and fast performance.  
- **Styling & Animation:** Vanilla CSS with custom design tokens for a premium aesthetic. Framer Motion will be used for smooth page transitions and micro-interactions.  
- **Backend & Database:** **Supabase** will be used to handle user authentication and database storage (saving user progress, completed challenges, and saved code snippets).  
- **Code Execution:** We will integrate   **Judge0 API** (or similar execution engine) to allow users to write, compile, and run their C code directly within the browser safely.  
 **2. Design Aesthetic**  
   
 Inspired by "futuristic minimalist" design trends, the platform will feature a clean, ultra-modern, and distraction-free environment:  
- **Clean & Minimal Layout:** The dashboard will be highly organized, focusing entirely on the learning path and code editor, removing any unnecessary clutter.  
- **Futuristic Typography:** We will use  **Inter** or  **Geist** for ultra-clean readability, paired with  **Fira Code** or  **JetBrains Mono** for the code editor to give a sharp, technical feel.  
- **Minimalist Dark Theme:** Deep slate and true blacks (#000000 to #111111) with subtle, muted accents (like soft glowing white or stark monochromatic highlights) to reduce eye strain.  
- **Micro-interactions:** Smooth, purposeful animations using Framer Motion—no excessive bouncing, just crisp, instant feedback on hover and page transitions.  
- **Code Workspace (VS Code Pro Level):** The Practice Arena will feature a highly professional, split-pane IDE layout that rivals VS Code. It will include a fully featured code editor (e.g., using Monaco Editor, the engine behind VS Code) with syntax highlighting, line numbers, minimap, and an authentic-looking integrated terminal output pane.  
 **3. Application Structure**  
- / - **Landing Page**: A striking homepage with a call-to-action to log in/sign up.  
- /dashboard - **Topic Dashboard**: A visual grid of all 9 topics showing the user's saved progress, keeping the student-first structure of *iskolar.io*.  
- /topics/[id] - **Topic Detail**: Lists challenges for a specific topic, grouped by 5 difficulty tiers (Novice, Beginner, Intermediate, Advanced, Expert).  
- /challenge/[id] - **Practice Arena**: The core workspace with problem description, code editor, and console output.  
 **Example Problems by Topic (5 Difficulty Levels)**  
   
 The 5-tier system ensures students can build their confidence gradually, bridging the gap between basic syntax and complex real-world logic.  
**Topic 1: Arrays**  
- **Novice:** Create an array of 5 integers. Print the first and last elements.  
- **Beginner:** Given an array of 5 integers, write a loop to check each number. If the number is negative, replace it with 0. Print the final array.  
- **Intermediate:** Given an array of 10 integers, calculate the total sum of all *even* numbers and the total sum of all   *odd* numbers. Print both sums and state which one is larger.  
- **Advanced:** Write a program that reverses the elements of an array without using a second array (in-place reversal).  
- **Expert (Real-life based):** Build a "Student Grade Analyzer". Accept grades for 20 students in an array. The program must compute the class average, identify the highest/lowest grades, and output a frequency distribution histogram (e.g., how many got 90-100, 80-89, etc.).  
**Topic 4: User Defined Functions**  
- **Novice:** Write a function greetUser() that prints "Welcome to the system!". Call it in main.  
- **Beginner:** Write a function getDiscount(float price) that returns a 10% discount if the price is over 100, otherwise it returns 0. Call it in main and print the result.  
- **Intermediate:** Build a "Temperature Converter". Create two functions: celsiusToFahrenheit() and fahrenheitToCelsius(). In main(), ask the user for a choice (1 or 2) and a temperature, then call the correct function and print the result.  
- **Advanced:** Write a recursive function to calculate the factorial of a given number, and another to calculate the Nth Fibonacci number.  
- **Expert (Real-life based):** Build a "Bank ATM Simulator". Implement separate functions for checkBalance(), deposit(), withdraw(), and a mainMenu() that continuously loops until the user chooses to exit. It must handle invalid inputs and insufficient funds.  
**Topic 6 & 8: Structures & Structure Arrays**  
- **Novice:** Define a structure Point with x and y coordinates. Initialize a point and print its values.  
- **Beginner:** Create a structure Item (ID, Name, Price). Declare one item, ask the user to input its details. Print the item details along with a new "Total Price" that includes a 12% tax.  
- **Intermediate:** Create a Book structure (Title, Author, Publication Year). Ask the user to input details for 3 books using an array of structures. Print the title of the oldest book in the collection.  
- **Advanced:** **Student Database System.** Create a Student structure with an array of 3 subjects' grades. Using an array of 5 students, calculate each student's average grade. Create a function to find and print the details of the top-performing student. (Inspired by Activity 6)  
- **Expert (Real-life based):** **Mini-ERP System.** Create a system that manages two entities: Employee (ID, Name, Salary) and Department (DeptName, ManagerID). Using arrays of structures for both, implement functions to add new employees, assign them to departments, calculate the total payroll for a specific department, and apply a percentage bonus to all employees in a given department. (Inspired by Activity 8 & 9)  
 ![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOElEQVR4nO3OQQ2AMAAAsSPBDC6nA0lImANeSAAL/AhJq6DLGGOrjgAA+IO7mmt1VfvHGQAA3jsfLo0GxEjjf40AAAAASUVORK5CYII=)  
 **Execution Delegation Guide**  
   
 To optimize your free tier quota while utilizing the full ecosystem of models available to you, here is the recommended roadmap for the execution phase:  
 **Phase 1: Foundation Setup (Antigravity - Current Session)**  
   
 I will use my quota now to set up the complex, overarching architecture:  
1. Initialize the Next.js application with the correct routing structure.  
2. Build the global CSS design system, typography (Inter + Fira Code), and layout scaffolding (blending *iskolar.io* usability with futuristic minimalist aesthetics).  
3. Create the overarching UI shell (Landing Page, Dashboard layout, and Practice Arena).  
 **Phase 2: Rapid Component Generation & API Wiring (Sonnet 4.6 & GPT-OSS 120B)**  
   
 Once my foundation is laid, you can delegate the rapid generation of standard components and logic:  
- **Sonnet 4.6 (Thinking):** Prompt it to write the Supabase queries to save a user's completed challenges, and to hook up the Judge0 API routes.  
- **GPT-OSS 120B (Medium):** Use this model to rapidly stub out the textual content and basic boilerplate for the 9 different topic pages, following the layout I established.  
 **Phase 3: Complex UI Polish & Deep Logic (Opus 4.6 & Freebuff)**  
   
 For the final polish, difficult edge cases, and animations:  
- **Opus 4.6 (Thinking - Antigravity Session - COMPLETED):**  
  - Hardened Practice Arena code editor state to prevent rendering issues and excessive re-computations.  
  - Implemented automatic, robust localStorage persistence for user code (clabs_code_${id}) and custom stdin inputs (clabs_stdin_${id}) with full try-catch safety guards for Private/Incognito browsing modes.  
  - Added user confirmation alerts before resetting starter templates.  
  - Handled code execution timeouts: Added server-side fetch abort controls (10s limit) to return 504 status, and configured Piston request timeouts (5s compile, 3s run limits).  
  - Integrated client-side runtime cancellation: The run button dynamically morphs into a red "■ CANCEL" button to abort running processes in real-time.  
  - Programmed intelligent Unix signals translation for the terminal output: Verbose explanations for SIGKILL (timeout), SIGSEGV (segmentation fault), SIGFPE (floating point exception), SIGABRT (abort), and SIGBUS (bus error) to guide students through C bugs.  
  - Resolved dynamic routing load flash with a matching brutalist loading overlay.  
- **DeepSeek v4pro (Freebuff):** Use DeepSeek to connect the Supabase database schema for users' completed challenges, track progress across all 9 topics, and synchronize states between localStorage backups and the cloud backend.  
- **Kimi k2.6 (Freebuff):** Handle the remaining frontend details: implementing final Awwwards-style polish, adding interactive Framer Motion page transitions, designing premium glassmorphism hover effects, and polishing success modals when a user clears a tier.  
 **Verification Plan**  
 **Automated Tests**  
- Integration tests for the Supabase authentication flow.  
- API tests to ensure the code execution engine correctly handles syntax errors and successful compilations.  
 **Manual Verification**  
- Verify the Awwwards-level design and techy fonts on desktop and mobile.  
- Walk through the user journey: Sign up -> Select "Structure Array" -> Attempt the "Expense Tracker" challenge -> Run code -> View success state -> Verify progress is saved to the dashboard.  
