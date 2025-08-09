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

// Request interceptor: attach Supabase auth token
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

// Response interceptor: unwrap ResponseDto.data
http.interceptors.response.use(
  (response) => {
    // If your backend returns { status, message, data: {...} }
    // Axios wraps that again inside response.data
    const body = response.data

    // If it's a ResponseDto-like object, flatten it to only return .data
    if (body && typeof body === 'object' && 'data' in body && 'status' in body) {
      return {
        ...body,
        data: body.data // still keep message, status, etc. but flatten
      }
    }

    return body // fallback for other responses
  },
  (error) => {
    console.error('API Error:', error.message)
    
    if (!error.response) {
      console.error('Backend server is not accessible. Please check if the server is running on:', http.defaults.baseURL)
    } else {
      console.error('Server responded with status:', error.response.status, error.response.data)
    }
    
    return Promise.reject(error)
  }
)