'use client'
import Link from 'next/link'

const workflow = [
  { step: '01', icon: '📸', title: 'Donor Uploads Food', desc: 'Donor fills in food name, quantity, type, expiry time, location, and an optional photo. Takes under 2 minutes.' },
  { step: '02', icon: '🔔', title: 'NGOs View Nearby Donations', desc: 'Verified NGOs in the area are instantly notified and can browse available donations on their dashboard.' },
  { step: '03', icon: '✅', title: 'NGO Accepts Donation', desc: 'An NGO accepts the donation, locking it in and notifying the donor that pickup is confirmed.' },
  { step: '04', icon: '🚗', title: 'Food Collected', desc: 'The NGO team arrives at the donor\'s location and collects the food. Status updates in real time.' },
  { step: '05', icon: '📊', title: 'Analytics Updated', desc: 'Impact metrics — meals saved, points earned, badges unlocked — are updated automatically for all parties.' },
]

const roles = [
  {
    icon: '🏠',
    title: 'Donor Role',
    color: 'border-green-200 bg-green-50',
    badge: 'bg-green-100 text-green-700',
    points: [
      'Register and create a donor profile',
      'Upload surplus food with details and photo',
      'Track donation status in real time',
      'Earn points and badges for every donation',
      'View personal impact on the leaderboard',
    ],
  },
  {
    icon: '🤝',
    title: 'NGO Role',
    color: 'border-blue-200 bg-blue-50',
    badge: 'bg-blue-100 text-blue-700',
    points: [
      'Register and get verified by the RescueBite team',
      'Browse available donations nearby',
      'Accept and collect donations',
      'Mark donations as collected and completed',
      'View analytics on food received',
    ],
  },
  {
    icon: '🍽️',
    title: 'Restaurant Role',
    color: 'border-orange-200 bg-orange-50',
    badge: 'bg-orange-100 text-orange-700',
    points: [
      'Register as a restaurant donor',
      'Schedule recurring daily surplus donations',
      'Get matched with the nearest NGO automatically',
      'Track all past and active donations',
      'Receive impact certificates for CSR reporting',
    ],
  },
  {
    icon: '🛡️',
    title: 'Admin Role',
    color: 'border-purple-200 bg-purple-50',
    badge: 'bg-purple-100 text-purple-700',
    points: [
      'Full platform visibility and control',
      'Manage and verify all users and NGOs',
      'View platform-wide analytics and trends',
      'Moderate donations and resolve disputes',
      'Manage user roles, points, and badges',
    ],
  },
]

const flowSteps = [
  { label: 'Register / Login', icon: '🔐' },
  { label: 'Upload Food', icon: '📦' },
  { label: 'NGO Accepts', icon: '✅' },
  { label: 'Food Distributed', icon: '🚗' },
  { label: 'Impact Updated', icon: '📊' },
]

export default function HowItWorksPage() {
  return (
    <main className="overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-green-700 via-green-800 to-green-900 text-white py-24 px-6 text-center relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_70%,white,transparent_60%)]" />
        <span className="inline-block bg-orange-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
          Simple. Fast. Impactful.
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold max-w-2xl mx-auto leading-tight">
          How RescueBite Works
        </h1>
        <p className="mt-5 text-green-100 text-lg max-w-xl mx-auto leading-relaxed">
          From surplus food to a rescued meal — our platform makes the entire process seamless for donors, NGOs, and communities.
        </p>
      </section>

      {/* ── Workflow Cards ── */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">Step by Step</span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-2">The Donation Journey</h2>
        </div>
        <div className="flex flex-col gap-6">
          {workflow.map((w, i) => (
            <div key={w.step} className="flex gap-6 items-start bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition">
              <div className="shrink-0 w-14 h-14 bg-green-100 text-green-700 font-extrabold text-lg rounded-2xl flex items-center justify-center">
                {w.step}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{w.icon}</span>
                  <h3 className="font-bold text-gray-900 text-base">{w.title}</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{w.desc}</p>
              </div>
              {i < workflow.length - 1 && (
                <div className="hidden md:flex shrink-0 items-center text-green-300 text-2xl self-center">↓</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── System Flow Diagram ── */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">System Flow</span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-2">Platform Flow Diagram</h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-3">
            {flowSteps.map((f, i) => (
              <div key={f.label} className="flex items-center gap-3">
                <div className="bg-white rounded-2xl border-2 border-green-200 px-6 py-4 text-center shadow-sm min-w-[120px]">
                  <span className="text-2xl block">{f.icon}</span>
                  <p className="text-xs font-semibold text-gray-700 mt-2">{f.label}</p>
                </div>
                {i < flowSteps.length - 1 && (
                  <span className="text-green-400 font-bold text-xl hidden sm:block">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Role Explanation ── */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">Roles</span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-2">Who Does What?</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">Every user type has a clear, purposeful role in the food rescue ecosystem.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((r) => (
            <div key={r.title} className={`rounded-2xl border-2 p-6 ${r.color} hover:shadow-md transition`}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{r.icon}</span>
                <span className={`text-sm font-bold px-3 py-1 rounded-full ${r.badge}`}>{r.title}</span>
              </div>
              <ul className="flex flex-col gap-2">
                {r.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-r from-green-700 to-green-800 text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-extrabold mb-4">Ready to get started?</h2>
        <p className="text-green-200 mb-8 max-w-md mx-auto">Sign up in seconds and start making an impact today.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/signup"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-xl transition shadow">
            Start Donating
          </Link>
          <Link href="/signup"
            className="border-2 border-white text-white hover:bg-white hover:text-green-800 font-semibold px-8 py-3 rounded-xl transition">
            Register as NGO
          </Link>
        </div>
      </section>

      <footer className="bg-green-900 text-green-200 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p className="font-semibold text-white">🍃 RescueBite</p>
          <div className="flex flex-wrap gap-6 justify-center">
            {[['Home', '/'], ['About', '/about'], ['How It Works', '/how-it-works'], ['Impact', '/impact'], ['Contact', '/contact']].map(([l, h]) => (
              <Link key={h} href={h} className="hover:text-white transition">{l}</Link>
            ))}
          </div>
          <p className="text-green-400 text-xs">© 2024 RescueBite</p>
        </div>
      </footer>
    </main>
  )
}
