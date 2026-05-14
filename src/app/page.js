'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { isLoggedIn } from '../utils/auth'

const stats = [
  { icon: '🍱', value: '12,000+', label: 'Meals Saved' },
  { icon: '🤝', value: '50+', label: 'NGOs Connected' },
  { icon: '🌾', value: '8 Tonnes', label: 'Food Rescued' },
  { icon: '📦', value: '340+', label: 'Active Donations' },
]

const features = [
  { icon: '🔄', title: 'Smart Food Redistribution', desc: 'AI-assisted matching connects surplus food with the nearest verified NGO in real time.' },
  { icon: '📍', title: 'Real-Time Tracking', desc: 'Track every donation from upload to collection with live status updates.' },
  { icon: '🏢', title: 'NGO Network', desc: 'A growing network of verified NGOs ready to collect and distribute food across cities.' },
  { icon: '📊', title: 'Analytics Dashboard', desc: 'Admins and NGOs get full visibility into donation trends, impact metrics, and leaderboards.' },
]

const donors = [
  { icon: '🏠', title: 'Individuals', desc: 'Leftover home-cooked food' },
  { icon: '🍽️', title: 'Restaurants & Hotels', desc: 'Daily surplus meals' },
  { icon: '💒', title: 'Marriage Halls & Events', desc: 'Post-event bulk food' },
]

const steps = [
  { step: '01', title: 'Donor Uploads Food', desc: 'Add food details, quantity, location and photo in seconds.' },
  { step: '02', title: 'NGO Accepts', desc: 'Nearby NGOs get notified and accept the donation instantly.' },
  { step: '03', title: 'Food Distributed', desc: 'NGO collects and distributes food to those in need.' },
]

export default function HomePage() {
  useEffect(() => { isLoggedIn() }, [])

  return (
    <main className="overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="min-h-[92vh] bg-gradient-to-br from-green-700 via-green-800 to-green-900 flex flex-col items-center justify-center text-center px-6 relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_50%,white,transparent_60%)]" />
        <span className="inline-block bg-orange-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
          Fighting Hunger, One Meal at a Time
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight max-w-3xl">
          Transform Surplus Food Into{' '}
          <span className="text-orange-400">Social Impact</span>
        </h1>
        <p className="mt-5 text-green-100 text-lg md:text-xl max-w-2xl leading-relaxed">
          RescueBite connects food donors, NGOs, and communities to rescue surplus food and fight hunger — powered by technology, driven by compassion.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link href="/signup"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3.5 rounded-xl transition text-base shadow-lg hover:shadow-orange-500/30">
            Start Donating
          </Link>
          <Link href="/signup"
            className="border-2 border-white text-white hover:bg-white hover:text-green-800 font-semibold px-8 py-3.5 rounded-xl transition text-base">
            I&apos;m an NGO
          </Link>
        </div>
        <p className="mt-6 text-green-300 text-sm">Free to join · No minimum quantity · Instant NGO matching</p>
      </section>

      {/* ── Stats ── */}
      <section className="bg-green-800 text-white py-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6 text-center">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span className="text-3xl">{s.icon}</span>
              <p className="text-2xl md:text-3xl font-extrabold mt-1">{s.value}</p>
              <p className="text-green-300 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Why RescueBite?</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">Built for speed, transparency, and real-world impact.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
              <span className="text-4xl">{f.icon}</span>
              <h3 className="font-bold text-gray-900 mt-4 text-base">{f.title}</h3>
              <p className="text-gray-500 text-sm mt-2 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Who Can Donate ── */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Who Can Donate?</h2>
            <p className="text-gray-500 mt-3">Anyone with surplus food is welcome.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {donors.map((d) => (
              <div key={d.title} className="bg-white rounded-2xl shadow-sm p-8 text-center hover:shadow-md transition border border-gray-100">
                <span className="text-5xl">{d.icon}</span>
                <h3 className="mt-4 font-bold text-gray-900 text-lg">{d.title}</h3>
                <p className="text-gray-500 text-sm mt-2">{d.desc}</p>
                <span className="inline-block mt-4 text-green-600 text-xs font-semibold bg-green-50 px-3 py-1 rounded-full">
                  Register as Donor →
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works Preview ── */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">How It Works</h2>
          <p className="text-gray-500 mt-3">Three simple steps to rescue food.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((s, i) => (
            <div key={s.step} className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-green-100 text-green-700 font-extrabold text-lg rounded-full flex items-center justify-center mx-auto">
                {s.step}
              </div>
              <h3 className="font-bold text-gray-900 mt-4 text-base">{s.title}</h3>
              <p className="text-gray-500 text-sm mt-2">{s.desc}</p>
              {i < steps.length - 1 && (
                <span className="hidden md:block absolute top-10 -right-3 text-green-300 text-2xl">→</span>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/how-it-works"
            className="inline-block border-2 border-green-600 text-green-700 hover:bg-green-600 hover:text-white font-semibold px-8 py-3 rounded-xl transition">
            See Full Workflow →
          </Link>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to make a difference?</h2>
        <p className="text-orange-100 mb-8 max-w-lg mx-auto">
          Join thousands of donors and NGOs already fighting hunger with RescueBite.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/signup"
            className="bg-white text-orange-600 hover:bg-orange-50 font-semibold px-8 py-3 rounded-xl transition shadow">
            Get Started Free
          </Link>
          <Link href="/impact"
            className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-semibold px-8 py-3 rounded-xl transition">
            See the Impact
          </Link>
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
              {[['Home', '/'], ['About', '/about'], ['How It Works', '/how-it-works'], ['Impact', '/impact'], ['Contact', '/contact']].map(([label, href]) => (
                <Link key={href} href={href} className="text-green-300 hover:text-white text-sm transition">{label}</Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Connect</p>
            <div className="flex gap-4">
              {[
                { label: 'LinkedIn', href: 'https://linkedin.com', icon: '💼' },
                { label: 'GitHub', href: 'https://github.com', icon: '🐙' },
                { label: 'Instagram', href: 'https://instagram.com', icon: '📸' },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="text-green-300 hover:text-white text-sm transition flex items-center gap-1">
                  {s.icon} {s.label}
                </a>
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
