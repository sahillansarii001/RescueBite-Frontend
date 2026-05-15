import axios from 'axios'
import { removeAuth, saveAuth, getRefreshToken } from './auth'

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api' })

// Attach token to every request
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auto-refresh token or auto-logout on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isAuthRoute = originalRequest.url?.includes('/auth/');
    if (typeof window !== 'undefined' && error.response?.status === 401 && !originalRequest._retry && !isAuthRoute) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();
      
      if (refreshToken) {
        try {
          // Use base axios to avoid infinite interceptor loops
          const res = await axios.post(`${api.defaults.baseURL}/auth/refresh`, { token: refreshToken });
          // Save new token (keep existing user and refresh token intact)
          saveAuth(res.data.token, null, refreshToken);
          
          // Update header and retry original request
          originalRequest.headers.Authorization = `Bearer ${res.data.token}`;
          return api(originalRequest);
        } catch (refreshError) {
          removeAuth();
          const path = window.location.pathname;
          if (path !== '/login' && path !== '/signup' && path !== '/') window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else {
        removeAuth();
        const path = window.location.pathname;
        if (path !== '/login' && path !== '/signup' && path !== '/') window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
)

export default api
