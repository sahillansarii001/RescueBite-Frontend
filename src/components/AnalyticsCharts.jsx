'use client'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  LineChart, Line, CartesianGrid,
} from 'recharts'

const PIE_COLORS = ['#16a34a', '#f97316', '#3b82f6']

const statCards = (a) => [
  { icon: '🍱', label: 'Meals Saved', value: a.totalMealsSaved ?? 0 },
  { icon: '📦', label: 'Total Donations', value: a.totalDonations ?? 0 },
  { icon: '🤝', label: 'Active NGOs', value: a.activeNGOs ?? 0 },
  { icon: '👥', label: 'Total Donors', value: a.totalDonors ?? 0 },
]

export default function AnalyticsCharts({ analytics }) {
  if (!analytics) return <p className="text-gray-400 text-center py-10">No analytics data</p>

  const pieData = (analytics.foodTypeDistribution || []).map((d) => ({
    name: d._id,
    value: d.count,
  }))

  const dailyData = (analytics.dailyTrends || []).map((d) => ({
    date: d._id,
    count: d.count,
  }))

  const monthlyData = (analytics.monthlyTrends || []).map((d) => ({
    month: d._id,
    count: d.count,
  }))

  return (
    <div className="space-y-8">
      {/* Row 1 — Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards(analytics).map((s) => (
          <div key={s.label} className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center gap-1">
            <span className="text-3xl">{s.icon}</span>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500 text-center">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Row 2 — Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bar — daily trends */}
        <div className="bg-white rounded-2xl shadow-md p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Daily Donations (30 days)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dailyData}>
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#16a34a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie — food type */}
        <div className="bg-white rounded-2xl shadow-md p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Food Type Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line — monthly trends */}
        <div className="bg-white rounded-2xl shadow-md p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Monthly Trends (12 months)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#f97316" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 3 — Top donors */}
      <div className="bg-white rounded-2xl shadow-md p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Top Donors</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-xs text-gray-500 uppercase border-b">
              <tr>
                {['Name', 'Donor Type', 'Points', 'Donations'].map((h) => (
                  <th key={h} className="px-3 py-2 text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(analytics.topDonors || []).map((d) => (
                <tr key={d._id} className="border-b hover:bg-gray-50">
                  <td className="px-3 py-2 font-medium">{d.name}</td>
                  <td className="px-3 py-2 capitalize text-gray-500">{d.donorType?.replace('_', ' ')}</td>
                  <td className="px-3 py-2 text-green-700 font-semibold">⭐ {d.points}</td>
                  <td className="px-3 py-2 text-gray-600">{d.donationCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
