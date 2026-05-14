'use client'
import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const ImpactCharts = dynamic(() => import('../../components/ImpactCharts'), {
  ssr: false,
  loading: () => (
    <div className="h-64 flex items-center justify-center text-gray-400 text-sm">Loading charts...</div>
  ),
})

const heroStats = [
  { icon: '😔', value: '194M+', label: 'Hungry Population in India', color: 'text-red-600', bg: 'bg-red-50' },
  { icon: '🗑️', value: '40%', label: 'Food Produced is Wasted', color: 'text-orange-600', bg: 'bg-orange-50' },
  { icon: '📉', value: '11.28%', label: 'MPI Poverty Rate (2019–21)', color: 'text-purple-600', bg: 'bg-purple-50' },
  { icon: '🍱', value: '12,000+', label: 'Meals That Can Be Saved', color: 'text-green-600', bg: 'bg-green-50' },
]

const sources = [
  { label: 'FAO', full: 'Food & Agriculture Organization', url: 'https://www.fao.org', color: 'bg-blue-100 text-blue-800', icon: '🌾' },
  { label: 'MPI', full: 'UNDP Multidimensional Poverty Index', url: 'https://hdr.undp.org', color: 'bg-purple-100 text-purple-800', icon: '📉' },
  { label: 'NFHS-6', full: 'National Family Health Survey 6', url: 'https://mohfw.gov.in', color: 'bg-orange-100 text-orange-800', icon: '🏥' },
  { label: 'SDG 1', full: 'UN SDG 1 — No Poverty', url: 'https://india.un.org/en/sdgs/1/progress', color: 'bg-red-100 text-red-800', icon: '🎯' },
  { label: 'SDG 2', full: 'UN SDG 2 — Zero Hunger', url: 'https://www.fao.org/sustainable-development-goals/goals/goal-2/en/', color: 'bg-yellow-100 text-yellow-800', icon: '🌽' },
  { label: 'NITI Aayog', full: 'SDG India Index & MPI Reports', url: 'https://niti.gov.in', color: 'bg-green-100 text-green-800', icon: '🇮🇳' },
]

const barData = [
  { state: 'UP', mpi: 37.8 },
  { state: 'Bihar', mpi: 51.9 },
  { state: 'MP', mpi: 36.6 },
  { state: 'Rajasthan', mpi: 29.0 },
  { state: 'Jharkhand', mpi: 42.2 },
  { state: 'Kerala', mpi: 0.7 },
  { state: 'Goa', mpi: 1.7 },
  { state: 'Punjab', mpi: 5.6 },
]

const pieData = [
  { name: 'Cooked Food', value: 45 },
  { name: 'Raw Produce', value: 30 },
  { name: 'Packaged Food', value: 25 },
]
const PIE_COLORS = ['#16a34a', '#f97316', '#3b82f6']

const trendData = [
  { month: 'Jan', donations: 28 },
  { month: 'Feb', donations: 35 },
  { month: 'Mar', donations: 42 },
  { month: 'Apr', donations: 38 },
  { month: 'May', donations: 55 },
  { month: 'Jun', donations: 67 },
  { month: 'Jul', donations: 72 },
  { month: 'Aug', donations: 80 },
]

