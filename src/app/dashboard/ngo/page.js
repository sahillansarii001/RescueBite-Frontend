'use client'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { getUser, isLoggedIn } from '../../../utils/auth'
import api from '../../../utils/api'
import DashboardLayout from '../../../components/DashboardLayout'
import DonationCard from '../../../components/DonationCard'
import StatusBadge from '../../../components/StatusBadge'

const StatCard = ({ label, value, color }) => (
  <div className="p-5 rounded-2xl border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
    <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-2">{label}</p>
    <p className="text-3xl font-extrabold" style={{ color }}>{value}</p>
  </div>
)

export default function NgoDashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [available, setAvailable] = useState([])
  const [accepted, setAccepted] = useState([])
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(false)
  const [actingOn, setActingOn] = useState(new Set())
  const userIdRef = useRef(null)

  useEffect(() => {
    if (!isLoggedIn()) { router.push('/login'); return }
    const u = getUser()
    if (!u || u.role !== 'ngo') { router.push('/dashboard'); return }
    setUser(u)
    userIdRef.current = u._id
    fetchData(u._id)
  }, [router])

  const fetchData = async (userId) => {
    setLoading(true)
    try {
      const [pendingRes, acceptedRes] = await Promise.all([
        api.get('/donations?status=pending'),
        api.get(`/donations?acceptedBy=${userId}`),
      ])
      setAvailable(pendingRes.data.donations || [])
      setAccepted(acceptedRes.data.donations || [])
    } catch { toast.error('Failed to load donations') }
    finally { setLoading(false) }
  }

  const acceptDonation = async (id) => {
    if (actingOn.has(id)) return
    setActingOn(p => new Set([...p, id]))
    try {
      await api.put(`/donations/${id}`, { status: 'accepted' })
      toast.success('Donation accepted!')
      setAvailable(p => p.filter(d => d._id !== id))
      const res = await api.get(`/donations?acceptedBy=${userIdRef.current}`)
      setAccepted(res.data.donations || [])
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to accept')
      const res = await api.get('/donations?status=pending')
      setAvailable(res.data.donations || [])
    } finally {
      setActingOn(p => { const s = new Set(p); s.delete(id); return s })
    }
  }

  const updateStatus = async (id, newStatus) => {
    if (actingOn.has(id)) return
    setActingOn(p => new Set([...p, id]))
    try {
      await api.put(`/donations/${id}`, { status: newStatus })
      toast.success('Status updated!')
      const res = await api.get(`/donations?acceptedBy=${userIdRef.current}`)
      setAccepted(res.data.donations || [])
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to update') }
    finally { setActingOn(p => { const s = new Set(p); s.delete(id); return s }) }
  }

  const completed = accepted.filter(d => d.status === 'completed').length
  const inProgress = accepted.filter(d => d.status !== 'completed').length

  const navItems = [
    {
      id: 'overview', label: 'Overview', icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" strokeWidth="2" /><rect x="14" y="3" width="7" height="7" rx="1" strokeWidth="2" /><rect x="3" y="14" width="7" height="7" rx="1" strokeWidth="2" /><rect x="14" y="14" width="7" height="7" rx="1" strokeWidth="2" /></svg>
      )
    },
    {
      id: 'available', label: 'Available', icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
      )
    },
    {
      id: 'accepted', label: 'My Accepted', icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
      )
    },
    {
      id: 'history', label: 'Completed', icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      )
    },
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
      title={`Welcome, ${user.name}`} subtitle="NGO Dashboard">

      {/* Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Available Now" value={available.length} color="#3b82f6" />
            <StatCard label="In Progress" value={inProgress} color="#f59e0b" />
            <StatCard label="Completed" value={completed} color="#22c55e" />
            <StatCard label="Total Accepted" value={accepted.length} color="#d946ef" />
          </div>

          {/* Recent available */}
          <div className="p-5 rounded-2xl border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-primary">Latest Available Donations</p>
              <button onClick={() => setActiveTab('available')} className="text-xs font-medium hover:underline" style={{ color: 'var(--accent)' }}>
                View all →
              </button>
            </div>
            {available.slice(0, 3).length === 0 ? (
              <p className="text-sm text-muted text-center py-4">No pending donations right now</p>
            ) : available.slice(0, 3).map(d => (
              <div key={d._id} className="flex items-center justify-between py-3 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
                <div>
                  <p className="text-sm font-medium text-primary">{d.foodName}</p>
                  <p className="text-xs text-muted">{d.quantity} · {d.location}</p>
                </div>
                <button onClick={() => acceptDonation(d._id)} disabled={actingOn.has(d._id)}
                  className="text-xs px-3 py-1.5 rounded-lg text-white font-medium transition disabled:opacity-50"
                  style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>
                  {actingOn.has(d._id) ? '...' : 'Accept'}
                </button>
              </div>
            ))}
          </div>

          {/* In-progress */}
          <div className="p-5 rounded-2xl border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-primary">In Progress</p>
              <button onClick={() => setActiveTab('accepted')} className="text-xs font-medium hover:underline" style={{ color: 'var(--accent)' }}>View all →</button>
            </div>
            {accepted.filter(d => d.status !== 'completed').slice(0, 3).length === 0 ? (
              <p className="text-sm text-muted text-center py-4">Nothing in progress</p>
            ) : accepted.filter(d => d.status !== 'completed').slice(0, 3).map(d => (
              <div key={d._id} className="flex items-center justify-between py-3 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
                <div>
                  <p className="text-sm font-medium text-primary">{d.foodName}</p>
                  <p className="text-xs text-muted">{d.quantity}</p>
                </div>
                <StatusBadge status={d.status} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available donations */}
      {activeTab === 'available' && (
        loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => <div key={i} className="h-64 rounded-2xl animate-pulse" style={{ backgroundColor: 'var(--bg-card)' }} />)}
          </div>
        ) : available.length === 0 ? (
          <div className="text-center py-20 text-muted">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-sm">No pending donations available right now</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {available.map(d => (
              <DonationCard key={d._id} donation={d} showAction
                actionLabel={actingOn.has(d._id) ? 'Accepting...' : 'Accept Donation'}
                actionDisabled={actingOn.has(d._id)}
                onAction={acceptDonation} />
            ))}
          </div>
        )
      )}

      {/* Accepted / in-progress */}
      {activeTab === 'accepted' && (
        accepted.filter(d => d.status !== 'completed').length === 0 ? (
          <div className="text-center py-20 text-muted">
            <p className="text-4xl mb-3">📋</p>
            <p className="text-sm">No active donations right now</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accepted.filter(d => d.status !== 'completed').map(d => {
              const busy = actingOn.has(d._id)
              return (
                <div key={d._id} className="rounded-2xl border overflow-hidden transition hover:-translate-y-0.5"
                  style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                  <div className="w-full h-36 flex items-center justify-center" style={{ backgroundColor: 'var(--bg-hover)' }}>
                    {d.image
                      ? <img src={d.image} alt={d.foodName} className="w-full h-full object-cover" />
                      : <span className="text-4xl">🍱</span>}
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-primary">{d.foodName}</h3>
                    <p className="text-sm text-secondary">{d.quantity} · {d.location}</p>
                    <p className="text-xs text-muted">Expires: {d.expiryTime ? new Date(d.expiryTime).toLocaleString() : '—'}</p>
                    {d.donorId?.name && <p className="text-xs text-muted">Donor: {d.donorId.name}</p>}
                    <div className="flex items-center justify-between pt-2">
                      <StatusBadge status={d.status} />
                      {d.status === 'accepted' && (
                        <button onClick={() => updateStatus(d._id, 'collected')} disabled={busy}
                          className="text-xs px-3 py-1.5 rounded-lg text-white font-medium transition disabled:opacity-50"
                          style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                          {busy ? '...' : 'Mark Collected'}
                        </button>
                      )}
                      {d.status === 'collected' && (
                        <button onClick={() => updateStatus(d._id, 'completed')} disabled={busy}
                          className="text-xs px-3 py-1.5 rounded-lg text-white font-medium transition disabled:opacity-50"
                          style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>
                          {busy ? '...' : 'Mark Completed'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )
      )}

      {/* Completed history */}
      {activeTab === 'history' && (
        accepted.filter(d => d.status === 'completed').length === 0 ? (
          <div className="text-center py-20 text-muted">
            <p className="text-4xl mb-3">✅</p>
            <p className="text-sm">No completed donations yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accepted.filter(d => d.status === 'completed').map(d => (
              <div key={d._id} className="rounded-2xl border p-4 space-y-2"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-primary text-sm">{d.foodName}</h3>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(34,197,94,0.12)', color: '#22c55e' }}>Completed</span>
                </div>
                <p className="text-xs text-secondary">{d.quantity} · {d.location}</p>
                {d.donorId?.name && <p className="text-xs text-muted">Donor: {d.donorId.name}</p>}
              </div>
            ))}
          </div>
        )
      )}
    </DashboardLayout>
  )
}
