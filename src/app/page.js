'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { isLoggedIn } from '../utils/auth'

const stats = [
  { value: '12,000+', label: 'Meals Rescued' },
  { value: '50+', label: 'NGO Partners' },
  { value: '8 Tonnes', label: 'Food Saved' },
  { value: '10 Cities', label: 'Active Regions' },
]

const features = [
  { icon: '⚡', title: 'Instant Matching', desc: 'Connects donors with the nearest verified NGO in real time — no delays, no waste.' },
  { icon: '📍', title: 'Live Tracking', desc: 'Track every donation from upload to collection with live status updates.' },
  { icon: '🏢', title: 'Verified NGO Network', desc: 'Every NGO is manually verified. You know your food reaches the right hands.' },
  { icon: '📊', title: 'Impact Analytics', desc: 'See your personal impact — meals saved, points earned, badges unlocked.' },
  { icon: '🔒', title: 'Secure & Transparent', desc: 'End-to-end donation tracking with full audit trail. Every action is logged.' },
  { icon: '🌍', title: 'SDG Aligned', desc: 'Contributing to UN SDG 1 (No Poverty), SDG 2 (Zero Hunger), and SDG 12.' },
]

const donors = [
  { icon: '🏠', title: 'Households', desc: 'Leftover home-cooked meals that deserve a second life.' },
  { icon: '🍽️', title: 'Restaurants & Hotels', desc: 'Daily surplus meals — schedule recurring pickups effortlessly.' },
  { icon: '💒', title: 'Events & Banquets', desc: 'Post-event bulk food rescued before it goes to waste.' },
  { icon: '🏪', title: 'Grocery & Retail', desc: 'Near-expiry packaged goods redistributed to communities.' },
]

const steps = [
  { num: '01', title: 'Create an Account', desc: 'Sign up as a Donor, NGO, or Restaurant in under 2 minutes.' },
  { num: '02', title: 'Post Surplus Food', desc: 'Add food details, quantity, expiry, location and an optional photo.' },
  { num: '03', title: 'NGO Gets Notified', desc: 'Nearby verified NGOs are instantly alerted and can accept the donation.' },
  { num: '04', title: 'Food Gets Rescued', desc: 'NGO collects the food and marks it delivered. Impact is updated live.' },
]

const testimonials = [
  { name: 'Priya Sharma', role: 'Restaurant Owner, Mumbai', avatar: 'PS', quote: 'We used to throw away 20kg of food daily. RescueBite changed that completely. Now it reaches families in need within hours.' },
  { name: 'Ravi Kumar', role: 'NGO Director, Pune', avatar: 'RK', quote: 'The platform is incredibly easy to use. We\'ve collected over 500 donations in 3 months. The real-time notifications are a game changer.' },
  { name: 'Anita Desai', role: 'Individual Donor, Bangalore', avatar: 'AD', quote: 'I never knew donating leftover food could be this simple. I posted my first donation and it was picked up within 90 minutes.' },
]

const partners = ['Apollo Hospitals', 'Dominos India', 'Taj Hotels', 'BigBasket', 'IIT Mumbai', 'TATA Trust']

const awards = [
  { title: 'Best Social Impact Startup', org: 'Startup India 2024' },
  { title: 'Top 10 Food Tech Platforms', org: 'Forbes India 2024' },
  { title: 'SDG Champion Award', org: 'UNDP India 2023' },
]

