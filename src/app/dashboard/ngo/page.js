'use client'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { getUser, isLoggedIn } from '../../../utils/auth'
import api from '../../../utils/api'
import DonationCard from '../../../components/DonationCard'
import StatusBadge from '../../../components/StatusBadge'

export default function NgoDashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [availableDonations, setAvailableDonations] = useState([])
  const [myAccepted, setMyAccepted] = useState([])
  const [activeTab, setActiveTab] = useState('available')
  const [loading, setLoading] = useState(false)
  // Track which donation IDs are currently being acted on — prevents double-clicks
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
      setAvailableDonations(pendingRes.data.donations || [])
      setMyAccepted(acceptedRes.data.donations || [])
    } catch {
      toast.error('Failed to load donations')
    } finally {
      setLoading(false)
    }
  }

  const acceptDonation = async (id) => {
    // Prevent double-click
    if (actingOn.has(id)) return
    setActingOn((prev) => new Set([...prev, id]))
    try {
      await api.put(`/donations/${id}`, { status: 'accepted' })
      toast.success('Donation accepted!')
      // Optimistically remove from available immediately
      setAvailableDonations((prev) => prev.filter((d) => d._id !== id))
      // Re-fetch accepted list with populated data
      const acceptedRes = await api.get(`/donations?acceptedBy=${userIdRef.current}`)
      setMyAccepted(acceptedRes.data.donations || [])
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to accept')
      // On failure, restore by re-fetching available too
      const pendingRes = await api.get('/donations?status=pending')
      setAvailableDonations(pendingRes.data.donations || [])
    } finally {
      setActingOn((prev) => { const s = new Set(prev); s.delete(id); return s })
    }
  }

  const updateStatus = async (id, newStatus) => {
    // Prevent double-click
    if (actingOn.has(id)) return
    setActingOn((prev) => new Set([...prev, id]))
    try {
      await api.put(`/donations/${id}`, { status: newStatus })
      toast.success('Status updated!')
      // Re-fetch to get fully populated donation data
      const acceptedRes = await api.get(`/donations?acceptedBy=${userIdRef.current}`)
      setMyAccepted(acceptedRes.data.donations || [])
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update status')
    } finally {
      setActingOn((prev) => { const s = new Set(prev); s.delete(id); return s })
    }
  }

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center">
      <svg className="animate-spin h-8 w-8 text-green-600" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
      </svg>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">NGO Dashboard 🤝</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome, {user.name}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[['available', 'Available Donations'], ['accepted', 'My Accepted']].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeTab === key ? 'bg-green-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-green-400'
            }`}
          >
            {label}
            {key === 'available' && availableDonations.length > 0 && (
              <span className="ml-2 bg-orange-500 text-white text-xs rounded-full px-1.5 py-0.5">
                {availableDonations.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* TAB 1 — Available */}
      {activeTab === 'available' && (
        loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => <div key={i} className="h-64 bg-gray-200 rounded-2xl animate-pulse" />)}
          </div>
        ) : availableDonations.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">📭</p>
            <p>No pending donations available right now</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableDonations.map((d) => (
              <DonationCard
                key={d._id}
                donation={d}
                showAction={true}
                actionLabel={actingOn.has(d._id) ? 'Accepting...' : 'Accept Donation'}
                actionDisabled={actingOn.has(d._id)}
                onAction={acceptDonation}
              />
            ))}
          </div>
        )
      )}

      {/* TAB 2 — My Accepted */}
      {activeTab === 'accepted' && (
        myAccepted.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">📋</p>
            <p>You haven&apos;t accepted any donations yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myAccepted.map((d) => {
              const isBusy = actingOn.has(d._id)
              return (
                <div key={d._id} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col gap-3">
                  <div className="w-full h-36 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                    {d.image ? (
                      <img src={d.image} alt={d.foodName} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl">🍱</span>
                    )}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-gray-900">{d.foodName}</h3>
                    <p className="text-sm text-gray-500">{d.quantity} • {d.location}</p>
                    <p className="text-xs text-gray-400">⏰ {d.expiryTime ? new Date(d.expiryTime).toLocaleString() : '—'}</p>
                    {d.donorId?.name && (
                      <p className="text-xs text-gray-400">👤 {d.donorId.name}</p>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <StatusBadge status={d.status} />
                    {d.status === 'accepted' && (
                      <button
                        onClick={() => updateStatus(d._id, 'collected')}
                        disabled={isBusy}
                        className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs px-3 py-1.5 rounded-lg transition"
                      >
                        {isBusy ? 'Updating...' : 'Mark Collected'}
                      </button>
                    )}
                    {d.status === 'collected' && (
                      <button
                        onClick={() => updateStatus(d._id, 'completed')}
                        disabled={isBusy}
                        className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs px-3 py-1.5 rounded-lg transition"
                      >
                        {isBusy ? 'Updating...' : 'Mark Completed'}
                      </button>
                    )}
                    {d.status === 'completed' && (
                      <span className="text-xs text-green-600 font-semibold">✓ Completed</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )
      )}
    </div>
  )
}
