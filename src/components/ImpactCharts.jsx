'use client'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line,
} from 'recharts'

const barData = [
  { state: 'Bihar', mpi: 51.9 },
  { state: 'Jharkhand', mpi: 42.2 },
  { state: 'UP', mpi: 37.8 },
  { state: 'MP', mpi: 36.6 },
  { state: 'Rajasthan', mpi: 29.0 },
  { state: 'Punjab', mpi: 5.6 },
  { state: 'Goa', mpi: 1.7 },
  { state: 'Kerala', mpi: 0.7 },
]

const pieData = [
  { name: 'Cooked Food', value: 45 },
  { name: 'Raw Produce', value: 30 },
  { name: 'Packaged', value: 25 },
]
const PIE_COLORS = ['#14b8a6', '#f59e0b', '#6366f1']

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

const tip = {
  backgroundColor: '#151233',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '12px',
  color: '#e2e8f0',
  fontSize: '12px',
}

export default function ImpactCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-navy-900 rounded-2xl p-6 border border-white/5 lg:col-span-2">
        <h3 className="font-bold text-white mb-1">MPI Poverty Rate by State (%)</h3>
        <p className="text-gray-500 text-xs mb-5">Source: NITI Aayog National MPI 2021</p>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={barData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="state" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tip} formatter={(v) => [`${v}%`, 'MPI Rate']} />
            <Bar dataKey="mpi" fill="#14b8a6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-navy-900 rounded-2xl p-6 border border-white/5">
        <h3 className="font-bold text-white mb-1">Food Type Distribution</h3>
        <p className="text-gray-500 text-xs mb-5">RescueBite platform data</p>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={88} paddingAngle={4} dataKey="value">
              {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
            </Pie>
            <Tooltip contentStyle={tip} formatter={(v) => [`${v}%`]} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-navy-900 rounded-2xl p-6 border border-white/5 lg:col-span-3">
        <h3 className="font-bold text-white mb-1">Donation Trends (2024)</h3>
        <p className="text-gray-500 text-xs mb-5">Monthly donations on RescueBite platform</p>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={trendData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tip} />
            <Line type="monotone" dataKey="donations" stroke="#14b8a6" strokeWidth={2.5}
              dot={{ r: 4, fill: '#14b8a6', strokeWidth: 0 }} activeDot={{ r: 6, fill: '#14b8a6' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
