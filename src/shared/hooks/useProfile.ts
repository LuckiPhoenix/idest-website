"use client"

import { useState, useEffect } from 'react'
import { getUser } from '@/modules/profile/service'
import type { User } from '@/shared/types/user.types'
import { createClient } from '@/modules/supabase/client'

export function useProfile() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    async function checkAuthAndFetchProfile() {
      try {
        const supabase = createClient()
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session) {
          setIsAuthenticated(false)
          setIsLoading(false)
          return
        }

        setIsAuthenticated(true)

        // Fetch profile data
        const profileResponse = await getUser()
        console.log("profileResponse", profileResponse)
        if (profileResponse.data.status && profileResponse.data.data) {
          setUser(profileResponse.data.data as User)
        } else {
          setError(profileResponse.data.message || 'Failed to fetch profile')
        }
      } catch (err) {
        console.error('Error fetching profile:', err)
        setError('Failed to fetch profile')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthAndFetchProfile()
  }, [])

  const logout = async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      setUser(null)
      setIsAuthenticated(false)
      window.location.href = '/auth/login'
    } catch (err) {
      console.error('Error logging out:', err)
    }
  }

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    logout,
  }
}