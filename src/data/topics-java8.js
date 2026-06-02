export const JAVA8_TOPICS = {

  "lambda": {
    title: "Lambda Expressions — Complete Guide", module: "java8", duration: "45 min", difficulty: "Advanced", xp: 200, icon: "λ",
    intro: "A Lambda Expression is a short, nameless function you can write in one line and pass around like a value. Before Java 8, every time you wanted to pass behaviour to a method, you had to write a full anonymous class full of boilerplate. Lambdas eliminate all that ceremony — you focus only on the logic. Think of a lambda like a sticky note instruction: instead of a 10-page document explaining how to add two numbers, you just write: (a, b) → a + b. That IS a lambda. A lambda can only be used where a functional interface (exactly ONE abstract method) is expected.",

    sections: [
      {
        heading: "The Problem Before Java 8",
        content: "To understand WHY lambdas exist, see what had to be written before them. The anonymous inner class approach required 8 lines where only 1 was useful logic.",
        code: `import java.util.*;

public class BeforeLambda {
    public static void main(String[] args) {

        List<String> names = Arrays.asList("Charlie","Alice","Bob","Diana");

        // ❌ JAVA 7 — Full anonymous class for ONE line of logic
        Collections.sort(names, new Comparator<String>() {
            @Override
            public int compare(String a, String b) {
                return a.compareTo(b); // only THIS line is useful
            }                          // everything else is BOILERPLATE
        });
        System.out.println("Anonymous class: " + names);

        // ✅ JAVA 8 Lambda — same result in ONE line
        names.sort((a, b) -> a.compareTo(b));
        System.out.println("Lambda         : " + names);

        // ✅ Even shorter — method reference
        names.sort(String::compareTo);
        System.out.println("Method ref     : " + names);
    }
}`,
        output: "Anonymous class: [Alice, Bob, Charlie, Diana]\nLambda         : [Alice, Bob, Charlie, Diana]\nMethod ref     : [Alice, Bob, Charlie, Diana]",
        note: "KEY INSIGHT: A lambda replaces an anonymous class that has exactly ONE method. It focuses only on the logic — not the ceremony around it."
      },
      {
        heading: "Lambda Syntax — All Forms",
        content: "Lambda syntax varies by number of parameters and complexity of body. The compiler infers parameter types from the functional interface. The arrow -> reads as 'goes to' or 'produces'.",
        code: `import java.util.function.*;

public class LambdaSyntax {
    public static void main(String[] args) {

        // FORM 1: No parameters
        Runnable r = () -> System.out.println("Hello, Java 8!");
        r.run();

        // FORM 2: One parameter (parentheses optional)
        Consumer<String> print  = s -> System.out.println(s);
        Consumer<String> printT = (String s) -> System.out.println(s); // explicit type
        print.accept("one param");

        // FORM 3: Two parameters — expression body (no return keyword)
        Comparator<Integer> cmp = (a, b) -> a - b;
        System.out.println("Compare: " + cmp.compare(5, 3)); // 2

        // FORM 4: Explicit types
        Comparator<String> cmp2 = (String a, String b) -> a.compareTo(b);

        // FORM 5: Block body — MUST use explicit return
        Function<Integer, Integer> square = n -> {
            int result = n * n;
            return result;
        };
        System.out.println("Square of 5: " + square.apply(5)); // 25

        // Quick summary of all 5 types
        Runnable   r2  = () -> System.out.println("no params");
        Consumer<String> c = name -> System.out.println("Hello " + name);
        Supplier<String> s2 = () -> "Good Morning!";
        Function<Integer,Integer> doubler = n -> n * 2;
        Predicate<Integer> isEven = n -> n % 2 == 0;
        System.out.println(doubler.apply(7));     // 14
        System.out.println(isEven.test(4));       // true
        System.out.println(isEven.test(7));       // false
    }
}`,
        output: "Hello, Java 8!\none param\nCompare: 2\nSquare of 5: 25\n14\ntrue\nfalse"
      },
      {
        heading: "Real-World Lambda Examples",
        content: "Lambdas show up everywhere in real Java code. Here are the most common patterns you will use daily — forEach, removeIf, sort, Comparator, and Map.forEach.",
        code: `import java.util.*;
import java.util.stream.*;
import java.util.function.*;

public class RealWorldLambdas {
    public static void main(String[] args) {

        List<Integer> numbers = new ArrayList<>(Arrays.asList(1,2,3,4,5,6,7,8,9,10));

        // 1. forEach with index
        List<String> fruits = Arrays.asList("Apple","Banana","Cherry","Date");
        IntStream.range(0, fruits.size())
            .forEach(i -> System.out.println((i+1) + ". " + fruits.get(i)));

        // 2. removeIf — remove evens
        numbers.removeIf(n -> n % 2 == 0);
        System.out.println("Odd only    : " + numbers);

        // 3. replaceAll — double all
        List<Integer> doubled = new ArrayList<>(Arrays.asList(1,2,3,4,5));
        doubled.replaceAll(n -> n * 2);
        System.out.println("Doubled     : " + doubled);

        // 4. Sort by length then alphabetically (chained Comparator)
        List<String> words = new ArrayList<>(Arrays.asList("banana","apple","kiwi","mango","fig"));
        words.sort((a, b) -> a.length() != b.length()
                            ? a.length() - b.length()
                            : a.compareTo(b));
        System.out.println("By length   : " + words);

        // 5. Lambda as Strategy Pattern — different behaviours at runtime
        interface DiscountStrategy { double apply(double price); }
        DiscountStrategy student    = price -> price * 0.80;  // 20% off
        DiscountStrategy vip        = price -> price * 0.70;  // 30% off
        DiscountStrategy noDiscount = price -> price;

        double base = 1000;
        System.out.printf("Student     : ₹%.0f%n", student.apply(base));
        System.out.printf("VIP         : ₹%.0f%n", vip.apply(base));
        System.out.printf("Full price  : ₹%.0f%n", noDiscount.apply(base));

        // 6. Map.forEach
        Map<String,Integer> scores = new LinkedHashMap<>();
        scores.put("Alice",95); scores.put("Bob",87); scores.put("Charlie",92);
        scores.forEach((name, score) ->
            System.out.printf("  %-8s: %d (%s)%n", name, score, score>=90?"A":"B"));
    }
}`,
        output: "1. Apple\n2. Banana\n3. Cherry\n4. Date\nOdd only    : [1, 3, 5, 7, 9]\nDoubled     : [2, 4, 6, 8, 10]\nBy length   : [fig, kiwi, apple, mango, banana]\nStudent     : ₹800\nVIP         : ₹700\nFull price  : ₹1000\n  Alice   : 95 (A)\n  Bob     : 87 (B)\n  Charlie : 92 (A)"
      },
      {
        heading: "Advanced Lambdas — Composition and Capture",
        content: "Function composition with andThen/compose builds powerful pipelines. Lambda capture means using outer variables — they must be effectively final (never reassigned after initial assignment).",
        code: `import java.util.function.*;
import java.util.*;

public class AdvancedLambdas {
    public static void main(String[] args) {

        // Function composition pipeline — andThen chains left → right
        Function<String, String> trim  = String::trim;
        Function<String, String> upper = String::toUpperCase;
        Function<String, Integer> length = String::length;

        Function<String, Integer> pipeline = trim.andThen(upper).andThen(length);
        System.out.println(pipeline.apply(" hello world ")); // 11

        // Closure — lambda capturing outer variable
        String prefix = "USER_"; // effectively final — never reassigned
        Function<String, String> addPrefix = name -> prefix + name.toUpperCase();
        System.out.println(addPrefix.apply("alice")); // USER_ALICE

        // Predicate chaining
        Predicate<String> notEmpty    = s -> !s.isEmpty();
        Predicate<String> longEnough  = s -> s.length() >= 5;
        Predicate<String> noSpaces    = s -> !s.contains(" ");
        Predicate<String> validInput  = notEmpty.and(longEnough).and(noSpaces);

        System.out.println(validInput.test(""));       // false (empty)
        System.out.println(validInput.test("abc"));    // false (too short)
        System.out.println(validInput.test("hello world")); // false (has space)
        System.out.println(validInput.test("hello")); // true ✓

        // Employee filter — real-world use of Predicate composition
        record Employee(String name, String dept, double salary) {}
        List<Employee> employees = List.of(
            new Employee("Alice",   "Engineering", 95000),
            new Employee("Bob",     "Marketing",   60000),
            new Employee("Charlie", "Engineering", 85000),
            new Employee("Eve",     "Engineering", 110000)
        );
        Predicate<Employee> isEng     = e -> e.dept().equals("Engineering");
        Predicate<Employee> isHighPay = e -> e.salary() > 90000;
        System.out.println("High-pay Engineers:");
        employees.stream()
            .filter(isEng.and(isHighPay))
            .map(Employee::name)
            .forEach(n -> System.out.println("  " + n));
    }
}`,
        output: "11\nUSER_ALICE\nfalse\nfalse\nfalse\ntrue\nHigh-pay Engineers:\n  Alice\n  Eve"
      },
      {
        heading: "How Lambdas Work Internally (invokedynamic)",
        content: "Understanding the internals distinguishes you in interviews. Lambdas are NOT compiled to anonymous classes — they use a JVM mechanism called invokedynamic which is faster and more memory-efficient.",
        list: [
          "1️⃣ You write: (a, b) -> a + b",
          "2️⃣ javac compiles it to an INVOKEDYNAMIC bytecode instruction (NOT a .class file like anonymous class)",
          "3️⃣ First time the lambda runs: JVM calls LambdaMetafactory.metafactory() — dynamically generates a class implementing the functional interface and caches it",
          "4️⃣ NON-CAPTURING lambda (uses NO outer variables): created ONCE, reused every call — like a singleton. Very fast.",
          "5️⃣ CAPTURING lambda (uses outer variables): new instance per invocation — slight overhead",
          "📊 Anonymous class → extra .class file at compile time, new object on every call",
          "📊 Lambda → class generated at RUNTIME on first use, non-capturing lambdas reused",
          "⚡ Performance: non-capturing lambdas are FASTER than anonymous classes — no heap pressure"
        ]
      },
      {
        heading: "Common Lambda Mistakes — Avoid These",
        content: "These mistakes cause compile errors or unexpected behaviour. Study each one carefully.",
        list: [
          "❌ Mistake 1: return keyword in expression body\n  Function<Integer,Integer> f = n -> return n*2; // COMPILE ERROR\n  ✅ Fix: n -> n*2  OR  n -> { return n*2; }",
          "❌ Mistake 2: Modifying a captured local variable\n  int count = 0; () -> count++; // ERROR: not effectively final\n  ✅ Fix: int[] arr = {0}; () -> arr[0]++; // array ref is final, contents can change",
          "❌ Mistake 3: Forgetting return in block body\n  Function<Integer,Integer> sq = n -> { n * n; }; // ERROR\n  ✅ Fix: n -> { return n * n; }",
          "❌ Mistake 4: Using lambda where interface has multiple abstract methods\n  Lambda only works with EXACTLY ONE abstract method (functional interface)",
          "❌ Mistake 5: Type inference failure\n  var fn = (x) -> x + 1; // ERROR: can't infer type\n  ✅ Fix: Function<Integer,Integer> fn = x -> x + 1;"
        ],
        code: `import java.util.function.*;

public class LambdaMistakes {
    public static void main(String[] args) {

        // ✅ CORRECT expression body (no return)
        Function<Integer,Integer> sq = n -> n * n;
        System.out.println("Square: " + sq.apply(5)); // 25

        // ✅ CORRECT block body (with return)
        Function<Integer,Integer> cube = n -> {
            int result = n * n * n;
            return result;
        };
        System.out.println("Cube  : " + cube.apply(3)); // 27

        // ✅ CORRECT effectively-final capture
        String greeting = "Hello"; // never reassigned — effectively final
        Consumer<String> greet = name -> System.out.println(greeting + " " + name);
        greet.accept("Alice"); // Hello Alice

        // ✅ CORRECT array trick for counter
        int[] counter = {0};
        java.util.List.of("A","B","C").forEach(item -> {
            counter[0]++;
            System.out.println(counter[0] + ": " + item);
        });
    }
}`,
        output: "Square: 25\nCube  : 27\nHello Alice\n1: A\n2: B\n3: C"
      }
    ],
    quiz: [
      { q: "What does the -> operator do in a lambda?", options: ["Creates a new object", "Separates parameters from the body — reads as 'goes to'", "Compares two values", "Declares a return type"], correct: 1 },
      { q: "Lambda can only be used where:", options: ["Any type is expected", "A functional interface is expected", "An abstract class exists", "An anonymous class exists"], correct: 1 },
      { q: "Which is valid expression-body lambda syntax?", options: ["n -> return n*2", "(n) -> { n*2 }", "(n) -> n*2", "lambda n -> n*2"], correct: 2 },
      { q: "What is 'effectively final'?", options: ["Declared with final keyword", "Variable never reassigned after first assignment", "Static variable", "Parameter variable"], correct: 1 },
      { q: "Non-capturing lambda (no outer vars) is created:", options: ["Every call — new instance", "Once and reused — like a singleton", "Twice per method", "Never"], correct: 1 },
      { q: "Lambdas internally use which JVM mechanism?", options: ["Reflection", "Anonymous class .class files", "invokedynamic + LambdaMetafactory", "Bytecode manipulation"], correct: 2 }
    ],
    code: `import java.util.*;
import java.util.function.*;
import java.util.stream.*;
public class LambdaChallenge {
    public static void main(String[] args) {
        List<Integer> nums = Arrays.asList(1,2,3,4,5,6,7,8,9,10);

        // Sum of squares of even numbers
        int result = nums.stream()
            .filter(n -> n % 2 == 0)
            .map(n -> n * n)
            .reduce(0, Integer::sum);
        System.out.println("Sum of even squares: " + result); // 220

        // Lambda stored in variable — reusable
        Consumer<String> shout = s -> System.out.println(s.toUpperCase() + "!");
        List.of("java","lambdas","are","awesome").forEach(shout);

        // Predicate composition
        Predicate<Integer> isEven  = n -> n % 2 == 0;
        Predicate<Integer> isGt5   = n -> n > 5;
        long count = nums.stream().filter(isEven.and(isGt5)).count();
        System.out.println("Even AND > 5: " + count + " numbers");
    }
}`,
    output: "Sum of even squares: 220\nJAVA!\nLAMBDAS!\nARE!\nAWESOME!\nEven AND > 5: 3 numbers"
  },

  "functional-interfaces": {
    title: "Functional Interfaces — Complete Guide", module: "java8", duration: "40 min", difficulty: "Advanced", xp: 175, icon: "🔧",
    intro: "A Functional Interface is an interface that has exactly ONE abstract method. It is the backbone of lambda expressions — every lambda must target a functional interface. Java 8 introduced the @FunctionalInterface annotation to enforce this rule at compile time. The java.util.function package provides ~43 ready-made functional interfaces. The four primary ones are: Predicate (test → boolean), Function (transform → different type), Consumer (use → void), and Supplier (produce → value).",

    sections: [
      {
        heading: "Rules + All Built-in Interfaces Reference",
        content: "A functional interface has EXACTLY ONE abstract method. It CAN have default methods, static methods, and Object methods (equals, hashCode, toString) — none of these count as the abstract method.",
        table: {
          headers: ["Interface", "Abstract Method", "Input → Output", "Use Case"],
          rows: [
            ["Predicate<T>",      "test(T t)",          "T → boolean",   "Test/Filter — isAdult, isValid"],
            ["Function<T,R>",     "apply(T t)",         "T → R",         "Transform — String to Integer"],
            ["Consumer<T>",       "accept(T t)",        "T → void",      "Use/Print — no return value"],
            ["Supplier<T>",       "get()",              "none → T",      "Produce/Create — lazy factory"],
            ["UnaryOperator<T>",  "apply(T t)",         "T → T",         "Transform same type — trim, double"],
            ["BinaryOperator<T>", "apply(T t1, T t2)",  "T,T → T",       "Combine two same-type — max, sum"],
            ["BiFunction<T,U,R>", "apply(T t, U u)",    "T,U → R",       "Two inputs, one output"],
            ["BiPredicate<T,U>",  "test(T t, U u)",     "T,U → boolean", "Test condition on two inputs"],
            ["BiConsumer<T,U>",   "accept(T t, U u)",   "T,U → void",    "Use two inputs, no result"],
            ["Runnable",          "run()",              "none → void",   "Task with no input/output"],
            ["Callable<V>",       "call()",             "none → V",      "Task returning value (throws checked)"]
          ]
        }
      },
      {
        heading: "Predicate — Testing Conditions",
        content: "Predicate<T> tests a condition and returns true or false. The most powerful feature is combining predicates with and(), or(), negate() — building complex conditions from simple ones.",
        code: `import java.util.function.*;
import java.util.*;
import java.util.stream.*;

public class PredicateDemo {
    public static void main(String[] args) {

        Predicate<Integer> isAdult    = age -> age >= 18;
        Predicate<String>  isLong     = s -> s.length() > 8;
        Predicate<Integer> isPositive = n -> n > 0;

        System.out.println("20 isAdult       : " + isAdult.test(20));   // true
        System.out.println("15 isAdult       : " + isAdult.test(15));   // false
        System.out.println("Hi isLong        : " + isLong.test("Hi"));  // false

        // Combining predicates — and() / or() / negate()
        Predicate<Integer> adultAndPos = isAdult.and(isPositive);   // both must be true
        Predicate<Integer> adultOrNeg  = isAdult.or(n -> n < 0);   // either true
        Predicate<Integer> isMinor     = isAdult.negate();           // NOT adult

        System.out.println("20 adultAndPos   : " + adultAndPos.test(20));  // true
        System.out.println("-20 adultAndPos  : " + adultAndPos.test(-20)); // false
        System.out.println("-5 adultOrNeg    : " + adultOrNeg.test(-5));   // true
        System.out.println("15 isMinor       : " + isMinor.test(15));      // true

        // Predicate with Stream filter
        List<String> names = List.of("Alice","Bob","Christopher","Di","Elizabeth","Amy");
        Predicate<String> longName = n -> n.length() > 5;
        List<String> result = names.stream()
            .filter(longName)
            .collect(Collectors.toList());
        System.out.println("Long names       : " + result);
    }
}`,
        output: "20 isAdult       : true\n15 isAdult       : false\nHi isLong        : false\n20 adultAndPos   : true\n-20 adultAndPos  : false\n-5 adultOrNeg    : true\n15 isMinor       : true\nLong names       : [Christopher, Elizabeth]"
      },
      {
        heading: "Function — Transforming Values",
        content: "Function<T,R> transforms a T into an R. andThen() chains left-to-right. compose() chains right-to-left. Build clean data transformation pipelines.",
        code: `import java.util.function.*;

public class FunctionDemo {
    public static void main(String[] args) {

        Function<String, Integer> strLen  = String::length;
        Function<Integer, String> numToStr= n -> "Number: " + n;
        Function<String, String>  toUpper = String::toUpperCase;

        System.out.println(strLen.apply("Hello"));      // 5
        System.out.println(numToStr.apply(42));          // Number: 42

        // andThen — LEFT to RIGHT pipeline
        Function<String, String>  clean   = s -> s.trim();
        Function<String, String>  upper   = s -> s.toUpperCase();
        Function<String, Integer> getLen  = s -> s.length();

        Function<String, Integer> pipeline = clean.andThen(upper).andThen(getLen);
        System.out.println(pipeline.apply("  hello  ")); // 5

        // compose — RIGHT to LEFT (opposite of andThen)
        Function<Integer, Integer> times2  = n -> n * 2;
        Function<Integer, Integer> plus10  = n -> n + 10;
        // plus10.compose(times2) = times2 FIRST, then plus10
        System.out.println(plus10.compose(times2).apply(5)); // (5*2)+10 = 20

        // Difference: Function vs UnaryOperator
        // Function<T,R>: input and output can be DIFFERENT types
        Function<String, Integer> f = String::length; // String → Integer

        // UnaryOperator<T>: input and output MUST be SAME type (extends Function<T,T>)
        UnaryOperator<String> trimmer = String::trim;    // String → String
        UnaryOperator<Integer> doubler = n -> n * 2;     // Integer → Integer

        System.out.println(trimmer.apply("  hello  ")); // hello
        System.out.println(doubler.apply(7));            // 14
    }
}`,
        output: "5\nNumber: 42\n5\n20\nhello\n14"
      },
      {
        heading: "Consumer, Supplier, BinaryOperator, BiFunction",
        content: "Consumer accepts input with no return. Supplier produces output with no input. BinaryOperator combines two same-type values. BiFunction takes two different inputs.",
        code: `import java.util.function.*;
import java.util.*;

public class MoreInterfaces {
    public static void main(String[] args) {

        // Consumer<T> — accepts value, returns nothing
        Consumer<String> print    = s -> System.out.println(s);
        Consumer<String> printUp  = s -> System.out.println(s.toUpperCase());
        print.accept("hello");
        print.andThen(printUp).accept("java"); // chain: both run

        System.out.println();

        // Supplier<T> — no input, produces a value
        Supplier<String>       greeting = () -> "Good Morning!";
        Supplier<List<String>> newList  = ArrayList::new;
        Supplier<Double>       random   = Math::random;
        System.out.println(greeting.get());           // Good Morning!
        System.out.println(newList.get().getClass().getSimpleName()); // ArrayList

        System.out.println();

        // BinaryOperator<T> — two same-type → same type
        BinaryOperator<Integer> max    = (a, b) -> a > b ? a : b;
        BinaryOperator<String>  concat = (a, b) -> a + " " + b;
        System.out.println("max(10,25)         : " + max.apply(10, 25)); // 25
        System.out.println("concat             : " + concat.apply("Hello","World"));

        // BiFunction<T,U,R> — two DIFFERENT inputs → one output
        BiFunction<String, Integer, String> repeat  = (s, n) -> s.repeat(n);
        BiFunction<String, Integer, String> padRight = (s, w) ->
            String.format("%-" + w + "s", s);
        System.out.println("repeat(Ha,3)       : " + repeat.apply("Ha", 3));
        System.out.println("padRight(Java,10)  : '" + padRight.apply("Java", 10) + "'");

        // BiConsumer<T,U> — two inputs, no return
        BiConsumer<String, Integer> printEntry = (k, v) ->
            System.out.println("  " + k + " = " + v);
        Map<String,Integer> ages = Map.of("Alice",30,"Bob",25);
        ages.forEach(printEntry);
    }
}`,
        output: "hello\njava\nJAVA\n\nGood Morning!\nArrayList\n\nmax(10,25)         : 25\nconcat             : Hello World\nrepeat(Ha,3)       : HaHaHa\npadRight(Java,10)  : 'Java      '\n  Alice = 30\n  Bob = 25"
      },
      {
        heading: "Custom Functional Interface with @FunctionalInterface",
        content: "When none of the built-in interfaces fit your domain, create your own. @FunctionalInterface makes the compiler enforce exactly one abstract method.",
        code: `// @FunctionalInterface — compiler enforces exactly 1 abstract method
@FunctionalInterface
interface MathOp {
    int operate(int a, int b); // single abstract method

    // default and static methods ARE ALLOWED
    default String describe() { return "Math operation on two ints"; }
    static MathOp add()       { return (a, b) -> a + b; }
}

@FunctionalInterface
interface Validator<T> {
    boolean validate(T value);
    default Validator<T> and(Validator<T> other) {
        return value -> this.validate(value) && other.validate(value);
    }
}

public class CustomFI {
    static void calculate(int a, int b, MathOp op) {
        System.out.printf("%d op %d = %d%n", a, b, op.operate(a, b));
    }
    public static void main(String[] args) {
        MathOp add  = (a, b) -> a + b;
        MathOp mul  = (a, b) -> a * b;
        MathOp max  = (a, b) -> Math.max(a, b);
        MathOp pow  = (a, b) -> (int) Math.pow(a, b);

        calculate(5, 3, add);              // 5 op 3 = 8
        calculate(5, 3, mul);              // 5 op 3 = 15
        calculate(5, 3, max);              // 5 op 3 = 5
        calculate(2, 8, pow);              // 2 op 8 = 256
        System.out.println(add.describe()); // Math operation on two ints
        calculate(10, 5, MathOp.add());    // static factory: 15

        // Custom Validator chaining
        Validator<String> notEmpty  = s -> !s.isEmpty();
        Validator<String> minLen    = s -> s.length() >= 5;
        Validator<String> noSpaces  = s -> !s.contains(" ");
        Validator<String> fullValid = notEmpty.and(minLen).and(noSpaces);

        System.out.println(fullValid.validate("hello"));       // true
        System.out.println(fullValid.validate("hi"));          // false (too short)
        System.out.println(fullValid.validate("hello world")); // false (has space)
    }
}`,
        output: "5 op 3 = 8\n5 op 3 = 15\n5 op 3 = 5\n2 op 8 = 256\nMath operation on two ints\n10 op 5 = 15\ntrue\nfalse\nfalse"
      }
    ],
    quiz: [
      { q: "Predicate<T> abstract method:", options: ["apply(T)", "test(T) → boolean", "accept(T)", "get()"], correct: 1 },
      { q: "Supplier<T> abstract method:", options: ["apply(T)", "test(T)", "accept(T)", "get() → T (no input)"], correct: 3 },
      { q: "Consumer<T> return type:", options: ["T", "boolean", "void — no return", "Optional<T>"], correct: 2 },
      { q: "Function vs UnaryOperator:", options: ["Same thing", "Function: T→R (can differ). UnaryOperator: T→T (must be same type)", "UnaryOperator is faster", "No difference"], correct: 1 },
      { q: "@FunctionalInterface annotation:", options: ["Required for all interfaces", "Optional — but enforces 1 abstract method at compile time", "Makes interface thread-safe", "Allows multiple abstract methods"], correct: 1 },
      { q: "Predicate.and() internally:", options: ["Uses && inside one lambda", "Returns new Predicate evaluating both — short-circuits if first is false", "Modifies original predicates", "Requires both to be pure"], correct: 1 }
    ],
    code: `import java.util.function.*;
import java.util.*;
import java.util.stream.*;
public class FIChallenge {
    public static void main(String[] args) {
        // Predicate composition — filter valid usernames
        Predicate<String> notNull  = s -> s != null;
        Predicate<String> minLen   = s -> s.length() >= 3;
        Predicate<String> noSpaces = s -> !s.contains(" ");
        Predicate<String> valid    = notNull.and(minLen).and(noSpaces);

        List<String> inputs = Arrays.asList("alice","ab","hello world",null,"rohan","ok");
        List<String> validNames = inputs.stream()
            .filter(s -> s != null)
            .filter(valid)
            .collect(Collectors.toList());
        System.out.println("Valid names: " + validNames);

        // Function pipeline: parse → validate → format
        Function<String, Integer> parse   = Integer::parseInt;
        Function<Integer, String> format  = n -> n > 0 ? "+" + n : String.valueOf(n);
        Function<String, String>  pipeline = s -> format.apply(parse.apply(s));
        List.of("42","-5","100","-99").forEach(s -> System.out.println(s + " → " + pipeline.apply(s)));
    }
}`,
    output: "Valid names: [alice, rohan]\n42 → +42\n-5 → -5\n100 → +100\n-99 → -99"
  },

  "streams": {
    title: "Streams API — Complete Guide", module: "java8", duration: "45 min", difficulty: "Advanced", xp: 225, icon: "🌊",
    intro: "A Stream is a sequence of elements that supports a pipeline of operations. Think of it as a factory conveyor belt — raw items go in one end, each station does one job (filter, transform, count), and the final product comes out the other end. KEY RULES: 1) Streams are LAZY — intermediate operations run only when a terminal operation is called. 2) Streams are ONE-USE — once consumed, cannot be reused. 3) Original collection is NOT modified. A pipeline has: Source → Intermediate Ops (zero or more) → Terminal Op (exactly one).",

    sections: [
      {
        heading: "Stream Pipeline — Visualised",
        content: "Understanding the pipeline structure is the foundation of everything. The key insight is that intermediate ops are LAZY — they create a recipe, not results.",
        code: `import java.util.*;
import java.util.stream.*;

public class StreamPipeline {
    public static void main(String[] args) {

        List<String> names = Arrays.asList(
            "Alice","Bob","Anna","Charlie","Beth","Aaron","Diana");

        // Full pipeline: source → filter → map → sorted → collect
        List<String> result = names.stream()           // 1. SOURCE
            .filter(n -> n.startsWith("A"))             // 2. INTERMEDIATE (lazy)
            .map(String::toUpperCase)                   // 3. INTERMEDIATE (lazy)
            .sorted()                                   // 4. INTERMEDIATE (lazy)
            .collect(Collectors.toList());              // 5. TERMINAL — triggers execution

        System.out.println("A-names: " + result); // [AARON, ALICE, ANNA]

        // Prove laziness — filter only runs when collect() is called
        System.out.println("Creating lazy stream (no output yet):");
        Stream<String> lazyStream = names.stream()
            .filter(n -> {
                System.out.println("  checking: " + n);
                return n.length() > 4;
            });
        System.out.println("Triggering with collect():");
        List<String> longNames = lazyStream.collect(Collectors.toList());
        System.out.println("Result: " + longNames);

        // Short-circuit optimisation — limit stops early
        System.out.println("\nWith limit(2) — stops after 2 matches:");
        names.stream()
            .filter(n -> {
                System.out.println("  checking: " + n);
                return n.length() > 3;
            })
            .limit(2)
            .collect(Collectors.toList());
    }
}`,
        output: "A-names: [AARON, ALICE, ANNA]\nCreating lazy stream (no output yet):\nTriggling with collect():\n  checking: Alice\n  checking: Bob\n  checking: Anna\n  checking: Charlie\n  checking: Beth\n  checking: Aaron\n  checking: Diana\nResult: [Alice, Charlie, Beth, Aaron, Diana]\n\nWith limit(2) — stops after 2 matches:\n  checking: Alice\n  checking: Bob\n  checking: Anna\n  checking: Charlie"
      },
      {
        heading: "Creating Streams — 6 Ways",
        content: "Streams can be created from collections, arrays, specific values, infinite generators, and primitive ranges.",
        code: `import java.util.*;
import java.util.stream.*;

public class CreatingStreams {
    public static void main(String[] args) {

        // 1. From Collection
        List<String> list = List.of("a","b","c");
        list.stream().forEach(s -> System.out.print(s + " "));
        System.out.println();

        // 2. From Array
        int[] arr = {1,2,3,4,5};
        System.out.println("Array sum  : " + Arrays.stream(arr).sum()); // 15

        // 3. Stream.of() — direct values
        Stream.of("Alice","Bob","Charlie").forEach(System.out::println);

        // 4. Stream.iterate() — infinite, with seed + function
        System.out.print("Evens      : ");
        Stream.iterate(0, n -> n + 2).limit(5)
              .forEach(n -> System.out.print(n + " "));
        System.out.println(); // 0 2 4 6 8

        // 5. Stream.generate() — infinite, from Supplier
        System.out.print("Randoms    : ");
        Stream.generate(Math::random).limit(3)
              .map(d -> String.format("%.2f", d))
              .forEach(n -> System.out.print(n + " "));
        System.out.println();

        // 6. Primitive streams — IntStream, LongStream, DoubleStream
        System.out.print("1 to 5     : ");
        IntStream.rangeClosed(1, 5).forEach(n -> System.out.print(n + " "));
        System.out.println();
        System.out.println("Sum 1-100  : " + IntStream.rangeClosed(1,100).sum()); // 5050
    }
}`,
        output: "a b c \nArray sum  : 15\nAlice\nBob\nCharlie\nEvens      : 0 2 4 6 8 \nRandoms    : 0.74 0.21 0.93 \n1 to 5     : 1 2 3 4 5 \nSum 1-100  : 5050"
      },
      {
        heading: "All Intermediate Operations",
        content: "Intermediate operations return a Stream, are lazy, and can be chained. Use peek() for debugging pipelines without modifying elements.",
        table: {
          headers: ["Method", "Signature", "Purpose", "Example"],
          rows: [
            ["filter()",   "Predicate<T>",       "Keep elements matching condition",     "filter(n -> n > 5)"],
            ["map()",      "Function<T,R>",       "Transform each element",              "map(String::toUpperCase)"],
            ["flatMap()",  "Function<T,Stream>",  "Flatten nested streams (1-to-many)",  "flatMap(List::stream)"],
            ["sorted()",   "/ Comparator",        "Sort elements",                       "sorted(Comparator.reverseOrder())"],
            ["distinct()", "—",                   "Remove duplicates",                   "distinct()"],
            ["limit(n)",   "long",                "Take first n elements",               "limit(10)"],
            ["skip(n)",    "long",                "Skip first n elements",               "skip(3)"],
            ["peek()",     "Consumer<T>",         "Inspect without modifying — DEBUG",   "peek(System.out::println)"],
            ["mapToInt()", "ToIntFunction",       "Convert to primitive IntStream",       "mapToInt(String::length)"]
          ]
        },
        code: `import java.util.*;
import java.util.stream.*;

public class IntermediateOps {
    public static void main(String[] args) {

        List<String> words = Arrays.asList(
            "hello","world","java","stream","hello","api","java");

        // filter + distinct + sorted + map
        System.out.println("Unique>3 uppercased:");
        words.stream()
            .filter(w -> w.length() > 3)
            .distinct()
            .sorted()
            .map(String::toUpperCase)
            .forEach(System.out::println);

        // flatMap — flatten nested lists
        List<List<Integer>> nested = Arrays.asList(
            Arrays.asList(1,2,3), Arrays.asList(4,5), Arrays.asList(6,7,8));
        List<Integer> flat = nested.stream()
            .flatMap(List::stream)
            .collect(Collectors.toList());
        System.out.println("Flattened: " + flat);

        // peek — debug multiple pipeline stages
        System.out.println("Debug peek:");
        words.stream()
            .filter(w -> w.length() > 3)
            .peek(w -> System.out.println("  after filter: " + w))
            .map(String::toUpperCase)
            .peek(w -> System.out.println("  after map   : " + w))
            .distinct()
            .limit(2)
            .collect(Collectors.toList());
    }
}`,
        output: "Unique>3 uppercased:\nHELLO\nJAVA\nSTREAM\nWORLD\nFlattened: [1, 2, 3, 4, 5, 6, 7, 8]\nDebug peek:\n  after filter: hello\n  after map   : HELLO\n  after filter: world\n  after map   : WORLD"
      },
      {
        heading: "All Terminal Operations",
        content: "Terminal operations are EAGER — they trigger the entire pipeline and return a non-Stream result. The stream is exhausted after a terminal op and cannot be reused.",
        code: `import java.util.*;
import java.util.stream.*;

public class TerminalOps {
    public static void main(String[] args) {

        List<Integer> nums = Arrays.asList(3,1,4,1,5,9,2,6,5,3,5);

        System.out.println("count >3   : " + nums.stream().filter(n->n>3).count()); // 5
        System.out.println("sum        : " + nums.stream().reduce(0, Integer::sum)); // 44
        System.out.println("min        : " + nums.stream().min(Integer::compareTo).get()); // 1
        System.out.println("max        : " + nums.stream().max(Integer::compareTo).get()); // 9

        // Matching
        System.out.println("anyMatch>8 : " + nums.stream().anyMatch(n -> n > 8));  // true
        System.out.println("allMatch>0 : " + nums.stream().allMatch(n -> n > 0));  // true
        System.out.println("noneMatch<0: " + nums.stream().noneMatch(n -> n < 0)); // true
        System.out.println("findFirst  : " + nums.stream().findFirst().get());     // 3

        // Collecting
        List<String> names = Arrays.asList("Alice","Bob","Charlie","Dave");

        String joined = names.stream().collect(Collectors.joining(", ","[","]"));
        System.out.println("joined     : " + joined); // [Alice, Bob, Charlie, Dave]

        Map<String,Integer> nameLen = names.stream()
            .collect(Collectors.toMap(n -> n, String::length));
        System.out.println("name→len   : " + nameLen);

        // groupingBy — group by first character
        Map<Character,List<String>> byLetter = names.stream()
            .collect(Collectors.groupingBy(n -> n.charAt(0)));
        System.out.println("by letter  : " + byLetter);

        // Statistics
        IntSummaryStatistics stats = nums.stream()
            .mapToInt(Integer::intValue).summaryStatistics();
        System.out.printf("stats: min=%d max=%d avg=%.1f sum=%d count=%d%n",
            stats.getMin(), stats.getMax(), stats.getAverage(),
            stats.getSum(), stats.getCount());
    }
}`,
        output: "count >3   : 5\nsum        : 44\nmin        : 1\nmax        : 9\nanyMatch>8 : true\nallMatch>0 : true\nnoneMatch<0: true\nfindFirst  : 3\njoined     : [Alice, Bob, Charlie, Dave]\nname→len   : {Alice=5, Bob=3, Charlie=7, Dave=4}\nby letter  : {A=[Alice], B=[Bob, Dave], C=[Charlie]}\nstats: min=1 max=9 avg=4.0 sum=44 count=11"
      },
      {
        heading: "Real Project-Style Streams — groupingBy and Complex Operations",
        content: "See how Streams are used in real Spring Boot service patterns — filtering products, grouping orders, averaging salaries, and advanced Collector combinations.",
        code: `import java.util.*;
import java.util.stream.*;

public class RealProjectStreams {
    record Employee(String name, String dept, double salary) {}

    public static void main(String[] args) {

        List<Employee> employees = List.of(
            new Employee("Alice",   "Engineering", 95000),
            new Employee("Bob",     "Marketing",   60000),
            new Employee("Charlie", "Engineering", 85000),
            new Employee("Diana",   "HR",           55000),
            new Employee("Eve",     "Engineering", 110000),
            new Employee("Frank",   "Marketing",   72000),
            new Employee("Grace",   "HR",           58000)
        );

        // 1. Group names by department
        Map<String, List<String>> byDept = employees.stream()
            .collect(Collectors.groupingBy(
                Employee::dept,
                Collectors.mapping(Employee::name, Collectors.toList())
            ));
        System.out.println("By dept    : " + byDept);

        // 2. Average salary per department
        Map<String, Double> avgSalary = employees.stream()
            .collect(Collectors.groupingBy(
                Employee::dept,
                Collectors.averagingDouble(Employee::salary)
            ));
        avgSalary.forEach((dept, avg) ->
            System.out.printf("  %-15s avg: ₹%.0f%n", dept, avg));

        // 3. Highest earner per department
        Map<String, Optional<Employee>> topEarner = employees.stream()
            .collect(Collectors.groupingBy(
                Employee::dept,
                Collectors.maxBy(Comparator.comparingDouble(Employee::salary))
            ));
        topEarner.forEach((dept, emp) ->
            System.out.printf("  Top %-12s: %s (₹%.0f)%n",
                dept, emp.get().name(), emp.get().salary()));

        // 4. Top 3 Engineering employees by salary
        System.out.println("\nTop 3 Engineers:");
        employees.stream()
            .filter(e -> e.dept().equals("Engineering"))
            .sorted(Comparator.comparingDouble(Employee::salary).reversed())
            .limit(3)
            .forEach(e -> System.out.printf("  %-10s ₹%.0f%n", e.name(), e.salary()));
    }
}`,
        output: "By dept    : {Engineering=[Alice, Charlie, Eve], Marketing=[Bob, Frank], HR=[Diana, Grace]}\n  Engineering     avg: ₹96667\n  Marketing       avg: ₹66000\n  HR              avg: ₹56500\n  Top Engineering : Eve (₹110000)\n  Top Marketing   : Frank (₹72000)\n  Top HR          : Grace (₹58000)\n\nTop 3 Engineers:\n  Eve        ₹110000\n  Alice      ₹95000\n  Charlie    ₹85000"
      }
    ],
    quiz: [
      { q: "Intermediate operations are:", options: ["Eager — execute immediately", "Lazy — execute when terminal is called", "Always parallel", "Sequential only"], correct: 1 },
      { q: "map() vs flatMap():", options: ["Same", "map 1-to-1; flatMap flattens 1-to-many streams", "flatMap is faster", "map works on lists only"], correct: 1 },
      { q: "Can a Stream be reused after terminal op?", options: ["Yes always", "No — exhausted after one terminal operation", "Only with parallel()", "Only for read ops"], correct: 1 },
      { q: "findFirst() vs findAny():", options: ["Same result always", "findFirst: deterministic first element. findAny: any element (better for parallel)", "findAny is always faster", "No practical difference"], correct: 1 },
      { q: "Which is a terminal operation?", options: ["filter()", "map()", "sorted()", "collect()"], correct: 3 },
      { q: "groupingBy() returns:", options: ["List<T>", "Set<T>", "Map<K, List<T>>", "Optional<T>"], correct: 2 }
    ],
    code: `import java.util.*;
import java.util.stream.*;
public class StreamChallenge {
    // Word frequency counter — top interview program
    public static void main(String[] args) {
        String text = "to be or not to be that is the question to be";
        Map<String, Long> freq = Arrays.stream(text.split(" "))
            .collect(Collectors.groupingBy(w -> w, Collectors.counting()));

        // Sort by frequency descending
        System.out.println("Word frequencies:");
        freq.entrySet().stream()
            .sorted(Map.Entry.<String,Long>comparingByValue().reversed())
            .forEach(e -> System.out.printf("  %-10s → %d%n", e.getKey(), e.getValue()));

        // Second highest number
        List<Integer> nums = Arrays.asList(5,3,8,1,9,2,7,4,6);
        Optional<Integer> secondHighest = nums.stream()
            .distinct()
            .sorted(Comparator.reverseOrder())
            .skip(1)
            .findFirst();
        secondHighest.ifPresent(n -> System.out.println("2nd highest: " + n));

        // Find duplicates
        Set<Integer> seen = new HashSet<>();
        Set<Integer> dupes = nums.stream()
            .filter(n -> !seen.add(n))
            .collect(Collectors.toSet());
        System.out.println("Duplicates : " + dupes);
    }
}`,
    output: "Word frequencies:\n  to         → 3\n  be         → 3\n  or         → 1\n  not        → 1\n  that       → 1\n  is         → 1\n  the        → 1\n  question   → 1\n2nd highest: 8\nDuplicates : []"
  },

  "optional": {
    title: "Optional — Complete Guide", module: "java8", duration: "35 min", difficulty: "Advanced", xp: 150, icon: "🔍",
    intro: "Before Java 8, methods returning 'no value' returned null. If the caller forgot to null-check, NullPointerException crashed the program. Optional<T> is a container that either holds a value or is explicitly empty. It FORCES the caller to deal with possible absence — eliminating NPEs. Use Optional ONLY as a return type. Never as method parameters, class fields, or inside collections.",

    sections: [
      {
        heading: "The NPE Problem and Optional Solution",
        content: "See the dangerous old pattern and how Optional completely changes the approach — from hoping callers remember null checks, to forcing them to handle emptiness.",
        code: `import java.util.*;
import java.util.Optional;

public class NPEProblem {
    static Map<Integer, String> db = Map.of(1,"Alice", 2,"Bob");

    // ❌ OLD WAY — null return, NPE risk
    static String findOld(int id) { return db.get(id); }

    // ✅ NEW WAY — Optional, explicit emptiness
    static Optional<String> find(int id) { return Optional.ofNullable(db.get(id)); }

    public static void main(String[] args) {

        // Old way — silent null, NPE waiting to happen
        String name = findOld(999);
        System.out.println("Old found    : " + name); // null — no crash YET
        // name.toUpperCase() ← NPE CRASH here!

        // New way — must handle emptiness
        Optional<String> opt1 = find(1);    // present
        Optional<String> opt2 = find(999);  // empty

        System.out.println("opt1 present : " + opt1.isPresent()); // true
        System.out.println("opt2 present : " + opt2.isPresent()); // false
        System.out.println("opt1 value   : " + opt1.orElse("?"));  // Alice
        System.out.println("opt2 value   : " + opt2.orElse("?"));  // ?

        // map — transform only if present
        System.out.println("opt1 upper   : " + opt1.map(String::toUpperCase).orElse("?")); // ALICE
        System.out.println("opt2 upper   : " + opt2.map(String::toUpperCase).orElse("?")); // ?

        // ifPresent — run only if value exists
        opt1.ifPresent(n -> System.out.println("Found: " + n)); // Found: Alice
        opt2.ifPresent(n -> System.out.println("Never prints")); // skipped
    }
}`,
        output: "Old found    : null\nopt1 present : true\nopt2 present : false\nopt1 value   : Alice\nopt2 value   : ?\nopt1 upper   : ALICE\nopt2 upper   : ?\nFound: Alice"
      },
      {
        heading: "Creating Optional — 3 Ways",
        content: "Three factory methods. Know when to use each — especially the difference between of() (throws NPE on null) and ofNullable() (safe for null).",
        code: `import java.util.Optional;

public class CreatingOptional {
    public static void main(String[] args) {

        // 1. Optional.of(value) — value MUST NOT be null → NPE if null
        Optional<String> opt1 = Optional.of("Hello");
        System.out.println("of()           : " + opt1);     // Optional[Hello]

        // 2. Optional.ofNullable(value) — CAN be null → empty if null
        String maybeNull = null;
        Optional<String> opt2 = Optional.ofNullable(maybeNull);
        Optional<String> opt3 = Optional.ofNullable("World");
        System.out.println("ofNullable(null): " + opt2);    // Optional.empty
        System.out.println("ofNullable(val) : " + opt3);    // Optional[World]

        // 3. Optional.empty() — explicitly empty
        Optional<String> opt4 = Optional.empty();
        System.out.println("empty()        : " + opt4);     // Optional.empty

        // Checking
        System.out.println("isPresent()    : " + opt1.isPresent()); // true
        System.out.println("isPresent()    : " + opt2.isPresent()); // false
        System.out.println("isEmpty()      : " + opt2.isEmpty());   // true (Java 11+)

        // ⚠️ get() without check — dangerous!
        System.out.println("get() safe     : " + opt1.get()); // Hello
        // opt2.get() → NoSuchElementException — always use orElse instead!
    }
}`,
        output: "of()           : Optional[Hello]\nofNullable(null): Optional.empty\nofNullable(val) : Optional[World]\nempty()        : Optional.empty\nisPresent()    : true\nisPresent()    : false\nisEmpty()      : true\nget() safe     : Hello"
      },
      {
        heading: "All 14 Optional Methods — Complete Reference",
        content: "Prefer orElse / orElseGet / orElseThrow / map / flatMap / filter over calling get() directly. Each method handles the present/empty case cleanly.",
        table: {
          headers: ["Method", "Returns", "When to Use"],
          rows: [
            ["isPresent()",             "boolean",      "Check if value exists"],
            ["isEmpty()",               "boolean",      "Check if empty (Java 11+)"],
            ["get()",                   "T",            "⚠️ Risky — throws NoSuchElement if empty. Use orElse instead"],
            ["orElse(T)",               "T",            "Get value or return default. Default ALWAYS evaluated"],
            ["orElseGet(Supplier<T>)",  "T",            "Get value or compute default LAZILY — better for expensive defaults"],
            ["orElseThrow(Supplier)",   "T",            "Get value or throw custom exception"],
            ["ifPresent(Consumer<T>)",  "void",         "Run action only if value present"],
            ["ifPresentOrElse(C,R)",    "void",         "Run one of two actions (Java 9+)"],
            ["map(Function<T,R>)",      "Optional<R>",  "Transform value if present — returns empty Optional if empty"],
            ["flatMap(Function)",       "Optional<R>",  "Like map, but function returns Optional — avoids Optional<Optional<T>>"],
            ["filter(Predicate<T>)",    "Optional<T>",  "Keep value only if condition matches"],
            ["or(Supplier<Optional>)",  "Optional<T>",  "Provide alternative Optional if empty (Java 9+)"],
            ["stream()",                "Stream<T>",    "Convert to Stream — empty or 1-element (Java 9+)"],
            ["toString()",              "String",       "Debug representation: Optional[value] or Optional.empty"]
          ]
        },
        code: `import java.util.Optional;

public class AllOptionalMethods {
    public static void main(String[] args) {

        Optional<String> name  = Optional.of("alice");
        Optional<String> empty = Optional.empty();

        // orElse — default always computed (even if not needed)
        System.out.println(name.orElse("unknown"));    // alice
        System.out.println(empty.orElse("unknown"));   // unknown

        // orElseGet — LAZY: Supplier only called when empty
        String lazy = empty.orElseGet(() -> "generated-default");
        System.out.println(lazy); // generated-default

        // orElseThrow
        String val = name.orElseThrow(() -> new IllegalStateException("Required!"));
        System.out.println("Got: " + val); // alice

        // map — transform if present
        System.out.println(name.map(String::toUpperCase));  // Optional[ALICE]
        System.out.println(empty.map(String::toUpperCase)); // Optional.empty

        // filter
        System.out.println(name.filter(n -> n.length() > 3));   // Optional[alice]
        System.out.println(name.filter(n -> n.length() > 10));  // Optional.empty

        // ifPresent / ifPresentOrElse
        name.ifPresent(n -> System.out.println("Found: " + n)); // Found: alice
        empty.ifPresentOrElse(
            n -> System.out.println("Present: " + n),
            () -> System.out.println("Was empty — use default")); // Was empty...

        // orElse vs orElseGet — KEY DIFFERENCE
        System.out.println("\n--- orElse vs orElseGet ---");
        Optional<String> present = Optional.of("value");
        // orElse: computeDefault() called EVEN THOUGH opt has a value!
        present.orElse(computeDefault()); // prints computing...
        // orElseGet: Supplier NOT called because opt has a value
        present.orElseGet(() -> computeDefault()); // nothing printed
    }
    static String computeDefault() {
        System.out.println("  computing expensive default...");
        return "default";
    }
}`,
        output: "alice\nunknown\ngenerated-default\nGot: alice\nOptional[ALICE]\nOptional.empty\nOptional[alice]\nOptional.empty\nFound: alice\nWas empty — use default\n\n--- orElse vs orElseGet ---\n  computing expensive default..."
      },
      {
        heading: "Real-World Optional Chaining",
        content: "Chain map/filter/flatMap for safe deep navigation — no null checks needed.",
        code: `import java.util.Optional;

public class OptionalChaining {
    record Address(String street, String city) {}
    record User(String name, Address address) {}

    static Optional<User> getUser(int id) {
        if (id == 1) return Optional.of(new User("Alice", new Address("Park St","Mumbai")));
        if (id == 2) return Optional.of(new User("Bob", null)); // no address
        return Optional.empty();
    }

    public static void main(String[] args) {

        // Safe deep navigation — no null checks!
        for (int id : new int[]{1, 2, 999}) {
            String city = getUser(id)
                .map(User::address)
                .map(Address::city)
                .filter(c -> !c.isBlank())
                .map(String::toUpperCase)
                .orElse("CITY UNKNOWN");
            System.out.printf("User %d city: %s%n", id, city);
        }

        // flatMap — when mapping function returns Optional
        Optional<Optional<String>> nested = Optional.of(Optional.of("hello"));
        // map would give Optional<Optional<String>> — messy!
        Optional<String> flat = nested.flatMap(o -> o); // unwraps cleanly
        System.out.println("flatMap result: " + flat); // Optional[hello]
    }
}`,
        output: "User 1 city: MUMBAI\nUser 2 city: CITY UNKNOWN\nUser 999 city: CITY UNKNOWN\nflatMap result: Optional[hello]"
      },
      {
        heading: "Optional Anti-Patterns — Never Do These",
        content: "These misuses of Optional are common in codebases. Recognising them shows interview maturity.",
        list: [
          "❌ Never call get() without isPresent() check → use orElse / orElseThrow instead",
          "❌ Never use Optional as METHOD PARAMETER → void process(Optional<String> name) — force callers to handle null themselves",
          "❌ Never use Optional as CLASS FIELD → not serializable, adds overhead",
          "❌ Never put Optional IN A COLLECTION → List<Optional<T>> — use filter() to remove nulls instead",
          "❌ Never use Optional.of() on possibly-null values → Optional.of(null) throws NPE immediately. Use Optional.ofNullable()",
          "❌ Never use orElse() for expensive defaults → orElse(expensiveCall()) always evaluates even when value is present. Use orElseGet(() -> expensiveCall())",
          "✅ Use Optional only as RETURN TYPE for methods that may return no value",
          "✅ Chain with map/filter/flatMap for clean, null-safe pipelines"
        ]
      }
    ],
    quiz: [
      { q: "Optional.of(null) does what?", options: ["Returns empty Optional", "Throws NullPointerException", "Throws NoSuchElementException", "Returns null"], correct: 1 },
      { q: "Best way to get value with fallback:", options: ["get()", "isPresent() + get()", "orElse(default)", "isPresent() only"], correct: 2 },
      { q: "orElse() vs orElseGet() key difference:", options: ["Same", "orElse ALWAYS evaluates default; orElseGet is lazy", "orElseGet is Java 11+", "No practical difference"], correct: 1 },
      { q: "flatMap vs map in Optional:", options: ["Same", "Use flatMap when mapping function returns Optional — avoids Optional<Optional<T>>", "flatMap is faster", "map works for all types"], correct: 1 },
      { q: "Optional should NOT be used as:", options: ["Return type", "Method parameter or class field", "Replacing null in methods", "Container in APIs"], correct: 1 },
      { q: "ifPresent() when Optional is empty:", options: ["Throws exception", "Returns null", "Does nothing — safely skipped", "Returns Optional.empty()"], correct: 2 }
    ],
    code: `import java.util.*;
import java.util.Optional;
import java.util.stream.*;
public class OptionalChallenge {
    static Optional<String> findEmail(String username) {
        Map<String, String> db = Map.of(
            "alice", "alice@test.com", "bob", "bob@test.com");
        return Optional.ofNullable(db.get(username.toLowerCase()));
    }
    public static void main(String[] args) {
        String[] users = {"alice", "BOB", "charlie", "DAVE"};
        for (String user : users) {
            String result = findEmail(user)
                .map(String::toUpperCase)
                .filter(e -> e.endsWith(".COM"))
                .orElse("NO EMAIL FOUND");
            System.out.printf("%-8s → %s%n", user, result);
        }
        long count = Arrays.stream(users)
            .map(u -> findEmail(u))
            .filter(Optional::isPresent)
            .count();
        System.out.println("With email: " + count + "/" + users.length);
    }
}`,
    output: "alice    → ALICE@TEST.COM\nBOB      → BOB@TEST.COM\ncharlie  → NO EMAIL FOUND\nDAVE     → NO EMAIL FOUND\nWith email: 2/4"
  },

  "default-methods": {
    title: "Default & Static Interface Methods", module: "java8", duration: "30 min", difficulty: "Advanced", xp: 125, icon: "🔌",
    intro: "Before Java 8, interfaces could only have abstract methods. This made it impossible to add new methods to existing interfaces without breaking ALL implementing classes — a huge problem when Java needed to add forEach() to Iterable or stream() to Collection. Default methods solve this with the 'default' keyword — they have an implementation. Existing classes get it for FREE. Static interface methods are utility methods that belong to the interface itself.",

    sections: [
      {
        heading: "Defining and Using Default Methods",
        content: "A default method has a body. Classes implementing the interface inherit it automatically — no code changes needed. Classes can override it to provide a custom implementation.",
        code: `interface Greeting {
    // Abstract — implementing class MUST provide
    String getName();

    // Default method — inherited for FREE
    default void sayHello() {
        System.out.println("Hello, " + getName() + "!");
    }
    default void sayGoodbye() {
        System.out.println("Goodbye, " + getName() + "!");
    }

    // Static method — belongs to interface, not instances
    static Greeting of(String name) {
        return () -> name; // lambda implementing getName()
    }
}

// Gets default methods for FREE — no need to implement them
class FormalGreeting implements Greeting {
    private String name;
    FormalGreeting(String n) { this.name = n; }
    @Override public String getName() { return name; }
    // sayHello() and sayGoodbye() automatically inherited!
}

// Overrides a default method
class CasualGreeting implements Greeting {
    private String name;
    CasualGreeting(String n) { this.name = n; }
    @Override public String getName() { return name; }
    @Override public void sayHello() { // custom version
        System.out.println("Hey " + getName() + "! Wassup?");
    }
}

public class DefaultMethodsDemo {
    public static void main(String[] args) {
        FormalGreeting f = new FormalGreeting("Alice");
        f.sayHello();              // Hello, Alice!  (default)
        f.sayGoodbye();            // Goodbye, Alice! (default)

        CasualGreeting c = new CasualGreeting("Bob");
        c.sayHello();              // Hey Bob! Wassup?  (overridden)
        c.sayGoodbye();            // Goodbye, Bob!     (still default)

        Greeting g = Greeting.of("Carol"); // static factory method
        g.sayHello();              // Hello, Carol!
    }
}`,
        output: "Hello, Alice!\nGoodbye, Alice!\nHey Bob! Wassup?\nGoodbye, Bob!\nHello, Carol!"
      },
      {
        heading: "Diamond Problem — Resolution",
        content: "When a class implements two interfaces with the same default method, the compiler forces you to override it. Use InterfaceName.super.method() to explicitly call one parent's version.",
        code: `interface A { default void greet() { System.out.println("Hello from A"); } }
interface B { default void greet() { System.out.println("Hello from B"); } }

// ❌ ERROR without override — class C implements A, B { }
// ✅ MUST override and resolve manually
class C implements A, B {
    @Override
    public void greet() {
        A.super.greet();           // explicitly call A's version
        B.super.greet();           // explicitly call B's version
        System.out.println("Hello from C");
    }
}

// Choose only one
class D implements A, B {
    @Override
    public void greet() { A.super.greet(); } // only A's version
}

public class DiamondResolution {
    public static void main(String[] args) {
        new C().greet(); System.out.println("---"); new D().greet();
    }
}`,
        output: "Hello from A\nHello from B\nHello from C\n---\nHello from A"
      },
      {
        heading: "Default vs Abstract vs Static — Comparison",
        content: "This table is directly tested in Java 8 interviews. Know the difference between all three types of interface members.",
        table: {
          headers: ["Aspect", "abstract method", "default method", "static method"],
          rows: [
            ["Has body?",           "No",                      "Yes",                          "Yes"],
            ["Overridable?",        "Must be overridden",      "Can be overridden",             "No — cannot override"],
            ["Call via instance?",  "Yes",                     "Yes",                           "No — via InterfaceName.method()"],
            ["Inherited by class?", "Yes (must implement)",    "Yes (auto-inherited)",          "No — not inherited"],
            ["Purpose",             "Define contract",         "Backward-compatible evolution", "Utility/factory methods"],
            ["Java version",        "Java 1+",                 "Java 8",                        "Java 8"]
          ]
        }
      },
      {
        heading: "Real-World Example — Comparator Default Methods",
        content: "Java's own Comparator interface shows default methods at their best — thenComparing(), reversed(), nullsFirst() were all added in Java 8 as default methods.",
        code: `import java.util.*;

public class ComparatorDefaults {
    record Person(String name, int age, String city) {}

    public static void main(String[] args) {
        List<Person> people = Arrays.asList(
            new Person("Alice",   30, "Mumbai"),
            new Person("Bob",     25, "Delhi"),
            new Person("Charlie", 30, "Mumbai"),
            new Person("Diana",   25, "Pune")
        );

        // thenComparing() — default method on Comparator
        Comparator<Person> byAge  = Comparator.comparingInt(Person::age);
        Comparator<Person> byName = Comparator.comparing(Person::name);

        people.sort(byAge.thenComparing(byName)); // both are default methods!
        System.out.println("By age then name:");
        people.forEach(p -> System.out.printf("  %-8s %d %s%n", p.name(), p.age(), p.city()));

        // reversed() — default method on Comparator
        people.sort(byAge.reversed().thenComparing(Comparator.comparing(Person::city)));
        System.out.println("By age desc then city:");
        people.forEach(p -> System.out.printf("  %-8s %d %s%n", p.name(), p.age(), p.city()));
    }
}`,
        output: "By age then name:\n  Bob      25 Delhi\n  Diana    25 Pune\n  Alice    30 Mumbai\n  Charlie  30 Mumbai\nBy age desc then city:\n  Alice    30 Mumbai\n  Charlie  30 Mumbai\n  Bob      25 Delhi\n  Diana    25 Pune"
      }
    ],
    quiz: [
      { q: "Default methods allow interfaces to have:", options: ["Only constants", "Method implementations with body", "Private fields", "Multiple inheritance of state"], correct: 1 },
      { q: "Why were default methods added?", options: ["Performance improvement", "Backward-compatible interface evolution without breaking implementations", "Replace abstract classes", "For multithreading"], correct: 1 },
      { q: "Diamond problem occurs when:", options: ["Class extends two abstract classes", "Class implements two interfaces with same default method name", "Two classes have same method", "Interface extends another interface"], correct: 1 },
      { q: "Static interface methods are:", options: ["Inherited by implementing classes", "Called via InterfaceName.method() — not inherited", "The same as default", "Only in Java 11+"], correct: 1 },
      { q: "InterfaceName.super.method() is used to:", options: ["Create new interface", "Explicitly call that interface's default method", "Override a method", "Implement abstract method"], correct: 1 },
      { q: "A class implementing an interface with a default method:", options: ["Must override it", "Cannot override it", "Inherits it automatically; may override optionally", "Gets compile error"], correct: 2 }
    ],
    code: `interface Printable {
    void print();
    default void printUpperCase() { System.out.println(getContent().toUpperCase()); }
    default String getContent()   { return "default content"; }
    static void separator()       { System.out.println("=".repeat(25)); }
}
interface Saveable {
    default void save()           { System.out.println("Saving: " + getContent()); }
    default String getContent()   { return "saveable content"; }
}
class Document implements Printable, Saveable {
    private String text;
    Document(String t) { this.text = t; }
    @Override public void print()         { System.out.println("Doc: " + text); }
    @Override public String getContent()  { return text; } // resolves diamond
}
public class DefaultDemo {
    public static void main(String[] args) {
        Document doc = new Document("Hello Java 8");
        Printable.separator();
        doc.print();
        doc.printUpperCase();
        doc.save();
        Printable.separator();
    }
}`,
    output: "=========================\nDoc: Hello Java 8\nHELLO JAVA 8\nSaving: Hello Java 8\n========================="
  },

  "method-references": {
    title: "Method References — Complete Guide", module: "java8", duration: "30 min", difficulty: "Advanced", xp: 150, icon: "🔗",
    intro: "A method reference is an even shorter way to write a lambda when the lambda body does nothing but call an existing method. The :: operator is the method reference operator. For example: instead of s -> System.out.println(s) you write System.out::println. Same logic — just shorter and cleaner. There are exactly 4 types. Use method references when the lambda body is a direct method call with no extra logic. If there is any transformation or condition, keep a lambda.",

    sections: [
      {
        heading: "All 4 Types — Visual Table",
        content: "Four types, each corresponding to a different situation. Know the syntax, lambda equivalent, and when to use each.",
        table: {
          headers: ["Type", "Syntax", "Lambda Equivalent", "Example"],
          rows: [
            ["Static method ref",               "ClassName::staticMethod",   "(args) -> ClassName.staticMethod(args)", "Integer::parseInt"],
            ["Instance method — specific object","object::instanceMethod",    "(args) -> object.instanceMethod(args)",  "System.out::println"],
            ["Instance method — arbitrary object","ClassName::instanceMethod","(obj,args)->obj.instanceMethod(args)",   "String::toUpperCase"],
            ["Constructor reference",            "ClassName::new",            "(args) -> new ClassName(args)",          "ArrayList::new"]
          ]
        }
      },
      {
        heading: "All 4 Types — Code Examples",
        content: "Every type shown with its lambda equivalent side by side. This is the clearest way to understand when each applies.",
        code: `import java.util.*;
import java.util.function.*;
import java.util.stream.*;

public class MethodReferences {
    static boolean isEven(int n)    { return n % 2 == 0; }
    static String  format(String s) { return "[" + s + "]"; }

    String prefix;
    MethodReferences(String p) { this.prefix = p; }
    String addPrefix(String s) { return prefix + ": " + s; }

    public static void main(String[] args) {

        List<Integer> nums  = Arrays.asList(1,2,3,4,5,6,7,8);
        List<String>  names = Arrays.asList("Alice","bob","CHARLIE","diana");

        // TYPE 1: Static Method Reference — ClassName::staticMethod
        // Lambda:    x -> Integer.parseInt(x)
        // Reference: Integer::parseInt
        List<Integer> parsed = Arrays.asList("1","2","3","4").stream()
            .map(Integer::parseInt)                 // same as: s -> Integer.parseInt(s)
            .collect(Collectors.toList());
        System.out.println("Parsed    : " + parsed);

        List<Integer> evens = nums.stream()
            .filter(MethodReferences::isEven)       // same as: n -> isEven(n)
            .collect(Collectors.toList());
        System.out.println("Evens     : " + evens);

        // TYPE 2: Instance Method on SPECIFIC Object — obj::method
        // Lambda:    s -> System.out.println(s)
        // Reference: System.out::println
        names.forEach(System.out::println);         // System.out is the specific obj

        MethodReferences obj = new MethodReferences("LOG");
        List<String> prefixed = names.stream()
            .map(obj::addPrefix)                    // obj is specific instance
            .collect(Collectors.toList());
        System.out.println("Prefixed  : " + prefixed);

        // TYPE 3: Instance Method on ARBITRARY Object — ClassName::method
        // Lambda:    s -> s.toUpperCase()
        // Reference: String::toUpperCase
        List<String> upper = names.stream()
            .map(String::toUpperCase)               // each String is the object
            .collect(Collectors.toList());
        System.out.println("Upper     : " + upper);

        names.sort(String::compareToIgnoreCase);    // (a,b) -> a.compareToIgnoreCase(b)
        System.out.println("Sorted    : " + names);

        // TYPE 4: Constructor Reference — ClassName::new
        // Lambda:    s -> new StringBuilder(s)
        // Reference: StringBuilder::new
        Function<String, StringBuilder> sbFactory = StringBuilder::new;
        StringBuilder sb = sbFactory.apply("Hello World");
        System.out.println("Reversed  : " + sb.reverse());

        Supplier<List<String>> listFactory = ArrayList::new;
        List<String> newList = listFactory.get();
        newList.add("from constructor ref!"); System.out.println(newList);
    }
}`,
        output: "Parsed    : [1, 2, 3, 4]\nEvens     : [2, 4, 6, 8]\nAlice\nbob\nCHARLIE\ndiana\nPrefixed  : [LOG: Alice, LOG: bob, LOG: CHARLIE, LOG: diana]\nUpper     : [ALICE, BOB, CHARLIE, DIANA]\nSorted    : [Alice, bob, CHARLIE, diana]\nReversed  : dlroW olleH\n[from constructor ref!]"
      },
      {
        heading: "Lambda vs Method Reference — Side by Side",
        content: "This table lets you instantly convert between the two. Use method reference when the lambda only calls one method — no extra logic.",
        table: {
          headers: ["Lambda Expression", "Method Reference", "Type"],
          rows: [
            ["() -> System.out.println()",      "System.out::println (no arg)",    "Instance specific"],
            ["s -> System.out.println(s)",       "System.out::println",             "Instance specific"],
            ["s -> s.toUpperCase()",             "String::toUpperCase",             "Instance arbitrary"],
            ["s -> s.length()",                  "String::length",                  "Instance arbitrary"],
            ["x -> Integer.parseInt(x)",         "Integer::parseInt",               "Static"],
            ["() -> new ArrayList<>()",          "ArrayList::new",                  "Constructor"],
            ["(a,b) -> Integer.compare(a,b)",    "Integer::compare",                "Static"],
            ["(a,b) -> a.compareTo(b)",          "String::compareTo",               "Instance arbitrary"]
          ]
        },
        code: `import java.util.*;
import java.util.stream.*;
public class MRChallenge {
    record Person(String name, int age) {}
    public static void main(String[] args) {
        List<Person> people = List.of(
            new Person("Alice",30), new Person("Bob",25),
            new Person("Charlie",35), new Person("Dave",28));

        // Constructor ref → instance method ref → specific instance ref
        System.out.println("Sorted by age:");
        people.stream()
            .sorted(Comparator.comparingInt(Person::age)) // instance method on arbitrary
            .map(p -> p.name() + " (" + p.age() + ")")
            .forEach(System.out::println);                 // instance on specific object

        System.out.printf("Avg age: %.1f%n",
            people.stream().mapToInt(Person::age).average().getAsDouble());

        // MEMORY TRICK: :: reads as 'reference to'
        // String::toUpperCase = 'reference to toUpperCase on a String'
        // Integer::parseInt   = 'reference to parseInt in Integer class'
        // ArrayList::new      = 'reference to new ArrayList constructor'
    }
}`,
        output: "Sorted by age:\nBob (25)\nDave (28)\nAlice (30)\nCharlie (35)\nAvg age: 29.5"
      }
    ],
    quiz: [
      { q: ":: is the:", options: ["Scope resolution operator", "Method reference operator", "Namespace separator", "String concatenation"], correct: 1 },
      { q: "System.out::println is:", options: ["Static method ref", "Constructor ref", "Instance method on specific object (System.out)", "Instance on arbitrary"], correct: 2 },
      { q: "Constructor reference ArrayList::new equals:", options: ["new ArrayList()", "() -> ArrayList", "() -> new ArrayList<>()", "ArrayList.create()"], correct: 2 },
      { q: "String::toUpperCase in map() is:", options: ["Static ref", "Instance method on arbitrary String (each stream element)", "Constructor ref", "Static import"], correct: 1 },
      { q: "s -> Integer.parseInt(s) as method ref:", options: ["s::parseInt", "Integer::new", "Integer::parseInt", "String::parseInt"], correct: 2 },
      { q: "When to prefer lambda over method ref:", options: ["Always use method ref", "When the body is a direct method call", "When there is extra logic beyond just calling a method", "Never — method ref always better"], correct: 2 }
    ],
    code: `import java.util.*;
import java.util.stream.*;
import java.util.function.*;
public class MethodRefDemo {
    static int triple(int n) { return n * 3; }
    public static void main(String[] args) {
        List<String> strs = Arrays.asList("3","1","4","1","5","9","2","6");

        // Static: Integer::parseInt, triple
        List<Integer> nums = strs.stream()
            .map(Integer::parseInt)                      // static ref
            .map(MethodRefDemo::triple)                  // static ref
            .collect(Collectors.toList());
        System.out.println("Parsed & tripled: " + nums);

        // Arbitrary instance: String::toUpperCase, String::length
        int totalLen = strs.stream()
            .map(String::toUpperCase)                    // arbitrary instance
            .mapToInt(String::length)                    // arbitrary instance
            .sum();
        System.out.println("Total char len  : " + totalLen);

        // Specific instance + Constructor
        Supplier<List<Integer>> sorted = () ->
            nums.stream().sorted().collect(Collectors.toCollection(ArrayList::new));
        System.out.println("Sorted          : " + sorted.get());
        nums.forEach(System.out::println);               // specific instance
    }
}`,
    output: "Parsed & tripled: [9, 3, 12, 3, 15, 27, 6, 18]\nTotal char len  : 8\nSorted          : [3, 3, 6, 9, 12, 15, 18, 27]\n3\n3\n12\n3\n15\n27\n6\n18"
  },

  "date-time": {
    title: "Date & Time API — Complete Guide", module: "java8", duration: "40 min", difficulty: "Advanced", xp: 150, icon: "📅",
    intro: "The old java.util.Date and Calendar were notoriously broken. Java 8 introduced java.time — inspired by Joda-Time — with immutable, thread-safe, fluent classes. ALL java.time classes are immutable: every operation returns a NEW object. Key problems with old API: months started at 0 (January=0!), Date was mutable (thread-unsafe), no date/time separation, SimpleDateFormat was NOT thread-safe, no duration/period support.",

    sections: [
      {
        heading: "Why the New API — Problems Fixed",
        content: "See every old API problem and how java.time fixes it.",
        table: {
          headers: ["Problem in Old API", "New java.time Solution"],
          rows: [
            ["Months start at 0 (January=0) — confusing bugs",      "1-based months (January=1) — intuitive"],
            ["Date = date + time mixed together",                     "Separate: LocalDate, LocalTime, LocalDateTime"],
            ["Mutable — can be accidentally changed (not thread-safe)","All classes immutable — every op returns new object"],
            ["No timezone support in Date",                           "ZonedDateTime with ZoneId — explicit and clear"],
            ["SimpleDateFormat not thread-safe — bugs under load",    "DateTimeFormatter is immutable and thread-safe"],
            ["No duration/period between two dates",                  "Duration (time-based) and Period (date-based)"],
            ["Calendar.add() confusing syntax",                       "Fluent: plusDays(7), minusMonths(1), plusYears(1)"]
          ]
        }
      },
      {
        heading: "Which Class to Use — Complete Reference",
        content: "Pick the right class for your use case. If you only need a date — LocalDate. Date AND time — LocalDateTime. Global app with timezones — ZonedDateTime.",
        table: {
          headers: ["Class", "Has Date?", "Has Time?", "Has Zone?", "Use For"],
          rows: [
            ["LocalDate",        "✅ Yes", "❌ No",  "❌ No",  "Birthdays, deadlines, holidays"],
            ["LocalTime",        "❌ No",  "✅ Yes", "❌ No",  "Meeting times, alarms, opening hours"],
            ["LocalDateTime",    "✅ Yes", "✅ Yes", "❌ No",  "Local events, log timestamps, appointments"],
            ["ZonedDateTime",    "✅ Yes", "✅ Yes", "✅ Yes", "Global apps, servers, time conversion"],
            ["Instant",          "✅ Yes", "✅ Yes", "UTC",    "Machine timestamps, event logs, epoch"],
            ["Duration",         "—",      "—",      "—",      "Time difference in hours/minutes/seconds"],
            ["Period",           "—",      "—",      "—",      "Date difference in years/months/days"],
            ["DateTimeFormatter","—",      "—",      "—",      "Format dates to String, parse String to date"]
          ]
        }
      },
      {
        heading: "LocalDate, LocalTime, LocalDateTime",
        content: "The three most-used classes. All are immutable — every arithmetic operation returns a new object. Operations like plusDays(), minusMonths() never modify the original.",
        code: `import java.time.*;

public class LocalDateTimeDemo {
    public static void main(String[] args) {

        // LocalDate — date only
        LocalDate today    = LocalDate.now();
        LocalDate birthday = LocalDate.of(1998, 8, 15);
        LocalDate parsed   = LocalDate.parse("2024-06-01");

        System.out.println("Today      : " + today);
        System.out.println("Birthday   : " + birthday);
        System.out.println("Year       : " + today.getYear());
        System.out.println("Month      : " + today.getMonth());
        System.out.println("DayOfWeek  : " + today.getDayOfWeek());
        System.out.println("isLeapYear : " + today.isLeapYear());

        // Arithmetic — IMMUTABLE: returns NEW objects
        System.out.println("Next week  : " + today.plusDays(7));
        System.out.println("Last month : " + today.minusMonths(1));
        System.out.println("Next year  : " + today.plusYears(1));

        // Comparison
        System.out.println("After b-day: " + today.isAfter(birthday)); // true

        // LocalTime — time only
        System.out.println();
        LocalTime now     = LocalTime.now();
        LocalTime meeting = LocalTime.of(14, 30, 0);
        System.out.println("Meeting    : " + meeting);
        System.out.println("Hour       : " + meeting.getHour());
        System.out.println("Later      : " + meeting.plusHours(2).plusMinutes(30));
        System.out.println("Before 15? : " + meeting.isBefore(LocalTime.of(15,0)));

        // LocalDateTime — date + time
        System.out.println();
        LocalDateTime dt = LocalDateTime.of(2024, 12, 25, 10, 30, 0);
        System.out.println("Christmas  : " + dt);
        System.out.println("Date part  : " + dt.toLocalDate());
        System.out.println("Time part  : " + dt.toLocalTime());
        // Combine LocalDate + LocalTime
        LocalDateTime combined = LocalDate.of(2024,6,1).atTime(9, 0);
        System.out.println("Combined   : " + combined);
    }
}`,
        output: "Today      : 2024-06-01\nBirthday   : 1998-08-15\nYear       : 2024\nMonth      : JUNE\nDayOfWeek  : SATURDAY\nisLeapYear : true\nNext week  : 2024-06-08\nLast month : 2024-05-01\nNext year  : 2025-06-01\nAfter b-day: true\n\nMeeting    : 14:30\nHour       : 14\nLater      : 17:00\nBefore 15? : true\n\nChristmas  : 2024-12-25T10:30\nDate part  : 2024-12-25\nTime part  : 10:30\nCombined   : 2024-06-01T09:00"
      },
      {
        heading: "ZonedDateTime, Instant, Period, Duration",
        content: "For global applications and calculating time differences.",
        code: `import java.time.*;

public class AdvancedDateTime {
    public static void main(String[] args) {

        // ZonedDateTime — timezone-aware
        ZoneId india  = ZoneId.of("Asia/Kolkata");
        ZoneId london = ZoneId.of("Europe/London");
        ZoneId nyc    = ZoneId.of("America/New_York");

        ZonedDateTime indiaTime = ZonedDateTime.now(india);
        System.out.println("India  : " + indiaTime.toLocalDateTime() + " IST");

        // Convert to another timezone — same instant, different display
        ZonedDateTime londonTime = indiaTime.withZoneSameInstant(london);
        System.out.println("London : " + londonTime.toLocalDateTime() + " GMT");
        ZonedDateTime nycTime = indiaTime.withZoneSameInstant(nyc);
        System.out.println("NYC    : " + nycTime.toLocalDateTime() + " ET");

        // Instant — machine timestamp (UTC epoch seconds)
        Instant now = Instant.now();
        System.out.println("Epoch  : " + now.getEpochSecond());

        // Period — DATE difference (years, months, days)
        LocalDate born  = LocalDate.of(2000, 5, 15);
        LocalDate today = LocalDate.of(2024, 3, 25);
        Period age = Period.between(born, today);
        System.out.println("Age    : " + age.getYears() + "y "
                                       + age.getMonths() + "m "
                                       + age.getDays() + "d");

        // Duration — TIME difference (hours, minutes, seconds)
        LocalTime start = LocalTime.of(9, 0);
        LocalTime end   = LocalTime.of(17, 30);
        Duration worked = Duration.between(start, end);
        System.out.println("Worked : " + worked.toHours() + "h "
                                       + (worked.toMinutes() % 60) + "m");

        // Duration between DateTimes
        LocalDateTime m1 = LocalDateTime.of(2024,6,1,10,0);
        LocalDateTime m2 = LocalDateTime.of(2024,6,1,11,30);
        System.out.println("Gap    : " + Duration.between(m1, m2).toMinutes() + " minutes");
    }
}`,
        output: "India  : 2024-03-25T15:30:00 IST\nLondon : 2024-03-25T10:00:00 GMT\nNYC    : 2024-03-25T06:00:00 ET\nEpoch  : 1711360200\nAge    : 23y 10m 10d\nWorked : 8h 30m\nGap    : 90 minutes"
      },
      {
        heading: "DateTimeFormatter — Format and Parse",
        content: "DateTimeFormatter formats dates to String and parses String back to dates. It is immutable and thread-safe — unlike the old SimpleDateFormat.",
        code: `import java.time.*;
import java.time.format.*;

public class DateTimeFormatting {
    public static void main(String[] args) {

        LocalDateTime dt = LocalDateTime.of(2024, 3, 25, 14, 30, 45);

        // Built-in formatters
        System.out.println(dt.format(DateTimeFormatter.ISO_DATE));      // 2024-03-25
        System.out.println(dt.format(DateTimeFormatter.ISO_DATE_TIME)); // 2024-03-25T14:30:45

        // Custom patterns
        DateTimeFormatter f1 = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        DateTimeFormatter f2 = DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a");
        DateTimeFormatter f3 = DateTimeFormatter.ofPattern("EEEE, MMMM d, yyyy");
        DateTimeFormatter f4 = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        System.out.println(dt.format(f1)); // 25/03/2024
        System.out.println(dt.format(f2)); // 25 Mar 2024, 02:30 PM
        System.out.println(dt.format(f3)); // Monday, March 25, 2024
        System.out.println(dt.format(f4)); // 2024-03-25 14:30:45

        // Parsing — String back to LocalDate/LocalDateTime
        LocalDate d1 = LocalDate.parse("25/03/2024", f1);
        System.out.println("Parsed : " + d1);                // 2024-03-25
        System.out.println("DayOfWeek: " + d1.getDayOfWeek()); // MONDAY

        // Pattern symbols reference:
        // d=day  M/MM=month#  MMM=month abbr  MMMM=full month
        // y=year  H=hour(24h)  h=hour(12h)  m=min  s=sec  a=AM/PM
        // E=day abbr  EEEE=full day
    }
}`,
        output: "2024-03-25\n2024-03-25T14:30:45\n25/03/2024\n25 Mar 2024, 02:30 PM\nMonday, March 25, 2024\n2024-03-25 14:30:45\nParsed : 2024-03-25\nDayOfWeek: MONDAY"
      }
    ],
    quiz: [
      { q: "LocalDate vs java.util.Date month indexing:", options: ["Both 0-based", "java.util.Date is 0-based (Jan=0). LocalDate is 1-based (Jan=1)", "LocalDate is 0-based", "Same — both 1-based"], correct: 1 },
      { q: "Are java.time classes mutable?", options: ["Yes", "No — all immutable, operations return new objects", "Only LocalDate", "Only ZonedDateTime"], correct: 1 },
      { q: "Period measures:", options: ["Nanoseconds", "Time: hours, minutes, seconds", "Date: years, months, days", "UTC offset"], correct: 2 },
      { q: "Duration measures:", options: ["Years and months", "Date-based gap", "Time-based gap: hours, minutes, seconds", "Timezone difference"], correct: 2 },
      { q: "Thread-safe formatter class:", options: ["SimpleDateFormat", "DateFormat", "DateTimeFormatter (immutable)", "Calendar"], correct: 2 },
      { q: "Convert ZonedDateTime to another timezone:", options: ["ChangeTimezone()", "withZoneSameInstant(ZoneId)", "convertTo(ZoneId)", "setZone(ZoneId)"], correct: 1 }
    ],
    code: `import java.time.*;
import java.time.format.*;
import java.time.temporal.ChronoUnit;
public class DateTimeChallenge {
    public static void main(String[] args) {
        LocalDate today = LocalDate.of(2024, 3, 25);
        record Event(String name, LocalDate date) {}
        var events = java.util.List.of(
            new Event("Easter",      LocalDate.of(2024, 3, 31)),
            new Event("Christmas",   LocalDate.of(2024, 12, 25)),
            new Event("New Year",    LocalDate.of(2025,  1,  1)));
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("EEE dd MMM yyyy");
        events.forEach(e -> System.out.printf("%-14s (%s) → %3d days%n",
            e.name(), e.date().format(fmt),
            ChronoUnit.DAYS.between(today, e.date())));

        // Age calculator
        LocalDate born = LocalDate.of(2000, 5, 15);
        Period age = Period.between(born, today);
        System.out.printf("Age: %d years, %d months, %d days%n",
            age.getYears(), age.getMonths(), age.getDays());
    }
}`,
    output: "Easter         (Sun 31 Mar 2024) →   6 days\nChristmas      (Wed 25 Dec 2024) → 275 days\nNew Year       (Wed 01 Jan 2025) → 282 days\nAge: 23 years, 10 months, 10 days"
  }

};
