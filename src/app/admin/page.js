'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { getUser, isLoggedIn } from '../../utils/auth'
import api from '../../utils/api'
import AnalyticsCharts from '../../components/AnalyticsCharts'
import DonationTable from '../../components/DonationTable'
import DashboardLayout from '../../components/DashboardLayout'

const STATUS_FILTERS = ['all', 'pending', 'accepted', 'collected', 'completed']
const ROLE_FILTERS = ['all', 'donor', 'ngo', 'admin']
const emptyUser = { name: '', email: '', password: '', role: 'donor', donorType: 'individual', location: '', address: '', mapLink: '', phone: '', language: 'en' }

const roleColor = (role) => {
  if (role === 'admin') return { bg: 'rgba(217,70,239,0.12)', text: '#d946ef' }
  if (role === 'ngo') return { bg: 'rgba(59,130,246,0.12)', text: '#3b82f6' }
  return { bg: 'rgba(34,197,94,0.12)', text: '#22c55e' }
}

const StatCard = ({ label, value, color, icon }) => (
  <div className="p-5 rounded-2xl border flex items-center gap-4" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ backgroundColor: `${color}20` }}>{icon}</div>
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-muted">{label}</p>
      <p className="text-2xl font-extrabold mt-0.5" style={{ color }}>{value}</p>
    </div>
  </div>
)

