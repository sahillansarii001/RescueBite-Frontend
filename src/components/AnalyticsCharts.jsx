'use client'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  LineChart, Line, CartesianGrid,
} from 'recharts'
import { Utensils, Package, Handshake, Users, Star } from 'lucide-react'

const PIE_COLORS = ['#43A047', '#FB8C00', '#66BB6A']

const statCards = (a) => [
  { icon: <Utensils className="w-5 h-5 text-green-700" />, label: 'Meals Saved', value: a.totalMealsSaved ?? 0 },
  { icon: <Package className="w-5 h-5 text-green-700" />, label: 'Total Donations', value: a.totalDonations ?? 0 },
  { icon: <Handshake className="w-5 h-5 text-green-700" />, label: 'Active NGOs', value: a.activeNGOs ?? 0 },
  { icon: <Users className="w-5 h-5 text-green-700" />, label: 'Total Donors', value: a.totalDonors ?? 0 },
]

export function AnalyticsChartsSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white/80 border border-green-200/50 rounded-3xl p-5 h-[120px]" />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white/80 border border-green-200/50 rounded-3xl p-5 h-[280px]" />
        ))}
      </div>
      <div className="bg-white/80 border border-green-200/50 rounded-3xl p-5 h-[250px]" />
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white/90 backdrop-blur-md border border-green-200/50 shadow-lg rounded-xl p-4">
      <p className="text-green-900 font-bold text-sm mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-gray-600 text-sm font-medium flex items-center justify-between gap-4">
          <span style={{ color: p.color }}>{p.name}:</span>
          <span className="font-bold text-gray-800">{p.value}</span>
        </p>
      ))}
    </div>
  )
}

export default function AnalyticsCharts({ analytics }) {
  if (!analytics) return <p className="text-gray-400 text-center py-10">No analytics data</p>

  const pieData = (analytics.foodTypeDistribution || []).map((d) => ({ name: d._id, value: d.count }))
  const dailyData = (analytics.dailyTrends || []).map((d) => ({ date: d._id, count: d.count }))
  const monthlyData = (analytics.monthlyTrends || []).map((d) => ({ month: d._id, count: d.count }))

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards(analytics).map((s) => (
          <div key={s.label} className="bg-white/80 backdrop-blur-sm border border-green-200/50 rounded-3xl shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-0.5 transition-all duration-300 p-6 flex flex-col items-center justify-center gap-1.5">
            <div className="bg-green-100/50 rounded-2xl p-3 flex items-center justify-center">{s.icon}</div>
            <p className="text-3xl font-black text-green-900 tracking-tight mt-1">{s.value}</p>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest text-center">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/80 backdrop-blur-sm border border-green-200/50 rounded-3xl shadow-sm p-6">
          <h3 className="text-green-900 font-bold text-base mb-6">Daily Donations (30 days)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={dailyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F8E9" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#78909C' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#78909C' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F1F8E9' }} />
              <Bar dataKey="count" fill="#43A047" radius={[6, 6, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border border-green-200/50 rounded-3xl shadow-sm p-6">
          <h3 className="text-green-900 font-bold text-base mb-6">Food Type Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} stroke="none">
                {pieData.map((_, i) => (<Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />))}
              </Pie>
              <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border border-green-200/50 rounded-3xl shadow-sm p-6">
          <h3 className="text-green-900 font-bold text-base mb-6">Monthly Trends (12 months)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F8E9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#78909C' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#78909C' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="count" stroke="#FB8C00" strokeWidth={3} dot={{ fill: '#FB8C00', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm border border-green-200/50 rounded-3xl shadow-sm p-6 overflow-hidden">
        <h3 className="text-green-900 font-bold text-base mb-6">Top Donors</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-green-700/10 text-green-900 text-sm">
              <tr>
                {['Name', 'Donor Type', 'Points', 'Donations'].map((h) => (
                  <th key={h} className="px-5 py-4 text-left font-bold tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(analytics.topDonors || []).map((d, i) => (
                <tr key={d._id} className="border-t border-green-100/50 hover:bg-green-50/50 transition-colors group">
                  <td className="px-5 py-4 font-bold text-gray-800">{d.name}</td>
                  <td className="px-5 py-4 capitalize text-gray-500 font-medium">{d.donorType?.replace('_', ' ')}</td>
                  <td className="px-5 py-4 text-green-700 font-bold flex items-center gap-1.5"><Star className="w-4 h-4 fill-green-700" /> {d.points}</td>
                  <td className="px-5 py-4 text-gray-600 font-medium">{d.donationCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
