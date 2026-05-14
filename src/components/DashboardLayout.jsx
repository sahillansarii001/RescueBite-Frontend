'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { removeAuth } from '../utils/auth'

export default function DashboardLayout({ user, navItems, activeTab, setActiveTab, children, title, subtitle }) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    removeAuth()
    router.push('/login')
  }

  const roleColors = {
    donor: { bg: 'rgba(34,197,94,0.12)', text: '#22c55e', label: 'Donor' },
    ngo:   { bg: 'rgba(59,130,246,0.12)', text: '#3b82f6', label: 'NGO' },
    admin: { bg: 'rgba(217,70,239,0.12)', text: '#d946ef', label: 'Admin' },
  }
  const rc = roleColors[user?.role] || roleColors.donor

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: 'var(--bg-base)' }}>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ backgroundColor: 'var(--bg-surface)', borderRight: '1px solid var(--border)' }}>

        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm shrink-0"
            style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>R</div>
          <span className="font-bold text-base text-primary">RescueBite</span>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-muted hover:text-primary">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* User card */}
        <div className="px-4 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-card)' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0"
              style={{ backgroundColor: rc.bg, color: rc.text }}>
              {user?.name?.slice(0, 2).toUpperCase() || 'U'}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm text-primary truncate">{user?.name || 'User'}</p>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: rc.bg, color: rc.text }}>
                {rc.label}
              </span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <p className="text-xs font-semibold uppercase tracking-widest px-3 mb-3 text-muted">Menu</p>
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id
              return (
                <button key={item.id} onClick={() => { setActiveTab(item.id); setSidebarOpen(false) }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all w-full text-left"
                  style={{ backgroundColor: isActive ? 'var(--accent-soft)' : 'transparent', color: isActive ? 'var(--accent)' : 'var(--text-secondary)' }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'var(--bg-hover)' }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent' }}>
                  <span className="w-5 h-5 flex items-center justify-center shrink-0">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t" style={{ borderColor: 'var(--border)' }}>
          <Link href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition w-full text-secondary"
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-hover)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            style={{ backgroundColor: 'transparent' }}>
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </Link>
          <button onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition w-full text-left mt-1"
            style={{ color: '#ef4444', backgroundColor: 'transparent' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.08)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex items-center gap-4 px-6 py-4 border-b"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg text-secondary"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div>
            <h1 className="font-bold text-base text-primary">{title}</h1>
            {subtitle && <p className="text-xs text-muted mt-0.5">{subtitle}</p>}
          </div>
          <div className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium"
            style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Online
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
