import axios from 'axios'
import { removeAuth } from './auth'

const api = axios.create({ baseURL: 'http://localhost:5000/api' })

// Attach token to every request
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auto-logout on 401 — token expired or invalid on backend
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== 'undefined' && error.response?.status === 401) {
      removeAuth()
      // Only redirect if not already on auth pages
      const path = window.location.pathname
      if (path !== '/login' && path !== '/signup' && path !== '/') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api
