'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { getUser, removeAuth, isLoggedIn } from '../utils/auth'

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
    const onScroll = () => setScrolled(window.scrollY > 10)
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
    en: { logout: 'Logout', login: 'Login', signup: 'Sign Up' },
    hi: { logout: 'लॉग आउट', login: 'लॉगिन', signup: 'साइन अप' },
    mr: { logout: 'लॉग आउट', login: 'लॉगिन', signup: 'साइन अप' },
  }
  const t = labels[lang] || labels.en

  return (
    <nav className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-green-700 font-extrabold text-xl flex items-center gap-1.5 shrink-0">
          🍃 <span>RescueBite</span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href
                  ? 'text-green-700 bg-green-50'
                  : 'text-gray-600 hover:text-green-700 hover:bg-gray-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 text-gray-600 focus:outline-none cursor-pointer bg-white"
          >
            <option value="en">EN</option>
            <option value="hi">HI</option>
            <option value="mr">MR</option>
          </select>
          {mounted && (
            user ? (
              <button type="button" onClick={handleLogout}
                className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1.5 rounded-lg transition font-medium">
                {t.logout}
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login"
                  className="text-green-700 border border-green-600 hover:bg-green-50 text-sm px-4 py-1.5 rounded-lg transition font-medium">
                  {t.login}
                </Link>
                <Link href="/signup"
                  className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1.5 rounded-lg transition font-medium">
                  {t.signup}
                </Link>
              </div>
            )
          )}
        </div>

        <button type="button"
          className="lg:hidden text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition"
          onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu">
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

      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-1 shadow-lg">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
              className={`px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                pathname === link.href ? 'text-green-700 bg-green-50' : 'text-gray-700 hover:text-green-700 hover:bg-gray-50'
              }`}>
              {link.label}
            </Link>
          ))}
          <div className="border-t border-gray-100 mt-2 pt-3 flex flex-col gap-2">
            <select value={lang} onChange={(e) => setLang(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 w-fit focus:outline-none bg-white">
              <option value="en">EN</option>
              <option value="hi">HI</option>
              <option value="mr">MR</option>
            </select>
            {mounted && (
              user ? (
                <button type="button" onClick={handleLogout}
                  className="bg-green-600 text-white text-sm px-4 py-2 rounded-lg w-fit font-medium">
                  {t.logout}
                </button>
              ) : (
                <div className="flex gap-2">
                  <Link href="/login" onClick={() => setMenuOpen(false)}
                    className="text-green-700 border border-green-600 text-sm px-4 py-2 rounded-lg font-medium">
                    {t.login}
                  </Link>
                  <Link href="/signup" onClick={() => setMenuOpen(false)}
                    className="bg-green-600 text-white text-sm px-4 py-2 rounded-lg font-medium">
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
