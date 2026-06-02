import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import LearnPage from './pages/LearnPage.jsx'
import TopicPage from './pages/TopicPage.jsx'
import CompilerPage from './pages/CompilerPage.jsx'
import RoadmapPage from './pages/RoadmapPage.jsx'
import SearchPage from './pages/SearchPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import PrivacyPage from './pages/PrivacyPage.jsx'
import TermsPage from './pages/TermsPage.jsx'
import { safeLocalGet, safeLocalSet } from './utils/security.js'

export default function App() {
  const [theme,    setTheme]    = useState(() => safeLocalGet('theme', 'dark'))
  const [progress, setProgress] = useState(() => safeLocalGet('jv_progress', {}))
  const [bookmarks,setBookmarks]= useState(() => {
    const raw = safeLocalGet('jv_bookmarks', [])
    // Validate: must be array of strings
    return Array.isArray(raw) ? raw.filter(b => typeof b === 'string' && b.length < 60) : []
  })
  const [xp, setXp] = useState(() => {
    const raw = safeLocalGet('jv_xp', 0)
    // Validate: must be a non-negative number, cap at 99999 to prevent manipulation
    const n = parseInt(raw, 10)
    return (!isNaN(n) && n >= 0) ? Math.min(n, 99999) : 0
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    safeLocalSet('theme', theme)
  }, [theme])

  useEffect(() => { safeLocalSet('jv_progress', progress) }, [progress])
  useEffect(() => { safeLocalSet('jv_bookmarks', bookmarks) }, [bookmarks])
  useEffect(() => { safeLocalSet('jv_xp', xp) }, [xp])

  const markComplete = (topicId, earnedXp = 50) => {
    // Validate topicId before storing (only alphanumeric + hyphens)
    if (typeof topicId !== 'string' || !/^[a-z0-9-]{1,60}$/.test(topicId)) return
    // Validate XP is a reasonable number
    const safeXp = typeof earnedXp === 'number' && earnedXp > 0 && earnedXp < 1000 ? earnedXp : 50
    setProgress(p => ({ ...p, [topicId]: true }))
    setXp(x => Math.min(x + safeXp, 99999))
  }

  const toggleBookmark = (topicId) => {
    if (typeof topicId !== 'string' || !/^[a-z0-9-]{1,60}$/.test(topicId)) return
    setBookmarks(b => b.includes(topicId) ? b.filter(id => id !== topicId) : [...b, topicId])
  }

  const ctx = { theme, setTheme, progress, markComplete, bookmarks, toggleBookmark, xp, setXp }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout {...ctx} />}>
          <Route index element={<Dashboard {...ctx} />} />
          <Route path="learn" element={<LearnPage {...ctx} />} />
          <Route path="learn/:topicId" element={<TopicPage {...ctx} />} />
          <Route path="compiler" element={<CompilerPage theme={theme} />} />
          <Route path="roadmap" element={<RoadmapPage progress={progress} />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="privacy-policy" element={<PrivacyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
