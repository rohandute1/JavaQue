export const OOP_TOPICS = {
  "classes-objects": {
    title: "Classes & Objects in Java — Complete Guide", module: "oop", duration: "40 min", difficulty: "Intermediate", xp: 150, icon: "🏗️",
    intro: "Java is called an Object-Oriented Programming language because almost everything is built using classes and objects. A CLASS is a blueprint — a template or design that defines what data an object will have and what actions it can perform. An OBJECT is a real instance created from that blueprint. Think of it this way: a Car design on paper is the class; an actual car in the parking lot is the object.",

    sections: [

      // ── 1. Real-life analogy ──────────────────────────────────────
      {
        heading: "What is a Class? — Real Life Understanding",
        content: "Before writing code, understand classes through real-world examples. A class is just a template — it defines structure but creates nothing on its own.",
        list: [
          "🚗 Car blueprint on paper → Class | Actual car in parking lot → Object",
          "🏠 House design/floor plan → Class | Actual house built from it → Object",
          "👤 Human DNA blueprint → Class | Actual person → Object",
          "🍪 Cookie cutter → Class | Each cookie made from it → Object",
          "📋 A job application form (template) → Class | Filled form by each applicant → Object"
        ],
        note: "A class only DEFINES structure — no memory is used until an object is created from it. You can create thousands of objects from one class, each with its own data."
      },

      // ── 2. Class syntax ───────────────────────────────────────────
      {
        heading: "Class Syntax — Variables and Methods",
        content: "A class has two parts: variables (also called fields or attributes) that store the object's data/state, and methods that define the object's behavior/actions.",
        code: `// A class definition — blueprint for a Car
class Car {

    // Variables (fields) — what data each Car object has
    String  color;
    String  brand;
    int     speed;
    boolean isRunning;

    // Methods (behavior) — what each Car object can do
    void start() {
        isRunning = true;
        System.out.println(brand + " car started!");
    }

    void stop() {
        isRunning = false;
        System.out.println(brand + " car stopped.");
    }

    void accelerate(int amount) {
        speed += amount;
        System.out.println(brand + " speed: " + speed + " km/h");
    }

    void displayInfo() {
        System.out.println("Brand: " + brand + " | Color: " + color +
                           " | Speed: " + speed + " | Running: " + isRunning);
    }
}

// NOTE: This class only defines the blueprint.
// No actual Car exists yet — no memory used for Car data.`,
        output: "// This is just a class definition — no output yet.\n// Objects must be created to produce output."
      },

      // ── 3. Creating objects ───────────────────────────────────────
      {
        heading: "Creating Objects — Bringing the Blueprint to Life",
        content: "An object is created using the 'new' keyword. new allocates memory in RAM, creates the object, and returns a reference to it. The variable holds this reference (memory address), not the object itself.",
        code: `public class CarDemo {
    public static void main(String[] args) {

        // Creating an object — syntax: ClassName objectName = new ClassName();
        Car car1 = new Car();

        // Assign values to object's fields using dot (.) operator
        car1.color = "Red";
        car1.brand = "BMW";
        car1.speed = 0;

        // Call object's methods
        car1.start();
        car1.accelerate(60);
        car1.displayInfo();
        car1.stop();

        System.out.println();

        // Creating a SECOND object from the SAME class
        Car car2 = new Car();
        car2.color = "Blue";
        car2.brand = "Honda";
        car2.speed = 0;

        car2.start();
        car2.accelerate(40);
        car2.displayInfo();

        // Both are completely independent — changing one does NOT affect the other
        System.out.println("\\nAre they the same object? " + (car1 == car2)); // false
    }
}`,
        output: "BMW car started!\nBMW speed: 60 km/h\nBrand: BMW | Color: Red | Speed: 60 | Running: true\nBMW car stopped.\n\nHonda car started!\nHonda speed: 40 km/h\nBrand: Honda | Color: Blue | Speed: 40 | Running: true\n\nAre they the same object? false"
      },

      // ── 4. Memory concept ─────────────────────────────────────────
      {
        heading: "Memory Concept — What Happens with 'new'",
        content: "Understanding how Java manages memory for objects is crucial for avoiding bugs. When you write Car car1 = new Car(), three things happen.",
        list: [
          "1️⃣ Java allocates memory in HEAP RAM for the Car object's data (color, brand, speed, isRunning)",
          "2️⃣ The object is initialized with default values (null for String, 0 for int, false for boolean)",
          "3️⃣ The variable car1 (stored on the STACK) holds the REFERENCE (memory address) of the object — not the object itself",
          "📌 Car car1 = new Car(); car2 = car1; — now BOTH variables point to the SAME object!",
          "📌 Car car1 = new Car(); Car car2 = new Car(); — two DIFFERENT objects, two separate memory locations",
          "⚠️ car1 == car2 compares references (are they same object?), NOT content. Use .equals() for content comparison"
        ],
        code: `public class MemoryConcept {
    public static void main(String[] args) {

        // Two separate objects — different memory locations
        Car c1 = new Car();
        Car c2 = new Car();
        c1.brand = "Toyota"; c1.color = "Red";
        c2.brand = "Toyota"; c2.color = "Red";

        System.out.println("c1 == c2         : " + (c1 == c2));       // false — different objects
        System.out.println("Same brand?      : " + c1.brand.equals(c2.brand)); // true — same content

        // Reference copy — both point to SAME object
        Car c3 = c1; // c3 is NOT a new object — just another reference to c1
        c3.color = "Yellow"; // modifies through c3 reference
        System.out.println("c1 color after c3 change: " + c1.color); // Yellow! Same object
        System.out.println("c1 == c3         : " + (c1 == c3));       // true — same object
    }
}`,
        output: "c1 == c2         : false\nSame brand?      : true\nc1 color after c3 change: Yellow\nc1 == c3         : true",
        note: "This is one of the most important concepts in Java. When you pass an object to a method, you pass the REFERENCE — the method can modify the original object's data through that reference."
      },

      // ── 5. Multiple objects ───────────────────────────────────────
      {
        heading: "Multiple Objects — Each Has Its Own Data",
        content: "You can create unlimited objects from one class. Each object has its own copy of the instance variables — changing one object's data does NOT affect another.",
        code: `class Student {
    String name;
    int    age;
    double marks;
    String grade;

    void assignGrade() {
        grade = marks >= 90 ? "A" : marks >= 75 ? "B" : marks >= 60 ? "C" : "F";
    }

    void display() {
        System.out.printf("%-10s | Age: %2d | Marks: %5.1f | Grade: %s%n",
                          name, age, marks, grade);
    }
}

public class MultipleObjects {
    public static void main(String[] args) {

        // Creating 4 objects from the Student blueprint
        Student s1 = new Student(); s1.name="Rohan";   s1.age=22; s1.marks=88.5;
        Student s2 = new Student(); s2.name="Priya";   s2.age=21; s2.marks=95.0;
        Student s3 = new Student(); s3.name="Aman";    s3.age=23; s3.marks=62.0;
        Student s4 = new Student(); s4.name="Neha";    s4.age=20; s4.marks=45.0;

        // Each object independently assigns its own grade
        s1.assignGrade(); s2.assignGrade(); s3.assignGrade(); s4.assignGrade();

        System.out.println("=== Student Records ===");
        s1.display(); s2.display(); s3.display(); s4.display();

        // Changing one object does NOT affect others
        s1.marks = 92.0;
        s1.assignGrade();
        System.out.println("\\nAfter updating Rohan:");
        s1.display();
        System.out.println("Priya unchanged: " + s2.marks); // still 95.0
    }
}`,
        output: "=== Student Records ===\nRohan      | Age: 22 | Marks:  88.5 | Grade: B\nPriya      | Age: 21 | Marks:  95.0 | Grade: A\nAman       | Age: 23 | Marks:  62.0 | Grade: C\nNeha       | Age: 20 | Marks:  45.0 | Grade: F\n\nAfter updating Rohan:\nRohan      | Age: 22 | Marks:  92.0 | Grade: A\nPriya unchanged: 95.0"
      },

      // ── 6. this keyword ───────────────────────────────────────────
      {
        heading: "The 'this' Keyword — Refers to Current Object",
        content: "'this' refers to the current object instance. Its most important use is to distinguish between instance variables and parameters that have the same name — a very common situation in constructors and setters.",
        code: `class Person {
    String name;
    int    age;
    String city;

    // Without this — works but confusing naming
    void setDetails_confusing(String n, int a, String c) {
        name = n;   // which 'name'? field name
        age  = a;
        city = c;
    }

    // With this — parameter same name as field — CLEAR
    void setDetails(String name, int age, String city) {
        this.name = name;   // this.name = field | name = parameter
        this.age  = age;
        this.city = city;
    }

    void display() {
        System.out.println(this.name + " | " + this.age + " | " + this.city);
    }
}

public class ThisKeyword {
    public static void main(String[] args) {
        Person p1 = new Person();
        p1.setDetails("Rohan", 25, "Mumbai");
        p1.display();

        Person p2 = new Person();
        p2.setDetails("Priya", 22, "Delhi");
        p2.display();
    }
}`,
        output: "Rohan | 25 | Mumbai\nPriya | 22 | Delhi"
      },

      // ── 7. Why OOP matters ────────────────────────────────────────
      {
        heading: "Why Classes & Objects Are Important",
        content: "Object-Oriented Programming fundamentally changes how you organise and think about code — especially for large applications.",
        table: {
          headers: ["Without OOP",                          "With Classes & Objects"],
          rows: [
            ["Code is a long list of scattered statements", "Code is organised into logical real-world entities"],
            ["Data and logic are separate and unrelated",   "Data and methods that act on it live together"],
            ["Reusing code means copy-pasting",             "Create a class once, instantiate objects anywhere"],
            ["Adding features breaks existing code",        "Add new class or extend existing one cleanly"],
            ["Hard to model real-world problems",           "Student, Employee, Car naturally map to classes"],
            ["Thousands of variables to track",             "Group related data into one object"]
          ]
        }
      },

      // ── 8. Real-world example ─────────────────────────────────────
      {
        heading: "Real-World Complete Example — Employee System",
        content: "This is how a real application uses classes and objects together — an employee record system.",
        code: `class Employee {
    // Variables — what data each Employee has
    String name;
    int    employeeId;
    String department;
    double basicSalary;

    // Method — compute full salary with allowances
    double calculateGross() {
        double hra = basicSalary * 0.40;  // 40% HRA
        double da  = basicSalary * 0.20;  // 20% DA
        return basicSalary + hra + da;
    }

    // Method — display employee information
    void displaySlip() {
        System.out.println("==============================");
        System.out.printf("ID    : %d%n",     employeeId);
        System.out.printf("Name  : %s%n",     name);
        System.out.printf("Dept  : %s%n",     department);
        System.out.printf("Basic : ₹%.2f%n",  basicSalary);
        System.out.printf("Gross : ₹%.2f%n",  calculateGross());
        System.out.println("==============================");
    }
}

public class EmployeeSystem {
    public static void main(String[] args) {

        // Create objects for each employee
        Employee e1 = new Employee();
        e1.name = "Rohan Sharma"; e1.employeeId = 1001;
        e1.department = "Engineering"; e1.basicSalary = 60000;

        Employee e2 = new Employee();
        e2.name = "Priya Gupta"; e2.employeeId = 1002;
        e2.department = "Marketing"; e2.basicSalary = 45000;

        // Each object independently calculates its own salary
        e1.displaySlip();
        e2.displaySlip();
    }
}`,
        output: "==============================\nID    : 1001\nName  : Rohan Sharma\nDept  : Engineering\nBasic : ₹60000.00\nGross : ₹96000.00\n==============================\n==============================\nID    : 1002\nName  : Priya Gupta\nDept  : Marketing\nBasic : ₹45000.00\nGross : ₹72000.00\n=============================="
      },

      // ── 9. Class vs Object quick summary ─────────────────────────
      {
        heading: "Class vs Object — Quick Reference",
        content: "Always be clear about the difference between a class (blueprint) and an object (real instance created from it).",
        table: {
          headers: ["Aspect",        "Class",                          "Object"],
          rows: [
            ["Definition",   "Blueprint / template / design",  "Real instance created from class"],
            ["Keyword",      "class keyword",                  "new keyword"],
            ["Memory",       "No memory for data at definition","Memory allocated in heap when created"],
            ["Count",        "Defined once",                   "Can create unlimited objects"],
            ["Example",      "class Car { ... }",              "Car car1 = new Car();"],
            ["Real life",    "Car manufacturing design",        "Actual car in showroom"]
          ]
        }
      }
    ],

    quiz: [
      { q: "What does 'new' do in Java?", options: ["Declares a variable", "Creates an object instance in memory", "Defines a class", "Imports a package"], correct: 1 },
      { q: "What does 'this' refer to?", options: ["The class", "The parent class", "The current object instance", "A static reference"], correct: 2 },
      { q: "Class variables are called:", options: ["Parameters", "Arguments", "Fields or Attributes", "Functions"], correct: 2 },
      { q: "Can one class be used to create multiple objects?", options: ["No", "Yes — unlimited objects", "Only 2", "Only if static"], correct: 1 },
      { q: "Where are objects stored in memory?", options: ["Stack", "Heap", "Code segment", "Register"], correct: 1 },
      { q: "What is the real-life analogy for a class?", options: ["An actual car", "A blueprint or template", "A person", "A method call"], correct: 1 }
    ],

    code: `class BankAccount {
    String owner;
    double balance;

    void deposit(double amt) {
        if (amt > 0) {
            balance += amt;
            System.out.printf("Deposited ₹%.2f | Balance: ₹%.2f%n", amt, balance);
        }
    }
    void withdraw(double amt) {
        if (amt > balance) System.out.println("Insufficient funds!");
        else {
            balance -= amt;
            System.out.printf("Withdrew  ₹%.2f | Balance: ₹%.2f%n", amt, balance);
        }
    }
    void showBalance() {
        System.out.printf("%s's balance: ₹%.2f%n", owner, balance);
    }
}
public class BankDemo {
    public static void main(String[] args) {
        BankAccount acc1 = new BankAccount();
        acc1.owner = "Rohan"; acc1.balance = 10000;
        acc1.deposit(5000);
        acc1.withdraw(3000);
        acc1.showBalance();

        BankAccount acc2 = new BankAccount();
        acc2.owner = "Priya"; acc2.balance = 20000;
        acc2.withdraw(25000); // insufficient
        acc2.showBalance();
    }
}`,
    output: "Deposited ₹5000.00 | Balance: ₹15000.00\nWithdrew  ₹3000.00 | Balance: ₹12000.00\nRohan's balance: ₹12000.00\nInsufficient funds!\nPriya's balance: ₹20000.00"
  },

  "constructors": {
    title: "Constructors in Java — Complete Guide", module: "oop", duration: "35 min", difficulty: "Intermediate", xp: 125, icon: "🔨",
    intro: "A constructor is a special method that runs AUTOMATICALLY when an object is created with the 'new' keyword. Its purpose is to initialize the object's data at the moment of creation. Think of it like a birth event — when a baby is born, a name is assigned, a date of birth is recorded, and other details are set automatically. That automatic initialization is exactly what a constructor does.",

    sections: [

      // ── 1. Why constructors ───────────────────────────────────────
      {
        heading: "Why Do We Need Constructors?",
        content: "Without constructors, you must assign every field manually after creating an object — messy and error-prone. With constructors, initialization happens at creation time — cleaner and professional.",
        code: `class Student {
    String name;
    int age;
    double marks;
}

public class WhyConstructor {
    public static void main(String[] args) {

        // ❌ WITHOUT constructor — manual assignment, easy to forget fields
        Student s1 = new Student();
        s1.name  = "Rohan";
        s1.age   = 22;
        s1.marks = 88.5;
        // What if you forgot s1.marks? Object is incomplete!

        // ✅ WITH constructor — everything set at creation time
        // Student s2 = new Student("Priya", 21, 92.0);  // cleaner!
        // One line, all required fields set, no chance to forget

        System.out.println("Name : " + s1.name);
        System.out.println("Age  : " + s1.age);
        System.out.println("Marks: " + s1.marks);
    }
}`,
        output: "Name : Rohan\nAge  : 22\nMarks: 88.5"
      },

      // ── 2. Constructor rules ──────────────────────────────────────
      {
        heading: "Constructor Rules — 3 Must-Know Rules",
        content: "Constructors have strict rules in Java. Violating any of them causes a compile error.",
        list: [
          "📌 Rule 1: Constructor name MUST exactly match the class name\n  class Student { Student() { } }  ✅\n  class Student { student() { } }  ❌ — lowercase s = treated as method, not constructor",
          "📌 Rule 2: Constructor has NO return type — not even void\n  Student() { }  ✅ — correct constructor\n  void Student() { }  ❌ — now it is a regular method named Student",
          "📌 Rule 3: Constructor is called AUTOMATICALLY when new is used\n  Student s = new Student(); — constructor runs here automatically",
          "📌 Bonus: If you define NO constructor, Java provides a default no-arg constructor automatically",
          "📌 Bonus: If you define ANY constructor (with parameters), Java STOPS providing the default one"
        ]
      },

      // ── 3. Default constructor ────────────────────────────────────
      {
        heading: "Type 1 — Default Constructor (No Arguments)",
        content: "A constructor that takes no parameters. Used to create objects with default/preset values. If you write no constructor at all, Java silently provides one that does nothing.",
        code: `class Student {

    String name;
    int    age;
    String college;

    // Default constructor — no parameters
    Student() {
        name    = "Unknown";
        age     = 0;
        college = "Not Assigned";
        System.out.println("New Student object created!");
    }

    void display() {
        System.out.println("Name   : " + name);
        System.out.println("Age    : " + age);
        System.out.println("College: " + college);
    }
}

public class DefaultConstructor {
    public static void main(String[] args) {

        // Constructor called AUTOMATICALLY when 'new' is used
        Student s1 = new Student(); // prints "New Student object created!"
        s1.display();

        System.out.println();

        Student s2 = new Student(); // constructor called again
        s2.name = "Rohan";          // override default values
        s2.age  = 22;
        s2.display();
    }
}`,
        output: "New Student object created!\nName   : Unknown\nAge    : 0\nCollege: Not Assigned\n\nNew Student object created!\nName   : Rohan\nAge    : 22\nCollege: Not Assigned"
      },

      // ── 4. Parameterized constructor ──────────────────────────────
      {
        heading: "Type 2 — Parameterized Constructor (With Arguments)",
        content: "A constructor that accepts parameters, allowing you to pass initial values at object creation time. This is the most commonly used type of constructor in real Java applications.",
        code: `class Student {

    String name;
    int    age;
    double marks;
    String grade;

    // Parameterized constructor — all values passed at creation
    Student(String name, int age, double marks) {
        this.name  = name;   // 'this' distinguishes field from parameter
        this.age   = age;
        this.marks = marks;
        // Calculate grade automatically in constructor
        this.grade = marks >= 90 ? "A" : marks >= 75 ? "B" : marks >= 60 ? "C" : "F";
    }

    void display() {
        System.out.printf("%-10s | Age: %2d | Marks: %.1f | Grade: %s%n",
                          name, age, marks, grade);
    }
}

public class ParameterizedConstructor {
    public static void main(String[] args) {

        // All values passed AT CREATION TIME — clean, one-liner
        Student s1 = new Student("Rohan", 22, 88.5);
        Student s2 = new Student("Priya", 21, 95.0);
        Student s3 = new Student("Aman",  23, 62.0);
        Student s4 = new Student("Neha",  20, 45.5);

        System.out.println("=== Student Report ===");
        s1.display();
        s2.display();
        s3.display();
        s4.display();
    }
}`,
        output: "=== Student Report ===\nRohan      | Age: 22 | Marks: 88.5 | Grade: B\nPriya      | Age: 21 | Marks: 95.0 | Grade: A\nAman       | Age: 23 | Marks: 62.0 | Grade: C\nNeha       | Age: 20 | Marks: 45.5 | Grade: F"
      },

      // ── 5. Constructor overloading ────────────────────────────────
      {
        heading: "Constructor Overloading — Multiple Constructors",
        content: "Just like method overloading, you can have multiple constructors with different parameter lists. This gives callers flexibility in how they create objects.",
        code: `public class Person {
    String name; int age; String email; String city;

    // Constructor 1: only name
    Person(String name) {
        this.name = name;
        this.age  = 0;
        this.email = name.toLowerCase() + "@example.com";
        this.city = "Unknown";
        System.out.println("Created with 1 param: " + name);
    }

    // Constructor 2: name and age
    Person(String name, int age) {
        this.name = name;
        this.age  = age;
        this.email = name.toLowerCase() + "@example.com";
        this.city = "Unknown";
        System.out.println("Created with 2 params: " + name + ", " + age);
    }

    // Constructor 3: all details
    Person(String name, int age, String email, String city) {
        this.name  = name;
        this.age   = age;
        this.email = email;
        this.city  = city;
        System.out.println("Created with 4 params: " + name);
    }

    void display() {
        System.out.printf("  %-8s | %2d | %-22s | %s%n", name, age, email, city);
    }

    public static void main(String[] args) {
        Person p1 = new Person("Rohan");
        Person p2 = new Person("Priya", 25);
        Person p3 = new Person("Aman", 30, "aman@gmail.com", "Mumbai");

        System.out.println();
        p1.display(); p2.display(); p3.display();
    }
}`,
        output: "Created with 1 param: Rohan\nCreated with 2 params: Priya, 25\nCreated with 4 params: Aman\n\n  Rohan    |  0 | rohan@example.com      | Unknown\n  Priya    | 25 | priya@example.com      | Unknown\n  Aman     | 30 | aman@gmail.com          | Mumbai"
      },

      // ── 6. Constructor chaining ───────────────────────────────────
      {
        heading: "Constructor Chaining with this() — Avoid Code Duplication",
        content: "this() calls another constructor in the SAME class. It MUST be the FIRST statement in the constructor body. This avoids repeating initialization code across multiple constructors.",
        code: `public class Product {
    String name; double price; int qty; String category;

    // MASTER constructor — has all fields
    Product(String name, double price, int qty, String category) {
        this.name     = name;
        this.price    = price;
        this.qty      = qty;
        this.category = category;
    }

    // Delegates to master — provides defaults for missing fields
    Product(String name, double price) {
        this(name, price, 0, "General"); // → calls master constructor
    }

    // Delegates to 2-param → master
    Product(String name) {
        this(name, 0.0); // → calls 2-param → master
    }

    void display() {
        System.out.printf("%-14s | ₹%8.2f | Qty: %-4d | [%s]%n",
                          name, price, qty, category);
    }

    public static void main(String[] args) {
        new Product("Laptop", 80000.00, 5, "Electronics").display();
        new Product("Pen",    15.00).display();
        new Product("Widget").display();
    }
}`,
        output: "Laptop         | ₹80000.00 | Qty: 5    | [Electronics]\nPen            | ₹   15.00 | Qty: 0    | [General]\nWidget         | ₹    0.00 | Qty: 0    | [General]"
      },

      // ── 7. Constructor vs Method ──────────────────────────────────
      {
        heading: "Constructor vs Method — Key Differences",
        content: "Beginners often confuse constructors and methods since both are blocks of code inside a class. Here is the complete comparison.",
        table: {
          headers: ["Feature",           "Constructor",                    "Method"],
          rows: [
            ["Purpose",        "Initialize object when created",  "Perform a specific task"],
            ["Name",           "SAME as class name exactly",      "Any valid name you choose"],
            ["Return type",    "NONE — not even void",            "Must have return type (or void)"],
            ["Called by",      "Automatically by 'new' keyword",  "Manually by programmer: obj.method()"],
            ["Called when",    "Object creation time only",       "Anytime after object exists"],
            ["Inherited",      "Not inherited",                   "Inherited by subclasses"],
            ["Example",        "Student() { name=\"?\"; }",       "void display() { println(name); }"]
          ]
        }
      }
    ],

    quiz: [
      { q: "What is the return type of a constructor?", options: ["void", "The class type", "No return type at all", "Object"], correct: 2 },
      { q: "When is a constructor automatically called?", options: ["Class is loaded", "Object is created with 'new'", "A method is called", "Program ends"], correct: 1 },
      { q: "this() in a constructor calls:", options: ["Parent constructor", "Another constructor in the SAME class", "Creates new object", "Refers to a method"], correct: 1 },
      { q: "If you define no constructor, Java provides:", options: ["Nothing", "A default no-arg constructor", "A parameterized constructor", "Compile error"], correct: 1 },
      { q: "Constructor name must:", options: ["Start with lowercase", "Match the class name exactly", "Have 'new' prefix", "End with ()"], correct: 1 },
      { q: "this() must be the _____ statement in a constructor.", options: ["Last", "Middle", "First", "Optional"], correct: 2 }
    ],

    code: `class Circle {
    double radius;
    String color;

    Circle()               { this(1.0, "White"); }    // delegates
    Circle(double r)       { this(r, "White"); }       // delegates
    Circle(double r, String c) {
        this.radius = r; this.color = c;
        System.out.println("Circle created: r=" + r + " color=" + c);
    }
    double area()      { return Math.PI * radius * radius; }
    double perimeter() { return 2 * Math.PI * radius; }
    void display() {
        System.out.printf("  radius=%.0f color=%-8s area=%.2f perim=%.2f%n",
                          radius, color, area(), perimeter());
    }
}
public class ConstructorDemo {
    public static void main(String[] args) {
        Circle c1 = new Circle();
        Circle c2 = new Circle(5);
        Circle c3 = new Circle(7, "Red");
        System.out.println("--- Results ---");
        c1.display(); c2.display(); c3.display();
    }
}`,
    output: "Circle created: r=1.0 color=White\nCircle created: r=5.0 color=White\nCircle created: r=7.0 color=Red\n--- Results ---\n  radius=1 color=White    area=3.14 perim=6.28\n  radius=5 color=White    area=78.54 perim=31.42\n  radius=7 color=Red      area=153.94 perim=43.98"
  },

  "inheritance": {
    title: "Inheritance in Java — Complete Guide", module: "oop", duration: "35 min", difficulty: "Intermediate", xp: 175, icon: "🧬",
    intro: "Inheritance means one class acquiring the properties and behaviors of another class. Just like a child inherits eyes, hair, and other traits from parents, a child class in Java inherits variables and methods from a parent class. Inheritance is achieved using the 'extends' keyword. It promotes CODE REUSE — instead of writing the same code in multiple classes, write it once in the parent and let all children use it automatically.",

    sections: [

      // ── 1. Real-life analogy ──────────────────────────────────────
      {
        heading: "What is Inheritance? — Real Life Understanding",
        content: "Inheritance creates an IS-A relationship between classes. Think about how the real world is hierarchically organised.",
        list: [
          "👨‍👩‍👦 A child inherits eyes, hair, skin tone from parents — child class inherits fields/methods from parent class",
          "🐕 A Dog IS-A Animal — Dog class extends Animal class and gets eat(), sleep() automatically",
          "🚗 A Car IS-A Vehicle — Car class extends Vehicle and inherits fuel, speed, move() etc.",
          "👩‍💼 A Manager IS-AN Employee — Manager extends Employee and gets name, salary, work() automatically",
          "📱 A Smartphone IS-A Phone — Smartphone inherits call(), text() and adds camera(), wifi() etc."
        ],
        note: "Without inheritance, you would copy the same fields and methods into every class. If you later need to change something, you must change it in every single class — that is a maintenance nightmare."
      },

      // ── 2. Why inheritance ────────────────────────────────────────
      {
        heading: "Why Do We Need Inheritance?",
        content: "Inheritance directly solves the problem of code duplication. See the difference clearly.",
        code: `// ❌ WITHOUT inheritance — same code repeated in every class

class Dog {
    String name;
    void eat()   { System.out.println(name + " is eating"); }   // DUPLICATE
    void sleep() { System.out.println(name + " is sleeping"); } // DUPLICATE
    void bark()  { System.out.println(name + " is barking"); }
}

class Cat {
    String name;
    void eat()   { System.out.println(name + " is eating"); }   // DUPLICATE
    void sleep() { System.out.println(name + " is sleeping"); } // DUPLICATE
    void meow()  { System.out.println(name + " is meowing"); }
}

// If you want to change how eat() works, change it in EVERY class — very bad!

// ✅ WITH inheritance — write once, use everywhere

class Animal {
    String name;
    void eat()   { System.out.println(name + " is eating"); }   // written ONCE
    void sleep() { System.out.println(name + " is sleeping"); } // written ONCE
}

class DogClean extends Animal {
    void bark() { System.out.println(name + " is barking"); } // only own behavior
}

class CatClean extends Animal {
    void meow() { System.out.println(name + " is meowing"); } // only own behavior
}`,
        output: "// No output — this is a design comparison illustration"
      },

      // ── 3. extends and basic inheritance ─────────────────────────
      {
        heading: "extends Keyword — Basic Inheritance",
        content: "Use the 'extends' keyword to create a subclass. The subclass automatically gets all non-private members (fields and methods) of the parent class.",
        code: `class Animal {
    String name;
    int    age;

    void eat()   { System.out.println(name + " is eating."); }
    void sleep() { System.out.println(name + " is sleeping."); }
    void breathe(){ System.out.println(name + " is breathing."); }
}

class Dog extends Animal {
    String breed;

    // Dog has its OWN method PLUS inherits eat, sleep, breathe from Animal
    void bark() { System.out.println(name + " says: Woof! 🐕"); }
    void fetch() { System.out.println(name + " is fetching the ball!"); }
}

class Cat extends Animal {
    String pattern; // tabby, solid, calico

    // Cat has its OWN methods PLUS inherits from Animal
    void meow()  { System.out.println(name + " says: Meow! 🐈"); }
    void purr()  { System.out.println(name + " is purring..."); }
}

public class InheritanceBasics {
    public static void main(String[] args) {

        Dog dog  = new Dog();
        dog.name  = "Rex";
        dog.age   = 3;
        dog.breed = "German Shepherd";

        System.out.println("=== Dog ===");
        dog.eat();     // inherited from Animal ✓
        dog.sleep();   // inherited from Animal ✓
        dog.bark();    // Dog's own method ✓
        dog.fetch();   // Dog's own method ✓

        Cat cat = new Cat();
        cat.name    = "Whiskers";
        cat.age     = 2;
        cat.pattern = "tabby";

        System.out.println("=== Cat ===");
        cat.eat();     // inherited from Animal ✓
        cat.breathe(); // inherited from Animal ✓
        cat.meow();    // Cat's own method ✓
        cat.purr();    // Cat's own method ✓

        // instanceof — check if object belongs to a class
        System.out.println("\\ndog instanceof Dog   : " + (dog instanceof Dog));    // true
        System.out.println("dog instanceof Animal: " + (dog instanceof Animal));  // true
        System.out.println("dog instanceof Cat   : " + (dog instanceof Cat));     // false
    }
}`,
        output: "=== Dog ===\nRex is eating.\nRex is sleeping.\nRex says: Woof! 🐕\nRex is fetching the ball!\n=== Cat ===\nWhiskers is eating.\nWhiskers is breathing.\nWhiskers says: Meow! 🐈\nWhiskers is purring...\n\ndog instanceof Dog   : true\ndog instanceof Animal: true\ndog instanceof Cat   : false"
      },

      // ── 4. super keyword ──────────────────────────────────────────
      {
        heading: "super Keyword — Access Parent Class",
        content: "The 'super' keyword refers to the parent class. super() calls the parent constructor (must be FIRST statement in child constructor). super.method() calls the parent's version of an overridden method.",
        code: `class Animal {
    String name;
    int    age;

    Animal(String name, int age) {
        this.name = name;
        this.age  = age;
        System.out.println("Animal constructor: " + name);
    }
    String describe() {
        return name + " (age " + age + ")";
    }
}

class Dog extends Animal {
    String breed;

    Dog(String name, int age, String breed) {
        super(name, age); // MUST be FIRST — calls Animal constructor
        this.breed = breed;
        System.out.println("Dog constructor: breed=" + breed);
    }

    // Override describe() but ALSO call parent's version with super
    @Override
    String describe() {
        return super.describe() + " | Breed: " + breed; // super.describe() = Animal's version
    }

    void bark() { System.out.println(name + " barks!"); }
}

public class SuperKeyword {
    public static void main(String[] args) {
        Dog dog = new Dog("Rex", 3, "Labrador");
        System.out.println();
        System.out.println(dog.describe()); // uses overridden + parent version
        dog.bark();
    }
}`,
        output: "Animal constructor: Rex\nDog constructor: breed=Labrador\n\nRex (age 3) | Breed: Labrador\nRex barks!",
        note: "super() MUST be the first statement in a constructor. If you don't call super() explicitly, Java automatically calls the parent's no-arg constructor. If the parent has no no-arg constructor, you MUST call super() with arguments."
      },

      // ── 5. Method overriding ──────────────────────────────────────
      {
        heading: "@Override — Method Overriding",
        content: "A child class can OVERRIDE a parent's method to provide its own implementation. Use @Override annotation to tell the compiler: 'I intend to override a parent method here — verify it.' This catches typos in method names at compile time.",
        code: `class Shape {
    String color;
    Shape(String color) { this.color = color; }

    double area() { return 0; } // base implementation — overridden by children

    void describe() {
        System.out.printf("%s %s → area = %.2f%n",
                          color, getClass().getSimpleName(), area());
    }
}

class Rectangle extends Shape {
    double width, height;
    Rectangle(String c, double w, double h) { super(c); width=w; height=h; }

    @Override
    double area() { return width * height; } // Rectangle's own formula
}

class Circle extends Shape {
    double radius;
    Circle(String c, double r) { super(c); radius = r; }

    @Override
    double area() { return Math.PI * radius * radius; } // Circle's own formula
}

class Triangle extends Shape {
    double base, height;
    Triangle(String c, double b, double h) { super(c); base=b; height=h; }

    @Override
    double area() { return 0.5 * base * height; } // Triangle's own formula
}

public class OverrideDemo {
    public static void main(String[] args) {
        Shape[] shapes = {
            new Rectangle("Red",   10, 5),
            new Circle(   "Blue",  7),
            new Triangle( "Green", 8, 6)
        };

        // Same method call — different result based on actual object type
        for (Shape s : shapes) s.describe();
    }
}`,
        output: "Red Rectangle → area = 50.00\nBlue Circle → area = 153.94\nGreen Triangle → area = 24.00"
      },

      // ── 6. Types of inheritance ───────────────────────────────────
      {
        heading: "Types of Inheritance in Java",
        content: "Java supports three types of class inheritance. Multiple inheritance (one class extending two classes) is NOT supported to avoid the Diamond Problem.",
        table: {
          headers: ["Type",            "Supported", "Description",                            "Example"],
          rows: [
            ["Single",         "✅ Yes",   "One class extends one class",          "Dog extends Animal"],
            ["Multilevel",     "✅ Yes",   "Chain: A→B→C",                         "Puppy extends Dog extends Animal"],
            ["Hierarchical",   "✅ Yes",   "Multiple classes extend one class",    "Dog, Cat, Bird all extend Animal"],
            ["Multiple",       "❌ No",    "One class extends two classes",        "NOT allowed — use interfaces instead"],
            ["Hybrid",         "❌ No",    "Combination including multiple",       "NOT allowed with classes"]
          ]
        },
        code: `// MULTILEVEL: A → B → C
class A { void showA() { System.out.println("A"); } }
class B extends A { void showB() { System.out.println("B"); } }
class C extends B { void showC() { System.out.println("C"); } }

// HIERARCHICAL: Dog, Cat, Bird all extend Animal
class BaseAnimal { void eat() { System.out.println("eating..."); } }
class DogH extends BaseAnimal { void bark()  { System.out.println("Woof!"); } }
class CatH extends BaseAnimal { void meow()  { System.out.println("Meow!"); } }
class BirdH extends BaseAnimal{ void chirp() { System.out.println("Tweet!"); } }

public class InheritanceTypes {
    public static void main(String[] args) {
        // Multilevel
        C obj = new C();
        obj.showA(); obj.showB(); obj.showC(); // all available in C

        // Hierarchical
        DogH  dog  = new DogH();  dog.eat();  dog.bark();
        CatH  cat  = new CatH();  cat.eat();  cat.meow();
        BirdH bird = new BirdH(); bird.eat(); bird.chirp();
    }
}`,
        output: "A\nB\nC\neating...\nWoof!\neating...\nMeow!\neating...\nTweet!"
      },

      // ── 7. Real-world example ─────────────────────────────────────
      {
        heading: "Real-World Example — Employee Hierarchy",
        content: "A practical example showing how inheritance models a real company structure.",
        code: `class Employee {
    String name;
    int    empId;
    double basicSalary;

    Employee(String name, int id, double salary) {
        this.name        = name;
        this.empId       = id;
        this.basicSalary = salary;
    }
    double calculateSalary() { return basicSalary; }
    void display() {
        System.out.printf("%-12s [ID:%04d] Role:%-12s Salary:₹%.0f%n",
                          name, empId, getClass().getSimpleName(), calculateSalary());
    }
}

class Manager extends Employee {
    double bonus;
    Manager(String n, int id, double sal, double bonus) {
        super(n, id, sal);
        this.bonus = bonus;
    }
    @Override double calculateSalary() { return basicSalary + bonus; }
}

class Developer extends Employee {
    String techStack;
    double projectBonus;
    Developer(String n, int id, double sal, double pb, String tech) {
        super(n, id, sal);
        this.projectBonus = pb;
        this.techStack    = tech;
    }
    @Override double calculateSalary() { return basicSalary + projectBonus; }
}

public class CompanyHierarchy {
    public static void main(String[] args) {
        Employee[] team = {
            new Employee("Ravi",   1001, 30000),
            new Manager( "Sunita", 1002, 60000, 15000),
            new Developer("Karan", 1003, 55000, 10000, "Java+Spring"),
            new Developer("Pooja", 1004, 50000, 8000,  "React+Node")
        };
        System.out.println("=== Company Payroll ===");
        for (Employee e : team) e.display();
    }
}`,
        output: "=== Company Payroll ===\nRavi         [ID:1001] Role:Employee     Salary:₹30000\nSunita       [ID:1002] Role:Manager      Salary:₹75000\nKaran        [ID:1003] Role:Developer    Salary:₹65000\nPooja        [ID:1004] Role:Developer    Salary:₹58000"
      }
    ],

    quiz: [
      { q: "Keyword for inheritance in Java:", options: ["implements", "extends", "inherits", "super"], correct: 1 },
      { q: "Can a Java class extend multiple classes?", options: ["Yes", "No — single class inheritance only", "Yes with implements", "Only abstract classes"], correct: 1 },
      { q: "super() in a child constructor calls:", options: ["Current constructor again", "Sibling class constructor", "Parent class constructor", "Object class constructor"], correct: 2 },
      { q: "@Override annotation purpose:", options: ["Makes method run faster", "Tells compiler to verify we're actually overriding a parent method", "Required for all overrides", "Marks method as static"], correct: 1 },
      { q: "Multiple inheritance with classes is not supported because:", options: ["Slow performance", "Diamond Problem — ambiguity when two parents have same method", "Too complex syntax", "Memory issues"], correct: 1 },
      { q: "Dog extends Animal creates which relationship?", options: ["HAS-A", "IS-A", "USES-A", "CREATES-A"], correct: 1 }
    ],

    code: `class Vehicle {
    String brand; int speed;
    Vehicle(String b, int s) { brand=b; speed=s; }
    String info() { return brand + " (max " + speed + " km/h)"; }
    void move() { System.out.println(brand + " is moving at " + speed + " km/h"); }
}
class Car extends Vehicle {
    int doors;
    Car(String b, int s, int d) { super(b,s); doors=d; }
    @Override String info() { return super.info() + " | " + doors + " doors"; }
}
class ElectricCar extends Car {
    int rangeKm;
    ElectricCar(String b, int s, int d, int r) { super(b,s,d); rangeKm=r; }
    @Override String info() { return super.info() + " | Range: " + rangeKm + "km ⚡"; }
}
public class VehicleHierarchy {
    public static void main(String[] args) {
        Vehicle[]  fleet = {
            new Vehicle("Truck", 120),
            new Car("Honda", 180, 4),
            new ElectricCar("Tesla", 250, 4, 500)
        };
        for (Vehicle v : fleet) System.out.println(v.info());
    }
}`,
    output: "Truck (max 120 km/h)\nHonda (max 180 km/h) | 4 doors\nTesla (max 250 km/h) | 4 doors | Range: 500km ⚡"
  },

  "polymorphism": {
    title: "Polymorphism in Java — Complete Guide", module: "oop", duration: "35 min", difficulty: "Intermediate", xp: 175, icon: "🦎",
    intro: "Polymorphism comes from Greek: Poly = Many, Morph = Forms. It means one thing behaving differently in different situations. In Java, the same method name produces different results depending on which object it is called on. A person can be a father at home, an employee in office, and a friend with friends — same person, multiple forms of behavior. Java has two types: Compile-time polymorphism (method overloading) and Runtime polymorphism (method overriding).",

    sections: [

      // ── 1. Real-life analogy ──────────────────────────────────────
      {
        heading: "What is Polymorphism? — Real Life Understanding",
        content: "Polymorphism is everywhere in the real world. The same action means different things depending on who is doing it.",
        list: [
          "🧑 A person IS-A father at home, IS-A manager at office, IS-A friend in a group — same person, multiple forms",
          "📱 A remote button behaves differently for TV, AC, Sound system — same button, different devices respond differently",
          "🐾 An animal.sound() call produces Woof for Dog, Meow for Cat, Moo for Cow — same call, different results",
          "✍️ draw() on a Shape: Rectangle draws 4 sides, Circle draws a circle, Triangle draws 3 sides — same method, different execution",
          "💳 pay() method: CreditCard charges card, UPI transfers money, Cash deducts wallet — same pay() call, different processing"
        ]
      },

      // ── 2. Compile-time polymorphism ──────────────────────────────
      {
        heading: "Type 1 — Compile-Time Polymorphism (Method Overloading)",
        content: "Compile-time polymorphism is achieved through METHOD OVERLOADING — same method name, different parameters. The compiler decides which version to call at COMPILE time based on the arguments.",
        code: `class Calculator {

    // Same method name 'add' — different parameters
    int add(int a, int b) {
        System.out.println("Adding 2 ints");
        return a + b;
    }

    int add(int a, int b, int c) {
        System.out.println("Adding 3 ints");
        return a + b + c;
    }

    double add(double a, double b) {
        System.out.println("Adding 2 doubles");
        return a + b;
    }

    String add(String a, String b) {
        System.out.println("Concatenating strings");
        return a + b;
    }
}

public class CompileTimePolymorphism {
    public static void main(String[] args) {

        Calculator calc = new Calculator();

        // Compiler decides which 'add' to call based on argument types
        System.out.println(calc.add(10, 20));           // int, int → 30
        System.out.println(calc.add(5, 10, 15));         // int, int, int → 30
        System.out.println(calc.add(3.14, 2.71));        // double → 5.85
        System.out.println(calc.add("Hello", " Java")); // String → Hello Java
    }
}`,
        output: "Adding 2 ints\n30\nAdding 3 ints\n30\nAdding 2 doubles\n5.85\nConcatenating strings\nHello Java",
        note: "Why called COMPILE-TIME? The compiler reads the argument types and DECIDES which version to use before the program runs. The decision is baked into the bytecode."
      },

      // ── 3. Runtime polymorphism ───────────────────────────────────
      {
        heading: "Type 2 — Runtime Polymorphism (Method Overriding)",
        content: "Runtime polymorphism is achieved through METHOD OVERRIDING — a child class provides its own implementation of a parent method. The JVM decides which version to call at RUNTIME based on the actual object type, not the reference type.",
        code: `class Animal {
    String name;
    Animal(String name) { this.name = name; }

    // Parent version — will be overridden by children
    void sound() {
        System.out.println(name + " makes some sound");
    }
}

class Dog extends Animal {
    Dog(String name) { super(name); }

    @Override
    void sound() {
        System.out.println(name + " says: Woof! Woof! 🐕");
    }
}

class Cat extends Animal {
    Cat(String name) { super(name); }

    @Override
    void sound() {
        System.out.println(name + " says: Meow! 🐈");
    }
}

class Cow extends Animal {
    Cow(String name) { super(name); }

    @Override
    void sound() {
        System.out.println(name + " says: Moooo! 🐄");
    }
}

public class RuntimePolymorphism {
    public static void main(String[] args) {

        // Parent reference holds child objects — this is the KEY
        Animal a1 = new Dog("Rex");
        Animal a2 = new Cat("Whiskers");
        Animal a3 = new Cow("Bessie");
        Animal a4 = new Animal("Unknown"); // parent itself

        // SAME method call — DIFFERENT behavior based on actual object
        a1.sound(); // JVM sees actual type = Dog → calls Dog's sound()
        a2.sound(); // JVM sees actual type = Cat → calls Cat's sound()
        a3.sound(); // JVM sees actual type = Cow → calls Cow's sound()
        a4.sound(); // JVM sees actual type = Animal → calls Animal's sound()

        System.out.println();

        // Array of parent type — holds different child objects
        Animal[] farm = {
            new Dog("Bruno"), new Cat("Luna"), new Cow("Daisy"), new Dog("Max")
        };

        System.out.println("=== Farm Sounds ===");
        for (Animal animal : farm) {
            animal.sound(); // polymorphic call — different result each time
        }
    }
}`,
        output: "Rex says: Woof! Woof! 🐕\nWhiskers says: Meow! 🐈\nBessie says: Moooo! 🐄\nUnknown makes some sound\n\n=== Farm Sounds ===\nBruno says: Woof! Woof! 🐕\nLuna says: Meow! 🐈\nDaisy says: Moooo! 🐄\nMax says: Woof! Woof! 🐕",
        note: "Why called RUNTIME? The JVM doesn't know which method to call until the program actually runs and it sees which actual object is stored in the variable. This is also called DYNAMIC DISPATCH."
      },

      // ── 4. Compile-time vs Runtime ────────────────────────────────
      {
        heading: "Compile-Time vs Runtime Polymorphism — Key Differences",
        content: "These two types of polymorphism differ in when the decision about which method to call is made.",
        table: {
          headers: ["Feature",          "Compile-Time (Overloading)",     "Runtime (Overriding)"],
          rows: [
            ["Achieved using",   "Method overloading",             "Method overriding"],
            ["Decision made at", "Compile time by compiler",        "Runtime by JVM"],
            ["Also called",      "Static polymorphism",             "Dynamic polymorphism / Dynamic dispatch"],
            ["Inheritance needed","No",                             "Yes — requires parent-child relationship"],
            ["Method signature", "Different parameters",            "Exact same signature"],
            ["Performance",      "Slightly faster",                 "Slightly slower (runtime lookup)"],
            ["Example",          "add(int), add(double)",           "Dog, Cat both override sound()"]
          ]
        }
      },

      // ── 5. Why polymorphism matters ───────────────────────────────
      {
        heading: "Why Polymorphism is the Most Powerful OOP Feature",
        content: "Polymorphism enables you to write code that works with the PARENT type but automatically uses the child's implementation. This makes code extensible — add new child classes without changing existing code.",
        code: `class Shape {
    String color;
    Shape(String c) { color = c; }
    double area()  { return 0; }
    void draw()    { System.out.println("Drawing " + color + " " + getClass().getSimpleName()); }
}
class Rectangle extends Shape {
    double w, h;
    Rectangle(String c, double w, double h) { super(c); this.w=w; this.h=h; }
    @Override double area() { return w * h; }
}
class Circle extends Shape {
    double r;
    Circle(String c, double r) { super(c); this.r=r; }
    @Override double area() { return Math.PI * r * r; }
}
class Triangle extends Shape {
    double b, h;
    Triangle(String c, double b, double h) { super(c); this.b=b; this.h=h; }
    @Override double area() { return 0.5 * b * h; }
}

public class WhyPolymorphism {
    // This method works with ANY Shape — past, present, and FUTURE
    static void printArea(Shape s) {
        s.draw();
        System.out.printf("  Area = %.2f%n", s.area());
    }

    public static void main(String[] args) {
        Shape[] shapes = {
            new Rectangle("Red",   10, 5),
            new Circle(   "Blue",  7),
            new Triangle( "Green", 8, 6)
        };
        // If you add a new Pentagon class tomorrow — this code DOESN'T CHANGE
        for (Shape s : shapes) printArea(s);
    }
}`,
        output: "Drawing Red Rectangle\n  Area = 50.00\nDrawing Blue Circle\n  Area = 153.94\nDrawing Green Triangle\n  Area = 24.00"
      }
    ],

    quiz: [
      { q: "Polymorphism means:", options: ["One class one method", "Many forms — one interface, different behaviors", "Multiple inheritance", "Only method overloading"], correct: 1 },
      { q: "Runtime polymorphism is resolved at:", options: ["Compile time by compiler", "Runtime by JVM based on actual object", "Load time", "Never"], correct: 1 },
      { q: "Compile-time polymorphism is achieved through:", options: ["Method overriding", "Inheritance", "Method overloading", "Abstract classes"], correct: 2 },
      { q: "Can you override a static method?", options: ["Yes fully", "No — it is method hiding, not overriding", "Yes with @Override", "Only in Java 8+"], correct: 1 },
      { q: "Dynamic dispatch means:", options: ["Compiler decides method at compile time", "JVM picks correct overridden method at runtime", "Thread scheduling", "Design pattern"], correct: 1 },
      { q: "Runtime polymorphism requires:", options: ["Two unrelated classes", "Inheritance AND method overriding", "Only method overloading", "Abstract class only"], correct: 1 }
    ],

    code: `class Logger {
    void log(String msg) { System.out.println("[LOG]    " + msg); }
}
class FileLogger extends Logger {
    @Override void log(String msg) { System.out.println("[FILE]   Writing: " + msg); }
}
class CloudLogger extends Logger {
    @Override void log(String msg) { System.out.println("[CLOUD]  Sending: " + msg); }
}
class DatabaseLogger extends Logger {
    @Override void log(String msg) { System.out.println("[DB]     Storing: " + msg); }
}
public class LoggerDemo {
    static void process(Logger logger, String event) {
        logger.log(event); // polymorphic — works for any Logger
    }
    public static void main(String[] args) {
        Logger[] loggers = {
            new Logger(), new FileLogger(), new CloudLogger(), new DatabaseLogger()
        };
        for (Logger l : loggers) process(l, "Application started");
    }
}`,
    output: "[LOG]    Application started\n[FILE]   Writing: Application started\n[CLOUD]  Sending: Application started\n[DB]     Storing: Application started"
  },

  "abstraction": {
    title: "Abstraction in Java — Complete Guide", module: "oop", duration: "35 min", difficulty: "Intermediate", xp: 150, icon: "🎭",
    intro: "Abstraction means hiding the internal complexity and showing only what is necessary to the user. You use things every day without knowing how they work internally — that is abstraction in action. When you drive a car, you use the steering wheel, brake, and accelerator. You don't need to know how the engine generates power or how the brake system works internally. The complexity is HIDDEN. You see only what you need. Java achieves abstraction through abstract classes and interfaces.",

    sections: [

      // ── 1. Real-life analogy ──────────────────────────────────────
      {
        heading: "What is Abstraction? — Real Life Understanding",
        content: "Abstraction is about showing relevant details and hiding irrelevant complexity. This makes systems simpler to use and safer.",
        list: [
          "🚗 Car driving: you use steering + pedals. You don't see engine internals, fuel injection, gear mechanics",
          "📱 ATM machine: you press withdraw and enter amount. You don't see the database, network, cash counting mechanism",
          "☕ Coffee machine: you press a button. You don't see water heating, coffee grinding, pressure building",
          "📺 TV remote: you press buttons. You don't see infrared signals, circuit boards, microcontrollers",
          "💻 Using a method: you call Math.sqrt(16) → get 4.0. You don't see the algorithm inside"
        ],
        note: "Why is abstraction important in code? It lets you define WHAT something must do without specifying HOW it does it. Different implementations can provide different 'how', but the 'what' stays consistent."
      },

      // ── 2. Achieved using ─────────────────────────────────────────
      {
        heading: "How Abstraction is Achieved in Java",
        content: "Java provides two tools for abstraction: abstract classes (partial abstraction — mix of abstract and concrete methods) and interfaces (full abstraction — pure contract, no implementation).",
        table: {
          headers: ["Tool",           "Abstraction Level", "Can have state?", "Can have constructors?", "Multiple?"],
          rows: [
            ["Abstract class", "Partial (0–100%)",  "Yes — fields allowed",   "Yes",   "No — single extend"],
            ["Interface",      "Full (100%)",        "No (only constants)",    "No",    "Yes — implement many"]
          ]
        }
      },

      // ── 3. Abstract class ─────────────────────────────────────────
      {
        heading: "Abstract Class — Partial Abstraction",
        content: "An abstract class uses the 'abstract' keyword. It CAN have both abstract methods (no body — subclass MUST implement) and concrete methods (have body — subclass inherits directly). You CANNOT create an object of an abstract class.",
        code: `abstract class Animal {

    String name; // concrete field

    Animal(String name) {  // concrete constructor
        this.name = name;
    }

    // ABSTRACT method — NO body, subclass MUST implement
    abstract void sound();
    abstract String getType();

    // CONCRETE method — HAS body, inherited by all subclasses
    void sleep() {
        System.out.println(name + " is sleeping... 💤");
    }
    void breathe() {
        System.out.println(name + " is breathing.");
    }
    void introduce() {
        System.out.printf("I am %s, a %s. I say: %s%n", name, getType(), getSoundText());
    }
    private String getSoundText() {
        return "..."; // will be different after sound() calls
    }
}

// Must implement ALL abstract methods
class Dog extends Animal {
    Dog(String name) { super(name); }

    @Override void sound()       { System.out.println(name + " says: Woof! Woof! 🐕"); }
    @Override String getType()   { return "Dog"; }
}

class Cat extends Animal {
    Cat(String name) { super(name); }

    @Override void sound()       { System.out.println(name + " says: Meow! 🐈"); }
    @Override String getType()   { return "Cat"; }
}

class Cow extends Animal {
    Cow(String name) { super(name); }

    @Override void sound()       { System.out.println(name + " says: Moo! 🐄"); }
    @Override String getType()   { return "Cow"; }
}

public class AbstractClassDemo {
    public static void main(String[] args) {

        // Animal a = new Animal("x"); // ❌ CANNOT instantiate abstract class!

        Animal[] animals = {new Dog("Rex"), new Cat("Whiskers"), new Cow("Bessie")};

        for (Animal a : animals) {
            a.sound();    // own implementation
            a.sleep();    // inherited from Animal
            System.out.println();
        }
    }
}`,
        output: "Rex says: Woof! Woof! 🐕\nRex is sleeping... 💤\n\nWhiskers says: Meow! 🐈\nWhiskers is sleeping... 💤\n\nBessie says: Moo! 🐄\nBessie is sleeping... 💤",
        note: "⚠️ If a class inherits from an abstract class but does NOT implement ALL abstract methods, the child class itself must also be declared abstract — otherwise compile error."
      },

      // ── 4. Abstract class in real world ───────────────────────────
      {
        heading: "Abstract Class — Real-World Vehicle Example",
        content: "Abstract classes shine when you have a group of related classes that share common logic but have different implementations for key operations.",
        code: `abstract class Vehicle {
    String brand;
    int    speed;
    String fuelType;

    Vehicle(String brand, int speed, String fuelType) {
        this.brand    = brand;
        this.speed    = speed;
        this.fuelType = fuelType;
    }

    // Abstract — every vehicle refuels differently
    abstract void refuel();

    // Abstract — every vehicle starts differently
    abstract void start();

    // Concrete — same for all vehicles
    void move() {
        System.out.println(brand + " is moving at " + speed + " km/h");
    }

    void info() {
        System.out.printf("Brand:%-10s Speed:%-5d Fuel:%-10s%n", brand, speed, fuelType);
    }
}

class PetrolCar extends Vehicle {
    double tankLitres;
    PetrolCar(String b, int s, double tank) { super(b, s, "Petrol"); this.tankLitres=tank; }

    @Override void start()  { System.out.println(brand + " engine roars: Vroom! 🔥"); }
    @Override void refuel() { System.out.println(brand + ": Filling " + tankLitres + "L petrol at pump"); }
}

class ElectricCar extends Vehicle {
    int batteryKwh;
    ElectricCar(String b, int s, int kwh) { super(b, s, "Electric"); this.batteryKwh=kwh; }

    @Override void start()  { System.out.println(brand + " starts silently: Whirr... ⚡"); }
    @Override void refuel() { System.out.println(brand + ": Charging " + batteryKwh + "kWh battery"); }
}

public class VehicleAbstraction {
    public static void main(String[] args) {
        Vehicle[] fleet = {
            new PetrolCar("Honda",  180, 45),
            new ElectricCar("Tesla", 250, 100)
        };

        for (Vehicle v : fleet) {
            v.info();
            v.start();   // different for each
            v.refuel();  // different for each
            v.move();    // same for all
            System.out.println();
        }
    }
}`,
        output: "Brand:Honda      Speed:180   Fuel:Petrol    \nHonda engine roars: Vroom! 🔥\nHonda: Filling 45.0L petrol at pump\nHonda is moving at 180 km/h\n\nBrand:Tesla      Speed:250   Fuel:Electric  \nTesla starts silently: Whirr... ⚡\nTesla: Charging 100kWh battery\nTesla is moving at 250 km/h"
      },

      // ── 5. Important rules ────────────────────────────────────────
      {
        heading: "Abstract Class — Important Rules to Remember",
        content: "These rules are commonly asked in interviews. Memorise all of them.",
        list: [
          "📌 Rule 1: Use 'abstract' keyword on class: abstract class Animal { }",
          "📌 Rule 2: Abstract method has NO body: abstract void sound(); — no { } at all",
          "📌 Rule 3: CANNOT create object of abstract class: new Animal() → COMPILE ERROR",
          "📌 Rule 4: Subclass MUST implement ALL abstract methods — or it must also be abstract",
          "📌 Rule 5: Abstract class CAN have constructors (called by child via super())",
          "📌 Rule 6: Abstract class CAN have concrete (regular) methods — inherited by children",
          "📌 Rule 7: Abstract class CAN have fields (instance variables)",
          "📌 Rule 8: A class can extend only ONE abstract class (single inheritance rule)"
        ]
      },

      // ── 6. Benefits of abstraction ────────────────────────────────
      {
        heading: "Why Abstraction Matters — Advantages",
        content: "Abstraction is not just a concept — it has concrete practical benefits in real application development.",
        list: [
          "🔒 Security: Users interact with methods but cannot see or modify the implementation",
          "🧹 Simplicity: Complex systems exposed through simple interfaces — Math.sqrt(), Collections.sort()",
          "🔧 Maintainability: Change the implementation without breaking the callers (they only know the contract)",
          "♻️ Reusability: Abstract base provides shared logic; different implementations plug in easily",
          "🧪 Testability: Can create mock/stub implementations of abstract classes for testing",
          "📋 Enforceability: Every subclass is FORCED to implement required methods — no missing implementations"
        ]
      }
    ],

    quiz: [
      { q: "Can you instantiate an abstract class?", options: ["Yes", "No — compile error", "Only with abstract keyword", "Only if it has no abstract methods"], correct: 1 },
      { q: "Concrete subclass of abstract class must:", options: ["Ignore abstract methods", "Implement ALL abstract methods", "Implement only some", "Copy the methods"], correct: 1 },
      { q: "Abstract classes can contain:", options: ["Only abstract methods", "Only concrete methods", "Both abstract and concrete methods", "Neither"], correct: 2 },
      { q: "What is the real-life analogy for abstraction?", options: ["Building a car", "Using a car without knowing engine internals", "Painting a car", "Selling a car"], correct: 1 },
      { q: "Abstract method has:", options: ["A complete body { }", "No body — just declaration with semicolon", "Only return statement", "Only parameters"], correct: 1 },
      { q: "If subclass does not implement ALL abstract methods it must be:", options: ["Ignored", "Also declared abstract", "Deleted", "Made private"], correct: 1 }
    ],

    code: `abstract class Animal {
    String name;
    Animal(String name) { this.name = name; }
    abstract String sound();   // WHAT — every animal must have a sound
    abstract String habitat(); // WHAT — every animal must have a habitat
    void introduce() {         // HOW — shared logic, defined once
        System.out.printf("I am %-10s | Sound: %-12s | Lives in: %s%n",
                          name, sound(), habitat());
    }
}
class Dog  extends Animal { Dog(String n){super(n);} @Override String sound(){return "Woof";} @Override String habitat(){return "Home";} }
class Eagle extends Animal { Eagle(String n){super(n);} @Override String sound(){return "Screech";} @Override String habitat(){return "Sky/Mountains";} }
class Fish  extends Animal { Fish(String n){super(n);} @Override String sound(){return "Blub";} @Override String habitat(){return "Water";} }

public class AbstractionDemo {
    public static void main(String[] args) {
        Animal[] animals = { new Dog("Rex"), new Eagle("Sky"), new Fish("Nemo") };
        for (Animal a : animals) a.introduce();
    }
}`,
    output: "I am Rex        | Sound: Woof         | Lives in: Home\nI am Sky        | Sound: Screech      | Lives in: Sky/Mountains\nI am Nemo       | Sound: Blub         | Lives in: Water"
  },

  "encapsulation": {
    title: "Encapsulation in Java — Complete Guide", module: "oop", duration: "35 min", difficulty: "Intermediate", xp: 125, icon: "🔒",
    intro: "Encapsulation means wrapping data (variables) and methods together into one unit AND restricting direct access to the data from outside. Think of a medicine capsule — the medicine (data) is safely enclosed inside the capsule shell. You take the capsule as a whole; you cannot directly touch the powder inside. Similarly, encapsulation protects the internal data of an object and provides controlled access through methods.",

    sections: [

      // ── 1. Real-life analogy ──────────────────────────────────────
      {
        heading: "What is Encapsulation? — Real Life Understanding",
        content: "Encapsulation hides sensitive data and provides controlled, validated access to it.",
        list: [
          "💊 Medicine capsule: powder hidden inside shell. You can't directly touch it — take the capsule as a whole",
          "🏦 Bank account: balance is private. Cannot directly write balance = 1000000. Must go through deposit()/withdraw()",
          "📱 Phone: internal circuits are sealed. You interact through buttons/touchscreen — controlled interface",
          "🚗 Car engine: sealed under hood. You interact through pedals/steering — cannot directly touch injectors",
          "🔐 Password storage: system stores encrypted form. You never see the raw password — only verify it"
        ],
        note: "Without encapsulation, any part of the program can directly change any variable — a buggy module could corrupt another module's data. Encapsulation prevents this by making each object responsible for its own data."
      },

      // ── 2. Without encapsulation ──────────────────────────────────
      {
        heading: "Without Encapsulation — The Problem",
        content: "When fields are public, any code anywhere can set invalid values. This causes hard-to-find bugs.",
        code: `// ❌ WITHOUT encapsulation — DANGEROUS!
class StudentBad {
    public String name;
    public int age;
    public double marks;
}

public class WithoutEncapsulation {
    public static void main(String[] args) {
        StudentBad s = new StudentBad();

        // Anyone can set ANY value — no validation!
        s.name  = "Rohan";
        s.age   = -5;       // ❌ Negative age — impossible in real life!
        s.marks = 150;      // ❌ Marks > 100 — impossible!

        System.out.println("Name : " + s.name);
        System.out.println("Age  : " + s.age);   // -5 — INVALID but no error!
        System.out.println("Marks: " + s.marks);  // 150 — INVALID but no error!

        // s.age = "twenty"; // TYPE error caught by compiler
        // But LOGICAL errors like -5 age are NOT caught — that's the problem!
    }
}`,
        output: "Name : Rohan\nAge  : -5\nMarks: 150.0"
      },

      // ── 3. With encapsulation ─────────────────────────────────────
      {
        heading: "With Encapsulation — The Solution",
        content: "Use private fields and public getters/setters. The setter validates the input before accepting it — protecting data integrity.",
        code: `// ✅ WITH encapsulation — SAFE!
class Student {

    // PRIVATE fields — cannot be accessed directly from outside
    private String name;
    private int    age;
    private double marks;

    // PUBLIC setter — validates before setting
    public void setName(String name) {
        if (name == null || name.trim().isEmpty()) {
            System.out.println("Error: Name cannot be empty!");
            return;
        }
        this.name = name.trim();
    }

    public void setAge(int age) {
        if (age < 1 || age > 120) {
            System.out.println("Error: Invalid age " + age + ". Must be 1-120.");
            return;
        }
        this.age = age;
    }

    public void setMarks(double marks) {
        if (marks < 0 || marks > 100) {
            System.out.println("Error: Invalid marks " + marks + ". Must be 0-100.");
            return;
        }
        this.marks = marks;
    }

    // PUBLIC getters — read access
    public String getName()  { return name; }
    public int    getAge()   { return age; }
    public double getMarks() { return marks; }

    public void display() {
        System.out.printf("Name: %-10s | Age: %3d | Marks: %.1f%n", name, age, marks);
    }
}

public class WithEncapsulation {
    public static void main(String[] args) {

        Student s = new Student();

        // ✅ Valid values accepted
        s.setName("Rohan");
        s.setAge(22);
        s.setMarks(88.5);
        s.display();

        // ❌ Invalid values REJECTED by setter validation
        s.setAge(-5);    // Error: Invalid age
        s.setMarks(150); // Error: Invalid marks
        s.setName("");   // Error: Name empty

        // Data unchanged — still valid
        s.display();
    }
}`,
        output: "Name: Rohan      | Age:  22 | Marks: 88.5\nError: Invalid age -5. Must be 1-120.\nError: Invalid marks 150.0. Must be 0-100.\nError: Name cannot be empty!\nName: Rohan      | Age:  22 | Marks: 88.5"
      },

      // ── 4. Getters and setters ────────────────────────────────────
      {
        heading: "Getters and Setters — Naming Convention",
        content: "Java follows a strict naming convention for getters and setters. Frameworks like Spring and Hibernate depend on this convention to automatically find your fields.",
        table: {
          headers: ["Field",                 "Getter method",           "Setter method"],
          rows: [
            ["private int age",          "public int getAge()",     "public void setAge(int age)"],
            ["private String name",       "public String getName()", "public void setName(String name)"],
            ["private double balance",    "public double getBalance()","public void setBalance(double b)"],
            ["private boolean isActive",  "public boolean isActive()","public void setActive(boolean b)"],
            ["private String email",      "public String getEmail()", "public void setEmail(String email)"]
          ]
        },
        note: "For boolean fields, the getter is named is__() not get__(). For example: isActive(), isLoggedIn(), isPassed(). This is called the JavaBean convention and is used by every major Java framework."
      },

      // ── 5. Read-only and write-only ───────────────────────────────
      {
        heading: "Read-Only and Write-Only Fields",
        content: "Encapsulation lets you decide: should a field be readable, writable, both, or neither? Provide only the getter for read-only (like an account ID), only the setter for write-only (like a password).",
        code: `class BankAccount {

    // READ-ONLY — generated at creation, never changed
    private final String accountId;

    // READ-WRITE — owner can be updated
    private String ownerName;

    // READ-WRITE with validation — balance changes via deposit/withdraw only
    private double balance;

    // WRITE-ONLY — never read back in plain text (security)
    private String pin;

    public BankAccount(String owner, String pin, double initial) {
        this.accountId = "ACC" + System.currentTimeMillis() % 1000000;
        this.ownerName = owner;
        this.pin       = pin;
        this.balance   = initial;
    }

    // READ-ONLY getter — no setter provided
    public String getAccountId() { return accountId; }

    // READ-WRITE
    public String getOwnerName()           { return ownerName; }
    public void   setOwnerName(String name){ this.ownerName = name; }
    public double getBalance()             { return balance; }

    // No getter for pin — WRITE-ONLY via verify
    public boolean verifyPin(String pin) {
        return this.pin.equals(pin); // returns true/false, never reveals the pin
    }

    public void deposit(double amount) {
        if (amount > 0) { balance += amount; System.out.printf("Deposited ₹%.0f. Balance: ₹%.0f%n", amount, balance); }
    }

    public void withdraw(double amount, String pin) {
        if (!verifyPin(pin))    { System.out.println("❌ Wrong PIN!"); return; }
        if (amount > balance)   { System.out.println("❌ Insufficient funds!"); return; }
        balance -= amount;
        System.out.printf("Withdrew ₹%.0f. Balance: ₹%.0f%n", amount, balance);
    }
}

public class EncapsulationDemo {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount("Rohan", "5678", 50000);

        System.out.println("Account: " + acc.getAccountId());
        System.out.println("Owner  : " + acc.getOwnerName());
        System.out.println("Balance: ₹" + acc.getBalance());
        // System.out.println(acc.pin); // ❌ COMPILE ERROR — pin is private

        acc.deposit(10000);
        acc.withdraw(20000, "5678"); // correct pin
        acc.withdraw(5000,  "0000"); // wrong pin
    }
}`,
        output: "Account: ACC<timestamp>\nOwner  : Rohan\nBalance: ₹50000.0\nDeposited ₹10000. Balance: ₹60000\nWithdrew ₹20000. Balance: ₹40000\n❌ Wrong PIN!"
      },

      // ── 6. Advantages ────────────────────────────────────────────
      {
        heading: "Advantages of Encapsulation",
        content: "Encapsulation is not just a coding style — it has concrete, measurable benefits in real software development.",
        list: [
          "🔐 Data Security: Private fields cannot be modified from outside — protects against accidental corruption",
          "✅ Data Validation: Setters can enforce rules — age must be positive, email must contain @, balance must be >= 0",
          "🔧 Flexibility: You can change internal implementation without breaking external code — callers use same getters/setters",
          "🐛 Easier Debugging: Add logging in setter/getter to track every time a field changes — pinpoint bugs fast",
          "🧪 Better Testing: Each setter can be tested independently — ensure validation works correctly",
          "📦 Modularity: Each class manages its own data — other classes don't need to know internal structure"
        ]
      }
    ],

    quiz: [
      { q: "Which access modifier hides a field from outside the class?", options: ["public", "protected", "private", "default"], correct: 2 },
      { q: "A getter method:", options: ["Sets a field value", "Returns a field value for reading", "Deletes a field", "Validates input"], correct: 1 },
      { q: "Why use setters instead of direct field access?", options: ["Faster code execution", "Allows validation and controlled modification", "Required by Java", "Better memory usage"], correct: 1 },
      { q: "Encapsulation primarily achieves:", options: ["Faster execution", "Data hiding and integrity protection", "Better algorithms", "Thread safety"], correct: 1 },
      { q: "Getter for boolean field 'isActive' should be named:", options: ["getIsActive()", "getActive()", "isActive()", "active()"], correct: 2 },
      { q: "What is a read-only field in encapsulation?", options: ["Has only a setter", "Has only a getter — no setter provided", "Has both getter and setter", "Is public"], correct: 1 }
    ],

    code: `class Temperature {
    private double celsius;

    public Temperature(double c) { setCelsius(c); }

    public void setCelsius(double c) {
        if (c < -273.15) throw new IllegalArgumentException("Below absolute zero! Got: " + c);
        this.celsius = c;
    }
    public double getCelsius()    { return celsius; }
    public double getFahrenheit() { return celsius * 9.0/5 + 32; }
    public double getKelvin()     { return celsius + 273.15; }
    public String toString() {
        return String.format("%.1f°C = %.1f°F = %.1fK", celsius, getFahrenheit(), getKelvin());
    }
}
public class EncapsulationTest {
    public static void main(String[] args) {
        double[] temps = {-273.15, 0, 37, 100};
        for (double t : temps) {
            try { System.out.println(new Temperature(t)); }
            catch(IllegalArgumentException e) { System.out.println("Error: " + e.getMessage()); }
        }
    }
}`,
    output: "-273.1°C = -459.7°F = 0.0K\n0.0°C = 32.0°F = 273.1K\n37.0°C = 98.6°F = 310.1K\n100.0°C = 212.0°F = 373.1K"
  },

  "interfaces": {
    title: "Interfaces", module: "oop", duration: "25 min", difficulty: "Intermediate", xp: 175, icon: "🔌",
    intro: "An interface is a pure contract — it defines WHAT a class must do, not HOW. A class can implement multiple interfaces (solving Java's single inheritance limitation). Since Java 8, interfaces can also have default and static methods with implementations.",
    sections: [
      {
        heading: "Implementing Interfaces",
        content: "Interface methods are implicitly public and abstract. Fields are public, static, and final. A class implementing an interface must implement ALL its abstract methods.",
        code: `interface Drawable  { void draw(); }
interface Resizable  { void resize(double factor); }
interface Exportable {
    void export(String format);
    default String supportedFormats() { return "PNG, SVG, PDF"; } // default method
    static String version() { return "v2.0"; }                    // static method
}

class Canvas implements Drawable, Resizable, Exportable {
    String name; double width, height;
    Canvas(String name, double w, double h) { this.name=name; width=w; height=h; }

    @Override public void draw() {
        System.out.printf("Drawing '%s' (%.0fx%.0f)%n", name, width, height);
    }
    @Override public void resize(double factor) {
        width *= factor; height *= factor;
        System.out.printf("Resized → %.0fx%.0f%n", width, height);
    }
    @Override public void export(String fmt) {
        System.out.println("Exporting '" + name + "' as " + fmt);
    }
}

public class InterfaceDemo {
    public static void main(String[] args) {
        Canvas c = new Canvas("Logo", 800, 600);
        c.draw();
        c.resize(0.5);
        c.export("PNG");
        System.out.println("Supports: " + c.supportedFormats()); // default method
        System.out.println("Version: " + Exportable.version());   // static method

        Drawable d = c; // interface as type (polymorphism!)
        d.draw();
    }
}`,
        output: "Drawing 'Logo' (800x600)\nResized → 400x300\nExporting 'Logo' as PNG\nSupports: PNG, SVG, PDF\nVersion: v2.0\nDrawing 'Logo' (400x300)"
      }
    ],
    quiz: [
      { q: "How many interfaces can a class implement?", options: ["One","Two","Unlimited","Max 10"], correct: 2 },
      { q: "Interface fields are by default:", options: ["private instance","public static final","protected abstract","package-private"], correct: 1 },
      { q: "Java 8 added to interfaces:", options: ["Abstract methods","Default and static methods","Constructors","Private fields"], correct: 1 },
      { q: "Keyword to implement an interface:", options: ["extends","implements","uses","interface"], correct: 1 }
    ],
    code: `interface Shape {
    double area();
    double perimeter();
    default void describe() {
        System.out.printf("%s → area=%.2f, perimeter=%.2f%n",
            getClass().getSimpleName(), area(), perimeter());
    }
}
class Rect implements Shape {
    double w, h;
    Rect(double w, double h) { this.w=w; this.h=h; }
    public double area()      { return w*h; }
    public double perimeter() { return 2*(w+h); }
}
class Circle implements Shape {
    double r;
    Circle(double r) { this.r=r; }
    public double area()      { return Math.PI*r*r; }
    public double perimeter() { return 2*Math.PI*r; }
}
public class ShapeInterface {
    public static void main(String[] args) {
        Shape[] shapes = { new Rect(4,6), new Circle(5) };
        for (Shape s : shapes) s.describe();
    }
}`,
    output: "Rect → area=24.00, perimeter=20.00\nCircle → area=78.54, perimeter=31.42"
  },

  "static-keyword": {
    title: "Static Keyword", module: "oop", duration: "20 min", difficulty: "Intermediate", xp: 125, icon: "⚡",
    intro: "'static' means a member belongs to the CLASS itself, not to any specific instance. Static fields are shared across all objects. Static methods can be called without creating an object. Static blocks run once when the class is loaded by the JVM.",
    sections: [
      {
        heading: "Static Fields, Methods & Blocks",
        content: "Use static for: shared counters, utility/helper methods (like Math.sqrt), constants (static final), factory methods, and the entry-point main().",
        code: `public class Counter {
    private static int total = 0;       // shared by ALL objects
    static final int MAX = 100;          // class constant

    // Static initializer: runs once when class is first loaded
    static {
        System.out.println("[Class loaded] MAX = " + MAX);
    }

    private int id;
    private String name;

    Counter(String name) {
        total++;
        this.id   = total;
        this.name = name;
    }

    // Call without any object: Counter.getTotal()
    static int getTotal()           { return total; }
    static boolean isMaxReached()   { return total >= MAX; }
    static void reset()             { total = 0; }

    void display() {
        System.out.println("#" + id + ": " + name + " | Total: " + total);
    }

    public static void main(String[] args) {
        System.out.println("Before: " + Counter.getTotal()); // 0
        Counter a = new Counter("Alpha");
        Counter b = new Counter("Beta");
        Counter c = new Counter("Gamma");
        a.display(); b.display(); c.display();
        System.out.println("Total: " + Counter.getTotal());           // 3
        System.out.println("Max reached: " + Counter.isMaxReached()); // false
    }
}`,
        output: "[Class loaded] MAX = 100\nBefore: 0\n#1: Alpha | Total: 3\n#2: Beta | Total: 3\n#3: Gamma | Total: 3\nTotal: 3\nMax reached: false"
      }
    ],
    quiz: [
      { q: "Static members belong to:", options: ["Each object","The class itself","Only the first object","Subclasses"], correct: 1 },
      { q: "Can a static method access instance (non-static) fields?", options: ["Yes","No","Yes with 'this'","Only if public"], correct: 1 },
      { q: "Static initializer block runs:", options: ["Every object creation","Once when class is loaded","When main() starts","Never"], correct: 1 },
      { q: "Call static method greet() in class Utils:", options: ["new Utils().greet()","Utils.greet()","Utils::greet()","static.greet()"], correct: 1 }
    ],
    code: `class MathUtils {
    static final double PI = Math.PI;
    static double circleArea(double r) { return PI * r * r; }
    static long power(long base, int exp) {
        long result = 1;
        for (int i = 0; i < exp; i++) result *= base;
        return result;
    }
    static boolean isPerfect(int n) {
        int sum = 0;
        for (int i = 1; i < n; i++) if (n % i == 0) sum += i;
        return sum == n;
    }
}
public class StaticDemo {
    public static void main(String[] args) {
        System.out.printf("Circle r=5: %.2f%n", MathUtils.circleArea(5));
        System.out.println("2^10 = " + MathUtils.power(2, 10));
        for (int n : new int[]{6, 12, 28, 496})
            System.out.println(n + " is perfect: " + MathUtils.isPerfect(n));
    }
}`,
    output: "Circle r=5: 78.54\n2^10 = 1024\n6 is perfect: true\n12 is perfect: false\n28 is perfect: true\n496 is perfect: true"
  }
};
