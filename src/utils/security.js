// ═══════════════════════════════════════════════════════════════
//  JavaQue Security Utilities
//  All user input goes through these functions before being used.
// ═══════════════════════════════════════════════════════════════

/**
 * SANITISE TEXT INPUT
 * Strips HTML tags and dangerous characters from any user input.
 * Prevents XSS (Cross-Site Scripting) attacks.
 */
export function sanitiseText(input) {
  if (typeof input !== 'string') return ''
  return input
    .replace(/&/g, '&amp;')       // & → &amp;
    .replace(/</g, '&lt;')        // < → &lt;   (kills HTML tags)
    .replace(/>/g, '&gt;')        // > → &gt;
    .replace(/"/g, '&quot;')      // " → &quot;
    .replace(/'/g, '&#x27;')      // ' → &#x27;
    .replace(/\//g, '&#x2F;')     // / → &#x2F;
    .replace(/`/g, '&#96;')       // ` → &#96;  (kills template literals)
    .trim()
}

/**
 * VALIDATE EMAIL
 * Strict email pattern check.
 */
export function isValidEmail(email) {
  const pattern = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/
  return pattern.test(email) && email.length <= 254
}

/**
 * VALIDATE NAME
 * Only letters, spaces, hyphens, apostrophes. No scripts.
 */
export function isValidName(name) {
  const pattern = /^[a-zA-Z\u00C0-\u024F\s'\-]{2,80}$/
  return pattern.test(name.trim())
}

/**
 * VALIDATE MESSAGE
 * Ensures message is not empty, not too short, not too long,
 * and does not contain suspicious script patterns.
 */
export function isValidMessage(message) {
  if (!message || message.trim().length < 10) return false
  if (message.length > 2000) return false
  // Block obvious script injection attempts
  const dangerous = /<script|javascript:|data:|vbscript:|onload=|onerror=|onclick=/i
  return !dangerous.test(message)
}

/**
 * RATE LIMITER (client-side)
 * Prevents form spam by limiting submissions.
 * Key = action name, limitMs = minimum ms between actions.
 */
const rateLimitMap = new Map()

export function isRateLimited(key, limitMs = 30000) {
  const now = Date.now()
  const last = rateLimitMap.get(key) || 0
  if (now - last < limitMs) return true   // too soon
  rateLimitMap.set(key, now)
  return false
}

/**
 * SAFE LOCAL STORAGE READ
 * Wraps localStorage reads with try/catch and validation.
 * Prevents JSON parse errors from corrupted data crashing the app.
 */
export function safeLocalGet(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw)
  } catch {
    // If data is corrupted, clear it and return fallback
    localStorage.removeItem(key)
    return fallback
  }
}

export function safeLocalSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage full or blocked — fail silently
  }
}

/**
 * SEARCH QUERY SANITISER
 * Strips anything dangerous from search input.
 */
export function sanitiseSearchQuery(query) {
  if (typeof query !== 'string') return ''
  return query
    .replace(/[<>'"`;]/g, '')   // strip dangerous chars
    .replace(/\s+/g, ' ')       // collapse multiple spaces
    .trim()
    .slice(0, 100)               // max 100 chars
}
