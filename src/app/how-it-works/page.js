'use client'
import Link from 'next/link'

const workflow = [
  { num: '01', icon: '🔐', title: 'Create Your Account', desc: 'Sign up as a Donor, NGO, or Restaurant in under 2 minutes. NGOs go through a manual review for quality assurance.' },
  { num: '02', icon: '📸', title: 'Post Surplus Food', desc: 'Fill in food name, quantity, type, expiry time, pickup location, and an optional photo.' },
  { num: '03', icon: '🔔', title: 'NGOs Get Notified', desc: 'All verified NGOs within the pickup radius are instantly notified and can accept from their dashboard.' },
  { num: '04', icon: '✅', title: 'Donation Accepted', desc: 'An NGO accepts the donation. The donor is notified immediately and pickup is confirmed.' },
  { num: '05', icon: '🚗', title: 'Food Collected', desc: 'The NGO team arrives at the donor location and collects the food. Status updates in real time.' },
  { num: '06', icon: '📊', title: 'Impact Recorded', desc: 'Meals saved, points earned, and badges unlocked are updated automatically on the leaderboard.' },
]
const roles = [
  { icon: '🏠', title: 'Donor', accent: '#22c55e', points: ['Register and create a donor profile', 'Upload surplus food with details and photo', 'Track donation status in real time', 'Earn points and badges for every donation', 'Climb the leaderboard and unlock rewards'] },
  { icon: '🤝', title: 'NGO', accent: '#3b82f6', points: ['Register and get verified by the RescueBite team', 'Browse available donations nearby on the dashboard', 'Accept and collect donations with one click', 'Mark donations as collected and completed', 'View analytics on food received and distributed'] },
  { icon: '🍽️', title: 'Restaurant', accent: '#f59e0b', points: ['Register as a restaurant or hotel donor', 'Schedule recurring daily surplus donations', 'Get auto-matched with the nearest NGO', 'Track all past and active donations', 'Receive impact certificates for CSR reporting'] },
  { icon: '🛡️', title: 'Admin', accent: '#d946ef', points: ['Full platform visibility and control', 'Manage and verify all users and NGOs', 'View platform-wide analytics and trends', 'Moderate donations and resolve disputes', 'Manage user roles, points, and badges'] },
]
const faqs = [
  { q: 'Is there a minimum quantity for donation?', a: 'No minimum at all. Even a single home-cooked meal counts and is welcome on the platform.' },
  { q: 'How quickly does food get picked up?', a: 'NGOs are notified instantly. Most pickups happen within 1-3 hours of posting.' },
  { q: 'How are NGOs verified?', a: 'Every NGO goes through a manual verification process by our team before they can accept donations.' },
  { q: 'Can I schedule recurring donations?', a: 'Yes. Restaurants and hotels can set up recurring donation schedules so the process is fully automated.' },
  { q: 'What types of food can be donated?', a: 'Cooked food, raw produce, and packaged goods are all accepted. Food must be safe for consumption.' },
  { q: 'Is the platform free to use?', a: 'Completely free for donors and NGOs. No fees, no commissions.' },
  { q: 'What if an NGO does not pick up?', a: 'If a donation is not accepted within 2 hours, it is re-broadcast to a wider radius of NGOs automatically.' },
  { q: 'Can I donate food from outside India?', a: 'Currently RescueBite operates only in India. We plan to expand internationally in 2026.' },
]
const benefits = [
  { title: 'Earn Points', desc: 'Every donation earns you points that unlock badges and leaderboard rankings.' },
  { title: 'Unlock Badges', desc: 'Silver, Gold, and Hunger Hero badges for milestone donors.' },
  { title: 'CSR Certificates', desc: 'Restaurants and corporates receive official impact certificates for CSR reporting.' },
  { title: 'Impact Dashboard', desc: 'See exactly how many meals you have rescued and communities you have helped.' },
]

const S = ({ children, alt }) => (
  <section className="py-24 px-6" style={{ backgroundColor: alt ? 'var(--bg-surface)' : 'var(--bg-base)' }}>
    {children}
  </section>
)

