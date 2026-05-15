'use client'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { getUser, isLoggedIn } from '../../../utils/auth'
import api from '../../../utils/api'
import DashboardLayout from '../../../components/DashboardLayout'
import DonationForm from '../../../components/DonationForm'
import DonationCard, { DonationCardSkeleton } from '../../../components/DonationCard'
import DonationTable, { DonationTableSkeleton } from '../../../components/DonationTable'
import RewardCard from '../../../components/RewardCard'
import Leaderboard from '../../../components/Leaderboard'
import { LayoutDashboard, PlusCircle, List, Gift, Trophy, Medal, Award, Zap, Loader2, Utensils, RefreshCw } from 'lucide-react'

const STATUS_FILTERS = ['all', 'pending', 'accepted', 'collected', 'completed']

const StatCard = ({ label, value, sub, color }) => (
  <div className="p-6 rounded-3xl border border-green-200/50 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
    <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">{label}</p>
    <p className="text-3xl font-black tracking-tight" style={{ color }}>{value}</p>
    {sub && <p className="text-xs mt-1.5 font-medium text-gray-400">{sub}</p>}
  </div>
)

export default function DonorDashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [myDonations, setMyDonations] = useState([])
  const [activeTab, setActiveTab] = useState('overview')
  const [lastDonation, setLastDonation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [viewMode, setViewMode] = useState('cards')
  const [statusFilter, setStatusFilter] = useState('all')
  const [quickLoading, setQuickLoading] = useState(false)
  const userIdRef = useRef(null)

  useEffect(() => {
    if (!isLoggedIn()) { router.push('/login'); return }
    const u = getUser()
    if (!u || u.role !== 'donor') { router.push('/dashboard'); return }
    setUser(u)
    userIdRef.current = u._id
    fetchDonations(u._id)
  }, [router])

  const fetchDonations = async (userId) => {
    setLoading(true)
    try {
      const res = await api.get(`/donations?donorId=${userId}`)
      const list = res.data.donations || []
      setMyDonations(list)
      setLastDonation(list[0] || null)
    } catch { toast.error('Failed to load donations') }
    finally { setLoading(false) }
  }

  const handleQuickDonate = async () => {
    if (!lastDonation || quickLoading) return
    setQuickLoading(true)
    try {
      const fd = new FormData()
      fd.append('foodName', lastDonation.foodName)
      fd.append('quantity', lastDonation.quantity)
      fd.append('foodType', lastDonation.foodType)
      fd.append('expiryTime', lastDonation.expiryTime)
      fd.append('location', lastDonation.location)
      fd.append('description', lastDonation.description || '')
      fd.append('isRecurring', String(lastDonation.isRecurring || false))
      const res = await api.post('/donations', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      toast.success('Quick donation submitted!')
      if (res.data.user) {
        const refreshed = { ...user, ...res.data.user }
        setUser(refreshed)
        localStorage.setItem('user', JSON.stringify(refreshed))
      }
      await fetchDonations(userIdRef.current)
    } catch (err) { toast.error(err.response?.data?.message || 'Quick donate failed') }
    finally { setQuickLoading(false) }
  }

  const filteredDonations = statusFilter === 'all' ? myDonations : myDonations.filter(d => d.status === statusFilter)
  const completed = myDonations.filter(d => d.status === 'completed').length
  const pending = myDonations.filter(d => d.status === 'pending').length

  const navItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'upload', label: 'New Donation', icon: <PlusCircle className="w-4 h-4" /> },
    { id: 'history', label: 'My Donations', icon: <List className="w-4 h-4" /> },
    { id: 'rewards', label: 'Rewards', icon: <Gift className="w-4 h-4" /> },
    { id: 'leaderboard', label: 'Leaderboard', icon: <Trophy className="w-4 h-4" /> },
  ]

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-green-50/50">
      <Loader2 className="animate-spin h-10 w-10 text-green-600" />
    </div>
  )

  return (
    <DashboardLayout user={user} navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab}
      title={`Welcome, ${user.name}`} subtitle="Donor Dashboard">

      {/* Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Donations" value={myDonations.length} sub="All time" color="var(--accent)" />
            <StatCard label="Completed" value={completed} sub="Successfully delivered" color="#22c55e" />
            <StatCard label="Pending" value={pending} sub="Awaiting pickup" color="#f59e0b" />
            <StatCard label="Points Earned" value={`${user.points || 0} pts`} sub="Keep donating!" color="#d946ef" />
          </div>

          {lastDonation && (
            <div className="p-6 rounded-3xl border border-orange-200/60 bg-orange-50/30 shadow-sm">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest mb-1 text-orange-600">Quick Donate</p>
                  <p className="font-bold text-gray-900 text-base">{lastDonation.foodName} — <span className="text-gray-600 font-medium">{lastDonation.quantity}</span></p>
                  <p className="text-sm text-gray-500 mt-1">{lastDonation.location}</p>
                </div>
                <button onClick={handleQuickDonate} disabled={quickLoading}
                  className="px-6 py-3 rounded-xl text-white text-sm font-bold transition-all duration-300 disabled:opacity-60 flex items-center gap-2 shadow-[0_4px_14px_0_rgba(245,158,11,0.39)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.23)] hover:-translate-y-0.5 active:translate-y-0"
                  style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                  {quickLoading ? <Loader2 className="animate-spin h-5 w-5" /> : <RefreshCw className="w-4 h-4" />}
                  {quickLoading ? 'Submitting...' : 'Donate Same Again'}
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-3xl border border-green-200/50 bg-white/80 backdrop-blur-sm shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-5">Badge Progress</p>
              {[
                { icon: <Medal className="w-4 h-4 text-gray-500" />, label: 'Silver Badge', target: 10, color: '#94a3b8' },
                { icon: <Award className="w-4 h-4 text-yellow-600" />, label: 'Gold Badge', target: 50, color: '#f59e0b' },
                { icon: <Zap className="w-4 h-4 text-green-600" />, label: 'Hunger Hero', target: 100, color: '#d946ef' },
              ].map(b => {
                const pct = Math.min(100, Math.round(((user.donationCount || 0) / b.target) * 100))
                return (
                  <div key={b.label} className="mb-4 last:mb-0">
                    <div className="flex justify-between items-center text-sm mb-1.5">
                      <span className="font-semibold text-gray-700 flex items-center gap-2">{b.icon} {b.label}</span>
                      <span className="font-bold text-gray-500">{user.donationCount || 0}/{b.target}</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${pct}%`, backgroundColor: b.color }} />
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="p-6 rounded-3xl border border-green-200/50 bg-white/80 backdrop-blur-sm shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-5">Recent Activity</p>
              {myDonations.slice(0, 4).length === 0 ? (
                <p className="text-sm font-medium text-gray-400 text-center py-4">No donations yet</p>
              ) : myDonations.slice(0, 4).map(d => (
                <div key={d._id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-bold text-gray-800">{d.foodName}</p>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">{d.quantity}</p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider" style={{
                    backgroundColor: d.status === 'completed' ? 'rgba(34,197,94,0.12)' : d.status === 'pending' ? 'rgba(245,158,11,0.12)' : 'rgba(59,130,246,0.12)',
                    color: d.status === 'completed' ? '#22c55e' : d.status === 'pending' ? '#f59e0b' : '#3b82f6',
                  }}>{d.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Upload */}
      {activeTab === 'upload' && (
        <div className="max-w-2xl">
          <DonationForm onSuccess={(updatedStats) => {
            if (updatedStats) {
              const refreshed = { ...user, ...updatedStats }
              setUser(refreshed)
              localStorage.setItem('user', JSON.stringify(refreshed))
            }
            fetchDonations(userIdRef.current)
            setActiveTab('history')
          }} />
        </div>
      )}

      {/* History */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            {STATUS_FILTERS.map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition border"
                style={{
                  backgroundColor: statusFilter === s ? 'var(--accent)' : 'var(--bg-card)',
                  color: statusFilter === s ? 'white' : 'var(--text-secondary)',
                  borderColor: statusFilter === s ? 'var(--accent)' : 'var(--border)',
                }}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
            <div className="ml-auto flex gap-2">
              {['cards', 'table'].map(m => (
                <button key={m} onClick={() => setViewMode(m)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium border transition"
                  style={{
                    backgroundColor: viewMode === m ? 'var(--bg-hover)' : 'var(--bg-card)',
                    color: 'var(--text-secondary)',
                    borderColor: 'var(--border)',
                  }}>
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
            </div>
          </div>
          {loading ? (
            viewMode === 'cards' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => <DonationCardSkeleton key={i} />)}
              </div>
            ) : (
              <DonationTableSkeleton />
            )
          ) : filteredDonations.length === 0 ? (
            <div className="text-center py-24 text-gray-400 flex flex-col items-center">
              <Utensils className="w-16 h-16 mb-4 text-green-200" />
              <p className="text-sm font-medium">{statusFilter === 'all' ? "No donations yet. Start by uploading one!" : `No ${statusFilter} donations.`}</p>
            </div>
          ) : viewMode === 'cards' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDonations.map(d => <DonationCard key={d._id} donation={d} showAction={false} />)}
            </div>
          ) : (
            <DonationTable donations={filteredDonations} />
          )}
        </div>
      )}

      {/* Rewards */}
      {activeTab === 'rewards' && (
        <div className="max-w-lg space-y-4">
          <RewardCard points={user.points || 0} badges={user.badges || []} donationCount={user.donationCount || 0} />
          <div className="p-6 rounded-3xl border border-green-200/50 bg-white/80 backdrop-blur-sm shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-6">Badge System</p>
            {[
              { icon: <Medal className="w-5 h-5 text-gray-500" />, label: 'Silver Badge', req: '10 donations', pts: '+100 pts' },
              { icon: <Award className="w-5 h-5 text-yellow-600" />, label: 'Gold Badge', req: '50 donations', pts: '+500 pts' },
              { icon: <Zap className="w-5 h-5 text-green-600" />, label: 'Hunger Hero', req: '100 donations', pts: '+1000 pts' },
            ].map(b => (
              <div key={b.label} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                    {b.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{b.label}</p>
                    <p className="text-xs font-medium text-gray-500 mt-0.5">{b.req}</p>
                  </div>
                </div>
                <span className="text-xs font-bold" style={{ color: 'var(--accent)' }}>{b.pts}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Leaderboard */}
      {activeTab === 'leaderboard' && (
        <div className="max-w-2xl">
          <Leaderboard />
        </div>
      )}
    </DashboardLayout>
  )
}
