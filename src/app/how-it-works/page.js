'use client'
import Link from 'next/link'
import { Lock, Camera, Bell, CheckCircle2, Car, BarChart3, Home, Handshake, UtensilsCrossed, Shield, Package, Star, ArrowRight } from 'lucide-react'

const workflow = [
  { num: '01', icon: <Lock className="w-5 h-5" />, title: 'Create Your Account', desc: 'Sign up as a Donor, NGO, or Restaurant in under 2 minutes. NGOs go through a manual review for quality assurance.' },
  { num: '02', icon: <Camera className="w-5 h-5" />, title: 'Post Surplus Food', desc: 'Fill in food name, quantity, type, expiry time, pickup location, and an optional photo.' },
  { num: '03', icon: <Bell className="w-5 h-5" />, title: 'NGOs Get Notified', desc: 'All verified NGOs within the pickup radius are instantly notified and can accept from their dashboard.' },
  { num: '04', icon: <CheckCircle2 className="w-5 h-5" />, title: 'Donation Accepted', desc: 'An NGO accepts the donation. The donor is notified immediately and pickup is confirmed.' },
  { num: '05', icon: <Car className="w-5 h-5" />, title: 'Food Collected', desc: 'The NGO team arrives at the donor location and collects the food. Status updates in real time.' },
  { num: '06', icon: <BarChart3 className="w-5 h-5" />, title: 'Impact Recorded', desc: 'Meals saved, points earned, and badges unlocked are updated automatically on the leaderboard.' },
]
const roles = [
  { icon: <Home className="w-6 h-6" />, title: 'Donor', accent: '#22c55e', points: ['Register and create a donor profile', 'Upload surplus food with details and photo', 'Track donation status in real time', 'Earn points and badges for every donation', 'Climb the leaderboard and unlock rewards'] },
  { icon: <Handshake className="w-6 h-6" />, title: 'NGO', accent: '#3b82f6', points: ['Register and get verified by the RescueBite team', 'Browse available donations nearby on the dashboard', 'Accept and collect donations with one click', 'Mark donations as collected and completed', 'View analytics on food received and distributed'] },
  { icon: <UtensilsCrossed className="w-6 h-6" />, title: 'Restaurant', accent: '#f59e0b', points: ['Register as a restaurant or hotel donor', 'Schedule recurring daily surplus donations', 'Get auto-matched with the nearest NGO', 'Track all past and active donations', 'Receive impact certificates for CSR reporting'] },
  { icon: <Shield className="w-6 h-6" />, title: 'Admin', accent: '#d946ef', points: ['Full platform visibility and control', 'Manage and verify all users and NGOs', 'View platform-wide analytics and trends', 'Moderate donations and resolve disputes', 'Manage user roles, points, and badges'] },
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
  <section className={`py-24 px-6 ${alt ? 'bg-green-50/50' : 'bg-white'}`}>
    {children}
  </section>
)

export default function HowItWorksPage() {
  return (
    <main className="overflow-x-hidden page-bg">

      <section className="relative py-32 px-6 text-center overflow-hidden bg-gradient-to-br from-green-800 to-green-900">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 border border-green-400 text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-widest uppercase bg-green-800/50 text-green-200">Simple. Fast. Impactful.</span>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-white">How <span className="text-orange-400">RescueBite</span> Works</h1>
          <p className="mt-6 text-lg max-w-xl mx-auto leading-relaxed text-green-100">From surplus food to a rescued meal — our platform makes the entire process seamless for everyone involved.</p>
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
              <div key={w.num} className="flex gap-5 p-8 rounded-3xl border border-green-200/50 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg shrink-0 shadow-[0_4px_16px_rgba(22,163,74,0.3)]" style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>{w.num}</div>
                <div>
                  <div className="flex items-center gap-3 mb-2"><span className="text-green-600 bg-green-50 p-2 rounded-xl">{w.icon}</span><h3 className="font-bold text-base text-green-900">{w.title}</h3></div>
                  <p className="text-sm leading-relaxed text-gray-600 font-medium">{w.desc}</p>
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
          <div className="flex flex-wrap justify-center items-center gap-4">
            {[{icon:<Lock className="w-6 h-6" />,label:'Register'},{icon:<Package className="w-6 h-6" />,label:'Upload Food'},{icon:<CheckCircle2 className="w-6 h-6" />,label:'NGO Accepts'},{icon:<Car className="w-6 h-6" />,label:'Collected'},{icon:<BarChart3 className="w-6 h-6" />,label:'Impact Updated'}].map((f, i, arr) => (
              <div key={f.label} className="flex items-center gap-4">
                <div className="rounded-3xl px-8 py-5 text-center min-w-[140px] border border-green-200/50 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300">
                  <span className="flex justify-center text-green-600 bg-green-50 w-12 h-12 rounded-xl items-center mx-auto">{f.icon}</span>
                  <p className="text-xs font-bold mt-3 text-green-900 uppercase tracking-wider">{f.label}</p>
                </div>
                {i < arr.length - 1 && <ArrowRight className="w-6 h-6 text-green-400 hidden sm:block" />}
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
              <div key={r.title} className="p-8 rounded-3xl border border-green-200/50 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <span className="p-3 rounded-2xl" style={{ backgroundColor: `${r.accent}15`, color: r.accent }}>{r.icon}</span>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full border uppercase tracking-widest" style={{ color: r.accent, backgroundColor: `${r.accent}10`, borderColor: `${r.accent}30` }}>{r.title}</span>
                </div>
                <ul className="flex flex-col gap-3">
                  {r.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-gray-600 font-medium">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: r.accent }} />{p}
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
              <div key={b.title} className="p-8 rounded-3xl border border-green-200/50 text-center bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 bg-amber-50">
                  <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                </div>
                <h3 className="font-bold mb-3 text-green-900 text-lg">{b.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600 font-medium">{b.desc}</p>
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
              <div key={f.q} className="p-8 rounded-3xl border border-green-200/50 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300">
                <p className="font-bold text-base mb-3 text-green-900">{f.q}</p>
                <p className="text-sm leading-relaxed text-gray-600 font-medium">{f.a}</p>
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
