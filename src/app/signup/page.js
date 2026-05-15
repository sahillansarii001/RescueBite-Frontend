'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import api from '../../utils/api'
import { saveAuth, isLoggedIn } from '../../utils/auth'

const empty = {
  name: '', email: '', password: '', role: 'donor',
  donorType: 'individual', location: '', address: '', mapLink: '', phone: '', language: 'en',
}

const inputCls = 'w-full bg-white border border-green-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500'

const Field = ({ label, name, type = 'text', placeholder, required = true, value, onChange, children }) => (
  <div>
    <label className="block text-gray-600 text-sm font-medium mb-1.5">{label}{required ? ' *' : ''}</label>
    {children || (
      <input type={type} name={name} value={value} onChange={onChange} required={required}
        placeholder={placeholder} className={inputCls} />
    )}
  </div>
)

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState(empty)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)

  useEffect(() => {
    if (isLoggedIn()) router.replace('/dashboard')
  }, [router])

  const set = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return }
    if (!form.mapLink.startsWith('http')) { toast.error('Google Maps link must start with http'); return }
    if (form.phone.replace(/\D/g, '').length < 10) { toast.error('Enter a valid phone number (min 10 digits)'); return }
    setLoading(true)
    try {
      const payload = { ...form }
      if (form.role !== 'donor') delete payload.donorType
      const res = await api.post('/auth/register', payload)
      saveAuth(res.data.token, res.data.user, res.data.refreshToken)
      toast.success('Account created!')
      router.push('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-green-50">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-5/12 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #43A047 100%)' }}>
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)' }} />
        <div className="relative z-10 flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center font-bold text-white text-sm">R</div>
          <span className="font-bold text-xl text-white">RescueBite</span>
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold text-white leading-tight mb-4">
            Start rescuing food today.
          </h2>
          <div className="flex flex-col gap-3 mt-6">
            {[
              { icon: '✓', text: 'Free to join — no fees ever' },
              { icon: '✓', text: 'Instant NGO matching' },
              { icon: '✓', text: 'Earn points and badges' },
              { icon: '✓', text: 'CSR impact certificates' },
            ].map(item => (
              <div key={item.text} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 bg-green-500/30">{item.icon}</div>
                <span className="text-green-100 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="relative z-10 text-green-200 text-xs">© 2024 RescueBite. All rights reserved.</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-start justify-center px-6 py-10 overflow-y-auto bg-green-50">
        <div className="w-full max-w-lg bg-white border border-green-200 rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-2 mb-6 lg:hidden justify-center">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm bg-green-700">R</div>
            <span className="font-bold text-lg text-green-700">RescueBite</span>
          </div>

          <h1 className="text-2xl font-bold text-green-700 text-center mb-1">Create your account</h1>
          <p className="text-gray-400 text-sm text-center mb-8">Join the food rescue movement today</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field 
                label={form.role === 'ngo' ? 'NGO Name' : form.donorType === 'restaurant' ? 'Restaurant Name' : form.donorType === 'marriage_hall' ? 'Marriage Hall Name' : form.donorType === 'hotel' ? 'Hotel Name' : form.donorType === 'other' ? 'Organization/Business Name' : 'Full Name'} 
                name="name" placeholder="Your name" value={form.name} onChange={set} 
              />
              <Field label="Email Address" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={set} />
            </div>

            <Field label="Password (min 6 chars)" name="password" type="password" placeholder="••••••••" value={form.password} onChange={set} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Role">
                <select name="role" value={form.role} onChange={set} className={inputCls}>
                  <option value="donor">Donor</option>
                  <option value="ngo">NGO</option>
                </select>
              </Field>
              {form.role === 'donor' && (
                <Field label="Donor Type">
                  <select name="donorType" value={form.donorType} onChange={set}
                    className="w-full bg-green-50 border border-green-400 rounded-lg px-4 py-2.5 text-sm text-green-800 focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="individual">Individual</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="marriage_hall">Marriage Hall</option>
                    <option value="hotel">Hotel</option>
                    <option value="other">Other</option>
                  </select>
                </Field>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="City / Area" name="location" placeholder="e.g. Andheri West, Mumbai" value={form.location} onChange={set} />
              <Field label="Phone Number" name="phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set} />
            </div>

            <Field label="Full Address" name="address">
              <textarea name="address" value={form.address} onChange={set} rows={2} required
                placeholder="e.g. Flat 4B, Sunrise Apartments, Bandra, Mumbai"
                className={inputCls} />
            </Field>

            <Field label="Google Maps Link" name="mapLink" placeholder="https://maps.google.com/...">
              <input name="mapLink" value={form.mapLink} onChange={set} required
                placeholder="https://maps.google.com/..."
                className={inputCls} />
              <p className="text-xs mt-1 text-gray-400">Open Google Maps → share location → copy link</p>
            </Field>

            <Field label="Language Preference" required={false}>
              <select name="language" value={form.language} onChange={set} className={inputCls}>
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="mr">मराठी</option>
              </select>
            </Field>

            <button type="submit" disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold text-sm transition flex items-center justify-center gap-2 disabled:opacity-60 mt-2">
              {loading ? (
                <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Creating account...</>
              ) : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm mt-5 text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-green-700 hover:text-green-900 font-medium underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
