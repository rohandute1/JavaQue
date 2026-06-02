export const BASICS_TOPICS = {
  "introduction": {
    title: "Introduction to Java", module: "basics", duration: "10 min", difficulty: "Beginner", xp: 50, icon: "☕",
    intro: "Java is a high-level, object-oriented programming language created by James Gosling at Sun Microsystems in 1995. It follows 'Write Once, Run Anywhere' (WORA) — compiled Java bytecode runs on any platform with a JVM, making it the world's most widely used language for enterprise and Android development.",
    sections: [
      {
        heading: "Why Learn Java?",
        content: "Java powers Android apps, enterprise backends (Spring Boot), big data tools (Hadoop, Spark), and billions of devices worldwide.",
        list: [
          "🌍 Platform Independent — runs on any OS via JVM",
          "🏢 Used by Google, Amazon, Netflix, Uber, LinkedIn",
          "📱 Powers over 3 billion Android devices",
          "💰 Java developers earn $90,000–$140,000+ annually",
          "📚 Massive ecosystem: Spring, Hibernate, Maven, Gradle",
          "🔒 Strong type system, memory management, and security"
        ]
      },
      {
        heading: "JDK vs JRE vs JVM",
        content: "These three terms confuse many beginners. Here is a clear breakdown of what each one does.",
        table: {
          headers: ["Term","Full Form","What it does","Who needs it"],
          rows: [
            ["JVM","Java Virtual Machine","Executes bytecode, manages memory","Everyone"],
            ["JRE","Java Runtime Environment","JVM + standard class libraries","Running Java apps"],
            ["JDK","Java Development Kit","JRE + compiler + dev tools","Developers (you!)"]
          ]
        }
      },
      {
        heading: "Your First Java Program",
        content: "Every Java program needs a public class whose name matches the filename. Execution always starts at the main method.",
        code: `// File: HelloWorld.java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println("Welcome to JavaQue!");
        // Print Java version
        System.out.println("Java: " + System.getProperty("java.version"));
    }
}
// Compile: javac HelloWorld.java
// Run:     java HelloWorld`,
        output: "Hello, World!\nWelcome to JavaQue!\nJava: 17.0.8",
        note: "The main method signature must be exactly: public static void main(String[] args)"
      }
    ],
    quiz: [
      { q: "Who created Java?", options: ["Bill Gates","James Gosling","Linus Torvalds","Dennis Ritchie"], correct: 1 },
      { q: "What does JVM stand for?", options: ["Java Variable Manager","Java Virtual Machine","Java Version Manager","Java Visual Mode"], correct: 1 },
      { q: "What file extension does compiled Java bytecode have?", options: [".java",".exe",".class",".jar"], correct: 2 },
      { q: "What does WORA mean?", options: ["Write Once Read Always","Write Once Run Anywhere","Web Object Runtime API","Write Output Read Again"], correct: 1 }
    ],
    code: `public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n        System.out.println("Java Version: " + System.getProperty("java.version"));\n        System.out.println("OS: " + System.getProperty("os.name"));\n    }\n}`,
    output: "Hello, World!\nJava Version: 17.0.8\nOS: Windows 11"
  },

  "variables": {
    title: "Variables in Java — Complete Guide", module: "basics", duration: "35 min", difficulty: "Beginner", xp: 120, icon: "📦",
    intro: "A variable is a container used to store data in memory. Think of it like a labelled box — the box has a name (variable name), holds something inside (value), and is made of a specific material (data type). Java is statically typed, meaning every variable must declare its type upfront. Without variables, programs cannot store information, perform calculations, or remember anything between steps.",

    sections: [

      // ── 1. Real-life analogy ──────────────────────────────────────
      {
        heading: "What is a Variable? — Real Life Analogy",
        content: "Before writing any code, understand variables through everyday objects. This mental model will make everything else click immediately.",
        list: [
          "🍶 A water bottle: the bottle name = variable name, water inside = value, type of bottle = data type",
          "📦 A labelled box: write 'age' on a box and put 25 inside — that is int age = 25 in Java",
          "📱 A contact in your phone: name = 'Alice', number = '9876543210' — each field is a variable",
          "🏦 A bank account: account holder = variable name, balance = value, currency type = data type",
          "📝 A school register: student name, roll number, marks — all stored as separate variables"
        ],
        note: "Every piece of information a program works with — age, name, price, result — must be stored in a variable. Variables are the memory of your program."
      },

      // ── 2. Syntax ────────────────────────────────────────────────
      {
        heading: "Variable Syntax — Breaking It Down",
        content: "The syntax for declaring a variable in Java is: datatype variableName = value; Every part has a specific role — skip any part and the program will not compile.",
        table: {
          headers: ["Part", "Example", "What it means"],
          rows: [
            ["Data Type", "int", "What kind of data — whole number, text, decimal, true/false"],
            ["Variable Name", "age", "The label you use to refer to this box of data"],
            ["= (Assignment)", "=", "Put this value into the variable (not 'equals' in math sense)"],
            ["Value", "25", "The actual data stored inside the variable"],
            ["Semicolon", ";", "Marks end of the statement — required in Java"]
          ]
        },
        code: `public class VariableSyntax {
    public static void main(String[] args) {

        // datatype  variableName = value;
        int         age          = 25;
        String      name         = "Rohan";
        double      salary       = 50000.00;
        boolean     isActive     = true;
        char        grade        = 'A';

        System.out.println("Name:   " + name);
        System.out.println("Age:    " + age);
        System.out.println("Salary: " + salary);
        System.out.println("Active: " + isActive);
        System.out.println("Grade:  " + grade);
    }
}`,
        output: "Name:   Rohan\nAge:    25\nSalary: 50000.0\nActive: true\nGrade:  A"
      },

      // ── 3. Why variables matter ──────────────────────────────────
      {
        heading: "Why Variables Are Important",
        content: "Without variables, programs are useless. You cannot store user input, remember a calculation result, or build any real application. Here is the difference:",
        list: [
          "🔴 Without variables: System.out.println(10 + 20) — values are hardcoded, cannot be reused",
          "🟢 With variables: int a = 10; int b = 20; System.out.println(a + b) — values can change and reuse",
          "📱 Store user data — name entered by user, age, email address",
          "🧮 Perform calculations — total = price * quantity, tax = amount * 0.18",
          "💾 Save temporary results — keep track of a loop counter, running total",
          "🔄 Reuse values multiple times — define PI once, use it in 10 formulas",
          "🏗️ Build real applications — every app from Instagram to Gmail uses thousands of variables"
        ],
        code: `public class WhyVariables {
    public static void main(String[] args) {

        // WITHOUT variables — hardcoded, inflexible
        System.out.println("Price without variable: " + (100 * 3));

        // WITH variables — flexible, reusable, readable
        int    pricePerItem = 100;
        int    quantity     = 3;
        double taxRate      = 0.18;

        int    subtotal = pricePerItem * quantity;
        double tax      = subtotal * taxRate;
        double total    = subtotal + tax;

        System.out.println("Item Price : " + pricePerItem);
        System.out.println("Quantity   : " + quantity);
        System.out.println("Subtotal   : " + subtotal);
        System.out.println("Tax (18%)  : " + tax);
        System.out.println("Total      : " + total);
    }
}`,
        output: "Price without variable: 300\nItem Price : 100\nQuantity   : 3\nSubtotal   : 300\nTax (18%)  : 54.0\nTotal      : 354.0"
      },

      // ── 4. Three types of variables ──────────────────────────────
      {
        heading: "3 Types of Variables in Java",
        content: "Java has three types of variables based on WHERE they are declared. This determines their lifetime, scope (where they can be used), and how memory is allocated.",
        table: {
          headers: ["Type", "Declared Where", "Scope", "Memory", "Shared?"],
          rows: [
            ["Local Variable", "Inside a method/block", "Only within that method", "Stack — temporary", "No — each call is separate"],
            ["Instance Variable", "Inside class, outside methods", "Entire object", "Heap — with object", "No — each object has its own"],
            ["Static Variable", "Inside class with static keyword", "Entire class", "Class memory (Method Area)", "Yes — all objects share one copy"]
          ]
        }
      },

      // ── 5. Local Variable ────────────────────────────────────────
      {
        heading: "Type 1 — Local Variable",
        content: "A variable declared inside a method, constructor, or block is a local variable. It is created when the method starts and destroyed when it ends. Think of it like a temporary sticky note — useful during the task, thrown away after.",
        list: [
          "📍 Declared INSIDE a method or block { }",
          "⏳ Lives only while that method is executing",
          "🚫 Cannot be accessed from outside the method",
          "⚠️ MUST be initialized before use — no default value",
          "💡 Use case: loop counters, temporary calculations, method-level logic"
        ],
        code: `public class LocalVariableDemo {

    static void calculateDiscount() {
        // 'discount' is a LOCAL variable — only exists inside this method
        double originalPrice = 1200.00;
        double discountRate  = 0.15;         // 15% discount
        double discountAmt   = originalPrice * discountRate;
        double finalPrice    = originalPrice - discountAmt;

        System.out.println("Original Price : ₹" + originalPrice);
        System.out.println("Discount (15%) : ₹" + discountAmt);
        System.out.println("Final Price    : ₹" + finalPrice);
    } // <-- 'originalPrice', 'discountRate' etc. are DESTROYED here

    public static void main(String[] args) {
        calculateDiscount();
        // System.out.println(originalPrice); // ERROR! Cannot access here
    }
}`,
        output: "Original Price : ₹1200.0\nDiscount (15%) : ₹180.0\nFinal Price    : ₹1020.0",
        note: "⚠️ Local variables have NO default value. Writing int a; System.out.println(a); causes a COMPILE ERROR — Java forces you to initialize them before use."
      },

      // ── 6. Instance Variable ─────────────────────────────────────
      {
        heading: "Type 2 — Instance Variable",
        content: "A variable declared inside a class but outside any method is an instance variable. Each object (instance) of the class gets its own separate copy. They represent the properties or attributes of an object — like a Student's name, age, and marks.",
        list: [
          "📍 Declared INSIDE the class, OUTSIDE all methods",
          "🧍 Each object gets its OWN independent copy",
          "✅ Gets a DEFAULT value if not initialized (0, false, null)",
          "🔑 Accessed using object reference: student1.name",
          "💡 Use case: properties of an object — name, age, salary, address"
        ],
        code: `class Student {
    // These are INSTANCE variables — each Student object has its own
    String name;
    int    age;
    double marks;
    String college;

    public static void main(String[] args) {

        // Object 1 — has its OWN copy of name, age, marks
        Student s1 = new Student();
        s1.name    = "Rohan";
        s1.age     = 22;
        s1.marks   = 88.5;
        s1.college = "ABC College";

        // Object 2 — completely different values, same variable names
        Student s2 = new Student();
        s2.name    = "Aman";
        s2.age     = 21;
        s2.marks   = 91.0;
        s2.college = "ABC College";

        System.out.println("=== Student 1 ===");
        System.out.println("Name   : " + s1.name);
        System.out.println("Age    : " + s1.age);
        System.out.println("Marks  : " + s1.marks);

        System.out.println("=== Student 2 ===");
        System.out.println("Name   : " + s2.name);
        System.out.println("Age    : " + s2.age);
        System.out.println("Marks  : " + s2.marks);
    }
}`,
        output: "=== Student 1 ===\nName   : Rohan\nAge    : 22\nMarks  : 88.5\n=== Student 2 ===\nName   : Aman\nAge    : 21\nMarks  : 91.0"
      },

      // ── 7. Static Variable ───────────────────────────────────────
      {
        heading: "Type 3 — Static Variable",
        content: "A variable declared with the 'static' keyword is a static variable. Unlike instance variables, only ONE copy exists — shared by all objects of the class. Think: every student at ABC College shares the same college name. No need to store it separately for each student.",
        list: [
          "📍 Declared with 'static' keyword inside the class",
          "🔗 ONE copy shared by ALL objects — changing it affects everyone",
          "📞 Accessed using class name: Student.college (not object name)",
          "🧠 Loaded into memory when the class is loaded — before any object is created",
          "💡 Use cases: counters, constants, shared configurations like college name, company name"
        ],
        code: `class Student {
    String name;                           // instance — each student has own name
    static String college = "ABC College"; // static  — same for ALL students
    static int    totalStudents = 0;       // static counter — tracks all objects

    Student(String name) {
        this.name = name;
        totalStudents++; // increments SHARED counter every time object created
    }

    public static void main(String[] args) {

        Student s1 = new Student("Rohan");
        Student s2 = new Student("Aman");
        Student s3 = new Student("Priya");

        System.out.println(s1.name + " → " + Student.college);
        System.out.println(s2.name + " → " + Student.college);
        System.out.println(s3.name + " → " + Student.college);
        System.out.println("Total Students: " + Student.totalStudents);

        // Changing static variable affects ALL objects
        Student.college = "XYZ University";
        System.out.println("After change: " + s1.college); // XYZ University
        System.out.println("After change: " + s2.college); // XYZ University
    }
}`,
        output: "Rohan → ABC College\nAman → ABC College\nPriya → ABC College\nTotal Students: 3\nAfter change: XYZ University\nAfter change: XYZ University"
      },

      // ── 8. Declaration vs Initialization ────────────────────────
      {
        heading: "Declaration vs Initialization vs Assignment",
        content: "These three terms are used constantly in Java — understand the exact difference between them.",
        table: {
          headers: ["Term", "What it means", "Example"],
          rows: [
            ["Declaration", "Creating the variable — telling Java it exists and its type", "int age;"],
            ["Initialization", "Giving value for the FIRST time", "age = 20;"],
            ["Both together", "Declare and initialize in one line", "int age = 20;"],
            ["Re-assignment", "Changing value after it already has one", "age = 25; (later)"],
            ["Multiple", "Declare multiple same-type variables in one line", "int a = 1, b = 2, c = 3;"]
          ]
        },
        code: `public class DeclarationDemo {
    public static void main(String[] args) {

        // DECLARATION only — variable exists but has no value yet
        int score;

        // INITIALIZATION — giving value for first time
        score = 75;
        System.out.println("Initial score: " + score);

        // RE-ASSIGNMENT — changing the value
        score = 90;
        System.out.println("Updated score: " + score);

        // DECLARATION + INITIALIZATION together (most common)
        double salary = 45000.00;
        System.out.println("Salary: " + salary);

        // MULTIPLE declarations on one line
        int a = 10, b = 20, c = 30;
        System.out.println("Sum: " + (a + b + c));

        // RE-ASSIGNMENT example
        int marks = 50;
        System.out.println("Before: " + marks);
        marks = 95;
        System.out.println("After:  " + marks);
    }
}`,
        output: "Initial score: 75\nUpdated score: 90\nSalary: 45000.0\nSum: 60\nBefore: 50\nAfter:  95"
      },

      // ── 9. Data types quick reference ────────────────────────────
      {
        heading: "Variable Data Types — Quick Reference",
        content: "Every variable in Java must have a data type. The type defines what kind of value the variable can hold. Here are the most commonly used types with real examples:",
        table: {
          headers: ["Data Type", "Stores", "Example", "Real Use Case"],
          rows: [
            ["int", "Whole numbers", "int age = 25;", "Age, count, marks, quantity"],
            ["double", "Decimal numbers", "double price = 99.99;", "Price, salary, percentage, distance"],
            ["String", "Text (words, sentences)", "String name = \"Rohan\";", "Name, address, email, message"],
            ["boolean", "true or false only", "boolean isActive = true;", "Login status, flag, on/off switch"],
            ["char", "Single character", "char grade = 'A';", "Grade, gender (M/F), yes/no (Y/N)"],
            ["float", "Decimal (less precise)", "float temp = 36.6f;", "Temperature, small decimals"],
            ["long", "Very large whole numbers", "long population = 1400000000L;", "Population, file size, big IDs"]
          ]
        },
        code: `public class DataTypesDemo {
    public static void main(String[] args) {

        // All common variable types in one program
        int      studentAge    = 20;
        double   studentMarks  = 88.75;
        String   studentName   = "Priya Sharma";
        boolean  isPassed      = studentMarks >= 40;
        char     studentGrade  = 'A';
        long     studentId     = 2024001234567L;

        System.out.println("========== Student Report ==========");
        System.out.println("ID     : " + studentId);
        System.out.println("Name   : " + studentName);
        System.out.println("Age    : " + studentAge);
        System.out.printf ("Marks  : %.2f%%%n", studentMarks);
        System.out.println("Grade  : " + studentGrade);
        System.out.println("Passed : " + isPassed);
        System.out.println("====================================");
    }
}`,
        output: "========== Student Report ==========\nID     : 2024001234567\nName   : Priya Sharma\nAge    : 20\nMarks  : 88.75%\nGrade  : A\nPassed : true\n===================================="
      },

      // ── 10. Naming rules ─────────────────────────────────────────
      {
        heading: "Variable Naming Rules & Best Practices",
        content: "Java has strict rules — break them and code will not compile. There are also widely-followed conventions — ignore them and your code becomes hard to read and maintain.",
        list: [
          "✅ RULE: Must start with a letter, underscore _ or dollar sign $",
          "✅ RULE: After first character, can contain letters, digits, _, $",
          "❌ RULE: Cannot start with a digit — int 1age is invalid",
          "❌ RULE: No spaces allowed — int total marks is invalid",
          "❌ RULE: Cannot use Java keywords — int class, int for, int if are all invalid",
          "📘 CONVENTION: Use camelCase for variable names — studentName, totalMarks, isActive",
          "📘 CONVENTION: Use UPPER_SNAKE_CASE for constants — MAX_SIZE, PI_VALUE, TAX_RATE",
          "📘 CONVENTION: Names should be meaningful — studentAge not sa, not a, not x",
          "📘 CONVENTION: Boolean names should read like a question — isActive, hasPermission, isPassed"
        ],
        code: `public class NamingRules {
    public static void main(String[] args) {

        // ✅ VALID variable names
        int age = 25;
        int studentAge = 25;
        int _count = 10;
        int $amount = 500;
        int totalMarks2024 = 450;

        // ❌ These would cause COMPILE ERRORS (shown as comments):
        // int 2fast = 10;          // starts with digit
        // int total marks = 50;    // space in name
        // int class = 5;           // 'class' is a keyword
        // int my-variable = 10;    // hyphen not allowed

        // ✅ Good naming examples (camelCase)
        String firstName    = "Rohan";
        String lastName     = "Sharma";
        double monthSalary  = 50000.00;
        boolean isLoggedIn  = true;
        int totalStudents   = 60;

        System.out.println(firstName + " " + lastName);
        System.out.println("Salary: " + monthSalary);
        System.out.println("Logged in: " + isLoggedIn);
    }
}`,
        output: "Rohan Sharma\nSalary: 50000.0\nLoggedIn: true"
      },

      // ── 11. final / constants ────────────────────────────────────
      {
        heading: "final Variables — Constants That Never Change",
        content: "If a value should NEVER change throughout the program — like PI, maximum speed, or tax rate — use the 'final' keyword. Once assigned, any attempt to change it causes a compile error. By convention, final variable names use UPPER_SNAKE_CASE.",
        code: `public class FinalDemo {

    // Class-level constants (static final)
    static final double PI         = 3.14159265358979;
    static final int    MAX_SPEED  = 120;          // km/h speed limit
    static final double TAX_RATE   = 0.18;         // 18% GST
    static final String APP_NAME   = "JavaQue";

    public static void main(String[] args) {

        // Method-level constant
        final int PASSING_MARKS = 40;

        double radius = 7.0;
        double area   = PI * radius * radius;
        System.out.printf("Circle area (r=7): %.2f%n", area);

        double price      = 1000.0;
        double taxAmount  = price * TAX_RATE;
        double totalPrice = price + taxAmount;
        System.out.println("Price    : ₹" + price);
        System.out.println("Tax(18%) : ₹" + taxAmount);
        System.out.println("Total    : ₹" + totalPrice);

        System.out.println("Passing marks: " + PASSING_MARKS);

        // final PASSING_MARKS = 50; // ❌ COMPILE ERROR: cannot reassign final
    }
}`,
        output: "Circle area (r=7): 153.94\nPrice    : ₹1000.0\nTax(18%) : ₹180.0\nTotal    : ₹1180.0\nPassing marks: 40",
        note: "Use 'static final' for class-level constants (shared everywhere) and just 'final' for method-level constants (local to the method)."
      },

      // ── 12. Default values ───────────────────────────────────────
      {
        heading: "Default Values of Instance Variables",
        content: "Instance variables (class-level) get automatic default values if not initialized. Local variables do NOT — using them without initialization causes a compile error.",
        table: {
          headers: ["Data Type", "Default Value", "Explanation"],
          rows: [
            ["int, short, byte", "0", "Zero for all integer types"],
            ["long", "0L", "Zero as long"],
            ["float", "0.0f", "Zero as float"],
            ["double", "0.0d", "Zero as double"],
            ["char", "'\\u0000'", "Null character (empty)"],
            ["boolean", "false", "Always false by default"],
            ["String / any Object", "null", "No object assigned yet"]
          ]
        },
        code: `class DefaultValues {
    // Instance variables — automatically get default values
    int    number;
    double price;
    boolean flag;
    String text;
    char   letter;

    public static void main(String[] args) {
        DefaultValues d = new DefaultValues();

        System.out.println("int     default: " + d.number);  // 0
        System.out.println("double  default: " + d.price);   // 0.0
        System.out.println("boolean default: " + d.flag);    // false
        System.out.println("String  default: " + d.text);    // null
        System.out.println("char    default: " + d.letter);  // (empty char)

        // Local variable — NO default value
        // int x;
        // System.out.println(x); // ❌ COMPILE ERROR: variable x might not have been initialized
    }
}`,
        output: "int     default: 0\ndouble  default: 0.0\nboolean default: false\nString  default: null\nchar    default: ",
        note: "⚠️ null means the String variable exists but points to nothing. Calling any method on a null String (like text.length()) will throw a NullPointerException at runtime."
      },

      // ── 13. Common mistakes ──────────────────────────────────────
      {
        heading: "Common Beginner Mistakes — Avoid These",
        content: "These are the most frequent errors beginners make with variables. Study each one so you never make them yourself.",
        list: [
          "❌ Mistake 1: Wrong data type → int price = 99.99; — decimal needs double\n  ✅ Fix: double price = 99.99;",
          "❌ Mistake 2: Forgetting quotes for String → String name = Rohan; — text needs double quotes\n  ✅ Fix: String name = \"Rohan\";",
          "❌ Mistake 3: Using uninitialized local variable → int a; System.out.println(a); — compile error\n  ✅ Fix: int a = 0; before using it",
          "❌ Mistake 4: Reassigning a final variable → final int x = 10; x = 20; — compile error\n  ✅ Fix: Don't use final if value needs to change",
          "❌ Mistake 5: Variable name starts with digit → int 2marks = 90; — syntax error\n  ✅ Fix: int marks2 = 90; or int totalMarks = 90;",
          "❌ Mistake 6: Using == to compare Strings → if (name == \"Rohan\") — compares memory address, not content\n  ✅ Fix: if (name.equals(\"Rohan\")) — always use .equals() for Strings"
        ]
      },

      // ── 14. Real-world project example ──────────────────────────
      {
        heading: "Real-World Example — Employee Management",
        content: "This is how variables are used in a real application. Notice how every piece of information about an employee is stored as a properly typed variable.",
        code: `public class Employee {

    // Instance variables — properties of each employee
    String employeeName;
    int    employeeAge;
    String department;
    double basicSalary;
    boolean isFullTime;

    // Static variable — shared by all employees
    static String companyName = "TechCorp India";
    static int    totalEmployees = 0;

    // Constructor
    Employee(String name, int age, String dept, double salary, boolean fullTime) {
        this.employeeName = name;
        this.employeeAge  = age;
        this.department   = dept;
        this.basicSalary  = salary;
        this.isFullTime   = fullTime;
        totalEmployees++;
    }

    void printDetails() {
        // Local variable — only needed inside this method
        final double HRA_RATE = 0.40;          // 40% of basic
        final double DA_RATE  = 0.20;          // 20% of basic
        double hra       = basicSalary * HRA_RATE;
        double da        = basicSalary * DA_RATE;
        double grossPay  = basicSalary + hra + da;

        System.out.println("------------------------------");
        System.out.println("Company    : " + companyName);
        System.out.println("Name       : " + employeeName);
        System.out.println("Age        : " + employeeAge);
        System.out.println("Department : " + department);
        System.out.println("Employment : " + (isFullTime ? "Full Time" : "Part Time"));
        System.out.printf ("Basic      : ₹%.2f%n", basicSalary);
        System.out.printf ("HRA (40%%) : ₹%.2f%n", hra);
        System.out.printf ("DA  (20%%) : ₹%.2f%n", da);
        System.out.printf ("Gross Pay  : ₹%.2f%n", grossPay);
    }

    public static void main(String[] args) {
        Employee e1 = new Employee("Rohan Sharma",  28, "Engineering", 60000, true);
        Employee e2 = new Employee("Aman Gupta",    25, "Marketing",   45000, true);
        Employee e3 = new Employee("Priya Singh",   30, "HR",          40000, false);

        e1.printDetails();
        e2.printDetails();
        e3.printDetails();

        System.out.println("Total Employees: " + Employee.totalEmployees);
    }
}`,
        output: "------------------------------\nCompany    : TechCorp India\nName       : Rohan Sharma\nAge        : 28\nDepartment : Engineering\nEmployment : Full Time\nBasic      : ₹60000.00\nHRA (40%)  : ₹24000.00\nDA  (20%)  : ₹12000.00\nGross Pay  : ₹96000.00\n------------------------------\nCompany    : TechCorp India\nName       : Aman Gupta\n...\nTotal Employees: 3"
      },

      // ── 15. var keyword ──────────────────────────────────────────
      {
        heading: "var — Type Inference (Java 10+)",
        content: "Since Java 10, the 'var' keyword lets the compiler automatically figure out the type from the value. The type is still FIXED at compile time — this is NOT like Python's dynamic typing. Use var when the type is obvious from the right-hand side.",
        code: `public class VarDemo {
    public static void main(String[] args) {

        // Without var (traditional)
        String  name   = "Rohan";
        int     age    = 25;
        double  salary = 50000.0;

        // With var — compiler figures out the type
        var studentName = "Priya";   // inferred as String
        var studentAge  = 22;        // inferred as int
        var cgpa        = 8.75;      // inferred as double
        var isPassed    = true;      // inferred as boolean

        // var still gives you all methods of the inferred type
        System.out.println(studentName.toUpperCase());   // String method works
        System.out.println(studentAge + 5);              // int arithmetic works
        System.out.println(cgpa * 10);                   // double math works
        System.out.println(!isPassed);                   // boolean ops work

        // var CANNOT do this — type is fixed at compile time:
        // studentAge = "twenty two"; // ❌ ERROR: int cannot hold String
    }
}`,
        output: "PRIYA\n27\n87.5\nfalse",
        note: "Use var only when the type is obvious from reading the code. Avoid var when it makes code harder to understand — like var x = someMethod(); where the return type is unclear."
      },

      // ── 16. Scanner input ────────────────────────────────────────
      {
        heading: "Taking Input from User and Storing in Variables",
        content: "In real applications, variable values come from users — not hardcoded. The Scanner class reads keyboard input and stores it in variables.",
        code: `import java.util.Scanner;

public class UserInputDemo {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        // Read different types into variables
        System.out.print("Enter your name   : ");
        String name = sc.nextLine();

        System.out.print("Enter your age    : ");
        int age = sc.nextInt();

        System.out.print("Enter your salary : ");
        double salary = sc.nextDouble();

        // Use the stored variables
        double tax   = salary * 0.10;  // 10% tax
        double take  = salary - tax;

        System.out.println("\\n========== Summary ==========");
        System.out.println("Name       : " + name);
        System.out.println("Age        : " + age);
        System.out.printf ("Salary     : ₹%.2f%n", salary);
        System.out.printf ("Tax (10%%) : ₹%.2f%n", tax);
        System.out.printf ("Take Home  : ₹%.2f%n", take);

        sc.close();
    }
}`,
        output: "Enter your name   : Rohan\nEnter your age    : 25\nEnter your salary : 60000\n\n========== Summary ==========\nName       : Rohan\nAge        : 25\nSalary     : ₹60000.00\nTax (10%)  : ₹6000.00\nTake Home  : ₹54000.00"
      }
    ],

    quiz: [
      { q: "Which is a valid Java variable name?", options: ["2ndName", "my-var", "_totalCount", "class"], correct: 2 },
      { q: "What keyword makes a variable a constant in Java?", options: ["const", "static", "final", "immutable"], correct: 2 },
      { q: "Java naming convention for variables is:", options: ["snake_case", "PascalCase", "camelCase", "UPPER_CASE"], correct: 2 },
      { q: "A variable declared inside a method is called:", options: ["Static variable", "Instance variable", "Local variable", "Global variable"], correct: 2 },
      { q: "What is the default value of an int instance variable?", options: ["null", "undefined", "0", "1"], correct: 2 },
      { q: "Which variable type is shared by ALL objects of a class?", options: ["Local variable", "Instance variable", "Static variable", "Final variable"], correct: 2 },
      { q: "What happens when you use a local variable without initializing it?", options: ["It gets value 0", "It gets null", "Compile error", "Runtime error"], correct: 2 },
      { q: "Which Java version introduced the 'var' keyword?", options: ["Java 8", "Java 9", "Java 10", "Java 11"], correct: 2 }
    ],

    code: `public class VariablesComplete {
    // Static variable — shared by all
    static String school = "JavaQue Academy";
    static int    totalStudents = 0;

    // Instance variables — each student has own copy
    String name;
    int    rollNo;
    double marks;
    char   grade;
    boolean hasPassed;

    VariablesComplete(String name, int rollNo, double marks) {
        this.name     = name;
        this.rollNo   = rollNo;
        this.marks    = marks;
        this.grade    = marks>=90?'A':marks>=75?'B':marks>=60?'C':'F';
        this.hasPassed= marks >= 40;
        totalStudents++;
    }

    public static void main(String[] args) {
        VariablesComplete s1 = new VariablesComplete("Rohan", 101, 88.5);
        VariablesComplete s2 = new VariablesComplete("Priya", 102, 95.0);
        VariablesComplete s3 = new VariablesComplete("Aman",  103, 37.5);

        for (VariablesComplete s : new VariablesComplete[]{s1,s2,s3}) {
            System.out.printf("%-8s | Roll:%-4d | Marks:%-6.1f | Grade:%c | %s%n",
                s.name, s.rollNo, s.marks, s.grade,
                s.hasPassed ? "PASS ✓" : "FAIL ✗");
        }
        System.out.println("School: " + school + " | Total: " + totalStudents);
    }
}`,
    output: "Rohan    | Roll:101  | Marks:88.5   | Grade:B | PASS ✓\nPriya    | Roll:102  | Marks:95.0   | Grade:A | PASS ✓\nAman     | Roll:103  | Marks:37.5   | Grade:F | FAIL ✗\nSchool: JavaQue Academy | Total: 3"
  },

  "datatypes": {
    title: "Data Types in Java — Complete Guide", module: "basics", duration: "40 min", difficulty: "Beginner", xp: 120, icon: "🔢",
    intro: "A data type tells Java what kind of value a variable will store, how much memory to reserve, and what operations are allowed. Just like you use different containers at home — a bottle for water, a wallet for money, a box for clothes — Java uses different data types for different kinds of data. Java has 2 main categories: 8 Primitive types (built-in, store raw values directly) and Non-Primitive types (created from classes, store references to objects).",

    sections: [

      // ── 1. Real-life analogy ──────────────────────────────────────
      {
        heading: "What is a Data Type? — Real Life Analogy",
        content: "Before writing code, understand data types through everyday containers. The right container for the right content — that is exactly what data types do in Java.",
        table: {
          headers: ["Real Life Container", "What it Stores", "Java Data Type", "Example"],
          rows: [
            ["Age counter", "Whole numbers only", "int", "int age = 25;"],
            ["Price tag", "Decimal numbers", "double", "double price = 55000.75;"],
            ["Grade stamp", "Single character", "char", "char grade = 'A';"],
            ["ON/OFF switch", "Only true or false", "boolean", "boolean isLoggedIn = true;"],
            ["Name board", "Text / words", "String", "String name = \"Rohan\";"]
          ]
        },
        note: "Without data types, Java would not know how much memory to reserve, what values are valid, or what operations are allowed. Data types are the foundation of every Java program."
      },

      // ── 2. Two categories ────────────────────────────────────────
      {
        heading: "Two Categories of Data Types",
        content: "Java divides all data types into two groups. Primitive types are the building blocks provided by Java itself. Non-primitive types are built on top of primitives using classes.",
        list: [
          "🔵 Primitive Data Types — 8 types built into Java: byte, short, int, long, float, double, char, boolean",
          "🟠 Non-Primitive Data Types — created using classes: String, Arrays, ArrayList, your own classes",
          "📦 Primitive stores the VALUE directly in memory — fast and lightweight",
          "📦 Non-Primitive stores a REFERENCE (memory address) pointing to the actual data — more powerful",
          "📌 Primitives start with lowercase: int, double, char, boolean",
          "📌 Non-Primitives start with Uppercase: String, Scanner, ArrayList"
        ]
      },

      // ── 3. Full primitive table ───────────────────────────────────
      {
        heading: "All 8 Primitive Data Types — Complete Reference",
        content: "Java has exactly 8 primitive types. Memorise these — they appear in every Java program and every Java interview. Think of them in groups: whole numbers (4 types), decimals (2 types), character (1 type), true/false (1 type).",
        table: {
          headers: ["Data Type", "Used For", "Size", "Range", "Example", "Default"],
          rows: [
            ["byte",    "Very small whole numbers",  "1 byte",  "-128 to 127",                    "byte age = 25;",           "0"],
            ["short",   "Medium whole numbers",       "2 bytes", "-32,768 to 32,767",              "short salary = 25000;",    "0"],
            ["int",     "Normal integers (most used)","4 bytes", "-2,147,483,648 to 2,147,483,647","int marks = 95;",          "0"],
            ["long",    "Very large integers",        "8 bytes", "~±9.2 × 10¹⁸",                  "long population = 9876L;", "0L"],
            ["float",   "Decimal numbers (less precise)","4 bytes","~±3.4 × 10³⁸ (6-7 digits)",  "float price = 99.5f;",     "0.0f"],
            ["double",  "Decimal numbers (precise)",  "8 bytes", "~±1.7 × 10³⁰⁸ (15 digits)",    "double pi = 3.14159;",     "0.0d"],
            ["char",    "Single character",           "2 bytes", "0 to 65,535 (Unicode)",          "char grade = 'A';",        "'\\u0000'"],
            ["boolean", "True or false only",         "1 bit",   "true or false",                  "boolean isActive = true;", "false"]
          ]
        }
      },

      // ── 4. Integer types ─────────────────────────────────────────
      {
        heading: "Integer Types — byte, short, int, long",
        content: "All four types store whole numbers (no decimals). The only difference is how large a number each can hold. int is used in 90% of cases. Use long when numbers exceed ~2.1 billion. Use byte/short only when memory is critical (e.g. large arrays).",
        list: [
          "🔵 byte → range -128 to 127 → use in file handling, image processing, large arrays",
          "🔵 short → range -32,768 to 32,767 → rarely used, mainly for memory saving",
          "🔵 int → range ~-2.1 billion to 2.1 billion → default choice for all whole numbers",
          "🔵 long → range ~-9.2×10¹⁸ to 9.2×10¹⁸ → must add L suffix: 9876543210L",
          "⚠️ Why L suffix for long? Java treats any integer literal as int by default. Without L, 9999999999 causes compile error because it exceeds int range",
          "💡 Memory tip: byte < short < int < long — bigger range = bigger memory box"
        ],
        code: `public class IntegerTypes {
    public static void main(String[] args) {

        byte   smallNum    = 100;           // max 127
        short  mediumNum   = 25000;         // max 32,767
        int    normalNum   = 500000;        // most commonly used
        long   bigNum      = 9876543210L;   // L suffix is REQUIRED

        System.out.println("byte   : " + smallNum);
        System.out.println("short  : " + mediumNum);
        System.out.println("int    : " + normalNum);
        System.out.println("long   : " + bigNum);

        // int is default for whole numbers
        int studentAge   = 20;
        int totalMarks   = 450;
        int yearOfBirth  = 2004;

        System.out.println("Age    : " + studentAge);
        System.out.println("Marks  : " + totalMarks);
        System.out.println("Birth  : " + yearOfBirth);

        // Useful integer constants
        System.out.println("Max int  : " + Integer.MAX_VALUE);   // 2147483647
        System.out.println("Min int  : " + Integer.MIN_VALUE);   // -2147483648
        System.out.println("Max long : " + Long.MAX_VALUE);
    }
}`,
        output: "byte   : 100\nshort  : 25000\nint    : 500000\nlong   : 9876543210\nAge    : 20\nMarks  : 450\nBirth  : 2004\nMax int  : 2147483647\nMin int  : -2147483648\nMax long : 9223372036854775807"
      },

      // ── 5. Integer overflow ───────────────────────────────────────
      {
        heading: "Integer Overflow — A Dangerous Silent Bug",
        content: "When an int exceeds its maximum value (2,147,483,647) it does NOT throw an error — it silently wraps around to the most negative number. This is called integer overflow and is a very common source of bugs in real software.",
        code: `public class OverflowDemo {
    public static void main(String[] args) {

        int maxInt = Integer.MAX_VALUE;
        System.out.println("Max int       : " + maxInt);      // 2147483647
        System.out.println("Max int + 1   : " + (maxInt + 1));// -2147483648 (OVERFLOW!)
        System.out.println("Max int + 2   : " + (maxInt + 2));// -2147483647

        // Fix: use long to avoid overflow
        long safeCalc = (long) maxInt + 1;
        System.out.println("Safe (long)   : " + safeCalc);    // 2147483648 ✓

        // Real-world danger: population counter
        int wrongPop = 3_000_000_000; // ❌ COMPILE ERROR — exceeds int range
        // Fix:
        long population = 3_000_000_000L;    // ✓ Always use long for big numbers
        System.out.println("Population    : " + population);

        // Underscore in numbers (Java 7+) for readability
        int oneBillion     = 1_000_000_000;
        long worldDebt     = 91_000_000_000_000L;
        System.out.println("One billion   : " + oneBillion);
        System.out.println("World debt    : " + worldDebt);
    }
}`,
        output: "Max int       : 2147483647\nMax int + 1   : -2147483648\nMax int + 2   : -2147483647\nSafe (long)   : 2147483648\nPopulation    : 3000000000\nOne billion   : 1000000000\nWorld debt    : 91000000000000",
        note: "⚠️ Integer overflow caused the 1996 Ariane 5 rocket crash — a 64-bit number was cast to 16-bit, overflowed, and crashed the rocket. Always choose the right type for your data range."
      },

      // ── 6. Decimal types ─────────────────────────────────────────
      {
        heading: "Decimal Types — float vs double",
        content: "Both store decimal (fractional) numbers, but double is almost always the right choice. float needs an 'f' suffix and has only 6-7 digits of precision. double has 15 digits of precision and is Java's default decimal type.",
        list: [
          "🔵 float → 4 bytes, ~6-7 digits precision, requires f suffix: float pi = 3.14f",
          "🔵 double → 8 bytes, ~15 digits precision, no suffix needed: double pi = 3.14159265",
          "⚠️ Why f suffix for float? Java treats any decimal literal as double by default. Without f, you get a compile error: float x = 5.5; ← ERROR",
          "✅ When to use float: rarely — only when memory is very tight (e.g. graphics, games with millions of coordinates)",
          "✅ When to use double: almost always — salary, price, percentage, scientific calculations",
          "🚫 NEVER use float or double for money — use BigDecimal instead (explained below)"
        ],
        table: {
          headers: ["Feature", "float", "double"],
          rows: [
            ["Size",         "4 bytes",       "8 bytes"],
            ["Precision",    "6-7 digits",    "15-16 digits"],
            ["Suffix needed","Yes — f or F",  "No suffix needed"],
            ["Default type?","No",             "Yes — Java default"],
            ["Mostly used?", "Rarely",         "Yes — almost always"],
            ["For money?",   "❌ Never",       "❌ Never — use BigDecimal"]
          ]
        }
      },

      // ── 7. Float/double code ──────────────────────────────────────
      {
        heading: "float and double — Code Examples",
        content: "See the precision difference clearly in code. The famous 0.1 + 0.2 problem is a classic example of why floating-point types cannot be trusted for exact calculations.",
        code: `import java.math.BigDecimal;

public class DecimalTypes {
    public static void main(String[] args) {

        // float — less precise, needs f suffix
        float  temperature = 36.6f;
        float  discount    = 12.5f;
        System.out.println("Temperature : " + temperature);
        System.out.println("Discount    : " + discount);

        // double — more precise, no suffix needed
        double salary      = 55000.75;
        double piValue     = 3.14159265358979;
        double percentage  = 88.75;
        System.out.println("Salary      : " + salary);
        System.out.println("Pi          : " + piValue);
        System.out.println("Percentage  : " + percentage);

        // Precision difference
        float  flt = 3.14159265358979f;
        double dbl = 3.14159265358979;
        System.out.println("float  pi   : " + flt);  // 3.1415927 (loses digits!)
        System.out.println("double pi   : " + dbl);  // 3.14159265358979 (full)

        // ⚠️ FAMOUS TRAP: 0.1 + 0.2 is NOT 0.3 in floating point!
        System.out.println("0.1 + 0.2   : " + (0.1 + 0.2)); // 0.30000000000000004

        // ✅ Fix for money: use BigDecimal
        BigDecimal price    = new BigDecimal("199.99");
        BigDecimal taxRate  = new BigDecimal("0.18");
        BigDecimal taxAmt   = price.multiply(taxRate);
        BigDecimal total    = price.add(taxAmt);
        System.out.println("Price       : ₹" + price);
        System.out.println("Tax (18%)   : ₹" + taxAmt);
        System.out.println("Total       : ₹" + total);
    }
}`,
        output: "Temperature : 36.6\nDiscount    : 12.5\nSalary      : 55000.75\nPi          : 3.14159265358979\nPercentage  : 88.75\nfloat  pi   : 3.1415927\ndouble pi   : 3.14159265358979\n0.1 + 0.2   : 0.30000000000000004\nPrice       : ₹199.99\nTax (18%)   : ₹35.9982\nTotal       : ₹235.9882",
        note: "💰 For all money calculations — bank balance, product price, salary, tax — always use BigDecimal. Never float or double. This is a professional Java rule."
      },

      // ── 8. char ──────────────────────────────────────────────────
      {
        heading: "char — Single Character Type",
        content: "char stores exactly ONE character. Characters must be written in single quotes. Java uses Unicode (2 bytes per character) so char can store any character from any language — English, Hindi, Chinese, symbols, emojis.",
        list: [
          "✅ Single quotes ONLY: char grade = 'A'; → correct",
          "❌ Double quotes = String, not char: char grade = \"A\"; → COMPILE ERROR",
          "✅ Can store any Unicode character: char heart = '♥'; char star = '★';",
          "📌 char is actually stored as a number internally — 'A' = 65, 'B' = 66, 'a' = 97",
          "📌 char + char = int (arithmetic on characters): 'A' + 1 = 66 which prints as 'B'",
          "💡 Real uses: storing gender (M/F), grade (A/B/C), yes/no answer (Y/N), initial of a name"
        ],
        code: `public class CharDemo {
    public static void main(String[] args) {

        // Basic char usage
        char grade      = 'A';
        char gender     = 'M';
        char initial    = 'R';
        char answer     = 'Y';

        System.out.println("Grade   : " + grade);
        System.out.println("Gender  : " + gender);
        System.out.println("Initial : " + initial);
        System.out.println("Answer  : " + answer);

        // char and its Unicode number
        char letter = 'A';
        int  code   = letter;          // char → int (automatic)
        System.out.println("'A' as number : " + code);       // 65

        // char arithmetic
        char next = (char)('A' + 1);   // 65 + 1 = 66 = 'B'
        System.out.println("Next letter   : " + next);       // B

        // Printing all uppercase letters
        System.out.print("Alphabet : ");
        for (char c = 'A'; c <= 'Z'; c++) {
            System.out.print(c + " ");
        }
        System.out.println();

        // Special characters
        char tab      = '\t';   // tab
        char newline  = '\n';   // new line
        char backslash= '\\';  // backslash
        System.out.println("Tab→" + tab + "←end");
    }
}`,
        output: "Grade   : A\nGender  : M\nInitial : R\nAnswer  : Y\n'A' as number : 65\nNext letter   : B\nAlphabet : A B C D E F G H I J K L M N O P Q R S T U V W X Y Z \nTab→\t←end"
      },

      // ── 9. boolean ───────────────────────────────────────────────
      {
        heading: "boolean — True or False",
        content: "boolean is the simplest data type — it stores only two possible values: true or false. It is used for all decision making, conditions, flags, and status checks. Every if statement, while loop, and comparison returns a boolean.",
        list: [
          "✅ Only two values possible: true or false (lowercase, not True/False like Python)",
          "📌 Used in: if conditions, while loops, login status, form validation",
          "📌 Result of comparisons: (5 > 3) returns true, (10 == 20) returns false",
          "📌 Logical operators work on boolean: && (AND), || (OR), ! (NOT)",
          "💡 Name boolean variables like a yes/no question: isLoggedIn, hasPermission, isPassed, isActive",
          "⚠️ Default value for instance boolean is false — not zero, not null, always false"
        ],
        code: `public class BooleanDemo {
    public static void main(String[] args) {

        // Direct boolean values
        boolean isJavaFun    = true;
        boolean isHard       = false;
        boolean isLoggedIn   = true;
        boolean hasPremium   = false;

        System.out.println("Java is fun  : " + isJavaFun);
        System.out.println("Java is hard : " + isHard);
        System.out.println("Logged in    : " + isLoggedIn);
        System.out.println("Has premium  : " + hasPremium);

        // Boolean from comparisons
        int marks = 75;
        boolean isPassed    = marks >= 40;       // true
        boolean isDistinct  = marks >= 75;       // true
        boolean isFirst     = marks >= 90;       // false

        System.out.println("Passed       : " + isPassed);
        System.out.println("Distinction  : " + isDistinct);
        System.out.println("First class  : " + isFirst);

        // Boolean in if conditions
        int age = 20;
        boolean canVote = age >= 18;
        if (canVote) {
            System.out.println("Eligible to vote ✓");
        } else {
            System.out.println("Not eligible yet");
        }

        // Logical operators with boolean
        boolean hasId       = true;
        boolean hasTicket   = true;
        boolean canEnter    = hasId && hasTicket; // both must be true
        System.out.println("Can enter    : " + canEnter);
    }
}`,
        output: "Java is fun  : true\nJava is hard : false\nLogged in    : true\nHas premium  : false\nPassed       : true\nDistinct     : true\nFirst class  : false\nEligible to vote ✓\nCan enter    : true"
      },

      // ── 10. Non-primitive: String ─────────────────────────────────
      {
        heading: "Non-Primitive Types — String",
        content: "String is the most commonly used non-primitive type. It stores text — any sequence of characters. String is a class in Java (java.lang.String), not a primitive, which means it has powerful built-in methods. That is the key difference between primitive and non-primitive.",
        list: [
          "📌 String stores text: names, addresses, emails, messages, sentences",
          "✅ Double quotes ALWAYS: String name = \"Rohan\"; (single quotes = char, not String)",
          "🔑 String is a CLASS — it comes with built-in methods: .length(), .toUpperCase(), .contains(), .replace()",
          "❌ Primitive int cannot call methods: int x = 5; x.length(); → COMPILE ERROR",
          "✅ String can call methods: String s = \"Hello\"; s.length(); → returns 5",
          "📌 String is immutable — once created, its content cannot change. Operations create new Strings",
          "💡 This is exactly why String is non-primitive — it is a full object with behaviour, not just raw data"
        ],
        code: `public class StringDemo {
    public static void main(String[] args) {

        // Basic String usage
        String firstName   = "Rohan";
        String lastName    = "Sharma";
        String city        = "Mumbai";
        String email       = "rohan@example.com";

        System.out.println("First  : " + firstName);
        System.out.println("Last   : " + lastName);
        System.out.println("City   : " + city);
        System.out.println("Email  : " + email);

        // String concatenation — joining strings
        String fullName = firstName + " " + lastName;
        System.out.println("Full   : " + fullName);

        // Built-in String methods (primitives cannot do this!)
        System.out.println("Length      : " + fullName.length());         // 11
        System.out.println("Uppercase   : " + fullName.toUpperCase());    // ROHAN SHARMA
        System.out.println("Lowercase   : " + fullName.toLowerCase());    // rohan sharma
        System.out.println("Has 'Rohan' : " + fullName.contains("Rohan")); // true
        System.out.println("Replace     : " + fullName.replace("Rohan","Amit"));
        System.out.println("Starts with : " + email.startsWith("rohan")); // true
        System.out.println("Ends with   : " + email.endsWith(".com"));    // true

        // char vs String comparison
        char  letterA  = 'A';            // single character, single quotes
        String wordA   = "A";            // text, double quotes — NOT the same!
        System.out.println("char 'A'  : " + letterA);
        System.out.println("String A  : " + wordA);
    }
}`,
        output: "First  : Rohan\nLast   : Sharma\nCity   : Mumbai\nEmail  : rohan@example.com\nFull   : Rohan Sharma\nLength      : 11\nUppercase   : ROHAN SHARMA\nLowercase   : rohan sharma\nHas 'Rohan' : true\nReplace     : Amit Sharma\nStarts with : true\nEnds with   : true\nchar 'A'  : A\nString A  : A"
      },

      // ── 11. Default values ────────────────────────────────────────
      {
        heading: "Default Values of All Data Types",
        content: "Instance variables (declared inside a class but outside methods) get automatic default values. Local variables (inside a method) do NOT — you must initialize them before use or the compiler will give an error.",
        table: {
          headers: ["Data Type", "Default Value", "Important Note"],
          rows: [
            ["byte",    "0",          "Zero"],
            ["short",   "0",          "Zero"],
            ["int",     "0",          "Zero — most important to remember"],
            ["long",    "0L",         "Zero as long"],
            ["float",   "0.0f",       "Zero as float"],
            ["double",  "0.0d",       "Zero as double"],
            ["char",    "'\\u0000'",  "Null character — looks like empty space"],
            ["boolean", "false",      "Always false — never zero or null"],
            ["String",  "null",       "null means no object assigned — calling methods on null = NullPointerException!"],
            ["Any Object", "null",    "All reference types default to null"]
          ]
        },
        code: `class DefaultValuesDemo {

    // Instance variables — get default values automatically
    byte    byteVal;
    short   shortVal;
    int     intVal;
    long    longVal;
    float   floatVal;
    double  doubleVal;
    char    charVal;
    boolean boolVal;
    String  strVal;

    public static void main(String[] args) {

        DefaultValuesDemo d = new DefaultValuesDemo();

        System.out.println("byte    default : " + d.byteVal);    // 0
        System.out.println("short   default : " + d.shortVal);   // 0
        System.out.println("int     default : " + d.intVal);     // 0
        System.out.println("long    default : " + d.longVal);    // 0
        System.out.println("float   default : " + d.floatVal);   // 0.0
        System.out.println("double  default : " + d.doubleVal);  // 0.0
        System.out.println("char    default : " + d.charVal);    // (empty)
        System.out.println("boolean default : " + d.boolVal);    // false
        System.out.println("String  default : " + d.strVal);     // null

        // ❌ LOCAL variable — no default value!
        // int x;
        // System.out.println(x); // COMPILE ERROR: variable x might not have been initialized
    }
}`,
        output: "byte    default : 0\nshort   default : 0\nint     default : 0\nlong    default : 0\nfloat   default : 0.0\ndouble  default : 0.0\nchar    default : \nboolean default : false\nString  default : null",
        note: "⚠️ null is NOT zero, NOT empty string, NOT false. It means 'nothing is here'. Calling any method on a null reference (like strVal.length()) will throw NullPointerException at runtime."
      },

      // ── 12. Type casting ─────────────────────────────────────────
      {
        heading: "Type Casting — Converting Between Types",
        content: "Type casting means converting a value from one data type to another. Widening casting (small → large) is automatic and safe. Narrowing casting (large → small) must be done manually and may lose data.",
        table: {
          headers: ["Type", "Direction", "How", "Risk"],
          rows: [
            ["Widening",  "byte→short→int→long→float→double", "Automatic — no code needed",        "No risk — no data loss"],
            ["Narrowing", "double→float→long→int→short→byte", "Manual — write (type) before value", "Risk — may lose data or precision"]
          ]
        },
        code: `public class TypeCasting {
    public static void main(String[] args) {

        // WIDENING — automatic, safe, no data lost
        byte   b = 50;
        short  s = b;      // byte → short (auto)
        int    i = s;      // short → int (auto)
        long   l = i;      // int → long (auto)
        float  f = l;      // long → float (auto)
        double d = f;      // float → double (auto)

        System.out.println("byte   : " + b);
        System.out.println("short  : " + s);
        System.out.println("int    : " + i);
        System.out.println("long   : " + l);
        System.out.println("float  : " + f);
        System.out.println("double : " + d);

        // NARROWING — manual, may lose data
        double pi      = 3.99;
        int    piInt   = (int) pi;   // (int) is the cast — truncates decimal
        System.out.println("double 3.99  → int : " + piInt); // 3 (not 4!)

        double big     = 12345678.99;
        float  smaller = (float) big;
        System.out.println("double → float     : " + smaller); // may lose precision

        // String ↔ Number conversion (very common in real apps)
        String numStr  = "250";
        int    numInt  = Integer.parseInt(numStr);  // String → int
        double numDbl  = Double.parseDouble("3.14"); // String → double

        String backStr = String.valueOf(numInt);     // int → String
        String concat  = numInt + "px";             // int → String (using +)

        System.out.println("Parsed int     : " + (numInt + 10));   // 260
        System.out.println("Parsed double  : " + (numDbl * 2));    // 6.28
        System.out.println("Back to String : " + backStr);          // 250
        System.out.println("CSS value      : " + concat);           // 250px
    }
}`,
        output: "byte   : 50\nshort  : 50\nint    : 50\nlong   : 50\nfloat  : 50.0\ndouble : 50.0\ndouble 3.99  → int : 3\ndouble → float     : 1.2345678E7\nParsed int     : 260\nParsed double  : 6.28\nBack to String : 250\nCSS value      : 250px"
      },

      // ── 13. Common mistakes ───────────────────────────────────────
      {
        heading: "Common Beginner Mistakes with Data Types",
        content: "These mistakes are made by almost every Java beginner at least once. Study each one carefully so you recognise and fix them quickly.",
        list: [
          "❌ Mistake 1: Forgetting L suffix for long\n  long num = 9999999999;  → COMPILE ERROR\n  ✅ Fix: long num = 9999999999L;",
          "❌ Mistake 2: Forgetting f suffix for float\n  float price = 5.5;  → COMPILE ERROR (Java treats 5.5 as double)\n  ✅ Fix: float price = 5.5f;",
          "❌ Mistake 3: Using double quotes for char\n  char c = \"A\";  → COMPILE ERROR\n  ✅ Fix: char c = 'A';  (single quotes for char)",
          "❌ Mistake 4: Storing decimal in int\n  int price = 99.99;  → COMPILE ERROR\n  ✅ Fix: double price = 99.99;",
          "❌ Mistake 5: Using == to compare Strings\n  String a = \"hello\"; if(a == \"hello\")  → may return false (compares memory address)\n  ✅ Fix: if(a.equals(\"hello\"))  always use .equals() for String comparison",
          "❌ Mistake 6: Using float/double for money\n  double price = 0.1 + 0.2;  → gives 0.30000000000000004\n  ✅ Fix: BigDecimal price = new BigDecimal(\"0.10\").add(new BigDecimal(\"0.20\"));"
        ]
      },

      // ── 14. Real-world complete example ──────────────────────────
      {
        heading: "Real-World Example — Using All Data Types Together",
        content: "This example shows how all 8 primitive types and String are used together in a realistic program — a bank account system.",
        code: `public class BankAccount {

    // Instance variables using different data types
    long    accountNumber;    // long — very large unique number
    String  accountHolder;    // String — name (non-primitive)
    double  balance;          // double — money with decimals
    float   interestRate;     // float — interest percentage
    int     age;              // int — account holder age
    short   branchCode;       // short — 4-5 digit branch code
    char    accountType;      // char — S=Savings, C=Current
    boolean isActive;         // boolean — account status
    byte    transactionLimit; // byte — daily transaction limit (small number)

    BankAccount(long accNum, String name, double bal,
                float rate, int age, short branch,
                char type, byte limit) {
        this.accountNumber  = accNum;
        this.accountHolder  = name;
        this.balance        = bal;
        this.interestRate   = rate;
        this.age            = age;
        this.branchCode     = branch;
        this.accountType    = type;
        this.isActive       = true;
        this.transactionLimit = limit;
    }

    void printStatement() {
        System.out.println("========= Account Statement =========");
        System.out.println("Account No   : " + accountNumber);
        System.out.println("Holder       : " + accountHolder);
        System.out.println("Age          : " + age);
        System.out.println("Branch Code  : " + branchCode);
        System.out.println("Account Type : " + (accountType == 'S' ? "Savings" : "Current"));
        System.out.printf ("Balance      : ₹%.2f%n", balance);
        System.out.printf ("Interest     : %.2f%%%n", interestRate);
        System.out.println("Status       : " + (isActive ? "Active ✓" : "Inactive ✗"));
        System.out.println("Daily Limit  : " + transactionLimit + " transactions");
        System.out.println("=====================================");
    }

    public static void main(String[] args) {
        BankAccount acc1 = new BankAccount(
            1234567890123456L, "Rohan Sharma", 75000.50,
            4.5f, 28, (short)1001, 'S', (byte)10
        );
        BankAccount acc2 = new BankAccount(
            9876543210654321L, "Priya Singh", 150000.00,
            3.8f, 32, (short)1002, 'C', (byte)25
        );
        acc1.printStatement();
        acc2.printStatement();
    }
}`,
        output: "========= Account Statement =========\nAccount No   : 1234567890123456\nHolder       : Rohan Sharma\nAge          : 28\nBranch Code  : 1001\nAccount Type : Savings\nBalance      : ₹75000.50\nInterest     : 4.50%\nStatus       : Active ✓\nDaily Limit  : 10 transactions\n=====================================\n========= Account Statement =========\nAccount No   : 9876543210654321\nHolder       : Priya Singh\n..."
      },

      // ── 15. Memory visualization ──────────────────────────────────
      {
        heading: "Memory Size Comparison — Which Type to Choose?",
        content: "Understanding memory sizes helps you make the right choice. In most cases int and double are the right defaults. Only use others when you have a specific reason.",
        list: [
          "💾 byte (1 byte) → use when you have millions of small values like pixels in an image",
          "💾 short (2 bytes) → use in embedded systems or when memory is extremely limited",
          "💾 int (4 bytes) → DEFAULT for whole numbers — use in almost all cases",
          "💾 long (8 bytes) → use when numbers exceed 2.1 billion (file sizes, timestamps, IDs)",
          "💾 float (4 bytes) → use in graphics/gaming engines with millions of coordinate values",
          "💾 double (8 bytes) → DEFAULT for decimal numbers — salary, price, scientific data",
          "💾 char (2 bytes) → use for single characters — grade, gender initial, flag",
          "💾 boolean (1 bit) → use for all true/false flags and conditions",
          "💾 String (variable) → use for all text — names, addresses, messages",
          "💡 Rule of thumb: when in doubt use int for whole numbers and double for decimals"
        ]
      }
    ],

    quiz: [
      { q: "How many primitive data types does Java have?", options: ["6", "7", "8", "10"], correct: 2 },
      { q: "Which suffix is required for a long literal?", options: ["l or L", "d or D", "f or F", "No suffix needed"], correct: 0 },
      { q: "Which suffix is required for a float literal?", options: ["l or L", "d or D", "f or F", "No suffix needed"], correct: 2 },
      { q: "Which data type should you use for monetary calculations?", options: ["float", "double", "BigDecimal", "long"], correct: 2 },
      { q: "What is the default value of a boolean instance variable?", options: ["null", "0", "true", "false"], correct: 3 },
      { q: "What is the size of a char in Java?", options: ["1 byte", "2 bytes", "4 bytes", "8 bytes"], correct: 1 },
      { q: "Widening type casting is:", options: ["Always manual", "Automatic and safe", "Always lossy", "Only for objects"], correct: 1 },
      { q: "Why is String called non-primitive?", options: ["It is slower", "It starts with uppercase", "It is a class with methods and stores a reference", "It needs import statement"], correct: 2 }
    ],

    code: `public class AllDataTypes {
    public static void main(String[] args) {

        // All 8 primitive types + String
        byte    age         = 20;
        short   branchCode  = 1001;
        int     marks       = 475;
        long    studentId   = 2024001234L;
        float   height      = 5.9f;
        double  percentage  = 88.75;
        char    grade       = 'A';
        boolean hasPassed   = percentage >= 40;
        String  name        = "Priya Sharma";

        System.out.println("======= Student Card =======");
        System.out.println("ID         : " + studentId);
        System.out.println("Name       : " + name);
        System.out.println("Age        : " + age);
        System.out.println("Branch     : " + branchCode);
        System.out.printf ("Height     : %.1f ft%n", height);
        System.out.println("Marks      : " + marks + "/500");
        System.out.printf ("Percentage : %.2f%%%n", percentage);
        System.out.println("Grade      : " + grade);
        System.out.println("Result     : " + (hasPassed ? "PASS ✓" : "FAIL ✗"));
        System.out.println("============================");
    }
}`,
    output: "======= Student Card =======\nID         : 2024001234\nName       : Priya Sharma\nAge        : 20\nBranch     : 1001\nHeight     : 5.9 ft\nMarks      : 475/500\nPercentage : 88.75%\nGrade      : A\nResult     : PASS ✓\n============================"
  },

  "operators": {
    title: "Operators in Java — Complete Guide", module: "basics", duration: "40 min", difficulty: "Beginner", xp: 120, icon: "➕",
    intro: "Operators are special symbols that tell Java to perform a specific operation on one or more values (called operands). Without operators, you cannot add numbers, compare values, check conditions, or do anything meaningful in a program. Java has 10 types of operators — from simple arithmetic like + and -, to logical operators like && and ||, to the powerful ternary operator that replaces if-else in one line.",

    sections: [

      // ── 1. What & Why ─────────────────────────────────────────────
      {
        heading: "What Are Operators and Why Do We Need Them?",
        content: "An operator is a symbol that performs an action. The values it works on are called operands. Operators are the verbs of Java — without them, you only have data and no way to do anything with it.",
        table: {
          headers: ["Operator Type", "Symbol(s)", "What it does", "Example"],
          rows: [
            ["Arithmetic",          "+ - * / %",       "Mathematical calculations",          "a + b, marks * 2"],
            ["Assignment",          "= += -= *= /= %=", "Store or update values",            "x = 10, x += 5"],
            ["Comparison/Relational","== != > < >= <=", "Compare — always returns boolean",  "age >= 18"],
            ["Logical",             "&& || !",          "Combine boolean conditions",         "age>18 && hasId"],
            ["Unary",               "+ - ++ -- !",      "Work on ONE operand",               "x++, -age, !flag"],
            ["Ternary",             "? :",              "One-line if-else shorthand",         "a>b ? a : b"],
            ["Bitwise",             "& | ^ ~",          "Operate on binary bits",             "5 & 3"],
            ["Shift",               "<< >> >>>",        "Shift bits left or right",           "x << 1"],
            ["instanceof",          "instanceof",       "Check object type at runtime",       "obj instanceof String"]
          ]
        }
      },

      // ── 2. Arithmetic operators ───────────────────────────────────
      {
        heading: "1. Arithmetic Operators — Mathematical Calculations",
        content: "These are the most basic operators — they perform standard math operations. Every Java program that handles numbers uses these constantly.",
        table: {
          headers: ["Operator", "Name", "Example", "Result", "Real Use Case"],
          rows: [
            ["+", "Addition",       "10 + 5",  "15",  "Total price, sum of marks"],
            ["-", "Subtraction",    "20 - 8",  "12",  "Remaining balance, age difference"],
            ["*", "Multiplication", "4  * 5",  "20",  "Area, total cost = price × qty"],
            ["/", "Division",       "20 / 4",  "5",   "Average = total / count"],
            ["%", "Modulus",        "10 % 3",  "1",   "Even/odd check, circular indexing"]
          ]
        },
        code: `public class ArithmeticOperators {
    public static void main(String[] args) {

        int a = 20, b = 6;

        System.out.println("a + b = " + (a + b));   // 26  addition
        System.out.println("a - b = " + (a - b));   // 14  subtraction
        System.out.println("a * b = " + (a * b));   // 120 multiplication
        System.out.println("a / b = " + (a / b));   // 3   integer division (truncates!)
        System.out.println("a % b = " + (a % b));   // 2   remainder

        // ⚠️ IMPORTANT: Integer division truncates the decimal part
        System.out.println("10 / 3  = " + (10 / 3));          // 3 (NOT 3.333!)
        System.out.println("10.0 / 3 = " + (10.0 / 3));       // 3.3333... (use double)

        // Real-world calculations
        int    pricePerItem = 150;
        int    quantity     = 4;
        double taxRate      = 0.18;

        int    subtotal  = pricePerItem * quantity;   // multiplication
        double tax       = subtotal * taxRate;         // multiplication
        double total     = subtotal + tax;             // addition

        System.out.println("Subtotal : ₹" + subtotal);
        System.out.printf ("Tax(18%%) : ₹%.2f%n", tax);
        System.out.printf ("Total    : ₹%.2f%n", total);
    }
}`,
        output: "a + b = 26\na - b = 14\na * b = 120\na / b = 3\na % b = 2\n10 / 3  = 3\n10.0 / 3 = 3.3333333333333335\nSubtotal : ₹600\nTax(18%) : ₹108.00\nTotal    : ₹708.00",
        note: "⚠️ Integer division: 10 / 3 gives 3, NOT 3.333. Java drops the decimal part entirely. If you need the decimal result, at least one operand must be a double: 10.0 / 3 or (double)10 / 3."
      },

      // ── 3. Modulus deep dive ──────────────────────────────────────
      {
        heading: "Modulus Operator % — More Useful Than You Think",
        content: "The modulus (%) operator returns the remainder after division. It is one of the most useful operators in programming, used in many real scenarios that beginners don't initially expect.",
        list: [
          "✅ Check even or odd: if (num % 2 == 0) → even, else odd",
          "✅ Check divisibility: if (num % 5 == 0) → divisible by 5",
          "✅ Circular/wrap-around indexing: index = (index + 1) % arrayLength — wraps back to 0",
          "✅ Extract last digit: int lastDigit = number % 10",
          "✅ Extract last two digits: int last2 = number % 100",
          "✅ Check leap year: year % 4 == 0 (and some extra conditions)",
          "✅ Time calculations: int hours = totalMinutes / 60; int mins = totalMinutes % 60;"
        ],
        code: `public class ModulusUseCases {
    public static void main(String[] args) {

        // Use case 1: Even or odd
        int num = 17;
        if (num % 2 == 0)  System.out.println(num + " is Even");
        else               System.out.println(num + " is Odd");    // Odd

        // Use case 2: Divisibility
        System.out.println("100 divisible by 5? " + (100 % 5 == 0)); // true
        System.out.println("17  divisible by 3? " + (17  % 3 == 0)); // false

        // Use case 3: Extract digits
        int number = 12345;
        System.out.println("Last digit    : " + (number % 10));   // 5
        System.out.println("Last 2 digits : " + (number % 100));  // 45

        // Use case 4: Convert minutes to hours:minutes format
        int totalMinutes = 135;
        int hours   = totalMinutes / 60;
        int minutes = totalMinutes % 60;
        System.out.println(totalMinutes + " min = " + hours + "h " + minutes + "m"); // 2h 15m

        // Use case 5: Circular array wrap-around
        int[] days = {"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"};
        for (int i = 0; i < 10; i++) {
            System.out.print(days[i % 7] + " "); // wraps: Mon Tue ... Sun Mon Tue Mon
        }
        System.out.println();
    }
}`,
        output: "17 is Odd\n100 divisible by 5? true\n17  divisible by 3? false\nLast digit    : 5\nLast 2 digits : 45\n135 min = 2h 15m\nMon Tue Wed Thu Fri Sat Sun Mon Tue Mon "
      },

      // ── 4. Assignment operators ───────────────────────────────────
      {
        heading: "2. Assignment Operators — Store and Update Values",
        content: "The basic assignment operator = stores a value. Compound assignment operators (+=, -=, etc.) combine an operation WITH assignment in one step — they are shorthand that saves typing and makes code cleaner.",
        table: {
          headers: ["Operator", "Meaning", "Example", "Equivalent to"],
          rows: [
            ["=",  "Assign",              "x = 10",   "x = 10"],
            ["+=", "Add and assign",      "x += 5",   "x = x + 5"],
            ["-=", "Subtract and assign", "x -= 3",   "x = x - 3"],
            ["*=", "Multiply and assign", "x *= 2",   "x = x * 2"],
            ["/=", "Divide and assign",   "x /= 4",   "x = x / 4"],
            ["%=", "Modulus and assign",  "x %= 3",   "x = x % 3"]
          ]
        },
        code: `public class AssignmentOperators {
    public static void main(String[] args) {

        int score = 50;
        System.out.println("Start     : " + score);   // 50

        score += 20;   // score = score + 20
        System.out.println("After +=  : " + score);   // 70

        score -= 10;   // score = score - 10
        System.out.println("After -=  : " + score);   // 60

        score *= 2;    // score = score * 2
        System.out.println("After *=  : " + score);   // 120

        score /= 3;    // score = score / 3
        System.out.println("After /=  : " + score);   // 40

        score %= 6;    // score = score % 6
        System.out.println("After %=  : " + score);   // 4

        // Real-world: shopping cart total
        double cartTotal = 0.0;
        cartTotal += 299.99;   // add item 1
        cartTotal += 149.50;   // add item 2
        cartTotal += 89.00;    // add item 3
        cartTotal -= 50.00;    // apply discount
        System.out.printf("Cart total : ₹%.2f%n", cartTotal); // ₹488.49
    }
}`,
        output: "Start     : 50\nAfter +=  : 70\nAfter -=  : 60\nAfter *=  : 120\nAfter /=  : 40\nAfter %=  : 4\nCart total : ₹488.49"
      },

      // ── 5. Comparison operators ───────────────────────────────────
      {
        heading: "3. Comparison (Relational) Operators — Compare Values",
        content: "Comparison operators always return a boolean (true or false). They are used in every if statement, while loop, and ternary expression. Java compares numbers directly with ==, but Strings must ALWAYS be compared with .equals().",
        table: {
          headers: ["Operator", "Name", "Example", "Result", "Meaning"],
          rows: [
            ["==", "Equal to",             "10 == 10", "true",  "Are the values the same?"],
            ["!=", "Not equal to",         "10 != 5",  "true",  "Are the values different?"],
            [">",  "Greater than",         "20 > 10",  "true",  "Is left bigger than right?"],
            ["<",  "Less than",            "5  < 10",  "true",  "Is left smaller than right?"],
            [">=", "Greater than or equal","10 >= 10", "true",  "Is left bigger or same as right?"],
            ["<=", "Less than or equal",   "5  <= 10", "true",  "Is left smaller or same as right?"]
          ]
        },
        code: `public class ComparisonOperators {
    public static void main(String[] args) {

        int a = 10, b = 20, c = 10;

        System.out.println("a == b : " + (a == b));  // false (10 == 20?)
        System.out.println("a == c : " + (a == c));  // true  (10 == 10?)
        System.out.println("a != b : " + (a != b));  // true  (10 != 20?)
        System.out.println("a >  b : " + (a >  b));  // false (10 > 20?)
        System.out.println("a <  b : " + (a <  b));  // true  (10 < 20?)
        System.out.println("a >= c : " + (a >= c));  // true  (10 >= 10?)
        System.out.println("a <= b : " + (a <= b));  // true  (10 <= 20?)

        // Real-world: marks-based grade check
        int marks = 82;
        System.out.println("Passed     : " + (marks >= 35));  // true
        System.out.println("First class: " + (marks >= 60));  // true
        System.out.println("Distinction: " + (marks >= 75));  // true
        System.out.println("Top score  : " + (marks >= 95));  // false

        // ⚠️ IMPORTANT: Never use == for String comparison!
        String s1 = new String("Java");
        String s2 = new String("Java");
        System.out.println("== result  : " + (s1 == s2));       // false! (different objects)
        System.out.println(".equals()  : " + s1.equals(s2));    // true  (same content) ✓
    }
}`,
        output: "a == b : false\na == c : true\na != b : true\na >  b : false\na <  b : true\na >= c : true\na <= b : true\nPassed     : true\nFirst class: true\nDistinction: true\nTop score  : false\n== result  : false\n.equals()  : true",
        note: "⚠️ == on Strings compares memory addresses (are they the same object?), NOT the content. Always use .equals() for String comparison. This is one of the most common Java bugs for beginners."
      },

      // ── 6. Logical operators ──────────────────────────────────────
      {
        heading: "4. Logical Operators — Combine Multiple Conditions",
        content: "Logical operators combine two or more boolean expressions into one. They are essential for checking multiple conditions together — like: 'is the user both logged in AND has a premium plan?'",
        table: {
          headers: ["Operator", "Name",        "Returns true when",              "Example"],
          rows: [
            ["&&", "Logical AND", "BOTH conditions are true",    "age>18 && hasId → true only if both"],
            ["||", "Logical OR",  "AT LEAST ONE condition is true","hasCard || hasCash → true if either"],
            ["!",  "Logical NOT", "The condition is FALSE",       "!isLoggedIn → true when NOT logged in"]
          ]
        },
        code: `public class LogicalOperators {
    public static void main(String[] args) {

        int age = 22;
        boolean hasId     = true;
        boolean hasTicket = false;
        boolean isPaid    = true;

        // AND (&&) — both must be true
        boolean canEnterClub = age >= 18 && hasId;
        System.out.println("Can enter club  : " + canEnterClub); // true

        boolean canWatch = hasTicket && isPaid;
        System.out.println("Can watch movie : " + canWatch);     // false (no ticket)

        // OR (||) — at least one must be true
        boolean hasId2   = false;
        boolean hasPass  = true;
        boolean canEnter = hasId2 || hasPass;
        System.out.println("Can enter office: " + canEnter);     // true

        // NOT (!) — reverses the condition
        boolean isLoggedIn  = false;
        System.out.println("Show login page : " + !isLoggedIn);  // true (show if NOT logged in)
        System.out.println("Show dashboard  : " + isLoggedIn);   // false

        // Real-world: loan eligibility
        int    salary      = 60000;
        int    creditScore = 750;
        boolean hasJob    = true;
        boolean eligible  = hasJob && salary >= 50000 && creditScore >= 700;
        System.out.println("Loan eligible   : " + eligible);     // true

        // ⚡ Short-circuit evaluation — very important!
        int n = 0;
        // Without short-circuit, this would throw ArithmeticException (/ by zero)
        // BUT: since (n != 0) is false, Java SKIPS (10/n > 1) entirely
        boolean safe = (n != 0) && (10 / n > 1);
        System.out.println("Safe (no crash) : " + safe);         // false, no crash!
    }
}`,
        output: "Can enter club  : true\nCan watch movie : false\nCan enter office: true\nShow login page : true\nShow dashboard  : false\nLoan eligible   : true\nSafe (no crash) : false",
        note: "⚡ Short-circuit evaluation: In &&, if the LEFT condition is false, Java does NOT evaluate the right side. In ||, if the left is true, right is skipped. Use this to prevent crashes like division by zero."
      },

      // ── 7. Unary + increment/decrement ────────────────────────────
      {
        heading: "5. Unary Operators — Work on a Single Value",
        content: "Unary operators work on just ONE operand (unlike arithmetic which needs two). The most important unary operators are ++ (increment) and -- (decrement) which increase or decrease a value by exactly 1.",
        list: [
          "➕ Unary + → makes value positive (rarely used explicitly)",
          "➖ Unary - → negates the value: -age, -(x+y)",
          "++ Increment → increases value by 1: x++ or ++x",
          "-- Decrement → decreases value by 1: x-- or --x",
          "! Logical NOT → reverses boolean: !true = false"
        ],
        code: `public class UnaryOperators {
    public static void main(String[] args) {

        int x = 10;

        // Unary minus — negate
        System.out.println("Unary minus : " + (-x));       // -10

        // POST-increment (x++) → USE the value FIRST, THEN increment
        int a = 5;
        System.out.println("Post x++    : " + (a++));      // prints 5 (old value)
        System.out.println("After x++   : " + a);          // now 6

        // PRE-increment (++x) → INCREMENT FIRST, THEN use the value
        int b = 5;
        System.out.println("Pre ++x     : " + (++b));      // prints 6 (new value)
        System.out.println("After ++x   : " + b);          // still 6

        // POST-decrement
        int c = 10;
        System.out.println("Post x--    : " + (c--));      // prints 10
        System.out.println("After x--   : " + c);          // now 9

        // PRE-decrement
        int d = 10;
        System.out.println("Pre --x     : " + (--d));      // prints 9
        System.out.println("After --x   : " + d);          // still 9

        // Logical NOT
        boolean isOnline = true;
        System.out.println("Is online   : " + isOnline);   // true
        System.out.println("Is offline  : " + !isOnline);  // false

        // Real use: loop counter
        System.out.print("Countdown   : ");
        for (int i = 5; i >= 1; i--) {
            System.out.print(i + " ");
        }
        System.out.println("Go!");
    }
}`,
        output: "Unary minus : -10\nPost x++    : 5\nAfter x++   : 6\nPre ++x     : 6\nAfter ++x   : 6\nPost x--    : 10\nAfter x--   : 9\nPre --x     : 9\nAfter --x   : 9\nIs online   : true\nIs offline  : false\nCountdown   : 5 4 3 2 1 Go!",
        note: "📌 Easy trick: x++ means 'use first, then increase' (Post = after). ++x means 'increase first, then use' (Pre = before). In a standalone statement like x++; the result is the same — it only differs when used inside an expression."
      },

      // ── 8. Ternary operator ───────────────────────────────────────
      {
        heading: "6. Ternary Operator — One-Line If-Else",
        content: "The ternary operator is Java's shortest way to write an if-else. It takes three parts (hence 'ternary'): a condition, a value if true, and a value if false. It returns a value, so it is perfect for assigning results directly to a variable.",
        list: [
          "📌 Syntax: condition ? valueIfTrue : valueIfFalse",
          "✅ Use when: you need to assign one of two values based on a condition",
          "✅ Returns a value — unlike if-else which is a statement",
          "⚠️ Do NOT nest more than 2 levels — becomes unreadable",
          "💡 Perfect for: grade labels, pass/fail, min/max, default values"
        ],
        code: `public class TernaryOperator {
    public static void main(String[] args) {

        // Basic ternary — replaces 4 lines of if-else with 1
        int age = 20;
        String category = (age >= 18) ? "Adult" : "Minor";
        System.out.println("Category  : " + category);       // Adult

        // Instead of:
        // if (age >= 18) { category = "Adult"; }
        // else { category = "Minor"; }

        // Finding maximum of two numbers
        int a = 45, b = 72;
        int max = (a > b) ? a : b;
        System.out.println("Max       : " + max);            // 72

        // Pass/Fail
        int marks = 67;
        String result = (marks >= 35) ? "PASS ✓" : "FAIL ✗";
        System.out.println("Result    : " + result);         // PASS ✓

        // Discount eligibility
        int purchaseAmt = 1500;
        double discount = (purchaseAmt >= 1000) ? 0.10 : 0.05; // 10% or 5%
        double finalAmt = purchaseAmt - (purchaseAmt * discount);
        System.out.printf("Final Amt : ₹%.2f%n", finalAmt);  // ₹1350.00

        // Nested ternary — grade system (keep to 2 levels max)
        int score = 82;
        String grade = score >= 90 ? "A" :
                       score >= 80 ? "B" :
                       score >= 70 ? "C" :
                       score >= 60 ? "D" : "F";
        System.out.println("Grade     : " + grade);          // B

        // Even/Odd
        int number = 17;
        System.out.println(number + " is " + (number % 2 == 0 ? "Even" : "Odd"));
    }
}`,
        output: "Category  : Adult\nMax       : 72\nResult    : PASS ✓\nFinal Amt : ₹1350.00\nGrade     : B\n17 is Odd"
      },

      // ── 9. Operator precedence ────────────────────────────────────
      {
        heading: "Operator Precedence — Which Runs First?",
        content: "When multiple operators appear in one expression, Java follows a specific order — just like in mathematics where multiplication runs before addition. This is called operator precedence. Using parentheses () always overrides precedence and makes code clearer.",
        table: {
          headers: ["Priority", "Operators", "Direction", "Example"],
          rows: [
            ["1 (Highest)", "() brackets",       "Left → Right", "(a + b) * c — brackets first"],
            ["2",           "++ -- (post)",       "Left → Right", "a++, b--"],
            ["3",           "++ -- + - ! (pre/unary)","Right → Left","++a, -b, !flag"],
            ["4",           "* / %",              "Left → Right", "a * b / c"],
            ["5",           "+ -",                "Left → Right", "a + b - c"],
            ["6",           "< > <= >=",          "Left → Right", "a > b"],
            ["7",           "== !=",              "Left → Right", "a == b"],
            ["8",           "&&",                 "Left → Right", "a && b"],
            ["9",           "||",                 "Left → Right", "a || b"],
            ["10 (Lowest)", "= += -= *= /= %=",   "Right → Left", "x = a + b"]
          ]
        },
        code: `public class OperatorPrecedence {
    public static void main(String[] args) {

        // Multiplication before addition (like maths)
        System.out.println(10 + 5 * 2);         // 20 (not 30!)  5*2 first
        System.out.println((10 + 5) * 2);        // 30            brackets override

        // Mixed arithmetic
        System.out.println(20 - 4 * 3 + 2);     // 10   (4*3=12, 20-12=8, 8+2=10)
        System.out.println(100 / 10 * 2);        // 20   (100/10=10, 10*2=20)
        System.out.println(100 / (10 * 2));      // 5    (brackets: 10*2=20, 100/20=5)

        // Comparison after arithmetic
        int a = 5, b = 3, c = 2;
        boolean result = a + b > c * 3;          // (5+3) > (2*3) → 8 > 6 → true
        System.out.println("8 > 6 : " + result); // true

        // Logical operators: && before ||
        boolean x = true, y = false, z = true;
        System.out.println(x || y && z);         // true  (y&&z first = false, then x||false = true)
        System.out.println((x || y) && z);       // true  (brackets: x||y = true, true&&z = true)

        // Best practice: always use brackets for clarity
        int salary = 50000;
        double tax = salary > 40000 ? salary * 0.20 : salary * 0.10;
        System.out.printf("Tax : ₹%.0f%n", tax);// ₹10000
    }
}`,
        output: "20\n30\n10\n20\n5\n8 > 6 : true\ntrue\ntrue\nTax : ₹10000",
        note: "💡 Best practice: when in doubt about operator precedence, just use parentheses ( ). They make code easier to read AND guarantee the correct evaluation order. Don't rely on memorising the full precedence table."
      },

      // ── 10. Bitwise operators ─────────────────────────────────────
      {
        heading: "7. Bitwise Operators — Working with Binary Bits",
        content: "Bitwise operators work directly on the binary (0s and 1s) representation of numbers. They are used in low-level programming, permissions/flags systems, encryption, and performance-critical code. Each integer in Java is stored as 32 bits.",
        table: {
          headers: ["Operator", "Name",              "Operation",                    "Example"],
          rows: [
            ["&",  "Bitwise AND",    "1 if BOTH bits are 1",          "5 & 3 = 1"],
            ["|",  "Bitwise OR",     "1 if EITHER bit is 1",          "5 | 3 = 7"],
            ["^",  "Bitwise XOR",    "1 if bits are DIFFERENT",       "5 ^ 3 = 6"],
            ["~",  "Bitwise NOT",    "Flips all bits (complement)",   "~5 = -6"],
            ["<<", "Left shift",     "Shift bits left (× 2 per step)","5 << 1 = 10"],
            [">>", "Right shift",    "Shift bits right (÷ 2 per step)","10 >> 1 = 5"]
          ]
        },
        code: `public class BitwiseOperators {
    public static void main(String[] args) {

        int a = 5;  // binary:  0101
        int b = 3;  // binary:  0011

        // AND: 1 only where BOTH have 1
        System.out.println("5 & 3  = " + (a & b));   // 0001 = 1
        // OR:  1 where EITHER has 1
        System.out.println("5 | 3  = " + (a | b));   // 0111 = 7
        // XOR: 1 where bits are DIFFERENT
        System.out.println("5 ^ 3  = " + (a ^ b));   // 0110 = 6
        // NOT: flip all bits
        System.out.println("~5     = " + (~a));       // -6

        // LEFT SHIFT: multiply by 2 for each position
        System.out.println("5 << 1 = " + (a << 1));  // 10  (5 × 2)
        System.out.println("5 << 2 = " + (a << 2));  // 20  (5 × 4)
        System.out.println("5 << 3 = " + (a << 3));  // 40  (5 × 8)

        // RIGHT SHIFT: divide by 2 for each position
        System.out.println("40 >> 1 = " + (40 >> 1));// 20  (40 ÷ 2)
        System.out.println("40 >> 2 = " + (40 >> 2));// 10  (40 ÷ 4)

        // Practical: check if number is even/odd using bitwise AND
        System.out.println("8 is even: " + ((8 & 1) == 0)); // true
        System.out.println("7 is odd : " + ((7 & 1) == 1)); // true
    }
}`,
        output: "5 & 3  = 1\n5 | 3  = 7\n5 ^ 3  = 6\n~5     = -6\n5 << 1 = 10\n5 << 2 = 20\n5 << 3 = 40\n40 >> 1 = 20\n40 >> 2 = 10\n8 is even: true\n7 is odd : true",
        note: "💡 Left shift by 1 = multiply by 2. Right shift by 1 = divide by 2 (integer division). Shift operations are faster than multiplication/division and are used in performance-critical code."
      },

      // ── 11. instanceof ────────────────────────────────────────────
      {
        heading: "8. instanceof Operator — Check Object Type",
        content: "The instanceof operator checks whether an object is an instance of a specific class or interface. It returns true or false. This is commonly used before type casting to avoid ClassCastException at runtime.",
        code: `public class InstanceofDemo {
    public static void main(String[] args) {

        String  name   = "Rohan";
        Integer number = 42;
        Object  obj    = "Hello Java";

        // Basic instanceof check
        System.out.println(name   instanceof String);   // true
        System.out.println(number instanceof Integer);  // true
        System.out.println(name   instanceof Object);   // true (String extends Object)

        // Safe casting pattern — always check before casting
        Object someObject = "Java Programming";

        if (someObject instanceof String) {
            String str = (String) someObject;  // safe — we checked first
            System.out.println("Length : " + str.length()); // 16
            System.out.println("Upper  : " + str.toUpperCase());
        }

        // Java 16+ Pattern Matching (modern syntax)
        Object value = 999;
        if (value instanceof Integer i) {        // cast + declare in one line
            System.out.println("Double : " + (i * 2)); // 1998
        }

        // Inheritance: child instanceof parent is also true
        // ArrayList is a List is an Object
        java.util.ArrayList<String> list = new java.util.ArrayList<>();
        System.out.println(list instanceof java.util.ArrayList); // true
        System.out.println(list instanceof java.util.List);      // true
        System.out.println(list instanceof Object);              // true
    }
}`,
        output: "true\ntrue\ntrue\nLength : 16\nUpper  : JAVA PROGRAMMING\nDouble : 1998\ntrue\ntrue\ntrue"
      },

      // ── 12. Common mistakes ───────────────────────────────────────
      {
        heading: "Common Beginner Mistakes with Operators",
        content: "These operator mistakes are made by almost every Java beginner. Each one either causes a compile error, a runtime crash, or a silent wrong result that is very hard to find.",
        list: [
          "❌ Mistake 1: Using = instead of == in conditions\n  if (age = 18) → COMPILE ERROR in Java (would silently pass in C/C++)\n  ✅ Fix: if (age == 18)",
          "❌ Mistake 2: Integer division when you need decimal\n  System.out.println(5 / 2) → prints 2, not 2.5\n  ✅ Fix: System.out.println(5.0 / 2) or (double)5 / 2 → prints 2.5",
          "❌ Mistake 3: Using == to compare Strings\n  if (name == \"Rohan\") → may be false even when content is \"Rohan\"\n  ✅ Fix: if (name.equals(\"Rohan\"))",
          "❌ Mistake 4: Confusing && (logical) with & (bitwise)\n  && is short-circuit AND (skips right side if left is false)\n  & is bitwise AND (evaluates BOTH sides always)\n  ✅ Use && for boolean conditions, & for bit manipulation",
          "❌ Mistake 5: Confusing x++ and ++x inside expressions\n  int x=5; int y = x++; → y=5, x=6 (post: use old value)\n  int x=5; int y = ++x; → y=6, x=6 (pre: use new value)\n  ✅ When in doubt, use standalone x++; on its own line",
          "❌ Mistake 6: Missing parentheses causing precedence bugs\n  if (a == 1 || b == 2 && c == 3) → && runs first!\n  ✅ Fix: if (a == 1 || (b == 2 && c == 3)) — be explicit"
        ]
      },

      // ── 13. Practice programs ─────────────────────────────────────
      {
        heading: "Practice Programs — Build Strong Operator Skills",
        content: "The best way to master operators is by building small, practical programs. Here is a complete example combining multiple operator types in a real-world scenario.",
        code: `import java.util.Scanner;

public class OperatorsPractice {
    public static void main(String[] args) {

        // Program: Student Result Calculator
        // Uses: arithmetic, comparison, logical, ternary, modulus

        int mathMarks    = 88;
        int scienceMarks = 72;
        int englishMarks = 91;
        int totalSubjects = 3;

        // Arithmetic
        int    total      = mathMarks + scienceMarks + englishMarks;
        double percentage = (double) total / (totalSubjects * 100) * 100;

        // Comparison + Ternary
        String result     = (percentage >= 35) ? "PASS ✓" : "FAIL ✗";
        String division   = percentage >= 75 ? "Distinction" :
                            percentage >= 60 ? "First Class" :
                            percentage >= 50 ? "Second Class" :
                            percentage >= 35 ? "Pass" : "Fail";

        // Logical
        boolean eligible  = (percentage >= 75) && (mathMarks >= 70);

        // Modulus — check if roll number is in even or odd batch
        int rollNumber = 47;
        String batch  = (rollNumber % 2 == 0) ? "Even Batch" : "Odd Batch";

        // Increment for demo
        int rank = 0;
        rank++;  // move to rank 1

        System.out.println("========= Result Card =========");
        System.out.println("Maths    : " + mathMarks);
        System.out.println("Science  : " + scienceMarks);
        System.out.println("English  : " + englishMarks);
        System.out.println("Total    : " + total + " / 300");
        System.out.printf ("Percent  : %.2f%%%n", percentage);
        System.out.println("Result   : " + result);
        System.out.println("Division : " + division);
        System.out.println("Merit    : " + (eligible ? "Eligible ✓" : "Not Eligible"));
        System.out.println("Roll     : " + rollNumber + " → " + batch);
        System.out.println("Rank     : " + rank);
        System.out.println("================================");
    }
}`,
        output: "========= Result Card =========\nMaths    : 88\nScience  : 72\nEnglish  : 91\nTotal    : 251 / 300\nPercent  : 83.67%\nResult   : PASS ✓\nDivision : Distinction\nMerit    : Eligible ✓\nRoll     : 47 → Odd Batch\nRank     : 1\n================================"
      }
    ],

    quiz: [
      { q: "What does the % operator return?", options: ["Quotient", "Remainder", "Percentage", "Power"], correct: 1 },
      { q: "Result of 10 / 3 in Java when both are int?", options: ["3.333", "3", "4", "3.0"], correct: 1 },
      { q: "Correct way to compare two String values:", options: ["==", "===", ".equals()", "!="], correct: 2 },
      { q: "What does x++ do when used inside an expression?", options: ["Increments first then uses", "Uses current value then increments", "Decrements x", "No effect"], correct: 1 },
      { q: "Result of: System.out.println(10 + 5 * 2);", options: ["30", "20", "25", "15"], correct: 1 },
      { q: "What does the && operator do?", options: ["Returns true if EITHER is true", "Returns true only if BOTH are true", "Flips the boolean", "Compares two numbers"], correct: 1 },
      { q: "What does short-circuit evaluation mean in &&?", options: ["Faster execution always", "Right side skipped if left is false", "Both sides always evaluated", "Works only with integers"], correct: 1 },
      { q: "What is the result of 5 << 2?", options: ["10", "20", "7", "2"], correct: 1 }
    ],

    code: `public class OperatorsComplete {
    public static void main(String[] args) {

        // Complete operators demonstration
        int price = 1200, qty = 3;
        double tax = 0.18;

        // Arithmetic
        int    subtotal  = price * qty;
        double taxAmt    = subtotal * tax;
        double total     = subtotal + taxAmt;

        // Comparison + Logical
        boolean eligible = total > 3000 && qty >= 2;

        // Ternary
        double discount  = eligible ? total * 0.10 : 0;
        double finalAmt  = total - discount;

        // Assignment compound
        int loyaltyPts = 0;
        loyaltyPts += (int)(finalAmt / 100); // 1 point per ₹100

        // Modulus
        int orderId = 10047;
        String warehouse = (orderId % 2 == 0) ? "Warehouse A" : "Warehouse B";

        System.out.println("===== Invoice =====");
        System.out.println("Price    : ₹" + price + " × " + qty);
        System.out.println("Subtotal : ₹" + subtotal);
        System.out.printf ("Tax(18%%) : ₹%.2f%n", taxAmt);
        System.out.printf ("Total    : ₹%.2f%n", total);
        System.out.printf ("Discount : ₹%.2f%n", discount);
        System.out.printf ("Final    : ₹%.2f%n", finalAmt);
        System.out.println("Points   : " + loyaltyPts);
        System.out.println("Ship to  : " + warehouse);
        System.out.println("===================");
    }
}`,
    output: "===== Invoice =====\nPrice    : ₹1200 × 3\nSubtotal : ₹3600\nTax(18%) : ₹648.00\nTotal    : ₹4248.00\nDiscount : ₹424.80\nFinal    : ₹3823.20\nPoints   : 38\nShip to  : Warehouse B\n==================="
  },

  "control-flow": {
    title: "Control Flow in Java — Complete Guide", module: "basics", duration: "40 min", difficulty: "Beginner", xp: 120, icon: "🔀",
    intro: "Control flow means deciding WHICH code runs and WHEN. Without control flow, every program runs line by line from top to bottom — the same way every single time. With control flow, your program can make decisions, choose between paths, and respond differently based on conditions. Think of it like a road — sometimes you go straight, sometimes you turn left, sometimes you stop. Java provides if, if-else, else-if, nested if, and switch for all decision-making needs.",

    sections: [

      // ── 1. What & Why ─────────────────────────────────────────────
      {
        heading: "What is Control Flow and Why Do We Need It?",
        content: "Every real-world program must make decisions. Without control flow, you cannot build anything useful — login systems, grade calculators, ATMs, or apps of any kind.",
        list: [
          "📱 Instagram login: if password correct → show dashboard, else → show error",
          "🏦 ATM: if balance >= withdrawal amount → give cash, else → show insufficient funds",
          "📊 Marks: if marks >= 90 → Grade A, else if >= 75 → Grade B, else → Grade C",
          "🚗 Driving: if age >= 18 AND has license → can drive, else → cannot drive",
          "🎮 Game: if player health == 0 → game over, else if health < 20 → show warning"
        ],
        note: "Java requires conditions to be boolean (true/false). Unlike C/C++, you CANNOT write if(age) — Java will give a compile error. You must write if(age > 0)."
      },

      // ── 2. if statement ───────────────────────────────────────────
      {
        heading: "if Statement — Run Code Only When Condition is True",
        content: "The simplest control flow. The code inside the if block runs ONLY when the condition evaluates to true. If the condition is false, the block is completely skipped.",
        code: `public class IfStatement {
    public static void main(String[] args) {

        int age = 20;

        // if block runs because 20 >= 18 is TRUE
        if (age >= 18) {
            System.out.println("You are eligible to vote ✓");
        }

        int temperature = 38;

        // if block runs because 38 > 35 is TRUE
        if (temperature > 35) {
            System.out.println("It is very hot today!");
            System.out.println("Drink plenty of water.");
        }

        int marks = 45;

        // This block is SKIPPED because 45 >= 90 is FALSE
        if (marks >= 90) {
            System.out.println("This will NOT print");
        }

        System.out.println("Program continues after if blocks");
    }
}`,
        output: "You are eligible to vote ✓\nIt is very hot today!\nDrink plenty of water.\nProgram continues after if blocks",
        note: "The curly braces { } define the block of code that belongs to the if. For single-line if, braces are optional — but always use them to avoid bugs when adding more lines later."
      },

      // ── 3. if-else ────────────────────────────────────────────────
      {
        heading: "if-else — Choose Between Two Paths",
        content: "When there are exactly two possibilities, use if-else. ONE of the two blocks will ALWAYS execute — never both, never neither.",
        code: `public class IfElse {
    public static void main(String[] args) {

        // Example 1: Even or Odd
        int number = 17;
        if (number % 2 == 0) {
            System.out.println(number + " is Even");
        } else {
            System.out.println(number + " is Odd");   // this runs
        }

        // Example 2: Pass or Fail
        int marks = 55;
        if (marks >= 35) {
            System.out.println("Result : PASS ✓");   // this runs
        } else {
            System.out.println("Result : FAIL ✗");
        }

        // Example 3: Voting eligibility
        int voterAge = 16;
        if (voterAge >= 18) {
            System.out.println("Can vote");
        } else {
            System.out.println("Cannot vote — minimum age is 18");  // this runs
        }

        // Example 4: Login check
        String password = "wrongPass";
        String correct  = "java123";
        if (password.equals(correct)) {
            System.out.println("Login successful!");
        } else {
            System.out.println("Incorrect password. Try again.");   // this runs
        }
    }
}`,
        output: "17 is Odd\nResult : PASS ✓\nCannot vote — minimum age is 18\nIncorrect password. Try again."
      },

      // ── 4. else-if ladder ─────────────────────────────────────────
      {
        heading: "else-if Ladder — Multiple Conditions in Order",
        content: "Use else-if when there are MORE than two possibilities. Java checks conditions from TOP to BOTTOM and executes the FIRST matching block only. Once a match is found, ALL remaining else-if and else blocks are skipped.",
        code: `public class ElseIfLadder {
    public static void main(String[] args) {

        // Grade calculator — classic else-if ladder
        int marks = 82;

        if (marks >= 90) {
            System.out.println("Grade : A — Excellent!");
        } else if (marks >= 75) {
            System.out.println("Grade : B — Very Good!");  // this runs (82 >= 75)
        } else if (marks >= 60) {
            System.out.println("Grade : C — Good");
        } else if (marks >= 35) {
            System.out.println("Grade : D — Pass");
        } else {
            System.out.println("Grade : F — Fail");
        }

        // ATM menu simulation
        int choice = 2;
        System.out.println("ATM Menu:");
        if (choice == 1) {
            System.out.println("Checking balance...");
        } else if (choice == 2) {
            System.out.println("Processing withdrawal...");  // this runs
        } else if (choice == 3) {
            System.out.println("Processing deposit...");
        } else {
            System.out.println("Invalid choice. Please try again.");
        }

        // Age category
        int personAge = 35;
        if      (personAge < 13)  System.out.println("Child");
        else if (personAge < 18)  System.out.println("Teenager");
        else if (personAge < 60)  System.out.println("Adult");    // this runs
        else                      System.out.println("Senior Citizen");
    }
}`,
        output: "Grade : B — Very Good!\nATM Menu:\nProcessing withdrawal...\nAdult",
        note: "Java checks top to bottom and stops at the FIRST true condition. So always put the most specific/restrictive conditions at the top, and the most general at the bottom."
      },

      // ── 5. Nested if ──────────────────────────────────────────────
      {
        heading: "Nested if — An if Inside Another if",
        content: "You can place an if statement inside another if statement. The inner if is checked ONLY when the outer if is true. Use this for multi-level conditions — like: must be adult AND must have a license to drive.",
        code: `public class NestedIf {
    public static void main(String[] args) {

        // Driving eligibility — two conditions must pass
        int age         = 22;
        boolean hasLicense = true;

        if (age >= 18) {
            System.out.println("Age condition passed ✓");

            if (hasLicense) {
                System.out.println("License condition passed ✓");
                System.out.println("You can drive! 🚗");
            } else {
                System.out.println("You need a driving license first.");
            }

        } else {
            System.out.println("You must be 18 or older to drive.");
        }

        // Loan eligibility — salary AND credit score
        double salary      = 55000;
        int    creditScore = 720;
        boolean hasJob     = true;

        if (hasJob) {
            if (salary >= 50000) {
                if (creditScore >= 700) {
                    System.out.println("Loan APPROVED ✓");
                } else {
                    System.out.println("Loan REJECTED — credit score too low");
                }
            } else {
                System.out.println("Loan REJECTED — salary too low");
            }
        } else {
            System.out.println("Loan REJECTED — must be employed");
        }
    }
}`,
        output: "Age condition passed ✓\nLicense condition passed ✓\nYou can drive! 🚗\nLoan APPROVED ✓",
        note: "Too many nested levels make code hard to read. If you have more than 2-3 levels of nesting, consider refactoring with logical operators (&&, ||) or extract into separate methods."
      },

      // ── 6. switch statement ───────────────────────────────────────
      {
        heading: "switch Statement — Multiple Fixed Choices",
        content: "switch is the clean alternative to a long if-else-if chain when you are testing ONE variable against multiple specific VALUES. Java supports int, char, String, and enum in switch. Always use 'break' to stop execution after each case.",
        code: `public class SwitchDemo {
    public static void main(String[] args) {

        // Day of week
        int day = 3;
        switch (day) {
            case 1:  System.out.println("Monday");    break;
            case 2:  System.out.println("Tuesday");   break;
            case 3:  System.out.println("Wednesday"); break;  // this runs
            case 4:  System.out.println("Thursday");  break;
            case 5:  System.out.println("Friday");    break;
            default: System.out.println("Weekend");
        }

        // Switch with String (Java 7+)
        String season = "Summer";
        switch (season) {
            case "Spring": System.out.println("Flowers bloom"); break;
            case "Summer": System.out.println("Sun shines");    break;  // this runs
            case "Autumn": System.out.println("Leaves fall");   break;
            case "Winter": System.out.println("Snow falls");    break;
            default:       System.out.println("Unknown season");
        }

        // Fall-through — INTENTIONAL (no break between cases)
        int month = 4;
        System.out.print("Month " + month + " has ");
        switch (month) {
            case 1: case 3: case 5:
            case 7: case 8: case 10: case 12:
                System.out.println("31 days"); break;
            case 4: case 6: case 9: case 11:
                System.out.println("30 days"); break;  // this runs
            case 2:
                System.out.println("28 or 29 days"); break;
        }
    }
}`,
        output: "Wednesday\nSun shines\nMonth 4 has 30 days",
        note: "⚠️ Forgetting 'break' causes fall-through — execution continues into the NEXT case automatically. This is the most common switch bug for beginners. The example above shows INTENTIONAL fall-through (multiple cases sharing one action)."
      },

      // ── 7. Fall-through explained ─────────────────────────────────
      {
        heading: "Fall-Through in switch — The break Keyword Explained",
        content: "Without break, Java does NOT stop at the matching case — it continues executing ALL following cases until it hits a break or the end of the switch. This is called fall-through.",
        code: `public class FallThrough {
    public static void main(String[] args) {

        // ❌ WITHOUT break — fall-through bug
        int day = 1;
        System.out.println("Without break:");
        switch (day) {
            case 1: System.out.println("Monday");
            case 2: System.out.println("Tuesday");
            case 3: System.out.println("Wednesday");
        }
        // Prints ALL THREE even though day == 1 !

        System.out.println();

        // ✅ WITH break — correct behaviour
        System.out.println("With break:");
        switch (day) {
            case 1: System.out.println("Monday");    break;
            case 2: System.out.println("Tuesday");   break;
            case 3: System.out.println("Wednesday"); break;
        }
        // Prints only "Monday" ✓
    }
}`,
        output: "Without break:\nMonday\nTuesday\nWednesday\n\nWith break:\nMonday"
      },

      // ── 8. Modern switch expression ───────────────────────────────
      {
        heading: "Modern switch Expression (Java 14+)",
        content: "Java 14 introduced switch expressions using the arrow (→) syntax. No break needed — each arrow case automatically stops. Multiple values can share one arrow. This is cleaner and less error-prone.",
        code: `public class ModernSwitch {
    public static void main(String[] args) {

        // Modern switch expression — no break needed!
        int month = 9;
        int daysInMonth = switch (month) {
            case 1, 3, 5, 7, 8, 10, 12 -> 31;
            case 4, 6, 9, 11            -> 30;   // month 9 matches here
            case 2                       -> 28;
            default                      -> -1;
        };
        System.out.println("Days in month " + month + ": " + daysInMonth); // 30

        // Switch expression for grade
        int score = 85;
        String grade = switch (score / 10) {
            case 10, 9 -> "A — Excellent";
            case 8     -> "B — Very Good";   // 85/10 = 8 → matches here
            case 7     -> "C — Good";
            case 6     -> "D — Pass";
            default    -> "F — Fail";
        };
        System.out.println("Grade: " + grade);

        // Switch with String
        String day = "MONDAY";
        String type = switch (day) {
            case "MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY" -> "Weekday";
            case "SATURDAY","SUNDAY"                                 -> "Weekend";
            default                                                  -> "Unknown";
        };
        System.out.println(day + " is a " + type);
    }
}`,
        output: "Days in month 9: 30\nGrade: B — Very Good\nMONDAY is a Weekday"
      },

      // ── 9. switch vs if-else ──────────────────────────────────────
      {
        heading: "switch vs if-else — When to Use Which",
        content: "Both make decisions, but each has a different sweet spot. Understanding when to use which produces cleaner, more readable code.",
        table: {
          headers: ["Feature",              "switch",                              "if-else"],
          rows: [
            ["Best for",        "Multiple specific fixed VALUES",        "Ranges, complex conditions, multiple variables"],
            ["Condition type",  "Exact match only (==)",                 "Any boolean expression (>, <, &&, ||, etc.)"],
            ["Variable types",  "int, char, String, enum only",          "Any boolean expression"],
            ["Readability",     "Cleaner for many options (5+)",         "Better for 2-3 conditions"],
            ["Performance",     "Slightly faster (jump table)",          "Linear — checks top to bottom"],
            ["Default case",    "default:",                              "final else {}"],
            ["Example",         "ATM menu, day of week, season",        "Grade range, age check, loan eligibility"]
          ]
        }
      },

      // ── 10. Real-world program ────────────────────────────────────
      {
        heading: "Real-World Program — Student Result System",
        content: "This combines if, else-if, nested if, and switch into one complete program that mirrors what you would build in a real Java project.",
        code: `public class StudentResult {
    public static void main(String[] args) {

        String studentName = "Priya Sharma";
        int    mathMarks   = 88;
        int    sciMarks    = 72;
        int    engMarks    = 91;

        // Arithmetic
        int    total      = mathMarks + sciMarks + engMarks;
        double percentage = (double) total / 300 * 100;

        // else-if ladder for grade
        String grade;
        if      (percentage >= 90) grade = "A+";
        else if (percentage >= 80) grade = "A";
        else if (percentage >= 70) grade = "B";
        else if (percentage >= 60) grade = "C";
        else if (percentage >= 35) grade = "D";
        else                       grade = "F";

        // Nested if for distinction
        String remark;
        if (percentage >= 35) {
            if (percentage >= 75) {
                remark = "PASS with Distinction";
            } else {
                remark = "PASS";
            }
        } else {
            remark = "FAIL — Re-examination required";
        }

        // switch for scholarship decision
        String scholarship;
        switch (grade) {
            case "A+": scholarship = "Full Scholarship"; break;
            case "A":  scholarship = "50% Scholarship";  break;
            case "B":  scholarship = "25% Scholarship";  break;
            default:   scholarship = "No Scholarship";
        }

        System.out.println("===== Result Card =====");
        System.out.println("Name       : " + studentName);
        System.out.println("Maths      : " + mathMarks);
        System.out.println("Science    : " + sciMarks);
        System.out.println("English    : " + engMarks);
        System.out.println("Total      : " + total + " / 300");
        System.out.printf ("Percentage : %.2f%%%n", percentage);
        System.out.println("Grade      : " + grade);
        System.out.println("Result     : " + remark);
        System.out.println("Scholarship: " + scholarship);
        System.out.println("=======================");
    }
}`,
        output: "===== Result Card =====\nName       : Priya Sharma\nMaths      : 88\nScience    : 72\nEnglish    : 91\nTotal      : 251 / 300\nPercentage : 83.67%\nGrade      : A\nResult     : PASS with Distinction\nScholarship: 50% Scholarship\n======================="
      },

      // ── 11. Common mistakes ───────────────────────────────────────
      {
        heading: "Common Beginner Mistakes in Control Flow",
        content: "These mistakes are made by almost every Java beginner. Study each one carefully.",
        list: [
          "❌ Mistake 1: Using = instead of == in condition\n  if (age = 18) → COMPILE ERROR in Java\n  ✅ Fix: if (age == 18)",
          "❌ Mistake 2: Semicolon after if condition\n  if (age >= 18); { System.out.println(\"Adult\"); } → block ALWAYS runs!\n  ✅ Fix: Remove the semicolon after the condition",
          "❌ Mistake 3: Forgetting break in switch\n  case 1: ... case 2: ... → fall-through prints both!\n  ✅ Fix: Always add break; at end of each case",
          "❌ Mistake 4: Using == for String in switch or if\n  if (name == \"Rohan\") → may fail even when content matches\n  ✅ Fix: if (name.equals(\"Rohan\")) — but switch handles String correctly",
          "❌ Mistake 5: Wrong order in else-if — unreachable conditions\n  if (marks >= 35) ... else if (marks >= 75) → second never reached if first matches!\n  ✅ Fix: Put more specific/higher conditions FIRST"
        ]
      }
    ],

    quiz: [
      { q: "What happens if you forget 'break' in a switch case?", options: ["Compile error", "Fall-through to next case", "Nothing happens", "RuntimeException"], correct: 1 },
      { q: "Which data types can be used in a Java switch?", options: ["Only int", "int, char, String, enum", "Only primitives", "Any type"], correct: 1 },
      { q: "What runs when no switch case matches?", options: ["Error", "Nothing", "default block", "First case"], correct: 2 },
      { q: "Java if condition must evaluate to:", options: ["An integer", "A boolean (true/false)", "Any value", "A String"], correct: 1 },
      { q: "In an else-if ladder, how many blocks execute?", options: ["All matching ones", "Only the first matching one", "All of them", "The last one always"], correct: 1 },
      { q: "When should you use switch over if-else?", options: ["For range checks", "For multiple specific fixed values", "For complex logic", "Always"], correct: 1 }
    ],

    code: `public class ControlFlowDemo {
    public static void main(String[] args) {

        // Voting + category checker
        int age = 22;
        if (age < 18)       System.out.println("Minor — cannot vote");
        else if (age < 60)  System.out.println("Adult — eligible to vote");
        else                System.out.println("Senior — eligible to vote");

        // switch for role-based access
        String role = "editor";
        switch (role) {
            case "admin":  System.out.println("Full access");   break;
            case "editor": System.out.println("Edit access");   break;
            case "viewer": System.out.println("View only");     break;
            default:       System.out.println("No access");
        }

        // Nested if for loan
        double salary = 60000;
        int credit    = 750;
        if (salary >= 50000) {
            if (credit >= 700) System.out.println("Loan approved ✓");
            else               System.out.println("Credit score too low");
        } else {
            System.out.println("Salary too low");
        }
    }
}`,
    output: "Adult — eligible to vote\nEdit access\nLoan approved ✓"
  },

  "loops": {
    title: "Loops in Java — Complete Guide", module: "basics", duration: "40 min", difficulty: "Beginner", xp: 120, icon: "🔁",
    intro: "A loop repeats a block of code multiple times. Without loops, if you wanted to print 'Hello' 100 times, you would have to write 100 println statements — which is absurd. Loops solve this by letting you write the code ONCE and run it as many times as needed. Java has 4 types of loops: for (when count is known), while (when condition-driven), do-while (runs at least once), and for-each (cleanest for arrays/collections).",

    sections: [

      // ── 1. Why loops? ─────────────────────────────────────────────
      {
        heading: "Why Do We Need Loops?",
        content: "Without loops, repetitive tasks require copying the same code hundreds of times. Loops make programs powerful, concise, and maintainable.",
        list: [
          "🔴 Without loop: print 1 to 5 requires 5 separate println statements",
          "🟢 With loop: for(int i=1; i<=5; i++) { println(i); } — 3 lines handles any count",
          "📋 Print all items in a shopping cart — you don't know how many items exist at compile time",
          "🧮 Calculate sum/average of student marks — loop through all marks",
          "🔍 Search for an element — loop until you find it or reach the end",
          "⭐ Draw patterns, generate tables, process files, validate input — all require loops"
        ]
      },

      // ── 2. for loop ───────────────────────────────────────────────
      {
        heading: "for Loop — When You Know the Count",
        content: "The for loop is the most commonly used loop. Use it when you know exactly how many times the loop should run. It has 3 parts: initialization (runs once at start), condition (checked before each iteration), and update (runs after each iteration).",
        table: {
          headers: ["Part",           "Purpose",                           "Example",   "When it runs"],
          rows: [
            ["Initialization", "Create and set loop counter",    "int i = 1", "Once — before loop starts"],
            ["Condition",      "Check if loop should continue",  "i <= 5",    "Before EVERY iteration"],
            ["Update",         "Change counter after each turn", "i++",       "After EVERY iteration body"]
          ]
        },
        code: `public class ForLoop {
    public static void main(String[] args) {

        // Basic: count 1 to 5
        System.out.print("1 to 5 : ");
        for (int i = 1; i <= 5; i++) {
            System.out.print(i + " ");
        }
        System.out.println();

        // Count down: 5 to 1
        System.out.print("5 to 1 : ");
        for (int i = 5; i >= 1; i--) {
            System.out.print(i + " ");
        }
        System.out.println();

        // Step by 2: even numbers
        System.out.print("Evens  : ");
        for (int i = 2; i <= 10; i += 2) {
            System.out.print(i + " ");
        }
        System.out.println();

        // Sum of 1 to 100
        int sum = 0;
        for (int i = 1; i <= 100; i++) {
            sum += i;
        }
        System.out.println("Sum 1-100 : " + sum);  // 5050

        // Multiplication table of 5
        System.out.println("Table of 5:");
        for (int i = 1; i <= 10; i++) {
            System.out.println("5 × " + i + " = " + (5 * i));
        }
    }
}`,
        output: "1 to 5 : 1 2 3 4 5 \n5 to 1 : 5 4 3 2 1 \nEvens  : 2 4 6 8 10 \nSum 1-100 : 5050\nTable of 5:\n5 × 1 = 5\n5 × 2 = 10\n5 × 3 = 15\n5 × 4 = 20\n5 × 5 = 25\n5 × 6 = 30\n5 × 7 = 35\n5 × 8 = 40\n5 × 9 = 45\n5 × 10 = 50",
        note: "The loop variable i is LOCAL — it only exists inside the for loop. After the loop ends, i is gone. This is by design — keeps your variable scope clean."
      },

      // ── 3. while loop ─────────────────────────────────────────────
      {
        heading: "while Loop — When You Don't Know the Count",
        content: "The while loop repeats AS LONG AS a condition is true. Use it when you don't know how many iterations are needed — for example, reading input until the user types 'quit', or processing until a bank balance hits zero.",
        code: `public class WhileLoop {
    public static void main(String[] args) {

        // Basic while — count 1 to 5
        int i = 1;
        while (i <= 5) {
            System.out.print(i + " ");
            i++;           // ⚠️ MUST update! Forgetting this = infinite loop
        }
        System.out.println();

        // Find first power of 2 greater than 1000
        int power = 1;
        while (power <= 1000) {
            power *= 2;
        }
        System.out.println("First 2^n > 1000 : " + power);  // 1024

        // Digit sum — don't know how many digits
        int number  = 12345;
        int digitSum = 0;
        int temp    = number;
        while (temp > 0) {
            digitSum += temp % 10;   // extract last digit
            temp     /= 10;          // remove last digit
        }
        System.out.println("Digit sum of " + number + " : " + digitSum); // 15

        // Reverse a number
        int num     = 98765;
        int reversed = 0;
        int original = num;
        while (num > 0) {
            reversed = reversed * 10 + num % 10;
            num /= 10;
        }
        System.out.println("Reverse of " + original + " : " + reversed); // 56789
    }
}`,
        output: "1 2 3 4 5 \nFirst 2^n > 1000 : 1024\nDigit sum of 12345 : 15\nReverse of 98765 : 56789",
        note: "⚠️ Always make sure the condition will eventually become false. Forgetting to update the counter (like i++) creates an INFINITE LOOP — the program runs forever and freezes. Press Ctrl+C to stop an infinite loop."
      },

      // ── 4. do-while loop ──────────────────────────────────────────
      {
        heading: "do-while Loop — Always Runs At Least Once",
        content: "The do-while loop executes the body FIRST, then checks the condition. This guarantees the loop body runs at least once — even if the condition is false from the very beginning. Use it for menu-driven programs and input validation.",
        code: `public class DoWhileLoop {
    public static void main(String[] args) {

        // Basic do-while
        int i = 1;
        do {
            System.out.print(i + " ");
            i++;
        } while (i <= 5);
        System.out.println();

        // KEY DIFFERENCE: condition false from start
        // while loop — body NEVER runs
        int x = 100;
        while (x < 5) {
            System.out.println("while: this never prints");
        }

        // do-while — body runs ONCE even though condition is false
        int y = 100;
        do {
            System.out.println("do-while ran once: y = " + y); // prints!
        } while (y < 5);

        // Classic use: ATM menu (show menu at least once)
        int option = 3; // simulate user choosing option 3
        do {
            System.out.println("--- ATM Menu ---");
            System.out.println("1. Check Balance");
            System.out.println("2. Withdraw");
            System.out.println("3. Exit");
            System.out.println("You chose: " + option);

            if (option == 3) {
                System.out.println("Thank you. Goodbye!");
            }
        } while (option != 3); // exit when 3 chosen
    }
}`,
        output: "1 2 3 4 5 \ndo-while ran once: y = 100\n--- ATM Menu ---\n1. Check Balance\n2. Withdraw\n3. Exit\nYou chose: 3\nThank you. Goodbye!",
        note: "📌 The key difference: while checks condition BEFORE executing. do-while executes FIRST, THEN checks condition. Use do-while when the action must happen at least once before deciding whether to repeat."
      },

      // ── 5. for-each loop ──────────────────────────────────────────
      {
        heading: "for-each Loop — Clean Iteration Over Arrays and Collections",
        content: "The enhanced for loop (for-each) is the cleanest way to iterate through every element in an array or collection. You don't need an index counter — Java handles it internally. The trade-off: you cannot modify the array elements or access the index.",
        code: `public class ForEachLoop {
    public static void main(String[] args) {

        // for-each over int array
        int[] marks = {88, 72, 95, 60, 84};
        System.out.print("Marks : ");
        for (int mark : marks) {
            System.out.print(mark + " ");
        }
        System.out.println();

        // Calculate average using for-each
        int total = 0;
        for (int mark : marks) {
            total += mark;
        }
        double average = (double) total / marks.length;
        System.out.printf("Average : %.1f%n", average);

        // for-each over String array
        String[] fruits = {"Apple", "Banana", "Cherry", "Date", "Elderberry"};
        System.out.println("Fruits in stock:");
        for (String fruit : fruits) {
            System.out.println("  → " + fruit);
        }

        // for-each with condition
        System.out.print("Marks above 80 : ");
        for (int mark : marks) {
            if (mark > 80) System.out.print(mark + " ");
        }
        System.out.println();
    }
}`,
        output: "Marks : 88 72 95 60 84 \nAverage : 79.8\nFruits in stock:\n  → Apple\n  → Banana\n  → Cherry\n  → Date\n  → Elderberry\nMarks above 80 : 88 95 84 "
      },

      // ── 6. break and continue ─────────────────────────────────────
      {
        heading: "break and continue — Control Loop Execution",
        content: "break immediately exits the loop. continue skips the rest of the current iteration and jumps to the next one. Both are used inside loops and switch statements.",
        code: `public class BreakContinue {
    public static void main(String[] args) {

        // break — exit loop immediately when condition is met
        System.out.print("Break at 5 : ");
        for (int i = 1; i <= 10; i++) {
            if (i == 5) break;        // exit loop when i reaches 5
            System.out.print(i + " ");
        }
        System.out.println(); // 1 2 3 4

        // continue — skip current iteration, continue loop
        System.out.print("Skip 3 & 7 : ");
        for (int i = 1; i <= 10; i++) {
            if (i == 3 || i == 7) continue;  // skip 3 and 7
            System.out.print(i + " ");
        }
        System.out.println(); // 1 2 4 5 6 8 9 10

        // Practical: break — search and stop when found
        int[] numbers = {4, 7, 2, 9, 1, 5, 8};
        int   target  = 9;
        int   foundAt = -1;
        for (int i = 0; i < numbers.length; i++) {
            if (numbers[i] == target) {
                foundAt = i;
                break;  // no need to continue searching
            }
        }
        System.out.println(target + " found at index : " + foundAt); // 3

        // Practical: continue — skip negative numbers
        int[] data  = {5, -3, 8, -1, 6, -7, 4};
        int   posSum = 0;
        for (int n : data) {
            if (n < 0) continue;    // skip negatives
            posSum += n;
        }
        System.out.println("Sum of positives : " + posSum); // 23
    }
}`,
        output: "Break at 5 : 1 2 3 4 \nSkip 3 & 7 : 1 2 4 5 6 8 9 10 \n9 found at index : 3\nSum of positives : 23"
      },

      // ── 7. Nested loops ───────────────────────────────────────────
      {
        heading: "Nested Loops — A Loop Inside a Loop",
        content: "A nested loop is a loop inside another loop. The INNER loop completes ALL its iterations for EACH single iteration of the OUTER loop. Used for: tables, matrices, patterns, comparing all pairs of elements.",
        code: `public class NestedLoops {
    public static void main(String[] args) {

        // Multiplication table 1-5
        System.out.println("Multiplication Table (1-5):");
        for (int i = 1; i <= 5; i++) {
            for (int j = 1; j <= 5; j++) {
                System.out.printf("%4d", i * j);
            }
            System.out.println();
        }

        System.out.println();

        // Star pattern — right-angled triangle
        System.out.println("Star Pattern:");
        for (int i = 1; i <= 5; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }

        System.out.println();

        // Print all pairs
        int[] nums = {1, 2, 3};
        System.out.println("All pairs:");
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                System.out.println("  (" + nums[i] + ", " + nums[j] + ")");
            }
        }
    }
}`,
        output: "Multiplication Table (1-5):\n   1   2   3   4   5\n   2   4   6   8  10\n   3   6   9  12  15\n   4   8  12  16  20\n   5  10  15  20  25\n\nStar Pattern:\n* \n* * \n* * * \n* * * * \n* * * * * \n\nAll pairs:\n  (1, 2)\n  (1, 3)\n  (2, 3)"
      },

      // ── 8. Comparison table ───────────────────────────────────────
      {
        heading: "Choosing the Right Loop — Comparison Guide",
        content: "Each loop type has a specific use case. Using the right one makes your code's intent clear to anyone reading it.",
        table: {
          headers: ["Loop",      "When to Use",                            "Runs if condition false?", "Example"],
          rows: [
            ["for",      "Known count, index needed",             "No — condition checked first", "Print 1 to 100, table, pattern"],
            ["while",    "Unknown count, condition-driven",       "No — condition checked first", "Digit sum, reverse, process till done"],
            ["do-while", "Must run at least once",                "YES — executes body first",    "ATM menu, input validation"],
            ["for-each", "Iterate all elements, no index needed", "No",                           "Sum array, print list, filter items"]
          ]
        }
      },

      // ── 9. Common mistakes ────────────────────────────────────────
      {
        heading: "Common Loop Mistakes — Avoid These",
        content: "These mistakes are made by almost every Java beginner. Study each carefully.",
        list: [
          "❌ Mistake 1: Infinite loop — forgetting to update counter\n  int i=1; while(i<=5){ println(i); } → i never changes, runs forever\n  ✅ Fix: Add i++ inside the loop body",
          "❌ Mistake 2: Off-by-one error\n  for(int i=0; i<=arr.length; i++) → crashes at arr[arr.length]\n  ✅ Fix: for(int i=0; i<arr.length; i++) — use < not <=",
          "❌ Mistake 3: Modifying array in for-each\n  for(int n : arr) { n = n * 2; } → does NOT change the array\n  ✅ Fix: Use regular for loop: for(int i=0; i<arr.length; i++) arr[i] *= 2;",
          "❌ Mistake 4: Semicolon after for loop\n  for(int i=0; i<5; i++); { println(i); } → body runs only once!\n  ✅ Fix: Remove semicolon after the closing parenthesis",
          "❌ Mistake 5: Wrong loop choice for unknown count\n  for(int i=0; i<??; i++) when count unknown at compile time\n  ✅ Fix: Use while with a proper exit condition"
        ]
      },

      // ── 10. Practice programs ─────────────────────────────────────
      {
        heading: "Practice Programs — Classic Loop Exercises",
        content: "These are the most commonly asked beginner programs using loops. Master all of them.",
        code: `public class LoopPractice {
    public static void main(String[] args) {

        // 1. FizzBuzz (classic interview question)
        System.out.println("FizzBuzz 1-15:");
        for (int i = 1; i <= 15; i++) {
            if      (i % 15 == 0) System.out.print("FizzBuzz ");
            else if (i % 3  == 0) System.out.print("Fizz ");
            else if (i % 5  == 0) System.out.print("Buzz ");
            else                  System.out.print(i + " ");
        }
        System.out.println();

        // 2. Prime numbers up to 30
        System.out.print("Primes ≤ 30 : ");
        for (int n = 2; n <= 30; n++) {
            boolean isPrime = true;
            for (int d = 2; d * d <= n; d++) {
                if (n % d == 0) { isPrime = false; break; }
            }
            if (isPrime) System.out.print(n + " ");
        }
        System.out.println();

        // 3. Factorial
        int num  = 6;
        long fact = 1;
        for (int i = 1; i <= num; i++) fact *= i;
        System.out.println(num + "! = " + fact);

        // 4. Fibonacci
        System.out.print("Fibonacci : ");
        int a = 0, b = 1;
        for (int i = 0; i < 10; i++) {
            System.out.print(a + " ");
            int next = a + b; a = b; b = next;
        }
        System.out.println();
    }
}`,
        output: "FizzBuzz 1-15:\n1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz \nPrimes ≤ 30 : 2 3 5 7 11 13 17 19 23 29 \n6! = 720\nFibonacci : 0 1 1 2 3 5 8 13 21 34 "
      }
    ],

    quiz: [
      { q: "Which loop is guaranteed to run at least once?", options: ["for", "while", "do-while", "for-each"], correct: 2 },
      { q: "What does 'continue' do in a loop?", options: ["Exits the loop", "Skips to next iteration", "Restarts the loop", "Pauses the loop"], correct: 1 },
      { q: "What is the output of: for(int i=0;i<3;i++) System.out.print(i);", options: ["123", "012", "0123", "321"], correct: 1 },
      { q: "Best loop for iterating every element of an array:", options: ["while", "do-while", "for-each", "All are the same"], correct: 2 },
      { q: "What causes an infinite loop in while?", options: ["Syntax error", "Condition never becomes false", "Missing semicolon", "Wrong data type"], correct: 1 },
      { q: "In a nested loop, how many times does the inner loop run?", options: ["Same as outer", "Once total", "Once per outer iteration × inner count", "Independently"], correct: 2 }
    ],

    code: `public class LoopsDemo {
    public static void main(String[] args) {

        // for: multiplication table of 3
        System.out.print("Table of 3 : ");
        for (int i = 1; i <= 10; i++) System.out.print((3*i) + " ");
        System.out.println();

        // while: countdown
        System.out.print("Countdown  : ");
        int n = 10;
        while (n >= 1) { System.out.print(n-- + " "); }
        System.out.println("Blast off!");

        // for-each: sum and max
        int[] scores = {78, 92, 55, 88, 70, 95, 63};
        int sum = 0, max = scores[0];
        for (int s : scores) { sum += s; if(s > max) max = s; }
        System.out.printf("Sum=%-4d Max=%-4d Avg=%.1f%n",
            sum, max, (double)sum/scores.length);

        // Nested: star triangle
        for (int i = 1; i <= 4; i++) {
            for (int j = 0; j < i; j++) System.out.print("★ ");
            System.out.println();
        }
    }
}`,
    output: "Table of 3 : 3 6 9 12 15 18 21 24 27 30 \nCountdown  : 10 9 8 7 6 5 4 3 2 1 Blast off!\nSum=541  Max=95   Avg=77.3\n★ \n★ ★ \n★ ★ ★ \n★ ★ ★ ★ "
  },

  "arrays": {
    title: "Arrays in Java — Complete Guide", module: "basics", duration: "40 min", difficulty: "Beginner", xp: 120, icon: "📊",
    intro: "An array stores multiple values of the SAME data type in a single variable. Without arrays, storing 100 student marks would require 100 separate variables — which is impossible to manage. An array stores them all together in one named, indexed container. Arrays are indexed from 0, have a fixed size once created, and throw ArrayIndexOutOfBoundsException if you access an invalid index.",

    sections: [

      // ── 1. Why arrays? ────────────────────────────────────────────
      {
        heading: "What is an Array and Why Do We Need It?",
        content: "An array solves the problem of storing and managing multiple related values without creating hundreds of separate variables.",
        list: [
          "🔴 Without array: int s1=90, s2=80, s3=70, s4=60, s5=55; — messy, unscalable",
          "🟢 With array: int[] marks = {90, 80, 70, 60, 55}; — clean, compact",
          "📌 All values stored together in CONTIGUOUS memory locations",
          "📌 Access any element instantly by its index number (0-based)",
          "📌 Loop through all elements with a single for loop",
          "💡 Real uses: student marks, product prices, employee salaries, pixel data in images"
        ],
        note: "Array size is FIXED at creation. If you need to add/remove elements dynamically, use ArrayList instead."
      },

      // ── 2. Creating arrays ────────────────────────────────────────
      {
        heading: "Creating Arrays — Two Methods",
        content: "Method 1: new keyword — creates array with default values (0 for int, false for boolean, null for String). Method 2: Initializer list — declare with values directly using curly braces { }.",
        code: `public class ArrayCreation {
    public static void main(String[] args) {

        // METHOD 1: new keyword — you decide size, Java fills with defaults
        int[] scores = new int[5];          // creates [0, 0, 0, 0, 0]
        System.out.println("Default int  : " + scores[0]);  // 0
        System.out.println("Default int  : " + scores[3]);  // 0

        // Assign values one by one
        scores[0] = 95;
        scores[1] = 87;
        scores[2] = 91;
        scores[3] = 78;
        scores[4] = 88;

        // METHOD 2: Initializer — declare and fill at the same time
        int[]    marks   = {90, 85, 72, 96, 60};
        String[] names   = {"Rohan", "Priya", "Aman", "Dave"};
        boolean[] status = {true, false, true, true};
        double[]  prices = {99.99, 149.50, 299.00};

        // Access elements using index
        System.out.println("First mark  : " + marks[0]);          // 90
        System.out.println("Last name   : " + names[names.length - 1]); // Dave
        System.out.println("Third price : " + prices[2]);         // 299.0
        System.out.println("Array size  : " + marks.length);      // 5
    }
}`,
        output: "Default int  : 0\nDefault int  : 0\nFirst mark  : 90\nLast name   : Dave\nThird price : 299.0\nArray size  : 5"
      },

      // ── 3. Index explained ────────────────────────────────────────
      {
        heading: "Array Index — How It Works",
        content: "Array indexing ALWAYS starts from 0, not 1. For an array of size 5, valid indexes are 0, 1, 2, 3, 4. Index 5 does NOT exist — accessing it causes ArrayIndexOutOfBoundsException.",
        table: {
          headers: ["Index",  "0",  "1",  "2",  "3",  "4"],
          rows: [
            ["Value (marks[])", "90", "85", "72", "96", "60"],
            ["Access",  "marks[0]", "marks[1]", "marks[2]", "marks[3]", "marks[4]"]
          ]
        },
        code: `public class ArrayIndex {
    public static void main(String[] args) {

        int[] marks = {90, 85, 72, 96, 60};

        // Access by index
        System.out.println("Index 0 (first) : " + marks[0]);               // 90
        System.out.println("Index 2 (third) : " + marks[2]);               // 72
        System.out.println("Index 4 (last)  : " + marks[4]);               // 60
        System.out.println("Last element    : " + marks[marks.length - 1]); // 60 (safe way)

        // Modify a value
        System.out.println("Before update   : " + marks[1]);  // 85
        marks[1] = 99;
        System.out.println("After update    : " + marks[1]);  // 99

        // ❌ ArrayIndexOutOfBoundsException
        // System.out.println(marks[5]); // ERROR! Index 5 does not exist

        // Length property
        System.out.println("Array length    : " + marks.length); // 5
        // Valid indexes: 0 to marks.length - 1 = 0 to 4
    }
}`,
        output: "Index 0 (first) : 90\nIndex 2 (third) : 72\nIndex 4 (last)  : 60\nLast element    : 60\nBefore update   : 85\nAfter update    : 99\nArray length    : 5",
        note: "⚠️ The most common array mistake: using arr[arr.length] instead of arr[arr.length - 1] to get the last element. arr.length is 5, but the last valid index is 4. Always subtract 1!"
      },

      // ── 4. Traversing arrays ──────────────────────────────────────
      {
        heading: "Traversing Arrays — Loop Through Every Element",
        content: "Traversal means visiting every element one by one. Java provides three ways to loop through an array. Each has its own advantage.",
        code: `public class ArrayTraversal {
    public static void main(String[] args) {

        int[] numbers = {10, 20, 30, 40, 50};

        // Method 1: Regular for loop — use when you need the INDEX
        System.out.println("Regular for (with index):");
        for (int i = 0; i < numbers.length; i++) {
            System.out.println("  Index " + i + " → " + numbers[i]);
        }

        // Method 2: for-each — cleanest, use when you DON'T need index
        System.out.println("For-each (no index):");
        for (int num : numbers) {
            System.out.print(num + " ");
        }
        System.out.println();

        // Method 3: while loop — use for complex traversal logic
        System.out.println("While loop:");
        int i = numbers.length - 1;   // start from last
        while (i >= 0) {
            System.out.print(numbers[i] + " ");  // reverse order
            i--;
        }
        System.out.println();

        // Practical: find sum, max, min
        int[] marks = {78, 92, 55, 88, 70, 95, 63};
        int   sum = 0, max = marks[0], min = marks[0];

        for (int mark : marks) {
            sum += mark;
            if (mark > max) max = mark;
            if (mark < min) min = mark;
        }

        System.out.println("Sum     : " + sum);
        System.out.println("Maximum : " + max);
        System.out.println("Minimum : " + min);
        System.out.printf ("Average : %.2f%n", (double)sum / marks.length);
    }
}`,
        output: "Regular for (with index):\n  Index 0 → 10\n  Index 1 → 20\n  Index 2 → 30\n  Index 3 → 40\n  Index 4 → 50\nFor-each (no index):\n10 20 30 40 50 \nWhile loop:\n50 40 30 20 10 \nSum     : 541\nMaximum : 95\nMinimum : 55\nAverage : 77.29"
      },

      // ── 5. Array operations ───────────────────────────────────────
      {
        heading: "Common Array Operations — Search, Sort, Reverse",
        content: "These are the most-asked array programs in Java beginners courses and technical interviews. Master all of them.",
        code: `import java.util.Arrays;

public class ArrayOperations {
    public static void main(String[] args) {

        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("Original  : " + Arrays.toString(arr));

        // 1. Sort
        Arrays.sort(arr);
        System.out.println("Sorted    : " + Arrays.toString(arr));
        System.out.println("Min       : " + arr[0]);
        System.out.println("Max       : " + arr[arr.length - 1]);

        // 2. Linear search
        int[] data   = {5, 8, 3, 9, 1, 7};
        int   target = 9;
        int   foundAt = -1;
        for (int i = 0; i < data.length; i++) {
            if (data[i] == target) { foundAt = i; break; }
        }
        System.out.println("Search " + target + " : index " + foundAt); // 3

        // 3. Reverse an array
        int[] original = {1, 2, 3, 4, 5};
        int   left = 0, right = original.length - 1;
        while (left < right) {
            int temp         = original[left];
            original[left]   = original[right];
            original[right]  = temp;
            left++; right--;
        }
        System.out.println("Reversed  : " + Arrays.toString(original)); // [5,4,3,2,1]

        // 4. Copy an array
        int[] source = {10, 20, 30, 40, 50};
        int[] copy   = Arrays.copyOf(source, source.length);
        int[] partial= Arrays.copyOfRange(source, 1, 4); // index 1 to 3
        System.out.println("Copy      : " + Arrays.toString(copy));
        System.out.println("Partial   : " + Arrays.toString(partial)); // [20,30,40]

        // 5. Check duplicates
        int[] nums = {1, 2, 3, 2, 4, 1};
        System.out.print("Duplicates: ");
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] == nums[j]) System.out.print(nums[i] + " ");
            }
        }
        System.out.println();
    }
}`,
        output: "Original  : [64, 34, 25, 12, 22, 11, 90]\nSorted    : [11, 12, 22, 25, 34, 64, 90]\nMin       : 11\nMax       : 90\nSearch 9 : index 3\nReversed  : [5, 4, 3, 2, 1]\nCopy      : [10, 20, 30, 40, 50]\nPartial   : [20, 30, 40]\nDuplicates: 1 2 "
      },

      // ── 6. 2D arrays ──────────────────────────────────────────────
      {
        heading: "2D Arrays — Array of Arrays (Matrix)",
        content: "A 2D array stores data in rows and columns — like a table or matrix. Think of it as a spreadsheet: rows across, columns down. Access elements with two indexes: arr[row][column].",
        code: `public class TwoDArray {
    public static void main(String[] args) {

        // Create a 2D array (3 rows × 3 columns)
        int[][] matrix = {
            {1, 2, 3},   // row 0
            {4, 5, 6},   // row 1
            {7, 8, 9}    // row 2
        };

        // Access specific elements
        System.out.println("Top-left    : " + matrix[0][0]); // 1
        System.out.println("Center      : " + matrix[1][1]); // 5
        System.out.println("Bottom-right: " + matrix[2][2]); // 9

        // Print as table (nested loops)
        System.out.println("Matrix:");
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                System.out.printf("%3d", matrix[i][j]);
            }
            System.out.println();
        }

        // Real-world: student marks in multiple subjects
        // Rows = students, Columns = subjects (Maths, Science, English)
        int[][] studentMarks = {
            {88, 72, 91},  // Rohan
            {79, 85, 68},  // Priya
            {92, 88, 95}   // Aman
        };
        String[] students = {"Rohan", "Priya", "Aman"};

        System.out.println("\nStudent Results:");
        for (int i = 0; i < studentMarks.length; i++) {
            int total = 0;
            for (int j = 0; j < studentMarks[i].length; j++) {
                total += studentMarks[i][j];
            }
            System.out.printf("%-8s : %d/300 (%.1f%%)%n",
                students[i], total, (double)total/300*100);
        }
    }
}`,
        output: "Top-left    : 1\nCenter      : 5\nBottom-right: 9\nMatrix:\n  1  2  3\n  4  5  6\n  7  8  9\n\nStudent Results:\nRohan    : 251/300 (83.7%)\nPriya    : 232/300 (77.3%)\nAman     : 275/300 (91.7%)"
      },

      // ── 7. Arrays utility class ───────────────────────────────────
      {
        heading: "java.util.Arrays — Built-in Utility Methods",
        content: "Java provides the Arrays class with ready-made methods for common operations. Always import java.util.Arrays to use them.",
        table: {
          headers: ["Method",                    "What it does",                       "Example"],
          rows: [
            ["Arrays.toString(arr)",           "Converts array to readable string",  "[1, 2, 3]"],
            ["Arrays.sort(arr)",               "Sorts array in ascending order",      "[5,2,8] → [2,5,8]"],
            ["Arrays.fill(arr, val)",          "Fills all elements with value",       "[0,0,0,0,0]"],
            ["Arrays.copyOf(arr, len)",        "Copies first len elements",           "first 3 of [1,2,3,4,5]"],
            ["Arrays.copyOfRange(arr, f, t)",  "Copies elements from f to t-1",      "index 1 to 3"],
            ["Arrays.binarySearch(arr, key)",  "Search (array must be sorted first)","returns index or negative"],
            ["Arrays.equals(arr1, arr2)",      "Checks if two arrays are equal",      "true/false"],
            ["Arrays.stream(arr).sum()",       "Sum all elements",                    "sum of int array"]
          ]
        },
        code: `import java.util.Arrays;

public class ArraysUtility {
    public static void main(String[] args) {

        int[] nums = {5, 2, 8, 1, 9, 3, 7, 4, 6};

        // toString — print nicely
        System.out.println("Original : " + Arrays.toString(nums));

        // sort
        Arrays.sort(nums);
        System.out.println("Sorted   : " + Arrays.toString(nums));

        // binarySearch (array must be sorted first!)
        int index = Arrays.binarySearch(nums, 7);
        System.out.println("Index of 7: " + index);   // 6

        // fill
        int[] filled = new int[5];
        Arrays.fill(filled, 42);
        System.out.println("Filled   : " + Arrays.toString(filled));

        // copyOf and copyOfRange
        int[] first4 = Arrays.copyOf(nums, 4);
        int[] mid    = Arrays.copyOfRange(nums, 2, 6); // index 2 to 5
        System.out.println("First 4  : " + Arrays.toString(first4));
        System.out.println("Mid [2,6): " + Arrays.toString(mid));

        // equals
        int[] a = {1, 2, 3};
        int[] b = {1, 2, 3};
        int[] c = {1, 2, 4};
        System.out.println("a equals b: " + Arrays.equals(a, b)); // true
        System.out.println("a equals c: " + Arrays.equals(a, c)); // false

        // stream sum and average
        int   sum = Arrays.stream(nums).sum();
        double avg = Arrays.stream(nums).average().getAsDouble();
        System.out.println("Sum      : " + sum);
        System.out.printf ("Average  : %.2f%n", avg);
    }
}`,
        output: "Original : [5, 2, 8, 1, 9, 3, 7, 4, 6]\nSorted   : [1, 2, 3, 4, 5, 6, 7, 8, 9]\nIndex of 7: 6\nFilled   : [42, 42, 42, 42, 42]\nFirst 4  : [1, 2, 3, 4]\nMid [2,6): [3, 4, 5, 6]\na equals b: true\na equals c: false\nSum      : 45\nAverage  : 5.00"
      },

      // ── 8. Array input from user ──────────────────────────────────
      {
        heading: "Taking Array Input from User",
        content: "In real programs, arrays are filled from user input, files, or databases — not hardcoded. Here is how to read array values from the user using Scanner.",
        code: `import java.util.Scanner;

public class ArrayInput {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.print("How many students? ");
        int n = sc.nextInt();

        int[] marks = new int[n];

        // Input loop
        for (int i = 0; i < n; i++) {
            System.out.print("Enter marks for student " + (i+1) + ": ");
            marks[i] = sc.nextInt();
        }

        // Process
        int sum = 0, max = marks[0], min = marks[0];
        for (int mark : marks) {
            sum += mark;
            if (mark > max) max = mark;
            if (mark < min) min = mark;
        }

        // Output
        System.out.println("\\n=== Class Report ===");
        System.out.println("Total students : " + n);
        System.out.printf ("Average marks  : %.2f%n", (double)sum/n);
        System.out.println("Highest marks  : " + max);
        System.out.println("Lowest marks   : " + min);

        sc.close();
    }
}`,
        output: "How many students? 4\nEnter marks for student 1: 88\nEnter marks for student 2: 72\nEnter marks for student 3: 95\nEnter marks for student 4: 60\n\n=== Class Report ===\nTotal students : 4\nAverage marks  : 78.75\nHighest marks  : 95\nLowest marks   : 60"
      },

      // ── 9. Common errors ──────────────────────────────────────────
      {
        heading: "Common Array Mistakes — Avoid These",
        content: "These are the most frequent array errors Java beginners make.",
        list: [
          "❌ Mistake 1: ArrayIndexOutOfBoundsException\n  int[] arr = {1,2,3}; arr[3] — index 3 doesn't exist! Valid: 0,1,2\n  ✅ Fix: Always use index from 0 to arr.length-1",
          "❌ Mistake 2: Off-by-one in for loop\n  for(int i=0; i<=arr.length; i++) — crashes on last iteration\n  ✅ Fix: for(int i=0; i<arr.length; i++) — use < not <=",
          "❌ Mistake 3: Trying to change size after creation\n  int[] arr = new int[5]; arr = new int[10]; — creates new array, old data lost\n  ✅ Fix: If size is unknown, use ArrayList instead",
          "❌ Mistake 4: Printing array directly\n  System.out.println(arr) → prints [I@6d06d69c (memory address!)\n  ✅ Fix: System.out.println(Arrays.toString(arr)) → [1, 2, 3, 4]",
          "❌ Mistake 5: Comparing arrays with ==\n  arr1 == arr2 → compares memory address, not content\n  ✅ Fix: Arrays.equals(arr1, arr2) → compares actual values"
        ]
      }
    ],

    quiz: [
      { q: "Index of the FIRST element in a Java array:", options: ["1", "-1", "0", "None"], correct: 2 },
      { q: "Accessing an invalid array index throws:", options: ["NullPointerException", "ArrayException", "ArrayIndexOutOfBoundsException", "Compile error"], correct: 2 },
      { q: "Array length is accessed via:", options: ["arr.size()", "arr.length()", "arr.length", "Arrays.size(arr)"], correct: 2 },
      { q: "Java arrays have _____ size after creation.", options: ["Dynamic", "Fixed", "Infinite", "Variable"], correct: 1 },
      { q: "Correct way to print an array's contents:", options: ["System.out.println(arr)", "print(arr)", "Arrays.toString(arr)", "arr.print()"], correct: 2 },
      { q: "To access the LAST element of array arr safely:", options: ["arr[arr.length]", "arr[arr.length-1]", "arr.last()", "arr[-1]"], correct: 1 }
    ],

    code: `import java.util.Arrays;
public class ArraysDemo {
    public static void main(String[] args) {

        int[] nums = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("Original : " + Arrays.toString(nums));

        Arrays.sort(nums);
        System.out.println("Sorted   : " + Arrays.toString(nums));
        System.out.println("Min      : " + nums[0]);
        System.out.println("Max      : " + nums[nums.length - 1]);
        System.out.println("Sum      : " + Arrays.stream(nums).sum());

        // Reverse print
        System.out.print("Reversed : ");
        for (int i = nums.length - 1; i >= 0; i--)
            System.out.print(nums[i] + " ");
        System.out.println();

        // 2D array
        int[][] grid = {{1,2,3},{4,5,6},{7,8,9}};
        for (int[] row : grid) {
            for (int v : row) System.out.printf("%3d", v);
            System.out.println();
        }
    }
}`,
    output: "Original : [64, 34, 25, 12, 22, 11, 90]\nSorted   : [11, 12, 22, 25, 34, 64, 90]\nMin      : 11\nMax      : 90\nSum      : 258\nReversed : 90 64 34 25 22 12 11 \n  1  2  3\n  4  5  6\n  7  8  9"
  },

  "strings": {
    title: "Strings in Java — Complete Guide", module: "basics", duration: "40 min", difficulty: "Beginner", xp: 125, icon: "📝",
    intro: "A String in Java is a sequence of characters used to store and work with text. String is NOT a primitive type — it is a full class (java.lang.String), which means it comes with powerful built-in methods. Strings are IMMUTABLE — once created, their content cannot be changed. Any operation that seems to 'change' a String actually creates a brand new one. Java stores String literals in a special memory area called the String Pool to save memory.",

    sections: [

      // ── 1. What is a String & Why Important ──────────────────────
      {
        heading: "What is a String and Why is it Important?",
        content: "Almost every real-world Java application uses Strings — usernames, passwords, messages, emails, file names, search queries, chat text. Without Strings, building any useful application is nearly impossible.",
        list: [
          "📱 Social apps: usernames, messages, posts, comments",
          "🔐 Login systems: email, password, session tokens",
          "📧 Email apps: subject, body, recipient addresses",
          "📁 File systems: file names, folder paths, extensions",
          "🔍 Search engines: search queries, results, URLs",
          "💬 Chat apps: every message sent is a String"
        ],
        note: "String is in java.lang package — automatically imported in every Java program. You never need to write 'import java.lang.String'."
      },

      // ── 2. Creating Strings — two ways ───────────────────────────
      {
        heading: "Creating Strings — Two Ways",
        content: "Method 1 (most common): String literal — Java checks the String Pool first and reuses existing objects. Method 2: new keyword — always creates a brand new object in heap memory, even if the same value already exists in the pool.",
        code: `public class CreatingStrings {
    public static void main(String[] args) {

        // METHOD 1: String literal (most common, recommended)
        String name1 = "Rohan";
        String city  = "Mumbai";
        String email = "rohan@example.com";

        System.out.println(name1);    // Rohan
        System.out.println(city);     // Mumbai
        System.out.println(email);    // rohan@example.com

        // METHOD 2: new keyword (creates new heap object)
        String name2 = new String("Rohan");
        String name3 = new String("Rohan");

        // String Pool: literal shares same object
        String s1 = "Java";
        String s2 = "Java";
        System.out.println("Literals ==   : " + (s1 == s2));      // true  (same pool object)

        // new keyword: always creates separate objects
        System.out.println("new keyword ==: " + (name2 == name3)); // false (different objects)

        // ALWAYS use .equals() to compare content
        System.out.println("Content equal : " + name2.equals(name3)); // true ✓

        // Empty String vs null
        String empty = "";       // exists, has 0 characters
        String nullStr = null;   // does NOT exist — no object at all
        System.out.println("Empty length  : " + empty.length());   // 0
        // System.out.println(nullStr.length()); // NullPointerException!
    }
}`,
        output: "Rohan\nMumbai\nrohan@example.com\nLiterals ==   : true\nnew keyword ==: false\nContent equal : true\nEmpty length  : 0"
      },

      // ── 3. String immutability ────────────────────────────────────
      {
        heading: "Strings are Immutable — This is Critical",
        content: "Immutable means: once a String object is created, its CHARACTER content CANNOT change. Every method that seems to modify a String (toUpperCase, replace, concat, trim) actually creates and returns a BRAND NEW String, leaving the original untouched. You MUST reassign to keep the result.",
        code: `public class StringImmutability {
    public static void main(String[] args) {

        String name = "java";

        // These create NEW strings — original 'name' unchanged!
        name.toUpperCase();              // new String created, result IGNORED
        name.concat(" programming");     // new String created, result IGNORED
        name.replace('j', 'J');          // new String created, result IGNORED

        System.out.println("After operations: " + name); // still "java" !!

        // ✅ CORRECT: reassign to capture the result
        name = name.toUpperCase();
        System.out.println("After reassign  : " + name); // JAVA

        String text = "  Hello Java  ";
        String trimmed  = text.trim();                   // reassign or use directly
        String replaced = text.trim().replace("Java", "World");
        System.out.println("Trimmed  : " + trimmed);    // Hello Java
        System.out.println("Replaced : " + replaced);  // Hello World

        // Why immutable? — Key reasons
        // 1. Security: passwords, class names cannot be modified after creation
        // 2. Thread safety: multiple threads can read safely
        // 3. String Pool optimization: same value can be shared
        // 4. Hashcode caching: used as HashMap keys efficiently
    }
}`,
        output: "After operations: java\nAfter reassign  : JAVA\nTrimmed  : Hello Java\nReplaced : Hello World",
        note: "⚠️ The most common String beginner mistake: writing name.toUpperCase() and expecting name to change. It does NOT change. You must write name = name.toUpperCase();"
      },

      // ── 4. Most important String methods ─────────────────────────
      {
        heading: "Essential String Methods — The Most Used Ones",
        content: "The String class has 60+ methods. These are the ones you will use in 95% of real programs and interviews. Learn each one with its output.",
        table: {
          headers: ["Method", "What it does", "Example", "Output"],
          rows: [
            ["length()",           "Total number of characters",       "\"Java\".length()",              "4"],
            ["charAt(i)",          "Character at index i",             "\"Java\".charAt(1)",             "'a'"],
            ["toUpperCase()",      "All uppercase",                    "\"java\".toUpperCase()",          "\"JAVA\""],
            ["toLowerCase()",      "All lowercase",                    "\"JAVA\".toLowerCase()",          "\"java\""],
            ["trim()",             "Remove leading/trailing spaces",   "\"  hi  \".trim()",              "\"hi\""],
            ["equals(s)",          "Compare content (case sensitive)", "\"Java\".equals(\"java\")",       "false"],
            ["equalsIgnoreCase(s)","Compare content (ignore case)",   "\"Java\".equalsIgnoreCase(\"java\")","true"],
            ["contains(s)",        "Check if substring exists",        "\"Hello Java\".contains(\"Java\")","true"],
            ["startsWith(s)",      "Starts with given prefix",         "\"Java.pdf\".startsWith(\"Java\")","true"],
            ["endsWith(s)",        "Ends with given suffix",           "\"Java.pdf\".endsWith(\".pdf\")",  "true"],
            ["indexOf(s)",         "Index of first occurrence",        "\"Hello\".indexOf('l')",           "2"],
            ["substring(i)",       "Extract from index i to end",      "\"Programming\".substring(3)",    "\"gramming\""],
            ["substring(i,j)",     "Extract from i to j-1",            "\"Programming\".substring(0,4)",  "\"Prog\""],
            ["replace(a,b)",       "Replace all a with b",             "\"Java\".replace('J','K')",       "\"Kava\""],
            ["split(sep)",         "Split into array on separator",    "\"a,b,c\".split(\",\")",          "[a,b,c]"]
          ]
        }
      },

      // ── 5. String methods code ────────────────────────────────────
      {
        heading: "String Methods — Complete Code Example",
        content: "See every important String method in action with real examples and outputs.",
        code: `public class StringMethods {
    public static void main(String[] args) {

        String text = "  Hello, Java World!  ";
        String s    = text.trim();   // remove spaces first

        // Length and character access
        System.out.println("Length       : " + s.length());        // 19
        System.out.println("charAt(0)    : " + s.charAt(0));       // H
        System.out.println("charAt(7)    : " + s.charAt(7));       // J

        // Case conversion
        System.out.println("Uppercase    : " + s.toUpperCase());
        System.out.println("Lowercase    : " + s.toLowerCase());

        // Search methods
        System.out.println("indexOf Java : " + s.indexOf("Java")); // 7
        System.out.println("contains Wor : " + s.contains("World")); // true
        System.out.println("startsWith He: " + s.startsWith("Hello")); // true
        System.out.println("endsWith !   : " + s.endsWith("!"));    // true

        // Extract part of string
        System.out.println("substring(7) : " + s.substring(7));    // Java World!
        System.out.println("sub(7,11)    : " + s.substring(7,11)); // Java

        // Replace
        System.out.println("replace      : " + s.replace("Java", "Python"));

        // Split and join
        String csv    = "Apple,Mango,Banana,Grapes";
        String[] arr  = csv.split(",");
        System.out.println("Split count  : " + arr.length);        // 4
        System.out.println("First fruit  : " + arr[0]);            // Apple
        System.out.println("Joined       : " + String.join(" | ", arr));

        // Compare
        String s1 = "java", s2 = "JAVA";
        System.out.println("equals       : " + s1.equals(s2));              // false
        System.out.println("equalsIgn    : " + s1.equalsIgnoreCase(s2));    // true
    }
}`,
        output: "Length       : 19\ncharAt(0)    : H\ncharAt(7)    : J\nUppercase    : HELLO, JAVA WORLD!\nLowercase    : hello, java world!\nindexOf Java : 7\ncontains Wor : true\nstartsWith He: true\nendsWith !   : true\nsubstring(7) : Java World!\nsub(7,11)    : Java\nreplace      : Hello, Python World!\nSplit count  : 4\nFirst fruit  : Apple\nJoined       : Apple | Mango | Banana | Grapes\nequals       : false\nequalsIgn    : true"
      },

      // ── 6. String concatenation ───────────────────────────────────
      {
        heading: "String Concatenation — Joining Strings",
        content: "Concatenation means joining two or more strings together. Java provides two ways: the + operator (simple) and the concat() method. For joining many strings in a loop, always prefer StringBuilder.",
        code: `public class StringConcatenation {
    public static void main(String[] args) {

        // Method 1: + operator (most common)
        String first = "Java";
        String second = "Programming";
        String result = first + " " + second;
        System.out.println(result);   // Java Programming

        // + with numbers — number converts to String automatically
        String name = "Score: ";
        int score = 95;
        System.out.println(name + score);         // Score: 95
        System.out.println("Sum: " + (10 + 20));  // Sum: 30
        System.out.println("Sum: " + 10 + 20);    // Sum: 1020 (concatenated!)

        // Method 2: concat() method
        String a = "Hello ";
        String b = "World";
        System.out.println(a.concat(b));           // Hello World

        // Building a sentence
        String greeting = "Dear " + "Rohan" + ", welcome to " + "JavaQue" + "!";
        System.out.println(greeting);

        // Concatenation in real scenario
        String firstName = "Priya";
        String lastName  = "Sharma";
        int    age       = 25;
        String city      = "Mumbai";
        String profile   = firstName + " " + lastName + " | Age: " + age + " | City: " + city;
        System.out.println(profile);
    }
}`,
        output: "Java Programming\nScore: 95\nSum: 30\nSum: 1020\nHello World\nDear Rohan, welcome to JavaQue!\nPriya Sharma | Age: 25 | City: Mumbai",
        note: "⚠️ Watch the difference: (10+20)+\"\" = \"30\" but \"Sum: \"+10+20 = \"Sum: 1020\". When + encounters a String, ALL subsequent + becomes string concatenation. Use parentheses to force arithmetic first."
      },

      // ── 7. Escape characters ──────────────────────────────────────
      {
        heading: "Escape Characters in Strings",
        content: "Some characters cannot be typed directly inside a String (like a quote inside a quoted string). Escape characters start with a backslash \\ and tell Java to treat the next character specially.",
        table: {
          headers: ["Escape Char", "Name",          "What it produces"],
          rows: [
            ["\\n",  "Newline",           "Moves to next line"],
            ["\\t",  "Tab",               "Horizontal tab space"],
            ["\\\"", "Double quote",      "Literal \" inside a String"],
            ["\\'",  "Single quote",      "Literal ' inside a char"],
            ["\\\\", "Backslash",         "Literal \\ character"],
            ["\\r",  "Carriage return",   "Move cursor to line start"]
          ]
        },
        code: `public class EscapeChars {
    public static void main(String[] args) {

        // \\n — new line
        System.out.println("Hello\\nJava\\nWorld");

        // \\t — tab
        System.out.println("Name:\\tRohan");
        System.out.println("Age:\\t25");

        // \\" — double quote inside String
        System.out.println("He said, \\"Java is awesome!\\"");

        // \\\\ — backslash (file path example)
        System.out.println("Path: C:\\\\Users\\\\Rohan\\\\Documents");

        // Combining escape characters
        System.out.println("Item\\tPrice\\tQty");
        System.out.println("Laptop\\t₹80000\\t2");
        System.out.println("Mouse\\t₹1500\\t3");
    }
}`,
        output: "Hello\nJava\nWorld\nName:\tRohan\nAge:\t25\nHe said, \"Java is awesome!\"\nPath: C:\\Users\\Rohan\\Documents\nItem\tPrice\tQty\nLaptop\t₹80000\t2\nMouse\t₹1500\t3"
      },

      // ── 8. StringBuilder ──────────────────────────────────────────
      {
        heading: "StringBuilder — Fast Mutable String Building",
        content: "Since String is immutable, using + in a loop creates thousands of String objects — very slow and wasteful. StringBuilder uses a single MUTABLE internal buffer and modifies it in place. Always use StringBuilder when building strings in loops or with many modifications.",
        code: `public class StringBuilderDemo {
    public static void main(String[] args) {

        // ❌ BAD: creates 1000 String objects in memory!
        // String result = "";
        // for(int i = 0; i < 1000; i++) result += i; // very slow

        // ✅ GOOD: single buffer, very fast
        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= 5; i++) {
            sb.append("Item").append(i);
            if (i < 5) sb.append(", ");
        }
        System.out.println(sb.toString()); // Item1, Item2, Item3, Item4, Item5

        // StringBuilder methods
        StringBuilder b = new StringBuilder("Hello");
        System.out.println("Initial  : " + b);

        b.append(" Java");              // add to end
        System.out.println("append   : " + b);   // Hello Java

        b.insert(5, ",");               // insert at index 5
        System.out.println("insert   : " + b);   // Hello, Java

        b.replace(7, 11, "World");      // replace index 7 to 10
        System.out.println("replace  : " + b);   // Hello, World

        b.delete(5, 6);                 // delete index 5
        System.out.println("delete   : " + b);   // Hello World

        b.reverse();                    // reverse all characters
        System.out.println("reverse  : " + b);   // dlroW olleH

        System.out.println("length   : " + b.length());
        System.out.println("charAt(0): " + b.charAt(0));

        // Palindrome check using StringBuilder
        String test = "racecar";
        String reversed = new StringBuilder(test).reverse().toString();
        System.out.println(test + " is palindrome: " + test.equals(reversed));
    }
}`,
        output: "Item1, Item2, Item3, Item4, Item5\nInitial  : Hello\nappend   : Hello Java\ninsert   : Hello, Java\nreplace  : Hello, World\ndelete   : Hello World\nreverse  : dlroW olleH\nlength   : 11\ncharAt(0): d\nracecar is palindrome: true"
      },

      // ── 9. String vs StringBuilder vs StringBuffer ────────────────
      {
        heading: "String vs StringBuilder vs StringBuffer",
        content: "Java has three String-related classes. Choosing the right one matters for performance and thread safety.",
        table: {
          headers: ["Feature",       "String",             "StringBuilder",       "StringBuffer"],
          rows: [
            ["Mutable",         "❌ No",              "✅ Yes",              "✅ Yes"],
            ["Thread Safe",     "✅ Yes",             "❌ No",               "✅ Yes"],
            ["Speed",           "Slow (in loops)",   "Fast",                "Medium"],
            ["Memory",          "More (many objects)","Less (one buffer)",  "Less"],
            ["When to use",     "Simple text, keys", "Single-thread loops", "Multi-thread"]
          ]
        },
        note: "Rule of thumb: Use String for simple values. Use StringBuilder for building strings in methods and loops. Use StringBuffer only when multiple threads share the same string builder."
      },

      // ── 10. String formatting ─────────────────────────────────────
      {
        heading: "String Formatting with format() and printf()",
        content: "String.format() creates a formatted String. System.out.printf() prints a formatted String. Both use the same format specifiers. Essential for creating clean output, reports, and tables.",
        code: `public class StringFormatting {
    public static void main(String[] args) {

        // String.format() — returns a String
        String name = "Rohan";
        int    age  = 25;
        double gpa  = 8.75;

        String profile = String.format("Name: %-10s | Age: %3d | GPA: %.2f", name, age, gpa);
        System.out.println(profile);

        // printf() — prints directly
        System.out.printf("%-12s %6s %8s%n", "Student", "Score", "Grade");
        System.out.println("-".repeat(28));
        System.out.printf("%-12s %6.1f %8s%n", "Alice",   95.5, "A");
        System.out.printf("%-12s %6.1f %8s%n", "Bob",     87.3, "B");
        System.out.printf("%-12s %6.1f %8s%n", "Charlie", 72.8, "C");

        // Useful format specifiers
        System.out.printf("Integer  : %d%n",     12345);
        System.out.printf("Float    : %.2f%n",   3.14159);
        System.out.printf("String   : %-10s|%n", "Java");  // left align in 10 chars
        System.out.printf("Padded   : %10s|%n",  "Java");  // right align in 10 chars
        System.out.printf("Percent  : %.1f%%%n",  88.75);
        System.out.printf("Hex      : %X%n",     255);
    }
}`,
        output: "Name: Rohan       | Age:  25 | GPA: 8.75\nStudent        Score    Grade\n----------------------------\nAlice           95.5        A\nBob             87.3        B\nCharlie         72.8        C\nInteger  : 12345\nFloat    : 3.14\nString   : Java      |\nPadded   :       Java|\nPercent  : 88.8%\nHex      : FF"
      },

      // ── 11. Common beginner mistakes ──────────────────────────────
      {
        heading: "Common String Mistakes — Avoid These",
        content: "These are the most common String mistakes Java beginners make. Every experienced Java developer has made all of these at some point.",
        list: [
          "❌ Mistake 1: Using == to compare Strings\n  if (name == \"Rohan\") → may return false even when content matches\n  ✅ Fix: if (name.equals(\"Rohan\")) — always use .equals()",
          "❌ Mistake 2: Forgetting to reassign after String operation\n  name.toUpperCase(); → does nothing to name\n  ✅ Fix: name = name.toUpperCase();",
          "❌ Mistake 3: Calling methods on null String\n  String s = null; s.length(); → NullPointerException crash!\n  ✅ Fix: if (s != null) { s.length(); } — always null-check first",
          "❌ Mistake 4: Using + in loops for large strings\n  String result = \"\"; for(int i=0;i<1000;i++) result += i; → very slow\n  ✅ Fix: Use StringBuilder in loops",
          "❌ Mistake 5: Confusing next() and nextLine() with Scanner\n  sc.nextInt(); sc.nextLine(); → nextLine() gets empty string (leftover newline)\n  ✅ Fix: Add an extra sc.nextLine(); after nextInt() to consume the newline"
        ]
      },

      // ── 12. Real-world example ────────────────────────────────────
      {
        heading: "Real-World Example — Username Validator",
        content: "This combines multiple String methods in a real application scenario — validating and processing a user registration form.",
        code: `public class UsernameValidator {
    static boolean isValidUsername(String username) {
        if (username == null || username.isEmpty()) return false;
        String u = username.trim();
        return u.length() >= 3 &&
               u.length() <= 20 &&
               !u.contains(" ") &&
               u.equals(u.toLowerCase());  // must be lowercase
    }

    static String processEmail(String email) {
        if (email == null) return "Invalid";
        email = email.trim().toLowerCase();
        if (!email.contains("@") || !email.contains(".")) return "Invalid";
        String[] parts = email.split("@");
        return parts[0].toUpperCase() + "@" + parts[1];
    }

    public static void main(String[] args) {

        // Validate usernames
        String[] usernames = {"rohan", "Rohan", "ro", "rohan sharma", "rohanverylongname2024"};
        System.out.println("=== Username Validation ===");
        for (String u : usernames) {
            System.out.printf("%-25s : %s%n", u, isValidUsername(u) ? "✅ Valid" : "❌ Invalid");
        }

        // Process emails
        System.out.println("\\n=== Email Processing ===");
        String[] emails = {"  Rohan@Gmail.COM  ", "priya@yahoo.com", "notanemail", null};
        for (String e : emails) {
            System.out.printf("%-22s → %s%n", e == null ? "null" : e.trim(), processEmail(e));
        }

        // String operations on user data
        String fullName = "  Priya Sharma  ";
        System.out.println("\\n=== Name Processing ===");
        System.out.println("Original   : '" + fullName + "'");
        System.out.println("Trimmed    : '" + fullName.trim() + "'");
        System.out.println("First name : " + fullName.trim().split(" ")[0]);
        System.out.println("Last name  : " + fullName.trim().split(" ")[1]);
        System.out.println("Initials   : " + fullName.trim().charAt(0) + "." + fullName.trim().split(" ")[1].charAt(0) + ".");
    }
}`,
        output: "=== Username Validation ===\nrohan                     : ✅ Valid\nRohan                     : ❌ Invalid\nro                        : ❌ Invalid\nrohan sharma              : ❌ Invalid\nrohanverylongname2024     : ❌ Invalid\n\n=== Email Processing ===\nRohan@Gmail.COM        → ROHAN@gmail.com\npriya@yahoo.com        → PRIYA@yahoo.com\nnotanemail             → Invalid\nnull                   → Invalid\n\n=== Name Processing ===\nOriginal   : '  Priya Sharma  '\nTrimmed    : 'Priya Sharma'\nFirst name : Priya\nLast name  : Sharma\nInitials   : P.S."
      }
    ],

    quiz: [
      { q: "Are Strings mutable in Java?", options: ["Yes", "No — they are immutable", "Depends on JVM", "Only in Java 8+"], correct: 1 },
      { q: "Correct way to compare String content:", options: ["==", "===", ".equals()", "!="], correct: 2 },
      { q: "What does name.toUpperCase() do to 'name' if not reassigned?", options: ["Changes name to uppercase", "Nothing — creates new String", "Throws exception", "Modifies in place"], correct: 1 },
      { q: "Best class for building strings in a loop:", options: ["String", "StringBuffer", "StringBuilder", "StringUtil"], correct: 2 },
      { q: "String.split(',') returns:", options: ["ArrayList<String>", "String[]", "List<String>", "char[]"], correct: 1 },
      { q: "What is the String Pool?", options: ["A collection class", "Memory area that caches string literals to save memory", "A string database", "StringBuilder buffer"], correct: 1 }
    ],

    code: `public class StringsComplete {
    public static void main(String[] args) {

        String sentence = "The quick brown fox jumps over the lazy dog";

        System.out.println("Original  : " + sentence);
        System.out.println("Length    : " + sentence.length());
        System.out.println("Upper     : " + sentence.toUpperCase());
        System.out.println("Words     : " + sentence.split("\\\\s+").length);
        System.out.println("Has 'fox' : " + sentence.contains("fox"));
        System.out.println("First char: " + sentence.charAt(0));
        System.out.println("Sub(4,9)  : " + sentence.substring(4, 9));
        System.out.println("Replace   : " + sentence.replace("fox", "cat"));

        // Count vowels
        long vowels = sentence.toLowerCase().chars()
                               .filter(c -> "aeiou".indexOf(c) >= 0).count();
        System.out.println("Vowels    : " + vowels);

        // StringBuilder
        StringBuilder sb = new StringBuilder();
        for (String w : sentence.split("\\\\s+")) sb.append(w.charAt(0));
        System.out.println("Initials  : " + sb.toString());
    }
}`,
    output: "Original  : The quick brown fox jumps over the lazy dog\nLength    : 43\nUpper     : THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG\nWords     : 9\nHas 'fox' : true\nFirst char: T\nSub(4,9)  : quick\nReplace   : The quick brown cat jumps over the lazy dog\nVowels    : 11\nInitials  : Tqbfjotld"
  },

  "methods": {
    title: "Methods in Java — Complete Guide", module: "basics", duration: "40 min", difficulty: "Beginner", xp: 120, icon: "🔧",
    intro: "A method is a named block of code that performs a specific task. Think of it like a remote control button — each button does one specific job, you press it whenever needed, and it works the same way every time. Without methods, code becomes huge, duplicated, and impossible to maintain. Methods give you: code reusability (write once, call many times), readability (named blocks are self-documenting), modularity (break big problems into small pieces), and easy debugging (isolate and fix one method at a time).",

    sections: [

      // ── 1. What & Why ─────────────────────────────────────────────
      {
        heading: "What is a Method and Why Do We Need It?",
        content: "Without methods, every task needs its own copy of code. With methods, you write it once and call it anywhere.",
        list: [
          "🔴 Without methods: calculate salary for 100 employees = copy the same 10 lines 100 times",
          "🟢 With methods: write calculateSalary() once, call it 100 times",
          "📦 Reusability — write the logic once, use it anywhere in the program",
          "📖 Readability — method names describe what they do: isEven(), calculateTax(), sendEmail()",
          "🧩 Modularity — break a big program into small focused pieces",
          "🔧 Maintainability — fix a bug in one method and it is fixed everywhere it is called",
          "🧪 Testability — test each method independently"
        ]
      },

      // ── 2. Method syntax ──────────────────────────────────────────
      {
        heading: "Method Syntax — Every Part Explained",
        content: "A Java method has 5 parts. Understanding each part is essential before writing your first method.",
        table: {
          headers: ["Part",         "Example",             "Purpose"],
          rows: [
            ["Access modifier",   "public, static",      "Who can call this method"],
            ["Return type",       "int, void, String",   "What type of value this method sends back"],
            ["Method name",       "calculateSalary",     "The name you use to call this method"],
            ["Parameters",        "(int a, int b)",      "Input values the method needs to do its job"],
            ["Method body",       "{ ... }",             "The actual code that runs when called"]
          ]
        },
        code: `public class MethodSyntax {

    // void — returns nothing | no parameters
    static void greet() {
        System.out.println("Hello! Welcome to JavaQue.");
    }

    // void — returns nothing | one parameter
    static void greetUser(String name) {
        System.out.println("Hello, " + name + "! Ready to learn Java?");
    }

    // int — returns int | two parameters
    static int add(int a, int b) {
        return a + b;   // 'return' sends value back to caller
    }

    // boolean — returns true/false | one parameter
    static boolean isEven(int number) {
        return number % 2 == 0;
    }

    // String — returns String | one parameter
    static String getGrade(int marks) {
        if      (marks >= 90) return "A";
        else if (marks >= 75) return "B";
        else if (marks >= 60) return "C";
        else if (marks >= 35) return "D";
        else                  return "F";
    }

    public static void main(String[] args) {
        greet();                              // call void method
        greetUser("Rohan");                   // call with argument

        int sum = add(15, 25);               // store return value
        System.out.println("Sum   : " + sum);

        boolean result = isEven(42);
        System.out.println("42 even: " + result);
        System.out.println("17 even: " + isEven(17));

        System.out.println("Grade : " + getGrade(82));
    }
}`,
        output: "Hello! Welcome to JavaQue.\nHello, Rohan! Ready to learn Java?\nSum   : 40\n42 even: true\n17 even: false\nGrade : B"
      },

      // ── 3. Predefined vs user defined ────────────────────────────
      {
        heading: "Predefined Methods vs User-Defined Methods",
        content: "Java provides thousands of ready-made methods in its standard library. You also create your own methods. Both are called the same way.",
        list: [
          "📦 Predefined (built-in) methods — provided by Java's standard library:",
          "  Math.sqrt(25) → 5.0 — square root",
          "  Math.abs(-10) → 10 — absolute value",
          "  \"hello\".length() → 5 — String method",
          "  System.out.println() — print to console",
          "  Arrays.sort(arr) — sort an array",
          "  Collections.max(list) — max in a list",
          "✅ User-defined methods — created by YOU for your specific needs:",
          "  calculateSalary(basic, da, hra) — your business logic",
          "  isValidEmail(email) — your validation rule",
          "  formatDate(day, month, year) — your formatting"
        ]
      },

      // ── 4. Parameters and return values ──────────────────────────
      {
        heading: "Parameters and Return Values — In-Depth",
        content: "Parameters are inputs a method receives. Return value is the output a method sends back. A method can have 0, 1, or many parameters. It can return exactly 0 (void) or 1 value.",
        code: `public class ParametersAndReturn {

    // No parameters, no return
    static void printDivider() {
        System.out.println("=".repeat(30));
    }

    // One parameter, no return
    static void printDouble(int n) {
        System.out.println(n + " × 2 = " + (n * 2));
    }

    // Two parameters, returns double
    static double calculateArea(double length, double width) {
        return length * width;
    }

    // Three parameters, returns String
    static String createProfile(String name, int age, String city) {
        return name + " | Age: " + age + " | City: " + city;
    }

    // Returns boolean
    static boolean isLeapYear(int year) {
        return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
    }

    // Multiple return points
    static String classify(int number) {
        if (number > 0)  return "Positive";
        if (number < 0)  return "Negative";
        return "Zero";  // only reached when number == 0
    }

    public static void main(String[] args) {
        printDivider();
        printDouble(7);
        printDouble(15);
        printDivider();

        double area = calculateArea(12.5, 8.0);
        System.out.printf("Area: %.2f sq m%n", area);

        System.out.println(createProfile("Priya", 25, "Delhi"));

        System.out.println("2000 leap: " + isLeapYear(2000)); // true
        System.out.println("1900 leap: " + isLeapYear(1900)); // false
        System.out.println("2024 leap: " + isLeapYear(2024)); // true

        System.out.println(classify(42));    // Positive
        System.out.println(classify(-5));    // Negative
        System.out.println(classify(0));     // Zero
    }
}`,
        output: "==============================\n7 × 2 = 14\n15 × 2 = 30\n==============================\nArea: 100.00 sq m\nPriya | Age: 25 | City: Delhi\n2000 leap: true\n1900 leap: false\n2024 leap: true\nPositive\nNegative\nZero"
      },

      // ── 5. Static vs instance methods ────────────────────────────
      {
        heading: "Static Methods vs Instance Methods",
        content: "Static methods belong to the CLASS — called without creating an object. Instance methods belong to an OBJECT — require object creation first.",
        code: `class Calculator {

    // STATIC method — belongs to class, call without object
    static int add(int a, int b) {
        return a + b;
    }
    static double square(double n) {
        return n * n;
    }

    // INSTANCE method — belongs to object, requires object creation
    private String brand;
    Calculator(String brand) { this.brand = brand; }

    void showBrand() {
        System.out.println("Brand: " + brand);
    }
    double calculateTax(double amount, double rate) {
        return amount * rate / 100;
    }
}

public class StaticVsInstance {
    public static void main(String[] args) {

        // Static method — call via class name, no object needed
        System.out.println("Add     : " + Calculator.add(10, 20));   // 30
        System.out.println("Square  : " + Calculator.square(7));     // 49.0

        // Instance method — must create object first
        Calculator myCalc = new Calculator("CasioVerse");
        myCalc.showBrand();
        double tax = myCalc.calculateTax(50000, 18);
        System.out.printf("Tax(18%%): ₹%.2f%n", tax);    // ₹9000.00
    }
}`,
        output: "Add     : 30\nSquare  : 49.0\nBrand: CasioVerse\nTax(18%): ₹9000.00",
        note: "📌 The main() method is static because JVM calls it without creating any object. All helper methods you call from main() must also be static (or you must create an object first)."
      },

      // ── 6. Method overloading ─────────────────────────────────────
      {
        heading: "Method Overloading — Same Name, Different Parameters",
        content: "Method overloading lets you define multiple methods with the same name as long as the parameter list is different (different number, different types, or different order). The compiler automatically picks the right version. This is also called compile-time polymorphism.",
        code: `public class MethodOverloading {

    // All named 'area' — different parameters
    static double area(double radius) {
        return Math.PI * radius * radius;    // circle
    }
    static double area(double length, double width) {
        return length * width;               // rectangle
    }
    static double area(double base, double height, boolean isTriangle) {
        return 0.5 * base * height;          // triangle
    }

    // All named 'print' — different types
    static void print(int value)    { System.out.println("int: "    + value); }
    static void print(double value) { System.out.println("double: " + value); }
    static void print(String value) { System.out.println("String: " + value); }
    static void print(boolean value){ System.out.println("bool: "   + value); }

    // All named 'add'
    static int    add(int a, int b)          { return a + b; }
    static double add(double a, double b)    { return a + b; }
    static int    add(int a, int b, int c)   { return a + b + c; }
    static String add(String a, String b)    { return a + b; }

    public static void main(String[] args) {
        System.out.println("Circle area    : " + String.format("%.2f", area(7)));
        System.out.println("Rectangle area : " + area(5, 8));
        System.out.println("Triangle area  : " + area(6, 4, true));

        print(42); print(3.14); print("Java"); print(true);

        System.out.println(add(5, 3));          // int: 8
        System.out.println(add(2.5, 3.5));      // double: 6.0
        System.out.println(add(1, 2, 3));        // 6
        System.out.println(add("Hello", "!"));  // Hello!
    }
}`,
        output: "Circle area    : 153.94\nRectangle area : 40.0\nTriangle area  : 12.0\nint: 42\ndouble: 3.14\nString: Java\nbool: true\n8\n6.0\n6\nHello!"
      },

      // ── 7. Pass by value ──────────────────────────────────────────
      {
        heading: "Pass by Value — Java Always Copies",
        content: "Java ALWAYS passes a COPY of the value to a method. Changing a primitive parameter inside a method does NOT change the original variable. For objects, the reference is copied — so the object itself CAN be modified, but the reference cannot be redirected.",
        code: `public class PassByValue {

    // Changing primitive inside method — original NOT affected
    static void tryToChange(int x) {
        x = 999;
        System.out.println("Inside method: x = " + x); // 999
    }

    // Modifying an array (object) inside method — DOES affect original
    static void doubleAll(int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            arr[i] *= 2;
        }
    }

    // Swap attempt — does NOT work for primitives
    static void swap(int a, int b) {
        int temp = a; a = b; b = temp;
        System.out.println("Inside swap: a=" + a + " b=" + b); // swapped
    }

    public static void main(String[] args) {

        // Primitive — copy is passed, original unchanged
        int num = 42;
        System.out.println("Before: num = " + num);  // 42
        tryToChange(num);
        System.out.println("After : num = " + num);  // still 42!

        System.out.println();

        // Array (object) — reference copy, array contents CAN change
        int[] marks = {10, 20, 30};
        System.out.println("Before double: " + java.util.Arrays.toString(marks));
        doubleAll(marks);
        System.out.println("After  double: " + java.util.Arrays.toString(marks)); // changed!

        System.out.println();

        // Swap — does NOT work for primitives
        int a = 5, b = 10;
        System.out.println("Before swap: a=" + a + " b=" + b);
        swap(a, b);
        System.out.println("After  swap: a=" + a + " b=" + b); // unchanged!
    }
}`,
        output: "Before: num = 42\nInside method: x = 999\nAfter : num = 42\n\nBefore double: [10, 20, 30]\nAfter  double: [20, 40, 60]\n\nBefore swap: a=5 b=10\nInside swap: a=10 b=5\nAfter  swap: a=5 b=10",
        note: "Java is ALWAYS pass-by-value. For primitives, the value itself is copied. For objects, the reference (memory address) is copied — but both the original and the copy point to the same object."
      },

      // ── 8. Recursion ──────────────────────────────────────────────
      {
        heading: "Recursive Methods — A Method Calling Itself",
        content: "Recursion is when a method calls itself. Every recursive method MUST have: 1) A BASE CASE — the stopping condition, and 2) A RECURSIVE CASE — calls itself with a simpler problem. Without a base case, you get infinite recursion → StackOverflowError.",
        code: `public class Recursion {

    // Factorial: n! = n × (n-1) × (n-2) × ... × 1
    static long factorial(int n) {
        if (n <= 1) return 1;           // BASE CASE: stop here
        return n * factorial(n - 1);   // RECURSIVE CASE
    }

    // Sum of digits: 12345 → 1+2+3+4+5 = 15
    static int digitSum(int n) {
        if (n < 10) return n;           // BASE CASE: single digit
        return n % 10 + digitSum(n / 10); // last digit + recurse on rest
    }

    // Power: base^exp
    static long power(int base, int exp) {
        if (exp == 0) return 1;         // BASE CASE: anything^0 = 1
        return base * power(base, exp - 1);
    }

    // Check palindrome
    static boolean isPalindrome(String s, int left, int right) {
        if (left >= right) return true; // BASE CASE: met in middle
        if (s.charAt(left) != s.charAt(right)) return false;
        return isPalindrome(s, left + 1, right - 1);
    }

    public static void main(String[] args) {

        System.out.println("Factorials:");
        for (int i = 0; i <= 7; i++)
            System.out.printf("  %d! = %d%n", i, factorial(i));

        System.out.println("Digit sums:");
        int[] nums = {12345, 9999, 100};
        for (int n : nums)
            System.out.printf("  digitSum(%d) = %d%n", n, digitSum(n));

        System.out.println("Powers:");
        System.out.println("  2^10 = " + power(2, 10));
        System.out.println("  3^5  = " + power(3, 5));

        System.out.println("Palindrome check:");
        String[] words = {"racecar", "hello", "madam", "java"};
        for (String w : words)
            System.out.printf("  %-8s : %s%n", w,
                isPalindrome(w, 0, w.length()-1) ? "palindrome ✓" : "not palindrome");
    }
}`,
        output: "Factorials:\n  0! = 1\n  1! = 1\n  2! = 2\n  3! = 6\n  4! = 24\n  5! = 120\n  6! = 720\n  7! = 5040\nDigit sums:\n  digitSum(12345) = 15\n  digitSum(9999) = 36\n  digitSum(100) = 1\nPowers:\n  2^10 = 1024\n  3^5  = 243\nPalindrome check:\n  racecar  : palindrome ✓\n  hello    : not palindrome\n  madam    : palindrome ✓\n  java     : not palindrome"
      },

      // ── 9. varargs ────────────────────────────────────────────────
      {
        heading: "varargs — Variable Number of Arguments",
        content: "varargs (variable arguments) lets a method accept ANY number of arguments of the same type. Use three dots (...) after the type. Inside the method, the arguments are treated as an array. The varargs parameter must be LAST in the parameter list.",
        code: `public class VarargsDemo {

    // Accept any number of ints
    static int sum(int... numbers) {
        int total = 0;
        for (int n : numbers) total += n;
        return total;
    }

    // Mix regular param with varargs (varargs must be last)
    static void printInfo(String label, int... values) {
        System.out.print(label + ": ");
        for (int v : values) System.out.print(v + " ");
        System.out.println("(count=" + values.length + ")");
    }

    static double average(double... nums) {
        double total = 0;
        for (double n : nums) total += n;
        return nums.length == 0 ? 0 : total / nums.length;
    }

    public static void main(String[] args) {
        System.out.println(sum());              // 0 — zero args
        System.out.println(sum(5));             // 5 — one arg
        System.out.println(sum(1, 2, 3));       // 6 — three args
        System.out.println(sum(10, 20, 30, 40));// 100 — four args

        printInfo("Scores", 88, 72, 95, 60);
        printInfo("Single", 100);

        System.out.printf("Average: %.2f%n", average(85, 90, 78, 92, 88)); // 86.60
    }
}`,
        output: "0\n5\n6\n100\nScores: 88 72 95 60 (count=4)\nSingle: 100 (count=1)\nAverage: 86.60"
      },

      // ── 10. Common mistakes ───────────────────────────────────────
      {
        heading: "Common Method Mistakes — Avoid These",
        content: "These mistakes are made by almost every Java beginner when starting with methods.",
        list: [
          "❌ Mistake 1: Ignoring the return value\n  int result = add(5, 3); → OK\n  add(5, 3); → OK for void, but for non-void you lose the result\n  ✅ Fix: Store or use the return value: System.out.println(add(5, 3));",
          "❌ Mistake 2: Returning wrong type\n  static int getGrade() { return \"A\"; } → COMPILE ERROR\n  ✅ Fix: Match return type: static String getGrade() { return \"A\"; }",
          "❌ Mistake 3: Missing return statement\n  static int add(int a, int b) { int sum = a+b; } → COMPILE ERROR\n  ✅ Fix: static int add(int a, int b) { return a+b; }",
          "❌ Mistake 4: Calling instance method without object\n  greetUser(\"Rohan\"); when greetUser is not static → COMPILE ERROR\n  ✅ Fix: Either make method static, or create object: new Demo().greetUser(\"Rohan\")",
          "❌ Mistake 5: Expecting primitive to change inside method\n  change(num); → num unchanged after method call\n  ✅ Fix: Return the new value: num = change(num);"
        ]
      },

      // ── 11. Real-world example ────────────────────────────────────
      {
        heading: "Real-World Example — Salary Calculator",
        content: "This puts together all method concepts: parameters, return values, static methods, and multiple method calls working together.",
        code: `public class SalaryCalculator {

    static final double HRA_RATE  = 0.40;  // 40% of basic
    static final double DA_RATE   = 0.20;  // 20% of basic
    static final double PF_RATE   = 0.12;  // 12% of basic
    static final double TAX_RATE  = 0.10;  // 10% tax

    static double calculateHRA(double basic)     { return basic * HRA_RATE; }
    static double calculateDA(double basic)      { return basic * DA_RATE; }
    static double calculateGross(double basic)   { return basic + calculateHRA(basic) + calculateDA(basic); }
    static double calculatePF(double basic)      { return basic * PF_RATE; }
    static double calculateTax(double gross)     { return gross > 50000 ? gross * TAX_RATE : 0; }
    static double calculateNetPay(double basic) {
        double gross = calculateGross(basic);
        return gross - calculatePF(basic) - calculateTax(gross);
    }

    static void printSlip(String name, double basic) {
        double hra    = calculateHRA(basic);
        double da     = calculateDA(basic);
        double gross  = calculateGross(basic);
        double pf     = calculatePF(basic);
        double tax    = calculateTax(gross);
        double net    = calculateNetPay(basic);

        System.out.println("======= Salary Slip =======");
        System.out.println("Employee   : " + name);
        System.out.printf ("Basic      : ₹%,8.2f%n", basic);
        System.out.printf ("HRA (40%%) : ₹%,8.2f%n", hra);
        System.out.printf ("DA  (20%%) : ₹%,8.2f%n", da);
        System.out.printf ("Gross      : ₹%,8.2f%n", gross);
        System.out.println("---------------------------");
        System.out.printf ("PF  (12%%) : ₹%,8.2f%n", pf);
        System.out.printf ("Tax (10%%) : ₹%,8.2f%n", tax);
        System.out.printf ("Net Pay    : ₹%,8.2f%n", net);
        System.out.println("===========================");
    }

    public static void main(String[] args) {
        printSlip("Rohan Sharma", 50000);
        System.out.println();
        printSlip("Priya Gupta", 35000);
    }
}`,
        output: "======= Salary Slip =======\nEmployee   : Rohan Sharma\nBasic      : ₹50,000.00\nHRA (40%) : ₹20,000.00\nDA  (20%) : ₹10,000.00\nGross      : ₹80,000.00\n---------------------------\nPF  (12%) : ₹6,000.00\nTax (10%) : ₹8,000.00\nNet Pay    : ₹66,000.00\n===========================\n\n======= Salary Slip =======\nEmployee   : Priya Gupta\nBasic      : ₹35,000.00\nHRA (40%) : ₹14,000.00\nDA  (20%) : ₹7,000.00\nGross      : ₹56,000.00\n---------------------------\nPF  (12%) : ₹4,200.00\nTax (10%) : ₹5,600.00\nNet Pay    : ₹46,200.00\n==========================="
      }
    ],

    quiz: [
      { q: "'void' as return type means:", options: ["Returns empty string", "Returns null", "Method returns nothing", "Method is abstract"], correct: 2 },
      { q: "Method overloading is resolved at:", options: ["Runtime", "Compile time", "Load time", "Never"], correct: 1 },
      { q: "What is required in every recursive method?", options: ["A loop", "A base case to stop recursion", "A return value", "Static keyword"], correct: 1 },
      { q: "varargs ... allows:", options: ["Array parameters only", "Fixed number of args", "Variable number of same-type arguments", "Pointer syntax"], correct: 2 },
      { q: "Java passes primitive arguments by:", options: ["Reference", "Value (copy)", "Pointer", "Address"], correct: 1 },
      { q: "Static methods can be called:", options: ["Only with objects", "Without creating an object", "Only from main", "Only from other static methods"], correct: 1 }
    ],

    code: `public class MethodsComplete {

    static boolean isPrime(int n) {
        if (n < 2) return false;
        for (int i = 2; i * i <= n; i++)
            if (n % i == 0) return false;
        return true;
    }

    static int gcd(int a, int b) {
        return b == 0 ? a : gcd(b, a % b);  // Euclid's algorithm
    }

    static int[] minMax(int... nums) {
        int min = nums[0], max = nums[0];
        for (int n : nums) { if(n < min) min=n; if(n > max) max=n; }
        return new int[]{min, max};
    }

    public static void main(String[] args) {
        System.out.print("Primes ≤30 : ");
        for (int i = 2; i <= 30; i++)
            if (isPrime(i)) System.out.print(i + " ");
        System.out.println();

        System.out.println("GCD(48,18) : " + gcd(48, 18));
        System.out.println("GCD(100,75): " + gcd(100, 75));

        int[] result = minMax(5, 2, 9, 1, 7, 3, 8);
        System.out.println("Min: " + result[0] + " | Max: " + result[1]);
    }
}`,
    output: "Primes ≤30 : 2 3 5 7 11 13 17 19 23 29 \nGCD(48,18) : 6\nGCD(100,75): 25\nMin: 1 | Max: 9"
  },

  "input-output": {
    title: "Input & Output in Java — Complete Guide", module: "basics", duration: "35 min", difficulty: "Beginner", xp: 120, icon: "⌨️",
    intro: "Input means taking data FROM the user. Output means displaying results TO the user. These are the two ways your Java program communicates with the outside world. Think of an ATM — you input your PIN (input), and the machine shows your balance (output). Java provides System.out for output and Scanner for input. Without I/O, programs would be silent and useless.",

    sections: [

      // ── 1. Output methods ─────────────────────────────────────────
      {
        heading: "Output — Three Ways to Print",
        content: "Java has three methods for console output. All belong to System.out which represents the standard output stream (the console/terminal).",
        table: {
          headers: ["Method",             "Behaviour",                    "Example",                          "Output"],
          rows: [
            ["System.out.print()",    "Prints, cursor stays same line", "print(\"A\"); print(\"B\");",       "AB"],
            ["System.out.println()",  "Prints then moves to next line", "println(\"Hello\"); println(\"Hi\")","Hello\\nHi"],
            ["System.out.printf()",   "Formatted output — like C",      "printf(\"Age: %d\", 25);",           "Age: 25"]
          ]
        },
        code: `public class OutputMethods {
    public static void main(String[] args) {

        // print() — stays on same line
        System.out.print("Hello");
        System.out.print(" ");
        System.out.print("Java");
        System.out.print("!"); // still same line
        System.out.println();  // now move to next line

        // println() — moves to next line after each call
        System.out.println("Line 1");
        System.out.println("Line 2");
        System.out.println("Line 3");
        System.out.println();   // prints empty line

        // printf() — formatted output
        System.out.printf("Name: %s%n", "Rohan");
        System.out.printf("Age : %d%n", 25);
        System.out.printf("GPA : %.2f%n", 8.75);

        // Mixing all three
        System.out.print("Roll: ");
        System.out.println(101);
        System.out.printf("Score: %d/%d%n", 88, 100);
    }
}`,
        output: "Hello Java!\nLine 1\nLine 2\nLine 3\n\nName: Rohan\nAge : 25\nGPA : 8.75\nRoll: 101\nScore: 88/100"
      },

      // ── 2. printf format specifiers ───────────────────────────────
      {
        heading: "printf() and Format Specifiers — Formatted Output",
        content: "printf() (print formatted) lets you control exactly how values appear — decimal places, alignment, padding, and more. String.format() works the same way but returns a String instead of printing.",
        table: {
          headers: ["Specifier", "Meaning",              "Example",                    "Output"],
          rows: [
            ["%d",   "Integer",              "printf(\"%d\", 42)",          "42"],
            ["%f",   "Float/Double",         "printf(\"%f\", 3.14)",        "3.140000"],
            ["%.2f", "2 decimal places",     "printf(\"%.2f\", 3.14159)",   "3.14"],
            ["%s",   "String",               "printf(\"%s\", \"Java\")",    "Java"],
            ["%c",   "Character",            "printf(\"%c\", 'A')",         "A"],
            ["%n",   "Newline",              "printf(\"a%nb\")",            "a\\nb"],
            ["%-10s","Left-align in 10 chars","printf(\"%-10s|\", \"Hi\")", "Hi        |"],
            ["%10s", "Right-align in 10 chars","printf(\"%10s|\", \"Hi\")", "        Hi|"],
            ["%05d", "Pad with zeros",       "printf(\"%05d\", 42)",        "00042"],
            ["%%",   "Literal % sign",       "printf(\"%.1f%%\", 88.5)",    "88.5%"]
          ]
        },
        code: `public class PrintfDemo {
    public static void main(String[] args) {

        // Basic format specifiers
        System.out.printf("Integer : %d%n",   12345);
        System.out.printf("Float   : %.2f%n", 3.14159);
        System.out.printf("String  : %s%n",   "JavaQue");
        System.out.printf("Char    : %c%n",   'J');

        // Alignment — very useful for tables
        System.out.println("\\n=== Student Table ===");
        System.out.printf("%-15s %6s %8s%n", "Name", "Score", "Grade");
        System.out.println("-".repeat(30));
        System.out.printf("%-15s %6.1f %8s%n", "Alice",   95.5, "A");
        System.out.printf("%-15s %6.1f %8s%n", "Bob",     87.3, "B");
        System.out.printf("%-15s %6.1f %8s%n", "Charlie", 72.8, "C");
        System.out.printf("%-15s %6.1f %8s%n", "Dave",    91.0, "A-");

        // Padding and percentage
        System.out.println();
        System.out.printf("Progress : %05d / 10000%n", 342);
        System.out.printf("Score    : %.1f%%%n", 88.75);

        // String.format() — same codes, returns String instead of printing
        String msg = String.format("Name: %-10s | Age: %3d | Score: %.2f", "Priya", 25, 92.5);
        System.out.println(msg);
    }
}`,
        output: "Integer : 12345\nFloat   : 3.14\nString  : JavaQue\nChar    : J\n\n=== Student Table ===\nName             Score    Grade\n------------------------------\nAlice             95.5        A\nBob               87.3        B\nCharlie           72.8        C\nDave              91.0       A-\n\nProgress : 00342 / 10000\nScore    : 88.8%\nName: Priya      | Age:  25 | Score: 92.50"
      },

      // ── 3. Scanner for input ──────────────────────────────────────
      {
        heading: "Scanner Class — Taking Input from User",
        content: "The Scanner class (java.util.Scanner) reads keyboard input. It wraps System.in and provides methods to read different data types. Always import java.util.Scanner before using it.",
        code: `import java.util.Scanner;

public class ScannerBasics {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        // Read integer
        System.out.print("Enter your age    : ");
        int age = sc.nextInt();

        // Read double
        System.out.print("Enter your salary : ");
        double salary = sc.nextDouble();

        // Read a single word
        System.out.print("Enter your city   : ");
        String city = sc.next();

        // Read full line (must have sc.nextLine() to consume leftover newline first)
        sc.nextLine(); // consume leftover \\n from previous nextDouble()
        System.out.print("Enter your address: ");
        String address = sc.nextLine();

        // Display collected input
        System.out.println("\\n=== Your Profile ===");
        System.out.println("Age     : " + age);
        System.out.printf ("Salary  : ₹%.2f%n", salary);
        System.out.println("City    : " + city);
        System.out.println("Address : " + address);

        sc.close(); // good practice to close Scanner
    }
}`,
        output: "Enter your age    : 25\nEnter your salary : 55000\nEnter your city   : Mumbai\nEnter your address: 12B Park Street Mumbai\n\n=== Your Profile ===\nAge     : 25\nSalary  : ₹55000.00\nCity    : Mumbai\nAddress : 12B Park Street Mumbai"
      },

      // ── 4. Scanner methods reference ─────────────────────────────
      {
        heading: "Scanner Methods — Which One to Use for Each Type",
        content: "Scanner has a specific method for each data type. Using the wrong method causes InputMismatchException at runtime.",
        table: {
          headers: ["Method",          "Reads",                    "Example Input", "Notes"],
          rows: [
            ["nextInt()",      "Integer",                  "25",           "Reads one int"],
            ["nextDouble()",   "Double",                   "3.14",         "Reads one double"],
            ["nextFloat()",    "Float",                    "5.5",          "Reads one float"],
            ["nextLong()",     "Long",                     "9999999999",   "For large integers"],
            ["nextBoolean()",  "Boolean",                  "true",         "Reads 'true' or 'false'"],
            ["next()",         "One word (stops at space)", "Hello",        "Only reads up to whitespace"],
            ["nextLine()",     "Full line including spaces","Hello World",  "Reads until Enter key"]
          ]
        },
        code: `import java.util.Scanner;

public class ScannerMethods {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        // Read different types
        System.out.print("Enter int    : "); int    i = sc.nextInt();
        System.out.print("Enter double : "); double d = sc.nextDouble();
        System.out.print("Enter boolean: "); boolean b = sc.nextBoolean();
        sc.nextLine(); // consume leftover newline IMPORTANT!
        System.out.print("Enter word   : "); String word = sc.next();
        sc.nextLine(); // consume leftover newline again
        System.out.print("Enter line   : "); String line = sc.nextLine();

        System.out.println("\\n=== Values Read ===");
        System.out.println("int     : " + i);
        System.out.println("double  : " + d);
        System.out.println("boolean : " + b);
        System.out.println("word    : " + word);
        System.out.println("line    : " + line);

        sc.close();
    }
}`,
        output: "Enter int    : 42\nEnter double : 3.14\nEnter boolean: true\nEnter word   : Java\nEnter line   : Hello World Java!\n\n=== Values Read ===\nint     : 42\ndouble  : 3.14\nboolean : true\nword    : Java\nline    : Hello World Java!"
      },

      // ── 5. The nextLine() trap ────────────────────────────────────
      {
        heading: "The nextLine() Trap — Very Common Problem",
        content: "This is one of the most confusing problems for Java beginners. When you call nextInt(), nextDouble() etc., they read the value but leave the newline character (\\n from pressing Enter) in the input buffer. The next nextLine() call reads that leftover newline and returns an empty string instead of waiting for input.",
        code: `import java.util.Scanner;

public class NextLineTrap {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        // ❌ WRONG — nextLine() gets skipped (reads leftover \\n)
        /*
        System.out.print("Enter age  : ");
        int age = sc.nextInt();
        System.out.print("Enter name : ");
        String name = sc.nextLine(); // EMPTY! reads leftover \\n
        */

        // ✅ CORRECT — add sc.nextLine() to consume leftover \\n
        System.out.print("Enter age     : ");
        int age = sc.nextInt();
        sc.nextLine(); // 🔑 consume the leftover newline character

        System.out.print("Enter name    : ");
        String name = sc.nextLine(); // now works correctly!

        System.out.print("Enter address : ");
        String address = sc.nextLine();

        System.out.println("\\n=== Input Received ===");
        System.out.println("Age     : " + age);
        System.out.println("Name    : " + name);
        System.out.println("Address : " + address);

        sc.close();
    }
}`,
        output: "Enter age     : 22\nEnter name    : Priya Sharma\nEnter address : 45 Green Park, Delhi\n\n=== Input Received ===\nAge     : 22\nName    : Priya Sharma\nAddress : 45 Green Park, Delhi",
        note: "💡 Rule: Any time you call nextInt(), nextDouble(), nextFloat(), nextLong(), or nextBoolean(), add sc.nextLine() immediately after if you plan to read a String with nextLine() next."
      },

      // ── 6. next() vs nextLine() ───────────────────────────────────
      {
        heading: "next() vs nextLine() — Important Difference",
        content: "next() reads ONE WORD and stops at any whitespace. nextLine() reads the ENTIRE LINE including spaces until Enter is pressed.",
        code: `import java.util.Scanner;

public class NextVsNextLine {
    public static void main(String[] args) {

        Scanner sc1 = new Scanner("Hello World Java");

        // next() — reads word by word
        System.out.println(sc1.next()); // Hello
        System.out.println(sc1.next()); // World
        System.out.println(sc1.next()); // Java

        Scanner sc2 = new Scanner("Hello World Java");

        // nextLine() — reads entire line
        System.out.println(sc2.nextLine()); // Hello World Java

        // Practical: when to use which
        Scanner sc3 = new Scanner(System.in);

        // Use next() for: username, city (single word expected)
        System.out.print("Enter username  : ");
        String username = sc3.next();  // takes only first word

        sc3.nextLine(); // clear buffer

        // Use nextLine() for: full name, address, message
        System.out.print("Enter full name : ");
        String fullName = sc3.nextLine(); // takes entire line

        System.out.println("Username  : " + username);
        System.out.println("Full Name : " + fullName);

        sc3.close();
    }
}`,
        output: "Hello\nWorld\nJava\nHello World Java\nEnter username  : rohan123\nEnter full name : Priya Sharma\nUsername  : rohan123\nFull Name : Priya Sharma"
      },

      // ── 7. Multiple inputs ────────────────────────────────────────
      {
        heading: "Taking Multiple Inputs — Practical Example",
        content: "Real programs read many values from the user. Here is a complete student registration form that takes all types of input correctly.",
        code: `import java.util.Scanner;

public class StudentRegistration {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.println("=== Student Registration Form ===");

        System.out.print("Full Name     : ");
        String name = sc.nextLine();

        System.out.print("Roll Number   : ");
        int rollNo = sc.nextInt();

        System.out.print("Age           : ");
        int age = sc.nextInt();

        System.out.print("CGPA          : ");
        double cgpa = sc.nextDouble();
        sc.nextLine(); // consume leftover \\n

        System.out.print("Department    : ");
        String dept = sc.nextLine();

        System.out.print("Email         : ");
        String email = sc.nextLine();

        // Process
        String grade   = cgpa >= 9.0 ? "O" : cgpa >= 8.0 ? "A+" : cgpa >= 7.0 ? "A" : "B";
        boolean merit  = cgpa >= 8.5;

        System.out.println("\\n=== Registration Confirmed ===");
        System.out.printf("%-15s : %s%n",   "Name",   name);
        System.out.printf("%-15s : %d%n",   "Roll No", rollNo);
        System.out.printf("%-15s : %d%n",   "Age",    age);
        System.out.printf("%-15s : %.2f%n", "CGPA",   cgpa);
        System.out.printf("%-15s : %s%n",   "Grade",  grade);
        System.out.printf("%-15s : %s%n",   "Dept",   dept);
        System.out.printf("%-15s : %s%n",   "Email",  email);
        System.out.printf("%-15s : %s%n",   "Merit",  merit ? "Eligible ✓" : "Not Eligible");

        sc.close();
    }
}`,
        output: "=== Student Registration Form ===\nFull Name     : Priya Sharma\nRoll Number   : 2024101\nAge           : 21\nCGPA          : 8.75\nDepartment    : Computer Science\nEmail         : priya@college.edu\n\n=== Registration Confirmed ===\nName            : Priya Sharma\nRoll No         : 2024101\nAge             : 21\nCGPA            : 8.75\nGrade           : A+\nDept            : Computer Science\nEmail           : priya@college.edu\nMerit           : Eligible ✓"
      },

      // ── 8. Scanner vs BufferedReader ──────────────────────────────
      {
        heading: "Scanner vs BufferedReader — Advanced Input",
        content: "Scanner is beginner-friendly but slower (does parsing internally). BufferedReader is faster but requires manual type conversion. For beginners and most programs, Scanner is the right choice.",
        table: {
          headers: ["Feature",       "Scanner",                    "BufferedReader"],
          rows: [
            ["Ease of use",    "Easy — direct type methods",  "Moderate — read String, parse manually"],
            ["Speed",          "Slower",                       "Faster (buffered reading)"],
            ["Type parsing",   "Automatic (nextInt, etc.)",   "Manual (Integer.parseInt)"],
            ["Import",         "java.util.Scanner",           "java.io.BufferedReader, java.io.IOException"],
            ["When to use",    "Beginner programs, small I/O","Competitive programming, large files"],
            ["Exception",      "Handles internally",          "Must handle IOException"]
          ]
        },
        code: `import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class BufferedReaderDemo {
    public static void main(String[] args) throws IOException {

        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        System.out.print("Enter name  : ");
        String name = br.readLine();              // reads full line

        System.out.print("Enter age   : ");
        int age = Integer.parseInt(br.readLine()); // parse manually

        System.out.print("Enter score : ");
        double score = Double.parseDouble(br.readLine()); // parse manually

        System.out.println("\\n=== BufferedReader Input ===");
        System.out.println("Name  : " + name);
        System.out.println("Age   : " + age);
        System.out.printf ("Score : %.2f%n", score);
    }
}`,
        output: "Enter name  : Alice\nEnter age   : 22\nEnter score : 91.5\n\n=== BufferedReader Input ===\nName  : Alice\nAge   : 22\nScore : 91.50",
        note: "For competitive programming and reading large inputs quickly, use BufferedReader. For regular Java applications and learning, Scanner is perfectly fine."
      },

      // ── 9. Command-line arguments ─────────────────────────────────
      {
        heading: "Command-Line Arguments — Input Without Scanner",
        content: "Java programs can receive input from the terminal when launched. The String[] args parameter in main() holds all the command-line arguments as strings.",
        code: `public class CommandLineArgs {
    public static void main(String[] args) {

        // Check if arguments were provided
        if (args.length == 0) {
            System.out.println("Usage: java CommandLineArgs <name> <age>");
            System.out.println("Example: java CommandLineArgs Rohan 25");
            return;
        }

        // args[0] is first argument, args[1] is second, etc.
        System.out.println("Number of args: " + args.length);

        String name = args[0];                          // first arg as String
        int    age  = Integer.parseInt(args[1]);         // convert String to int

        System.out.println("Name: " + name);
        System.out.println("Age : " + age);
        System.out.println("Hello, " + name + "! You are " + age + " years old.");
    }
}
// Run as: java CommandLineArgs Rohan 25`,
        output: "Number of args: 2\nName: Rohan\nAge : 25\nHello, Rohan! You are 25 years old."
      },

      // ── 10. Common I/O mistakes ───────────────────────────────────
      {
        heading: "Common Input/Output Mistakes — Avoid These",
        content: "These I/O mistakes confuse almost every Java beginner. Study each one carefully.",
        list: [
          "❌ Mistake 1: Forgetting import statement\n  Scanner sc = new Scanner(System.in); → COMPILE ERROR if no import\n  ✅ Fix: Add import java.util.Scanner; at the very top",
          "❌ Mistake 2: The nextLine() trap (MOST COMMON)\n  nextInt() then nextLine() → nextLine() gets empty string\n  ✅ Fix: Add sc.nextLine(); between nextInt() and nextLine()",
          "❌ Mistake 3: Wrong method for data type\n  int age = sc.next(); → COMPILE ERROR (next() returns String)\n  ✅ Fix: int age = sc.nextInt();",
          "❌ Mistake 4: Not closing Scanner\n  Leaving Scanner open causes resource leak warnings\n  ✅ Fix: sc.close(); at the end of the method",
          "❌ Mistake 5: print vs println confusion\n  print(\"Hello\"); print(\"World\"); → HelloWorld on one line\n  ✅ Use println() when you want each item on its own line",
          "❌ Mistake 6: Wrong printf format specifier\n  printf(\"%d\", 3.14) → throws IllegalFormatException\n  ✅ Fix: printf(\"%.2f\", 3.14) — use %f for decimals, %d for integers"
        ]
      }
    ],

    quiz: [
      { q: "Which method reads a full line of input including spaces?", options: ["next()", "nextLine()", "readLine()", "getLine()"], correct: 1 },
      { q: "After nextInt(), why add sc.nextLine()?", options: ["To close scanner", "To consume leftover newline in buffer", "Required by Java", "To reset scanner"], correct: 1 },
      { q: "printf format specifier for 2 decimal places:", options: ["%2d", "%f2", "%.2f", "%2.f"], correct: 2 },
      { q: "next() reads:", options: ["Full line", "One word up to whitespace", "One character", "One integer"], correct: 1 },
      { q: "System.out.print() vs println():", options: ["Same", "print stays same line; println moves to next", "println stays same line", "No difference"], correct: 1 },
      { q: "Which is faster for large input?", options: ["Scanner", "BufferedReader", "Both are same", "System.in directly"], correct: 1 }
    ],

    code: `import java.util.Scanner;
public class IOComplete {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        // Take complete student input
        System.out.print("Student name  : ");
        String name = sc.nextLine();

        System.out.print("Math marks    : ");
        int math = sc.nextInt();

        System.out.print("Science marks : ");
        int sci = sc.nextInt();

        System.out.print("English marks : ");
        int eng = sc.nextInt();
        sc.nextLine();

        // Process and display formatted output
        int    total = math + sci + eng;
        double pct   = (double)total / 300 * 100;
        String grade = pct>=90?"A":pct>=75?"B":pct>=60?"C":pct>=35?"D":"F";
        String result = pct >= 35 ? "PASS ✓" : "FAIL ✗";

        System.out.println("\\n====== Result Card ======");
        System.out.printf("%-12s : %s%n",   "Name",    name);
        System.out.printf("%-12s : %d%n",   "Maths",   math);
        System.out.printf("%-12s : %d%n",   "Science", sci);
        System.out.printf("%-12s : %d%n",   "English", eng);
        System.out.printf("%-12s : %d/300%n","Total",  total);
        System.out.printf("%-12s : %.2f%%%n","Percent", pct);
        System.out.printf("%-12s : %s%n",   "Grade",   grade);
        System.out.printf("%-12s : %s%n",   "Result",  result);
        System.out.println("=========================");
        sc.close();
    }
}`,
    output: "Student name  : Priya Sharma\nMath marks    : 88\nScience marks : 72\nEnglish marks : 91\n\n====== Result Card ======\nName         : Priya Sharma\nMaths        : 88\nScience      : 72\nEnglish      : 91\nTotal        : 251/300\nPercent      : 83.67%\nGrade        : B\nResult       : PASS ✓\n========================="
  }
};
