import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { TOPICS, getModule, getAdjacentTopics } from '../data/index.js'
import CodeBlock from '../components/CodeBlock.jsx'
import Quiz from '../components/Quiz.jsx'

const DIFF_CONFIG = {
  Beginner:     { color:'#3fb950', bg:'rgba(63,185,80,0.1)',   border:'rgba(63,185,80,0.3)',   icon:'🌱' },
  Intermediate: { color:'#58a6ff', bg:'rgba(88,166,255,0.1)',  border:'rgba(88,166,255,0.3)',  icon:'⚡' },
  Advanced:     { color:'#bc8cff', bg:'rgba(188,140,255,0.1)', border:'rgba(188,140,255,0.3)', icon:'🚀' },
}

function Badge({ text, color, bg, border }) {
  return (
    <span style={{ background:bg||`${color}18`, color, border:`1px solid ${border||color+'33'}`, borderRadius:7, padding:'3px 10px', fontSize:11.5, fontWeight:700, fontFamily:'var(--font-display)', display:'inline-flex', alignItems:'center', gap:4 }}>{text}</span>
  )
}

function SectionBlock({ section, modColor, onCodeRun, index }) {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <div style={{ marginBottom:32, border:'1px solid var(--border)', borderRadius:16, overflow:'hidden', background:'var(--card)', transition:'box-shadow 0.2s' }}
      onMouseEnter={e => e.currentTarget.style.boxShadow='0 4px 20px rgba(0,0,0,0.2)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow='none'}
    >
      {/* Section heading — clickable to collapse */}
      <button
        onClick={() => setCollapsed(c => !c)}
        style={{ width:'100%', display:'flex', alignItems:'center', gap:12, padding:'16px 20px', background:`linear-gradient(135deg,${modColor||'#f97316'}10,${modColor||'#f97316'}05)`, border:'none', borderBottom:`1px solid ${collapsed?'transparent':'var(--border)'}`, cursor:'pointer', textAlign:'left', transition:'all 0.15s' }}
      >
        <div style={{ width:28, height:28, borderRadius:8, background:`${modColor||'#f97316'}22`, border:`1px solid ${modColor||'#f97316'}44`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:800, color:modColor||'#f97316', flexShrink:0, fontFamily:'var(--font-display)' }}>
          {index + 1}
        </div>
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:16.5, fontWeight:800, color:'var(--heading)', flex:1, letterSpacing:'-0.02em', lineHeight:1.3 }}>
          {section.heading}
        </h2>
        <span style={{ color:'var(--text-muted)', fontSize:12, flexShrink:0, transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)', transition:'transform 0.2s' }}>▲</span>
      </button>

      {!collapsed && (
        <div style={{ padding:'20px' }}>
          {/* Main content */}
          {section.content && (
            <p style={{ color:'var(--text)', lineHeight:1.9, marginBottom:section.table||section.code||section.note ? 18 : 0, fontSize:14.5, fontFamily:'var(--font-body)' }}>{section.content}</p>
          )}

          {/* Table */}
          {section.table && (
            <div style={{ overflowX:'auto', marginBottom:16, borderRadius:10, border:'1px solid var(--border)' }}>
              <table className="data-table" style={{ margin:0, border:'none' }}>
                <thead>
                  <tr style={{ background:`${modColor||'#f97316'}14` }}>
                    {section.table.headers.map(h => (
                      <th key={h} style={{ padding:'10px 14px', color:modColor||'#f97316', fontSize:11.5 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.table.rows.map((row, ri) => (
                    <tr key={ri} style={{ background: ri%2===0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                      {row.map((cell, ci) => (
                        <td key={ci} style={{ padding:'9px 14px', color: ci===0 ? (modColor||'#f97316') : 'var(--text)', fontFamily: ci===0 ? 'var(--font-code)' : 'var(--font-body)', fontSize: ci===0 ? 12 : 13 }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* List */}
          {section.list && (
            <div style={{ background:'var(--card2)', border:'1px solid var(--border)', borderRadius:10, padding:'14px 18px', marginBottom:16 }}>
              {section.list.map((item, li) => {
                if (item.includes('\n')) {
                  const lines = item.split('\n')
                  return (
                    <div key={li} style={{ marginBottom: li < section.list.length-1 ? 16 : 0, paddingBottom: li < section.list.length-1 ? 16 : 0, borderBottom: li < section.list.length-1 ? '1px solid var(--border)' : 'none' }}>
                      <div style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--heading)', fontSize:13.5, marginBottom:5 }}>{lines[0]}</div>
                      {lines.slice(1).map((line,j) => (
                        <div key={j} style={{ color:'var(--text)', fontSize:13.5, lineHeight:1.75, paddingLeft:12, borderLeft:`2px solid ${modColor||'#f97316'}44`, marginBottom:j < lines.length-2 ? 4 : 0 }}>{line}</div>
                      ))}
                    </div>
                  )
                }
                const hasEmoji = /^[🔴🟢🟡✅❌⚠️💡📘🔒🌍📱💰📚🔄🔵]/u.test(item)
                return (
                  <div key={li} style={{ display:'flex', alignItems:'flex-start', gap:10, marginBottom: li < section.list.length-1 ? 9 : 0, fontSize:13.5, color:'var(--text)', lineHeight:1.7 }}>
                    {!hasEmoji && <span style={{ width:5, height:5, borderRadius:'50%', background:modColor||'#f97316', flexShrink:0, marginTop:9 }} />}
                    <span>{item}</span>
                  </div>
                )
              })}
            </div>
          )}

          {/* Code block */}
          {section.code && (
            <CodeBlock code={section.code} showOutput={!!section.output} output={section.output} onRun={onCodeRun} />
          )}

          {/* Note */}
          {section.note && (
            <div className="tip-box warning" style={{ marginTop:12 }}>
              <span style={{ fontSize:16, flexShrink:0 }}>💡</span>
              <span style={{ fontFamily:'var(--font-body)' }}>{section.note}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/* ── XP toast ──────────────────────────────────────────────────── */
function XpToast({ amount, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2500); return () => clearTimeout(t) }, [])
  return (
    <div style={{ position:'fixed', bottom:28, right:28, zIndex:9999, background:'linear-gradient(135deg,#f97316,#fbbf24)', color:'#000', borderRadius:14, padding:'12px 22px', fontFamily:'var(--font-display)', fontWeight:800, fontSize:16, boxShadow:'0 8px 32px rgba(249,115,22,0.45)', animation:'slideUp 0.4s cubic-bezier(0.16,1,0.3,1)', display:'flex', alignItems:'center', gap:8 }}>
      ⚡ +{amount} XP
      <span style={{ fontSize:12, opacity:0.75, fontWeight:600 }}>earned!</span>
    </div>
  )
}

/* ── Main component ─────────────────────────────────────────────── */
export default function TopicPage({ progress, markComplete, bookmarks, toggleBookmark, xp, setXp }) {
  const { topicId } = useParams()
  const navigate    = useNavigate()
  const [tab,       setTab]       = useState('theory')
  const [xpGained,  setXpGained]  = useState(false)
  const [toast,     setToast]     = useState(null) // { amount }
  const [readPct,   setReadPct]   = useState(0)

  const topic  = TOPICS[topicId]
  const mod    = getModule(topicId)
  const { prev, next } = getAdjacentTopics(topicId)
  const diff   = DIFF_CONFIG[topic?.difficulty] || DIFF_CONFIG.Beginner

  useEffect(() => { setTab('theory'); setXpGained(false); setReadPct(0) }, [topicId])

  // Reading progress bar (tracks scroll of Theory tab)
  useEffect(() => {
    if (tab !== 'theory') return
    const mainEl = document.querySelector('main')
    if (!mainEl) return
    const onScroll = () => {
      const scrolled = mainEl.scrollTop
      const total    = mainEl.scrollHeight - mainEl.clientHeight
      if (total > 0) setReadPct(Math.round((scrolled / total) * 100))
    }
    mainEl.addEventListener('scroll', onScroll)
    return () => mainEl.removeEventListener('scroll', onScroll)
  }, [tab])

  if (!topic) return (
    <div style={{ padding:60, textAlign:'center' }}>
      <div style={{ fontSize:56, marginBottom:20 }}>🔍</div>
      <div style={{ fontFamily:'var(--font-display)', fontWeight:800, color:'var(--heading)', fontSize:20, marginBottom:12 }}>Topic not found</div>
      <button onClick={() => navigate('/learn')} className="btn-glow" style={{ padding:'10px 24px', fontSize:14 }}>← Back to Learn</button>
    </div>
  )

  const isDone       = progress[topicId]
  const isBookmarked = bookmarks.includes(topicId)
  const modColor     = mod?.color || '#f97316'

  const showToast = (amount) => { setToast({ amount }); setXpGained(true) }

  const handleComplete = () => {
    if (!isDone) {
      markComplete(topicId, topic.xp || 100)
      showToast(topic.xp || 100)
    }
  }
  const handleQuizComplete = (score) => {
    if (!xpGained) { setXp(x => x + score * 25); showToast(score * 25) }
  }
  const handleCodeRun = () => {
    if (!xpGained) { setXp(x => x + 10); showToast(10) }
  }

  const TABS = [
    { id:'theory',    icon:'📖', label:'Theory',      count: topic.sections?.length },
    { id:'code',      icon:'💻', label:'Code',         count: null },
    { id:'quiz',      icon:'🧠', label:'Quiz',         count: topic.quiz?.length },
    { id:'interview', icon:'💼', label:'Interview Q',  count: null },
  ]

  return (
    <div style={{ minHeight:'100%', background:'var(--bg)' }}>

      {/* Reading progress bar — thin line at very top */}
      <div style={{ position:'sticky', top:0, zIndex:20, height:3, background:'var(--border)' }}>
        <div style={{ height:'100%', width:`${readPct}%`, background:`linear-gradient(90deg,${modColor},${modColor}99)`, transition:'width 0.3s ease', borderRadius:999 }} />
      </div>

      {/* ── HERO HEADER ─────────────────────────────────────── */}
      <div style={{ background:'var(--surface)', borderBottom:'1px solid var(--border)', padding:'20px 28px 0' }}>

        {/* Breadcrumb */}
        <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, color:'var(--text-muted)', marginBottom:14, flexWrap:'wrap', fontFamily:'var(--font-body)' }}>
          <Link to="/" style={{ color:'var(--text-muted)', textDecoration:'none' }} onMouseEnter={e=>e.target.style.color='#f97316'} onMouseLeave={e=>e.target.style.color='var(--text-muted)'}>Home</Link>
          <span style={{ opacity:0.4 }}>›</span>
          <Link to="/learn" style={{ color:'var(--text-muted)', textDecoration:'none' }} onMouseEnter={e=>e.target.style.color='#f97316'} onMouseLeave={e=>e.target.style.color='var(--text-muted)'}>Learn</Link>
          <span style={{ opacity:0.4 }}>›</span>
          {mod && <Link to="/learn" style={{ color:modColor, textDecoration:'none', fontWeight:600 }}>{mod.label}</Link>}
          <span style={{ opacity:0.4 }}>›</span>
          <span style={{ color:'var(--text)', fontWeight:600, maxWidth:200, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{topic.title}</span>
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:16, flexWrap:'wrap', paddingBottom:0 }}>
          <div style={{ flex:1 }}>
            <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(20px,3vw,28px)', fontWeight:800, color:'var(--heading)', marginBottom:12, lineHeight:1.2, letterSpacing:'-0.03em' }}>
              {topic.icon && <span style={{ marginRight:8 }}>{topic.icon}</span>}{topic.title}
            </h1>
            <div style={{ display:'flex', gap:7, flexWrap:'wrap', alignItems:'center' }}>
              <Badge text={`${diff.icon} ${topic.difficulty}`} color={diff.color} bg={diff.bg} border={diff.border} />
              <Badge text={`⏱ ${topic.duration}`} color="var(--text-muted)" bg="var(--card2)" border="var(--border)" />
              <Badge text={`⚡ +${topic.xp} XP`} color="#f97316" bg="rgba(249,115,22,0.1)" border="rgba(249,115,22,0.3)" />
              {mod && <Badge text={mod.label} color={modColor} bg={`${modColor}14`} border={`${modColor}33`} />}
              {isDone && <Badge text="✅ Completed" color="#3fb950" bg="rgba(63,185,80,0.1)" border="rgba(63,185,80,0.3)" />}
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', alignItems:'center' }}>
            <button onClick={() => toggleBookmark(topicId)}
              style={{ background: isBookmarked ? 'rgba(249,115,22,0.12)' : 'var(--card2)', border:`1px solid ${isBookmarked ? 'rgba(249,115,22,0.4)' : 'var(--border)'}`, color: isBookmarked ? '#f97316' : 'var(--text-muted)', padding:'7px 14px', borderRadius:9, cursor:'pointer', fontSize:12.5, fontFamily:'var(--font-display)', fontWeight:600, transition:'all 0.15s' }}
              onMouseEnter={e => { if (!isBookmarked) { e.currentTarget.style.borderColor='rgba(249,115,22,0.3)'; e.currentTarget.style.color='#f97316' } }}
              onMouseLeave={e => { if (!isBookmarked) { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--text-muted)' } }}>
              {isBookmarked ? '🔖 Saved' : '🔖 Save'}
            </button>
            <button onClick={handleComplete}
              style={{
                background: isDone ? 'rgba(63,185,80,0.15)' : 'linear-gradient(135deg,#3fb950,#22c55e)',
                border: isDone ? '1px solid rgba(63,185,80,0.4)' : 'none',
                color: isDone ? '#3fb950' : '#000',
                padding:'7px 18px', borderRadius:9, cursor: isDone ? 'default' : 'pointer',
                fontSize:12.5, fontFamily:'var(--font-display)', fontWeight:800,
                boxShadow: isDone ? 'none' : '0 4px 14px rgba(63,185,80,0.3)',
                transition:'all 0.15s',
              }}>
              {isDone ? '✅ Completed' : '✅ Mark Complete'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', gap:0, marginTop:14, overflowX:'auto', borderTop:'1px solid var(--border)' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{
                background:'transparent', border:'none',
                borderTop: tab===t.id ? `2px solid ${modColor}` : '2px solid transparent',
                color: tab===t.id ? modColor : 'var(--text-muted)',
                padding:'10px 16px', cursor:'pointer',
                fontWeight: tab===t.id ? 700 : 500,
                fontSize:13, marginTop:-1, whiteSpace:'nowrap',
                fontFamily:'var(--font-display)', transition:'all 0.15s',
                display:'flex', alignItems:'center', gap:5,
              }}>
              <span style={{ fontSize:14 }}>{t.icon}</span>
              {t.label}
              {t.count > 0 && (
                <span style={{ background: tab===t.id ? `${modColor}20` : 'var(--card2)', color: tab===t.id ? modColor : 'var(--text-muted)', borderRadius:99, padding:'0px 6px', fontSize:10, fontWeight:700 }}>{t.count}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── CONTENT ─────────────────────────────────────────── */}
      <div style={{ padding:'28px 28px', maxWidth:920 }} className="fade-up">

        {/* ── THEORY ─────────────────────────────────────────── */}
        {tab === 'theory' && (
          <div>
            {/* Intro card with gradient */}
            <div style={{ background:`linear-gradient(135deg,${modColor}12,${modColor}06)`, border:`1px solid ${modColor}30`, borderRadius:16, padding:'20px 24px', marginBottom:28, borderLeft:`4px solid ${modColor}`, position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:-20, right:-20, width:100, height:100, borderRadius:'50%', background:`${modColor}10`, pointerEvents:'none' }} />
              <div style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                <div style={{ width:36, height:36, borderRadius:10, background:`${modColor}22`, border:`1px solid ${modColor}44`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>📌</div>
                <div>
                  <div style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--heading)', fontSize:13.5, marginBottom:8 }}>What is this topic about?</div>
                  <p style={{ color:'var(--text)', lineHeight:1.85, fontSize:14.5, fontFamily:'var(--font-body)', margin:0 }}>{topic.intro}</p>
                </div>
              </div>
            </div>

            {/* Sections as collapsible cards */}
            {topic.sections?.map((section, i) => (
              <SectionBlock key={i} index={i} section={section} modColor={modColor} onCodeRun={handleCodeRun} />
            ))}

            {/* Key takeaways */}
            <div style={{ background:`linear-gradient(135deg,var(--card),${modColor}08)`, border:`1px solid ${modColor}25`, borderRadius:14, padding:'20px 24px', marginTop:8 }}>
              <div style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--heading)', marginBottom:14, fontSize:14.5, display:'flex', gap:8, alignItems:'center' }}>
                <span style={{ fontSize:18 }}>✨</span> Key Takeaways
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {[
                  `This topic is part of the ${mod?.label || 'Java'} module`,
                  `Difficulty level: ${topic.difficulty} — ${diff.icon}`,
                  `Completing this earns you ⚡ ${topic.xp} XP`,
                  'Take the quiz below to test your understanding',
                  'Use the Code tab to practice examples yourself',
                ].map((point, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:9, fontSize:13.5, color:'var(--text)', lineHeight:1.65 }}>
                    <span style={{ width:5, height:5, borderRadius:'50%', background:modColor, flexShrink:0, marginTop:8 }} />
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── CODE TAB ────────────────────────────────────────── */}
        {tab === 'code' && (
          <div>
            <div style={{ background:'rgba(88,166,255,0.06)', border:'1px solid rgba(88,166,255,0.2)', borderRadius:12, padding:'14px 18px', marginBottom:24, display:'flex', gap:10, alignItems:'flex-start' }}>
              <span style={{ fontSize:18, flexShrink:0 }}>💻</span>
              <div>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--heading)', fontSize:13.5, marginBottom:4 }}>Practice Code Examples</div>
                <div style={{ color:'var(--text-muted)', fontSize:13, fontFamily:'var(--font-body)' }}>Study the code examples from all theory sections. Each run earns you ⚡ +10 XP.</div>
              </div>
            </div>
            {topic.sections?.filter(s => s.code).length === 0 ? (
              <div style={{ textAlign:'center', padding:'48px 0', color:'var(--text-muted)' }}>
                <div style={{ fontSize:48, marginBottom:12 }}>📭</div>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:16 }}>No code examples for this topic yet</div>
              </div>
            ) : (
              topic.sections?.filter(s => s.code).map((section, i) => (
                <div key={i} style={{ marginBottom:28 }}>
                  <div style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--heading)', fontSize:15, marginBottom:12, display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{ width:22, height:22, borderRadius:6, background:`${modColor}22`, color:modColor, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:800 }}>{i+1}</span>
                    {section.heading}
                  </div>
                  <CodeBlock code={section.code} showOutput={!!section.output} output={section.output} onRun={handleCodeRun} />
                </div>
              ))
            )}

            {/* Practice code block if topic has one */}
            {topic.code && (
              <div style={{ marginTop:8 }}>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--heading)', fontSize:15, marginBottom:12, display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ fontSize:18 }}>🎯</span> Main Example
                </div>
                <CodeBlock code={topic.code} showOutput={!!topic.output} output={topic.output} onRun={handleCodeRun} />
              </div>
            )}
          </div>
        )}

        {/* ── QUIZ TAB ─────────────────────────────────────────── */}
        {tab === 'quiz' && (
          <div>
            {topic.quiz?.length > 0 ? (
              <div>
                <div style={{ background:`${modColor}0c`, border:`1px solid ${modColor}25`, borderRadius:12, padding:'14px 18px', marginBottom:24, display:'flex', gap:10, alignItems:'center' }}>
                  <span style={{ fontSize:20 }}>🧠</span>
                  <div>
                    <div style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--heading)', fontSize:13.5, marginBottom:2 }}>Test Your Knowledge</div>
                    <div style={{ color:'var(--text-muted)', fontSize:13, fontFamily:'var(--font-body)' }}>{topic.quiz.length} questions · Each correct answer earns ⚡ +25 XP</div>
                  </div>
                </div>
                <Quiz questions={topic.quiz} modColor={modColor} onComplete={handleQuizComplete} />
              </div>
            ) : (
              <div style={{ textAlign:'center', padding:'48px 0', color:'var(--text-muted)' }}>
                <div style={{ fontSize:48, marginBottom:12 }}>🧩</div>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:16 }}>Quiz coming soon!</div>
              </div>
            )}
          </div>
        )}

        {/* ── INTERVIEW TAB ────────────────────────────────────── */}
        {tab === 'interview' && (
          <div>
            <div style={{ background:'rgba(188,140,255,0.06)', border:'1px solid rgba(188,140,255,0.2)', borderRadius:12, padding:'14px 18px', marginBottom:24, display:'flex', gap:10, alignItems:'center' }}>
              <span style={{ fontSize:20 }}>💼</span>
              <div>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--heading)', fontSize:13.5, marginBottom:2 }}>Interview Prep</div>
                <div style={{ color:'var(--text-muted)', fontSize:13, fontFamily:'var(--font-body)' }}>Common interview questions on this topic with detailed answers.</div>
              </div>
            </div>
            {topic.sections?.filter(s => s.list?.some(item => item.startsWith('Q'))).length > 0 ? (
              topic.sections.filter(s => s.list?.some(item => item.startsWith('Q'))).map((section, si) => (
                <div key={si} style={{ marginBottom:24 }}>
                  {section.list.filter(item => item.startsWith('Q')).map((item, qi) => {
                    const lines = item.split('\n')
                    const question = lines[0]
                    const answer = lines.slice(1).join('\n')
                    return (
                      <div key={qi} style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:12, padding:'16px 18px', marginBottom:10 }}>
                        <div style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--heading)', fontSize:14, marginBottom:8 }}>{question}</div>
                        {answer && <div style={{ color:'var(--text)', fontSize:13.5, lineHeight:1.75, fontFamily:'var(--font-body)', paddingLeft:12, borderLeft:`2px solid ${modColor}44` }}>{answer}</div>}
                      </div>
                    )
                  })}
                </div>
              ))
            ) : (
              <div style={{ textAlign:'center', padding:'48px 0', color:'var(--text-muted)' }}>
                <div style={{ fontSize:48, marginBottom:12 }}>💼</div>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:16 }}>Interview Q&A coming soon</div>
                <div style={{ fontSize:13, marginTop:8 }}>Check the dedicated Interview Prep module for comprehensive questions.</div>
                <Link to="/learn/interview-core" style={{ display:'inline-block', marginTop:16, background:`${modColor}18`, border:`1px solid ${modColor}44`, color:modColor, padding:'9px 20px', borderRadius:9, textDecoration:'none', fontFamily:'var(--font-display)', fontWeight:700, fontSize:13 }}>Go to Interview Prep →</Link>
              </div>
            )}
          </div>
        )}

        {/* ── PREV / NEXT navigation ───────────────────────────── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:40, paddingTop:24, borderTop:'1px solid var(--border)' }}>
          {prev ? (
            <Link to={`/learn/${prev.id}`} style={{ display:'flex', alignItems:'center', gap:12, background:'var(--card)', border:'1px solid var(--border)', borderRadius:14, padding:'14px 16px', textDecoration:'none', transition:'all 0.18s', borderLeft:`3px solid ${prev.color||modColor}` }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateX(-3px)'; e.currentTarget.style.boxShadow='0 4px 16px rgba(0,0,0,0.2)' }}
              onMouseLeave={e => { e.currentTarget.style.transform='translateX(0)'; e.currentTarget.style.boxShadow='none' }}>
              <span style={{ fontSize:20, color:'var(--text-muted)', flexShrink:0 }}>←</span>
              <div style={{ overflow:'hidden' }}>
                <div style={{ fontSize:10.5, color:'var(--text-muted)', fontFamily:'var(--font-display)', fontWeight:600, letterSpacing:0.3, marginBottom:2 }}>PREVIOUS</div>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--heading)', fontSize:13, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{TOPICS[prev.id]?.title || prev.id}</div>
              </div>
            </Link>
          ) : <div />}

          {next && (
            <Link to={`/learn/${next.id}`} style={{ display:'flex', alignItems:'center', justifyContent:'flex-end', gap:12, background:`${next.color||modColor}10`, border:`1px solid ${next.color||modColor}30`, borderRadius:14, padding:'14px 16px', textDecoration:'none', transition:'all 0.18s', borderRight:`3px solid ${next.color||modColor}` }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateX(3px)'; e.currentTarget.style.boxShadow='0 4px 16px rgba(0,0,0,0.2)' }}
              onMouseLeave={e => { e.currentTarget.style.transform='translateX(0)'; e.currentTarget.style.boxShadow='none' }}>
              <div style={{ textAlign:'right', overflow:'hidden' }}>
                <div style={{ fontSize:10.5, color:next.color||modColor, fontFamily:'var(--font-display)', fontWeight:600, letterSpacing:0.3, marginBottom:2 }}>NEXT UP</div>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--heading)', fontSize:13, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{TOPICS[next.id]?.title || next.id}</div>
              </div>
              <span style={{ fontSize:20, color:next.color||modColor, flexShrink:0 }}>→</span>
            </Link>
          )}
        </div>
      </div>

      {/* XP Toast notification */}
      {toast && <XpToast amount={toast.amount} onDone={() => setToast(null)} />}

      <style>{`
        @keyframes slideUp {
          from { opacity:0; transform:translateY(20px) scale(0.9); }
          to   { opacity:1; transform:translateY(0)  scale(1); }
        }
      `}</style>
    </div>
  )
}
