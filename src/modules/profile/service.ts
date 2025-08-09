import { CreateUserDto } from './createUser.dto'
import { createClient } from '@/modules/supabase/client'
import { http } from '@/modules/http'
import { CreateStudentProfileDto } from './dtos/createStudentProfile.dto'
import { CreateTeacherProfileDto } from './dtos/createTeacherProfile.dto'
import { UpdateUserDto } from './dtos/updateUser.dto'
import { Role } from '@/shared/types/role.enum'
import { User } from '@/shared/types/user.types'

export async function registerUserWithSupabase(user: CreateUserDto) {
  const response = await http.post('/user', user)
  return response
}

export async function getUser() {
  try {
    const response = await http.get('/user')
    return response
  } catch (error: unknown) {
    throw error
  }
}

export async function exchangeCodeForSession(code: string) {
  const supabase = createClient()
  return supabase.auth.exchangeCodeForSession(code)
}

export async function getUserById(id: string) {
  try {
    const response = await http.get(`/user/${id}`)
    return response
  } catch (error: unknown) {
    throw error
  }
}

export async function createStudentProfile(data: CreateStudentProfileDto) {
  const response = await http.post('/user/student-profile', data)
  return response
}

export async function createTeacherProfile(data: CreateTeacherProfileDto) {
  const response = await http.post('/user/teacher-profile', data)
  return response
}

export async function getAllUsers() {
  const response = await http.get(`/user/all`)
  return response
}

export async function getAllTeachers() {
  const allUsers = await http.get(`/user/all`)
  const teachers = allUsers.data.filter((user: User) => user.role === Role.TEACHER)
  return teachers
}

export async function updateUser(id: string, data: UpdateUserDto) {
  try {
    const response = await http.put(`/user/${id}`, data)
    return response
  } catch (error: unknown) {
    throw error
  }
}