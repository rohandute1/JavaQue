import { Link } from 'react-router-dom'

const LAST_UPDATED = 'June 1, 2025'

export default function PrivacyPage() {
  const sections = [
    {
      id: 'overview', title: '1. Overview',
      content: `JavaQue ("we", "us", "our") is committed to protecting your privacy. This Privacy Policy explains what information we collect, how we use it, and your rights regarding that information when you use JavaQue (https://javaque.dev) — a free Java learning platform.

By using JavaQue, you agree to the practices described in this policy.`
    },
    {
      id: 'collect', title: '2. Information We Collect',
      content: `We collect minimal information necessary to operate the platform:

Local Storage Data (stored only on your device):
• Learning progress — which topics you have completed
• XP (experience points) accumulated
• Bookmarked topics
• Theme preference (dark or light mode)

This data never leaves your browser and is not transmitted to our servers.

Contact Form Submissions:
When you use the contact form, we collect your name, email address, and message content solely to respond to your inquiry.

Automatically Collected Data (via third-party services):
• Google AdSense may collect cookies and usage data for ad personalisation
• Standard web server logs (IP address, browser type, referring URL, pages visited) may be retained for up to 30 days for security and performance purposes`
    },
    {
      id: 'use', title: '3. How We Use Your Information',
      content: `We use information for the following purposes:

• To operate and improve the JavaQue platform
• To respond to contact form submissions
• To serve relevant advertisements via Google AdSense
• To analyse anonymous usage patterns and improve content quality
• To detect and prevent security threats or abuse

We do not sell, rent, or trade your personal information to third parties.`
    },
    {
      id: 'cookies', title: '4. Cookies & Tracking',
      content: `JavaQue uses the following types of cookies:

Essential Cookies:
Necessary for core platform functionality (e.g., theme preferences stored locally).

Analytics Cookies (Google Analytics, if enabled):
We may use Google Analytics to understand aggregate usage patterns. This data is anonymised and does not identify individual users.

Advertising Cookies (Google AdSense):
Google AdSense uses cookies to serve personalised advertisements based on your browsing behaviour. You can opt out of personalised ads by visiting Google's Ad Settings at https://adssettings.google.com.

You can control cookies through your browser settings. Disabling cookies may affect some platform functionality.`
    },
    {
      id: 'adsense', title: '5. Google AdSense & Third-Party Advertising',
      content: `JavaQue displays advertisements served by Google AdSense. Google, as a third-party vendor, uses cookies (including the DoubleClick cookie) to serve ads based on a user's prior visits to our website and other sites on the internet.

Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to JavaQue and/or other sites on the Internet.

You may opt out of personalised advertising by visiting Google's Ads Settings: https://www.google.com/settings/ads

For more information about how Google uses data from its advertising partners, visit: https://policies.google.com/technologies/partner-sites`
    },
    {
      id: 'children', title: '6. Children\'s Privacy',
      content: `JavaQue is a general educational platform. We do not knowingly collect personal information from children under the age of 13.

If you believe we have inadvertently collected information from a child under 13, please contact us immediately at connect.JavaQue@gmail.com and we will delete that information promptly.`
    },
    {
      id: 'retention', title: '7. Data Retention',
      content: `Local storage data (progress, bookmarks, XP, preferences) exists only on your device and is controlled entirely by you. You can clear it at any time by clearing your browser's local storage.

Contact form submissions are retained only as long as necessary to respond to your inquiry, typically no longer than 90 days.

Web server logs are retained for up to 30 days for security purposes.`
    },
    {
      id: 'rights', title: '8. Your Rights',
      content: `Depending on your location, you may have the following rights:

• Right to Access — You may request a copy of any personal data we hold about you
• Right to Deletion — You may request deletion of your personal data
• Right to Rectification — You may correct inaccurate personal information
• Right to Object — You may object to certain types of data processing
• Right to Withdraw Consent — Where processing is based on consent, you may withdraw it at any time

Since most data is stored locally on your device, you have full control over it through your browser settings.

To exercise rights related to contact form data, email us at connect.JavaQue@gmail.com.`
    },
    {
      id: 'security', title: '9. Security',
      content: `We take reasonable measures to protect the limited information we collect. JavaQue uses HTTPS encryption for all data transmitted between your browser and our servers.

However, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.`
    },
    {
      id: 'changes', title: '10. Changes to This Policy',
      content: `We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date. Your continued use of JavaQue after any changes constitutes your acceptance of the revised policy.

We encourage you to review this policy periodically.`
    },
    {
      id: 'contact', title: '11. Contact Us',
      content: `If you have questions or concerns about this Privacy Policy, please contact us:

Email: connect.JavaQue@gmail.com
Contact Form: https://javaque.dev/contact

We will respond within 48 hours.`
    },
  ]

  return (
    <div style={{ minHeight:'100%', background:'var(--bg)' }}>

      {/* Header */}
      <div style={{ background:'var(--surface)', borderBottom:'1px solid var(--border)', padding:'36px 36px 32px' }}>
        <div style={{ maxWidth: 760 }}>
          <div style={{ display:'flex', gap:8, marginBottom:12, fontSize:12, color:'var(--text-muted)', fontFamily:'var(--font-body)' }}>
            <Link to="/" style={{ color:'var(--text-muted)', textDecoration:'none' }}>Home</Link>
            <span>›</span>
            <span style={{ color:'var(--heading)' }}>Privacy Policy</span>
          </div>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:30, fontWeight:800, color:'var(--heading)', marginBottom:10, letterSpacing:'-0.03em' }}>
            Privacy Policy
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
          <div style={{ background:'rgba(88,166,255,0.08)', border:'1px solid rgba(88,166,255,0.25)', borderRadius:12, padding:'14px 18px', marginBottom:28, fontSize:13.5, color:'var(--text)', fontFamily:'var(--font-body)', lineHeight:1.7 }}>
            ℹ️ <strong>Summary:</strong> JavaQue stores your learning progress locally on your device only. We don't require an account and don't sell your data. We use Google AdSense for advertising.
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
