'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { getUser, removeAuth, isLoggedIn } from '../utils/auth'

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [lang, setLang] = useState('en')
  const [mounted, setMounted] = useState(false) // prevents SSR/hydration mismatch

  const syncUser = useCallback(() => {
    if (isLoggedIn()) {
      setUser(getUser())
    } else {
      setUser(null)
    }
  }, [])

  useEffect(() => {
    setMounted(true)
    syncUser()
  }, [pathname, syncUser])

  const handleLogout = () => {
    removeAuth()
    setUser(null)        // immediately clear user state
    setMenuOpen(false)
    router.push('/login')
  }

  // Simple label map — no i18n dependency so it always works
  const labels = {
    en: { dashboard: 'Dashboard', leaderboard: 'Leaderboard', logout: 'Logout', login: 'Login' },
    hi: { dashboard: 'डैशबोर्ड', leaderboard: 'लीडरबोर्ड', logout: 'लॉग आउट', login: 'लॉगिन' },
    mr: { dashboard: 'डॅशबोर्ड', leaderboard: 'लीडरबोर्ड', logout: 'लॉग आउट', login: 'लॉगिन' },
  }
  const t = labels[lang] || labels.en

  const getDashboardHref = () => {
    if (!user) return '/dashboard'
    if (user.role === 'admin') return '/admin'
    if (user.role === 'ngo') return '/dashboard/ngo'
    return '/dashboard/donor'
  }

  const navLinks = () => {
    if (!user) return []
    if (user.role === 'admin') {
      return [{ label: t.dashboard, href: '/admin' }]
    }
    if (user.role === 'ngo') {
      return [{ label: t.dashboard, href: '/dashboard/ngo' }]
    }
    // donor — leaderboard tab is state-based, link goes to donor dashboard
    return [
      { label: t.dashboard, href: '/dashboard/donor' },
      { label: t.leaderboard, href: '/dashboard/donor' },
    ]
  }

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-green-700 font-bold text-xl flex items-center gap-1">
          🍃 RescueBite
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks().map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`font-medium text-sm transition ${
                pathname === link.href.split('?')[0]
                  ? 'text-green-700'
                  : 'text-gray-600 hover:text-green-700'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side — language + auth */}
        <div className="hidden md:flex items-center gap-3">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-2 py-1 text-gray-600 focus:outline-none cursor-pointer"
          >
            <option value="en">EN</option>
            <option value="hi">HI</option>
            <option value="mr">MR</option>
          </select>

          {mounted && (
            user ? (
              <button
                type="button"
                onClick={handleLogout}
                className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white text-sm px-4 py-1.5 rounded-lg transition font-medium"
              >
                {t.logout}
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1.5 rounded-lg transition font-medium"
              >
                {t.login}
              </Link>
            )
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden text-gray-600 text-xl p-1"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4 shadow-md">
          {navLinks().map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-gray-700 font-medium text-sm hover:text-green-700"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-2 py-1 text-gray-600 w-fit focus:outline-none"
          >
            <option value="en">EN</option>
            <option value="hi">HI</option>
            <option value="mr">MR</option>
          </select>

          {mounted && (
            user ? (
              <button
                type="button"
                onClick={handleLogout}
                className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg w-fit font-medium"
              >
                {t.logout}
              </button>
            ) : (
              <Link
                href="/login"
                className="text-green-700 font-medium text-sm"
                onClick={() => setMenuOpen(false)}
              >
                {t.login}
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  )
}
