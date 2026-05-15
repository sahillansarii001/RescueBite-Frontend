export const saveAuth = (token, user, refreshToken) => {
  localStorage.setItem('token', token)
  if (user) localStorage.setItem('user', JSON.stringify(user))
  if (refreshToken) localStorage.setItem('refreshToken', refreshToken)
}

export const getToken = () => localStorage.getItem('token')
export const getRefreshToken = () => localStorage.getItem('refreshToken')

export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user') || 'null')
  } catch {
    return null
  }
}

export const removeAuth = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('user')
}

// Decode JWT expiry without a library — JWT payload is base64 encoded middle segment
const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    // exp is in seconds, Date.now() is in ms
    return payload.exp * 1000 < Date.now()
  } catch {
    return true // if we can't decode it, treat as expired
  }
}

// Checks token exists AND is not expired — if expired, checks if we have a refresh token
export const isLoggedIn = () => {
  const token = getToken()
  const refreshToken = getRefreshToken()
  if (!token && !refreshToken) return false
  
  if (token && !isTokenExpired(token)) return true
  if (refreshToken && !isTokenExpired(refreshToken)) return true
  
  removeAuth() // both tokens missing or expired
  return false
}
