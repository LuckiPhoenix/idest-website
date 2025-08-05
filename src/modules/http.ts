import { createClient } from '@/modules/supabase/client'
import axios from 'axios'

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.request.use(
  async (config) => {
    try {
      const { data } = await createClient().auth.getSession()
      const token = data.session?.access_token
    
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
    } catch (error) {
      console.warn('Failed to get session token:', error)
    }
    
    return config
  },
  (error) => {
    console.error('Request interceptor error:', error)
    return Promise.reject(error)
  }
)

// Add response interceptor for better error handling
http.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.message)
    
    // Check if it's a network error (no response from server)
    if (!error.response) {
      console.error('Backend server is not accessible. Please check if the server is running on:', http.defaults.baseURL)
    } else {
      // Server responded with an error status
      console.error('Server responded with status:', error.response.status, error.response.data)
    }
    
    return Promise.reject(error)
  }
)