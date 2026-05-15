'use client'
import { useState, useRef } from 'react'
import toast from 'react-hot-toast'
import api from '../utils/api'
import { User, MapPin, Phone, Camera, Save, Loader2, Mail } from 'lucide-react'

export default function ProfileSection({ user, onSuccess }) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    location: user?.location || '',
    phone: user?.phone || '',
    address: user?.address || '',
  })
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null)

  const previewUrl = imageFile ? URL.createObjectURL(imageFile) : (user?.profilePic || null)

  const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const fd = new FormData()
      Object.entries(formData).forEach(([k, v]) => fd.append(k, v))
      if (imageFile) fd.append('profilePic', imageFile)

      const res = await api.put('/users/profile', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      toast.success('Profile updated!')
      onSuccess?.(res.data.user)
      setImageFile(null)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl bg-white/80 backdrop-blur-sm border border-green-200/50 rounded-3xl shadow-sm p-8">
      <h2 className="text-xl font-bold text-green-900 mb-6">Profile Details</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Profile Picture Upload */}
        <div className="flex flex-col items-center sm:items-start sm:flex-row gap-6 mb-8">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-green-50 flex items-center justify-center shrink-0">
              {previewUrl ? (
                <img src={previewUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-10 h-10 text-green-300" />
              )}
            </div>
            <button type="button" onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 p-2 bg-green-600 rounded-full text-white shadow-lg hover:bg-green-700 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
            <input type="file" accept=".jpg,.jpeg,.png,.webp" ref={fileInputRef} className="hidden" onChange={(e) => setImageFile(e.target.files[0] || null)} />
          </div>
          <div className="text-center sm:text-left flex flex-col justify-center">
            <h3 className="font-bold text-gray-900 text-lg">{user?.name}</h3>
            <p className="text-sm text-gray-500 capitalize">{user?.role} {user?.donorType && user.role === 'donor' ? `— ${user.donorType.replace('_', ' ')}` : ''}</p>
            <p className="text-sm text-gray-400 mt-1">{user?.email}</p>
          </div>
        </div>

        <div className={`grid grid-cols-1 ${user?.role === 'admin' ? '' : 'md:grid-cols-2'} gap-4`}>
          <div className={user?.role === 'admin' ? 'w-full' : ''}>
            <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User className="h-4 w-4 text-gray-400"/></div>
              <input name="name" value={formData.name} onChange={handleChange} required className="w-full border border-green-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 bg-white/50" />
            </div>
          </div>
          <div className={user?.role === 'admin' ? 'w-full' : ''}>
            <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="h-4 w-4 text-gray-400"/></div>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border border-green-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 bg-white/50" />
            </div>
          </div>
          {user?.role !== 'admin' && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Phone className="h-4 w-4 text-gray-400"/></div>
                <input name="phone" value={formData.phone} onChange={handleChange} required className="w-full border border-green-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 bg-white/50" />
              </div>
            </div>
          )}
          {user?.role !== 'admin' && (
            <>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">City / Area</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><MapPin className="h-4 w-4 text-gray-400"/></div>
                  <input name="location" value={formData.location} onChange={handleChange} required className="w-full border border-green-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 bg-white/50" />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">Full Address</label>
                <textarea name="address" value={formData.address} onChange={handleChange} required rows={2} className="w-full border border-green-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 bg-white/50 resize-none" />
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <button type="submit" disabled={loading} className="bg-green-700 hover:bg-green-800 disabled:opacity-60 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-sm flex items-center gap-2">
            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}
