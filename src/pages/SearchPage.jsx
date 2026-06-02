import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { getAllTopics } from '../data/index.js'
import { sanitiseSearchQuery } from '../utils/security.js'

const DIFF = {
  Beginner:     { color:'#3fb950', icon:'🌱' },
  Intermediate: { color:'#58a6ff', icon:'⚡' },
  Advanced:     { color:'#bc8cff', icon:'🚀' },
}

const SUGGESTED = ['variables','lambda','streams','hashmap','inheritance','threads','generics','design-patterns','exceptions','arraylist']

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const allTopics = getAllTopics()

  const results = query.trim().length < 2 ? [] : allTopics.filter(t => {
    const q = sanitiseSearchQuery(query).toLowerCase()
    return (
      t.title?.toLowerCase().includes(q) ||
      t.intro?.toLowerCase().includes(q) ||
      t.id?.toLowerCase().includes(q) ||
      t.moduleLabel?.toLowerCase().includes(q) ||
      t.difficulty?.toLowerCase().includes(q)
    )
  })

  useEffect(() => {
    if (query) setSearchParams({ q: query })
    else setSearchParams({})
  }, [query])

  return (
    <div style={{ minHeight:'100%', background:'var(--bg)' }}>
      {/* Header */}
      <div style={{ background:'var(--surface)', borderBottom:'1px solid var(--border)', padding:'28px 32px 24px' }}>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:24, fontWeight:800, color:'var(--heading)', marginBottom:16, letterSpacing:'-0.03em' }}>🔍 Search Topics</h1>

        <div style={{ position:'relative', maxWidth:600 }}>
          <span style={{ position:'absolute', left:16, top:'50%', transform:'translateY(-50%)', fontSize:18, color:'var(--text-muted)' }}>🔍</span>
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search topics, keywords, modules..." autoFocus
            style={{ width:'100%', background:'var(--card)', border:'1px solid var(--border2)', borderRadius:14, padding:'14px 46px 14px 50px', color:'var(--text)', fontSize:15.5, outline:'none', fontFamily:'var(--font-body)', transition:'border-color 0.2s', boxSizing:'border-box' }}
            onFocus={e => e.target.style.borderColor='rgba(249,115,22,0.5)'}
            onBlur={e  => e.target.style.borderColor='var(--border2)'} />
          {query && (
            <button onClick={() => setQuery('')}
              style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)', background:'var(--border)', border:'none', color:'var(--text-muted)', cursor:'pointer', fontSize:13, width:26, height:26, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>
          )}
        </div>
      </div>

      <div style={{ padding:'28px 32px', maxWidth:900 }}>
        {query.trim().length < 2 ? (
          <div>
            <div style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--heading)', fontSize:14, marginBottom:14 }}>Popular searches</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
              {SUGGESTED.map(tag => (
                <button key={tag} onClick={() => setQuery(tag)}
                  style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:10, padding:'8px 16px', cursor:'pointer', color:'var(--text)', fontSize:13.5, fontFamily:'var(--font-display)', fontWeight:600, transition:'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(249,115,22,0.5)'; e.currentTarget.style.color='#f97316' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--text)' }}>
                  {tag}
                </button>
              ))}
            </div>

            <div style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--heading)', fontSize:14, marginBottom:14, marginTop:28 }}>
              All {allTopics.length} Topics
            </div>
            {/* All-topics grid — each is a real <a> link */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:9 }}>
              {allTopics.map(t => (
                <Link
                  key={t.id}
                  to={`/learn/${t.id}`}
                  style={{
                    background:'var(--card)', border:'1px solid var(--border)',
                    borderRadius:10, padding:'10px 14px',
                    color:'var(--text)', fontSize:12.5,
                    fontFamily:'var(--font-display)', fontWeight:600,
                    textAlign:'left', textDecoration:'none',
                    transition:'all 0.15s', display:'block',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=t.moduleColor||'var(--border2)'; e.currentTarget.style.background='var(--card2)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.background='var(--card)' }}>
                  <span style={{ marginRight:6 }}>{t.moduleIcon}</span>
                  {t.title}
                </Link>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          <div style={{ textAlign:'center', padding:'60px 0' }}>
            <div style={{ fontSize:52, marginBottom:16 }}>🤷</div>
            <div style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--heading)', fontSize:18, marginBottom:8 }}>
              No results for "{query}"
            </div>
            <div style={{ color:'var(--text-muted)', fontSize:14, fontFamily:'var(--font-body)' }}>
              Try a different keyword — e.g. "lambda", "hashmap", "threads"
            </div>
          </div>
        ) : (
          <div>
            <div style={{ fontFamily:'var(--font-display)', fontWeight:600, color:'var(--text-muted)', fontSize:13, marginBottom:18 }}>
              {results.length} result{results.length !== 1 ? 's' : ''} for "<span style={{ color:'var(--heading)' }}>{query}</span>"
            </div>
            {/* Search results — each is a real <a> link */}
            <div style={{ display:'flex', flexDirection:'column', gap:11 }}>
              {results.map(topic => {
                const d = DIFF[topic.difficulty] || DIFF.Beginner
                return (
                  <Link
                    key={topic.id}
                    to={`/learn/${topic.id}`}
                    style={{
                      display:'flex', gap:16, alignItems:'flex-start',
                      background:'var(--card)', border:'1px solid var(--border)',
                      borderRadius:15, padding:'18px 22px',
                      textDecoration:'none',
                      transition:'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
                      borderLeft:`3px solid ${topic.moduleColor||'var(--border)'}`,
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.25)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <div style={{ width:46, height:46, borderRadius:12, background:`${topic.moduleColor||'#f97316'}18`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>
                      {topic.moduleIcon}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--heading)', fontSize:15.5, marginBottom:5 }}>{topic.title}</div>
                      <div style={{ color:'var(--text-muted)', fontSize:13, marginBottom:10, lineHeight:1.65, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden', fontFamily:'var(--font-body)' }}>
                        {topic.intro?.slice(0,170)}…
                      </div>
                      <div style={{ display:'flex', gap:7, flexWrap:'wrap' }}>
                        <span style={{ background:'var(--card2)', color:'var(--text-muted)', border:'1px solid var(--border)', borderRadius:6, padding:'2px 8px', fontSize:11, fontWeight:600, fontFamily:'var(--font-display)' }}>
                          {topic.moduleLabel}
                        </span>
                        <span style={{ background:`${d.color}14`, color:d.color, border:`1px solid ${d.color}33`, borderRadius:6, padding:'2px 8px', fontSize:11, fontWeight:700, fontFamily:'var(--font-display)' }}>
                          {d.icon} {topic.difficulty}
                        </span>
                        <span style={{ color:'var(--text-muted)', fontSize:11, display:'flex', alignItems:'center', fontFamily:'var(--font-body)' }}>⏱ {topic.duration}</span>
                        <span style={{ background:'rgba(249,115,22,0.1)', color:'#f97316', border:'1px solid rgba(249,115,22,0.3)', borderRadius:6, padding:'2px 8px', fontSize:11, fontWeight:700, fontFamily:'var(--font-display)' }}>+{topic.xp} XP</span>
                      </div>
                    </div>
                    <span style={{ color:'var(--text-muted)', fontSize:18, flexShrink:0, marginTop:4 }}>→</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
