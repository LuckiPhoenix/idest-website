import { http } from '@/modules/http'
import { ResponseDto } from '@/modules/response.dto'
import { CreateClassDto } from './dtos/createClass.dto'
import { UpdateClassDto } from './dtos/updateClass.dto'
import { JoinClassDto } from './dtos/joinClass.dto'
import { AddClassMemberDto } from './dtos/addClassMember.dto'
import { AddClassTeacherDto } from './dtos/addClassTeacher.dto'
import { 
  ClassResponse, 
  ClassListItem, 
  UserClassesResponse, 
  ClassMembershipResponse,
  ClassStatistics 
} from './types'

/**
 * Class Management
 */

export async function createClass(data: CreateClassDto): Promise<ResponseDto> {
  try {
    const response = await http.post('/class', data)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

export async function getUserClasses(): Promise<ResponseDto> {
  try {
    const response = await http.get('/class')
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

export async function getClassById(id: string): Promise<ResponseDto> {
  try {
    const response = await http.get(`/class/${id}`)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

export async function updateClass(id: string, data: UpdateClassDto): Promise<ResponseDto> {
  try {
    const response = await http.put(`/class/${id}`, data)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

export async function deleteClass(id: string): Promise<ResponseDto> {
  try {
    const response = await http.delete(`/class/${id}`)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

/**
 * Class Membership Management
 */

export async function joinClass(data: JoinClassDto): Promise<ResponseDto> {
  try {
    const response = await http.post('/class/join', data)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

export async function addStudent(classId: string, data: AddClassMemberDto): Promise<ResponseDto> {
  try {
    const response = await http.post(`/class/${classId}/students`, data)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

export async function removeStudent(classId: string, studentId: string): Promise<ResponseDto> {
  try {
    const response = await http.delete(`/class/${classId}/students/${studentId}`)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

export async function addTeacher(classId: string, data: AddClassTeacherDto): Promise<ResponseDto> {
  try {
    const response = await http.post(`/class/${classId}/teachers`, data)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

export async function removeTeacher(classId: string, teacherId: string): Promise<ResponseDto> {
  try {
    const response = await http.delete(`/class/${classId}/teachers/${teacherId}`)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

export async function leaveClass(classId: string): Promise<ResponseDto> {
  try {
    const response = await http.delete(`/class/${classId}/leave`)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

/**
 * Class Information & Statistics
 */

export async function getClassMembers(classId: string): Promise<ResponseDto> {
  try {
    const response = await http.get(`/class/${classId}/members`)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

export async function getClassTeachers(classId: string): Promise<ResponseDto> {
  try {
    const response = await http.get(`/class/${classId}/teachers`)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

export async function getClassStatistics(classId: string): Promise<ResponseDto> {
  try {
    const response = await http.get(`/class/${classId}/statistics`)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

export async function getClassSessions(classId: string): Promise<ResponseDto> {
  try {
    const response = await http.get(`/class/${classId}/sessions`)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

/**
 * Class Search & Discovery
 */

export async function searchClasses(query: string): Promise<ResponseDto> {
  try {
    const response = await http.get(`/class/search?q=${encodeURIComponent(query)}`)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

export async function getPublicClasses(): Promise<ResponseDto> {
  try {
    const response = await http.get('/class/public')
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

/**
 * Invite Code Management
 */

export async function regenerateInviteCode(classId: string): Promise<ResponseDto> {
  try {
    const response = await http.put(`/class/${classId}/regenerate-code`)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

export async function validateInviteCode(inviteCode: string): Promise<ResponseDto> {
  try {
    const response = await http.get(`/class/validate-code/${inviteCode}`)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

/**
 * Class Settings
 */

export async function updateClassSettings(
  classId: string, 
  settings: { 
    allow_student_invite?: boolean
    auto_approve_join?: boolean
    max_members?: number
  }
): Promise<ResponseDto> {
  try {
    const response = await http.put(`/class/${classId}/settings`, settings)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

/**
 * Bulk Operations
 */

export async function bulkAddStudents(
  classId: string, 
  studentIds: string[]
): Promise<ResponseDto> {
  try {
    const response = await http.post(`/class/${classId}/students/bulk`, { studentIds })
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

export async function bulkRemoveStudents(
  classId: string, 
  studentIds: string[]
): Promise<ResponseDto> {
  try {
    const response = await http.delete(`/class/${classId}/students/bulk`, { 
      data: { studentIds } 
    })
    return response.data
  } catch (error: unknown) {
    throw error
  }
}