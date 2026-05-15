'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'
import api from '../utils/api'
import { KeyRound, ShieldCheck, Loader2 } from 'lucide-react'

export default function SecuritySection() {
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [changingPass, setChangingPass] = useState(false)

  const handlePassChange = async (e) => {
    e.preventDefault()
    if (passwords.newPassword.length < 6) {
      return toast.error('New password must be at least 6 characters')
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      return toast.error('Confirm password does not match')
    }
    setChangingPass(true)
    try {
      await api.put('/users/change-password', {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword
      })
      toast.success('Password changed successfully!')
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password')
    } finally {
      setChangingPass(false)
    }
  }

  return (
    <div className="max-w-2xl bg-white/80 backdrop-blur-sm border border-green-200/50 rounded-3xl shadow-sm p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 rounded-2xl bg-green-50 text-green-600 shadow-sm">
          <KeyRound className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-green-900 tracking-tight">Security Settings</h2>
          <p className="text-sm font-medium text-gray-400">Update your password to keep your account secure</p>
        </div>
      </div>

      <form onSubmit={handlePassChange} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2 pl-1">Current Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={passwords.currentPassword}
              onChange={(e) => setPasswords(p => ({ ...p, currentPassword: e.target.value }))}
              required 
              className="w-full border border-green-100 rounded-2xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-white/50 transition-all" 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2 pl-1">New Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                value={passwords.newPassword}
                onChange={(e) => setPasswords(p => ({ ...p, newPassword: e.target.value }))}
                required 
                className="w-full border border-green-100 rounded-2xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-white/50 transition-all" 
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2 pl-1">Confirm New Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords(p => ({ ...p, confirmPassword: e.target.value }))}
                required 
                className="w-full border border-green-100 rounded-2xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-white/50 transition-all" 
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button type="submit" disabled={changingPass} 
            className="bg-green-700 hover:bg-green-800 disabled:opacity-60 text-white font-bold py-3.5 px-8 rounded-2xl transition-all shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5">
            {changingPass ? <Loader2 className="animate-spin w-4 h-4" /> : <ShieldCheck className="w-5 h-5" />}
            Update Password
          </button>
        </div>
      </form>
    </div>
  )
}
