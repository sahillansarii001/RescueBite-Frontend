'use client'
import { useState } from 'react'
import Link from 'next/link'
import api from '../../utils/api'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await api.post('/contact', form)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-green-700 via-green-800 to-green-900 text-white py-24 px-6 text-center relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_80%,white,transparent_60%)]" />
        <span className="inline-block bg-orange-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
          We&apos;d Love to Hear From You
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold max-w-xl mx-auto leading-tight">
          Contact RescueBite
        </h1>
        <p className="mt-5 text-green-100 text-lg max-w-md mx-auto leading-relaxed">
          Questions, partnerships, feedback — we&apos;re here for all of it.
        </p>
      </section>

      {/* ── Contact Card ── */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="grid md:grid-cols-5">

            {/* Left — dark info panel */}
            <div className="md:col-span-2 bg-gradient-to-br from-green-700 to-green-900 text-white p-10 flex flex-col justify-between gap-10">
              <div>
                <h2 className="text-2xl font-extrabold mb-2">Contact Information</h2>
                <p className="text-green-300 text-sm leading-relaxed">
                  Fill out the form and our team will get back to you within 24 hours.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                {[
                  { icon: '📧', label: 'hello@rescuebite.in', href: 'mailto:hello@rescuebite.in' },
                  { icon: '📞', label: '+91 98765 43210', href: 'tel:+919876543210' },
                  { icon: '📍', label: 'Mumbai, Maharashtra, India', href: null },
                  { icon: '🕐', label: 'Mon–Sat, 9 AM – 6 PM IST', href: null },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-4">
                    <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center text-base shrink-0">
                      {c.icon}
                    </div>
                    {c.href ? (
                      <a href={c.href} className="text-green-100 text-sm hover:text-white transition">{c.label}</a>
                    ) : (
                      <span className="text-green-100 text-sm">{c.label}</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                {[
                  { icon: '💼', href: 'https://linkedin.com', label: 'LinkedIn' },
                  { icon: '🐙', href: 'https://github.com', label: 'GitHub' },
                  { icon: '📸', href: 'https://instagram.com', label: 'Instagram' },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                    className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-base transition">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div className="md:col-span-3 p-10">
              {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-10">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mb-5">✅</div>
                  <h3 className="text-xl font-bold text-gray-900">Message Received</h3>
                  <p className="text-gray-500 text-sm mt-2 max-w-xs">
                    Thank you for reaching out. We&apos;ve sent a confirmation to your email and our team will respond within 24 hours.
                  </p>
                  <button
                    onClick={() => { setStatus('idle'); setForm({ name: '', email: '', subject: '', message: '' }) }}
                    className="mt-6 text-sm text-green-700 font-medium border border-green-300 px-5 py-2 rounded-lg hover:bg-green-50 transition"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Get in Touch</h2>
                  <p className="text-gray-400 text-sm mb-8">We typically respond within one business day.</p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                          Full Name
                        </label>
                        <input
                          id="name" type="text" required placeholder="John Doe"
                          value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full border-b-2 border-gray-200 focus:border-green-500 py-2 text-sm text-gray-900 placeholder-gray-300 focus:outline-none transition bg-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                          Email Address
                        </label>
                        <input
                          id="email" type="email" required placeholder="you@example.com"
                          value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full border-b-2 border-gray-200 focus:border-green-500 py-2 text-sm text-gray-900 placeholder-gray-300 focus:outline-none transition bg-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                        Subject
                      </label>
                      <input
                        id="subject" type="text" required placeholder="How can we help?"
                        value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full border-b-2 border-gray-200 focus:border-green-500 py-2 text-sm text-gray-900 placeholder-gray-300 focus:outline-none transition bg-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                        Message
                      </label>
                      <textarea
                        id="message" required rows={4} placeholder="Write your message here..."
                        value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full border-b-2 border-gray-200 focus:border-green-500 py-2 text-sm text-gray-900 placeholder-gray-300 focus:outline-none transition resize-none bg-transparent"
                      />
                    </div>

                    {status === 'error' && (
                      <p className="text-red-500 text-sm">Something went wrong. Please try again or email us directly.</p>
                    )}

                    <div className="flex justify-end pt-1">
                      <button type="submit" disabled={status === 'loading'}
                        className="bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold px-8 py-3 rounded-xl transition shadow-sm hover:shadow-md text-sm flex items-center gap-2">
                        {status === 'loading' ? (
                          <>
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            Sending...
                          </>
                        ) : 'Submit Message'}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-green-900 text-green-200 py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-white font-bold text-lg mb-2">🍃 RescueBite</p>
            <p className="text-green-300 text-sm leading-relaxed">Rescue food. Feed hope. Fight hunger.</p>
          </div>
          <div>
            <p className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Quick Links</p>
            <div className="flex flex-col gap-2">
              {[['Home', '/'], ['About', '/about'], ['How It Works', '/how-it-works'], ['Impact', '/impact'], ['Contact', '/contact']].map(([l, h]) => (
                <Link key={h} href={h} className="text-green-300 hover:text-white text-sm transition">{l}</Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Social</p>
            <div className="flex flex-col gap-2">
              {[['💼 LinkedIn', 'https://linkedin.com'], ['🐙 GitHub', 'https://github.com'], ['📸 Instagram', 'https://instagram.com']].map(([l, h]) => (
                <a key={l} href={h} target="_blank" rel="noopener noreferrer"
                  className="text-green-300 hover:text-white text-sm transition">{l}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-green-800 mt-8 pt-6 text-center text-green-400 text-xs">
          © 2024 RescueBite. All rights reserved.
        </div>
      </footer>
    </main>
  )
}
