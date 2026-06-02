export const ADVANCED_TOPICS = {

  "generics": {
    title: "Generics — Complete Guide", module: "advanced", duration: "45 min", difficulty: "Advanced", xp: 225, icon: "🔤",
    intro: "Generics let you write classes, interfaces, and methods that work with ANY type while providing compile-time type safety. Before generics (Java 1.4), you stored everything as Object and cast manually — causing ClassCastException crashes at runtime. Generics move those errors to compile time. Box<T> is a placeholder: 'a Box of some type T — tell me which type when you use it'. The entire Collections Framework is built on generics.",
    sections: [
      {
        heading: "The Problem Generics Solve",
        content: "Before generics you had to cast from Object manually — and wrong casts crashed at runtime. Generics let you declare the type once; the compiler enforces it everywhere. No more ClassCastException surprises.",
        code: `// ── BEFORE generics: stores Object, crashes on bad cast ──────
import java.util.*;
public class BeforeAfterGenerics {
    public static void main(String[] args) {
        // Old way: raw List accepts anything
        List rawList = new ArrayList();
        rawList.add("Hello");
        rawList.add(42);       // wrong type — no error at compile time!

        // Must cast manually — CRASHES here with ClassCastException
        for (Object obj : rawList) {
            String s = (String) obj; // 42 can't be cast to String!
            System.out.println(s);
        }

        // ── WITH generics: type is declared, compiler checks it ──
        List<String> safeList = new ArrayList<>();
        safeList.add("Hello");
        safeList.add("World");
        // safeList.add(42); // ← COMPILE ERROR — caught before running!

        for (String s : safeList) { // no cast needed!
            System.out.println(s.toUpperCase());
        }
    }
}`,
        output: `// Old way: crashes with ClassCastException on integer

// With generics:
HELLO
WORLD`,
        note: "Type parameter naming conventions: T = Type (general), E = Element (collections), K/V = Key/Value (maps), N = Number, R = Return type."
      },
      {
        heading: "Generic Classes — Box and Pair",
        content: "Add <T> after the class name. T becomes available everywhere inside the class. Provide the actual type when creating instances: new Box<String>(), new Pair<String, Integer>(). Multiple type params: class Pair<A, B>.",
        code: `// Single type parameter — Box<T>
class Box<T> {
    private T value;
    public Box(T v)      { this.value = v; }
    public T get()       { return value; }
    public void set(T v) { this.value = v; }
    public String toString() {
        return "Box[" + value + "] (" + value.getClass().getSimpleName() + ")";
    }
}

// Two type parameters — Pair<A, B>
class Pair<A, B> {
    public final A first;
    public final B second;
    public Pair(A a, B b) { first = a; second = b; }
    public Pair<B, A> swap() { return new Pair<>(second, first); }
    public String toString() { return "(" + first + ", " + second + ")"; }
}

public class GenericClassDemo {
    public static void main(String[] args) {
        Box<String>  strBox = new Box<>("Hello Java!");
        Box<Integer> intBox = new Box<>(42);
        Box<Double>  dblBox = new Box<>(3.14);

        System.out.println(strBox); // Box[Hello Java!] (String)
        System.out.println(intBox); // Box[42] (Integer)
        System.out.println(dblBox); // Box[3.14] (Double)

        Pair<String, Integer> person = new Pair<>("Alice", 28);
        System.out.println("\\nPair:    " + person);
        System.out.println("Name:    " + person.first);
        System.out.println("Age:     " + person.second);
        System.out.println("Swapped: " + person.swap()); // (28, Alice)
    }
}`,
        output: `Box[Hello Java!] (String)
Box[42] (Integer)
Box[3.14] (Double)

Pair:    (Alice, 28)
Name:    Alice
Age:     28
Swapped: (28, Alice)`
      },
      {
        heading: "Generic Methods",
        content: "Place <T> before the return type to make any method generic — even in a non-generic class. The compiler infers T from the arguments. Useful for utility functions that work on any type.",
        code: `import java.util.*;

public class GenericMethods {

    // <T> before void declares the type parameter
    public static <T> void printArray(T[] arr) {
        System.out.print("[");
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i]);
            if (i < arr.length - 1) System.out.print(", ");
        }
        System.out.println("]");
    }

    // T extends Comparable — can use compareTo()
    public static <T extends Comparable<T>> T findMax(T[] arr) {
        T max = arr[0];
        for (T item : arr) if (item.compareTo(max) > 0) max = item;
        return max;
    }

    // Returns List<T> — generic return type
    public static <T> List<T> repeat(T item, int count) {
        List<T> list = new ArrayList<>();
        for (int i = 0; i < count; i++) list.add(item);
        return list;
    }

    public static void main(String[] args) {
        String[]  names   = {"Alice", "Bob", "Charlie"};
        Integer[] numbers = {5, 2, 8, 1, 9, 3};

        printArray(names);    // T inferred as String
        printArray(numbers);  // T inferred as Integer

        System.out.println("Max number: " + findMax(numbers)); // 9
        System.out.println("Max name:   " + findMax(names));   // Charlie
        System.out.println("Repeat:     " + repeat("Java", 3));
        System.out.println("Repeat:     " + repeat(42, 4));
    }
}`,
        output: `[Alice, Bob, Charlie]
[5, 2, 8, 1, 9, 3]
Max number: 9
Max name:   Charlie
Repeat:     [Java, Java, Java]
Repeat:     [42, 42, 42, 42]`
      },
      {
        heading: "Bounded Types and Wildcards (PECS)",
        content: "<T extends Number> restricts T to Number or its subclasses. Wildcards: '?' = any type, '? extends T' = T or subclass (read-only), '? super T' = T or superclass (write-safe). PECS: Producer Extends, Consumer Super.",
        code: `import java.util.*;

public class BoundedAndWildcards {

    // Bounded: T must extend Number — enables .doubleValue()
    static <T extends Number> double sum(List<T> list) {
        return list.stream().mapToDouble(Number::doubleValue).sum();
    }

    // Bounded: T must be Comparable — enables .compareTo()
    static <T extends Comparable<T>> T clamp(T val, T min, T max) {
        if (val.compareTo(min) < 0) return min;
        if (val.compareTo(max) > 0) return max;
        return val;
    }

    // Wildcard ?: read as Object only (most restrictive)
    static void printAnyList(List<?> list) {
        System.out.println("List: " + list);
    }

    // ? extends Number: safe to READ as Number (Producer Extends)
    static double sumWild(List<? extends Number> list) {
        return list.stream().mapToDouble(Number::doubleValue).sum();
        // list.add(5); // NOT allowed — can't add to upper-bounded wildcard
    }

    // ? super Integer: safe to WRITE Integer (Consumer Super)
    static void fillWithInts(List<? super Integer> list) {
        list.add(10); list.add(20); list.add(30);
        // Integer x = list.get(0); // NOT safe — get returns Object
    }

    public static void main(String[] args) {
        System.out.println("Sum of ints:    " + sum(List.of(1, 2, 3, 4, 5)));
        System.out.println("Sum of doubles: " + sum(List.of(1.1, 2.2, 3.3)));

        System.out.println("clamp(15, 0, 10) = " + clamp(15, 0, 10)); // 10
        System.out.println("clamp(-5, 0, 10) = " + clamp(-5, 0, 10)); // 0
        System.out.println("clamp(7,  0, 10) = " + clamp(7, 0, 10));  // 7

        printAnyList(List.of("Java","Go","Rust"));
        printAnyList(List.of(1, 2, 3));

        System.out.println("sumWild ints:    " + sumWild(List.of(1, 2, 3)));
        System.out.println("sumWild doubles: " + sumWild(List.of(1.5, 2.5)));

        List<Number> numList = new ArrayList<>();
        fillWithInts(numList); // List<Number> accepts Integer (super)
        System.out.println("Filled list: " + numList);
    }
}`,
        output: `Sum of ints:    15.0
Sum of doubles: 6.600000000000001
clamp(15, 0, 10) = 10
clamp(-5, 0, 10) = 0
clamp(7,  0, 10) = 7
List: [Java, Go, Rust]
List: [1, 2, 3]
sumWild ints:    6.0
sumWild doubles: 4.0
Filled list: [10, 20, 30]`,
        note: "PECS = Producer Extends, Consumer Super. Reading FROM list: use '? extends T'. Writing INTO list: use '? super T'. Doing both: just use T."
      },
      {
        heading: "Type Erasure — What Happens at Runtime",
        content: "Generic type info ONLY exists at compile time. At runtime, the JVM removes all type parameters and replaces them with Object (or the bound type). This is why you can't do 'new T()' or 'instanceof List<String>'. It was done for backward compatibility with pre-Java-5 code.",
        code: `import java.util.*;

class Box<T> {
    private T value;
    Box(T v) { this.value = v; }
    T get()  { return value; }
}

public class TypeErasureDemo {
    public static void main(String[] args) {
        Box<String>  strBox = new Box<>("Hello");
        Box<Integer> intBox = new Box<>(42);

        // At RUNTIME, both are just "Box" — type is erased!
        System.out.println(strBox.getClass().getName()); // Box
        System.out.println(intBox.getClass().getName()); // Box (same!)

        // They ARE the same class at runtime
        System.out.println("Same class? " +
            (strBox.getClass() == intBox.getClass())); // true!

        // Unbounded wildcard works for instanceof
        System.out.println(strBox instanceof Box<?>);   // OK
        // System.out.println(strBox instanceof Box<String>); // COMPILE ERROR

        // Things that are IMPOSSIBLE due to erasure:
        // new T()         → can't instantiate type parameter
        // new T[10]       → can't create array of type parameter
        // T.class         → type parameter has no Class literal
        // x instanceof T  → can't check erased type at runtime
        System.out.println("\\nType erasure: generics are compile-time ONLY.");
        System.out.println("At runtime, T becomes Object (or its bound).");
    }
}`,
        output: `Box
Box (same!)
Same class? true
true

Type erasure: generics are compile-time ONLY.
At runtime, T becomes Object (or its bound).`
      },
      {
        heading: "Generic Stack — Complete Example",
        content: "A production-quality type-safe stack using generics. Same class works for String, Integer, Character — any type. Demonstrates how generics enable reusable, type-safe data structures.",
        code: `import java.util.*;

public class GenericStack<T> {
    private Object[] elements;
    private int size = 0;

    @SuppressWarnings("unchecked")
    public GenericStack() { elements = new Object[10]; }

    public void push(T item) {
        if (size == elements.length)
            elements = Arrays.copyOf(elements, size * 2);
        elements[size++] = item;
    }

    @SuppressWarnings("unchecked")
    public T pop() {
        if (isEmpty()) throw new EmptyStackException();
        T item = (T) elements[--size];
        elements[size] = null; // prevent memory leak
        return item;
    }

    @SuppressWarnings("unchecked")
    public T peek() {
        if (isEmpty()) throw new EmptyStackException();
        return (T) elements[size - 1];
    }

    public boolean isEmpty() { return size == 0; }
    public int size()        { return size; }

    public static void main(String[] args) {
        // String stack
        GenericStack<String> words = new GenericStack<>();
        words.push("Java"); words.push("is"); words.push("powerful");
        System.out.println("Peek: " + words.peek());
        System.out.println("Pop:  " + words.pop());
        System.out.println("Pop:  " + words.pop());

        // Integer stack — same class!
        GenericStack<Integer> nums = new GenericStack<>();
        for (int i = 1; i <= 5; i++) nums.push(i * 10);
        System.out.print("\\nDrain numbers: ");
        while (!nums.isEmpty()) System.out.print(nums.pop() + " ");

        // Use stack to reverse a string
        System.out.println("\\n");
        String word = "GENERICS";
        GenericStack<Character> chars = new GenericStack<>();
        for (char c : word.toCharArray()) chars.push(c);
        StringBuilder sb = new StringBuilder();
        while (!chars.isEmpty()) sb.append(chars.pop());
        System.out.println("'" + word + "' reversed = '" + sb + "'");
    }
}`,
        output: `Peek: powerful
Pop:  powerful
Pop:  is

Drain numbers: 50 40 30 20 10

'GENERICS' reversed = 'SCIRENEGC'`
      }
    ],
    quiz: [
      { q: "What problem did generics solve?", options: ["Slow collections", "ClassCastException at runtime from manual Object casting", "Memory leaks", "Thread safety"], correct: 1 },
      { q: "<T extends Number> means T must be:", options: ["Exactly Number", "Number or any subclass (Integer, Double, Long...)", "Any type at all", "An interface only"], correct: 1 },
      { q: "PECS stands for:", options: ["Preferred Extended Casting System", "Producer Extends, Consumer Super", "Private Encapsulated Class Structure", "Parameterized Erasure Compile Safety"], correct: 1 },
      { q: "Type erasure means:", options: ["Types are slow at runtime", "Generic type info removed at runtime — only exists at compile time", "Types are duplicated in memory", "Generics work at bytecode level"], correct: 1 },
      { q: "List<?> wildcard means:", options: ["List of null", "List of Object", "List of unknown type — read as Object only", "Empty list"], correct: 2 },
      { q: "Why can't you write 'new T()' in a generic class?", options: ["T is abstract", "Type erasure removes T at runtime — JVM has no class info to construct", "T has no constructor", "Forbidden purely by syntax"], correct: 1 }
    ],
    code: `import java.util.*;

public class GenericSorter {
    static <T extends Comparable<T>> void bubbleSort(T[] arr) {
        for (int i = 0; i < arr.length - 1; i++)
            for (int j = 0; j < arr.length - i - 1; j++)
                if (arr[j].compareTo(arr[j+1]) > 0) {
                    T tmp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = tmp;
                }
    }

    public static void main(String[] args) {
        Integer[] ints = {5, 2, 8, 1, 9, 3};
        String[] strs  = {"banana", "apple", "cherry", "date"};
        bubbleSort(ints); bubbleSort(strs);
        System.out.println("Sorted ints:    " + Arrays.toString(ints));
        System.out.println("Sorted strings: " + Arrays.toString(strs));
    }
}`,
    output: `Sorted ints:    [1, 2, 3, 5, 8, 9]
Sorted strings: [apple, banana, cherry, date]`
  },

  "annotations": {
    title: "Annotations — Complete Guide", module: "advanced", duration: "40 min", difficulty: "Advanced", xp: 200, icon: "@",
    intro: "Annotations are special metadata markers you add to Java code (classes, methods, fields) that provide information to the compiler, build tools, or frameworks — WITHOUT changing program logic. They start with '@'. You've used @Override and @FunctionalInterface already. Frameworks like Spring (@Component, @Autowired), JUnit (@Test), and Hibernate (@Entity, @Column) are built almost entirely on annotations processed via reflection at runtime.",
    sections: [
      {
        heading: "Built-in Java Annotations",
        content: "@Override — compiler verifies you're really overriding. @Deprecated — marks something obsolete. @SuppressWarnings — silences specific compiler warnings. @FunctionalInterface — ensures exactly one abstract method. These ship with Java and you use them every day.",
        code: `import java.util.*;

// @FunctionalInterface: compiler ensures exactly 1 abstract method
@FunctionalInterface
interface Transformer {
    String transform(String s);
    // void another(); // COMPILE ERROR — breaks @FunctionalInterface!
}

class Animal {
    public String speak() { return "..."; }

    @Deprecated(since = "2.0", forRemoval = true)
    public void oldMethod() {
        System.out.println("Deprecated — use newMethod() instead!");
    }
    public void newMethod() { System.out.println("New improved way!"); }
}

class Dog extends Animal {
    @Override           // Compiler checks: Animal DOES have speak()
    public String speak() { return "Woof!"; }

    // @Override
    // public void breethe() { } // COMPILE ERROR — typo caught by @Override!
}

public class BuiltInAnnotations {
    @SuppressWarnings("unchecked") // suppresses raw-type warning
    static List<String> legacyMethod() {
        List raw = new ArrayList(); // raw type would warn without annotation
        raw.add("hello");
        return (List<String>) raw;
    }

    public static void main(String[] args) {
        Dog dog = new Dog();
        System.out.println("Dog says: " + dog.speak()); // Woof!

        // @FunctionalInterface used as lambda target
        Transformer upper = s -> s.toUpperCase();
        Transformer shout = s -> s + "!!!";
        System.out.println(upper.transform("hello")); // HELLO
        System.out.println(shout.transform("Java"));  // Java!!!

        Animal a = new Animal();
        a.oldMethod(); // works but IDE/compiler warns: deprecated!
        a.newMethod(); // clean

        List<String> list = legacyMethod();
        System.out.println("Legacy: " + list);
    }
}`,
        output: `Dog says: Woof!
HELLO
Java!!!
Deprecated — use newMethod() instead!
New improved way!
Legacy: [hello]`
      },
      {
        heading: "Creating Custom Annotations with @interface",
        content: "Define your own annotation with @interface. Annotation elements (like methods) become parameters when you use the annotation. Control WHERE it can go (@Target) and WHEN it's available (@Retention). Elements can have default values.",
        code: `import java.lang.annotation.*;

// ── Define a @Test annotation ────────────────────────────────────
@Retention(RetentionPolicy.RUNTIME) // available at runtime via reflection
@Target(ElementType.METHOD)         // can only go on methods
@interface Test {
    String description() default "No description"; // optional
    boolean enabled()    default true;             // optional
    int timeout()        default 5000;             // optional (ms)
}

// ── Define a @NotNull annotation for fields ──────────────────────
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@interface NotNull {
    String message() default "Field must not be null";
}

// ── Define @Author for classes ───────────────────────────────────
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@interface Author {
    String name();           // required — no default
    String date();           // required
    String version() default "1.0"; // optional
}

// ── Use the annotations ──────────────────────────────────────────
@Author(name = "Alice", date = "2024-01-15", version = "2.0")
class Calculator {

    @NotNull
    private String name;

    public Calculator(String name) { this.name = name; }

    @Test(description = "Add two positive numbers")
    public boolean testAdd() { return (2 + 3) == 5; }

    @Test(description = "Multiply negatives", timeout = 100)
    public boolean testMultiply() { return (-2 * -3) == 6; }

    @Test(description = "This test is disabled", enabled = false)
    public boolean testSkipped() { return false; } // won't run
}`,
        output: `// Annotations define metadata — see "Reading Annotations" for output`
      },
      {
        heading: "Meta-Annotations — @Retention and @Target",
        content: "@Retention controls WHEN the annotation is available. @Target controls WHERE it can be placed. @Inherited makes annotations carry down to subclasses. @Repeatable allows the same annotation multiple times. @Documented includes it in Javadoc.",
        table: {
          headers: ["Meta-Annotation", "What It Controls", "Common Values"],
          rows: [
            ["@Retention", "When annotation is available", "SOURCE (compiler only), CLASS (in .class, not at runtime), RUNTIME (accessible via reflection)"],
            ["@Target", "Where annotation can be placed", "TYPE, METHOD, FIELD, PARAMETER, CONSTRUCTOR, LOCAL_VARIABLE, ANNOTATION_TYPE, PACKAGE"],
            ["@Inherited", "Whether subclasses inherit it", "(No value needed — presence means yes)"],
            ["@Repeatable", "Allow same annotation multiple times", "@Repeatable(ContainerAnnotation.class)"],
            ["@Documented", "Include in Javadoc output", "(No value needed — presence means yes)"]
          ]
        },
        code: `import java.lang.annotation.*;

// @Retention examples:
// RetentionPolicy.SOURCE  → @Override, @SuppressWarnings (compiler only)
// RetentionPolicy.CLASS   → default if not specified (in .class, not runtime)
// RetentionPolicy.RUNTIME → @Test, @Entity, @Autowired (reflection accessible)

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE, ElementType.METHOD})
@Inherited  // subclasses automatically inherit this annotation
@interface Category {
    String value();
}

// @Repeatable — apply same annotation multiple times on one element
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@Repeatable(Schedules.class) // must specify container annotation
@interface Schedule {
    String day();
    int hour();
}

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@interface Schedules {  // container annotation (required for @Repeatable)
    Schedule[] value();
}

@Category("Finance")
class PaymentService {
    @Category("Critical")
    @Schedule(day = "MON", hour = 9)
    @Schedule(day = "FRI", hour = 17) // same annotation twice — @Repeatable!
    public void processPayments() {
        System.out.println("Processing payments...");
    }
}

class PremiumPayments extends PaymentService {
    // Inherits @Category("Finance") from PaymentService via @Inherited
}`,
        output: `// Meta-annotations control annotation behavior — see reflection demo for runtime usage`
      },
      {
        heading: "Reading Annotations via Reflection — How Frameworks Work",
        content: "Annotations with @Retention(RUNTIME) are accessible via reflection. This is exactly how Spring reads @Component, JUnit reads @Test, Hibernate reads @Entity. Class, Method, and Field all have getAnnotation() and isAnnotationPresent() methods.",
        code: `import java.lang.annotation.*;
import java.lang.reflect.*;
import java.util.*;

@Retention(RetentionPolicy.RUNTIME) @Target(ElementType.METHOD)
@interface Test {
    String description() default "";
    boolean enabled() default true;
}

@Retention(RetentionPolicy.RUNTIME) @Target(ElementType.FIELD)
@interface NotNull { String message() default "Must not be null"; }

class Calculator {
    @NotNull private String owner;
    public Calculator(String o) { this.owner = o; }

    @Test(description = "Addition works")
    public boolean testAdd()      { return (2 + 3) == 5; }

    @Test(description = "Subtraction works")
    public boolean testSubtract() { return (10 - 3) == 7; }

    @Test(description = "Deliberately wrong")
    public boolean testWrong()    { return (2 + 2) == 5; } // will FAIL

    @Test(description = "Skip this", enabled = false)
    public boolean testSkipped()  { return true; }
}

// Mini test runner — reads @Test via reflection and runs methods!
public class TestRunner {
    public static void run(Object obj) throws Exception {
        Class<?> cls = obj.getClass();
        System.out.println("Running: " + cls.getSimpleName());
        System.out.println("─".repeat(44));

        int passed = 0, failed = 0, skipped = 0;
        for (Method m : cls.getDeclaredMethods()) {
            Test test = m.getAnnotation(Test.class);
            if (test == null) continue;

            if (!test.enabled()) {
                System.out.println("⏭  SKIP   " + m.getName() + ": " + test.description());
                skipped++;
                continue;
            }
            boolean result = (boolean) m.invoke(obj); // invoke the test method!
            if (result) {
                System.out.println("✓  PASS   " + m.getName() + ": " + test.description());
                passed++;
            } else {
                System.out.println("✗  FAIL   " + m.getName() + ": " + test.description());
                failed++;
            }
        }
        System.out.println("─".repeat(44));
        System.out.printf("Results: %d passed, %d failed, %d skipped%n",
            passed, failed, skipped);

        // Also check @NotNull fields
        System.out.println("\\nField validations:");
        for (Field f : cls.getDeclaredFields()) {
            NotNull nn = f.getAnnotation(NotNull.class);
            if (nn != null) {
                f.setAccessible(true);
                Object val = f.get(obj);
                System.out.printf("  %-10s = %-12s %s%n", f.getName(), val,
                    val != null ? "✓ OK" : "✗ " + nn.message());
            }
        }
    }
    public static void main(String[] args) throws Exception {
        run(new Calculator("Alice"));
    }
}`,
        output: `Running: Calculator
────────────────────────────────────────────
✓  PASS   testAdd: Addition works
✓  PASS   testSubtract: Subtraction works
✗  FAIL   testWrong: Deliberately wrong
⏭  SKIP   testSkipped: Skip this
────────────────────────────────────────────
Results: 2 passed, 1 failed, 1 skipped

Field validations:
  owner      = Alice        ✓ OK`
      },
      {
        heading: "Mini Dependency Injection — How Spring Uses Annotations",
        content: "This example shows exactly how Spring works internally. We read @Component to discover beans, @Inject to wire dependencies, and @PostConstruct to call init methods — all using reflection.",
        code: `import java.lang.annotation.*;
import java.lang.reflect.*;
import java.util.*;

@Retention(RetentionPolicy.RUNTIME) @Target(ElementType.TYPE)
@interface Component { String name() default ""; }

@Retention(RetentionPolicy.RUNTIME) @Target(ElementType.FIELD)
@interface Inject { }

@Retention(RetentionPolicy.RUNTIME) @Target(ElementType.METHOD)
@interface PostConstruct { }

// Two Spring-style beans
@Component
class EmailService {
    public void send(String to, String msg) {
        System.out.println("  Email → " + to + ": " + msg);
    }
}

@Component
class UserService {
    @Inject
    private EmailService emailService; // will be injected automatically!

    @PostConstruct
    public void init() { System.out.println("  UserService ready!"); }

    public void register(String name) {
        System.out.println("  Registered: " + name);
        emailService.send(name + "@example.com", "Welcome to our platform!");
    }
}

// Mini IoC container — scans @Component, injects @Inject, calls @PostConstruct
public class MiniSpring {
    private Map<Class<?>, Object> beans = new HashMap<>();

    public void register(Class<?> cls) throws Exception {
        if (cls.isAnnotationPresent(Component.class)) {
            beans.put(cls, cls.getDeclaredConstructor().newInstance());
            System.out.println("Registered bean: " + cls.getSimpleName());
        }
    }

    public void wire() throws Exception {
        for (Object bean : beans.values()) {
            for (Field f : bean.getClass().getDeclaredFields()) {
                if (f.isAnnotationPresent(Inject.class)) {
                    Object dep = beans.get(f.getType());
                    f.setAccessible(true);
                    f.set(bean, dep);
                    System.out.println("Injected " + f.getType().getSimpleName()
                        + " into " + bean.getClass().getSimpleName());
                }
            }
            for (Method m : bean.getClass().getDeclaredMethods()) {
                if (m.isAnnotationPresent(PostConstruct.class)) m.invoke(bean);
            }
        }
    }

    @SuppressWarnings("unchecked")
    public <T> T get(Class<T> cls) { return (T) beans.get(cls); }

    public static void main(String[] args) throws Exception {
        MiniSpring ctx = new MiniSpring();
        ctx.register(EmailService.class);
        ctx.register(UserService.class);
        ctx.wire();

        System.out.println();
        UserService users = ctx.get(UserService.class);
        users.register("Alice");
        users.register("Bob");
    }
}`,
        output: `Registered bean: EmailService
Registered bean: UserService
Injected EmailService into UserService
  UserService ready!

  Registered: Alice
  Email → Alice@example.com: Welcome to our platform!
  Registered: Bob
  Email → Bob@example.com: Welcome to our platform!`
      }
    ],
    quiz: [
      { q: "What do annotations change about program logic?", options: ["They change it significantly", "Nothing — they are metadata only", "They speed it up", "They make it thread-safe"], correct: 1 },
      { q: "@Retention(RetentionPolicy.RUNTIME) means:", options: ["Annotation removed by compiler", "Annotation in .class but not loaded", "Annotation accessible at runtime via reflection", "Annotation is source-code only"], correct: 2 },
      { q: "@Target(ElementType.FIELD) means:", options: ["Only on classes", "Only on fields", "Can go anywhere", "Only in method bodies"], correct: 1 },
      { q: "How do frameworks like Spring USE annotations at runtime?", options: ["Special JVM flag", "Reflection — scan classes, find annotations, act on them", "Compile-time code generation only", "Bytecode manipulation only"], correct: 1 },
      { q: "Custom annotation syntax uses:", options: ["@class MyAnnotation", "@interface MyAnnotation", "interface extends Annotation", "abstract @class"], correct: 1 },
      { q: "@Inherited means:", options: ["Annotation works on interfaces", "Subclasses automatically inherit the annotation from their superclass", "Annotation is inherited from Object", "Annotation applies to inherited methods only"], correct: 1 }
    ],
    code: `import java.lang.annotation.*;
import java.lang.reflect.*;
import java.util.*;

// Field validation with annotations
@Retention(RetentionPolicy.RUNTIME) @Target(ElementType.FIELD)
@interface Range {
    int min() default 0;
    int max() default 100;
    String message() default "Value out of range";
}

@Retention(RetentionPolicy.RUNTIME) @Target(ElementType.FIELD)
@interface NotEmpty { String message() default "Must not be empty"; }

class Student {
    @NotEmpty(message = "Name required") public String name;
    @Range(min = 0, max = 100, message = "Score 0-100") public int score;
    @Range(min = 1, max = 12, message = "Grade 1-12") public int grade;
    Student(String n, int s, int g) { name=n; score=s; grade=g; }
}

public class AnnotationValidator {
    static List<String> validate(Object obj) throws IllegalAccessException {
        List<String> errors = new ArrayList<>();
        for (Field f : obj.getClass().getFields()) {
            f.setAccessible(true);
            Object val = f.get(obj);
            if (f.isAnnotationPresent(NotEmpty.class))
                if (val == null || val.toString().isEmpty())
                    errors.add(f.getName() + ": " + f.getAnnotation(NotEmpty.class).message());
            if (f.isAnnotationPresent(Range.class)) {
                Range r = f.getAnnotation(Range.class);
                int v = ((Number)val).intValue();
                if (v < r.min() || v > r.max())
                    errors.add(f.getName() + ": " + r.message() + " (got " + v + ")");
            }
        }
        return errors;
    }
    public static void main(String[] args) throws Exception {
        System.out.println("Valid:   " + validate(new Student("Alice", 95, 10)));
        System.out.println("Invalid: " + validate(new Student("", 150, 0)));
    }
}`,
    output: `Valid:   []
Invalid: [name: Name required, score: Score 0-100 (got 150), grade: Grade 1-12 (got 0)]`
  },

  "design-patterns": {
    title: "Design Patterns — Complete Guide", module: "advanced", duration: "60 min", difficulty: "Advanced", xp: 250, icon: "🏛️",
    intro: "Design patterns are proven, reusable solutions to common software design problems that developers keep running into. Popularised by the 'Gang of Four' (GoF) book in 1994, which catalogued 23 patterns in 3 categories: Creational (how objects are created), Structural (how objects are composed), and Behavioral (how objects communicate). Patterns are NOT finished code — they're blueprints you adapt. Knowing them is essential for writing maintainable code and for senior Java interviews.",
    sections: [
      {
        heading: "Singleton — Exactly One Instance",
        content: "Problem: Some things must exist only once — database connection pool, app config, logger. Multiple instances would cause bugs. Solution: private constructor + static getInstance() that creates the instance lazily on first call and returns the same instance every time after.",
        code: `class AppConfig {
    private static volatile AppConfig instance; // volatile for thread safety

    private String dbHost;
    private int    dbPort;

    private AppConfig() {  // PRIVATE — no one outside can call new AppConfig()
        this.dbHost = "localhost";
        this.dbPort = 5432;
        System.out.println("Config loaded! (only once)");
    }

    // Double-checked locking: thread-safe AND fast
    public static AppConfig getInstance() {
        if (instance == null) {
            synchronized (AppConfig.class) {
                if (instance == null) instance = new AppConfig();
            }
        }
        return instance;
    }

    public String getDbUrl() { return "jdbc:postgresql://" + dbHost + ":" + dbPort; }
}

public class SingletonDemo {
    public static void main(String[] args) {
        AppConfig c1 = AppConfig.getInstance();
        AppConfig c2 = AppConfig.getInstance();
        AppConfig c3 = AppConfig.getInstance();

        System.out.println("Same instance: " + (c1 == c2)); // true
        System.out.println("Same instance: " + (c2 == c3)); // true
        System.out.println("DB URL: " + c1.getDbUrl());
        // "Config loaded!" only prints ONCE — even accessed 3 times
    }
}`,
        output: `Config loaded! (only once)
Same instance: true
Same instance: true
DB URL: jdbc:postgresql://localhost:5432`
      },
      {
        heading: "Factory Method — Create Objects Without Knowing the Class",
        content: "Problem: You need to create different types of objects based on runtime conditions, but callers shouldn't know which concrete class to instantiate. Solution: A factory method takes a type string and returns the right concrete class. Callers program to the interface, never the implementation.",
        code: `interface Notification {
    void send(String message);
    String getType();
}

class EmailNotification implements Notification {
    private String email;
    EmailNotification(String e) { this.email = e; }
    public void send(String msg) {
        System.out.println("Email to " + email + ": " + msg);
    }
    public String getType() { return "EMAIL"; }
}

class SMSNotification implements Notification {
    private String phone;
    SMSNotification(String p) { this.phone = p; }
    public void send(String msg) {
        System.out.println("SMS to " + phone + ": " + msg);
    }
    public String getType() { return "SMS"; }
}

class PushNotification implements Notification {
    private String deviceId;
    PushNotification(String d) { this.deviceId = d; }
    public void send(String msg) {
        System.out.println("Push to " + deviceId + ": " + msg);
    }
    public String getType() { return "PUSH"; }
}

// THE FACTORY — caller never calls new EmailNotification() directly
class NotificationFactory {
    public static Notification create(String type, String target) {
        return switch (type.toUpperCase()) {
            case "EMAIL" -> new EmailNotification(target);
            case "SMS"   -> new SMSNotification(target);
            case "PUSH"  -> new PushNotification(target);
            default -> throw new IllegalArgumentException("Unknown: " + type);
        };
    }
}

public class FactoryDemo {
    public static void main(String[] args) {
        // Caller only knows "EMAIL", "SMS", "PUSH" — not the classes!
        Notification n1 = NotificationFactory.create("EMAIL", "alice@example.com");
        Notification n2 = NotificationFactory.create("SMS",   "+1-555-0100");
        Notification n3 = NotificationFactory.create("PUSH",  "device-abc123");

        n1.send("Your order has shipped!"); // Email
        n2.send("Your order has shipped!"); // SMS
        n3.send("Your order has shipped!"); // Push
    }
}`,
        output: `Email to alice@example.com: Your order has shipped!
SMS to +1-555-0100: Your order has shipped!
Push to device-abc123: Your order has shipped!`
      },
      {
        heading: "Builder Pattern — Readable Object Construction",
        content: "Problem: A class needs many parameters — new Server(\"host\", 8080, 100, 30, true, false, \"prod\") is unreadable and fragile. This is the 'telescoping constructor' anti-pattern. Solution: A nested Builder class with named fluent setter methods, ending with build(). Lombok @Builder generates this automatically in real projects.",
        code: `class HttpRequest {
    private final String method, url, body;
    private final int    timeout, maxRetries;
    private final boolean followRedirects;
    private final java.util.Map<String, String> headers;

    private HttpRequest(Builder b) {
        method = b.method; url = b.url; body = b.body;
        timeout = b.timeout; maxRetries = b.maxRetries;
        followRedirects = b.followRedirects;
        headers = java.util.Collections.unmodifiableMap(b.headers);
    }

    public String toString() {
        return String.format("%s %s (timeout=%ds, retries=%d, SSL=%s)%s",
            method, url, timeout, maxRetries, !followRedirects ? "off" : "on",
            body != null ? "\\n  body=" + body : "");
    }

    public static class Builder {
        private final String url;                      // required
        private String method = "GET";                 // optional with defaults
        private String body   = null;
        private int    timeout = 30, maxRetries = 3;
        private boolean followRedirects = true;
        private java.util.Map<String,String> headers = new java.util.HashMap<>();

        public Builder(String url) { this.url = url; }

        // Each returns 'this' — enables fluent chaining
        public Builder method(String m)  { method = m;          return this; }
        public Builder body(String b)    { body = b;            return this; }
        public Builder timeout(int s)    { timeout = s;         return this; }
        public Builder retries(int r)    { maxRetries = r;      return this; }
        public Builder noRedirects()     { followRedirects = false; return this; }
        public Builder header(String k, String v) { headers.put(k, v); return this; }

        public HttpRequest build() {
            if (url == null || url.isEmpty())
                throw new IllegalStateException("URL required");
            return new HttpRequest(this);
        }
    }

    public static void main(String[] args) {
        // Simple — only URL required
        HttpRequest get = new HttpRequest.Builder("https://api.example.com/users").build();
        System.out.println("GET: " + get);

        // Complex — fluent, all named, readable!
        HttpRequest post = new HttpRequest.Builder("https://api.example.com/users")
            .method("POST")
            .body("{\"name\":\"Alice\"}")
            .header("Content-Type", "application/json")
            .header("Authorization", "Bearer token123")
            .timeout(60).retries(5).noRedirects()
            .build();
        System.out.println("\\nPOST: " + post);
    }
}`,
        output: `GET: GET https://api.example.com/users (timeout=30s, retries=3, SSL=on)

POST: POST https://api.example.com/users (timeout=60s, retries=5, SSL=off)
  body={"name":"Alice"}`
      },
      {
        heading: "Observer Pattern — Automatic Notifications",
        content: "Problem: When something happens (user logs in), many parts of the app need to react (send email, write log, update dashboard). Hardcoding all reactions creates tight coupling — hard to add new ones. Solution: Publish-subscribe model. Subject fires events; observers subscribe and react automatically. Used in: GUI listeners, Android onClick, event-driven systems.",
        code: `import java.util.*;

interface EventListener { void onEvent(String type, Object data); }

class EventBus {
    private Map<String, List<EventListener>> subs = new HashMap<>();
    public void on(String event, EventListener l) {
        subs.computeIfAbsent(event, k -> new ArrayList<>()).add(l);
    }
    public void emit(String event, Object data) {
        System.out.println("[Event: " + event + "]");
        subs.getOrDefault(event, List.of()).forEach(l -> l.onEvent(event, data));
    }
}

// Concrete observers
class WelcomeEmailSender implements EventListener {
    public void onEvent(String type, Object data) {
        System.out.println("  Email: Welcome to " + data + "!");
    }
}
class AuditLogger implements EventListener {
    public void onEvent(String type, Object data) {
        System.out.println("  Audit: " + type + " by " + data);
    }
}
class MetricsCounter implements EventListener {
    private Map<String,Integer> counts = new HashMap<>();
    public void onEvent(String type, Object data) {
        counts.merge(type, 1, Integer::sum);
        System.out.println("  Metrics: " + type + " total=" + counts.get(type));
    }
}

public class ObserverDemo {
    public static void main(String[] args) {
        EventBus bus = new EventBus();
        WelcomeEmailSender emailer  = new WelcomeEmailSender();
        AuditLogger        audit    = new AuditLogger();
        MetricsCounter     metrics  = new MetricsCounter();

        // Subscribe: each event can have multiple listeners
        bus.on("USER_SIGNUP",  emailer);
        bus.on("USER_SIGNUP",  audit);
        bus.on("USER_SIGNUP",  metrics);
        bus.on("USER_LOGIN",   audit);
        bus.on("USER_LOGIN",   metrics);

        bus.emit("USER_SIGNUP", "alice");
        System.out.println();
        bus.emit("USER_LOGIN",  "alice");
        System.out.println();
        bus.emit("USER_LOGIN",  "bob");
    }
}`,
        output: `[Event: USER_SIGNUP]
  Email: Welcome to alice!
  Audit: USER_SIGNUP by alice
  Metrics: USER_SIGNUP total=1

[Event: USER_LOGIN]
  Audit: USER_LOGIN by alice
  Metrics: USER_LOGIN total=1

[Event: USER_LOGIN]
  Audit: USER_LOGIN by bob
  Metrics: USER_LOGIN total=2`
      },
      {
        heading: "Strategy Pattern — Swap Algorithms at Runtime",
        content: "Problem: Same operation, different behaviours (sort differently, calculate price differently, validate differently). If/else chains get messy and violate Open/Closed principle. Solution: Each behaviour is a separate class implementing the same interface. Swap the strategy at runtime without touching the context class. Java's Comparator IS the Strategy pattern.",
        code: `import java.util.*;

interface SortStrategy {
    void sort(int[] arr);
    String name();
}

class BubbleSort implements SortStrategy {
    public void sort(int[] arr) {
        for (int i = 0; i < arr.length - 1; i++)
            for (int j = 0; j < arr.length - i - 1; j++)
                if (arr[j] > arr[j+1]) { int t=arr[j]; arr[j]=arr[j+1]; arr[j+1]=t; }
    }
    public String name() { return "BubbleSort"; }
}

class JavaBuiltinSort implements SortStrategy {
    public void sort(int[] arr) { Arrays.sort(arr); }
    public String name() { return "Arrays.sort (TimSort)"; }
}

class ReverseBubble implements SortStrategy {
    public void sort(int[] arr) {
        for (int i = 0; i < arr.length - 1; i++)
            for (int j = 0; j < arr.length - i - 1; j++)
                if (arr[j] < arr[j+1]) { int t=arr[j]; arr[j]=arr[j+1]; arr[j+1]=t; }
    }
    public String name() { return "ReverseSort"; }
}

// Context: uses a strategy, can switch it at runtime
class Sorter {
    private SortStrategy strategy;
    Sorter(SortStrategy s) { this.strategy = s; }
    void setStrategy(SortStrategy s) {
        this.strategy = s;
        System.out.println("  Strategy switched to: " + s.name());
    }
    void sortAndPrint(int[] arr) {
        int[] copy = Arrays.copyOf(arr, arr.length);
        strategy.sort(copy);
        System.out.println("  [" + strategy.name() + "]: " + Arrays.toString(copy));
    }
}

public class StrategyDemo {
    public static void main(String[] args) {
        int[] data = {5, 2, 8, 1, 9, 3, 7, 4, 6};
        System.out.println("Input: " + Arrays.toString(data));

        Sorter s = new Sorter(new BubbleSort());
        s.sortAndPrint(data);

        s.setStrategy(new JavaBuiltinSort());
        s.sortAndPrint(data);

        s.setStrategy(new ReverseBubble());
        s.sortAndPrint(data);

        // Java's Comparator IS the Strategy pattern
        System.out.println("\\nComparator as Strategy:");
        List<String> names = new ArrayList<>(List.of("Alice","Bob","Charlie","Eve"));
        names.sort(Comparator.naturalOrder());
        System.out.println("  Natural: " + names);
        names.sort(Comparator.comparingInt(String::length));
        System.out.println("  By length: " + names);
        names.sort(Comparator.reverseOrder());
        System.out.println("  Reversed: " + names);
    }
}`,
        output: `Input: [5, 2, 8, 1, 9, 3, 7, 4, 6]
  [BubbleSort]: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  Strategy switched to: Arrays.sort (TimSort)
  [Arrays.sort (TimSort)]: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  Strategy switched to: ReverseSort
  [ReverseSort]: [9, 8, 7, 6, 5, 4, 3, 2, 1]

Comparator as Strategy:
  Natural: [Alice, Bob, Charlie, Eve]
  By length: [Bob, Eve, Alice, Charlie]
  Reversed: [Eve, Charlie, Bob, Alice]`
      },
      {
        heading: "Decorator Pattern — Add Behaviour by Wrapping",
        content: "Problem: You want to add features dynamically without subclassing (CoffeeWithMilk, CoffeeWithSugar, CoffeeWithMilkAndSugar...). Solution: Wrap the object in a decorator that adds behaviour and delegates to the original. Stack decorators like building blocks. Java I/O is built on this: new GZIPOutputStream(new BufferedOutputStream(new FileOutputStream(...))).",
        code: `// The classic Coffee Shop example
interface Coffee {
    String getDescription();
    double getCost();
}
class SimpleCoffee implements Coffee {
    public String getDescription() { return "Coffee"; }
    public double getCost()        { return 1.00; }
}
class Espresso implements Coffee {
    public String getDescription() { return "Espresso"; }
    public double getCost()        { return 1.50; }
}
// Abstract decorator wraps any Coffee
abstract class CoffeeDecorator implements Coffee {
    protected final Coffee coffee;
    CoffeeDecorator(Coffee c) { this.coffee = c; }
    public String getDescription() { return coffee.getDescription(); }
    public double getCost()        { return coffee.getCost(); }
}
// Concrete decorators — each adds one add-on
class Milk extends CoffeeDecorator {
    Milk(Coffee c) { super(c); }
    public String getDescription() { return coffee.getDescription() + " + Milk"; }
    public double getCost()        { return coffee.getCost() + 0.25; }
}
class Sugar extends CoffeeDecorator {
    Sugar(Coffee c) { super(c); }
    public String getDescription() { return coffee.getDescription() + " + Sugar"; }
    public double getCost()        { return coffee.getCost() + 0.10; }
}
class Vanilla extends CoffeeDecorator {
    Vanilla(Coffee c) { super(c); }
    public String getDescription() { return coffee.getDescription() + " + Vanilla"; }
    public double getCost()        { return coffee.getCost() + 0.50; }
}
class WhipCream extends CoffeeDecorator {
    WhipCream(Coffee c) { super(c); }
    public String getDescription() { return coffee.getDescription() + " + Whip"; }
    public double getCost()        { return coffee.getCost() + 0.35; }
}
public class DecoratorDemo {
    static void print(Coffee c) {
        System.out.printf("  %-50s $%.2f%n", c.getDescription(), c.getCost());
    }
    public static void main(String[] args) {
        print(new SimpleCoffee());
        print(new Milk(new SimpleCoffee()));
        print(new Sugar(new Milk(new Espresso())));
        print(new Vanilla(new WhipCream(new Sugar(new Milk(new Espresso())))));
        // Key insight: each decorator wraps ANY Coffee — compose freely!
    }
}`,
        output: `  Coffee                                             $1.00
  Coffee + Milk                                      $1.25
  Espresso + Milk + Sugar                            $1.85
  Espresso + Milk + Sugar + Whip + Vanilla           $2.70`
      }
    ],
    quiz: [
      { q: "Singleton ensures:", options: ["Thread safety everywhere", "Exactly ONE instance exists globally", "Performance optimization only", "Immutable objects"], correct: 1 },
      { q: "Builder pattern is best for:", options: ["Simple 1-2 param objects", "Objects with many optional params — avoids unreadable telescoping constructors", "Singleton objects", "Interfaces only"], correct: 1 },
      { q: "Observer creates:", options: ["One-to-one coupling", "One-to-many: subject notifies all subscribers automatically", "Many-to-one aggregation", "Parent-child inheritance"], correct: 1 },
      { q: "Strategy pattern allows:", options: ["Singleton instantiation", "Swapping algorithms at runtime without changing the context class", "Object cloning", "Lazy initialization"], correct: 1 },
      { q: "Decorator differs from inheritance because:", options: ["Decorator is slower", "Decorator adds behaviour dynamically at runtime; inheritance is fixed at compile time", "Decorator cannot add behaviour", "They are the same thing"], correct: 1 },
      { q: "Factory Method pattern hides:", options: ["The interface", "The concrete class being instantiated — callers only see the interface", "The algorithm", "Thread details"], correct: 1 }
    ],
    code: `import java.util.*;

// Template Method: skeleton algorithm, subclasses fill the steps
abstract class DataExporter {
    public final void export(String filename) { // FINAL — steps can't be reordered
        System.out.println("\\nExporting " + filename);
        openFile(filename);
        writeHeader();
        writeData();
        closeFile();
    }
    private void openFile(String f) { System.out.println("  Opening " + f); }
    private void closeFile()        { System.out.println("  Closing file\\n"); }
    protected abstract void writeHeader();
    protected abstract void writeData();
}
class CsvExporter extends DataExporter {
    protected void writeHeader() { System.out.println("  name,age,city"); }
    protected void writeData()   { System.out.println("  Alice,28,NYC\\n  Bob,32,LA"); }
}
class JsonExporter extends DataExporter {
    protected void writeHeader() { System.out.println("  ["); }
    protected void writeData()   { System.out.println("  {name:Alice,age:28},\\n  {name:Bob,age:32}\\n  ]"); }
}
public class TemplateDemo {
    public static void main(String[] args) {
        new CsvExporter().export("users.csv");
        new JsonExporter().export("users.json");
    }
}`,
    output: `
Exporting users.csv
  Opening users.csv
  name,age,city
  Alice,28,NYC
  Bob,32,LA
  Closing file

Exporting users.json
  Opening users.json
  [
  {name:Alice,age:28},
  {name:Bob,age:32}
  ]
  Closing file`
  },

  "file-io": {
    title: "File I/O — Complete Guide", module: "advanced", duration: "45 min", difficulty: "Advanced", xp: 200, icon: "📁",
    intro: "Java has two generations of File I/O. The old java.io package (File, FileReader, BufferedReader) has been around since Java 1. The modern java.nio.file package (Path, Files) was introduced in Java 7 (NIO.2) and is far better — more expressive, fewer exceptions to handle, cleaner API, and supports directory tree walking. In all new code, ALWAYS use java.nio.file. The old File class is for legacy code only.",
    sections: [
      {
        heading: "Understanding Paths — The Foundation",
        content: "Everything in java.nio starts with a Path. It represents a file or directory location — just a description, not the actual file. Path.of() creates paths (Java 11+). Paths.get() does the same (Java 7+). The Files class provides all static methods to actually DO things with paths.",
        code: `import java.nio.file.*;
import java.io.IOException;

public class PathsDemo {
    public static void main(String[] args) {
        // Creating paths — multiple ways
        Path p1 = Path.of("hello.txt");                   // relative
        Path p2 = Path.of("src", "main", "Main.java");    // segments joined
        Path p3 = Path.of("/home/alice/docs/report.pdf"); // absolute

        System.out.println("p1: " + p1);
        System.out.println("p2: " + p2);
        System.out.println("p3: " + p3);

        // Path components
        System.out.println("\\n--- Path info: " + p3);
        System.out.println("  getFileName():  " + p3.getFileName());  // report.pdf
        System.out.println("  getParent():    " + p3.getParent());    // /home/alice/docs
        System.out.println("  getRoot():      " + p3.getRoot());      // /
        System.out.println("  getNameCount(): " + p3.getNameCount()); // 4 parts
        System.out.println("  isAbsolute():   " + p3.isAbsolute());   // true

        // Resolving — combine two paths
        Path base = Path.of("/home/alice");
        Path resolved = base.resolve("docs/report.pdf");
        System.out.println("\\nresolved:   " + resolved);  // /home/alice/docs/report.pdf

        // Relativize — find relative path between two absolute paths
        Path from = Path.of("/home/alice");
        Path to   = Path.of("/home/alice/docs/report.pdf");
        System.out.println("relativize: " + from.relativize(to)); // docs/report.pdf

        // Normalize — remove . and .. components
        Path messy = Path.of("/home/alice/../alice/./docs/report.pdf");
        System.out.println("normalized: " + messy.normalize()); // /home/alice/docs/report.pdf

        // Existence checks (file must exist for these)
        Path current = Path.of(".");
        System.out.println("\\ncurrent exists:     " + Files.exists(current));
        System.out.println("is directory:       " + Files.isDirectory(current));
    }
}`,
        output: `p1: hello.txt
p2: src/main/Main.java
p3: /home/alice/docs/report.pdf

--- Path info: /home/alice/docs/report.pdf
  getFileName():  report.pdf
  getParent():    /home/alice/docs
  getRoot():      /
  getNameCount(): 4 parts
  isAbsolute():   true

resolved:   /home/alice/docs/report.pdf
relativize: docs/report.pdf
normalized: /home/alice/docs/report.pdf

current exists:     true
is directory:       true`
      },
      {
        heading: "Reading Files — All the Ways",
        content: "Choose the right read method for your use case. readString() for small files into one String. readAllLines() for line-by-line into List<String>. lines() for streaming large files lazily (doesn't load everything into memory). readAllBytes() for binary files. For large files ALWAYS use lines() — readString/readAllLines load the entire file into memory.",
        code: `import java.nio.file.*;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.io.*;

public class ReadingFiles {
    public static void main(String[] args) throws IOException {
        // Create a sample file
        Path file = Path.of("sample.txt");
        Files.writeString(file,
            "Line 1: Hello, Java File I/O!\\n" +
            "Line 2: NIO.2 is the modern way.\\n" +
            "Line 3: Always use try-with-resources.\\n" +
            "Line 4: Path and Files are your friends.\\n" +
            "Line 5: Never cat a binary file."
        );

        // 1. readString — entire file as one String (small files)
        System.out.println("=== readString() ===");
        String content = Files.readString(file);
        System.out.println(content);

        // 2. readAllLines — returns List<String>
        System.out.println("=== readAllLines() ===");
        List<String> lines = Files.readAllLines(file);
        for (int i = 0; i < lines.size(); i++)
            System.out.println("  [" + (i+1) + "] " + lines.get(i));

        // 3. lines() — Stream<String>, LAZY — best for large files
        System.out.println("\\n=== lines() stream ===");
        long count = Files.lines(file).count();
        System.out.println("  Total lines: " + count);

        System.out.println("  Lines with 'modern' or 'always':");
        Files.lines(file)
             .filter(l -> l.toLowerCase().contains("modern")
                       || l.toLowerCase().contains("always"))
             .forEach(l -> System.out.println("  → " + l));

        // 4. readAllBytes — for binary files
        System.out.println("\\n=== readAllBytes() ===");
        byte[] bytes = Files.readAllBytes(file);
        System.out.println("  File size: " + bytes.length + " bytes");

        // 5. BufferedReader — fine-grained control
        System.out.println("\\n=== BufferedReader ===");
        try (BufferedReader reader = Files.newBufferedReader(file)) {
            String line;
            while ((line = reader.readLine()) != null) {
                if (line.contains("NIO") || line.contains("Path"))
                    System.out.println("  MATCH: " + line);
            }
        } // auto-closed by try-with-resources!

        Files.deleteIfExists(file);
    }
}`,
        output: `=== readString() ===
Line 1: Hello, Java File I/O!
Line 2: NIO.2 is the modern way.
Line 3: Always use try-with-resources.
Line 4: Path and Files are your friends.
Line 5: Never cat a binary file.

=== readAllLines() ===
  [1] Line 1: Hello, Java File I/O!
  [2] Line 2: NIO.2 is the modern way.
  [3] Line 3: Always use try-with-resources.
  [4] Line 4: Path and Files are your friends.
  [5] Line 5: Never cat a binary file.

=== lines() stream ===
  Total lines: 5
  Lines with 'modern' or 'always':
  → Line 2: NIO.2 is the modern way.
  → Line 3: Always use try-with-resources.

=== readAllBytes() ===
  File size: 181 bytes

=== BufferedReader ===
  MATCH: Line 2: NIO.2 is the modern way.
  MATCH: Line 4: Path and Files are your friends.`
      },
      {
        heading: "Writing Files — All the Ways",
        content: "Files.writeString() is the simplest for text. Files.write(path, List) writes line-by-line. BufferedWriter gives fine-grained control. StandardOpenOption lets you APPEND, CREATE_NEW, or TRUNCATE_EXISTING. Always use try-with-resources for any stream-based writing — it auto-closes even on exception.",
        code: `import java.nio.file.*;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.io.*;

public class WritingFiles {
    public static void main(String[] args) throws IOException {

        // 1. writeString — simplest one-liner
        Path f1 = Path.of("out1.txt");
        Files.writeString(f1, "Hello, Java NIO!\\nLine 2 here.");
        System.out.println("1. writeString: " + Files.readString(f1));

        // 2. write with List<String>
        Path f2 = Path.of("out2.txt");
        Files.write(f2, List.of("Alice,28,Engineer", "Bob,32,Designer", "Carol,25,Dev"),
                    StandardCharsets.UTF_8);
        System.out.println("2. write List: " + Files.readAllLines(f2));

        // 3. APPEND — add to end without overwriting
        Files.writeString(f2, "\\nDave,29,Manager", StandardOpenOption.APPEND);
        System.out.println("3. After append, lines: " + Files.readAllLines(f2).size());

        // 4. BufferedWriter — fine-grained control, large files
        Path f3 = Path.of("out3.csv");
        try (BufferedWriter writer = Files.newBufferedWriter(f3)) {
            writer.write("Name,Score,Grade");
            writer.newLine();  // platform-correct line separator
            String[][] data = {{"Alice","95","A"},{"Bob","87","B"},{"Carol","72","C"}};
            for (String[] row : data) {
                writer.write(String.join(",", row));
                writer.newLine();
            }
            writer.flush(); // ensure buffered data is written
        }  // auto-closed!
        System.out.println("4. CSV written:");
        Files.readAllLines(f3).forEach(l -> System.out.println("   " + l));

        // 5. StandardOpenOption.CREATE_NEW — fail if file exists
        Path f4 = Path.of("brand_new.txt");
        Files.writeString(f4, "brand new", StandardOpenOption.CREATE_NEW);
        System.out.println("5. CREATE_NEW worked: " + Files.exists(f4));

        // Cleanup
        for (Path p : new Path[]{f1,f2,f3,f4}) Files.deleteIfExists(p);
    }
}`,
        output: `1. writeString: Hello, Java NIO!
Line 2 here.
2. write List: [Alice,28,Engineer, Bob,32,Designer, Carol,25,Dev]
3. After append, lines: 4
4. CSV written:
   Name,Score,Grade
   Alice,95,A
   Bob,87,B
   Carol,72,C
5. CREATE_NEW worked: true`
      },
      {
        heading: "Directory Operations — Create, List, Walk, Delete",
        content: "createDirectories() creates the full path (like mkdir -p). list() streams immediate children only. walk() recursively traverses the whole tree as a Stream<Path>. To delete a non-empty directory tree, walk() in REVERSE order (files before directories) and delete each entry.",
        code: `import java.nio.file.*;
import java.util.*;
import java.io.*;

public class DirectoryOps {
    public static void main(String[] args) throws IOException {

        // 1. Create full directory tree
        Files.createDirectories(Path.of("project/src/main/java"));
        Files.createDirectories(Path.of("project/src/test/java"));
        Files.createDirectories(Path.of("project/resources"));

        // Create some files
        Files.writeString(Path.of("project/README.md"),         "# My Project");
        Files.writeString(Path.of("project/src/main/java/Main.java"), "class Main{}");
        Files.writeString(Path.of("project/src/main/java/App.java"),  "class App{}");
        Files.writeString(Path.of("project/src/test/java/Test.java"), "class Test{}");
        Files.writeString(Path.of("project/resources/config.properties"), "host=localhost");
        System.out.println("1. Directory tree created");

        // 2. List immediate children only
        System.out.println("\\n2. Immediate children of project/:");
        Files.list(Path.of("project"))
             .forEach(p -> System.out.println("   " + p.getFileName()
                 + (Files.isDirectory(p) ? "/" : "")));

        // 3. Walk entire tree
        System.out.println("\\n3. Full tree:");
        Path base = Path.of("project");
        Files.walk(base).forEach(p -> {
            int depth = base.relativize(p).getNameCount();
            System.out.println("   " + "  ".repeat(depth - 1) + p.getFileName()
                + (Files.isDirectory(p) ? "/" : ""));
        });

        // 4. Find only .java files
        System.out.println("\\n4. All .java files:");
        Files.walk(base)
             .filter(p -> p.toString().endsWith(".java"))
             .forEach(p -> System.out.println("   " + base.relativize(p)));

        // 5. File sizes
        System.out.println("\\n5. File sizes:");
        Files.walk(base)
             .filter(Files::isRegularFile)
             .forEach(p -> {
                 try { System.out.printf("   %-40s %d bytes%n",
                     base.relativize(p), Files.size(p));
                 } catch (IOException e) {}
             });

        // 6. Delete entire tree — walk in REVERSE (files before dirs!)
        Files.walk(base)
             .sorted(Comparator.reverseOrder())
             .forEach(p -> { try { Files.delete(p); } catch (IOException e) {} });
        System.out.println("\\n6. Deleted — exists: " + Files.exists(base));
    }
}`,
        output: `1. Directory tree created

2. Immediate children of project/:
   README.md
   resources/
   src/

3. Full tree:
   project/
     README.md
     resources/
       config.properties
     src/
       main/
         java/
           App.java
           Main.java
       test/
         java/
           Test.java

4. All .java files:
   src/main/java/App.java
   src/main/java/Main.java
   src/test/java/Test.java

5. File sizes:
   README.md                                13 bytes
   resources/config.properties             15 bytes
   src/main/java/App.java                  10 bytes
   src/main/java/Main.java                 11 bytes
   src/test/java/Test.java                 12 bytes

6. Deleted — exists: false`
      },
      {
        heading: "Copy, Move, Delete & File Metadata",
        content: "Files.copy() and Files.move() both accept CopyOptions. REPLACE_EXISTING prevents failure if destination exists. ATOMIC_MOVE makes rename transactional. Files.deleteIfExists() is safer than delete() — it doesn't throw if the file doesn't exist. Files provides rich metadata via size(), isReadable(), getLastModifiedTime().",
        code: `import java.nio.file.*;
import java.io.IOException;

public class FileOperations {
    public static void main(String[] args) throws IOException {
        Files.writeString(Path.of("original.txt"),
            "Hello!\\nLine 2\\nLine 3");

        // Copy
        Files.copy(Path.of("original.txt"), Path.of("copy.txt"));
        System.out.println("Copied:  " + Files.readString(Path.of("copy.txt")));

        // Copy with REPLACE_EXISTING — no exception if dest already exists
        Files.copy(Path.of("original.txt"), Path.of("copy.txt"),
            StandardCopyOption.REPLACE_EXISTING);
        System.out.println("Overwrite OK");

        // Move (rename)
        Files.move(Path.of("original.txt"), Path.of("renamed.txt"),
            StandardCopyOption.REPLACE_EXISTING);
        System.out.println("\\noriginal.txt exists: " + Files.exists(Path.of("original.txt")));
        System.out.println("renamed.txt exists:  " + Files.exists(Path.of("renamed.txt")));

        // Delete — throws NoSuchFileException if missing
        Files.delete(Path.of("renamed.txt"));
        // deleteIfExists — safe, no exception even if missing
        Files.deleteIfExists(Path.of("doesnt_exist.txt"));
        System.out.println("Deleted safely");

        // Temp file — auto-deleted on JVM exit
        Path temp = Files.createTempFile("myapp-", ".tmp");
        Files.writeString(temp, "temporary data");
        System.out.println("\\nTemp file: " + temp.getFileName());
        System.out.println("Content:   " + Files.readString(temp));
        temp.toFile().deleteOnExit(); // auto cleanup

        // File metadata
        Path f = Path.of("copy.txt");
        System.out.println("\\nMetadata for " + f + ":");
        System.out.println("  Size:      " + Files.size(f) + " bytes");
        System.out.println("  Readable:  " + Files.isReadable(f));
        System.out.println("  Writable:  " + Files.isWritable(f));
        System.out.println("  Hidden:    " + Files.isHidden(f));
        System.out.println("  Modified:  " + Files.getLastModifiedTime(f));

        Files.deleteIfExists(Path.of("copy.txt"));
    }
}`,
        output: `Copied:  Hello!
Line 2
Line 3
Overwrite OK

original.txt exists: false
renamed.txt exists:  true
Deleted safely

Temp file: myapp-8473627483.tmp
Content:   temporary data

Metadata for copy.txt:
  Size:      20 bytes
  Readable:  true
  Writable:  true
  Hidden:    false
  Modified:  2024-11-15T10:45:32Z`
      },
      {
        heading: "Real-World Example — CSV Log Processor",
        content: "A practical example combining reading, filtering, writing, and directory operations — the kind of File I/O task you'd do in real backend development: reading log files, filtering by level, generating a summary report.",
        code: `import java.nio.file.*;
import java.util.*;
import java.util.stream.*;
import java.io.*;

public class LogProcessor {

    record LogEntry(String level, String timestamp, String message) {
        static LogEntry parse(String line) {
            // Format: [LEVEL] TIMESTAMP - message
            if (!line.startsWith("[")) return null;
            int end = line.indexOf(']');
            String level = line.substring(1, end);
            String rest  = line.substring(end + 2);
            String[] parts = rest.split(" - ", 2);
            if (parts.length < 2) return null;
            return new LogEntry(level, parts[0].trim(), parts[1].trim());
        }
    }

    public static void main(String[] args) throws IOException {
        // Create a sample log file
        Path logFile = Path.of("app.log");
        Files.write(logFile, List.of(
            "[INFO]  2024-01-15 10:00:01 - Application started",
            "[INFO]  2024-01-15 10:00:05 - Database connected",
            "[WARN]  2024-01-15 10:01:23 - Slow query detected (2.3s)",
            "[INFO]  2024-01-15 10:02:00 - User alice logged in",
            "[ERROR] 2024-01-15 10:03:15 - NullPointerException in UserService",
            "[INFO]  2024-01-15 10:04:00 - User bob logged in",
            "[ERROR] 2024-01-15 10:05:30 - Timeout connecting to payment service",
            "[WARN]  2024-01-15 10:06:00 - Memory usage at 85%",
            "[ERROR] 2024-01-15 10:08:45 - Disk write failed: /var/data"
        ));

        // Parse all log entries
        List<LogEntry> entries = Files.lines(logFile)
            .map(LogEntry::parse)
            .filter(Objects::nonNull)
            .collect(Collectors.toList());

        System.out.println("Total entries: " + entries.size());

        // Count by level
        Map<String, Long> counts = entries.stream()
            .collect(Collectors.groupingBy(LogEntry::level, Collectors.counting()));
        System.out.println("Counts: " + counts);

        // Write error report
        List<LogEntry> errors = entries.stream()
            .filter(e -> e.level().equals("ERROR"))
            .collect(Collectors.toList());

        Path report = Path.of("error-report.txt");
        try (BufferedWriter w = Files.newBufferedWriter(report)) {
            w.write("=== ERROR REPORT ===\\n");
            w.write("Generated: " + java.time.LocalDate.now() + "\\n");
            w.write("Errors found: " + errors.size() + "\\n\\n");
            for (LogEntry e : errors) {
                w.write("[" + e.timestamp() + "] " + e.message() + "\\n");
            }
        }

        System.out.println("\\nError report:");
        System.out.println(Files.readString(report));

        // Cleanup
        Files.deleteIfExists(logFile);
        Files.deleteIfExists(report);
    }
}`,
        output: `Total entries: 9
Counts: {INFO=4, WARN=2, ERROR=3}

Error report:
=== ERROR REPORT ===
Generated: 2024-01-15
Errors found: 3

[2024-01-15 10:03:15] NullPointerException in UserService
[2024-01-15 10:05:30] Timeout connecting to payment service
[2024-01-15 10:08:45] Disk write failed: /var/data`
      }
    ],
    quiz: [
      { q: "Modern Java file I/O should use:", options: ["java.io.File and FileReader", "java.nio.file.Files and Path", "java.util.FileUtils", "java.io.FileInputStream only"], correct: 1 },
      { q: "Files.readString() vs Files.lines():", options: ["Same performance", "readString loads entire file; lines() is lazy — use lines() for large files", "lines() is slower", "readString is deprecated"], correct: 1 },
      { q: "StandardOpenOption.APPEND does:", options: ["Overwrites the file", "Creates a new file", "Adds content to end of existing file", "Deletes then recreates"], correct: 2 },
      { q: "Files.createDirectories() vs createDirectory():", options: ["Same thing", "createDirectories creates full path including parents; createDirectory fails if parent missing", "createDirectory creates full path", "Both fail if exists"], correct: 1 },
      { q: "To delete a directory tree you must:", options: ["Call Files.delete(dir) — it recurses automatically", "Walk in REVERSE order (files first, then dirs) and delete each", "Use Files.deleteRecursively()", "Set a recursive flag on Files.walk()"], correct: 1 },
      { q: "Why use try-with-resources for file streams?", options: ["It makes reading faster", "It auto-calls close() even if an exception is thrown — prevents resource leaks", "It handles encoding automatically", "It buffers the stream"], correct: 1 }
    ],
    code: `import java.nio.file.*;
import java.util.*;
import java.util.stream.*;

public class FileStats {
    public static void main(String[] args) throws Exception {
        Path file = Path.of("words.txt");
        Files.writeString(file,
            "the quick brown fox\\njumps over the lazy dog\\njava is powerful and fast\\nthe fox was quick");

        List<String> lines = Files.readAllLines(file);
        long wordCount = Files.lines(file)
            .flatMap(l -> Arrays.stream(l.trim().split("\\\\s+")))
            .filter(w -> !w.isEmpty()).count();
        long charCount = Files.readString(file).replace("\\n","").length();

        System.out.println("=== File Analysis ===");
        System.out.println("Lines: " + lines.size());
        System.out.println("Words: " + wordCount);
        System.out.println("Chars: " + charCount);

        System.out.println("\\nTop 5 words:");
        Files.lines(file)
            .flatMap(l -> Arrays.stream(l.toLowerCase().split("\\\\s+")))
            .collect(Collectors.groupingBy(w -> w, Collectors.counting()))
            .entrySet().stream()
            .sorted(Map.Entry.<String,Long>comparingByValue().reversed())
            .limit(5)
            .forEach(e -> System.out.printf("  %-10s %dx%n", e.getKey(), e.getValue()));

        Files.deleteIfExists(file);
    }
}`,
    output: `=== File Analysis ===
Lines: 4
Words: 17
Chars: 73

Top 5 words:
  the        3x
  fox        2x
  quick      2x
  brown      1x
  jumps      1x`
  }
}
export const INTERVIEW_TOPICS = {

  "interview-core": {
    title: "Core Java — Interview Masterclass", module: "interview", duration: "50 min", difficulty: "Intermediate", xp: 250, icon: "💼",
    intro: "Core Java questions are asked in EVERY Java interview — from fresher to senior. These cover the fundamentals that separate those who truly understand Java from those who just use it. This guide covers the WHY behind every answer, not just the WHAT.",
    sections: [
      {
        heading: "Strings — == vs equals(), String Pool, Immutability",
        content: "String questions are the most commonly asked in Java interviews. You MUST understand the String pool, why == fails for Strings, and why Strings are immutable.",
        code: `public class StringInterview {
    public static void main(String[] args) {
        String s1 = "hello";           // String Pool
        String s2 = "hello";           // Reuses pool object
        String s3 = new String("hello"); // New heap object

        System.out.println("s1 == s2:      " + (s1 == s2));     // true (same pool ref)
        System.out.println("s1 == s3:      " + (s1 == s3));     // false (diff objects)
        System.out.println("s1.equals(s3): " + s1.equals(s3));  // true (same content)

        // intern() puts string into pool
        String s4 = s3.intern();
        System.out.println("s1 == s4:      " + (s1 == s4));     // true (now same pool ref)

        // Why strings are IMMUTABLE:
        // 1. Thread safety — shared safely
        // 2. Security — passwords/class names can't be changed
        // 3. HashMap key caching — hashCode computed once
        String original = "Hello";
        String modified = original.toUpperCase(); // NEW object created
        System.out.println("original: " + original); // Hello (unchanged!)
        System.out.println("modified: " + modified); // HELLO

        // StringBuilder for loops — O(n) not O(n²)
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 5; i++) sb.append(i);
        System.out.println("sb: " + sb.toString()); // 01234

        // String methods cheat sheet
        String s = "  Hello, Java World!  ";
        System.out.println(s.trim());                    // Hello, Java World!
        System.out.println(s.trim().contains("Java"));   // true
        System.out.println(s.trim().replace("Java","Python")); // Hello, Python World!
        System.out.println(s.trim().substring(7, 11));   // Java
        System.out.println(String.valueOf(42));           // 42
        System.out.println("".isEmpty());                 // true
        System.out.println("   ".isBlank());              // true (Java 11)
    }
}`,
        output: `s1 == s2:      true
s1 == s3:      false
s1.equals(s3): true
s1 == s4:      true
original: Hello
modified: HELLO
sb: 01234
Hello, Java World!
true
Hello, Python World!
Java
42
true
true`
      },
      {
        heading: "Autoboxing, Integer Cache & Wrapper Classes",
        content: "Autoboxing is automatic conversion between primitives (int, double) and wrapper classes (Integer, Double). The Integer Cache (-128 to 127) is a classic interview trap. ALWAYS use .equals() for Integer comparison!",
        code: `public class AutoboxingDemo {
    public static void main(String[] args) {
        // Autoboxing: int → Integer (automatic)
        int primitive = 42;
        Integer wrapper = primitive;  // Integer.valueOf(42)
        int unboxed     = wrapper;    // wrapper.intValue()

        // NULL TRAP — NullPointerException on unboxing!
        Integer nullScore = null;
        try {
            int score = nullScore; // unboxing null → NPE!
        } catch (NullPointerException e) {
            System.out.println("NPE: cannot unbox null Integer!");
        }

        // INTEGER CACHE TRAP (most famous interview question!)
        Integer a = 127, b = 127; // CACHED  — same object
        Integer c = 128, d = 128; // NOT cached — new objects

        System.out.println("127 == 127: " + (a == b)); // TRUE  — cached!
        System.out.println("128 == 128: " + (c == d)); // FALSE — different objects
        System.out.println("128 equals: " + c.equals(d)); // TRUE — ALWAYS use equals!

        // Wrapper utilities
        System.out.println(Integer.parseInt("42"));      // 42
        System.out.println(Integer.toBinaryString(10));  // 1010
        System.out.println(Integer.toHexString(255));    // ff
        System.out.println(Integer.MAX_VALUE);           // 2147483647
        System.out.println(Character.isDigit('5'));     // true
        System.out.println(Character.toUpperCase('a')); // A
    }
}`,
        output: `NPE: cannot unbox null Integer!
127 == 127: true
128 == 128: false
128 equals: true
42
1010
ff
2147483647
true
A`
      },
      {
        heading: "final, finally, finalize — The Three Finals",
        content: "final = keyword for immutability (field, method, class). finally = cleanup block that ALWAYS runs. finalize() = deprecated GC callback (never use this).",
        code: `public class ThreeFinalsDemo {
    static final double PI = 3.14159; // final field — constant

    // final method: can't be overridden
    final String version() { return "1.0"; }

    static String readData(boolean fail) {
        try {
            if (fail) throw new RuntimeException("Error!");
            System.out.println("  try: success");
            return "data";  // finally still runs before this returns!
        } catch (RuntimeException e) {
            System.out.println("  catch: " + e.getMessage());
            return "fallback";
        } finally {
            // ALWAYS runs — even with return or exception
            System.out.println("  finally: cleanup!");
        }
    }

    public static void main(String[] args) {
        System.out.println("== final ==");
        System.out.println("PI = " + PI);
        // PI = 3.0; // COMPILE ERROR

        System.out.println("
== finally (normal) ==");
        System.out.println("Result: " + readData(false));

        System.out.println("
== finally (exception) ==");
        System.out.println("Result: " + readData(true));
    }
}`,
        output: `== final ==
PI = 3.14159

== finally (normal) ==
  try: success
  finally: cleanup!
Result: data

== finally (exception) ==
  catch: Error!
  finally: cleanup!
Result: fallback`
      },
      {
        heading: "Comparable vs Comparator, Exception Handling",
        content: "Comparable = natural ordering inside the class (compareTo). Comparator = external/custom ordering. Use Comparable for one default order, Comparator for multiple sort orders. Know checked vs unchecked exceptions and try-with-resources.",
        code: `import java.util.*;

class Student implements Comparable<Student> {
    String name; int score;
    Student(String n, int s) { name=n; score=s; }
    @Override public int compareTo(Student o) { return this.name.compareTo(o.name); }
    @Override public String toString() { return name + "(" + score + ")"; }
}

// Custom checked exception
class InsufficientFundsException extends Exception {
    InsufficientFundsException(double needed) {
        super("Need $" + needed + " more");
    }
}

public class ComparableAndExceptions {
    static void withdraw(double balance, double amount) throws InsufficientFundsException {
        if (amount > balance) throw new InsufficientFundsException(amount - balance);
        System.out.println("Withdrew $" + amount);
    }

    public static void main(String[] args) throws Exception {
        List<Student> students = new ArrayList<>(
            List.of(new Student("Charlie",88), new Student("Alice",95), new Student("Bob",72)));

        Collections.sort(students); // uses Comparable (by name)
        System.out.println("By name:  " + students);

        students.sort(Comparator.comparingInt(s -> s.score)); // Comparator
        System.out.println("By score: " + students);

        students.sort(Comparator.comparingInt((Student s)->s.score).reversed());
        System.out.println("Score desc:" + students);

        // Checked exception
        try {
            withdraw(100, 50);   // OK
            withdraw(100, 200);  // throws InsufficientFundsException
        } catch (InsufficientFundsException e) {
            System.out.println("Caught: " + e.getMessage());
        }

        // Multi-catch (Java 7+)
        try {
            Object[] arr = {"hello", null};
            for (Object o : arr) System.out.println(((String)o).length());
        } catch (ClassCastException | NullPointerException e) {
            System.out.println("Multi-catch: " + e.getClass().getSimpleName());
        }
    }
}`,
        output: `By name:   [Alice(95), Bob(72), Charlie(88)]
By score:  [Bob(72), Charlie(88), Alice(95)]
Score desc:[Alice(95), Charlie(88), Bob(72)]
Withdrew $50.0
Caught: Need $100.0 more
Multi-catch: NullPointerException`
      }
    ],
    quiz: [
      { q: "Why does 's1 == s2' return true for String literals?", options: ["Strings are primitives", "String literals reuse the same pool object — same content = same reference", "Java optimises == for Strings", "Only works in Java 11+"], correct: 1 },
      { q: "Integer cache covers which range?", options: ["-256 to 256", "-128 to 127", "0 to 255", "Any value"], correct: 1 },
      { q: "finally block executes:", options: ["Only if no exception", "Only on exception", "ALWAYS — even with return statement in try/catch", "Only in Java 7+"], correct: 2 },
      { q: "StringBuilder vs String in a loop:", options: ["Same", "StringBuilder O(n); String concat O(n²) — always use StringBuilder in loops", "String is faster", "No difference"], correct: 1 },
      { q: "Comparable vs Comparator:", options: ["Same", "Comparable: natural order inside class. Comparator: custom order outside class.", "Comparator is inside the class", "Comparable supports multiple orders"], correct: 1 },
      { q: "Checked exception must be:", options: ["Ignored", "Declared with throws or caught in try-catch", "Extended from RuntimeException", "Used only in production"], correct: 1 }
    ],
    code: `public class CoreQuickReview {
    public static void main(String[] args) {
        // String pool
        String a = "test", b = "test", c = new String("test");
        System.out.println("Pool: " + (a==b) + " | Heap: " + (a==c) + " | equals: " + a.equals(c));

        // Integer cache
        Integer x = 127, y = 127, p = 200, q = 200;
        System.out.println("127==: " + (x==y) + " | 200==: " + (p==q) + " | .equals: " + p.equals(q));

        // finally
        try { throw new RuntimeException(); }
        catch (RuntimeException e) { System.out.println("caught"); }
        finally { System.out.println("finally runs!"); }
    }
}`,
    output: `Pool: true | Heap: false | equals: true
127==: true | 200==: false | .equals: true
caught
finally runs!`
  },

  "interview-oop": {
    title: "OOP — Interview Masterclass", module: "interview", duration: "45 min", difficulty: "Intermediate", xp: 225, icon: "🏗️",
    intro: "OOP is tested in EVERY Java interview. Interviewers don't just want definitions — they want you to explain WHY each principle matters and show real code. This guide covers all 4 pillars with real examples, abstract vs interface (with Java 8+ changes), method overloading vs overriding, and SOLID principles.",
    sections: [
      {
        heading: "4 Pillars of OOP — With Real Code",
        content: "Encapsulation (hide data), Inheritance (reuse code), Polymorphism (one interface, many forms), Abstraction (hide complexity). Know these deeply — not just definitions.",
        code: `import java.util.*;

// 1. ENCAPSULATION — hide data, expose controlled access
class BankAccount {
    private double balance;  // PRIVATE — no direct access
    private String owner;
    public BankAccount(String owner, double initial) {
        this.owner = owner;
        this.balance = initial > 0 ? initial : 0; // validation!
    }
    public double getBalance() { return balance; }
    public void deposit(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("Positive only");
        balance += amount;
        System.out.println(owner + " deposited $" + amount + " → $" + balance);
    }
    public void withdraw(double amount) {
        if (amount > balance) throw new IllegalStateException("Insufficient funds");
        balance -= amount;
        System.out.println(owner + " withdrew $" + amount + " → $" + balance);
    }
}

// 2. INHERITANCE — IS-A relationship
class Animal { String name; Animal(String n){name=n;} String sound(){return "...";} }
class Dog  extends Animal { Dog(String n){super(n);} @Override String sound(){return "Woof!";} }
class Cat  extends Animal { Cat(String n){super(n);} @Override String sound(){return "Meow!";} }

// 3. POLYMORPHISM — runtime method dispatch
// Reference type = Animal, actual object = Dog/Cat → correct sound() called at runtime!

// 4. ABSTRACTION — hide complexity behind a simple interface
abstract class Shape {
    abstract double area();
    void printInfo() { System.out.printf("%s area=%.2f%n",getClass().getSimpleName(),area()); }
}
class Circle extends Shape {
    double r; Circle(double r){this.r=r;}
    @Override double area(){ return Math.PI*r*r; }
}
class Rectangle extends Shape {
    double w,h; Rectangle(double w,double h){this.w=w;this.h=h;}
    @Override double area(){ return w*h; }
}

public class FourPillars {
    public static void main(String[] args) {
        System.out.println("== ENCAPSULATION ==");
        BankAccount acc = new BankAccount("Alice", 1000);
        acc.deposit(500); acc.withdraw(200);
        // acc.balance = 9999; // COMPILE ERROR — private!

        System.out.println("\\n== INHERITANCE & POLYMORPHISM ==");
        Animal[] animals = { new Dog("Rex"), new Cat("Whiskers") };
        for (Animal a : animals) System.out.println(a.name + ": " + a.sound()); // runtime dispatch!

        System.out.println("\\n== ABSTRACTION ==");
        Shape[] shapes = { new Circle(5), new Rectangle(4, 6) };
        for (Shape s : shapes) s.printInfo();
    }
}`,
        output: `== ENCAPSULATION ==
Alice deposited $500.0 → $1500.0
Alice withdrew $200.0 → $1300.0

== INHERITANCE & POLYMORPHISM ==
Rex: Woof!
Whiskers: Meow!

== ABSTRACTION ==
Circle area=78.54
Rectangle area=24.00`
      },
      {
        heading: "Abstract Class vs Interface — Complete Guide",
        content: "The most asked OOP question! The answer changed in Java 8 (default methods) and Java 9 (private methods). Know the difference AND when to use each one.",
        table: {
          headers: ["Feature", "Abstract Class", "Interface"],
          rows: [
            ["State (fields)", "Yes — instance fields allowed", "Only public static final constants"],
            ["Constructor", "Yes — can have constructors", "No — cannot have constructor"],
            ["Concrete methods", "Yes — any method body", "Java 8+: default and static methods only"],
            ["Inheritance", "Single (extends one class)", "Multiple (implements many interfaces)"],
            ["Access modifiers", "Any modifier", "public only (default for members)"],
            ["Best use case", "Closely related classes sharing CODE + STATE", "Contract for unrelated classes; multiple inheritance"]
          ]
        },
        code: `// Abstract class: shared CODE and STATE
abstract class Vehicle {
    protected String brand;  // STATE — only abstract classes can have this
    protected int year;
    Vehicle(String brand, int year) { this.brand=brand; this.year=year; } // CONSTRUCTOR

    abstract double fuelEfficiency(); // subclass must implement
    abstract String type();

    // Shared CONCRETE method — reused by all vehicles
    void describe() {
        System.out.printf("%d %s [%s]: %.1f km/L%n", year, brand, type(), fuelEfficiency());
    }
}

// Interface: CONTRACT — unrelated classes can implement it
interface Electric {
    int batteryKwh();
    default void charge() { System.out.println("Charging at 50kW..."); } // Java 8+
    static boolean isEV(String type) { return type.equals("Electric"); }  // Java 8+
}

interface Autonomous {
    int saeLevel();
    default String autonomyDesc() { return "SAE Level " + saeLevel(); }
}

// Extends abstract class AND implements multiple interfaces!
class Tesla extends Vehicle implements Electric, Autonomous {
    private int battery;
    Tesla(String m, int y, int b) { super(m, y); battery=b; }
    @Override public double fuelEfficiency() { return 0; }
    @Override public String type()           { return "Electric"; }
    @Override public int batteryKwh()        { return battery; }
    @Override public int saeLevel()          { return 3; }
    @Override public void charge() { System.out.println(brand + " Supercharging at 250kW!"); }
}

class Sedan extends Vehicle {
    Sedan(String b, int y) { super(b,y); }
    @Override public double fuelEfficiency() { return 15.0; }
    @Override public String type()           { return "Petrol"; }
}

public class AbstractVsInterface {
    public static void main(String[] args) {
        Tesla tesla = new Tesla("Model 3", 2023, 75);
        Sedan honda = new Sedan("Civic", 2022);
        tesla.describe(); honda.describe();
        tesla.charge();
        System.out.println("Battery: " + tesla.batteryKwh() + " kWh");
        System.out.println(tesla.autonomyDesc());
        System.out.println("Is EV: " + Electric.isEV(tesla.type()));
    }
}`,
        output: `2023 Model 3 [Electric]: 0.0 km/L
2022 Civic [Petrol]: 15.0 km/L
Model 3 Supercharging at 250kW!
Battery: 75 kWh
SAE Level 3
Is EV: true`
      },
      {
        heading: "Overloading vs Overriding, SOLID Principles",
        content: "Overloading = same name, different params, resolved at COMPILE time. Overriding = same signature in subclass, resolved at RUNTIME. SOLID principles are key for senior interviews.",
        code: `import java.util.*;

// OVERLOADING: compile time, same class
class Calculator {
    int add(int a, int b)            { return a + b; }           // version 1
    double add(double a, double b)   { return a + b; }           // version 2
    int add(int a, int b, int c)     { return a + b + c; }       // version 3
    String add(String a, String b)   { return a + " + " + b; }   // version 4
}

// OVERRIDING: runtime, subclass
class Parent {
    String greet()        { return "Hello from Parent"; }
    static String stat()  { return "Static Parent"; }  // static = METHOD HIDING, not override!
}
class Child extends Parent {
    @Override String greet() { return "Hello from Child"; } // overrides at RUNTIME
    static String stat()     { return "Static Child"; }     // HIDES, not overrides
}

// SOLID — Dependency Inversion (most important for interviews)
interface Database { void save(String data); }
class MySQLDB  implements Database { public void save(String d) { System.out.println("MySQL: " + d); } }
class MongoDB  implements Database { public void save(String d) { System.out.println("Mongo: " + d); } }
class OrderService {
    private final Database db;
    OrderService(Database db) { this.db = db; } // inject — depend on abstraction!
    void place(String order) { db.save(order); }
}

public class OverloadOverride {
    public static void main(String[] args) {
        System.out.println("== OVERLOADING (compile time) ==");
        Calculator c = new Calculator();
        System.out.println(c.add(1, 2));        // int version
        System.out.println(c.add(1.5, 2.5));    // double version
        System.out.println(c.add(1, 2, 3));      // 3-arg version
        System.out.println(c.add("a", "b"));     // String version

        System.out.println("\\n== OVERRIDING (runtime dispatch) ==");
        Parent ref = new Child();  // Parent ref, Child object
        System.out.println(ref.greet());   // Child's method called at RUNTIME!
        System.out.println(Parent.stat()); // Parent — static is compile-time!
        System.out.println(Child.stat());  // Child

        System.out.println("\\n== SOLID: Dependency Inversion ==");
        new OrderService(new MySQLDB()).place("Order-1");
        new OrderService(new MongoDB()).place("Order-2");
        // swap DB with zero changes to OrderService!
    }
}`,
        output: `== OVERLOADING (compile time) ==
3
4.0
6
a + b

== OVERRIDING (runtime dispatch) ==
Hello from Child
Static Parent
Static Child

== SOLID: Dependency Inversion ==
MySQL: Order-1
Mongo: Order-2`
      }
    ],
    quiz: [
      { q: "Which OOP pillar protects data with private fields?", options: ["Inheritance", "Polymorphism", "Encapsulation", "Abstraction"], correct: 2 },
      { q: "Abstract class vs Interface — key difference:", options: ["Same", "Abstract class has state/constructor; interface has no state (pre-Java 8)", "Interface has constructor", "Abstract class supports multiple inheritance"], correct: 1 },
      { q: "Method overloading resolved at:", options: ["Runtime", "Compile time based on argument types", "Class loading time", "JVM startup"], correct: 1 },
      { q: "Method overriding requires:", options: ["Same class", "Different parameters", "Same name + same parameters in a subclass", "static keyword"], correct: 2 },
      { q: "Liskov Substitution Principle says:", options: ["Subclass must override all methods", "Subclass should be substitutable for superclass without breaking the program", "Interfaces must be small", "One responsibility per class"], correct: 1 },
      { q: "Dependency Inversion means:", options: ["Avoid all dependencies", "High-level modules depend on abstractions not concrete classes", "Use static methods only", "Inject all at compile time"], correct: 1 }
    ],
    code: `interface Drawable { void draw(); }
interface Resizable { void resize(double f); }

abstract class Shape implements Drawable {
    protected String color;
    Shape(String c) { color = c; }
    abstract double area();
}

class Circle extends Shape implements Resizable {
    private double r;
    Circle(String c, double r) { super(c); this.r = r; }
    public void draw()         { System.out.printf("Drawing %s circle r=%.1f%n", color, r); }
    public double area()       { return Math.PI * r * r; }
    public void resize(double f){ r *= f; }
}

public class OOPReview {
    public static void main(String[] args) {
        Circle c = new Circle("red", 5.0);
        c.draw();
        System.out.printf("Area: %.2f%n", c.area());
        c.resize(2.0);
        c.draw();
        System.out.printf("Area: %.2f%n", c.area());
        Shape s = new Circle("blue", 3.0);
        s.draw(); // runtime dispatch
        System.out.println(s instanceof Drawable);  // true
        System.out.println(s instanceof Resizable); // true
    }
}`,
    output: `Drawing red circle r=5.0
Area: 78.54
Drawing red circle r=10.0
Area: 314.16
Drawing blue circle r=3.0
true
true`
  },

  "interview-collections": {
    title: "Collections — Interview Masterclass", module: "interview", duration: "45 min", difficulty: "Intermediate", xp: 225, icon: "📦",
    intro: "Collections is the MOST TESTED topic in Java interviews. You must know HashMap internals, time complexities, and when to use each collection. Interviewers ask about ConcurrentModificationException, TreeMap vs HashMap, and concurrent collections. This guide covers everything.",
    sections: [
      {
        heading: "HashMap Internals — How It Really Works",
        content: "HashMap uses an array of buckets. hashCode() picks the bucket. equals() resolves collisions in a bucket (linked list / tree). Default load factor 0.75 triggers resize at 75% full. Java 8+: chains > 8 become balanced trees.",
        code: `import java.util.*;
import java.util.Objects;

// Demonstrate equals/hashCode contract importance
class GoodKey {
    int id;
    GoodKey(int id) { this.id = id; }
    @Override public boolean equals(Object o) {
        if (!(o instanceof GoodKey)) return false;
        return this.id == ((GoodKey) o).id;
    }
    @Override public int hashCode() { return Objects.hash(id); } // MUST be consistent!
}

class BadKey {
    int id;
    BadKey(int id) { this.id = id; }
    // NO equals/hashCode — uses Object identity (reference)
}

public class HashMapInternals {
    public static void main(String[] args) {
        // HashMap operations
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 95); scores.put("Bob", 87); scores.put("Charlie", 72);

        System.out.println("get Alice: " + scores.get("Alice"));       // 95
        System.out.println("getOrDefault: " + scores.getOrDefault("Dave", 0)); // 0
        scores.putIfAbsent("Alice", 100);                               // won't overwrite
        System.out.println("putIfAbsent: " + scores.get("Alice"));     // 95 (unchanged)
        scores.merge("Alice", 5, Integer::sum);                         // 95 + 5
        System.out.println("merge +5: " + scores.get("Alice"));        // 100
        scores.computeIfAbsent("Eve", k -> 88);                        // only if absent
        System.out.println("computeIfAbsent: " + scores);

        // equals/hashCode MATTERS for HashMap keys!
        System.out.println("\\n=== equals/hashCode contract ===");
        Map<BadKey, String> badMap = new HashMap<>();
        BadKey b1 = new BadKey(1);
        badMap.put(b1, "value");
        System.out.println("BadKey same obj: " + badMap.get(b1));           // value
        System.out.println("BadKey new obj:  " + badMap.get(new BadKey(1))); // null! BUG!

        Map<GoodKey, String> goodMap = new HashMap<>();
        GoodKey g1 = new GoodKey(1);
        goodMap.put(g1, "value");
        System.out.println("GoodKey same obj: " + goodMap.get(g1));            // value
        System.out.println("GoodKey new obj:  " + goodMap.get(new GoodKey(1))); // value!

        System.out.println("\\n=== Time Complexities ===");
        System.out.println("HashMap get/put: O(1) avg, O(n) worst, O(log n) with tree");
        System.out.println("TreeMap get/put: O(log n) always");
        System.out.println("LinkedHashMap:   O(1) + maintains order");
    }
}`,
        output: `get Alice: 95
getOrDefault: 0
putIfAbsent: 95 (unchanged)
merge +5: 100
computeIfAbsent: {Bob=87, Alice=100, Charlie=72, Eve=88}

=== equals/hashCode contract ===
BadKey same obj: value
BadKey new obj:  null! BUG!
GoodKey same obj: value
GoodKey new obj:  value!

=== Time Complexities ===
HashMap get/put: O(1) avg, O(n) worst, O(log n) with tree
TreeMap get/put: O(log n) always
LinkedHashMap:   O(1) + maintains order`
      },
      {
        heading: "Which Collection to Use — Decision Guide",
        content: "The most practical interview question: 'Which collection would you choose for X?' Know the trade-offs. This table and demo covers every important collection.",
        table: {
          headers: ["Collection", "Order", "Nulls", "Time", "Best For"],
          rows: [
            ["ArrayList", "Insertion", "Yes", "O(1) index, O(n) insert/search", "Random access, iteration"],
            ["LinkedList", "Insertion", "Yes", "O(1) head/tail, O(n) access", "Queue/Deque operations"],
            ["HashSet", "None", "One null", "O(1)", "Fast unique lookup"],
            ["LinkedHashSet", "Insertion", "One null", "O(1)", "Unique + preserve order"],
            ["TreeSet", "Sorted", "No null", "O(log n)", "Sorted unique, range queries"],
            ["HashMap", "None", "One null key", "O(1)", "Fast key-value lookup"],
            ["LinkedHashMap", "Insertion/access", "One null key", "O(1)", "LRU cache, ordered map"],
            ["TreeMap", "Sorted key", "No null key", "O(log n)", "Sorted map, range queries"],
            ["PriorityQueue", "Priority", "No null", "O(log n)", "Min/max heap, scheduling"]
          ]
        },
        code: `import java.util.*;

public class CollectionChooser {
    public static void main(String[] args) {
        // Map comparison
        System.out.println("=== Map Order Comparison ===");
        String[] keys = {"Charlie","Alice","Bob","Diana"};
        Map<String,Integer> hash   = new HashMap<>();
        Map<String,Integer> linked = new LinkedHashMap<>();
        Map<String,Integer> tree   = new TreeMap<>();
        for (int i=0;i<keys.length;i++) { hash.put(keys[i],i); linked.put(keys[i],i); tree.put(keys[i],i); }
        System.out.println("HashMap   (no order):    " + hash.keySet());
        System.out.println("LinkedMap (insert order):" + linked.keySet());
        System.out.println("TreeMap   (sorted):      " + tree.keySet());

        // Set comparison
        System.out.println("\n=== Set Comparison ===");
        Set<String> fruits = new HashSet<>(List.of("banana","apple","cherry","apple"));
        System.out.println("HashSet (unique, no order): " + fruits);
        System.out.println("TreeSet (unique, sorted):   " + new TreeSet<>(fruits));

        // PriorityQueue — min-heap (default) and max-heap
        System.out.println("\n=== PriorityQueue ===");
        PriorityQueue<Integer> minHeap = new PriorityQueue<>(List.of(5,2,8,1,9,3));
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Comparator.reverseOrder());
        maxHeap.addAll(List.of(5,2,8,1,9,3));
        System.out.print("Min-heap: ");
        while (!minHeap.isEmpty()) System.out.print(minHeap.poll() + " ");
        System.out.print("\nMax-heap: ");
        while (!maxHeap.isEmpty()) System.out.print(maxHeap.poll() + " ");

        // Deque as both Stack and Queue
        System.out.println("\n\n=== ArrayDeque (Stack + Queue) ===");
        Deque<String> stack = new ArrayDeque<>();
        stack.push("A"); stack.push("B"); stack.push("C");
        System.out.print("Stack (LIFO): ");
        while (!stack.isEmpty()) System.out.print(stack.pop() + " ");

        Deque<String> queue = new ArrayDeque<>();
        queue.offer("A"); queue.offer("B"); queue.offer("C");
        System.out.print("\nQueue (FIFO): ");
        while (!queue.isEmpty()) System.out.print(queue.poll() + " ");
        System.out.println();
    }
}`,
        output: `=== Map Order Comparison ===
HashMap   (no order):    [Bob, Alice, Charlie, Diana]
LinkedMap (insert order):[Charlie, Alice, Bob, Diana]
TreeMap   (sorted):      [Alice, Bob, Charlie, Diana]

=== Set Comparison ===
HashSet (unique, no order): [banana, cherry, apple]
TreeSet (unique, sorted):   [apple, banana, cherry]

=== PriorityQueue ===
Min-heap: 1 2 3 5 8 9
Max-heap: 9 8 5 3 2 1

=== ArrayDeque (Stack + Queue) ===
Stack (LIFO): C B A
Queue (FIFO): A B C`
      },
      {
        heading: "ConcurrentModificationException — Causes and All Fixes",
        content: "CME is thrown when you modify a collection during for-each iteration. Know all 3 fixes: Iterator.remove(), removeIf() (Java 8), and stream filter. Also know when to use CopyOnWriteArrayList and ConcurrentHashMap for true thread safety.",
        code: `import java.util.*;
import java.util.concurrent.*;

public class CMEFixes {
    public static void main(String[] args) {
        List<Integer> nums = new ArrayList<>(List.of(1,2,3,4,5,6,7,8));

        // THE BUG: removing during for-each
        try {
            for (Integer n : nums)
                if (n % 2 == 0) nums.remove(n); // CME!
        } catch (ConcurrentModificationException e) {
            System.out.println("CME: " + e.getClass().getSimpleName());
        }

        // FIX 1: Iterator.remove()
        nums = new ArrayList<>(List.of(1,2,3,4,5,6,7,8));
        Iterator<Integer> it = nums.iterator();
        while (it.hasNext()) {
            if (it.next() % 2 == 0) it.remove(); // safe!
        }
        System.out.println("Fix1 Iterator:  " + nums);

        // FIX 2: removeIf() — cleanest Java 8 approach
        nums = new ArrayList<>(List.of(1,2,3,4,5,6,7,8));
        nums.removeIf(n -> n % 2 == 0);
        System.out.println("Fix2 removeIf:  " + nums);

        // FIX 3: Stream filter — creates new list
        nums = new ArrayList<>(List.of(1,2,3,4,5,6,7,8));
        List<Integer> odds = nums.stream().filter(n->n%2!=0).toList();
        System.out.println("Fix3 Stream:    " + odds);

        // CopyOnWriteArrayList — thread-safe, no CME
        CopyOnWriteArrayList<Integer> cowList =
            new CopyOnWriteArrayList<>(List.of(1,2,3,4,5));
        for (Integer n : cowList)
            if (n == 3) cowList.add(99); // NO CME — reads snapshot
        System.out.println("CopyOnWrite:    " + cowList);

        // ConcurrentHashMap — thread-safe
        ConcurrentHashMap<String,Integer> cmap = new ConcurrentHashMap<>();
        cmap.put("a",1); cmap.put("b",2); cmap.put("c",3);
        for (String k : cmap.keySet())
            if (k.equals("b")) cmap.put("d", 4); // safe!
        System.out.println("ConcurrentMap:  " + new TreeMap<>(cmap));
    }
}`,
        output: `CME: ConcurrentModificationException
Fix1 Iterator:  [1, 3, 5, 7]
Fix2 removeIf:  [1, 3, 5, 7]
Fix3 Stream:    [1, 3, 5, 7]
CopyOnWrite:    [1, 2, 3, 4, 5, 99]
ConcurrentMap:  {a=1, b=2, c=3, d=4}`
      }
    ],
    quiz: [
      { q: "HashMap internal structure:", options: ["Linked list", "Binary tree", "Array of buckets (linked list/tree per bucket)", "Sorted array"], correct: 2 },
      { q: "HashMap default load factor:", options: ["0.5", "0.75", "1.0", "0.9"], correct: 1 },
      { q: "Which map preserves insertion order?", options: ["HashMap", "TreeMap", "LinkedHashMap", "Hashtable"], correct: 2 },
      { q: "ConcurrentModificationException safest fix:", options: ["Use synchronized", "removeIf() or Iterator.remove()", "Try-catch ignore it", "for-loop with index"], correct: 1 },
      { q: "PriorityQueue default ordering:", options: ["Insertion order", "Sorted ascending (min-heap)", "Sorted descending", "Random"], correct: 1 },
      { q: "HashSet internally uses:", options: ["Array", "LinkedList", "HashMap (element = key, dummy value)", "TreeMap"], correct: 2 }
    ],
    code: `import java.util.*;
import java.util.stream.*;

public class CollectionsQuickTest {
    public static void main(String[] args) {
        // Word frequency + top-k
        String text = "the quick brown fox jumps over the lazy dog the fox";
        Map<String, Long> freq = Arrays.stream(text.split(" "))
            .collect(Collectors.groupingBy(w->w, TreeMap::new, Collectors.counting()));
        System.out.println("Frequencies: " + freq);

        PriorityQueue<Map.Entry<String,Long>> pq =
            new PriorityQueue<>(Map.Entry.<String,Long>comparingByValue().reversed());
        pq.addAll(freq.entrySet());
        System.out.print("Top 2: ");
        for (int i=0;i<2&&!pq.isEmpty();i++) System.out.print(pq.poll().getKey()+" ");
        System.out.println();
    }
}`,
    output: `Frequencies: {brown=1, dog=1, fox=2, jumps=1, lazy=1, over=1, quick=1, the=3}
Top 2: the fox`
  },

  "interview-java8": {
    title: "Java 8 Features — Interview Masterclass", module: "interview", duration: "45 min", difficulty: "Advanced", xp: 225, icon: "⚡",
    intro: "Java 8 (2014) was the biggest Java release in a decade. Lambdas, Streams, Optional, and method references are now in every Java codebase. Interviewers expect you to understand functional programming, stream internals (lazy evaluation, short-circuiting), and when NOT to use streams. This guide covers all key Java 8 features with interview-level depth.",
    sections: [
      {
        heading: "Lambdas & Functional Interfaces",
        content: "A lambda is a short anonymous function used where a functional interface (exactly 1 abstract method) is expected. Java 8 built-in functional interfaces: Predicate (test), Function (transform), Consumer (accept), Supplier (get), BiFunction, UnaryOperator, BinaryOperator.",
        code: `import java.util.*;
import java.util.function.*;

public class LambdaGuide {
    public static void main(String[] args) {
        // Built-in functional interfaces
        Predicate<String>  isLong  = s -> s.length() > 5;   // T → boolean
        Function<String,Integer> len = String::length;        // T → R
        Consumer<String>   print   = s -> System.out.println(">> " + s); // T → void
        Supplier<String>   hello   = () -> "Hello, World!";  // () → T
        UnaryOperator<Integer> dbl = n -> n * 2;             // T → T
        BinaryOperator<Integer> add = Integer::sum;           // (T,T) → T

        System.out.println("isLong('Hello'):     " + isLong.test("Hello"));       // false
        System.out.println("isLong('JavaPower'): " + isLong.test("JavaPower"));   // true
        System.out.println("len('Java'):         " + len.apply("Java"));          // 4
        print.accept("Consumer test");
        System.out.println("Supplier:            " + hello.get());
        System.out.println("Unary(5):            " + dbl.apply(5));               // 10
        System.out.println("Binary(3,4):         " + add.apply(3, 4));            // 7

        // Predicate composition
        Predicate<String> notEmpty = s -> !s.isEmpty();
        Predicate<String> startsJ  = s -> s.startsWith("J");
        Predicate<String> both     = notEmpty.and(startsJ);    // AND
        Predicate<String> either   = isLong.or(startsJ);       // OR
        Predicate<String> notLong  = isLong.negate();          // NOT

        List.of("Java","Go","JavaScript","").forEach(s -> {
            if (both.test(s)) System.out.println("  both: " + s);
        });

        // Effectively final — lambda captures value from enclosing scope
        String prefix = "Hello";  // effectively final (never reassigned)
        Function<String,String> greet = name -> prefix + ", " + name + "!";
        System.out.println(greet.apply("Alice"));
        System.out.println(greet.apply("Bob"));
    }
}`,
        output: `isLong('Hello'):     false
isLong('JavaPower'): true
len('Java'):         4
>> Consumer test
Supplier:            Hello, World!
Unary(5):            10
Binary(3,4):         7
  both: Java
  both: JavaScript
Hello, Alice!
Hello, Bob!`
      },
      {
        heading: "Stream API — Lazy Evaluation, All Collectors",
        content: "Streams are LAZY — intermediate operations don't run until a terminal operation is called. Short-circuit operations stop early. Know the difference between intermediate (filter, map, sorted, distinct, limit, flatMap) and terminal (collect, forEach, count, reduce, findFirst, anyMatch) operations.",
        code: `import java.util.*;
import java.util.stream.*;

public class StreamGuide {
    public static void main(String[] args) {
        List<String> names = List.of("Alice","Bob","Charlie","Diana","Eve");
        List<Integer> nums = List.of(1,2,3,4,5,6,7,8,9,10);

        // Lazy demo — nothing runs until collect!
        System.out.println("=== Lazy Evaluation ===");
        List<String> result = names.stream()
            .filter(n -> { System.out.println("  filter: " + n); return n.length() > 3; })
            .map(String::toUpperCase)
            .collect(Collectors.toList());
        System.out.println("Result: " + result);

        // Short-circuit — stops at first match!
        System.out.println("\n=== Short-Circuit (findFirst) ===");
        Optional<String> first = names.stream()
            .filter(n -> { System.out.println("  check: " + n); return n.startsWith("C"); })
            .findFirst();
        System.out.println("Found: " + first.orElse("none"));

        // All collectors
        System.out.println("\n=== Collectors ===");
        System.out.println("toList:    " + nums.stream().filter(n->n%2==0).collect(Collectors.toList()));
        System.out.println("count:     " + nums.stream().filter(n->n%2==0).count());
        System.out.println("sum:       " + nums.stream().mapToInt(Integer::intValue).sum());
        System.out.println("avg:       " + nums.stream().mapToInt(Integer::intValue).average().orElse(0));
        System.out.println("joining:   " + names.stream().collect(Collectors.joining(", ","[","]")));

        // groupingBy and partitioningBy
        Map<Boolean,List<Integer>> parts = nums.stream()
            .collect(Collectors.partitioningBy(n->n%2==0));
        System.out.println("evens:     " + parts.get(true));
        System.out.println("odds:      " + parts.get(false));

        Map<Integer,List<String>> byLen = names.stream()
            .collect(Collectors.groupingBy(String::length));
        System.out.println("byLength:  " + new TreeMap<>(byLen));

        // reduce and flatMap
        int product = nums.stream().reduce(1, (a,b) -> a*b);
        System.out.println("product:   " + product);

        List<List<Integer>> nested = List.of(List.of(1,2,3), List.of(4,5), List.of(6,7,8));
        System.out.println("flatMap:   " + nested.stream().flatMap(Collection::stream).toList());
    }
}`,
        output: `=== Lazy Evaluation ===
  filter: Alice
  filter: Bob
  filter: Charlie
  filter: Diana
  filter: Eve
Result: [ALICE, CHARLIE, DIANA]

=== Short-Circuit (findFirst) ===
  check: Alice
  check: Bob
  check: Charlie
Found: Charlie

=== Collectors ===
toList:    [2, 4, 6, 8, 10]
count:     5
sum:       55
avg:       5.5
joining:   [Alice, Bob, Charlie, Diana, Eve]
evens:     [2, 4, 6, 8, 10]
odds:      [1, 3, 5, 7, 9]
byLength:  {3=[Bob, Eve], 5=[Alice, Diana], 7=[Charlie]}
product:   3628800
flatMap:   [1, 2, 3, 4, 5, 6, 7, 8]`
      },
      {
        heading: "Optional & Method References",
        content: "Optional wraps a potentially-null value and forces callers to handle emptiness. Use: orElse (eager), orElseGet (lazy Supplier), orElseThrow, ifPresent, map, filter. Method references: 4 types — static, specific instance, arbitrary instance, constructor.",
        code: `import java.util.*;
import java.util.function.*;
import java.util.stream.*;

public class OptionalAndMethodRefs {
    record User(String name, Integer age) {}

    static Optional<User> findUser(String name) {
        if (name.equals("Alice")) return Optional.of(new User("Alice", 28));
        if (name.equals("Bob"))   return Optional.of(new User("Bob", null));
        return Optional.empty();
    }

    static int doubleIt(int n) { return n * 2; } // static method

    public static void main(String[] args) {
        System.out.println("=== Optional ===");
        // orElse vs orElseGet (KEY interview question!)
        Optional<String> empty = Optional.empty();
        System.out.println("orElse:    " + empty.orElse("default"));          // always evaluates "default"
        System.out.println("orElseGet: " + empty.orElseGet(() -> "lazy"));    // lazy — only if empty

        // Chaining with map (null-safe navigation)
        findUser("Alice")
            .map(User::age)
            .ifPresent(age -> System.out.println("Alice age: " + age));

        findUser("Missing")
            .map(User::name)
            .ifPresent(n -> System.out.println("Found: " + n)); // nothing printed

        String name = findUser("Missing").map(User::name).orElse("Unknown");
        System.out.println("Missing user: " + name);

        // orElseThrow
        try {
            findUser("Nobody").orElseThrow(() -> new RuntimeException("Not found!"));
        } catch (RuntimeException e) {
            System.out.println("Threw: " + e.getMessage());
        }

        System.out.println("\n=== Method References (4 Types) ===");
        List<Integer> nums = List.of(1, 2, 3, 4, 5);

        // Type 1: Static method ref
        List<Integer> doubled = nums.stream().map(OptionalAndMethodRefs::doubleIt).toList();
        System.out.println("Static ref:   " + doubled);

        // Type 2: Instance of specific object
        StringBuilder sb = new StringBuilder("Prefix: ");
        Consumer<String> appender = sb::append; // specific instance 'sb'
        List.of("A","B","C").forEach(appender);
        System.out.println("Instance ref: " + sb);

        // Type 3: Instance method on arbitrary object
        List<String> names = List.of("alice","bob","charlie");
        System.out.println("Arbitrary:    " + names.stream().map(String::toUpperCase).toList());
        System.out.println("Sorted:       " + names.stream().sorted(String::compareTo).toList());

        // Type 4: Constructor reference
        BiFunction<String,Integer,User> ctor = User::new;
        User u = ctor.apply("Dave", 30);
        System.out.println("Constructor:  " + u);
    }
}`,
        output: `=== Optional ===
orElse:    default
orElseGet: lazy
Alice age: 28
Missing user: Unknown
Threw: Not found!

=== Method References (4 Types) ===
Static ref:   [2, 4, 6, 8, 10]
Instance ref: Prefix: ABC
Arbitrary:    [ALICE, BOB, CHARLIE]
Sorted:       [alice, bob, charlie]
Constructor:  User[name=Dave, age=30]`
      }
    ],
    quiz: [
      { q: "Stream intermediate operations are:", options: ["Eager — run immediately", "Lazy — run only when terminal op is called", "Always parallel", "Return void"], correct: 1 },
      { q: "map() vs flatMap():", options: ["Same", "map: 1-to-1; flatMap: 1-to-many then flatten", "flatMap: 1-to-1 only", "map flattens"], correct: 1 },
      { q: "orElse() vs orElseGet():", options: ["Same", "orElse always evaluates arg; orElseGet is lazy (Supplier only called when empty)", "orElseGet deprecated", "orElse is lazy"], correct: 1 },
      { q: "Which is a TERMINAL stream operation?", options: ["filter()", "map()", "sorted()", "collect()"], correct: 3 },
      { q: "String::toUpperCase is which type of method reference?", options: ["Static", "Specific instance", "Arbitrary instance (called on each element)", "Constructor"], correct: 2 },
      { q: "Optional.get() is dangerous because:", options: ["It is slow", "Throws NoSuchElementException if Optional is empty", "Returns null", "Modifies the Optional"], correct: 1 }
    ],
    code: `import java.util.*;
import java.util.stream.*;

public class Java8Review {
    record Product(String name, String cat, double price) {}
    public static void main(String[] args) {
        List<Product> products = List.of(
            new Product("Laptop","Electronics",999.99),
            new Product("Phone","Electronics",599.99),
            new Product("Book","Education",29.99),
            new Product("Tablet","Electronics",449.99),
            new Product("Course","Education",99.99)
        );
        // Group by category
        products.stream().collect(Collectors.groupingBy(Product::cat))
            .forEach((cat,prods) ->
                System.out.println(cat+": "+prods.stream().map(Product::name).toList()));
        // Average price per category
        products.stream().collect(Collectors.groupingBy(Product::cat,
            Collectors.averagingDouble(Product::price)))
            .forEach((cat,avg) -> System.out.printf("%s avg: $%.2f%n",cat,avg));
        // Most expensive
        products.stream().max(Comparator.comparingDouble(Product::price))
            .ifPresent(p -> System.out.println("Most expensive: " + p.name()));
    }
}`,
    output: `Electronics: [Laptop, Phone, Tablet]
Education: [Book, Course]
Electronics avg: $683.32
Education avg: $64.99
Most expensive: Laptop`
  },

  "dsa-arrays": {
    title: "DSA — Arrays & Patterns Masterclass", module: "interview", duration: "55 min", difficulty: "Intermediate", xp: 250, icon: "🔍",
    intro: "Arrays appear in virtually every coding interview. Master 5 key patterns: Two Pointers, Sliding Window, Binary Search, Prefix Sum, and Kadane's Algorithm. Each solves a category of problems in O(n) or O(log n) instead of brute-force O(n²).",
    sections: [
      {
        heading: "Pattern 1 — Two Pointers O(n)",
        content: "Two pointers uses two indices to avoid nested loops. Works best on sorted arrays. Classic problems: Two Sum, remove duplicates, container with most water, sort colours (Dutch Flag).",
        code: `import java.util.*;

public class TwoPointers {
    // Two Sum sorted array — O(n)
    static int[] twoSumSorted(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left < right) {
            int sum = nums[left] + nums[right];
            if (sum == target) return new int[]{left, right};
            else if (sum < target) left++;
            else right--;
        }
        return new int[]{-1, -1};
    }

    // Remove duplicates in-place — O(n)
    static int removeDuplicates(int[] nums) {
        int slow = 0;
        for (int fast = 1; fast < nums.length; fast++)
            if (nums[fast] != nums[slow]) nums[++slow] = nums[fast];
        return slow + 1;
    }

    // Container with most water — O(n)
    static int maxWater(int[] h) {
        int l = 0, r = h.length - 1, max = 0;
        while (l < r) {
            max = Math.max(max, Math.min(h[l], h[r]) * (r - l));
            if (h[l] < h[r]) l++; else r--;
        }
        return max;
    }

    // Sort 0s, 1s, 2s — Dutch National Flag O(n)
    static void sortColors(int[] a) {
        int lo = 0, mid = 0, hi = a.length - 1;
        while (mid <= hi) {
            if (a[mid] == 0) { int t=a[lo]; a[lo]=a[mid]; a[mid]=t; lo++; mid++; }
            else if (a[mid] == 1) mid++;
            else { int t=a[mid]; a[mid]=a[hi]; a[hi]=t; hi--; }
        }
    }

    public static void main(String[] args) {
        System.out.println(Arrays.toString(twoSumSorted(new int[]{1,2,3,4,6,8,11}, 9)));
        int[] arr = {1,1,2,3,3,3,4,5,5};
        int len = removeDuplicates(arr);
        System.out.println(Arrays.toString(Arrays.copyOf(arr, len)));
        System.out.println(maxWater(new int[]{1,8,6,2,5,4,8,3,7}));
        int[] c = {2,0,2,1,1,0,1,2,0};
        sortColors(c);
        System.out.println(Arrays.toString(c));
    }
}`,
        output: `[3, 4]
[1, 2, 3, 4, 5]
49
[0, 0, 0, 1, 1, 1, 2, 2, 2]`
      },
      {
        heading: "Pattern 2 — Sliding Window O(n)",
        content: "Sliding window maintains a window that slides through the data. Fixed window: constant size. Variable window: grows/shrinks by condition. Converts O(n²) to O(n) for contiguous subarray problems.",
        code: `import java.util.*;

public class SlidingWindow {
    // Max sum of k consecutive elements — fixed window
    static int maxSumFixed(int[] arr, int k) {
        int sum = 0;
        for (int i = 0; i < k; i++) sum += arr[i];
        int max = sum;
        for (int i = k; i < arr.length; i++) {
            sum += arr[i] - arr[i - k];
            max = Math.max(max, sum);
        }
        return max;
    }

    // Longest substring without repeating chars — variable window
    static int longestUnique(String s) {
        Map<Character, Integer> lastSeen = new HashMap<>();
        int max = 0, start = 0;
        for (int end = 0; end < s.length(); end++) {
            char c = s.charAt(end);
            if (lastSeen.containsKey(c) && lastSeen.get(c) >= start)
                start = lastSeen.get(c) + 1;
            lastSeen.put(c, end);
            max = Math.max(max, end - start + 1);
        }
        return max;
    }

    // Find all start indices of anagrams of p in s
    static List<Integer> findAnagrams(String s, String p) {
        List<Integer> res = new ArrayList<>();
        int[] pF = new int[26], wF = new int[26];
        for (char c : p.toCharArray()) pF[c - 'a']++;
        for (int i = 0; i < s.length(); i++) {
            wF[s.charAt(i) - 'a']++;
            if (i >= p.length()) wF[s.charAt(i - p.length()) - 'a']--;
            if (Arrays.equals(pF, wF)) res.add(i - p.length() + 1);
        }
        return res;
    }

    public static void main(String[] args) {
        System.out.println("maxSum k=3: " + maxSumFixed(new int[]{1,3,-1,-3,5,3,6,7}, 3));
        System.out.println("'abcabcbb': " + longestUnique("abcabcbb"));
        System.out.println("'pwwkew':   " + longestUnique("pwwkew"));
        System.out.println("anagrams:   " + findAnagrams("cbaebabacd", "abc"));
    }
}`,
        output: `maxSum k=3: 16
'abcabcbb': 3
'pwwkew':   3
anagrams:   [0, 6]`
      },
      {
        heading: "Pattern 3 — Binary Search O(log n)",
        content: "Binary search eliminates half the search space each step. Apply beyond basic search: first/last occurrence, rotated array, and 'search on answer' for optimization.",
        code: `import java.util.*;

public class BinarySearch {
    static int search(int[] arr, int t) {
        int lo = 0, hi = arr.length - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2; // overflow-safe!
            if (arr[mid] == t) return mid;
            else if (arr[mid] < t) lo = mid + 1;
            else hi = mid - 1;
        }
        return -1;
    }

    static int firstOcc(int[] arr, int t) {
        int lo = 0, hi = arr.length - 1, res = -1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (arr[mid] == t) { res = mid; hi = mid - 1; } // keep LEFT
            else if (arr[mid] < t) lo = mid + 1;
            else hi = mid - 1;
        }
        return res;
    }

    // Search in rotated sorted array [4,5,6,7,0,1,2]
    static int searchRotated(int[] nums, int t) {
        int lo = 0, hi = nums.length - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] == t) return mid;
            if (nums[lo] <= nums[mid]) {
                if (t >= nums[lo] && t < nums[mid]) hi = mid - 1;
                else lo = mid + 1;
            } else {
                if (t > nums[mid] && t <= nums[hi]) lo = mid + 1;
                else hi = mid - 1;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] arr = {1, 3, 5, 7, 9, 11, 13, 15};
        System.out.println("search(7):  " + search(arr, 7));
        System.out.println("search(4):  " + search(arr, 4));
        int[] dup = {1, 2, 2, 2, 3, 4, 4, 5};
        System.out.println("first(2):   " + firstOcc(dup, 2));
        System.out.println("rotated(0): " + searchRotated(new int[]{4,5,6,7,0,1,2}, 0));
        System.out.println("rotated(3): " + searchRotated(new int[]{4,5,6,7,0,1,2}, 3));
    }
}`,
        output: `search(7):  3
search(4):  -1
first(2):   1
rotated(0): 4
rotated(3): -1`
      },
      {
        heading: "Pattern 4 & 5 — Prefix Sum & Kadane's",
        content: "Prefix sum answers range queries in O(1) after O(n) preprocessing. Kadane's finds maximum sum subarray in O(n) — at each element: extend current subarray OR start fresh.",
        code: `import java.util.*;

public class PrefixAndKadane {
    // Prefix sum — O(1) per range query after O(n) build
    static int[] buildPrefix(int[] arr) {
        int[] p = new int[arr.length + 1];
        for (int i = 0; i < arr.length; i++) p[i + 1] = p[i] + arr[i];
        return p;
    }
    static int rangeSum(int[] p, int l, int r) { return p[r + 1] - p[l]; }

    // Count subarrays summing to k — O(n) with HashMap
    static int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> seen = new HashMap<>();
        seen.put(0, 1); int sum = 0, count = 0;
        for (int n : nums) {
            sum += n;
            count += seen.getOrDefault(sum - k, 0);
            seen.merge(sum, 1, Integer::sum);
        }
        return count;
    }

    // Kadane's — O(n)
    static int kadane(int[] nums) {
        int maxSum = nums[0], curr = nums[0];
        for (int i = 1; i < nums.length; i++) {
            curr   = Math.max(nums[i], curr + nums[i]);
            maxSum = Math.max(maxSum, curr);
        }
        return maxSum;
    }

    // Max product subarray — track both max and min (negatives flip!)
    static int maxProduct(int[] nums) {
        int maxP = nums[0], minP = nums[0], res = nums[0];
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] < 0) { int t = maxP; maxP = minP; minP = t; }
            maxP = Math.max(nums[i], maxP * nums[i]);
            minP = Math.min(nums[i], minP * nums[i]);
            res  = Math.max(res, maxP);
        }
        return res;
    }

    public static void main(String[] args) {
        int[] arr = {2, 4, 6, 8, 10, 3, 7};
        int[] p   = buildPrefix(arr);
        System.out.println("Sum[0..2]: " + rangeSum(p, 0, 2));
        System.out.println("Sum[2..5]: " + rangeSum(p, 2, 5));
        System.out.println("subarraySum k=2: " + subarraySum(new int[]{1,1,1,2,3}, 2));
        System.out.println("kadane: "  + kadane(new int[]{-2,1,-3,4,-1,2,1,-5,4}));
        System.out.println("maxProduct: " + maxProduct(new int[]{-2,3,-4}));
    }
}`,
        output: `Sum[0..2]: 12
Sum[2..5]: 27
subarraySum k=2: 3
kadane: 6
maxProduct: 24`
      }
    ],
    quiz: [
      { q: "Two pointer on sorted arrays achieves:", options: ["O(n²)", "O(n) — avoids nested loops", "O(log n)", "O(n log n)"], correct: 1 },
      { q: "Sliding window converts O(n²) to O(n) by:", options: ["Sorting first", "Maintaining a window — add new, remove old element efficiently", "Using HashMap only", "Recursion"], correct: 1 },
      { q: "Binary search REQUIRES:", options: ["HashMap", "Sorted array or monotonic function", "No precondition", "Small arrays"], correct: 1 },
      { q: "Prefix sum enables range queries in:", options: ["O(n) per query", "O(log n) per query", "O(1) per query after O(n) build", "O(n²) total"], correct: 2 },
      { q: "Kadane's key decision at each element:", options: ["Sort and pick", "max(element alone, extend previous subarray)", "Use HashMap", "Binary search for sum"], correct: 1 },
      { q: "Binary search overflow-safe midpoint:", options: ["(lo + hi) / 2", "lo + (hi - lo) / 2", "(hi - lo) / 2", "lo * hi / 2"], correct: 1 }
    ],
    code: `import java.util.*;
public class ArrayPractice {
    static int[] twoSum(int[] nums, int target) {
        Map<Integer,Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int comp = target - nums[i];
            if (seen.containsKey(comp)) return new int[]{seen.get(comp), i};
            seen.put(nums[i], i);
        }
        return new int[]{};
    }
    static void rotate(int[] arr, int k) {
        k %= arr.length;
        reverse(arr, 0, arr.length - 1);
        reverse(arr, 0, k - 1);
        reverse(arr, k, arr.length - 1);
    }
    static void reverse(int[] a, int i, int j) {
        while (i < j) { int t = a[i]; a[i++] = a[j]; a[j--] = t; }
    }
    public static void main(String[] args) {
        System.out.println("TwoSum:  " + Arrays.toString(twoSum(new int[]{2,7,11,15}, 9)));
        int[] arr = {1,2,3,4,5,6,7};
        rotate(arr, 3);
        System.out.println("Rotated: " + Arrays.toString(arr));
    }
}`,
    output: `TwoSum:  [0, 1]
Rotated: [5, 6, 7, 1, 2, 3, 4]`
  },

  "dsa-strings": {
    title: "DSA — String Algorithms Masterclass", module: "interview", duration: "50 min", difficulty: "Intermediate", xp: 225, icon: "📝",
    intro: "String problems are the most common in coding interviews. Master these patterns: character frequency int[26], two-pointer palindrome, sliding window for substrings, HashMap for anagram grouping, and StringBuilder for efficient building.",
    sections: [
      {
        heading: "Character Frequency — The Core Pattern",
        content: "Most string problems reduce to counting characters. int[26] for lowercase letters is O(1) space. Two strings are anagrams if and only if they have identical character frequencies.",
        code: `import java.util.*;

public class CharFrequency {
    static boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] freq = new int[26];
        for (char c : s.toCharArray()) freq[c - 'a']++;
        for (char c : t.toCharArray()) freq[c - 'a']--;
        for (int f : freq) if (f != 0) return false;
        return true;
    }

    static char firstUnique(String s) {
        int[] freq = new int[26];
        for (char c : s.toCharArray()) freq[c - 'a']++;
        for (char c : s.toCharArray()) if (freq[c - 'a'] == 1) return c;
        return '#';
    }

    static Map<String, List<String>> groupAnagrams(String[] words) {
        Map<String, List<String>> groups = new LinkedHashMap<>();
        for (String w : words) {
            char[] arr = w.toCharArray(); Arrays.sort(arr);
            groups.computeIfAbsent(new String(arr), k -> new ArrayList<>()).add(w);
        }
        return groups;
    }

    static boolean permutationIn(String s1, String s2) {
        if (s1.length() > s2.length()) return false;
        int[] f1 = new int[26], f2 = new int[26];
        for (char c : s1.toCharArray()) f1[c - 'a']++;
        for (int i = 0; i < s2.length(); i++) {
            f2[s2.charAt(i) - 'a']++;
            if (i >= s1.length()) f2[s2.charAt(i - s1.length()) - 'a']--;
            if (Arrays.equals(f1, f2)) return true;
        }
        return false;
    }

    public static void main(String[] args) {
        System.out.println("anagram listen/silent: " + isAnagram("listen","silent"));
        System.out.println("first unique 'leetcode': " + firstUnique("leetcode"));
        System.out.println("first unique 'aabb': " + firstUnique("aabb"));
        groupAnagrams(new String[]{"eat","tea","tan","ate","nat","bat"})
            .forEach((k, v) -> System.out.println("  " + v));
        System.out.println("perm 'ab' in 'eidbaooo': " + permutationIn("ab","eidbaooo"));
    }
}`,
        output: `anagram listen/silent: true
first unique 'leetcode': l
first unique 'aabb': #
  [eat, tea, ate]
  [tan, nat]
  [bat]
perm 'ab' in 'eidbaooo': true`
      },
      {
        heading: "Palindrome Problems",
        content: "Two-pointer from outside in is the O(n) palindrome check. Expand-from-center finds the longest palindromic substring. Handle non-alphanumeric chars with Character.isLetterOrDigit().",
        code: `public class Palindromes {
    static boolean isPalindrome(String s) {
        int l = 0, r = s.length() - 1;
        while (l < r) { if (s.charAt(l) != s.charAt(r)) return false; l++; r--; }
        return true;
    }

    static boolean isPalindromeClean(String s) {
        int l = 0, r = s.length() - 1;
        while (l < r) {
            while (l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;
            while (l < r && !Character.isLetterOrDigit(s.charAt(r))) r--;
            if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r)))
                return false;
            l++; r--;
        }
        return true;
    }

    static String longestPalindrome(String s) {
        int start = 0, maxLen = 1;
        for (int i = 0; i < s.length(); i++) {
            for (int[] ends : new int[][]{{i,i},{i,i+1}}) {
                int l = ends[0], r = ends[1];
                while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) { l--; r++; }
                if (r - l - 1 > maxLen) { maxLen = r - l - 1; start = l + 1; }
            }
        }
        return s.substring(start, start + maxLen);
    }

    static boolean validPalindromeII(String s) {
        int l = 0, r = s.length() - 1;
        while (l < r) {
            if (s.charAt(l) != s.charAt(r))
                return isPalindrome(s.substring(l+1, r+1)) ||
                       isPalindrome(s.substring(l, r));
            l++; r--;
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println("racecar: " + isPalindrome("racecar"));
        System.out.println("A man... Panama: " + isPalindromeClean("A man, a plan, a canal: Panama"));
        System.out.println("longest 'babad': " + longestPalindrome("babad"));
        System.out.println("longest 'cbbd':  " + longestPalindrome("cbbd"));
        System.out.println("validII 'abca':  " + validPalindromeII("abca"));
        System.out.println("validII 'abc':   " + validPalindromeII("abc"));
    }
}`,
        output: `racecar: true
A man... Panama: true
longest 'babad': bab
longest 'cbbd':  bb
validII 'abca':  true
validII 'abc':   false`
      },
      {
        heading: "String Manipulation — Common Interview Problems",
        content: "StringBuilder for loop building. Reverse words, compression, Roman numerals, valid parentheses — all classic interview problems you must know.",
        code: `import java.util.*;

public class StringManipulation {
    static String reverseWords(String s) {
        String[] words = s.trim().split("\\s+");
        StringBuilder sb = new StringBuilder();
        for (int i = words.length - 1; i >= 0; i--)
            sb.append(words[i]).append(i > 0 ? " " : "");
        return sb.toString();
    }

    static String compress(String s) {
        StringBuilder sb = new StringBuilder();
        int i = 0;
        while (i < s.length()) {
            char c = s.charAt(i); int cnt = 0;
            while (i < s.length() && s.charAt(i) == c) { cnt++; i++; }
            sb.append(c).append(cnt);
        }
        return sb.length() < s.length() ? sb.toString() : s;
    }

    static int romanToInt(String s) {
        Map<Character,Integer> m = Map.of('I',1,'V',5,'X',10,'L',50,'C',100,'D',500,'M',1000);
        int res = 0;
        for (int i = 0; i < s.length(); i++) {
            int cur = m.get(s.charAt(i));
            int next = i+1 < s.length() ? m.get(s.charAt(i+1)) : 0;
            if (cur < next) res -= cur; else res += cur;
        }
        return res;
    }

    static boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c=='('||c=='['||c=='{') stack.push(c);
            else {
                if (stack.isEmpty()) return false;
                char t = stack.pop();
                if (c==')'&&t!='('||c==']'&&t!='['||c=='}'&&t!='{') return false;
            }
        }
        return stack.isEmpty();
    }

    static String longestCommonPrefix(String[] strs) {
        String prefix = strs[0];
        for (int i = 1; i < strs.length; i++)
            while (!strs[i].startsWith(prefix))
                prefix = prefix.substring(0, prefix.length() - 1);
        return prefix;
    }

    public static void main(String[] args) {
        System.out.println(reverseWords("the sky is blue"));
        System.out.println(compress("aaabbc"));
        System.out.println("LVIII=" + romanToInt("LVIII") + " MCMXC=" + romanToInt("MCMXC"));
        System.out.println("'()[]{}':" + isValid("()[]{}") + " '(]':" + isValid("(]"));
        System.out.println(longestCommonPrefix(new String[]{"flower","flow","flight"}));
    }
}`,
        output: `blue is sky the
a3b2c1
LVIII=58 MCMXC=1990
'()[]{}':true '(]':false
fl`
      }
    ],
    quiz: [
      { q: "int[26] char frequency works for:", options: ["All characters", "Lowercase 'a'-'z' only", "ASCII only", "Unicode only"], correct: 1 },
      { q: "Two strings are anagrams if:", options: ["Same length", "Same chars in same order", "Identical character frequencies", "One is substring"], correct: 2 },
      { q: "Longest substring without repeating chars runs in:", options: ["O(n²)", "O(n log n)", "O(n) with sliding window + HashMap", "O(1)"], correct: 2 },
      { q: "Group anagrams uses sorted word as key because:", options: ["It's faster", "All anagrams sort to the same string — perfect group key", "HashMap needs sorted keys", "Sorting reveals duplicates"], correct: 1 },
      { q: "StringBuilder vs String concat in a loop:", options: ["Same", "StringBuilder O(n); String concat O(n²) — always use StringBuilder", "String faster", "No difference"], correct: 1 },
      { q: "Expand-from-center palindrome handles:", options: ["Odd-length only", "Even-length only", "Both odd and even via two expansion passes", "Single chars only"], correct: 2 }
    ],
    code: `import java.util.*;
public class StringChallenge {
    static String countAndSay(int n) {
        String s = "1";
        for (int i = 1; i < n; i++) {
            StringBuilder sb = new StringBuilder();
            int j = 0;
            while (j < s.length()) {
                char c = s.charAt(j); int cnt = 0;
                while (j < s.length() && s.charAt(j) == c) { cnt++; j++; }
                sb.append(cnt).append(c);
            }
            s = sb.toString();
        }
        return s;
    }
    public static void main(String[] args) {
        for (int i = 1; i <= 6; i++)
            System.out.println("countAndSay(" + i + ") = " + countAndSay(i));
        String word = "loveleetcode";
        int[] f = new int[26];
        for (char c : word.toCharArray()) f[c-'a']++;
        char res = '#';
        for (char c : word.toCharArray()) if (f[c-'a'] == 1) { res = c; break; }
        System.out.println("First unique in '" + word + "': " + res);
    }
}`,
    output: `countAndSay(1) = 1
countAndSay(2) = 11
countAndSay(3) = 21
countAndSay(4) = 1211
countAndSay(5) = 111221
countAndSay(6) = 312211
First unique in 'loveleetcode': v`
  },
  "dsa-linkedlist": {
    title: "DSA — Linked Lists", module: "interview", duration: "45 min", difficulty: "Intermediate", xp: 225, icon: "🔗",
    intro: "Linked lists are the second most common data structure in coding interviews after arrays. Unlike arrays, linked lists don't have random access — you traverse from head to tail. Master these patterns: fast and slow pointers (Floyd's cycle detection), reverse in-place, merge sorted lists, and finding the middle. These same patterns appear in tree problems too.",
    sections: [
      {
        heading: "Linked List Fundamentals",
        content: "A linked list is a chain of nodes where each node holds a value and a pointer to the next node. The last node points to null. The head is the entry point. Unlike arrays: no random access (O(n) to reach index k), but O(1) insert/delete at head. Know how to build, traverse, and modify linked lists by hand — interviewers often ask you to draw the pointer manipulation.",
        code: `public class LinkedListFundamentals {

    // Node class — the building block
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
        ListNode(int val, ListNode next) { this.val = val; this.next = next; }
    }

    // Build a linked list from an array
    static ListNode build(int[] arr) {
        if (arr.length == 0) return null;
        ListNode head = new ListNode(arr[0]);
        ListNode curr = head;
        for (int i = 1; i < arr.length; i++) {
            curr.next = new ListNode(arr[i]);
            curr = curr.next;
        }
        return head;
    }

    // Convert to string for printing
    static String toString(ListNode head) {
        StringBuilder sb = new StringBuilder("[");
        while (head != null) {
            sb.append(head.val);
            if (head.next != null) sb.append(" → ");
            head = head.next;
        }
        return sb.append("]").toString();
    }

    // Get length — O(n)
    static int length(ListNode head) {
        int len = 0;
        while (head != null) { len++; head = head.next; }
        return len;
    }

    // Insert at head — O(1)
    static ListNode insertHead(ListNode head, int val) {
        ListNode node = new ListNode(val);
        node.next = head;
        return node; // new head!
    }

    // Insert at tail — O(n)
    static ListNode insertTail(ListNode head, int val) {
        ListNode node = new ListNode(val);
        if (head == null) return node;
        ListNode curr = head;
        while (curr.next != null) curr = curr.next;
        curr.next = node;
        return head;
    }

    // Delete first occurrence of value — O(n)
    static ListNode delete(ListNode head, int val) {
        // Dummy node avoids special-casing head deletion
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode prev = dummy;
        while (prev.next != null) {
            if (prev.next.val == val) {
                prev.next = prev.next.next; // unlink the node
                break;
            }
            prev = prev.next;
        }
        return dummy.next;
    }

    public static void main(String[] args) {
        ListNode list = build(new int[]{1, 2, 3, 4, 5});
        System.out.println("Original: " + toString(list));
        System.out.println("Length:   " + length(list));

        list = insertHead(list, 0);
        System.out.println("InsHead:  " + toString(list));

        list = insertTail(list, 6);
        System.out.println("InsTail:  " + toString(list));

        list = delete(list, 3);
        System.out.println("Delete 3: " + toString(list));

        list = delete(list, 0); // delete head
        System.out.println("Del head: " + toString(list));
    }
}`,
        output: `Original: [1 → 2 → 3 → 4 → 5]
Length:   5
InsHead:  [0 → 1 → 2 → 3 → 4 → 5]
InsTail:  [0 → 1 → 2 → 3 → 4 → 5 → 6]
Delete 3: [0 → 1 → 2 → 4 → 5 → 6]
Del head: [1 → 2 → 4 → 5 → 6]`
      },
      {
        heading: "Reverse a Linked List — The Most Asked Problem",
        content: "Reversing a linked list is THE most common linked list interview question. The iterative approach uses three pointers: prev, curr, next. The recursive approach reverses the rest first, then fixes current. Know both — interviewers often ask for both versions.",
        code: `public class ReverseLinkedList {
    static class ListNode { int val; ListNode next; ListNode(int v){val=v;} }

    // ITERATIVE — O(n) time, O(1) space
    // Trick: keep track of prev, curr, next and rewire one node at a time
    static ListNode reverseIterative(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode next = curr.next; // save next before overwriting
            curr.next = prev;          // reverse the pointer
            prev = curr;               // move prev forward
            curr = next;               // move curr forward
        }
        return prev; // prev is now the new head
    }

    // RECURSIVE — O(n) time, O(n) stack space
    // Base case: empty or single node
    // Recursive case: reverse the rest, then fix current
    static ListNode reverseRecursive(ListNode head) {
        if (head == null || head.next == null) return head; // base case
        ListNode newHead = reverseRecursive(head.next); // reverse the rest
        head.next.next = head; // make next node point back to head
        head.next = null;      // head is now the tail — points to null
        return newHead;        // new head of reversed list
    }

    // Reverse in groups of k (advanced — asked at FAANG)
    static ListNode reverseKGroup(ListNode head, int k) {
        // Check if there are k nodes remaining
        ListNode check = head;
        for (int i = 0; i < k; i++) {
            if (check == null) return head; // less than k nodes — don't reverse
            check = check.next;
        }
        // Reverse k nodes
        ListNode prev = null, curr = head;
        for (int i = 0; i < k; i++) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        // head is now the tail of the reversed group
        // recursively reverse the rest and connect
        head.next = reverseKGroup(curr, k);
        return prev; // prev is now the head of reversed group
    }

    static ListNode build(int... vals) {
        ListNode d = new ListNode(0); ListNode c = d;
        for (int v : vals) { c.next = new ListNode(v); c = c.next; }
        return d.next;
    }
    static String str(ListNode h) {
        StringBuilder sb = new StringBuilder();
        while (h != null) { sb.append(h.val); if(h.next!=null) sb.append("→"); h=h.next; }
        return sb.toString();
    }

    public static void main(String[] args) {
        System.out.println("=== Iterative Reverse ===");
        System.out.println("Before: " + str(build(1,2,3,4,5)));
        System.out.println("After:  " + str(reverseIterative(build(1,2,3,4,5))));

        System.out.println("\n=== Recursive Reverse ===");
        System.out.println("Before: " + str(build(1,2,3,4,5)));
        System.out.println("After:  " + str(reverseRecursive(build(1,2,3,4,5))));

        System.out.println("\n=== Reverse K Groups ===");
        System.out.println("k=2: " + str(reverseKGroup(build(1,2,3,4,5), 2)));
        System.out.println("k=3: " + str(reverseKGroup(build(1,2,3,4,5), 3)));
    }
}`,
        output: `=== Iterative Reverse ===
Before: 1→2→3→4→5
After:  5→4→3→2→1

=== Recursive Reverse ===
Before: 1→2→3→4→5
After:  5→4→3→2→1

=== Reverse K Groups ===
k=2: 2→1→4→3→5
k=3: 3→2→1→4→5`
      },
      {
        heading: "Fast & Slow Pointers — Floyd's Algorithm",
        content: "The fast and slow pointer technique (Floyd's Tortoise and Hare) uses two pointers moving at different speeds. Fast moves 2 steps, slow moves 1. They meet inside the cycle if one exists. This single technique solves: cycle detection, finding cycle start, finding middle of list, detecting if list length is even/odd.",
        code: `public class FastSlowPointers {
    static class ListNode { int val; ListNode next; ListNode(int v){val=v;} }

    // Detect cycle — O(n), O(1) space
    static boolean hasCycle(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;        // 1 step
            fast = fast.next.next;   // 2 steps
            if (slow == fast) return true; // met inside cycle!
        }
        return false; // fast reached null — no cycle
    }

    // Find MIDDLE of list — O(n), O(1) space
    // When fast reaches end, slow is at middle
    static ListNode findMiddle(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow; // slow is at middle
    }

    // Find cycle START node — O(n), O(1) space
    // Math insight: after meeting point, reset one pointer to head.
    // Both advance 1 step — they meet at cycle start!
    static ListNode detectCycleStart(ListNode head) {
        ListNode slow = head, fast = head;
        // Phase 1: detect meeting point
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                // Phase 2: find cycle start
                ListNode ptr = head;
                while (ptr != slow) { ptr = ptr.next; slow = slow.next; }
                return slow; // cycle start!
            }
        }
        return null; // no cycle
    }

    // Check if list is palindrome using fast/slow + reverse
    static boolean isPalindrome(ListNode head) {
        // 1. Find middle
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next; fast = fast.next.next;
        }
        // 2. Reverse second half
        ListNode prev = null, curr = slow;
        while (curr != null) {
            ListNode next = curr.next; curr.next = prev; prev = curr; curr = next;
        }
        // 3. Compare both halves
        ListNode left = head, right = prev;
        while (right != null) {
            if (left.val != right.val) return false;
            left = left.next; right = right.next;
        }
        return true;
    }

    static ListNode build(int... v) {
        ListNode d = new ListNode(0), c = d;
        for (int x : v) { c.next = new ListNode(x); c = c.next; }
        return d.next;
    }

    public static void main(String[] args) {
        System.out.println("=== Cycle Detection ===");
        ListNode noCycle = build(1, 2, 3, 4, 5);
        System.out.println("No cycle: " + hasCycle(noCycle));
        // Create cycle: 5 → 2
        ListNode cycle = build(1, 2, 3, 4, 5);
        cycle.next.next.next.next.next = cycle.next; // 5 → 2
        System.out.println("Has cycle: " + hasCycle(cycle));

        System.out.println("\n=== Find Middle ===");
        ListNode l1 = build(1, 2, 3, 4, 5);
        System.out.println("Odd  [1→2→3→4→5]: middle=" + findMiddle(l1).val); // 3
        ListNode l2 = build(1, 2, 3, 4);
        System.out.println("Even [1→2→3→4]:   middle=" + findMiddle(l2).val); // 3 (second)

        System.out.println("\n=== Palindrome Check ===");
        System.out.println("[1→2→2→1]: " + isPalindrome(build(1,2,2,1)));   // true
        System.out.println("[1→2→3]:   " + isPalindrome(build(1,2,3)));     // false
        System.out.println("[1→2→1]:   " + isPalindrome(build(1,2,1)));     // true
    }
}`,
        output: `=== Cycle Detection ===
No cycle: false
Has cycle: true

=== Find Middle ===
Odd  [1→2→3→4→5]: middle=3
Even [1→2→3→4]:   middle=3 (second)

=== Palindrome Check ===
[1→2→2→1]: true
[1→2→3]:   false
[1→2→1]:   true`
      },
      {
        heading: "Merge, Sort & Classic Linked List Problems",
        content: "Merge two sorted lists, remove Nth node from end, add two numbers as linked lists — these appear in nearly every FAANG interview. The dummy node trick is essential: it avoids special-casing the head and makes pointer manipulation cleaner.",
        code: `public class ClassicLinkedListProblems {
    static class ListNode { int val; ListNode next; ListNode(int v){val=v;} }

    // Merge two sorted linked lists — O(m+n)
    static ListNode mergeSorted(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0); // dummy head avoids edge cases
        ListNode curr = dummy;
        while (l1 != null && l2 != null) {
            if (l1.val <= l2.val) { curr.next = l1; l1 = l1.next; }
            else                  { curr.next = l2; l2 = l2.next; }
            curr = curr.next;
        }
        curr.next = (l1 != null) ? l1 : l2; // attach remaining
        return dummy.next;
    }

    // Remove Nth node from end — O(n), ONE PASS
    // Trick: gap two pointers by N steps, then advance both to end
    static ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode fast = dummy, slow = dummy;
        // Advance fast by n+1 steps
        for (int i = 0; i <= n; i++) fast = fast.next;
        // Move both until fast reaches end
        while (fast != null) { fast = fast.next; slow = slow.next; }
        // slow.next is the node to remove
        slow.next = slow.next.next;
        return dummy.next;
    }

    // Add two numbers (digits stored in reverse order)
    // e.g., 342 stored as [2→4→3], 465 as [5→6→4] → 807 = [7→0→8]
    static ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        int carry = 0;
        while (l1 != null || l2 != null || carry != 0) {
            int sum = carry;
            if (l1 != null) { sum += l1.val; l1 = l1.next; }
            if (l2 != null) { sum += l2.val; l2 = l2.next; }
            carry = sum / 10;
            curr.next = new ListNode(sum % 10);
            curr = curr.next;
        }
        return dummy.next;
    }

    // Intersection of two lists — O(m+n), O(1) space
    // Trick: walk both; when one ends, redirect to the other's head
    static ListNode getIntersection(ListNode headA, ListNode headB) {
        ListNode a = headA, b = headB;
        while (a != b) {
            a = (a == null) ? headB : a.next;
            b = (b == null) ? headA : b.next;
        }
        return a; // null if no intersection
    }

    static ListNode build(int... v) {
        ListNode d = new ListNode(0), c = d;
        for (int x : v) { c.next = new ListNode(x); c = c.next; }
        return d.next;
    }
    static String str(ListNode h) {
        StringBuilder sb = new StringBuilder("[");
        while (h!=null) { sb.append(h.val); if(h.next!=null) sb.append("→"); h=h.next; }
        return sb.append("]").toString();
    }

    public static void main(String[] args) {
        System.out.println("=== Merge Sorted Lists ===");
        System.out.println(str(mergeSorted(build(1,2,4), build(1,3,4))));

        System.out.println("\n=== Remove Nth From End ===");
        System.out.println("Remove 2nd from end: " +
            str(removeNthFromEnd(build(1,2,3,4,5), 2)));
        System.out.println("Remove 1st from end: " +
            str(removeNthFromEnd(build(1,2,3), 1)));

        System.out.println("\n=== Add Two Numbers ===");
        // 342 + 465 = 807
        System.out.println("342+465=" + str(addTwoNumbers(build(2,4,3), build(5,6,4))));
        // 999 + 1 = 1000
        System.out.println("999+1=  " + str(addTwoNumbers(build(9,9,9), build(1))));
    }
}`,
        output: `=== Merge Sorted Lists ===
[1→1→2→3→4→4]

=== Remove Nth From End ===
Remove 2nd from end: [1→2→3→5]
Remove 1st from end: [1→2]

=== Add Two Numbers ===
342+465=[7→0→8]
999+1=  [0→0→0→1]`
      }
    ],
    quiz: [
      { q: "Linked list vs array — key difference:", options: ["Same speed", "Linked list: O(1) insert at head, no random access. Array: O(1) random access, O(n) insert middle.", "Array has no random access", "Linked list is always faster"], correct: 1 },
      { q: "Reversing a linked list iteratively needs:", options: ["Stack", "Three pointers: prev, curr, next", "Two pointers only", "HashMap"], correct: 1 },
      { q: "Fast/slow pointer cycle detection — fast pointer moves:", options: ["1 step", "2 steps", "3 steps", "n steps"], correct: 1 },
      { q: "Why use a dummy node in linked list problems?", options: ["Speed", "Avoids special-casing head deletion/insertion — cleaner code", "Memory efficiency", "Required by Java"], correct: 1 },
      { q: "Find middle of list using fast/slow — when fast reaches end, slow is at:", options: ["Start", "End", "Middle of the list", "One before middle"], correct: 2 },
      { q: "Remove Nth from end in ONE pass uses:", options: ["Stack", "Two pointers N steps apart, advance both until fast hits end", "Count then traverse", "Recursion"], correct: 1 }
    ],
    code: `public class LinkedListReview {
    static class ListNode { int val; ListNode next; ListNode(int v){val=v;} }

    // Check if list has a cycle — fast/slow
    static boolean hasCycle(ListNode h) {
        ListNode s=h, f=h;
        while (f!=null && f.next!=null) {
            s=s.next; f=f.next.next;
            if (s==f) return true;
        }
        return false;
    }

    // Reverse in place
    static ListNode reverse(ListNode h) {
        ListNode prev=null, curr=h;
        while (curr!=null) { ListNode n=curr.next; curr.next=prev; prev=curr; curr=n; }
        return prev;
    }

    static ListNode build(int... v) {
        ListNode d=new ListNode(0),c=d;
        for(int x:v){c.next=new ListNode(x);c=c.next;}
        return d.next;
    }
    static String str(ListNode h) {
        StringBuilder sb=new StringBuilder();
        while(h!=null){sb.append(h.val);if(h.next!=null)sb.append("→");h=h.next;}
        return sb.toString();
    }

    public static void main(String[] args) {
        System.out.println("Reverse: " + str(reverse(build(1,2,3,4,5))));
        System.out.println("Cycle: " + hasCycle(build(1,2,3)));
    }
}`,
    output: `Reverse: 5→4→3→2→1
Cycle: false`
  },

  "dsa-trees": {
    title: "DSA — Trees & Binary Search Trees", module: "interview", duration: "50 min", difficulty: "Advanced", xp: 250, icon: "🌳",
    intro: "Trees are one of the most important data structures in coding interviews. Binary trees appear in ~30% of interview problems. Master: tree traversals (inorder, preorder, postorder, level-order), recursive thinking (every tree problem is 'solve for root, recurse for children'), BST properties, and BFS/DFS patterns. The key insight: tree problems almost always have elegant recursive solutions.",
    sections: [
      {
        heading: "Tree Fundamentals & Traversals",
        content: "A binary tree has nodes where each node has at most 2 children (left, right). Root is the top. Leaf nodes have no children. Height = longest root-to-leaf path. Every tree problem can be solved with DFS (recursive, uses stack) or BFS (level by level, uses queue). Know all 4 traversals by heart.",
        code: `import java.util.*;

public class TreeTraversals {
    static class TreeNode {
        int val; TreeNode left, right;
        TreeNode(int v) { val = v; }
        TreeNode(int v, TreeNode l, TreeNode r) { val=v; left=l; right=r; }
    }

    // INORDER: left → root → right (gives SORTED order for BST!)
    static List<Integer> inorder(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        inorderHelper(root, res);
        return res;
    }
    static void inorderHelper(TreeNode node, List<Integer> res) {
        if (node == null) return;
        inorderHelper(node.left, res);
        res.add(node.val);
        inorderHelper(node.right, res);
    }

    // PREORDER: root → left → right (good for copying trees)
    static List<Integer> preorder(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        if (root == null) return res;
        Deque<TreeNode> stack = new ArrayDeque<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            res.add(node.val);
            if (node.right != null) stack.push(node.right); // right first (LIFO)
            if (node.left  != null) stack.push(node.left);
        }
        return res;
    }

    // POSTORDER: left → right → root (good for deleting trees)
    static List<Integer> postorder(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        postorderHelper(root, res);
        return res;
    }
    static void postorderHelper(TreeNode n, List<Integer> res) {
        if (n == null) return;
        postorderHelper(n.left, res);
        postorderHelper(n.right, res);
        res.add(n.val);
    }

    // LEVEL ORDER (BFS): level by level using Queue
    static List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) return res;
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while (!q.isEmpty()) {
            int size = q.size(); // all nodes at this level
            List<Integer> level = new ArrayList<>();
            for (int i = 0; i < size; i++) {
                TreeNode node = q.poll();
                level.add(node.val);
                if (node.left  != null) q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }
            res.add(level);
        }
        return res;
    }

    public static void main(String[] args) {
        //       4
        //      / \\
        //     2   6
        //    / \\ / \\
        //   1  3 5  7
        TreeNode root = new TreeNode(4,
            new TreeNode(2, new TreeNode(1), new TreeNode(3)),
            new TreeNode(6, new TreeNode(5), new TreeNode(7)));

        System.out.println("Inorder   (L→R→L): " + inorder(root));  // [1,2,3,4,5,6,7] SORTED!
        System.out.println("Preorder  (R→L→L): " + preorder(root)); // [4,2,1,3,6,5,7]
        System.out.println("Postorder (L→L→R): " + postorder(root));// [1,3,2,5,7,6,4]
        System.out.println("Level order:       " + levelOrder(root));// [[4],[2,6],[1,3,5,7]]
    }
}`,
        output: `Inorder   (L→R→L): [1, 2, 3, 4, 5, 6, 7]
Preorder  (R→L→L): [4, 2, 1, 3, 6, 5, 7]
Postorder (L→L→R): [1, 3, 2, 5, 7, 6, 4]
Level order:       [[4], [2, 6], [1, 3, 5, 7]]`
      },
      {
        heading: "Classic Tree Problems — Recursive Patterns",
        content: "Almost every tree problem follows the same recursive pattern: solve for the current node, recurse left and right, combine results. Internalize this thinking and you can solve most tree problems. Key problems: max depth, is symmetric, path sum, lowest common ancestor.",
        code: `import java.util.*;

public class ClassicTreeProblems {
    static class TreeNode { int val; TreeNode left, right; TreeNode(int v){val=v;} }

    // Max depth — O(n)
    static int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }

    // Is symmetric (mirror of itself) — O(n)
    static boolean isSymmetric(TreeNode root) {
        return isMirror(root, root);
    }
    static boolean isMirror(TreeNode l, TreeNode r) {
        if (l == null && r == null) return true;
        if (l == null || r == null) return false;
        return l.val == r.val
            && isMirror(l.left,  r.right)
            && isMirror(l.right, r.left);
    }

    // Has path sum — does root-to-leaf path sum to target?
    static boolean hasPathSum(TreeNode root, int target) {
        if (root == null) return false;
        if (root.left == null && root.right == null) return root.val == target; // leaf!
        return hasPathSum(root.left,  target - root.val) ||
               hasPathSum(root.right, target - root.val);
    }

    // Max path sum — path can go through any nodes
    static int maxPathSum;
    static int maxPathSum(TreeNode root) {
        maxPathSum = Integer.MIN_VALUE;
        maxGain(root);
        return maxPathSum;
    }
    static int maxGain(TreeNode node) {
        if (node == null) return 0;
        int left  = Math.max(maxGain(node.left),  0); // ignore negative branches
        int right = Math.max(maxGain(node.right), 0);
        maxPathSum = Math.max(maxPathSum, node.val + left + right); // path through node
        return node.val + Math.max(left, right); // return max arm
    }

    // Lowest Common Ancestor — O(n)
    static TreeNode lca(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;
        TreeNode left  = lca(root.left,  p, q);
        TreeNode right = lca(root.right, p, q);
        if (left != null && right != null) return root; // p and q on different sides
        return (left != null) ? left : right;
    }

    // Count nodes — O(n)
    static int countNodes(TreeNode root) {
        if (root == null) return 0;
        return 1 + countNodes(root.left) + countNodes(root.right);
    }

    static TreeNode build(int... v) {
        if (v.length == 0) return null;
        TreeNode[] nodes = new TreeNode[v.length];
        for (int i = 0; i < v.length; i++) if (v[i] != -1) nodes[i] = new TreeNode(v[i]);
        for (int i = 0; i < v.length; i++) {
            if (nodes[i] == null) continue;
            if (2*i+1 < v.length) nodes[i].left  = nodes[2*i+1];
            if (2*i+2 < v.length) nodes[i].right = nodes[2*i+2];
        }
        return nodes[0];
    }

    public static void main(String[] args) {
        //       3
        //      / \\
        //     9  20
        //       / \\
        //      15   7
        TreeNode root = build(3, 9, 20, -1, -1, 15, 7);
        System.out.println("maxDepth: "  + maxDepth(root));         // 3

        //     1
        //    / \\
        //   2   2
        //  / \\ / \\
        // 3  4 4  3
        TreeNode sym = build(1, 2, 2, 3, 4, 4, 3);
        System.out.println("isSymmetric: " + isSymmetric(sym));      // true

        //     5
        //    / \\
        //   4   8
        //  /   / \\
        // 11  13   4
        // /\\       \\
        //7  2        1
        TreeNode psum = build(5,4,8,11,-1,13,4,7,2,-1,-1,-1,-1,-1,1);
        System.out.println("hasPathSum(22): " + hasPathSum(psum, 22)); // true

        System.out.println("countNodes: " + countNodes(root));        // 5

        // LCA
        TreeNode t = build(3,5,1,6,2,0,8,-1,-1,7,4);
        TreeNode p = t.left; TreeNode q = t.left.right.right; // nodes 5 and 4
        System.out.println("LCA(5,4): " + lca(t, p, q).val);          // 5
    }
}`,
        output: `maxDepth: 3
isSymmetric: true
hasPathSum(22): true
countNodes: 5
LCA(5,4): 5`
      },
      {
        heading: "Binary Search Tree — Search, Insert, Validate",
        content: "A BST has a critical property: left subtree values < root < right subtree values. This makes inorder traversal give sorted output. Search, insert, and delete are O(log n) average (O(n) worst if unbalanced). Validating a BST requires passing min/max bounds down — a common interview question.",
        code: `import java.util.*;

public class BinarySearchTree {
    static class TreeNode { int val; TreeNode left, right; TreeNode(int v){val=v;} }

    // Search — O(log n) average
    static TreeNode search(TreeNode root, int target) {
        if (root == null || root.val == target) return root;
        if (target < root.val) return search(root.left, target);
        return search(root.right, target);
    }

    // Insert — O(log n) average
    static TreeNode insert(TreeNode root, int val) {
        if (root == null) return new TreeNode(val);
        if (val < root.val) root.left  = insert(root.left,  val);
        else if (val > root.val) root.right = insert(root.right, val);
        // If val == root.val: duplicate, don't insert
        return root;
    }

    // Validate BST — O(n)
    // Key insight: pass min/max bounds, not just check children!
    // BAD: check if root.left.val < root.val — doesn't catch cases like [5,4,6,null,null,3,7]
    // GOOD: every node must be strictly within (min, max)
    static boolean isValidBST(TreeNode root) {
        return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }
    static boolean validate(TreeNode node, long min, long max) {
        if (node == null) return true;
        if (node.val <= min || node.val >= max) return false;
        return validate(node.left,  min, node.val) &&
               validate(node.right, node.val, max);
    }

    // Kth smallest element in BST — inorder traversal
    static int kthSmallest(TreeNode root, int k) {
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode curr = root;
        int count = 0;
        while (curr != null || !stack.isEmpty()) {
            while (curr != null) { stack.push(curr); curr = curr.left; }
            curr = stack.pop();
            if (++count == k) return curr.val;
            curr = curr.right;
        }
        return -1;
    }

    // Convert sorted array to balanced BST — O(n)
    static TreeNode sortedArrayToBST(int[] nums, int left, int right) {
        if (left > right) return null;
        int mid = left + (right - left) / 2;
        TreeNode node = new TreeNode(nums[mid]);
        node.left  = sortedArrayToBST(nums, left,   mid - 1);
        node.right = sortedArrayToBST(nums, mid + 1, right);
        return node;
    }

    static String inorder(TreeNode root) {
        if (root == null) return "";
        return inorder(root.left) + root.val + " " + inorder(root.right);
    }

    public static void main(String[] args) {
        // Build BST: insert 5,3,7,1,4,6,8
        TreeNode bst = null;
        for (int v : new int[]{5, 3, 7, 1, 4, 6, 8})
            bst = insert(bst, v);
        System.out.println("Inorder (sorted): " + inorder(bst).trim());

        System.out.println("Search 4: " + (search(bst, 4) != null ? "found" : "not found"));
        System.out.println("Search 9: " + (search(bst, 9) != null ? "found" : "not found"));

        System.out.println("isValidBST: " + isValidBST(bst));

        System.out.println("2nd smallest: " + kthSmallest(bst, 2)); // 3
        System.out.println("4th smallest: " + kthSmallest(bst, 4)); // 5

        // Sorted array to BST
        int[] sorted = {1, 2, 3, 4, 5, 6, 7};
        TreeNode balanced = sortedArrayToBST(sorted, 0, sorted.length - 1);
        System.out.println("Balanced BST inorder: " + inorder(balanced).trim());
    }
}`,
        output: `Inorder (sorted): 1 3 4 5 6 7 8
Search 4: found
Search 9: not found
isValidBST: true
2nd smallest: 3
4th smallest: 5
Balanced BST inorder: 1 2 3 4 5 6 7`
      }
    ],
    quiz: [
      { q: "Inorder traversal of a BST gives:", options: ["Random order", "Reverse sorted order", "Sorted (ascending) order", "Level order"], correct: 2 },
      { q: "Level order traversal uses:", options: ["Stack (DFS)", "Queue (BFS)", "Recursion only", "No data structure"], correct: 1 },
      { q: "Recursive tree problems follow the pattern:", options: ["Iterate all nodes", "Solve for root, recurse for left and right, combine results", "Sort first then process", "Use HashMap for all problems"], correct: 1 },
      { q: "Validating BST correctly requires:", options: ["Only checking left < root and root < right", "Passing min/max bounds down to each node", "Inorder traversal only", "Comparing all pairs"], correct: 1 },
      { q: "Max depth of a tree — recursive formula:", options: ["depth(left) + depth(right)", "1 + max(depth(left), depth(right))", "min(depth(left), depth(right))", "depth(left) * depth(right)"], correct: 1 },
      { q: "LCA (Lowest Common Ancestor) algorithm:", options: ["BFS from both nodes", "If p and q are on different sides of root — root is LCA", "Sort nodes first", "Use parent pointers only"], correct: 1 }
    ],
    code: `import java.util.*;
public class TreeReview {
    static class TreeNode { int val; TreeNode left, right; TreeNode(int v){val=v;} }

    static int maxDepth(TreeNode root) {
        return root==null ? 0 : 1+Math.max(maxDepth(root.left),maxDepth(root.right));
    }
    static List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root==null) return res;
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while (!q.isEmpty()) {
            int sz=q.size(); List<Integer> level=new ArrayList<>();
            for (int i=0;i<sz;i++) {
                TreeNode n=q.poll(); level.add(n.val);
                if(n.left!=null) q.offer(n.left);
                if(n.right!=null) q.offer(n.right);
            }
            res.add(level);
        }
        return res;
    }
    public static void main(String[] args) {
        TreeNode root = new TreeNode(1);
        root.left=new TreeNode(2); root.right=new TreeNode(3);
        root.left.left=new TreeNode(4); root.left.right=new TreeNode(5);
        System.out.println("Depth: " + maxDepth(root));
        System.out.println("Levels: " + levelOrder(root));
    }
}`,
    output: `Depth: 3
Levels: [[1], [2, 3], [4, 5]]`
  },

  "dsa-sorting": {
    title: "DSA — Sorting Algorithms", module: "interview", duration: "40 min", difficulty: "Intermediate", xp: 200, icon: "📊",
    intro: "Sorting is foundational to computer science and commonly tested in interviews. You must know the time/space complexities of all major algorithms, be able to implement Merge Sort and Quick Sort from scratch, and know WHEN to use each. Java's Arrays.sort() uses TimSort (merge + insertion, O(n log n)). Collections.sort() is also O(n log n).",
    sections: [
      {
        heading: "Sorting Algorithms — Complexity Comparison",
        content: "Know these cold: Bubble/Selection/Insertion are O(n²) — only use for small arrays or nearly sorted data. Merge Sort is O(n log n) guaranteed, O(n) extra space — best for stability. Quick Sort is O(n log n) average, O(n²) worst — best in-place. Heap Sort is O(n log n) guaranteed, O(1) space.",
        table: {
          headers: ["Algorithm", "Best", "Average", "Worst", "Space", "Stable?", "Use When"],
          rows: [
            ["Bubble Sort", "O(n)", "O(n²)", "O(n²)", "O(1)", "Yes", "Educational only"],
            ["Selection Sort", "O(n²)", "O(n²)", "O(n²)", "O(1)", "No", "Small arrays, minimise swaps"],
            ["Insertion Sort", "O(n)", "O(n²)", "O(n²)", "O(1)", "Yes", "Nearly sorted, small arrays"],
            ["Merge Sort", "O(n log n)", "O(n log n)", "O(n log n)", "O(n)", "Yes", "Need guaranteed O(n log n), stability"],
            ["Quick Sort", "O(n log n)", "O(n log n)", "O(n²)", "O(log n)", "No", "General purpose, in-place"],
            ["Heap Sort", "O(n log n)", "O(n log n)", "O(n log n)", "O(1)", "No", "O(n log n) guaranteed + O(1) space"],
            ["Counting Sort", "O(n+k)", "O(n+k)", "O(n+k)", "O(k)", "Yes", "Small range of integers"],
            ["TimSort (Java)", "O(n)", "O(n log n)", "O(n log n)", "O(n)", "Yes", "Java's default Arrays.sort()"]
          ]
        },
        code: `import java.util.Arrays;

public class SortingComparison {
    // Bubble Sort — O(n²), simple but slow
    static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n-1; i++) {
            boolean swapped = false;
            for (int j = 0; j < n-i-1; j++) {
                if (arr[j] > arr[j+1]) {
                    int t = arr[j]; arr[j] = arr[j+1]; arr[j+1] = t;
                    swapped = true;
                }
            }
            if (!swapped) break; // already sorted — O(n) best case
        }
    }

    // Insertion Sort — O(n²), great for nearly sorted data
    static void insertionSort(int[] arr) {
        for (int i = 1; i < arr.length; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j+1] = arr[j]; // shift right
                j--;
            }
            arr[j+1] = key; // insert in correct position
        }
    }

    // Selection Sort — O(n²), minimises number of swaps
    static void selectionSort(int[] arr) {
        for (int i = 0; i < arr.length-1; i++) {
            int minIdx = i;
            for (int j = i+1; j < arr.length; j++)
                if (arr[j] < arr[minIdx]) minIdx = j;
            int t = arr[minIdx]; arr[minIdx] = arr[i]; arr[i] = t;
        }
    }

    public static void main(String[] args) {
        int[] a1 = {64,34,25,12,22,11,90};
        int[] a2 = a1.clone();
        int[] a3 = a1.clone();

        bubbleSort(a1);
        System.out.println("Bubble:    " + Arrays.toString(a1));

        insertionSort(a2);
        System.out.println("Insertion: " + Arrays.toString(a2));

        selectionSort(a3);
        System.out.println("Selection: " + Arrays.toString(a3));

        // Java's built-in — TimSort, O(n log n)
        int[] a4 = {64,34,25,12,22,11,90};
        Arrays.sort(a4);
        System.out.println("TimSort:   " + Arrays.toString(a4));
    }
}`,
        output: `Bubble:    [11, 12, 22, 25, 34, 64, 90]
Insertion: [11, 12, 22, 25, 34, 64, 90]
Selection: [11, 12, 22, 25, 34, 64, 90]
TimSort:   [11, 12, 22, 25, 34, 64, 90]`
      },
      {
        heading: "Merge Sort & Quick Sort — Must-Know Implementations",
        content: "These two are the most important sorting algorithms to implement from scratch in an interview. Merge Sort: divide array in half recursively, merge sorted halves. Quick Sort: pick a pivot, partition into smaller/larger, recurse. Both are O(n log n) average.",
        code: `import java.util.*;

public class MergeAndQuick {

    // ── MERGE SORT — Divide and Conquer ──────────────────────────
    // Guaranteed O(n log n), stable, O(n) extra space
    static void mergeSort(int[] arr, int left, int right) {
        if (left >= right) return; // base case: 1 element
        int mid = left + (right - left) / 2;
        mergeSort(arr, left,   mid);   // sort left half
        mergeSort(arr, mid+1,  right); // sort right half
        merge(arr, left, mid, right);  // merge sorted halves
    }
    static void merge(int[] arr, int left, int mid, int right) {
        int[] temp = Arrays.copyOfRange(arr, left, right + 1);
        int i = 0, j = mid - left + 1, k = left;
        while (i <= mid - left && j <= right - left) {
            if (temp[i] <= temp[j]) arr[k++] = temp[i++];
            else                    arr[k++] = temp[j++];
        }
        while (i <= mid - left)  arr[k++] = temp[i++];
        while (j <= right - left) arr[k++] = temp[j++];
    }

    // ── QUICK SORT — Partition around pivot ───────────────────────
    // O(n log n) average, O(n²) worst (avoid by random pivot)
    static void quickSort(int[] arr, int low, int high) {
        if (low >= high) return;
        int pivot = partition(arr, low, high);
        quickSort(arr, low,     pivot - 1); // left of pivot
        quickSort(arr, pivot + 1, high);    // right of pivot
    }
    static int partition(int[] arr, int low, int high) {
        // Randomise pivot to avoid O(n²) worst case
        int randIdx = low + (int)(Math.random() * (high - low + 1));
        swap(arr, randIdx, high); // move random pivot to end
        int pivot = arr[high];
        int i = low - 1; // i = last position of smaller-than-pivot zone
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                swap(arr, i, j); // expand smaller zone
            }
        }
        swap(arr, i+1, high); // place pivot in correct position
        return i + 1; // pivot index
    }
    static void swap(int[] a, int i, int j) { int t=a[i]; a[i]=a[j]; a[j]=t; }

    // ── COUNTING SORT — O(n+k) for small integer range ───────────
    static int[] countingSort(int[] arr, int maxVal) {
        int[] count = new int[maxVal + 1];
        for (int n : arr) count[n]++;
        int[] result = new int[arr.length];
        int idx = 0;
        for (int i = 0; i <= maxVal; i++)
            while (count[i]-- > 0) result[idx++] = i;
        return result;
    }

    public static void main(String[] args) {
        int[] original = {38, 27, 43, 3, 9, 82, 10};

        int[] ms = original.clone();
        mergeSort(ms, 0, ms.length - 1);
        System.out.println("Merge Sort:    " + Arrays.toString(ms));

        int[] qs = original.clone();
        quickSort(qs, 0, qs.length - 1);
        System.out.println("Quick Sort:    " + Arrays.toString(qs));

        int[] small = {4, 2, 2, 8, 3, 3, 1};
        System.out.println("Counting Sort: " + Arrays.toString(countingSort(small, 8)));

        // Merge Sort for counting inversions (bonus!)
        System.out.println("\nMerge Sort stability: preserves relative order of equal elements");
        System.out.println("Quick Sort: NOT stable (equal elements may reorder)");
        System.out.println("Use Arrays.sort() in practice — it's optimised TimSort");
    }
}`,
        output: `Merge Sort:    [3, 9, 10, 27, 38, 43, 82]
Quick Sort:    [3, 9, 10, 27, 38, 43, 82]
Counting Sort: [1, 2, 2, 3, 3, 4, 8]

Merge Sort stability: preserves relative order of equal elements
Quick Sort: NOT stable (equal elements may reorder)
Use Arrays.sort() in practice — it's optimised TimSort`
      },
      {
        heading: "Sorting in Practice — Custom Comparators & Problems",
        content: "In real interviews, you rarely need to implement a sort — but you DO need to sort by custom criteria. Know Comparator.comparing(), thenComparing(), and how to solve sorting-related problems like meeting rooms, task scheduler, and kth largest element.",
        code: `import java.util.*;
import java.util.stream.*;

public class SortingProblems {

    // Kth Largest Element — Quick Select O(n) average
    static int kthLargest(int[] nums, int k) {
        return quickSelect(nums, 0, nums.length-1, nums.length-k);
    }
    static int quickSelect(int[] arr, int lo, int hi, int k) {
        if (lo == hi) return arr[lo];
        int pivot = partition(arr, lo, hi);
        if (pivot == k)      return arr[pivot];
        else if (pivot < k)  return quickSelect(arr, pivot+1, hi, k);
        else                 return quickSelect(arr, lo, pivot-1, k);
    }
    static int partition(int[] arr, int lo, int hi) {
        int pivot = arr[hi], i = lo-1;
        for (int j=lo;j<hi;j++) if (arr[j]<=pivot){i++;int t=arr[i];arr[i]=arr[j];arr[j]=t;}
        int t=arr[i+1];arr[i+1]=arr[hi];arr[hi]=t;
        return i+1;
    }

    // Meeting Rooms — can attend all? (sort by start time)
    static boolean canAttendAll(int[][] intervals) {
        Arrays.sort(intervals, (a,b) -> a[0] - b[0]);
        for (int i=1;i<intervals.length;i++)
            if (intervals[i][0] < intervals[i-1][1]) return false;
        return true;
    }

    // Minimum meeting rooms needed — O(n log n)
    static int minMeetingRooms(int[][] intervals) {
        int[] starts = new int[intervals.length];
        int[] ends   = new int[intervals.length];
        for (int i=0;i<intervals.length;i++) {
            starts[i] = intervals[i][0];
            ends[i]   = intervals[i][1];
        }
        Arrays.sort(starts); Arrays.sort(ends);
        int rooms=0, endIdx=0;
        for (int start : starts) {
            if (start < ends[endIdx]) rooms++; // new meeting starts before any ends
            else                      endIdx++; // reuse a room
        }
        return rooms;
    }

    // Sort by multiple criteria using Comparator chaining
    record Student(String name, int grade, double gpa) {}

    public static void main(String[] args) {
        System.out.println("=== Kth Largest ===");
        System.out.println("3rd largest in [3,2,1,5,6,4]: " +
            kthLargest(new int[]{3,2,1,5,6,4}, 2)); // 5

        System.out.println("\n=== Meeting Rooms ===");
        System.out.println("Can attend all [[0,30],[5,10],[15,20]]: " +
            canAttendAll(new int[][]{{0,30},{5,10},{15,20}})); // false
        System.out.println("Can attend all [[7,10],[2,4]]: " +
            canAttendAll(new int[][]{{7,10},{2,4}})); // true
        System.out.println("Min rooms [[0,30],[5,10],[15,20]]: " +
            minMeetingRooms(new int[][]{{0,30},{5,10},{15,20}})); // 2

        System.out.println("\n=== Custom Comparator Sorting ===");
        List<Student> students = new ArrayList<>(List.of(
            new Student("Charlie", 11, 3.5),
            new Student("Alice",   12, 3.9),
            new Student("Bob",     11, 3.7),
            new Student("Diana",   12, 3.9)
        ));
        // Sort by grade asc, then GPA desc, then name asc
        students.sort(Comparator.comparingInt(Student::grade)
                                .thenComparing(Comparator.comparingDouble(Student::gpa).reversed())
                                .thenComparing(Student::name));
        students.forEach(s -> System.out.printf("  %s G%d GPA%.1f%n", s.name(), s.grade(), s.gpa()));
    }
}`,
        output: `=== Kth Largest ===
3rd largest in [3,2,1,5,6,4]: 5

=== Meeting Rooms ===
Can attend all [[0,30],[5,10],[15,20]]: false
Can attend all [[7,10],[2,4]]: true
Min rooms [[0,30],[5,10],[15,20]]: 2

=== Custom Comparator Sorting ===
  Bob G11 GPA3.7
  Charlie G11 GPA3.5
  Alice G12 GPA3.9
  Diana G12 GPA3.9`
      }
    ],
    quiz: [
      { q: "Merge Sort guaranteed worst-case time:", options: ["O(n²)", "O(n log n) always", "O(n)", "O(n log² n)"], correct: 1 },
      { q: "Quick Sort worst case O(n²) happens when:", options: ["Array is random", "Pivot is always min or max (already sorted array)", "Array has duplicates", "Array is reversed"], correct: 1 },
      { q: "Stable sort means:", options: ["Faster sort", "Equal elements maintain their original relative order", "Works on any data type", "O(1) space"], correct: 1 },
      { q: "Kth largest using Quick Select — average time:", options: ["O(n²)", "O(n log n)", "O(n) average", "O(log n)"], correct: 2 },
      { q: "Java's Arrays.sort() uses:", options: ["Quick Sort", "Merge Sort", "TimSort (Merge + Insertion)", "Heap Sort"], correct: 2 },
      { q: "Counting Sort runs in O(n+k) but requires:", options: ["Sorted input", "Integer values in a known range k", "Extra O(n²) space", "Comparison-based input"], correct: 1 }
    ],
    code: `import java.util.*;
public class SortingReview {
    static void mergeSort(int[] arr, int l, int r) {
        if (l>=r) return;
        int mid=l+(r-l)/2;
        mergeSort(arr,l,mid); mergeSort(arr,mid+1,r);
        int[] tmp=Arrays.copyOfRange(arr,l,r+1);
        int i=0,j=mid-l+1,k=l;
        while(i<=mid-l&&j<=r-l) arr[k++]=tmp[i]<=tmp[j]?tmp[i++]:tmp[j++];
        while(i<=mid-l) arr[k++]=tmp[i++];
        while(j<=r-l)   arr[k++]=tmp[j++];
    }
    public static void main(String[] args) {
        int[] arr = {5,2,8,1,9,3,7,4,6};
        mergeSort(arr, 0, arr.length-1);
        System.out.println("Sorted: " + Arrays.toString(arr));

        // Custom sort: by string length then alphabetically
        String[] words = {"banana","fig","apple","date","kiwi"};
        Arrays.sort(words, Comparator.comparingInt(String::length).thenComparing(Comparator.naturalOrder()));
        System.out.println("Custom: " + Arrays.toString(words));
    }
}`,
    output: `Sorted: [1, 2, 3, 4, 5, 6, 7, 8, 9]
Custom: [fig, date, kiwi, apple, banana]`
  },

  "dsa-dynamic-programming": {
    title: "DSA — Dynamic Programming", module: "interview", duration: "55 min", difficulty: "Advanced", xp: 275, icon: "🧩",
    intro: "Dynamic Programming (DP) is the hardest and most rewarding interview topic. DP solves problems by breaking them into overlapping subproblems and storing results to avoid recomputation. Two approaches: Top-down (memoization = recursion + cache) and Bottom-up (tabulation = fill a table iteratively). The key to DP: identify the recurrence relation — how the answer to a bigger problem relates to smaller subproblems.",
    sections: [
      {
        heading: "DP Fundamentals — Fibonacci & Coin Change",
        content: "Start with Fibonacci to understand memoization vs tabulation. Then coin change to understand the 'minimum' pattern. These two teach you the core DP thinking process: identify the recurrence, define the state, determine the base case.",
        code: `import java.util.*;

public class DPFundamentals {

    // ── FIBONACCI — demonstrates memoization vs tabulation ────────

    // 1. Naive recursion — O(2^n) exponential — DON'T USE
    static long fibNaive(int n) {
        if (n <= 1) return n;
        return fibNaive(n-1) + fibNaive(n-2); // computes same values many times!
    }

    // 2. Top-down (Memoization) — O(n) time, O(n) space
    static Map<Integer,Long> memo = new HashMap<>();
    static long fibMemo(int n) {
        if (n <= 1) return n;
        if (memo.containsKey(n)) return memo.get(n); // cache hit!
        long result = fibMemo(n-1) + fibMemo(n-2);
        memo.put(n, result); // cache for reuse
        return result;
    }

    // 3. Bottom-up (Tabulation) — O(n) time, O(n) space
    static long fibTable(int n) {
        if (n <= 1) return n;
        long[] dp = new long[n+1];
        dp[0] = 0; dp[1] = 1;
        for (int i = 2; i <= n; i++) dp[i] = dp[i-1] + dp[i-2];
        return dp[n];
    }

    // 4. Space-optimised — O(n) time, O(1) space
    static long fibOptimal(int n) {
        if (n <= 1) return n;
        long prev2 = 0, prev1 = 1;
        for (int i = 2; i <= n; i++) {
            long curr = prev1 + prev2;
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }

    // ── COIN CHANGE — minimum coins to make amount ────────────────
    // State: dp[i] = minimum coins to make amount i
    // Recurrence: dp[i] = min(dp[i - coin] + 1) for each coin
    static int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1); // infinity (impossible)
        dp[0] = 0; // base case: 0 coins to make amount 0
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (coin <= i) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount]; // -1 if impossible
    }

    // Coin Change 2 — number of combinations (not minimum)
    // State: dp[i] = number of ways to make amount i
    // Recurrence: dp[i] += dp[i - coin] for each coin
    static int coinChangeCombinations(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        dp[0] = 1; // one way to make 0: use no coins
        for (int coin : coins) {
            for (int i = coin; i <= amount; i++) {
                dp[i] += dp[i - coin]; // add ways using this coin
            }
        }
        return dp[amount];
    }

    public static void main(String[] args) {
        System.out.println("=== Fibonacci ===");
        System.out.println("fib(10) naive:   " + fibNaive(10));
        System.out.println("fib(10) memo:    " + fibMemo(10));
        System.out.println("fib(10) table:   " + fibTable(10));
        System.out.println("fib(10) optimal: " + fibOptimal(10));
        System.out.println("fib(50) optimal: " + fibOptimal(50)); // fast!

        System.out.println("\n=== Coin Change ===");
        System.out.println("coins=[1,5,10,25] amount=41: min=" +
            coinChange(new int[]{1,5,10,25}, 41)); // 3 (25+10+5+1? No: 25+10+5+1=41, 4 coins. Min=25+16? 25+10+5+1=4)
        System.out.println("coins=[1,2,5] amount=11: min=" +
            coinChange(new int[]{1,2,5}, 11)); // 3 (5+5+1)
        System.out.println("coins=[2] amount=3: min=" +
            coinChange(new int[]{2}, 3)); // -1 (impossible)

        System.out.println("\n=== Coin Combinations ===");
        System.out.println("coins=[1,2,5] amount=5 ways=" +
            coinChangeCombinations(new int[]{1,2,5}, 5)); // 4 ways
    }
}`,
        output: `=== Fibonacci ===
fib(10) naive:   55
fib(10) memo:    55
fib(10) table:   55
fib(10) optimal: 55
fib(50) optimal: 12586269025

=== Coin Change ===
coins=[1,5,10,25] amount=41: min=4
coins=[1,2,5] amount=11: min=3
coins=[2] amount=3: min=-1

=== Coin Combinations ===
coins=[1,2,5] amount=5 ways=4`
      },
      {
        heading: "Classic DP Patterns — Subsequences & Subsets",
        content: "DP has recurring patterns. The 1D pattern (Fibonacci, Climbing Stairs) uses a single array. The 2D pattern (Longest Common Subsequence, Edit Distance) uses a 2D grid where dp[i][j] represents the answer for the first i characters of s and first j of t.",
        code: `import java.util.*;

public class DPPatterns {

    // ── 1D DP: Climbing Stairs ────────────────────────────────────
    // Can climb 1 or 2 steps. How many ways to reach step n?
    // Recurrence: ways(n) = ways(n-1) + ways(n-2) ← it's Fibonacci!
    static int climbStairs(int n) {
        if (n <= 2) return n;
        int prev2 = 1, prev1 = 2;
        for (int i = 3; i <= n; i++) {
            int curr = prev1 + prev2;
            prev2 = prev1; prev1 = curr;
        }
        return prev1;
    }

    // ── 1D DP: House Robber ───────────────────────────────────────
    // Can't rob adjacent houses. Max money?
    // Recurrence: rob(i) = max(rob(i-1), rob(i-2) + nums[i])
    static int rob(int[] nums) {
        if (nums.length == 1) return nums[0];
        int prev2 = nums[0];
        int prev1 = Math.max(nums[0], nums[1]);
        for (int i = 2; i < nums.length; i++) {
            int curr = Math.max(prev1, prev2 + nums[i]);
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }

    // ── 1D DP: Longest Increasing Subsequence (LIS) ───────────────
    // dp[i] = length of LIS ending at index i
    static int lengthOfLIS(int[] nums) {
        int[] dp = new int[nums.length];
        Arrays.fill(dp, 1); // each element alone is LIS of length 1
        int max = 1;
        for (int i = 1; i < nums.length; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
            max = Math.max(max, dp[i]);
        }
        return max;
    }

    // ── 2D DP: Longest Common Subsequence (LCS) ───────────────────
    // dp[i][j] = LCS of s[0..i-1] and t[0..j-1]
    // Recurrence:
    //   if s[i-1] == t[j-1]: dp[i][j] = dp[i-1][j-1] + 1
    //   else:                 dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    static int lcs(String s, String t) {
        int m = s.length(), n = t.length();
        int[][] dp = new int[m+1][n+1];
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (s.charAt(i-1) == t.charAt(j-1))
                    dp[i][j] = dp[i-1][j-1] + 1;      // match!
                else
                    dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]); // take best
            }
        }
        return dp[m][n];
    }

    // ── 2D DP: Edit Distance (Levenshtein) ────────────────────────
    // Minimum insert/delete/replace to convert s to t
    static int editDistance(String s, String t) {
        int m = s.length(), n = t.length();
        int[][] dp = new int[m+1][n+1];
        for (int i = 0; i <= m; i++) dp[i][0] = i; // delete i chars
        for (int j = 0; j <= n; j++) dp[0][j] = j; // insert j chars
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (s.charAt(i-1) == t.charAt(j-1))
                    dp[i][j] = dp[i-1][j-1]; // no operation needed
                else
                    dp[i][j] = 1 + Math.min(dp[i-1][j-1], // replace
                                Math.min(dp[i-1][j],        // delete
                                         dp[i][j-1]));      // insert
            }
        }
        return dp[m][n];
    }

    public static void main(String[] args) {
        System.out.println("=== Climbing Stairs ===");
        for (int n=1;n<=6;n++) System.out.println("n="+n+": "+climbStairs(n)+" ways");

        System.out.println("\n=== House Robber ===");
        System.out.println("[2,7,9,3,1]: " + rob(new int[]{2,7,9,3,1})); // 12
        System.out.println("[1,2,3,1]:   " + rob(new int[]{1,2,3,1}));   // 4

        System.out.println("\n=== LIS ===");
        System.out.println("[10,9,2,5,3,7,101,18]: " +
            lengthOfLIS(new int[]{10,9,2,5,3,7,101,18})); // 4

        System.out.println("\n=== LCS ===");
        System.out.println("LCS('abcde','ace')=" + lcs("abcde","ace")); // 3
        System.out.println("LCS('abc','abc')="   + lcs("abc","abc"));   // 3

        System.out.println("\n=== Edit Distance ===");
        System.out.println("horse→rorse: " + editDistance("horse","rorse")); // 1
        System.out.println("horse→ros:   " + editDistance("horse","ros"));   // 3
        System.out.println("abc→abc:     " + editDistance("abc","abc"));     // 0
    }
}`,
        output: `=== Climbing Stairs ===
n=1: 1 ways
n=2: 2 ways
n=3: 3 ways
n=4: 5 ways
n=5: 8 ways
n=6: 13 ways

=== House Robber ===
[2,7,9,3,1]: 12
[1,2,3,1]:   4

=== LIS ===
[10,9,2,5,3,7,101,18]: 4

=== LCS ===
LCS('abcde','ace')=3
LCS('abc','abc')=3

=== Edit Distance ===
horse→rorse: 1
horse→ros:   3
abc→abc:     0`
      },
      {
        heading: "Knapsack Pattern — 0/1 and Unbounded",
        content: "The knapsack pattern is fundamental to interview DP. 0/1 Knapsack: each item used at most once. Unbounded Knapsack: items can be reused. Same dp[i][w] framework — just change the inner loop direction. Subset Sum, Partition Equal Subset Sum, and Target Sum are all variations.",
        code: `public class KnapsackDP {

    // 0/1 Knapsack — each item used AT MOST ONCE
    // dp[i][w] = max value using first i items with weight limit w
    static int knapsack01(int[] weights, int[] values, int capacity) {
        int n = weights.length;
        int[][] dp = new int[n+1][capacity+1];
        for (int i = 1; i <= n; i++) {
            for (int w = 0; w <= capacity; w++) {
                dp[i][w] = dp[i-1][w]; // don't include item i
                if (weights[i-1] <= w) {
                    dp[i][w] = Math.max(dp[i][w],
                        dp[i-1][w - weights[i-1]] + values[i-1]); // include item i
                }
            }
        }
        return dp[n][capacity];
    }

    // 0/1 Knapsack space-optimised — O(W) space
    static int knapsack01Opt(int[] weights, int[] values, int capacity) {
        int[] dp = new int[capacity + 1];
        for (int i = 0; i < weights.length; i++) {
            // Traverse BACKWARDS to avoid using item i more than once
            for (int w = capacity; w >= weights[i]; w--) {
                dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
            }
        }
        return dp[capacity];
    }

    // Subset Sum — can we make exactly target? (0/1 knapsack variant)
    static boolean subsetSum(int[] nums, int target) {
        boolean[] dp = new boolean[target + 1];
        dp[0] = true; // empty subset = sum 0
        for (int num : nums) {
            for (int j = target; j >= num; j--) { // backwards!
                dp[j] = dp[j] || dp[j - num];
            }
        }
        return dp[target];
    }

    // Partition Equal Subset Sum
    static boolean canPartition(int[] nums) {
        int total = 0;
        for (int n : nums) total += n;
        if (total % 2 != 0) return false; // odd total can't be halved
        return subsetSum(nums, total / 2);
    }

    // Target Sum — assign + or - to each number to reach target
    // # of ways
    static int findTargetSumWays(int[] nums, int target) {
        int total = 0;
        for (int n : nums) total += n;
        if ((total + target) % 2 != 0 || Math.abs(target) > total) return 0;
        int sum = (total + target) / 2; // find subset summing to this
        int[] dp = new int[sum + 1];
        dp[0] = 1;
        for (int num : nums) {
            for (int j = sum; j >= num; j--) {
                dp[j] += dp[j - num];
            }
        }
        return dp[sum];
    }

    public static void main(String[] args) {
        System.out.println("=== 0/1 Knapsack ===");
        int[] w = {2,3,4,5}, v = {3,4,5,6};
        System.out.println("max value (cap=5):  " + knapsack01(w, v, 5));    // 7
        System.out.println("max value (cap=8):  " + knapsack01(w, v, 8));    // 10
        System.out.println("optimised (cap=5):  " + knapsack01Opt(w, v, 5)); // 7

        System.out.println("\n=== Subset Sum ===");
        System.out.println("{1,5,11,5} sum=11: " + subsetSum(new int[]{1,5,11,5}, 11)); // true
        System.out.println("{1,2,3} sum=7:     " + subsetSum(new int[]{1,2,3}, 7));     // false

        System.out.println("\n=== Partition Equal Subset ===");
        System.out.println("{1,5,11,5}: " + canPartition(new int[]{1,5,11,5})); // true
        System.out.println("{1,2,3,5}:  " + canPartition(new int[]{1,2,3,5})); // false

        System.out.println("\n=== Target Sum ===");
        System.out.println("{1,1,1,1,1} target=3: " +
            findTargetSumWays(new int[]{1,1,1,1,1}, 3)); // 5 ways
    }
}`,
        output: `=== 0/1 Knapsack ===
max value (cap=5):  7
max value (cap=8):  10
optimised (cap=5):  7

=== Subset Sum ===
{1,5,11,5} sum=11: true
{1,2,3} sum=7:     false

=== Partition Equal Subset ===
{1,5,11,5}: true
{1,2,3,5}:  false

=== Target Sum ===
{1,1,1,1,1} target=3: 5 ways`
      }
    ],
    quiz: [
      { q: "DP vs recursion — key difference:", options: ["Same", "DP caches/stores subproblem results to avoid recomputation (memoization or tabulation)", "DP uses loops only", "Recursion is always faster"], correct: 1 },
      { q: "Memoization is:", options: ["Bottom-up DP", "Top-down DP — recursion + cache for already-solved subproblems", "Greedy algorithm", "Graph traversal"], correct: 1 },
      { q: "Tabulation is:", options: ["Top-down with cache", "Bottom-up DP — fill a table iteratively from base cases up", "Recursion without cache", "Same as memoization"], correct: 1 },
      { q: "LCS recurrence when s[i-1] == t[j-1]:", options: ["dp[i][j] = dp[i][j-1]", "dp[i][j] = dp[i-1][j-1] + 1", "dp[i][j] = dp[i-1][j] + 1", "dp[i][j] = 0"], correct: 1 },
      { q: "0/1 Knapsack inner loop goes BACKWARDS because:", options: ["Faster", "Prevents item from being used more than once (avoids overwriting needed state)", "Required by Java", "Saves memory"], correct: 1 },
      { q: "House Robber recurrence:", options: ["rob(i) = rob(i-1) + nums[i]", "rob(i) = max(rob(i-1), rob(i-2) + nums[i])", "rob(i) = rob(i-2) + nums[i]", "rob(i) = nums[i]"], correct: 1 }
    ],
    code: `public class DPReview {
    // Classic DP: unique paths in m×n grid (only right/down)
    static int uniquePaths(int m, int n) {
        int[] dp = new int[n];
        java.util.Arrays.fill(dp, 1); // first row all 1s
        for (int i = 1; i < m; i++)
            for (int j = 1; j < n; j++)
                dp[j] += dp[j-1]; // dp[j] = from above + from left
        return dp[n-1];
    }

    // Max profit: buy/sell stock once
    static int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE, maxProfit = 0;
        for (int price : prices) {
            minPrice  = Math.min(minPrice, price);
            maxProfit = Math.max(maxProfit, price - minPrice);
        }
        return maxProfit;
    }

    public static void main(String[] args) {
        System.out.println("uniquePaths(3,7): " + uniquePaths(3, 7)); // 28
        System.out.println("uniquePaths(3,3): " + uniquePaths(3, 3)); // 6
        System.out.println("maxProfit [7,1,5,3,6,4]: " +
            maxProfit(new int[]{7,1,5,3,6,4})); // 5
        System.out.println("maxProfit [7,6,4,3,1]:   " +
            maxProfit(new int[]{7,6,4,3,1}));   // 0
    }
}`,
    output: `uniquePaths(3,7): 28
uniquePaths(3,3): 6
maxProfit [7,1,5,3,6,4]: 5
maxProfit [7,6,4,3,1]:   0`
  }
}