export default function AdminPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [analytics, setAnalytics] = useState(null)
  const [users, setUsers] = useState([])
  const [donations, setDonations] = useState([])
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [deletingIds, setDeletingIds] = useState(new Set())
  const [actingUserIds, setActingUserIds] = useState(new Set())
  const [searchQuery, setSearchQuery] = useState('')
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
    setUser(u)
    fetchAll()
  }, [router])

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [aRes, uRes, dRes] = await Promise.all([api.get('/analytics'), api.get('/users/all'), api.get('/donations')])
      setAnalytics(aRes.data.analytics)
      setUsers(uRes.data.users || [])
      setDonations(dRes.data.donations || [])
    } catch { toast.error('Failed to load admin data') }
    finally { setLoading(false) }
  }

  const deleteDonation = async (id) => {
    if (deletingIds.has(id)) return
    if (!confirm('Delete this donation?')) return
    setDeletingIds(p => new Set([...p, id]))
    try {
      await api.delete(`/donations/${id}`)
      toast.success('Donation deleted')
      setDonations(p => p.filter(d => d._id !== id))
    } catch (err) { toast.error(err.response?.data?.message || 'Delete failed') }
    finally { setDeletingIds(p => { const s = new Set(p); s.delete(id); return s }) }
  }

  const openCreate = () => { setCreateForm(emptyUser); setShowCreateModal(true) }
  const handleCreate = async (e) => {
    e.preventDefault(); setModalLoading(true)
    try {
      const payload = { ...createForm }
      if (payload.role !== 'donor') delete payload.donorType
      const res = await api.post('/users/admin/create', payload)
      setUsers(p => [res.data.user, ...p]); toast.success('User created!'); setShowCreateModal(false)
    } catch (err) { toast.error(err.response?.data?.message || 'Failed') }
    finally { setModalLoading(false) }
  }

  const openEdit = (u) => {
    setSelectedUser(u)
    setEditForm({ name: u.name, email: u.email, role: u.role, points: u.points, location: u.location || '', address: u.address || '', phone: u.phone || '', donorType: u.donorType || 'individual' })
    setShowEditModal(true)
  }
  const handleEdit = async (e) => {
    e.preventDefault(); setModalLoading(true)
    try {
      const res = await api.put(`/users/admin/${selectedUser._id}`, editForm)
      setUsers(p => p.map(u => u._id === selectedUser._id ? res.data.user : u)); toast.success('Updated!'); setShowEditModal(false)
    } catch (err) { toast.error(err.response?.data?.message || 'Failed') }
    finally { setModalLoading(false) }
  }

  const openReset = (u) => { setSelectedUser(u); setNewPassword(''); setShowResetModal(true) }
  const handleResetPassword = async (e) => {
    e.preventDefault(); setModalLoading(true)
    try {
      await api.put(`/users/admin/${selectedUser._id}/reset-password`, { newPassword })
      toast.success('Password reset!'); setShowResetModal(false)
    } catch (err) { toast.error(err.response?.data?.message || 'Failed') }
    finally { setModalLoading(false) }
  }

  const openDetail = async (u) => {
    setSelectedUser(u); setShowDetailModal(true); setUserDetail(null)
    try { const res = await api.get(`/users/admin/${u._id}`); setUserDetail(res.data) }
    catch { toast.error('Failed to load user details') }
  }
  const handleDeleteUser = async (id) => {
    if (actingUserIds.has(id)) return
    if (!confirm('Delete this user and ALL their donations? This cannot be undone.')) return
    setActingUserIds(p => new Set([...p, id]))
    try {
      await api.delete(`/users/admin/${id}`)
      setUsers(p => p.filter(u => u._id !== id)); toast.success('User deleted')
    } catch (err) { toast.error(err.response?.data?.message || 'Failed') }
    finally { setActingUserIds(p => { const s = new Set(p); s.delete(id); return s }) }
  }

  const filteredUsers = users
    .filter(u => roleFilter === 'all' || u.role === roleFilter)
    .filter(u => !searchQuery || u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase()))
  const filteredDonations = statusFilter === 'all' ? donations : donations.filter(d => d.status === statusFilter)

  const navItems = [
    { id: 'overview', label: 'Overview', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" strokeWidth="2"/><rect x="14" y="3" width="7" height="7" rx="1" strokeWidth="2"/><rect x="3" y="14" width="7" height="7" rx="1" strokeWidth="2"/><rect x="14" y="14" width="7" height="7" rx="1" strokeWidth="2"/></svg> },
    { id: 'analytics', label: 'Analytics', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg> },
    { id: 'users', label: 'Users', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg> },
    { id: 'donations', label: 'Donations', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg> },
  ]

  const inputCls = 'w-full rounded-xl px-3 py-2 text-sm focus:outline-none transition text-primary'
  const inputSty = { backgroundColor: 'var(--bg-base)', border: '1px solid var(--border)' }

  if (!user || loading) return (
    <div className="min-h-screen flex items-center justify-center page-bg">
      <svg className="animate-spin h-8 w-8" style={{ color: 'var(--accent)' }} viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
      </svg>
    </div>
  )

  return (
    <DashboardLayout user={user} navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab}
      title="Admin Dashboard" subtitle="Full platform control">

      {/* Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Users" value={users.length} color="#22c55e" icon="👥" />
            <StatCard label="Donors" value={users.filter(u => u.role === 'donor').length} color="#3b82f6" icon="🏠" />
            <StatCard label="NGOs" value={users.filter(u => u.role === 'ngo').length} color="#f59e0b" icon="🤝" />
            <StatCard label="Donations" value={donations.length} color="#d946ef" icon="📦" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Pending" value={donations.filter(d => d.status === 'pending').length} color="#f59e0b" icon="⏳" />
            <StatCard label="Accepted" value={donations.filter(d => d.status === 'accepted').length} color="#3b82f6" icon="✅" />
            <StatCard label="Collected" value={donations.filter(d => d.status === 'collected').length} color="#8b5cf6" icon="🚗" />
            <StatCard label="Completed" value={donations.filter(d => d.status === 'completed').length} color="#22c55e" icon="🎉" />
          </div>
          <div className="flex justify-end">
            <button onClick={fetchAll} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition text-secondary hover:text-primary"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              Refresh
            </button>
          </div>
        </div>
      )}

      {/* Analytics */}
      {activeTab === 'analytics' && <AnalyticsCharts analytics={analytics} />}

      {/* Users */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex flex-wrap gap-2 items-center">
              {ROLE_FILTERS.map(r => (
                <button key={r} onClick={() => setRoleFilter(r)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium border transition"
                  style={{ backgroundColor: roleFilter === r ? 'var(--accent)' : 'var(--bg-card)', color: roleFilter === r ? 'white' : 'var(--text-secondary)', borderColor: roleFilter === r ? 'var(--accent)' : 'var(--border)' }}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search name or email..."
                className="rounded-xl px-3 py-1.5 text-xs focus:outline-none w-52 text-primary"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }} />
            </div>
            <button onClick={openCreate} className="px-4 py-2 rounded-xl text-white text-sm font-semibold transition"
              style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>
              + Add User
            </button>
          </div>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead style={{ backgroundColor: 'var(--bg-surface)' }}>
                  <tr>
                    {['Name', 'Email', 'Phone', 'Role', 'Points', 'Donations', 'Joined', 'Actions'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest whitespace-nowrap text-muted">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u, i) => {
                    const rc = roleColor(u.role)
                    return (
                      <tr key={u._id} className="border-t transition" style={{ borderColor: 'var(--border)', backgroundColor: i % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-surface)' }}>
                        <td className="px-4 py-3 font-medium text-primary whitespace-nowrap">{u.name}</td>
                        <td className="px-4 py-3 text-xs text-secondary">{u.email}</td>
                        <td className="px-4 py-3 text-xs text-secondary">{u.phone || '—'}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: rc.bg, color: rc.text }}>{u.role}</span>
                        </td>
                        <td className="px-4 py-3 text-xs font-semibold" style={{ color: 'var(--accent)' }}>⭐ {u.points}</td>
                        <td className="px-4 py-3 text-xs text-secondary">{u.donationCount}</td>
                        <td className="px-4 py-3 text-xs text-muted whitespace-nowrap">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1 flex-wrap">
                            {[['View', () => openDetail(u), '#3b82f6'], ['Edit', () => openEdit(u), '#f59e0b'], ['Reset PW', () => openReset(u), '#8b5cf6']].map(([label, fn, color]) => (
                              <button key={label} onClick={fn} className="text-xs px-2 py-1 rounded-lg font-medium transition"
                                style={{ backgroundColor: `${color}15`, color }}>{label}</button>
                            ))}
                            {u.role !== 'admin' && (
                              <button onClick={() => handleDeleteUser(u._id)} disabled={actingUserIds.has(u._id)}
                                className="text-xs px-2 py-1 rounded-lg font-medium transition disabled:opacity-40"
                                style={{ backgroundColor: 'rgba(239,68,68,0.12)', color: '#ef4444' }}>
                                {actingUserIds.has(u._id) ? '...' : 'Delete'}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              {filteredUsers.length === 0 && <p className="text-center text-muted py-8 text-sm">No users found</p>}
            </div>
          </div>
        </div>
      )}

      {/* Donations */}
      {activeTab === 'donations' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {STATUS_FILTERS.map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className="px-3 py-1.5 rounded-full text-xs font-medium border transition"
                style={{ backgroundColor: statusFilter === s ? 'var(--accent)' : 'var(--bg-card)', color: statusFilter === s ? 'white' : 'var(--text-secondary)', borderColor: statusFilter === s ? 'var(--accent)' : 'var(--border)' }}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
          <DonationTable donations={filteredDonations} onDelete={deleteDonation} deletingIds={deletingIds} />
        </div>
      )}

      {/* Modal helper */}
      {[
        { show: showCreateModal, close: () => setShowCreateModal(false), title: 'Add New User', onSubmit: handleCreate, submitLabel: 'Create User', submitColor: '#22c55e',
          fields: (
            <>
              <div className="grid grid-cols-2 gap-3">
                {[['name','Name','text',true],['email','Email','email',true],['password','Password','password',false],['phone','Phone','tel',true]].map(([f,l,t,r]) => (
                  <div key={f}><label className="block text-xs font-semibold uppercase tracking-widest mb-1 text-muted">{l}{r?' *':''}</label>
                  <input type={t} value={createForm[f]||''} onChange={e=>setCreateForm(p=>({...p,[f]:e.target.value}))} required={r} className={inputCls} style={inputSty}/></div>
                ))}
              </div>
              {[['location','City / Area','text'],['address','Full Address','text'],['mapLink','Google Maps Link','text']].map(([f,l,t]) => (
                <div key={f}><label className="block text-xs font-semibold uppercase tracking-widest mb-1 text-muted">{l} *</label>
                <input type={t} value={createForm[f]||''} onChange={e=>setCreateForm(p=>({...p,[f]:e.target.value}))} required className={inputCls} style={inputSty}/></div>
              ))}
              <div><label className="block text-xs font-semibold uppercase tracking-widest mb-1 text-muted">Role *</label>
              <select value={createForm.role} onChange={e=>setCreateForm(p=>({...p,role:e.target.value}))} className={inputCls} style={inputSty}>
                <option value="donor">Donor</option><option value="ngo">NGO</option><option value="admin">Admin</option>
              </select></div>
              {createForm.role==='donor'&&<div><label className="block text-xs font-semibold uppercase tracking-widest mb-1 text-muted">Donor Type</label>
              <select value={createForm.donorType} onChange={e=>setCreateForm(p=>({...p,donorType:e.target.value}))} className={inputCls} style={inputSty}>
                {['individual','restaurant','marriage_hall','hotel','other'].map(t=><option key={t} value={t}>{t.replace(/_/g,' ')}</option>)}
              </select></div>}
            </>
          )
        },
        { show: showEditModal, close: () => setShowEditModal(false), title: `Edit — ${selectedUser?.name}`, onSubmit: handleEdit, submitLabel: 'Save Changes', submitColor: '#3b82f6',
          fields: selectedUser && (
            <>
              <div className="grid grid-cols-2 gap-3">
                {[['name','Name'],['email','Email'],['location','City'],['phone','Phone']].map(([f,l]) => (
                  <div key={f}><label className="block text-xs font-semibold uppercase tracking-widest mb-1 text-muted">{l}</label>
                  <input value={editForm[f]||''} onChange={e=>setEditForm(p=>({...p,[f]:e.target.value}))} className={inputCls} style={inputSty}/></div>
                ))}
              </div>
              <div><label className="block text-xs font-semibold uppercase tracking-widest mb-1 text-muted">Points</label>
              <input type="number" value={editForm.points??0} onChange={e=>setEditForm(p=>({...p,points:e.target.value}))} className={inputCls} style={inputSty}/></div>
              <div><label className="block text-xs font-semibold uppercase tracking-widest mb-1 text-muted">Role</label>
              <select value={editForm.role} onChange={e=>setEditForm(p=>({...p,role:e.target.value}))} className={inputCls} style={inputSty}>
                <option value="donor">Donor</option><option value="ngo">NGO</option>
              </select></div>
            </>
          )
        },
        { show: showResetModal, close: () => setShowResetModal(false), title: `Reset Password — ${selectedUser?.name}`, onSubmit: handleResetPassword, submitLabel: 'Reset Password', submitColor: '#8b5cf6',
          fields: (
            <div><label className="block text-xs font-semibold uppercase tracking-widest mb-1 text-muted">New Password *</label>
            <input type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} required minLength={6} placeholder="Min 6 characters" className={inputCls} style={inputSty}/></div>
          )
        },
      ].map(({ show, close, title, onSubmit, submitLabel, submitColor, fields }) => show && (
        <div key={title} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6 border" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-primary">{title}</h2>
              <button onClick={close} className="text-muted hover:text-primary transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <form onSubmit={onSubmit} className="space-y-3">
              {fields}
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={close} className="flex-1 py-2 rounded-xl text-sm border font-medium text-secondary" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}>Cancel</button>
                <button type="submit" disabled={modalLoading} className="flex-1 py-2 rounded-xl text-sm text-white font-semibold disabled:opacity-60 transition"
                  style={{ backgroundColor: submitColor }}>{modalLoading ? 'Loading...' : submitLabel}</button>
              </div>
            </form>
          </div>
        </div>
      ))}

      {/* Detail modal */}
      {showDetailModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 border" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-primary">User Details</h2>
              <button onClick={() => setShowDetailModal(false)} className="text-muted hover:text-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            {!userDetail ? (
              <div className="flex justify-center py-8"><svg className="animate-spin h-6 w-6" style={{ color: 'var(--accent)' }} viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg></div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[['Name',userDetail.user.name],['Email',userDetail.user.email],['Phone',userDetail.user.phone||'—'],['Role',userDetail.user.role],['Location',userDetail.user.location||'—'],['Points',`⭐ ${userDetail.user.points}`],['Donations',userDetail.user.donationCount],['Joined',userDetail.user.createdAt?new Date(userDetail.user.createdAt).toLocaleDateString():'—']].map(([l,v]) => (
                    <div key={l} className="p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-card)' }}>
                      <p className="text-xs text-muted">{l}</p>
                      <p className="font-medium text-primary text-xs mt-0.5 break-all">{v}</p>
                    </div>
                  ))}
                </div>
                {userDetail.donations?.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-secondary mb-2">Recent Donations ({userDetail.donations.length})</p>
                    <div className="space-y-1 max-h-40 overflow-y-auto">
                      {userDetail.donations.map(d => (
                        <div key={d._id} className="flex items-center justify-between rounded-lg px-3 py-2 text-xs" style={{ backgroundColor: 'var(--bg-card)' }}>
                          <span className="font-medium text-primary">{d.foodName}</span>
                          <span className="text-muted">{d.quantity}</span>
                          <span className="px-2 py-0.5 rounded-full font-semibold" style={{
                            backgroundColor: d.status==='completed'?'rgba(34,197,94,0.12)':d.status==='accepted'?'rgba(59,130,246,0.12)':'rgba(245,158,11,0.12)',
                            color: d.status==='completed'?'#22c55e':d.status==='accepted'?'#3b82f6':'#f59e0b'
                          }}>{d.status}</span>
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
    </DashboardLayout>
  )
}
