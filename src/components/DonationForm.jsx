'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'
import api from '../utils/api'

const empty = {
  foodName: '',
  quantity: '',
  foodType: 'cooked',
  expiryTime: '',
  location: '',
  description: '',
  isRecurring: false,
}

export default function DonationForm({ onSuccess }) {
  const [formData, setFormData] = useState(empty)
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fileKey, setFileKey] = useState(0)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Build multipart form — multer on backend handles optional image
      const fd = new FormData()
      Object.entries(formData).forEach(([k, v]) => fd.append(k, v))
      if (imageFile) fd.append('image', imageFile)

      const res = await api.post('/donations', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      toast.success('Donation uploaded successfully!')
      setFormData(empty)
      setImageFile(null)
      setFileKey((k) => k + 1) // resets file input visually
      onSuccess?.(res.data.user)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-6 space-y-4">
      <h2 className="text-lg font-bold text-gray-800">Upload Donation</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Food Name *</label>
          <input
            name="foodName" value={formData.foodName} onChange={handleChange} required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="e.g. Rice and Dal"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
          <input
            name="quantity" value={formData.quantity} onChange={handleChange} required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="e.g. 10 kg or 50 plates"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Food Type *</label>
          <select
            name="foodType" value={formData.foodType} onChange={handleChange} required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="cooked">Cooked</option>
            <option value="raw">Raw</option>
            <option value="packaged">Packaged</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Time *</label>
          <input
            type="datetime-local" name="expiryTime" value={formData.expiryTime} onChange={handleChange} required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
          <input
            name="location" value={formData.location} onChange={handleChange} required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="e.g. Andheri West, Mumbai"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description" value={formData.description} onChange={handleChange} rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Any additional details..."
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Food Image (optional)</label>
          <input
            key={fileKey}
            type="file" accept=".jpg,.jpeg,.png,.webp"
            onChange={(e) => setImageFile(e.target.files[0] || null)}
            className="text-sm text-gray-500"
          />
        </div>
        <div className="md:col-span-2 flex items-center gap-2">
          <input
            type="checkbox" name="isRecurring" id="isRecurring"
            checked={formData.isRecurring} onChange={handleChange}
            className="accent-green-600"
          />
          <label htmlFor="isRecurring" className="text-sm text-gray-700">This is a recurring donation</label>
        </div>
      </div>

      <button
        type="submit" disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Uploading...
          </>
        ) : 'Submit Donation'}
      </button>
    </form>
  )
}
