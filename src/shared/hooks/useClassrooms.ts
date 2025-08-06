'use client'

import { useState, useEffect } from 'react'
import { ClassListItem, UserClassesResponse } from '@/modules/class/types'
import { getUserClasses } from '@/modules/class/service'
import { ResponseDto } from '@/modules/response.dto'

export const useClassrooms = () => {
  const [classrooms, setClassrooms] = useState<ClassListItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        setIsLoading(true)
        const response: ResponseDto = await getUserClasses()
        
        if (response.status && response.data) {
          const userClasses: UserClassesResponse = response.data
          // Combine all classes user is involved with
          const allClassrooms = [
            ...userClasses.created,
            ...userClasses.teaching,
            ...userClasses.enrolled
          ]
          
          // Remove duplicates by id (in case user is both creator and teacher)
          const uniqueClassrooms = allClassrooms.filter((classroom, index, self) =>
            index === self.findIndex((c) => c.id === classroom.id)
          )
          
          setClassrooms(uniqueClassrooms)
        }
      } catch (error) {
        console.error('Failed to fetch classrooms:', error)
        setClassrooms([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchClassrooms()
  }, [])

  return { classrooms, isLoading }
}