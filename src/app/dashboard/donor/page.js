'use client'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { getUser, isLoggedIn } from '../../../utils/auth'
import api from '../../../utils/api'
import DonationForm from '../../../components/DonationForm'
import DonationCard from '../../../components/DonationCard'
import DonationTable from '../../../components/DonationTable'
import RewardCard from '../../../components/RewardCard'
import Leaderboard from '../../../components/Leaderboard'

const TABS = ['upload', 'history', 'rewards', 'leaderboard']
const TAB_LABELS = { upload: 'Upload Donation', history: 'My Donations', rewards: 'Rewards', leaderboard: 'Leaderboard' }
const donorTypeIcon = { individual: '🏠', restaurant: '🍽️', marriage_hall: '💒', hotel: '🏨', other: '📦' }
const STATUS_FILTERS = ['all', 'pending', 'accepted', 'collected', 'completed']

export default function DonorDashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [myDonations, setMyDonations] = useState([])
  const [activeTab, setActiveTab] = useState('upload')
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
    } catch {
      toast.error('Failed to load donations')
    } finally {
      setLoading(false)
    }
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
    } catch (err) {
      toast.error(err.response?.data?.message || 'Quick donate failed')
    } finally {
      setQuickLoading(false)
    }
  }

  const filteredDonations = statusFilter === 'all'
    ? myDonations
    : myDonations.filter((d) => d.status === statusFilter)

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
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.name} 👋</h1>
          <span className="inline-block mt-1 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
            {donorTypeIcon[user.donorType] || '📦'}{' '}
            {user.donorType?.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Donor'}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeTab === tab ? 'bg-green-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-green-400'
            }`}
          >
            {TAB_LABELS[tab]}
          </button>
        ))}
      </div>

      {activeTab === 'upload' && (
        <div className="space-y-6">
          {lastDonation && (
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5">
              <p className="text-sm font-bold text-orange-600 mb-2">⚡ Quick Donate</p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">{lastDonation.foodName}</span> — {lastDonation.quantity} from {lastDonation.location}
              </p>
              <button
                onClick={handleQuickDonate}
                disabled={quickLoading}
                className="mt-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2 rounded-lg transition flex items-center gap-2"
              >
                {quickLoading && (
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                )}
                {quickLoading ? 'Submitting...' : 'Donate Same Again'}
              </button>
            </div>
          )}
          <DonationForm
            onSuccess={(updatedStats) => {
              const currentUserId = userIdRef.current
              if (updatedStats) {
                const refreshed = { ...user, ...updatedStats }
                setUser(refreshed)
                localStorage.setItem('user', JSON.stringify(refreshed))
              }
              fetchDonations(currentUserId)
              setActiveTab('history')
            }}
          />
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            {STATUS_FILTERS.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                  statusFilter === s ? 'bg-green-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-green-400'
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
            <div className="ml-auto flex gap-2">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition ${viewMode === 'cards' ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-200'}`}
              >
                Cards
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition ${viewMode === 'table' ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-200'}`}
              >
                Table
              </button>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => <div key={i} className="h-64 bg-gray-200 rounded-2xl animate-pulse" />)}
            </div>
          ) : filteredDonations.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-3">🍱</p>
              <p>{statusFilter === 'all' ? "You haven't donated yet. Start by uploading a donation!" : `No ${statusFilter} donations found.`}</p>
            </div>
          ) : viewMode === 'cards' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDonations.map((d) => (
                <DonationCard key={d._id} donation={d} showAction={false} />
              ))}
            </div>
          ) : (
            <DonationTable donations={filteredDonations} />
          )}
        </div>
      )}

      {activeTab === 'rewards' && (
        <div className="space-y-4 max-w-lg">
          <RewardCard points={user.points || 0} badges={user.badges || []} donationCount={user.donationCount || 0} />
          <div className="bg-white rounded-2xl shadow-md p-5 space-y-2">
            <p className="text-sm font-semibold text-gray-700 mb-3">Badge System</p>
            {[
              { icon: '🥈', label: '10 donations → Silver Badge (+100 pts)' },
              { icon: '🥇', label: '50 donations → Gold Badge (+500 pts)' },
              { icon: '🦸', label: '100 donations → Hunger Hero Badge (+1000 pts)' },
            ].map((b) => (
              <p key={b.label} className="text-sm text-gray-600">{b.icon} {b.label}</p>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="max-w-2xl">
          <Leaderboard />
        </div>
      )}
    </div>
  )
}
