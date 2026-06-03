import { useState, useEffect, useRef } from 'react'
import { Outlet, NavLink, useNavigate, useLocation, Link } from 'react-router-dom'
import { MODULES } from '../data/index.js'
import Footer from './Footer.jsx'

export default function Layout({ theme, setTheme, progress, xp, bookmarks }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [expandedMod, setExpandedMod] = useState(null)
  const [searchQ,     setSearchQ]     = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const mainRef  = useRef(null)

  // ✅ Scroll main content area to top on every navigation
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0
    }
  }, [location.pathname])

  // Auto-expand module that contains the current topic
  useEffect(() => {
    const tid = location.pathname.split('/learn/')[1]
    if (tid) {
      const m = MODULES.find(m => m.topics.includes(tid))
      if (m) setExpandedMod(m.id)
    }
    setMobileOpen(false)
  }, [location.pathname])

  // Auto-collapse on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) setSidebarOpen(false)
      else setSidebarOpen(true)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const totalTopics     = MODULES.flatMap(m => m.topics).length
  const completedTopics = Object.keys(progress).filter(k => progress[k]).length
  const pct             = Math.round((completedTopics / totalTopics) * 100)

  const handleSearch = e => {
    e.preventDefault()
    if (searchQ.trim()) { navigate(`/search?q=${encodeURIComponent(searchQ.trim())}`); setSearchQ('') }
  }

  // Compact nav items — only core navigation
  const navItems = [
    { to:'/', icon:'🏠', label:'Dashboard', exact:true },
    { to:'/learn', icon:'📚', label:'Learn Java' },
    { to:'/compiler', icon:'⚙️', label:'Code Editor' },
    { to:'/roadmap', icon:'🗺️', label:'Roadmap' },
  ]

  /* ── Sidebar content ─────────────────────────────────────────── */
  const SidebarContent = ({ mobile = false }) => {
    const showFull = sidebarOpen || mobile
    return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', overflow:'hidden' }}>

      {/* ── Logo — compact ───────────────────────────────────── */}
      <div style={{ padding:'14px 12px 12px', borderBottom:'1px solid var(--border)', flexShrink:0 }}>
        <NavLink to="/" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:9 }}>
          <img src="/logo.svg" alt="JavaQue" style={{ width:34, height:34, borderRadius:9, flexShrink:0, boxShadow:'0 3px 10px rgba(249,115,22,0.3)' }} />
          {showFull && (
            <div>
              <div style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:15, color:'var(--heading)', letterSpacing:'-0.03em', lineHeight:1.1 }}>JavaQue</div>
              <div style={{ fontSize:8, color:'#f97316', fontWeight:700, letterSpacing:'0.13em', marginTop:2 }}>LEARN · CODE · QUEUE</div>
            </div>
          )}
        </NavLink>
      </div>

      {/* ── Nav links — compact padding ──────────────────────── */}
      <div style={{ padding:'6px 6px 2px', flexShrink:0, borderBottom:'1px solid var(--border)' }}>
        {navItems.map(item => (
          <NavLink key={item.to} to={item.to} end={item.exact}
            style={({ isActive }) => ({
              display:'flex', alignItems:'center', gap:8,
              padding: showFull ? '7px 9px' : '9px',
              justifyContent: showFull ? 'flex-start' : 'center',
              borderRadius:8,
              background: isActive ? 'rgba(249,115,22,0.12)' : 'transparent',
              color: isActive ? '#f97316' : 'var(--text-soft)',
              textDecoration:'none',
              fontFamily:'var(--font-display)',
              fontWeight: isActive ? 700 : 500,
              fontSize:12.5,
              marginBottom:1,
              transition:'all 0.12s',
              borderLeft: isActive ? '3px solid #f97316' : '3px solid transparent',
            })}
            onMouseEnter={e => { if (e.currentTarget.style.background==='transparent' || e.currentTarget.style.background==='') e.currentTarget.style.background='var(--card2)' }}
            onMouseLeave={e => { if (e.currentTarget.getAttribute('aria-current') !== 'page') e.currentTarget.style.background='transparent' }}
          >
            <span style={{ fontSize:13, flexShrink:0 }}>{item.icon}</span>
            {showFull && <span style={{ lineHeight:1, whiteSpace:'nowrap' }}>{item.label}</span>}
          </NavLink>
        ))}
      </div>

      {/* ── MODULES — takes all remaining space ──────────────── */}
      {showFull ? (
        <div style={{ flex:1, overflowY:'auto', overflowX:'hidden', padding:'0 6px 4px' }}>

          {/* Section label */}
          <div style={{ fontSize:9, fontWeight:800, color:'var(--text-muted)', letterSpacing:'0.14em', padding:'8px 4px 5px', textTransform:'uppercase', fontFamily:'var(--font-display)' }}>
            Modules
          </div>

          {MODULES.map(mod => {
            const modDone = mod.topics.filter(id => progress[id]).length
            const isOpen  = expandedMod === mod.id
            return (
              <div key={mod.id} style={{ marginBottom:1 }}>

                {/* Module row */}
                <button
                  onClick={() => setExpandedMod(isOpen ? null : mod.id)}
                  style={{
                    width:'100%', display:'flex', alignItems:'center', gap:6,
                    padding:'6px 7px',
                    background: isOpen ? `${mod.color}16` : 'transparent',
                    border:`1px solid ${isOpen ? mod.color+'30' : 'transparent'}`,
                    borderRadius:7, cursor:'pointer',
                    color: isOpen ? mod.color : 'var(--text-soft)',
                    fontWeight: isOpen ? 700 : 500,
                    fontSize:12.5,
                    transition:'all 0.12s',
                    fontFamily:'var(--font-display)',
                  }}
                  onMouseEnter={e => { if (!isOpen) { e.currentTarget.style.background='var(--card2)'; e.currentTarget.style.color='var(--heading)' } }}
                  onMouseLeave={e => { if (!isOpen) { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='var(--text-soft)' } }}
                >
                  {/* Color dot */}
                  <span style={{ width:7, height:7, borderRadius:'50%', background:mod.color, flexShrink:0, opacity: isOpen ? 1 : 0.5 }} />
                  <span style={{ fontSize:13, flexShrink:0 }}>{mod.icon}</span>
                  <span style={{ flex:1, textAlign:'left', lineHeight:1.2, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{mod.label}</span>
                  <span style={{ fontSize:9.5, opacity:0.6, flexShrink:0, fontWeight:400 }}>{modDone}/{mod.topics.length}</span>
                  <span style={{ fontSize:7, flexShrink:0, transition:'transform 0.2s', display:'inline-block', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', marginLeft:1, opacity:0.6 }}>▼</span>
                </button>

                {/* Topic list */}
                {isOpen && (
                  <div style={{ margin:'2px 0 3px 16px', borderLeft:`2px solid ${mod.color}40`, paddingLeft:8 }}>
                    {mod.topics.map(tid => (
                      <NavLink key={tid} to={`/learn/${tid}`}
                        onClick={e => e.stopPropagation()}
                        style={({ isActive }) => ({
                          display:'flex', alignItems:'center', gap:5,
                          padding:'4px 6px',
                          background: isActive ? 'rgba(249,115,22,0.1)' : 'transparent',
                          color: isActive ? '#f97316' : progress[tid] ? '#3fb950' : 'var(--text-muted)',
                          textDecoration:'none',
                          fontSize:11.5,
                          borderRadius:5,
                          marginBottom:1,
                          transition:'all 0.1s',
                          fontWeight: isActive ? 600 : 400,
                          fontFamily:'var(--font-body)',
                        })}
                        onMouseEnter={e => { if (!location.pathname.includes(tid)) { e.currentTarget.style.background='var(--card2)'; e.currentTarget.style.color='var(--text)' } }}
                        onMouseLeave={e => {
                          if (!location.pathname.includes(tid)) {
                            e.currentTarget.style.background='transparent'
                            e.currentTarget.style.color = progress[tid] ? '#3fb950' : 'var(--text-muted)'
                          }
                        }}
                      >
                        <span style={{ fontSize:7, flexShrink:0, opacity: progress[tid] ? 1 : 0.4 }}>
                          {progress[tid] ? '✓' : '○'}
                        </span>
                        <span style={{ flex:1, lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                          {tid.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase())}
                        </span>
                        {bookmarks.includes(tid) && <span style={{ fontSize:7, color:'#f97316', flexShrink:0 }}>🔖</span>}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        /* Collapsed — module icons only */
        <div style={{ flex:1, overflowY:'auto', padding:'6px 4px', display:'flex', flexDirection:'column', alignItems:'center', gap:2 }}>
          {MODULES.map(mod => (
            <button key={mod.id}
              title={mod.label}
              onClick={() => { setSidebarOpen(true); setExpandedMod(mod.id) }}
              style={{ width:34, height:34, borderRadius:8, background:'transparent', border:'none', cursor:'pointer', fontSize:15, display:'flex', alignItems:'center', justifyContent:'center', transition:'background 0.12s' }}
              onMouseEnter={e => e.currentTarget.style.background=`${mod.color}20`}
              onMouseLeave={e => e.currentTarget.style.background='transparent'}
            >{mod.icon}</button>
          ))}
        </div>
      )}

      {/* ── Bottom bar — theme toggle only, compact ───────────── */}
      <div style={{ padding:'8px', borderTop:'1px solid var(--border)', flexShrink:0 }}>
        <button
          onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
          style={{
            width:'100%', background:'var(--card2)', border:'1px solid var(--border)',
            borderRadius:7, padding:'6px 8px', cursor:'pointer', color:'var(--text-muted)',
            fontSize:12, fontFamily:'var(--font-display)', fontWeight:600,
            display:'flex', alignItems:'center', justifyContent:'center', gap:6,
            transition:'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(249,115,22,0.4)'; e.currentTarget.style.color='#f97316' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--text-muted)' }}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
          {showFull && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>
      </div>
    </div>
    )
  }

  /* ── Layout ──────────────────────────────────────────────────── */
  return (
    <div style={{ display:'flex', height:'100dvh', overflow:'hidden', background:'var(--bg)' }}>

      {/* Desktop sidebar — completely hidden on mobile via CSS */}
      <aside style={{
        width: sidebarOpen ? 242 : 52,
        minWidth: sidebarOpen ? 242 : 52,
        background:'var(--surface)',
        borderRight:'1px solid var(--border)',
        transition:'width 0.26s cubic-bezier(0.16,1,0.3,1), min-width 0.26s',
        flexShrink:0,
        display:'flex',
        flexDirection:'column',
        overflow:'hidden',
        // MOBILE FIX: completely hide sidebar on screens < 1024px
        // CSS media query in index.css handles this via .desktop-sidebar
      }} className="desktop-sidebar">
        <SidebarContent />
      </aside>

      {/* Mobile drawer — slides in from left, only shown when mobileOpen=true */}
      {mobileOpen && (
        <>
          {/* Dark backdrop */}
          <div
            onClick={() => setMobileOpen(false)}
            style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.75)', backdropFilter:'blur(3px)', zIndex:40 }}
          />
          {/* Drawer */}
          <aside style={{
            position:'fixed', left:0, top:0, bottom:0, width:270,
            background:'var(--surface)', zIndex:50,
            borderRight:'1px solid var(--border)',
            display:'flex', flexDirection:'column',
            boxShadow:'4px 0 30px rgba(0,0,0,0.5)',
            animation:'slideInLeft 0.25s cubic-bezier(0.16,1,0.3,1)',
          }}>
            {/* Close button */}
            <div style={{ display:'flex', justifyContent:'flex-end', padding:'10px 10px 0', flexShrink:0 }}>
              <button
                onClick={() => setMobileOpen(false)}
                style={{ background:'var(--card2)', border:'1px solid var(--border)', color:'var(--text-muted)', width:32, height:32, borderRadius:8, cursor:'pointer', fontSize:14, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700 }}>
                ✕
              </button>
            </div>
            <div style={{ flex:1, overflow:'hidden' }}>
              <SidebarContent mobile={true} />
            </div>
          </aside>
        </>
      )}

      {/* Main content */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', minWidth:0 }}>

        {/* Topbar — clean, no XP clutter */}
        <header style={{ height:50, background:'var(--surface)', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', padding:'0 14px', gap:10, flexShrink:0, zIndex:10 }}>

          {/* Hamburger */}
          <button
            onClick={() => { if (window.innerWidth < 1024) setMobileOpen(s => !s); else setSidebarOpen(s => !s) }}
            style={{ background:'transparent', border:'none', color:'var(--text-muted)', fontSize:17, cursor:'pointer', padding:'4px 5px', display:'flex', alignItems:'center', borderRadius:6, flexShrink:0, transition:'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color='var(--heading)'}
            onMouseLeave={e => e.currentTarget.style.color='var(--text-muted)'}
          >☰</button>

          {/* Mobile logo */}
          <div className="show-mobile-flex" style={{ alignItems:'center', gap:6, flexShrink:0 }}>
            <img src="/logo.svg" alt="JavaQue" style={{ width:26, height:26, borderRadius:6 }} />
            <span style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:13.5, color:'var(--heading)' }}>JavaQue</span>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearch} style={{ flex:1, maxWidth:400 }}>
            <div style={{ position:'relative' }}>
              <span style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:'var(--text-muted)', fontSize:12.5 }}>🔍</span>
              <input value={searchQ} onChange={e => setSearchQ(e.target.value)}
                placeholder="Search topics..."
                style={{ width:'100%', background:'var(--card)', border:'1px solid var(--border)', borderRadius:8, padding:'6px 10px 6px 29px', color:'var(--text)', fontSize:'max(16px,13px)', outline:'none', fontFamily:'var(--font-body)', transition:'border-color 0.15s' }}
                onFocus={e => e.target.style.borderColor='rgba(249,115,22,0.5)'}
                onBlur={e  => e.target.style.borderColor='var(--border)'} />
            </div>
          </form>

          {/* Right side — progress only, no XP badge cluttering */}
          <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
            {/* Compact progress pill */}
            <div style={{ display:'flex', alignItems:'center', gap:8, background:'var(--card)', border:'1px solid var(--border)', borderRadius:20, padding:'4px 12px 4px 8px' }}>
              <div style={{ width:28, height:5, background:'var(--border)', borderRadius:999, overflow:'hidden' }}>
                <div style={{ width:`${pct}%`, height:'100%', background:'linear-gradient(90deg,#f97316,#fbbf24)', borderRadius:999, transition:'width 0.6s' }} />
              </div>
              <span style={{ fontSize:11.5, color:'var(--text-muted)', fontWeight:600, fontFamily:'var(--font-display)', whiteSpace:'nowrap' }}>{completedTopics}/{totalTopics}</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main ref={mainRef} style={{ flex:1, overflowY:'auto', overflowX:'hidden' }}>
          <Outlet />
          <Footer />
        </main>
      </div>
    </div>
  )
}
