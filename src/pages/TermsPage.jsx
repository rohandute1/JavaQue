import { Link } from 'react-router-dom'

const LAST_UPDATED = 'June 1, 2025'

export default function TermsPage() {
  const sections = [
    {
      id:'acceptance', title:'1. Acceptance of Terms',
      content:`By accessing or using JavaQue ("the Platform", "we", "us"), available at https://javaque.dev, you agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use the platform.

These terms apply to all visitors, users, and others who access or use JavaQue.`
    },
    {
      id:'description', title:'2. Description of Service',
      content:`JavaQue is a free online Java programming education platform. The platform provides:

• Structured Java learning topics organised by difficulty
• An interactive code editor (browser-based)
• Quizzes and progress tracking
• A Java learning roadmap
• Interview preparation content
• Data Structures and Algorithms lessons

JavaQue is provided "as is" without warranty of any kind. We reserve the right to modify, suspend, or discontinue any part of the service at any time.`
    },
    {
      id:'use', title:'3. Acceptable Use',
      content:`You agree to use JavaQue only for lawful purposes. You must not:

• Use the platform in any way that violates applicable local, national, or international laws or regulations
• Attempt to gain unauthorised access to any part of the platform or its infrastructure
• Use automated tools (bots, scrapers, crawlers) to extract content in bulk without prior written permission
• Reproduce, redistribute, or sell JavaQue content without explicit written permission
• Engage in any conduct that restricts or inhibits other users' enjoyment of the platform
• Transmit any unsolicited advertising or promotional material ("spam")

We reserve the right to terminate access for users who violate these terms.`
    },
    {
      id:'ip', title:'4. Intellectual Property',
      content:`All content on JavaQue — including but not limited to text, code examples, quiz questions, diagrams, design, and organisation of content — is the intellectual property of JavaQue and its contributors, protected by applicable copyright and intellectual property laws.

You are granted a limited, non-exclusive, non-transferable licence to:
• Access and use the content for personal, non-commercial learning purposes
• Share links to specific topics or pages on JavaQue

You may not:
• Copy, reproduce, or republish significant portions of JavaQue content on other platforms without permission
• Create derivative works for commercial purposes
• Remove any copyright or proprietary notices

Code examples provided for educational purposes may be used in personal and commercial projects, but must not be resold as educational material.`
    },
    {
      id:'advertising', title:'5. Third-Party Advertising',
      content:`JavaQue displays advertisements served by Google AdSense and potentially other third-party advertising networks. These advertisements help fund the platform and keep it free for all users.

We do not endorse any products or services advertised on the platform. We are not responsible for the content of external advertisements or websites you access through them.

You acknowledge that:
• Third-party advertisers may use cookies to serve personalised advertisements
• You can opt out of personalised advertising through Google's Ad Settings
• Ad content is determined by third-party algorithms, not by JavaQue`
    },
    {
      id:'disclaimer', title:'6. Disclaimer of Warranties',
      content:`JavaQue is provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied, including but not limited to:

• Warranties of merchantability or fitness for a particular purpose
• Warranties that the platform will be uninterrupted, error-free, or secure
• Warranties as to the accuracy, completeness, or currency of content

While we strive to provide accurate and up-to-date Java content, programming languages and best practices evolve. We recommend verifying critical information against official Java documentation (https://docs.oracle.com/en/java/).`
    },
    {
      id:'liability', title:'7. Limitation of Liability',
      content:`To the maximum extent permitted by applicable law, JavaQue and its team shall not be liable for any:

• Direct, indirect, incidental, or consequential damages arising from your use of the platform
• Loss of data, profits, or business opportunities
• Errors or inaccuracies in content
• Damages resulting from third-party services (including advertisements)

Your sole remedy for dissatisfaction with the platform is to stop using it.`
    },
    {
      id:'progress', title:'8. User Data & Progress',
      content:`Your learning progress, XP, bookmarks, and preferences are stored locally in your browser using localStorage. This data:

• Is not transmitted to or stored on JavaQue servers
• Remains entirely on your device
• Will be lost if you clear your browser data or switch devices

JavaQue is not responsible for any loss of progress data resulting from browser data clearing, device changes, or technical issues.`
    },
    {
      id:'links', title:'9. Third-Party Links',
      content:`JavaQue may contain links to third-party websites or resources (e.g., official Java documentation, GitHub). These links are provided for convenience only.

We have no control over the content, privacy policies, or practices of any third-party websites and accept no responsibility for them. We encourage you to review the privacy policy and terms of any third-party site you visit.`
    },
    {
      id:'changes', title:'10. Changes to Terms',
      content:`We reserve the right to update these Terms & Conditions at any time. Changes will be posted on this page with an updated "Last Updated" date. Your continued use of JavaQue after changes are posted constitutes your acceptance of the new terms.

For material changes, we will make reasonable efforts to notify users via prominent notice on the platform.`
    },
    {
      id:'termination', title:'11. Termination',
      content:`We reserve the right to terminate or restrict your access to JavaQue at any time, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, third parties, or for any other reason at our sole discretion.`
    },
    {
      id:'governing', title:'12. Governing Law',
      content:`These Terms shall be governed by and construed in accordance with applicable laws. Any disputes shall be resolved through good-faith negotiation first. If unresolved, disputes shall be subject to the exclusive jurisdiction of applicable courts.`
    },
    {
      id:'contact', title:'13. Contact',
      content:`For questions about these Terms & Conditions, please contact us:

Email: connect.JavaQue@gmail.com
Contact Form: https://javaque.dev/contact`
    },
  ]

  return (
    <div style={{ minHeight:'100%', background:'var(--bg)' }}>

      {/* Header */}
      <div style={{ background:'var(--surface)', borderBottom:'1px solid var(--border)', padding:'36px 36px 32px' }}>
        <div style={{ maxWidth:760 }}>
          <div style={{ display:'flex', gap:8, marginBottom:12, fontSize:12, color:'var(--text-muted)', fontFamily:'var(--font-body)' }}>
            <Link to="/" style={{ color:'var(--text-muted)', textDecoration:'none' }}>Home</Link>
            <span>›</span>
            <span style={{ color:'var(--heading)' }}>Terms & Conditions</span>
          </div>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:30, fontWeight:800, color:'var(--heading)', marginBottom:10, letterSpacing:'-0.03em' }}>
            Terms & Conditions
          </h1>
          <div style={{ fontSize:13.5, color:'var(--text-muted)', fontFamily:'var(--font-body)' }}>
            Last Updated: <strong style={{ color:'var(--heading)' }}>{LAST_UPDATED}</strong>
            {' '}· Effective Date: <strong style={{ color:'var(--heading)' }}>June 1, 2025</strong>
          </div>
        </div>
      </div>

      <div className="legal-grid" style={{ maxWidth:900, margin:'0 auto', padding:'36px 36px', display:'grid', gridTemplateColumns:'220px 1fr', gap:36, alignItems:'start' }}>

        {/* Table of contents */}
        <div style={{ position:'sticky', top:20 }}>
          <div style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:13, padding:'18px', fontSize:12.5 }}>
            <div style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--heading)', marginBottom:12, fontSize:13 }}>Contents</div>
            {sections.map(s => (
              <a key={s.id} href={`#${s.id}`}
                style={{ display:'block', color:'var(--text-muted)', textDecoration:'none', padding:'5px 0', fontFamily:'var(--font-body)', borderBottom:'1px solid var(--border)', lineHeight:1.4, transition:'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color='#f97316'}
                onMouseLeave={e => e.currentTarget.style.color='var(--text-muted)'}>
                {s.title}
              </a>
            ))}
          </div>
        </div>

        {/* Content */}
        <div>
          <div style={{ background:'rgba(251,191,36,0.08)', border:'1px solid rgba(251,191,36,0.25)', borderRadius:12, padding:'14px 18px', marginBottom:28, fontSize:13.5, color:'var(--text)', fontFamily:'var(--font-body)', lineHeight:1.7 }}>
            ⚠️ Please read these Terms carefully before using JavaQue. By using the platform, you agree to these terms.
          </div>

          {sections.map(s => (
            <div key={s.id} id={s.id} style={{ marginBottom:32 }}>
              <h2 style={{ fontFamily:'var(--font-display)', fontWeight:800, color:'var(--heading)', fontSize:17, marginBottom:12, paddingBottom:10, borderBottom:'1px solid var(--border)' }}>{s.title}</h2>
              <div style={{ color:'var(--text)', fontSize:14.5, lineHeight:1.9, fontFamily:'var(--font-body)', whiteSpace:'pre-line' }}>{s.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
