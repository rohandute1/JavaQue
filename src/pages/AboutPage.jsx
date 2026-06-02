import { Link } from 'react-router-dom'

export default function AboutPage() {
  const team = [
    { name: 'JavaQue Team', role: 'Platform Development', avatar: '👨‍💻', bio: 'Passionate Java developers who believe quality education should be free and accessible to everyone.' },
    { name: 'Content Authors', role: 'Curriculum Design', avatar: '📚', bio: 'Experienced Java professionals with years of industry and teaching experience.' },
    { name: 'Community', role: 'Feedback & Testing', avatar: '🌐', bio: 'Thousands of learners worldwide who help improve JavaQue every day.' },
  ]

  const stats = [
    { val: '58+',   label: 'In-depth Topics' },
    { val: '8',     label: 'Learning Modules' },
    { val: '230+',  label: 'Quiz Questions' },
    { val: '100%',  label: 'Free Forever' },
  ]

  const values = [
    { icon: '🆓', title: 'Free Forever', desc: 'Every lesson, quiz, and project on JavaQue is completely free. No paywalls, no premium tiers — just learning.' },
    { icon: '📖', title: 'Beginner Friendly', desc: 'We start from absolute zero. No prior programming experience needed. Every concept is explained with clear language and real examples.' },
    { icon: '⚡', title: 'Learn by Doing', desc: 'Every topic includes runnable code examples, quizzes, and a built-in code editor so you practice while you learn.' },
    { icon: '🎯', title: 'Interview Ready', desc: 'Beyond basics — we cover DSA, design patterns, multithreading, and curated interview questions used at top tech companies.' },
    { icon: '🌙', title: 'No Account Needed', desc: 'Your progress is saved locally in your browser. No sign-up, no email, no tracking. Start learning immediately.' },
    { icon: '📱', title: 'Works Everywhere', desc: 'Fully responsive design. Learn on your laptop, tablet, or phone — JavaQue adapts to any screen size.' },
  ]

  return (
    <div style={{ minHeight: '100%', background: 'var(--bg)' }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg,#0d1117,#111827,#0f1a2e)', borderBottom: '1px solid var(--border)', padding: '52px 36px 48px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position:'absolute', top:-80, right:-60, width:320, height:320, borderRadius:'50%', background:'radial-gradient(circle,rgba(249,115,22,0.1) 0%,transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'relative', maxWidth: 760 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(249,115,22,0.1)', border:'1px solid rgba(249,115,22,0.3)', borderRadius:999, padding:'5px 14px', marginBottom:20 }}>
            <span style={{ fontSize:11, fontWeight:700, color:'#f97316', letterSpacing:1, fontFamily:'var(--font-display)' }}>ABOUT JAVAQUE</span>
          </div>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,4vw,42px)', fontWeight:800, color:'#e6edf3', marginBottom:16, lineHeight:1.2, letterSpacing:'-0.03em' }}>
            We're on a mission to make<br />
            <span style={{ background:'linear-gradient(90deg,#f97316,#fbbf24)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              Java education free for everyone.
            </span>
          </h1>
          <p style={{ color:'#8b9db0', fontSize:16, lineHeight:1.8, maxWidth:620, fontFamily:'var(--font-body)' }}>
            JavaQue was built because we believe that learning to code — specifically Java — shouldn't require expensive bootcamps,
            subscriptions, or sitting through hours of filler content. Great Java education should be structured, practical, and completely free.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '44px 36px' }}>

        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))', gap:14, marginBottom:52 }}>
          {stats.map((s,i) => (
            <div key={i} style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:14, padding:'22px 16px', textAlign:'center' }}>
              <div style={{ fontFamily:'var(--font-display)', fontSize:30, fontWeight:800, color:'#f97316', letterSpacing:'-0.03em' }}>{s.val}</div>
              <div style={{ fontSize:12.5, color:'var(--text-muted)', marginTop:5, fontFamily:'var(--font-body)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Story */}
        <div style={{ marginBottom:52 }}>
          <h2 style={{ fontFamily:'var(--font-display)', fontWeight:800, color:'var(--heading)', fontSize:22, marginBottom:20 }}>Our Story</h2>
          <div style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:16, padding:'28px 32px' }}>
            <p style={{ color:'var(--text)', fontSize:15, lineHeight:1.9, fontFamily:'var(--font-body)', marginBottom:16 }}>
              JavaQue started as a personal project to create the best free Java learning resource on the internet. Having gone through the frustration
              of scattered tutorials, incomplete documentation, and expensive courses, we set out to build something different — a structured, comprehensive,
              beginner-to-advanced Java curriculum that anyone could access for free.
            </p>
            <p style={{ color:'var(--text)', fontSize:15, lineHeight:1.9, fontFamily:'var(--font-body)', marginBottom:16 }}>
              Today, JavaQue offers <strong style={{ color:'var(--heading)' }}>58 in-depth topics</strong> covering everything from basic syntax
              to advanced concepts like multithreading, generics, and design patterns — plus dedicated Data Structures & Algorithms content and
              curated interview preparation material used at companies like Google, Amazon, and Microsoft.
            </p>
            <p style={{ color:'var(--text)', fontSize:15, lineHeight:1.9, fontFamily:'var(--font-body)' }}>
              Every topic includes theory explained in plain English, practical code examples you can run directly in the browser, quizzes to test understanding,
              and real-world usage context. We track your progress locally, require no account, and will <strong style={{ color:'var(--heading)' }}>always be free</strong>.
            </p>
          </div>
        </div>

        {/* What makes us different */}
        <div style={{ marginBottom:52 }}>
          <h2 style={{ fontFamily:'var(--font-display)', fontWeight:800, color:'var(--heading)', fontSize:22, marginBottom:20 }}>What Makes JavaQue Different</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:14 }}>
            {values.map((v,i) => (
              <div key={i} style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:14, padding:'22px' }}>
                <div style={{ fontSize:28, marginBottom:12 }}>{v.icon}</div>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--heading)', fontSize:15, marginBottom:8 }}>{v.title}</div>
                <div style={{ color:'var(--text-muted)', fontSize:13.5, lineHeight:1.7, fontFamily:'var(--font-body)' }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* What you'll find */}
        <div style={{ marginBottom:52 }}>
          <h2 style={{ fontFamily:'var(--font-display)', fontWeight:800, color:'var(--heading)', fontSize:22, marginBottom:20 }}>What's Inside JavaQue</h2>
          <div style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:16, padding:'28px 32px' }}>
            {[
              { mod:'☕ Java Basics', desc:'Variables, data types, operators, control flow, loops, arrays, methods, strings — everything a Java beginner needs.' },
              { mod:'🏗️ OOP Concepts', desc:'Classes, objects, constructors, inheritance, polymorphism, abstraction, encapsulation, interfaces, static keyword.' },
              { mod:'📦 Collections', desc:'ArrayList, LinkedList, HashMap, TreeMap, HashSet, Stack, Queue — with practical usage patterns and performance guidance.' },
              { mod:'🛡️ Exception Handling', desc:'Try-catch, checked vs unchecked exceptions, custom exceptions, finally block, best practices.' },
              { mod:'⚡ Java 8 Features', desc:'Lambda expressions, functional interfaces, Streams API, Optional, method references, Date-Time API.' },
              { mod:'🧵 Multithreading', desc:'Thread lifecycle, synchronization, deadlocks, ExecutorService, CompletableFuture, concurrent collections.' },
              { mod:'🚀 Advanced Java', desc:'Generics, annotations, design patterns (Singleton, Factory, Observer...), File I/O with NIO.2.' },
              { mod:'💼 Interview Prep', desc:'Core Java Q&A, OOP interview questions, Collections deep dive, DSA — Arrays, Strings, Linked Lists, Trees, Sorting, Dynamic Programming.' },
            ].map((item,i) => (
              <div key={i} style={{ display:'flex', gap:12, padding:'13px 0', borderBottom: i < 7 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--heading)', fontSize:13.5, minWidth:190, flexShrink:0 }}>{item.mod}</div>
                <div style={{ color:'var(--text-muted)', fontSize:13.5, lineHeight:1.6, fontFamily:'var(--font-body)' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div style={{ marginBottom:52 }}>
          <h2 style={{ fontFamily:'var(--font-display)', fontWeight:800, color:'var(--heading)', fontSize:22, marginBottom:20 }}>Behind JavaQue</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:14 }}>
            {team.map((m,i) => (
              <div key={i} style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:14, padding:'22px', textAlign:'center' }}>
                <div style={{ fontSize:40, marginBottom:12 }}>{m.avatar}</div>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--heading)', fontSize:15, marginBottom:4 }}>{m.name}</div>
                <div style={{ fontSize:11.5, color:'#f97316', fontWeight:700, fontFamily:'var(--font-display)', marginBottom:10, letterSpacing:0.5 }}>{m.role}</div>
                <div style={{ color:'var(--text-muted)', fontSize:13, lineHeight:1.6, fontFamily:'var(--font-body)' }}>{m.bio}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background:'linear-gradient(135deg,rgba(249,115,22,0.1),rgba(251,191,36,0.08))', border:'1px solid rgba(249,115,22,0.25)', borderRadius:18, padding:'36px', textAlign:'center' }}>
          <div style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:800, color:'var(--heading)', marginBottom:10 }}>Ready to start your Java journey?</div>
          <div style={{ color:'var(--text-muted)', fontSize:14, marginBottom:24, fontFamily:'var(--font-body)' }}>No account needed. No credit card. Just open a topic and start learning.</div>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/learn" style={{ background:'linear-gradient(135deg,#f97316,#ea580c)', color:'#fff', padding:'12px 28px', borderRadius:12, textDecoration:'none', fontFamily:'var(--font-display)', fontWeight:700, fontSize:14 }}>
              Start Learning Free →
            </Link>
            <Link to="/contact" style={{ background:'var(--card)', border:'1px solid var(--border)', color:'var(--text)', padding:'12px 24px', borderRadius:12, textDecoration:'none', fontFamily:'var(--font-display)', fontWeight:600, fontSize:14 }}>
              Contact Us
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
