'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { getUser, removeAuth, isLoggedIn } from '../utils/auth'
import { useTheme } from '../context/ThemeContext'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Impact', href: '/impact' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const [user, setUser] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [lang, setLang] = useState('en')
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const syncUser = useCallback(() => {
    setUser(isLoggedIn() ? getUser() : null)
  }, [])

  useEffect(() => {
    setMounted(true)
    syncUser()
  }, [pathname, syncUser])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => {
    removeAuth()
    setUser(null)
    setMenuOpen(false)
    router.push('/login')
  }

  const labels = {
    en: { logout: 'Logout', login: 'Login', signup: 'Get Started' },
    hi: { logout: 'लॉग आउट', login: 'लॉगिन', signup: 'शुरू करें' },
    mr: { logout: 'लॉग आउट', login: 'लॉगिन', signup: 'सुरुवात करा' },
  }
  const t = labels[lang] || labels.en

  const isDark = theme === 'dark'

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'shadow-lg border-b'
        : ''
    }`} style={{
      backgroundColor: scrolled ? 'var(--bg-surface)' : 'transparent',
      borderColor: 'var(--border)',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
    }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-teal-500/30">
            R
          </div>
          <span className={`font-bold text-lg group-hover:text-teal-500 transition-colors ${isDark ? 'text-white' : 'text-navy-900'}`}>
            RescueBite
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname === link.href
                  ? 'text-brand-500 bg-brand-500/10'
                  : 'hover:bg-white/5'
              }`}
              style={{ color: pathname === link.href ? 'var(--accent)' : 'var(--text-secondary)' }}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-2">
          {mounted && (
            <button onClick={toggleTheme} title="Toggle theme"
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition ${
                isDark ? 'bg-white/5 hover:bg-white/10 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}>
              {isDark ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5" strokeWidth="2"/>
                  <path strokeLinecap="round" strokeWidth="2" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                </svg>
              )}
            </button>
          )}

          {/* Language */}
          <select value={lang} onChange={(e) => setLang(e.target.value)}
            className={`text-xs border rounded-lg px-2 py-1.5 focus:outline-none cursor-pointer transition ${
              isDark
                ? 'border-white/10 bg-white/5 hover:bg-white/10 text-gray-400'
                : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-600'
            }`}>
            <option value="en" className="bg-white text-gray-900">EN</option>
            <option value="hi" className="bg-white text-gray-900">HI</option>
            <option value="mr" className="bg-white text-gray-900">MR</option>
          </select>

          {mounted && (
            user ? (
              <button type="button" onClick={handleLogout}
                className={`text-sm px-4 py-2 rounded-lg border font-medium transition ${
                  isDark ? 'border-white/10 text-gray-300 hover:text-white hover:border-white/30' : 'border-gray-200 text-gray-600 hover:text-navy-900 hover:border-gray-400'
                }`}>
                {t.logout}
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login"
                  className={`text-sm px-4 py-2 rounded-lg font-medium transition ${
                    isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-navy-900'
                  }`}>
                  {t.login}
                </Link>
                <Link href="/signup"
                  className="text-sm px-5 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-semibold transition shadow-lg shadow-teal-500/25">
                  {t.signup}
                </Link>
              </div>
            )
          )}
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          {mounted && (
            <button onClick={toggleTheme}
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition ${
                isDark ? 'bg-white/5 text-gray-300' : 'bg-gray-100 text-gray-600'
              }`}>
              {isDark ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5" strokeWidth="2"/>
                  <path strokeLinecap="round" strokeWidth="2" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                </svg>
              )}
            </button>
          )}
          <button type="button" onClick={() => setMenuOpen(o => !o)}
            className={`p-2 rounded-lg transition ${isDark ? 'text-gray-300 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-100'}`}
            aria-label="Toggle menu">
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={`lg:hidden border-t px-6 py-4 flex flex-col gap-1 shadow-xl ${
          isDark ? 'bg-navy-800/95 backdrop-blur-md border-white/5' : 'bg-white border-gray-100'
        }`}>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition ${
                pathname === link.href
                  ? 'text-teal-500 bg-teal-500/10'
                  : isDark ? 'text-gray-300 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-navy-900 hover:bg-gray-50'
              }`}>
              {link.label}
            </Link>
          ))}
          <div className={`border-t mt-3 pt-3 flex flex-col gap-2 ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
            <select value={lang} onChange={(e) => setLang(e.target.value)}
              className={`text-xs border rounded-lg px-3 py-2 w-fit focus:outline-none ${
                isDark ? 'border-white/10 bg-white/5 text-gray-400' : 'border-gray-200 bg-gray-50 text-gray-600'
              }`}>
              <option value="en">EN</option>
              <option value="hi">HI</option>
              <option value="mr">MR</option>
            </select>
            {mounted && (
              user ? (
                <button type="button" onClick={handleLogout}
                  className="text-sm px-4 py-2 rounded-lg border border-white/10 text-gray-300 w-fit font-medium">
                  {t.logout}
                </button>
              ) : (
                <div className="flex gap-2">
                  <Link href="/login" onClick={() => setMenuOpen(false)}
                    className={`text-sm px-4 py-2 rounded-lg border font-medium ${isDark ? 'border-white/10 text-gray-300' : 'border-gray-200 text-gray-600'}`}>
                    {t.login}
                  </Link>
                  <Link href="/signup" onClick={() => setMenuOpen(false)}
                    className="text-sm px-4 py-2 rounded-lg bg-teal-500 text-white font-semibold">
                    {t.signup}
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
