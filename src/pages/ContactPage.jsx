import { useState } from 'react'
import { Link } from 'react-router-dom'
import { sanitiseText, isValidEmail, isValidName, isValidMessage, isRateLimited } from '../utils/security.js'

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const subjects = [
    'General Question',
    'Bug Report',
    'Content Feedback',
    'Feature Request',
    'Business / Advertising',
    'Other',
  ]

  const handleSubmit = (e) => {
    e.preventDefault()

    // Rate limiting — max 1 submission per 30 seconds
    if (isRateLimited('contact_form', 30000)) {
      setError('Please wait 30 seconds before submitting again.')
      return
    }

    // Sanitise all inputs before validation
    const safeName    = sanitiseText(form.name)
    const safeEmail   = form.email.trim().toLowerCase().slice(0, 254)
    const safeMessage = sanitiseText(form.message)

    // Validate
    if (!safeName || !safeEmail || !safeMessage) {
      setError('Please fill in all required fields.')
      return
    }
    if (!isValidName(safeName)) {
      setError('Name should only contain letters and be 2–80 characters.')
      return
    }
    if (!isValidEmail(safeEmail)) {
      setError('Please enter a valid email address.')
      return
    }
    if (!isValidMessage(safeMessage)) {
      setError('Message must be 10–2000 characters and must not contain scripts.')
      return
    }

    setError('')
    setSubmitted(true)
  }

  const faqs = [
    { q: 'Is JavaQue completely free?', a: 'Yes — 100% free. Every topic, quiz, and the code editor are free with no subscription or account required.' },
    { q: 'Do I need to create an account?', a: 'No. Your learning progress and bookmarks are saved automatically in your browser\'s local storage.' },
    { q: 'I found a bug — how do I report it?', a: 'Use the contact form and select "Bug Report". Please include the page URL and what you expected vs what happened.' },
    { q: 'Can I suggest new topics?', a: 'Absolutely! Select "Feature Request" and describe the topic or feature you\'d like added.' },
    { q: 'How can I advertise on JavaQue?', a: 'Select "Business / Advertising" in the form and we\'ll get back to you with details.' },
    { q: 'What if the code editor isn\'t working?', a: 'Try refreshing the page or clearing your browser cache. If the issue persists, please use "Bug Report".' },
  ]

  if (submitted) return (
    <div style={{ minHeight:'100%', background:'var(--bg)', display:'flex', alignItems:'center', justifyContent:'center', padding:36 }}>
      <div style={{ maxWidth:480, textAlign:'center' }}>
        <div style={{ fontSize:64, marginBottom:20 }}>✅</div>
        <h2 style={{ fontFamily:'var(--font-display)', fontWeight:800, color:'var(--heading)', fontSize:24, marginBottom:12 }}>Message Sent!</h2>
        <p style={{ color:'var(--text-muted)', fontSize:15, lineHeight:1.8, fontFamily:'var(--font-body)', marginBottom:28 }}>
          Thank you for reaching out, <strong style={{ color:'var(--heading)' }}>{form.name}</strong>. We typically respond within 24–48 hours.
        </p>
        <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
          <Link to="/" style={{ background:'linear-gradient(135deg,#f97316,#ea580c)', color:'#fff', padding:'11px 24px', borderRadius:11, textDecoration:'none', fontFamily:'var(--font-display)', fontWeight:700, fontSize:14 }}>
            Back to Dashboard
          </Link>
          <button onClick={() => { setSubmitted(false); setForm({ name:'', email:'', subject:'', message:'' }) }}
            style={{ background:'var(--card)', border:'1px solid var(--border)', color:'var(--text)', padding:'11px 24px', borderRadius:11, cursor:'pointer', fontFamily:'var(--font-display)', fontWeight:600, fontSize:14 }}>
            Send Another
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight:'100%', background:'var(--bg)' }}>

      {/* Header */}
      <div style={{ background:'linear-gradient(135deg,#0d1117,#111827)', borderBottom:'1px solid var(--border)', padding:'44px 36px 40px' }}>
        <div style={{ maxWidth:760 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(88,166,255,0.1)', border:'1px solid rgba(88,166,255,0.3)', borderRadius:999, padding:'5px 14px', marginBottom:18 }}>
            <span style={{ fontSize:11, fontWeight:700, color:'#58a6ff', letterSpacing:1, fontFamily:'var(--font-display)' }}>CONTACT US</span>
          </div>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(26px,4vw,38px)', fontWeight:800, color:'#e6edf3', marginBottom:14, letterSpacing:'-0.03em' }}>
            Get in Touch
          </h1>
          <p style={{ color:'#8b9db0', fontSize:15.5, lineHeight:1.8, fontFamily:'var(--font-body)' }}>
            Have a question, found a bug, or want to suggest a feature? We'd love to hear from you. We typically respond within 24–48 hours.
          </p>
        </div>
      </div>

      <div className="contact-grid" style={{ maxWidth:900, margin:'0 auto', padding:'40px 36px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:32, alignItems:'start' }}>

        {/* Contact Form */}
        <div>
          <h2 style={{ fontFamily:'var(--font-display)', fontWeight:800, color:'var(--heading)', fontSize:19, marginBottom:20 }}>Send a Message</h2>

          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {/* Name */}
            <div>
              <label style={{ display:'block', fontSize:12.5, fontWeight:700, color:'var(--heading)', marginBottom:6, fontFamily:'var(--font-display)', letterSpacing:0.3 }}>
                Full Name <span style={{ color:'#f97316' }}>*</span>
              </label>
              <input
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Rahul Sharma"
                style={{ width:'100%', background:'var(--card)', border:'1px solid var(--border)', borderRadius:10, padding:'11px 14px', color:'var(--text)', fontSize:16, outline:'none', fontFamily:'var(--font-body)', boxSizing:'border-box', transition:'border-color 0.15s' }}
                onFocus={e => e.target.style.borderColor='rgba(249,115,22,0.5)'}
                onBlur={e  => e.target.style.borderColor='var(--border)'}
              />
            </div>

            {/* Email */}
            <div>
              <label style={{ display:'block', fontSize:12.5, fontWeight:700, color:'var(--heading)', marginBottom:6, fontFamily:'var(--font-display)', letterSpacing:0.3 }}>
                Email Address <span style={{ color:'#f97316' }}>*</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="your@email.com"
                style={{ width:'100%', background:'var(--card)', border:'1px solid var(--border)', borderRadius:10, padding:'11px 14px', color:'var(--text)', fontSize:16, outline:'none', fontFamily:'var(--font-body)', boxSizing:'border-box', transition:'border-color 0.15s' }}
                onFocus={e => e.target.style.borderColor='rgba(249,115,22,0.5)'}
                onBlur={e  => e.target.style.borderColor='var(--border)'}
              />
            </div>

            {/* Subject */}
            <div>
              <label style={{ display:'block', fontSize:12.5, fontWeight:700, color:'var(--heading)', marginBottom:6, fontFamily:'var(--font-display)', letterSpacing:0.3 }}>Subject</label>
              <select
                value={form.subject}
                onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                style={{ width:'100%', background:'var(--card)', border:'1px solid var(--border)', borderRadius:10, padding:'11px 14px', color:'var(--text)', fontSize:16, outline:'none', fontFamily:'var(--font-body)', boxSizing:'border-box', cursor:'pointer' }}>
                <option value="">Select a subject...</option>
                {subjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Message */}
            <div>
              <label style={{ display:'block', fontSize:12.5, fontWeight:700, color:'var(--heading)', marginBottom:6, fontFamily:'var(--font-display)', letterSpacing:0.3 }}>
                Message <span style={{ color:'#f97316' }}>*</span>
              </label>
              <textarea
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                placeholder="Describe your question or feedback in detail..."
                rows={5}
                style={{ width:'100%', background:'var(--card)', border:'1px solid var(--border)', borderRadius:10, padding:'11px 14px', color:'var(--text)', fontSize:16, outline:'none', fontFamily:'var(--font-body)', boxSizing:'border-box', resize:'vertical', transition:'border-color 0.15s' }}
                onFocus={e => e.target.style.borderColor='rgba(249,115,22,0.5)'}
                onBlur={e  => e.target.style.borderColor='var(--border)'}
              />
            </div>

            {error && (
              <div style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:9, padding:'10px 14px', color:'#f87171', fontSize:13, fontFamily:'var(--font-body)' }}>
                ⚠️ {error}
              </div>
            )}

            <button type="submit"
              style={{ background:'linear-gradient(135deg,#58a6ff,#3b82f6)', color:'#fff', border:'none', borderRadius:11, padding:'13px', fontSize:14, fontFamily:'var(--font-display)', fontWeight:700, cursor:'pointer', transition:'opacity 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.opacity='0.9'}
              onMouseLeave={e => e.currentTarget.style.opacity='1'}>
              Send Message →
            </button>

            <div style={{ fontSize:11.5, color:'var(--text-muted)', fontFamily:'var(--font-body)' }}>
              By submitting this form, you agree to our{' '}
              <Link to="/privacy-policy" style={{ color:'#58a6ff', textDecoration:'none' }}>Privacy Policy</Link>.
            </div>
          </form>
        </div>

        {/* FAQ */}
        <div>
          <h2 style={{ fontFamily:'var(--font-display)', fontWeight:800, color:'var(--heading)', fontSize:19, marginBottom:20 }}>Frequently Asked</h2>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:12, padding:'16px 18px' }}>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--heading)', fontSize:13.5, marginBottom:7 }}>
                  {faq.q}
                </div>
                <div style={{ color:'var(--text-muted)', fontSize:13, lineHeight:1.65, fontFamily:'var(--font-body)' }}>{faq.a}</div>
              </div>
            ))}
          </div>

          {/* Contact info */}
          <div style={{ background:'rgba(88,166,255,0.06)', border:'1px solid rgba(88,166,255,0.2)', borderRadius:12, padding:'18px', marginTop:16 }}>
            <div style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--heading)', fontSize:13.5, marginBottom:10 }}>📧 Direct Contact</div>
            <div style={{ color:'var(--text-muted)', fontSize:13, lineHeight:1.7, fontFamily:'var(--font-body)' }}>
              You can also reach us at:<br />
              <strong style={{ color:'#58a6ff' }}>connect.JavaQue@gmail.com</strong>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
