import { http } from '@/modules/http'
import { CreateSessionDto } from './dtos/createSession.dto'
import { UpdateSessionDto } from './dtos/updateSession.dto'
import { SessionResponse, UpcomingSessionResponse } from './types'
import { ResponseDto } from '@/modules/response.dto'

/**
 * Session Management Services
 */

export async function createSession(data: CreateSessionDto): Promise<ResponseDto> {
  try {
    const response = await http.post('/session', data)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

export async function getUpcomingSessions(): Promise<ResponseDto> {
  try {
    const response = await http.get('/session/upcoming')
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

export async function getSessionById(id: string): Promise<ResponseDto> {
  try {
    const response = await http.get(`/session/${id}`)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

export async function updateSession(id: string, data: UpdateSessionDto): Promise<ResponseDto> {
  try {
    const response = await http.put(`/session/${id}`, data)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

export async function deleteSession(id: string): Promise<ResponseDto> {
  try {
    const response = await http.delete(`/session/${id}`)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

export async function endSession(id: string): Promise<ResponseDto> {
  try {
    const response = await http.put(`/session/${id}/end`)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

export async function getClassSessions(classId: string): Promise<ResponseDto> {
  try {
    const response = await http.get(`/session/class/${classId}`)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

/**
 * Session Access Control
 */

export async function validateSessionAccess(sessionId: string): Promise<ResponseDto> {
  try {
    const response = await http.get(`/session/${sessionId}/access`)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

/**
 * Session Analytics
 */

export async function getSessionAnalytics(sessionId: string): Promise<ResponseDto> {
  try {
    const response = await http.get(`/session/${sessionId}/analytics`)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}