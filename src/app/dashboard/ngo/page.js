'use client'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { getUser, isLoggedIn } from '../../../utils/auth'
import api from '../../../utils/api'
import DashboardLayout from '../../../components/DashboardLayout'
import DonationCard, { DonationCardSkeleton } from '../../../components/DonationCard'
import StatusBadge from '../../../components/StatusBadge'
import ProfileSection from '../../../components/ProfileSection'
import SecuritySection from '../../../components/SecuritySection'
import { LayoutDashboard, Inbox, ListTodo, CheckSquare, ClipboardList, CheckCircle2, Utensils, Loader2, User, Handshake, Plus, X, ShieldCheck } from 'lucide-react'

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
  const [myRequests, setMyRequests] = useState([])
  const [activeTab, setActiveTab] = useState('overview')
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [requestQuantity, setRequestQuantity] = useState('')
  const [requesting, setRequesting] = useState(false)
  
  useEffect(() => {
    const saved = localStorage.getItem('ngoTab')
    if (saved) setActiveTab(saved)
  }, [])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    localStorage.setItem('ngoTab', tab)
  }
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
    
    const interval = setInterval(() => {
      fetchData(u._id, true)
    }, 10000)
    
    return () => clearInterval(interval)
  }, [router])

  const fetchData = async (userId, silent = false) => {
    if (!silent) setLoading(true)
    try {
      const [pendingRes, acceptedRes, requestsRes] = await Promise.all([
        api.get('/donations?status=pending'),
        api.get(`/donations?acceptedBy=${userId}`),
        api.get('/requests/my-requests'),
      ])
      setAvailable(pendingRes.data.donations || [])
      setAccepted(acceptedRes.data.donations || [])
      setMyRequests(requestsRes.data.requests || [])
    } catch { 
      if (!silent) toast.error('Failed to load donations') 
    }
    finally { 
      if (!silent) setLoading(false) 
    }
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

  const handleCreateRequest = async (e) => {
    e.preventDefault()
    if (!requestQuantity.trim()) return
    setRequesting(true)
    try {
      await api.post('/requests', { quantityNeeded: requestQuantity })
      toast.success('Food request posted!')
      setShowRequestModal(false)
      setRequestQuantity('')
      fetchData(userIdRef.current, true)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to post request')
    } finally {
      setRequesting(false)
    }
  }

  const completed = accepted.filter(d => d.status === 'completed').length
  const inProgress = accepted.filter(d => d.status !== 'completed').length

  const navItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'available', label: 'Available', icon: <Inbox className="w-4 h-4" /> },
    { id: 'accepted', label: 'My Accepted', icon: <ListTodo className="w-4 h-4" /> },
    { id: 'requests', label: 'My Requests', icon: <Handshake className="w-4 h-4" /> },
    { id: 'history', label: 'Completed', icon: <CheckSquare className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <ShieldCheck className="w-4 h-4" /> },
  ]

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-green-50/50">
      <Loader2 className="animate-spin h-10 w-10 text-green-600" />
    </div>
  )

  return (
    <DashboardLayout user={user} navItems={navItems} activeTab={activeTab} setActiveTab={handleTabChange}
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

          <div className="flex justify-end">
            <button onClick={() => setShowRequestModal(true)}
              className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0">
              <Plus className="w-4 h-4" />
              Request Food
            </button>
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
              <div key={d._id} className="group rounded-3xl border border-green-200/50 overflow-hidden bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                <div className="w-full h-32 bg-green-50 border-b border-green-100 flex items-center justify-center overflow-hidden">
                  {d.image 
                    ? <img src={d.image} alt={d.foodName} className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-500" />
                    : <Utensils className="w-8 h-8 text-green-200" />}
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-green-900 text-base truncate">{d.foodName}</h3>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider bg-green-50 text-green-600 border border-green-100">Completed</span>
                  </div>
                  <p className="text-xs font-medium text-gray-600">{d.quantity} · {d.location}</p>
                  {d.donorId?.name && <p className="text-xs text-gray-500 font-medium pt-1 border-t border-green-100/50 mt-1">Donor: {d.donorId.name}</p>}
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* Food Requests */}
      {activeTab === 'requests' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-green-900">My Food Requests</h2>
            <button onClick={() => setShowRequestModal(true)}
              className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl font-bold text-xs shadow-sm transition-all flex items-center gap-2">
              <Plus className="w-3.5 h-3.5" />
              New Request
            </button>
          </div>
          {myRequests.length === 0 ? (
            <div className="text-center py-24 text-gray-400 flex flex-col items-center border border-dashed border-green-200 rounded-3xl bg-white/40">
              <Handshake className="w-16 h-16 mb-4 text-green-200" />
              <p className="text-sm font-medium">You haven't made any food requests yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {myRequests.map(r => (
                <div key={r._id} className="p-6 rounded-3xl border border-green-200/50 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Request</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      r.status === 'active' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                    }`}>
                      {r.status}
                    </span>
                  </div>
                  <p className="text-xl font-black text-gray-800 mb-1">{r.quantityNeeded}</p>
                  <p className="text-xs font-medium text-gray-500 mb-4">Posted on {new Date(r.createdAt).toLocaleDateString()}</p>
                  
                  {r.status === 'fulfilled' && r.fulfilledBy && (
                    <div className="mt-4 pt-4 border-t border-green-100 flex flex-col gap-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-green-600">Fulfilled By</p>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-700 text-xs">
                          {r.fulfilledBy.name?.[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-800">{r.fulfilledBy.name}</p>
                          <p className="text-[10px] font-medium text-gray-500">{r.fulfilledBy.phone || r.fulfilledBy.email}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Profile */}
      {activeTab === 'profile' && (
        <ProfileSection 
          user={user} 
          onSuccess={(u) => { 
            const merged = { ...user, ...u }
            setUser(merged)
            localStorage.setItem('user', JSON.stringify(merged))
          }} 
        />
      )}

      {/* Security */}
      {activeTab === 'security' && (
        <SecuritySection />
      )}

      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-green-900/40 backdrop-blur-sm" onClick={() => setShowRequestModal(false)} />
          <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-8 animate-in fade-in zoom-in duration-300">
            <button onClick={() => setShowRequestModal(false)} className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-all">
              <X className="w-5 h-5" />
            </button>
            
            <div className="mb-6">
              <h2 className="text-2xl font-black text-green-900 tracking-tight">Request Food</h2>
              <p className="text-sm font-medium text-gray-500">Specify the quantity you need</p>
            </div>

            <form onSubmit={handleCreateRequest} className="space-y-6">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">Quantity Needed</label>
                <input
                  autoFocus
                  type="text"
                  placeholder="e.g. 50 meals, 20kg rice"
                  value={requestQuantity}
                  onChange={(e) => setRequestQuantity(e.target.value)}
                  className="w-full bg-green-50/50 border border-green-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={requesting || !requestQuantity.trim()}
                className="w-full bg-green-700 hover:bg-green-800 text-white py-4 rounded-2xl font-bold text-sm transition-all shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 disabled:opacity-50 disabled:translate-y-0"
              >
                {requesting ? <Loader2 className="animate-spin w-4 h-4" /> : <Handshake className="w-4 h-4" />}
                {requesting ? 'Posting...' : 'Post Food Request'}
              </button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
