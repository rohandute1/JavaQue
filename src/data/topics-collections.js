export const COLLECTIONS_TOPICS = {

  "collections-intro": {
    title: "Collections Framework — Complete Guide", module: "collections", duration: "40 min", difficulty: "Intermediate", xp: 125, icon: "📦",
    intro: "A Collection in Java is an object that groups multiple elements into a single unit — like a backpack holding books. Before collections existed, programmers used plain arrays with fixed sizes and no built-in search or sort. The Java Collections Framework (JCF), introduced in Java 1.2, solves this with ready-made, well-tested data structures. Choosing the right collection is one of the most important performance decisions you will make as a Java developer.",

    sections: [
      {
        heading: "Why NOT Just Use Arrays?",
        content: "Arrays are simple but severely limited for real applications. Understanding their limitations explains exactly why the Collections Framework was created.",
        list: [
          "❌ Fixed size — int[] arr = new int[5]; — you cannot add a 6th element without creating a brand new array",
          "❌ No built-in search — you must write your own loops to find an element",
          "❌ No sorting help — you must implement sort algorithms yourself (or use Arrays.sort())",
          "❌ No key-value storage — arrays only store values, not key→value pairs like a dictionary",
          "❌ No duplicate removal — arrays cannot automatically filter out duplicates",
          "✅ Collections solve ALL of these: dynamic sizing, built-in search/sort, key-value maps, sets for uniqueness"
        ]
      },
      {
        heading: "The Java Collections Hierarchy",
        content: "The framework is organised into interfaces and classes. An interface defines WHAT operations are available. A class is the actual implementation. Map is separate — it is NOT a sub-interface of Collection but is part of the framework.",
        table: {
          headers: ["Interface", "Key Implementations", "Key Characteristic"],
          rows: [
            ["Iterable",    "—",                                        "Base of everything — can be looped with for-each"],
            ["Collection",  "—",                                        "Adds add(), remove(), size(), contains()"],
            ["List",        "ArrayList, LinkedList, Vector",            "Ordered, allows duplicates, index-based access"],
            ["Set",         "HashSet, LinkedHashSet, TreeSet",          "Unique elements only — no duplicates"],
            ["Queue",       "LinkedList, PriorityQueue, ArrayDeque",    "FIFO — First In, First Out"],
            ["Deque",       "ArrayDeque, LinkedList",                   "Double-ended queue — add/remove from both ends"],
            ["Map",         "HashMap, TreeMap, LinkedHashMap",          "Key → Value pairs (NOT a sub-interface of Collection)"]
          ]
        },
        note: "Memory Tip: Think of List as a numbered hospital queue (order matters, duplicates OK), Set as a club membership list (no duplicates), and Map as a dictionary (word → meaning)."
      },
      {
        heading: "Importing Collections",
        content: "You must import collection classes before using them. One wildcard import covers the entire framework.",
        code: `// Import the whole framework in one line (most convenient):
import java.util.*;

// Or import specific classes (better practice for large projects):
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.TreeMap;
import java.util.LinkedList;

public class ImportDemo {
    public static void main(String[] args) {
        // All collections available after import
        ArrayList<String>       list = new ArrayList<>();
        HashMap<String,Integer> map  = new HashMap<>();
        HashSet<String>         set  = new HashSet<>();

        list.add("Java"); list.add("Python"); list.add("Java"); // duplicate ok
        map.put("Alice", 25); map.put("Bob", 30);
        set.add("Java"); set.add("Python"); set.add("Java"); // duplicate ignored

        System.out.println("List (with duplicate): " + list);
        System.out.println("Map (key-value pairs) : " + map);
        System.out.println("Set (unique only)     : " + set);
    }
}`,
        output: "List (with duplicate): [Java, Python, Java]\nMap (key-value pairs) : {Alice=25, Bob=30}\nSet (unique only)     : [Java, Python]"
      },
      {
        heading: "Which Collection to Use? — Quick Decision Guide",
        content: "This is the most important question. Picking the right collection avoids performance problems and code complexity.",
        table: {
          headers: ["I need...", "Use this", "Why"],
          rows: [
            ["Ordered list, fast access by index",           "ArrayList",           "O(1) get(index), dynamic resizing"],
            ["Frequent add/remove at beginning or end",      "LinkedList/ArrayDeque","O(1) at both ends"],
            ["Key → Value lookup, no ordering needed",       "HashMap",             "O(1) average get/put"],
            ["Key → Value with keys always sorted",          "TreeMap",             "O(log n), always sorted, range queries"],
            ["Key → Value with insertion order preserved",   "LinkedHashMap",       "Sorted by insertion order"],
            ["Unique items, fast membership check",          "HashSet",             "O(1) contains, no duplicates"],
            ["Unique items, always sorted",                  "TreeSet",             "O(log n), auto-sorted"],
            ["Unique items, insertion order preserved",      "LinkedHashSet",       "No duplicates, insertion order"],
            ["LIFO (stack behaviour)",                       "ArrayDeque",          "Faster than legacy Stack class"],
            ["FIFO (queue behaviour)",                       "ArrayDeque/LinkedList","Queue interface, efficient"],
            ["Process by priority",                          "PriorityQueue",       "Min-heap, serves smallest/largest first"]
          ]
        }
      },
      {
        heading: "Time Complexity Reference — All Collections",
        content: "Understanding complexity helps you choose the right collection for performance-critical code. O(1) = constant time (instant). O(log n) = logarithmic (very fast). O(n) = linear (scales with size).",
        table: {
          headers: ["Operation", "ArrayList", "LinkedList", "HashMap", "TreeMap", "HashSet", "TreeSet"],
          rows: [
            ["add / put",  "O(1)*", "O(1)",   "O(1)",     "O(log n)", "O(1)",     "O(log n)"],
            ["get / find", "O(1)",  "O(n)",   "O(1)",     "O(log n)", "O(1)",     "O(log n)"],
            ["remove",     "O(n)",  "O(n)",   "O(1)",     "O(log n)", "O(1)",     "O(log n)"],
            ["contains",   "O(n)",  "O(n)",   "O(1)",     "O(log n)", "O(1)",     "O(log n)"],
            ["Ordered?",   "Yes",   "Yes",    "No",       "Yes(sort)", "No",      "Yes(sort)"],
            ["Duplicates?","Yes",   "Yes",    "Keys: No", "Keys: No", "No",       "No"]
          ]
        },
        note: "* ArrayList add() is O(1) amortised — occasionally O(n) when the internal array doubles in capacity."
      },
      {
        heading: "Live Comparison — List vs Set vs Map",
        content: "See how List, Set, and Map handle the same data differently. This is the clearest way to understand when to use each.",
        code: `import java.util.*;
public class CollectionsComparison {
    public static void main(String[] args) {
        // LIST — ordered, duplicates allowed
        List<String> list = new ArrayList<>(Arrays.asList("c","a","b","a"));
        System.out.println("List (preserves order+dups): " + list);  // [c, a, b, a]

        // SET — no duplicates, no guaranteed order
        Set<String> hset = new HashSet<>(list);
        System.out.println("HashSet (no dups, no order): " + hset);  // order varies

        // TREESET — no duplicates, always sorted
        Set<String> tset = new TreeSet<>(list);
        System.out.println("TreeSet (no dups, sorted)  : " + tset);  // [a, b, c]

        // MAP — key-value pairs
        Map<String,Integer> map = new LinkedHashMap<>();
        map.put("one", 1); map.put("two", 2); map.put("three", 3);
        System.out.println("LinkedHashMap (insertion order): " + map);

        // Practical: remove duplicates from list while preserving order
        List<String> dupes = Arrays.asList("Java","Python","Java","Go","Python");
        List<String> unique = new ArrayList<>(new LinkedHashSet<>(dupes));
        System.out.println("Deduplicated (order kept): " + unique);
    }
}`,
        output: "List (preserves order+dups): [c, a, b, a]\nHashSet (no dups, no order): [a, b, c]\nTreeSet (no dups, sorted)  : [a, b, c]\nLinkedHashMap (insertion order): {one=1, two=2, three=3}\nDeduplicated (order kept): [Java, Python, Go]"
      }
    ],
    quiz: [
      { q: "Which collection allows duplicate elements?", options: ["Set", "List", "Map keys", "TreeSet"], correct: 1 },
      { q: "HashMap.get() average time complexity:", options: ["O(n)", "O(log n)", "O(1)", "O(n²)"], correct: 2 },
      { q: "Which maintains insertion order with no duplicates?", options: ["HashSet", "HashMap", "LinkedHashSet", "TreeSet"], correct: 2 },
      { q: "TreeSet stores elements in:", options: ["Insertion order", "Random order", "Sorted order", "Reverse insertion order"], correct: 2 },
      { q: "Map is a sub-interface of Collection?", options: ["Yes", "No — Map is separate from Collection hierarchy", "Only LinkedHashMap", "Only in Java 8+"], correct: 1 },
      { q: "Which to use for priority-based processing?", options: ["Stack", "Queue", "PriorityQueue", "LinkedList"], correct: 2 }
    ],
    code: `import java.util.*;
public class CollectionChooser {
    public static void main(String[] args) {
        // ArrayList: ordered, allows duplicates
        List<Integer> list = new ArrayList<>(Arrays.asList(3,1,4,1,5,9,2,6));
        Collections.sort(list);
        System.out.println("Sorted list  : " + list);

        // HashSet: no duplicates, fast lookup
        Set<Integer> set = new HashSet<>(list);
        System.out.println("Unique (set) : " + new TreeSet<>(set));

        // HashMap: key-value frequency count
        Map<Integer,Integer> freq = new HashMap<>();
        for (int n : list) freq.put(n, freq.getOrDefault(n, 0) + 1);
        System.out.println("Frequency    : " + new TreeMap<>(freq));

        // LinkedHashSet: unique + insertion order
        Set<String> langs = new LinkedHashSet<>();
        langs.add("Java"); langs.add("Python"); langs.add("Java"); langs.add("Go");
        System.out.println("Unique langs : " + langs);
    }
}`,
    output: "Sorted list  : [1, 1, 2, 3, 4, 5, 6, 9]\nUnique (set) : [1, 2, 3, 4, 5, 6, 9]\nFrequency    : {1=2, 2=1, 3=1, 4=1, 5=1, 6=1, 9=1}\nUnique langs : [Java, Python, Go]"
  },

  "arraylist": {
    title: "ArrayList — Complete Guide", module: "collections", duration: "40 min", difficulty: "Intermediate", xp: 125, icon: "📋",
    intro: "ArrayList is the most commonly used collection in Java. It is a resizable array — unlike a plain array with a fixed size, ArrayList automatically grows when you add elements and shrinks when you remove them. Internally, when capacity is exceeded, it creates a new array approximately 1.5x larger and copies everything over. Key performance: O(1) random access by index, O(1) amortised append at end, O(n) insert/remove in middle.",

    sections: [
      {
        heading: "What is ArrayList and Key Properties",
        content: "ArrayList is your default choice whenever you need an ordered, index-accessible list of objects. Here are its key characteristics.",
        list: [
          "✅ Ordered — elements stay in the exact order you insert them",
          "✅ Index-based — access any element instantly by position: list.get(0), list.get(99)",
          "✅ Allows duplicates — 'Java' can appear multiple times — perfectly fine",
          "✅ Allows null — you can store null values",
          "✅ Dynamic size — grows and shrinks automatically as you add/remove",
          "❌ NOT thread-safe — use Collections.synchronizedList() for multithreading",
          "❌ Slow insert/delete in middle — O(n) because elements must shift"
        ]
      },
      {
        heading: "Creating an ArrayList — 5 Ways",
        content: "There are multiple ways to create an ArrayList depending on your starting data.",
        code: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class CreatingArrayList {
    public static void main(String[] args) {

        // 1. Empty list (most common)
        ArrayList<String> fruits = new ArrayList<>();

        // 2. With initial capacity (performance optimisation when size is known)
        ArrayList<Integer> numbers = new ArrayList<>(100);

        // 3. From another collection (copy constructor)
        ArrayList<String> copy = new ArrayList<>(fruits);

        // 4. Using List.of() — fixed size — then wrap to make mutable
        List<String> fixed   = List.of("Apple", "Banana", "Cherry");
        ArrayList<String> mutable = new ArrayList<>(fixed);

        // 5. Using Arrays.asList()
        ArrayList<String> fromArray = new ArrayList<>(Arrays.asList("Dog","Cat","Bird"));

        System.out.println("From List.of  : " + mutable);
        System.out.println("From asList   : " + fromArray);
        System.out.println("Initial size  : " + fruits.size());
    }
}`,
        output: "From List.of  : [Apple, Banana, Cherry]\nFrom asList   : [Dog, Cat, Bird]\nInitial size  : 0"
      },
      {
        heading: "All Important Methods — ADD, READ, UPDATE, DELETE",
        content: "These are the core CRUD operations on ArrayList. Memorise add, get, set, remove, size, contains, indexOf — these appear in almost every Java program.",
        code: `import java.util.*;
public class ArrayListCRUD {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();

        // ── ADD ──────────────────────────────────────
        list.add("Apple");                 // adds at end
        list.add("Banana");
        list.add("Cherry");
        list.add(1, "Blueberry");          // inserts at index 1 (shifts others right)
        System.out.println("After adds   : " + list); // [Apple, Blueberry, Banana, Cherry]

        // ── READ ─────────────────────────────────────
        System.out.println("get(0)       : " + list.get(0));           // Apple
        System.out.println("size         : " + list.size());            // 4
        System.out.println("contains     : " + list.contains("Banana"));// true
        System.out.println("indexOf      : " + list.indexOf("Cherry")); // 3
        System.out.println("isEmpty      : " + list.isEmpty());         // false

        // ── UPDATE ───────────────────────────────────
        list.set(2, "Mango");              // replaces element at index 2
        System.out.println("After set(2) : " + list); // [Apple, Blueberry, Mango, Cherry]

        // ── DELETE ───────────────────────────────────
        list.remove("Blueberry");          // remove by VALUE (first occurrence)
        list.remove(0);                    // remove by INDEX
        System.out.println("After remove : " + list); // [Mango, Cherry]

        list.clear();                      // removes ALL elements
        System.out.println("After clear  : " + list + " size=" + list.size());
    }
}`,
        output: "After adds   : [Apple, Blueberry, Banana, Cherry]\nget(0)       : Apple\nsize         : 4\ncontains     : true\nindexOf      : 3\nisEmpty      : false\nAfter set(2) : [Apple, Blueberry, Mango, Cherry]\nAfter remove : [Mango, Cherry]\nAfter clear  : [] size=0"
      },
      {
        heading: "Sorting an ArrayList",
        content: "ArrayList can be sorted in ascending, descending, or custom order using Collections.sort() or list.sort().",
        code: `import java.util.*;
public class ArrayListSorting {
    public static void main(String[] args) {

        ArrayList<String> fruits = new ArrayList<>(
            Arrays.asList("Banana","Apple","Cherry","Mango","Date"));

        // Ascending (natural order)
        Collections.sort(fruits);
        System.out.println("Ascending  : " + fruits);

        // Descending
        Collections.sort(fruits, Collections.reverseOrder());
        System.out.println("Descending : " + fruits);

        // Sort by string length (custom comparator)
        fruits.sort((a, b) -> a.length() - b.length());
        System.out.println("By length  : " + fruits);

        // Integer sorting
        ArrayList<Integer> nums = new ArrayList<>(Arrays.asList(5,2,8,1,9,3,7));
        Collections.sort(nums);
        System.out.println("Sorted nums: " + nums);

        // Find min and max
        System.out.println("Min        : " + Collections.min(nums));
        System.out.println("Max        : " + Collections.max(nums));
    }
}`,
        output: "Ascending  : [Apple, Banana, Cherry, Date, Mango]\nDescending : [Mango, Date, Cherry, Banana, Apple]\nBy length  : [Date, Apple, Mango, Banana, Cherry]\nSorted nums: [1, 2, 3, 5, 7, 8, 9]\nMin        : 1\nMax        : 9"
      },
      {
        heading: "Iterating an ArrayList — 4 Ways",
        content: "Java provides four ways to iterate. Each has a specific use case. For-each is the cleanest; Iterator is needed for safe removal; Lambda is most modern.",
        code: `import java.util.*;
public class ArrayListIteration {
    public static void main(String[] args) {

        ArrayList<String> fruits = new ArrayList<>(
            Arrays.asList("Apple","Mango","Orange","Banana","Grape"));

        // 1. Classic for loop — use when you NEED the index
        System.out.println("1. Classic for:");
        for (int i = 0; i < fruits.size(); i++) {
            System.out.println("   " + i + ": " + fruits.get(i));
        }

        // 2. Enhanced for-each — cleanest, most readable
        System.out.println("2. For-each:");
        for (String fruit : fruits) {
            System.out.println("   " + fruit);
        }

        // 3. Iterator — USE THIS when removing during iteration
        System.out.println("3. Iterator (removing 'Mango'):");
        Iterator<String> it = fruits.iterator();
        while (it.hasNext()) {
            String f = it.next();
            if (f.equals("Mango")) it.remove(); // SAFE removal!
        }
        System.out.println("   After removal: " + fruits);

        // 4. forEach with Lambda (Java 8+)
        System.out.println("4. Lambda forEach:");
        fruits.forEach(fruit -> System.out.println("   → " + fruit));
        // or even shorter with method reference:
        // fruits.forEach(System.out::println);
    }
}`,
        output: "1. Classic for:\n   0: Apple\n   1: Mango\n   2: Orange\n   3: Banana\n   4: Grape\n2. For-each:\n   Apple\n   Mango\n   Orange\n   Banana\n   Grape\n3. Iterator (removing 'Mango'):\n   After removal: [Apple, Orange, Banana, Grape]\n4. Lambda forEach:\n   → Apple\n   → Orange\n   → Banana\n   → Grape"
      },
      {
        heading: "Useful Utility Methods",
        content: "ArrayList has additional powerful utility methods for filtering, transforming, and bulk operations.",
        code: `import java.util.*;
public class ArrayListUtilities {
    public static void main(String[] args) {

        ArrayList<String> names = new ArrayList<>(
            Arrays.asList("Alice","Bob","Anna","Charlie","Amy","Dave","Andrew"));

        // removeIf — remove all elements matching a condition
        names.removeIf(name -> name.startsWith("A"));
        System.out.println("Remove A-names : " + names); // [Bob, Charlie, Dave]

        // replaceAll — transform every element
        names.replaceAll(String::toUpperCase);
        System.out.println("To uppercase   : " + names);

        // subList — get a portion of the list (view, not copy)
        ArrayList<Integer> nums = new ArrayList<>(Arrays.asList(10,20,30,40,50,60,70));
        List<Integer> middle = nums.subList(2, 5); // index 2 to 4
        System.out.println("subList(2,5)   : " + middle); // [30, 40, 50]

        // addAll — add entire collection at once
        ArrayList<String> extra = new ArrayList<>(Arrays.asList("Eve","Frank"));
        names.addAll(extra);
        System.out.println("After addAll   : " + names);

        // Collections utility methods
        ArrayList<Integer> data = new ArrayList<>(Arrays.asList(3,1,4,1,5,9,2,6));
        System.out.println("Frequency of 1 : " + Collections.frequency(data, 1));
        Collections.shuffle(data);
        System.out.println("Shuffled       : " + data);
    }
}`,
        output: "Remove A-names : [Bob, Charlie, Dave]\nTo uppercase   : [BOB, CHARLIE, DAVE]\nsubList(2,5)   : [30, 40, 50]\nAfter addAll   : [BOB, CHARLIE, DAVE, Eve, Frank]\nFrequency of 1 : 2\nShuffled       : [4, 9, 1, 6, 2, 5, 3, 1]"
      },
      {
        heading: "Real-World Example — Student Marks Manager",
        content: "A practical application combining ArrayList with sorting, searching, filtering, and statistics.",
        code: `import java.util.*;
public class StudentMarksManager {
    public static void main(String[] args) {

        ArrayList<String> names  = new ArrayList<>(
            Arrays.asList("Rohan","Priya","Aman","Neha","Ravi","Sunita"));
        ArrayList<Integer> marks = new ArrayList<>(
            Arrays.asList(88, 95, 62, 78, 55, 91));

        // Print all students
        System.out.println("=== Student Marks ===");
        for (int i = 0; i < names.size(); i++) {
            System.out.printf("%-8s : %d%n", names.get(i), marks.get(i));
        }

        // Statistics
        int sum = 0;
        int max = Collections.max(marks);
        int min = Collections.min(marks);
        for (int m : marks) sum += m;
        double avg = (double) sum / marks.size();

        System.out.printf("%nAverage : %.1f%n", avg);
        System.out.println("Highest : " + max + " (" + names.get(marks.indexOf(max)) + ")");
        System.out.println("Lowest  : " + min + " (" + names.get(marks.indexOf(min)) + ")");

        // Count pass/fail (pass >= 60)
        long passed = marks.stream().filter(m -> m >= 60).count();
        System.out.println("Passed  : " + passed + "/" + marks.size());
    }
}`,
        output: "=== Student Marks ===\nRohan    : 88\nPriya    : 95\nAman     : 62\nNeha     : 78\nRavi     : 55\nSunita   : 91\n\nAverage : 78.2\nHighest : 95 (Priya)\nLowest  : 55 (Ravi)\nPassed  : 5/6"
      }
    ],
    quiz: [
      { q: "Default initial capacity of ArrayList:", options: ["5", "10", "16", "20"], correct: 1 },
      { q: "ArrayList.get(index) time complexity:", options: ["O(n)", "O(log n)", "O(1)", "O(n²)"], correct: 2 },
      { q: "list.remove(0) does what?", options: ["Removes last element", "Removes element at index 0", "Removes the value 0", "Nothing"], correct: 1 },
      { q: "Safe way to remove elements while iterating:", options: ["list.remove() inside for-each", "Iterator.remove()", "list.clear()", "set(index, null)"], correct: 1 },
      { q: "ArrayList vs Array — key difference:", options: ["ArrayList is faster", "Array is fixed size; ArrayList is dynamically resizable", "ArrayList stores primitives", "No difference"], correct: 1 },
      { q: "What does removeIf() do?", options: ["Removes first element", "Removes element by index", "Removes all elements matching a condition", "Removes duplicates"], correct: 2 }
    ],
    code: `import java.util.*;
public class ShoppingCart {
    public static void main(String[] args) {
        ArrayList<String> cart  = new ArrayList<>();
        ArrayList<Double> prices = new ArrayList<>();

        cart.add("Laptop"); prices.add(80000.0);
        cart.add("Mouse");  prices.add(1500.0);
        cart.add("Keyboard"); prices.add(3000.0);
        cart.add("Monitor"); prices.add(25000.0);

        System.out.println("=== Shopping Cart ===");
        double total = 0;
        for (int i = 0; i < cart.size(); i++) {
            System.out.printf("%-12s : ₹%.0f%n", cart.get(i), prices.get(i));
            total += prices.get(i);
        }
        System.out.println("---------------------");
        System.out.printf("Total        : ₹%.0f%n", total);
        System.out.printf("With GST(18%%): ₹%.0f%n", total * 1.18);
        System.out.println("Items        : " + cart.size());
    }
}`,
    output: "=== Shopping Cart ===\nLaptop       : ₹80000\nMouse        : ₹1500\nKeyboard     : ₹3000\nMonitor      : ₹25000\n---------------------\nTotal        : ₹109500\nWith GST(18%): ₹129210\nItems        : 4"
  },

  "linkedlist": {
    title: "LinkedList — Complete Guide", module: "collections", duration: "40 min", difficulty: "Intermediate", xp: 125, icon: "🔗",
    intro: "A LinkedList stores elements in nodes. Each node holds a value AND a reference to the next node — and in Java's doubly-linked implementation, also to the previous node. Imagine a chain of paper clips: each clip is a node linked to the one before and after it. Adding or removing at either end is very fast (O(1)), but finding the 50th element requires traversing from the start (O(n)). LinkedList implements both List and Deque — making it usable as a list, queue, stack, or double-ended queue.",

    sections: [
      {
        heading: "LinkedList vs ArrayList — When to Use Which",
        content: "Understanding this comparison is essential. Most of the time ArrayList is better — but LinkedList wins for specific use cases.",
        table: {
          headers: ["Operation", "ArrayList", "LinkedList", "Winner"],
          rows: [
            ["get(index)",          "O(1) — instant",          "O(n) — traverse from start",  "ArrayList ✓"],
            ["add at END",          "O(1) amortised",          "O(1) — just link a new node",  "Tie"],
            ["add at BEGINNING",    "O(n) — shifts all right", "O(1) — just update head",      "LinkedList ✓"],
            ["add in MIDDLE",       "O(n) — shifts right",     "O(n) — traverse + relink",     "Tie"],
            ["remove from END",     "O(1)",                    "O(1)",                          "Tie"],
            ["remove from START",   "O(n) — shifts left",      "O(1) — update head",           "LinkedList ✓"],
            ["Memory usage",        "Less (just values)",      "More (value + 2 pointers/node)","ArrayList ✓"],
            ["Best for",            "Random access, read-heavy","Frequent insert/delete at ends","Depends"]
          ]
        }
      },
      {
        heading: "Creating LinkedList and Basic Operations",
        content: "LinkedList works just like ArrayList for basic List operations — same add(), get(), remove(), size() methods.",
        code: `import java.util.LinkedList;
import java.util.Arrays;

public class LinkedListBasics {
    public static void main(String[] args) {

        LinkedList<String> ll = new LinkedList<>();

        // Basic List operations — same as ArrayList
        ll.add("B");
        ll.add("C");
        ll.add("D");
        ll.add(0, "A");            // insert at index 0
        System.out.println("List   : " + ll);      // [A, B, C, D]

        System.out.println("get(1) : " + ll.get(1)); // B
        System.out.println("size   : " + ll.size());  // 4

        ll.set(2, "X");            // replace index 2
        System.out.println("After set(2,X): " + ll);  // [A, B, X, D]

        ll.remove(1);              // remove by index
        System.out.println("After remove(1): " + ll); // [A, X, D]

        ll.remove("X");            // remove by value
        System.out.println("After remove(X): " + ll); // [A, D]
    }
}`,
        output: "List   : [A, B, C, D]\nget(1) : B\nsize   : 4\nAfter set(2,X): [A, B, X, D]\nAfter remove(1): [A, X, D]\nAfter remove(X): [A, D]"
      },
      {
        heading: "Deque Operations — Unique to LinkedList",
        content: "LinkedList's most powerful feature is Deque (double-ended queue) operations — methods to add/remove/peek from BOTH the front and back efficiently.",
        code: `import java.util.LinkedList;

public class LinkedListDeque {
    public static void main(String[] args) {

        LinkedList<String> ll = new LinkedList<>();

        // ── Deque operations ─────────────────────────
        ll.addFirst("FIRST");      // add at beginning
        ll.addLast("LAST");        // add at end
        ll.add("MIDDLE");          // add at end (same as addLast)
        System.out.println("After add ops   : " + ll);

        System.out.println("getFirst()      : " + ll.getFirst());  // peek front
        System.out.println("getLast()       : " + ll.getLast());   // peek back

        ll.removeFirst();          // remove from front
        System.out.println("After removeFirst: " + ll);

        ll.removeLast();           // remove from back
        System.out.println("After removeLast : " + ll);

        // ── Queue style (FIFO) ───────────────────────
        LinkedList<String> queue = new LinkedList<>();
        queue.offer("Task1");      // add to tail (safe — returns false if full)
        queue.offer("Task2");
        queue.offer("Task3");
        System.out.println("Queue peek()    : " + queue.peek());   // view head, no removal
        System.out.println("Queue poll()    : " + queue.poll());   // remove from head
        System.out.println("Queue after poll: " + queue);

        // ── Stack style (LIFO) ───────────────────────
        LinkedList<String> stack = new LinkedList<>();
        stack.push("Page1");       // add to front
        stack.push("Page2");
        stack.push("Page3");       // top
        System.out.println("Stack pop()     : " + stack.pop());    // remove from front
        System.out.println("Stack peek()    : " + stack.peek());   // view top
    }
}`,
        output: "After add ops   : [FIRST, LAST, MIDDLE]\ngetFirst()      : FIRST\ngetLast()       : MIDDLE\nAfter removeFirst: [LAST, MIDDLE]\nAfter removeLast : [LAST]\nQueue peek()    : Task1\nQueue poll()    : Task1\nQueue after poll: [Task2, Task3]\nStack pop()     : Page3\nStack peek()    : Page2"
      },
      {
        heading: "Real-World Example — Browser History Simulation",
        content: "Browser history is a classic LinkedList use case — it works as a stack where each new page is pushed and the Back button pops the most recent page.",
        code: `import java.util.LinkedList;

public class BrowserHistory {
    public static void main(String[] args) {

        LinkedList<String> history = new LinkedList<>();

        // User visits pages — push each to front (stack behaviour)
        history.push("www.google.com");
        history.push("www.youtube.com");
        history.push("www.github.com");
        history.push("www.stackoverflow.com"); // current page

        System.out.println("Current page  : " + history.peek());
        System.out.println("Full history  : " + history);

        // User presses Back button 2 times
        System.out.println("\\n--- Pressing Back ---");
        history.pop(); // stackoverflow → gone
        System.out.println("After back 1  : " + history.peek());

        history.pop(); // github → gone
        System.out.println("After back 2  : " + history.peek());

        // Full remaining history
        System.out.println("\\nRemaining history:");
        for (String page : history) {
            System.out.println("  → " + page);
        }

        System.out.println("Pages in history: " + history.size());
    }
}`,
        output: "Current page  : www.stackoverflow.com\nFull history  : [www.stackoverflow.com, www.github.com, www.youtube.com, www.google.com]\n\n--- Pressing Back ---\nAfter back 1  : www.github.com\nAfter back 2  : www.youtube.com\n\nRemaining history:\n  → www.youtube.com\n  → www.google.com\nPages in history: 2"
      },
      {
        heading: "LinkedList Methods — Complete Reference",
        content: "All the methods you need to know — organised by category.",
        table: {
          headers: ["Category", "Method", "What it does"],
          rows: [
            ["Add",    "add(e) / addLast(e)",  "Add to end"],
            ["Add",    "addFirst(e)",           "Add to beginning"],
            ["Add",    "add(i, e)",             "Add at index i"],
            ["Add",    "offer(e)",              "Add to tail (Queue style, returns boolean)"],
            ["Add",    "push(e)",               "Add to front (Stack style)"],
            ["Read",   "get(i)",                "Get element at index i"],
            ["Read",   "getFirst() / peekFirst()", "View front element"],
            ["Read",   "getLast() / peekLast()",   "View back element"],
            ["Read",   "peek()",                "View head (returns null if empty)"],
            ["Remove", "remove(i)",             "Remove at index i"],
            ["Remove", "remove(obj)",           "Remove first occurrence of obj"],
            ["Remove", "removeFirst() / poll()","Remove from front"],
            ["Remove", "removeLast()",          "Remove from back"],
            ["Remove", "pop()",                 "Remove from front (Stack style)"]
          ]
        }
      }
    ],
    quiz: [
      { q: "LinkedList get(index) time complexity:", options: ["O(1)", "O(log n)", "O(n) — must traverse", "O(n²)"], correct: 2 },
      { q: "LinkedList addFirst() time complexity:", options: ["O(n)", "O(log n)", "O(1) — just update head pointer", "O(n²)"], correct: 2 },
      { q: "Which interfaces does LinkedList implement?", options: ["Only List", "Only Queue", "List AND Deque", "Only Deque"], correct: 2 },
      { q: "LinkedList vs ArrayList — memory usage:", options: ["Same", "LinkedList uses less", "LinkedList uses more (stores 2 pointers per node)", "ArrayList uses more"], correct: 2 },
      { q: "push() adds element to:", options: ["End of list", "Middle of list", "Front of list", "Sorted position"], correct: 2 },
      { q: "poll() returns null when:", options: ["List has one element", "List is empty", "List is full", "Never"], correct: 1 }
    ],
    code: `import java.util.*;
public class TaskScheduler {
    public static void main(String[] args) {
        // LinkedList as a Task Queue (FIFO)
        LinkedList<String> taskQueue = new LinkedList<>();
        taskQueue.offer("Send email report");
        taskQueue.offer("Update database");
        taskQueue.offer("Generate invoice");
        taskQueue.offer("Send SMS notification");

        System.out.println("=== Task Queue ===");
        System.out.println("Pending tasks : " + taskQueue.size());
        System.out.println("Next up       : " + taskQueue.peek());

        System.out.println("\\n--- Processing tasks ---");
        while (!taskQueue.isEmpty()) {
            String task = taskQueue.poll();
            System.out.println("✓ Done: " + task);
        }
        System.out.println("All tasks complete! Queue size: " + taskQueue.size());
    }
}`,
    output: "=== Task Queue ===\nPending tasks : 4\nNext up       : Send email report\n\n--- Processing tasks ---\n✓ Done: Send email report\n✓ Done: Update database\n✓ Done: Generate invoice\n✓ Done: Send SMS notification\nAll tasks complete! Queue size: 0"
  },

  "hashmap": {
    title: "HashMap — Complete Guide", module: "collections", duration: "40 min", difficulty: "Intermediate", xp: 150, icon: "🗺️",
    intro: "A HashMap stores data as Key → Value pairs. It is like a real dictionary — you look up a word (key) and instantly get its definition (value). HashMap uses a technique called hashing to find any value in O(1) — essentially instant — time regardless of how many entries exist. It does NOT maintain any insertion order. Keys must be unique; values can repeat.",

    sections: [
      {
        heading: "How Hashing Works — Simply Explained",
        content: "Understanding hashing explains why HashMap is so fast. The internal mechanism is elegant.",
        list: [
          "1️⃣ You call map.put('name', 'Alice')",
          "2️⃣ Java calls hashCode() on the key 'name' → produces an integer like 3373707",
          "3️⃣ That integer is mapped to a 'bucket' (slot in an internal array)",
          "4️⃣ The value 'Alice' is stored in that bucket",
          "5️⃣ When you call map.get('name'), Java computes the same hash, goes directly to that bucket, retrieves 'Alice' — no searching needed!",
          "⚠️ Hash Collision: two different keys can produce the same hash. Java handles this by chaining multiple entries in the same bucket. In Java 8+, if a bucket has >8 entries, it converts to a balanced tree for O(log n) lookup",
          "📌 Load Factor: default 0.75 — when 75% full, HashMap resizes to double capacity and rehashes everything"
        ]
      },
      {
        heading: "Creating HashMap and All Key Operations",
        content: "All the essential HashMap operations — put, get, remove, check, and iterate.",
        code: `import java.util.HashMap;
import java.util.Map;

public class HashMapOperations {
    public static void main(String[] args) {

        HashMap<String, Integer> ages = new HashMap<>();

        // ── PUT (add / update) ───────────────────────
        ages.put("Alice",   30);
        ages.put("Bob",     25);
        ages.put("Charlie", 35);
        ages.put("Alice",   31); // updates Alice — key already exists!
        System.out.println("After puts     : " + ages);

        // ── GET ──────────────────────────────────────
        int aliceAge  = ages.get("Alice");              // 31
        Integer dave  = ages.get("Dave");               // null — key not found
        int safe      = ages.getOrDefault("Dave", 0);  // 0 — safe default
        System.out.println("Alice age      : " + aliceAge);
        System.out.println("Dave (missing) : " + dave);
        System.out.println("Dave (default) : " + safe);

        // ── CHECK ────────────────────────────────────
        System.out.println("Has key Alice  : " + ages.containsKey("Alice"));    // true
        System.out.println("Has value 100  : " + ages.containsValue(100));     // false
        System.out.println("Map size       : " + ages.size());                  // 3
        System.out.println("Is empty       : " + ages.isEmpty());               // false

        // ── REMOVE ───────────────────────────────────
        ages.remove("Charlie");
        System.out.println("After remove   : " + ages);

        // ── UPDATE without overwrite (putIfAbsent) ───
        ages.putIfAbsent("Bob",   99); // Bob exists — NOT updated
        ages.putIfAbsent("Diana", 28); // Diana new — inserted
        System.out.println("After putIfAbsent: " + ages);
    }
}`,
        output: "After puts     : {Alice=31, Bob=25, Charlie=35}\nAlice age      : 31\nDave (missing) : null\nDave (default) : 0\nHas key Alice  : true\nHas value 100  : false\nMap size       : 3\nIs empty       : false\nAfter remove   : {Alice=31, Bob=25}\nAfter putIfAbsent: {Alice=31, Bob=25, Diana=28}"
      },
      {
        heading: "Iterating a HashMap — 3 Ways",
        content: "HashMap can be iterated over entries (key+value), keys only, or values only.",
        code: `import java.util.*;
public class HashMapIteration {
    public static void main(String[] args) {

        HashMap<String, Integer> scores = new HashMap<>();
        scores.put("Rohan",  88);
        scores.put("Priya",  95);
        scores.put("Aman",   72);
        scores.put("Neha",   81);

        // 1. Iterate entries (key + value) — most common
        System.out.println("1. Entry iteration:");
        for (Map.Entry<String, Integer> entry : scores.entrySet()) {
            System.out.printf("   %-8s → %d%n", entry.getKey(), entry.getValue());
        }

        // 2. Keys only
        System.out.println("2. Keys only:");
        for (String name : scores.keySet()) {
            System.out.println("   " + name);
        }

        // 3. Values only
        System.out.println("3. Values only:");
        for (int score : scores.values()) {
            System.out.println("   " + score);
        }

        // 4. Lambda forEach (Java 8+) — cleanest
        System.out.println("4. Lambda forEach:");
        scores.forEach((name, score) ->
            System.out.printf("   %s scored %d%n", name, score));
    }
}`,
        output: "1. Entry iteration:\n   Rohan    → 88\n   Priya    → 95\n   Aman     → 72\n   Neha     → 81\n2. Keys only:\n   Rohan\n   Priya\n   Aman\n   Neha\n3. Values only:\n   88\n   95\n   72\n   81\n4. Lambda forEach:\n   Rohan scored 88\n   Priya scored 95\n   Aman scored 72\n   Neha scored 81"
      },
      {
        heading: "Real-World Example — Word Frequency Counter",
        content: "HashMap is perfect for counting occurrences. This is one of the most commonly asked interview problems.",
        code: `import java.util.*;
public class WordFrequency {
    public static void main(String[] args) {

        String sentence = "to be or not to be that is the question to be";
        String[] words  = sentence.split(" ");

        HashMap<String, Integer> freq = new HashMap<>();

        // Count frequency of each word
        for (String word : words) {
            // getOrDefault: if word not in map, start at 0, then add 1
            freq.put(word, freq.getOrDefault(word, 0) + 1);
        }

        System.out.println("Word frequencies: " + freq);
        System.out.println("'to' appears    : " + freq.get("to") + " times");
        System.out.println("'be' appears    : " + freq.get("be") + " times");

        // Find the most frequent word
        String mostFrequent = "";
        int maxCount = 0;
        for (Map.Entry<String, Integer> entry : freq.entrySet()) {
            if (entry.getValue() > maxCount) {
                maxCount     = entry.getValue();
                mostFrequent = entry.getKey();
            }
        }
        System.out.println("Most frequent   : '" + mostFrequent + "' (" + maxCount + " times)");

        // Words appearing only once
        System.out.print("Unique words    : ");
        freq.forEach((word, count) -> {
            if (count == 1) System.out.print(word + " ");
        });
        System.out.println();
    }
}`,
        output: "Word frequencies: {question=1, the=1, or=1, not=1, is=1, be=3, that=1, to=3}\n'to' appears    : 3 times\n'be' appears    : 3 times\nMost frequent   : 'be' (3 times)\nUnique words    : question the or not is that "
      },
      {
        heading: "HashMap Key Rules — Critical to Know",
        content: "These rules govern how HashMap behaves and are frequently tested in interviews.",
        list: [
          "📌 Keys MUST be UNIQUE — putting the same key again REPLACES the old value (no error!)",
          "📌 Values CAN be duplicated — multiple keys can map to the same value",
          "📌 ONE key can be null — map.put(null, 'value') is legal",
          "📌 Many values can be null — map.put('key', null) is legal",
          "📌 HashMap is NOT ordered — iteration order is unpredictable",
          "📌 Use LinkedHashMap for insertion-order iteration",
          "📌 Use TreeMap for sorted-key iteration",
          "📌 HashMap is NOT thread-safe — use ConcurrentHashMap in multithreaded code",
          "⚠️ HashMap vs Hashtable: Hashtable is synchronized (slow, legacy), does not allow null keys. HashMap is modern, faster, allows one null key"
        ]
      }
    ],
    quiz: [
      { q: "HashMap.put() with an existing key:", options: ["Throws exception", "Creates a duplicate", "Replaces the old value", "Is ignored"], correct: 2 },
      { q: "HashMap.get() for a missing key returns:", options: ["0", "Exception", "null", "-1"], correct: 2 },
      { q: "HashMap maintains insertion order?", options: ["Yes", "No — use LinkedHashMap for that", "Only with String keys", "Yes in Java 8+"], correct: 1 },
      { q: "HashMap is thread-safe?", options: ["Yes", "No — use ConcurrentHashMap", "Only for reads", "Only in Java 11+"], correct: 1 },
      { q: "What does getOrDefault(key, 0) do?", options: ["Always returns 0", "Returns value if key exists, else returns 0", "Sets value to 0", "Removes the key"], correct: 1 },
      { q: "How many null keys can HashMap have?", options: ["Zero", "One", "Many", "Unlimited"], correct: 1 }
    ],
    code: `import java.util.*;
public class PhoneBook {
    public static void main(String[] args) {
        HashMap<String, String> phonebook = new HashMap<>();
        phonebook.put("Rohan",  "9876543210");
        phonebook.put("Priya",  "8765432109");
        phonebook.put("Aman",   "7654321098");
        phonebook.put("Neha",   "6543210987");

        // Look up a contact
        String name = "Priya";
        System.out.println("Looking up: " + name);
        System.out.println("Number    : " + phonebook.getOrDefault(name, "Not found"));

        // Update a number
        phonebook.put("Rohan", "9999999999");
        System.out.println("Updated Rohan: " + phonebook.get("Rohan"));

        // List all contacts
        System.out.println("\\n=== All Contacts ===");
        new TreeMap<>(phonebook).forEach((n, p) ->
            System.out.printf("%-8s : %s%n", n, p));
        System.out.println("Total contacts: " + phonebook.size());
    }
}`,
    output: "Looking up: Priya\nNumber    : 8765432109\nUpdated Rohan: 9999999999\n\n=== All Contacts ===\nAman     : 7654321098\nNeha     : 6543210987\nPriya    : 8765432109\nRohan    : 9999999999\nTotal contacts: 4"
  },

  "treemap": {
    title: "TreeMap & TreeSet — Complete Guide", module: "collections", duration: "35 min", difficulty: "Intermediate", xp: 150, icon: "🌳",
    intro: "A TreeMap is like a HashMap but always keeps its keys sorted in natural order (or custom order you define). Internally it uses a Red-Black Tree — a self-balancing binary search tree. Operations like get/put are O(log n) instead of O(1), but you get powerful navigation methods and sorted iteration for free. TreeSet is the Set counterpart — stores unique elements in always-sorted order.",

    sections: [
      {
        heading: "TreeMap — Sorted Key-Value Storage",
        content: "TreeMap keeps all keys sorted automatically. Every time you add a new entry, TreeMap places it in the correct sorted position.",
        code: `import java.util.TreeMap;
import java.util.Map;

public class TreeMapBasics {
    public static void main(String[] args) {

        TreeMap<String, Integer> scores = new TreeMap<>();
        scores.put("Charlie", 85);
        scores.put("Alice",   92);
        scores.put("Bob",     78);
        scores.put("Diana",   95);
        scores.put("Eve",     88);

        // Always gives ALPHABETICAL order — even though we inserted in random order
        System.out.println("All scores (sorted):");
        for (Map.Entry<String, Integer> e : scores.entrySet()) {
            System.out.printf("  %-10s : %d%n", e.getKey(), e.getValue());
        }

        // Basic operations — same as HashMap
        System.out.println("\\nAlice's score  : " + scores.get("Alice"));
        System.out.println("Has Frank      : " + scores.containsKey("Frank"));
        System.out.println("Map size       : " + scores.size());

        scores.put("Alice", 95); // update existing
        System.out.println("Alice updated  : " + scores.get("Alice"));

        scores.remove("Bob");
        System.out.println("After removing Bob: " + scores.keySet());
    }
}`,
        output: "All scores (sorted):\n  Alice      : 92\n  Bob        : 78\n  Charlie    : 85\n  Diana      : 95\n  Eve        : 88\n\nAlice's score  : 92\nHas Frank      : false\nMap size       : 5\nAlice updated  : 95\nAfter removing Bob: [Alice, Charlie, Diana, Eve]"
      },
      {
        heading: "Navigation Methods — Unique to TreeMap",
        content: "TreeMap's most powerful feature is navigation — finding nearest keys, getting ranges, and sub-views. These are unavailable in HashMap.",
        code: `import java.util.*;
public class TreeMapNavigation {
    public static void main(String[] args) {

        TreeMap<String, Integer> students = new TreeMap<>();
        students.put("Alice",   92);
        students.put("Bob",     78);
        students.put("Charlie", 85);
        students.put("Diana",   95);
        students.put("Eve",     88);
        students.put("Frank",   72);

        // First and last
        System.out.println("First key      : " + students.firstKey());  // Alice
        System.out.println("Last key       : " + students.lastKey());   // Frank
        System.out.println("First entry    : " + students.firstEntry()); // Alice=92
        System.out.println("Last entry     : " + students.lastEntry());  // Frank=72

        // Navigation — find nearest keys
        System.out.println("\\nfloorKey('C')  : " + students.floorKey("C")); // Charlie (<=C)
        System.out.println("ceilingKey('C'): " + students.ceilingKey("C")); // Charlie (>=C)
        System.out.println("lowerKey('C')  : " + students.lowerKey("C"));   // Bob (strictly < C)
        System.out.println("higherKey('C') : " + students.higherKey("C"));  // Diana (strictly > C)

        // Range views — sub-maps
        System.out.println("\\nsubMap(Bob, Eve) — from Bob up to (not including) Eve:");
        students.subMap("Bob", "Eve").forEach((k,v) ->
            System.out.println("  " + k + "=" + v));

        System.out.println("headMap(Charlie) — all keys before Charlie:");
        students.headMap("Charlie").forEach((k,v) ->
            System.out.println("  " + k + "=" + v));

        System.out.println("tailMap(Diana) — Diana and all after:");
        students.tailMap("Diana").forEach((k,v) ->
            System.out.println("  " + k + "=" + v));
    }
}`,
        output: "First key      : Alice\nLast key       : Frank\nFirst entry    : Alice=92\nLast entry     : Frank=72\n\nfloorKey('C')  : Charlie\nceilingKey('C'): Charlie\nlowerKey('C')  : Bob\nhigherKey('C') : Diana\n\nsubMap(Bob, Eve) — from Bob up to (not including) Eve:\n  Bob=78\n  Charlie=85\n  Diana=95\nheadMap(Charlie) — all keys before Charlie:\n  Alice=92\n  Bob=78\ntailMap(Diana) — Diana and all after:\n  Diana=95\n  Eve=88\n  Frank=72"
      },
      {
        heading: "Custom Sort Order with Comparator",
        content: "By default TreeMap sorts in natural order (A-Z, 0-9). You can provide a Comparator to sort in any custom order.",
        code: `import java.util.*;
public class TreeMapCustomSort {
    public static void main(String[] args) {

        // Sort integers in REVERSE order (largest first)
        TreeMap<Integer, String> reverseMap = new TreeMap<>(Collections.reverseOrder());
        reverseMap.put(3, "Three");
        reverseMap.put(1, "One");
        reverseMap.put(5, "Five");
        reverseMap.put(2, "Two");
        reverseMap.put(4, "Four");
        System.out.println("Reverse order  : " + reverseMap); // {5,4,3,2,1}

        // Sort strings by LENGTH (shortest first)
        TreeMap<String, Integer> byLength = new TreeMap<>(
            Comparator.comparingInt(String::length).thenComparing(Comparator.naturalOrder())
        );
        byLength.put("Banana",   3);
        byLength.put("Apple",    1);
        byLength.put("Fig",      2);
        byLength.put("Cherry",   4);
        byLength.put("Date",     5);
        System.out.println("By length      : " + byLength.keySet());

        // Descending map view
        TreeMap<String, Integer> scores = new TreeMap<>();
        scores.put("Alice", 92); scores.put("Bob", 78);
        scores.put("Charlie", 85); scores.put("Diana", 95);
        System.out.println("Ascending      : " + scores.keySet());
        System.out.println("Descending view: " + scores.descendingKeySet());
    }
}`,
        output: "Reverse order  : {5=Five, 4=Four, 3=Three, 2=Two, 1=One}\nBy length      : [Fig, Date, Apple, Banana, Cherry]\nAscending      : [Alice, Bob, Charlie, Diana]\nDescending view: [Diana, Charlie, Bob, Alice]"
      },
      {
        heading: "HashMap vs TreeMap — When to Use Which",
        content: "Both store key-value pairs but with very different performance and ordering characteristics.",
        table: {
          headers: ["Feature", "HashMap", "TreeMap"],
          rows: [
            ["Ordering",        "No order (random iteration)",    "Always sorted by key"],
            ["get/put speed",   "O(1) — instant",                 "O(log n) — fast but not instant"],
            ["null keys",       "One null key allowed",           "No null keys (can't compare null)"],
            ["Range queries",   "Not supported",                  "subMap, headMap, tailMap, floor, ceiling"],
            ["Best for",        "Pure key-value lookup by key",   "Sorted data, range queries, ordered iteration"],
            ["Memory",          "Less",                           "More (tree node overhead)"],
            ["Thread safety",   "Not thread-safe",                "Not thread-safe"]
          ]
        }
      }
    ],
    quiz: [
      { q: "TreeMap keeps keys in what order?", options: ["Insertion order", "Random order", "Sorted (natural or custom) order", "Reverse insertion order"], correct: 2 },
      { q: "TreeMap get/put time complexity:", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], correct: 2 },
      { q: "Which method finds the greatest key ≤ a given key?", options: ["ceilingKey()", "floorKey()", "lowerKey()", "higherKey()"], correct: 1 },
      { q: "TreeMap allows null keys?", options: ["Yes, one null", "Yes, many nulls", "No — throws NullPointerException", "Only if Comparator handles it"], correct: 2 },
      { q: "When to prefer TreeMap over HashMap?", options: ["When speed is critical", "When you need sorted keys or range queries", "When storing large data", "Always"], correct: 1 },
      { q: "subMap('A','D') includes key 'D'?", options: ["Yes", "No — upper bound is exclusive", "Only if D exists", "Depends on Comparator"], correct: 1 }
    ],
    code: `import java.util.*;
public class StudentLeaderboard {
    public static void main(String[] args) {
        // TreeMap: student name → score, sorted alphabetically
        TreeMap<String, Integer> board = new TreeMap<>();
        board.put("Rohan",  88);  board.put("Priya",  95);
        board.put("Aman",   72);  board.put("Neha",   81);
        board.put("Karan",  91);  board.put("Sunita", 77);

        System.out.println("=== Leaderboard (A-Z) ===");
        board.forEach((name, score) ->
            System.out.printf("%-8s : %d%s%n", name, score, score>=90 ? " ⭐" : ""));

        System.out.println("\\nFirst in list  : " + board.firstKey());
        System.out.println("Last in list   : " + board.lastKey());
        System.out.println("Names K-R      : " + board.subMap("K","S").keySet());
        System.out.println("Top scorers(>=90): " +
            board.entrySet().stream()
                 .filter(e -> e.getValue() >= 90)
                 .map(Map.Entry::getKey)
                 .toList());
    }
}`,
    output: "=== Leaderboard (A-Z) ===\nAman     : 72\nKaran    : 91 ⭐\nNeha     : 81\nPriya    : 95 ⭐\nRohan    : 88\nSunita   : 77\n\nFirst in list  : Aman\nLast in list   : Sunita\nNames K-R      : [Karan, Neha, Priya, Rohan]\nTop scorers(>=90): [Karan, Priya]"
  },

  "hashset": {
    title: "HashSet & Sets — Complete Guide", module: "collections", duration: "35 min", difficulty: "Intermediate", xp: 125, icon: "🔵",
    intro: "A HashSet stores unique elements only — no duplicates allowed. It is backed internally by a HashMap (elements are stored as map keys with a dummy value). This gives O(1) add/remove/contains operations. HashSet is perfect for membership testing and eliminating duplicates. There are three Set implementations: HashSet (fastest, no order), LinkedHashSet (insertion order), TreeSet (always sorted).",

    sections: [
      {
        heading: "HashSet Basics — No Duplicates",
        content: "The defining feature of HashSet is automatic duplicate rejection. Adding an element that already exists is silently ignored — no error, no exception.",
        code: `import java.util.HashSet;
import java.util.Set;
import java.util.Arrays;
import java.util.List;

public class HashSetBasics {
    public static void main(String[] args) {

        HashSet<String> languages = new HashSet<>();

        // ADD — duplicates silently ignored
        languages.add("Java");
        languages.add("Python");
        languages.add("JavaScript");
        languages.add("Java");        // DUPLICATE — silently ignored
        languages.add("Go");
        languages.add("Python");      // DUPLICATE — silently ignored

        System.out.println("Set       : " + languages);
        System.out.println("Size      : " + languages.size()); // 4, not 6

        // CHECK
        System.out.println("Has Java  : " + languages.contains("Java"));   // true
        System.out.println("Has Ruby  : " + languages.contains("Ruby"));   // false

        // REMOVE
        languages.remove("Go");
        System.out.println("After remove Go: " + languages);

        // REMOVE DUPLICATES FROM LIST — most common use case!
        List<Integer> withDups = Arrays.asList(1, 2, 2, 3, 3, 3, 4, 5, 5);
        Set<Integer> unique = new HashSet<>(withDups);
        System.out.println("Original  : " + withDups);
        System.out.println("Unique    : " + unique);
        System.out.println("Removed   : " + (withDups.size() - unique.size()) + " duplicates");
    }
}`,
        output: "Set       : [Java, Python, JavaScript, Go]\nSize      : 4\nHas Java  : true\nHas Ruby  : false\nAfter remove Go: [Java, Python, JavaScript]\nOriginal  : [1, 2, 2, 3, 3, 3, 4, 5, 5]\nUnique    : [1, 2, 3, 4, 5]\nRemoved   : 4 duplicates"
      },
      {
        heading: "Set Operations — Union, Intersection, Difference",
        content: "Mathematical set operations are directly available through HashSet methods. These are powerful for data analysis and filtering.",
        code: `import java.util.*;
public class SetOperations {
    public static void main(String[] args) {

        Set<Integer> setA = new HashSet<>(Arrays.asList(1, 2, 3, 4, 5));
        Set<Integer> setB = new HashSet<>(Arrays.asList(4, 5, 6, 7, 8));

        System.out.println("Set A : " + new TreeSet<>(setA)); // sorted for display
        System.out.println("Set B : " + new TreeSet<>(setB));

        // UNION — all elements from both sets (addAll)
        Set<Integer> union = new HashSet<>(setA);
        union.addAll(setB);
        System.out.println("Union          : " + new TreeSet<>(union));    // [1,2,3,4,5,6,7,8]

        // INTERSECTION — elements in BOTH sets (retainAll)
        Set<Integer> intersection = new HashSet<>(setA);
        intersection.retainAll(setB);
        System.out.println("Intersection   : " + new TreeSet<>(intersection)); // [4,5]

        // DIFFERENCE A-B — in A but NOT in B (removeAll)
        Set<Integer> diffAB = new HashSet<>(setA);
        diffAB.removeAll(setB);
        System.out.println("Difference A-B : " + new TreeSet<>(diffAB));   // [1,2,3]

        // DIFFERENCE B-A
        Set<Integer> diffBA = new HashSet<>(setB);
        diffBA.removeAll(setA);
        System.out.println("Difference B-A : " + new TreeSet<>(diffBA));   // [6,7,8]

        // SYMMETRIC DIFFERENCE — in either but NOT both
        Set<Integer> symDiff = new HashSet<>(union);
        symDiff.removeAll(intersection);
        System.out.println("Symmetric Diff : " + new TreeSet<>(symDiff));  // [1,2,3,6,7,8]

        // Real use: common students in two classes
        Set<String> classA = new HashSet<>(Arrays.asList("Alice","Bob","Charlie","Dave"));
        Set<String> classB = new HashSet<>(Arrays.asList("Bob","Dave","Eve","Frank"));
        Set<String> bothClasses = new HashSet<>(classA);
        bothClasses.retainAll(classB);
        System.out.println("In both classes: " + bothClasses);
    }
}`,
        output: "Set A : [1, 2, 3, 4, 5]\nSet B : [4, 5, 6, 7, 8]\nUnion          : [1, 2, 3, 4, 5, 6, 7, 8]\nIntersection   : [4, 5]\nDifference A-B : [1, 2, 3]\nDifference B-A : [6, 7, 8]\nSymmetric Diff : [1, 2, 3, 6, 7, 8]\nIn both classes: [Bob, Dave]"
      },
      {
        heading: "Three Set Implementations — Comparison",
        content: "Java provides three Set implementations. Each has different ordering and performance characteristics.",
        table: {
          headers: ["Feature", "HashSet", "LinkedHashSet", "TreeSet"],
          rows: [
            ["Order",          "No guaranteed order",  "Insertion order preserved",  "Always sorted (natural/custom)"],
            ["Performance",    "O(1) — fastest",       "O(1) — slightly slower",     "O(log n) — slowest"],
            ["Null allowed",   "Yes, one null",        "Yes, one null",               "No (can't compare null)"],
            ["Memory",         "Least",                "More (linked nodes)",         "More (tree nodes)"],
            ["Best for",       "Fast membership check","Ordered unique items",        "Sorted unique items, range queries"],
            ["Backed by",      "HashMap",              "LinkedHashMap",               "Red-Black Tree"]
          ]
        },
        code: `import java.util.*;
public class SetVariants {
    public static void main(String[] args) {

        List<String> data = Arrays.asList("Banana","Apple","Cherry","Apple","Banana","Date");
        System.out.println("Original list  : " + data);

        // HashSet — no order, no duplicates
        Set<String> hash = new HashSet<>(data);
        System.out.println("HashSet        : " + hash); // order random

        // LinkedHashSet — insertion order, no duplicates
        Set<String> linked = new LinkedHashSet<>(data);
        System.out.println("LinkedHashSet  : " + linked); // [Banana, Apple, Cherry, Date]

        // TreeSet — sorted, no duplicates
        Set<String> tree = new TreeSet<>(data);
        System.out.println("TreeSet        : " + tree); // [Apple, Banana, Cherry, Date]

        // TreeSet navigation
        TreeSet<Integer> nums = new TreeSet<>(Arrays.asList(5,1,8,3,9,2,7,4,6));
        System.out.println("\\nTreeSet        : " + nums);
        System.out.println("First          : " + nums.first());
        System.out.println("Last           : " + nums.last());
        System.out.println("headSet(5)     : " + nums.headSet(5));    // [1,2,3,4]
        System.out.println("tailSet(5)     : " + nums.tailSet(5));    // [5,6,7,8,9]
        System.out.println("subSet(3,7)    : " + nums.subSet(3, 7)); // [3,4,5,6]
    }
}`,
        output: "Original list  : [Banana, Apple, Cherry, Apple, Banana, Date]\nHashSet        : [Apple, Cherry, Banana, Date]\nLinkedHashSet  : [Banana, Apple, Cherry, Date]\nTreeSet        : [Apple, Banana, Cherry, Date]\n\nTreeSet        : [1, 2, 3, 4, 5, 6, 7, 8, 9]\nFirst          : 1\nLast           : 9\nheadSet(5)     : [1, 2, 3, 4]\ntailSet(5)     : [5, 6, 7, 8, 9]\nsubSet(3,7)    : [3, 4, 5, 6]"
      }
    ],
    quiz: [
      { q: "What happens when you add() a duplicate to HashSet?", options: ["Exception thrown", "Duplicate stored", "Silently ignored — returns false", "Replaces old value"], correct: 2 },
      { q: "HashSet add/contains/remove time complexity:", options: ["O(n)", "O(log n)", "O(1)", "O(n²)"], correct: 2 },
      { q: "Which Set maintains insertion order?", options: ["HashSet", "TreeSet", "LinkedHashSet", "All of them"], correct: 2 },
      { q: "retainAll() on a Set performs:", options: ["Union", "Intersection", "Difference", "Clear"], correct: 1 },
      { q: "HashSet is backed internally by:", options: ["TreeMap", "LinkedList", "HashMap", "Array"], correct: 2 },
      { q: "TreeSet allows null elements?", options: ["Yes", "No — NullPointerException", "One null only", "Depends on version"], correct: 1 }
    ],
    code: `import java.util.*;
public class UniqueVisitors {
    public static void main(String[] args) {
        // Track unique website visitors
        Set<String> visitors = new HashSet<>();
        // Simulate visitor log (with repeat visits)
        String[] log = {"Alice","Bob","Alice","Charlie","Bob","Dave",
                        "Alice","Eve","Charlie","Frank","Bob","Alice"};

        for (String visitor : log) visitors.add(visitor);

        System.out.println("Total visits   : " + log.length);
        System.out.println("Unique visitors: " + visitors.size());
        System.out.println("Visitor list   : " + new TreeSet<>(visitors));

        // VIP check
        String[] vips = {"Alice","Frank","Zara"};
        System.out.println("\\nVIP visit check:");
        for (String vip : vips) {
            System.out.printf("  %-8s : %s%n", vip,
                visitors.contains(vip) ? "Visited ✓" : "Not visited");
        }
    }
}`,
    output: "Total visits   : 12\nUnique visitors: 6\nVisitor list   : [Alice, Bob, Charlie, Dave, Eve, Frank]\n\nVIP visit check:\n  Alice    : Visited ✓\n  Frank    : Visited ✓\n  Zara     : Not visited"
  },

  "stack-queue": {
    title: "Stack & Queue — Complete Guide", module: "collections", duration: "40 min", difficulty: "Intermediate", xp: 125, icon: "📬",
    intro: "Stack (LIFO — Last In, First Out) and Queue (FIFO — First In, First Out) are two of the most fundamental data structures in computer science. Stack works like a stack of plates — last plate placed is first removed. Queue works like a line at a ticket counter — first person in is first served. In modern Java, ArrayDeque is the recommended class for both — it is faster than the legacy Stack class and LinkedList for these use cases.",

    sections: [
      {
        heading: "Stack — LIFO (Last In, First Out)",
        content: "Stack is used when you need to process items in reverse order of arrival. Real-world uses: browser back button, undo/redo in text editors, function call stack, expression evaluation, balanced brackets checking.",
        code: `import java.util.Stack;
import java.util.ArrayDeque;

public class StackDemo {
    public static void main(String[] args) {

        // ── Legacy Stack class ───────────────────────
        Stack<String> stack = new Stack<>();
        stack.push("First");
        stack.push("Second");
        stack.push("Third");   // TOP of stack

        System.out.println("Stack          : " + stack);
        System.out.println("peek() top     : " + stack.peek());  // view top, no removal
        System.out.println("pop()  top     : " + stack.pop());   // Third — removes it
        System.out.println("pop()  next    : " + stack.pop());   // Second
        System.out.println("isEmpty        : " + stack.isEmpty()); // false

        System.out.println();

        // ── Modern ArrayDeque (RECOMMENDED) ─────────
        ArrayDeque<String> modernStack = new ArrayDeque<>();
        modernStack.push("Page1");
        modernStack.push("Page2");
        modernStack.push("Page3"); // top

        System.out.println("ArrayDeque     : " + modernStack);
        System.out.println("peek()         : " + modernStack.peek()); // Page3
        System.out.println("pop()          : " + modernStack.pop());  // Page3
        System.out.println("After pop      : " + modernStack);

        // Iterate without removing
        System.out.print("All items      : ");
        for (String s : modernStack) System.out.print(s + " ");
        System.out.println();
    }
}`,
        output: "Stack          : [First, Second, Third]\npeek() top     : Third\npop()  top     : Third\npop()  next    : Second\nisEmpty        : false\n\nArrayDeque     : [Page3, Page2, Page1]\npeek()         : Page3\npop()          : Page3\nAfter pop      : [Page2, Page1]\nAll items      : Page2 Page1 "
      },
      {
        heading: "Queue — FIFO (First In, First Out)",
        content: "Queue is used when you need to process items in the order they arrived. Real-world uses: print job queue, customer service systems, task scheduling, messaging queues, breadth-first search.",
        code: `import java.util.Queue;
import java.util.LinkedList;
import java.util.ArrayDeque;

public class QueueDemo {
    public static void main(String[] args) {

        // ── Using LinkedList as Queue ────────────────
        Queue<String> queue = new LinkedList<>();
        queue.offer("Alice");    // add to TAIL
        queue.offer("Bob");
        queue.offer("Charlie");
        queue.offer("Dave");

        System.out.println("Queue          : " + queue);
        System.out.println("peek() front   : " + queue.peek());   // Alice — no removal
        System.out.println("poll() front   : " + queue.poll());   // Alice — REMOVES
        System.out.println("poll() next    : " + queue.poll());   // Bob
        System.out.println("Remaining      : " + queue);

        System.out.println();

        // ── Using ArrayDeque as Queue (RECOMMENDED) ──
        Queue<String> tasks = new ArrayDeque<>();
        tasks.offer("Task A");
        tasks.offer("Task B");
        tasks.offer("Task C");

        System.out.println("Processing queue:");
        while (!tasks.isEmpty()) {
            System.out.println("  Processing: " + tasks.poll());
        }
        System.out.println("Queue empty: " + tasks.isEmpty());
    }
}`,
        output: "Queue          : [Alice, Bob, Charlie, Dave]\npeek() front   : Alice\npoll() front   : Alice\npoll() next    : Bob\nRemaining      : [Charlie, Dave]\n\nProcessing queue:\n  Processing: Task A\n  Processing: Task B\n  Processing: Task C\nQueue empty: true"
      },
      {
        heading: "PriorityQueue — Process by Priority",
        content: "PriorityQueue serves the highest-priority element first — not FIFO order. By default it is a min-heap (smallest first). You can make it a max-heap with Collections.reverseOrder().",
        code: `import java.util.*;
public class PriorityQueueDemo {
    public static void main(String[] args) {

        // Min-heap (default) — smallest number first
        PriorityQueue<Integer> minPQ = new PriorityQueue<>();
        minPQ.offer(30);
        minPQ.offer(10);
        minPQ.offer(50);
        minPQ.offer(20);
        minPQ.offer(40);

        System.out.print("Min-heap order : ");
        while (!minPQ.isEmpty()) System.out.print(minPQ.poll() + " ");
        System.out.println(); // 10 20 30 40 50

        // Max-heap — largest number first
        PriorityQueue<Integer> maxPQ = new PriorityQueue<>(Collections.reverseOrder());
        maxPQ.offer(30); maxPQ.offer(10); maxPQ.offer(50);
        maxPQ.offer(20); maxPQ.offer(40);

        System.out.print("Max-heap order : ");
        while (!maxPQ.isEmpty()) System.out.print(maxPQ.poll() + " ");
        System.out.println(); // 50 40 30 20 10

        // Patient priority queue (by urgency level — lower = more urgent)
        PriorityQueue<String[]> hospital = new PriorityQueue<>(
            (a, b) -> Integer.parseInt(a[1]) - Integer.parseInt(b[1])
        );
        hospital.offer(new String[]{"John",  "3"}); // mild
        hospital.offer(new String[]{"Alice", "1"}); // critical
        hospital.offer(new String[]{"Bob",   "2"}); // urgent
        hospital.offer(new String[]{"Eve",   "1"}); // critical

        System.out.println("\\nPatient order (by urgency):");
        while (!hospital.isEmpty()) {
            String[] p = hospital.poll();
            System.out.println("  " + p[0] + " (level " + p[1] + ")");
        }
    }
}`,
        output: "Min-heap order : 10 20 30 40 50 \nMax-heap order : 50 40 30 20 10 \n\nPatient order (by urgency):\n  Alice (level 1)\n  Eve (level 1)\n  Bob (level 2)\n  John (level 3)"
      },
      {
        heading: "ArrayDeque — Best for Both Stack and Queue",
        content: "ArrayDeque implements both Deque and Queue. It is faster than Stack and LinkedList for stack/queue operations. Use this in modern Java code.",
        code: `import java.util.*;
public class ArrayDequeDemo {
    public static void main(String[] args) {

        ArrayDeque<String> deque = new ArrayDeque<>();

        // ── As STACK (LIFO) ──────────────────────────
        deque.push("A");   // addFirst
        deque.push("B");
        deque.push("C");   // top
        System.out.println("Stack view     : " + deque);      // [C, B, A]
        System.out.println("Stack pop()    : " + deque.pop()); // C
        System.out.println("Stack peek()   : " + deque.peek()); // B

        deque.clear();

        // ── As QUEUE (FIFO) ──────────────────────────
        deque.offer("First");  // addLast
        deque.offer("Second");
        deque.offer("Third");
        System.out.println("Queue view     : " + deque);       // [First, Second, Third]
        System.out.println("Queue poll()   : " + deque.poll()); // First
        System.out.println("Queue peek()   : " + deque.peek()); // Second

        deque.clear();

        // ── As DEQUE (both ends) ─────────────────────
        deque.addFirst("B");
        deque.addFirst("A");   // front
        deque.addLast("C");
        deque.addLast("D");    // back
        System.out.println("Deque          : " + deque);           // [A,B,C,D]
        System.out.println("peekFirst      : " + deque.peekFirst()); // A
        System.out.println("peekLast       : " + deque.peekLast());  // D
        System.out.println("pollFirst      : " + deque.pollFirst()); // A
        System.out.println("pollLast       : " + deque.pollLast());  // D
        System.out.println("After          : " + deque);             // [B,C]
    }
}`,
        output: "Stack view     : [C, B, A]\nStack pop()    : C\nStack peek()   : B\nQueue view     : [First, Second, Third]\nQueue poll()   : First\nQueue peek()   : Second\nDeque          : [A, B, C, D]\npeekFirst      : A\npeekLast       : D\npollFirst      : A\npollLast       : D\nAfter          : [B, C]"
      },
      {
        heading: "Real-World Example — Bracket Checker Using Stack",
        content: "Balanced bracket checking is the most classic Stack interview problem. A Stack is perfect because each opening bracket must be matched by the most recently unmatched closing bracket.",
        code: `import java.util.*;
public class BracketChecker {
    static boolean isBalanced(String expr) {
        ArrayDeque<Character> stack = new ArrayDeque<>();

        for (char c : expr.toCharArray()) {
            // Push opening brackets onto stack
            if (c == '(' || c == '[' || c == '{') {
                stack.push(c);
            }
            // For closing brackets, check if top of stack matches
            else if (c == ')' || c == ']' || c == '}') {
                if (stack.isEmpty()) return false;
                char top = stack.pop();
                if (c == ')' && top != '(') return false;
                if (c == ']' && top != '[') return false;
                if (c == '}' && top != '{') return false;
            }
        }
        return stack.isEmpty(); // all brackets matched
    }

    public static void main(String[] args) {
        String[] tests = {
            "(())",           // valid
            "()[]{}", 		  // valid
            "(]",             // invalid
            "([)]",           // invalid
            "{[()]}",         // valid
            "(((",            // invalid — unclosed
            ""                // valid — empty
        };

        System.out.println("=== Bracket Checker ===");
        for (String t : tests) {
            String label = t.isEmpty() ? "(empty)" : t;
            System.out.printf("%-12s → %s%n", label,
                isBalanced(t) ? "✓ Valid" : "✗ Invalid");
        }
    }
}`,
        output: "=== Bracket Checker ===\n(())         → ✓ Valid\n()[]{}       → ✓ Valid\n(]           → ✗ Invalid\n([)]         → ✗ Invalid\n{[()]}       → ✓ Valid\n(((          → ✗ Invalid\n(empty)      → ✓ Valid"
      }
    ],
    quiz: [
      { q: "Stack removes which element first?", options: ["First added", "Last added (LIFO)", "Random", "Smallest"], correct: 1 },
      { q: "Recommended modern class for Stack/Queue:", options: ["Stack", "Vector", "ArrayDeque", "LinkedList"], correct: 2 },
      { q: "PriorityQueue default is:", options: ["Max-heap (largest first)", "Min-heap (smallest first)", "FIFO order", "Insertion order"], correct: 1 },
      { q: "Queue follows:", options: ["LIFO", "FIFO — first in first out", "Random order", "Priority order"], correct: 1 },
      { q: "offer() vs add() in Queue:", options: ["Same", "offer() returns false if full; add() throws exception", "add() is newer", "offer() is thread-safe"], correct: 1 },
      { q: "peek() in Stack/Queue:", options: ["Removes and returns top", "Views top without removal", "Adds element", "Clears the structure"], correct: 1 }
    ],
    code: `import java.util.*;
public class CallCenterSimulation {
    public static void main(String[] args) {
        // Queue for waiting customers (FIFO)
        Queue<String> waiting = new ArrayDeque<>();
        waiting.offer("Customer_1 (Normal)");
        waiting.offer("Customer_2 (Normal)");
        waiting.offer("Customer_3 (Normal)");

        // PriorityQueue for VIP customers (processed first)
        PriorityQueue<String> vip = new PriorityQueue<>();
        vip.offer("VIP_Alice");
        vip.offer("VIP_Bob");

        System.out.println("=== Call Center ===");
        System.out.println("VIP queue     : " + vip);
        System.out.println("Normal queue  : " + waiting);

        System.out.println("\\n--- Processing ---");
        // Serve VIPs first, then normal customers
        while (!vip.isEmpty())     System.out.println("Served VIP   : " + vip.poll());
        while (!waiting.isEmpty()) System.out.println("Served normal: " + waiting.poll());
        System.out.println("All served!");
    }
}`,
    output: "=== Call Center ===\nVIP queue     : [VIP_Alice, VIP_Bob]\nNormal queue  : [Customer_1 (Normal), Customer_2 (Normal), Customer_3 (Normal)]\n\n--- Processing ---\nServed VIP   : VIP_Alice\nServed VIP   : VIP_Bob\nServed normal: Customer_1 (Normal)\nServed normal: Customer_2 (Normal)\nServed normal: Customer_3 (Normal)\nAll served!"
  },

  "iterators": {
    title: "Iterators — Complete Guide", module: "collections", duration: "35 min", difficulty: "Intermediate", xp: 100, icon: "🔄",
    intro: "An Iterator is an object that lets you traverse a collection one element at a time without knowing its internal structure. It follows the Iterator Design Pattern. Every class that implements the Iterable interface can return an Iterator — which is why the for-each loop works on ArrayList, HashSet, LinkedList, and all other collections. The critical reason to use explicit Iterator: you can safely REMOVE elements during traversal. Using collection.remove() inside a for-each throws ConcurrentModificationException.",

    sections: [
      {
        heading: "What is an Iterator and Why Use It?",
        content: "Iterators provide a unified way to traverse any collection. The most important use case is safe removal during iteration.",
        list: [
          "📌 Iterator interface has 3 methods: hasNext() → boolean, next() → E, remove() → void",
          "✅ hasNext() — returns true if more elements remain to iterate",
          "✅ next() — returns the next element and moves the cursor forward",
          "✅ remove() — removes the LAST element returned by next() — the ONLY safe way to remove during iteration",
          "⚠️ NEVER use list.remove() inside a for-each loop — this throws ConcurrentModificationException",
          "⚠️ NEVER call remove() before calling next() — throws IllegalStateException",
          "💡 For-each loop internally uses Iterator — it is just cleaner syntax"
        ]
      },
      {
        heading: "Basic Iterator Usage",
        content: "The three-step Iterator pattern: get iterator, check hasNext(), call next().",
        code: `import java.util.*;
public class BasicIterator {
    public static void main(String[] args) {

        ArrayList<Integer> nums = new ArrayList<>(
            Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));

        // ── Basic forward iteration ───────────────────
        System.out.print("Forward   : ");
        Iterator<Integer> it = nums.iterator();
        while (it.hasNext()) {
            System.out.print(it.next() + " ");
        }
        System.out.println();

        // ── Safe removal with Iterator ────────────────
        // Remove all even numbers — SAFE with iterator
        Iterator<Integer> it2 = nums.iterator();
        while (it2.hasNext()) {
            int n = it2.next();
            if (n % 2 == 0) {
                it2.remove(); // safe! no ConcurrentModificationException
            }
        }
        System.out.println("Odds only  : " + nums); // [1, 3, 5, 7, 9]

        // ── What NOT to do ────────────────────────────
        ArrayList<String> names = new ArrayList<>(
            Arrays.asList("Alice","Bob","Anna","Charlie"));
        // ❌ BAD — throws ConcurrentModificationException:
        // for (String name : names) {
        //     if (name.startsWith("A")) names.remove(name); // CRASH!
        // }

        // ✅ GOOD — use Iterator:
        Iterator<String> nameIt = names.iterator();
        while (nameIt.hasNext()) {
            if (nameIt.next().startsWith("A")) nameIt.remove();
        }
        System.out.println("No A-names : " + names); // [Bob, Charlie]
    }
}`,
        output: "Forward   : 1 2 3 4 5 6 7 8 9 10 \nOdds only  : [1, 3, 5, 7, 9]\nNo A-names : [Bob, Charlie]"
      },
      {
        heading: "ListIterator — Bidirectional Traversal",
        content: "ListIterator extends Iterator with additional capabilities: move backward, add elements, replace elements, and get index positions. It only works on Lists (not Sets or Maps).",
        code: `import java.util.*;
public class ListIteratorDemo {
    public static void main(String[] args) {

        ArrayList<String> words = new ArrayList<>(
            Arrays.asList("Java","Python","Go","Rust","Kotlin"));

        // ── Backward traversal ───────────────────────
        System.out.print("Backward  : ");
        ListIterator<String> lit = words.listIterator(words.size()); // start at end
        while (lit.hasPrevious()) {
            System.out.print(lit.previous() + " ");
        }
        System.out.println();

        // ── Forward with index info ──────────────────
        System.out.println("Forward with index:");
        ListIterator<String> lit2 = words.listIterator();
        while (lit2.hasNext()) {
            int idx = lit2.nextIndex();
            String word = lit2.next();
            System.out.println("  [" + idx + "] " + word);
        }

        // ── Modify elements during iteration ─────────
        ArrayList<Integer> nums = new ArrayList<>(Arrays.asList(1,2,3,4,5));
        ListIterator<Integer> li = nums.listIterator();
        while (li.hasNext()) {
            int n = li.next();
            li.set(n * n); // replace each element with its square
        }
        System.out.println("Squared   : " + nums); // [1, 4, 9, 16, 25]

        // ── Add elements during forward iteration ─────
        ArrayList<String> list = new ArrayList<>(Arrays.asList("A","B","C"));
        ListIterator<String> adder = list.listIterator();
        while (adder.hasNext()) {
            adder.next();
            adder.add("*"); // insert * after each element
        }
        System.out.println("Starred   : " + list); // [A, *, B, *, C, *]
    }
}`,
        output: "Backward  : Kotlin Rust Go Python Java \nForward with index:\n  [0] Java\n  [1] Python\n  [2] Go\n  [3] Rust\n  [4] Kotlin\nSquared   : [1, 4, 9, 16, 25]\nStarred   : [A, *, B, *, C, *]"
      },
      {
        heading: "Map Iterator — Iterating Key-Value Pairs",
        content: "Maps don't implement Iterable directly, but you can iterate over their entrySet, keySet, or values.",
        code: `import java.util.*;
public class MapIterator {
    public static void main(String[] args) {

        HashMap<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 92); scores.put("Bob", 78);
        scores.put("Charlie", 85); scores.put("Diana", 60);
        scores.put("Eve", 95);

        // ── Iterate entrySet with Iterator ────────────
        System.out.println("All entries:");
        Iterator<Map.Entry<String,Integer>> it = scores.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry<String,Integer> entry = it.next();
            System.out.printf("  %-8s : %d%n", entry.getKey(), entry.getValue());
        }

        // ── Safe removal from Map during iteration ────
        // Remove students who scored below 80
        Iterator<Map.Entry<String,Integer>> remIt = scores.entrySet().iterator();
        while (remIt.hasNext()) {
            if (remIt.next().getValue() < 80) remIt.remove(); // safe!
        }
        System.out.println("After removing <80: " + new TreeMap<>(scores));
    }
}`,
        output: "All entries:\n  Alice    : 92\n  Bob      : 78\n  Charlie  : 85\n  Diana    : 60\n  Eve      : 95\nAfter removing <80: {Alice=92, Charlie=85, Eve=95}"
      },
      {
        heading: "All Iteration Methods — Comparison",
        content: "Java provides multiple ways to iterate. Each has specific strengths.",
        table: {
          headers: ["Method", "Can Remove?", "Can Add/Set?", "Direction", "Works on"],
          rows: [
            ["for-each loop",      "❌ No",   "❌ No",    "Forward only",  "All Iterable"],
            ["Iterator",           "✅ Yes",  "❌ No",    "Forward only",  "All Collections"],
            ["ListIterator",       "✅ Yes",  "✅ Yes",   "Both ways",     "Lists only"],
            ["for loop with index","❌ No",   "✅ set()", "Both ways",     "Lists only"],
            ["forEach() lambda",   "❌ No",   "❌ No",    "Forward only",  "All Iterable"],
            ["Stream",             "❌ No",   "❌ No",    "Forward only",  "All Collections"]
          ]
        }
      },
      {
        heading: "ConcurrentModificationException — Explained and Fixed",
        content: "This is the most common Iterator-related error. Java's fail-fast iterators detect structural modifications and throw immediately.",
        code: `import java.util.*;
