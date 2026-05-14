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

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState(empty)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isLoggedIn()) router.replace('/dashboard')
  }, [router])

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    if (!form.mapLink.startsWith('http')) {
      toast.error('Google Maps link must be a valid URL starting with http')
      return
    }
    if (form.phone.replace(/\D/g, '').length < 10) {
      toast.error('Enter a valid phone number (min 10 digits)')
      return
    }
    setLoading(true)
    try {
      const payload = { ...form }
      if (form.role !== 'donor') delete payload.donorType
      const res = await api.post('/auth/register', payload)
      saveAuth(res.data.token, res.data.user)
      toast.success('Account created!')
      router.push('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500'

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
        <div className="text-center mb-6">
          <p className="text-3xl">🍃</p>
          <h1 className="text-2xl font-bold text-green-700 mt-1">Join RescueBite</h1>
          <p className="text-gray-500 text-sm mt-1">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input name="name" value={form.name} onChange={handleChange} required
              className={inputClass} placeholder="Your name" />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required
              className={inputClass} placeholder="you@example.com" />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password * (min 6 chars)</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required minLength={6}
              className={inputClass} placeholder="••••••••" />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
            <select name="role" value={form.role} onChange={handleChange} className={inputClass}>
              <option value="donor">Donor</option>
              <option value="ngo">NGO</option>
            </select>
          </div>

          {/* Donor type — only for donors */}
          {form.role === 'donor' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">I am donating as a... *</label>
              <select name="donorType" value={form.donorType} onChange={handleChange} className={inputClass}>
                <option value="individual">Individual</option>
                <option value="restaurant">Restaurant</option>
                <option value="marriage_hall">Marriage Hall</option>
                <option value="hotel">Hotel</option>
                <option value="other">Other</option>
              </select>
            </div>
          )}

          {/* Location (city/area) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City / Area *</label>
            <input name="location" value={form.location} onChange={handleChange} required
              className={inputClass} placeholder="e.g. Andheri West, Mumbai" />
          </div>

          {/* Full Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Address *</label>
            <textarea name="address" value={form.address} onChange={handleChange} rows={2} required
              className={inputClass}
              placeholder={form.role === 'ngo'
                ? 'e.g. 2nd Floor, ABC Building, MG Road, Mumbai 400001'
                : 'e.g. Flat 4B, Sunrise Apartments, Bandra, Mumbai'} />
          </div>

          {/* Google Maps Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Google Maps Link *</label>
            <input name="mapLink" value={form.mapLink} onChange={handleChange} required
              className={inputClass}
              placeholder="https://maps.google.com/..." />
            <p className="text-xs text-gray-400 mt-1">
              📍 Open Google Maps → share your location → copy the link
            </p>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} required
              className={inputClass}
              placeholder="e.g. +91 98765 43210" />
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Language Preference</label>
            <select name="language" value={form.language} onChange={handleChange} className={inputClass}>
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="mr">मराठी</option>
            </select>
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Creating...
              </>
            ) : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account?{' '}
          <Link href="/login" className="text-green-600 font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
