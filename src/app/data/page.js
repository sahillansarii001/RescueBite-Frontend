'use client'
import { useState } from 'react'

// ── Data sourced from FAO, UNDP MPI, NFHS-5/6, SDG India Index (NITI Aayog) ──

const sources = [
  { id: 'fao',  label: 'FAO',  color: 'bg-blue-100 text-blue-800',  dot: 'bg-blue-500' },
  { id: 'mpi',  label: 'MPI',  color: 'bg-purple-100 text-purple-800', dot: 'bg-purple-500' },
  { id: 'nfhs', label: 'NFHS-6', color: 'bg-orange-100 text-orange-800', dot: 'bg-orange-500' },
  { id: 'sdg1', label: 'SDG 1', color: 'bg-red-100 text-red-800',   dot: 'bg-red-500' },
  { id: 'sdg2', label: 'SDG 2', color: 'bg-yellow-100 text-yellow-800', dot: 'bg-yellow-500' },
  { id: 'niti', label: 'NITI Aayog', color: 'bg-green-100 text-green-800', dot: 'bg-green-500' },
]

const stats = [
  {
    source: 'fao',
    icon: '🌾',
    value: '~194M',
    label: 'People undernourished in India',
    detail: 'India accounts for the largest share of the world\'s undernourished population, per FAO\'s State of Food Security report.',
    link: 'https://www.fao.org/sustainable-development-goals-data-portal/data/indicators/2.1.1-prevalence-of-undernourishment/2/',
    linkLabel: 'FAO SDG Data Portal',
  },
  {
    source: 'fao',
    icon: '🗑️',
    value: '~40%',
    label: 'Food produced in India is lost or wasted',
    detail: 'One-third of food produced globally is wasted while ~800 million people suffer from hunger, according to FAO\'s food loss and waste platform.',
    link: 'https://www.fao.org/platform-food-loss-waste/in-action/countries/country-profile/IND/en/',
    linkLabel: 'FAO India Country Profile',
  },
  {
    source: 'fao',
    icon: '📈',
    value: '2.3B',
    label: 'People moderately or severely food-insecure globally (2024)',
    detail: 'About 28% of the global population faced moderate or severe food insecurity in 2024, up from 21.4% in 2015.',
    link: 'https://www.fao.org/sustainable-development-goals-data-portal/data/indicators/212-prevalence-of-moderate-or-severe-food-insecurity-in-the-population-based-on-the-food-insecurity-experience-scale/en',
    linkLabel: 'FAO Food Insecurity Data',
  },
  {
    source: 'mpi',
    icon: '📉',
    value: '415M',
    label: 'Indians exited multidimensional poverty (2005–2021)',
    detail: 'India saw a remarkable reduction in poverty, with 415 million people exiting multidimensional poverty within 15 years, per UNDP MPI 2023.',
    link: 'https://social.desa.un.org/sdn/25-countries-halved-multidimensional-poverty-within-15-years-but-11-billion-remain-poor',
    linkLabel: 'UNDP MPI Report',
  },
  {
    source: 'mpi',
    icon: '🏘️',
    value: '11.28%',
    label: 'India\'s MPI headcount ratio (2019–21)',
    detail: 'India\'s National MPI fell from 24.85% (2015–16) to 11.28% (2019–21), reflecting significant progress across health, education, and living standards.',
    link: 'https://niti.gov.in/competitive-federalism/overview-sustainable-development-goals',
    linkLabel: 'NITI Aayog MPI',
  },
  {
    source: 'nfhs',
    icon: '👶',
    value: '35%',
    label: 'Children under 5 are stunted (NFHS-6)',
    detail: 'Around 35% of children were stunted and 32% underweight, reflecting continued malnutrition concerns per NFHS-6 preliminary findings.',
    link: 'https://tmv.in/article/national-family-health-survey-6-to-be-released-soon-covers-679-lakh-households-nationwide-date=2026-04-30',
    linkLabel: 'NFHS-6 Overview',
  },
  {
    source: 'nfhs',
    icon: '🩸',
    value: '57%',
    label: 'Women affected by anaemia (NFHS-6)',
    detail: 'Nearly 57% of women and a large share of children are affected by anaemia, pointing to widespread iron and micronutrient deficiencies.',
    link: 'https://tmv.in/article/national-family-health-survey-6-to-be-released-soon-covers-679-lakh-households-nationwide-date=2026-04-30',
    linkLabel: 'NFHS-6 Overview',
  },
  {
    source: 'nfhs',
    icon: '⚖️',
    value: '32%',
    label: 'Children under 5 are underweight (NFHS-6)',
    detail: 'Underweight prevalence among children under 5 remains at 32%, indicating persistent gaps in child nutrition across India.',
    link: 'https://tmv.in/article/national-family-health-survey-6-to-be-released-soon-covers-679-lakh-households-nationwide-date=2026-04-30',
    linkLabel: 'NFHS-6 Overview',
  },
  {
    source: 'sdg1',
    icon: '🎯',
    value: '72',
    label: 'India\'s SDG 1 (No Poverty) score in 2023–24',
    detail: 'India\'s SDG 1 score rose from 60 in 2020–21 to 72 in 2023–24, one of the largest improvements across all SDG goals.',
    link: 'https://www.india-briefing.com/news/india-sustainable-development-goals-sdg-index-2023-24-33668.html/',
    linkLabel: 'India Briefing — SDG Index',
  },
  {
    source: 'sdg1',
    icon: '🏆',
    value: 'Tamil Nadu',
    label: 'Top-performing state on SDG 1 (No Poverty)',
    detail: 'Tamil Nadu and Telangana are front-runners on SDG 1 among Indian states, per the SDG India Index 2023–24.',
    link: 'https://www.statista.com/statistics/1243355/sdg-index-india-no-poverty-goal-by-state/',
    linkLabel: 'Statista — SDG 1 by State',
  },
  {
    source: 'sdg2',
    icon: '🌽',
    value: 'Kerala',
    label: 'Top-performing state on SDG 2 (Zero Hunger)',
    detail: 'Kerala leads Indian states on SDG 2 (Zero Hunger), while Puducherry tops among union territories, per SDG India Index 2023–24.',
    link: 'https://www.statista.com/statistics/1243464/sdg-index-india-hunger-goal-by-state/',
    linkLabel: 'Statista — SDG 2 by State',
  },
  {
    source: 'sdg2',
    icon: '📊',
    value: '295M+',
    label: 'People in acute hunger globally (2024)',
    detail: 'More than 295 million people across 53 countries experienced acute hunger in 2024, an increase of 13.7 million from 2023, per FAO.',
    link: 'https://www.fao.org/newsroom/detail/acute-food-insecurity-and-malnutrition-rise-for-sixth-consecutive-year-in-world-s-most-fragile-regions---new-report/',
    linkLabel: 'FAO Newsroom 2025',
  },
  {
    source: 'niti',
    icon: '🇮🇳',
    value: '67',
    label: 'India\'s Climate Action (SDG 13) score — biggest jump',
    detail: 'Climate Action saw the largest score increase across all SDGs, rising from 54 in 2020–21 to 67 in 2023–24, per NITI Aayog\'s SDG India Index.',
    link: 'https://niti.gov.in/competitive-federalism/overview-sustainable-development-goals',
    linkLabel: 'NITI Aayog SDG Overview',
  },
  {
    source: 'niti',
    icon: '📍',
    value: 'UP, Bihar, MP',
    label: 'States with most people lifted out of MPI poverty',
    detail: 'Uttar Pradesh (5.94 crore), Bihar (3.77 crore), and Madhya Pradesh (2.30 crore) led state-level poverty reduction, per NITI Aayog MPI report.',
    link: 'https://affairscloud.com/niti-aayog-report-over-24-8-cr-people-moved-out-of-multidimensional-poverty-in-9-years/',
    linkLabel: 'NITI Aayog MPI State Data',
  },
]

