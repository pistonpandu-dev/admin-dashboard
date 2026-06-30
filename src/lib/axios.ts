import axios from 'axios'
import { getAuth } from 'firebase/auth'

const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:3001/api'

export const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor untuk menambahkan token
axiosInstance.interceptors.request.use(
  async (config) => {
    const auth = getAuth()
    const user = auth.currentUser
    if (user) {
      const token = await user.getIdToken()
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor untuk handle error
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect ke login jika unauthorized
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)
