'use client'
import Link from 'next/link'

const values = [
  { icon: '🌱', title: 'Zero Waste', desc: 'Every meal saved is a step toward a sustainable planet.' },
  { icon: '❤️', title: 'Community First', desc: 'We build bridges between those who have and those who need.' },
  { icon: '🔍', title: 'Transparency', desc: 'Every donation is tracked and verified end-to-end.' },
  { icon: '⚡', title: 'Speed', desc: 'Food rescue is time-sensitive — we move fast.' },
]

const problems = [
  { icon: '😔', stat: '194M+', label: 'People go hungry in India every day', source: 'FAO 2024' },
  { icon: '🗑️', stat: '68M tonnes', label: 'Food wasted in India annually', source: 'FAO India' },
  { icon: '📵', stat: '80%', label: 'NGOs lack efficient digital systems', source: 'Estimated' },
]

const vision = [
  { icon: '🤖', title: 'Smarter Food Rescue', desc: 'AI-powered matching to connect donors and NGOs in under 60 seconds.' },
  { icon: '🗺️', title: 'Expand to 100 Cities', desc: 'From 10 cities today to every major urban center in India by 2026.' },
  { icon: '♿', title: 'Better Accessibility', desc: 'Multi-language support and simplified UX for all literacy levels.' },
]

const sdgs = [
  { num: 'SDG 1', title: 'No Poverty', color: 'bg-red-100 text-red-700', desc: 'Reducing food insecurity directly addresses poverty.' },
  { num: 'SDG 2', title: 'Zero Hunger', color: 'bg-yellow-100 text-yellow-700', desc: 'Every rescued meal fights hunger at the grassroots.' },
  { num: 'SDG 12', title: 'Responsible Consumption', color: 'bg-orange-100 text-orange-700', desc: 'Reducing food waste aligns with sustainable consumption goals.' },
  { num: 'SDG 17', title: 'Partnerships', color: 'bg-blue-100 text-blue-700', desc: 'Connecting donors, NGOs, and communities through technology.' },
]

export default function AboutPage() {
  return (
    <main className="overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-green-700 via-green-800 to-green-900 text-white py-24 px-6 text-center relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_80%_20%,white,transparent_60%)]" />
        <span className="inline-block bg-orange-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
          Our Story
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold max-w-2xl mx-auto leading-tight">
          About RescueBite
        </h1>
        <p className="mt-5 text-green-100 text-lg max-w-xl mx-auto leading-relaxed">
          We started with a simple belief — no good food should go to waste while people go hungry.
        </p>
      </section>

      {/* ── Mission ── */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">Our Mission</span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-2 mb-5">Reduce Waste. Fight Hunger. Help Communities.</h2>
            <div className="flex flex-col gap-4 text-gray-600 leading-relaxed">
              <p>RescueBite is a smart food rescue platform that connects surplus food donors — restaurants, households, and event venues — with verified NGOs and community kitchens.</p>
              <p>We use technology to make food redistribution fast, transparent, and scalable — turning what would be waste into life-changing meals.</p>
              <p>Our platform empowers communities to take action, giving every donor a direct line to the people who need their food most.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '68M', label: 'Tonnes of food wasted in India annually', color: 'bg-green-50 text-green-700' },
              { value: '194M+', label: 'People undernourished in India', color: 'bg-orange-50 text-orange-600' },
              { value: '40%', label: 'Of food produced is lost or wasted', color: 'bg-red-50 text-red-600' },
              { value: '12K+', label: 'Meals rescued by RescueBite', color: 'bg-blue-50 text-blue-600' },
            ].map((s) => (
              <div key={s.label} className={`rounded-2xl p-6 text-center ${s.color}`}>
                <p className="text-3xl font-extrabold">{s.value}</p>
                <p className="text-xs mt-2 leading-snug opacity-80">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problem Statement ── */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-red-500 font-semibold text-sm uppercase tracking-wide">The Problem</span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-2">Why This Matters</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">The scale of food insecurity and waste in India demands urgent, tech-driven solutions.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {problems.map((p) => (
              <div key={p.label} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center hover:shadow-md transition">
                <span className="text-4xl">{p.icon}</span>
                <p className="text-3xl font-extrabold text-gray-900 mt-4">{p.stat}</p>
                <p className="text-gray-600 text-sm mt-2 leading-snug">{p.label}</p>
                <span className="inline-block mt-3 text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{p.source}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">Our Values</span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-2">What We Stand For</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((v) => (
            <div key={v.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex gap-5 items-start hover:shadow-md transition">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-2xl shrink-0">{v.icon}</div>
              <div>
                <h3 className="font-bold text-gray-900 text-base">{v.title}</h3>
                <p className="text-gray-500 text-sm mt-1 leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Vision ── */}
      <section className="bg-green-700 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-orange-300 font-semibold text-sm uppercase tracking-wide">Looking Ahead</span>
            <h2 className="text-3xl font-extrabold mt-2">Our Vision</h2>
            <p className="text-green-200 mt-3 max-w-xl mx-auto">Building the future of food rescue — smarter, wider, and more accessible.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vision.map((v) => (
              <div key={v.title} className="bg-green-800 rounded-2xl p-6 border border-green-600 hover:bg-green-750 transition">
                <span className="text-3xl">{v.icon}</span>
                <h3 className="font-bold text-white mt-4">{v.title}</h3>
                <p className="text-green-300 text-sm mt-2 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SDG Contribution ── */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">Global Goals</span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-2">Why RescueBite Matters</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">Our work directly contributes to the UN Sustainable Development Goals.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {sdgs.map((s) => (
            <div key={s.num} className={`rounded-2xl p-6 ${s.color} border border-opacity-20`}>
              <span className="text-xs font-bold uppercase tracking-wide opacity-70">{s.num}</span>
              <h3 className="font-extrabold text-lg mt-1">{s.title}</h3>
              <p className="text-sm mt-2 opacity-80 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-extrabold mb-4">Join the movement</h2>
        <p className="text-orange-100 mb-8 max-w-md mx-auto">Whether you have food to give or a community to feed, there&apos;s a place for you here.</p>
        <Link href="/signup"
          className="bg-white text-orange-600 hover:bg-orange-50 font-semibold px-8 py-3 rounded-xl transition shadow">
          Get Started Free
        </Link>
      </section>

      {/* ── Footer ── */}
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
