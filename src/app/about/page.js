'use client'
import Link from 'next/link'

const mission = [
  { icon: '🌱', title: 'Reduce Food Waste', desc: 'India wastes 68 million tonnes of food annually. We intercept surplus before it reaches landfills.' },
  { icon: '🍽️', title: 'Fight Hunger', desc: '194 million people in India go hungry every day. Every rescued meal is a direct intervention.' },
  { icon: '🤝', title: 'Empower Communities', desc: 'We give NGOs the digital tools they need to operate efficiently and scale their impact.' },
]
const vision = [
  { icon: '🤖', title: 'AI-Powered Matching', desc: 'Smart algorithms that match donors with the nearest NGO in under 60 seconds.' },
  { icon: '🗺️', title: '100 Cities by 2026', desc: 'Expanding from 10 cities today to every major urban center across India.' },
  { icon: '♿', title: 'Universal Accessibility', desc: 'Multi-language support and simplified UX for all literacy levels and devices.' },
  { icon: '📱', title: 'Mobile-First App', desc: 'A dedicated mobile app for donors and NGOs to manage donations on the go.' },
]
const problems = [
  { stat: '194M+', label: 'People go hungry in India', sub: 'FAO 2024' },
  { stat: '68M T', label: 'Food wasted annually', sub: 'FAO India' },
  { stat: '40%', label: 'Of food produced is lost', sub: 'FAO Report' },
  { stat: '80%', label: 'NGOs lack digital tools', sub: 'Estimated' },
]
const sdgs = [
  { num: 'SDG 1', title: 'No Poverty', desc: 'Reducing food insecurity directly addresses poverty at the grassroots level.', accent: '#ef4444' },
  { num: 'SDG 2', title: 'Zero Hunger', desc: 'Every rescued meal is a direct contribution to ending hunger in India.', accent: '#f59e0b' },
  { num: 'SDG 12', title: 'Responsible Consumption', desc: 'Reducing food waste aligns with sustainable consumption and production goals.', accent: '#f97316' },
  { num: 'SDG 17', title: 'Partnerships for Goals', desc: 'Connecting donors, NGOs, and communities through technology-driven partnerships.', accent: '#3b82f6' },
]
const timeline = [
  { year: '2022', event: 'RescueBite founded in Mumbai with a vision to digitize food rescue across India.' },
  { year: '2023', event: 'Launched in 3 cities. Onboarded 20 NGOs and 200+ donors in the first 6 months.' },
  { year: '2024', event: 'Expanded to 10 cities. 12,000+ meals rescued. Analytics dashboard launched.' },
  { year: '2025', event: 'Targeting 50 cities, mobile app launch, and AI-powered donor-NGO matching.' },
]
const team = [
  { name: 'Arjun Mehta', role: 'Co-Founder & CEO', avatar: 'AM', bio: 'Former product lead at Zomato. Passionate about using tech for social good.' },
  { name: 'Priya Nair', role: 'Co-Founder & CTO', avatar: 'PN', bio: 'Ex-Google engineer. Built scalable systems for 10M+ users.' },
  { name: 'Sneha Patil', role: 'Head of NGO Relations', avatar: 'SP', bio: '8 years in the non-profit sector. Manages our network of 50+ NGO partners.' },
  { name: 'Rahul Verma', role: 'Head of Operations', avatar: 'RV', bio: 'Supply chain expert. Ensures every donation reaches its destination on time.' },
  { name: 'Kavya Reddy', role: 'Head of Design', avatar: 'KR', bio: 'UX designer focused on accessibility and inclusive design for all users.' },
  { name: 'Amit Shah', role: 'Head of Growth', avatar: 'AS', bio: 'Growth hacker with experience scaling social impact startups across India.' },
]
const values = [
  { icon: '💡', title: 'Innovation', desc: 'We use technology to solve age-old problems in new, scalable ways.' },
  { icon: '❤️', title: 'Compassion', desc: 'Every decision we make is guided by empathy for those who go hungry.' },
  { icon: '🔍', title: 'Transparency', desc: 'Every donation is tracked, verified, and visible to all stakeholders.' },
  { icon: '⚡', title: 'Speed', desc: 'Food rescue is time-sensitive. We move fast so food does not go to waste.' },
  { icon: '🌱', title: 'Sustainability', desc: 'We build for the long term — for people, communities, and the planet.' },
  { icon: '🤝', title: 'Collaboration', desc: 'We believe the best solutions come from working together across sectors.' },
]

const Section = ({ children, alt }) => (
  <section className="py-24 px-6" style={{ backgroundColor: alt ? 'var(--bg-surface)' : 'var(--bg-base)' }}>
    {children}
  </section>
)

