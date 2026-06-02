export const EXCEPTIONS_TOPICS = {

  "exceptions-intro": {
    title: "Exception Handling Overview — Complete Guide", module: "exceptions", duration: "40 min", difficulty: "Intermediate", xp: 125, icon: "🛡️",
    intro: "An exception is an unexpected event that disrupts the normal flow of a program at runtime. Think of it like driving a car and suddenly a tyre bursts — you can either handle it (pull over and change the tyre) or ignore it (crash). Without exception handling, a single error crashes your entire application. With it, you can gracefully recover, log the problem, show a friendly message, and continue running. Java forces you to handle certain exceptions so your programs don't crash unexpectedly.",

    sections: [
      {
        heading: "What Causes an Exception?",
        content: "Exceptions can happen for many reasons — some are your fault (programming bugs), some are external (missing file, network down). Java groups them so you know which ones to watch out for.",
        list: [
          "⚡ ArithmeticException — int x = 10 / 0; — dividing by zero",
          "⚡ NullPointerException — String s = null; s.length(); — using a null reference",
          "⚡ ArrayIndexOutOfBoundsException — int[] a = new int[3]; a[5]; — invalid index",
          "⚡ NumberFormatException — Integer.parseInt(\"abc\"); — invalid number format",
          "⚡ FileNotFoundException — Opening a file that does not exist",
          "⚡ ClassCastException — Object o = \"hello\"; Integer i = (Integer)o; — wrong cast",
          "⚡ StackOverflowError — Infinite recursion — method calls itself forever",
          "⚡ OutOfMemoryError — JVM has run out of heap memory"
        ]
      },
      {
        heading: "Checked vs Unchecked vs Error — The Big Picture",
        content: "Java divides all throwable events into three categories. Understanding this table is one of the most important things to memorise for interviews and real work.",
        table: {
          headers: ["Category", "What it means", "Must handle?", "Common Examples"],
          rows: [
            ["Checked Exception",   "Predictable problems the compiler FORCES you to handle. Things that can go wrong even in correct code.",          "YES — compile error if not handled",    "IOException, FileNotFoundException, SQLException, ClassNotFoundException"],
            ["Unchecked Exception (RuntimeException)", "Programming mistakes — logic errors in YOUR code. Compiler does NOT force you to handle them.",  "NO — optional but recommended",         "NullPointerException, ArrayIndexOutOfBounds, ArithmeticException, ClassCastException"],
            ["Error",               "Serious system-level problems your program CANNOT recover from. Do NOT catch these unless you know exactly why.", "NO — almost never catch",               "OutOfMemoryError, StackOverflowError, VirtualMachineError, AssertionError"]
          ]
        },
        note: "Simple Rule: If the exception is caused by external factors (missing file, network down, bad DB) → usually Checked. If caused by your own code bugs (null reference, wrong index) → usually Unchecked."
      },
      {
        heading: "Checked Exception — Code Example",
        content: "The compiler FORCES you to handle checked exceptions. If you remove the try-catch, the code won't even compile.",
        code: `import java.io.*;

public class CheckedExample {
    public static void main(String[] args) {

        // ✅ HANDLED — compiler is happy
        try {
            FileReader file = new FileReader("data.txt"); // CHECKED!
            System.out.println("File opened successfully");
            file.close();
        } catch (FileNotFoundException e) {
            System.out.println("File not found: " + e.getMessage());
        } catch (IOException e) {
            System.out.println("IO error: " + e.getMessage());
        }

        // ❌ UNHANDLED — won't compile!
        // FileReader file = new FileReader("data.txt");
        // Compiler error: Unhandled exception type FileNotFoundException
    }
}`,
        output: "File not found: data.txt (No such file or directory)"
      },
      {
        heading: "Unchecked Exception — Code Example",
        content: "The compiler does NOT force you to handle unchecked exceptions. But if you don't, they crash at runtime.",
        code: `public class UncheckedExample {
    public static void main(String[] args) {

        // ❌ Without handling — crashes at runtime
        // int[] numbers = {1, 2, 3};
        // System.out.println(numbers[10]); // ArrayIndexOutOfBoundsException — CRASH!

        // ✅ With handling — graceful recovery
        try {
            int[] numbers = {1, 2, 3};
            System.out.println(numbers[10]); // will throw

        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Caught: " + e.getMessage());
        }

        // NullPointerException
        try {
            String s = null;
            System.out.println(s.length()); // will throw
        } catch (NullPointerException e) {
            System.out.println("Null reference caught!");
        }

        // ArithmeticException
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("Math error: " + e.getMessage());
        }

        System.out.println("Program continues normally ✓");
    }
}`,
        output: "Caught: Index 10 out of bounds for length 3\nNull reference caught!\nMath error: / by zero\nProgram continues normally ✓"
      },
      {
        heading: "Exception Hierarchy — Complete Tree",
        content: "Every exception in Java is an object. They all descend from a single root: Throwable. Understanding this tree is crucial — it explains why certain catch blocks work and why catch order matters.",
        table: {
          headers: ["Exception", "Type", "Common Cause"],
          rows: [
            ["NullPointerException",              "Unchecked", "Method called on null reference"],
            ["ArrayIndexOutOfBoundsException",    "Unchecked", "Accessing invalid array index"],
            ["ClassCastException",                "Unchecked", "Invalid type cast"],
            ["NumberFormatException",             "Unchecked", "Parsing non-numeric string"],
            ["ArithmeticException",               "Unchecked", "Division by zero"],
            ["IllegalArgumentException",          "Unchecked", "Method received invalid argument"],
            ["IllegalStateException",             "Unchecked", "Method called at wrong time"],
            ["ConcurrentModificationException",   "Unchecked", "Collection modified during iteration"],
            ["IOException",                       "Checked",   "File or network operation fails"],
            ["FileNotFoundException",             "Checked",   "File does not exist"],
            ["SQLException",                      "Checked",   "Database operation fails"],
            ["ClassNotFoundException",            "Checked",   "Class not found at runtime"],
            ["StackOverflowError",                "Error",     "Infinite recursion"],
            ["OutOfMemoryError",                  "Error",     "JVM ran out of heap memory"]
          ]
        }
      },
      {
        heading: "Throwable — All Exception Methods",
        content: "Every exception inherits these methods from Throwable. Knowing them is essential for proper error logging and debugging.",
        table: {
          headers: ["Method", "Returns", "What it does"],
          rows: [
            ["getMessage()",          "String",              "Returns the error message passed to the constructor"],
            ["toString()",            "String",              "Returns ClassName: message — e.g. java.lang.NullPointerException"],
            ["printStackTrace()",     "void",                "Prints full stack trace to System.err"],
            ["getCause()",            "Throwable",           "Returns the original exception that caused this one (chaining)"],
            ["getClass().getName()",  "String",              "Returns fully qualified class name of the exception"],
            ["getClass().getSimpleName()", "String",         "Returns just the class name: NullPointerException"],
            ["getStackTrace()",       "StackTraceElement[]", "Returns the call stack as an array"],
            ["initCause(Throwable)",  "Throwable",           "Sets the cause (alternative to passing cause in constructor)"]
          ]
        },
        code: `public class ThrowableMethodsDemo {
    public static void main(String[] args) {
        try {
            String s = null;
            s.length(); // throws NullPointerException
        } catch (NullPointerException e) {
            System.out.println("getMessage()          : " + e.getMessage());
            System.out.println("toString()            : " + e.toString());
            System.out.println("getClass().getName()  : " + e.getClass().getName());
            System.out.println("getSimpleName()       : " + e.getClass().getSimpleName());
            // e.printStackTrace() prints to System.err (red in IDE)
        }
    }
}`,
        output: "getMessage()          : Cannot invoke \"String.length()\" because \"s\" is null\ntoString()            : java.lang.NullPointerException: Cannot invoke...\ngetClass().getName()  : java.lang.NullPointerException\ngetSimpleName()       : NullPointerException"
      }
    ],
    quiz: [
      { q: "NullPointerException is which type?", options: ["Checked", "Unchecked/Runtime", "Error", "Warning"], correct: 1 },
      { q: "Checked exceptions must be:", options: ["Ignored", "Handled with try-catch OR declared with throws", "Only logged", "Never caught"], correct: 1 },
      { q: "Root parent of all exceptions:", options: ["Exception", "RuntimeException", "Throwable", "Error"], correct: 2 },
      { q: "Should you catch Error?", options: ["Yes always", "No — unrecoverable JVM issues", "Only OutOfMemoryError", "Yes with special syntax"], correct: 1 },
      { q: "Which is a CHECKED exception?", options: ["NullPointerException", "IOException", "ArithmeticException", "ClassCastException"], correct: 1 },
      { q: "Which is an UNCHECKED exception?", options: ["IOException", "SQLException", "FileNotFoundException", "ArrayIndexOutOfBoundsException"], correct: 3 }
    ],
    code: `public class SafeOperations {
    static int safeDivide(int a, int b) {
        try { return a / b; }
        catch (ArithmeticException e) {
            System.out.println("Division by zero — returning 0");
            return 0;
        }
    }
    static int safeParse(String s) {
        try { return Integer.parseInt(s); }
        catch (NumberFormatException e) {
            System.out.println("Not a number: '" + s + "' — returning -1");
            return -1;
        }
    }
    static String safeGet(String[] arr, int index) {
        try { return arr[index]; }
        catch (ArrayIndexOutOfBoundsException e) {
            return "INDEX_ERROR";
        }
    }
    public static void main(String[] args) {
        System.out.println(safeDivide(10, 2));
        System.out.println(safeDivide(10, 0));
        System.out.println(safeParse("42"));
        System.out.println(safeParse("hello"));
        String[] names = {"Alice", "Bob"};
        System.out.println(safeGet(names, 0));
        System.out.println(safeGet(names, 5));
    }
}`,
    output: "5\nDivision by zero — returning 0\n0\n42\nNot a number: 'hello' — returning -1\nAlice\nINDEX_ERROR"
  },

  "try-catch": {
    title: "try-catch Block — Complete Guide", module: "exceptions", duration: "40 min", difficulty: "Intermediate", xp: 125, icon: "🎯",
    intro: "The try block wraps code that MIGHT throw an exception. The catch block defines what to do IF that exception occurs. If no exception occurs, the catch block is completely skipped and execution continues normally. You can have multiple catch blocks for different exception types, and Java 7+ allows catching multiple exceptions in one block with |.",

    sections: [
      {
        heading: "Basic try-catch Anatomy",
        content: "The structure of a try-catch block. Each part has a specific purpose — understand what runs when, and what gets skipped.",
        code: `public class TryCatchAnatomy {
    public static void main(String[] args) {

        try {
            // ── RISKY CODE goes here ─────────────────
            // Code that might throw an exception
            System.out.println("Step 1: Before risky line");
            int result = 10 / 0;               // throws ArithmeticException HERE
            System.out.println("Step 2: NEVER reached after exception"); // SKIPPED
        } catch (ArithmeticException e) {
            // ── HANDLER goes here ─────────────────────
            // Runs ONLY if ArithmeticException was thrown
            System.out.println("Step 3: Caught — " + e.getMessage());
            // e.getMessage()    → "/ by zero"
            // e.toString()      → "java.lang.ArithmeticException: / by zero"
            // e.printStackTrace() → full stack trace to console
        }

        // Execution continues here after catch block
        System.out.println("Step 4: Program continues normally ✓");
    }
}`,
        output: "Step 1: Before risky line\nStep 3: Caught — / by zero\nStep 4: Program continues normally ✓"
      },
      {
        heading: "Multiple catch Blocks",
        content: "One try block can have multiple catch blocks — each handles a different exception type. Java checks them TOP-TO-BOTTOM and runs the FIRST matching block only. All remaining catches are skipped.",
        code: `public class MultipleCatch {
    public static void main(String[] args) {

        String[] names = {"Alice", "Bob"};

        try {
            System.out.println(names[5]);          // index 5 doesn't exist!
            // If above didn't throw, this might:
            int num = Integer.parseInt(names[0]);  // "Alice" is not a number
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Array index problem: " + e.getMessage());
        } catch (NumberFormatException e) {
            System.out.println("Number format problem: " + e.getMessage());
        } catch (Exception e) {
            // Generic fallback — catches ANY other exception
            System.out.println("Something else: " + e.getMessage());
        }

        System.out.println();

        // Same try with different input — NumberFormatException fires
        try {
            System.out.println(names[0]);          // OK — "Alice"
            int num = Integer.parseInt(names[0]);  // "Alice" → NumberFormatException
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Array index problem: " + e.getMessage());
        } catch (NumberFormatException e) {
            System.out.println("Number format problem: " + e.getMessage());
        }
    }
}`,
        output: "Array index problem: Index 5 out of bounds for length 2\n\nAlice\nNumber format problem: For input string: \"Alice\""
      },
      {
        heading: "Catch Order Rule — CRITICAL",
        content: "ALWAYS catch MORE SPECIFIC exceptions BEFORE more general ones. Since Exception is the parent of all exceptions, putting catch(Exception) first makes all specific catches below it UNREACHABLE — the compiler will refuse to compile it.",
        code: `public class CatchOrderDemo {
    public static void main(String[] args) {

        // ❌ WRONG — will NOT compile!
        // try {
        //     int x = 10 / 0;
        // } catch (Exception e) {          // TOO BROAD — catches everything
        //     System.out.println("General");
        // } catch (ArithmeticException e) { // ❌ UNREACHABLE — compiler error!
        //     System.out.println("Arithmetic");
        // }

        // ✅ CORRECT — specific first, general last
        try {
            int x = 10 / 0;
        } catch (ArithmeticException e) {   // specific first ✓
            System.out.println("Arithmetic : " + e.getMessage());
        } catch (RuntimeException e) {      // broader second ✓
            System.out.println("Runtime    : " + e.getMessage());
        } catch (Exception e) {             // most general last ✓
            System.out.println("General    : " + e.getMessage());
        }

        // Think of it like a funnel:
        // Specific types catch first (narrow opening)
        // General types catch what falls through (wide base)
        System.out.println("Correct order — compiles and runs fine ✓");
    }
}`,
        output: "Arithmetic : / by zero\nCorrect order — compiles and runs fine ✓",
        note: "The catch order rule is one of the most tested Java interview topics. Specific (child class) BEFORE general (parent class). ArithmeticException before RuntimeException before Exception."
      },
      {
        heading: "Multi-catch — One Block, Multiple Exceptions (Java 7+)",
        content: "When two or more exception types need the exact same handling, use multi-catch with | (pipe). This avoids duplicating the handler code.",
        code: `import java.io.*;

public class MultiCatchDemo {
    public static void main(String[] args) {

        // ❌ Old way — duplicate handlers (repetitive)
        try {
            riskyOperation();
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        } catch (ClassNotFoundException e) {
            System.out.println("Error: " + e.getMessage()); // exact same!
        }

        // ✅ New way (Java 7+) — one block, multiple types
        try {
            riskyOperation();
        } catch (IOException | ClassNotFoundException e) {
            // ONE block handles BOTH exception types
            System.out.println("Caught: " + e.getClass().getSimpleName()
                               + " — " + e.getMessage());
        }

        // Real example — parse and use input
        String[] inputs = {"42", "abc", "100"};
        for (String input : inputs) {
            try {
                int value = Integer.parseInt(input);
                if (value > 50) throw new IllegalArgumentException("Too large: " + value);
                System.out.println("Value: " + value);
            } catch (NumberFormatException | IllegalArgumentException e) {
                System.out.println("Invalid: " + e.getMessage());
            }
        }
    }
    static void riskyOperation() throws IOException {
        throw new IOException("Connection failed");
    }
}`,
        output: "Error: Connection failed\nCaught: IOException — Connection failed\nValue: 42\nInvalid: For input string: \"abc\"\nInvalid: Too large: 100"
      },
      {
        heading: "Nested try-catch",
        content: "You can place a try-catch inside another try or catch block. Useful when inner risky operations might throw different exception types, or when cleanup code itself can throw.",
        code: `public class NestedTryCatch {
    public static void main(String[] args) {

        try {
            System.out.println("Outer try: opening database connection");
            int result = 10 / 2; // OK — no exception
            System.out.println("Outer try: connected, result=" + result);

            try {
                System.out.println("Inner try: reading data from table");
                String s = null;
                s.length(); // NullPointerException thrown here
                System.out.println("Inner try: NEVER reached");
            } catch (NullPointerException e) {
                System.out.println("Inner catch: null value encountered");
                // Handle it here — outer catch doesn't see this
            }

            System.out.println("Outer try: continues after inner catch");

        } catch (ArithmeticException e) {
            System.out.println("Outer catch: math error — " + e.getMessage());
        }

        System.out.println("After all try-catch blocks");
    }
}`,
        output: "Outer try: opening database connection\nOuter try: connected, result=5\nInner try: reading data from table\nInner catch: null value encountered\nOuter try: continues after inner catch\nAfter all try-catch blocks"
      },
      {
        heading: "Real-World Example — Grade Processor",
        content: "A practical application combining multiple catch blocks to handle different types of bad input from users.",
        code: `public class GradeProcessor {

    static char getGrade(String scoreStr) {
        int score = Integer.parseInt(scoreStr); // may throw NumberFormatException

        if (score < 0 || score > 100) {
            throw new IllegalArgumentException("Score must be 0-100, got: " + score);
        }
        return score >= 90 ? 'A' :
               score >= 80 ? 'B' :
               score >= 70 ? 'C' :
               score >= 60 ? 'D' : 'F';
    }

    public static void main(String[] args) {

        String[] inputs = {"95", "82", "71", "55", "abc", "105", "-10"};

        System.out.println("=== Grade Report ===");
        for (String input : inputs) {
            try {
                char grade = getGrade(input);
                System.out.printf("Score %-4s → Grade %c%n", input, grade);
            } catch (NumberFormatException e) {
                System.out.printf("Score %-4s → ERROR: not a valid number%n", input);
            } catch (IllegalArgumentException e) {
                System.out.printf("Score %-4s → ERROR: %s%n", input, e.getMessage());
            }
        }
    }
}`,
        output: "=== Grade Report ===\nScore 95   → Grade A\nScore 82   → Grade B\nScore 71   → Grade C\nScore 55   → Grade F\nScore abc  → ERROR: not a valid number\nScore 105  → ERROR: Score must be 0-100, got: 105\nScore -10  → ERROR: Score must be 0-100, got: -10"
      }
    ],
    quiz: [
      { q: "Which catch block comes first?", options: ["Most general (Exception)", "Most specific (subclass)", "Alphabetically", "Order doesn't matter"], correct: 1 },
      { q: "Can one try block have multiple catch blocks?", options: ["No", "Yes", "Only 2 maximum", "Java 11+ only"], correct: 1 },
      { q: "Multi-catch syntax (Java 7+) uses:", options: ["&&", "||", "|", ","], correct: 2 },
      { q: "What happens to code AFTER the throwing line inside try?", options: ["Runs normally", "Runs once", "Is completely skipped", "Runs in catch"], correct: 2 },
      { q: "Putting catch(Exception e) BEFORE catch(ArithmeticException e) causes:", options: ["Runtime error", "Compile error — unreachable catch", "Both to execute", "Nothing"], correct: 1 },
      { q: "In nested try-catch, inner catch handles:", options: ["All exceptions", "Only exceptions from outer try", "Only exceptions from inner try block", "None"], correct: 2 }
    ],
    code: `public class TryCatchDemo {
    static int process(String input, int divisor) {
        return Integer.parseInt(input) / divisor;
    }
    public static void main(String[] args) {
        String[] inputs = {"100", "abc", "200", "50"};
        int[]    divs   = {5,      2,    0,     10};

        for (int i = 0; i < inputs.length; i++) {
            try {
                int result = process(inputs[i], divs[i]);
                System.out.println("Result: " + result);
            } catch (NumberFormatException e) {
                System.out.println("Not a number: '" + inputs[i] + "'");
            } catch (ArithmeticException e) {
                System.out.println("Divide by zero for: " + inputs[i]);
            }
        }

        // Multi-catch
        try { Integer.parseInt("xyz"); }
        catch (NumberFormatException | ArithmeticException e) {
            System.out.println("Multi-catch: " + e.getClass().getSimpleName());
        }
    }
}`,
    output: "Result: 20\nNot a number: 'abc'\nDivide by zero for: 200\nResult: 5\nMulti-catch: NumberFormatException"
  },

  "finally": {
    title: "finally Block — Complete Guide", module: "exceptions", duration: "35 min", difficulty: "Intermediate", xp: 100, icon: "🔐",
    intro: "The finally block ALWAYS executes — whether an exception was thrown or not, whether it was caught or not. It is the perfect place for cleanup code: closing files, releasing database connections, freeing network resources. Think of it as the 'no matter what happens, do this' block. The only situations where finally does NOT run: System.exit() is called, the JVM crashes, or the thread is forcibly killed.",

    sections: [
      {
        heading: "finally — The 'No Matter What' Block",
        content: "See finally in action. It runs after try and after catch — every single time.",
        code: `public class FinallyDemo {
    public static void main(String[] args) {

        // Scenario 1: No exception — finally still runs
        System.out.println("--- Scenario 1: No exception ---");
        try {
            System.out.println("Step 1: Try block executes");
            int result = 10 / 2; // no exception
            System.out.println("Step 2: Result = " + result);
        } catch (ArithmeticException e) {
            System.out.println("Catch: (SKIPPED — no exception)");
        } finally {
            System.out.println("Step 3: Finally ALWAYS runs");
        }

        System.out.println();

        // Scenario 2: Exception thrown AND caught
        System.out.println("--- Scenario 2: Exception caught ---");
        try {
            System.out.println("Step 1: Opening file");
            int result = 10 / 0;            // throws!
            System.out.println("Step 2: SKIPPED");
        } catch (ArithmeticException e) {
            System.out.println("Step 2: Caught — " + e.getMessage());
        } finally {
            System.out.println("Step 3: Finally runs after catch too");
            System.out.println("Closing resources...");
        }
    }
}`,
        output: "--- Scenario 1: No exception ---\nStep 1: Try block executes\nStep 2: Result = 5\nStep 3: Finally ALWAYS runs\n\n--- Scenario 2: Exception caught ---\nStep 1: Opening file\nStep 2: Caught — / by zero\nStep 3: Finally runs after catch too\nClosing resources..."
      },
      {
        heading: "When Does finally Run? — All 4 Scenarios",
        content: "This table is one of the most frequently asked interview topics about finally.",
        table: {
          headers: ["Scenario", "try block", "catch block", "finally block"],
          rows: [
            ["No exception",          "✅ Runs fully",         "⏭️ Skipped",   "✅ Runs"],
            ["Exception caught",      "⛔ Stops at exception", "✅ Runs",       "✅ Runs"],
            ["Exception NOT caught",  "⛔ Stops at exception", "⏭️ Skipped",   "✅ Runs (then exception propagates)"],
            ["return inside try",     "✅ Runs to return",     "⏭️ Skipped",   "✅ Runs BEFORE the return completes"],
            ["System.exit() called",  "⛔ Stops at exit",      "⛔ Does not run","❌ Does NOT run"]
          ]
        },
        code: `public class FinallyScenarios {

    // finally runs BEFORE return — even if return is in try!
    static int demoWithReturn() {
        try {
            System.out.println("  In try — about to return 1");
            return 1;           // finally STILL runs before this return!
        } finally {
            System.out.println("  In finally — prints BEFORE returning");
        }
    }

    public static void main(String[] args) {
        System.out.println("=== finally with return ===");
        int value = demoWithReturn();
        System.out.println("  Method returned: " + value);

        System.out.println();

        // Exception not caught — finally still runs, then exception propagates
        System.out.println("=== finally when exception propagates ===");
        try {
            try {
                throw new RuntimeException("Uncaught inner!");
            } finally {
                System.out.println("  Inner finally runs despite uncaught exception");
            }
        } catch (RuntimeException e) {
            System.out.println("  Outer catch got: " + e.getMessage());
        }
    }
}`,
        output: "=== finally with return ===\n  In try — about to return 1\n  In finally — prints BEFORE returning\n  Method returned: 1\n\n=== finally when exception propagates ===\n  Inner finally runs despite uncaught exception\n  Outer catch got: Uncaught inner!"
      },
      {
        heading: "Practical finally — Closing Resources",
        content: "The classic use case for finally: ensuring resources like files, database connections, and streams are always closed, even when exceptions occur.",
        code: `import java.io.*;

public class FinallyResources {
    public static void main(String[] args) {

        // Classic pattern: close resource in finally
        FileReader reader = null;
        try {
            reader = new FileReader("data.txt");
            System.out.println("Reading file...");
            int ch = reader.read();
            // ... process file ...
        } catch (FileNotFoundException e) {
            System.out.println("File not found: " + e.getMessage());
        } catch (IOException e) {
            System.out.println("Read error: " + e.getMessage());
        } finally {
            // This ALWAYS runs — even if exception occurs
            if (reader != null) {
                try {
                    reader.close();           // close MUST be called
                    System.out.println("File closed safely in finally ✓");
                } catch (IOException e) {
                    System.out.println("Error closing: " + e.getMessage());
                }
            }
        }
    }
}`,
        output: "File not found: data.txt (No such file or directory)\nFile closed safely in finally ✓",
        note: "Notice the nested try-catch inside finally — because close() itself can throw IOException. This is exactly why try-with-resources was invented."
      },
      {
        heading: "try-with-resources — The Modern Way (Java 7+)",
        content: "Writing finally to close resources is verbose and error-prone. Java 7 introduced try-with-resources: declare resources in the try() parentheses and Java closes them automatically. Any class implementing AutoCloseable can be used.",
        code: `import java.io.*;

public class TryWithResources {
    public static void main(String[] args) {

        // ❌ OLD WAY — verbose, easy to forget close
        FileReader reader = null;
        try {
            reader = new FileReader("data.txt");
            // use reader...
        } catch (IOException e) {
            System.out.println("IO error: " + e.getMessage());
        } finally {
            if (reader != null) {
                try { reader.close(); }
                catch (IOException e) { System.out.println("Close error"); }
            }
        }

        System.out.println();

        // ✅ NEW WAY — reader is AUTOMATICALLY closed when try ends
        try (FileReader r = new FileReader("data.txt")) {
            int character;
            while ((character = r.read()) != -1) {
                System.out.print((char) character);
            }
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
        // r.close() called automatically — even if exception occurs!

        // ✅ MULTIPLE resources — both auto-closed in REVERSE order
        try (FileReader fr = new FileReader("input.txt");
             FileWriter fw = new FileWriter("output.txt")) {
            // use both
            // fw closed FIRST, then fr (reverse declaration order)
        } catch (IOException e) {
            System.out.println("Multi-resource error: " + e.getMessage());
        }

        System.out.println("Resources closed automatically ✓");
    }
}`,
        output: "IO error: data.txt (No such file or directory)\n\nError: data.txt (No such file or directory)\nMulti-resource error: input.txt (No such file or directory)\nResources closed automatically ✓",
        note: "Best Practice: ALWAYS prefer try-with-resources over manually closing in finally. It is cleaner, shorter, and correctly handles suppressed exceptions (when both the body AND close() throw)."
      }
    ],
    quiz: [
      { q: "When does finally NOT run?", options: ["If exception is caught", "If no exception occurs", "If System.exit() is called", "If return is in try"], correct: 2 },
      { q: "finally with a return statement in try:", options: ["Skips finally", "Runs finally BEFORE returning", "Runs finally AFTER returning", "Compile error"], correct: 1 },
      { q: "try-with-resources requires resource to implement:", options: ["Closeable only", "AutoCloseable", "Runnable", "Serializable"], correct: 1 },
      { q: "Multiple resources in try-with-resources close in:", options: ["Declaration order", "Reverse declaration order", "Random order", "All at once"], correct: 1 },
      { q: "Classic use of finally block:", options: ["Throwing new exceptions", "Resource cleanup (closing files/connections)", "Returning values", "Catching exceptions"], correct: 1 },
      { q: "What happens if both try AND finally throw exceptions?", options: ["Both propagate", "try exception propagates", "finally exception REPLACES try exception", "Neither propagates"], correct: 2 }
    ],
    code: `public class FinallyComplete {
    static String readData(boolean throwError) {
        System.out.println("  Opening resource...");
        try {
            if (throwError) throw new RuntimeException("Read failed!");
            return "data successfully read";
        } catch (RuntimeException e) {
            System.out.println("  Caught: " + e.getMessage());
            return "fallback data";
        } finally {
            System.out.println("  Closing resource (always runs)");
        }
    }
    public static void main(String[] args) {
        System.out.println("--- Without error ---");
        System.out.println("  Result: " + readData(false));
        System.out.println();
        System.out.println("--- With error ---");
        System.out.println("  Result: " + readData(true));
    }
}`,
    output: "--- Without error ---\n  Opening resource...\n  Closing resource (always runs)\n  Result: data successfully read\n\n--- With error ---\n  Opening resource...\n  Caught: Read failed!\n  Closing resource (always runs)\n  Result: fallback data"
  },

  "throw-throws": {
    title: "throw and throws — Complete Guide", module: "exceptions", duration: "35 min", difficulty: "Intermediate", xp: 125, icon: "🚀",
    intro: "Java has two related but very different keywords: 'throw' (no s) and 'throws' (with s). throw ACTUALLY throws an exception object at a specific point in code — it triggers the exception right there. throws DECLARES that a method might throw a checked exception — it is a warning to callers that they must handle or re-declare it. Understanding this distinction is essential and tested in almost every Java interview.",

    sections: [
      {
        heading: "throw vs throws — Side-by-Side Comparison",
        content: "These two keywords are constantly confused. Here is the clearest possible comparison.",
        table: {
          headers: ["Keyword", "Purpose", "Where used", "Example"],
          rows: [
            ["throw",  "Actually THROWS an exception object — triggers exception at that line", "Inside a method body, inside try/catch/if blocks", "throw new IllegalArgumentException(\"Age negative\");"],
            ["throws", "DECLARES that a method MIGHT throw a checked exception — warning to caller", "In the method SIGNATURE (after parameter list, before body)", "public void readFile() throws IOException { }"]
          ]
        }
      },
      {
        heading: "throw — Manually Throwing Exceptions",
        content: "Use throw to intentionally cause an exception — usually for input validation and enforcing business rules. You can only throw objects that extend Throwable.",
        code: `public class AgeValidator {

    public static void setAge(int age) {
        // Validate BEFORE using — throw if invalid
        if (age < 0) {
            throw new IllegalArgumentException("Age cannot be negative: " + age);
        }
        if (age > 150) {
            throw new IllegalArgumentException("Age is unrealistically high: " + age);
        }
        System.out.println("Age set successfully: " + age);
    }

    public static void main(String[] args) {
        // Test with valid age
        try {
            setAge(25);    // OK
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // Test with negative age
        try {
            setAge(-5);    // throws
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // Test with impossibly high age
        try {
            setAge(200);   // throws
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // You can throw many types:
        // throw new NullPointerException("Value must not be null");
        // throw new RuntimeException("Unexpected state");
        // throw new IllegalStateException("System not initialised");
    }
}`,
        output: "Age set successfully: 25\nError: Age cannot be negative: -5\nError: Age is unrealistically high: 200"
      },
      {
        heading: "throws — Declaring Exceptions in Method Signature",
        content: "When a method can throw a CHECKED exception but cannot handle it itself, it declares this with 'throws'. The caller then takes responsibility for handling it.",
        code: `import java.io.*;

public class FileProcessor {

    // This method MIGHT throw IOException — declared with 'throws'
    // The CALLER is responsible for handling it
    public void readFile(String path) throws IOException {
        FileReader reader = new FileReader(path); // might throw!
        int ch;
        while ((ch = reader.read()) != -1) {
            System.out.print((char) ch);
        }
        reader.close();
    }

    // Declaring MULTIPLE exceptions
    public void processData(String path)
            throws IOException, IllegalArgumentException {
        if (path == null || path.isEmpty()) {
            throw new IllegalArgumentException("Path cannot be null or empty");
        }
        readFile(path); // might propagate IOException
    }

    public static void main(String[] args) {
        FileProcessor fp = new FileProcessor();

        // CALLER must handle the IOException
        try {
            fp.readFile("data.txt");
        } catch (IOException e) {
            System.out.println("Could not read file: " + e.getMessage());
        }

        // Calling processData — handles both declared exceptions
        try {
            fp.processData(null);
        } catch (IllegalArgumentException e) {
            System.out.println("Bad argument: " + e.getMessage());
        } catch (IOException e) {
            System.out.println("IO error: " + e.getMessage());
        }
    }
}`,
        output: "Could not read file: data.txt (No such file or directory)\nBad argument: Path cannot be null or empty"
      },
      {
        heading: "Exception Chaining — Wrapping Exceptions",
        content: "When you catch a low-level exception and throw a higher-level one, ALWAYS pass the original as the cause. This preserves the full error trail — essential for debugging production issues.",
        code: `public class ExceptionChaining {

    // Simulate a database exception
    static void readFromDatabase(int id) throws Exception {
        throw new Exception("Connection timeout after 30s"); // low-level cause
    }

    // Service layer — wraps low-level in high-level exception
    static void loadUser(int id) throws RuntimeException {
        try {
            readFromDatabase(id);
        } catch (Exception e) {
            // ✅ CORRECT: pass 'e' as the CAUSE — preserves original stack trace
            throw new RuntimeException("Failed to load user with id: " + id, e);

            // ❌ WRONG: throw new RuntimeException("Failed to load user");
            // — loses the original cause completely!
        }
    }

    public static void main(String[] args) {
        try {
            loadUser(42);
        } catch (RuntimeException e) {
            System.out.println("High-level error : " + e.getMessage());
            System.out.println("Root cause       : " + e.getCause().getMessage());
            // e.printStackTrace() would show:
            // RuntimeException: Failed to load user with id: 42
            // Caused by: Exception: Connection timeout after 30s
        }

        // Chaining with custom message at each level
        try {
            try {
                try {
                    throw new Exception("Level 3: DB timeout");
                } catch (Exception e) {
                    throw new RuntimeException("Level 2: Repository error", e);
                }
            } catch (RuntimeException e) {
                throw new RuntimeException("Level 1: Service failure", e);
            }
        } catch (RuntimeException e) {
            System.out.println("\\nException chain:");
            Throwable current = e;
            int level = 1;
            while (current != null) {
                System.out.println("  Level " + level + ": " + current.getMessage());
                current = current.getCause();
                level++;
            }
        }
    }
}`,
        output: "High-level error : Failed to load user with id: 42\nRoot cause       : Connection timeout after 30s\n\nException chain:\n  Level 1: Level 1: Service failure\n  Level 2: Level 2: Repository error\n  Level 3: Level 3: DB timeout"
      },
      {
        heading: "Re-throwing Exceptions",
        content: "Sometimes you catch an exception, do some logging or cleanup, then re-throw it so the caller also handles it.",
        code: `public class Rethrowing {

    static void riskyMethod() throws Exception {
        throw new Exception("Original error");
    }

    // Re-throw the SAME exception (after logging)
    static void methodA() throws Exception {
        try {
            riskyMethod();
        } catch (Exception e) {
            System.out.println("methodA: logging error: " + e.getMessage());
            throw e; // re-throw the SAME exception
        }
    }

    // Re-throw as a DIFFERENT (wrapped) exception
    static void methodB() throws RuntimeException {
        try {
            riskyMethod();
        } catch (Exception e) {
            System.out.println("methodB: wrapping in RuntimeException");
            throw new RuntimeException("Wrapped: " + e.getMessage(), e);
        }
    }

    public static void main(String[] args) {
        // Test re-throw same
        try { methodA(); }
        catch (Exception e) {
            System.out.println("Caller caught from methodA: " + e.getMessage());
        }

        System.out.println();

        // Test re-throw wrapped
        try { methodB(); }
        catch (RuntimeException e) {
            System.out.println("Caller caught from methodB: " + e.getMessage());
            System.out.println("Root cause: " + e.getCause().getMessage());
        }
    }
}`,
        output: "methodA: logging error: Original error\nCaller caught from methodA: Original error\n\nmethodB: wrapping in RuntimeException\nCaller caught from methodB: Wrapped: Original error\nRoot cause: Original error"
      }
    ],
    quiz: [
      { q: "throw keyword is used to:", options: ["Declare exception in signature", "Actually trigger/throw an exception object", "Import exception classes", "Create exception hierarchy"], correct: 1 },
      { q: "throws keyword appears:", options: ["Inside method body", "In method signature after parameters", "In catch block", "In import statement"], correct: 1 },
      { q: "Why pass original exception as cause when chaining?", options: ["Required by Java", "Makes code faster", "Preserves full error trail for debugging", "Required by compiler"], correct: 2 },
      { q: "Can throws declare multiple exceptions?", options: ["No", "Yes — separated by commas", "Only two max", "Yes — separated by |"], correct: 1 },
      { q: "throws is required for:", options: ["All exceptions", "Only RuntimeExceptions", "Only checked exceptions", "Only Errors"], correct: 2 },
      { q: "getCause() returns:", options: ["Exception message", "Stack trace", "The original wrapped exception", "null always"], correct: 2 }
    ],
    code: `public class ThrowThrowsDemo {
    // throws declaration — caller must handle
    static void validateAge(int age) throws IllegalArgumentException {
        if (age < 0 || age > 120)
            throw new IllegalArgumentException("Invalid age: " + age);
        System.out.println("Age valid: " + age);
    }

    static void validateName(String name) throws IllegalArgumentException {
        if (name == null || name.trim().length() < 2)
            throw new IllegalArgumentException("Name too short: '" + name + "'");
        System.out.println("Name valid: " + name);
    }

    public static void main(String[] args) {
        Object[][] tests = {
            {"Alice", 25}, {"B", 30}, {"Charlie", -5}, {"Dave", 40}
        };
        for (Object[] test : tests) {
            try {
                validateName((String) test[0]);
                validateAge((int) test[1]);
                System.out.println("  → Registration OK!");
            } catch (IllegalArgumentException e) {
                System.out.println("  → REJECTED: " + e.getMessage());
            }
        }
    }
}`,
    output: "Age valid: 25\nName valid: Alice\n  → Registration OK!\nName too short: 'B'\n  → REJECTED: Name too short: 'B'\nAge valid: -5\nName valid: Charlie\n  → REJECTED: Invalid age: -5\nName valid: Dave\nAge valid: 40\n  → Registration OK!"
  },

  "custom-exceptions": {
    title: "Custom Exceptions — Complete Guide", module: "exceptions", duration: "40 min", difficulty: "Intermediate", xp: 125, icon: "⚙️",
    intro: "Built-in exceptions like NullPointerException or IOException are generic. Custom exceptions let you create meaningful, domain-specific errors that make your code self-documenting. For example, InsufficientFundsException tells you exactly what went wrong far better than a plain RuntimeException. Custom exceptions make errors self-documenting, carry extra context, allow callers to catch specific errors, and separate business rule violations from technical errors.",

    sections: [
      {
        heading: "Why Create Custom Exceptions?",
        content: "Generic exceptions lose information. Custom exceptions communicate exactly what went wrong and can carry additional relevant data.",
        list: [
          "✅ Self-documenting — the exception NAME tells exactly what failed: InsufficientFundsException, ProductNotFoundException",
          "✅ Extra context — carry domain-specific data: the invalid amount, the missing product ID, the failing field name",
          "✅ Specific handling — callers can catch(InsufficientFundsException) and handle it differently from other errors",
          "✅ Separation — business rule violations vs technical errors are clearly distinct",
          "✅ API documentation — throws InsufficientFundsException in Javadoc tells users exactly what to expect",
          "📋 Examples: InsufficientFundsException, OrderNotFoundException, InvalidAgeException, PaymentDeclinedException, DuplicateEmailException"
        ]
      },
      {
        heading: "Custom CHECKED Exception — Extend Exception",
        content: "Extend Exception to create a checked exception. The compiler forces callers to handle it. Use for recoverable conditions the caller should explicitly deal with.",
        code: `// ── Step 1: Define the custom checked exception ──────────────
public class InsufficientFundsException extends Exception {

    private double amount; // extra context about the error

    // Constructor 1: just a message
    public InsufficientFundsException(String message) {
        super(message);
    }

    // Constructor 2: message + extra data (most useful)
    public InsufficientFundsException(String message, double amount) {
        super(message);
        this.amount = amount;
    }

    // Constructor 3: message + cause (for chaining)
    public InsufficientFundsException(String message, Throwable cause) {
        super(message, cause);
    }

    // Getter for the extra data
    public double getAmount() { return amount; }
}`,
        output: "// Exception class defined — ready to use"
      },
      {
        heading: "Using the Custom Checked Exception — BankAccount",
        content: "Now use InsufficientFundsException in a real bank account class. Callers MUST handle it — compiler enforces this.",
        code: `public class BankAccount {
    private String owner;
    private double balance;

    public BankAccount(String owner, double initialBalance) {
        this.owner   = owner;
        this.balance = initialBalance;
    }

    // 'throws' tells callers: you MUST handle InsufficientFundsException
    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be positive: " + amount);
        }
        if (amount > balance) {
            throw new InsufficientFundsException(
                "Cannot withdraw ₹" + amount + ". Balance is only ₹" + balance,
                amount  // pass extra context
            );
        }
        balance -= amount;
        System.out.printf("Withdrew ₹%.0f. New balance: ₹%.0f%n", amount, balance);
    }

    public void showBalance() {
        System.out.printf("%s's balance: ₹%.0f%n", owner, balance);
    }

    public static void main(String[] args) {
        BankAccount account = new BankAccount("Alice", 500);
        account.showBalance();

        try {
            account.withdraw(200);  // OK
            account.withdraw(400);  // throws InsufficientFundsException
        } catch (InsufficientFundsException e) {
            System.out.println("Error     : " + e.getMessage());
            System.out.printf("Attempted : ₹%.0f%n", e.getAmount());
        }

        account.showBalance(); // unchanged at 300
    }
}`,
        output: "Alice's balance: ₹500\nWithdrew ₹200. New balance: ₹300\nError     : Cannot withdraw ₹400. Balance is only ₹300\nAttempted : ₹400\nAlice's balance: ₹300"
      },
      {
        heading: "Custom UNCHECKED Exception — Extend RuntimeException",
        content: "Extend RuntimeException for unchecked custom exceptions. Use for programming errors or conditions not expected to be recoverable. Callers do NOT need to declare or catch it.",
        code: `// Custom unchecked — extends RuntimeException
class InvalidAgeException extends RuntimeException {
    private int age;

    public InvalidAgeException(String message, int age) {
        super(message);
        this.age = age;
    }

    public int getAge() { return age; }
}

// Usage — caller does NOT need to declare or catch
class UserRegistration {

    public static void register(String name, int age) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be empty");
        }
        if (age < 18) {
            throw new InvalidAgeException(
                "Must be 18+ to register. Given: " + age, age
            );
        }
        System.out.println("✅ " + name + " (age " + age + ") registered!");
    }

    public static void main(String[] args) {
        String[][] users = {{"Alice","25"},{"Bob","15"},{"","20"},{"Charlie","18"}};

        for (String[] u : users) {
            try {
                register(u[0], Integer.parseInt(u[1]));
            } catch (InvalidAgeException e) {
                System.out.println("❌ Age error: " + e.getMessage() + " (was " + e.getAge() + ")");
            } catch (IllegalArgumentException e) {
                System.out.println("❌ Input error: " + e.getMessage());
            }
        }
    }
}`,
        output: "✅ Alice (age 25) registered!\n❌ Age error: Must be 18+ to register. Given: 15 (was 15)\n❌ Input error: Name cannot be empty\n✅ Charlie (age 18) registered!"
      },
      {
        heading: "Exception Hierarchy for Real Applications",
        content: "Real apps define a hierarchy of custom exceptions — a base AppException that all custom exceptions extend. This lets callers catch either specific exceptions or the general AppException.",
        code: `// Base exception for the entire application
class AppException extends RuntimeException {
    private final int errorCode;
    AppException(int code, String msg) {
        super(msg);
        this.errorCode = code;
    }
    int getErrorCode() { return errorCode; }
}

// Specific exceptions extend the base
class ProductNotFoundException extends AppException {
    ProductNotFoundException(String id) {
        super(404, "Product not found: " + id);
    }
}
class OutOfStockException extends AppException {
    OutOfStockException(String product, int requested, int available) {
        super(409, String.format("'%s': need %d, only %d available",
              product, requested, available));
    }
}
class PaymentFailedException extends AppException {
    PaymentFailedException(String reason) {
        super(402, "Payment failed: " + reason);
    }
}

class OnlineShop {
    private java.util.Map<String,Integer> stock = new java.util.HashMap<>();

    OnlineShop() {
        stock.put("LAPTOP", 5); stock.put("PHONE", 2); stock.put("TABLET", 0);
    }

    void order(String productId, int qty) {
        if (!stock.containsKey(productId))
            throw new ProductNotFoundException(productId);
        int available = stock.get(productId);
        if (available < qty)
            throw new OutOfStockException(productId, qty, available);
        stock.put(productId, available - qty);
        System.out.println("✅ Ordered " + qty + "x " + productId);
    }
}

public class ShopDemo {
    public static void main(String[] args) {
        OnlineShop shop = new OnlineShop();
        String[][] orders = {
            {"LAPTOP","2"}, {"PHONE","5"}, {"KEYBOARD","1"}, {"TABLET","1"}
        };
        for (String[] o : orders) {
            try {
                shop.order(o[0], Integer.parseInt(o[1]));
            } catch (AppException e) {  // catches ANY AppException subclass
                System.out.printf("❌ [%d] %s%n", e.getErrorCode(), e.getMessage());
            }
        }
    }
}`,
        output: "✅ Ordered 2x LAPTOP\n❌ [409] 'PHONE': need 5, only 2 available\n❌ [404] Product not found: KEYBOARD\n❌ [409] 'TABLET': need 1, only 0 available"
      }
    ],
    quiz: [
      { q: "Checked custom exception extends:", options: ["Error", "RuntimeException", "Exception", "Throwable"], correct: 2 },
      { q: "Unchecked custom exception extends:", options: ["Error", "RuntimeException", "Exception", "Throwable"], correct: 1 },
      { q: "Why create custom exceptions?", options: ["Required by Java", "Better readability, specific handling, extra context", "Faster performance", "To avoid try-catch"], correct: 1 },
      { q: "Custom exceptions can carry:", options: ["Only message", "Nothing extra", "Custom fields with domain-specific data", "Only stack trace"], correct: 2 },
      { q: "InsufficientFundsException extends Exception — callers must:", options: ["Ignore it", "Handle with try-catch OR declare with throws", "Only log it", "Nothing required"], correct: 1 },
      { q: "App exception hierarchy helps callers:", options: ["Catch all with one type", "Nothing special", "Only catch specific types", "Skip handling"], correct: 0 }
    ],
    code: `class ValidationException extends RuntimeException {
    private final String field;
    ValidationException(String field, String msg) {
        super("Field '" + field + "': " + msg);
        this.field = field;
    }
    String getField() { return field; }
}

public class UserValidator {
    static void validate(String name, String email, int age) {
        if (name == null || name.length() < 2)
            throw new ValidationException("name", "must be at least 2 chars");
        if (email == null || !email.contains("@"))
            throw new ValidationException("email", "must contain @");
        if (age < 0 || age > 120)
            throw new ValidationException("age", "must be 0-120, got " + age);
        System.out.println("✓ Valid: " + name + " | " + email + " | age " + age);
    }
    public static void main(String[] args) {
        Object[][] tests = {
            {"Alice", "alice@test.com", 25},
            {"B",     "alice@test.com", 25},
            {"Alice", "notanemail",     25},
            {"Alice", "alice@test.com", -5}
        };
        for (Object[] t : tests) {
            try { validate((String)t[0], (String)t[1], (int)t[2]); }
            catch (ValidationException e) {
                System.out.println("✗ " + e.getMessage());
            }
        }
    }
}`,
    output: "✓ Valid: Alice | alice@test.com | age 25\n✗ Field 'name': must be at least 2 chars\n✗ Field 'email': must contain @\n✗ Field 'age': must be 0-120, got -5"
  },

  "exception-hierarchy": {
    title: "Exception Hierarchy & Best Practices", module: "exceptions", duration: "40 min", difficulty: "Intermediate", xp: 125, icon: "🌲",
    intro: "The Java exception hierarchy is a tree rooted at Throwable. Every exception object you catch, throw, or declare is a node in this tree. Understanding the hierarchy explains why catch order matters, why certain catches are unreachable, and how to design your own exception families. This chapter also covers the professional best practices that separate clean, maintainable code from common anti-patterns.",

    sections: [
      {
        heading: "The Complete Java Exception Hierarchy",
        content: "Every class in Java's exception system descends from Throwable. Here is the complete picture.",
        list: [
          "📦 java.lang.Object",
          "  └── java.lang.Throwable  ← root of ALL exceptions and errors",
          "       ├── java.lang.Error  ← serious system problems (DO NOT catch)",
          "       │    ├── OutOfMemoryError  ← JVM ran out of heap memory",
          "       │    ├── StackOverflowError  ← infinite recursion",
          "       │    ├── VirtualMachineError",
          "       │    └── AssertionError",
          "       └── java.lang.Exception  ← things programs SHOULD handle",
          "            ├── IOException  ← CHECKED: file/network",
          "            │    ├── FileNotFoundException",
          "            │    ├── EOFException",
          "            │    └── SocketException",
          "            ├── SQLException  ← CHECKED: database",
          "            ├── ClassNotFoundException  ← CHECKED",
          "            └── RuntimeException  ← UNCHECKED: programming bugs",
          "                 ├── NullPointerException",
          "                 ├── ArrayIndexOutOfBoundsException",
          "                 ├── ArithmeticException",
          "                 ├── NumberFormatException",
          "                 ├── ClassCastException",
          "                 ├── IllegalArgumentException",
          "                 │    └── IllegalStateException",
          "                 ├── UnsupportedOperationException",
          "                 └── ConcurrentModificationException"
        ]
      },
      {
        heading: "Error vs Exception — Critical Difference",
        content: "Both extend Throwable but they represent fundamentally different problems. Error = JVM is broken. Exception = your program has a problem.",
        code: `public class ErrorVsException {
    public static void main(String[] args) {

        // Exception — catch and handle
        try {
            int[] arr = new int[3];
            arr[10] = 1; // ArrayIndexOutOfBoundsException
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Exception caught and handled: " + e.getMessage());
            // Program can continue normally ✓
        }

        // Error — almost never catch
        // StackOverflowError would be caused by:
        // void infinite() { infinite(); } — infinite recursion

        // Rare legitimate case — catching Error to log before shutdown
        try {
            recurse(0);
        } catch (StackOverflowError e) {
            // Only valid reason: log it, then let the program end
            System.out.println("Stack overflow detected — program ending");
        }

        System.out.println("After handling both");
    }

    static void recurse(int depth) {
        recurse(depth + 1); // infinite recursion
    }
}`,
        output: "Exception caught and handled: Index 10 out of bounds for length 3\nStack overflow detected — program ending\nAfter handling both",
        note: "⚠️ Never catch Error in normal application code. Errors like OutOfMemoryError mean the JVM is in an unstable state. Catching them can mask serious problems. In almost all cases, let them propagate and fix the root cause."
      },
      {
        heading: "✅ Best Practices — Do This",
        content: "These practices are what separate professional Java code from beginner code.",
        list: [
          "✅ Catch SPECIFIC exceptions — catch(FileNotFoundException) is better than catch(Exception)",
          "✅ ALWAYS log the exception — never silently swallow. At minimum: System.err.println(e). Better: logger.error(\"msg\", e)",
          "✅ Use try-with-resources — for any class implementing Closeable (streams, connections, readers)",
          "✅ Include CONTEXT in messages — 'Invalid user ID: 42' is far more useful than 'Invalid input'",
          "✅ Chain exceptions with cause — when re-throwing: throw new ServiceException(\"Failed\", originalException)",
          "✅ Create CUSTOM exceptions for business logic — OrderNotFoundException beats plain RuntimeException",
          "✅ Document with @throws Javadoc — /** @throws IOException if the file cannot be read */",
          "✅ Fail FAST — validate inputs at the start of methods and throw immediately if invalid"
        ]
      },
      {
        heading: "❌ Anti-Patterns — Never Do This",
        content: "These are the most common exception handling mistakes in real Java codebases.",
        list: [
          "❌ EMPTY catch block — catch(Exception e) { } — silently swallows ALL errors. Bug nightmares guaranteed",
          "❌ Catching Exception everywhere — too broad. You will accidentally catch and hide programming bugs",
          "❌ Catching Throwable or Error — almost never appropriate. These signal JVM-level problems",
          "❌ Using exceptions for flow control — don't use exceptions as if/else. They are 10-100x slower to create",
          "❌ Printing without stack trace — System.out.println(e.getMessage()) loses the call stack. Use e.printStackTrace() or logger.error(\"\", e)",
          "❌ Losing the cause — throw new ServiceException(\"error\") without passing e — you lost the original cause!",
          "❌ Catching and re-throwing the same type pointlessly — catch(IOException e) { throw e; } — just let it propagate",
          "❌ Declaring throws Exception — too vague. Declare the specific exception type"
        ]
      },
      {
        heading: "Best Practices — Code Comparison",
        content: "See the anti-patterns and their fixes side by side in real code.",
        code: `public class BestPracticesDemo {

    // ❌ BAD: empty catch — hides ALL bugs
    static void bad1() {
        try {
            riskyOp();
        } catch (Exception e) {
            // NOTHING — bugs silently disappear
        }
    }

    // ❌ BAD: losing the cause
    static void bad2(int userId) {
        try {
            riskyOp();
        } catch (RuntimeException e) {
            throw new RuntimeException("Failed for user " + userId);
            // Original cause LOST — debugging nightmare
        }
    }

    // ✅ GOOD: specific catch, context, chaining
    static void good(int userId) {
        try {
            riskyOp();
        } catch (RuntimeException e) {
            System.out.println("[ERROR] userId=" + userId + ": " + e.getMessage());
            throw new RuntimeException("Failed processing user " + userId, e);
            //                                                           ↑ cause preserved!
        }
    }

    static void riskyOp() {
        throw new RuntimeException("DB connection lost");
    }

    public static void main(String[] args) {
        // Test the good version
        try {
            good(42);
        } catch (RuntimeException e) {
            System.out.println("Top-level  : " + e.getMessage());
            System.out.println("Root cause : " + e.getCause().getMessage());
        }
    }
}`,
        output: "[ERROR] userId=42: DB connection lost\nTop-level  : Failed processing user 42\nRoot cause : DB connection lost"
      },
      {
        heading: "Top 10 Interview Questions — Exception Handling",
        content: "These questions come up in almost every Java technical interview. Study each answer carefully.",
        list: [
          "Q1: Checked vs unchecked? → Checked: compiler forces you to handle (extend Exception). Unchecked: compiler doesn't (extend RuntimeException). Checked = external failures. Unchecked = programming bugs.",
          "Q2: throw vs throws? → throw (no s) actually throws the exception object at a point in code. throws (with s) appears in the method signature to declare that the method MAY throw that type.",
          "Q3: Does finally always execute? → Almost always YES. Exceptions: System.exit() called, JVM crashes, thread killed. Even return in try — finally runs BEFORE the method returns.",
          "Q4: Both try AND finally throw? → finally exception REPLACES the try exception. The original try exception is silently lost. Use try-with-resources to avoid this.",
          "Q5: Exception chaining/wrapping? → Catch low-level, rethrow high-level, pass original as cause: throw new ServiceException('msg', originalException). Preserves full error trail.",
          "Q6: When to create custom exceptions? → When built-in exceptions don't clearly express the business problem. When callers need different handling for different errors. When extra data (amount, field name) is needed.",
          "Q7: try-with-resources vs finally? → Declares resources in try() — auto-closed after block. Better than finally: less code, correctly handles case where both body AND close() throw (suppressed exceptions).",
          "Q8: Error vs Exception? → Both extend Throwable. Error = serious, unrecoverable JVM problems (don't catch). Exception = recoverable application problems (catch and handle).",
          "Q9: try without catch? → YES — try + finally (no catch) is valid. try-with-resources without catch is also valid. But plain try with no catch and no finally = compile error.",
          "Q10: Prevent NullPointerException? → null checks (if obj != null), Optional in Java 8+, Objects.requireNonNull(), initialise variables properly, @NotNull annotations."
        ]
      }
    ],
    quiz: [
      { q: "Which is a checked exception?", options: ["NullPointerException", "IOException", "IllegalArgumentException", "ArrayIndexOutOfBoundsException"], correct: 1 },
      { q: "Exception swallowing means:", options: ["Catching and rethrowing", "Catching and doing nothing (empty catch)", "Using multi-catch", "Wrapping exception"], correct: 1 },
      { q: "Correct catch order:", options: ["Superclass first", "Subclass (specific) first", "Alphabetical", "Any order works"], correct: 1 },
      { q: "Using exceptions for normal flow control is:", options: ["Good practice", "Bad — very slow and unreadable", "Acceptable in loops", "Required for Streams"], correct: 1 },
      { q: "Both try and finally throw — which exception propagates?", options: ["try exception", "Both propagate", "finally exception replaces try exception", "Neither"], correct: 2 },
      { q: "What does getCause() return?", options: ["The exception message", "The full stack trace", "The original exception that caused this one", "null always"], correct: 2 }
    ],
    code: `public class HierarchyDemo {
    public static void main(String[] args) {
        // Show how hierarchy affects catching
        Object[] items = {null, new int[3], "hello", 42};
        for (Object o : items) {
            try {
                if (o == null)                   ((String)o).length();    // NPE
                else if (o instanceof int[])     ((int[])o)[10] = 1;     // AIOBE
                else if (o instanceof String)    Integer.parseInt((String)o); // NFE
                else System.out.println("OK: " + o);
            } catch (NullPointerException e) {
                System.out.println("NPE caught: null reference");
            } catch (ArrayIndexOutOfBoundsException e) {
                System.out.println("AIOBE caught: " + e.getMessage());
            } catch (NumberFormatException e) {
                System.out.println("NFE caught: '" + o + "' is not a number");
            }
            // Note: all three extend RuntimeException
            // Catching RuntimeException above would catch all of them
        }
    }
}`,
    output: "NPE caught: null reference\nAIOBE caught: Index 10 out of bounds for length 3\nNFE caught: 'hello' is not a number\nOK: 42"
  }

};
