import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()
  const links = {
    Learn:   [{ to:'/learn', label:'Java Basics' }, { to:'/learn/lambda', label:'Java 8 Features' }, { to:'/learn/threads-intro', label:'Multithreading' }, { to:'/learn/dsa-arrays', label:'DSA — Arrays' }, { to:'/learn/interview-core', label:'Interview Prep' }, { to:'/roadmap', label:'Learning Roadmap' }],
    Tools:   [{ to:'/compiler', label:'Code Editor' }, { to:'/search', label:'Search Topics' }, { to:'/roadmap', label:'Java Roadmap' }],
    Company: [{ to:'/about', label:'About Us' }, { to:'/contact', label:'Contact Us' }],
    Legal:   [{ to:'/privacy-policy', label:'Privacy Policy' }, { to:'/terms', label:'Terms & Conditions' }],
  }
  return (
    <footer style={{ background:'var(--surface)', borderTop:'1px solid var(--border)', padding:'36px 32px 20px' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div className="footer-main-grid" style={{ display:'grid', gridTemplateColumns:'220px repeat(4,1fr)', gap:28, marginBottom:28 }}>
          {/* Brand */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:11 }}>
              <img src="/logo.svg" alt="JavaQue" style={{ width:32, height:32, borderRadius:8, boxShadow:'0 3px 10px rgba(249,115,22,0.3)' }} />
              <div>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:14.5, color:'var(--heading)' }}>JavaQue</div>
                <div style={{ fontSize:7.5, color:'#f97316', fontWeight:700, letterSpacing:'0.12em' }}>LEARN · CODE · QUEUE</div>
              </div>
            </div>
            <p style={{ color:'var(--text-muted)', fontSize:12, lineHeight:1.7, fontFamily:'var(--font-body)', marginBottom:12 }}>
              The best free Java learning platform. From beginner to interview-ready — 100% free, no account needed.
            </p>
            <a href="mailto:connect.JavaQue@gmail.com" style={{ color:'#58a6ff', fontSize:11.5, fontFamily:'var(--font-body)', textDecoration:'none' }}>
              ✉️ connect.JavaQue@gmail.com
            </a>
          </div>
          {/* Link columns */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <div style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--heading)', fontSize:11.5, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:11 }}>{group}</div>
              <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                {items.map(item => (
                  <Link key={item.to} to={item.to} style={{ color:'var(--text-muted)', textDecoration:'none', fontSize:12.5, fontFamily:'var(--font-body)', transition:'color 0.12s' }}
                    onMouseEnter={e => e.currentTarget.style.color='#f97316'}
                    onMouseLeave={e => e.currentTarget.style.color='var(--text-muted)'}>{item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop:'1px solid var(--border)', paddingTop:16 }}>
          <div className="footer-bottom-row" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:10 }}>
            <div style={{ fontSize:12, color:'var(--text-muted)', fontFamily:'var(--font-body)' }}>
              © {year} JavaQue. All rights reserved. Made with ☕ for Java learners worldwide.
            </div>
            <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
              {[{ to:'/privacy-policy',label:'Privacy Policy' },{ to:'/terms',label:'Terms' },{ to:'/contact',label:'Contact' },{ to:'/about',label:'About' }].map(l => (
                <Link key={l.to} to={l.to} style={{ color:'var(--text-muted)', textDecoration:'none', fontSize:11.5, fontFamily:'var(--font-body)', transition:'color 0.12s' }}
                  onMouseEnter={e => e.currentTarget.style.color='#f97316'}
                  onMouseLeave={e => e.currentTarget.style.color='var(--text-muted)'}>{l.label}
                </Link>
              ))}
            </div>
          </div>
          <div style={{ marginTop:10, fontSize:10.5, color:'var(--text-muted)', fontFamily:'var(--font-body)', lineHeight:1.6, opacity:0.65 }}>
            JavaQue participates in the Google AdSense programme. Advertisements help keep this platform free. By using JavaQue, you agree to our{' '}
            <Link to="/privacy-policy" style={{ color:'var(--text-muted)', textDecoration:'underline' }}>Privacy Policy</Link> and{' '}
            <Link to="/terms" style={{ color:'var(--text-muted)', textDecoration:'underline' }}>Terms & Conditions</Link>.
          </div>
        </div>
      </div>
    </footer>
  )
}
