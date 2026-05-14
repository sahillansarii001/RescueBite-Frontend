'use client'
import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const ImpactCharts = dynamic(() => import('../../components/ImpactCharts'), {
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center text-gray-500 text-sm">Loading charts...</div>,
})

const heroStats = [
  { value: '194M+', label: 'Hungry in India', sub: 'FAO 2024', color: 'text-red-400' },
  { value: '40%', label: 'Food Wasted', sub: 'FAO India', color: 'text-amber-400' },
  { value: '11.28%', label: 'MPI Poverty Rate', sub: 'NITI Aayog', color: 'text-purple-400' },
  { value: '12,000+', label: 'Meals Rescued', sub: 'RescueBite', color: 'text-teal-400' },
]

const sources = [
  { label: 'FAO', full: 'Food & Agriculture Organization', url: 'https://www.fao.org', color: 'border-blue-500/20 hover:border-blue-500/40', text: 'text-blue-400', icon: '🌾' },
  { label: 'MPI', full: 'UNDP Multidimensional Poverty Index', url: 'https://hdr.undp.org', color: 'border-purple-500/20 hover:border-purple-500/40', text: 'text-purple-400', icon: '📉' },
  { label: 'NFHS-6', full: 'National Family Health Survey 6', url: 'https://mohfw.gov.in', color: 'border-orange-500/20 hover:border-orange-500/40', text: 'text-orange-400', icon: '🏥' },
  { label: 'SDG 1', full: 'UN SDG 1 — No Poverty', url: 'https://india.un.org/en/sdgs/1/progress', color: 'border-red-500/20 hover:border-red-500/40', text: 'text-red-400', icon: '🎯' },
  { label: 'SDG 2', full: 'UN SDG 2 — Zero Hunger', url: 'https://www.fao.org/sustainable-development-goals/goals/goal-2/en/', color: 'border-yellow-500/20 hover:border-yellow-500/40', text: 'text-yellow-400', icon: '🌽' },
  { label: 'NITI Aayog', full: 'SDG India Index & MPI Reports', url: 'https://niti.gov.in', color: 'border-teal-500/20 hover:border-teal-500/40', text: 'text-teal-400', icon: '🇮🇳' },
]

const dataPoints = [
  {
    source: 'FAO', icon: '🌾', value: '~194M',
    label: 'People undernourished in India',
    detail: 'India accounts for the largest share of the world\'s undernourished population per FAO\'s State of Food Security report.',
    link: 'https://www.fao.org', linkLabel: 'FAO SDG Data Portal',
  },
  {
    source: 'FAO', icon: '🗑️', value: '~40%',
    label: 'Food produced in India is lost or wasted',
    detail: 'One-third of food produced globally is wasted while around 800 million people suffer from hunger.',
    link: 'https://www.fao.org', linkLabel: 'FAO India Country Profile',
  },
  {
    source: 'FAO', icon: '📈', value: '2.3B',
    label: 'People moderately or severely food-insecure globally',
    detail: 'About 28% of the global population faced moderate or severe food insecurity in 2024, up from 21.4% in 2015.',
    link: 'https://www.fao.org', linkLabel: 'FAO Report',
  },
  {
    source: 'MPI', icon: '📉', value: '415M',
    label: 'Indians exited multidimensional poverty (2005-2021)',
    detail: 'India saw a remarkable reduction in poverty with 415 million people exiting MPI poverty in 15 years.',
    link: 'https://hdr.undp.org', linkLabel: 'UNDP MPI Report',
  },
  {
    source: 'MPI', icon: '🏘️', value: '11.28%',
    label: 'India MPI headcount ratio (2019-21)',
    detail: 'India\'s National MPI fell from 24.85% in 2015-16 to 11.28% in 2019-21, reflecting significant progress.',
    link: 'https://niti.gov.in', linkLabel: 'NITI Aayog MPI',
  },
  {
    source: 'NFHS-6', icon: '👶', value: '35%',
    label: 'Children under 5 are stunted',
    detail: 'Around 35% of children were stunted and 32% underweight per NFHS-6 preliminary findings.',
    link: 'https://mohfw.gov.in', linkLabel: 'NFHS-6 Overview',
  },
  {
    source: 'NFHS-6', icon: '🩸', value: '57%',
    label: 'Women affected by anaemia',
    detail: 'Nearly 57% of women are affected by anaemia, pointing to widespread micronutrient deficiencies.',
    link: 'https://mohfw.gov.in', linkLabel: 'NFHS-6 Overview',
  },
  {
    source: 'SDG 1', icon: '🎯', value: '72',
    label: 'India SDG 1 (No Poverty) score 2023-24',
    detail: 'India\'s SDG 1 score rose from 60 in 2020-21 to 72 in 2023-24, one of the largest improvements.',
    link: 'https://niti.gov.in', linkLabel: 'SDG India Index',
  },
  {
    source: 'SDG 2', icon: '📊', value: '295M+',
    label: 'People in acute hunger globally (2024)',
    detail: 'More than 295 million people across 53 countries experienced acute hunger in 2024.',
    link: 'https://www.fao.org', linkLabel: 'FAO Newsroom 2025',
  },
  {
    source: 'NITI Aayog', icon: '📍', value: 'UP, Bihar, MP',
    label: 'States with most people lifted out of MPI poverty',
    detail: 'UP (5.94 crore), Bihar (3.77 crore), and MP (2.30 crore) led state-level poverty reduction.',
    link: 'https://niti.gov.in', linkLabel: 'NITI Aayog MPI State Data',
  },
]

