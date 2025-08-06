import { http } from '@/modules/http'
import { ResponseDto } from '@/modules/response.dto'
import { CreateConversationDto } from './dtos/createConversation.dto'
import { SendMessageDto } from './dtos/sendMessage.dto'
import { AddParticipantDto } from './dtos/addParticipant.dto'
import { GetMessagesDto } from './dtos/getMessages.dto'
import { 
  ConversationResponse, 
  ConversationListResponse, 
  SendMessageResponse, 
  DirectConversationResponse,
  MessagesListResponse 
} from './types'

/**
 * Conversation Management
 */

export async function createConversation(data: CreateConversationDto): Promise<ResponseDto> {
  try {
    const response = await http.post('/conversation', data)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

export async function getUserConversations(): Promise<ResponseDto> {
  try {
    const response = await http.get('/conversation')
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

export async function getOrCreateDirectConversation(userId: string): Promise<ResponseDto> {
  try {
    const response = await http.get(`/conversation/direct/${userId}`)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

export async function getConversationById(id: string): Promise<ResponseDto> {
  try {
    const response = await http.get(`/conversation/${id}`)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

/**
 * Message Management
 */

export async function getConversationMessages(
  conversationId: string, 
  params?: GetMessagesDto
): Promise<ResponseDto> {
  try {
    const queryParams = new URLSearchParams()
    if (params?.limit) {
      queryParams.append('limit', params.limit.toString())
    }
    if (params?.before) {
      queryParams.append('before', params.before)
    }

    const url = `/conversation/${conversationId}/messages${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
    const response = await http.get(url)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

export async function sendMessage(
  conversationId: string, 
  data: SendMessageDto
): Promise<ResponseDto> {
  try {
    const response = await http.post(`/conversation/${conversationId}/messages`, data)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

/**
 * Participant Management
 */

export async function addParticipant(
  conversationId: string, 
  data: AddParticipantDto
): Promise<ResponseDto> {
  try {
    const response = await http.post(`/conversation/${conversationId}/participants`, data)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

export async function removeParticipant(
  conversationId: string, 
  participantId: string
): Promise<ResponseDto> {
  try {
    const response = await http.delete(`/conversation/${conversationId}/participants/${participantId}`)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

export async function leaveConversation(conversationId: string): Promise<ResponseDto> {
  try {
    const response = await http.delete(`/conversation/${conversationId}/participants/self`)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

/**
 * Conversation Utilities
 */

export async function searchConversations(query: string): Promise<ResponseDto> {
  try {
    const response = await http.get(`/conversation/search?q=${encodeURIComponent(query)}`)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

export async function markConversationAsRead(conversationId: string): Promise<ResponseDto> {
  try {
    const response = await http.put(`/conversation/${conversationId}/read`)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

export async function getUnreadCount(): Promise<ResponseDto> {
  try {
    const response = await http.get('/conversation/unread-count')
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

/**
 * Message Search
 */

export async function searchMessages(
  conversationId: string, 
  query: string
): Promise<ResponseDto> {
  try {
    const response = await http.get(
      `/conversation/${conversationId}/messages/search?q=${encodeURIComponent(query)}`
    )
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

/**
 * Conversation Settings
 */

export async function updateConversationSettings(
  conversationId: string, 
  settings: { muted?: boolean; archived?: boolean }
): Promise<ResponseDto> {
  try {
    const response = await http.put(`/conversation/${conversationId}/settings`, settings)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}