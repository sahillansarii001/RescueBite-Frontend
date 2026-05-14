'use client'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line,
} from 'recharts'

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

export default function ImpactCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* Bar Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
        <h3 className="font-bold text-gray-900 mb-1">MPI Poverty Rate by State (%)</h3>
        <p className="text-gray-400 text-xs mb-4">Source: NITI Aayog National MPI 2021</p>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={barData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="state" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip formatter={(v) => [`${v}%`, 'MPI Rate']} />
            <Bar dataKey="mpi" fill="#16a34a" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-1">Food Type Distribution</h3>
        <p className="text-gray-400 text-xs mb-4">RescueBite platform data</p>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value">
              {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
            </Pie>
            <Tooltip formatter={(v) => [`${v}%`]} />
            <Legend iconType="circle" iconSize={8} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 lg:col-span-3">
        <h3 className="font-bold text-gray-900 mb-1">Donation Trends (2024)</h3>
        <p className="text-gray-400 text-xs mb-4">Monthly donations on RescueBite platform</p>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={trendData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Line type="monotone" dataKey="donations" stroke="#16a34a" strokeWidth={2.5}
              dot={{ r: 4, fill: '#16a34a' }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}
