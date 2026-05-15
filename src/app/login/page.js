'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import api from '../../utils/api'
import { saveAuth, isLoggedIn, getUser } from '../../utils/auth'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

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
    <div className="min-h-screen flex bg-green-50">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #43A047 100%)' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)' }} />
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
          <p className="text-green-100 text-sm leading-relaxed max-w-xs">
            Join thousands of donors and NGOs already making a difference across India.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[['12K+', 'Meals Rescued'], ['50+', 'NGO Partners'], ['10', 'Cities']].map(([v, l]) => (
              <div key={l} className="bg-white/10 rounded-xl p-3 text-center">
                <p className="text-white font-extrabold text-lg">{v}</p>
                <p className="text-green-100 text-xs mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="relative z-10 text-green-200 text-xs">© 2024 RescueBite. All rights reserved.</p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-green-50/50">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-md border border-green-200/50 rounded-3xl shadow-xl p-8">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden justify-center">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-white text-sm bg-green-700">R</div>
            <span className="font-bold text-lg text-green-700">RescueBite</span>
          </div>

          <h1 className="text-2xl font-black text-green-900 tracking-tight text-center mb-1">Welcome back</h1>
          <p className="text-gray-500 font-medium text-sm text-center mb-8">Sign in to your account to continue</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-600 text-xs font-bold uppercase tracking-wider mb-2">Email Address</label>
              <input type="email" name="email" required placeholder="you@example.com"
                value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                className="w-full bg-white border border-green-200/80 rounded-xl px-4 py-3 text-sm text-gray-700 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors" />
            </div>
            <div>
              <label className="block text-gray-600 text-xs font-bold uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} name="password" required placeholder="••••••••"
                  value={form.password} onChange={(e) => setForm(p => ({ ...p, password: e.target.value }))}
                  className="w-full bg-white border border-green-200/80 rounded-xl px-4 py-3 pr-11 text-sm text-gray-700 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors" />
                <button type="button" onClick={() => setShowPass(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-bold text-sm transition-all shadow-[0_4px_14px_0_rgba(21,128,61,0.39)] hover:shadow-[0_6px_20px_rgba(21,128,61,0.23)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 disabled:opacity-60 disabled:shadow-none disabled:translate-y-0">
              {loading ? (
                <><Loader2 className="animate-spin h-4 w-4" />Signing in...</>
              ) : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm mt-6 text-gray-400">
            New here?{' '}
            <Link href="/signup" className="text-green-700 hover:text-green-900 font-medium underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
