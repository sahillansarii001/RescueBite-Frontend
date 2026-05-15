'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'
import api from '../utils/api'
import { Upload, Image as ImageIcon } from 'lucide-react'

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
    <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm border border-green-200/50 rounded-3xl shadow-sm p-8 space-y-5">
      <h2 className="text-xl font-bold text-green-900 mb-6">Upload Donation</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Food Name *</label>
          <input
            name="foodName" value={formData.foodName} onChange={handleChange} required
            className="w-full border border-green-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 bg-white/50 focus:bg-white transition-all shadow-inner"
            placeholder="e.g. Rice and Dal"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Quantity *</label>
          <input
            name="quantity" value={formData.quantity} onChange={handleChange} required
            className="w-full border border-green-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 bg-white/50 focus:bg-white transition-all shadow-inner"
            placeholder="e.g. 10 kg or 50 plates"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Food Type *</label>
          <select
            name="foodType" value={formData.foodType} onChange={handleChange} required
            className="w-full border border-green-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 bg-white/50 focus:bg-white transition-all shadow-inner"
          >
            <option value="cooked">Cooked</option>
            <option value="raw">Raw</option>
            <option value="packaged">Packaged</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Expiry Time *</label>
          <input
            type="datetime-local" name="expiryTime" value={formData.expiryTime} onChange={handleChange} required
            className="w-full border border-green-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 bg-white/50 focus:bg-white transition-all shadow-inner"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Location *</label>
          <input
            name="location" value={formData.location} onChange={handleChange} required
            className="w-full border border-green-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 bg-white/50 focus:bg-white transition-all shadow-inner"
            placeholder="e.g. Andheri West, Mumbai"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
          <textarea
            name="description" value={formData.description} onChange={handleChange} rows={3}
            className="w-full border border-green-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 resize-none bg-white/50 focus:bg-white transition-all shadow-inner"
            placeholder="Any additional details..."
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Food Image (optional)</label>
          <div className="bg-green-50/50 hover:bg-green-50 border-2 border-dashed border-green-200 hover:border-green-400 transition-colors rounded-xl p-6 flex flex-col items-center justify-center gap-2 text-center">
            <ImageIcon className="w-8 h-8 text-green-400" />
            <input
              key={fileKey}
              type="file" accept=".jpg,.jpeg,.png,.webp"
              onChange={(e) => setImageFile(e.target.files[0] || null)}
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200 cursor-pointer"
            />
          </div>
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
        className="w-full bg-green-700 hover:bg-green-800 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_14px_0_rgba(21,128,61,0.39)] hover:shadow-[0_6px_20px_rgba(21,128,61,0.23)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none mt-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Uploading...
          </>
        ) : (
          <>
            <Upload className="w-5 h-5" /> Submit Donation
          </>
        )}
      </button>
    </form>
  )
}
