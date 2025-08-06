export enum MessageType {
  DIRECT = 'DIRECT',     // 1-on-1 or group conversations
  CLASSROOM = 'CLASSROOM', // Class-wide messages
  MEETING = 'MEETING',    // Live session chat
}

export interface MessageResponse {
  id: string
  content: string
  type: MessageType
  sentAt: string
  senderId: string
  conversationId?: string
  sessionId?: string
  sender: {
    id: string
    full_name: string
    avatar_url?: string
  }
}

export interface ChatMessageResponse {
  sessionId: string
  message: string
  userId: string
  userFullName: string
  userAvatar?: string
  timestamp: Date
}