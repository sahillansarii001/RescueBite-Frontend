'use client'
import { useState } from 'react'
import api from '../../utils/api'
import { Mail, Phone, MapPin, Clock, Briefcase, Code2, Camera, CheckCircle2, Loader2 } from 'lucide-react'

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
      <section className="relative py-32 px-6 text-center overflow-hidden bg-gradient-to-br from-green-800 to-green-900">
        <div className="absolute top-1/3 left-1/3 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 border border-green-400 text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-widest uppercase bg-green-800/50 text-green-200">
            We&apos;d Love to Hear From You
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-white">
            Contact <span className="text-orange-400">RescueBite</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-green-100">Questions, partnerships, feedback — we&apos;re here for all of it.</p>
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
                  { icon: <Mail className="w-5 h-5" />, label: 'hello@rescuebite.in', href: 'mailto:hello@rescuebite.in' },
                  { icon: <Phone className="w-5 h-5" />, label: '+91 98765 43210', href: 'tel:+919876543210' },
                  { icon: <MapPin className="w-5 h-5" />, label: 'Mumbai, Maharashtra, India', href: null },
                  { icon: <Clock className="w-5 h-5" />, label: 'Mon-Sat, 9 AM - 6 PM IST', href: null },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-green-100 shrink-0 bg-white/10 backdrop-blur-sm">{c.icon}</div>
                    {c.href
                      ? <a href={c.href} className="text-green-50 text-sm hover:text-white font-medium transition">{c.label}</a>
                      : <span className="text-green-50 text-sm font-medium">{c.label}</span>}
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                {[[<Briefcase className="w-5 h-5" key="linkedin" />, 'https://linkedin.com', 'LinkedIn'], [<Code2 className="w-5 h-5" key="github" />, 'https://github.com', 'GitHub'], [<Camera className="w-5 h-5" key="instagram" />, 'https://instagram.com', 'Instagram']].map(([icon, href, label]) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-green-100 transition hover:scale-110 hover:bg-white/20 bg-white/10 backdrop-blur-sm">
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="md:col-span-3 p-10 bg-white/90 backdrop-blur-sm">
              {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-10">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-green-50 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-900">Message Received</h3>
                  <p className="text-sm mt-3 max-w-xs text-gray-600 font-medium leading-relaxed">Thank you for reaching out. We will respond within 24 hours.</p>
                  <button onClick={() => { setStatus('idle'); setForm({ name: '', email: '', subject: '', message: '' }) }}
                    className="mt-8 text-sm font-bold border border-green-200/50 bg-white text-green-700 px-6 py-2.5 rounded-full hover:border-green-400 hover:text-green-800 transition-colors shadow-sm">
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-extrabold mb-2 text-green-900">Get in Touch</h2>
                  <p className="text-sm mb-8 text-gray-600 font-medium">We typically respond within one business day.</p>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest mb-2 text-green-800/60">Full Name</label>
                        <input id="name" type="text" required placeholder="John Doe" value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full bg-white/50 border-b-2 border-green-200/50 py-3 px-1 text-sm placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors text-green-900 font-medium" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest mb-2 text-green-800/60">Email Address</label>
                        <input id="email" type="email" required placeholder="you@example.com" value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full bg-white/50 border-b-2 border-green-200/50 py-3 px-1 text-sm placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors text-green-900 font-medium" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-widest mb-2 text-green-800/60">Subject</label>
                      <input id="subject" type="text" required placeholder="How can we help?" value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full bg-white/50 border-b-2 border-green-200/50 py-3 px-1 text-sm placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors text-green-900 font-medium" />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest mb-2 text-green-800/60">Message</label>
                      <textarea id="message" required rows={4} placeholder="Write your message here..." value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full bg-white/50 border-b-2 border-green-200/50 py-3 px-1 text-sm placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors resize-none text-green-900 font-medium" />
                    </div>
                    {status === 'error' && <p className="text-red-500 text-sm font-medium">Something went wrong. Please try again or email us directly.</p>}
                    <div className="flex justify-end pt-4">
                      <button type="submit" disabled={status === 'loading'}
                        className="px-8 py-3.5 rounded-full text-white font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-[0_8px_30px_rgba(34,197,94,0.3)] hover:-translate-y-0.5 min-w-[200px]"
                        style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>
                        {status === 'loading' ? (
                          <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
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