const sourceColorMap = {
  'FAO': 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  'MPI': 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
  'NFHS-6': 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
  'SDG 1': 'bg-red-500/10 text-red-400 border border-red-500/20',
  'SDG 2': 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
  'NITI Aayog': 'bg-teal-500/10 text-teal-400 border border-teal-500/20',
}

const allSources = ['All', 'FAO', 'MPI', 'NFHS-6', 'SDG 1', 'SDG 2', 'NITI Aayog']

export default function ImpactPage() {
  const [activeSource, setActiveSource] = useState('All')
  const filtered = activeSource === 'All' ? dataPoints : dataPoints.filter(d => d.source === activeSource)

  return (
    <main className="overflow-x-hidden page-bg">

      {/* Hero */}
      <section className="relative py-32 px-6 text-center overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--bg-base) 0%, #0d2818 50%, var(--bg-base) 100%)' }}>
        <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 border text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-widest uppercase" style={{ backgroundColor: 'var(--accent-soft)', borderColor: 'var(--accent)', color: 'var(--accent)' }}>
            Research-Backed Data
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-primary">
            The Data Behind <span className="text-gradient">The Crisis</span>
          </h1>
          <p className="mt-6 text-lg max-w-xl mx-auto leading-relaxed text-secondary">
            Real numbers from FAO, UNDP MPI, NFHS-6, SDG India Index, and NITI Aayog — showing exactly why food rescue matters.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-16 px-6 border-y" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {heroStats.map((s) => (
            <div key={s.label}>
              <p className={`text-3xl md:text-4xl font-extrabold ${s.color}`}>{s.value}</p>
              <p className="text-sm mt-1 text-secondary">{s.label}</p>
              <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full text-muted" style={{ backgroundColor: 'var(--bg-hover)' }}>{s.sub}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Charts */}
      <section className="py-20 px-6" style={{ backgroundColor: 'var(--bg-surface)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-teal-400 font-semibold text-sm uppercase tracking-widest">Visualized Data</span>
            <h2 className="text-4xl font-extrabold text-white mt-3">Charts & Trends</h2>
          </div>
          <ImpactCharts />
        </div>
      </section>

      {/* Sources */}
      <section className="py-20 px-6 page-bg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-teal-400 font-semibold text-sm uppercase tracking-widest">Sources</span>
            <h2 className="text-4xl font-extrabold text-white mt-3">Research Sources</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {sources.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                className={`rounded-2xl p-5 text-center border transition ${s.color}`} style={{ backgroundColor: 'var(--bg-card)' }}>
                <span className="text-2xl block">{s.icon}</span>
                <p className={`font-bold text-sm mt-2 ${s.text}`}>{s.label}</p>
                <p className="text-xs mt-1 text-gray-500 leading-snug">{s.full}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Data Points */}
      <section className="py-20 px-6" style={{ backgroundColor: 'var(--bg-surface)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-teal-400 font-semibold text-sm uppercase tracking-widest">Statistics</span>
            <h2 className="text-4xl font-extrabold text-white mt-3">Key Data Points</h2>
          </div>
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {allSources.map((s) => (
              <button key={s} onClick={() => setActiveSource(s)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                  activeSource === s
                    ? 'text-white'
                    : 'border text-secondary'
                }`}
                style={activeSource === s ? { backgroundColor: 'var(--accent)' } : { borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}>
                {s}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((d, i) => (
              <div key={i} className="p-6 rounded-2xl border flex flex-col gap-3 transition hover:-translate-y-0.5" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{d.icon}</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${sourceColorMap[d.source]}`}>{d.source}</span>
                </div>
                <p className="text-3xl font-extrabold text-primary">{d.value}</p>
                <p className="font-semibold text-sm leading-snug text-secondary">{d.label}</p>
                <p className="text-xs leading-relaxed flex-1 text-muted">{d.detail}</p>
                <a href={d.link} target="_blank" rel="noopener noreferrer"
                  className="text-teal-400 text-xs font-medium hover:text-teal-300 transition mt-auto">
                  Source: {d.linkLabel} ↗
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-20 px-6 page-bg">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-teal-400 font-semibold text-sm uppercase tracking-widest">Our Role</span>
            <h2 className="text-4xl font-extrabold text-white mt-3">Why RescueBite Matters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: '🌍', title: 'Social Impact', desc: 'Every rescued meal directly reduces hunger and supports vulnerable communities across India.' },
              { icon: '♻️', title: 'Sustainability', desc: 'Reducing food waste lowers carbon emissions and contributes to a more sustainable food system.' },
              { icon: '🎯', title: 'SDG Contribution', desc: 'Directly advancing SDG 1 (No Poverty), SDG 2 (Zero Hunger), and SDG 12 (Responsible Consumption).' },
            ].map((c) => (
              <div key={c.title} className="p-6 rounded-2xl border text-center transition hover:-translate-y-1" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4" style={{ backgroundColor: 'var(--accent-soft)' }}>{c.icon}</div>
                <h3 className="font-bold mb-2 text-primary">{c.title}</h3>
                <p className="text-sm leading-relaxed text-secondary">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reference Links */}
      <section className="py-12 px-6 border-t" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-gray-400 text-sm font-semibold mb-4">Official Reference Links</p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'FAO State of Food Security 2024', url: 'https://www.fao.org/publications/home/fao-flagship-publications/the-state-of-food-security-and-nutrition-in-the-world/en' },
              { label: 'UNDP MPI 2023', url: 'https://hdr.undp.org/content/2023-global-multidimensional-poverty-index-mpi' },
              { label: 'NFHS-6 Overview', url: 'https://mohfw.gov.in' },
              { label: 'SDG India Index 2023-24', url: 'https://niti.gov.in' },
              { label: 'UN SDG 1 India Progress', url: 'https://india.un.org/en/sdgs/1/progress' },
              { label: 'UN SDG 2 Zero Hunger', url: 'https://www.fao.org/sustainable-development-goals/goals/goal-2/en/' },
            ].map((r) => (
              <a key={r.label} href={r.url} target="_blank" rel="noopener noreferrer"
                className="border text-xs font-medium px-4 py-2 rounded-full transition" style={{ borderColor: 'var(--border)', color: 'var(--accent)', backgroundColor: 'var(--bg-card)' }}>
                {r.label} ↗
              </a>
            ))}
          </div>
          <p className="text-gray-600 text-xs mt-4">Data reflects the most recent available figures as of 2024-2026.</p>
        </div>
      </section>

    </main>
  )
}
