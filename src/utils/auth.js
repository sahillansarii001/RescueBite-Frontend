export const saveAuth = (token, user) => {
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))
}

export const getToken = () => localStorage.getItem('token')

export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user') || 'null')
  } catch {
    return null
  }
}

export const removeAuth = () => {
  localStorage.removeItem('token')
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

// Checks token exists AND is not expired — auto-clears stale tokens
export const isLoggedIn = () => {
  const token = getToken()
  if (!token) return false
  if (isTokenExpired(token)) {
    removeAuth() // wipe stale data automatically
    return false
  }
  return true
}
