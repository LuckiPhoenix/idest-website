import { MessageResponse } from '@/shared/types/message.types'

export interface ConversationParticipant {
  id: string
  userId: string
  joinedAt: string
  user: {
    id: string
    full_name: string
    email: string
    avatar_url?: string
  }
}

export interface ConversationResponse {
  id: string
  isGroup: boolean
  createdAt: string
  updatedAt: string
  participants: ConversationParticipant[]
  messages: MessageResponse[]
  _count?: {
    messages: number
  }
}

export interface ConversationListResponse {
  id: string
  isGroup: boolean
  updatedAt: string
  participants: ConversationParticipant[]
  messages: MessageResponse[] // Recent messages
  _count: {
    messages: number
  }
}

export interface SendMessageResponse {
  id: string
  content: string
  type: string
  sentAt: string
  senderId: string
  conversationId: string
  sender: {
    id: string
    full_name: string
    avatar_url?: string
  }
  conversation: {
    id: string
    isGroup: boolean
  }
}

export interface DirectConversationResponse {
  conversation: ConversationResponse
  isNew: boolean
}

export interface MessagesListResponse {
  messages: MessageResponse[]
  hasMore: boolean
  total: number
}