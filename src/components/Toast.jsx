import { useState, useEffect, createContext, useContext, useCallback } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((msg, type = 'success', duration = 3000) => {
    const id = Date.now()
    setToasts(t => [...t, { id, msg, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), duration)
  }, [])

  const colors = { success: '#4ade80', error: '#f87171', info: '#38bdf8', warning: '#fbbf24' }
  const icons  = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' }

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {toasts.map(toast => (
          <div key={toast.id} style={{ background: 'var(--card)', border: `1px solid ${colors[toast.type]}`, borderRadius: 10, padding: '12px 18px', color: 'var(--text)', fontSize: 13, fontWeight: 600, maxWidth: 300, boxShadow: `0 8px 24px rgba(0,0,0,0.3)`, display: 'flex', alignItems: 'center', gap: 10, animation: 'slideUp 0.3s ease' }}>
            <span style={{ fontSize: 16 }}>{icons[toast.type]}</span>
            <span>{toast.msg}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
