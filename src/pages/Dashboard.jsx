import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { MODULES, getAllTopics, TOPICS } from '../data/index.js'

/* ─── Reusable Modal ─────────────────────────────────────────── */
function Modal({ open, onClose, title, color, icon, children }) {
  if (!open) return null
  return (
    <div onClick={onClose} style={{ position:'fixed', inset:0, zIndex:1000, background:'rgba(0,0,0,0.7)', backdropFilter:'blur(6px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'16px' }}>
      <div onClick={e => e.stopPropagation()} style={{ background:'var(--surface)', border:`1px solid ${color}44`, borderRadius:20, width:'100%', maxWidth:560, maxHeight:'82vh', display:'flex', flexDirection:'column', boxShadow:`0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px ${color}22`, animation:'modalIn 0.22s cubic-bezier(0.16,1,0.3,1)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, padding:'18px 22px', borderBottom:'1px solid var(--border)', background:`${color}0c`, borderRadius:'20px 20px 0 0', flexShrink:0 }}>
          <div style={{ width:38, height:38, borderRadius:11, background:`${color}22`, border:`1px solid ${color}44`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>{icon}</div>
          <div style={{ fontFamily:'var(--font-display)', fontWeight:800, color:'var(--heading)', fontSize:16, flex:1 }}>{title}</div>
          <button onClick={onClose} style={{ background:'var(--card2)', border:'1px solid var(--border)', color:'var(--text-muted)', width:30, height:30, borderRadius:8, cursor:'pointer', fontSize:14, display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>
        </div>
        <div style={{ overflowY:'auto', padding:'18px 22px', flex:1 }}>{children}</div>
      </div>
    </div>
  )
}

/* ─── Stat card ──────────────────────────────────────────────── */
function StatCard({ icon, value, label, sub, actionLabel, color, onClick }) {
  return (
    <button onClick={onClick} className="hover-lift"
      style={{ background:`${color}0d`, border:`1px solid ${color}30`, borderRadius:16, padding:'18px', cursor:'pointer', position:'relative', overflow:'hidden', textAlign:'left', transition:'all 0.2s', width:'100%' }}
      onMouseEnter={e => { e.currentTarget.style.background=`${color}18`; e.currentTarget.style.borderColor=`${color}60`; e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow=`0 12px 32px ${color}20` }}
      onMouseLeave={e => { e.currentTarget.style.background=`${color}0d`; e.currentTarget.style.borderColor=`${color}30`; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none' }}>
      <div style={{ position:'absolute', top:-10, right:-10, fontSize:46, opacity:0.1, pointerEvents:'none' }}>{icon}</div>
      <div style={{ fontSize:26, marginBottom:8 }}>{icon}</div>
      <div style={{ fontFamily:'var(--font-display)', fontSize:30, fontWeight:800, color, letterSpacing:'-0.03em', lineHeight:1 }}>{value}</div>
      <div style={{ fontSize:13, color:'var(--heading)', fontWeight:700, marginTop:6 }}>{label}</div>
      <div style={{ fontSize:11.5, color:'var(--text-muted)', marginTop:3 }}>{sub}</div>
      <div style={{ fontSize:11, color, marginTop:10, fontWeight:700, fontFamily:'var(--font-display)', display:'flex', alignItems:'center', gap:4 }}>
        {actionLabel} <span style={{ fontSize:10 }}>→</span>
      </div>
    </button>
  )
}

/* ─── Dashboard ──────────────────────────────────────────────── */
export default function Dashboard({ progress, xp, bookmarks, toggleBookmark }) {
  const navigate  = useNavigate()
  const allTopics = getAllTopics()
  const total     = allTopics.length
  const done      = Object.keys(progress).filter(k => progress[k]).length
  const pct       = Math.round((done / total) * 100)

  const [modal, setModal] = useState(null)

  const level =
    xp < 200  ? { name:'Beginner',    next:200,  prev:0,    color:'#4ade80', badge:'🌱' } :
    xp < 600  ? { name:'Learner',     next:600,  prev:200,  color:'#38bdf8', badge:'📘' } :
    xp < 1500 ? { name:'Practitioner',next:1500, prev:600,  color:'#c084fc', badge:'⚡' } :
    xp < 3000 ? { name:'Developer',   next:3000, prev:1500, color:'#fbbf24', badge:'🔥' } :
                { name:'Java Master', next:xp,   prev:3000, color:'#f97316', badge:'🏆' }

  const milestones = [
    { xp:0,    label:'Beginner',    color:'#4ade80', badge:'🌱' },
    { xp:200,  label:'Learner',     color:'#38bdf8', badge:'📘' },
    { xp:600,  label:'Practitioner',color:'#c084fc', badge:'⚡' },
    { xp:1500, label:'Developer',   color:'#fbbf24', badge:'🔥' },
    { xp:3000, label:'Java Master', color:'#f97316', badge:'🏆' },
  ]

  const completedTopics  = allTopics.filter(t => progress[t.id])
  const bookmarkedTopics = allTopics.filter(t => bookmarks.includes(t.id))

  // First incomplete topic per module — for "continue" CTA
  const recommended = MODULES
    .flatMap(m => m.topics.map(topicId => ({ ...m, id: topicId })))
    .filter(t => !progress[t.id])
    .slice(0, 5)

  const levelPct = level.next === xp ? 100 : Math.min(100, Math.round(((xp - level.prev) / (level.next - level.prev)) * 100))

  return (
    <div style={{ minHeight:'100%', background:'var(--bg)' }}>

      {/* ══════════════════════════════════════════════════════ */}
      {/* HERO                                                  */}
      {/* ══════════════════════════════════════════════════════ */}
      <div style={{ background:'linear-gradient(135deg,#0d1117 0%,#0f1a2e 50%,#0d1117 100%)', borderBottom:'1px solid var(--border)', padding:'48px 36px 44px', position:'relative', overflow:'hidden' }}>
        {/* Decorative orbs */}
        <div style={{ position:'absolute', top:-80, right:-40, width:350, height:350, borderRadius:'50%', background:'radial-gradient(circle,rgba(249,115,22,0.13) 0%,transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-80, left:'25%', width:280, height:280, borderRadius:'50%', background:'radial-gradient(circle,rgba(88,166,255,0.08) 0%,transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:30, left:'55%', width:200, height:200, borderRadius:'50%', background:'radial-gradient(circle,rgba(188,140,255,0.07) 0%,transparent 70%)', pointerEvents:'none' }} />

        <div style={{ position:'relative', maxWidth:1000 }}>

          {/* Brand badge */}
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(249,115,22,0.12)', border:'1px solid rgba(249,115,22,0.4)', borderRadius:999, padding:'5px 16px', marginBottom:22 }}>
            <span style={{ width:7, height:7, borderRadius:'50%', background:'#f97316', display:'inline-block', boxShadow:'0 0 8px #f97316', animation:'pulse 2s infinite' }} />
            <img src="/logo.svg" alt="" style={{ width:16, height:16, borderRadius:3, marginLeft:2 }} />
            <span style={{ fontSize:11, fontWeight:700, color:'#f97316', letterSpacing:1, fontFamily:'var(--font-display)' }}>JAVAQUE · FREE JAVA LEARNING PLATFORM</span>
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,4.5vw,50px)', fontWeight:800, color:'#e6edf3', marginBottom:14, lineHeight:1.1, letterSpacing:'-0.04em' }}>
            Master Java,<br />
            <span style={{ background:'linear-gradient(90deg,#f97316,#fbbf24,#fb923c)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              your Java journey starts here.
            </span>
          </h1>
          <p style={{ color:'#7a8fa8', fontSize:16, maxWidth:540, lineHeight:1.85, marginBottom:30, fontFamily:'var(--font-body)' }}>
            58 structured lessons · Built-in code editor · Quizzes after every topic · DSA & Interview prep — all completely free, no account needed.
          </p>

          {/* CTA buttons */}
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            <button onClick={() => navigate('/learn')} className="btn-glow" style={{ padding:'13px 28px', fontSize:14.5, fontFamily:'var(--font-display)', display:'flex', alignItems:'center', gap:8 }}>
              {done > 0 ? '▶ Continue Learning' : '🚀 Start Learning'} →
            </button>
            <button onClick={() => navigate('/compiler')}
              style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.14)', color:'#cdd9e5', padding:'13px 22px', borderRadius:12, cursor:'pointer', fontWeight:600, fontSize:14.5, fontFamily:'var(--font-display)', transition:'all 0.18s', display:'flex', alignItems:'center', gap:7 }}
              onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.11)'}
              onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.06)'}>
              ⚙️ Code Editor
            </button>
            <button onClick={() => navigate('/roadmap')}
              style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.14)', color:'#cdd9e5', padding:'13px 22px', borderRadius:12, cursor:'pointer', fontWeight:600, fontSize:14.5, fontFamily:'var(--font-display)', transition:'all 0.18s', display:'flex', alignItems:'center', gap:7 }}
              onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.11)'}
              onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.06)'}>
              🗺️ Roadmap
            </button>
          </div>

          {/* Stats row */}
          <div style={{ display:'flex', gap:28, marginTop:36, flexWrap:'wrap', paddingTop:28, borderTop:'1px solid rgba(255,255,255,0.06)' }}>
            {[
              { val:'58',   label:'Topics',         icon:'📚' },
              { val:'8',    label:'Modules',         icon:'🗂️' },
              { val:'230+', label:'Quiz Questions',  icon:'🧠' },
              { val:'10',   label:'DSA Patterns',    icon:'🔍' },
              { val:'100%', label:'Free Forever',    icon:'🆓' },
            ].map((s,i) => (
              <div key={i} style={{ textAlign:'center' }}>
                <div style={{ fontSize:13, marginBottom:4 }}>{s.icon}</div>
                <div style={{ fontFamily:'var(--font-display)', fontSize:20, fontWeight:800, color:'#e6edf3' }}>{s.val}</div>
                <div style={{ fontSize:10.5, color:'#5a6e82', marginTop:2, fontWeight:500, letterSpacing:0.3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/* MAIN CONTENT                                          */}
      {/* ══════════════════════════════════════════════════════ */}
      <div style={{ padding:'32px 36px', maxWidth:1100, margin:'0 auto' }}>

        {/* ── 4 Clickable Stat Cards ─────────────────────────── */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(170px,1fr))', gap:14, marginBottom:32 }} className="stagger">
          <StatCard icon="📈" value={`${pct}%`}      label="Progress"   sub={`${done} of ${total} done`}   actionLabel="View details"  color="#f97316" onClick={() => setModal('progress')} />
          <StatCard icon="⚡" value={xp}              label="XP Earned"  sub={`${level.badge} ${level.name}`} actionLabel="View level"  color="#fbbf24" onClick={() => setModal('xp')} />
          <StatCard icon="✅" value={done}             label="Completed"  sub="lessons finished"              actionLabel={done===0?'Start now':'See all'} color="#3fb950" onClick={() => setModal('completed')} />
          <StatCard icon="🔖" value={bookmarks.length} label="Bookmarks"  sub="saved topics"                  actionLabel={bookmarks.length===0?'Save topics':'Manage'} color="#58a6ff" onClick={() => setModal('bookmarks')} />
        </div>

        {/* ── XP Level bar (visible only when xp > 0) ────────── */}
        {xp > 0 && (
          <div style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:16, padding:'18px 22px', marginBottom:28, cursor:'pointer', transition:'all 0.18s' }}
            onClick={() => setModal('xp')}
            onMouseEnter={e => { e.currentTarget.style.borderColor=level.color+'66'; e.currentTarget.style.background='var(--card2)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.background='var(--card)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
              <div style={{ display:'flex', alignItems:'center', gap:9 }}>
                <span style={{ fontSize:18 }}>{level.badge}</span>
                <span style={{ fontFamily:'var(--font-display)', fontWeight:800, color:level.color, fontSize:14 }}>{level.name}</span>
                {level.name !== 'Java Master' && <span style={{ fontSize:12, color:'var(--text-muted)' }}>→ {milestones[milestones.findIndex(m=>m.label===level.name)+1]?.label}</span>}
              </div>
              <span style={{ fontFamily:'var(--font-display)', fontSize:13, fontWeight:700, color:'var(--text-muted)' }}>⚡ {xp} / {level.next} XP · {levelPct}%</span>
            </div>
            <div className="progress-bar" style={{ height:9, borderRadius:999 }}>
              <div className="progress-fill" style={{ width:`${levelPct}%`, background:`linear-gradient(90deg,${level.color},${level.color}99)` }} />
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginTop:7, fontSize:10.5, color:'var(--text-muted)' }}>
              <span>{level.prev} XP</span>
              <span>{level.next} XP</span>
            </div>
          </div>
        )}

        {/* ── Learning Modules grid ────────────────────────────── */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:19, fontWeight:800, color:'var(--heading)', display:'flex', alignItems:'center', gap:8 }}>
            <span>📚</span> Learning Modules
          </h2>
          <Link to="/learn" style={{ background:'transparent', border:'1px solid var(--border)', color:'var(--text-muted)', padding:'6px 14px', borderRadius:8, fontSize:12, fontFamily:'var(--font-display)', fontWeight:600, textDecoration:'none', transition:'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(249,115,22,0.5)'; e.currentTarget.style.color='#f97316' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--text-muted)' }}>
            View All →
          </Link>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:13, marginBottom:32 }} className="stagger">
          {MODULES.map(mod => {
            const modDone = mod.topics.filter(id => progress[id]).length
            const modPct  = Math.round((modDone / mod.topics.length) * 100)
            const nextTopic = mod.topics.find(id => !progress[id]) || mod.topics[0]
            return (
              <Link key={mod.id} to={`/learn/${nextTopic}`} className="hover-lift"
                style={{ display:'block', textDecoration:'none', background:'var(--card)', border:'1px solid var(--border)', borderRadius:15, padding:'18px', transition:'all 0.22s', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${mod.color},${mod.color}55)`, borderRadius:'15px 15px 0 0' }} />
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10, marginTop:4 }}>
                  <div style={{ width:40, height:40, borderRadius:11, background:`${mod.color}18`, border:`1px solid ${mod.color}33`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>{mod.icon}</div>
                  {modDone > 0 && <span style={{ background:`${mod.color}18`, color:mod.color, border:`1px solid ${mod.color}33`, borderRadius:6, padding:'2px 8px', fontSize:11, fontWeight:700, fontFamily:'var(--font-display)' }}>{modPct}%</span>}
                </div>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--heading)', fontSize:13.5, marginBottom:4, lineHeight:1.3 }}>{mod.label}</div>
                <div style={{ fontSize:11.5, color:'var(--text-muted)', marginBottom:12, lineHeight:1.5 }}>{mod.desc}</div>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'var(--text-muted)', marginBottom:7, fontWeight:500 }}>
                  <span>{modDone}/{mod.topics.length} topics</span>
                  <span style={{ color:mod.color, fontWeight:700 }}>{modPct}%</span>
                </div>
                <div className="progress-bar" style={{ height:5 }}>
                  <div style={{ width:`${modPct}%`, background:mod.color, height:'100%', borderRadius:999, transition:'width 0.7s ease' }} />
                </div>
              </Link>
            )
          })}
        </div>

        {/* ── What you'll learn ─────────────────────────────────── */}
        <div style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:18, padding:'26px 30px', marginBottom:28 }}>
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:800, color:'var(--heading)', marginBottom:16, display:'flex', alignItems:'center', gap:8 }}>🎯 What You'll Learn</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(210px,1fr))', gap:10 }}>
            {[
              { icon:'☕', text:'Java syntax, variables, data types & control flow from scratch' },
              { icon:'🏗️', text:'OOP — classes, inheritance, polymorphism, abstraction' },
              { icon:'📦', text:'Collections: ArrayList, HashMap, HashSet, TreeMap & more' },
              { icon:'⚡', text:'Java 8 — Lambdas, Streams, Optional, method references' },
              { icon:'🧵', text:'Multithreading, synchronization, ExecutorService, CompletableFuture' },
              { icon:'🚀', text:'Generics, Design Patterns, File I/O, Annotations' },
              { icon:'💼', text:'Top Java interview Q&A for every major topic' },
              { icon:'🔍', text:'DSA in Java — Arrays, Strings, Linked Lists, Trees, Sorting, DP' },
            ].map((item,i) => (
              <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:10, padding:'11px 13px', background:'var(--card2)', borderRadius:10, border:'1px solid var(--border)', transition:'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(249,115,22,0.3)'; e.currentTarget.style.background='var(--card-hover)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.background='var(--card2)' }}>
                <span style={{ fontSize:16, flexShrink:0, marginTop:1 }}>{item.icon}</span>
                <span style={{ fontSize:12.5, color:'var(--text)', lineHeight:1.6 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Start Here / Continue Learning ───────────────────── */}
        {recommended.length > 0 && (
          <div style={{ marginBottom:28 }}>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:800, color:'var(--heading)', marginBottom:14, display:'flex', alignItems:'center', gap:8 }}>
              🎯 {done === 0 ? 'Start Here' : 'Continue Learning'}
            </h2>
            <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
              {recommended.map((item) => {
                const topic = TOPICS[item.id]
                return (
                  <Link key={item.id} to={`/learn/${item.id}`} className="hover-lift"
                    style={{ display:'flex', alignItems:'center', gap:14, background:'var(--card)', border:'1px solid var(--border)', borderRadius:13, padding:'14px 18px', textDecoration:'none', transition:'all 0.18s', borderLeft:`3px solid ${item.color}` }}>
                    <div style={{ width:38, height:38, borderRadius:10, background:`${item.color}18`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>{topic?.icon || item.icon}</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--heading)', fontSize:13.5, marginBottom:2, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                        {topic?.title || item.id.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase())}
                      </div>
                      <div style={{ fontSize:11.5, color:'var(--text-muted)' }}>{item.label} · {topic?.duration || ''} · {topic?.difficulty || ''}</div>
                    </div>
                    <div style={{ display:'flex', gap:7, alignItems:'center', flexShrink:0 }}>
                      <span style={{ background:'rgba(249,115,22,0.12)', color:'#f97316', border:'1px solid rgba(249,115,22,0.3)', borderRadius:6, padding:'2px 8px', fontSize:11, fontWeight:700 }}>⚡ +{topic?.xp || 0} XP</span>
                      <span style={{ color:'var(--text-muted)', fontSize:16 }}>→</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* ── Bookmarks strip ───────────────────────────────────── */}
        {bookmarks.length > 0 && (
          <div style={{ marginBottom:20 }}>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:800, color:'var(--heading)', marginBottom:12, display:'flex', alignItems:'center', gap:8 }}>🔖 Saved Bookmarks</h2>
            <div style={{ display:'flex', flexWrap:'wrap', gap:9 }}>
              {bookmarks.map(id => {
                const t = allTopics.find(x => x.id === id)
                return (
                  <Link key={id} to={`/learn/${id}`}
                    style={{ background:'var(--card)', border:'1px solid var(--border2)', borderRadius:9, padding:'7px 14px', color:'var(--text)', fontSize:12.5, fontFamily:'var(--font-display)', fontWeight:600, transition:'all 0.15s', display:'flex', alignItems:'center', gap:6, textDecoration:'none' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(249,115,22,0.5)'; e.currentTarget.style.color='#f97316' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border2)'; e.currentTarget.style.color='var(--text)' }}>
                    <span style={{ fontSize:13 }}>{t?.moduleIcon || '🔖'}</span>
                    {id.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase())}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/* MODALS                                                */}
      {/* ══════════════════════════════════════════════════════ */}

      {/* Progress modal */}
      <Modal open={modal==='progress'} onClose={() => setModal(null)} title="Learning Progress" color="#f97316" icon="📈">
        <div style={{ background:'rgba(249,115,22,0.08)', border:'1px solid rgba(249,115,22,0.25)', borderRadius:12, padding:'16px', marginBottom:18 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
            <span style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--heading)' }}>Overall</span>
            <span style={{ fontFamily:'var(--font-display)', fontWeight:800, color:'#f97316', fontSize:22 }}>{pct}%</span>
          </div>
          <div style={{ background:'var(--border)', borderRadius:999, height:10, overflow:'hidden', marginBottom:6 }}>
            <div style={{ width:`${pct}%`, background:'linear-gradient(90deg,#f97316,#fbbf24)', height:'100%', borderRadius:999, transition:'width 0.8s ease' }} />
          </div>
          <div style={{ fontSize:12, color:'var(--text-muted)', textAlign:'right' }}>{done} of {total} topics</div>
        </div>
        <div style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--heading)', fontSize:13, marginBottom:10 }}>Module Breakdown</div>
        <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
          {MODULES.map(mod => {
            const d = mod.topics.filter(id => progress[id]).length
            const p = Math.round((d / mod.topics.length) * 100)
            const next = mod.topics.find(id => !progress[id]) || mod.topics[0]
            return (
              <div key={mod.id} style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:11, padding:'12px 14px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:7 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:7 }}>
                    <span>{mod.icon}</span>
                    <span style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--heading)', fontSize:12.5 }}>{mod.label}</span>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{ fontSize:11.5, color:'var(--text-muted)' }}>{d}/{mod.topics.length}</span>
                    <span style={{ fontFamily:'var(--font-display)', fontWeight:800, color:mod.color, fontSize:12.5 }}>{p}%</span>
                  </div>
                </div>
                <div style={{ background:'var(--border)', borderRadius:999, height:5, overflow:'hidden', marginBottom: d < mod.topics.length ? 7 : 0 }}>
                  <div style={{ width:`${p}%`, background:mod.color, height:'100%', borderRadius:999, transition:'width 0.6s' }} />
                </div>
                {d < mod.topics.length ? (
                  <Link to={`/learn/${next}`} onClick={() => setModal(null)}
                    style={{ fontSize:11, color:mod.color, textDecoration:'none', fontFamily:'var(--font-display)', fontWeight:600 }}>
                    Continue: {next.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase())} →
                  </Link>
                ) : (
                  <span style={{ fontSize:11, color:'#3fb950', fontFamily:'var(--font-display)', fontWeight:700 }}>✓ Complete!</span>
                )}
              </div>
            )
          })}
        </div>
        <Link to="/learn" onClick={() => setModal(null)} style={{ display:'block', background:'linear-gradient(135deg,#f97316,#ea580c)', color:'#fff', borderRadius:11, padding:'12px', textAlign:'center', textDecoration:'none', fontFamily:'var(--font-display)', fontWeight:700, fontSize:13.5, marginTop:18 }}>
          Continue Learning →
        </Link>
      </Modal>

      {/* XP modal */}
      <Modal open={modal==='xp'} onClose={() => setModal(null)} title="XP & Levels" color="#fbbf24" icon="⚡">
        <div style={{ textAlign:'center', background:'rgba(251,191,36,0.08)', border:'1px solid rgba(251,191,36,0.3)', borderRadius:14, padding:'20px', marginBottom:20 }}>
          <div style={{ fontSize:36 }}>{level.badge}</div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:44, fontWeight:800, color:'#fbbf24', letterSpacing:'-0.04em', lineHeight:1 }}>{xp}</div>
          <div style={{ color:'var(--text-muted)', fontSize:12, marginTop:4 }}>XP Earned</div>
          <div style={{ fontFamily:'var(--font-display)', fontWeight:700, color:level.color, fontSize:16, marginTop:8 }}>{level.name}</div>
          {xp < 3000 && <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:4 }}>{level.next - xp} XP until next level</div>}
        </div>
        {xp < 3000 && (
          <div style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:11, padding:'14px', marginBottom:18 }}>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:'var(--text-muted)', marginBottom:7 }}>
              <span style={{ color:level.color, fontWeight:700 }}>{level.name}</span>
              <span>{levelPct}% to {milestones[milestones.findIndex(m=>m.label===level.name)+1]?.label}</span>
            </div>
            <div style={{ background:'var(--border)', borderRadius:999, height:10, overflow:'hidden' }}>
              <div style={{ width:`${levelPct}%`, background:`linear-gradient(90deg,${level.color},${level.color}99)`, height:'100%', borderRadius:999, transition:'width 0.8s' }} />
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'var(--text-muted)', marginTop:5 }}>
              <span>{level.prev} XP</span><span>{level.next} XP</span>
            </div>
          </div>
        )}
        <div style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--heading)', fontSize:13, marginBottom:10 }}>How to Earn XP</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:18 }}>
          {[
            { action:'Complete a topic',    xp:'+100–275 XP', color:'#f97316' },
            { action:'Quiz answer correct', xp:'+25 XP each', color:'#3fb950' },
            { action:'Run code example',    xp:'+10 XP',      color:'#58a6ff' },
            { action:'Complete a module',   xp:'Bonus XP!',   color:'#c084fc' },
          ].map((item,i) => (
            <div key={i} style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:10, padding:'11px 13px' }}>
              <div style={{ fontSize:12, color:'var(--text)', fontFamily:'var(--font-body)', marginBottom:4 }}>{item.action}</div>
              <div style={{ fontFamily:'var(--font-display)', fontWeight:800, color:item.color, fontSize:14 }}>{item.xp}</div>
            </div>
          ))}
        </div>
        <div style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--heading)', fontSize:13, marginBottom:10 }}>Level Milestones</div>
        {milestones.map((m, i) => {
          const isCurrent = xp >= m.xp && (i === milestones.length-1 || xp < milestones[i+1].xp)
          const unlocked  = xp >= m.xp
          return (
            <div key={m.label} style={{ display:'flex', alignItems:'center', gap:10, background: isCurrent?`${m.color}14`:'var(--card)', border:`1px solid ${isCurrent?m.color+'55':'var(--border)'}`, borderRadius:9, padding:'10px 12px', marginBottom:7 }}>
              <div style={{ width:30, height:30, borderRadius:'50%', background:`${m.color}20`, border:`2px solid ${unlocked?m.color:'var(--border)'}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, flexShrink:0 }}>
                {unlocked ? m.badge : '🔒'}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, color: unlocked?'var(--heading)':'var(--text-muted)', fontSize:13 }}>
                  {m.label} {isCurrent && <span style={{ marginLeft:6, background:`${m.color}22`, color:m.color, borderRadius:99, padding:'1px 7px', fontSize:9, fontWeight:800 }}>CURRENT</span>}
                </div>
                <div style={{ fontSize:11, color:'var(--text-muted)' }}>{m.xp === 0 ? 'Starting level' : `Unlocked at ${m.xp} XP`}</div>
              </div>
              <div style={{ fontFamily:'var(--font-display)', fontWeight:800, color: unlocked?m.color:'var(--text-muted)', fontSize:13 }}>{m.xp}</div>
            </div>
          )
        })}
        <Link to="/learn" onClick={() => setModal(null)} style={{ display:'block', background:'linear-gradient(135deg,#fbbf24,#f59e0b)', color:'#000', borderRadius:11, padding:'12px', textAlign:'center', textDecoration:'none', fontFamily:'var(--font-display)', fontWeight:800, fontSize:13.5, marginTop:16 }}>
          Earn More XP →
        </Link>
      </Modal>

      {/* Completed modal */}
      <Modal open={modal==='completed'} onClose={() => setModal(null)} title="Completed Topics" color="#3fb950" icon="✅">
        {done === 0 ? (
          <div style={{ textAlign:'center', padding:'28px 0' }}>
            <div style={{ fontSize:52, marginBottom:14 }}>🌱</div>
            <div style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--heading)', fontSize:16, marginBottom:8 }}>No topics completed yet</div>
            <div style={{ color:'var(--text-muted)', fontSize:13.5, marginBottom:22, fontFamily:'var(--font-body)', lineHeight:1.7 }}>Start with Java Basics to earn your first XP!</div>
            <Link to="/learn/introduction" onClick={() => setModal(null)} style={{ display:'inline-block', background:'linear-gradient(135deg,#3fb950,#22c55e)', color:'#000', borderRadius:11, padding:'11px 24px', textDecoration:'none', fontFamily:'var(--font-display)', fontWeight:800, fontSize:13.5 }}>
              Start First Topic →
            </Link>
          </div>
        ) : (
          <div>
            <div style={{ background:'rgba(63,185,80,0.08)', border:'1px solid rgba(63,185,80,0.25)', borderRadius:11, padding:'12px 15px', marginBottom:16, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div><div style={{ fontFamily:'var(--font-display)', fontWeight:800, color:'#3fb950', fontSize:20 }}>{done}</div><div style={{ fontSize:11.5, color:'var(--text-muted)' }}>topics completed</div></div>
              <div style={{ textAlign:'right' }}><div style={{ fontFamily:'var(--font-display)', fontWeight:800, color:'#3fb950', fontSize:20 }}>{pct}%</div><div style={{ fontSize:11.5, color:'var(--text-muted)' }}>course done</div></div>
            </div>
            {MODULES.map(mod => {
              const mc = mod.topics.filter(id => progress[id])
              if (mc.length === 0) return null
              return (
                <div key={mod.id} style={{ marginBottom:14 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:7 }}>
                    <span>{mod.icon}</span>
                    <span style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--heading)', fontSize:12.5 }}>{mod.label}</span>
                    <span style={{ background:`${mod.color}20`, color:mod.color, borderRadius:99, padding:'1px 7px', fontSize:10, fontWeight:700 }}>{mc.length}/{mod.topics.length}</span>
                  </div>
                  {mc.map(tid => {
                    const t = allTopics.find(x => x.id === tid)
                    return (
                      <Link key={tid} to={`/learn/${tid}`} onClick={() => setModal(null)}
                        style={{ display:'flex', alignItems:'center', gap:9, background:'var(--card)', border:'1px solid rgba(63,185,80,0.18)', borderRadius:9, padding:'9px 13px', textDecoration:'none', marginBottom:5, transition:'all 0.12s' }}
                        onMouseEnter={e => e.currentTarget.style.borderColor='rgba(63,185,80,0.45)'}
                        onMouseLeave={e => e.currentTarget.style.borderColor='rgba(63,185,80,0.18)'}>
                        <span style={{ width:18, height:18, borderRadius:'50%', background:'linear-gradient(135deg,#3fb950,#22c55e)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, flexShrink:0 }}>✓</span>
                        <span style={{ flex:1, fontFamily:'var(--font-body)', fontSize:12.5, color:'var(--text)' }}>{t?.title || tid}</span>
                        <span style={{ fontSize:11, color:'#f97316', fontFamily:'var(--font-display)', fontWeight:700 }}>+{t?.xp || 0} XP</span>
                      </Link>
                    )
                  })}
                </div>
              )
            })}
          </div>
        )}
      </Modal>

      {/* Bookmarks modal */}
      <Modal open={modal==='bookmarks'} onClose={() => setModal(null)} title="Saved Bookmarks" color="#58a6ff" icon="🔖">
        {bookmarks.length === 0 ? (
          <div style={{ textAlign:'center', padding:'28px 0' }}>
            <div style={{ fontSize:52, marginBottom:14 }}>🔖</div>
            <div style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--heading)', fontSize:16, marginBottom:8 }}>No bookmarks yet</div>
            <div style={{ color:'var(--text-muted)', fontSize:13.5, marginBottom:22, fontFamily:'var(--font-body)', lineHeight:1.7 }}>Open any topic and click <strong style={{ color:'var(--heading)' }}>🔖 Save</strong> to bookmark it.</div>
            <Link to="/learn" onClick={() => setModal(null)} style={{ display:'inline-block', background:'linear-gradient(135deg,#58a6ff,#3b82f6)', color:'#fff', borderRadius:11, padding:'11px 24px', textDecoration:'none', fontFamily:'var(--font-display)', fontWeight:700, fontSize:13.5 }}>
              Browse Topics →
            </Link>
          </div>
        ) : (
          <div>
            <div style={{ background:'rgba(88,166,255,0.07)', border:'1px solid rgba(88,166,255,0.22)', borderRadius:11, padding:'11px 14px', marginBottom:16, fontSize:13, color:'var(--text-muted)', fontFamily:'var(--font-body)' }}>
              {bookmarks.length} topic{bookmarks.length !== 1 ? 's' : ''} saved · Click to open, ✕ to remove
            </div>
            {MODULES.map(mod => {
              const mb = mod.topics.filter(id => bookmarks.includes(id))
              if (mb.length === 0) return null
              return (
                <div key={mod.id} style={{ marginBottom:14 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:7 }}>
                    <span>{mod.icon}</span>
                    <span style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--heading)', fontSize:12.5 }}>{mod.label}</span>
                  </div>
                  {mb.map(tid => {
                    const t  = allTopics.find(x => x.id === tid)
                    const isDone = progress[tid]
                    return (
                      <div key={tid} style={{ display:'flex', alignItems:'center', gap:9, background:'var(--card)', border:'1px solid rgba(88,166,255,0.18)', borderRadius:9, padding:'9px 13px', marginBottom:5 }}>
                        <div style={{ width:7, height:7, borderRadius:'50%', background: isDone?'#3fb950':mod.color, flexShrink:0 }} />
                        <Link to={`/learn/${tid}`} onClick={() => setModal(null)} style={{ flex:1, textDecoration:'none' }}>
                          <div style={{ fontFamily:'var(--font-body)', fontSize:12.5, color:'var(--text)' }}>{t?.title || tid}</div>
                          <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:2 }}>{isDone ? '✅ Completed' : '📖 Not started'} · +{t?.xp || 0} XP</div>
                        </Link>
                        {toggleBookmark && (
                          <button onClick={() => toggleBookmark(tid)}
                            style={{ background:'var(--card2)', border:'1px solid var(--border)', color:'var(--text-muted)', width:24, height:24, borderRadius:6, cursor:'pointer', fontSize:11, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all 0.12s' }}
                            onMouseEnter={e => { e.currentTarget.style.background='rgba(239,68,68,0.15)'; e.currentTarget.style.color='#ef4444'; e.currentTarget.style.borderColor='rgba(239,68,68,0.4)' }}
                            onMouseLeave={e => { e.currentTarget.style.background='var(--card2)'; e.currentTarget.style.color='var(--text-muted)'; e.currentTarget.style.borderColor='var(--border)' }}>✕
                          </button>
                        )}
                      </div>
                    )
                  })}
                </div>
              )
            })}
            <Link to="/learn" onClick={() => setModal(null)} style={{ display:'block', background:'linear-gradient(135deg,#58a6ff,#3b82f6)', color:'#fff', borderRadius:11, padding:'12px', textAlign:'center', textDecoration:'none', fontFamily:'var(--font-display)', fontWeight:700, fontSize:13.5, marginTop:16 }}>
              Browse More Topics →
            </Link>
          </div>
        )}
      </Modal>

      <style>{`
        @keyframes modalIn { from { opacity:0; transform:scale(0.94) translateY(14px); } to { opacity:1; transform:scale(1) translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
      `}</style>
    </div>
  )
}
