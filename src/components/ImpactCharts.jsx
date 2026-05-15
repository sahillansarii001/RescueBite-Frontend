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
const PIE_COLORS = ['#43A047', '#FB8C00', '#66BB6A']

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
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(200, 230, 201, 0.5)',
  borderRadius: '16px',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  color: '#1B5E20',
  fontSize: '12px',
  fontWeight: '600',
  padding: '8px 12px',
}

export default function ImpactCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-white/80 backdrop-blur-sm border border-green-200/50 rounded-3xl p-6 shadow-sm lg:col-span-2 hover:shadow-md transition-shadow">
        <h3 className="font-bold text-green-900 text-lg mb-1">MPI Poverty Rate by State (%)</h3>
        <p className="text-gray-400 text-xs mb-5">Source: NITI Aayog National MPI 2021</p>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={barData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8F5E9" />
            <XAxis dataKey="state" tick={{ fontSize: 11, fill: '#78909C' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#78909C' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tip} formatter={(v) => [`${v}%`, 'MPI Rate']} />
            <Bar dataKey="mpi" fill="#43A047" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white/80 backdrop-blur-sm border border-green-200/50 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <h3 className="font-bold text-green-900 text-lg mb-1">Food Type Distribution</h3>
        <p className="text-gray-400 text-xs mb-5">RescueBite platform data</p>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={88} paddingAngle={4} dataKey="value">
              {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
            </Pie>
            <Tooltip contentStyle={tip} formatter={(v) => [`${v}%`]} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px', color: '#78909C' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white/80 backdrop-blur-sm border border-green-200/50 rounded-3xl p-6 shadow-sm lg:col-span-3 hover:shadow-md transition-shadow">
        <h3 className="font-bold text-green-900 text-lg mb-1">Donation Trends (2024)</h3>
        <p className="text-gray-400 text-xs mb-5">Monthly donations on RescueBite platform</p>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={trendData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8F5E9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#78909C' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#78909C' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tip} />
            <Line type="monotone" dataKey="donations" stroke="#FB8C00" strokeWidth={2.5}
              dot={{ r: 4, fill: '#FB8C00', strokeWidth: 0 }} activeDot={{ r: 6, fill: '#FB8C00' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
