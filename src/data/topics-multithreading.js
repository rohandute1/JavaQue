export const MULTITHREADING_TOPICS = {

  "threads-intro": {
    title: "Threads Introduction — Complete Guide", module: "multithreading", duration: "35 min", difficulty: "Advanced", xp: 175, icon: "🧵",
    intro: "A thread is the smallest unit of execution inside a process. A process is an independent running program with its own memory — like Chrome or VS Code. Threads are workers inside that process: they share the same memory (heap, static variables, open files) but each has its own stack, program counter, and local variables. The JVM starts with one main thread; you create additional threads for concurrent work. Multithreading enables parallelism, responsiveness, and efficient CPU utilisation — but introduces new challenges: race conditions, deadlocks, and visibility issues.",
    sections: [
      {
        heading: "Process vs Thread — The Foundation",
        content: "A process has its own isolated memory space. Threads live inside a process and share its memory. Thread creation is fast (reuses process memory); process creation is slow (OS must allocate new memory). A crashing thread can crash the whole process; a crashing process only affects itself.",
        table: {
          headers: ["Aspect", "Process", "Thread"],
          rows: [
            ["Definition", "Independent running program", "Unit of execution within a process"],
            ["Memory", "Own separate memory space", "Shares heap with other threads"],
            ["Communication", "Inter-process (slow, complex)", "Direct via shared memory (fast)"],
            ["Creation time", "Slow — OS allocates memory", "Fast — shares process memory"],
            ["Crash impact", "Only that process crashes", "Can crash the entire process"],
            ["Example", "Chrome browser running", "Each browser tab / extension"]
          ]
        },
        note: "Each thread has its OWN: Stack, Program Counter, Local variables. Threads SHARE: Heap memory, static variables, open files."
      },
      {
        heading: "Why Multithreading? Real Benefits",
        content: "Parallelism runs tasks simultaneously on multi-core CPUs. Responsiveness keeps the UI thread alive while background work happens. Resource sharing means threads share process memory (cheaper than multiple processes). Server scalability lets you handle thousands of requests concurrently instead of one at a time.",
        code: `// SINGLE-THREADED: tasks run one after another
public class SingleThreaded {
    public static void main(String[] args) throws InterruptedException {
        long start = System.currentTimeMillis();
        downloadFile("file1.zip"); // takes 2s
        downloadFile("file2.zip"); // takes 2s
        // Total: ~4 seconds
        System.out.println("Time: " + (System.currentTimeMillis() - start) + "ms");
    }
    static void downloadFile(String name) throws InterruptedException {
        System.out.println("Downloading " + name + "...");
        Thread.sleep(2000);
        System.out.println("Done: " + name);
    }
}`,
        output: `Downloading file1.zip...
Done: file1.zip
Downloading file2.zip...
Done: file2.zip
Time: ~4000ms`
      },
      {
        heading: "Creating Threads — 3 Ways",
        content: "Way 1: Extend Thread (simple but wastes inheritance). Way 2: Implement Runnable (preferred — separates task from mechanism, allows extending another class). Way 3: Lambda (cleanest for short tasks, since Runnable is a functional interface). Always call start() not run() — start() creates a NEW thread; run() just calls the method in the current thread.",
        code: `public class ThreadCreation {
    // Way 1: Extend Thread
    static class MyThread extends Thread {
        private String name;
        MyThread(String n) { this.name = n; }
        @Override
        public void run() {
            for (int i = 1; i <= 3; i++)
                System.out.println(name + " → step " + i +
                    " [" + Thread.currentThread().getName() + "]");
        }
    }

    // Way 2: Implement Runnable (PREFERRED)
    static class PrintTask implements Runnable {
        private String label;
        PrintTask(String l) { this.label = l; }
        @Override
        public void run() {
            for (int i = 1; i <= 3; i++)
                System.out.println("[" + label + "] " + i);
        }
    }

    public static void main(String[] args) throws InterruptedException {
        // Way 1: Extend Thread
        MyThread t1 = new MyThread("Worker-A");
        t1.start(); // starts NEW thread — calls run() internally
        t1.join();  // main waits for t1 to finish

        // Way 2: Implement Runnable
        Thread t2 = new Thread(new PrintTask("Runnable"));
        t2.start();
        t2.join();

        // Way 3: Lambda (since Runnable is @FunctionalInterface)
        Thread t3 = new Thread(() -> {
            for (int i = 1; i <= 3; i++)
                System.out.println("Lambda: " + i);
        });
        t3.start();
        t3.join();

        System.out.println("Main done: " + Thread.currentThread().getName());
    }
}`,
        output: `Worker-A → step 1 [Thread-0]
Worker-A → step 2 [Thread-0]
Worker-A → step 3 [Thread-0]
[Runnable] 1
[Runnable] 2
[Runnable] 3
Lambda: 1
Lambda: 2
Lambda: 3
Main done: main`,
        note: "WHY RUNNABLE OVER THREAD: Java has no multiple inheritance — extending Thread blocks you from extending anything else. Runnable separates the TASK from the mechanism. Runnable tasks can be reused with Thread, ExecutorService, and CompletableFuture."
      },
      {
        heading: "Important Thread Methods",
        content: "Key methods every Java developer must know. start() creates a new OS thread. sleep() pauses the current thread. join() makes the calling thread wait. interrupt() signals a thread to stop (sets interrupt flag). isAlive() checks if thread is still running.",
        table: {
          headers: ["Method", "Description", "Example"],
          rows: [
            ["start()", "Creates a new thread, calls run() inside it", "t.start()"],
            ["run()", "The task code — override this, never call directly", "Override this method"],
            ["sleep(ms)", "Pauses the CURRENT thread for ms milliseconds", "Thread.sleep(1000)"],
            ["join()", "Calling thread waits until this thread finishes", "t.join()"],
            ["join(ms)", "Wait at most ms milliseconds for this thread", "t.join(5000)"],
            ["interrupt()", "Sets interrupt flag — signals thread to stop", "t.interrupt()"],
            ["isAlive()", "Returns true if thread started and not yet terminated", "t.isAlive()"],
            ["getName()", "Returns thread's name", "t.getName()"],
            ["setPriority(n)", "Sets priority: MIN=1, NORM=5, MAX=10", "t.setPriority(Thread.MAX_PRIORITY)"],
            ["setDaemon(b)", "Mark as daemon — MUST call before start()", "t.setDaemon(true)"],
            ["currentThread()", "Returns the Thread object of executing thread", "Thread.currentThread()"],
            ["yield()", "Hints JVM to pause this thread and run others", "Thread.yield()"]
          ]
        },
        code: `public class ThreadMethodsDemo {
    public static void main(String[] args) throws InterruptedException {
        Thread worker = new Thread(() -> {
            System.out.println("Worker running on: " +
                Thread.currentThread().getName());
            System.out.println("Priority: " +
                Thread.currentThread().getPriority());
            try {
                Thread.sleep(2000); // sleep 2 seconds
            } catch (InterruptedException e) {
                System.out.println("Worker was interrupted!");
                Thread.currentThread().interrupt(); // restore flag
            }
            System.out.println("Worker done!");
        }, "MyWorker");

        worker.setPriority(Thread.MAX_PRIORITY); // 10
        worker.setDaemon(false);                 // user thread

        System.out.println("Before start: isAlive = " + worker.isAlive()); // false
        worker.start();
        System.out.println("After start:  isAlive = " + worker.isAlive()); // true

        Thread.sleep(500);
        worker.interrupt(); // interrupt after 0.5s
        worker.join();      // wait for it to finish

        System.out.println("After join:   isAlive = " + worker.isAlive()); // false
        System.out.println("Main done!");
    }
}`,
        output: `Before start: isAlive = false
After start:  isAlive = true
Worker running on: MyWorker
Priority: 10
Worker was interrupted!
After join:   isAlive = false
Main done!`
      },
      {
        heading: "Daemon vs User Threads",
        content: "User threads (normal) keep the JVM alive. Daemon threads are background service threads — the JVM exits when ALL user threads finish, automatically killing any remaining daemon threads. Used for garbage collection, monitoring, and housekeeping. Must set setDaemon(true) BEFORE calling start().",
        code: `public class DaemonDemo {
    public static void main(String[] args) throws InterruptedException {
        Thread daemonThread = new Thread(() -> {
            int count = 0;
            while (true) { // runs forever... until JVM exits
                System.out.println("Daemon: monitoring... tick " + (++count));
                try { Thread.sleep(500); }
                catch (InterruptedException e) { break; }
            }
        });
        daemonThread.setDaemon(true); // MUST be set BEFORE start()
        daemonThread.start();

        // Main thread (user thread) does its work
        Thread.sleep(1500);
        System.out.println("Main thread finishing...");
        // JVM exits here → daemon thread killed automatically
    }
}`,
        output: `Daemon: monitoring... tick 1
Daemon: monitoring... tick 2
Daemon: monitoring... tick 3
Main thread finishing...
(JVM exits — daemon killed)`
      },
      {
        heading: "Race Conditions — The Danger of Shared Data",
        content: "A race condition occurs when two or more threads access shared data simultaneously and the final result depends on the unpredictable execution order. The counter++ operation looks atomic but is actually 3 steps: READ the value, ADD 1, WRITE back. Threads can interleave between these steps, losing updates. This is one of the most dangerous bugs — it may work correctly 9999 times and fail once.",
        code: `public class RaceConditionDemo {
    static int counter = 0; // shared variable — DANGER!

    public static void main(String[] args) throws InterruptedException {
        Runnable incrementTask = () -> {
            for (int i = 0; i < 10000; i++) {
                counter++; // NOT atomic! 3 steps: read, add 1, write
            }
        };

        Thread t1 = new Thread(incrementTask);
        Thread t2 = new Thread(incrementTask);
        t1.start(); t2.start();
        t1.join();  t2.join();

        System.out.println("Expected: 20000");
        System.out.println("Actual:   " + counter); // WRONG! e.g. 12345
    }
}
// WHY IT HAPPENS:
// Thread1 reads counter = 5000
// Thread2 reads counter = 5000  ← same value!
// Thread1 writes counter = 5001
// Thread2 writes counter = 5001 ← OVERWRITES Thread1's work!
// We lost one increment!`,
        output: `Expected: 20000
Actual:   13847   ← unpredictable! Never 20000 without sync`,
        note: "Fix: use synchronized, AtomicInteger, or volatile (depending on the use case). See the Synchronization topic."
      }
    ],
    quiz: [
      { q: "What does start() do vs run()?", options: ["Same thing", "start() creates NEW thread and calls run(); run() just executes in current thread", "run() creates new thread", "start() blocks until done"], correct: 1 },
      { q: "Why prefer Runnable over extending Thread?", options: ["Runnable is faster", "Extending Thread wastes inheritance; Runnable separates task from mechanism", "Thread class is deprecated", "No difference"], correct: 1 },
      { q: "Daemon threads die when:", options: ["Explicitly stopped", "All non-daemon (user) threads finish", "Timeout occurs", "Memory runs out"], correct: 1 },
      { q: "t.join() does what?", options: ["Starts thread t", "Makes the calling thread wait until t finishes", "Kills thread t", "Pauses thread t"], correct: 1 },
      { q: "A race condition occurs when:", options: ["Single thread access", "Multiple threads access shared data without synchronization", "Network error", "Stack overflow"], correct: 1 },
      { q: "setDaemon(true) must be called:", options: ["After start()", "Anytime", "Before start()", "Inside run()"], correct: 2 }
    ],
    code: `public class MultithreadBenefits {
    public static void main(String[] args) throws InterruptedException {
        // Multi-threaded download — runs in parallel
        long start = System.currentTimeMillis();

        Thread[] workers = new Thread[5];
        for (int i = 0; i < 5; i++) {
            final int id = i + 1;
            workers[i] = new Thread(() -> {
                System.out.println("Worker-" + id + " started on " +
                    Thread.currentThread().getName());
                try { Thread.sleep(1000); } // simulate work
                catch (InterruptedException e) {}
                System.out.println("Worker-" + id + " done");
            }, "Worker-" + id);
        }

        for (Thread w : workers) w.start();
        for (Thread w : workers) w.join(); // wait for all

        System.out.println("All 5 tasks done in: " +
            (System.currentTimeMillis() - start) + "ms (not 5000ms!)");
    }
}`,
    output: `Worker-1 started on Worker-1
Worker-2 started on Worker-2
Worker-3 started on Worker-3
Worker-4 started on Worker-4
Worker-5 started on Worker-5
Worker-1 done
Worker-2 done
Worker-3 done
Worker-4 done
Worker-5 done
All 5 tasks done in: 1008ms (not 5000ms!)`
  },

  "thread-lifecycle": {
    title: "Thread Lifecycle & Communication", module: "multithreading", duration: "30 min", difficulty: "Advanced", xp: 175, icon: "🔄",
    intro: "Every Java thread goes through a well-defined set of states during its lifetime. The enum Thread.State defines 6 states: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, and TERMINATED. Understanding these states is critical for debugging multithreaded applications. Threads communicate using wait(), notify(), and notifyAll() — methods on java.lang.Object (NOT Thread!) that must always be called inside a synchronized block.",
    sections: [
      {
        heading: "The 6 Thread States",
        content: "NEW: thread created but start() not called yet. RUNNABLE: thread is executing or ready to execute (waiting for CPU). BLOCKED: waiting to acquire a monitor lock held by another thread. WAITING: waiting indefinitely for a notification (wait() or join() with no timeout). TIMED_WAITING: waiting for a specific time (sleep, wait(ms), join(ms)). TERMINATED: run() completed or an exception was thrown.",
        table: {
          headers: ["State", "Meaning", "How to Enter", "How to Exit"],
          rows: [
            ["NEW", "Created, not started", "new Thread(...)", "Call start()"],
            ["RUNNABLE", "Running or ready to run", "start() called", "Gets CPU time or blocks"],
            ["BLOCKED", "Waiting for monitor lock", "Try to enter synchronized block held by another thread", "Lock becomes available"],
            ["WAITING", "Waiting indefinitely", "wait(), join() no timeout, LockSupport.park()", "notify(), notifyAll(), thread finishes"],
            ["TIMED_WAITING", "Waiting with timeout", "sleep(ms), wait(ms), join(ms)", "Timeout expires or notified"],
            ["TERMINATED", "Execution complete", "run() completes or exception thrown", "Cannot restart"]
          ]
        },
        note: "A thread in WAITING state does NOT release the CPU — it completely suspends. When notified, a WAITING thread moves to BLOCKED (waiting for the lock), then to RUNNABLE when it acquires the lock."
      },
      {
        heading: "Checking Thread State Programmatically",
        content: "Use Thread.getState() to check the current state. Useful for debugging and monitoring. Thread states are defined in the Thread.State enum.",
        code: `public class ThreadStateDemo {
    public static void main(String[] args) throws InterruptedException {
        Object lock = new Object();

        Thread t1 = new Thread(() -> {
            synchronized (lock) {
                try {
                    System.out.println("T1: waiting...");
                    lock.wait(); // moves to WAITING state
                    System.out.println("T1: woken up!");
                } catch (InterruptedException e) {}
            }
        }, "T1");

        Thread t2 = new Thread(() -> {
            synchronized (lock) {
                try { Thread.sleep(500); } // TIMED_WAITING
                catch (InterruptedException e) {}
                lock.notify();
            }
        }, "T2");

        System.out.println("T1 state: " + t1.getState()); // NEW
        t1.start();
        Thread.sleep(100);
        System.out.println("T1 state: " + t1.getState()); // WAITING

        t2.start();
        Thread.sleep(100);
        System.out.println("T2 state: " + t2.getState()); // TIMED_WAITING

        t1.join(); t2.join();
        System.out.println("T1 state: " + t1.getState()); // TERMINATED
        System.out.println("T2 state: " + t2.getState()); // TERMINATED
    }
}`,
        output: `T1 state: NEW
T1: waiting...
T1 state: WAITING
T2 state: TIMED_WAITING
T1: woken up!
T1 state: TERMINATED
T2 state: TERMINATED`
      },
      {
        heading: "wait(), notify(), notifyAll() — Inter-Thread Communication",
        content: "These three methods are on java.lang.Object (every object has them). They MUST be called inside a synchronized block — otherwise IllegalMonitorStateException is thrown. wait() releases the lock and suspends the thread. notify() wakes ONE random waiting thread (the woken thread moves to BLOCKED, then RUNNABLE when it gets the lock). notifyAll() wakes ALL waiting threads — only one gets the lock, others go back to WAITING.",
        code: `public class WaitNotifyDemo {
    static final Object lock = new Object();
    static boolean ready = false;

    public static void main(String[] args) throws InterruptedException {
        Thread waiter = new Thread(() -> {
            synchronized (lock) {
                // ALWAYS use while loop — not if (spurious wakeups!)
                while (!ready) {
                    try {
                        System.out.println("Waiter: not ready, waiting...");
                        lock.wait(); // releases lock, suspends thread
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                        break;
                    }
                }
                System.out.println("Waiter: got signal, proceeding!");
            }
        });

        waiter.start();
        Thread.sleep(500); // let waiter start and wait

        synchronized (lock) {
            ready = true;
            System.out.println("Main: sending notify...");
            lock.notify(); // wake up the waiter
        }

        waiter.join();
        System.out.println("Done!");
    }
}`,
        output: `Waiter: not ready, waiting...
Main: sending notify...
Waiter: got signal, proceeding!
Done!`,
        note: "SPURIOUS WAKEUPS: A thread can wake from wait() WITHOUT being notified — this is allowed by the JVM spec for performance. ALWAYS use while(condition) { wait(); } NEVER if(condition) { wait(); } — the while loop re-checks the condition after every wakeup."
      },
      {
        heading: "Producer-Consumer with wait/notify",
        content: "The classic multithreading pattern. Producer adds items to a buffer; consumer takes items. Consumer waits when buffer is empty; producer waits when buffer is full. Proper coordination prevents both busy-waiting (CPU waste) and deadlocks.",
        code: `import java.util.*;

public class ProducerConsumer {
    static final int CAPACITY = 3;
    static final Queue<Integer> buffer = new LinkedList<>();

    // Producer: adds items
    static synchronized void produce(int item) throws InterruptedException {
        while (buffer.size() == CAPACITY) {    // wait if full
            System.out.println("Buffer full, producer waiting...");
            wait();
        }
        buffer.add(item);
        System.out.println("Produced: " + item + " | Buffer: " + buffer);
        notifyAll(); // wake up consumer
    }

    // Consumer: takes items
    static synchronized int consume() throws InterruptedException {
        while (buffer.isEmpty()) {             // wait if empty
            System.out.println("Buffer empty, consumer waiting...");
            wait();
        }
        int item = buffer.poll();
        System.out.println("Consumed: " + item + " | Buffer: " + buffer);
        notifyAll(); // wake up producer
        return item;
    }

    public static void main(String[] args) {
        Thread producer = new Thread(() -> {
            try {
                for (int i = 1; i <= 6; i++) {
                    produce(i);
                    Thread.sleep(80);
                }
            } catch (InterruptedException e) {}
        }, "Producer");

        Thread consumer = new Thread(() -> {
            try {
                for (int i = 1; i <= 6; i++) {
                    consume();
                    Thread.sleep(200);
                }
            } catch (InterruptedException e) {}
        }, "Consumer");

        producer.start();
        consumer.start();
    }
}`,
        output: `Produced: 1 | Buffer: [1]
Produced: 2 | Buffer: [1, 2]
Consumed: 1 | Buffer: [2]
Produced: 3 | Buffer: [2, 3]
Produced: 4 | Buffer: [2, 3, 4]
Buffer full, producer waiting...
Consumed: 2 | Buffer: [3, 4]
Produced: 5 | Buffer: [3, 4, 5]
Consumed: 3 | Buffer: [4, 5]
...`
      }
    ],
    quiz: [
      { q: "How many states does a Java thread have?", options: ["4", "5", "6", "7"], correct: 2 },
      { q: "Difference between BLOCKED and WAITING?", options: ["Same thing", "BLOCKED waits for a lock; WAITING waits for notify/join", "WAITING waits for a lock; BLOCKED waits for notify", "Neither releases the lock"], correct: 1 },
      { q: "wait() must be called inside:", options: ["Any method", "synchronized block/method", "try-catch block", "static method"], correct: 1 },
      { q: "notify() wakes:", options: ["All waiting threads", "One random waiting thread", "The main thread", "The newest thread"], correct: 1 },
      { q: "Why use while() not if() with wait()?", options: ["No difference", "while is faster", "Protect against spurious wakeups — re-check condition after wakeup", "if causes deadlock"], correct: 2 },
      { q: "When notified, a WAITING thread moves to:", options: ["RUNNABLE directly", "BLOCKED first, then RUNNABLE when lock acquired", "TERMINATED", "NEW"], correct: 1 }
    ],
    code: `public class OddEvenPrinter {
    private int num = 1;
    private final Object lock = new Object();

    // Thread-1 prints odd: 1, 3, 5, 7, 9
    public void printOdd() throws InterruptedException {
        while (num <= 10) {
            synchronized (lock) {
                while (num % 2 == 0 && num <= 10) lock.wait();
                if (num <= 10) {
                    System.out.println("Odd:  " + num++);
                    lock.notify();
                }
            }
        }
    }

    // Thread-2 prints even: 2, 4, 6, 8, 10
    public void printEven() throws InterruptedException {
        while (num <= 10) {
            synchronized (lock) {
                while (num % 2 != 0 && num <= 10) lock.wait();
                if (num <= 10) {
                    System.out.println("Even: " + num++);
                    lock.notify();
                }
            }
        }
    }

    public static void main(String[] args) {
        OddEvenPrinter p = new OddEvenPrinter();
        new Thread(() -> { try { p.printOdd(); } catch(Exception e){} }).start();
        new Thread(() -> { try { p.printEven(); } catch(Exception e){} }).start();
    }
}`,
    output: `Odd:  1
Even: 2
Odd:  3
Even: 4
Odd:  5
Even: 6
Odd:  7
Even: 8
Odd:  9
Even: 10`
  },

  "synchronization": {
    title: "Synchronization — Race Conditions, Locks & Deadlocks", module: "multithreading", duration: "40 min", difficulty: "Advanced", xp: 225, icon: "🔐",
    intro: "Synchronization ensures that only ONE thread executes a critical section at a time, preventing race conditions. Java provides multiple tools: the synchronized keyword (simplest), volatile (visibility only), ReentrantLock (advanced control), and atomic classes (lock-free). Understanding which tool to use — and when — is essential for writing correct concurrent Java code.",
    sections: [
      {
        heading: "synchronized Keyword — Method & Block",
        content: "The synchronized keyword acquires an intrinsic lock (monitor) on an object. Only one thread can hold a lock on a given object at a time. Synchronized method locks 'this' (the instance). Synchronized block locks a specified object — finer control, preferred approach. Always prefer synchronized block: lock only what's needed, reducing contention.",
        code: `public class SynchronizedCounter {
    private int count = 0;
    private final Object lock = new Object(); // dedicated lock object

    // Method 1: synchronized method — locks 'this'
    public synchronized void incrementMethod() {
        count++; // atomic — only one thread at a time
    }

    // Method 2: synchronized block (PREFERRED — finer control)
    public void incrementBlock() {
        // non-shared work here — runs concurrently with other threads
        int localVal = count * 2; // example non-shared work

        synchronized (lock) {   // only this part is exclusive
            count++;
        }
        // more non-shared work here
    }

    public synchronized int getCount() { return count; }

    public static void main(String[] args) throws InterruptedException {
        SynchronizedCounter counter = new SynchronizedCounter();
        Runnable task = () -> {
            for (int i = 0; i < 10000; i++) counter.incrementMethod();
        };

        Thread t1 = new Thread(task);
        Thread t2 = new Thread(task);
        t1.start(); t2.start();
        t1.join();  t2.join();

        System.out.println("Count: " + counter.getCount()); // Always 20000!
    }
}`,
        output: `Count: 20000`
      },
      {
        heading: "volatile — Visibility Guarantee",
        content: "The volatile keyword guarantees that changes to a variable are immediately visible to ALL threads. Without volatile, a thread may cache a variable's value in its CPU cache and miss updates from other threads. volatile provides VISIBILITY but NOT MUTUAL EXCLUSION — use it only for simple read/write, NOT for compound operations like check-then-act or increment.",
        code: `public class VolatileDemo {
    // WITHOUT volatile: worker might NEVER see running=false
    // because it reads a cached CPU register value
    private volatile boolean running = true; // ← volatile!

    public void stopWorker() {
        running = false; // immediately visible to ALL threads
    }

    public void doWork() {
        int workDone = 0;
        while (running) { // always reads from main memory
            workDone++;
            // simulate work
        }
        System.out.println("Worker stopped. Work done: " + workDone);
    }

    public static void main(String[] args) throws InterruptedException {
        VolatileDemo demo = new VolatileDemo();
        Thread worker = new Thread(demo::doWork, "Worker");
        worker.start();

        Thread.sleep(100); // let worker run a bit
        System.out.println("Main: stopping worker...");
        demo.stopWorker();
        worker.join();
        System.out.println("Main: done!");
    }
}`,
        output: `Main: stopping worker...
Worker stopped. Work done: 3487291
Main: done!`,
        note: "volatile vs synchronized: volatile = visibility only, no mutual exclusion. Use for simple boolean flags. synchronized = visibility + mutual exclusion. Use for compound operations like count++."
      },
      {
        heading: "Deadlock — Causes, Detection & Prevention",
        content: "A deadlock occurs when two or more threads are blocked forever, each waiting for the other to release a lock. All 4 Coffman conditions must hold: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. Break ANY one condition to prevent deadlock. Most common fix: always acquire locks in the same consistent order.",
        code: `public class DeadlockDemo {
    static Object lockA = new Object();
    static Object lockB = new Object();

    // DEADLOCK VERSION — DON'T DO THIS
    static void deadlockVersion() {
        Thread t1 = new Thread(() -> {
            synchronized (lockA) {        // T1 holds A
                System.out.println("T1: acquired Lock A");
                try { Thread.sleep(100); } catch(InterruptedException e) {}
                synchronized (lockB) {    // T1 wants B (but T2 holds it)
                    System.out.println("T1: acquired Lock B"); // never reached
                }
            }
        });

        Thread t2 = new Thread(() -> {
            synchronized (lockB) {        // T2 holds B
                System.out.println("T2: acquired Lock B");
                try { Thread.sleep(100); } catch(InterruptedException e) {}
                synchronized (lockA) {    // T2 wants A (but T1 holds it)
                    System.out.println("T2: acquired Lock A"); // never reached
                }
            }
        });
        t1.start(); t2.start();
        // BOTH THREADS FREEZE FOREVER ← DEADLOCK
    }

    // FIXED VERSION — acquire locks in SAME ORDER
    static void fixedVersion() throws InterruptedException {
        Thread t1 = new Thread(() -> {
            synchronized (lockA) {        // T1 acquires A first
                synchronized (lockB) {    // then B
                    System.out.println("T1: got both locks!");
                }
            }
        });
        Thread t2 = new Thread(() -> {
            synchronized (lockA) {        // T2 also acquires A first
                synchronized (lockB) {    // then B — consistent order!
                    System.out.println("T2: got both locks!");
                }
            }
        });
        t1.start(); t2.start();
        t1.join();  t2.join();
        System.out.println("Fixed — no deadlock!");
    }

    public static void main(String[] args) throws InterruptedException {
        fixedVersion();
    }
}`,
        output: `T1: got both locks!
T2: got both locks!
Fixed — no deadlock!`,
        note: "DEADLOCK PREVENTION: 1) Always acquire locks in consistent order. 2) Use tryLock() with timeout (ReentrantLock). 3) Minimise lock scope. 4) Use higher-level tools (ExecutorService, ConcurrentHashMap). 5) Use jstack or thread dumps to detect deadlocks in production."
      },
      {
        heading: "ReentrantLock — Advanced Lock Control",
        content: "ReentrantLock gives more control than synchronized: tryLock() for non-blocking attempts, tryLock(timeout) to avoid deadlocks, lockInterruptibly() for interruptible waiting, and fairness policy. ALWAYS unlock in a finally block — if you forget, the lock is never released and all other threads block forever.",
        code: `import java.util.concurrent.locks.*;
import java.util.concurrent.TimeUnit;

public class ReentrantLockDemo {
    private final ReentrantLock lock = new ReentrantLock();
    private int count = 0;

    // Basic lock/unlock — ALWAYS in try/finally
    public void increment() {
        lock.lock();
        try {
            count++;
        } finally {
            lock.unlock(); // ALWAYS in finally!
        }
    }

    // tryLock — attempt to acquire, DON'T block if unavailable
    public boolean tryIncrement() {
        if (lock.tryLock()) { // returns immediately: true or false
            try {
                count++;
                return true;
            } finally {
                lock.unlock();
            }
        }
        return false; // lock was busy — try later
    }

    // tryLock with timeout — avoid indefinite blocking
    public boolean timedIncrement() throws InterruptedException {
        if (lock.tryLock(500, TimeUnit.MILLISECONDS)) {
            try {
                count++;
                return true;
            } finally {
                lock.unlock();
            }
        }
        return false; // timeout expired without getting lock
    }

    public static void main(String[] args) throws InterruptedException {
        ReentrantLockDemo demo = new ReentrantLockDemo();
        Thread[] threads = new Thread[10];
        for (int i = 0; i < 10; i++)
            threads[i] = new Thread(() -> {
                for (int j = 0; j < 1000; j++) demo.increment();
            });
        for (Thread t : threads) t.start();
        for (Thread t : threads) t.join();
        System.out.println("Count: " + demo.count); // Always 10000
        System.out.println("Is fair: " + demo.lock.isFair()); // false
        System.out.println("Lock held: " + demo.lock.isLocked()); // false
    }
}`,
        output: `Count: 10000
Is fair: false
Lock held: false`,
        note: "ReentrantLock vs synchronized: Use synchronized unless you need tryLock, timeout, interruptible locking, or fairness. Synchronized is simpler and automatically releases on exception. ReentrantLock requires explicit unlock in finally."
      },
      {
        heading: "Atomic Classes — Lock-Free Thread Safety",
        content: "java.util.concurrent.atomic provides lock-free thread-safe operations using hardware CAS (Compare-And-Swap) CPU instructions. No locking overhead! AtomicInteger, AtomicLong, AtomicBoolean, AtomicReference. CAS: 'if current value equals expected, set to new value' — if another thread changed it, CAS fails and retries automatically.",
        code: `import java.util.concurrent.atomic.*;

public class AtomicDemo {
    static AtomicInteger atomicCount = new AtomicInteger(0);

    public static void main(String[] args) throws InterruptedException {
        // 10 threads, each incrementing 10000 times
        Thread[] threads = new Thread[10];
        for (int i = 0; i < 10; i++)
            threads[i] = new Thread(() -> {
                for (int j = 0; j < 10000; j++)
                    atomicCount.incrementAndGet(); // atomic — no lock needed!
            });
        for (Thread t : threads) t.start();
        for (Thread t : threads) t.join();

        System.out.println("Count: " + atomicCount.get()); // Always 100000!

        // CAS (Compare-And-Swap)
        boolean swapped = atomicCount.compareAndSet(100000, 0);
        System.out.println("Reset success: " + swapped);    // true
        System.out.println("After reset: " + atomicCount.get()); // 0

        // Other operations
        atomicCount.set(5);
        System.out.println("getAndIncrement: " + atomicCount.getAndIncrement()); // 5
        System.out.println("Now: " + atomicCount.get());                          // 6
        System.out.println("addAndGet(10): " + atomicCount.addAndGet(10));        // 16

        // AtomicReference for any object
        AtomicReference<String> ref = new AtomicReference<>("hello");
        boolean changed = ref.compareAndSet("hello", "world");
        System.out.println("Changed: " + changed + " → " + ref.get());
    }
}`,
        output: `Count: 100000
Reset success: true
After reset: 0
getAndIncrement: 5
Now: 6
addAndGet(10): 16
Changed: true → world`
      },
      {
        heading: "CountDownLatch, CyclicBarrier & Semaphore",
        content: "Higher-level synchronization utilities. CountDownLatch: wait for N events to complete (one-time use). CyclicBarrier: all threads wait at a checkpoint then proceed together (reusable). Semaphore: limit the number of threads accessing a resource concurrently.",
        code: `import java.util.concurrent.*;

public class SyncUtilities {
    public static void main(String[] args) throws InterruptedException {

        // ── CountDownLatch: wait for N workers to complete ────────
        System.out.println("=== CountDownLatch ===");
        CountDownLatch latch = new CountDownLatch(3); // count = 3
        for (int i = 1; i <= 3; i++) {
            final int id = i;
            new Thread(() -> {
                System.out.println("Worker " + id + " done");
                latch.countDown(); // decrement counter
            }).start();
        }
        latch.await(); // MAIN waits until count reaches 0
        System.out.println("All workers finished!");

        // ── Semaphore: limit concurrent database connections ──────
        System.out.println("\n=== Semaphore (max 2 at once) ===");
        Semaphore sem = new Semaphore(2); // max 2 threads at once
        for (int i = 1; i <= 4; i++) {
            final int id = i;
            new Thread(() -> {
                try {
                    sem.acquire(); // blocks if no permits available
                    System.out.println("Thread " + id + " accessing DB");
                    Thread.sleep(500);
                    System.out.println("Thread " + id + " releasing");
                    sem.release(); // return permit
                } catch (InterruptedException e) {}
            }).start();
        }
        Thread.sleep(1500);
    }
}`,
        output: `=== CountDownLatch ===
Worker 1 done
Worker 2 done
Worker 3 done
All workers finished!

=== Semaphore (max 2 at once) ===
Thread 1 accessing DB
Thread 2 accessing DB
Thread 1 releasing
Thread 3 accessing DB
Thread 2 releasing
Thread 4 accessing DB`
      }
    ],
    quiz: [
      { q: "Difference between synchronized method vs block?", options: ["Same lock", "Method locks 'this'; block locks specified object — block preferred for finer control", "Block is slower", "Method is preferred always"], correct: 1 },
      { q: "volatile provides:", options: ["Mutual exclusion only", "Visibility only — no mutual exclusion", "Both mutual exclusion and visibility", "Neither"], correct: 1 },
      { q: "How to prevent deadlock?", options: ["Use more threads", "Always acquire multiple locks in same consistent order", "Never use synchronized", "Use volatile everywhere"], correct: 1 },
      { q: "ReentrantLock vs synchronized:", options: ["Same", "ReentrantLock adds tryLock, timeout, fairness — but requires explicit unlock", "synchronized has more features", "ReentrantLock is deprecated"], correct: 1 },
      { q: "AtomicInteger uses:", options: ["synchronized internally", "volatile only", "CAS (Compare-And-Swap) hardware instruction — lock-free", "ReentrantLock internally"], correct: 2 },
      { q: "CountDownLatch vs CyclicBarrier:", options: ["Same", "Latch: one-time, N events done; Barrier: reusable, threads wait for each other", "Barrier is one-time use", "Both are reusable"], correct: 1 }
    ],
    code: `import java.util.concurrent.locks.*;
// Thread-safe Singleton with double-checked locking
public class ThreadSafeSingleton {
    // volatile prevents instruction reordering during construction
    private static volatile ThreadSafeSingleton instance;
    private int value;

    private ThreadSafeSingleton() { this.value = 42; }

    public static ThreadSafeSingleton getInstance() {
        if (instance == null) {                    // 1st check (no lock — fast path)
            synchronized (ThreadSafeSingleton.class) {
                if (instance == null) {            // 2nd check (with lock — safe)
                    instance = new ThreadSafeSingleton();
                }
            }
        }
        return instance;
    }

    public static void main(String[] args) throws InterruptedException {
        Thread[] threads = new Thread[10];
        for (int i = 0; i < 10; i++)
            threads[i] = new Thread(() ->
                System.out.println(ThreadSafeSingleton.getInstance().hashCode()));
        for (Thread t : threads) t.start();
        for (Thread t : threads) t.join();
        System.out.println("All threads got the SAME instance!");
    }
}`,
    output: `1829164700
1829164700
1829164700
1829164700
1829164700
1829164700
1829164700
1829164700
1829164700
1829164700
All threads got the SAME instance!`
  },

  "executor-service": {
    title: "ExecutorService & Thread Pools", module: "multithreading", duration: "35 min", difficulty: "Advanced", xp: 200, icon: "⚙️",
    intro: "Creating a new Thread for every task is expensive and dangerous. Each thread consumes ~1MB of stack memory. If your server creates a new thread for every HTTP request, 1000 simultaneous users = 1000 threads = OutOfMemoryError crash! ExecutorService manages a pool of reusable threads — tasks queue up and workers pick them up as they become free. This is how every real-world Java server works.",
    sections: [
      {
        heading: "Thread Pool Concept — Why It Matters",
        content: "Without a pool: every task creates a thread (slow, expensive), destroys it when done (wasteful), and can exhaust system resources under load. With a pool: a fixed number of threads are created once, tasks queue up and reuse the same threads, resources are bounded and predictable.",
        table: {
          headers: ["Factory Method", "Thread Count", "Best For"],
          rows: [
            ["newFixedThreadPool(n)", "Exactly n threads always running", "Predictable, constant workload"],
            ["newCachedThreadPool()", "Creates on demand, idle ones die after 60s", "Many short-lived tasks, variable load"],
            ["newSingleThreadExecutor()", "Exactly 1 thread, sequential execution", "Tasks must run in order, one at a time"],
            ["newScheduledThreadPool(n)", "n threads with scheduling support", "Periodic tasks, delayed tasks"],
            ["newWorkStealingPool()", "ForkJoinPool — threads steal work", "Divide-and-conquer parallel tasks"]
          ]
        }
      },
      {
        heading: "execute() vs submit() — Runnable vs Callable",
        content: "execute(Runnable): fire-and-forget, no return value. Exceptions are swallowed silently unless you use UncaughtExceptionHandler. submit(Callable<T>): returns Future<T>. Exceptions are captured and thrown when you call future.get(). Use Callable when you need a return value or want to handle exceptions.",
        code: `import java.util.concurrent.*;

public class ExecutorBasics {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newFixedThreadPool(3);

        // execute() — fire and forget (Runnable)
        executor.execute(() -> System.out.println("Task 1: " +
            Thread.currentThread().getName()));

        // submit(Callable) — get a Future back
        Future<Integer> future = executor.submit(() -> {
            System.out.println("Task 2 computing...");
            Thread.sleep(500);
            return 42; // Callable returns a result
        });

        System.out.println("Main: doing other work while task runs...");

        // get() BLOCKS until result is available
        Integer result = future.get(); // waits for completion
        System.out.println("Result: " + result);

        // get() with timeout — prevent blocking forever
        Future<String> f2 = executor.submit(() -> {
            Thread.sleep(200);
            return "Done!";
        });
        try {
            String r = f2.get(1, TimeUnit.SECONDS);
            System.out.println("Got: " + r);
        } catch (TimeoutException e) {
            System.out.println("Timeout! Cancelling...");
            f2.cancel(true);
        }

        // Check status
        System.out.println("future done? " + future.isDone()); // true
        System.out.println("f2 cancelled? " + f2.isCancelled());

        executor.shutdown();
        executor.awaitTermination(5, TimeUnit.SECONDS);
        System.out.println("Executor shut down.");
    }
}`,
        output: `Main: doing other work while task runs...
Task 1: pool-1-thread-1
Task 2 computing...
Result: 42
Got: Done!
future done? true
f2 cancelled? false
Executor shut down.`
      },
      {
        heading: "All 5 Pool Types — Practical Examples",
        content: "Choose the right pool for your use case. Fixed for stable throughput. Cached for burst workloads. Single for sequential guarantee. Scheduled for repeating tasks. WorkStealing for CPU-bound parallel work.",
        code: `import java.util.concurrent.*;
import java.util.*;

public class AllPoolTypes {
    public static void main(String[] args) throws Exception {

        // 1. Fixed Thread Pool
        System.out.println("=== Fixed Pool (3 threads, 6 tasks) ===");
        ExecutorService fixed = Executors.newFixedThreadPool(3);
        for (int i = 1; i <= 6; i++) {
            final int t = i;
            fixed.submit(() ->
                System.out.printf("Task %d → %s%n", t,
                    Thread.currentThread().getName()));
        }
        fixed.shutdown();
        fixed.awaitTermination(2, TimeUnit.SECONDS);

        // 2. Callable + invokeAll — parallel computation
        System.out.println("\n=== invokeAll — parallel squares ===");
        ExecutorService exec = Executors.newFixedThreadPool(4);
        List<Callable<Integer>> tasks = new ArrayList<>();
        for (int i = 1; i <= 5; i++) {
            final int n = i;
            tasks.add(() -> { Thread.sleep(100); return n * n; });
        }
        List<Future<Integer>> futures = exec.invokeAll(tasks);
        System.out.print("Squares: ");
        for (Future<Integer> f : futures)
            System.out.print(f.get() + " ");
        System.out.println();
        exec.shutdown();

        // 3. ScheduledExecutorService
        System.out.println("\n=== Scheduled (periodic) ===");
        ScheduledExecutorService sched = Executors.newScheduledThreadPool(1);
        ScheduledFuture<?> periodic = sched.scheduleAtFixedRate(
            () -> System.out.println("Heartbeat: " + System.currentTimeMillis()),
            0, 500, TimeUnit.MILLISECONDS);
        Thread.sleep(1600);
        periodic.cancel(false);
        sched.shutdown();
    }
}`,
        output: `=== Fixed Pool (3 threads, 6 tasks) ===
Task 1 → pool-1-thread-1
Task 2 → pool-1-thread-2
Task 3 → pool-1-thread-3
Task 4 → pool-1-thread-1
Task 5 → pool-1-thread-2
Task 6 → pool-1-thread-3

=== invokeAll — parallel squares ===
Squares: 1 4 9 16 25

=== Scheduled (periodic) ===
Heartbeat: 1716900000000
Heartbeat: 1716900000500
Heartbeat: 1716900001000
Heartbeat: 1716900001500`
      },
      {
        heading: "invokeAll vs invokeAny",
        content: "invokeAll submits all tasks and blocks until ALL complete — returns a list of Futures in submission order. invokeAny submits all tasks and returns the FIRST result — cancels all other tasks automatically. Use invokeAll when you need all results; invokeAny when you need the fastest response (e.g. query multiple servers).",
        code: `import java.util.concurrent.*;
import java.util.*;

public class InvokeDemo {
    public static void main(String[] args) throws Exception {
        ExecutorService exec = Executors.newFixedThreadPool(3);

        List<Callable<String>> tasks = Arrays.asList(
            () -> { Thread.sleep(300); return "Task A (300ms)"; },
            () -> { Thread.sleep(100); return "Task B (100ms)"; }, // fastest!
            () -> { Thread.sleep(200); return "Task C (200ms)"; }
        );

        // invokeAll: wait for ALL — returns all results
        System.out.println("=== invokeAll ===");
        List<Future<String>> allResults = exec.invokeAll(tasks);
        for (Future<String> f : allResults)
            System.out.println(f.get()); // in submission order

        // invokeAny: return FIRST completed result
        System.out.println("\n=== invokeAny ===");
        String fastest = exec.invokeAny(tasks);
        System.out.println("First done: " + fastest); // Task B (fastest)

        exec.shutdown();
    }
}`,
        output: `=== invokeAll ===
Task A (300ms)
Task B (100ms)
Task C (200ms)

=== invokeAny ===
First done: Task B (100ms)`
      },
      {
        heading: "shutdown() vs shutdownNow() — Proper Cleanup",
        content: "Always shut down your ExecutorService! Without shutdown(), threads stay alive forever preventing JVM exit. shutdown() is graceful: no new tasks accepted, currently running/queued tasks finish normally. shutdownNow() is forceful: sends interrupt to all running tasks, returns list of queued tasks that never started.",
        code: `import java.util.concurrent.*;
import java.util.List;

public class ShutdownDemo {
    public static void main(String[] args) throws InterruptedException {
        ExecutorService exec = Executors.newFixedThreadPool(2);

        // Submit several tasks
        for (int i = 1; i <= 5; i++) {
            final int id = i;
            exec.submit(() -> {
                try {
                    System.out.println("Task " + id + " starting");
                    Thread.sleep(1000);
                    System.out.println("Task " + id + " done");
                } catch (InterruptedException e) {
                    System.out.println("Task " + id + " INTERRUPTED");
                    Thread.currentThread().interrupt();
                }
            });
        }

        // GRACEFUL shutdown
        exec.shutdown(); // no new tasks; running tasks finish
        System.out.println("Shutdown initiated");

        // Wait for completion (best practice)
        boolean finished = exec.awaitTermination(10, TimeUnit.SECONDS);
        System.out.println("Finished cleanly: " + finished);

        // ── shutdownNow example ──
        ExecutorService exec2 = Executors.newFixedThreadPool(2);
        for (int i = 1; i <= 5; i++) {
            final int id = i;
            exec2.submit(() -> {
                try { Thread.sleep(2000); }
                catch (InterruptedException e) {
                    System.out.println("Task " + id + " interrupted by shutdownNow");
                }
            });
        }
        Thread.sleep(500);
        List<Runnable> notStarted = exec2.shutdownNow(); // forceful
        System.out.println("Tasks never started: " + notStarted.size());
    }
}`,
        output: `Task 1 starting
Task 2 starting
Shutdown initiated
Task 1 done
Task 2 done
Task 3 starting
Task 4 starting
Task 3 done
Task 4 done
Task 5 starting
Task 5 done
Finished cleanly: true
Task 1 interrupted by shutdownNow
Task 2 interrupted by shutdownNow
Tasks never started: 3`
      }
    ],
    quiz: [
      { q: "Why use ExecutorService instead of raw threads?", options: ["No reason — same thing", "Reuses threads (lower cost), controls max threads, queues tasks, supports Future results", "ExecutorService is slower", "Threads don't need shutdown"], correct: 1 },
      { q: "Difference between execute() and submit()?", options: ["Same", "execute: fire-forget no return; submit: returns Future for result and exception access", "submit: no return value; execute: returns Future", "execute is for Callable"], correct: 1 },
      { q: "shutdown() vs shutdownNow()?", options: ["Same", "shutdown: graceful (finishes existing tasks); shutdownNow: forceful (interrupts running tasks)", "shutdownNow is graceful", "shutdown kills immediately"], correct: 1 },
      { q: "Callable differs from Runnable by:", options: ["No difference", "Callable has call() that returns value and can throw checked exceptions", "Runnable returns a value", "Callable cannot throw exceptions"], correct: 1 },
      { q: "After executor.shutdown(), submitting a new task throws:", options: ["NullPointerException", "RejectedExecutionException", "IllegalStateException", "ThreadDeath"], correct: 1 },
      { q: "invokeAny() returns:", options: ["All results in a list", "The result of the FIRST completed task; cancels others", "The last result", "Void"], correct: 1 }
    ],
    code: `import java.util.concurrent.*;
import java.util.*;

// Parallel computation: compute fibonacci numbers in parallel
public class ParallelFibonacci {
    static long fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }

    public static void main(String[] args) throws Exception {
        ExecutorService exec = Executors.newFixedThreadPool(4);
        int[] inputs = {35, 36, 37, 38};

        // Submit all tasks
        List<Future<Long>> futures = new ArrayList<>();
        long start = System.currentTimeMillis();
        for (int n : inputs) {
            final int num = n;
            futures.add(exec.submit(() -> fibonacci(num)));
        }

        // Collect all results
        for (int i = 0; i < inputs.length; i++) {
            System.out.printf("fib(%d) = %d%n",
                inputs[i], futures.get(i).get());
        }

        System.out.println("Parallel time: " +
            (System.currentTimeMillis() - start) + "ms");
        exec.shutdown();
    }
}`,
    output: `fib(35) = 9227465
fib(36) = 14930352
fib(37) = 24157817
fib(38) = 39088169
Parallel time: 312ms  ← much faster than sequential!`
  },

  "completable-future": {
    title: "CompletableFuture — Async Programming", module: "multithreading", duration: "40 min", difficulty: "Advanced", xp: 250, icon: "🚀",
    intro: "CompletableFuture (Java 8) is the most powerful async tool in Java. Unlike Future which only supports blocking get(), CompletableFuture supports non-blocking callbacks, chaining multiple async operations, combining futures, and built-in exception handling. Think of it as Java's version of JavaScript Promises. In synchronous programming every operation waits; async programming lets you start an operation, do other work, and react when it completes.",
    sections: [
      {
        heading: "CompletableFuture vs Future",
        content: "Future (Java 5) was limited: get() always blocks, no way to chain operations, no exception handling pipeline, can't combine multiple futures. CompletableFuture solves all these problems with a fluent API.",
        table: {
          headers: ["Feature", "Future (Java 5)", "CompletableFuture (Java 8)"],
          rows: [
            ["Get result", "get() — BLOCKS the calling thread", "thenApply() — non-blocking callback"],
            ["Combine futures", "Not supported", "thenCombine(), allOf(), anyOf()"],
            ["Exception handling", "try-catch on get()", "exceptionally(), handle()"],
            ["Chain operations", "Not supported", ".thenApply().thenAccept().thenRun()"],
            ["Manual complete", "Not possible", "complete(value) — set result manually"],
            ["Create async task", "ExecutorService.submit()", "supplyAsync() / runAsync()"],
            ["Non-blocking check", "isDone()", "isDone() + callbacks fired automatically"]
          ]
        }
      },
      {
        heading: "Creating CompletableFutures",
        content: "supplyAsync: runs a Supplier (task with return value) on a thread pool. runAsync: runs a Runnable (task with no return value). Both use ForkJoinPool.commonPool() by default — always provide a custom executor for production code, especially for blocking tasks. completedFuture: creates an already-done future (useful for testing/defaults).",
        code: `import java.util.concurrent.*;

public class CFCreation {
    public static void main(String[] args) throws Exception {
        // runAsync: task with NO return value
        CompletableFuture<Void> cf1 = CompletableFuture.runAsync(() -> {
            System.out.println("Running on: " +
                Thread.currentThread().getName());
        });
        cf1.get(); // wait for completion

        // supplyAsync: task WITH return value
        CompletableFuture<String> cf2 = CompletableFuture.supplyAsync(() -> {
            try { Thread.sleep(500); } catch (InterruptedException e) {}
            return "Hello from async thread!";
        });
        System.out.println("Main continues while cf2 runs...");
        System.out.println(cf2.get()); // blocks here until result ready

        // With custom executor (BEST PRACTICE for production)
        ExecutorService executor = Executors.newFixedThreadPool(4);
        CompletableFuture<Integer> cf3 = CompletableFuture.supplyAsync(() -> {
            System.out.println("Custom pool: " +
                Thread.currentThread().getName());
            return 42;
        }, executor);
        System.out.println("Result from custom pool: " + cf3.get());

        // completedFuture: instantly done (useful for testing/defaults)
        CompletableFuture<String> done =
            CompletableFuture.completedFuture("Already done!");
        System.out.println(done.get()); // no waiting — immediate

        executor.shutdown();
    }
}`,
        output: `Running on: ForkJoinPool.commonPool-worker-1
Main continues while cf2 runs...
Hello from async thread!
Custom pool: pool-1-thread-1
Result from custom pool: 42
Already done!`
      },
      {
        heading: "thenApply, thenAccept, thenRun — Callbacks",
        content: "thenApply(fn): transform the result (like Stream.map). fn takes T, returns R. thenAccept(consumer): consume the result, no return. Used for side effects like logging or sending a response. thenRun(runnable): run a task after completion, no access to result. thenApplyAsync / thenAcceptAsync: run the callback on a different thread pool.",
        code: `import java.util.concurrent.*;

public class CallbackDemo {
    public static void main(String[] args) throws Exception {

        // thenApply: transform result step by step
        CompletableFuture<String> pipeline = CompletableFuture
            .supplyAsync(() -> "hello")           // produces "hello"
            .thenApply(s -> s.toUpperCase())       // → "HELLO"
            .thenApply(s -> "Result: " + s);       // → "Result: HELLO"
        System.out.println(pipeline.get()); // Result: HELLO

        // thenAccept: consume result (void — no further chaining of value)
        CompletableFuture.supplyAsync(() -> 42)
            .thenAccept(n -> System.out.println("Got: " + n)); // Got: 42

        // thenRun: run something after, no data access
        CompletableFuture.supplyAsync(() -> "data")
            .thenAccept(data -> System.out.println("Saved: " + data))
            .thenRun(() -> System.out.println("Pipeline complete!"));

        // thenApplyAsync: run callback on different thread
        CompletableFuture<String> async = CompletableFuture
            .supplyAsync(() -> {
                System.out.println("Step 1: " + Thread.currentThread().getName());
                return "fetched";
            })
            .thenApplyAsync(s -> {
                System.out.println("Step 2: " + Thread.currentThread().getName());
                return s + "-processed";
            })
            .thenApplyAsync(s -> s + "-saved");

        System.out.println("Final: " + async.get());

        Thread.sleep(100); // let thenRun finish
    }
}`,
        output: `Result: HELLO
Got: 42
Saved: data
Pipeline complete!
Step 1: ForkJoinPool.commonPool-worker-1
Step 2: ForkJoinPool.commonPool-worker-2
Final: fetched-processed-saved`
      },
      {
        heading: "thenCombine & thenCompose — Combining Futures",
        content: "thenCombine(other, fn): combines TWO independent futures — both run in parallel, fn is called when BOTH complete. thenCompose(fn): chain DEPENDENT futures — like flatMap for CompletableFuture. fn returns a CompletableFuture. Use thenCompose when the next async step depends on the previous result.",
        code: `import java.util.concurrent.*;

public class CombiningFutures {
    public static void main(String[] args) throws Exception {

        // thenCombine: two INDEPENDENT tasks run in PARALLEL
        CompletableFuture<String> userFuture =
            CompletableFuture.supplyAsync(() -> {
                try { Thread.sleep(500); } catch(Exception e){}
                return "Alice";
            });
        CompletableFuture<Integer> ageFuture =
            CompletableFuture.supplyAsync(() -> {
                try { Thread.sleep(300); } catch(Exception e){}
                return 28;
            });

        // Combined when BOTH complete — runs in ~500ms (max), not 800ms (sum)
        String combined = userFuture.thenCombine(
            ageFuture,
            (name, age) -> name + " is " + age + " years old"
        ).get();
        System.out.println(combined); // Alice is 28 years old

        // thenCompose: DEPENDENT chain (step 2 needs step 1's result)
        CompletableFuture<String> result =
            CompletableFuture.supplyAsync(() -> getUserId())     // returns "user-42"
            .thenCompose(id -> fetchProfileById(id));            // uses id → returns CF<String>

        System.out.println(result.get()); // Profile: Alice (user-42)

        // allOf: wait for ALL futures
        CompletableFuture<String> f1 =
            CompletableFuture.supplyAsync(() -> "A");
        CompletableFuture<String> f2 =
            CompletableFuture.supplyAsync(() -> "B");
        CompletableFuture<String> f3 =
            CompletableFuture.supplyAsync(() -> "C");

        long start = System.currentTimeMillis();
        CompletableFuture.allOf(f1, f2, f3).join(); // wait for all
        System.out.println("All: " + f1.get() + f2.get() + f3.get());
        System.out.println("Time: " + (System.currentTimeMillis()-start) + "ms");

        // anyOf: complete as soon as ANY finishes
        CompletableFuture<Object> first =
            CompletableFuture.anyOf(f1, f2, f3);
        System.out.println("First: " + first.get());
    }

    static String getUserId() { return "user-42"; }
    static CompletableFuture<String> fetchProfileById(String id) {
        return CompletableFuture.supplyAsync(() -> "Profile: Alice (" + id + ")");
    }
}`,
        output: `Alice is 28 years old
Profile: Alice (user-42)
All: ABC
Time: 3ms
First: A`
      },
      {
        heading: "Exception Handling — exceptionally, handle, whenComplete",
        content: "exceptionally(fn): catches exception and provides a fallback value. Skipped if no exception. handle(fn): ALWAYS runs with both result and exception — handle either case. whenComplete(fn): side-effects only (logging, metrics) — passes original result/exception downstream unchanged.",
        code: `import java.util.concurrent.*;

public class ExceptionHandling {
    public static void main(String[] args) throws Exception {

        // exceptionally: catch error, provide fallback
        CompletableFuture<String> safe = CompletableFuture
            .supplyAsync(() -> {
                if (Math.random() > 0.5) throw new RuntimeException("DB Error!");
                return "Real Data";
            })
            .exceptionally(ex -> {
                System.out.println("Error caught: " + ex.getMessage());
                return "Fallback Data"; // default value
            });
        System.out.println(safe.get()); // "Real Data" OR "Fallback Data"

        // handle: process BOTH result AND exception
        CompletableFuture<String> handled = CompletableFuture
            .supplyAsync(() -> {
                throw new RuntimeException("Service unavailable");
            })
            .handle((result, ex) -> {
                if (ex != null) {
                    System.out.println("Handling exception: " + ex.getMessage());
                    return "default-value";
                }
                return result.toString().toUpperCase();
            });
        System.out.println("Handled: " + handled.get());

        // whenComplete: side-effects only — logging, metrics
        CompletableFuture.supplyAsync(() -> "important-result")
            .whenComplete((result, ex) -> {
                if (ex != null) System.out.println("FAILED: " + ex);
                else System.out.println("SUCCESS — result: " + result);
                // result still passed downstream regardless
            })
            .thenAccept(r -> System.out.println("Processing: " + r));

        Thread.sleep(100);
    }
}`,
        output: `Error caught: DB Error!
Fallback Data
Handling exception: Service unavailable
Handled: default-value
SUCCESS — result: important-result
Processing: important-result`
      },
      {
        heading: "Real-World Async Pipeline",
        content: "In production, use CompletableFuture to build async pipelines that don't block threads. Here's a realistic order-processing pipeline and a parallel API fetch — patterns you'll see in every high-performance Java backend.",
        code: `import java.util.concurrent.*;

public class RealWorldAsync {
    static ExecutorService pool = Executors.newFixedThreadPool(8);

    // Async order processing pipeline
    static CompletableFuture<String> processOrder(int orderId) {
        return CompletableFuture
            .supplyAsync(() -> validateOrder(orderId), pool)     // step 1
            .thenApplyAsync(id -> reserveInventory(id), pool)    // step 2
            .thenApplyAsync(id -> chargePayment(id), pool)       // step 3
            .thenApplyAsync(id -> sendConfirmation(id), pool)    // step 4
            .exceptionally(ex -> {
                System.out.println("Order failed: " + ex.getMessage());
                return "ORDER-FAILED-" + orderId;
            });
    }

    // Parallel API calls — fetch user + orders + reviews simultaneously
    static void parallelFetch(int userId) throws Exception {
        long start = System.currentTimeMillis();

        CompletableFuture<String> userFuture =
            CompletableFuture.supplyAsync(() -> fetchUser(userId), pool);
        CompletableFuture<String> ordersFuture =
            CompletableFuture.supplyAsync(() -> fetchOrders(userId), pool);
        CompletableFuture<String> reviewsFuture =
            CompletableFuture.supplyAsync(() -> fetchReviews(userId), pool);

        // All three run in PARALLEL
        CompletableFuture.allOf(userFuture, ordersFuture, reviewsFuture).join();

        System.out.println("User:    " + userFuture.get());
        System.out.println("Orders:  " + ordersFuture.get());
        System.out.println("Reviews: " + reviewsFuture.get());
        System.out.println("Total time: " + (System.currentTimeMillis()-start)
            + "ms (not 600ms!)");
    }

    public static void main(String[] args) throws Exception {
        // Process order
        String confirmation = processOrder(1001).get();
        System.out.println("Confirmation: " + confirmation);

        System.out.println();

        // Parallel fetch
        parallelFetch(42);

        pool.shutdown();
    }

    static int validateOrder(int id)       { sleep(100); return id; }
    static int reserveInventory(int id)    { sleep(100); return id; }
    static int chargePayment(int id)       { sleep(100); return id; }
    static String sendConfirmation(int id) { sleep(50); return "CONF-" + id; }
    static String fetchUser(int id)        { sleep(200); return "Alice"; }
    static String fetchOrders(int id)      { sleep(300); return "5 orders"; }
    static String fetchReviews(int id)     { sleep(250); return "4.5 stars"; }
    static void sleep(int ms) {
        try { Thread.sleep(ms); } catch (InterruptedException e) {}
    }
}`,
        output: `Confirmation: CONF-1001

User:    Alice
Orders:  5 orders
Reviews: 4.5 stars
Total time: 308ms (not 600ms!)`
      }
    ],
    quiz: [
      { q: "What makes CompletableFuture better than Future?", options: ["Faster", "Non-blocking callbacks, chaining, combining, exception handling pipeline", "More memory efficient", "Simpler API"], correct: 1 },
      { q: "thenApply vs thenCompose?", options: ["Same", "thenApply: transforms T→R; thenCompose: chains when fn returns CompletableFuture (flatMap)", "thenCompose: transforms value; thenApply: chains futures", "Both return void"], correct: 1 },
      { q: "allOf() completes when:", options: ["Any future completes", "The fastest future completes", "ALL futures complete", "The slowest future is cancelled"], correct: 2 },
      { q: "exceptionally() runs when:", options: ["Always", "Only when no exception", "Only when an exception occurs in the pipeline", "After thenApply"], correct: 2 },
      { q: "Default thread pool for supplyAsync?", options: ["newCachedThreadPool", "newFixedThreadPool(4)", "ForkJoinPool.commonPool()", "main thread"], correct: 2 },
      { q: "handle(fn) vs exceptionally(fn)?", options: ["Same", "handle: ALWAYS runs with both result & exception; exceptionally: only on exception", "exceptionally: always runs", "handle: only on exception"], correct: 1 }
    ],
    code: `import java.util.concurrent.*;
import java.util.List;
import java.util.stream.*;

// Batch async processing: transform a list concurrently
public class BatchAsync {
    public static void main(String[] args) throws Exception {
        ExecutorService exec = Executors.newFixedThreadPool(4);
        List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8);

        // Process all numbers in parallel, collect results
        List<CompletableFuture<Integer>> futures = numbers.stream()
            .map(n -> CompletableFuture.supplyAsync(() -> {
                    int result = n * n; // simulate processing
                    System.out.println("Processed: " + n + " → " + result);
                    return result;
                }, exec))
            .collect(Collectors.toList());

        // Wait for ALL and collect
        CompletableFuture<Void> all =
            CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]));
        all.join();

        List<Integer> results = futures.stream()
            .map(CompletableFuture::join)
            .collect(Collectors.toList());

        System.out.println("Results: " + results);
        int sum = results.stream().mapToInt(Integer::intValue).sum();
        System.out.println("Sum of squares: " + sum);
        exec.shutdown();
    }
}`,
    output: `Processed: 1 → 1
Processed: 2 → 4
Processed: 3 → 9
Processed: 4 → 16
Processed: 5 → 25
Processed: 6 → 36
Processed: 7 → 49
Processed: 8 → 64
Results: [1, 4, 9, 16, 25, 36, 49, 64]
Sum of squares: 204`
  },

  "concurrent-collections": {
    title: "Concurrent Collections", module: "multithreading", duration: "25 min", difficulty: "Advanced", xp: 175, icon: "📦",
    intro: "Standard collections (ArrayList, HashMap) are NOT thread-safe — concurrent modifications cause ConcurrentModificationException or silent data corruption. java.util.concurrent provides thread-safe alternatives optimised for concurrent access: ConcurrentHashMap (segment-level locking), CopyOnWriteArrayList (snapshot on write), BlockingQueue (producer-consumer), and ConcurrentLinkedQueue (lock-free). These almost always outperform Collections.synchronizedMap() wrappers.",
    sections: [
      {
        heading: "ConcurrentHashMap — High-Performance Thread-Safe Map",
        content: "ConcurrentHashMap allows concurrent reads and bucket-level writes. Unlike Hashtable (full lock on every operation), CHM only locks the bucket being modified — reads never block. Supports atomic operations like merge(), compute(), computeIfAbsent(). getOrDefault(), merge(), and computeIfAbsent() are your best friends for concurrent counters and caches.",
        code: `import java.util.concurrent.*;
import java.util.*;

public class ConcurrentMapDemo {
    public static void main(String[] args) throws InterruptedException {

        ConcurrentHashMap<String, Integer> wordCount = new ConcurrentHashMap<>();

        // 10 threads simultaneously counting words
        String[] words = {"java", "thread", "java", "async", "java", "thread"};
        Thread[] threads = new Thread[10];
        for (int i = 0; i < 10; i++) {
            final int tid = i;
            threads[i] = new Thread(() -> {
                String word = words[tid % words.length];
                // merge: atomic "get + update or insert" — no race condition!
                wordCount.merge(word, 1, Integer::sum);
            });
        }
        for (Thread t : threads) t.start();
        for (Thread t : threads) t.join();
        System.out.println("Word counts: " + wordCount);

        // computeIfAbsent: create lazily if missing (thread-safe!)
        ConcurrentHashMap<String, List<String>> groups = new ConcurrentHashMap<>();
        groups.computeIfAbsent("fruits", k -> new ArrayList<>()).add("apple");
        groups.computeIfAbsent("fruits", k -> new ArrayList<>()).add("banana");
        groups.computeIfAbsent("vegs",   k -> new ArrayList<>()).add("carrot");
        System.out.println("Groups: " + groups);

        // getOrDefault: never returns null
        int count = wordCount.getOrDefault("python", 0);
        System.out.println("python count: " + count); // 0

        // forEach with parallelism threshold
        wordCount.forEach(1, (k, v) ->
            System.out.println(k + " → " + v + " times"));
    }
}`,
        output: `Word counts: {java=5, thread=3, async=2}
Groups: {fruits=[apple, banana], vegs=[carrot]}
python count: 0
java → 5 times
thread → 3 times
async → 2 times`
      },
      {
        heading: "CopyOnWriteArrayList — Read-Heavy Concurrent List",
        content: "CopyOnWriteArrayList creates a fresh copy of the underlying array on every write. Reads are completely lock-free — never block each other. Iterators work on a snapshot — they never throw ConcurrentModificationException. Best when reads far outnumber writes (event listeners, config lists, routing tables).",
        code: `import java.util.concurrent.*;
import java.util.*;

public class CopyOnWriteDemo {
    public static void main(String[] args) throws InterruptedException {

        CopyOnWriteArrayList<String> listeners = new CopyOnWriteArrayList<>();
        listeners.add("LogListener");
        listeners.add("MetricsListener");
        listeners.add("AuditListener");

        // Reader thread: iterates without fear of ConcurrentModificationException
        Thread reader = new Thread(() -> {
            for (String listener : listeners) { // snapshot iteration — safe!
                System.out.println("Notifying: " + listener);
                try { Thread.sleep(100); } catch (InterruptedException e) {}
            }
        });

        // Writer thread: adds while reader iterates — safe!
        Thread writer = new Thread(() -> {
            try { Thread.sleep(150); }
            catch (InterruptedException e) {}
            listeners.add("NewListener"); // creates a new copy
            System.out.println("Added listener. Size: " + listeners.size());
        });

        reader.start();
        writer.start();
        reader.join(); writer.join();

        System.out.println("Final listeners: " + listeners);

        // Contrast: ArrayList is NOT safe for concurrent modification
        // List<String> unsafe = new ArrayList<>(listeners);
        // Would throw ConcurrentModificationException above!
    }
}`,
        output: `Notifying: LogListener
Notifying: MetricsListener
Added listener. Size: 4
Notifying: AuditListener
Final listeners: [LogListener, MetricsListener, AuditListener, NewListener]`
      },
      {
        heading: "BlockingQueue — The Perfect Producer-Consumer Tool",
        content: "BlockingQueue is the best way to implement Producer-Consumer without manual wait/notify. put() blocks if queue is full. take() blocks if queue is empty. offer(e, timeout) and poll(timeout) add timeout support. LinkedBlockingQueue is unbounded (or bounded). ArrayBlockingQueue is always bounded. PriorityBlockingQueue processes highest-priority items first.",
        code: `import java.util.concurrent.*;

public class BlockingQueueDemo {
    public static void main(String[] args) throws InterruptedException {
        // Bounded queue — max 3 items
        BlockingQueue<String> queue = new LinkedBlockingQueue<>(3);

        Thread producer = new Thread(() -> {
            String[] tasks = {"Task1","Task2","Task3","Task4","Task5"};
            for (String task : tasks) {
                try {
                    queue.put(task); // BLOCKS if queue full
                    System.out.println("Queued: " + task +
                        " | Size: " + queue.size());
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
            System.out.println("Producer done.");
        }, "Producer");

        Thread consumer = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                try {
                    Thread.sleep(300);
                    String task = queue.take(); // BLOCKS if queue empty
                    System.out.println("Processing: " + task);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
            System.out.println("Consumer done.");
        }, "Consumer");

        producer.start();
        consumer.start();
        producer.join();
        consumer.join();
        System.out.println("All done!");
    }
}`,
        output: `Queued: Task1 | Size: 1
Queued: Task2 | Size: 2
Queued: Task3 | Size: 3
Processing: Task1
Queued: Task4 | Size: 3
Processing: Task2
Queued: Task5 | Size: 3
Processing: Task3
Producer done.
Processing: Task4
Processing: Task5
Consumer done.
All done!`
      }
    ],
    quiz: [
      { q: "Is HashMap thread-safe?", options: ["Yes, always", "No — concurrent writes cause data corruption", "Only for reads", "Yes with Collections.synchronizedMap"], correct: 1 },
      { q: "ConcurrentHashMap advantage over Hashtable?", options: ["Same performance", "Segment/bucket level locking — reads never block", "CHM has full lock per operation", "CHM is not thread-safe"], correct: 1 },
      { q: "CopyOnWriteArrayList is best for:", options: ["Frequent writes", "Write-heavy workloads", "Read-heavy, rarely written (event listeners, config)", "Sorted data"], correct: 2 },
      { q: "BlockingQueue.put() does what when full?", options: ["Throws exception", "Returns false", "Overwrites oldest", "BLOCKS until space is available"], correct: 3 },
      { q: "CopyOnWriteArrayList iterators:", options: ["Throw ConcurrentModificationException", "Work on a snapshot — never throw CME", "Block until write completes", "Always empty"], correct: 1 },
      { q: "ConcurrentHashMap.merge() is useful for:", options: ["Sorting", "Thread-safe count/accumulate without synchronized", "Removing duplicates", "Ordering keys"], correct: 1 }
    ],
    code: `import java.util.concurrent.*;
import java.util.*;

public class ConcurrentSummary {
    public static void main(String[] args) throws InterruptedException {

        // ConcurrentHashMap as a concurrent cache
        ConcurrentHashMap<Integer, String> cache = new ConcurrentHashMap<>();

        // 5 threads populate the cache simultaneously
        Thread[] writers = new Thread[5];
        for (int i = 0; i < 5; i++) {
            final int id = i;
            writers[i] = new Thread(() ->
                cache.put(id, "value-" + id));
        }
        for (Thread t : writers) t.start();
        for (Thread t : writers) t.join();
        System.out.println("Cache: " + new TreeMap<>(cache));

        // PriorityBlockingQueue — process highest priority first
        PriorityBlockingQueue<Integer> pq = new PriorityBlockingQueue<>();
        pq.add(30); pq.add(10); pq.add(50); pq.add(20);

        System.out.print("Priority order: ");
        while (!pq.isEmpty())
            System.out.print(pq.poll() + " "); // 10 20 30 50
        System.out.println();
    }
}`,
    output: `Cache: {0=value-0, 1=value-1, 2=value-2, 3=value-3, 4=value-4}
Priority order: 10 20 30 50`
  }
}
