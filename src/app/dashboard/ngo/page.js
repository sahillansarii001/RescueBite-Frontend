'use client'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { getUser, isLoggedIn } from '../../../utils/auth'
import api from '../../../utils/api'
import DashboardLayout from '../../../components/DashboardLayout'
import DonationCard, { DonationCardSkeleton } from '../../../components/DonationCard'
import StatusBadge from '../../../components/StatusBadge'
import { LayoutDashboard, Inbox, ListTodo, CheckSquare, ClipboardList, CheckCircle2, Utensils, Loader2 } from 'lucide-react'

const StatCard = ({ label, value, color }) => (
  <div className="p-6 rounded-3xl border border-green-200/50 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
    <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">{label}</p>
    <p className="text-3xl font-black tracking-tight" style={{ color }}>{value}</p>
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
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'available', label: 'Available', icon: <Inbox className="w-4 h-4" /> },
    { id: 'accepted', label: 'My Accepted', icon: <ListTodo className="w-4 h-4" /> },
    { id: 'history', label: 'Completed', icon: <CheckSquare className="w-4 h-4" /> },
  ]

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-green-50/50">
      <Loader2 className="animate-spin h-10 w-10 text-green-600" />
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
          <div className="p-6 rounded-3xl border border-green-200/50 bg-white/80 backdrop-blur-sm shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Latest Available Donations</p>
              <button onClick={() => setActiveTab('available')} className="text-xs font-bold hover:underline text-green-600">
                View all →
              </button>
            </div>
            {available.slice(0, 3).length === 0 ? (
              <p className="text-sm font-medium text-gray-400 text-center py-4">No pending donations right now</p>
            ) : available.slice(0, 3).map(d => (
              <div key={d._id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-bold text-gray-800">{d.foodName}</p>
                  <p className="text-xs font-medium text-gray-500 mt-0.5">{d.quantity} · {d.location}</p>
                </div>
                <button onClick={() => acceptDonation(d._id)} disabled={actingOn.has(d._id)}
                  className="px-4 py-2 rounded-xl text-white text-xs font-bold transition-all duration-300 shadow-[0_4px_14px_0_rgba(34,197,94,0.39)] hover:shadow-[0_6px_20px_rgba(34,197,94,0.23)] hover:-translate-y-0.5 disabled:opacity-50 disabled:shadow-none disabled:translate-y-0 flex items-center gap-1.5"
                  style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>
                  {actingOn.has(d._id) ? <Loader2 className="animate-spin w-3.5 h-3.5" /> : null}
                  {actingOn.has(d._id) ? '...' : 'Accept'}
                </button>
              </div>
            ))}
          </div>

          {/* In-progress */}
          <div className="p-6 rounded-3xl border border-green-200/50 bg-white/80 backdrop-blur-sm shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">In Progress</p>
              <button onClick={() => setActiveTab('accepted')} className="text-xs font-bold hover:underline text-green-600">View all →</button>
            </div>
            {accepted.filter(d => d.status !== 'completed').slice(0, 3).length === 0 ? (
              <p className="text-sm font-medium text-gray-400 text-center py-4">Nothing in progress</p>
            ) : accepted.filter(d => d.status !== 'completed').slice(0, 3).map(d => (
              <div key={d._id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-bold text-gray-800">{d.foodName}</p>
                  <p className="text-xs font-medium text-gray-500 mt-0.5">{d.quantity}</p>
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
            {[...Array(3)].map((_, i) => <DonationCardSkeleton key={i} />)}
          </div>
        ) : available.length === 0 ? (
          <div className="text-center py-24 text-gray-400 flex flex-col items-center">
            <Inbox className="w-16 h-16 mb-4 text-green-200" />
            <p className="text-sm font-medium">No pending donations available right now</p>
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
          <div className="text-center py-24 text-gray-400 flex flex-col items-center">
            <ClipboardList className="w-16 h-16 mb-4 text-green-200" />
            <p className="text-sm font-medium">No active donations right now</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accepted.filter(d => d.status !== 'completed').map(d => {
              const busy = actingOn.has(d._id)
              return (
                <div key={d._id} className="rounded-3xl border border-green-200/50 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md bg-white/80 backdrop-blur-sm">
                  <div className="w-full h-40 flex items-center justify-center bg-green-50 border-b border-green-100">
                    {d.image
                      ? <img src={d.image} alt={d.foodName} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                      : <Utensils className="w-10 h-10 text-green-300" />}
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="font-bold text-green-900 text-lg leading-tight">{d.foodName}</h3>
                    <p className="text-sm text-gray-600 font-medium">{d.quantity} · {d.location}</p>
                    <p className="text-xs text-gray-500">Expires: {d.expiryTime ? new Date(d.expiryTime).toLocaleString() : '—'}</p>
                    {d.donorId?.name && <p className="text-xs font-medium text-gray-500">Donor: {d.donorId.name}</p>}
                    <div className="flex items-center justify-between pt-3 mt-1 border-t border-green-100/50">
                      <StatusBadge status={d.status} />
                      {d.status === 'accepted' && (
                        <button onClick={() => updateStatus(d._id, 'collected')} disabled={busy}
                          className="text-xs px-4 py-2 rounded-xl text-white font-bold transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:shadow-none hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5"
                          style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                          {busy ? <Loader2 className="animate-spin w-3.5 h-3.5" /> : null}
                          {busy ? '...' : 'Mark Collected'}
                        </button>
                      )}
                      {d.status === 'collected' && (
                        <button onClick={() => updateStatus(d._id, 'completed')} disabled={busy}
                          className="text-xs px-4 py-2 rounded-xl text-white font-bold transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:shadow-none hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5"
                          style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>
                          {busy ? <Loader2 className="animate-spin w-3.5 h-3.5" /> : null}
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
          <div className="text-center py-24 text-gray-400 flex flex-col items-center">
            <CheckCircle2 className="w-16 h-16 mb-4 text-green-200" />
            <p className="text-sm font-medium">No completed donations yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accepted.filter(d => d.status === 'completed').map(d => (
              <div key={d._id} className="rounded-3xl border border-green-200/50 p-5 space-y-2 bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-green-900 text-base">{d.foodName}</h3>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider" style={{ backgroundColor: 'rgba(34,197,94,0.12)', color: '#22c55e' }}>Completed</span>
                </div>
                <p className="text-xs font-medium text-gray-600">{d.quantity} · {d.location}</p>
                {d.donorId?.name && <p className="text-xs text-gray-500 font-medium pt-1">Donor: {d.donorId.name}</p>}
              </div>
            ))}
          </div>
        )
      )}
    </DashboardLayout>
  )
}