const dataPoints = [
  { source: 'FAO', icon: '🌾', value: '~194M', label: 'People undernourished in India', detail: 'India accounts for the largest share of the world\'s undernourished population.', link: 'https://www.fao.org/sustainable-development-goals-data-portal/data/indicators/2.1.1-prevalence-of-undernourishment/2/', linkLabel: 'FAO SDG Data Portal' },
  { source: 'FAO', icon: '🗑️', value: '~40%', label: 'Food produced in India is lost or wasted', detail: 'One-third of food produced globally is wasted while ~800 million people suffer from hunger.', link: 'https://www.fao.org/platform-food-loss-waste/in-action/countries/country-profile/IND/en/', linkLabel: 'FAO India Country Profile' },
  { source: 'MPI', icon: '📉', value: '415M', label: 'Indians exited multidimensional poverty (2005–2021)', detail: 'India saw a remarkable reduction in poverty with 415 million people exiting MPI poverty in 15 years.', link: 'https://social.desa.un.org/sdn/25-countries-halved-multidimensional-poverty-within-15-years-but-11-billion-remain-poor', linkLabel: 'UNDP MPI Report' },
  { source: 'MPI', icon: '🏘️', value: '11.28%', label: 'India\'s MPI headcount ratio (2019–21)', detail: 'India\'s National MPI fell from 24.85% (2015–16) to 11.28% (2019–21).', link: 'https://niti.gov.in', linkLabel: 'NITI Aayog MPI' },
  { source: 'NFHS-6', icon: '👶', value: '35%', label: 'Children under 5 are stunted', detail: 'Around 35% of children were stunted and 32% underweight per NFHS-6 preliminary findings.', link: 'https://mohfw.gov.in', linkLabel: 'NFHS-6 Overview' },
  { source: 'NFHS-6', icon: '🩸', value: '57%', label: 'Women affected by anaemia', detail: 'Nearly 57% of women are affected by anaemia, pointing to widespread micronutrient deficiencies.', link: 'https://mohfw.gov.in', linkLabel: 'NFHS-6 Overview' },
  { source: 'SDG 1', icon: '🎯', value: '72', label: 'India\'s SDG 1 (No Poverty) score 2023–24', detail: 'India\'s SDG 1 score rose from 60 in 2020–21 to 72 in 2023–24.', link: 'https://www.india-briefing.com/news/india-sustainable-development-goals-sdg-index-2023-24-33668.html/', linkLabel: 'India Briefing — SDG Index' },
  { source: 'SDG 2', icon: '📊', value: '295M+', label: 'People in acute hunger globally (2024)', detail: 'More than 295 million people across 53 countries experienced acute hunger in 2024.', link: 'https://www.fao.org/newsroom/detail/acute-food-insecurity-and-malnutrition-rise-for-sixth-consecutive-year-in-world-s-most-fragile-regions---new-report/', linkLabel: 'FAO Newsroom 2025' },
  { source: 'NITI Aayog', icon: '📍', value: 'UP, Bihar, MP', label: 'States with most people lifted out of MPI poverty', detail: 'Uttar Pradesh (5.94 crore), Bihar (3.77 crore), and Madhya Pradesh (2.30 crore) led state-level poverty reduction.', link: 'https://niti.gov.in', linkLabel: 'NITI Aayog MPI State Data' },
]

const sourceColorMap = {
  'FAO': 'bg-blue-100 text-blue-800',
  'MPI': 'bg-purple-100 text-purple-800',
  'NFHS-6': 'bg-orange-100 text-orange-800',
  'SDG 1': 'bg-red-100 text-red-800',
  'SDG 2': 'bg-yellow-100 text-yellow-800',
  'NITI Aayog': 'bg-green-100 text-green-800',
}