public class ConcurrentModDemo {
    public static void main(String[] args) {

        ArrayList<Integer> list = new ArrayList<>(
            Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));

        // ❌ METHOD 1 BAD: for-each + list.remove() → ConcurrentModificationException
        // for (int n : list) {
        //     if (n % 2 == 0) list.remove((Integer)n); // CRASH!
        // }

        // ✅ METHOD 1 FIX: Use Iterator.remove()
        Iterator<Integer> it = list.iterator();
        while (it.hasNext()) {
            if (it.next() % 2 == 0) it.remove(); // SAFE
        }
        System.out.println("After Iterator.remove() : " + list);

        // ✅ METHOD 2: Use removeIf() (Java 8+, cleanest)
        ArrayList<Integer> list2 = new ArrayList<>(Arrays.asList(1,2,3,4,5,6,7,8,9,10));
        list2.removeIf(n -> n % 2 == 0);
        System.out.println("After removeIf()        : " + list2);

        // ✅ METHOD 3: Collect to-remove, then remove after loop
        ArrayList<Integer> list3 = new ArrayList<>(Arrays.asList(1,2,3,4,5,6,7,8,9,10));
        ArrayList<Integer> toRemove = new ArrayList<>();
        for (int n : list3) {
            if (n % 2 == 0) toRemove.add(n);
        }
        list3.removeAll(toRemove);
        System.out.println("After removeAll()       : " + list3);
    }
}`,
        output: "After Iterator.remove() : [1, 3, 5, 7, 9]\nAfter removeIf()        : [1, 3, 5, 7, 9]\nAfter removeAll()       : [1, 3, 5, 7, 9]"
      }
    ],
    quiz: [
      { q: "Why use Iterator.remove() instead of list.remove() during iteration?", options: ["It's faster", "Avoids ConcurrentModificationException", "Works on any index", "It's the only option"], correct: 1 },
      { q: "hasNext() returns when collection is empty:", options: ["null", "0", "false", "throws Exception"], correct: 2 },
      { q: "ListIterator supports:", options: ["Forward only", "Backward only", "Both forward and backward", "Random access"], correct: 2 },
      { q: "for-each internally uses:", options: ["Index counter", "Iterator", "Spliterator only", "ListIterator"], correct: 1 },
      { q: "Calling remove() before next() throws:", options: ["ConcurrentModificationException", "IllegalStateException", "NoSuchElementException", "NullPointerException"], correct: 1 },
      { q: "removeIf() is available from:", options: ["Java 5", "Java 7", "Java 8", "Java 11"], correct: 2 }
    ],
    code: `import java.util.*;
public class IteratorExample {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>(
            Arrays.asList("Alice","Bob","Anna","Charlie","Amy","Dave","Aaron"));
        System.out.println("Before : " + names);

        // Keep only names NOT starting with 'A' — using Iterator
        Iterator<String> it = names.iterator();
        while (it.hasNext())
            if (it.next().startsWith("A")) it.remove();
        System.out.println("No-A   : " + names);

        // Reset and use removeIf (cleaner Java 8 way)
        names = new ArrayList<>(Arrays.asList("Alice","Bob","Anna","Charlie","Amy","Dave","Aaron"));
        names.removeIf(n -> n.startsWith("A"));
        System.out.println("removeIf: " + names);

        // ListIterator — convert all to uppercase
        ListIterator<String> li = names.listIterator();
        while (li.hasNext()) li.set(li.next().toUpperCase());
        System.out.println("Upper  : " + names);
    }
}`,
    output: "Before : [Alice, Bob, Anna, Charlie, Amy, Dave, Aaron]\nNo-A   : [Bob, Charlie, Dave]\nremoveIf: [Bob, Charlie, Dave]\nUpper  : [BOB, CHARLIE, DAVE]"
  }

};
