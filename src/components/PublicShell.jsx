'use client'
import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'

const DASHBOARD_PATHS = ['/dashboard', '/admin']

export default function PublicShell({ children }) {
  const pathname = usePathname()
  const isDashboard = DASHBOARD_PATHS.some(p => pathname.startsWith(p))

  return (
    <>
      {!isDashboard && <Navbar />}
      {children}
      {!isDashboard && <Footer />}
    </>
  )
}