const sourceMap = Object.fromEntries(sources.map((s) => [s.id, s]))

export default function DataPage() {
  const [active, setActive] = useState('all')

  const filtered = active === 'all' ? stats : stats.filter((s) => s.source === active)

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold max-w-2xl mx-auto leading-tight">
          The Data Behind the Crisis
        </h1>
        <p className="mt-4 text-green-100 text-lg max-w-xl mx-auto">
          Real numbers from trusted global and national sources — showing why food rescue matters.
        </p>
      </section>

      {/* Source filter */}
      <section className="sticky top-[57px] z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setActive('all')}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition ${
              active === 'all' ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All Sources
          </button>
          {sources.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition ${
                active === s.id ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </section>

      {/* Stats grid */}
      <section className="py-12 px-6 max-w-5xl mx-auto">
        <p className="text-gray-400 text-sm mb-6">{filtered.length} data point{filtered.length !== 1 ? 's' : ''}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((stat, i) => {
            const src = sourceMap[stat.source]
            return (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-3 hover:shadow-md transition">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{stat.icon}</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${src.color}`}>
                    {src.label}
                  </span>
                </div>
                <p className="text-3xl font-extrabold text-gray-900">{stat.value}</p>
                <p className="font-semibold text-gray-800 text-sm leading-snug">{stat.label}</p>
                <p className="text-gray-500 text-xs leading-relaxed flex-1">{stat.detail}</p>
                <a
                  href={stat.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 text-xs font-medium hover:underline mt-auto"
                >
                  Source: {stat.linkLabel} ↗
                </a>
              </div>
            )
          })}
        </div>
      </section>

      {/* Sources legend */}
      <section className="bg-gray-50 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Data Sources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: 'FAO', full: 'Food and Agriculture Organization of the United Nations', url: 'https://www.fao.org' },
              { label: 'MPI', full: 'UNDP Global Multidimensional Poverty Index', url: 'https://hdr.undp.org/content/2023-global-multidimensional-poverty-index-mpi' },
              { label: 'NFHS-6', full: 'National Family Health Survey 6 (India)', url: 'https://mohfw.gov.in' },
              { label: 'SDG 1', full: 'UN Sustainable Development Goal 1 — No Poverty', url: 'https://india.un.org/en/sdgs/1/progress' },
              { label: 'SDG 2', full: 'UN Sustainable Development Goal 2 — Zero Hunger', url: 'https://www.fao.org/sustainable-development-goals/goals/goal-2/en/' },
              { label: 'NITI Aayog', full: 'SDG India Index & MPI Reports by NITI Aayog', url: 'https://niti.gov.in' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-green-300 transition"
              >
                <p className="font-bold text-green-700 text-sm">{s.label}</p>
                <p className="text-gray-500 text-xs mt-1">{s.full}</p>
              </a>
            ))}
          </div>
          <p className="text-gray-400 text-xs mt-6">
            Data is sourced from publicly available reports. Statistics reflect the most recent available figures as of 2024–2026.
            Always refer to the original source for the latest updates.
          </p>
        </div>
      </section>

      <footer className="bg-green-900 text-green-200 text-center py-6 text-sm">
        <p>🍃 RescueBite © 2024 — Rescue food. Feed hope. Fight hunger.</p>
      </footer>
    </main>
  )
}