export default function HomePage() {
  useEffect(() => { isLoggedIn() }, [])

  return (
    <main className="overflow-x-hidden page-bg">

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden hero-glow-green" style={{ backgroundColor: 'var(--bg-base)' }}>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(217,70,239,0.08) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 border text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-widest uppercase" style={{ backgroundColor: 'var(--accent-soft)', borderColor: 'var(--accent)', color: 'var(--accent)' }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent)' }} />
            Fighting Hunger Across India
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight text-primary">
            Transform Surplus Food
            <br />
            <span className="text-gradient">Into Social Impact</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-secondary">
            RescueBite connects food donors, verified NGOs, and communities to rescue surplus food — powered by technology, driven by compassion.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link href="/signup" className="px-8 py-4 rounded-xl text-white font-semibold text-base transition shadow-xl hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 8px 32px rgba(34,197,94,0.25)' }}>
              Start Donating Free →
            </Link>
            <Link href="/how-it-works" className="px-8 py-4 rounded-xl font-semibold text-base transition hover:-translate-y-0.5 border" style={{ borderColor: 'var(--border-hover)', color: 'var(--text-primary)' }}>
              See How It Works
            </Link>
          </div>
          <p className="mt-6 text-sm" style={{ color: 'var(--text-muted)' }}>No minimum quantity · Free to join · Instant NGO matching</p>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: 'var(--text-muted)' }}>
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, var(--text-muted), transparent)' }} />
        </div>
      </section>

      {/* Stats */}
      <section className="border-y py-14" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl md:text-4xl font-extrabold text-gradient">{s.value}</p>
              <p className="text-sm mt-1 text-secondary">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 page-bg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: 'var(--accent)' }}>Platform Features</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-3 text-primary">Built for Real Impact</h2>
            <p className="mt-4 max-w-xl mx-auto text-secondary">Every feature is designed to make food rescue faster, safer, and more transparent.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="group p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 cursor-default" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5" style={{ backgroundColor: 'var(--accent-soft)' }}>{f.icon}</div>
                <h3 className="font-bold text-base mb-2 text-primary">{f.title}</h3>
                <p className="text-sm leading-relaxed text-secondary">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Can Donate */}
      <section className="py-24 px-6" style={{ backgroundColor: 'var(--bg-surface)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-semibold text-sm uppercase tracking-widest text-amber-500">Donors</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-3 text-primary">Who Can Donate?</h2>
            <p className="mt-4 text-secondary">Anyone with surplus food is welcome — no minimum, no barriers.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {donors.map((d) => (
              <div key={d.title} className="p-6 rounded-2xl border text-center transition-all hover:-translate-y-1 cursor-default" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#f59e0b'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4" style={{ backgroundColor: 'rgba(245,158,11,0.1)' }}>{d.icon}</div>
                <h3 className="font-bold mb-2 text-primary">{d.title}</h3>
                <p className="text-sm leading-relaxed text-secondary">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 page-bg">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: 'var(--accent)' }}>Process</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-3 text-primary">How It Works</h2>
            <p className="mt-4 text-secondary">Four simple steps from surplus food to rescued meal.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {steps.map((s, i) => (
              <div key={s.num} className="relative text-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg mx-auto mb-4 shadow-lg" style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 4px 20px rgba(34,197,94,0.2)' }}>{s.num}</div>
                {i < steps.length - 1 && <div className="hidden md:block absolute top-7 left-[calc(50%+28px)] right-0 h-px" style={{ background: 'linear-gradient(to right, rgba(34,197,94,0.4), transparent)' }} />}
                <h3 className="font-bold mb-2 text-primary">{s.title}</h3>
                <p className="text-sm leading-relaxed text-secondary">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/how-it-works" className="inline-flex items-center gap-2 font-semibold text-sm transition hover:opacity-80" style={{ color: 'var(--accent)' }}>
              View full workflow →
            </Link>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-14 px-6 border-y" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm uppercase tracking-widest mb-8 text-muted">Trusted by organizations across India</p>
          <div className="flex flex-wrap justify-center gap-4">
            {partners.map((p) => (
              <span key={p} className="text-sm font-medium px-4 py-2 rounded-full border transition cursor-default text-secondary" style={{ borderColor: 'var(--border)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 page-bg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: 'var(--accent)' }}>Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-3 text-primary">What People Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="p-6 rounded-2xl border flex flex-col gap-4 transition" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <div className="flex gap-1">{[...Array(5)].map((_, i) => <span key={i} className="text-amber-400 text-sm">★</span>)}</div>
                <p className="text-sm leading-relaxed italic text-secondary">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-auto pt-4 border-t flex items-center gap-3" style={{ borderColor: 'var(--border)' }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)' }}>{t.avatar}</div>
                  <div>
                    <p className="font-semibold text-sm text-primary">{t.name}</p>
                    <p className="text-xs mt-0.5 text-muted">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-16 px-6" style={{ backgroundColor: 'var(--bg-surface)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="font-semibold text-sm uppercase tracking-widest text-amber-500">Recognition</span>
            <h2 className="text-3xl font-extrabold mt-3 text-primary">Awards & Recognition</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {awards.map((a) => (
              <div key={a.title} className="flex items-center gap-4 p-5 rounded-2xl border transition" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(245,158,11,0.1)' }}>
                  <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                </div>
                <div>
                  <p className="font-bold text-sm text-primary">{a.title}</p>
                  <p className="text-xs mt-0.5 text-muted">{a.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 page-bg relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(34,197,94,0.06) 0%, transparent 70%)' }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-5 text-primary">
            Ready to make a <span className="text-gradient">difference?</span>
          </h2>
          <p className="mb-10 text-lg text-secondary">Join thousands of donors and NGOs already fighting hunger with RescueBite.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/signup" className="px-8 py-4 rounded-xl text-white font-semibold transition shadow-xl" style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 8px 32px rgba(34,197,94,0.25)' }}>
              Get Started Free
            </Link>
            <Link href="/impact" className="px-8 py-4 rounded-xl font-semibold transition border" style={{ borderColor: 'var(--border-hover)', color: 'var(--text-primary)' }}>
              View Impact Data
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