export default function ImpactPage() {
  const [activeSource, setActiveSource] = useState('All')
  const allSources = ['All', 'FAO', 'MPI', 'NFHS-6', 'SDG 1', 'SDG 2', 'NITI Aayog']
  const filtered = activeSource === 'All' ? dataPoints : dataPoints.filter(d => d.source === activeSource)

  return (
    <main className="overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-green-700 via-green-800 to-green-900 text-white py-24 px-6 text-center relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_30%,white,transparent_60%)]" />
        <span className="inline-block bg-orange-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
          Research-Backed Data
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold max-w-2xl mx-auto leading-tight">
          The Data Behind The Crisis
        </h1>
        <p className="mt-5 text-green-100 text-lg max-w-xl mx-auto leading-relaxed">
          Real numbers from FAO, UNDP MPI, NFHS-6, SDG India Index, and NITI Aayog — showing exactly why food rescue matters.
        </p>
      </section>

      {/* ── Hero Stats ── */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {heroStats.map((s) => (
            <div key={s.label} className={`rounded-2xl p-6 text-center ${s.bg} border border-gray-100 shadow-sm hover:shadow-md transition`}>
              <span className="text-3xl">{s.icon}</span>
              <p className={`text-3xl font-extrabold mt-3 ${s.color}`}>{s.value}</p>
              <p className="text-gray-600 text-xs mt-2 leading-snug">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Charts ── */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">Visualized Data</span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-2">Charts & Trends</h2>
          </div>
          <ImpactCharts />
        </div>
      </section>

      {/* ── Research Sources ── */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">Sources</span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-2">Research Sources</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {sources.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
              className={`rounded-2xl p-4 text-center ${s.color} hover:opacity-80 transition border border-opacity-20`}>
              <span className="text-2xl block">{s.icon}</span>
              <p className="font-bold text-sm mt-2">{s.label}</p>
              <p className="text-xs mt-1 opacity-70 leading-snug">{s.full}</p>
            </a>
          ))}
        </div>
      </section>

      {/* ── Data Points ── */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">Key Statistics</h2>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {allSources.map((s) => (
              <button key={s} onClick={() => setActiveSource(s)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                  activeSource === s ? 'bg-green-700 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-green-400'
                }`}>
                {s}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((d, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-3 hover:shadow-md transition">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{d.icon}</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${sourceColorMap[d.source]}`}>{d.source}</span>
                </div>
                <p className="text-3xl font-extrabold text-gray-900">{d.value}</p>
                <p className="font-semibold text-gray-800 text-sm leading-snug">{d.label}</p>
                <p className="text-gray-500 text-xs leading-relaxed flex-1">{d.detail}</p>
                <a href={d.link} target="_blank" rel="noopener noreferrer"
                  className="text-green-600 text-xs font-medium hover:underline mt-auto">
                  Source: {d.linkLabel} ↗
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why RescueBite Matters ── */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">Our Role</span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-2">Why RescueBite Matters</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '🌍', title: 'Social Impact', desc: 'Every rescued meal directly reduces hunger and supports vulnerable communities across India.' },
            { icon: '♻️', title: 'Sustainability', desc: 'Reducing food waste lowers carbon emissions and contributes to a more sustainable food system.' },
            { icon: '🎯', title: 'SDG Contribution', desc: 'Our platform directly advances SDG 1 (No Poverty), SDG 2 (Zero Hunger), and SDG 12 (Responsible Consumption).' },
          ].map((c) => (
            <div key={c.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center hover:shadow-md transition">
              <span className="text-4xl">{c.icon}</span>
              <h3 className="font-bold text-gray-900 mt-4">{c.title}</h3>
              <p className="text-gray-500 text-sm mt-2 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Reference Links ── */}
      <section className="bg-gray-50 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Official Reference Links</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'FAO State of Food Security 2024', url: 'https://www.fao.org/publications/home/fao-flagship-publications/the-state-of-food-security-and-nutrition-in-the-world/en' },
              { label: 'UNDP MPI 2023', url: 'https://hdr.undp.org/content/2023-global-multidimensional-poverty-index-mpi' },
              { label: 'NFHS-6 Overview', url: 'https://mohfw.gov.in' },
              { label: 'SDG India Index 2023–24', url: 'https://niti.gov.in' },
              { label: 'UN SDG 1 — India Progress', url: 'https://india.un.org/en/sdgs/1/progress' },
              { label: 'UN SDG 2 — Zero Hunger', url: 'https://www.fao.org/sustainable-development-goals/goals/goal-2/en/' },
            ].map((r) => (
              <a key={r.label} href={r.url} target="_blank" rel="noopener noreferrer"
                className="bg-white border border-gray-200 hover:border-green-400 text-green-700 text-xs font-medium px-4 py-2 rounded-full transition hover:shadow-sm">
                {r.label} ↗
              </a>
            ))}
          </div>
          <p className="text-gray-400 text-xs mt-5">Data reflects the most recent available figures as of 2024–2026. Always refer to original sources for the latest updates.</p>
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
