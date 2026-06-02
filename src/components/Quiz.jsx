import { useState } from 'react'

export default function Quiz({ questions, onComplete }) {
  const [current,  setCurrent]  = useState(0)
  const [selected, setSelected] = useState(null)
  const [answers,  setAnswers]  = useState([])
  const [done,     setDone]     = useState(false)

  if (!questions?.length) return null

  const q      = questions[current]
  const isLast = current === questions.length - 1
  const total  = questions.length

  const handleSelect = (idx) => { if (selected !== null) return; setSelected(idx) }

  const handleNext = () => {
    const newAnswers = [...answers, selected]
    setAnswers(newAnswers)
    if (isLast) {
      setDone(true)
      const score = newAnswers.filter((a,i) => a === questions[i].correct).length
      onComplete?.(score, total)
    } else {
      setCurrent(c => c+1)
      setSelected(null)
    }
  }

  const handleRetry = () => { setCurrent(0); setSelected(null); setAnswers([]); setDone(false) }

  if (done) {
    const score = answers.filter((a,i) => a === questions[i].correct).length
    const pct   = Math.round((score / total) * 100)
    const config = pct >= 80
      ? { emoji:'🎉', label:'Excellent!',  msg:"You've mastered this topic!", color:'#3fb950', bg:'rgba(63,185,80,0.1)',   border:'rgba(63,185,80,0.3)' }
      : pct >= 60
      ? { emoji:'👍', label:'Good job!',   msg:'Review the wrong answers and try again.', color:'#fbbf24', bg:'rgba(251,191,36,0.1)', border:'rgba(251,191,36,0.3)' }
      : { emoji:'📚', label:'Keep going!', msg:"Study the theory and try again — you'll get it!", color:'#f87171', bg:'rgba(248,113,113,0.1)', border:'rgba(248,113,113,0.3)' }

    return (
      <div>
        {/* Score card */}
        <div style={{ background:config.bg, border:`1px solid ${config.border}`, borderRadius:16, padding:'28px', textAlign:'center', marginBottom:24 }}>
          <div style={{ fontSize:52, marginBottom:12 }}>{config.emoji}</div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:38, fontWeight:900, color:config.color, marginBottom:4 }}>{pct}%</div>
          <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:16, color:'var(--heading)', marginBottom:6 }}>{config.label}</div>
          <div style={{ color:'var(--text-muted)', fontSize:13.5, marginBottom:4, fontFamily:'var(--font-body)' }}>
            {score} of {total} correct · +{score * 25} XP earned
          </div>
          <div style={{ color:'var(--text-muted)', fontSize:13, fontFamily:'var(--font-body)' }}>{config.msg}</div>
        </div>

        {/* Answer review */}
        <div style={{ marginBottom:22 }}>
          <div style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--heading)', fontSize:14, marginBottom:12 }}>Answer Review</div>
          {questions.map((q, i) => {
            const correct = answers[i] === q.correct
            return (
              <div key={i} style={{ background: correct ? 'rgba(63,185,80,0.07)' : 'rgba(248,113,113,0.07)', border:`1px solid ${correct ? 'rgba(63,185,80,0.25)' : 'rgba(248,113,113,0.25)'}`, borderRadius:11, padding:'12px 16px', marginBottom:8 }}>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:600, color:'var(--heading)', fontSize:13.5, marginBottom:6, display:'flex', gap:8, alignItems:'flex-start' }}>
                  <span style={{ background: correct ? 'rgba(63,185,80,0.2)' : 'rgba(248,113,113,0.2)', color: correct ? '#3fb950' : '#f87171', borderRadius:5, padding:'1px 7px', fontSize:11, flexShrink:0, fontWeight:800 }}>{correct ? '✓' : '✗'}</span>
                  {i+1}. {q.q}
                </div>
                <div style={{ fontSize:12.5, paddingLeft:8, fontFamily:'var(--font-body)' }}>
                  <span style={{ color: correct ? '#3fb950' : '#f87171' }}>Your answer: <strong>{q.options[answers[i]]}</strong></span>
                  {!correct && <span style={{ color:'#3fb950', marginLeft:10 }}> ✓ Correct: <strong>{q.options[q.correct]}</strong></span>}
                </div>
              </div>
            )
          })}
        </div>

        <button onClick={handleRetry}
          style={{ background:'linear-gradient(135deg,#f97316,#ea580c)', border:'none', color:'#fff', padding:'11px 26px', borderRadius:11, cursor:'pointer', fontWeight:800, fontSize:14, fontFamily:'var(--font-display)', boxShadow:'0 4px 16px rgba(249,115,22,0.3)', transition:'all 0.2s' }}>
          🔄 Try Again
        </button>
      </div>
    )
  }

  const optionLabels = ['A', 'B', 'C', 'D']

  return (
    <div>
      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
        <span style={{ fontFamily:'var(--font-display)', fontSize:13, color:'var(--text-muted)', fontWeight:600 }}>
          Question {current+1} <span style={{ color:'var(--border2)' }}>of</span> {total}
        </span>
        <span style={{ fontFamily:'var(--font-display)', fontSize:12, color:'#f97316', fontWeight:700, background:'rgba(249,115,22,0.1)', border:'1px solid rgba(249,115,22,0.25)', borderRadius:6, padding:'2px 9px' }}>
          +25 XP per correct
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ background:'var(--border)', borderRadius:999, height:5, marginBottom:24, overflow:'hidden' }}>
        <div style={{ width:`${(current/total)*100}%`, background:'linear-gradient(90deg,#f97316,#fbbf24)', height:'100%', borderRadius:999, transition:'width 0.5s cubic-bezier(0.16,1,0.3,1)' }} />
      </div>

      {/* Question */}
      <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:16.5, color:'var(--heading)', lineHeight:1.55, marginBottom:20, padding:'16px 20px', background:'var(--card2)', borderRadius:12, border:'1px solid var(--border)' }}>
        {q.q}
      </div>

      {/* Options */}
      <div style={{ display:'flex', flexDirection:'column', gap:9, marginBottom:22 }}>
        {q.options.map((opt, i) => {
          let bg     = 'var(--card2)'
          let border = 'var(--border)'
          let color  = 'var(--text)'
          let labelBg = 'var(--border)'
          let labelColor = 'var(--text-muted)'

          if (selected !== null) {
            if (i === q.correct) {
              bg = 'rgba(63,185,80,0.1)'; border = '#3fb950'; color = '#3fb950'
              labelBg = '#3fb950'; labelColor = '#000'
            } else if (i === selected && i !== q.correct) {
              bg = 'rgba(248,113,113,0.1)'; border = '#f87171'; color = '#f87171'
              labelBg = '#f87171'; labelColor = '#fff'
            }
          }

          return (
            <button key={i} onClick={() => handleSelect(i)}
              style={{ background:bg, border:`1px solid ${border}`, color, padding:'13px 16px', borderRadius:11, cursor: selected!==null ? 'default' : 'pointer', textAlign:'left', fontSize:14, fontFamily:'var(--font-body)', fontWeight:500, display:'flex', alignItems:'center', gap:12, transition:'all 0.2s', lineHeight:1.5 }}>
              <span style={{ width:26, height:26, borderRadius:7, background:labelBg, color:labelColor, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:800, flexShrink:0, fontFamily:'var(--font-display)', transition:'all 0.2s' }}>
                {optionLabels[i]}
              </span>
              {opt}
            </button>
          )
        })}
      </div>

      {/* Feedback + Next */}
      {selected !== null && (
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:12, flexWrap:'wrap', padding:'14px 18px', background: selected===q.correct ? 'rgba(63,185,80,0.08)' : 'rgba(248,113,113,0.08)', border:`1px solid ${selected===q.correct ? 'rgba(63,185,80,0.25)' : 'rgba(248,113,113,0.25)'}`, borderRadius:11 }}>
          <div style={{ fontSize:14, color: selected===q.correct ? '#3fb950' : '#f87171', fontWeight:700, fontFamily:'var(--font-display)', display:'flex', alignItems:'center', gap:8 }}>
            {selected===q.correct
              ? <><span>✅</span> Correct! +25 XP</>
              : <><span>❌</span> Correct answer: <span style={{ color:'#3fb950' }}>{q.options[q.correct]}</span></>
            }
          </div>
          <button onClick={handleNext}
            style={{ background:'linear-gradient(135deg,#f97316,#ea580c)', border:'none', color:'#fff', padding:'10px 22px', borderRadius:10, cursor:'pointer', fontWeight:800, fontSize:13.5, fontFamily:'var(--font-display)', boxShadow:'0 4px 14px rgba(249,115,22,0.3)', transition:'all 0.2s' }}>
            {isLast ? '🏁 Finish Quiz' : 'Next →'}
          </button>
        </div>
      )}
    </div>
  )
}
