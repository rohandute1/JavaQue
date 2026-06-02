import { Link } from 'react-router-dom'
import { MODULES, TOPICS } from '../data/index.js'

const DIFF = {
  Beginner:     { color:'#3fb950', bg:'rgba(63,185,80,0.1)',   icon:'🌱' },
  Intermediate: { color:'#58a6ff', bg:'rgba(88,166,255,0.1)',  icon:'⚡' },
  Advanced:     { color:'#bc8cff', bg:'rgba(188,140,255,0.1)', icon:'🚀' },
}

export default function LearnPage({ progress }) {
  const total     = MODULES.flatMap(m => m.topics).length
  const completed = Object.keys(progress).filter(k => progress[k]).length

  return (
    <div style={{ minHeight:'100%', background:'var(--bg)' }}>

      {/* Page Header */}
      <div style={{ background:'var(--surface)', borderBottom:'1px solid var(--border)', padding:'28px 32px 24px' }}>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:26, fontWeight:800, color:'var(--heading)', marginBottom:8, letterSpacing:'-0.03em' }}>
          📚 Java Learning Path
        </h1>
        <p style={{ color:'var(--text-muted)', fontSize:14.5, fontFamily:'var(--font-body)', marginBottom:16 }}>
          {completed} of {total} topics completed · Pick any topic below to start learning
        </p>
        <div style={{ display:'flex', alignItems:'center', gap:12, maxWidth:500 }}>
          <div style={{ flex:1, background:'var(--border)', borderRadius:999, height:7, overflow:'hidden' }}>
            <div style={{ width:`${Math.round((completed/total)*100)}%`, background:'linear-gradient(90deg,#f97316,#fbbf24)', height:'100%', borderRadius:999, transition:'width 0.8s ease' }} />
          </div>
          <span style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'#f97316', fontSize:13, flexShrink:0 }}>
            {Math.round((completed/total)*100)}%
          </span>
        </div>
      </div>

      <div style={{ padding:'28px 32px', maxWidth:1050 }}>
        {MODULES.map(mod => {
          const done   = mod.topics.filter(id => progress[id]).length
          const modPct = Math.round((done / mod.topics.length) * 100)
          // First incomplete topic, or first if all complete
          const continueTopic = mod.topics.find(id => !progress[id]) || mod.topics[0]

          return (
            <div key={mod.id} style={{ marginBottom:36 }}>

              {/* Module header — a real <a> link so right-click works */}
              <Link
                to={`/learn/${continueTopic}`}
                style={{
                  display:'flex', alignItems:'center', gap:14, marginBottom:16,
                  padding:'16px 20px', background:'var(--card)',
                  border:'1px solid var(--border)', borderRadius:14,
                  borderLeft:`4px solid ${mod.color}`, textDecoration:'none',
                  transition:'border-color 0.18s, background 0.18s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = mod.color}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <div style={{ width:46, height:46, borderRadius:12, background:`${mod.color}18`, border:`1px solid ${mod.color}33`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>
                  {mod.icon}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:'var(--font-display)', fontWeight:800, color:'var(--heading)', fontSize:16, marginBottom:3 }}>{mod.label}</div>
                  <div style={{ fontSize:13, color:'var(--text-muted)', fontFamily:'var(--font-body)' }}>{mod.desc}</div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:16, flexShrink:0 }}>
                  <div style={{ textAlign:'right' }}>
                    <div style={{ fontFamily:'var(--font-display)', fontWeight:800, color:mod.color, fontSize:18 }}>{modPct}%</div>
                    <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:2 }}>{done}/{mod.topics.length} done</div>
                  </div>
                  <div style={{ background:`${mod.color}18`, border:`1px solid ${mod.color}44`, borderRadius:8, padding:'6px 14px', fontSize:12, fontWeight:700, color:mod.color, fontFamily:'var(--font-display)', whiteSpace:'nowrap' }}>
                    {done === mod.topics.length ? '🔄 Review' : done === 0 ? '▶ Start' : '→ Continue'}
                  </div>
                </div>
              </Link>

              {/* Topics grid — each card is a real <a> link */}
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(210px,1fr))', gap:10 }}>
                {mod.topics.map((tid) => {
                  const topic = TOPICS[tid]
                  if (!topic) return null
                  const isDone = progress[tid]
                  const d      = DIFF[topic.difficulty] || DIFF.Beginner

                  return (
                    <Link
                      key={tid}
                      to={`/learn/${tid}`}
                      style={{
                        display:'block', textDecoration:'none',
                        background:'var(--card)',
                        border:`1px solid ${isDone ? '#3fb95033' : 'var(--border)'}`,
                        borderRadius:13, padding:'16px',
                        transition:'transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease',
                        position:'relative', overflow:'hidden',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-3px)'
                        e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.3)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    >
                      {/* Completed badge */}
                      {isDone && (
                        <div style={{ position:'absolute', top:0, right:0, width:30, height:30, background:'linear-gradient(135deg,#3fb950,#22c55e)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, borderBottomLeftRadius:10 }}>✓</div>
                      )}

                      {/* Top colour strip */}
                      <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${mod.color},${mod.color}44)`, borderRadius:'13px 13px 0 0' }} />

                      <div style={{ fontSize:22, marginBottom:10, marginTop:4 }}>{topic.icon || mod.icon}</div>
                      <div style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--heading)', fontSize:13.5, marginBottom:8, lineHeight:1.35 }}>{topic.title}</div>

                      <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:10 }}>
                        <span style={{ background:d.bg, color:d.color, borderRadius:5, padding:'1px 7px', fontSize:10.5, fontWeight:700, fontFamily:'var(--font-display)' }}>
                          {d.icon} {topic.difficulty}
                        </span>
                        <span style={{ color:'var(--text-muted)', fontSize:10.5, display:'flex', alignItems:'center', gap:3, fontFamily:'var(--font-body)' }}>
                          ⏱ {topic.duration}
                        </span>
                      </div>

                      <div style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'#f97316', fontSize:11 }}>+{topic.xp} XP →</div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
