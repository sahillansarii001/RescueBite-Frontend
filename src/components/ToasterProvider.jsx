'use client'
import { Toaster } from 'react-hot-toast'

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        success: {
          style: { background: '#2E7D32', color: '#fff' },
          iconTheme: { primary: '#fff', secondary: '#2E7D32' }
        },
        error: {
          style: { background: '#EF5350', color: '#fff' },
          iconTheme: { primary: '#fff', secondary: '#EF5350' }
        }
      }}
    />
  )
}
