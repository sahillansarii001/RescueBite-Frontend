'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { getUser, isLoggedIn } from '../../utils/auth'
import api from '../../utils/api'
import AnalyticsCharts from '../../components/AnalyticsCharts'
import DonationTable from '../../components/DonationTable'

const STATUS_FILTERS = ['all', 'pending', 'accepted', 'collected', 'completed']
const ROLE_FILTERS = ['all', 'donor', 'ngo', 'admin']

const roleBadge = (role) => {
  if (role === 'admin') return 'bg-purple-100 text-purple-700'
  if (role === 'ngo') return 'bg-blue-100 text-blue-700'
  return 'bg-green-100 text-green-700'
}

const emptyUser = { name: '', email: '', password: '', role: 'donor', donorType: 'individual', location: '', address: '', mapLink: '', phone: '', language: 'en' }

export default function AdminPage() {
  const router = useRouter()
  const [analytics, setAnalytics] = useState(null)
  const [users, setUsers] = useState([])
  const [donations, setDonations] = useState([])
  const [activeTab, setActiveTab] = useState('analytics')
  const [loading, setLoading] = useState(true)
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [deletingIds, setDeletingIds] = useState(new Set())
  const [actingUserIds, setActingUserIds] = useState(new Set())
  const [searchQuery, setSearchQuery] = useState('')

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showResetModal, setShowResetModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [userDetail, setUserDetail] = useState(null)
  const [createForm, setCreateForm] = useState(emptyUser)
  const [editForm, setEditForm] = useState({})
  const [newPassword, setNewPassword] = useState('')
  const [modalLoading, setModalLoading] = useState(false)

  useEffect(() => {
    if (!isLoggedIn()) { router.push('/login'); return }
    const u = getUser()
    if (!u || u.role !== 'admin') { router.push('/dashboard'); return }
    fetchAll()
  }, [router])

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [analyticsRes, usersRes, donationsRes] = await Promise.all([
        api.get('/analytics'),
        api.get('/users/all'),
        api.get('/donations'),
      ])
      setAnalytics(analyticsRes.data.analytics)
      setUsers(usersRes.data.users || [])
      setDonations(donationsRes.data.donations || [])
    } catch { toast.error('Failed to load admin data') }
    finally { setLoading(false) }
  }

  // ── Donation actions ──────────────────────────────────────
  const deleteDonation = async (id) => {
    if (deletingIds.has(id)) return
    if (!confirm('Delete this donation?')) return
    setDeletingIds((prev) => new Set([...prev, id]))
    try {
      await api.delete(`/donations/${id}`)
      toast.success('Donation deleted')
      setDonations((prev) => prev.filter((d) => d._id !== id))
    } catch (err) { toast.error(err.response?.data?.message || 'Delete failed') }
    finally { setDeletingIds((prev) => { const s = new Set(prev); s.delete(id); return s }) }
  }

  // ── User actions ──────────────────────────────────────────
  const openCreate = () => { setCreateForm(emptyUser); setShowCreateModal(true) }

  const handleCreate = async (e) => {
    e.preventDefault()
    setModalLoading(true)
    try {
      const payload = { ...createForm }
      if (payload.role !== 'donor') delete payload.donorType
      const res = await api.post('/users/admin/create', payload)
      setUsers((prev) => [res.data.user, ...prev])
      toast.success('User created!')
      setShowCreateModal(false)
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to create user') }
    finally { setModalLoading(false) }
  }

  const openEdit = (u) => {
    setSelectedUser(u)
    setEditForm({ name: u.name, email: u.email, role: u.role, points: u.points, location: u.location || '', address: u.address || '', phone: u.phone || '', donorType: u.donorType || 'individual' })
    setShowEditModal(true)
  }

  const handleEdit = async (e) => {
    e.preventDefault()
    setModalLoading(true)
    try {
      const res = await api.put(`/users/admin/${selectedUser._id}`, editForm)
      setUsers((prev) => prev.map((u) => u._id === selectedUser._id ? res.data.user : u))
      toast.success('User updated!')
      setShowEditModal(false)
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to update') }
    finally { setModalLoading(false) }
  }

  const openReset = (u) => { setSelectedUser(u); setNewPassword(''); setShowResetModal(true) }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setModalLoading(true)
    try {
      await api.put(`/users/admin/${selectedUser._id}/reset-password`, { newPassword })
      toast.success('Password reset!')
      setShowResetModal(false)
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to reset') }
    finally { setModalLoading(false) }
  }

  const openDetail = async (u) => {
    setSelectedUser(u)
    setShowDetailModal(true)
    setUserDetail(null)
    try {
      const res = await api.get(`/users/admin/${u._id}`)
      setUserDetail(res.data)
    } catch { toast.error('Failed to load user details') }
  }

  const handleDeleteUser = async (id) => {
    if (actingUserIds.has(id)) return
    if (!confirm('Delete this user and ALL their donations? This cannot be undone.')) return
    setActingUserIds((prev) => new Set([...prev, id]))
    try {
      await api.delete(`/users/admin/${id}`)
      setUsers((prev) => prev.filter((u) => u._id !== id))
      toast.success('User deleted')
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to delete') }
    finally { setActingUserIds((prev) => { const s = new Set(prev); s.delete(id); return s }) }
  }

  // ── Filters ───────────────────────────────────────────────
  const filteredUsers = users
    .filter((u) => roleFilter === 'all' || u.role === roleFilter)
    .filter((u) => !searchQuery || u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase()))

  const filteredDonations = statusFilter === 'all' ? donations : donations.filter((d) => d.status === statusFilter)

  const inputClass = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500'

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <svg className="animate-spin h-8 w-8 text-green-600" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
      </svg>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard 🛡️</h1>
          <p className="text-gray-500 text-sm mt-1">Full platform control</p>
        </div>
        <button onClick={fetchAll} className="text-sm text-green-600 border border-green-300 px-3 py-1.5 rounded-lg hover:bg-green-50 transition">
          🔄 Refresh
        </button>
      </div>

      {/* Quick stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total Users', value: users.length, icon: '👥' },
          { label: 'Donors', value: users.filter(u => u.role === 'donor').length, icon: '🏠' },
          { label: 'NGOs', value: users.filter(u => u.role === 'ngo').length, icon: '🤝' },
          { label: 'Donations', value: donations.length, icon: '📦' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
            <span className="text-2xl">{s.icon}</span>
            <div>
              <p className="text-xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[['analytics', '📊 Analytics'], ['users', '👥 Users'], ['donations', '📦 Donations']].map(([key, label]) => (
          <button key={key} onClick={() => setActiveTab(key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeTab === key ? 'bg-green-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-green-400'}`}>
            {label}
          </button>
        ))}
      </div>

      {/* ── TAB: Analytics ── */}
      {activeTab === 'analytics' && <AnalyticsCharts analytics={analytics} />}

      {/* ── TAB: Users ── */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          {/* Toolbar */}
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex flex-wrap gap-2 items-center">
              {ROLE_FILTERS.map((r) => (
                <button key={r} onClick={() => setRoleFilter(r)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition ${roleFilter === r ? 'bg-green-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-green-400'}`}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
              <input
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name or email..."
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-52"
              />
            </div>
            <button onClick={openCreate}
              className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg font-medium transition">
              + Add User
            </button>
          </div>

          {/* Users table */}
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  {['Name', 'Email', 'Phone', 'Role', 'Donor Type', 'Points', 'Donations', 'Joined', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u, i) => (
                  <tr key={u._id} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-green-50 transition`}>
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{u.name}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{u.email}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{u.phone || '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${roleBadge(u.role)}`}>{u.role}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 capitalize text-xs">{u.donorType?.replace(/_/g, ' ') || '—'}</td>
                    <td className="px-4 py-3 text-green-700 font-semibold">⭐ {u.points}</td>
                    <td className="px-4 py-3 text-gray-600">{u.donationCount}</td>
                    <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 flex-wrap">
                        <button onClick={() => openDetail(u)} className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition">View</button>
                        <button onClick={() => openEdit(u)} className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-2 py-1 rounded transition">Edit</button>
                        <button onClick={() => openReset(u)} className="text-xs bg-yellow-50 hover:bg-yellow-100 text-yellow-700 px-2 py-1 rounded transition">Reset PW</button>
                        {u.role !== 'admin' && (
                          <button onClick={() => handleDeleteUser(u._id)} disabled={actingUserIds.has(u._id)}
                            className="text-xs bg-red-50 hover:bg-red-100 text-red-600 px-2 py-1 rounded transition disabled:opacity-40">
                            {actingUserIds.has(u._id) ? '...' : 'Delete'}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredUsers.length === 0 && <p className="text-center text-gray-400 py-8">No users found</p>}
          </div>
        </div>
      )}

      {/* ── TAB: Donations ── */}
      {activeTab === 'donations' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {STATUS_FILTERS.map((s) => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition ${statusFilter === s ? 'bg-green-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-green-400'}`}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
          <DonationTable donations={filteredDonations} onDelete={deleteDonation} deletingIds={deletingIds} />
        </div>
      )}

      {/* ── MODAL: Create User ── */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Add New User</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
            <form onSubmit={handleCreate} className="space-y-3">
              {[['name','Name','text',true],['email','Email','email',true],['password','Password (default: rescuebite123)','password',false],['location','City / Area','text',true],['address','Full Address','text',true],['mapLink','Google Maps Link','text',true],['phone','Phone','tel',true]].map(([field, label, type, req]) => (
                <div key={field}>
                  <label className="block text-xs font-medium text-gray-700 mb-1">{label}{req ? ' *' : ''}</label>
                  <input type={type} value={createForm[field] || ''} onChange={(e) => setCreateForm(p => ({...p, [field]: e.target.value}))} required={req} className={inputClass} />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Role *</label>
                <select value={createForm.role} onChange={(e) => setCreateForm(p => ({...p, role: e.target.value}))} className={inputClass}>
                  <option value="donor">Donor</option>
                  <option value="ngo">NGO</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              {createForm.role === 'donor' && (
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Donor Type</label>
                  <select value={createForm.donorType} onChange={(e) => setCreateForm(p => ({...p, donorType: e.target.value}))} className={inputClass}>
                    {['individual','restaurant','marriage_hall','hotel','other'].map(t => <option key={t} value={t}>{t.replace(/_/g,' ')}</option>)}
                  </select>
                </div>
              )}
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-lg text-sm">Cancel</button>
                <button type="submit" disabled={modalLoading} className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white py-2 rounded-lg text-sm font-medium">
                  {modalLoading ? 'Creating...' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: Edit User ── */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Edit User</h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
            <form onSubmit={handleEdit} className="space-y-3">
              {[['name','Name'],['email','Email'],['location','City / Area'],['address','Full Address'],['phone','Phone']].map(([field, label]) => (
                <div key={field}>
                  <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
                  <input value={editForm[field] || ''} onChange={(e) => setEditForm(p => ({...p, [field]: e.target.value}))} className={inputClass} />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Points</label>
                <input type="number" value={editForm.points ?? 0} onChange={(e) => setEditForm(p => ({...p, points: e.target.value}))} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Role</label>
                <select value={editForm.role} onChange={(e) => setEditForm(p => ({...p, role: e.target.value}))} className={inputClass}>
                  <option value="donor">Donor</option>
                  <option value="ngo">NGO</option>
                </select>
              </div>
              {editForm.role === 'donor' && (
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Donor Type</label>
                  <select value={editForm.donorType || 'individual'} onChange={(e) => setEditForm(p => ({...p, donorType: e.target.value}))} className={inputClass}>
                    {['individual','restaurant','marriage_hall','hotel','other'].map(t => <option key={t} value={t}>{t.replace(/_/g,' ')}</option>)}
                  </select>
                </div>
              )}
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setShowEditModal(false)} className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-lg text-sm">Cancel</button>
                <button type="submit" disabled={modalLoading} className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-2 rounded-lg text-sm font-medium">
                  {modalLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: Reset Password ── */}
      {showResetModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Reset Password</h2>
              <button onClick={() => setShowResetModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
            <p className="text-sm text-gray-500 mb-4">Resetting password for <span className="font-semibold text-gray-800">{selectedUser.name}</span></p>
            <form onSubmit={handleResetPassword} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">New Password *</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength={6} className={inputClass} placeholder="Min 6 characters" />
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setShowResetModal(false)} className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-lg text-sm">Cancel</button>
                <button type="submit" disabled={modalLoading} className="flex-1 bg-yellow-500 hover:bg-yellow-600 disabled:opacity-60 text-white py-2 rounded-lg text-sm font-medium">
                  {modalLoading ? 'Resetting...' : 'Reset Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: User Detail ── */}
      {showDetailModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">User Details</h2>
              <button onClick={() => setShowDetailModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
            {!userDetail ? (
              <div className="flex justify-center py-8">
                <svg className="animate-spin h-6 w-6 text-green-600" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    ['Name', userDetail.user.name],
                    ['Email', userDetail.user.email],
                    ['Phone', userDetail.user.phone || '—'],
                    ['Role', userDetail.user.role],
                    ['Location', userDetail.user.location || '—'],
                    ['Address', userDetail.user.address || '—'],
                    ['Points', `⭐ ${userDetail.user.points}`],
                    ['Donations', userDetail.user.donationCount],
                    ['Joined', userDetail.user.createdAt ? new Date(userDetail.user.createdAt).toLocaleDateString() : '—'],
                    ['Donor Type', userDetail.user.donorType?.replace(/_/g,' ') || '—'],
                  ].map(([label, value]) => (
                    <div key={label} className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-400">{label}</p>
                      <p className="font-medium text-gray-800 text-xs mt-0.5 break-all">{value}</p>
                    </div>
                  ))}
                </div>
                {userDetail.user.mapLink && (
                  <a href={userDetail.user.mapLink} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-green-600 hover:underline">
                    📍 View on Google Maps
                  </a>
                )}
                {userDetail.user.badges?.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Badges</p>
                    <div className="flex flex-wrap gap-1">
                      {userDetail.user.badges.map(b => <span key={b} className="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full">{b}</span>)}
                    </div>
                  </div>
                )}
                {userDetail.donations?.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-700 mb-2">Recent Donations ({userDetail.donations.length})</p>
                    <div className="space-y-1 max-h-40 overflow-y-auto">
                      {userDetail.donations.map(d => (
                        <div key={d._id} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 text-xs">
                          <span className="font-medium text-gray-800">{d.foodName}</span>
                          <span className="text-gray-400">{d.quantity}</span>
                          <span className={`px-2 py-0.5 rounded-full font-semibold ${
                            d.status === 'completed' ? 'bg-green-100 text-green-700' :
                            d.status === 'accepted' ? 'bg-blue-100 text-blue-700' :
                            d.status === 'collected' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>{d.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
