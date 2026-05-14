'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import api from '../../utils/api'
import { saveAuth, isLoggedIn, getUser } from '../../utils/auth'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  useEffect(() => {
    if (!isLoggedIn()) return
    const role = getUser()?.role
    if (role === 'admin') router.replace('/admin')
    else if (role === 'ngo') router.replace('/dashboard/ngo')
    else router.replace('/dashboard/donor')
  }, [router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await api.post('/auth/login', form)
      saveAuth(res.data.token, res.data.user)
      toast.success('Welcome back!')
      const role = res.data.user?.role
      if (role === 'admin') router.push('/admin')
      else if (role === 'ngo') router.push('/dashboard/ngo')
      else router.push('/dashboard/donor')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex page-bg">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #052e16 0%, #14532d 50%, #166534 100%)' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.2) 0%, transparent 70%)' }} />
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center font-bold text-white text-sm">R</div>
            <span className="font-bold text-xl text-white">RescueBite</span>
          </div>
        </div>
        <div className="relative z-10">
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
            Rescue food.<br />Feed hope.<br />Fight hunger.
          </h2>
          <p className="text-green-200 text-sm leading-relaxed max-w-xs">
            Join thousands of donors and NGOs already making a difference across India.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[['12K+', 'Meals Rescued'], ['50+', 'NGO Partners'], ['10', 'Cities']].map(([v, l]) => (
              <div key={l} className="bg-white/10 rounded-xl p-3 text-center">
                <p className="text-white font-extrabold text-lg">{v}</p>
                <p className="text-green-200 text-xs mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="relative z-10 text-green-300 text-xs">© 2024 RescueBite. All rights reserved.</p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12" style={{ backgroundColor: 'var(--bg-base)' }}>
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm"
              style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>R</div>
            <span className="font-bold text-lg text-primary">RescueBite</span>
          </div>

          <h1 className="text-3xl font-extrabold text-primary mb-1">Welcome back</h1>
          <p className="text-secondary text-sm mb-8">Sign in to your account to continue</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-2 text-muted">Email Address</label>
              <input type="email" name="email" required placeholder="you@example.com"
                value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition text-primary"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'} />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-2 text-muted">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} name="password" required placeholder="••••••••"
                  value={form.password} onChange={(e) => setForm(p => ({ ...p, password: e.target.value }))}
                  className="w-full rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none transition text-primary"
                  style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                <button type="button" onClick={() => setShowPass(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-secondary transition">
                  {showPass ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl text-white font-semibold text-sm transition flex items-center justify-center gap-2 disabled:opacity-60 shadow-lg"
              style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 4px 20px rgba(34,197,94,0.25)' }}>
              {loading ? (
                <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Signing in...</>
              ) : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm mt-6 text-secondary">
            New here?{' '}
            <Link href="/signup" className="font-semibold hover:underline" style={{ color: 'var(--accent)' }}>
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
