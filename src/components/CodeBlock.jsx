import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function CodeBlock({ code, language='java', showOutput=false, output='', onRun }) {
  const [copied,  setCopied]  = useState(false)
  const [running, setRunning] = useState(false)
  const [showOut, setShowOut] = useState(false)

  const handleCopy = () => {
    navigator.clipboard?.writeText(code).then(() => { setCopied(true); setTimeout(()=>setCopied(false),2000) })
  }
  const handleRun = async () => {
    setRunning(true)
    await new Promise(r => setTimeout(r,700))
    setRunning(false); setShowOut(true)
    onRun?.()
  }

  return (
    <div style={{ borderRadius:14, overflow:'hidden', border:'1px solid #1e2d3d', marginBottom:20, boxShadow:'0 4px 24px rgba(0,0,0,0.3)' }}>
      {/* Toolbar */}
      <div style={{ background:'#0d1117', padding:'10px 16px', display:'flex', alignItems:'center', gap:10, borderBottom:'1px solid #1e2d3d' }}>
        <div style={{ display:'flex', gap:6 }}>
          <div style={{ width:12, height:12, borderRadius:'50%', background:'#ff5f57' }} />
          <div style={{ width:12, height:12, borderRadius:'50%', background:'#febc2e' }} />
          <div style={{ width:12, height:12, borderRadius:'50%', background:'#28c840' }} />
        </div>
        <span style={{ color:'#4a5568', fontSize:12, fontFamily:'var(--font-code)', flex:1 }}>Main.java</span>
        <div style={{ display:'flex', gap:7, marginLeft:'auto' }}>
          <button onClick={handleCopy}
            style={{ background:'transparent', border:'1px solid #2d3748', color: copied ? '#3fb950' : '#718096', padding:'3px 11px', borderRadius:6, cursor:'pointer', fontSize:11.5, fontFamily:'var(--font-display)', fontWeight:600, transition:'all 0.15s' }}>
            {copied ? '✓ Copied' : 'Copy'}
          </button>
          {showOutput && (
            <button onClick={handleRun} disabled={running}
              style={{ background: running ? '#2d3748' : 'linear-gradient(135deg,#f97316,#ea580c)', border:'none', color:'#fff', padding:'3px 14px', borderRadius:6, cursor: running?'default':'pointer', fontSize:11.5, fontWeight:700, fontFamily:'var(--font-display)', transition:'all 0.2s', boxShadow: running ? 'none' : '0 2px 10px rgba(249,115,22,0.35)' }}>
              {running ? '⏳ Running...' : '▶ Run'}
            </button>
          )}
        </div>
      </div>

      {/* Code */}
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{ margin:0, borderRadius:0, background:'#0d1117', fontSize:13.5, lineHeight:1.75, maxHeight:500, overflowY:'auto', fontFamily:'JetBrains Mono, Fira Code, monospace' }}
        showLineNumbers
        lineNumberStyle={{ color:'#2d3748', fontSize:11.5, paddingRight:16, userSelect:'none', fontFamily:'JetBrains Mono, monospace' }}>
        {code}
      </SyntaxHighlighter>

      {/* Output */}
      {showOutput && showOut && output && (
        <div style={{ background:'#060a10', borderTop:'1px solid #1e2d3d', padding:'14px 18px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
            <span style={{ width:8, height:8, borderRadius:'50%', background:'#3fb950', display:'inline-block', boxShadow:'0 0 8px #3fb950' }} />
            <span style={{ color:'#3fb950', fontSize:11, fontWeight:700, letterSpacing:'0.08em', fontFamily:'var(--font-display)' }}>OUTPUT</span>
          </div>
          <pre style={{ color:'#a3e635', margin:0, fontSize:13, lineHeight:1.8, fontFamily:'var(--font-code)', whiteSpace:'pre-wrap', background:'transparent', border:'none', padding:0 }}>
            {output}
          </pre>
        </div>
      )}
    </div>
  )
}
