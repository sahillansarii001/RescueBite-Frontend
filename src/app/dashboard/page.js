'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isLoggedIn, getUser } from '../../utils/auth'

export default function DashboardRouter() {
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push('/login')
      return
    }
    const user = getUser()
    if (!user) { router.push('/login'); return }
    if (user.role === 'donor') router.push('/dashboard/donor')
    else if (user.role === 'ngo') router.push('/dashboard/ngo')
    else if (user.role === 'admin') router.push('/admin')
    else router.push('/login')
  }, [router])

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <svg className="animate-spin h-8 w-8 text-green-700" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25 border-green-200" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        <p className="text-gray-500 text-sm">Redirecting...</p>
      </div>
    </div>
  )
}
