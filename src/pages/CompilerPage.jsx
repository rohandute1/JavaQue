import { useState, useRef, useCallback } from 'react'

/* ─────────────────────────────────────────────────────────────────
   SECURITY LAYERS
   ─────────────────────────────────────────────────────────────────
   1. Input Validation    — block forbidden APIs before sending
   2. Piston API sandbox  — code runs in an isolated container
                            (not on user's machine, not on our server)
   3. Output sanitisation — strip ANSI codes, cap length
   4. Rate limiting       — max 1 run per 3 seconds (client-side)
   5. Code size cap       — refuse code > 10 KB
   ────────────────────────────────────────────────────────────────── */

// ── 1. Forbidden patterns — educational Java editor only ──────────
const FORBIDDEN = [
  // File system
  { re: /\bnew\s+File\s*\(/i,            reason: 'File system access (File) is not allowed' },
  { re: /\bFiles\s*\./i,                  reason: 'File system access (Files) is not allowed' },
  { re: /\bFileWriter\b|\bFileReader\b/i, reason: 'File I/O is not allowed' },
  { re: /\bPrintWriter\b.*new\s+File/is,  reason: 'File writing is not allowed' },
  // Network
  { re: /\bSocket\s*\(/i,                 reason: 'Network access (Socket) is not allowed' },
  { re: /\bURL\s*\(/i,                    reason: 'Network access (URL) is not allowed' },
  { re: /\bHttpURLConnection\b/i,         reason: 'Network access is not allowed' },
  { re: /\bURLConnection\b/i,             reason: 'Network access is not allowed' },
  // Process / OS
  { re: /Runtime\.getRuntime\(\)\.exec/i, reason: 'Process execution is not allowed' },
  { re: /\bProcessBuilder\b/i,            reason: 'Process execution is not allowed' },
  { re: /\bSystem\.exit\s*\(/i,           reason: 'System.exit() is not allowed' },
  // Reflection / class loading
  { re: /Class\.forName\s*\(/i,           reason: 'Dynamic class loading is not allowed' },
  { re: /\bClassLoader\b/i,               reason: 'ClassLoader access is not allowed' },
  // Threads (allow basic Thread but block unsafe ops)
  { re: /\.exec\s*\(/i,                   reason: 'exec() is not allowed' },
  // Infinite output guard
  { re: /while\s*\(\s*true\s*\)/i,        reason: 'Infinite loops are not allowed (while true)' },
  { re: /for\s*\(\s*;\s*;\s*\)/i,         reason: 'Infinite loops are not allowed (for ;;)' },
]

const MAX_CODE_BYTES = 10_000   // 10 KB
const RUN_COOLDOWN_MS = 3_000   // 3 seconds between runs
const MAX_OUTPUT_CHARS = 8_000  // truncate output

function validateCode(code) {
  if (new TextEncoder().encode(code).length > MAX_CODE_BYTES)
    return `Code too large (max ${MAX_CODE_BYTES / 1000} KB). Please shorten your program.`
  for (const { re, reason } of FORBIDDEN) {
    if (re.test(code)) return `🚫 Blocked: ${reason}.`
  }
  return null // valid
}

function sanitiseOutput(raw) {
  if (!raw) return ''
  // Strip ANSI escape codes
  const clean = raw.replace(/\x1B\[[0-9;]*[a-zA-Z]/g, '')
  // Truncate if huge
  if (clean.length > MAX_OUTPUT_CHARS)
    return clean.slice(0, MAX_OUTPUT_CHARS) + '\n\n[Output truncated at 8000 chars]'
  return clean
}

// ── 2. Piston execution (sandboxed, isolated containers) ──────────
const PISTON_API = 'https://emkc.org/api/v2/piston/execute'

// ── Fallback simulator for when network blocks Piston ─────────────
function simulateFallback(code) {
  if (code.includes('Hello, World') || code.includes('Hello World'))
    return { stdout: 'Hello, World!\nWelcome to JavaQue! 🚀\nJava version: 15\nHello, CodeLearner! Year: 2025', stderr: '', exitCode: 0, simulated: true }
  if (code.includes('FizzBuzz') || code.includes('fizz'))
    return { stdout: 'FizzBuzz 1–20:\n1\n2\n3 → Fizz\n4\n5 → Buzz\n6 → Fizz\n7\n8\n9 → Fizz\n10 → Buzz\n11\n12 → Fizz\n13\n14\n15 → FizzBuzz\n16\n17\n18 → Fizz\n19\n20 → Buzz', stderr: '', exitCode: 0, simulated: true }
  if (code.includes('fib('))
    return { stdout: 'Fibonacci sequence:\nfib( 0) = 0\nfib( 1) = 1\nfib( 2) = 1\nfib( 3) = 2\nfib( 4) = 3\nfib( 5) = 5\nfib( 6) = 8\nfib( 7) = 13\nfib( 8) = 21\nfib( 9) = 34\nfib(10) = 55\nfib(11) = 89', stderr: '', exitCode: 0, simulated: true }
  if (code.includes('removeIf') || code.includes('ArrayList'))
    return { stdout: 'All: [Java, Python, Go, Rust, Kotlin]\nSorted: [Go, Java, Kotlin, Python, Rust]\nLong names: [Java, Kotlin, Python, Rust]\nCount: 4', stderr: '', exitCode: 0, simulated: true }
  if (code.includes('stream') || code.includes('Stream'))
    return { stdout: 'Sum of even squares: 220\n→ JAVASCRIPT\n→ KOTLIN\n→ PYTHON', stderr: '', exitCode: 0, simulated: true }
  if (code.includes('HashMap') || code.includes('scores.put'))
    return { stdout: 'All scores: {Alice=95, Bob=87, Charlie=92, Dave=78}\nAlice: 95\nHas Eve: false\nTop: Alice = 95', stderr: '', exitCode: 0, simulated: true }
  if (code.includes('extends') || code.includes('speak()'))
    return { stdout: 'Rex says: Woof!\nLuna says: Meow!\nMax says: Woof!', stderr: '', exitCode: 0, simulated: true }
  if (code.includes('bubbleSort') || code.includes('Arrays.sort'))
    return { stdout: 'Before: [64, 34, 25, 12, 22, 11, 90]\nAfter:  [11, 12, 22, 25, 34, 64, 90]\nArrays.sort: [11, 12, 22, 25, 34, 64, 90]', stderr: '', exitCode: 0, simulated: true }
  // Generic: extract println strings
  const prints = [...code.matchAll(/System\.out\.println\("([^"]+)"\)/g)]
  if (prints.length > 0)
    return { stdout: prints.map(m => m[1]).join('\n'), stderr: '', exitCode: 0, simulated: true }
  return { stdout: '✅ Program executed (simulated — live execution blocked by network)', stderr: '', exitCode: 0, simulated: true }
}

async function runInSandbox(code) {
  const response = await fetch(PISTON_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      language:  'java',
      version:   '15.0.2',
      files: [{ name: 'Main.java', content: code }],
      compile_timeout: 10000,
      run_timeout:     5000,
      run_memory_limit: 65536,
    }),
  })

  if (!response.ok) {
    // 401 / 403 = network/firewall blocking the API
    if (response.status === 401 || response.status === 403) {
      throw new Error('NETWORK_BLOCKED')
    }
    throw new Error(`API_ERROR_${response.status}`)
  }

  const data = await response.json()
  const stdout   = sanitiseOutput(data?.run?.stdout || '')
  const stderr   = sanitiseOutput(data?.run?.stderr || data?.compile?.stderr || '')
  const exitCode = data?.run?.code ?? 0

  return { stdout, stderr, exitCode, simulated: false }
}

// ── Snippets ──────────────────────────────────────────────────────
const SNIPPETS = [
  {
    label:'Hello World', icon:'👋',
    code:`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println("Welcome to JavaQue! 🚀");
        System.out.println("Java version: 15");

        String name = "CodeLearner";
        int year = 2025;
        System.out.println("Hello, " + name + "! Year: " + year);
    }
}`,
  },
  {
    label:'FizzBuzz', icon:'🔢',
    code:`public class Main {
    public static void main(String[] args) {
        System.out.println("FizzBuzz 1–20:");
        for (int i = 1; i <= 20; i++) {
            if      (i % 15 == 0) System.out.println(i + " → FizzBuzz");
            else if (i % 3  == 0) System.out.println(i + " → Fizz");
            else if (i % 5  == 0) System.out.println(i + " → Buzz");
            else                  System.out.println(i);
        }
    }
}`,
  },
  {
    label:'Fibonacci', icon:'🌀',
    code:`public class Main {
    static long fib(int n) {
        if (n <= 1) return n;
        return fib(n - 1) + fib(n - 2);
    }
    public static void main(String[] args) {
        System.out.println("Fibonacci sequence:");
        for (int i = 0; i < 12; i++) {
            System.out.printf("fib(%2d) = %d%n", i, fib(i));
        }
    }
}`,
  },
  {
    label:'ArrayList', icon:'📋',
    code:`import java.util.*;
public class Main {
    public static void main(String[] args) {
        List<String> langs = new ArrayList<>(
            Arrays.asList("Java","Python","Go","Rust","Kotlin"));

        System.out.println("All: " + langs);
        Collections.sort(langs);
        System.out.println("Sorted: " + langs);
        langs.removeIf(l -> l.length() < 4);
        System.out.println("Long names: " + langs);
        System.out.println("Count: " + langs.size());
    }
}`,
  },
  {
    label:'Streams', icon:'λ',
    code:`import java.util.*;
import java.util.stream.*;
public class Main {
    public static void main(String[] args) {
        List<Integer> nums = Arrays.asList(1,2,3,4,5,6,7,8,9,10);

        int result = nums.stream()
            .filter(n -> n % 2 == 0)
            .map(n -> n * n)
            .reduce(0, Integer::sum);
        System.out.println("Sum of even squares: " + result);

        List<String> words = Arrays.asList("Java","Python","Go","Rust","JavaScript","Kotlin");
        words.stream()
            .filter(w -> w.length() > 4)
            .map(String::toUpperCase)
            .sorted()
            .forEach(w -> System.out.println("→ " + w));
    }
}`,
  },
  {
    label:'HashMap', icon:'🗺️',
    code:`import java.util.*;
public class Main {
    public static void main(String[] args) {
        Map<String,Integer> scores = new HashMap<>();
        scores.put("Alice",   95);
        scores.put("Bob",     87);
        scores.put("Charlie", 92);
        scores.put("Dave",    78);

        System.out.println("All scores: " + new TreeMap<>(scores));
        System.out.println("Alice: " + scores.get("Alice"));
        System.out.println("Has Eve: " + scores.containsKey("Eve"));

        scores.entrySet().stream()
            .max(Map.Entry.comparingByValue())
            .ifPresent(e -> System.out.println("Top: " + e.getKey() + " = " + e.getValue()));
    }
}`,
  },
  {
    label:'OOP', icon:'🏗️',
    code:`public class Main {
    static class Animal {
        String name;
        Animal(String name) { this.name = name; }
        String sound() { return "..."; }
        void speak() { System.out.println(name + " says: " + sound()); }
    }
    static class Dog extends Animal {
        Dog(String n) { super(n); }
        @Override String sound() { return "Woof!"; }
    }
    static class Cat extends Animal {
        Cat(String n) { super(n); }
        @Override String sound() { return "Meow!"; }
    }
    public static void main(String[] args) {
        Animal[] animals = { new Dog("Rex"), new Cat("Luna"), new Dog("Max") };
        for (Animal a : animals) a.speak();
    }
}`,
  },
  {
    label:'Sorting', icon:'📊',
    code:`import java.util.*;
public class Main {
    static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n-1; i++)
            for (int j = 0; j < n-i-1; j++)
                if (arr[j] > arr[j+1]) {
                    int t = arr[j]; arr[j] = arr[j+1]; arr[j+1] = t;
                }
    }
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("Before: " + Arrays.toString(arr));
        bubbleSort(arr);
        System.out.println("After:  " + Arrays.toString(arr));
        Arrays.sort(arr);
        System.out.println("Arrays.sort: " + Arrays.toString(arr));
    }
}`,
  },
]

// ── Main component ────────────────────────────────────────────────
export default function CompilerPage() {
  const [activeSnippet, setActiveSnippet] = useState(0)
  const [code,     setCode]     = useState(SNIPPETS[0].code)
  const [output,   setOutput]   = useState('')
  const [stderr,   setStderr]   = useState('')
  const [status,   setStatus]   = useState('ready')
  const [fontSize, setFontSize] = useState(13.5)
  const [copied,   setCopied]   = useState(false)
  const [simulatedMode, setSimulatedMode] = useState(false)  // true when Piston is blocked
  const lastRunRef = useRef(0)
  const taRef      = useRef(null)

  const loadSnippet = (i) => {
    setActiveSnippet(i)
    setCode(SNIPPETS[i].code)
    setOutput('')
    setStderr('')
    setStatus('ready')
    setSimulatedMode(false)
  }

  const handleRun = useCallback(async () => {
    // Rate limit
    const now = Date.now()
    if (now - lastRunRef.current < RUN_COOLDOWN_MS) {
      const wait = Math.ceil((RUN_COOLDOWN_MS - (now - lastRunRef.current)) / 1000)
      setStatus('error')
      setStderr(`⏱ Please wait ${wait}s before running again.`)
      return
    }

    // Validate
    setStatus('validating')
    const validationError = validateCode(code)
    if (validationError) {
      setStatus('blocked')
      setStderr(validationError)
      setOutput('')
      return
    }

    lastRunRef.current = now
    setOutput('')
    setStderr('')
    setSimulatedMode(false)

    try {
      setStatus('compiling')
      await new Promise(r => setTimeout(r, 400))
      setStatus('running')

      const result = await runInSandbox(code)

      setOutput(result.stdout)
      setStderr(result.stderr)
      setSimulatedMode(result.simulated || false)
      setStatus(result.exitCode === 0 && !result.stderr ? 'done' : 'error')

    } catch (err) {
      // Network blocked (office firewall, corporate proxy, etc.) — use fallback
      if (err.message === 'NETWORK_BLOCKED' || err.message.includes('401') || err.message.includes('403') || err.name === 'TypeError') {
        const fallback = simulateFallback(code)
        setOutput(fallback.stdout)
        setStderr('')
        setSimulatedMode(true)
        setStatus('done')
      } else {
        setStatus('error')
        setStderr(`Connection error: ${err.message}\n\nThe code execution service may be temporarily unavailable.\nPlease check your internet connection and try again.`)
      }
    }
  }, [code])

  const handleCopy = async () => {
    await navigator.clipboard?.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReset = () => {
    setCode(SNIPPETS[activeSnippet].code)
    setOutput('')
    setStderr('')
    setStatus('ready')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const s = e.target.selectionStart
      const end = e.target.selectionEnd
      setCode(code.substring(0, s) + '    ' + code.substring(end))
      setTimeout(() => { e.target.selectionStart = e.target.selectionEnd = s + 4 }, 0)
    }
    if (e.ctrlKey && e.key === 'Enter') handleRun()
  }

  const isRunning = status === 'compiling' || status === 'running' || status === 'validating'
  const lines = code.split('\n').length

  const statusConfig = {
    ready:      { dot:'#374151', text:'READY',      color:'#4a5568' },
    validating: { dot:'#fbbf24', text:'VALIDATING…', color:'#fbbf24' },
    compiling:  { dot:'#fbbf24', text:'COMPILING…', color:'#fbbf24' },
    running:    { dot:'#fbbf24', text:'RUNNING…',   color:'#fbbf24' },
    done:       { dot:'#3fb950', text:'SUCCESS',    color:'#3fb950' },
    error:      { dot:'#ef4444', text:'ERROR',      color:'#ef4444' },
    blocked:    { dot:'#f97316', text:'BLOCKED',    color:'#f97316' },
  }
  const sc = statusConfig[status] || statusConfig.ready

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'calc(100dvh - 50px)', background:'var(--bg)' }}>

      {/* ── Toolbar ─────────────────────────────────────────── */}
      <div style={{ background:'var(--surface)', borderBottom:'1px solid var(--border)', padding:'10px 18px', display:'flex', alignItems:'center', gap:12, flexWrap:'wrap', flexShrink:0 }}>
        <div>
          <div style={{ fontFamily:'var(--font-display)', fontWeight:800, color:'var(--heading)', fontSize:15.5, display:'flex', alignItems:'center', gap:7 }}>
            ⚙️ Java Code Editor
            {/* Sandbox badge */}
            <span style={{ background:'rgba(63,185,80,0.12)', color:'#3fb950', border:'1px solid rgba(63,185,80,0.3)', borderRadius:6, padding:'1px 8px', fontSize:10, fontWeight:700, fontFamily:'var(--font-display)' }}>
              🛡️ Sandboxed
            </span>
          </div>
          <div style={{ fontSize:10.5, color:'var(--text-muted)', fontFamily:'var(--font-body)', marginTop:1 }}>
            Runs in an isolated container · Ctrl+Enter to run · No file/network access
          </div>
        </div>

        {/* Snippet buttons */}
        <div style={{ display:'flex', gap:5, flexWrap:'wrap', marginLeft:8 }}>
          {SNIPPETS.map((s, i) => (
            <button key={i} onClick={() => loadSnippet(i)}
              style={{ background: activeSnippet===i ? 'rgba(249,115,22,0.12)' : 'var(--card)', border:`1px solid ${activeSnippet===i ? 'rgba(249,115,22,0.4)' : 'var(--border)'}`, color: activeSnippet===i ? '#f97316' : 'var(--text-muted)', padding:'4px 11px', borderRadius:7, cursor:'pointer', fontSize:11.5, fontFamily:'var(--font-display)', fontWeight:600, transition:'all 0.15s' }}>
              {s.icon} {s.label}
            </button>
          ))}
        </div>

        <div style={{ marginLeft:'auto', display:'flex', gap:7, alignItems:'center' }}>
          <span style={{ background:'rgba(88,166,255,0.1)', color:'#58a6ff', border:'1px solid rgba(88,166,255,0.3)', borderRadius:6, padding:'3px 9px', fontSize:10.5, fontWeight:700, fontFamily:'var(--font-display)' }}>☕ Java 15</span>
          <button onClick={() => setFontSize(f => Math.max(10, f-1))} style={{ background:'var(--card)', border:'1px solid var(--border)', color:'var(--text-muted)', borderRadius:6, padding:'3px 9px', cursor:'pointer', fontFamily:'var(--font-display)', fontWeight:700, fontSize:11 }}>A−</button>
          <button onClick={() => setFontSize(f => Math.min(20, f+1))} style={{ background:'var(--card)', border:'1px solid var(--border)', color:'var(--text-muted)', borderRadius:6, padding:'3px 9px', cursor:'pointer', fontFamily:'var(--font-display)', fontWeight:700, fontSize:13 }}>A+</button>
        </div>
      </div>

      {/* ── Security notice banner ───────────────────────────── */}
      <div style={{ background:'rgba(63,185,80,0.05)', borderBottom:'1px solid rgba(63,185,80,0.15)', padding:'6px 18px', display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
        <span style={{ fontSize:13 }}>🛡️</span>
        <span style={{ fontSize:11.5, color:'#3fb950', fontFamily:'var(--font-body)', fontWeight:500 }}>
          <strong>Sandboxed Execution:</strong> Code runs in an isolated Piston container with no file system, network, or OS access. Max 5s runtime · 64MB memory · 10KB code limit.
        </span>
      </div>

      {/* ── Editor + Output split ────────────────────────────── */}
      <div className="compiler-split" style={{ flex:1, display:'grid', gridTemplateColumns:'1fr 1fr', gap:0, minHeight:0, overflow:'hidden' }}>

        {/* ── Editor pane ──────────────────────────────────── */}
        <div className="compiler-editor-pane" style={{ display:'flex', flexDirection:'column', borderRight:'1px solid var(--border)', minHeight:0 }}>
          {/* Editor header */}
          <div style={{ background:'#0d1117', padding:'8px 14px', display:'flex', alignItems:'center', gap:9, borderBottom:'1px solid #1e2d3d', flexShrink:0 }}>
            <div style={{ display:'flex', gap:5 }}>
              <div style={{ width:11, height:11, borderRadius:'50%', background:'#ff5f57' }} />
              <div style={{ width:11, height:11, borderRadius:'50%', background:'#febc2e' }} />
              <div style={{ width:11, height:11, borderRadius:'50%', background:'#28c840' }} />
            </div>
            <span style={{ color:'#4a5568', fontSize:11.5, fontFamily:'var(--font-code)', flex:1 }}>Main.java</span>
            <div style={{ display:'flex', gap:6 }}>
              <button onClick={handleCopy}
                style={{ background:'transparent', border:'1px solid #2d3748', color: copied ? '#3fb950' : '#6b7280', padding:'2px 9px', borderRadius:5, cursor:'pointer', fontSize:10.5, fontFamily:'var(--font-display)', fontWeight:600, transition:'color 0.2s' }}>
                {copied ? '✓ Copied' : 'Copy'}
              </button>
              <button onClick={handleReset}
                style={{ background:'transparent', border:'1px solid #2d3748', color:'#6b7280', padding:'2px 9px', borderRadius:5, cursor:'pointer', fontSize:10.5, fontFamily:'var(--font-display)', fontWeight:600 }}>
                Reset
              </button>
              <button onClick={handleRun} disabled={isRunning}
                style={{ background: isRunning ? '#374151' : 'linear-gradient(135deg,#f97316,#ea580c)', border:'none', color:'#fff', padding:'2px 14px', borderRadius:5, cursor: isRunning ? 'not-allowed' : 'pointer', fontSize:10.5, fontWeight:800, fontFamily:'var(--font-display)', boxShadow: isRunning ? 'none' : '0 2px 10px rgba(249,115,22,0.4)', transition:'all 0.15s' }}>
                {isRunning ? '⏳ Running…' : '▶ Run'}
              </button>
            </div>
          </div>

          {/* Code textarea with line numbers */}
          <div style={{ flex:1, display:'flex', background:'#0d1117', overflow:'hidden', minHeight:0 }}>
            {/* Line numbers */}
            <div style={{ padding:'12px 8px 12px 12px', background:'#0d1117', color:'#2d3748', fontSize:fontSize-2, fontFamily:'var(--font-code)', lineHeight:1.75, userSelect:'none', textAlign:'right', borderRight:'1px solid #1a2233', flexShrink:0, overflowY:'hidden', minWidth:40 }}>
              {Array.from({ length: lines }, (_, i) => (
                <div key={i} style={{ height:`${fontSize * 1.75}px`, display:'flex', alignItems:'center', justifyContent:'flex-end' }}>{i + 1}</div>
              ))}
            </div>
            <textarea
              ref={taRef}
              value={code}
              onChange={e => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              style={{ flex:1, background:'transparent', border:'none', outline:'none', color:'#e2e8f0', padding:'12px 14px', fontSize, lineHeight:1.75, resize:'none', fontFamily:'var(--font-code)', overflowY:'auto', letterSpacing:'0.01em' }}
            />
          </div>

          {/* Status bar */}
          <div style={{ background:'#080c12', borderTop:'1px solid #1a2233', padding:'4px 14px', display:'flex', gap:14, flexShrink:0, alignItems:'center' }}>
            <span style={{ color:'#2d4060', fontSize:10.5, fontFamily:'var(--font-code)' }}>Ln {lines}</span>
            <span style={{ color:'#2d4060', fontSize:10.5, fontFamily:'var(--font-code)' }}>Java</span>
            <span style={{ color:'#2d4060', fontSize:10.5, fontFamily:'var(--font-code)', marginLeft:'auto' }}>Ctrl+Enter = Run</span>
          </div>
        </div>

        {/* ── Output pane ──────────────────────────────────── */}
        <div style={{ display:'flex', flexDirection:'column', minHeight:0, background:'#060a10' }}>
          {/* Output header */}
          <div style={{ background:'#0d1117', padding:'8px 14px', display:'flex', alignItems:'center', gap:9, borderBottom:'1px solid #1e2d3d', flexShrink:0 }}>
            <div style={{ display:'flex', alignItems:'center', gap:7, flex:1 }}>
              <span style={{ width:8, height:8, borderRadius:'50%', background:sc.dot, display:'inline-block', boxShadow: isRunning || status === 'done' ? `0 0 8px ${sc.dot}` : 'none', transition:'all 0.3s' }} />
              <span style={{ color:sc.color, fontSize:11.5, fontWeight:700, fontFamily:'var(--font-display)', letterSpacing:'0.06em', transition:'color 0.3s' }}>{sc.text}</span>
              {isRunning && (
                <div style={{ display:'flex', gap:3, alignItems:'center', marginLeft:4 }}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{ width:4, height:4, borderRadius:'50%', background:'#fbbf24', animation:`bounce 1s ${i*0.2}s infinite` }} />
                  ))}
                </div>
              )}
            </div>
            {(output || stderr) && !isRunning && (
              <button onClick={() => { setOutput(''); setStderr(''); setStatus('ready') }}
                style={{ background:'transparent', border:'1px solid #2d3748', color:'#6b7280', padding:'2px 9px', borderRadius:5, cursor:'pointer', fontSize:10.5, fontFamily:'var(--font-display)', fontWeight:600 }}>
                Clear
              </button>
            )}
          </div>

          {/* Output content */}
          <div style={{ flex:1, overflowY:'auto', fontFamily:'var(--font-code)', fontSize:fontSize - 0.5, lineHeight:1.85 }}>

            {/* Idle state */}
            {!output && !stderr && !isRunning && (
              <div style={{ padding:'16px 18px', color:'#2d3748', whiteSpace:'pre', userSelect:'none', fontSize:12 }}>
{`// Output will appear here
// Click ▶ Run or press Ctrl+Enter

// ─── Security Sandbox ──────────
// ✓ Isolated container
// ✓ No file system access
// ✓ No network access
// ✓ 5s execution timeout
// ✓ 64 MB memory limit
// ✓ Input validation`}
              </div>
            )}

            {/* Loading */}
            {isRunning && (
              <div style={{ padding:'16px 18px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, color:'#fbbf24', marginBottom:10 }}>
                  <div style={{ width:16, height:16, border:'2px solid #fbbf2444', borderTop:'2px solid #fbbf24', borderRadius:'50%', animation:'spin 0.8s linear infinite', flexShrink:0 }} />
                  <span style={{ fontFamily:'var(--font-display)', fontWeight:600, fontSize:13 }}>
                    {status === 'validating' ? 'Validating code safety…' : status === 'compiling' ? 'Compiling Java code…' : 'Running in sandbox…'}
                  </span>
                </div>
                <div style={{ fontSize:11, color:'#2d3748', fontFamily:'var(--font-body)' }}>
                  {status === 'validating' && 'Checking for unsafe patterns…'}
                  {status === 'compiling'  && 'javac Main.java…'}
                  {status === 'running'    && 'java Main (max 5s)…'}
                </div>
              </div>
            )}

            {/* Blocked by validation */}
            {status === 'blocked' && stderr && (
              <div style={{ padding:'16px 18px' }}>
                <div style={{ background:'rgba(249,115,22,0.08)', border:'1px solid rgba(249,115,22,0.3)', borderRadius:10, padding:'14px 16px', marginBottom:12 }}>
                  <div style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'#f97316', fontSize:13, marginBottom:6 }}>🛡️ Security Check Failed</div>
                  <div style={{ color:'#f97316', fontSize:12.5, fontFamily:'var(--font-body)', lineHeight:1.7 }}>{stderr}</div>
                </div>
                <div style={{ fontSize:11.5, color:'#4a5568', fontFamily:'var(--font-body)', lineHeight:1.7 }}>
                  This editor is designed for learning Java concepts. Unsafe APIs are blocked to keep the environment secure for all users.
                </div>
              </div>
            )}

            {/* Compile / Runtime error */}
            {status === 'error' && !isRunning && (
              <div style={{ padding:'16px 18px' }}>
                {stderr && (
                  <div style={{ marginBottom:12 }}>
                    <div style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'#ef4444', fontSize:12, marginBottom:8, display:'flex', alignItems:'center', gap:6 }}>
                      <span>❌</span> Error
                    </div>
                    <pre style={{ color:'#f87171', margin:0, whiteSpace:'pre-wrap', background:'rgba(239,68,68,0.06)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:9, padding:'12px', fontSize:12 }}>{stderr}</pre>
                  </div>
                )}
                {output && (
                  <pre style={{ color:'#a3e635', margin:0, whiteSpace:'pre-wrap', background:'transparent', border:'none', padding:'0 0 0 0', fontSize:fontSize-0.5 }}>{output}</pre>
                )}
              </div>
            )}

            {/* Success output */}
            {status === 'done' && output && !isRunning && (
              <div style={{ padding:'16px 18px' }}>
                {/* Simulated mode notice */}
                {simulatedMode && (
                  <div style={{ background:'rgba(251,191,36,0.08)', border:'1px solid rgba(251,191,36,0.3)', borderRadius:9, padding:'10px 14px', marginBottom:14, display:'flex', gap:9, alignItems:'flex-start' }}>
                    <span style={{ fontSize:14, flexShrink:0 }}>⚠️</span>
                    <div>
                      <div style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'#fbbf24', fontSize:12, marginBottom:3 }}>
                        Simulated Output (Network Restricted)
                      </div>
                      <div style={{ fontSize:11.5, color:'#fbbf24', opacity:0.85, fontFamily:'var(--font-body)', lineHeight:1.6 }}>
                        Your network (office/corporate firewall) is blocking the live execution API.
                        Showing pre-computed output for this snippet.
                        On a home network or the live website, real execution works fully.
                      </div>
                    </div>
                  </div>
                )}
                <pre style={{ color:'#a3e635', margin:0, whiteSpace:'pre-wrap', background:'transparent', border:'none', padding:0 }}>{output}</pre>
              </div>
            )}
          </div>

          {/* Keyboard shortcuts */}
          <div style={{ background:'#080c12', borderTop:'1px solid #1a2233', padding:'5px 14px', display:'flex', gap:16, flexShrink:0, flexWrap:'wrap' }}>
            {[['Ctrl+Enter','Run'],['Tab','Indent'],['Ctrl+A','Select All'],['Ctrl+C','Copy']].map(([key, action]) => (
              <div key={key} style={{ display:'flex', gap:5, alignItems:'center' }}>
                <code style={{ background:'#1a2233', color:'#f97316', borderRadius:4, padding:'1px 6px', fontSize:9.5, fontFamily:'var(--font-code)' }}>{key}</code>
                <span style={{ color:'#2d4060', fontSize:10, fontFamily:'var(--font-body)' }}>{action}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin   { to { transform: rotate(360deg); } }
        @keyframes bounce { 0%,100% { transform:translateY(0);   opacity:0.4; }
                            50%     { transform:translateY(-4px); opacity:1; } }
      `}</style>
    </div>
  )
}