export default function HowItWorksPage() {
  return (
    <main className="overflow-x-hidden page-bg">

      <section className="relative py-32 px-6 text-center overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--bg-base) 0%, #0d2818 50%, var(--bg-base) 100%)' }}>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 border text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-widest uppercase" style={{ backgroundColor: 'var(--accent-soft)', borderColor: 'var(--accent)', color: 'var(--accent)' }}>Simple. Fast. Impactful.</span>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-primary">How <span className="text-gradient">RescueBite</span> Works</h1>
          <p className="mt-6 text-lg max-w-xl mx-auto leading-relaxed text-secondary">From surplus food to a rescued meal — our platform makes the entire process seamless for everyone involved.</p>
        </div>
      </section>

      <S>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: 'var(--accent)' }}>Step by Step</span>
            <h2 className="text-4xl font-extrabold mt-3 text-primary">The Donation Journey</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {workflow.map((w) => (
              <div key={w.num} className="flex gap-5 p-6 rounded-2xl border transition hover:-translate-y-0.5" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-extrabold text-sm shrink-0 shadow-lg" style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 4px 16px rgba(34,197,94,0.2)' }}>{w.num}</div>
                <div>
                  <div className="flex items-center gap-2 mb-1"><span className="text-lg">{w.icon}</span><h3 className="font-bold text-sm text-primary">{w.title}</h3></div>
                  <p className="text-sm leading-relaxed text-secondary">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </S>

      <S alt>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: 'var(--accent)' }}>System Flow</span>
            <h2 className="text-4xl font-extrabold mt-3 text-primary">Platform Flow Diagram</h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-3">
            {[{icon:'🔐',label:'Register'},{icon:'📦',label:'Upload Food'},{icon:'✅',label:'NGO Accepts'},{icon:'🚗',label:'Collected'},{icon:'📊',label:'Impact Updated'}].map((f, i, arr) => (
              <div key={f.label} className="flex items-center gap-3">
                <div className="rounded-2xl px-6 py-4 text-center min-w-[110px] border transition" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                  <span className="text-2xl block">{f.icon}</span>
                  <p className="text-xs font-semibold mt-2 text-secondary">{f.label}</p>
                </div>
                {i < arr.length - 1 && <span className="font-bold text-xl hidden sm:block" style={{ color: 'var(--accent)' }}>→</span>}
              </div>
            ))}
          </div>
        </div>
      </S>

      <S>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: 'var(--accent)' }}>Roles</span>
            <h2 className="text-4xl font-extrabold mt-3 text-primary">Who Does What?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {roles.map((r) => (
              <div key={r.title} className="p-6 rounded-2xl border transition" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">{r.icon}</span>
                  <span className="text-sm font-bold px-3 py-1 rounded-full border" style={{ color: r.accent, backgroundColor: `${r.accent}15`, borderColor: `${r.accent}30` }}>{r.title}</span>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {r.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-secondary">
                      <span className="mt-0.5 shrink-0 font-bold" style={{ color: 'var(--accent)' }}>✓</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </S>

      <S alt>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-semibold text-sm uppercase tracking-widest text-amber-500">Rewards</span>
            <h2 className="text-4xl font-extrabold mt-3 text-primary">Benefits of Donating</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b) => (
              <div key={b.title} className="p-6 rounded-2xl border text-center transition hover:-translate-y-1" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mx-auto mb-4" style={{ backgroundColor: 'rgba(245,158,11,0.1)' }}>⭐</div>
                <h3 className="font-bold mb-2 text-primary">{b.title}</h3>
                <p className="text-sm leading-relaxed text-secondary">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </S>

      <S>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: 'var(--accent)' }}>FAQ</span>
            <h2 className="text-4xl font-extrabold mt-3 text-primary">Common Questions</h2>
          </div>
          <div className="flex flex-col gap-4">
            {faqs.map((f) => (
              <div key={f.q} className="p-6 rounded-2xl border transition" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <p className="font-semibold text-sm mb-2 text-primary">{f.q}</p>
                <p className="text-sm leading-relaxed text-secondary">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </S>

      <S alt>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-5 text-primary">Ready to get started?</h2>
          <p className="mb-10 text-secondary">Sign up in seconds and start making an impact today.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/signup" className="px-8 py-4 rounded-xl text-white font-semibold transition shadow-xl" style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 8px 32px rgba(34,197,94,0.25)' }}>Start Donating</Link>
            <Link href="/signup" className="px-8 py-4 rounded-xl font-semibold transition border" style={{ borderColor: 'var(--border-hover)', color: 'var(--text-primary)' }}>Register as NGO</Link>
          </div>
        </div>
      </S>
    </main>
  )
}