export default function AboutPage() {
  return (
    <main className="overflow-x-hidden page-bg">

      {/* Hero */}
      <section className="relative py-32 px-6 text-center overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--bg-base) 0%, #0d2818 50%, var(--bg-base) 100%)' }}>
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 border text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-widest uppercase" style={{ backgroundColor: 'var(--accent-soft)', borderColor: 'var(--accent)', color: 'var(--accent)' }}>Our Story</span>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-primary">About <span className="text-gradient">RescueBite</span></h1>
          <p className="mt-6 text-lg max-w-xl mx-auto leading-relaxed text-secondary">We started with a simple belief — no good food should go to waste while people go hungry. That belief became a platform.</p>
        </div>
      </section>

      {/* Problem */}
      <Section alt>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-semibold text-sm uppercase tracking-widest text-red-400">The Problem</span>
            <h2 className="text-4xl font-extrabold mt-3 text-primary">The Scale of the Crisis</h2>
            <p className="mt-4 max-w-xl mx-auto text-secondary">The numbers are staggering — and they demand urgent, tech-driven action.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {problems.map((p) => (
              <div key={p.stat} className="p-6 rounded-2xl border text-center transition" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <p className="text-3xl md:text-4xl font-extrabold text-gradient-warm">{p.stat}</p>
                <p className="text-sm mt-2 leading-snug text-secondary">{p.label}</p>
                <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full text-muted" style={{ backgroundColor: 'var(--bg-hover)' }}>{p.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Mission */}
      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: 'var(--accent)' }}>Our Mission</span>
              <h2 className="text-4xl font-extrabold mt-3 mb-6 text-primary">Why We Exist</h2>
              <p className="leading-relaxed mb-4 text-secondary">RescueBite is a smart food rescue platform that connects surplus food donors with verified NGOs and community kitchens. We use technology to make food redistribution fast, transparent, and scalable.</p>
              <p className="leading-relaxed text-secondary">Turning what would be waste into life-changing meals for those who need it most — that is our mission, every single day.</p>
              <Link href="/signup" className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl text-white font-semibold text-sm transition shadow-lg" style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 4px 20px rgba(34,197,94,0.2)' }}>
                Join the Mission →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {mission.map((m) => (
                <div key={m.title} className="flex gap-4 p-5 rounded-2xl border transition" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ backgroundColor: 'var(--accent-soft)' }}>{m.icon}</div>
                  <div>
                    <h3 className="font-bold text-sm text-primary">{m.title}</h3>
                    <p className="text-sm mt-1 leading-relaxed text-secondary">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section alt>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: 'var(--accent)' }}>Our Values</span>
            <h2 className="text-4xl font-extrabold mt-3 text-primary">What Drives Us</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v) => (
              <div key={v.title} className="p-6 rounded-2xl border transition hover:-translate-y-1" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4" style={{ backgroundColor: 'var(--accent-soft)' }}>{v.icon}</div>
                <h3 className="font-bold mb-2 text-primary">{v.title}</h3>
                <p className="text-sm leading-relaxed text-secondary">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Timeline */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-semibold text-sm uppercase tracking-widest text-amber-500">Journey</span>
            <h2 className="text-4xl font-extrabold mt-3 text-primary">Our Timeline</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, var(--accent), transparent)' }} />
            <div className="flex flex-col gap-8">
              {timeline.map((t) => (
                <div key={t.year} className="flex gap-6 items-start pl-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 relative z-10" style={{ backgroundColor: 'var(--accent)', boxShadow: '0 0 16px rgba(34,197,94,0.3)' }}>{t.year.slice(2)}</div>
                  <div className="p-5 rounded-2xl border flex-1 transition" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                    <span className="font-bold text-sm" style={{ color: 'var(--accent)' }}>{t.year}</span>
                    <p className="text-sm mt-1 leading-relaxed text-secondary">{t.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Team */}
      <Section alt>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: 'var(--accent)' }}>The Team</span>
            <h2 className="text-4xl font-extrabold mt-3 text-primary">Meet the People Behind RescueBite</h2>
            <p className="mt-4 max-w-xl mx-auto text-secondary">A passionate team of technologists, social workers, and changemakers.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {team.map((m) => (
              <div key={m.name} className="p-6 rounded-2xl border transition hover:-translate-y-1" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-lg mb-4" style={{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)' }}>{m.avatar}</div>
                <h3 className="font-bold text-primary">{m.name}</h3>
                <p className="text-xs font-semibold mt-0.5 mb-3" style={{ color: 'var(--accent)' }}>{m.role}</p>
                <p className="text-sm leading-relaxed text-secondary">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Vision */}
      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: 'var(--accent)' }}>Looking Ahead</span>
            <h2 className="text-4xl font-extrabold mt-3 text-primary">Our Vision</h2>
            <p className="mt-4 max-w-xl mx-auto text-secondary">Building the future of food rescue — smarter, wider, and more accessible.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {vision.map((v) => (
              <div key={v.title} className="p-6 rounded-2xl border transition hover:-translate-y-1" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4" style={{ backgroundColor: 'var(--accent-soft)' }}>{v.icon}</div>
                <h3 className="font-bold mb-2 text-primary">{v.title}</h3>
                <p className="text-sm leading-relaxed text-secondary">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* SDGs */}
      <Section alt>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: 'var(--accent)' }}>Global Goals</span>
            <h2 className="text-4xl font-extrabold mt-3 text-primary">Contributing to the SDGs</h2>
            <p className="mt-4 max-w-xl mx-auto text-secondary">Our work directly advances four UN Sustainable Development Goals.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {sdgs.map((s) => (
              <div key={s.num} className="p-6 rounded-2xl border transition" style={{ backgroundColor: 'var(--bg-card)', borderColor: `${s.accent}30` }}>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: s.accent }}>{s.num}</span>
                <h3 className="font-extrabold text-base mt-2 mb-3 text-primary">{s.title}</h3>
                <p className="text-xs leading-relaxed text-secondary">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-5 text-primary">Join the movement</h2>
          <p className="mb-10 text-secondary">Whether you have food to give or a community to feed, there&apos;s a place for you here.</p>
          <Link href="/signup" className="px-8 py-4 rounded-xl text-white font-semibold transition shadow-xl" style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 8px 32px rgba(34,197,94,0.25)' }}>
            Get Started Free →
          </Link>
        </div>
      </Section>
    </main>
  )
}
