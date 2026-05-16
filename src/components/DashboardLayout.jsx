'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { removeAuth } from '../utils/auth'
import { Menu, X, Home, LogOut } from 'lucide-react'

export default function DashboardLayout({ user, navItems, activeTab, setActiveTab, children, title, subtitle }) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    removeAuth()
    router.push('/login')
  }

  const roleColors = {
    donor: { bg: '#E8F5E9', text: '#2E7D32', label: 'Donor' },
    ngo:   { bg: '#E3F2FD', text: '#1565C0', label: 'NGO' },
    admin: { bg: '#FCE4EC', text: '#C62828', label: 'Admin' },
  }
  const rc = roleColors[user?.role] || roleColors.donor

  return (
    <div className="flex h-screen overflow-hidden bg-green-50">

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ backgroundColor: '#FFFFFF', borderRight: '1px solid #C8E6C9' }}>

        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-green-200">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm shrink-0 bg-green-700">R</div>
          <span className="font-bold text-base text-green-900">RescueBite</span>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-gray-400 hover:text-green-900 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User card */}
        <div className="px-4 py-4 border-b border-green-200">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-green-50">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0"
              style={{ backgroundColor: rc.bg, color: rc.text }}>
              {user?.name?.slice(0, 2).toUpperCase() || 'U'}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm text-green-900 truncate">{user?.name || 'User'}</p>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: rc.bg, color: rc.text }}>
                {rc.label}
              </span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <p className="text-xs font-semibold uppercase tracking-widest px-3 mb-3 text-gray-400">Menu</p>
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id
              return (
                <button key={item.id} onClick={() => { setActiveTab(item.id); setSidebarOpen(false) }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all w-full text-left ${
                    isActive
                      ? 'bg-green-700 text-white'
                      : 'text-green-700 hover:bg-green-100'
                  }`}>
                  <span className="w-5 h-5 flex items-center justify-center shrink-0">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-green-200">
          <Link href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 w-full text-gray-600 hover:bg-green-50 hover:text-green-700 hover:translate-x-1">
            <Home className="w-4 h-4 shrink-0" />
            Back to Home
          </Link>
          <button onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 w-full text-left mt-1 text-red-500 hover:bg-red-50 hover:translate-x-1">
            <LogOut className="w-4 h-4 shrink-0" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex items-center gap-4 px-6 py-4 bg-white border-b border-green-200">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg text-green-700 bg-green-50 border border-green-200 transition-colors hover:bg-green-100">
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-bold text-base text-green-900">{title}</h1>
            {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
          </div>
          <div className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-green-50 text-gray-600 border border-green-200">
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
