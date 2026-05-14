'use client'
import { useState } from 'react'
import api from '../../utils/api'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle')

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

  const inputStyle = {
    borderColor: 'var(--border)',
    caretColor: 'var(--accent)',
  }

  return (
    <main className="overflow-x-hidden page-bg">
      <section className="relative py-32 px-6 text-center overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--bg-base) 0%, #0d2818 50%, var(--bg-base) 100%)' }}>
        <div className="absolute top-1/3 left-1/3 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 border text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-widest uppercase" style={{ backgroundColor: 'var(--accent-soft)', borderColor: 'var(--accent)', color: 'var(--accent)' }}>
            We&apos;d Love to Hear From You
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-primary">
            Contact <span className="text-gradient">RescueBite</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-secondary">Questions, partnerships, feedback — we&apos;re here for all of it.</p>
        </div>
      </section>

      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="rounded-3xl overflow-hidden shadow-2xl border" style={{ borderColor: 'var(--border)' }}>
          <div className="grid md:grid-cols-5">
            <div className="md:col-span-2 p-10 flex flex-col justify-between gap-10" style={{ background: 'linear-gradient(135deg, #14532d, #166534)' }}>
              <div>
                <h2 className="text-2xl font-extrabold text-white mb-3">Contact Information</h2>
                <p className="text-green-200 text-sm leading-relaxed">Fill out the form and our team will get back to you within 24 hours.</p>
              </div>
              <div className="flex flex-col gap-5">
                {[
                  { icon: '📧', label: 'hello@rescuebite.in', href: 'mailto:hello@rescuebite.in' },
                  { icon: '📞', label: '+91 98765 43210', href: 'tel:+919876543210' },
                  { icon: '📍', label: 'Mumbai, Maharashtra, India', href: null },
                  { icon: '🕐', label: 'Mon-Sat, 9 AM - 6 PM IST', href: null },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>{c.icon}</div>
                    {c.href
                      ? <a href={c.href} className="text-green-100 text-sm hover:text-white transition">{c.label}</a>
                      : <span className="text-green-100 text-sm">{c.label}</span>}
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                {[['💼', 'https://linkedin.com', 'LinkedIn'], ['🐙', 'https://github.com', 'GitHub'], ['📸', 'https://instagram.com', 'Instagram']].map(([icon, href, label]) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-base transition hover:scale-110" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="md:col-span-3 p-10" style={{ backgroundColor: 'var(--bg-card)' }}>
              {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-10">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-5" style={{ backgroundColor: 'var(--accent-soft)' }}>✅</div>
                  <h3 className="text-xl font-bold text-primary">Message Received</h3>
                  <p className="text-sm mt-2 max-w-xs text-secondary">Thank you for reaching out. We will respond within 24 hours.</p>
                  <button onClick={() => { setStatus('idle'); setForm({ name: '', email: '', subject: '', message: '' }) }}
                    className="mt-6 text-sm font-medium border px-5 py-2 rounded-lg transition" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-extrabold mb-1 text-primary">Get in Touch</h2>
                  <p className="text-sm mb-8 text-secondary">We typically respond within one business day.</p>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-widest mb-2 text-muted">Full Name</label>
                        <input id="name" type="text" required placeholder="John Doe" value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full bg-transparent border-b py-2 text-sm placeholder-gray-500 focus:outline-none transition text-primary"
                          style={inputStyle}
                          onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                          onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-widest mb-2 text-muted">Email Address</label>
                        <input id="email" type="email" required placeholder="you@example.com" value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full bg-transparent border-b py-2 text-sm placeholder-gray-500 focus:outline-none transition text-primary"
                          style={inputStyle}
                          onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                          onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-widest mb-2 text-muted">Subject</label>
                      <input id="subject" type="text" required placeholder="How can we help?" value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full bg-transparent border-b py-2 text-sm placeholder-gray-500 focus:outline-none transition text-primary"
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                        onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-widest mb-2 text-muted">Message</label>
                      <textarea id="message" required rows={4} placeholder="Write your message here..." value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full bg-transparent border-b py-2 text-sm placeholder-gray-500 focus:outline-none transition resize-none text-primary"
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                        onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                    </div>
                    {status === 'error' && <p className="text-red-400 text-sm">Something went wrong. Please try again or email us directly.</p>}
                    <div className="flex justify-end pt-2">
                      <button type="submit" disabled={status === 'loading'}
                        className="px-8 py-3 rounded-xl text-white font-semibold text-sm transition shadow-lg flex items-center gap-2 disabled:opacity-50"
                        style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 4px 20px rgba(34,197,94,0.2)' }}>
                        {status === 'loading' ? (
                          <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Sending...</>
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
    </main>
  )
}
