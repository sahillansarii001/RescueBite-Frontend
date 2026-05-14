'use client'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { getUser, isLoggedIn } from '../../../utils/auth'
import api from '../../../utils/api'
import DashboardLayout from '../../../components/DashboardLayout'
import DonationForm from '../../../components/DonationForm'
import DonationCard from '../../../components/DonationCard'
import DonationTable from '../../../components/DonationTable'
import RewardCard from '../../../components/RewardCard'
import Leaderboard from '../../../components/Leaderboard'

const STATUS_FILTERS = ['all', 'pending', 'accepted', 'collected', 'completed']

const StatCard = ({ label, value, sub, color }) => (
  <div className="p-5 rounded-2xl border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
    <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-2">{label}</p>
    <p className="text-3xl font-extrabold" style={{ color }}>{value}</p>
    {sub && <p className="text-xs mt-1 text-muted">{sub}</p>}
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
    { id: 'overview', label: 'Overview', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" strokeWidth="2"/><rect x="14" y="3" width="7" height="7" rx="1" strokeWidth="2"/><rect x="3" y="14" width="7" height="7" rx="1" strokeWidth="2"/><rect x="14" y="14" width="7" height="7" rx="1" strokeWidth="2"/></svg>
    )},
    { id: 'upload', label: 'New Donation', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
    )},
    { id: 'history', label: 'My Donations', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
    )},
    { id: 'rewards', label: 'Rewards', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
    )},
    { id: 'leaderboard', label: 'Leaderboard', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
    )},
  ]

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center page-bg">
      <svg className="animate-spin h-8 w-8" style={{ color: 'var(--accent)' }} viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
      </svg>
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
            <div className="p-5 rounded-2xl border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'rgba(245,158,11,0.3)' }}>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#f59e0b' }}>Quick Donate</p>
                  <p className="font-semibold text-primary text-sm">{lastDonation.foodName} — {lastDonation.quantity}</p>
                  <p className="text-xs text-muted mt-0.5">{lastDonation.location}</p>
                </div>
                <button onClick={handleQuickDonate} disabled={quickLoading}
                  className="px-5 py-2 rounded-xl text-white text-sm font-semibold transition disabled:opacity-50 flex items-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                  {quickLoading && <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>}
                  {quickLoading ? 'Submitting...' : 'Donate Same Again'}
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">Badge Progress</p>
              {[
                { icon: '🥈', label: 'Silver Badge', target: 10, color: '#94a3b8' },
                { icon: '🥇', label: 'Gold Badge', target: 50, color: '#f59e0b' },
                { icon: '🦸', label: 'Hunger Hero', target: 100, color: '#d946ef' },
              ].map(b => {
                const pct = Math.min(100, Math.round(((user.donationCount || 0) / b.target) * 100))
                return (
                  <div key={b.label} className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-secondary">{b.icon} {b.label}</span>
                      <span className="text-muted">{user.donationCount || 0}/{b.target}</span>
                    </div>
                    <div className="h-1.5 rounded-full" style={{ backgroundColor: 'var(--bg-hover)' }}>
                      <div className="h-1.5 rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: b.color }} />
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="p-5 rounded-2xl border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">Recent Activity</p>
              {myDonations.slice(0, 4).length === 0 ? (
                <p className="text-sm text-muted text-center py-4">No donations yet</p>
              ) : myDonations.slice(0, 4).map(d => (
                <div key={d._id} className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
                  <div>
                    <p className="text-sm font-medium text-primary">{d.foodName}</p>
                    <p className="text-xs text-muted">{d.quantity}</p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => <div key={i} className="h-64 rounded-2xl animate-pulse" style={{ backgroundColor: 'var(--bg-card)' }} />)}
            </div>
          ) : filteredDonations.length === 0 ? (
            <div className="text-center py-20 text-muted">
              <p className="text-4xl mb-3">🍱</p>
              <p className="text-sm">{statusFilter === 'all' ? "No donations yet. Start by uploading one!" : `No ${statusFilter} donations.`}</p>
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
          <div className="p-5 rounded-2xl border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
            <p className="text-sm font-semibold text-primary mb-4">Badge System</p>
            {[
              { icon: '🥈', label: 'Silver Badge', req: '10 donations', pts: '+100 pts' },
              { icon: '🥇', label: 'Gold Badge', req: '50 donations', pts: '+500 pts' },
              { icon: '🦸', label: 'Hunger Hero', req: '100 donations', pts: '+1000 pts' },
            ].map(b => (
              <div key={b.label} className="flex items-center justify-between py-3 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-3">
                  <span className="text-xl">{b.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-primary">{b.label}</p>
                    <p className="text-xs text-muted">{b.req}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>{b.pts}</span>
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
